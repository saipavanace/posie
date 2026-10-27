import { z } from 'zod';

export const ClauseReviewTypeSchema = z.enum([
  'business_supplied',
  'counsel_reviewed',
  'clinician_reviewed',
]);

export type ClauseReviewType = z.infer<typeof ClauseReviewTypeSchema>;

export const ClauseCategorySchema = z.enum([
  'general_policy',
  'informed_consent',
  'contraindication_waiver',
  'cancellation_terms',
  'staff_contract',
]);

export type ClauseCategory = z.infer<typeof ClauseCategorySchema>;

export const DocumentClauseSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'Clause title is required'),
  category: ClauseCategorySchema,
  contentMarkdown: z.string().min(1, 'Clause content is required'),
  version: z.number().int().positive().default(1),
  reviewType: ClauseReviewTypeSchema.default('business_supplied'),
  reviewerStaffId: z.string().uuid().optional(),
  reviewerName: z.string().optional(),
  reviewedAt: z.string().datetime().optional(),
  reviewNotes: z.string().optional(),
  applicableServiceIds: z.array(z.string().uuid()).default([]),
  isPublished: z.boolean().default(false),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type DocumentClause = z.infer<typeof DocumentClauseSchema>;

/**
 * Imports or drafts a new reusable policy or consent clause.
 */
export function importDocumentClause(params: {
  id?: string;
  title: string;
  category: ClauseCategory;
  contentMarkdown: string;
  applicableServiceIds?: string[];
  reviewType?: ClauseReviewType;
}): DocumentClause {
  const now = new Date().toISOString();
  return DocumentClauseSchema.parse({
    id: params.id || '40404040-4040-4040-4040-404040404053',
    title: params.title,
    category: params.category,
    contentMarkdown: params.contentMarkdown,
    version: 1,
    reviewType: params.reviewType || 'business_supplied',
    applicableServiceIds: params.applicableServiceIds || [],
    isPublished: false,
    createdAt: now,
    updatedAt: now,
  });
}

/**
 * Conducts a named legal or clinical review on a document clause.
 * INVARIANT: Distinguishes business-supplied, counsel-reviewed, and clinician-reviewed content
 * without claiming a blanket 'compliant' badge.
 */
export function recordClauseReview(
  clause: DocumentClause,
  params: {
    reviewerStaffId: string;
    reviewerName: string;
    reviewType: 'counsel_reviewed' | 'clinician_reviewed' | 'business_supplied';
    reviewNotes: string;
  }
): DocumentClause {
  const now = new Date().toISOString();
  return DocumentClauseSchema.parse({
    ...clause,
    reviewType: params.reviewType,
    reviewerStaffId: params.reviewerStaffId,
    reviewerName: params.reviewerName,
    reviewedAt: now,
    reviewNotes: params.reviewNotes,
    updatedAt: now,
  });
}

/**
 * Publishes a clause so it actively attaches to client service documents.
 * INVARIANT: Informed consent and contraindication waivers require named review before publishing.
 */
export function publishDocumentClause(clause: DocumentClause): DocumentClause {
  const requiresSpecialistReview =
    clause.category === 'informed_consent' ||
    clause.category === 'contraindication_waiver';

  if (requiresSpecialistReview && !clause.reviewerStaffId) {
    throw new Error(
      `Cannot publish clause "${clause.title}": Clinical and informed consent clauses require a named reviewer before publication.`
    );
  }

  const now = new Date().toISOString();
  return DocumentClauseSchema.parse({
    ...clause,
    isPublished: true,
    updatedAt: now,
  });
}

/**
 * Retrieves all published, approved clauses that map to a specific service.
 */
export function getApprovedClausesForService(
  clauses: DocumentClause[],
  serviceId: string
): DocumentClause[] {
  return clauses.filter(
    (c) =>
      c.isPublished &&
      (c.applicableServiceIds.length === 0 || c.applicableServiceIds.includes(serviceId))
  );
}
