import { z } from 'zod';

export const LoyaltyTierSchema = z.enum(['bronze', 'silver', 'rose_gold_vip', 'platinum_elite']);
export type LoyaltyTier = z.infer<typeof LoyaltyTierSchema>;

export const LoyaltyRuleVersionSchema = z.object({
  version: z.number().int().positive(),
  pointsPerDollarSpent: z.number().positive(),
  redemptionRatePointsPerDollar: z.number().positive(), // e.g. 10 points = $1
  giftCardPurchasesEligible: z.boolean().default(false), // standard GAAP exclusion
  effectiveDate: z.string(),
});
export type LoyaltyRuleVersion = z.infer<typeof LoyaltyRuleVersionSchema>;

export const LoyaltyPointMovementSchema = z.object({
  movementId: z.string(),
  clientId: z.string(),
  type: z.enum(['accrual_purchase', 'redemption_discount', 'reversal_return', 'manual_adjustment']),
  pointsChange: z.number().int(),
  ruleVersionUsed: z.number().int(),
  reason: z.string(),
  ticketId: z.string().optional(),
  timestamp: z.string().datetime(),
});
export type LoyaltyPointMovement = z.infer<typeof LoyaltyPointMovementSchema>;

export const ClientLoyaltyAccountSchema = z.object({
  accountId: z.string(),
  tenantId: z.string(),
  clientId: z.string(),
  clientName: z.string(),
  tier: LoyaltyTierSchema.default('bronze'),
  lifetimePointsEarned: z.number().int().nonnegative().default(0),
  currentPointsBalance: z.number().int().nonnegative().default(0),
  activeRuleVersion: z.number().int().positive().default(1),
  movements: z.array(LoyaltyPointMovementSchema).default([]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type ClientLoyaltyAccount = z.infer<typeof ClientLoyaltyAccountSchema>;

/**
 * Accrues loyalty points from a qualifying checkout ticket.
 * Excludes gift card purchases and sales tax.
 */
export function accrueLoyaltyPoints(params: {
  account: ClientLoyaltyAccount;
  ticketId: string;
  eligibleSpendCents: number;
  rule: LoyaltyRuleVersion;
  currentTime?: string;
}): { updatedAccount: ClientLoyaltyAccount; pointsEarned: number } {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();

  // Convert cents to whole dollars for point accrual
  const dollarsSpent = Math.floor(params.eligibleSpendCents / 100);
  const pointsEarned = Math.floor(dollarsSpent * params.rule.pointsPerDollarSpent);

  if (pointsEarned <= 0) {
    return { updatedAccount: params.account, pointsEarned: 0 };
  }

  const movement: LoyaltyPointMovement = {
    movementId: `lpm_${Math.random().toString(36).substring(2, 9)}`,
    clientId: params.account.clientId,
    type: 'accrual_purchase',
    pointsChange: pointsEarned,
    ruleVersionUsed: params.rule.version,
    reason: `Earned on purchase (Ticket #${params.ticketId}) under Rule v${params.rule.version}`,
    ticketId: params.ticketId,
    timestamp: now.toISOString(),
  };

  const newBalance = params.account.currentPointsBalance + pointsEarned;
  const newLifetime = params.account.lifetimePointsEarned + pointsEarned;

  // Evaluate tier progression
  let tier: LoyaltyTier = params.account.tier;
  if (newLifetime >= 1000) tier = 'platinum_elite';
  else if (newLifetime >= 500) tier = 'rose_gold_vip';
  else if (newLifetime >= 250) tier = 'silver';

  const updatedAccount: ClientLoyaltyAccount = {
    ...params.account,
    tier,
    currentPointsBalance: newBalance,
    lifetimePointsEarned: newLifetime,
    activeRuleVersion: params.rule.version,
    movements: [...params.account.movements, movement],
    updatedAt: now.toISOString(),
  };

  return {
    updatedAccount,
    pointsEarned,
  };
}

/**
 * Reverses loyalty points when a return or refund occurs.
 */
export function reverseLoyaltyPointsForReturn(params: {
  account: ClientLoyaltyAccount;
  ticketId: string;
  pointsToReverse: number;
  reason: string;
  currentTime?: string;
}): ClientLoyaltyAccount {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();
  const safeDeduction = Math.min(params.account.currentPointsBalance, params.pointsToReverse);

  const movement: LoyaltyPointMovement = {
    movementId: `lpm_${Math.random().toString(36).substring(2, 9)}`,
    clientId: params.account.clientId,
    type: 'reversal_return',
    pointsChange: -safeDeduction,
    ruleVersionUsed: params.account.activeRuleVersion,
    reason: `Return clawback: ${params.reason}`,
    ticketId: params.ticketId,
    timestamp: now.toISOString(),
  };

  return {
    ...params.account,
    currentPointsBalance: params.account.currentPointsBalance - safeDeduction,
    movements: [...params.account.movements, movement],
    updatedAt: now.toISOString(),
  };
}

/**
 * Redeems points for an itemized discount.
 * Invariant: "Retroactive rule edits cannot silently erase previously earned value."
 */
export function redeemLoyaltyPoints(params: {
  account: ClientLoyaltyAccount;
  pointsToRedeem: number;
  rule: LoyaltyRuleVersion;
  ticketId: string;
  currentTime?: string;
}): {
  updatedAccount: ClientLoyaltyAccount;
  discountAmountCents: number;
} {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();

  if (params.pointsToRedeem <= 0) {
    throw new Error('Points to redeem must be greater than 0.');
  }

  if (params.pointsToRedeem > params.account.currentPointsBalance) {
    throw new Error(
      `Insufficient points balance (${params.account.currentPointsBalance} points available, ${params.pointsToRedeem} requested).`
    );
  }

  // Calculate discount (e.g. 100 points / 10 points per dollar = $10 discount = 1000 cents)
  const discountDollars = Math.floor(params.pointsToRedeem / params.rule.redemptionRatePointsPerDollar);
  const discountAmountCents = discountDollars * 100;

  const movement: LoyaltyPointMovement = {
    movementId: `lpm_${Math.random().toString(36).substring(2, 9)}`,
    clientId: params.account.clientId,
    type: 'redemption_discount',
    pointsChange: -params.pointsToRedeem,
    ruleVersionUsed: params.rule.version,
    reason: `Redeemed $${discountDollars}.00 discount on Ticket #${params.ticketId}`,
    ticketId: params.ticketId,
    timestamp: now.toISOString(),
  };

  const updatedAccount: ClientLoyaltyAccount = {
    ...params.account,
    currentPointsBalance: params.account.currentPointsBalance - params.pointsToRedeem,
    movements: [...params.account.movements, movement],
    updatedAt: now.toISOString(),
  };

  return {
    updatedAccount,
    discountAmountCents,
  };
}
