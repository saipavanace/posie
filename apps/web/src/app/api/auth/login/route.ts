import { NextRequest, NextResponse } from "next/server";
import { prisma, verifyPassword, createSessionToken } from "@posie/database";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: { salon: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials. Please check your email or password." },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials. Please check your email or password." },
        { status: 401 }
      );
    }

    const token = await createSessionToken({
      userId: user.id,
      salonId: user.salonId,
      role: user.role as "OWNER" | "STAFF" | "BOOTH_RENTER" | "CLIENT",
      email: user.email,
      name: user.name,
    });

    // Create session in DB as well
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
        title: user.title,
        avatarUrl: user.avatarUrl,
        salon: {
          id: user.salon.id,
          name: user.salon.name,
          slug: user.salon.slug,
        },
      },
    });

    // Set HTTP-only cookie
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
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error during authentication" },
      { status: 500 }
    );
  }
}
