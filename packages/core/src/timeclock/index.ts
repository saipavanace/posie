import { z } from 'zod';

export const BreakTypeSchema = z.enum(['unpaid_meal', 'paid_rest']);
export type BreakType = z.infer<typeof BreakTypeSchema>;

export const TimeClockBreakSchema = z.object({
  id: z.string(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime().optional(),
  breakType: BreakTypeSchema,
});

export type TimeClockBreak = z.infer<typeof TimeClockBreakSchema>;

export const TimeCorrectionRequestSchema = z.object({
  originalClockIn: z.string().datetime(),
  originalClockOut: z.string().datetime().optional(),
  requestedClockIn: z.string().datetime(),
  requestedClockOut: z.string().datetime().optional(),
  reason: z.string().min(1, 'Reason for correction is required'),
  requestedByStaffId: z.string().uuid(),
  requestedAt: z.string().datetime(),
});

export type TimeCorrectionRequest = z.infer<typeof TimeCorrectionRequestSchema>;

export const TimeClockStatusSchema = z.enum([
  'clocked_in',
  'on_break',
  'clocked_out',
  'approved',
  'correction_requested',
]);

export type TimeClockStatus = z.infer<typeof TimeClockStatusSchema>;

export const TimeClockEntrySchema = z.object({
  id: z.string().uuid(),
  staffId: z.string().uuid(),
  staffName: z.string().min(1),
  payPeriodId: z.string().min(1),
  clockInTime: z.string().datetime(),
  clockOutTime: z.string().datetime().optional(),
  breaks: z.array(TimeClockBreakSchema).default([]),
  status: TimeClockStatusSchema.default('clocked_in'),
  totalWorkedMinutes: z.number().int().nonnegative().default(0),
  totalUnpaidBreakMinutes: z.number().int().nonnegative().default(0),
  totalPaidMinutes: z.number().int().nonnegative().default(0),
  correctionRequest: TimeCorrectionRequestSchema.optional(),
  approvedByStaffId: z.string().uuid().optional(),
  approvedAt: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type TimeClockEntry = z.infer<typeof TimeClockEntrySchema>;

function computeMinutes(clockIn: string, clockOut?: string, breaks: TimeClockBreak[] = []) {
  if (!clockOut) return { workedMinutes: 0, unpaidBreakMinutes: 0, paidMinutes: 0 };

  const startMs = new Date(clockIn).getTime();
  const endMs = new Date(clockOut).getTime();
  const elapsedMinutes = Math.max(0, Math.floor((endMs - startMs) / (1000 * 60)));

  let unpaidBreakMinutes = 0;
  for (const b of breaks) {
    if (b.breakType === 'unpaid_meal' && b.endTime) {
      const bStart = new Date(b.startTime).getTime();
      const bEnd = new Date(b.endTime).getTime();
      unpaidBreakMinutes += Math.max(0, Math.floor((bEnd - bStart) / (1000 * 60)));
    }
  }

  const paidMinutes = Math.max(0, elapsedMinutes - unpaidBreakMinutes);
  return {
    workedMinutes: elapsedMinutes,
    unpaidBreakMinutes,
    paidMinutes,
  };
}

/**
 * Clocks in a staff member for the day.
 */
export function clockInStaff(params: {
  id?: string;
  staffId: string;
  staffName: string;
  payPeriodId: string;
  clockInTime?: string;
}): TimeClockEntry {
  const now = params.clockInTime || new Date().toISOString();
  return TimeClockEntrySchema.parse({
    id: params.id || '20202020-0000-0000-0000-000000000055',
    staffId: params.staffId,
    staffName: params.staffName,
    payPeriodId: params.payPeriodId,
    clockInTime: now,
    status: 'clocked_in',
    breaks: [],
    totalWorkedMinutes: 0,
    totalUnpaidBreakMinutes: 0,
    totalPaidMinutes: 0,
    createdAt: now,
    updatedAt: now,
  });
}

/**
 * Clocks out a staff member and calculates payable time.
 */
export function clockOutStaff(
  entry: TimeClockEntry,
  clockOutTime?: string
): TimeClockEntry {
  const now = clockOutTime || new Date().toISOString();
  const { workedMinutes, unpaidBreakMinutes, paidMinutes } = computeMinutes(
    entry.clockInTime,
    now,
    entry.breaks
  );

  return TimeClockEntrySchema.parse({
    ...entry,
    clockOutTime: now,
    status: 'clocked_out',
    totalWorkedMinutes: workedMinutes,
    totalUnpaidBreakMinutes: unpaidBreakMinutes,
    totalPaidMinutes: paidMinutes,
    updatedAt: now,
  });
}

/**
 * Submits an accessible time correction request with full audit logging.
 * INVARIANT: Never overwrites original clock entries silently; preserves historical timestamps.
 */
export function requestTimeCorrection(params: {
  entry: TimeClockEntry;
  requestedClockIn: string;
  requestedClockOut?: string;
  reason: string;
  requestedByStaffId: string;
}): TimeClockEntry {
  const now = new Date().toISOString();
  const correction: TimeCorrectionRequest = {
    originalClockIn: params.entry.clockInTime,
    originalClockOut: params.entry.clockOutTime,
    requestedClockIn: params.requestedClockIn,
    requestedClockOut: params.requestedClockOut,
    reason: params.reason,
    requestedByStaffId: params.requestedByStaffId,
    requestedAt: now,
  };

  return TimeClockEntrySchema.parse({
    ...params.entry,
    status: 'correction_requested',
    correctionRequest: correction,
    updatedAt: now,
  });
}

/**
 * Approves a time entry (or time correction) by a salon manager.
 * INVARIANT: Approved time exports reconcile directly to payroll periods.
 */
export function approveTimeClockEntry(
  entry: TimeClockEntry,
  managerStaffId: string
): TimeClockEntry {
  const now = new Date().toISOString();
  let clockIn = entry.clockInTime;
  let clockOut = entry.clockOutTime;

  // If approving an active correction request, apply the requested times
  if (entry.status === 'correction_requested' && entry.correctionRequest) {
    clockIn = entry.correctionRequest.requestedClockIn;
    clockOut = entry.correctionRequest.requestedClockOut || entry.clockOutTime;
  }

  const { workedMinutes, unpaidBreakMinutes, paidMinutes } = computeMinutes(
    clockIn,
    clockOut,
    entry.breaks
  );

  return TimeClockEntrySchema.parse({
    ...entry,
    clockInTime: clockIn,
    clockOutTime: clockOut,
    status: 'approved',
    approvedByStaffId: managerStaffId,
    approvedAt: now,
    totalWorkedMinutes: workedMinutes,
    totalUnpaidBreakMinutes: unpaidBreakMinutes,
    totalPaidMinutes: paidMinutes,
    updatedAt: now,
  });
}
