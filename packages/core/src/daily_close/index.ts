import { z } from 'zod';

/**
 * F058 — Daily Close Workspace & Till Reconciliation
 *
 * Provides a reliable end-of-day register closing and cash drawer balancing workspace.
 * Reconciles opening float, cash sales, paid-ins, paid-outs, card terminal batch totals,
 * unallocated tips, and highlights any cash over/short discrepancies.
 */

export const CashMovementTypeSchema = z.enum(['opening_float', 'cash_sale', 'paid_in', 'paid_out', 'cash_refund']);
export type CashMovementType = z.infer<typeof CashMovementTypeSchema>;

export const CashMovementSchema = z.object({
  id: z.string().uuid(),
  type: CashMovementTypeSchema,
  amountCents: z.number().int(), // positive for inflow, negative or positive handled by category
  description: z.string().min(1),
  recordedAt: z.string().datetime(),
  recordedByStaffId: z.string().uuid(),
  receiptRef: z.string().optional(),
});
export type CashMovement = z.infer<typeof CashMovementSchema>;

export const UnresolvedExceptionSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(['open_ticket', 'unpaid_visit', 'unallocated_tip', 'offline_card_swipe']),
  clientName: z.string().min(1),
  amountCents: z.number().int().nonnegative(),
  specialistName: z.string().min(1),
  notes: z.string(),
  canBeDeferred: z.boolean(),
});
export type UnresolvedException = z.infer<typeof UnresolvedExceptionSchema>;

export const DailyCloseStatusSchema = z.enum(['in_progress', 'ready_to_close', 'closed', 'closed_with_exceptions']);
export type DailyCloseStatus = z.infer<typeof DailyCloseStatusSchema>;

export const DailyCloseRecordSchema = z.object({
  closeId: z.string().uuid(),
  businessId: z.string().uuid(),
  locationId: z.string().uuid(),
  drawerId: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  status: DailyCloseStatusSchema,
  closedAt: z.string().datetime().nullable(),
  closedByStaffId: z.string().uuid().nullable(),
  managerName: z.string().nullable(),

  // Cash reconciliation
  openingFloatCents: z.number().int().nonnegative(),
  totalCashSalesCents: z.number().int().nonnegative(),
  totalPaidInCents: z.number().int().nonnegative(),
  totalPaidOutCents: z.number().int().nonnegative(),
  totalCashRefundsCents: z.number().int().nonnegative(),
  expectedCashInDrawerCents: z.number().int(),
  actualCountedCashCents: z.number().int().nonnegative().nullable(),
  varianceCents: z.number().int().nullable(), // counted - expected (negative = short, positive = over)
  varianceExplanation: z.string().nullable(),

  // Electronic & Card Processor Batches
  totalCreditDebitCardCents: z.number().int().nonnegative(),
  totalTipsCollectedCents: z.number().int().nonnegative(),
  totalBnplCents: z.number().int().nonnegative(),
  totalGrossRevenueCents: z.number().int().nonnegative(),

  // Audit and Exceptions
  cashMovements: z.array(CashMovementSchema),
  unresolvedExceptions: z.array(UnresolvedExceptionSchema),
  closingNotes: z.string().nullable(),
});
export type DailyCloseRecord = z.infer<typeof DailyCloseRecordSchema>;

/**
 * Calculates the expected cash in drawer based on opening float and all cash transactions.
 * Formula: opening float + cash sales + paid ins - paid outs - cash refunds.
 */
export function calculateExpectedCash(params: {
  openingFloatCents: number;
  totalCashSalesCents: number;
  totalPaidInCents: number;
  totalPaidOutCents: number;
  totalCashRefundsCents: number;
}): number {
  return (
    params.openingFloatCents +
    params.totalCashSalesCents +
    params.totalPaidInCents -
    params.totalPaidOutCents -
    params.totalCashRefundsCents
  );
}

/**
 * Initiates a daily close session for a given register/drawer.
 */
