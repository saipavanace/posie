import { z } from 'zod';

export const ReviewChannelSchema = z.enum(['sms', 'email']);
export type ReviewChannel = z.infer<typeof ReviewChannelSchema>;

export const FairReviewInvitationSchema = z.object({
  id: z.string().uuid(),
  appointmentId: z.string().uuid(),
  clientId: z.string().uuid(),
  clientName: z.string().min(1),
  recipientDestination: z.string().min(1),
  channel: ReviewChannelSchema,
  serviceName: z.string().min(1),
  practitionerName: z.string().min(1),
  /** Canonical direct public review link (Google Maps / Yelp) */
  publicReviewUrl: z.string().url(),
  /** Optional private salon survey rating (1-5), never gates public review link */
  privateRatingStars: z.number().int().min(1).max(5).optional(),
  privateFeedbackText: z.string().optional(),
  feedbackSubmittedAt: z.string().datetime().optional(),
  sentAt: z.string().datetime(),
  /** Explicit anti-gating verification flag */
  isPublicLinkAlwaysVisible: z.literal(true).default(true),
});

export type FairReviewInvitation = z.infer<typeof FairReviewInvitationSchema>;

/**
 * Checks whether a client is eligible for a review request.
 * Prevents spamming: rate-limits review requests to once every 60 days.
 */
export function isEligibleForReviewRequest(params: {
  appointmentCompleted: boolean;
  lastReviewRequestSentAt?: string;
  cooldownDays?: number;
}): { isEligible: boolean; reason?: string } {
  if (!params.appointmentCompleted) {
    return {
      isEligible: false,
      reason: 'Review invitations can only be dispatched after an appointment is completed.',
    };
  }

  if (params.lastReviewRequestSentAt) {
    const cooldown = params.cooldownDays ?? 60;
    const cooldownMs = cooldown * 24 * 60 * 60 * 1000;
    const elapsed = Date.now() - new Date(params.lastReviewRequestSentAt).getTime();

    if (elapsed < cooldownMs) {
      const remainingDays = Math.ceil((cooldownMs - elapsed) / (24 * 60 * 60 * 1000));
      return {
        isEligible: false,
        reason: `Client received a review request recently. Eligible again in ${remainingDays} days.`,
      };
    }
  }

  return { isEligible: true };
}

/**
 * Dispatches a fair, anti-gating review invitation.
 * CRITICAL INVARIANT (WB F44, U11): Strictly complies with FTC guidelines against review gating.
 * Public review link is delivered directly and openly; it is NEVER screened or hidden
 * based on whether private feedback is positive or negative.
 */
export function createFairReviewInvitation(params: {
  id?: string;
  appointmentId: string;
  clientId: string;
  clientName: string;
  recipientDestination: string;
  channel: ReviewChannel;
  serviceName: string;
  practitionerName: string;
  publicReviewUrl: string;
  appointmentCompleted: boolean;
  lastReviewRequestSentAt?: string;
}): FairReviewInvitation {
  const eligibility = isEligibleForReviewRequest({
    appointmentCompleted: params.appointmentCompleted,
    lastReviewRequestSentAt: params.lastReviewRequestSentAt,
  });

  if (!eligibility.isEligible) {
    throw new Error(`Cannot send review invitation: ${eligibility.reason}`);
  }

  const now = new Date().toISOString();
  return FairReviewInvitationSchema.parse({
    id: params.id || '80808080-0000-0000-0000-000000000050',
    appointmentId: params.appointmentId,
    clientId: params.clientId,
    clientName: params.clientName,
    recipientDestination: params.recipientDestination,
    channel: params.channel,
    serviceName: params.serviceName,
    practitionerName: params.practitionerName,
    publicReviewUrl: params.publicReviewUrl,
    sentAt: now,
    isPublicLinkAlwaysVisible: true,
  });
}

/**
 * Formats client-facing review request copy.
 * Employs Posie's warm, playful tone and presents the public review link without filtering.
 */
export function formatFairReviewMessage(invite: FairReviewInvitation): string {
  return [
    `Hi ${invite.clientName.split(' ')[0]}! ✨ We hope your skin is still glowing after your ${invite.serviceName} with ${invite.practitionerName}.`,
    `If you have 60 seconds, we'd truly appreciate your honest feedback on Google: ${invite.publicReviewUrl}`,
    `Whether it's raving praise or helpful advice on where we can do better, your honest review helps our small studio thrive. Thank you for visiting Posie!`,
  ].join('\n\n');
}

/**
 * Records private feedback when submitted by the client.
 * INVARIANT: Submitting private feedback never revokes or hides access to the public review link.
 */
export function recordPrivateFeedback(
  invite: FairReviewInvitation,
  params: {
    ratingStars: number;
    feedbackText?: string;
  }
): FairReviewInvitation {
  return FairReviewInvitationSchema.parse({
    ...invite,
    privateRatingStars: params.ratingStars,
    privateFeedbackText: params.feedbackText,
    feedbackSubmittedAt: new Date().toISOString(),
  });
}
