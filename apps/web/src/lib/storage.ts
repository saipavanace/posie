/**
 * Cloud Media & Photo Storage Service (Milestone 4 / F039 & F102)
 *
 * Supports AWS S3 and Cloudflare R2 object storage with:
 * - Direct-to-bucket pre-signed PUT upload URLs (bypassing serverless payload limits)
 * - Expiring private pre-signed GET URLs (15-min TTL for HIPAA-grade clinical face charts F039)
 * - Consent-governed public portfolio CDN routing (F102 marketing consent enforcement)
 * - Non-destructive vector annotation metadata for clinical face-mapping markup
 * - Local simulation fallback when cloud credentials are not supplied
 */

import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export type AssetType = 
  | "CLINICAL_CHART" 
  | "BEFORE_AFTER_PORTFOLIO" 
  | "BRAND_LOGO" 
  | "INTAKE_ATTACHMENT";

export interface FaceMappingAnnotation {
  id: string;
  type: "point" | "zone" | "line" | "measurement";
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  radius?: number;
  label: string;
  treatmentType?: string; // e.g. "Botox", "Juvederm", "Chemical Peel", "Microneedling"
  units?: number;
  depthMm?: number;
  notes?: string;
  timestamp: string;
  authorStaffId?: string;
}

export interface AnnotationLayer {
  version: "1.0";
  photoAngle: "frontal" | "left_profile" | "right_profile" | "left_three_quarter" | "right_three_quarter";
  fitzpatrickScale?: 1 | 2 | 3 | 4 | 5 | 6;
  annotations: FaceMappingAnnotation[];
}

export interface PresignedUploadRequest {
  fileName: string;
  mimeType: string;
  sizeBytes?: number;
  salonId: string;
  clientId?: string;
  assetType: AssetType;
  isPublic?: boolean;
  marketingConsentGranted?: boolean;
  title?: string;
}

export interface PresignedUploadResponse {
  uploadUrl: string;
  storageKey: string;
  bucket: string;
  publicUrl?: string;
  expiresInSeconds: number;
  assetType: AssetType;
  simulated: boolean;
}

// Environment config
const BUCKET_NAME = process.env.AWS_S3_BUCKET || process.env.S3_BUCKET_NAME || "posie-media-assets";
const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const R2_ENDPOINT = process.env.CLOUDFLARE_R2_ENDPOINT || process.env.AWS_ENDPOINT;
const CDN_BASE_URL = process.env.NEXT_PUBLIC_CDN_URL || process.env.S3_PUBLIC_URL;

export function isStorageConfigured(): boolean {
  return Boolean(
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY &&
    (process.env.AWS_S3_BUCKET || process.env.S3_BUCKET_NAME)
  );
}

function getS3Client(): S3Client {
  return new S3Client({
    region: AWS_REGION,
    endpoint: R2_ENDPOINT || undefined,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
    // Force path style for Cloudflare R2 and MinIO compatibility if endpoint provided
    forcePathStyle: Boolean(R2_ENDPOINT),
  });
}

/**
 * Clean file names for safe S3 keys
 */
function sanitizeFileName(fileName: string): string {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
}

/**
 * Generate a unique storage key structured by salon and asset category
 */
export function generateStorageKey(params: {
  salonId: string;
  assetType: AssetType;
  fileName: string;
  clientId?: string;
}): string {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 7);
  const safeName = sanitizeFileName(params.fileName);
  const folder = params.assetType.toLowerCase().replace(/_/g, "-");

  if (params.clientId) {
    return `salons/${params.salonId}/clients/${params.clientId}/${folder}/${timestamp}-${randomSuffix}-${safeName}`;
  }
  return `salons/${params.salonId}/${folder}/${timestamp}-${randomSuffix}-${safeName}`;
}

/**
 * Generate a pre-signed direct PUT upload URL
 */
