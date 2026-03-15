import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const ELEMENT_STYLES: Record<string, { color: string; emoji: string; bg: string }> = {
  Water: { color: "#0ea5e9", emoji: "🌊", bg: "linear-gradient(135deg, #0a1628 0%, #0c2340 40%, #0ea5e9 100%)" },
  Fire: { color: "#ef4444", emoji: "🔥", bg: "linear-gradient(135deg, #1a0a0a 0%, #4a1010 40%, #ef4444 100%)" },
  Wind: { color: "#8b5cf6", emoji: "💨", bg: "linear-gradient(135deg, #0a0a1a 0%, #2d1a4a 40%, #8b5cf6 100%)" },
  Earth: { color: "#22c55e", emoji: "🌿", bg: "linear-gradient(135deg, #0a1a0a 0%, #1a3a1a 40%, #22c55e 100%)" },
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const element = searchParams.get("element") || "Water";
  const soulPath = searchParams.get("soulPath") || "Hybrid Creator";

  const style = ELEMENT_STYLES[element] || ELEMENT_STYLES.Water;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200",
          height: "630",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: style.bg,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 1,
            padding: "40px",
          }}
        >
          <div style={{ fontSize: "80px", marginBottom: "16px", display: "flex" }}>
            {style.emoji}
          </div>
          <div
            style={{
              fontSize: "44px",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "8px",
              display: "flex",
            }}
          >
            My Element:{" "}
            <span style={{ color: style.color, marginLeft: "12px" }}>{element}</span>
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#e0e0e0",
              marginBottom: "32px",
              display: "flex",
            }}
          >
            Soul Path: {soulPath}
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#d4a853",
              display: "flex",
              gap: "8px",
            }}
          >
            <span style={{ display: "flex" }}>Take the Soulful Escape Quiz at overwater.com/quiz</span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
