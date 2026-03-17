/**
 * Guest Intelligence Agent — Overwater
 * Builds guest profiles from booking history and preferences.
 */

import { SupabaseClient } from "@supabase/supabase-js";

export interface GuestProfile {
  session_id: string;
  element?: string;
  quiz_completed: boolean;
  pages_visited: string[];
  interest_level: "browsing" | "interested" | "ready_to_buy";
  visit_count: number;
}

export async function buildGuestProfile(
  supabase: SupabaseClient,
  sessionId: string,
): Promise<GuestProfile | null> {
  const { data: events } = await supabase
    .from("events")
    .select("event, properties, page_url")
    .eq("session_id", sessionId)
    .eq("source", "overwater");
  if (!events?.length) return null;

  const pages = [
    ...new Set(events.filter((e) => e.page_url).map((e) => e.page_url)),
  ];
  const quiz = events.find((e) => e.event === "quiz_completed");
  const hasOwnershipView = events.some(
    (e) =>
      e.page_url?.includes("/ownership") || e.page_url?.includes("/pricing"),
  );

  let interest: "browsing" | "interested" | "ready_to_buy" = "browsing";
  if (hasOwnershipView) interest = "interested";
  if (quiz) interest = "interested";
  if (events.length > 10 && hasOwnershipView) interest = "ready_to_buy";

  return {
    session_id: sessionId,
    element: quiz?.properties?.element,
    quiz_completed: !!quiz,
    pages_visited: pages,
    interest_level: interest,
    visit_count: events.length,
  };
}
