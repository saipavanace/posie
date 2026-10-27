import { z } from 'zod';

/**
 * F064 — Consent-Aware Portfolio Publishing (Document D12)
 *
 * Implements granular photo and media-use permissions separating private clinical charting
 * from public social media and marketing portfolios.
 *
 * Invariant (DR05, D12):
 * Treatment consent alone is strictly INSUFFICIENT for public marketing publication.
 * A separate explicit media grant is required specifying permitted channels and facial anonymity.
 * Revoking public permission immediately flags digital assets for removal from owned platforms.
 */

export const MediaPublicationChannelSchema = z.enum([
  'internal_charting_only',
  'website_portfolio',
  'social_media_instagram_tiktok',
  'printed_salon_lookbook',
  'industry_education_and_training',
]);
export type MediaPublicationChannel = z.infer<typeof MediaPublicationChannelSchema>;

export const FacialAnonymityScopeSchema = z.enum([
  'full_face_identifiable',
  'eyes_obscured_or_blurred',
  'close_up_feature_only', // e.g. nails, lips, eyebrow close-up only
]);
export type FacialAnonymityScope = z.infer<typeof FacialAnonymityScopeSchema>;

export const MediaPermissionTermSchema = z.enum(['one_year', 'two_years', 'indefinite_until_revoked']);
export type MediaPermissionTerm = z.infer<typeof MediaPermissionTermSchema>;

export const MediaConsentStatusSchema = z.enum([
  'active_public_granted',
  'restricted_internal_only',
  'revoked_unpublish_requested',
]);
export type MediaConsentStatus = z.infer<typeof MediaConsentStatusSchema>;

export const MediaUseGrantRecordSchema = z.object({
  grantId: z.string().uuid(),
  businessId: z.string().uuid(),
  clientId: z.string().uuid(),
  clientName: z.string().min(1),
  assetIds: z.array(z.string().uuid()).min(1),
  permittedChannels: z.array(MediaPublicationChannelSchema).min(1),
  anonymityScope: FacialAnonymityScopeSchema,
  permissionTerm: MediaPermissionTermSchema,
  status: MediaConsentStatusSchema,

  // Signature & Grant Audit
  signedByClientName: z.string().min(1),
  grantedAt: z.string().datetime(),
  clientSignatureToken: z.string().min(6),
  explicitTreatmentSeparationAcknowledged: z.literal(true),

  // Revocation Ledger
  revokedAt: z.string().datetime().nullable(),
  revocationReason: z.string().nullable(),
  removedFromOwnedDigitalPlatforms: z.boolean().default(false),
  thirdPartyPrintLimitationNotice: z.string().nullable(),
});
export type MediaUseGrantRecord = z.infer<typeof MediaUseGrantRecordSchema>;

/**
 * Creates an explicit photo and media permission grant (Document D12).
 *
 * Invariant: Rejects attempts to publish publicly without separate explicit consent.
 */
export function createMediaUseGrant(params: {
  businessId: string;
  clientId: string;
  clientName: string;
  assetIds: string[];
  permittedChannels: MediaPublicationChannel[];
  anonymityScope: FacialAnonymityScope;
  permissionTerm?: MediaPermissionTerm;
  signedByClientName: string;
  clientSignatureToken: string;
  explicitTreatmentSeparationAcknowledged: boolean;
}): MediaUseGrantRecord {
  if (!params.explicitTreatmentSeparationAcknowledged) {
    throw new Error(
      'Document D12 Invariant: Media publication requires explicit acknowledgment that treatment consent is separate from marketing rights.'
    );
  }

  const grantId = crypto.randomUUID ? crypto.randomUUID() : 'f0640000-0000-4000-8000-000000000001';
  const now = new Date().toISOString();

  const isPublic = params.permittedChannels.some(c => c !== 'internal_charting_only');

  return MediaUseGrantRecordSchema.parse({
    grantId,
    businessId: params.businessId,
    clientId: params.clientId,
    clientName: params.clientName,
    assetIds: params.assetIds,
    permittedChannels: params.permittedChannels,
    anonymityScope: params.anonymityScope,
    permissionTerm: params.permissionTerm ?? 'indefinite_until_revoked',
    status: isPublic ? 'active_public_granted' : 'restricted_internal_only',
    signedByClientName: params.signedByClientName,
    grantedAt: now,
    clientSignatureToken: params.clientSignatureToken,
    explicitTreatmentSeparationAcknowledged: true,
    revokedAt: null,
    revocationReason: null,
    removedFromOwnedDigitalPlatforms: false,
    thirdPartyPrintLimitationNotice: null,
  });
}

/**
 * Revokes public marketing permission, initiating immediate digital unpublishing.
 */
export function revokeMediaUsePermission(
  grant: MediaUseGrantRecord,
  params: {
    revokedByClientName: string;
    reason?: string;
  }
): MediaUseGrantRecord {
  const now = new Date().toISOString();

  const hadPrint = grant.permittedChannels.includes('printed_salon_lookbook');

  const printNotice = hadPrint
    ? 'Note: All owned digital website and social media displays have been flagged for unpublishing. ' +
      'Physical print lookbooks distributed prior to revocation cannot be recalled; all future print runs will exclude this asset.'
    : 'All owned digital website and social media displays have been unlinked and archived.';

  return MediaUseGrantRecordSchema.parse({
    ...grant,
    status: 'revoked_unpublish_requested',
    revokedAt: now,
    revocationReason: params.reason ?? 'Client exercised digital privacy withdrawal right',
    removedFromOwnedDigitalPlatforms: true,
    thirdPartyPrintLimitationNotice: printNotice,
  });
}

/**
 * Evaluates whether a given asset is currently licensed for a target marketing channel.
 */
export function checkMediaPublishingEligibility(
  grant: MediaUseGrantRecord,
  targetChannel: MediaPublicationChannel
): { canPublish: boolean; reason: string } {
  if (grant.status === 'revoked_unpublish_requested') {
    return {
      canPublish: false,
      reason: 'Publication blocked: Client has formally revoked marketing consent for this photo.',
    };
  }

  if (targetChannel === 'internal_charting_only') {
    return { canPublish: true, reason: 'Allowed for internal clinical charting.' };
  }

  const isAllowedChannel = grant.permittedChannels.includes(targetChannel);
  if (!isAllowedChannel) {
    return {
      canPublish: false,
      reason: `Publication blocked: Photo is granted only for [${grant.permittedChannels.join(', ')}], not for ${targetChannel}.`,
    };
  }

  return { canPublish: true, reason: 'Photo is actively authorized for this channel.' };
}
