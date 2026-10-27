import { z } from 'zod';

export const PractitionerSegmentSchema = z.object({
  segmentId: z.string(),
  serviceId: z.string(),
  serviceName: z.string(),
  practitionerId: z.string(),
  practitionerName: z.string(),
  requiredCertification: z.string().optional(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  durationMinutes: z.number().positive(),
  handoffNotesToNext: z.string().optional(),
  status: z.enum(['scheduled', 'in_progress', 'delayed', 'completed', 'cancelled']).default('scheduled'),
});
export type PractitionerSegment = z.infer<typeof PractitionerSegmentSchema>;

export const DelayImpactAssessmentSchema = z.object({
  delayedSegmentId: z.string(),
  delayMinutes: z.number().positive(),
  impactedDownstreamSegments: z.array(
    z.object({
      segmentId: z.string(),
      practitionerId: z.string(),
      practitionerName: z.string(),
      originalStart: z.string().datetime(),
      projectedNewStart: z.string().datetime(),
      hasDownstreamScheduleConflict: z.boolean(),
      conflictDetails: z.string().optional(),
    })
  ),
  requiresClientNotification: z.boolean(),
  itineraryRevisionRequired: z.boolean(),
});
export type DelayImpactAssessment = z.infer<typeof DelayImpactAssessmentSchema>;

export const VisitItineraryDocSchema = z.object({
  itineraryId: z.string(),
  appointmentId: z.string(),
  tenantId: z.string(),
  clientName: z.string(),
  clientPhone: z.string(),
  timeZone: z.string(),
  locationAddress: z.string(),
  arrivalInstructions: z.string(),
  depositStatus: z.enum(['none_required', 'deposit_paid', 'fully_prepaid']),
  segments: z.array(PractitionerSegmentSchema),
  overallStartTime: z.string().datetime(),
  overallEndTime: z.string().datetime(),
  version: z.number().int().positive(),
  revisionReason: z.string().optional(),
  issuedAt: z.string().datetime(),
});
export type VisitItineraryDoc = z.infer<typeof VisitItineraryDocSchema>;

/**
 * Creates a coordinated multi-practitioner appointment across sequential services.
 * Validates practitioner qualifications/certifications for each segment.
 */
export function createMultiPractitionerAppointment(params: {
  tenantId: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  timeZone?: string;
  locationAddress: string;
  segments: Array<{
    serviceId: string;
    serviceName: string;
    practitionerId: string;
    practitionerName: string;
    practitionerCertifications: string[];
    requiredCertification?: string;
    startTime: string;
    durationMinutes: number;
  }>;
  arrivalInstructions?: string;
  depositStatus?: 'none_required' | 'deposit_paid' | 'fully_prepaid';
  currentTime?: string;
}): {
  success: true;
  appointmentId: string;
  segments: PractitionerSegment[];
  itinerary: VisitItineraryDoc;
} | { success: false; reason: string } {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();

  // 1. Validate skill and certification requirements for every segment
  for (const seg of params.segments) {
    if (seg.requiredCertification) {
      if (!seg.practitionerCertifications.includes(seg.requiredCertification)) {
        return {
          success: false,
          reason: `Practitioner ${seg.practitionerName} does not possess required credential "${seg.requiredCertification}" for service "${seg.serviceName}".`,
        };
      }
    }
  }

  // 2. Build verified segments
  const builtSegments: PractitionerSegment[] = params.segments.map((s, idx) => {
    const start = new Date(s.startTime);
    const end = new Date(start.getTime() + s.durationMinutes * 60 * 1000);
    return {
      segmentId: `seg_${idx + 1}_${Math.random().toString(36).substring(2, 7)}`,
      serviceId: s.serviceId,
      serviceName: s.serviceName,
      practitionerId: s.practitionerId,
      practitionerName: s.practitionerName,
      requiredCertification: s.requiredCertification,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      durationMinutes: s.durationMinutes,
      status: 'scheduled',
    };
  });

  const appointmentId = `mapt_${Math.random().toString(36).substring(2, 9)}`;
  const overallStart = builtSegments[0].startTime;
  const overallEnd = builtSegments[builtSegments.length - 1].endTime;

  const itinerary: VisitItineraryDoc = {
    itineraryId: `itin_${Math.random().toString(36).substring(2, 9)}`,
    appointmentId,
    tenantId: params.tenantId,
    clientName: params.clientName,
    clientPhone: params.clientPhone,
    timeZone: params.timeZone ?? 'America/New_York',
    locationAddress: params.locationAddress,
    arrivalInstructions:
      params.arrivalInstructions ?? 'Please arrive 10 minutes prior to your first service. Complimentary beverage provided upon check-in.',
    depositStatus: params.depositStatus ?? 'deposit_paid',
    segments: builtSegments,
    overallStartTime: overallStart,
    overallEndTime: overallEnd,
    version: 1,
    issuedAt: now.toISOString(),
  };

  return {
    success: true,
    appointmentId,
    segments: builtSegments,
    itinerary,
  };
}

/**
 * Attaches structured handoff notes from one segment practitioner to the next.
 */
export function addSegmentHandoffNotes(
  segments: PractitionerSegment[],
  fromSegmentId: string,
  handoffNotes: string
): PractitionerSegment[] {
  return segments.map((seg) => {
    if (seg.segmentId === fromSegmentId) {
      return {
        ...seg,
        handoffNotesToNext: handoffNotes,
      };
    }
    return seg;
  });
}

/**
 * Assesses the ripple consequences of a delayed segment BEFORE notifying downstream staff or updating the client.
 * Invariant: "A delayed segment exposes consequences before the next staff member is notified."
 */
export function recordSegmentDelayAndAssessImpact(params: {
  segments: PractitionerSegment[];
  delayedSegmentId: string;
  delayMinutes: number;
  practitionerNextBookings?: Array<{ practitionerId: string; nextAppointmentStart: string }>;
}): {
  updatedSegments: PractitionerSegment[];
  impactAssessment: DelayImpactAssessment;
} {
  const delayedIdx = params.segments.findIndex((s) => s.segmentId === params.delayedSegmentId);
  if (delayedIdx === -1) {
    throw new Error(`Segment with ID "${params.delayedSegmentId}" not found in appointment.`);
  }

  const updatedSegments = [...params.segments];
  const delayedSeg = updatedSegments[delayedIdx];
  const delayedEnd = new Date(new Date(delayedSeg.endTime).getTime() + params.delayMinutes * 60 * 1000);

  updatedSegments[delayedIdx] = {
    ...delayedSeg,
    endTime: delayedEnd.toISOString(),
    status: 'delayed',
  };

  let cumulativeDelayMs = params.delayMinutes * 60 * 1000;
  const downstreamImpacts: DelayImpactAssessment['impactedDownstreamSegments'] = [];

  for (let i = delayedIdx + 1; i < updatedSegments.length; i++) {
    const seg = updatedSegments[i];
    const origStart = new Date(seg.startTime);
    const origEnd = new Date(seg.endTime);
    const newStart = new Date(origStart.getTime() + cumulativeDelayMs);
    const newEnd = new Date(origEnd.getTime() + cumulativeDelayMs);

    updatedSegments[i] = {
      ...seg,
      startTime: newStart.toISOString(),
      endTime: newEnd.toISOString(),
    };

    // Check downstream conflict for this practitioner's personal schedule
    const nextBooking = params.practitionerNextBookings?.find(
      (b) => b.practitionerId === seg.practitionerId
    );

    let hasConflict = false;
    let conflictDetails: string | undefined;

    if (nextBooking) {
      const nextStart = new Date(nextBooking.nextAppointmentStart).getTime();
      if (newEnd.getTime() > nextStart) {
        hasConflict = true;
        conflictDetails = `Projected completion at ${newEnd.toISOString()} collides with next appointment starting at ${nextBooking.nextAppointmentStart}.`;
      }
    }

    downstreamImpacts.push({
      segmentId: seg.segmentId,
      practitionerId: seg.practitionerId,
      practitionerName: seg.practitionerName,
      originalStart: origStart.toISOString(),
      projectedNewStart: newStart.toISOString(),
      hasDownstreamScheduleConflict: hasConflict,
      conflictDetails,
    });
  }

  const assessment: DelayImpactAssessment = {
    delayedSegmentId: params.delayedSegmentId,
    delayMinutes: params.delayMinutes,
    impactedDownstreamSegments: downstreamImpacts,
    requiresClientNotification: params.delayMinutes >= 15,
    itineraryRevisionRequired: true,
  };

  return {
    updatedSegments,
    impactAssessment: assessment,
  };
}

/**
 * Revises Document D02 Visit Itinerary with audit trail and change explanation.
 */
export function reviseVisitItinerary(
  currentItinerary: VisitItineraryDoc,
  updatedSegments: PractitionerSegment[],
  revisionReason: string,
  currentTime?: string
): VisitItineraryDoc {
  const now = params_or_now(currentTime);
  return {
    ...currentItinerary,
    version: currentItinerary.version + 1,
    segments: updatedSegments,
    overallStartTime: updatedSegments[0].startTime,
    overallEndTime: updatedSegments[updatedSegments.length - 1].endTime,
    revisionReason,
    issuedAt: now.toISOString(),
  };
}

function params_or_now(time?: string): Date {
  return time ? new Date(time) : new Date();
}
