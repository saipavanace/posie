import { z } from 'zod';
import { ItemizedEstimate, ItemizedEstimateSchema } from '../estimates';

export const ProposalAcceptanceRecordSchema = z.object({
  id: z.string().uuid(),
  estimateId: z.string().uuid(),
  estimateVersionAccepted: z.number().int().positive(),
  selectedTierId: z.string().optional(),
  selectedLineItemIds: z.array(z.string()),
  acceptedTotalCents: z.number().int().nonnegative(),
  clientSignerName: z.string().min(1, 'Signer name is required'),
  clientIpOrUserAgent: z.string().optional(),
  acceptedAt: z.string().datetime(),
});

export type ProposalAcceptanceRecord = z.infer<typeof ProposalAcceptanceRecordSchema>;

export const ProposalInquirySchema = z.object({
  id: z.string().uuid(),
  estimateId: z.string().uuid(),
  clientQuestion: z.string().min(1),
  submittedAt: z.string().datetime(),
  resolved: z.boolean().default(false),
  resolvedAt: z.string().datetime().optional(),
});

export type ProposalInquiry = z.infer<typeof ProposalInquirySchema>;

/**
 * Accepts a specific version of a proposed service plan.
 * INVARIANT: Acceptance strictly refers to one exact version.
 * If the proposal was modified to a higher version, accepting an obsolete version is rejected.
 */
export function acceptProposalPlan(params: {
  acceptanceId?: string;
  estimate: ItemizedEstimate;
  expectedVersion: number;
  selectedTierId?: string;
  selectedLineItemIds: string[];
  clientSignerName: string;
}): {
  acceptanceRecord: ProposalAcceptanceRecord;
  updatedEstimate: ItemizedEstimate;
} {
  if (params.estimate.version !== params.expectedVersion) {
    throw new Error(
      `Cannot accept proposal. This proposal has been updated to version ${params.estimate.version}. Please review the newest version.`
    );
  }

  if (new Date() > new Date(params.estimate.validUntil)) {
    throw new Error('This proposal has expired. Please ask your service provider for an updated quote.');
  }

  // Calculate accepted total based on selected items
  const selectedItems = params.estimate.lineItems.filter((i) =>
    params.selectedLineItemIds.includes(i.id)
  );
  if (selectedItems.length === 0) {
    throw new Error('At least one item must be selected to accept the proposal.');
  }

  const acceptedSubtotal = selectedItems.reduce((acc, curr) => acc + curr.minPriceCents, 0);
  const tax = Math.round(acceptedSubtotal * (params.estimate.taxRatePercent / 100));
  const acceptedTotal = acceptedSubtotal + tax;

  const now = new Date().toISOString();
  const acceptanceRecord = ProposalAcceptanceRecordSchema.parse({
    id: params.acceptanceId || '20202020-0000-0000-0000-000000000045',
    estimateId: params.estimate.id,
    estimateVersionAccepted: params.estimate.version,
    selectedTierId: params.selectedTierId,
    selectedLineItemIds: params.selectedLineItemIds,
    acceptedTotalCents: acceptedTotal,
    clientSignerName: params.clientSignerName,
    acceptedAt: now,
  });

  const updatedEstimate = ItemizedEstimateSchema.parse({
    ...params.estimate,
    status: 'accepted',
    updatedAt: now,
  });

  return { acceptanceRecord, updatedEstimate };
}

/**
 * Submits a question on a proposal without canceling or invalidating it.
 */
export function submitProposalQuestion(params: {
  inquiryId?: string;
  estimateId: string;
  question: string;
}): ProposalInquiry {
  return ProposalInquirySchema.parse({
    id: params.inquiryId || '30303030-0000-0000-0000-000000000045',
    estimateId: params.estimateId,
    clientQuestion: params.question,
    submittedAt: new Date().toISOString(),
    resolved: false,
  });
}

/**
 * Creates a revised version of a proposal.
 * INVARIANT: Version increments, status resets to sent_to_client, and any prior acceptance is voided.
 */
export function reviseProposalEstimate(
  estimate: ItemizedEstimate,
  changes: {
    title?: string;
    lineItems?: ItemizedEstimate['lineItems'];
    discountCents?: number;
  }
): ItemizedEstimate {
  const now = new Date().toISOString();
  const nextVersion = estimate.version + 1;

  const updatedItems = changes.lineItems || estimate.lineItems;
  const rawMin = updatedItems.reduce((acc, curr) => acc + curr.minPriceCents, 0);
  const rawMax = updatedItems.reduce((acc, curr) => acc + curr.maxPriceCents, 0);
  const discount = changes.discountCents ?? estimate.discountCents;

  const subtotalMin = Math.max(0, rawMin - discount);
  const subtotalMax = Math.max(0, rawMax - discount);
  const tax = Math.round(subtotalMax * (estimate.taxRatePercent / 100));

  return ItemizedEstimateSchema.parse({
    ...estimate,
    title: changes.title || estimate.title,
    lineItems: updatedItems,
    discountCents: discount,
    totalMinCents: subtotalMin + tax,
    totalMaxCents: subtotalMax + tax,
    version: nextVersion,
    status: 'sent_to_client',
    updatedAt: now,
  });
}
