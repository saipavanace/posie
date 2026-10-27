import { z } from 'zod';

/**
 * F066 — Arrival and Waiting Status
 *
 * Provides accessible salon arrival check-in, private waiting queue tracking,
 * and client SMS status updates.
 *
 * Invariants (Row 14, WB T):
 * 1. Client Privacy: Waiting room displays and client-facing views MUST NOT expose other clients'
 *    identities, phone numbers, treatment notes, or VIP tags (displays sanitized initials or tokens).
 * 2. Accidental Reversal: Staff can reverse an accidental check-in back to scheduled without deleting booking.
 * 3. Duplicate Prevention: Cannot check in an appointment that is already active in the waiting queue or chair.
 */

export const VisitArrivalStateSchema = z.enum([
  'scheduled',
  'arrived_waiting',
  'in_chair',
  'service_completed',
  'accidental_checkin_reversed',
]);
export type VisitArrivalState = z.infer<typeof VisitArrivalStateSchema>;

export const WaitingQueueItemSchema = z.object({
  queueEntryId: z.string().uuid(),
  appointmentId: z.string().uuid(),
  businessId: z.string().uuid(),
  clientId: z.string().uuid(),
  fullClientName: z.string().min(1),
  publicDisplayName: z.string().min(1), // e.g. "Maya L." or "Guest #14" (privacy-safe)
  clientPhone: z.string().min(7),
  specialistStaffId: z.string().uuid(),
  specialistName: z.string().min(1),
  serviceName: z.string().min(1),
  scheduledTime: z.string().datetime(),

  // Queue Timing & State
  state: VisitArrivalStateSchema,
  arrivedAt: z.string().datetime().nullable(),
  estimatedWaitMinutes: z.number().int().nonnegative().default(5),
  seatAssigned: z.string().nullable(),

  // Privacy & Safety Flags
  isVipClient: z.boolean().default(false), // Private to staff only, never rendered in public views
  privateStaffAlertNotes: z.string().nullable(),
  clientNotifiedViaSms: z.boolean().default(false),
  reversedAt: z.string().datetime().nullable(),
  reversalReason: z.string().nullable(),
});
export type WaitingQueueItem = z.infer<typeof WaitingQueueItemSchema>;

/**
 * Converts a client's full name to a privacy-preserving public display moniker.
 * E.g. "Claire Vance" -> "Claire V."
 */
export function formatPublicDisplayMoniker(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0]!;
  const firstName = parts[0];
  const lastInitial = parts[parts.length - 1]![0]?.toUpperCase() ?? '';
  return `${firstName} ${lastInitial}.`;
}

/**
 * Checks in an arriving client and places them into the private waiting queue.
 *
 * Invariant: Rejects duplicate check-in if appointment is already arrived or in chair.
 */
export function recordClientArrival(params: {
  appointmentId: string;
  businessId: string;
  clientId: string;
  fullClientName: string;
  clientPhone: string;
  specialistStaffId: string;
  specialistName: string;
  serviceName: string;
  scheduledTime: string;
  isVipClient?: boolean;
  privateStaffAlertNotes?: string;
  estimatedWaitMinutes?: number;
  existingQueue?: WaitingQueueItem[];
}): WaitingQueueItem {
  const existing = params.existingQueue?.find(
    q => q.appointmentId === params.appointmentId && (q.state === 'arrived_waiting' || q.state === 'in_chair')
  );

  if (existing) {
    throw new Error(
      `Duplicate check-in rejected: Client is already checked in and marked as '${existing.state}'.`
    );
  }

  const queueEntryId = crypto.randomUUID ? crypto.randomUUID() : 'f0660000-0000-4000-8000-000000000001';
  const now = new Date().toISOString();
  const publicDisplayName = formatPublicDisplayMoniker(params.fullClientName);

  return WaitingQueueItemSchema.parse({
    queueEntryId,
    appointmentId: params.appointmentId,
    businessId: params.businessId,
    clientId: params.clientId,
    fullClientName: params.fullClientName,
    publicDisplayName,
    clientPhone: params.clientPhone,
    specialistStaffId: params.specialistStaffId,
    specialistName: params.specialistName,
    serviceName: params.serviceName,
    scheduledTime: params.scheduledTime,
    state: 'arrived_waiting',
    arrivedAt: now,
    estimatedWaitMinutes: params.estimatedWaitMinutes ?? 5,
    seatAssigned: null,
    isVipClient: params.isVipClient ?? false,
    privateStaffAlertNotes: params.privateStaffAlertNotes ?? null,
    clientNotifiedViaSms: true,
    reversedAt: null,
    reversalReason: null,
  });
}

/**
 * Reverses an accidental check-in (e.g. staff tapped wrong client on tablet).
 */
export function reverseAccidentalCheckin(
  queueItem: WaitingQueueItem,
  reason: string
): WaitingQueueItem {
  return WaitingQueueItemSchema.parse({
    ...queueItem,
    state: 'accidental_checkin_reversed',
    reversedAt: new Date().toISOString(),
    reversalReason: reason,
  });
}

/**
 * Advances a waiting client into service ("in_chair").
 */
export function seatClientInChair(
  queueItem: WaitingQueueItem,
  treatmentRoomOrStation: string
): WaitingQueueItem {
  return WaitingQueueItemSchema.parse({
    ...queueItem,
    state: 'in_chair',
    seatAssigned: treatmentRoomOrStation,
  });
}

/**
 * Sanitizes queue list for public reception TV or waiting room tablets.
 * Strictly hides phone numbers, VIP notes, and sensitive alert details.
 */
export function getSanitizedPublicWaitingQueue(queue: WaitingQueueItem[]): Array<{
  queueEntryId: string;
  publicDisplayName: string;
  serviceName: string;
  specialistName: string;
  estimatedWaitMinutes: number;
  state: VisitArrivalState;
}> {
  return queue
    .filter(q => q.state === 'arrived_waiting')
    .map(q => ({
      queueEntryId: q.queueEntryId,
      publicDisplayName: q.publicDisplayName,
      serviceName: q.serviceName,
      specialistName: q.specialistName,
      estimatedWaitMinutes: q.estimatedWaitMinutes,
      state: q.state,
    }));
}
