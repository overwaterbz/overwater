/**
 * API Route: GET /api/cron/ecosystem-triggers
 * Scheduled every 2 hours via vercel.json
 *
 * Runs Overwater marketing triggers:
 *  - Quiz completion logging
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifyCronSecret } from "@/lib/cronAuth";
import { runOverwaterTriggers } from "@/lib/agents/ecosystemTriggers";

export async function GET(request: NextRequest) {
  try {
    const denied = verifyCronSecret(request.headers.get("authorization"));
    if (denied) return denied;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.SUPABASE_SERVICE_ROLE_KEY || "",
    );

    const since = new Date(Date.now() - 2 * 60 * 60 * 1000);
    const results = await runOverwaterTriggers(supabase, since);

    return NextResponse.json({
      ok: true,
      triggers: results.length,
      results,
      ran_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Overwater EcosystemTriggers]", error);
    return NextResponse.json(
      { ok: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
