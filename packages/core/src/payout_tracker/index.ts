import { z } from 'zod';

export const PayoutStatusSchema = z.enum([
  'predicted_in_transit',
  'confirmed_bank_settlement',
  'held_verification_review',
  'failed_account_invalid',
]);
export type PayoutStatus = z.infer<typeof PayoutStatusSchema>;

export const PayoutBatchRecordSchema = z.object({
  payoutId: z.string(),
  tenantId: z.string(),
  payoutAmountCents: z.number().positive(),
  status: PayoutStatusSchema,
  predictedArrivalDate: z.string(), // ISO date (YYYY-MM-DD)
  confirmedSettledTimestamp: z.string().datetime().optional(),
  achTraceNumber: z.string().optional(),
  holdReason: z.string().optional(),
  destinationBankLast4: z.string(),
  initiatedAt: z.string().datetime(),
});
export type PayoutBatchRecord = z.infer<typeof PayoutBatchRecordSchema>;

export const VerificationRequirementSchema = z.object({
  requirementId: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.enum(['action_required', 'under_review', 'verified']),
  actionLink: z.string(),
  deadline: z.string().optional(),
});
export type VerificationRequirement = z.infer<typeof VerificationRequirementSchema>;

export const StudioBalanceLedgerSchema = z.object({
  tenantId: z.string(),
  availableCents: z.number().nonnegative(),
  pendingBatchCents: z.number().nonnegative(),
  reservedHoldCents: z.number().nonnegative(),
  totalUndepositedCents: z.number().nonnegative(),
  activeRequirements: z.array(VerificationRequirementSchema),
  recentPayouts: z.array(PayoutBatchRecordSchema),
  explanationNotice: z.string(),
});
export type StudioBalanceLedger = z.infer<typeof StudioBalanceLedgerSchema>;

/**
 * Computes live studio balances distinguishing cleared available funds from pending and held balances.
 * Invariant: "A predicted payout date is distinguished from a confirmed settlement."
 */
export function computeStudioBalanceState(params: {
  tenantId: string;
  availableCents: number;
  pendingBatchCents: number;
  reservedHoldCents: number;
  activeRequirements?: VerificationRequirement[];
  recentPayouts: PayoutBatchRecord[];
}): StudioBalanceLedger {
  const totalUndepositedCents = params.availableCents + params.pendingBatchCents + params.reservedHoldCents;
  const activeRequirements = params.activeRequirements ?? [];

  const explanationNotice =
    params.reservedHoldCents > 0
      ? `Notice: $${(params.reservedHoldCents / 100).toFixed(2)} is held in rolling risk reserve or pending processor verification. Complete required actions to release funds.`
      : 'All cleared funds are scheduled for direct bank deposit.';

  return {
    tenantId: params.tenantId,
    availableCents: params.availableCents,
    pendingBatchCents: params.pendingBatchCents,
    reservedHoldCents: params.reservedHoldCents,
    totalUndepositedCents,
    activeRequirements,
    recentPayouts: params.recentPayouts,
    explanationNotice,
  };
}

/**
 * Records a bank payout transition.
 * Invariant: Predicted arrival dates cannot be marked as confirmed settlements without an ACH trace and confirmed timestamp.
 */
export function transitionPayoutState(params: {
  payout: PayoutBatchRecord;
  targetStatus: PayoutStatus;
  achTraceNumber?: string;
  holdReason?: string;
  currentTime?: string;
}): PayoutBatchRecord {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();

  if (params.targetStatus === 'confirmed_bank_settlement') {
    if (!params.achTraceNumber || params.achTraceNumber.trim().length === 0) {
      throw new Error('A valid bank ACH trace number is required to confirm a payout settlement.');
    }

    return {
      ...params.payout,
      status: 'confirmed_bank_settlement',
      achTraceNumber: params.achTraceNumber,
      confirmedSettledTimestamp: now.toISOString(),
      holdReason: undefined,
    };
  }

  if (params.targetStatus === 'held_verification_review') {
    return {
      ...params.payout,
      status: 'held_verification_review',
      holdReason: params.holdReason ?? 'Under risk review or document verification hold.',
    };
  }

  return {
    ...params.payout,
    status: params.targetStatus,
  };
}
