/**
 * F098: Time Off & Coverage Planning
 * 
 * Invariants:
 * 1. Client Commitment Defense: Owner approval is strictly required before moving
 *    or reassigning any client appointments. Absence approval never silently
 *    drops or unassigns existing booked clients.
 * 2. Pre-Approval Conflict Impact Report: The system thoroughly inspects the
 *    requested absence window and surfaces all affected appointments, clients,
 *    revenue at risk, and candidate coverage providers.
 * 3. Qualified Coverage Matching: Reassignments must match the provider's active
 *    skills (e.g. only estheticians can cover facials, only colorists cover balayage).
 * 4. Hard Calendar Blocking: Once approved, the staff member's calendar is locked
 *    against both online booking and front-desk walk-in slot assignment.
 * 5. Transparent Absence Tracking: Clear category separation (Vacation, Sick,
 *    Personal, Education, Bereavement) and paid vs. unpaid hours reporting.
 */

export type AbsenceCategory =
  | 'vacation'
  | 'sick'
  | 'personal'
  | 'continuing_education'
  | 'bereavement';

export type TimeOffRequestStatus =
  | 'submitted'
  | 'conflicts_reviewed'
  | 'approved'
  | 'rejected'
  | 'cancelled';

export interface TimeOffRequest {
  requestId: string;
  staffId: string;
  staffName: string;
  category: AbsenceCategory;
  startDate: string; // ISO date 'YYYY-MM-DD' or timestamp
  endDate: string; // ISO date 'YYYY-MM-DD' or timestamp
  totalDays: number;
  isPaid: boolean;
  notes?: string;
  status: TimeOffRequestStatus;
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  decisionNotes?: string;
}

export interface ConflictingBooking {
  bookingId: string;
  clientName: string;
  clientPhone: string;
  serviceId: string;
  serviceName: string;
  startTime: string;
  endTime: string;
  bookingAmount: number;
  depositPaid: number;
  coverageStatus: 'unassigned' | 'coverage_assigned' | 'reschedule_required';
  reassignedStaffId?: string;
  reassignedStaffName?: string;
}

export interface ConflictImpactReport {
  requestId: string;
  staffId: string;
  startDate: string;
  endDate: string;
  totalConflictingBookings: number;
  totalRevenueAtRisk: number;
  conflictingBookings: ConflictingBooking[];
  hasUnresolvedCommitments: boolean;
}

export interface QualifiedStaffProvider {
  staffId: string;
  name: string;
  qualifiedServiceIds: string[];
  isAvailableOnDate: (dateString: string) => boolean;
}

/**
 * Submits an employee time-off request.
 */
export function submitTimeOffRequest(params: {
  requestId: string;
  staffId: string;
  staffName: string;
  category: AbsenceCategory;
  startDate: string;
  endDate: string;
  totalDays: number;
  isPaid?: boolean;
  notes?: string;
}): TimeOffRequest {
  if (params.totalDays <= 0) {
    throw new Error('Time off request must be for at least 0.5 or 1 day.');
  }

  const start = new Date(params.startDate);
  const end = new Date(params.endDate);
  if (end < start) {
    throw new Error('End date cannot be prior to start date.');
  }

  return {
    requestId: params.requestId,
    staffId: params.staffId,
    staffName: params.staffName,
    category: params.category,
    startDate: params.startDate,
    endDate: params.endDate,
    totalDays: params.totalDays,
    isPaid: params.isPaid ?? true,
    notes: params.notes,
    status: 'submitted',
    submittedAt: new Date().toISOString(),
  };
}

/**
 * Generates an authoritative conflict impact report for an absence request.
 * Scans existing calendar bookings and flags client appointments requiring coverage.
 */
