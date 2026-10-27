/**
 * F102: Standardized Before & After Photos (Document D12, Rules F039, F064)
 * 
 * Invariants:
 * 1. Standardized Capture Angles & Metadata: Guided capture angles (Frontal,
 *    Left 45°, Right 45°, Close-up Macro) recording distance, lighting, and camera.
 * 2. Mandatory Capture Difference Disclosure: Side-by-side progress comparisons
 *    must explicitly disclose differences in ambient lighting or camera distance,
 *    preventing misleading or deceptive cosmetic claims.
 * 3. Preservation of Raw Originals: Markups and annotations (F039) are stored
 *    as non-destructive coordinate layers. The raw camera capture is permanently
 *    hashed and preserved without compression or beauty filters.
 * 4. Two-Tier Permission Firewall (Document D12):
 *    - Tier 1 (Internal Clinical Record): Evaluates treatment progress privately.
 *    - Tier 2 (Public Marketing / Social Media): Requires explicit, revocable D12
 *      consent with defined channel scope (e.g. Instagram, Studio Website).
 *    - Revoking marketing permission instantly withdraws publication rights without
 *      deleting internal medical records.
 */

import { createHash } from 'crypto';

export type CaptureAngle = 'frontal' | 'left_45' | 'right_45' | 'close_up_macro';

export interface PhotoCaptureMetadata {
  angle: CaptureAngle;
  distanceInches: number; // e.g. 18 inches
  lightingKelvin: number; // e.g. 5000K daylight vs 3200K warm
  deviceModel: string; // e.g. "iPad Pro 11-inch"
  capturedAt: string; // ISO 8601 UTC
}

export interface NonDestructiveAnnotation {
  annotationId: string;
  type: 'face_map_region' | 'peel_depth_boundary' | 'blemish_marker';
  coordinates: Array<{ x: number; y: number }>;
  note?: string;
}

export interface ClinicalPhoto {
  photoId: string;
  clientId: string;
  serviceId: string;
  phase: 'before' | 'after';
  rawMediaUri: string;
  rawMediaSha256: string;
  metadata: PhotoCaptureMetadata;
  annotations: NonDestructiveAnnotation[];
  isRawOriginalPreserved: boolean;
}

export interface MediaPermissionD12 {
  permissionId: string;
  clientId: string;
  internalClinicalAllowed: boolean; // Tier 1: Always allowed for treatment tracking
  publicMarketingAllowed: boolean; // Tier 2: Separate explicit consent
  allowedChannels: Array<'instagram' | 'website_case_study' | 'in_studio_lookbook'>;
  grantedAt: string;
  revokedAt?: string;
  revocationReason?: string;
}

export interface BeforeAfterComparison {
  clientId: string;
  beforePhoto: ClinicalPhoto;
  afterPhoto: ClinicalPhoto;
  angleMatched: boolean;
  differingConditionsDisclosed: boolean;
  disclosureNotes?: string;
  marketingEligible: boolean;
}

/**
 * Registers a standardized clinical photo with raw media hash verification.
 */
export function registerClinicalPhoto(params: {
  photoId: string;
  clientId: string;
  serviceId: string;
  phase: 'before' | 'after';
  rawMediaUri: string;
  rawMediaContent: string; // Buffer or string used to compute digest
  metadata: PhotoCaptureMetadata;
}): ClinicalPhoto {
  const rawMediaSha256 = createHash('sha256')
    .update(params.rawMediaContent, 'utf8')
    .digest('hex');

  return {
    photoId: params.photoId,
    clientId: params.clientId,
    serviceId: params.serviceId,
    phase: params.phase,
    rawMediaUri: params.rawMediaUri,
    rawMediaSha256,
    metadata: params.metadata,
    annotations: [],
    isRawOriginalPreserved: true,
  };
}

/**
 * Adds non-destructive annotation layer preserving raw photo.
 */
export function addPhotoAnnotation(params: {
  photo: ClinicalPhoto;
  annotation: NonDestructiveAnnotation;
}): ClinicalPhoto {
  return {
    ...params.photo,
    annotations: [...params.photo.annotations, params.annotation],
  };
}

/**
 * Evaluates a side-by-side Before/After comparison.
 * Invariant: Discloses any lighting delta (>500K) or distance delta (>3 inches).
 */
export function compareBeforeAndAfter(params: {
  beforePhoto: ClinicalPhoto;
  afterPhoto: ClinicalPhoto;
  permission: MediaPermissionD12;
}): BeforeAfterComparison {
  const angleMatched = params.beforePhoto.metadata.angle === params.afterPhoto.metadata.angle;

  const lightingDelta = Math.abs(
    params.beforePhoto.metadata.lightingKelvin - params.afterPhoto.metadata.lightingKelvin
  );
  const distanceDelta = Math.abs(
    params.beforePhoto.metadata.distanceInches - params.afterPhoto.metadata.distanceInches
  );

  const conditionDifferences: string[] = [];
  if (lightingDelta > 500) {
    conditionDifferences.push(
      `Lighting disparity: Before photo was captured at ${params.beforePhoto.metadata.lightingKelvin}K vs After at ${params.afterPhoto.metadata.lightingKelvin}K.`
    );
  }
  if (distanceDelta > 3) {
    conditionDifferences.push(
      `Distance variation: Before was taken at ${params.beforePhoto.metadata.distanceInches}" vs After at ${params.afterPhoto.metadata.distanceInches}".`
    );
  }

  const differingConditionsDisclosed = conditionDifferences.length > 0;
  const disclosureNotes = differingConditionsDisclosed
    ? conditionDifferences.join(' ')
    : undefined;

  // Marketing eligibility requires active Tier 2 permission and matching angles
  const isMarketingAllowed =
    params.permission.publicMarketingAllowed && !params.permission.revokedAt;
  const marketingEligible = isMarketingAllowed && angleMatched;

  return {
    clientId: params.beforePhoto.clientId,
    beforePhoto: params.beforePhoto,
    afterPhoto: params.afterPhoto,
    angleMatched,
    differingConditionsDisclosed,
    disclosureNotes,
    marketingEligible,
  };
}

/**
 * Grants explicit Document D12 media permission.
 */
export function grantMediaPermissionD12(params: {
  permissionId: string;
  clientId: string;
  publicMarketingAllowed: boolean;
  allowedChannels: Array<'instagram' | 'website_case_study' | 'in_studio_lookbook'>;
}): MediaPermissionD12 {
  return {
    permissionId: params.permissionId,
    clientId: params.clientId,
    internalClinicalAllowed: true,
    publicMarketingAllowed: params.publicMarketingAllowed,
    allowedChannels: params.allowedChannels,
    grantedAt: new Date().toISOString(),
  };
}

/**
 * Revokes marketing publication permission (Rule D12).
 * Invariant: Instantly blocks marketing export while keeping internal clinical access.
 */
export function revokeMediaPermissionD12(params: {
  permission: MediaPermissionD12;
  reason: string;
}): MediaPermissionD12 {
  return {
    ...params.permission,
    publicMarketingAllowed: false,
    allowedChannels: [],
    revokedAt: new Date().toISOString(),
    revocationReason: params.reason,
  };
}
