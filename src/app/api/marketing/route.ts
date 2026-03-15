import { NextRequest, NextResponse } from "next/server";
import { generateContent, type AgentRequest } from "@/lib/marketing-agent";

const VALID_PLATFORMS = ["instagram", "facebook", "twitter", "email", "blog"] as const;
const VALID_TONES = ["inspiring", "urgent", "educational", "luxury"] as const;

export async function POST(req: NextRequest) {
  // Simple bearer-token auth — set MARKETING_API_KEY in env
  const authHeader = req.headers.get("authorization");
  const expectedKey = process.env.MARKETING_API_KEY;

  if (!expectedKey || authHeader !== `Bearer ${expectedKey}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const grokKey = process.env.GROK_API_KEY || process.env.XAI_API_KEY;
  if (!grokKey) {
    return NextResponse.json({ error: "Grok API key not configured" }, { status: 500 });
  }

  const body = await req.json();
  const { platform, topic, tone, listing } = body as Partial<AgentRequest>;

  if (!platform || !VALID_PLATFORMS.includes(platform as typeof VALID_PLATFORMS[number])) {
    return NextResponse.json(
      { error: `Invalid platform. Must be one of: ${VALID_PLATFORMS.join(", ")}` },
      { status: 400 },
    );
  }

  if (tone && !VALID_TONES.includes(tone as typeof VALID_TONES[number])) {
    return NextResponse.json(
      { error: `Invalid tone. Must be one of: ${VALID_TONES.join(", ")}` },
      { status: 400 },
    );
  }

  try {
    const content = await generateContent(
      { platform: platform as AgentRequest["platform"], topic, tone, listing },
      grokKey,
    );
    return NextResponse.json({ content });
  } catch (err) {
    console.error("[marketing] Generation error:", err);
    return NextResponse.json(
      { error: "Content generation failed. Try again." },
      { status: 500 },
    );
  }
}
