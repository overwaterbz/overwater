import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
);

const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3; // 3 per minute
const WINDOW_MS = 60_000;

export async function POST(req: NextRequest) {
  // Rate limit
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (entry && now < entry.resetAt) {
    entry.count++;
    if (entry.count > RATE_LIMIT) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
  } else {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  }

  try {
    const body = await req.json();
    const { name, email, topic, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    // Basic email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Truncate fields to prevent abuse
    const safe = {
      name: String(name).slice(0, 200),
      email: String(email).slice(0, 320),
      topic: String(topic || "General Question").slice(0, 100),
      message: String(message).slice(0, 5000),
    };

    const { error } = await supabase.from("contact_inquiries").insert({
      name: safe.name,
      email: safe.email,
      topic: safe.topic,
      message: safe.message,
      source: "overwater.com",
    });

    if (error) {
      console.error("Contact insert error:", error);
      return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
