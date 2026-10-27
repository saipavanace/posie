/**
 * F193: Leave-By Appointment Constraint
 *
 * Allows clients to specify a strict departure deadline (e.g. "I must leave by 1:30 PM").
 * Calculates the required treatment stage chain (consultation, hands-on, processing, finishing, checkout),
 * reserves required post-departure station cleanup buffers against salon staff,
 * and declines start times where completion exceeds the stated hard deadline.
 */

export interface ServiceStageBreakdown {
  consultationMinutes: number;
  handsOnTreatmentMinutes: number;
  processingMinutes: number; // e.g. chemical developer or mask dwell
  finishingMinutes: number; // styling or post-treatment wrap
  checkoutMinutes: number;
  postDepartureCleanupMinutes: number; // Reserved staff cleanup buffer
}

export interface LeaveByConstraintRequest {
  serviceId: string;
  serviceName: string;
  candidateStartTime: string; // HH:MM (e.g. "12:00")
  clientMustLeaveBy: string; // HH:MM (e.g. "13:30")
  stages: ServiceStageBreakdown;
}

export interface LeaveByScheduleEvaluation {
  isFeasible: boolean;
  serviceId: string;
  serviceName: string;
  candidateStartTime: string;
  clientMustLeaveBy: string;
  totalClientDurationMinutes: number;
  projectedClientDepartureTime: string;
  spareBufferMinutesBeforeDeadline: number;
  staffStationReleaseTime: string;
  totalStaffOccupancyMinutes: number;
  status: 'feasible' | 'infeasible_exceeds_deadline';
  explanation: string;
}

/**
 * Helper to parse "HH:MM" into total minutes from midnight.
 */
function parseTimeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

/**
 * Helper to format total minutes from midnight back to "HH:MM".
 */
function formatMinutesToTime(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60) % 24;
  const m = totalMinutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

/**
 * Evaluates whether an appointment start time strictly honors the client's hard departure deadline.
 * Invariant: Fits all stages within the window; reserves cleanup buffer against staff AFTER client departure;
 * declines infeasible combinations and explicitly states that estimates do not guarantee against unexpected clinical overruns.
 */
export function evaluateLeaveByConstraint(request: LeaveByConstraintRequest): LeaveByScheduleEvaluation {
  const { stages, candidateStartTime, clientMustLeaveBy, serviceId, serviceName } = request;

  const clientDurationMinutes =
    stages.consultationMinutes +
    stages.handsOnTreatmentMinutes +
    stages.processingMinutes +
    stages.finishingMinutes +
    stages.checkoutMinutes;

  const startMinutes = parseTimeToMinutes(candidateStartTime);
  const deadlineMinutes = parseTimeToMinutes(clientMustLeaveBy);

  const projectedDepartureMinutes = startMinutes + clientDurationMinutes;
  const spareBufferMinutes = deadlineMinutes - projectedDepartureMinutes;

  const staffReleaseMinutes = projectedDepartureMinutes + stages.postDepartureCleanupMinutes;
  const totalStaffMinutes = clientDurationMinutes + stages.postDepartureCleanupMinutes;

  const isFeasible = projectedDepartureMinutes <= deadlineMinutes;

  const explanation = isFeasible
    ? `Feasible: Scheduled completion at ${formatMinutesToTime(projectedDepartureMinutes)} provides ${spareBufferMinutes}m cushion before client's ${clientMustLeaveBy} deadline. Station cleanup reserved until ${formatMinutesToTime(staffReleaseMinutes)}.`
    : `Infeasible: Treatment requires ${clientDurationMinutes}m, finishing at ${formatMinutesToTime(projectedDepartureMinutes)}, which exceeds the client's strict ${clientMustLeaveBy} departure deadline by ${Math.abs(spareBufferMinutes)}m.`;

  return {
    isFeasible,
    serviceId,
    serviceName,
    candidateStartTime,
    clientMustLeaveBy,
    totalClientDurationMinutes: clientDurationMinutes,
    projectedClientDepartureTime: formatMinutesToTime(projectedDepartureMinutes),
    spareBufferMinutesBeforeDeadline: spareBufferMinutes,
    staffStationReleaseTime: formatMinutesToTime(staffReleaseMinutes),
    totalStaffOccupancyMinutes: totalStaffMinutes,
    status: isFeasible ? 'feasible' : 'infeasible_exceeds_deadline',
    explanation,
  };
}
