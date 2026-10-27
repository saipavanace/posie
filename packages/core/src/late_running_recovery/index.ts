/**
 * Posie Core Engine - Late Running Recovery (F170)
 *
 * Implements in-progress appointment overrun detection, downstream schedule
 * impact calculation, buffer absorption, and staff-approved realistic arrival updates
 * with client recovery alternatives.
 *
 * Domain Invariant (Basis: Expansion (X); DATA MSG, WB F170, Rule F170, Table 90):
 * When an active treatment overruns its scheduled finish, the system computes the
 * net cascading delay across downstream appointments, absorbing buffer time where
 * possible. Staff review and approve realistic arrival updates before any message
 * is dispatched. Clients are offered clear, transparent recovery options: accept the
 * adjusted arrival time, reschedule with waived cancellation fees, or switch to an
 * available colleague.
 */

export interface DownstreamAppointment {
  appointmentId: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  scheduledStartTime: string; // e.g. "14:00"
  scheduledEndTime: string; // e.g. "15:00"
  serviceName: string;
  allocatedBufferMinutes: number; // e.g. 10 minutes between clients
}

export interface DownstreamDelayImpact {
  appointmentId: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  originalStartTime: string;
  suggestedStartTime: string;
  delayMinutes: number;
  bufferAbsorbedMinutes: number;
  proposedMessage: string;
  recoveryOptions: Array<'accept_delay' | 'reschedule_complimentary' | 'switch_to_available_peer'>;
}

export interface LateRunningRecoveryPlan {
  planId: string;
  practitionerId: string;
  currentOverrunMinutes: number;
  impactedAppointmentsCount: number;
  impacts: DownstreamDelayImpact[];
  requiresStaffApproval: boolean;
  status: 'draft_pending_staff' | 'approved_dispatched';
  createdAt: string;
}

export interface DispatchedArrivalNotification {
  notificationId: string;
  appointmentId: string;
  clientName: string;
  recipientPhone: string;
  messageText: string;
  suggestedStartTime: string;
  dispatchedAt: string;
  dispatchedBy: string;
  resolutionStatus: 'pending_client_reply' | 'accepted_delay' | 'rescheduled' | 'reassigned_peer';
}

function addMinutesToTimeString(timeStr: string, minutesToAdd: number): string {
  const [hours, mins] = timeStr.split(':').map(Number);
  const totalMins = hours * 60 + mins + minutesToAdd;
  const newHours = Math.floor(totalMins / 60) % 24;
  const newMins = totalMins % 60;
  return `${String(newHours).padStart(2, '0')}:${String(newMins).padStart(2, '0')}`;
}

/**
 * Evaluates the cascade of an active appointment overrun and generates
 * realistic arrival update proposals for upcoming downstream clients.
 */
export function evaluateLateRunningImpact(
  practitionerId: string,
  currentOverrunMinutes: number,
  upcomingAppointments: DownstreamAppointment[]
): LateRunningRecoveryPlan {
  if (currentOverrunMinutes <= 0) {
    throw new Error('Overrun minutes must be positive to trigger late-running recovery.');
  }

  let cumulativeDelay = currentOverrunMinutes;
  const impacts: DownstreamDelayImpact[] = [];

  for (const appt of upcomingAppointments) {
    // Absorb buffer time if available
    const bufferAbsorbed = Math.min(cumulativeDelay, appt.allocatedBufferMinutes);
    cumulativeDelay -= bufferAbsorbed;

    if (cumulativeDelay > 0) {
      const suggestedStartTime = addMinutesToTimeString(appt.scheduledStartTime, cumulativeDelay);
      const proposedMessage = `Hello ${appt.clientName}, we're currently perfecting our previous guest's service and running approximately ${cumulativeDelay} minutes behind. We'd love for you to arrive at ${suggestedStartTime} instead of ${appt.scheduledStartTime}; your favorite beverage awaits upon arrival!`;

      impacts.push({
        appointmentId: appt.appointmentId,
        clientId: appt.clientId,
        clientName: appt.clientName,
        clientPhone: appt.clientPhone,
        originalStartTime: appt.scheduledStartTime,
        suggestedStartTime,
        delayMinutes: cumulativeDelay,
        bufferAbsorbedMinutes: bufferAbsorbed,
        proposedMessage,
        recoveryOptions: ['accept_delay', 'reschedule_complimentary', 'switch_to_available_peer'],
      });
    }
  }

  return {
    planId: `plan_delay_${Date.now()}`,
    practitionerId,
    currentOverrunMinutes,
    impactedAppointmentsCount: impacts.length,
    impacts,
    requiresStaffApproval: true,
    status: 'draft_pending_staff',
    createdAt: new Date().toISOString(),
  };
}

/**
 * Dispatches realistic arrival updates to impacted downstream clients upon explicit staff review.
 */
export function approveAndDispatchArrivalUpdates(
  plan: LateRunningRecoveryPlan,
  approver: { staffId: string; staffName: string }
): DispatchedArrivalNotification[] {
  if (!approver.staffId || !approver.staffName) {
    throw new Error('Arrival update dispatch requires an authorized staff approver.');
  }

  const notifications: DispatchedArrivalNotification[] = plan.impacts.map((impact) => ({
    notificationId: `notif_${impact.appointmentId}_${Date.now()}`,
    appointmentId: impact.appointmentId,
    clientName: impact.clientName,
    recipientPhone: impact.clientPhone,
    messageText: impact.proposedMessage,
    suggestedStartTime: impact.suggestedStartTime,
    dispatchedAt: new Date().toISOString(),
    dispatchedBy: approver.staffName,
    resolutionStatus: 'pending_client_reply',
  }));

  plan.status = 'approved_dispatched';

  return notifications;
}

/**
 * Records client choice when responding to a late-running arrival notification.
 */
export function recordClientDelayResolution(
  notification: DispatchedArrivalNotification,
  clientChoice: 'accept_delay' | 'reschedule_complimentary' | 'switch_to_available_peer'
): {
  notificationId: string;
  resolutionStatus: DispatchedArrivalNotification['resolutionStatus'];
  resolutionSummary: string;
} {
  let resolutionStatus: DispatchedArrivalNotification['resolutionStatus'];
  let resolutionSummary: string;

  switch (clientChoice) {
    case 'accept_delay':
      resolutionStatus = 'accepted_delay';
      resolutionSummary = `Client confirmed new arrival time at ${notification.suggestedStartTime}.`;
      break;
    case 'reschedule_complimentary':
      resolutionStatus = 'rescheduled';
      resolutionSummary = 'Client elected to reschedule visit with late-fee penalty waived.';
      break;
    case 'switch_to_available_peer':
      resolutionStatus = 'reassigned_peer';
      resolutionSummary = 'Client accepted service reassignment to an available peer provider at original start time.';
      break;
  }

  notification.resolutionStatus = resolutionStatus;

  return {
    notificationId: notification.notificationId,
    resolutionStatus,
    resolutionSummary,
  };
}
