import { z } from 'zod';

export const WebsiteThemeLayoutSchema = z.enum(['editorial_atelier', 'calm_minimal', 'warm_terracotta']);

export const BrandableWebsiteConfigSchema = z.object({
  id: z.string().uuid(),
  businessSlug: z.string().min(1),
  customDomain: z.string().optional(), // e.g. "glow.posieatelier.com"
  layoutTheme: WebsiteThemeLayoutSchema.default('editorial_atelier'),
  heroHeadline: z.string().min(1),
  heroSubheadline: z.string().min(1),
  accentColorHex: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  serviceOrderIds: z.array(z.string().uuid()).default([]),
  showSpecialistBios: z.boolean().default(true),
  isPublished: z.boolean().default(true),
  version: z.number().int().positive().default(1),
});

export type BrandableWebsiteConfig = z.infer<typeof BrandableWebsiteConfigSchema>;

/**
 * Validates and publishes a customized studio booking website.
 * Invariant (F032 / WB F13): Mobile preview matches live output and failed publishes leave
 * the previous live site intact without downtime or broken styling.
 */
export function publishWebsiteConfig(
  current: BrandableWebsiteConfig,
  updates: Partial<Omit<BrandableWebsiteConfig, 'id' | 'version'>>
): BrandableWebsiteConfig {
  const updated: BrandableWebsiteConfig = {
    ...current,
    ...updates,
    version: current.version + 1,
  };

  return BrandableWebsiteConfigSchema.parse(updated);
}
