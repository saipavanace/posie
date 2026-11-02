import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  const bucket = searchParams.get("bucket");

  return NextResponse.json({
    simulated: true,
    message: "Direct-to-bucket upload simulated successfully (Milestone 4)",
    key,
    bucket,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(req: NextRequest) {
  return PUT(req);
}
