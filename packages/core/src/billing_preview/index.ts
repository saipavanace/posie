import { z } from 'zod';

/**
 * F061 — Usage & Bill Preview
 *
 * Provides real-time visibility into accrued subscription, staff seats, metered SMS messages,
 * terminal fees, and AI usage. Allows owners to set spending limits to prevent billing surprises.
 *
 * Invariant (WB C7, C14):
 * The preview explicitly differentiates fixed subscription from metered variable usage,
 * alerts at 80% and 100% of owner-defined spending caps, and reconciles to the estimated next invoice.
 */

export const BillingPlanTierSchema = z.enum(['solo_atelier', 'studio_team', 'flagship_salon']);
export type BillingPlanTier = z.infer<typeof BillingPlanTierSchema>;

export const BillLineItemSchema = z.object({
  id: z.string().uuid(),
  category: z.enum(['base_subscription', 'additional_staff_seat', 'sms_marketing_metered', 'hardware_terminal', 'ai_assistant', 'sales_tax']),
  description: z.string().min(1),
  quantity: z.number().nonnegative(),
  unitPriceCents: z.number().int().nonnegative(),
  subtotalCents: z.number().int().nonnegative(),
  isMeteredVariable: z.boolean(),
});
export type BillLineItem = z.infer<typeof BillLineItemSchema>;

export const SpendingCapStatusSchema = z.enum(['under_budget', 'warning_threshold_80', 'cap_reached_100']);
export type SpendingCapStatus = z.infer<typeof SpendingCapStatusSchema>;

export const BillingPreviewRecordSchema = z.object({
  previewId: z.string().uuid(),
  businessId: z.string().uuid(),
  billingCycleStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  billingCycleEnd: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  nextInvoiceDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  planTier: BillingPlanTierSchema,

  // Fixed & Variable Totals
  fixedSubscriptionTotalCents: z.number().int().nonnegative(),
  meteredUsageTotalCents: z.number().int().nonnegative(),
  estimatedTaxCents: z.number().int().nonnegative(),
  estimatedGrandTotalCents: z.number().int().nonnegative(),

  // Spending Cap Protection
  spendingCapCents: z.number().int().nonnegative().nullable(),
  spendingCapStatus: SpendingCapStatusSchema,
  overageAlertMessage: z.string().nullable(),

  // Line items breakdown
  lineItems: z.array(BillLineItemSchema),
  generatedAt: z.string().datetime(),
});
export type BillingPreviewRecord = z.infer<typeof BillingPreviewRecordSchema>;

/**
 * Standard baseline plan fees in cents
 */
export const PLAN_BASE_FEES_CENTS: Record<BillingPlanTier, number> = {
  solo_atelier: 2900,   // $29.00/mo
  studio_team: 7900,    // $79.00/mo
  flagship_salon: 14900, // $149.00/mo
};

export const SMS_COST_PER_SEGMENT_CENTS = 2; // $0.015 - $0.02 per segment
export const EXTRA_STAFF_SEAT_FEE_CENTS = 2000; // $20.00/mo
export const TERMINAL_RENTAL_FEE_CENTS = 1500;  // $15.00/mo

/**
 * Computes the real-time usage and upcoming bill preview.
 */
