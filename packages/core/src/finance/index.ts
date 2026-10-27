import { z } from 'zod';

export const CostEstimationInputsSchema = z.object({
  subscriptionTier: z.enum(['solo', 'team', 'studio']).default('solo'),
  staffCount: z.number().int().nonnegative().default(1),
  locationCount: z.number().int().positive().default(1),
  monthlySmsCount: z.number().int().nonnegative().default(100),
  monthlyCreditCardVolumeInCents: z.number().int().nonnegative().default(500000), // $5,000 default
  addCustomDomain: z.boolean().default(false),
  addFormsAndWaiversUnlimited: z.boolean().default(true),
});

export const TotalCostEstimateSchema = z.object({
  baseSubscriptionCents: z.number().int(),
  extraStaffCents: z.number().int(),
  smsUsageCents: z.number().int(),
  estimatedCardProcessingCents: z.number().int(),
  addonsCents: z.number().int(),
  totalEstimatedMonthlyCostCents: z.number().int(),
  effectiveTakeRatePercentage: z.number(),
  breakdownExplanation: z.string(),
});

export type CostEstimationInputs = z.infer<typeof CostEstimationInputsSchema>;
export type TotalCostEstimate = z.infer<typeof TotalCostEstimateSchema>;

/**
 * Calculates a transparent total ownership cost preview.
 * Invariant (F017 / WB C7 C14): Owners see exactly how each dimension changes their bill
 * with zero hidden fees, clearly distinguishing fixed software fees from variable processing.
 */
export function calculateTotalCostEstimate(inputs: CostEstimationInputs): TotalCostEstimate {
  // Base subscription
  const baseTiers: Record<string, number> = {
    solo: 2900, // $29/mo
    team: 5900, // $59/mo
    studio: 9900, // $99/mo
  };
  const baseSubscriptionCents = baseTiers[inputs.subscriptionTier];

  // Extra staff: $15/staff after first 1 included in solo, 3 in team, 5 in studio
  const includedStaff = inputs.subscriptionTier === 'solo' ? 1 : inputs.subscriptionTier === 'team' ? 3 : 5;
  const extraStaff = Math.max(0, inputs.staffCount - includedStaff);
  const extraStaffCents = extraStaff * 1500;

  // SMS: 100 free/mo, then 2.5c per segment
  const billableSms = Math.max(0, inputs.monthlySmsCount - 100);
  const smsUsageCents = Math.round(billableSms * 2.5);

  // Card processing: 2.6% + 10c per transaction assumption (avg $75 ticket)
  const avgTicketCents = 7500;
  const estimatedTxCount = Math.round(inputs.monthlyCreditCardVolumeInCents / avgTicketCents);
  const estimatedCardProcessingCents = Math.round(
    inputs.monthlyCreditCardVolumeInCents * 0.026 + estimatedTxCount * 10
  );

  // Add-ons: Custom domain ($10/mo)
  const addonsCents = inputs.addCustomDomain ? 1000 : 0;

  const total =
    baseSubscriptionCents +
    extraStaffCents +
    smsUsageCents +
    estimatedCardProcessingCents +
    addonsCents;

  const effectiveTakeRatePercentage =
    inputs.monthlyCreditCardVolumeInCents > 0
      ? Number(((total / inputs.monthlyCreditCardVolumeInCents) * 100).toFixed(2))
      : 0;

  const explanation = [
    `Software Base (${inputs.subscriptionTier}): $${(baseSubscriptionCents / 100).toFixed(2)}`,
    extraStaff > 0 ? `Additional Specialists (${extraStaff}): $${(extraStaffCents / 100).toFixed(2)}` : null,
    billableSms > 0 ? `Metered SMS (${billableSms} beyond included 100): $${(smsUsageCents / 100).toFixed(2)}` : null,
    `Estimated Card Processing (2.6% + 10¢): $${(estimatedCardProcessingCents / 100).toFixed(2)}`,
    addonsCents > 0 ? `Custom Studio Domain: $${(addonsCents / 100).toFixed(2)}` : null,
  ]
    .filter(Boolean)
    .join(' • ');

  return {
    baseSubscriptionCents,
    extraStaffCents,
    smsUsageCents,
    estimatedCardProcessingCents,
    addonsCents,
    totalEstimatedMonthlyCostCents: total,
    effectiveTakeRatePercentage,
    breakdownExplanation: explanation,
  };
}
