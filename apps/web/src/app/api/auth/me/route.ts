import { NextRequest, NextResponse } from "next/server";
import { prisma, verifySessionToken } from "@posie/database";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("posie_session")?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
    }

    const payload = await verifySessionToken(token);
    if (!payload) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        salon: true,
      },
    });

    if (!user || !user.isActive) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
    }

    return NextResponse.json({
      authenticated: true,
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
          currency: user.salon.currency,
          timezone: user.salon.timezone,
        },
      },
    });
  } catch (error) {
    console.error("Session verification error:", error);
    return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
  }
}
