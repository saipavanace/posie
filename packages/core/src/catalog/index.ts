import { z } from 'zod';

export const ServiceAddonSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  priceInCents: z.number().int().nonnegative(),
  durationMinutes: z.number().int().positive(),
  description: z.string().optional(),
});

export const PractitionerOverrideSchema = z.object({
  practitionerId: z.string().uuid(),
  priceInCents: z.number().int().nonnegative().optional(),
  durationMinutes: z.number().int().positive().optional(),
  effectiveFrom: z.string().datetime(),
  effectiveTo: z.string().datetime().optional(),
});

export const ServiceSchema = z.object({
  id: z.string().uuid(),
  categoryId: z.string().uuid(),
  name: z.string().min(1, 'Service name is required'),
  clientDescription: z.string().min(1, 'Client-friendly explanation is required'),
  preparationInstructions: z.string().optional(),
  aftercareSummary: z.string().optional(),
  basePriceInCents: z.number().int().nonnegative('Price cannot be negative'),
  baseDurationMinutes: z.number().int().positive('Duration must be positive'),
  active: z.boolean().default(true),
  addons: z.array(ServiceAddonSchema).default([]),
  practitionerOverrides: z.array(PractitionerOverrideSchema).default([]),
  version: z.number().int().positive().default(1),
});

export type Service = z.infer<typeof ServiceSchema>;
export type ServiceAddon = z.infer<typeof ServiceAddonSchema>;
export type PractitionerOverride = z.infer<typeof PractitionerOverrideSchema>;

/**
 * Calculates effective price and duration for a given practitioner at a specific time.
 * Invariant: Honors practitioner-specific overrides if within active effective window.
 */
export function getEffectiveServiceQuote(
  service: Service,
  practitionerId?: string,
  targetDate: Date = new Date()
): { priceInCents: number; durationMinutes: number; hasOverride: boolean } {
  if (!practitionerId) {
    return {
      priceInCents: service.basePriceInCents,
      durationMinutes: service.baseDurationMinutes,
      hasOverride: false,
    };
  }

  const targetIso = targetDate.toISOString();
  const override = service.practitionerOverrides.find(
    (o) =>
      o.practitionerId === practitionerId &&
      o.effectiveFrom <= targetIso &&
      (!o.effectiveTo || o.effectiveTo >= targetIso)
  );

  if (!override) {
    return {
      priceInCents: service.basePriceInCents,
      durationMinutes: service.baseDurationMinutes,
      hasOverride: false,
    };
  }

  return {
    priceInCents: override.priceInCents ?? service.basePriceInCents,
    durationMinutes: override.durationMinutes ?? service.baseDurationMinutes,
    hasOverride: true,
  };
}
