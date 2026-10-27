import { z } from 'zod';

export const PricingModeSchema = z.enum(['fixed', 'range']);
export type PricingMode = z.infer<typeof PricingModeSchema>;

export const EstimateLineItemSchema = z.object({
  id: z.string(),
  itemType: z.enum(['service', 'product', 'addon', 'custom']),
  description: z.string().min(1, 'Description is required'),
  quantity: z.number().int().positive().default(1),
  estimatedDurationMinutes: z.number().int().nonnegative().default(0),
  // For fixed: minPriceCents === maxPriceCents
  minPriceCents: z.number().int().nonnegative(),
  maxPriceCents: z.number().int().nonnegative(),
  isOptional: z.boolean().default(false),
  isSelected: z.boolean().default(true),
});

export type EstimateLineItem = z.infer<typeof EstimateLineItemSchema>;

export const EstimateOptionTierSchema = z.object({
  tierId: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  itemIds: z.array(z.string()),
});

export type EstimateOptionTier = z.infer<typeof EstimateOptionTierSchema>;

export const ItemizedEstimateSchema = z.object({
  id: z.string().uuid(),
  estimateNumber: z.string().min(1),
  clientId: z.string().uuid(),
  businessId: z.string().uuid(),
  authorStaffId: z.string().uuid(),
  title: z.string().min(1),
  pricingMode: PricingModeSchema,
  lineItems: z.array(EstimateLineItemSchema).min(1, 'At least one line item is required'),
  optionTiers: z.array(EstimateOptionTierSchema).default([]),
  discountCents: z.number().int().nonnegative().default(0),
  taxRatePercent: z.number().nonnegative().default(0),
  depositRequiredCents: z.number().int().nonnegative().default(0),
  /** Total price calculation summaries */
  totalMinCents: z.number().int().nonnegative(),
  totalMaxCents: z.number().int().nonnegative(),
  estimatedTaxCents: z.number().int().nonnegative(),
  version: z.number().int().positive().default(1),
  validUntil: z.string().datetime(),
  disclaimer: z.string().default(
    'This is an itemized estimate, not a final charge. Actual costs depend on chosen options and personalized treatment adjustments.'
  ),
  status: z.enum(['draft', 'sent_to_client', 'accepted', 'revision_requested', 'expired']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type ItemizedEstimate = z.infer<typeof ItemizedEstimateSchema>;

/**
 * Creates an itemized estimate with fixed or range-based calculations.
 * INVARIANT: Distinguishes an estimate from a final charge or automated transaction.
 */
export function createItemizedEstimate(params: {
  id?: string;
  estimateNumber?: string;
  clientId: string;
  businessId: string;
  authorStaffId: string;
  title: string;
  lineItems: Array<{
    id?: string;
    itemType: 'service' | 'product' | 'addon' | 'custom';
    description: string;
    quantity?: number;
    estimatedDurationMinutes?: number;
    minPriceCents: number;
    maxPriceCents?: number; // if omitted, treated as fixed
    isOptional?: boolean;
    isSelected?: boolean;
  }>;
  optionTiers?: EstimateOptionTier[];
  discountCents?: number;
  taxRatePercent?: number;
  depositPercent?: number; // e.g. 20%
  validityDays?: number;
}): ItemizedEstimate {
  const now = new Date().toISOString();
  const validityDays = params.validityDays ?? 30;
  const validUntilDate = new Date();
  validUntilDate.setDate(validUntilDate.getDate() + validityDays);

  const items: EstimateLineItem[] = params.lineItems.map((item, idx) => {
    const qty = item.quantity ?? 1;
    const minCents = item.minPriceCents * qty;
    const maxCents = (item.maxPriceCents ?? item.minPriceCents) * qty;

    return {
      id: item.id || `est-item-${idx + 1}`,
      itemType: item.itemType,
      description: item.description,
      quantity: qty,
      estimatedDurationMinutes: item.estimatedDurationMinutes ?? 0,
      minPriceCents: minCents,
      maxPriceCents: maxCents,
      isOptional: item.isOptional ?? false,
      isSelected: item.isSelected ?? true,
    };
  });

  const selectedItems = items.filter((i) => i.isSelected);
  const rawMin = selectedItems.reduce((acc, curr) => acc + curr.minPriceCents, 0);
  const rawMax = selectedItems.reduce((acc, curr) => acc + curr.maxPriceCents, 0);

  const discount = params.discountCents ?? 0;
  const subtotalMin = Math.max(0, rawMin - discount);
  const subtotalMax = Math.max(0, rawMax - discount);

  const taxRate = params.taxRatePercent ?? 0;
  const estimatedTax = Math.round(subtotalMax * (taxRate / 100));

  const totalMin = subtotalMin + estimatedTax;
  const totalMax = subtotalMax + estimatedTax;

  const depositRate = params.depositPercent ?? 0;
  const depositRequired = Math.round(totalMin * (depositRate / 100));

  const isRange = rawMin !== rawMax;

  return ItemizedEstimateSchema.parse({
    id: params.id || '10101010-0000-0000-0000-000000000044',
    estimateNumber: params.estimateNumber || `EST-${Date.now().toString().slice(-6)}`,
    clientId: params.clientId,
    businessId: params.businessId,
    authorStaffId: params.authorStaffId,
    title: params.title,
    pricingMode: isRange ? 'range' : 'fixed',
    lineItems: items,
    optionTiers: params.optionTiers || [],
    discountCents: discount,
    taxRatePercent: taxRate,
    depositRequiredCents: depositRequired,
    totalMinCents: totalMin,
    totalMaxCents: totalMax,
    estimatedTaxCents: estimatedTax,
    version: 1,
    validUntil: validUntilDate.toISOString(),
    status: 'sent_to_client',
    createdAt: now,
    updatedAt: now,
  });
}