export async function createPresignedUploadUrl(
  params: PresignedUploadRequest
): Promise<PresignedUploadResponse> {
  const key = generateStorageKey({
    salonId: params.salonId,
    assetType: params.assetType,
    fileName: params.fileName,
    clientId: params.clientId,
  });

  const expiresInSeconds = 900; // 15 minutes

  if (!isStorageConfigured()) {
    // Elegant local simulation mode
    const simulatedUploadUrl = `/api/storage/mock-upload?key=${encodeURIComponent(key)}&bucket=${encodeURIComponent(BUCKET_NAME)}`;
    const publicUrl = params.isPublic 
      ? `https://${BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`
      : undefined;

    return {
      uploadUrl: simulatedUploadUrl,
      storageKey: key,
      bucket: BUCKET_NAME,
      publicUrl,
      expiresInSeconds,
      assetType: params.assetType,
      simulated: true,
    };
  }

  const s3 = getS3Client();
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: params.mimeType,
    Metadata: {
      "salon-id": params.salonId,
      "asset-type": params.assetType,
      ...(params.clientId ? { "client-id": params.clientId } : {}),
      "is-public": String(Boolean(params.isPublic)),
    },
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: expiresInSeconds });

  let publicUrl: string | undefined;
  if (params.isPublic) {
    publicUrl = CDN_BASE_URL 
      ? `${CDN_BASE_URL.replace(/\/$/, "")}/${key}`
      : `https://${BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`;
  }

  return {
    uploadUrl,
    storageKey: key,
    bucket: BUCKET_NAME,
    publicUrl,
    expiresInSeconds,
    assetType: params.assetType,
    simulated: false,
  };
}

/**
 * Generate a pre-signed GET URL for secure, expiring private access (F039 Clinical Charts)
 */
export async function createPresignedViewUrl(params: {
  storageKey: string;
  bucket?: string;
  expiresInSeconds?: number;
}): Promise<{ url: string; simulated: boolean; expiresAt: Date }> {
  const bucket = params.bucket || BUCKET_NAME;
  const expiresIn = params.expiresInSeconds || 900; // default 15 min
  const expiresAt = new Date(Date.now() + expiresIn * 1000);

  if (!isStorageConfigured()) {
    return {
      url: `/api/storage/mock-view?key=${encodeURIComponent(params.storageKey)}&token=simulated-${Date.now()}`,
      simulated: true,
      expiresAt,
    };
  }

  const s3 = getS3Client();
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: params.storageKey,
  });

  const url = await getSignedUrl(s3, command, { expiresIn });
  return {
    url,
    simulated: false,
    expiresAt,
  };
}

/**
 * Resolve client-facing URL governed by F102 Marketing Consent
 */
export async function resolveAssetAccessUrl(asset: {
  storageKey: string;
  bucket: string;
  isPublic: boolean;
  assetType: string;
  marketingConsentGranted: boolean;
}): Promise<{
  url: string;
  accessMode: "public_cdn" | "private_presigned" | "consent_blocked";
  expiresAt?: Date;
}> {
  // If this is a Before/After marketing portfolio photo:
  if (asset.assetType === "BEFORE_AFTER_PORTFOLIO") {
    // F102 requirement: Must have active marketing consent to be publicly accessible
    if (!asset.marketingConsentGranted) {
      // Consent revoked or not granted. Salon staff can still view privately via expiring URL
      const signed = await createPresignedViewUrl({
        storageKey: asset.storageKey,
        bucket: asset.bucket,
        expiresInSeconds: 600,
      });
      return {
        url: signed.url,
        accessMode: "consent_blocked", // Flags that public display is disallowed
        expiresAt: signed.expiresAt,
      };
    }

    // Consent granted: return public CDN URL
    const publicUrl = CDN_BASE_URL 
      ? `${CDN_BASE_URL.replace(/\/$/, "")}/${asset.storageKey}`
      : `https://${asset.bucket}.s3.${AWS_REGION}.amazonaws.com/${asset.storageKey}`;

    return {
      url: publicUrl,
      accessMode: "public_cdn",
    };
  }

  // Clinical face-mapping charts are ALWAYS private HIPAA-grade expiring URLs (F039)
  if (asset.assetType === "CLINICAL_CHART" || !asset.isPublic) {
    const signed = await createPresignedViewUrl({
      storageKey: asset.storageKey,
      bucket: asset.bucket,
      expiresInSeconds: 900,
    });
    return {
      url: signed.url,
      accessMode: "private_presigned",
      expiresAt: signed.expiresAt,
    };
  }

  // General public assets (like salon brand logo)
  const publicUrl = CDN_BASE_URL 
    ? `${CDN_BASE_URL.replace(/\/$/, "")}/${asset.storageKey}`
    : `https://${asset.bucket}.s3.${AWS_REGION}.amazonaws.com/${asset.storageKey}`;

  return {
    url: publicUrl,
    accessMode: "public_cdn",
  };
}
