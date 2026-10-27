/**
 * F118 — Operational Reliability Dashboard & Incident Recovery
 *
 * Real-time subsystem monitoring (payments, terminals, SMS carriers, queue latency)
 * with payment ambiguity reconciliation and emergency read access.
 *
 * Basis: Foundation; WB C6, Rules F060, F074, F075, F118, F159
 * Key Invariants:
 * 1. Payment Ambiguity Reconciliation (WB C6):
 *    Transactions interrupted by connectivity drops are flagged as ambiguous.
 *    System queries payment gateway status directly before permitting any retry,
 *    preventing accidental double charges on client credit cards.
 * 2. On-Call Escalation Procedures:
 *    Alerts map to tested runbook recovery procedures with explicit human ownership.
 * 3. Emergency Read View:
 *    Ensures staff can access cached today's client itineraries and formulas
 *    even during upstream third-party service degradations.
 */

export type SubsystemName =
  | 'payment_gateway_stripe'
  | 'certified_terminals_pos'
  | 'sms_carrier_telephony'
  | 'appointment_scheduler'
  | 'webhook_event_queue';

export type HealthStatus = 'healthy' | 'degraded' | 'outage' | 'maintenance';

export interface SubsystemHealthCheck {
  subsystem: SubsystemName;
  displayName: string;
  status: HealthStatus;
  latencyMs: number;
  lastCheckedAt: string;
  errorRatePercent: number;
  activeIncidentMessage?: string;
  recoveryRunbookUrl: string;
}

export interface AmbiguousPaymentRecord {
  transactionId: string;
  terminalId: string;
  appointmentId: string;
  clientName: string;
  amountUSD: number;
  gatewayPaymentIntentId: string;
  status: 'ambiguous_pending_check' | 'reconciled_captured' | 'reconciled_cancelled';
  flaggedAt: string;
  reconciledAt?: string;
  resolutionNote?: string;
}

export interface SystemReliabilityReport {
  overallSystemStatus: HealthStatus;
  subsystems: SubsystemHealthCheck[];
  ambiguousPaymentsCount: number;
  openIncidentsCount: number;
  emergencyReadViewAvailable: boolean;
  generatedAt: string;
}

/**
 * Evaluates studio operational reliability and health across core dependencies.
 */
export function evaluateSystemReliability(
  subsystemChecks: SubsystemHealthCheck[],
  ambiguousPayments: AmbiguousPaymentRecord[]
): SystemReliabilityReport {
  const hasOutage = subsystemChecks.some((s) => s.status === 'outage');
  const hasDegraded = subsystemChecks.some((s) => s.status === 'degraded');

  const overallSystemStatus: HealthStatus = hasOutage
    ? 'outage'
    : hasDegraded
    ? 'degraded'
    : 'healthy';

  const pendingAmbiguous = ambiguousPayments.filter(
    (p) => p.status === 'ambiguous_pending_check'
  ).length;

  const openIncidents = subsystemChecks.filter((s) => s.status !== 'healthy').length;

  return {
    overallSystemStatus,
    subsystems: subsystemChecks,
    ambiguousPaymentsCount: pendingAmbiguous,
    openIncidentsCount: openIncidents,
    emergencyReadViewAvailable: true,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Reconciles an interrupted card transaction with the payment gateway.
 * Invariant: Prevents double charging by verifying gateway intent status prior to retry.
 */
export function reconcileAmbiguousPayment(
  record: AmbiguousPaymentRecord,
  gatewayReportedStatus: 'succeeded' | 'requires_payment_method' | 'canceled'
): AmbiguousPaymentRecord {
  const now = new Date().toISOString();

  if (gatewayReportedStatus === 'succeeded') {
    return {
      ...record,
      status: 'reconciled_captured',
      reconciledAt: now,
      resolutionNote: 'Gateway verified payment was successfully authorized. Ticket marked paid without recharging client.',
    };
  }

  return {
    ...record,
    status: 'reconciled_cancelled',
    reconciledAt: now,
    resolutionNote: 'Gateway confirmed no funds were captured. Safe to re-initiate payment presentation.',
  };
}
