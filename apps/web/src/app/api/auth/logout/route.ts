import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@posie/database";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("posie_session")?.value;
    if (token) {
      await prisma.session.deleteMany({
        where: { token },
      }).catch(() => {});
    }

    const response = NextResponse.json({ success: true, message: "Logged out" });
    response.cookies.set({
      name: "posie_session",
      value: "",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ success: true });
  }
}
