/**
 * Lead Scoring Engine — Overwater
 */

import { SupabaseClient } from "@supabase/supabase-js";

export interface LeadScore {
  session_id: string;
  score: number;
  tier: "cold" | "warm" | "hot" | "qualified";
  sources: string[];
}

export const EVENT_SCORES: Record<string, number> = {
  page_view: 5,
  quiz_started: 10,
  quiz_completed: 15,
  element_result_viewed: 15,
  ownership_page_viewed: 20,
  newsletter_signup: 10,
  booking_started: 25,
  signup_completed: 10,
};

export function calculateTier(
  score: number,
): "cold" | "warm" | "hot" | "qualified" {
  if (score >= 80) return "qualified";
  if (score >= 50) return "hot";
  if (score >= 20) return "warm";
  return "cold";
}

export async function updateLeadScores(
  supabase: SupabaseClient,
  since: Date,
): Promise<{ updated: number; newLeads: number }> {
  const { data: events, error } = await supabase
    .from("events")
    .select("event, source, session_id")
    .gte("created_at", since.toISOString());
  if (error || !events?.length) return { updated: 0, newLeads: 0 };

  const sessionMap = new Map<string, { score: number; sources: Set<string> }>();
  for (const ev of events) {
    if (!ev.session_id) continue;
    if (!sessionMap.has(ev.session_id))
      sessionMap.set(ev.session_id, { score: 0, sources: new Set() });
    const s = sessionMap.get(ev.session_id)!;
    s.score += EVENT_SCORES[ev.event] || 5;
    if (ev.source) s.sources.add(ev.source);
  }

  let updated = 0,
    newLeads = 0;
  for (const [sessionId, data] of sessionMap) {
    if (data.sources.size >= 2) data.score += 20;
    const tier = calculateTier(data.score);
    const { data: existing } = await supabase
      .from("lead_scores")
      .select("id")
      .eq("session_id", sessionId)
      .single();
    if (existing) {
      await supabase
        .from("lead_scores")
        .update({ score: data.score, tier })
        .eq("session_id", sessionId);
      updated++;
    } else {
      await supabase
        .from("lead_scores")
        .insert({
          session_id: sessionId,
          score: data.score,
          tier,
          sources: Array.from(data.sources),
        });
      newLeads++;
    }
  }
  return { updated, newLeads };
}
