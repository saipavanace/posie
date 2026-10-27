/**
 * Posie Core Engine - Staff Coverage Exchanges (F164)
 *
 * Implements governed shift coverage requests, qualification verification,
 * assignment-limited client access, and clear compensation rules.
 *
 * Domain Invariant (Basis: Expansion (X); LEG OPS NET, WB F164, Rule F164, Table 105):
 * Shift coverage invites qualified colleagues or vetted substitute practitioners
 * to cover shifts without exposing the salon's full client database or unassigned schedules.
 * Substitutes must satisfy service qualification prerequisites. Access is strictly
 * restricted to the clients, formulas, and timing of the specific covered shift.
 * Compensation rules (commission split, tip pass-through) are clearly defined upfront.
 */

export interface ShiftAppointmentSummary {
  appointmentId: string;
  clientId: string;
  clientName: string;
  serviceId: string;
  serviceName: string;
  startTime: string;
  endTime: string;
  requiredQualificationTitle?: string;
}

export interface ShiftCoverageRequest {
  requestId: string;
  requestingStaffId: string;
  requestingStaffName: string;
  date: string; // YYYY-MM-DD
  shiftStartTime: string;
  shiftEndTime: string;
  appointments: ShiftAppointmentSummary[];
  compensationTerms: {
    serviceCommissionPercentage: number;
    tipsPaidDirectToSubstitute: boolean;
    hourlyBaseRate?: number;
  };
  status: 'open' | 'claimed' | 'approved' | 'cancelled';
  requiresManagerApproval: boolean;
}

export interface SubstituteCandidate {
  staffId: string;
  staffName: string;
  employmentType: 'internal_peer' | 'approved_external_substitute';
  activeQualifications: string[]; // List of credential titles (from F162)
}

export interface ShiftCoverageAssignment {
  assignmentId: string;
  requestId: string;
  originalStaffId: string;
  substituteStaffId: string;
  substituteStaffName: string;
  shiftDate: string;
  shiftStartTime: string;
  shiftEndTime: string;
  coveredAppointmentIds: string[];
  coveredClientIds: string[];
  status: 'active' | 'completed' | 'revoked';
  managerApprovedAt?: string;
  assignedAt: string;
}

/**
 * Creates an open shift coverage request.
 */
export function createShiftCoverageRequest(input: {
  requestId: string;
  requestingStaffId: string;
  requestingStaffName: string;
  date: string;
  shiftStartTime: string;
  shiftEndTime: string;
  appointments: ShiftAppointmentSummary[];
  compensationTerms: ShiftCoverageRequest['compensationTerms'];
  requiresManagerApproval?: boolean;
}): ShiftCoverageRequest {
  if (!input.appointments || input.appointments.length === 0) {
    throw new Error('Shift coverage request requires at least one assigned appointment or duty slot.');
  }

  return {
    requestId: input.requestId,
    requestingStaffId: input.requestingStaffId,
    requestingStaffName: input.requestingStaffName,
    date: input.date,
    shiftStartTime: input.shiftStartTime,
    shiftEndTime: input.shiftEndTime,
    appointments: input.appointments,
    compensationTerms: input.compensationTerms,
    status: 'open',
    requiresManagerApproval: input.requiresManagerApproval ?? true,
  };
}

/**
 * Validates candidate qualifications against shift services and accepts coverage.
 */
export function acceptShiftCoverage(
  request: ShiftCoverageRequest,
  candidate: SubstituteCandidate,
  managerApproved: boolean = false
): ShiftCoverageAssignment {
  if (request.status !== 'open') {
    throw new Error(`Cannot accept shift coverage in status "${request.status}".`);
  }

  if (candidate.staffId === request.requestingStaffId) {
    throw new Error('Requesting practitioner cannot cover their own shift.');
  }

  // Verify candidate holds all required qualifications for the appointments in this shift
  for (const appt of request.appointments) {
    if (appt.requiredQualificationTitle) {
      const hasQual = candidate.activeQualifications.some(
        (q) => q.toLowerCase() === appt.requiredQualificationTitle!.toLowerCase()
      );
      if (!hasQual) {
        throw new Error(
          `Candidate ${candidate.staffName} lacks required qualification "${appt.requiredQualificationTitle}" for appointment ${appt.appointmentId} (${appt.serviceName}).`
        );
      }
    }
  }

  if (request.requiresManagerApproval && !managerApproved) {
    // If manager approval is required and not yet provided
    request.status = 'claimed';
  } else {
    request.status = 'approved';
  }

  return {
    assignmentId: `asgn_${request.requestId}_${candidate.staffId}`,
    requestId: request.requestId,
    originalStaffId: request.requestingStaffId,
    substituteStaffId: candidate.staffId,
    substituteStaffName: candidate.staffName,
    shiftDate: request.date,
    shiftStartTime: request.shiftStartTime,
    shiftEndTime: request.shiftEndTime,
    coveredAppointmentIds: request.appointments.map((a) => a.appointmentId),
    coveredClientIds: request.appointments.map((a) => a.clientId),
    status: 'active',
    managerApprovedAt: managerApproved ? new Date().toISOString() : undefined,
    assignedAt: new Date().toISOString(),
  };
}

/**
 * Enforces least-privilege assignment-limited access for the substitute practitioner.
 * Access to the studio's full client list, financials, or unassigned schedules is blocked.
 */
export function verifySubstituteAccessScope(
  assignment: ShiftCoverageAssignment,
  request: {
    resourceType: 'shift_appointment' | 'full_client_database' | 'salon_financials' | 'other_staff_schedule';
    appointmentId?: string;
    clientId?: string;
  }
): { permitted: boolean; reason?: string } {
  if (assignment.status !== 'active') {
    return {
      permitted: false,
      reason: `Coverage assignment is ${assignment.status}; access revoked.`,
    };
  }

  // Deny broad database queries
  if (
    request.resourceType === 'full_client_database' ||
    request.resourceType === 'salon_financials' ||
    request.resourceType === 'other_staff_schedule'
  ) {
    return {
      permitted: false,
      reason: `Access restricted: Substitutes only have visibility into appointments and clients assigned to shift ${assignment.shiftDate}. Full database access is withheld.`,
    };
  }

  // Check specific appointment access
  if (request.resourceType === 'shift_appointment') {
    if (request.appointmentId && !assignment.coveredAppointmentIds.includes(request.appointmentId)) {
      return {
        permitted: false,
        reason: `Appointment ${request.appointmentId} is not assigned to this coverage shift.`,
      };
    }
    if (request.clientId && !assignment.coveredClientIds.includes(request.clientId)) {
      return {
        permitted: false,
        reason: `Client ${request.clientId} is not booked within this coverage shift.`,
      };
    }
  }

  return {
    permitted: true,
  };
}
