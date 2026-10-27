import { z } from 'zod';

export const DepositTypeSchema = z.enum(['captured_deposit', 'card_preauthorization']);
export type DepositType = z.infer<typeof DepositTypeSchema>;

export const DepositPolicyAcknowledgementSchema = z.object({
  policyId: z.string(),
  policyVersion: z.number().int().positive(),
  cancellationCutoffHours: z.number().positive(),
  depositForfeitNotice: z.string(),
  refundConditions: z.string(),
  acknowledgedAt: z.string().datetime(),
  ipOrUserAgent: z.string().optional(),
});
export type DepositPolicyAcknowledgement = z.infer<typeof DepositPolicyAcknowledgementSchema>;

export const DepositRecordSchema = z.object({
  depositId: z.string(),
  tenantId: z.string(),
  appointmentId: z.string(),
  clientId: z.string(),
  clientName: z.string(),
  type: DepositTypeSchema,
  totalServicePriceCents: z.number().nonnegative(),
  depositAmountCents: z.number().nonnegative(),
  remainingBalanceCents: z.number().nonnegative(),
  processorAuthId: z.string(),
  preauthExpiresAt: z.string().datetime().optional(), // standard 7-day auth window
  status: z.enum([
    'active_preauthorized',
    'active_captured',
    'applied_to_checkout',
    'refunded_timely_cancellation',
    'forfeited_late_cancellation',
    'forfeited_no_show',
    'expired_uncollected',
  ]),
  policyAcknowledgement: DepositPolicyAcknowledgementSchema,
  createdAt: z.string().datetime(),
  settledAt: z.string().datetime().optional(),
});
export type DepositRecord = z.infer<typeof DepositRecordSchema>;

/**
 * Evaluates whether a proposed pre-authorization would expire prior to the appointment date.
 * Card network authorizations typically expire in 7 days; bookings further out require captured deposit.
 */
export function evaluatePreauthExpirationRisk(params: {
  appointmentStartTime: string;
  currentTime?: string;
  maxPreauthDays?: number;
}): { isRisky: boolean; daysUntilAppointment: number; recommendation: string } {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();
  const apptTime = new Date(params.appointmentStartTime);
  const diffMs = apptTime.getTime() - now.getTime();
  const daysUntilAppointment = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const maxPreauthDays = params.maxPreauthDays ?? 7;

  if (daysUntilAppointment > maxPreauthDays) {
    return {
      isRisky: true,
      daysUntilAppointment,
      recommendation: `Appointment is ${daysUntilAppointment} days away. Card pre-authorizations automatically release after ${maxPreauthDays} days. A captured deposit is recommended instead of a temporary card hold.`,
    };
  }

  return {
    isRisky: false,
    daysUntilAppointment,
    recommendation: 'Pre-authorization valid for this booking window.',
  };
}

/**
 * Records a booking deposit or card preauthorization with an immutable policy snapshot (Document D05).
 * DR05 Invariant: Consent and payment authorization remain distinct records.
 */
export function recordBookingDeposit(params: {
  tenantId: string;
  appointmentId: string;
  clientId: string;
  clientName: string;
  type: DepositType;
  totalServicePriceCents: number;
  depositAmountCents: number;
  processorAuthId: string;
  policyId: string;
  policyVersion: number;
  cancellationCutoffHours: number;
  currentTime?: string;
}): DepositRecord {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();
  const remainingBalanceCents = Math.max(0, params.totalServicePriceCents - params.depositAmountCents);

  let preauthExpiresAt: string | undefined;
  if (params.type === 'card_preauthorization') {
    const expiresDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7-day validity
    preauthExpiresAt = expiresDate.toISOString();
  }

  const policyAcknowledgement: DepositPolicyAcknowledgement = {
    policyId: params.policyId,
    policyVersion: params.policyVersion,
    cancellationCutoffHours: params.cancellationCutoffHours,
    depositForfeitNotice: `Cancellations within ${params.cancellationCutoffHours} hours of appointment forfeit deposit amount of $${(params.depositAmountCents / 100).toFixed(2)}.`,
    refundConditions: `Cancellations prior to ${params.cancellationCutoffHours} hours are refunded 100% to original payment method.`,
    acknowledgedAt: now.toISOString(),
  };

  return {
    depositId: `dep_${Math.random().toString(36).substring(2, 9)}`,
    tenantId: params.tenantId,
    appointmentId: params.appointmentId,
    clientId: params.clientId,
    clientName: params.clientName,
    type: params.type,
    totalServicePriceCents: params.totalServicePriceCents,
    depositAmountCents: params.depositAmountCents,
    remainingBalanceCents,
    processorAuthId: params.processorAuthId,
    preauthExpiresAt,
    status: params.type === 'card_preauthorization' ? 'active_preauthorized' : 'active_captured',
    policyAcknowledgement,
    createdAt: now.toISOString(),
  };
}

/**
 * Handles appointment cancellation according to agreed Document D05 policy cutoff.
 */
export function processDepositCancellation(params: {
  deposit: DepositRecord;
  appointmentStartTime: string;
  cancellationTime?: string;
  isNoShow?: boolean;
}): {
  updatedDeposit: DepositRecord;
  outcome: 'refunded' | 'forfeited';
  feeRetainedCents: number;
  refundedAmountCents: number;
  explanation: string;
} {
  const cancelTime = params.cancellationTime ? new Date(params.cancellationTime) : new Date();
  const apptTime = new Date(params.appointmentStartTime);

  // If flagged as explicit no-show
  if (params.isNoShow) {
    const updatedDeposit: DepositRecord = {
      ...params.deposit,
      status: 'forfeited_no_show',
      settledAt: cancelTime.toISOString(),
    };
    return {
      updatedDeposit,
      outcome: 'forfeited',
      feeRetainedCents: params.deposit.depositAmountCents,
      refundedAmountCents: 0,
      explanation: `Client did not attend appointment. Full deposit of $${(params.deposit.depositAmountCents / 100).toFixed(2)} retained as no-show fee.`,
    };
  }

  // Calculate hours remaining before appointment
  const hoursUntilAppointment = (apptTime.getTime() - cancelTime.getTime()) / (1000 * 60 * 60);
  const cutoff = params.deposit.policyAcknowledgement.cancellationCutoffHours;

  if (hoursUntilAppointment >= cutoff) {
    // Timely cancellation -> 100% refund / pre-auth release
    const updatedDeposit: DepositRecord = {
      ...params.deposit,
      status: 'refunded_timely_cancellation',
      settledAt: cancelTime.toISOString(),
    };
    return {
      updatedDeposit,
      outcome: 'refunded',
      feeRetainedCents: 0,
      refundedAmountCents: params.deposit.depositAmountCents,
      explanation: `Cancelled ${Math.round(hoursUntilAppointment)} hours in advance (policy requirement: ${cutoff}h). Full refund of $${(params.deposit.depositAmountCents / 100).toFixed(2)} issued.`,
    };
  } else {
    // Late cancellation -> forfeit deposit
    const updatedDeposit: DepositRecord = {
      ...params.deposit,
      status: 'forfeited_late_cancellation',
      settledAt: cancelTime.toISOString(),
    };
    return {
      updatedDeposit,
      outcome: 'forfeited',
      feeRetainedCents: params.deposit.depositAmountCents,
      refundedAmountCents: 0,
      explanation: `Late cancellation within ${cutoff} hours notice window (${Math.round(hoursUntilAppointment)}h before appointment). Deposit of $${(params.deposit.depositAmountCents / 100).toFixed(2)} forfeited per policy.`,
    };
  }
}
