import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@posie/database";

export async function GET() {
  try {
    const items = await prisma.inventoryItem.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ success: true, items });
  } catch (error: any) {
    console.error("Error fetching inventory:", error);
    return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, adjustment, newQuantity } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Item id is required" }, { status: 400 });
    }

    let updated;
    if (typeof newQuantity === "number") {
      updated = await prisma.inventoryItem.update({
        where: { id },
        data: { quantityOnHand: Math.max(0, newQuantity) },
      });
    } else if (typeof adjustment === "number") {
      updated = await prisma.inventoryItem.update({
        where: { id },
        data: { quantityOnHand: { increment: adjustment } },
      });
    } else {
      return NextResponse.json({ error: "Provide either newQuantity or adjustment" }, { status: 400 });
    }

    return NextResponse.json({ success: true, item: updated });
  } catch (error: any) {
    console.error("Error updating inventory:", error);
    return NextResponse.json({ error: "Failed to update inventory" }, { status: 500 });
  }
}
