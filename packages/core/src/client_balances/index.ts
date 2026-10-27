import { z } from 'zod';

/**
 * F068 — Client Credit & Balance Explanations (Documents D15, D17)
 *
 * Provides a clear, transparent entitlement ledger explaining gift cards, package series,
 * and monthly membership credits in plain, jargon-free English.
 *
 * Invariants (D15, D17, WB F68):
 * 1. Entitlement Ledger: Every balance reduction must trace to a specific appointment ID or adjustment.
 * 2. Plain-English Summary: Translates balances and expiry dates into warm, crystal-clear summaries.
 * 3. Security (D17): Gift card statements mask full secret redemption codes on public statements.
 */

export const BalanceInstrumentTypeSchema = z.enum([
  'gift_card',
  'package_series',
  'membership_monthly_credit',
  'goodwill_store_credit',
]);
export type BalanceInstrumentType = z.infer<typeof BalanceInstrumentTypeSchema>;

export const BalanceTransactionTypeSchema = z.enum([
  'initial_purchase_or_grant',
  'appointment_redemption',
  'monthly_membership_rollover',
  'refund_reversal',
  'administrative_correction',
]);
export type BalanceTransactionType = z.infer<typeof BalanceTransactionTypeSchema>;

export const BalanceLedgerEntrySchema = z.object({
  transactionId: z.string().uuid(),
  timestamp: z.string().datetime(),
  type: BalanceTransactionTypeSchema,
  amountCentsChange: z.number().int(), // negative for redemptions, positive for grants/refunds
  remainingBalanceCentsAfter: z.number().int().nonnegative(),
  linkedAppointmentId: z.string().uuid().nullable(),
  serviceName: z.string().nullable(),
  humanExplanation: z.string().min(1),
  staffAuthorId: z.string().uuid().nullable(),
});
export type BalanceLedgerEntry = z.infer<typeof BalanceLedgerEntrySchema>;

