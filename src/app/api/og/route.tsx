import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const runtime = "edge";

const rateMap = new Map<string, { count: number; resetAt: number }>();

export async function GET(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (entry && now < entry.resetAt) {
    entry.count++;
    if (entry.count > 30) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
  } else {
    rateMap.set(ip, { count: 1, resetAt: now + 60_000 });
  }
  return new ImageResponse(
    <div
      style={{
        width: "1200",
        height: "630",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0a1628 0%, #0c2340 40%, #0d4f6b 70%, #0ea5e9 100%)",
        fontFamily: "sans-serif",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.3)",
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
          padding: "40px",
          textAlign: "center",
        }}
      >
        {/* Wave icon */}
        <div
          style={{ fontSize: "64px", marginBottom: "16px", display: "flex" }}
        >
          🌊
        </div>

        <div
          style={{
            fontSize: "56px",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "8px",
            display: "flex",
          }}
        >
          overwater
          <span style={{ color: "#d4a853" }}>.com</span>
        </div>

        <div
          style={{
            fontSize: "28px",
            color: "#e0e0e0",
            marginBottom: "24px",
            display: "flex",
          }}
        >
          Fractional Overwater Living — Starting in Belize
        </div>

        <div
          style={{
            display: "flex",
            gap: "32px",
            fontSize: "18px",
            color: "#d4a853",
          }}
        >
          <span style={{ display: "flex" }}>Glass-Floor Cabanas</span>
          <span style={{ display: "flex" }}>·</span>
          <span style={{ display: "flex" }}>From $458/mo</span>
          <span style={{ display: "flex" }}>·</span>
          <span style={{ display: "flex" }}>0% Interest</span>
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
