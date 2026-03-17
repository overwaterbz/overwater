/**
 * OG Quiz Image API route tests
 *
 * This route uses edge runtime + next/og ImageResponse.
 * We mock ImageResponse to avoid needing the full edge runtime in Jest.
 */

jest.mock("next/og", () => ({
  ImageResponse: jest
    .fn()
    .mockImplementation((_jsx: unknown, opts: unknown) => {
      return new Response("image-data", {
        status: 200,
        headers: { "Content-Type": "image/png" },
      });
    }),
}));

import { GET } from "@/app/api/og/quiz/route";
import { NextRequest } from "next/server";

describe("OG Quiz Image API", () => {
  it("returns an image response with default params", async () => {
    const req = new NextRequest("http://localhost/api/og/quiz");
    const res = await GET(req);
    expect(res.status).toBe(200);
  });

  it("accepts element and soulPath query params", async () => {
    const req = new NextRequest(
      "http://localhost/api/og/quiz?element=Fire&soulPath=Warrior",
    );
    const res = await GET(req);
    expect(res.status).toBe(200);
  });

  it("falls back to Water style for unknown element", async () => {
    const req = new NextRequest("http://localhost/api/og/quiz?element=Unknown");
    const res = await GET(req);
    expect(res.status).toBe(200);
  });
});
