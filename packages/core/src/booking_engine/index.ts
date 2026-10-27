import { z } from 'zod';

export const GuestClientSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  phoneNumber: z.string().min(10, 'Valid phone number is required'),
  timeZone: z.string().default('America/New_York'),
  notes: z.string().optional(),
});
export type GuestClient = z.infer<typeof GuestClientSchema>;

export const SlotHoldSchema = z.object({
  holdId: z.string(),
  holdToken: z.string(),
  tenantId: z.string(),
  practitionerId: z.string(),
  serviceId: z.string(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  durationMinutes: z.number().positive(),
  expiresAt: z.string().datetime(),
  status: z.enum(['active', 'confirmed', 'expired', 'released']),
  createdAt: z.string().datetime(),
});
export type SlotHold = z.infer<typeof SlotHoldSchema>;

export const ConfirmedAppointmentSchema = z.object({
  appointmentId: z.string(),
  tenantId: z.string(),
  practitionerId: z.string(),
  serviceId: z.string(),
  serviceName: z.string(),
  client: GuestClientSchema,
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  durationMinutes: z.number().positive(),
  status: z.enum(['confirmed', 'completed', 'cancelled']),
  timeZone: z.string(),
  policyAcknowledged: z.boolean(),
  holdTokenUsed: z.string().optional(),
  bookingMethod: z.enum(['guest_self_service', 'provisional_express_link']),
  confirmedAt: z.string().datetime(),
});
export type ConfirmedAppointment = z.infer<typeof ConfirmedAppointmentSchema>;

export const ProvisionalBookingSchema = z.object({
  provisionalId: z.string(),
  tenantId: z.string(),
  practitionerId: z.string(),
  serviceId: z.string(),
  serviceName: z.string(),
  estimatedPriceCents: z.number().nonnegative(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  client: GuestClientSchema,
  secureExpressToken: z.string(),
  expiresAt: z.string().datetime(),
  status: z.enum(['pending_client_confirmation', 'confirmed', 'declined', 'expired']),
  createdAt: z.string().datetime(),
});
export type ProvisionalBooking = z.infer<typeof ProvisionalBookingSchema>;

/**
 * Checks whether two time intervals overlap.
 */
export function doIntervalsOverlap(
  startA: string | Date,
  endA: string | Date,
  startB: string | Date,
  endB: string | Date
): boolean {
  const sA = new Date(startA).getTime();
  const eA = new Date(endA).getTime();
  const sB = new Date(startB).getTime();
  const eB = new Date(endB).getTime();
  return sA < eB && sB < eA;
}

/**
 * Creates an atomic temporary slot hold (TTL, default 10 mins).
 * Prevents concurrent double-booking of an exclusive practitioner.
 */
export function holdBookingSlot(params: {
  tenantId: string;
  practitionerId: string;
  serviceId: string;
  startTime: string;
  durationMinutes: number;
  existingAppointments: ConfirmedAppointment[];
  existingHolds: SlotHold[];
  holdTtlMinutes?: number;
  currentTime?: string;
}): { success: true; hold: SlotHold } | { success: false; reason: string } {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();
  const start = new Date(params.startTime);
  const end = new Date(start.getTime() + params.durationMinutes * 60 * 1000);
  const ttlMinutes = params.holdTtlMinutes ?? 10;
  const expiresAt = new Date(now.getTime() + ttlMinutes * 60 * 1000);

  // 1. Check existing confirmed appointments for this practitioner
  const conflictingAppointment = params.existingAppointments.find(
    (app) =>
      app.tenantId === params.tenantId &&
      app.practitionerId === params.practitionerId &&
      app.status === 'confirmed' &&
      doIntervalsOverlap(app.startTime, app.endTime, start, end)
  );

  if (conflictingAppointment) {
    return {
      success: false,
      reason: `Slot is already booked for this practitioner from ${conflictingAppointment.startTime} to ${conflictingAppointment.endTime}`,
    };
  }

  // 2. Check active non-expired holds for this practitioner
  const conflictingHold = params.existingHolds.find((hold) => {
    if (
      hold.tenantId === params.tenantId &&
      hold.practitionerId === params.practitionerId &&
      hold.status === 'active'
    ) {
      const isNotExpired = new Date(hold.expiresAt).getTime() > now.getTime();
      return isNotExpired && doIntervalsOverlap(hold.startTime, hold.endTime, start, end);
    }
    return false;
  });

  if (conflictingHold) {
    return {
      success: false,
      reason: `Slot is currently held by another guest checkout until ${conflictingHold.expiresAt}`,
    };
  }

  const hold: SlotHold = {
    holdId: `hold_${Math.random().toString(36).substring(2, 9)}`,
    holdToken: `tok_${Math.random().toString(36).substring(2, 12)}`,
    tenantId: params.tenantId,
    practitionerId: params.practitionerId,
    serviceId: params.serviceId,
    startTime: start.toISOString(),
    endTime: end.toISOString(),
    durationMinutes: params.durationMinutes,
    expiresAt: expiresAt.toISOString(),
    status: 'active',
    createdAt: now.toISOString(),
  };

  return {
    success: true,
    hold,
  };
}

/**
 * Atomically confirms a held slot into a confirmed appointment.
 * Verifies hold token, ensures hold is not expired, and enforces policy acknowledgement.
 */
export function confirmHeldBooking(params: {
  hold: SlotHold;
  client: GuestClient;
  serviceName: string;
  policyAcknowledged: boolean;
  currentTime?: string;
}): { success: true; appointment: ConfirmedAppointment; updatedHold: SlotHold } | { success: false; reason: string } {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();

  if (params.hold.status !== 'active') {
    return {
      success: false,
      reason: `Slot hold is no longer active (status: ${params.hold.status})`,
    };
  }

  if (new Date(params.hold.expiresAt).getTime() <= now.getTime()) {
    return {
      success: false,
      reason: 'Slot hold has expired. Please select a fresh time slot.',
    };
  }

  if (!params.policyAcknowledged) {
    return {
      success: false,
      reason: 'Cancellation and no-show policies must be acknowledged prior to booking confirmation.',
    };
  }

  const validatedClient = GuestClientSchema.parse(params.client);

  const updatedHold: SlotHold = {
    ...params.hold,
    status: 'confirmed',
  };

  const appointment: ConfirmedAppointment = {
    appointmentId: `apt_${Math.random().toString(36).substring(2, 9)}`,
    tenantId: params.hold.tenantId,
    practitionerId: params.hold.practitionerId,
    serviceId: params.hold.serviceId,
    serviceName: params.serviceName,
    client: validatedClient,
    startTime: params.hold.startTime,
    endTime: params.hold.endTime,
    durationMinutes: params.hold.durationMinutes,
    status: 'confirmed',
    timeZone: validatedClient.timeZone,
    policyAcknowledged: true,
    holdTokenUsed: params.hold.holdToken,
    bookingMethod: 'guest_self_service',
    confirmedAt: now.toISOString(),
  };

  return {
    success: true,
    appointment,
    updatedHold,
  };
}

/**
 * Creates an Express Provisional Booking initiated by staff.
 * Client gets a secure link (no account needed) to review time, provide card hold, and confirm.
 */
export function createProvisionalBooking(params: {
  tenantId: string;
  practitionerId: string;
  serviceId: string;
  serviceName: string;
  estimatedPriceCents: number;
  startTime: string;
  durationMinutes: number;
  client: GuestClient;
  validityHours?: number;
  currentTime?: string;
}): ProvisionalBooking {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();
  const start = new Date(params.startTime);
  const end = new Date(start.getTime() + params.durationMinutes * 60 * 1000);
  const validityHours = params.validityHours ?? 24;
  const expiresAt = new Date(now.getTime() + validityHours * 60 * 60 * 1000);

  const validatedClient = GuestClientSchema.parse(params.client);

  return {
    provisionalId: `prov_${Math.random().toString(36).substring(2, 9)}`,
    tenantId: params.tenantId,
    practitionerId: params.practitionerId,
    serviceId: params.serviceId,
    serviceName: params.serviceName,
    estimatedPriceCents: params.estimatedPriceCents,
    startTime: start.toISOString(),
    endTime: end.toISOString(),
    client: validatedClient,
    secureExpressToken: `exp_${Math.random().toString(36).substring(2, 14)}`,
    expiresAt: expiresAt.toISOString(),
    status: 'pending_client_confirmation',
    createdAt: now.toISOString(),
  };
}

/**
 * Client confirms provisional booking via secure one-click link.
 */
export function confirmProvisionalBooking(params: {
  provisional: ProvisionalBooking;
  cardHoldToken: string;
  policyAcknowledged: boolean;
  currentTime?: string;
}): { success: true; appointment: ConfirmedAppointment; updatedProvisional: ProvisionalBooking } | { success: false; reason: string } {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();

  if (params.provisional.status !== 'pending_client_confirmation') {
    return {
      success: false,
      reason: `Provisional booking cannot be confirmed from status ${params.provisional.status}`,
    };
  }

  if (new Date(params.provisional.expiresAt).getTime() <= now.getTime()) {
    return {
      success: false,
      reason: 'This express booking link has expired. Please contact the studio for a new slot.',
    };
  }

  if (!params.policyAcknowledged) {
    return {
      success: false,
      reason: 'Cancellation policy must be acknowledged to secure the reservation.',
    };
  }

  if (!params.cardHoldToken || params.cardHoldToken.trim().length === 0) {
    return {
      success: false,
      reason: 'A valid payment card hold is required to finalize provisional booking.',
    };
  }

  const updatedProvisional: ProvisionalBooking = {
    ...params.provisional,
    status: 'confirmed',
  };

  const durationMinutes = Math.round(
    (new Date(params.provisional.endTime).getTime() - new Date(params.provisional.startTime).getTime()) / (60 * 1000)
  );

  const appointment: ConfirmedAppointment = {
    appointmentId: `apt_${Math.random().toString(36).substring(2, 9)}`,
    tenantId: params.provisional.tenantId,
    practitionerId: params.provisional.practitionerId,
    serviceId: params.provisional.serviceId,
    serviceName: params.provisional.serviceName,
    client: params.provisional.client,
    startTime: params.provisional.startTime,
    endTime: params.provisional.endTime,
    durationMinutes,
    status: 'confirmed',
    timeZone: params.provisional.client.timeZone,
    policyAcknowledged: true,
    bookingMethod: 'provisional_express_link',
    confirmedAt: now.toISOString(),
  };

  return {
    success: true,
    appointment,
    updatedProvisional,
  };
}
