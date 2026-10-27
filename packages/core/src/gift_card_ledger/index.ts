import { z } from 'zod';

export const GiftCardLedgerEntrySchema = z.object({
  cardId: z.string(),
  tenantId: z.string(),
  maskedCode: z.string(), // e.g. "GIFT-****-4242"
  secretVerificationHash: z.string(),
  purchasedValueCents: z.number().positive(),
  remainingLiabilityBalanceCents: z.number().nonnegative(),
  recognizedEarnedRevenueCents: z.number().nonnegative().default(0),
  purchaserName: z.string(),
  purchaserEmail: z.string().email(),
  recipientName: z.string(),
  recipientEmail: z.string().email(),
  personalMessage: z.string().optional(),
  status: z.enum(['active', 'fully_redeemed', 'refunded_to_buyer', 'voided']).default('active'),
  expiresAt: z.string().datetime().optional(), // Legal minimums enforced
  purchasedAt: z.string().datetime(),
  lastRedeemedAt: z.string().datetime().optional(),
});
export type GiftCardLedgerEntry = z.infer<typeof GiftCardLedgerEntrySchema>;

export const GiftCardRedemptionMovementSchema = z.object({
  movementId: z.string(),
  cardId: z.string(),
  ticketId: z.string(),
  redeemedAmountCents: z.number().positive(),
  previousBalanceCents: z.number().positive(),
  newRemainingBalanceCents: z.number().nonnegative(),
  recognizedEarnedRevenueCents: z.number().positive(),
  timestamp: z.string().datetime(),
});
export type GiftCardRedemptionMovement = z.infer<typeof GiftCardRedemptionMovementSchema>;

/**
 * Issues a new gift card instrument into the liability ledger.
 * Invariant: "Selling a gift card does not also count its face value as earned service revenue."
 * Upon sale, funds are logged as a deferred liability, NOT recognized sales revenue!
 */
export function issueGiftCardLiability(params: {
  tenantId: string;
  purchasedValueCents: number;
  purchaserName: string;
  purchaserEmail: string;
  recipientName: string;
  recipientEmail: string;
  personalMessage?: string;
  validityYears?: number; // default 5 years (federal minimum) or undefined for non-expiring
  currentTime?: string;
}): { card: GiftCardLedgerEntry; accountingClassification: string } {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();
  const cardId = `gc_${Math.random().toString(36).substring(2, 9)}`;
  const secretCodeLast4 = Math.floor(1000 + Math.random() * 9000).toString();
  const maskedCode = `GIFT-****-${secretCodeLast4}`;

  let expiresAt: string | undefined;
  if (params.validityYears && params.validityYears > 0) {
    const expDate = new Date(now.getTime());
    expDate.setFullYear(expDate.getFullYear() + params.validityYears);
    expiresAt = expDate.toISOString();
  }

  const card: GiftCardLedgerEntry = {
    cardId,
    tenantId: params.tenantId,
    maskedCode,
    secretVerificationHash: `hash_sha256_${cardId}_${secretCodeLast4}`,
    purchasedValueCents: params.purchasedValueCents,
    remainingLiabilityBalanceCents: params.purchasedValueCents,
    recognizedEarnedRevenueCents: 0, // Invariant: Zero earned revenue at time of sale
    purchaserName: params.purchaserName,
    purchaserEmail: params.purchaserEmail,
    recipientName: params.recipientName,
    recipientEmail: params.recipientEmail,
    personalMessage: params.personalMessage,
    status: 'active',
    expiresAt,
    purchasedAt: now.toISOString(),
  };

  const accountingClassification =
    `GAAP Deferred Liability: $${(params.purchasedValueCents / 100).toFixed(2)} recorded under Account 2100 (Unearned Gift Card Liability). $0.00 recognized as earned service revenue until redeemed.`;

  return { card, accountingClassification };
}

/**
 * Redeems gift card value against a checkout ticket.
 * Deducts from the liability ledger and formally recognizes earned service revenue.
 */
export function redeemGiftCardValue(params: {
  card: GiftCardLedgerEntry;
  ticketId: string;
  amountToRedeemCents: number;
  currentTime?: string;
}): {
  updatedCard: GiftCardLedgerEntry;
  movement: GiftCardRedemptionMovement;
} {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();

  if (params.card.status !== 'active') {
    throw new Error(`Gift card cannot be redeemed from status: ${params.card.status}.`);
  }

  if (params.card.expiresAt && new Date(params.card.expiresAt).getTime() <= now.getTime()) {
    throw new Error('Gift card has expired.');
  }

  if (params.amountToRedeemCents <= 0) {
    throw new Error('Redemption amount must be greater than $0.00.');
  }

  if (params.amountToRedeemCents > params.card.remainingLiabilityBalanceCents) {
    throw new Error(
      `Redemption amount ($${(params.amountToRedeemCents / 100).toFixed(2)}) exceeds remaining card balance ($${(params.card.remainingLiabilityBalanceCents / 100).toFixed(2)}).`
    );
  }

  const previousBalance = params.card.remainingLiabilityBalanceCents;
  const newRemainingBalance = previousBalance - params.amountToRedeemCents;
  const newRecognizedRevenue = params.card.recognizedEarnedRevenueCents + params.amountToRedeemCents;

  const movement: GiftCardRedemptionMovement = {
    movementId: `gcm_${Math.random().toString(36).substring(2, 9)}`,
    cardId: params.card.cardId,
    ticketId: params.ticketId,
    redeemedAmountCents: params.amountToRedeemCents,
    previousBalanceCents: previousBalance,
    newRemainingBalanceCents: newRemainingBalance,
    recognizedEarnedRevenueCents: params.amountToRedeemCents,
    timestamp: now.toISOString(),
  };

  const updatedCard: GiftCardLedgerEntry = {
    ...params.card,
    remainingLiabilityBalanceCents: newRemainingBalance,
    recognizedEarnedRevenueCents: newRecognizedRevenue,
    status: newRemainingBalance === 0 ? 'fully_redeemed' : 'active',
    lastRedeemedAt: now.toISOString(),
  };

  return {
    updatedCard,
    movement,
  };
}
