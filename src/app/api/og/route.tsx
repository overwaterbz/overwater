import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
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
          background: "linear-gradient(135deg, #0a1628 0%, #0c2340 40%, #0d4f6b 70%, #0ea5e9 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Overlay */}
        <div style={{ display: "flex", position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)" }} />

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
          <div style={{ fontSize: "64px", marginBottom: "16px", display: "flex" }}>🌊</div>

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
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