export const ClientBalanceInstrumentSchema = z.object({
  instrumentId: z.string().uuid(),
  businessId: z.string().uuid(),
  clientId: z.string().uuid(),
  type: BalanceInstrumentTypeSchema,
  instrumentTitle: z.string().min(1), // e.g. "Spring Glow HydraFacial 3-Pack" or "Mother's Day Gift Card"
  initialPurchasedValueCents: z.number().int().nonnegative(),
  remainingValueCents: z.number().int().nonnegative(),
  currency: z.string().default('USD'),

  // Package / Units
  totalUnitsGranted: z.number().int().nonnegative().nullable(), // e.g. 3 sessions
  remainingUnits: z.number().int().nonnegative().nullable(),    // e.g. 2 sessions

  // Expiry & Security
  expiresAt: z.string().datetime().nullable(),
  isExpired: z.boolean().default(false),
  maskedCode: z.string().nullable(), // e.g. "GIFT-****-8492"

  // Traceable Reduction History Ledger
  ledger: z.array(BalanceLedgerEntrySchema),
  plainEnglishSummary: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type ClientBalanceInstrument = z.infer<typeof ClientBalanceInstrumentSchema>;

/**
 * Masks a gift card code to protect secret redemption credentials on public statements.
 */
export function maskGiftCardSecret(fullCode: string): string {
  if (fullCode.length <= 4) return '****';
  const lastFour = fullCode.slice(-4);
  return `GIFT-****-${lastFour}`;
}

/**
 * Creates a plain-English, warm summary for a client's balance instrument.
 */
export function formatPlainEnglishBalanceExplanation(params: {
  type: BalanceInstrumentType;
  title: string;
  remainingCents: number;
  remainingUnits: number | null;
  totalUnits: number | null;
  expiresAt: string | null;
}): string {
  const formattedDollars = `$${(params.remainingCents / 100).toFixed(2)}`;

  let expiryNotice = 'with no expiration date';
  if (params.expiresAt) {
    const d = new Date(params.expiresAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    expiryNotice = `valid through ${d}`;
  }

  if (params.type === 'package_series' && params.remainingUnits !== null && params.totalUnits !== null) {
    return (
      `You have ${params.remainingUnits} of ${params.totalUnits} sessions remaining ` +
      `from your "${params.title}" (${formattedDollars} remaining value), ${expiryNotice}.`
    );
  }

  if (params.type === 'membership_monthly_credit') {
    return (
      `You have 1 active monthly member treatment credit (${formattedDollars} value) ` +
      `from your "${params.title}", ${expiryNotice}.`
    );
  }

  if (params.type === 'gift_card') {
    return (
      `You have ${formattedDollars} spendable store credit from your "${params.title}" gift card, ` +
      `${expiryNotice}.`
    );
  }

  return `You have ${formattedDollars} in available store credit (${params.title}), ${expiryNotice}.`;
}

/**
 * Issues a new funded balance instrument with initial ledger entry (Document D17).
 */
export function issueClientBalance(params: {
  businessId: string;
  clientId: string;
  type: BalanceInstrumentType;
  instrumentTitle: string;
  initialValueCents: number;
  totalUnits?: number;
  expiresAt?: string | null;
  rawGiftCode?: string;
  staffAuthorId?: string;
  fundingExplanation?: string;
}): ClientBalanceInstrument {
  const instrumentId = crypto.randomUUID ? crypto.randomUUID() : 'f0680000-0000-4000-8000-000000000001';
  const now = new Date().toISOString();

  const totalUnits = params.totalUnits ?? (params.type === 'package_series' ? 3 : null);
  const remainingUnits = totalUnits;

  const explanation = formatPlainEnglishBalanceExplanation({
    type: params.type,
    title: params.instrumentTitle,
    remainingCents: params.initialValueCents,
    remainingUnits,
    totalUnits,
    expiresAt: params.expiresAt ?? null,
  });

  const initialEntry: BalanceLedgerEntry = {
    transactionId: crypto.randomUUID ? crypto.randomUUID() : 'f0680000-0000-4000-8000-000000000002',
    timestamp: now,
    type: 'initial_purchase_or_grant',
    amountCentsChange: params.initialValueCents,
    remainingBalanceCentsAfter: params.initialValueCents,
    linkedAppointmentId: null,
    serviceName: null,
    humanExplanation: params.fundingExplanation ?? `Initial purchase/issue of ${params.instrumentTitle}`,
    staffAuthorId: params.staffAuthorId ?? null,
  };

  const maskedCode = params.rawGiftCode ? maskGiftCardSecret(params.rawGiftCode) : null;

  return ClientBalanceInstrumentSchema.parse({
    instrumentId,
    businessId: params.businessId,
    clientId: params.clientId,
    type: params.type,
    instrumentTitle: params.instrumentTitle,
    initialPurchasedValueCents: params.initialValueCents,
    remainingValueCents: params.initialValueCents,
    currency: 'USD',
    totalUnitsGranted: totalUnits,
    remainingUnits,
    expiresAt: params.expiresAt ?? null,
    isExpired: false,
    maskedCode,
    ledger: [initialEntry],
    plainEnglishSummary: explanation,
    createdAt: now,
    updatedAt: now,
  });
}

/**
 * Redeems value or sessions from an existing balance instrument, appending to the immutable ledger.
 *
 * Invariant: Rejects redemption if remaining balance is insufficient.
 */
export function redeemClientBalance(
  instrument: ClientBalanceInstrument,
  params: {
    redeemAmountCents: number;
    redeemUnits?: number;
    linkedAppointmentId: string;
    serviceName: string;
    staffAuthorId?: string;
  }
): ClientBalanceInstrument {
  if (params.redeemAmountCents > instrument.remainingValueCents) {
    throw new Error(
      `Insufficient balance: Cannot redeem $${(params.redeemAmountCents / 100).toFixed(2)} from available $${(instrument.remainingValueCents / 100).toFixed(2)}.`
    );
  }

  const newBalanceCents = instrument.remainingValueCents - params.redeemAmountCents;
  const newUnits =
    instrument.remainingUnits !== null && params.redeemUnits
      ? Math.max(0, instrument.remainingUnits - params.redeemUnits)
      : instrument.remainingUnits;

  const now = new Date().toISOString();

  const reductionEntry: BalanceLedgerEntry = {
    transactionId: crypto.randomUUID ? crypto.randomUUID() : 'f0680000-0000-4000-8000-000000000003',
    timestamp: now,
    type: 'appointment_redemption',
    amountCentsChange: -params.redeemAmountCents,
    remainingBalanceCentsAfter: newBalanceCents,
    linkedAppointmentId: params.linkedAppointmentId,
    serviceName: params.serviceName,
    humanExplanation: `Redeemed for ${params.serviceName} at checkout`,
    staffAuthorId: params.staffAuthorId ?? null,
  };

  const newExplanation = formatPlainEnglishBalanceExplanation({
    type: instrument.type,
    title: instrument.instrumentTitle,
    remainingCents: newBalanceCents,
    remainingUnits: newUnits,
    totalUnits: instrument.totalUnitsGranted,
    expiresAt: instrument.expiresAt,
  });

  return ClientBalanceInstrumentSchema.parse({
    ...instrument,
    remainingValueCents: newBalanceCents,
    remainingUnits: newUnits,
    plainEnglishSummary: newExplanation,
    ledger: [...instrument.ledger, reductionEntry],
    updatedAt: now,
  });
}
