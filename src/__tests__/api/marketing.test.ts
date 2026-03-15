/**
 * Marketing API route tests
 * Tests auth, validation, and content generation
 */

const mockGenerateContent = jest
  .fn()
  .mockResolvedValue("Generated social post");
jest.mock("@/lib/marketing-agent", () => ({
  generateContent: mockGenerateContent,
}));

import { POST } from "@/app/api/marketing/route";
import { NextRequest } from "next/server";

const API_KEY = "test-marketing-key";

function makeRequest(body: Record<string, unknown>, authHeader?: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (authHeader) headers["Authorization"] = authHeader;

  return new NextRequest("http://localhost/api/marketing", {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
}

describe("POST /api/marketing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.MARKETING_API_KEY = API_KEY;
    process.env.GROK_API_KEY = "test-grok-key";
  });

  it("returns 401 without auth header", async () => {
    const res = await POST(
      makeRequest({ platform: "instagram", topic: "test" }),
    );
    expect(res.status).toBe(401);
  });

  it("returns 401 with wrong API key", async () => {
    const res = await POST(
      makeRequest({ platform: "instagram", topic: "test" }, "Bearer wrong-key"),
    );
    expect(res.status).toBe(401);
  });

  it("returns 400 for invalid platform", async () => {
    const res = await POST(
      makeRequest({ platform: "tiktok", topic: "test" }, `Bearer ${API_KEY}`),
    );
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/platform/i);
  });

  it("returns 400 for invalid tone", async () => {
    const res = await POST(
      makeRequest(
        { platform: "instagram", topic: "test", tone: "angry" },
        `Bearer ${API_KEY}`,
      ),
    );
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/tone/i);
  });

  it("generates content with valid request", async () => {
    const res = await POST(
      makeRequest(
        { platform: "instagram", topic: "overwater living", tone: "luxury" },
        `Bearer ${API_KEY}`,
      ),
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.content).toBe("Generated social post");
    expect(mockGenerateContent).toHaveBeenCalledWith(
      expect.objectContaining({
        platform: "instagram",
        topic: "overwater living",
        tone: "luxury",
      }),
      "test-grok-key",
    );
  });

  it("returns 500 when generation fails", async () => {
    mockGenerateContent.mockRejectedValueOnce(new Error("API error"));
    const res = await POST(
      makeRequest({ platform: "blog", topic: "test" }, `Bearer ${API_KEY}`),
    );
    expect(res.status).toBe(500);
  });
});
