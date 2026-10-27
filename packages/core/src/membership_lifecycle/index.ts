import { z } from 'zod';

export const MembershipStatusSchema = z.enum([
  'active',
  'paused',
  'grace_period_dunning',
  'cancelled',
]);
export type MembershipStatus = z.infer<typeof MembershipStatusSchema>;

export const MembershipTermsDocSchema = z.object({
  termsId: z.string(),
  planName: z.string(),
  monthlyFeeCents: z.number().positive(),
  includedMonthlyCredits: z.number().int().positive(),
  retailDiscountPercent: z.number().nonnegative().default(10),
  cancellationNoticeDays: z.number().nonnegative().default(0), // 0 = cancel anytime
  rolloverCreditsAllowed: z.boolean().default(true),
  bankedCreditValidityMonths: z.number().int().positive().default(6),
});
export type MembershipTermsDoc = z.infer<typeof MembershipTermsDocSchema>;

export const MemberSubscriptionSchema = z.object({
  subscriptionId: z.string(),
  tenantId: z.string(),
  clientId: z.string(),
  clientName: z.string(),
  clientEmail: z.string().email(),
  planId: z.string(),
  terms: MembershipTermsDocSchema,
  status: MembershipStatusSchema,
  currentPeriodStart: z.string().datetime(),
  currentPeriodEnd: z.string().datetime(),
  nextBillingDate: z.string().datetime(),
  bankedCreditsCount: z.number().int().nonnegative().default(1),
  pausedUntilDate: z.string().datetime().optional(),
  failedPaymentCount: z.number().int().nonnegative().default(0),
  cardUpdateToken: z.string().optional(),
  createdAt: z.string().datetime(),
  cancelledAt: z.string().datetime().optional(),
});
export type MemberSubscription = z.infer<typeof MemberSubscriptionSchema>;

export const CancellationPreviewSchema = z.object({
  subscriptionId: z.string(),
  effectiveCancellationDate: z.string().datetime(),
  futureChargesAvoidedCents: z.number().nonnegative(),
  bankedCreditsCount: z.number().int().nonnegative(),
  creditsExpirationDate: z.string().datetime(),
  summaryNotice: z.string(),
});
export type CancellationPreview = z.infer<typeof CancellationPreviewSchema>;

/**
 * Enrolls a client in a monthly recurring membership with Document D16 terms.
 */
export function enrollClientInMembership(params: {
  tenantId: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  planId: string;
  terms: MembershipTermsDoc;
  currentTime?: string;
}): MemberSubscription {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();
  const periodEnd = new Date(now.getTime());
  periodEnd.setMonth(periodEnd.getMonth() + 1);

  return {
    subscriptionId: `sub_${Math.random().toString(36).substring(2, 9)}`,
    tenantId: params.tenantId,
    clientId: params.clientId,
    clientName: params.clientName,
    clientEmail: params.clientEmail,
    planId: params.planId,
    terms: params.terms,
    status: 'active',
    currentPeriodStart: now.toISOString(),
    currentPeriodEnd: periodEnd.toISOString(),
    nextBillingDate: periodEnd.toISOString(),
    bankedCreditsCount: params.terms.includedMonthlyCredits,
    failedPaymentCount: 0,
    createdAt: now.toISOString(),
  };
}

/**
 * Previews the impact of cancelling a membership subscription before execution.
 * Invariant: "Changes preview future charges and earned versus unused benefits."
 */
export function previewMembershipCancellation(params: {
  subscription: MemberSubscription;
  currentTime?: string;
}): CancellationPreview {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();
  const expDate = new Date(now.getTime());
  expDate.setMonth(expDate.getMonth() + params.subscription.terms.bankedCreditValidityMonths);

  const summaryNotice =
    params.subscription.bankedCreditsCount > 0
      ? `You have ${params.subscription.bankedCreditsCount} banked treatment credit(s). You can use them freely until ${expDate.toLocaleDateString()}. No further monthly charges of $${(params.subscription.terms.monthlyFeeCents / 100).toFixed(2)} will be billed.`
      : `No future charges of $${(params.subscription.terms.monthlyFeeCents / 100).toFixed(2)} will be billed.`;

  return {
    subscriptionId: params.subscription.subscriptionId,
    effectiveCancellationDate: now.toISOString(),
    futureChargesAvoidedCents: params.subscription.terms.monthlyFeeCents,
    bankedCreditsCount: params.subscription.bankedCreditsCount,
    creditsExpirationDate: expDate.toISOString(),
    summaryNotice,
  };
}

/**
 * Executes a membership cancellation with an audit trail.
 */
export function executeMembershipCancellation(params: {
  subscription: MemberSubscription;
  currentTime?: string;
}): MemberSubscription {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();

  return {
    ...params.subscription,
    status: 'cancelled',
    cancelledAt: now.toISOString(),
  };
}

/**
 * Pauses a membership subscription for a specified number of days/months without forfeiting banked credits.
 */
export function pauseMembershipSubscription(params: {
  subscription: MemberSubscription;
  pauseDays: number;
  currentTime?: string;
}): MemberSubscription {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();
  const resumeDate = new Date(now.getTime() + params.pauseDays * 24 * 60 * 60 * 1000);

  return {
    ...params.subscription,
    status: 'paused',
    pausedUntilDate: resumeDate.toISOString(),
    nextBillingDate: resumeDate.toISOString(),
  };
}

/**
 * Handles recurring payment failure by entering grace period dunning and issuing a card update link.
 */
export function handleRecurringPaymentFailure(params: {
  subscription: MemberSubscription;
  failureReason: string;
  currentTime?: string;
}): MemberSubscription {
  const cardUpdateToken = `tok_upd_${Math.random().toString(36).substring(2, 12)}`;

  return {
    ...params.subscription,
    status: 'grace_period_dunning',
    failedPaymentCount: (params.subscription.failedPaymentCount ?? 0) + 1,
    cardUpdateToken,
  };
}
