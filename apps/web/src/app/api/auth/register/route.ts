import { NextRequest, NextResponse } from "next/server";
import { prisma, hashPassword, createSessionToken } from "@posie/database";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role = "CLIENT", phone } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // Default to flagship salon if none specified
    let salon = await prisma.salon.findFirst();
    if (!salon) {
      salon = await prisma.salon.create({
        data: {
          name: "Atelier Posie Manhattan",
          slug: "atelier-posie",
        },
      });
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        salonId: salon.id,
        email: email.toLowerCase().trim(),
        name: name.trim(),
        passwordHash,
        role: role.toUpperCase(),
        phone: phone || null,
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
      },
      include: { salon: true },
    });

    // If registered as client, also create a Client profile
    if (user.role === "CLIENT") {
      const parts = name.trim().split(" ");
      const firstName = parts[0] || name;
      const lastName = parts.slice(1).join(" ") || "Client";

      await prisma.client.create({
        data: {
          salonId: salon.id,
          firstName,
          lastName,
          email: user.email,
          phone: user.phone,
          patchTestStatus: "PENDING",
        },
      });
    }

    const token = await createSessionToken({
      userId: user.id,
      salonId: user.salonId,
      role: user.role as "OWNER" | "STAFF" | "BOOTH_RENTER" | "CLIENT",
      email: user.email,
      name: user.name,
    });

    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        salon: {
          id: user.salon.id,
          name: user.salon.name,
          slug: user.salon.slug,
        },
      },
    });

    response.cookies.set({
      name: "posie_session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Internal server error during registration" },
      { status: 500 }
    );
  }
}
