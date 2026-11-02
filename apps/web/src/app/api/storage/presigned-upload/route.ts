import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@posie/database";
import { createPresignedUploadUrl, AssetType } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fileName,
      mimeType,
      sizeBytes = 0,
      salonId: requestedSalonId,
      clientId,
      assetType = "CLINICAL_CHART",
      isPublic = false,
      marketingConsentGranted = false,
      title,
    } = body;

    if (!fileName || !mimeType) {
      return NextResponse.json(
        { error: "fileName and mimeType are required" },
        { status: 400 }
      );
    }

    // Resolve salonId
    let salonId = requestedSalonId;
    if (!salonId) {
      const salon = await prisma.salon.findFirst();
      if (!salon) {
        return NextResponse.json(
          { error: "No salon found in database" },
          { status: 404 }
        );
      }
      salonId = salon.id;
    }

    // Validate assetType
    const validAssetTypes: AssetType[] = [
      "CLINICAL_CHART",
      "BEFORE_AFTER_PORTFOLIO",
      "BRAND_LOGO",
      "INTAKE_ATTACHMENT",
    ];
    if (!validAssetTypes.includes(assetType as AssetType)) {
      return NextResponse.json(
        { error: `Invalid assetType. Must be one of: ${validAssetTypes.join(", ")}` },
        { status: 400 }
      );
    }

    // Generate pre-signed upload URL
    const presigned = await createPresignedUploadUrl({
      fileName,
      mimeType,
      sizeBytes,
      salonId,
      clientId: clientId || undefined,
      assetType: assetType as AssetType,
      isPublic: Boolean(isPublic),
      marketingConsentGranted: Boolean(marketingConsentGranted),
      title,
    });

    // Register media asset in database
    const mediaAsset = await prisma.mediaAsset.create({
      data: {
        salonId,
        clientId: clientId || null,
        assetType,
        storageKey: presigned.storageKey,
        bucket: presigned.bucket,
        url: presigned.publicUrl || presigned.uploadUrl,
        mimeType,
        sizeBytes: Number(sizeBytes) || 0,
        isPublic: Boolean(isPublic),
        marketingConsentGranted: Boolean(marketingConsentGranted),
        title: title || fileName,
      },
    });

    return NextResponse.json({
      success: true,
      mediaAsset,
      uploadUrl: presigned.uploadUrl,
      storageKey: presigned.storageKey,
      bucket: presigned.bucket,
      publicUrl: presigned.publicUrl,
      expiresInSeconds: presigned.expiresInSeconds,
      simulated: presigned.simulated,
    });
  } catch (error: any) {
    console.error("Presigned upload generation error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate presigned upload" },
      { status: 500 }
    );
  }
}
