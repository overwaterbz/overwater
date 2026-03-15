/**
 * Concierge API route tests
 * Tests the AI concierge fallback responses and rate limiting
 */

jest.mock("@/lib/data", () => ({
  LISTINGS: [
    {
      name: "Cabana 1",
      bedrooms: 1,
      sqft: 800,
      monthlyPayment: 458,
      downPayment: 4580,
      netIncomeMin: 1600,
      netIncomeMax: 3200,
      sharesAvailable: 8,
      totalShares: 10,
    },
  ],
  ELEMENTS: {
    water: { name: "Water", tagline: "Flow", description: "Flow and intuition" },
  },
}));

import { POST } from "@/app/api/concierge/route";
import { NextRequest } from "next/server";

function makeRequest(messages: Array<{ role: string; content: string }>, ip = "127.0.0.1") {
  return new NextRequest("http://localhost/api/concierge", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify({ messages }),
  });
}

describe("POST /api/concierge", () => {
  beforeEach(() => {
    // Ensure no API key so fallback responses are used
    delete process.env.GROK_API_KEY;
    delete process.env.XAI_API_KEY;
  });

  it("returns fallback response about pricing", async () => {
    const res = await POST(
      makeRequest([{ role: "user", content: "What is the price?" }], "10.1.0.1"),
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.reply).toBeTruthy();
    expect(data.reply.toLowerCase()).toMatch(/share|month|payment/);
  });

  it("returns fallback response about investment", async () => {
    const res = await POST(
      makeRequest([{ role: "user", content: "What is the rental income?" }], "10.1.0.2"),
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.reply.toLowerCase()).toMatch(/income|rental|return/);
  });

  it("returns fallback response about location", async () => {
    const res = await POST(
      makeRequest([{ role: "user", content: "Where is Belize?" }], "10.1.0.3"),
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.reply.toLowerCase()).toMatch(/belize|san pedro/);
  });

  it("returns default fallback for general questions", async () => {
    const res = await POST(
      makeRequest([{ role: "user", content: "Hello there" }], "10.1.0.4"),
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.reply).toBeTruthy();
    expect(data.reply.toLowerCase()).toMatch(/overwater|cabana|fractional/);
  });

  it("rate-limits after 20 requests", async () => {
    const ip = "10.1.0.99";
    for (let i = 0; i < 20; i++) {
      await POST(makeRequest([{ role: "user", content: "hi" }], ip));
    }
    const res = await POST(makeRequest([{ role: "user", content: "hi" }], ip));
    expect(res.status).toBe(429);
  });
});
