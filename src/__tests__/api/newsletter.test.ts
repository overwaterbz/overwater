/**
 * Newsletter API route tests
 */

const mockUpsert = jest.fn().mockResolvedValue({ error: null });
jest.mock("@supabase/supabase-js", () => ({
  createClient: () => ({
    from: () => ({ upsert: mockUpsert }),
  }),
}));

import { POST } from "@/app/api/newsletter/route";
import { NextRequest } from "next/server";

function makeRequest(body: Record<string, unknown>, ip = "127.0.0.1") {
  return new NextRequest("http://localhost/api/newsletter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/newsletter", () => {
  beforeEach(() => {
    mockUpsert.mockClear();
    mockUpsert.mockResolvedValue({ error: null });
  });

  it("subscribes a valid email", async () => {
    const res = await POST(makeRequest({ email: "Test@Example.com" }, "10.0.1.1"));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(mockUpsert).toHaveBeenCalledWith(
      expect.objectContaining({ email: "test@example.com", status: "active" }),
      expect.anything(),
    );
  });

  it("rejects invalid email", async () => {
    const res = await POST(makeRequest({ email: "not-valid" }, "10.0.1.2"));
    expect(res.status).toBe(400);
  });

  it("rejects empty email", async () => {
    const res = await POST(makeRequest({ email: "" }, "10.0.1.3"));
    expect(res.status).toBe(400);
  });

  it("returns 500 on Supabase error", async () => {
    mockUpsert.mockResolvedValue({ error: { message: "DB error" } });
    const res = await POST(makeRequest({ email: "fail@test.com" }, "10.0.1.4"));
    expect(res.status).toBe(500);
  });

  it("rate-limits after 5 requests from same IP", async () => {
    const ip = "10.0.1.99";
    for (let i = 0; i < 5; i++) {
      const res = await POST(makeRequest({ email: `user${i}@test.com` }, ip));
      expect(res.status).toBe(200);
    }

    const res = await POST(makeRequest({ email: "extra@test.com" }, ip));
    expect(res.status).toBe(429);
  });

  it("truncates source to 100 chars", async () => {
    const longSource = "x".repeat(200);
    const res = await POST(makeRequest({ email: "u@t.com", source: longSource }, "10.0.1.5"));
    expect(res.status).toBe(200);
    expect(mockUpsert).toHaveBeenCalledWith(
      expect.objectContaining({ source: longSource.slice(0, 100) }),
      expect.anything(),
    );
  });
});
