/**
 * Event Recommendation Agent — Overwater
 * Personalized experience and event suggestions based on guest profile.
 */

import type { SupabaseClient } from "@supabase/supabase-js";

export interface OWEvent {
  id: string;
  name: string;
  type: string;
  date: string;
  capacity: number;
  spots_remaining: number;
  description: string;
}

export async function getUpcomingEvents(
  supabase: SupabaseClient,
  limit: number = 10,
): Promise<OWEvent[]> {
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("ow_events")
    .select("*")
    .gte("date", now)
    .gt("spots_remaining", 0)
    .order("date")
    .limit(limit);

  if (error) throw new Error(`Failed to fetch events: ${error.message}`);
  return (data as OWEvent[]) || [];
}

export async function recommendEventsForGuest(
  supabase: SupabaseClient,
  guestEmail: string,
): Promise<{ events: OWEvent[]; personalised: boolean }> {
  // Check guest interests
  const { data: prefs } = await supabase
    .from("ow_guest_preferences")
    .select("interest_types")
    .eq("email", guestEmail)
    .single();

  const allEvents = await getUpcomingEvents(supabase, 20);

  if (prefs?.interest_types?.length) {
    const interests = prefs.interest_types as string[];
    const matched = allEvents.filter((e) => interests.includes(e.type));
    return { events: matched.slice(0, 5), personalised: true };
  }

  return { events: allEvents.slice(0, 5), personalised: false };
}
