import { z } from 'zod';
import { doIntervalsOverlap } from '../booking_engine';

export const ResourceTypeSchema = z.enum([
  'treatment_room',
  'styling_chair',
  'wash_basin',
  'laser_device',
  'facial_machine',
  'body_sculptor',
  'nail_station',
]);
export type ResourceType = z.infer<typeof ResourceTypeSchema>;

export const SalonResourceSchema = z.object({
  resourceId: z.string(),
  tenantId: z.string(),
  name: z.string(),
  type: ResourceTypeSchema,
  turnaroundCleanupMinutes: z.number().nonnegative().default(10), // mandatory disinfection & reset window
  isActive: z.boolean().default(true),
  locationId: z.string().optional(),
});
export type SalonResource = z.infer<typeof SalonResourceSchema>;

export const ResourceReservationSchema = z.object({
  reservationId: z.string(),
  tenantId: z.string(),
  resourceId: z.string(),
  resourceName: z.string(),
  appointmentId: z.string(),
  serviceName: z.string(),
  practitionerId: z.string(),
  serviceStartTime: z.string().datetime(),
  serviceEndTime: z.string().datetime(),
  totalBlockedUntil: z.string().datetime(), // serviceEndTime + turnaroundCleanupMinutes
  cleanupMinutes: z.number().nonnegative(),
  status: z.enum(['active', 'completed', 'cancelled']),
  createdAt: z.string().datetime(),
});
export type ResourceReservation = z.infer<typeof ResourceReservationSchema>;

/**
 * Checks whether an exclusive salon resource is available for the desired window + required cleanup.
 */
export function isResourceAvailable(params: {
  resource: SalonResource;
  desiredStart: string;
  serviceDurationMinutes: number;
  existingReservations: ResourceReservation[];
}): { available: true } | { available: false; conflictReason: string } {
  if (!params.resource.isActive) {
    return {
      available: false,
      conflictReason: `Resource "${params.resource.name}" is currently marked inactive or under maintenance.`,
    };
  }

  const requestedStart = new Date(params.desiredStart);
  // Total blocked window includes the service plus mandatory disinfection cleanup
  const totalBlockedEnd = new Date(
    requestedStart.getTime() + (params.serviceDurationMinutes + params.resource.turnaroundCleanupMinutes) * 60 * 1000
  );

  const conflict = params.existingReservations.find((res) => {
    if (res.tenantId === params.resource.tenantId && res.resourceId === params.resource.resourceId && res.status === 'active') {
      // res.serviceStartTime to res.totalBlockedUntil
      return doIntervalsOverlap(
        requestedStart.toISOString(),
        totalBlockedEnd.toISOString(),
        res.serviceStartTime,
        res.totalBlockedUntil
      );
    }
    return false;
  });

  if (conflict) {
    return {
      available: false,
      conflictReason: `Resource "${params.resource.name}" is reserved for "${conflict.serviceName}" until ${conflict.totalBlockedUntil} (including ${conflict.cleanupMinutes}m sanitization buffer).`,
    };
  }

  return { available: true };
}

/**
 * Atomically reserves multiple exclusive resources (e.g. room + machine) for an appointment.
 * Guarantees all-or-nothing: if any single required resource has a conflict, none are reserved.
 */
export function reserveAppointmentResources(params: {
  tenantId: string;
  appointmentId: string;
  serviceName: string;
  practitionerId: string;
  startTime: string;
  durationMinutes: number;
  requiredResources: SalonResource[];
  existingReservations: ResourceReservation[];
  currentTime?: string;
}): { success: true; reservations: ResourceReservation[] } | { success: false; reason: string; conflictingResource?: string } {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();

  // 1. Verify availability of every required resource
  for (const resource of params.requiredResources) {
    const check = isResourceAvailable({
      resource,
      desiredStart: params.startTime,
      serviceDurationMinutes: params.durationMinutes,
      existingReservations: params.existingReservations,
    });

    if (!check.available) {
      return {
        success: false,
        reason: check.conflictReason,
        conflictingResource: resource.name,
      };
    }
  }

  // 2. Commit reservations for all required resources
  const serviceStart = new Date(params.startTime);
  const serviceEnd = new Date(serviceStart.getTime() + params.durationMinutes * 60 * 1000);

  const newReservations: ResourceReservation[] = params.requiredResources.map((res) => {
    const totalBlocked = new Date(serviceEnd.getTime() + res.turnaroundCleanupMinutes * 60 * 1000);
    return {
      reservationId: `res_${Math.random().toString(36).substring(2, 9)}`,
      tenantId: params.tenantId,
      resourceId: res.resourceId,
      resourceName: res.name,
      appointmentId: params.appointmentId,
      serviceName: params.serviceName,
      practitionerId: params.practitionerId,
      serviceStartTime: serviceStart.toISOString(),
      serviceEndTime: serviceEnd.toISOString(),
      totalBlockedUntil: totalBlocked.toISOString(),
      cleanupMinutes: res.turnaroundCleanupMinutes,
      status: 'active',
      createdAt: now.toISOString(),
    };
  });

  return {
    success: true,
    reservations: newReservations,
  };
}

/**
 * Releases or cancels reservations associated with an appointment.
 */
export function cancelResourceReservations(
  appointmentId: string,
  reservations: ResourceReservation[]
): ResourceReservation[] {
  return reservations.map((res) => {
    if (res.appointmentId === appointmentId && res.status === 'active') {
      return { ...res, status: 'cancelled' };
    }
    return res;
  });
}