export function generateBillingPreview(params: {
  businessId: string;
  planTier: BillingPlanTier;
  billingCycleStart: string;
  billingCycleEnd: string;
  nextInvoiceDate: string;
  includedStaffSeats: number;
  totalActiveStaffCount: number;
  meteredSmsSegmentsUsed: number;
  activeTerminalsCount: number;
  aiAssistantMinutesUsed?: number;
  spendingCapCents?: number | null;
  taxRatePercent?: number; // e.g. 8.25
}): BillingPreviewRecord {
  const previewId = crypto.randomUUID ? crypto.randomUUID() : 'f0610000-0000-4000-8000-000000000001';
  const taxRate = params.taxRatePercent ?? 8.25;
  const lineItems: BillLineItem[] = [];

  // 1. Base Subscription
  const basePrice = PLAN_BASE_FEES_CENTS[params.planTier];
  const planNames: Record<BillingPlanTier, string> = {
    solo_atelier: 'Posie Solo Atelier Plan',
    studio_team: 'Posie Studio Team Plan',
    flagship_salon: 'Posie Flagship Salon Plan',
  };
  lineItems.push({
    id: crypto.randomUUID ? crypto.randomUUID() : 'f0610000-0000-4000-8000-000000000002',
    category: 'base_subscription',
    description: planNames[params.planTier],
    quantity: 1,
    unitPriceCents: basePrice,
    subtotalCents: basePrice,
    isMeteredVariable: false,
  });

  // 2. Extra Staff Seats
  const billableStaff = Math.max(0, params.totalActiveStaffCount - params.includedStaffSeats);
  let extraSeatsTotal = 0;
  if (billableStaff > 0) {
    extraSeatsTotal = billableStaff * EXTRA_STAFF_SEAT_FEE_CENTS;
    lineItems.push({
      id: crypto.randomUUID ? crypto.randomUUID() : 'f0610000-0000-4000-8000-000000000003',
      category: 'additional_staff_seat',
      description: `Additional Team Calendar Licenses (${billableStaff} active)`,
      quantity: billableStaff,
      unitPriceCents: EXTRA_STAFF_SEAT_FEE_CENTS,
      subtotalCents: extraSeatsTotal,
      isMeteredVariable: false,
    });
  }

  // 3. Hardware Terminal Rentals
  let terminalTotal = 0;
  if (params.activeTerminalsCount > 0) {
    terminalTotal = params.activeTerminalsCount * TERMINAL_RENTAL_FEE_CENTS;
    lineItems.push({
      id: crypto.randomUUID ? crypto.randomUUID() : 'f0610000-0000-4000-8000-000000000004',
      category: 'hardware_terminal',
      description: `Posie Tap-to-Pay Smart Terminal Rental (${params.activeTerminalsCount} active)`,
      quantity: params.activeTerminalsCount,
      unitPriceCents: TERMINAL_RENTAL_FEE_CENTS,
      subtotalCents: terminalTotal,
      isMeteredVariable: false,
    });
  }

  // 4. Metered SMS Messages
  const smsTotal = params.meteredSmsSegmentsUsed * SMS_COST_PER_SEGMENT_CENTS;
  if (params.meteredSmsSegmentsUsed > 0) {
    lineItems.push({
      id: crypto.randomUUID ? crypto.randomUUID() : 'f0610000-0000-4000-8000-000000000005',
      category: 'sms_marketing_metered',
      description: `Marketing & Appointment SMS Broadcasts (${params.meteredSmsSegmentsUsed.toLocaleString()} segments)`,
      quantity: params.meteredSmsSegmentsUsed,
      unitPriceCents: SMS_COST_PER_SEGMENT_CENTS,
      subtotalCents: smsTotal,
      isMeteredVariable: true,
    });
  }

  // 5. AI Assistant Minutes (optional add-on)
  const aiMinutes = params.aiAssistantMinutesUsed ?? 0;
  let aiTotal = 0;
  if (aiMinutes > 0) {
    aiTotal = aiMinutes * 10; // 10 cents per minute
    lineItems.push({
      id: crypto.randomUUID ? crypto.randomUUID() : 'f0610000-0000-4000-8000-000000000006',
      category: 'ai_assistant',
      description: `AI Receptionist Handled Call Minutes (${aiMinutes} mins)`,
      quantity: aiMinutes,
      unitPriceCents: 10,
      subtotalCents: aiTotal,
      isMeteredVariable: true,
    });
  }

  const fixedSubscriptionTotalCents = basePrice + extraSeatsTotal + terminalTotal;
  const meteredUsageTotalCents = smsTotal + aiTotal;

  // Spending cap check on metered usage
  const cap = params.spendingCapCents ?? null;
  let capStatus: SpendingCapStatus = 'under_budget';
  let alertMessage: string | null = null;

  if (cap && cap > 0) {
    const ratio = meteredUsageTotalCents / cap;
    if (ratio >= 1.0) {
      capStatus = 'cap_reached_100';
      alertMessage = `Monthly variable spend cap reached ($${(cap / 100).toFixed(2)}). Optional outbound promotional marketing is paused to protect against surprise overages.`;
    } else if (ratio >= 0.8) {
      capStatus = 'warning_threshold_80';
      alertMessage = `You have used ${(ratio * 100).toFixed(0)}% of your monthly $${(cap / 100).toFixed(2)} variable spend limit.`;
    }
  }

  // Estimated Taxes
  const taxableSubtotal = fixedSubscriptionTotalCents + meteredUsageTotalCents;
  const estimatedTaxCents = Math.round(taxableSubtotal * (taxRate / 100));

  const estimatedGrandTotalCents = taxableSubtotal + estimatedTaxCents;

  return BillingPreviewRecordSchema.parse({
    previewId,
    businessId: params.businessId,
    billingCycleStart: params.billingCycleStart,
    billingCycleEnd: params.billingCycleEnd,
    nextInvoiceDate: params.nextInvoiceDate,
    planTier: params.planTier,
    fixedSubscriptionTotalCents,
    meteredUsageTotalCents,
    estimatedTaxCents,
    estimatedGrandTotalCents,
    spendingCapCents: cap,
    spendingCapStatus: capStatus,
    overageAlertMessage: alertMessage,
    lineItems,
    generatedAt: new Date().toISOString(),
  });
}
