"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{ background: "#0a0a1a", color: "#e8e0d0", margin: 0 }}
        className="min-h-screen flex items-center justify-center px-6"
      >
        <div style={{ maxWidth: 400, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 24 }}>⚓</div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#c9a55a", marginBottom: 12 }}>
            Something Went Wrong
          </h2>
          <p style={{ color: "#8a7a6a", marginBottom: 32 }}>
            We hit unexpected waters. Let&apos;s try again.
          </p>
          <button
            onClick={reset}
            style={{
              padding: "12px 24px",
              background: "#c9a55a",
              color: "#0a0a1a",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
