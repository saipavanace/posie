import { z } from 'zod';

export const AnnotationLayerTypeSchema = z.enum([
  'face_zones',
  'lash_map',
  'brow_shape',
  'hair_extensions',
  'freehand',
]);

export type AnnotationLayerType = z.infer<typeof AnnotationLayerTypeSchema>;

export const MediaPermissionScopeSchema = z.enum([
  'internal_charting_only',
  'client_portal_shared',
  'marketing_consented',
]);

export type MediaPermissionScope = z.infer<typeof MediaPermissionScopeSchema>;

export const AnnotationMarkerSchema = z.object({
  id: z.string(),
  zone: z.string().min(1),
  xPercent: z.number().min(0).max(100),
  yPercent: z.number().min(0).max(100),
  label: z.string().min(1),
  notes: z.string().optional(),
});

export type AnnotationMarker = z.infer<typeof AnnotationMarkerSchema>;

export const AnnotationLayerSchema = z.object({
  id: z.string().uuid(),
  layerType: AnnotationLayerTypeSchema,
  authorStaffId: z.string().uuid(),
  title: z.string().min(1),
  markers: z.array(AnnotationMarkerSchema).default([]),
  createdAt: z.string().datetime(),
});

export type AnnotationLayer = z.infer<typeof AnnotationLayerSchema>;

export const TreatmentImageAssetSchema = z.object({
  id: z.string().uuid(),
  clientId: z.string().uuid(),
  appointmentId: z.string().uuid().optional(),
  originalImageUrl: z.string().url(),
  originalImageChecksum: z.string().min(1),
  authorStaffId: z.string().uuid(),
  capturedAt: z.string().datetime(),
  permissionScope: MediaPermissionScopeSchema.default('internal_charting_only'),
  clientConsentSignedAt: z.string().datetime().optional(),
  annotationLayers: z.array(AnnotationLayerSchema).default([]),
  consentRevokedAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime(),
});

export type TreatmentImageAsset = z.infer<typeof TreatmentImageAssetSchema>;

/**
 * Registers an original clinical photograph.
 * INVARIANT: Base original photo is permanently preserved and read-only.
 */
export function registerBaseTreatmentImage(params: {
  id?: string;
  clientId: string;
  appointmentId?: string;
  originalImageUrl: string;
  originalImageChecksum: string;
  authorStaffId: string;
  initialPermission?: MediaPermissionScope;
}): TreatmentImageAsset {
  const now = new Date().toISOString();
  return TreatmentImageAssetSchema.parse({
    id: params.id || '60000000-0000-0000-0000-000000000039',
    clientId: params.clientId,
    appointmentId: params.appointmentId,
    originalImageUrl: params.originalImageUrl,
    originalImageChecksum: params.originalImageChecksum,
    authorStaffId: params.authorStaffId,
    capturedAt: now,
    permissionScope: params.initialPermission || 'internal_charting_only',
    annotationLayers: [],
    updatedAt: now,
  });
}

/**
 * Adds an annotation overlay layer to an existing clinical image.
 * INVARIANT: Annotations never alter or overwrite the original raw photo asset.
 */
export function addAnnotationLayer(
  asset: TreatmentImageAsset,
  params: {
    layerId?: string;
    layerType: AnnotationLayerType;
    title: string;
    authorStaffId: string;
    markers: AnnotationMarker[];
  }
): TreatmentImageAsset {
  const now = new Date().toISOString();
  const newLayer: AnnotationLayer = {
    id: params.layerId || '70000000-0000-0000-0000-000000000039',
    layerType: params.layerType,
    authorStaffId: params.authorStaffId,
    title: params.title,
    markers: params.markers,
    createdAt: now,
  };

  return TreatmentImageAssetSchema.parse({
    ...asset,
    annotationLayers: [...asset.annotationLayers, newLayer],
    updatedAt: now,
  });
}

/**
 * Grants explicit marketing or public publication permission with verifiable client consent.
 * INVARIANT: General treatment consent is NEVER sufficient for public marketing use.
 */
export function grantMediaPublicationConsent(
  asset: TreatmentImageAsset,
  clientConsentTimestamp: string
): TreatmentImageAsset {
  const now = new Date().toISOString();
  return TreatmentImageAssetSchema.parse({
    ...asset,
    permissionScope: 'marketing_consented',
    clientConsentSignedAt: clientConsentTimestamp,
    consentRevokedAt: undefined,
    updatedAt: now,
  });
}

/**
 * Revokes client consent for marketing use.
 * Preserves the image for internal clinical/treatment continuity while forbidding future public use.
 */
export function revokeMediaPublicationConsent(
  asset: TreatmentImageAsset
): TreatmentImageAsset {
  const now = new Date().toISOString();
  return TreatmentImageAssetSchema.parse({
    ...asset,
    permissionScope: 'internal_charting_only',
    consentRevokedAt: now,
    updatedAt: now,
  });
}
