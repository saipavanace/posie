import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key") || "sample-asset";

  const isClinical = key.toLowerCase().includes("clinical");
  const title = isClinical ? "Clinical Face Chart (F039 Private Expiring)" : "Portfolio Asset (F102 Public)";
  const bg = isClinical ? "#2c3e50" : "#5b6e61";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <rect width="600" height="400" fill="${bg}"/>
    <circle cx="300" cy="180" r="100" fill="none" stroke="#e8dcc4" stroke-width="4" stroke-dasharray="6,6"/>
    <ellipse cx="300" cy="190" rx="65" ry="90" fill="none" stroke="#f4ebe1" stroke-width="2"/>
    <circle cx="265" cy="165" r="8" fill="#d97706"/>
    <circle cx="335" cy="165" r="8" fill="#d97706"/>
    <path d="M280 230 Q300 245 320 230" fill="none" stroke="#d97706" stroke-width="3"/>
    <text x="300" y="320" font-family="system-ui, sans-serif" font-size="18" font-weight="600" fill="#fcfbf7" text-anchor="middle">${title}</text>
    <text x="300" y="350" font-family="system-ui, sans-serif" font-size="12" fill="#d5ded6" text-anchor="middle">Key: ${key.substring(0, 45)}...</text>
  </svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
