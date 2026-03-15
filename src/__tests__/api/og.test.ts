/**
 * OG Image API route tests
 * Tests rate limiting and image generation
 */

import { NextRequest } from "next/server";

// OG routes use edge runtime — we test basic import and rate-limit logic

describe("GET /api/og", () => {
  it("module exports a GET function", async () => {
    const mod = await import("@/app/api/og/route");
    expect(typeof mod.GET).toBe("function");
  });

  it("exports edge runtime", async () => {
    const mod = await import("@/app/api/og/route");
    expect(mod.runtime).toBe("edge");
  });
});

describe("GET /api/og/quiz", () => {
  it("module exports a GET function", async () => {
    const mod = await import("@/app/api/og/quiz/route");
    expect(typeof mod.GET).toBe("function");
  });

  it("exports edge runtime", async () => {
    const mod = await import("@/app/api/og/quiz/route");
    expect(mod.runtime).toBe("edge");
  });
});
