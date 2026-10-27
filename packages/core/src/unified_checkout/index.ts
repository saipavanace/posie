import { z } from 'zod';

export const TicketItemTypeSchema = z.enum([
  'service',
  'retail_product',
  'package_series',
  'service_add_on',
]);
export type TicketItemType = z.infer<typeof TicketItemTypeSchema>;

export const TicketLineItemSchema = z.object({
  lineId: z.string(),
  type: TicketItemTypeSchema,
  name: z.string(),
  unitPriceCents: z.number().nonnegative(),
  quantity: z.number().int().positive().default(1),
  totalPriceCents: z.number().nonnegative(),
  isTaxable: z.boolean().default(false),
  specialistStaffId: z.string().optional(),
});
export type TicketLineItem = z.infer<typeof TicketLineItemSchema>;

export const TenderPaymentSchema = z.object({
  paymentId: z.string(),
  method: z.enum(['credit_card', 'cash', 'gift_card', 'package_allowance', 'apple_pay']),
  amountCents: z.number().positive(),
  appliedAt: z.string().datetime(),
  referenceId: z.string().optional(),
});
export type TenderPayment = z.infer<typeof TenderPaymentSchema>;

export const UnifiedCheckoutTicketSchema = z.object({
  ticketId: z.string(),
  tenantId: z.string(),
  clientId: z.string(),
  clientName: z.string(),
  items: z.array(TicketLineItemSchema),
  subtotalCents: z.number().nonnegative(),
  taxCents: z.number().nonnegative(),
  tipCents: z.number().nonnegative().default(0),
  grossTotalDueCents: z.number().nonnegative(),
  totalPaidCents: z.number().nonnegative().default(0),
  remainingBalanceDueCents: z.number().nonnegative(),
  tenders: z.array(TenderPaymentSchema).default([]),
  status: z.enum(['open', 'partially_paid', 'fully_paid', 'voided']).default('open'),
  clientHostedPayToken: z.string(),
  createdAt: z.string().datetime(),
  closedAt: z.string().datetime().optional(),
});
export type UnifiedCheckoutTicket = z.infer<typeof UnifiedCheckoutTicketSchema>;

/**
 * Builds an itemized unified checkout ticket combining services, retail, and add-ons.
 */
export function buildUnifiedCheckoutTicket(params: {
  tenantId: string;
  clientId: string;
  clientName: string;
  items: Array<{
    type: TicketItemType;
    name: string;
    unitPriceCents: number;
    quantity?: number;
    isTaxable?: boolean;
    specialistStaffId?: string;
  }>;
  salesTaxRate?: number; // e.g. 0.08875 for 8.875% NYC tax
  currentTime?: string;
}): UnifiedCheckoutTicket {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();
  const taxRate = params.salesTaxRate ?? 0.08875;

  let subtotalCents = 0;
  let taxableSubtotalCents = 0;

  const builtItems: TicketLineItem[] = params.items.map((item, idx) => {
    const qty = item.quantity ?? 1;
    const total = item.unitPriceCents * qty;
    subtotalCents += total;
    if (item.isTaxable) {
      taxableSubtotalCents += total;
    }
    return {
      lineId: `line_${idx + 1}_${Math.random().toString(36).substring(2, 6)}`,
      type: item.type,
      name: item.name,
      unitPriceCents: item.unitPriceCents,
      quantity: qty,
      totalPriceCents: total,
      isTaxable: item.isTaxable ?? false,
      specialistStaffId: item.specialistStaffId,
    };
  });

  const taxCents = Math.round(taxableSubtotalCents * taxRate);
  const grossTotalDueCents = subtotalCents + taxCents;

  const ticketId = `tkt_${Math.random().toString(36).substring(2, 9)}`;
  const clientHostedPayToken = `pay_${Math.random().toString(36).substring(2, 14)}`;

  return {
    ticketId,
    tenantId: params.tenantId,
    clientId: params.clientId,
    clientName: params.clientName,
    items: builtItems,
    subtotalCents,
    taxCents,
    tipCents: 0,
    grossTotalDueCents,
    totalPaidCents: 0,
    remainingBalanceDueCents: grossTotalDueCents,
    tenders: [],
    status: 'open',
    clientHostedPayToken,
    createdAt: now.toISOString(),
  };
}

/**
 * Adds an optional tip to the ticket.
 * Invariant: Works cleanly even when service balance is $0 (e.g. package redemption).
 */
export function addTipToTicket(
  ticket: UnifiedCheckoutTicket,
  tipCents: number
): UnifiedCheckoutTicket {
  if (tipCents < 0) {
    throw new Error('Tip amount cannot be negative.');
  }

  const newGrossTotalDueCents = ticket.subtotalCents + ticket.taxCents + tipCents;
  const newRemainingBalanceDueCents = Math.max(0, newGrossTotalDueCents - ticket.totalPaidCents);

  return {
    ...ticket,
    tipCents,
    grossTotalDueCents: newGrossTotalDueCents,
    remainingBalanceDueCents: newRemainingBalanceDueCents,
  };
}

/**
 * Applies a partial tender payment (split tender: gift card, cash, card, etc.).
 * Invariant: "Partial payments, taxes, tips and refunds remain separately traceable."
 */
export function applySplitTenderPayment(params: {
  ticket: UnifiedCheckoutTicket;
  method: TenderPayment['method'];
  amountCents: number;
  referenceId?: string;
  currentTime?: string;
}): {
  updatedTicket: UnifiedCheckoutTicket;
  payment: TenderPayment;
  isFullySettled: boolean;
} {
  const now = params.currentTime ? new Date(params.currentTime) : new Date();

  if (ticketIsFullyPaid(params.ticket)) {
    throw new Error(`Ticket "${params.ticket.ticketId}" is already fully settled.`);
  }

  if (params.amountCents > params.ticket.remainingBalanceDueCents) {
    throw new Error(
      `Tender payment amount ($${(params.amountCents / 100).toFixed(2)}) exceeds remaining balance due ($${(params.ticket.remainingBalanceDueCents / 100).toFixed(2)}).`
    );
  }

  const payment: TenderPayment = {
    paymentId: `pay_${Math.random().toString(36).substring(2, 9)}`,
    method: params.method,
    amountCents: params.amountCents,
    appliedAt: now.toISOString(),
    referenceId: params.referenceId,
  };

  const newTotalPaidCents = params.ticket.totalPaidCents + params.amountCents;
  const newRemaining = Math.max(0, params.ticket.grossTotalDueCents - newTotalPaidCents);
  const isFullySettled = newRemaining === 0;

  const updatedTicket: UnifiedCheckoutTicket = {
    ...params.ticket,
    tenders: [...params.ticket.tenders, payment],
    totalPaidCents: newTotalPaidCents,
    remainingBalanceDueCents: newRemaining,
    status: isFullySettled ? 'fully_paid' : 'partially_paid',
    closedAt: isFullySettled ? now.toISOString() : undefined,
  };

  return {
    updatedTicket,
    payment,
    isFullySettled,
  };
}

function ticketIsFullyPaid(ticket: UnifiedCheckoutTicket): boolean {
  return ticket.status === 'fully_paid' || ticket.remainingBalanceDueCents === 0;
}
