import { z } from 'zod';

export const TipAllocationRecipientSchema = z.object({
  staffId: z.string(),
  staffName: z.string(),
  role: z.string(),
  percentage: z.number().min(0).max(100),
  allocatedAmountCents: z.number().nonnegative(),
});
export type TipAllocationRecipient = z.infer<typeof TipAllocationRecipientSchema>;

export const TipAllocationRecordSchema = z.object({
  allocationId: z.string(),
  ticketId: z.string(),
  tenantId: z.string(),
  totalTipCents: z.number().nonnegative(),
  isZeroBalanceRedemptionVisit: z.boolean().default(false),
  recipients: z.array(TipAllocationRecipientSchema),
  tipRefundHandling: z.enum([
    'not_refunded',
    'refunded_and_clawed_back',
    'retained_by_staff',
    'salon_absorbed_as_goodwill',
  ]).default('not_refunded'),
  createdAt: z.string().datetime(),
});
export type TipAllocationRecord = z.infer<typeof TipAllocationRecordSchema>;

/**
 * Allocates a tip across one or more specialists/assistants according to custom splits.
 * Works seamlessly on standard paid tickets or zero-balance voucher redemptions.
 */
export function allocateTipAcrossProviders(params: {
  tenantId: string;
  ticketId: string;
  totalTipCents: number;
  isZeroBalanceRedemptionVisit?: boolean;
  recipients: Array<{
    staffId: string;
    staffName: string;
    role: string;
    percentage: number; // e.g. 80 and 20
  }>;
  currentTime?: string;
}): TipAllocationRecord {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();

  // Validate percentages sum to 100
  const totalPercentage = params.recipients.reduce((sum, r) => sum + r.percentage, 0);
  if (Math.round(totalPercentage) !== 100) {
    throw new Error(`Tip allocation percentages must sum to 100% (received: ${totalPercentage}%).`);
  }

  let allocatedRunningSum = 0;
  const builtRecipients: TipAllocationRecipient[] = params.recipients.map((r, idx) => {
    // If last recipient, assign remaining cents to prevent rounding drift
    const isLast = idx === params.recipients.length - 1;
    const amount = isLast
      ? params.totalTipCents - allocatedRunningSum
      : Math.round((params.totalTipCents * r.percentage) / 100);

    allocatedRunningSum += amount;

    return {
      staffId: r.staffId,
      staffName: r.staffName,
      role: r.role,
      percentage: r.percentage,
      allocatedAmountCents: amount,
    };
  });

  return {
    allocationId: `tip_${Math.random().toString(36).substring(2, 9)}`,
    ticketId: params.ticketId,
    tenantId: params.tenantId,
    totalTipCents: params.totalTipCents,
    isZeroBalanceRedemptionVisit: params.isZeroBalanceRedemptionVisit ?? false,
    recipients: builtRecipients,
    tipRefundHandling: 'not_refunded',
    createdAt: now.toISOString(),
  };
}

/**
 * Handles tip disposition when a service is refunded.
 * Invariant: "Refunding services and tips follows distinct approved choices."
 */
export function processTipRefundChoice(params: {
  allocation: TipAllocationRecord;
  choice: 'refund_tip_and_clawback_from_staff' | 'retain_tip_for_staff' | 'salon_absorbed_as_goodwill';
}): {
  updatedAllocation: TipAllocationRecord;
  clientRefundAmountCents: number;
  staffClawbackAmountCents: number;
  salonExpenseCents: number;
  explanation: string;
} {
  const totalTip = params.allocation.totalTipCents;

  if (params.choice === 'retain_tip_for_staff') {
    return {
      updatedAllocation: { ...params.allocation, tipRefundHandling: 'retained_by_staff' },
      clientRefundAmountCents: 0,
      staffClawbackAmountCents: 0,
      salonExpenseCents: 0,
      explanation: 'Service price refunded to client, but specialist tip of $' + (totalTip / 100).toFixed(2) + ' remains intact and paid to staff.',
    };
  }

  if (params.choice === 'refund_tip_and_clawback_from_staff') {
    return {
      updatedAllocation: { ...params.allocation, tipRefundHandling: 'refunded_and_clawed_back' },
      clientRefundAmountCents: totalTip,
      staffClawbackAmountCents: totalTip,
      salonExpenseCents: 0,
      explanation: 'Full tip of $' + (totalTip / 100).toFixed(2) + ' refunded to client and reversed from staff payout ledger.',
    };
  }

  // salon_absorbed_as_goodwill
  return {
    updatedAllocation: { ...params.allocation, tipRefundHandling: 'salon_absorbed_as_goodwill' },
    clientRefundAmountCents: totalTip,
    staffClawbackAmountCents: 0,
    salonExpenseCents: totalTip,
    explanation: 'Tip of $' + (totalTip / 100).toFixed(2) + ' refunded to client as studio goodwill; salon absorbs the expense so staff earnings are not docked.',
  };
}
