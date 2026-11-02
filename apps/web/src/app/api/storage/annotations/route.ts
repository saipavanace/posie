import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@posie/database";
import { AnnotationLayer } from "@/lib/storage";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const assetId = searchParams.get("assetId");

    if (!assetId) {
      return NextResponse.json({ error: "assetId is required" }, { status: 400 });
    }

    const asset = await prisma.mediaAsset.findUnique({
      where: { id: assetId },
      select: {
        id: true,
        title: true,
        assetType: true,
        annotations: true,
        clientId: true,
        createdAt: true,
      },
    });

    if (!asset) {
      return NextResponse.json({ error: "Media asset not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      assetId: asset.id,
      title: asset.title,
      assetType: asset.assetType,
      annotationLayer: asset.annotations ? JSON.parse(asset.annotations) : null,
    });
  } catch (error: any) {
    console.error("Annotations retrieval error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to retrieve annotations" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { assetId, photoAngle = "frontal", fitzpatrickScale, annotations = [] } = body;

    if (!assetId) {
      return NextResponse.json({ error: "assetId is required" }, { status: 400 });
    }

    const annotationLayer: AnnotationLayer = {
      version: "1.0",
      photoAngle,
      fitzpatrickScale,
      annotations,
    };

    const updated = await prisma.mediaAsset.update({
      where: { id: assetId },
      data: {
        annotations: JSON.stringify(annotationLayer),
      },
    });

    return NextResponse.json({
      success: true,
      assetId: updated.id,
      annotationLayer,
      message: `Saved ${annotations.length} vector annotation markers successfully`,
    });
  } catch (error: any) {
    console.error("Save annotations error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to save annotations" },
      { status: 500 }
    );
  }
}
