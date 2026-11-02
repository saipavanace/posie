import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@posie/database";
import { resolveAssetAccessUrl } from "@/lib/storage";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const salonId = searchParams.get("salonId");
    const clientId = searchParams.get("clientId");
    const publicOnly = searchParams.get("publicOnly") === "true";

    const whereClause: any = {
      assetType: "BEFORE_AFTER_PORTFOLIO",
    };

    if (salonId) whereClause.salonId = salonId;
    if (clientId) whereClause.clientId = clientId;
    if (publicOnly) whereClause.marketingConsentGranted = true;

    const assets = await prisma.mediaAsset.findMany({
      where: whereClause,
      include: {
        client: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const enriched = await Promise.all(
      assets.map(async (asset) => {
        const access = await resolveAssetAccessUrl({
          storageKey: asset.storageKey,
          bucket: asset.bucket,
          isPublic: asset.isPublic,
          assetType: asset.assetType,
          marketingConsentGranted: asset.marketingConsentGranted,
        });

        return {
          ...asset,
          resolvedUrl: access.url,
          accessMode: access.accessMode,
          annotations: asset.annotations ? JSON.parse(asset.annotations) : null,
        };
      })
    );

    return NextResponse.json({
      success: true,
      count: enriched.length,
      portfolio: enriched,
    });
  } catch (error: any) {
    console.error("Portfolio retrieval error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to retrieve portfolio" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { assetId, marketingConsentGranted, revocationReason, title } = body;

    if (!assetId) {
      return NextResponse.json({ error: "assetId is required" }, { status: 400 });
    }

    const updateData: any = {};
    if (typeof marketingConsentGranted === "boolean") {
      updateData.marketingConsentGranted = marketingConsentGranted;
      // If granted is false, record revocation reason
      if (!marketingConsentGranted) {
        updateData.revocationReason = revocationReason || "Client revoked marketing consent";
        updateData.isPublic = false;
      } else {
        updateData.revocationReason = null;
        updateData.isPublic = true;
      }
    }

    if (title !== undefined) {
      updateData.title = title;
    }

    const updated = await prisma.mediaAsset.update({
      where: { id: assetId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      asset: updated,
      message: updated.marketingConsentGranted
        ? "Marketing consent active (public CDN enabled)"
        : "Marketing consent revoked (public CDN blocked)",
    });
  } catch (error: any) {
    console.error("Portfolio consent update error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update portfolio consent" },
      { status: 500 }
    );
  }
}
