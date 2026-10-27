import { z } from 'zod';

export const ContentBlockSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'Title is required'),
  category: z.enum(['service_plan', 'consent_waiver', 'cancellation_policy', 'staff_agreement', 'aftercare']),
  content: z.string().min(1, 'Content body is required'),
  applicableServiceIds: z.array(z.string().uuid()).default([]),
  version: z.number().int().positive().default(1),
  approvedBy: z.string().min(1, 'Author/Reviewer approval name is required'),
  reviewType: z.enum(['business_owner', 'legal_counsel', 'licensed_esthetician']),
  reviewDate: z.string().datetime(),
  active: z.boolean().default(true),
});

export type ContentBlock = z.infer<typeof ContentBlockSchema>;

/**
 * Validates and publishes a new version of an approved content block.
 * Invariant (F008 / DR02): Editing legal or clinical clauses requires named approval
 * and version incrementation before release. Historical issued records are never mutated.
 */
export function updateContentBlock(
  current: ContentBlock,
  updates: Partial<Omit<ContentBlock, 'id' | 'version'>>,
  approvedBy: string,
  reviewType: ContentBlock['reviewType']
): ContentBlock {
  const updated = {
    ...current,
    ...updates,
    version: current.version + 1,
    approvedBy,
    reviewType,
    reviewDate: new Date().toISOString(),
  };

  return ContentBlockSchema.parse(updated);
}
