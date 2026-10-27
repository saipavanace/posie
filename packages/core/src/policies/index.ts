import { z } from 'zod';

export const BookingPolicySchema = z.object({
  id: z.string().uuid(),
  depositPercentage: z.number().min(0).max(100).default(20),
  cancellationNoticeHours: z.number().int().nonnegative().default(24),
  lateCancelFeePercentage: z.number().min(0).max(100).default(50),
  noShowFeePercentage: z.number().min(0).max(100).default(100),
  refundPolicyText: z.string().min(1, 'Refund policy must be clearly stated'),
  accessibilityContactEmail: z.string().email(),
  accessibilityContactPhone: z.string().min(7),
  stepFreeAccessAvailable: z.boolean().default(true),
  quietVisitAvailable: z.boolean().default(true),
  version: z.number().int().positive().default(1),
  effectiveDate: z.string().datetime(),
});

export type BookingPolicy = z.infer<typeof BookingPolicySchema>;

export const PolicySnapshotSchema = z.object({
  bookingId: z.string().uuid(),
  policyId: z.string().uuid(),
  policyVersion: z.number().int().positive(),
  snapshotTerms: z.string(),
  acknowledgedAt: z.string().datetime(),
  clientAcknowledged: z.boolean(),
});

export type PolicySnapshot = z.infer<typeof PolicySnapshotSchema>;

/**
 * Creates an immutable policy snapshot bound to a specific booking.
 * Invariant (F004 / D05): A booking binds to the exact policy snapshot active at the
 * time of booking. Retroactive policy edits never alter historical commitments.
 */
export function createPolicySnapshot(
  policy: BookingPolicy,
  bookingId: string
): PolicySnapshot {
  const termsText = [
    `Deposit: ${policy.depositPercentage}% required upon booking.`,
    `Cancellations: Must be made at least ${policy.cancellationNoticeHours} hours in advance.`,
    `Late cancellations: Subject to ${policy.lateCancelFeePercentage}% fee.`,
    `No-shows: Subject to ${policy.noShowFeePercentage}% fee.`,
    `Refunds: ${policy.refundPolicyText}`,
    `Accessibility accommodations: Contact ${policy.accessibilityContactEmail} or ${policy.accessibilityContactPhone}. Quiet visits: ${
      policy.quietVisitAvailable ? 'Available upon request' : 'Unavailable'
    }.`,
  ].join(' ');

  return {
    bookingId,
    policyId: policy.id,
    policyVersion: policy.version,
    snapshotTerms: termsText,
    acknowledgedAt: new Date().toISOString(),
    clientAcknowledged: true,
  };
}
