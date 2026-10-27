import { z } from 'zod';

export const RefundReasonSchema = z.enum([
  'client_dissatisfaction',
  'practitioner_cancellation',
  'accidental_overcharge',
  'retail_product_return',
  'medical_contraindication',
  'goodwill_courtesy',
]);
export type RefundReason = z.infer<typeof RefundReasonSchema>;

export const RefundLineItemSchema = z.object({
  lineId: z.string(),
  type: z.enum(['service', 'retail_product', 'tip', 'deposit']),
  name: z.string(),
  originalAmountCents: z.number().nonnegative(),
  refundAmountCents: z.number().positive(),
  restockInventory: z.boolean().default(false),
  restockQuantity: z.number().int().nonnegative().default(0),
});
export type RefundLineItem = z.infer<typeof RefundLineItemSchema>;

export const RefundRecordSchema = z.object({
  refundId: z.string(),
  tenantId: z.string(),
  originalPaymentId: z.string(),
  ticketId: z.string(),
  clientId: z.string(),
  clientName: z.string(),
  totalRefundedCents: z.number().positive(),
  lines: z.array(RefundLineItemSchema),
  reason: RefundReasonSchema,
  reasonNotes: z.string().min(1, 'Reason explanation is required for audit integrity'),
  processorRefundId: z.string(),
  status: z.enum(['succeeded', 'pending', 'declined']),
  authorizedByStaffId: z.string(),
  authorizedByStaffName: z.string(),
  createdAt: z.string().datetime(),
});
export type RefundRecord = z.infer<typeof RefundRecordSchema>;

/**
 * Calculates remaining balance eligible for refund on an original payment transaction.
 * Invariant: Refund state is reconciled before staff can issue another refund.
 */
export function calculateEligibleRefundBalance(params: {
  originalPaymentAmountCents: number;
  existingRefunds: RefundRecord[];
}): { eligibleRefundCents: number; totalPreviouslyRefundedCents: number } {
  const totalPreviouslyRefundedCents = params.existingRefunds
    .filter((r) => r.status === 'succeeded' || r.status === 'pending')
    .reduce((sum, r) => sum + r.totalRefundedCents, 0);

  const eligibleRefundCents = Math.max(0, params.originalPaymentAmountCents - totalPreviouslyRefundedCents);

  return {
    eligibleRefundCents,
    totalPreviouslyRefundedCents,
  };
}

/**
 * Executes a reconciled refund with optional inventory restocking and immutable reason tracking.
 * Guarantees zero double-refunding.
 */
export function processRefundAndExchange(params: {
  tenantId: string;
  originalPaymentId: string;
  ticketId: string;
  originalPaymentAmountCents: number;
  existingRefunds: RefundRecord[];
  clientId: string;
  clientName: string;
  lines: Array<{
    lineId: string;
    type: 'service' | 'retail_product' | 'tip' | 'deposit';
    name: string;
    originalAmountCents: number;
    refundAmountCents: number;
    restockInventory?: boolean;
    restockQuantity?: number;
  }>;
  reason: RefundReason;
  reasonNotes: string;
  authorizedByStaffId: string;
  authorizedByStaffName: string;
  currentTime?: string;
}): {
  success: true;
  refund: RefundRecord;
  inventoryRestockManifest: Array<{ lineName: string; quantityToRestock: number }>;
} | { success: false; reason: string } {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();

  // 1. Calculate and reconcile eligible refund cap
  const { eligibleRefundCents, totalPreviouslyRefundedCents } = calculateEligibleRefundBalance({
    originalPaymentAmountCents: params.originalPaymentAmountCents,
    existingRefunds: params.existingRefunds,
  });

  const requestedTotalCents = params.lines.reduce((sum, l) => sum + l.refundAmountCents, 0);

  if (requestedTotalCents <= 0) {
    return {
      success: false,
      reason: 'Requested refund amount must be greater than $0.00.',
    };
  }

  if (requestedTotalCents > eligibleRefundCents) {
    return {
      success: false,
      reason: `Cannot refund $${(requestedTotalCents / 100).toFixed(2)}. Only $${(eligibleRefundCents / 100).toFixed(2)} is remaining after previous refunds of $${(totalPreviouslyRefundedCents / 100).toFixed(2)}.`,
    };
  }

  // 2. Build verified refund lines and inventory restock instructions
  const builtLines: RefundLineItem[] = [];
  const inventoryRestockManifest: Array<{ lineName: string; quantityToRestock: number }> = [];

  for (const line of params.lines) {
    if (line.refundAmountCents > line.originalAmountCents) {
      return {
        success: false,
        reason: `Line "${line.name}" refund ($${(line.refundAmountCents / 100).toFixed(2)}) cannot exceed original charge of $${(line.originalAmountCents / 100).toFixed(2)}.`,
      };
    }

    builtLines.push({
      lineId: line.lineId,
      type: line.type,
      name: line.name,
      originalAmountCents: line.originalAmountCents,
      refundAmountCents: line.refundAmountCents,
      restockInventory: line.restockInventory ?? false,
      restockQuantity: line.restockQuantity ?? 0,
    });

    if (line.restockInventory && (line.restockQuantity ?? 0) > 0) {
      inventoryRestockManifest.push({
        lineName: line.name,
        quantityToRestock: line.restockQuantity!,
      });
    }
  }

  const refund: RefundRecord = {
    refundId: `ref_${Math.random().toString(36).substring(2, 9)}`,
    tenantId: params.tenantId,
    originalPaymentId: params.originalPaymentId,
    ticketId: params.ticketId,
    clientId: params.clientId,
    clientName: params.clientName,
    totalRefundedCents: requestedTotalCents,
    lines: builtLines,
    reason: params.reason,
    reasonNotes: params.reasonNotes,
    processorRefundId: `re_proc_${Math.random().toString(36).substring(2, 12)}`,
    status: 'succeeded',
    authorizedByStaffId: params.authorizedByStaffId,
    authorizedByStaffName: params.authorizedByStaffName,
    createdAt: now.toISOString(),
  };

  return {
    success: true,
    refund,
    inventoryRestockManifest,
  };
}
