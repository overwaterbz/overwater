/**
 * Ecosystem Marketing Triggers — Overwater
 */

import { SupabaseClient } from "@supabase/supabase-js";

export interface TriggerResult {
  trigger_type: string;
  session_id?: string;
  action_taken: string;
  status: "sent" | "failed" | "skipped";
}

async function processQuizCompletions(
  supabase: SupabaseClient,
  since: Date,
): Promise<TriggerResult[]> {
  const results: TriggerResult[] = [];
  const { data: events } = await supabase
    .from("events")
    .select("session_id, properties")
    .eq("event", "quiz_completed")
    .eq("source", "overwater")
    .gte("created_at", since.toISOString());
  if (!events?.length) return results;

  for (const ev of events) {
    if (!ev.session_id) continue;
    const { data: existing } = await supabase
      .from("marketing_triggers")
      .select("id")
      .eq("session_id", ev.session_id)
      .eq("trigger_type", "quiz_followup")
      .single();
    if (existing) continue;

    const element = ev.properties?.element || "Water";
    await supabase
      .from("marketing_triggers")
      .insert({
        trigger_type: "quiz_followup",
        session_id: ev.session_id,
        source_event: "quiz_completed",
        action_taken: `Quiz completed — element: ${element}`,
        action_details: { element },
        status: "sent",
        executed_at: new Date().toISOString(),
      });
    results.push({
      trigger_type: "quiz_followup",
      session_id: ev.session_id,
      action_taken: `Processed quiz (${element})`,
      status: "sent",
    });
  }
  return results;
}

export async function runOverwaterTriggers(
  supabase: SupabaseClient,
  since: Date,
): Promise<TriggerResult[]> {
  return processQuizCompletions(supabase, since);
}
