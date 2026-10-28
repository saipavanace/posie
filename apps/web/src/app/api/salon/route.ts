import { NextResponse } from "next/server";
import { prisma } from "@posie/database";

export async function GET() {
  try {
    const salon = await prisma.salon.findFirst({
      include: {
        services: {
          where: { isActive: true },
          orderBy: { category: "asc" },
        },
        users: {
          where: {
            isActive: true,
            role: { in: ["OWNER", "STAFF", "BOOTH_RENTER"] },
          },
          select: {
            id: true,
            name: true,
            role: true,
            title: true,
            avatarUrl: true,
            phone: true,
            email: true,
          },
        },
      },
    });

    if (!salon) {
      return NextResponse.json({ error: "Salon not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, salon });
  } catch (error: any) {
    console.error("Error loading salon:", error);
    return NextResponse.json({ error: "Failed to load salon" }, { status: 500 });
  }
}
