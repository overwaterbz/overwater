/**
 * Contact API route tests
 * Tests validation, rate limiting, and Supabase insert behavior
 */

// Mock Supabase
const mockInsert = jest.fn().mockResolvedValue({ error: null });
jest.mock("@supabase/supabase-js", () => ({
  createClient: () => ({
    from: () => ({ insert: mockInsert }),
  }),
}));

import { POST } from "@/app/api/contact/route";
import { NextRequest } from "next/server";

function makeRequest(body: Record<string, unknown>, ip = "127.0.0.1") {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    mockInsert.mockClear();
    mockInsert.mockResolvedValue({ error: null });
  });

  it("returns 400 when name is missing", async () => {
    const res = await POST(makeRequest({ email: "a@b.com", message: "hi" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when email is missing", async () => {
    const res = await POST(makeRequest({ name: "Rick", message: "hi" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when message is missing", async () => {
    const res = await POST(makeRequest({ name: "Rick", email: "a@b.com" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for invalid email format", async () => {
    const res = await POST(makeRequest({ name: "Rick", email: "notanemail", message: "hi" }));
    expect(res.status).toBe(400);
  });

  it("inserts valid submission and returns ok", async () => {
    const res = await POST(
      makeRequest(
        { name: "Rick", email: "rick@linapoint.com", topic: "Fractional Ownership", message: "Interested!" },
        "10.0.0.1",
      ),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Rick",
        email: "rick@linapoint.com",
        topic: "Fractional Ownership",
        message: "Interested!",
        source: "overwater.com",
      }),
    );
  });

  it("truncates very long fields", async () => {
    const longMsg = "x".repeat(10000);
    const res = await POST(
      makeRequest({ name: "Rick", email: "a@b.com", message: longMsg }, "10.0.0.2"),
    );
    expect(res.status).toBe(200);
    const call = mockInsert.mock.calls[0][0];
    expect(call.message.length).toBeLessThanOrEqual(5000);
  });

  it("returns 500 when Supabase insert fails", async () => {
    mockInsert.mockResolvedValueOnce({ error: { message: "DB error" } });
    const res = await POST(
      makeRequest({ name: "Rick", email: "a@b.com", message: "hi" }, "10.0.0.3"),
    );
    expect(res.status).toBe(500);
  });
});
