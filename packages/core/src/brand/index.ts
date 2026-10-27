import { z } from 'zod';

export const BrandKitSchema = z.object({
  id: z.string().uuid(),
  businessName: z.string().min(1, 'Business name is required'),
  tagline: z.string().optional(),
  contactEmail: z.string().email('Valid contact email is required'),
  contactPhone: z.string().min(7, 'Valid contact phone is required'),
  logoSvg: z.string().min(10, 'Valid SVG logo string is required'),
  accentColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a 6-digit hex color'),
  toneOfVoice: z.enum(['quirky-playful', 'calm-minimal', 'warm-editorial', 'bold-expressive']),
  version: z.number().int().positive().default(1),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type BrandKit = z.infer<typeof BrandKitSchema>;

/**
 * Ensures brand changes produce a new version without mutating historic snapshots.
 * Implements Rule BR05: Brand edits apply to new drafts/future outputs; issued records stay fixed.
 */
export function updateBrandKit(
  current: BrandKit,
  updates: Partial<Omit<BrandKit, 'id' | 'version' | 'createdAt'>>
): BrandKit {
  const updated: BrandKit = {
    ...current,
    ...updates,
    version: current.version + 1,
    updatedAt: new Date().toISOString(),
  };

  return BrandKitSchema.parse(updated);
}
