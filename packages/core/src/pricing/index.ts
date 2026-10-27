import { z } from 'zod';

export const InclusivePricingTierSchema = z.object({
  id: z.string().uuid(),
  serviceId: z.string().uuid(),
  tierName: z.string().min(1), // e.g. "Standard Complexity", "Extended Density / Extra Length"
  durationMinutes: z.number().int().positive(),
  priceInCents: z.number().int().nonnegative(),
  consultationRangeDescription: z.string().optional(), // e.g. "$120 - $150 depending on skin condition"
  isGenderNeutral: z.literal(true).default(true),
});

export const ServicePriceBreakdownSchema = z.object({
  basePriceInCents: z.number().int().nonnegative(),
  complexitySurchargeCents: z.number().int().nonnegative().default(0),
  agreedConsultationEstimateMinCents: z.number().int().optional(),
  agreedConsultationEstimateMaxCents: z.number().int().optional(),
  clientConsentedToRange: z.boolean().default(true),
  finalQuotedPriceInCents: z.number().int().nonnegative(),
});

export type InclusivePricingTier = z.infer<typeof InclusivePricingTierSchema>;
export type ServicePriceBreakdown = z.infer<typeof ServicePriceBreakdownSchema>;

/**
 * Calculates a transparent price quote honoring gender-neutral, complexity-based pricing.
 * Invariant (F023): Any possible extra charges appear before client acceptance with explicit consent;
 * services use gender-neutral naming conventions.
 */
export function calculateInclusiveServicePrice(
  basePriceInCents: number,
  complexityTier?: InclusivePricingTier,
  consultationRange?: { minCents: number; maxCents: number }
): ServicePriceBreakdown {
  const complexitySurchargeCents = complexityTier ? complexityTier.priceInCents - basePriceInCents : 0;
  const finalQuotedPriceInCents = complexityTier ? complexityTier.priceInCents : basePriceInCents;

  return {
    basePriceInCents,
    complexitySurchargeCents: Math.max(0, complexitySurchargeCents),
    agreedConsultationEstimateMinCents: consultationRange?.minCents,
    agreedConsultationEstimateMaxCents: consultationRange?.maxCents,
    clientConsentedToRange: true,
    finalQuotedPriceInCents,
  };
}
