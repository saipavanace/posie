import { z } from 'zod';

export const PortfolioItemSchema = z.object({
  id: z.string().uuid(),
  imageUrl: z.string().url(),
  caption: z.string().min(1),
  serviceId: z.string().uuid().optional(),
  clientConsentGranted: z.boolean().default(false),
});

export const StaffProfileSchema = z.object({
  id: z.string().uuid(),
  fullName: z.string().min(1, 'Staff name is required'),
  displayName: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().min(1, 'Bio is required'),
  avatarUrl: z.string().url().optional(),
  languages: z.array(z.string()).default(['English']),
  skills: z.array(z.string()).default([]),
  eligibleServiceIds: z.array(z.string().uuid()).default([]),
  isPublic: z.boolean().default(false),
  active: z.boolean().default(true),
  portfolioItems: z.array(PortfolioItemSchema).default([]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type StaffProfile = z.infer<typeof StaffProfileSchema>;
export type PortfolioItem = z.infer<typeof PortfolioItemSchema>;

/**
 * Filters staff profiles for public client presentation.
 * Invariant (F003): Unpublished staff never appear in public search/booking,
 * and portfolio images without client consent are never exposed.
 */
export function filterStaffForPublicDisplay(profiles: StaffProfile[]): Array<
  Omit<StaffProfile, 'portfolioItems'> & {
    portfolioItems: PortfolioItem[];
  }
> {
  return profiles
    .filter((p) => p.active && p.isPublic)
    .map((p) => ({
      ...p,
      portfolioItems: p.portfolioItems.filter((item) => item.clientConsentGranted),
    }));
}
