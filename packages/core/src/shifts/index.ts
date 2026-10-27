import { z } from 'zod';

export const ShiftStatusSchema = z.enum([
  'scheduled',
  'coverage_requested',
  'swapped',
  'canceled',
]);

export type ShiftStatus = z.infer<typeof ShiftStatusSchema>;

export const StaffShiftSchema = z.object({
  id: z.string().uuid(),
  staffId: z.string().uuid(),
  staffName: z.string().min(1),
  locationId: z.string().uuid(),
  shiftDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD format required'),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'HH:mm format required'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'HH:mm format required'),
  roleOrSkillTags: z.array(z.string()).default([]),
  status: ShiftStatusSchema.default('scheduled'),
  coverageRequestedByStaffId: z.string().uuid().optional(),
  coverageReplacementStaffId: z.string().uuid().optional(),
  coverageReason: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type StaffShift = z.infer<typeof StaffShiftSchema>;

export interface ShiftConflictedAppointment {
  appointmentId: string;
  clientName: string;
  serviceName: string;
  scheduledTime: string;
}

/**
 * Creates a scheduled staff shift.
 */
export function createStaffShift(params: {
  id?: string;
  staffId: string;
  staffName: string;
  locationId: string;
  shiftDate: string;
  startTime: string;
  endTime: string;
  roleOrSkillTags?: string[];
}): StaffShift {
  const now = new Date().toISOString();
  return StaffShiftSchema.parse({
    id: params.id || '10101010-0000-0000-0000-000000000054',
    staffId: params.staffId,
    staffName: params.staffName,
    locationId: params.locationId,
    shiftDate: params.shiftDate,
    startTime: params.startTime,
    endTime: params.endTime,
    roleOrSkillTags: params.roleOrSkillTags || [],
    status: 'scheduled',
    createdAt: now,
    updatedAt: now,
  });
}

/**
 * Requests shift coverage or a shift swap.
 */
export function requestShiftCoverage(params: {
  shift: StaffShift;
  requestingStaffId: string;
  reason: string;
  proposedReplacementStaffId?: string;
}): StaffShift {
  const now = new Date().toISOString();
  return StaffShiftSchema.parse({
    ...params.shift,
    status: 'coverage_requested',
    coverageRequestedByStaffId: params.requestingStaffId,
    coverageReplacementStaffId: params.proposedReplacementStaffId,
    coverageReason: params.reason,
    updatedAt: now,
  });
}

/**
 * Safely cancels or shortens a staff shift.
 * CRITICAL INVARIANT (F054): A staff shift change CANNOT silently cancel client commitments!
 * If there are client appointments booked during the shift, canceling the shift requires
 * explicit re-assignment triage rather than dropping client visits into thin air.
 */
export function cancelStaffShiftWithSafetyCheck(params: {
  shift: StaffShift;
  appointmentsOnShift: ShiftConflictedAppointment[];
  forceOverrideWithUnassignedTriage?: boolean;
}): {
  canceledShift?: StaffShift;
  conflictedAppointments: ShiftConflictedAppointment[];
  blockedReason?: string;
} {
  const activeBookings = params.appointmentsOnShift;

  if (activeBookings.length > 0 && !params.forceOverrideWithUnassignedTriage) {
    return {
      conflictedAppointments: activeBookings,
      blockedReason: `Cannot cancel shift for ${params.shift.staffName}: ${activeBookings.length} client appointment(s) are booked during this shift. Reassign staff or reschedule clients before canceling.`,
    };
  }

  const now = new Date().toISOString();
  const canceledShift = StaffShiftSchema.parse({
    ...params.shift,
    status: 'canceled',
    updatedAt: now,
  });

  return {
    canceledShift,
    conflictedAppointments: activeBookings,
  };
}
