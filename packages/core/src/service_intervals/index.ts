import { z } from 'zod';
import { doIntervalsOverlap } from '../booking_engine';

export const ServiceSegmentTypeSchema = z.enum([
  'hands_on_application',
  'processing_gap',
  'finishing_service',
]);
export type ServiceSegmentType = z.infer<typeof ServiceSegmentTypeSchema>;

export const ServiceIntervalDefinitionSchema = z.object({
  serviceId: z.string(),
  serviceName: z.string(),
  handsOnDurationMinutes: z.number().positive(),
  processingGapMinutes: z.number().nonnegative().default(0),
  finishingDurationMinutes: z.number().nonnegative().default(0),
  requiresSameStationThroughout: z.boolean().default(true), // e.g. client remains in styling chair during processing
});
export type ServiceIntervalDefinition = z.infer<typeof ServiceIntervalDefinitionSchema>;

export const ScheduledSegmentSchema = z.object({
  segmentId: z.string(),
  type: ServiceSegmentTypeSchema,
  label: z.string(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  durationMinutes: z.number().positive(),
  practitionerBusy: z.boolean(),
  stationOccupied: z.boolean(),
  stationResourceId: z.string(),
});
export type ScheduledSegment = z.infer<typeof ScheduledSegmentSchema>;

export const SplitIntervalAppointmentScheduleSchema = z.object({
  appointmentId: z.string(),
  tenantId: z.string(),
  practitionerId: z.string(),
  serviceId: z.string(),
  serviceName: z.string(),
  primaryStationResourceId: z.string(),
  overallStartTime: z.string().datetime(),
  overallEndTime: z.string().datetime(),
  totalSpanMinutes: z.number().positive(),
  totalPractitionerHandsOnMinutes: z.number().positive(),
  totalFreedProcessingMinutes: z.number().nonnegative(),
  segments: z.array(ScheduledSegmentSchema),
});
export type SplitIntervalAppointmentSchedule = z.infer<typeof SplitIntervalAppointmentScheduleSchema>;

/**
 * Computes a detailed split schedule for services with hands-on, processing, and finishing segments.
 * Invariant: Processing gaps release the practitioner's hands-on time, but the station/room
 * remains occupied unless client transfers to another designated area.
 */
export function buildSplitIntervalSchedule(params: {
  tenantId: string;
  appointmentId: string;
  practitionerId: string;
  primaryStationResourceId: string;
  definition: ServiceIntervalDefinition;
  startTime: string;
}): SplitIntervalAppointmentSchedule {
  const start = new Date(params.startTime);
  const segments: ScheduledSegment[] = [];

  // Segment 1: Initial hands-on work (e.g. foils / color application)
  const handsOnStart = new Date(start.getTime());
  const handsOnEnd = new Date(handsOnStart.getTime() + params.definition.handsOnDurationMinutes * 60 * 1000);

  segments.push({
    segmentId: `seg_handson_${params.appointmentId}`,
    type: 'hands_on_application',
    label: 'Hands-on Application',
    startTime: handsOnStart.toISOString(),
    endTime: handsOnEnd.toISOString(),
    durationMinutes: params.definition.handsOnDurationMinutes,
    practitionerBusy: true,
    stationOccupied: true,
    stationResourceId: params.primaryStationResourceId,
  });

  let currentEnd = handsOnEnd;

  // Segment 2: Processing gap (e.g. 35 mins color development or chemical dwell)
  if (params.definition.processingGapMinutes > 0) {
    const gapStart = new Date(currentEnd.getTime());
    const gapEnd = new Date(gapStart.getTime() + params.definition.processingGapMinutes * 60 * 1000);

    segments.push({
      segmentId: `seg_gap_${params.appointmentId}`,
      type: 'processing_gap',
      label: 'Processing / Dwell Time',
      startTime: gapStart.toISOString(),
      endTime: gapEnd.toISOString(),
      durationMinutes: params.definition.processingGapMinutes,
      practitionerBusy: false, // Practitioner is FREED to take a secondary service!
      stationOccupied: params.definition.requiresSameStationThroughout, // Station remains occupied
      stationResourceId: params.primaryStationResourceId,
    });

    currentEnd = gapEnd;
  }

  // Segment 3: Finishing service (e.g. rinse, blowdry, styling)
  if (params.definition.finishingDurationMinutes > 0) {
    const finishStart = new Date(currentEnd.getTime());
    const finishEnd = new Date(finishStart.getTime() + params.definition.finishingDurationMinutes * 60 * 1000);

    segments.push({
      segmentId: `seg_finish_${params.appointmentId}`,
      type: 'finishing_service',
      label: 'Finishing / Blowout & Style',
      startTime: finishStart.toISOString(),
      endTime: finishEnd.toISOString(),
      durationMinutes: params.definition.finishingDurationMinutes,
      practitionerBusy: true, // Practitioner required again
      stationOccupied: true,
      stationResourceId: params.primaryStationResourceId,
    });

    currentEnd = finishEnd;
  }

  const totalSpanMinutes =
    params.definition.handsOnDurationMinutes +
    params.definition.processingGapMinutes +
    params.definition.finishingDurationMinutes;

  const totalPractitionerHandsOnMinutes =
    params.definition.handsOnDurationMinutes + params.definition.finishingDurationMinutes;

  return {
    appointmentId: params.appointmentId,
    tenantId: params.tenantId,
    practitionerId: params.practitionerId,
    serviceId: params.definition.serviceId,
    serviceName: params.definition.serviceName,
    primaryStationResourceId: params.primaryStationResourceId,
    overallStartTime: handsOnStart.toISOString(),
    overallEndTime: currentEnd.toISOString(),
    totalSpanMinutes,
    totalPractitionerHandsOnMinutes,
    totalFreedProcessingMinutes: params.definition.processingGapMinutes,
    segments,
  };
}

/**
 * Validates whether a secondary appointment can be safely slotted into a practitioner's processing gap.
 * Enforces:
 * 1. The secondary appointment must complete with a safety buffer before the finishing segment begins.
 * 2. The secondary appointment CANNOT use the primary station that remains occupied by the processing client.
 */
export function canFitSecondaryServiceInProcessingGap(params: {
  primarySchedule: SplitIntervalAppointmentSchedule;
  secondaryServiceDurationMinutes: number;
  secondaryRequestedStartTime: string;
  secondaryTargetStationResourceId: string;
  safetyBufferMinutes?: number;
}): { canFit: true; secondaryEndTime: string } | { canFit: false; reason: string } {
  const gapSegment = params.primarySchedule.segments.find((s) => s.type === 'processing_gap');
  if (!gapSegment) {
    return {
      canFit: false,
      reason: 'The primary appointment does not have a scheduled processing gap.',
    };
  }

  // Check resource collision: secondary service cannot take the occupied primary station
  if (
    gapSegment.stationOccupied &&
    params.secondaryTargetStationResourceId === params.primarySchedule.primaryStationResourceId
  ) {
    return {
      canFit: false,
      reason: `Primary client remains seated at station "${params.primarySchedule.primaryStationResourceId}" during processing. Secondary service requires a separate station.`,
    };
  }

  const safetyBuffer = params.safetyBufferMinutes ?? 5;
  const secondaryStart = new Date(params.secondaryRequestedStartTime).getTime();
  const secondaryEnd = secondaryStart + params.secondaryServiceDurationMinutes * 60 * 1000;

  const gapStart = new Date(gapSegment.startTime).getTime();
  const gapEnd = new Date(gapSegment.endTime).getTime();

  // Secondary start must be >= gapStart
  if (secondaryStart < gapStart) {
    return {
      canFit: false,
      reason: `Secondary service starts at ${new Date(secondaryStart).toISOString()} before practitioner processing gap begins (${gapSegment.startTime}).`,
    };
  }

  // Secondary end + safety buffer must be <= gapEnd
  if (secondaryEnd + safetyBuffer * 60 * 1000 > gapEnd) {
    const requiredEndWithBuffer = new Date(secondaryEnd + safetyBuffer * 60 * 1000).toISOString();
    return {
      canFit: false,
      reason: `Secondary service finishes at ${new Date(secondaryEnd).toISOString()}, which encroaches on the practitioner's finishing segment (needs ${safetyBuffer}m buffer before ${gapSegment.endTime}).`,
    };
  }

  return {
    canFit: true,
    secondaryEndTime: new Date(secondaryEnd).toISOString(),
  };
}