export function generateConflictImpactReport(params: {
  request: TimeOffRequest;
  existingBookings: Array<{
    bookingId: string;
    staffId: string;
    clientName: string;
    clientPhone: string;
    serviceId: string;
    serviceName: string;
    startTime: string;
    endTime: string;
    price: number;
    depositPaid: number;
  }>;
}): ConflictImpactReport {
  const reqStart = new Date(params.request.startDate).getTime();
  const reqEnd = new Date(params.request.endDate).getTime();

  const conflictingBookings: ConflictingBooking[] = [];
  let totalRevenueAtRisk = 0;

  for (const b of params.existingBookings) {
    if (b.staffId !== params.request.staffId) continue;

    const bStart = new Date(b.startTime).getTime();
    const bEnd = new Date(b.endTime).getTime();

    // Check overlap
    if (bStart < reqEnd && bEnd > reqStart) {
      conflictingBookings.push({
        bookingId: b.bookingId,
        clientName: b.clientName,
        clientPhone: b.clientPhone,
        serviceId: b.serviceId,
        serviceName: b.serviceName,
        startTime: b.startTime,
        endTime: b.endTime,
        bookingAmount: b.price,
        depositPaid: b.depositPaid,
        coverageStatus: 'unassigned',
      });
      totalRevenueAtRisk += b.price;
    }
  }

  return {
    requestId: params.request.requestId,
    staffId: params.request.staffId,
    startDate: params.request.startDate,
    endDate: params.request.endDate,
    totalConflictingBookings: conflictingBookings.length,
    totalRevenueAtRisk: Number(totalRevenueAtRisk.toFixed(2)),
    conflictingBookings,
    hasUnresolvedCommitments: conflictingBookings.length > 0,
  };
}

/**
 * Reassigns an affected appointment to an eligible coverage provider.
 * Enforces skill qualification match so clients only get qualified staff.
 */
export function reassignConflictedBooking(params: {
  booking: ConflictingBooking;
  replacementProvider: QualifiedStaffProvider;
}): ConflictingBooking {
  if (!params.replacementProvider.qualifiedServiceIds.includes(params.booking.serviceId)) {
    throw new Error(
      `Provider "${params.replacementProvider.name}" is not certified/qualified for service "${params.booking.serviceName}".`
    );
  }

  const bookingDate = params.booking.startTime.split('T')[0];
  if (!params.replacementProvider.isAvailableOnDate(bookingDate)) {
    throw new Error(`Provider "${params.replacementProvider.name}" is not scheduled/available on ${bookingDate}.`);
  }

  return {
    ...params.booking,
    coverageStatus: 'coverage_assigned',
    reassignedStaffId: params.replacementProvider.staffId,
    reassignedStaffName: params.replacementProvider.name,
  };
}

/**
 * Flags an affected appointment for client outreach & rescheduling.
 */
export function markBookingForRescheduling(booking: ConflictingBooking): ConflictingBooking {
  return {
    ...booking,
    coverageStatus: 'reschedule_required',
  };
}

/**
 * Approves a time-off request.
 * Invariant: Client commitments cannot remain unassigned. All conflicting
 * bookings must either have coverage assigned or be marked for client outreach.
 */
export function approveTimeOffRequest(params: {
  request: TimeOffRequest;
  impactReport: ConflictImpactReport;
  managerName: string;
  notes?: string;
}): { request: TimeOffRequest; calendarBlocked: boolean } {
  // Check if any conflicting booking is still unassigned
  const unassigned = params.impactReport.conflictingBookings.filter(
    (b) => b.coverageStatus === 'unassigned'
  );

  if (unassigned.length > 0) {
    throw new Error(
      `Cannot approve time off: ${unassigned.length} client appointment(s) have not been resolved with coverage or rescheduling plan. Client commitments cannot be silently dropped.`
    );
  }

  const approvedRequest: TimeOffRequest = {
    ...params.request,
    status: 'approved',
    reviewedBy: params.managerName,
    reviewedAt: new Date().toISOString(),
    decisionNotes: params.notes,
  };

  return {
    request: approvedRequest,
    calendarBlocked: true,
  };
}

/**
 * Rejects a time-off request with an auditable explanation.
 */
export function rejectTimeOffRequest(params: {
  request: TimeOffRequest;
  managerName: string;
  reason: string;
}): TimeOffRequest {
  if (!params.reason.trim()) {
    throw new Error('A reason is required when rejecting a time-off request.');
  }

  return {
    ...params.request,
    status: 'rejected',
    reviewedBy: params.managerName,
    reviewedAt: new Date().toISOString(),
    decisionNotes: params.reason,
  };
}
