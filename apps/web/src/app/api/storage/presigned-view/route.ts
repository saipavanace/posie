import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@posie/database";
import { resolveAssetAccessUrl } from "@/lib/storage";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const assetId = searchParams.get("assetId");
    const storageKey = searchParams.get("storageKey");

    if (!assetId && !storageKey) {
      return NextResponse.json(
        { error: "assetId or storageKey is required" },
        { status: 400 }
      );
    }

    const mediaAsset = await prisma.mediaAsset.findFirst({
      where: assetId ? { id: assetId } : { storageKey: storageKey! },
      include: {
        client: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });

    if (!mediaAsset) {
      return NextResponse.json(
        { error: "Media asset not found" },
        { status: 404 }
      );
    }

    const accessInfo = await resolveAssetAccessUrl({
      storageKey: mediaAsset.storageKey,
      bucket: mediaAsset.bucket,
      isPublic: mediaAsset.isPublic,
      assetType: mediaAsset.assetType,
      marketingConsentGranted: mediaAsset.marketingConsentGranted,
    });

    return NextResponse.json({
      success: true,
      assetId: mediaAsset.id,
      title: mediaAsset.title,
      assetType: mediaAsset.assetType,
      mimeType: mediaAsset.mimeType,
      accessUrl: accessInfo.url,
      accessMode: accessInfo.accessMode,
      expiresAt: accessInfo.expiresAt,
      marketingConsentGranted: mediaAsset.marketingConsentGranted,
      revocationReason: mediaAsset.revocationReason,
      annotations: mediaAsset.annotations ? JSON.parse(mediaAsset.annotations) : null,
      client: mediaAsset.client,
      createdAt: mediaAsset.createdAt,
    });
  } catch (error: any) {
    console.error("Presigned view resolution error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to resolve presigned view URL" },
      { status: 500 }
    );
  }
}
