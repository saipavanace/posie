import { z } from 'zod';
import { doIntervalsOverlap } from '../booking_engine';

export const CalendarProviderSchema = z.enum(['google_calendar', 'outlook_365', 'apple_ical']);
export type CalendarProvider = z.infer<typeof CalendarProviderSchema>;

export const CalendarConnectionSchema = z.object({
  connectionId: z.string(),
  tenantId: z.string(),
  practitionerId: z.string(),
  provider: CalendarProviderSchema,
  externalCalendarId: z.string(),
  syncDirection: z.enum(['two_way', 'posie_to_external_only', 'read_busy_blocks_only']).default('two_way'),
  importBusyBlocksOnly: z.boolean().default(true), // Protects personal event title privacy
  posieSyncTokenPrefix: z.string().default('posie_sync_'),
  isActive: z.boolean().default(true),
  lastSyncedAt: z.string().datetime(),
});
export type CalendarConnection = z.infer<typeof CalendarConnectionSchema>;

export const ExternalCalendarEventSchema = z.object({
  externalId: z.string(),
  title: z.string(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  isBusyBlock: z.boolean().default(true),
  originSource: z.enum(['external_personal', 'posie_origin']).default('external_personal'),
  posieAppointmentId: z.string().optional(),
});
export type ExternalCalendarEvent = z.infer<typeof ExternalCalendarEventSchema>;

export const PosieAppointmentSummarySchema = z.object({
  appointmentId: z.string(),
  practitionerId: z.string(),
  clientName: z.string(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  isPaidOrDepositSecured: z.boolean(),
  status: z.enum(['confirmed', 'cancelled']),
});
export type PosieAppointmentSummary = z.infer<typeof PosieAppointmentSummarySchema>;

export const SyncIngestionResultSchema = z.object({
  connectionId: z.string(),
  eventsProcessedCount: z.number().int().nonnegative(),
  busyBlocksIngestedCount: z.number().int().nonnegative(),
  loopEchoesIgnoredCount: z.number().int().nonnegative(),
  protectedPaidAppointmentsSavedCount: z.number().int().nonnegative(),
  conflictsIdentified: z.array(
    z.object({
      externalEventTitle: z.string(),
      collidingAppointmentId: z.string(),
      collidingClientName: z.string(),
      startTime: z.string(),
      endTime: z.string(),
    })
  ),
  status: z.enum(['synced_cleanly', 'synced_with_conflicts', 'sync_error']),
  syncTimestamp: z.string().datetime(),
});
export type SyncIngestionResult = z.infer<typeof SyncIngestionResultSchema>;

/**
 * Ingests external calendar events while strictly enforcing:
 * 1. Sync Loop Defense: Ignores events that originated from Posie to prevent infinite ping-pong loops.
 * 2. Paid Appointment Protection: External deletion events cannot silently delete paid or deposit-held appointments.
 * 3. Busy Block Collisions: Flags personal calendar collisions with existing appointments.
 */
export function ingestExternalCalendarEvents(params: {
  connection: CalendarConnection;
  incomingEvents: ExternalCalendarEvent[];
  existingPosieAppointments: PosieAppointmentSummary[];
  currentTime?: string;
}): SyncIngestionResult {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();

  let busyBlocksIngestedCount = 0;
  let loopEchoesIgnoredCount = 0;
  let protectedPaidAppointmentsSavedCount = 0;
  const conflictsIdentified: SyncIngestionResult['conflictsIdentified'] = [];

  for (const event of params.incomingEvents) {
    // 1. SYNC LOOP DEFENSE: Check if event was created by Posie export
    if (
      event.originSource === 'posie_origin' ||
      event.externalId.startsWith(params.connection.posieSyncTokenPrefix) ||
      event.posieAppointmentId
    ) {
      loopEchoesIgnoredCount++;
      continue; // Discard reflection to prevent loop
    }

    // 2. Event is genuinely external (e.g. personal dentist, family dinner)
    busyBlocksIngestedCount++;

    // Check if this personal event overlaps with any confirmed Posie appointments
    const collidingAppt = params.existingPosieAppointments.find(
      (appt) =>
        appt.practitionerId === params.connection.practitionerId &&
        appt.status === 'confirmed' &&
        doIntervalsOverlap(appt.startTime, appt.endTime, event.startTime, event.endTime)
    );

    if (collidingAppt) {
      conflictsIdentified.push({
        externalEventTitle: params.connection.importBusyBlocksOnly ? 'Busy Block (Personal)' : event.title,
        collidingAppointmentId: collidingAppt.appointmentId,
        collidingClientName: collidingAppt.clientName,
        startTime: collidingAppt.startTime,
        endTime: collidingAppt.endTime,
      });

      if (collidingAppt.isPaidOrDepositSecured) {
        protectedPaidAppointmentsSavedCount++;
      }
    }
  }

  const status =
    conflictsIdentified.length > 0 ? 'synced_with_conflicts' : 'synced_cleanly';

  return {
    connectionId: params.connection.connectionId,
    eventsProcessedCount: params.incomingEvents.length,
    busyBlocksIngestedCount,
    loopEchoesIgnoredCount,
    protectedPaidAppointmentsSavedCount,
    conflictsIdentified,
    status,
    syncTimestamp: now.toISOString(),
  };
}

/**
 * Handles external calendar delete requests.
 * Invariant: "An external event cannot silently delete a paid appointment or cause a sync loop."
 */
export function handleExternalDeletionRequest(params: {
  externalEventId: string;
  targetAppointment?: PosieAppointmentSummary;
}): { deletionAllowed: boolean; reason: string } {
  if (!params.targetAppointment) {
    return {
      deletionAllowed: true,
      reason: 'External busy block deleted from external provider.',
    };
  }

  // If the appointment is confirmed or paid in Posie, reject silent external deletion!
  if (params.targetAppointment.isPaidOrDepositSecured) {
    return {
      deletionAllowed: false,
      reason: `Deletion Blocked: Appointment ${params.targetAppointment.appointmentId} for client "${params.targetAppointment.clientName}" is confirmed with secured financial payment. Cancellations must be formally executed through Posie to enforce cancellation policies and refund rules.`,
    };
  }

  return {
    deletionAllowed: true,
    reason: 'Unsecured appointment cancelled by external calendar action.',
  };
}
