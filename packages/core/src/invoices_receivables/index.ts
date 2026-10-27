/**
 * F199: Invoices and Receivables
 *
 * Issues sequentially numbered invoices with due dates, staged milestone payments, paid/remaining balances,
 * automated reminder schedules, credit notes, and receivables aging reports.
 * Invariant: Partial payments and refunds reconcile on the financial ledger without rewriting historical issued invoices
 * or double-billing clients.
 */

export interface InvoiceLineItem {
  lineId: string;
  description: string;
  quantity: number;
  unitPriceUsd: number;
  totalPriceUsd: number;
}

export interface CommercialInvoice {
  invoiceId: string;
  invoiceSequenceNumber: string; // e.g. "INV-2026-0001"
  issuerSalonId: string;
  clientInfo: {
    clientId: string;
    fullName: string;
    email: string;
  };
  issueDate: string; // YYYY-MM-DD
  dueDate: string; // YYYY-MM-DD
  lineItems: InvoiceLineItem[];
  subtotalUsd: number;
  taxAmountUsd: number;
  totalInvoiceAmountUsd: number;
  amountPaidUsd: number;
  remainingBalanceUsd: number;
  creditNotesAppliedUsd: number;
  hostedPaymentUrl: string;
  status: 'draft' | 'issued' | 'partially_paid' | 'paid_in_full' | 'past_due' | 'voided';
}

export interface ReceivablesAgingReport {
  salonId: string;
  asOfDate: string;
  totalReceivablesOutstandingUsd: number;
  current0To30DaysUsd: number;
  aging31To60DaysUsd: number;
  aging61To90DaysUsd: number;
  aging90PlusDaysUsd: number;
  unpaidInvoicesCount: number;
}

/**
 * Creates and issues a commercial numbered invoice for client treatments, bridal milestones, or retail orders.
 */
export function createCommercialInvoice(params: {
  invoiceSequenceNumber: string;
  issuerSalonId: string;
  clientInfo: { clientId: string; fullName: string; email: string };
  dueDate: string;
  lineItems: Array<{ description: string; quantity: number; unitPriceUsd: number }>;
  taxRate?: number;
  issueDate?: string;
}): CommercialInvoice {
  const issueDate = params.issueDate || new Date().toISOString().split('T')[0];
  const invoiceId = `inv_${params.invoiceSequenceNumber.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${Date.now()}`;

  const lineItems: InvoiceLineItem[] = params.lineItems.map((item, idx) => ({
    lineId: `line_${idx + 1}`,
    description: item.description,
    quantity: item.quantity,
    unitPriceUsd: item.unitPriceUsd,
    totalPriceUsd: Math.round(item.quantity * item.unitPriceUsd * 100) / 100,
  }));

  const subtotalUsd = lineItems.reduce((sum, item) => sum + item.totalPriceUsd, 0);
  const taxRate = params.taxRate || 0.08875; // NY default
  const taxAmountUsd = Math.round(subtotalUsd * taxRate * 100) / 100;
  const totalInvoiceAmountUsd = Math.round((subtotalUsd + taxAmountUsd) * 100) / 100;

  return {
    invoiceId,
    invoiceSequenceNumber: params.invoiceSequenceNumber,
    issuerSalonId: params.issuerSalonId,
    clientInfo: params.clientInfo,
    issueDate,
    dueDate: params.dueDate,
    lineItems,
    subtotalUsd: Math.round(subtotalUsd * 100) / 100,
    taxAmountUsd,
    totalInvoiceAmountUsd,
    amountPaidUsd: 0,
    remainingBalanceUsd: totalInvoiceAmountUsd,
    creditNotesAppliedUsd: 0,
    hostedPaymentUrl: `https://pay.posie.app/invoices/${invoiceId}`,
    status: 'issued',
  };
}

/**
 * Applies a partial payment or staged milestone payment to an existing issued invoice.
 * Reconciles the ledger balance without rewriting the historical issued invoice.
 */
export function recordInvoicePayment(
  invoice: CommercialInvoice,
  paymentAmount: number
): CommercialInvoice {
  if (paymentAmount <= 0) {
    throw new Error('Payment amount must be greater than zero.');
  }

  const updatedPaid = Math.round((invoice.amountPaidUsd + paymentAmount) * 100) / 100;
  const updatedRemaining = Math.max(0, Math.round((invoice.totalInvoiceAmountUsd - updatedPaid - invoice.creditNotesAppliedUsd) * 100) / 100);

  const isFullyPaid = updatedRemaining === 0;

  return {
    ...invoice,
    amountPaidUsd: updatedPaid,
    remainingBalanceUsd: updatedRemaining,
    status: isFullyPaid ? 'paid_in_full' : 'partially_paid',
  };
}

/**
 * Applies a credit note to an invoice to offset a dispute or return without modifying original items.
 */
export function applyCreditNoteToInvoice(
  invoice: CommercialInvoice,
  creditAmount: number
): CommercialInvoice {
  if (creditAmount <= 0) {
    throw new Error('Credit amount must be greater than zero.');
  }

  const updatedCredits = Math.round((invoice.creditNotesAppliedUsd + creditAmount) * 100) / 100;
  const updatedRemaining = Math.max(0, Math.round((invoice.totalInvoiceAmountUsd - invoice.amountPaidUsd - updatedCredits) * 100) / 100);

  return {
    ...invoice,
    creditNotesAppliedUsd: updatedCredits,
    remainingBalanceUsd: updatedRemaining,
    status: updatedRemaining === 0 ? 'paid_in_full' : invoice.status,
  };
}

/**
 * Generates an accounts receivables aging report across active open invoices.
 */
export function generateReceivablesAgingReport(
  salonId: string,
  invoices: CommercialInvoice[],
  asOfDate = new Date().toISOString().split('T')[0]
): ReceivablesAgingReport {
  const asOfTime = new Date(asOfDate + 'T00:00:00Z').getTime();
  const openInvoices = invoices.filter(
    (inv) => inv.issuerSalonId === salonId && inv.remainingBalanceUsd > 0 && inv.status !== 'voided'
  );

  let current0To30 = 0;
  let aging31To60 = 0;
  let aging61To90 = 0;
  let aging90Plus = 0;

  for (const inv of openInvoices) {
    const dueTime = new Date(inv.dueDate + 'T00:00:00Z').getTime();
    const daysPastDue = Math.max(0, Math.floor((asOfTime - dueTime) / (24 * 60 * 60 * 1000)));

    if (daysPastDue <= 30) {
      current0To30 += inv.remainingBalanceUsd;
    } else if (daysPastDue <= 60) {
      aging31To60 += inv.remainingBalanceUsd;
    } else if (daysPastDue <= 90) {
      aging61To90 += inv.remainingBalanceUsd;
    } else {
      aging90Plus += inv.remainingBalanceUsd;
    }
  }

  const totalOutstanding = current0To30 + aging31To60 + aging61To90 + aging90Plus;

  return {
    salonId,
    asOfDate,
    totalReceivablesOutstandingUsd: Math.round(totalOutstanding * 100) / 100,
    current0To30DaysUsd: Math.round(current0To30 * 100) / 100,
    aging31To60DaysUsd: Math.round(aging31To60 * 100) / 100,
    aging61To90DaysUsd: Math.round(aging61To90 * 100) / 100,
    aging90PlusDaysUsd: Math.round(aging90Plus * 100) / 100,
    unpaidInvoicesCount: openInvoices.length,
  };
}