export function initDailyClose(params: {
  businessId: string;
  locationId: string;
  drawerId: string;
  date: string;
  openingFloatCents: number;
  cashMovements?: CashMovement[];
  unresolvedExceptions?: UnresolvedException[];
  cardTotals?: {
    creditDebitCents: number;
    tipsCollectedCents: number;
    bnplCents: number;
  };
}): DailyCloseRecord {
  const closeId = crypto.randomUUID ? crypto.randomUUID() : 'f0580000-0000-4000-8000-000000000001';
  const movements = params.cashMovements ?? [];

  let totalCashSalesCents = 0;
  let totalPaidInCents = 0;
  let totalPaidOutCents = 0;
  let totalCashRefundsCents = 0;

  for (const m of movements) {
    if (m.type === 'cash_sale') totalCashSalesCents += m.amountCents;
    else if (m.type === 'paid_in') totalPaidInCents += m.amountCents;
    else if (m.type === 'paid_out') totalPaidOutCents += Math.abs(m.amountCents);
    else if (m.type === 'cash_refund') totalCashRefundsCents += Math.abs(m.amountCents);
  }

  const expectedCashInDrawerCents = calculateExpectedCash({
    openingFloatCents: params.openingFloatCents,
    totalCashSalesCents,
    totalPaidInCents,
    totalPaidOutCents,
    totalCashRefundsCents,
  });

  const card = params.cardTotals ?? { creditDebitCents: 0, tipsCollectedCents: 0, bnplCents: 0 };
  const totalGrossRevenueCents = totalCashSalesCents + card.creditDebitCents + card.bnplCents;

  return DailyCloseRecordSchema.parse({
    closeId,
    businessId: params.businessId,
    locationId: params.locationId,
    drawerId: params.drawerId,
    date: params.date,
    status: 'in_progress',
    closedAt: null,
    closedByStaffId: null,
    managerName: null,
    openingFloatCents: params.openingFloatCents,
    totalCashSalesCents,
    totalPaidInCents,
    totalPaidOutCents,
    totalCashRefundsCents,
    expectedCashInDrawerCents,
    actualCountedCashCents: null,
    varianceCents: null,
    varianceExplanation: null,
    totalCreditDebitCardCents: card.creditDebitCents,
    totalTipsCollectedCents: card.tipsCollectedCents,
    totalBnplCents: card.bnplCents,
    totalGrossRevenueCents,
    cashMovements: movements,
    unresolvedExceptions: params.unresolvedExceptions ?? [],
    closingNotes: null,
  });
}

/**
 * Reconciles the drawer count and finalizes the Daily Close.
 *
 * Invariants:
 * 1. If actualCountedCash != expectedCash, a variance explanation is mandatory.
 * 2. Unresolved non-deferrable exceptions block closure unless resolved.
 */
export function finalizeDailyClose(params: {
  dailyClose: DailyCloseRecord;
  actualCountedCashCents: number;
  managerStaffId: string;
  managerName: string;
  varianceExplanation?: string;
  closingNotes?: string;
}): { success: boolean; closedRecord?: DailyCloseRecord; errors: string[] } {
  const errors: string[] = [];

  // Check unresolved non-deferrable exceptions
  const blockingExceptions = params.dailyClose.unresolvedExceptions.filter(e => !e.canBeDeferred);
  if (blockingExceptions.length > 0) {
    errors.push(
      `Cannot close till: ${blockingExceptions.length} blocking exception(s) require resolution (e.g. open unpaid tickets or unallocated tips).`
    );
  }

  // Calculate cash variance
  const varianceCents = params.actualCountedCashCents - params.dailyClose.expectedCashInDrawerCents;

  // Invariant: Discrepancy explanation required if variance != 0
  if (varianceCents !== 0 && (!params.varianceExplanation || params.varianceExplanation.trim().length < 5)) {
    const formattedVariance = (Math.abs(varianceCents) / 100).toFixed(2);
    const direction = varianceCents > 0 ? 'over' : 'short';
    errors.push(
      `Till is ${direction} by $${formattedVariance}. An honest explanation note (minimum 5 characters) is required to document cash variances.`
    );
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  const now = new Date().toISOString();
  const hasRemainingDeferredExceptions = params.dailyClose.unresolvedExceptions.length > 0;

  const closedRecord = DailyCloseRecordSchema.parse({
    ...params.dailyClose,
    status: hasRemainingDeferredExceptions ? 'closed_with_exceptions' : 'closed',
    closedAt: now,
    closedByStaffId: params.managerStaffId,
    managerName: params.managerName,
    actualCountedCashCents: params.actualCountedCashCents,
    varianceCents,
    varianceExplanation: varianceCents !== 0 ? params.varianceExplanation!.trim() : null,
    closingNotes: params.closingNotes ? params.closingNotes.trim() : null,
  });

  return { success: true, closedRecord, errors: [] };
}
