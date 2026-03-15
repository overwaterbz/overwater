/**
 * Auth signout API route tests
 * Tests rate limiting and sign-out behavior
 */

const mockSignOut = jest.fn().mockResolvedValue({ error: null });
jest.mock("@/lib/supabase-server", () => ({
  createServerSupabaseClient: jest.fn().mockResolvedValue({
    auth: { signOut: mockSignOut },
  }),
}));

import { POST } from "@/app/api/auth/signout/route";
import { NextRequest } from "next/server";

function makeRequest(ip = "127.0.0.1") {
  return new NextRequest("http://localhost/api/auth/signout", {
    method: "POST",
    headers: { "x-forwarded-for": ip },
  });
}

describe("POST /api/auth/signout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("signs out successfully and returns ok", async () => {
    const res = await POST(makeRequest("10.0.0.1"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(mockSignOut).toHaveBeenCalled();
  });

  it("rate-limits after too many requests", async () => {
    const ip = "10.0.0.99";
    let lastRes;
    for (let i = 0; i < 12; i++) {
      lastRes = await POST(makeRequest(ip));
    }
    expect(lastRes!.status).toBe(429);
  });
});
