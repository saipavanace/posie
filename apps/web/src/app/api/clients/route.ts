import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@posie/database";

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      include: {
        appointments: {
          take: 3,
          orderBy: { scheduledAt: "desc" },
          include: { service: true },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ success: true, clients });
  } catch (error: any) {
    console.error("Error fetching clients:", error);
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, notes, preferredPronouns, patchTestStatus = "PENDING" } = body;

    if (!firstName || !email) {
      return NextResponse.json({ error: "First name and email are required" }, { status: 400 });
    }

    let salon = await prisma.salon.findFirst();
    if (!salon) {
      return NextResponse.json({ error: "Salon not found" }, { status: 404 });
    }

    const client = await prisma.client.create({
      data: {
        salonId: salon.id,
        firstName: firstName.trim(),
        lastName: (lastName || "").trim(),
        email: email.toLowerCase().trim(),
        phone: phone || null,
        preferredPronouns: preferredPronouns || null,
        patchTestStatus,
        notes: notes || null,
      },
    });

    return NextResponse.json({ success: true, client }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating client:", error);
    return NextResponse.json({ error: "Failed to create client" }, { status: 500 });
  }
}
