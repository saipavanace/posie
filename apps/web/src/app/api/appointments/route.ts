import { NextRequest, NextResponse } from "next/server";
import { prisma, verifySessionToken } from "@posie/database";

export async function GET(req: NextRequest) {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        client: true,
        staff: {
          select: { id: true, name: true, title: true, avatarUrl: true },
        },
        service: true,
      },
      orderBy: { scheduledAt: "asc" },
    });

    return NextResponse.json({ success: true, appointments });
  } catch (error: any) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      serviceId,
      staffId,
      clientId,
      clientName,
      clientEmail,
      clientPhone,
      scheduledAt,
      clientNotes,
      depositPaidCents = 0,
    } = body;

    let salon = await prisma.salon.findFirst();
    if (!salon) {
      return NextResponse.json({ error: "Salon not found" }, { status: 404 });
    }

    let service = null;
    if (serviceId) {
      service = await prisma.service.findUnique({
        where: { id: serviceId },
      });
    }
    if (!service) {
      service = await prisma.service.findFirst({
        where: { salonId: salon.id, isActive: true },
      });
    }
    if (!service) {
      return NextResponse.json({ error: "No active service found" }, { status: 404 });
    }

    // Resolve or create Client
    let targetClientId = clientId;
    if (!targetClientId) {
      if (!clientEmail) {
        return NextResponse.json({ error: "Client email is required" }, { status: 400 });
      }

      let existingClient = await prisma.client.findFirst({
        where: { email: clientEmail.toLowerCase().trim() },
      });

      if (!existingClient) {
        const parts = (clientName || "Valued Client").trim().split(" ");
        const firstName = parts[0] || "Valued";
        const lastName = parts.slice(1).join(" ") || "Client";

        existingClient = await prisma.client.create({
          data: {
            salonId: salon.id,
            firstName,
            lastName,
            email: clientEmail.toLowerCase().trim(),
            phone: clientPhone || null,
            patchTestStatus: "PENDING",
            notes: clientNotes || null,
          },
        });
      }
      targetClientId = existingClient.id;
    }

    // Resolve staffId (default to first available staff if none provided)
    let targetStaffId = staffId;
    if (!targetStaffId) {
      const defaultStaff = await prisma.user.findFirst({
        where: {
          salonId: salon.id,
          role: { in: ["STAFF", "OWNER"] },
        },
      });
      if (!defaultStaff) {
        return NextResponse.json({ error: "No staff available" }, { status: 400 });
      }
      targetStaffId = defaultStaff.id;
    }

    const appointment = await prisma.appointment.create({
      data: {
        salonId: salon.id,
        clientId: targetClientId,
        staffId: targetStaffId,
        serviceId: service.id,
        scheduledAt: new Date(scheduledAt || Date.now() + 86400000),
        durationMinutes: service.durationMinutes,
        status: "CONFIRMED",
        totalPriceCents: service.priceCents,
        depositPaidCents,
        paymentStatus: depositPaidCents >= service.priceCents ? "PAID_IN_FULL" : depositPaidCents > 0 ? "DEPOSIT_COLLECTED" : "UNPAID",
        clientNotes: clientNotes || null,
      },
      include: {
        client: true,
        staff: {
          select: { id: true, name: true, title: true, avatarUrl: true },
        },
        service: true,
      },
    });

    // Update client total visits
    await prisma.client.update({
      where: { id: targetClientId },
      data: {
        totalVisits: { increment: 1 },
        totalSpendCents: { increment: depositPaidCents },
      },
    });

    return NextResponse.json({ success: true, appointment }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating appointment:", error);
    return NextResponse.json({ error: "Failed to create appointment: " + error.message }, { status: 500 });
  }
}
