/**
 * Concierge Agent — Overwater
 * Automated activity and excursion recommendations for guests.
 */

import type { SupabaseClient } from "@supabase/supabase-js";

export interface Activity {
  id: string;
  name: string;
  category: string;
  duration_hours: number;
  price_usd: number;
  difficulty: "easy" | "moderate" | "advanced";
  available: boolean;
}

export interface Recommendation {
  guest_email: string;
  activities: Activity[];
  reason: string;
}

export async function getAvailableActivities(
  supabase: SupabaseClient,
  category?: string,
): Promise<Activity[]> {
  let query = supabase
    .from("ow_activities")
    .select("*")
    .eq("available", true)
    .order("name");

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) throw new Error(`Failed to fetch activities: ${error.message}`);
  return (data as Activity[]) || [];
}

export async function recommendForGuest(
  supabase: SupabaseClient,
  guestEmail: string,
): Promise<Recommendation> {
  // Fetch guest preferences from past bookings
  const { data: history } = await supabase
    .from("ow_booking_history")
    .select("activity_category, rating")
    .eq("guest_email", guestEmail)
    .order("rating", { ascending: false })
    .limit(5);

  const preferredCategories = (history || []).map(
    (h: { activity_category: string }) => h.activity_category,
  );

  const activities = await getAvailableActivities(supabase);
  const matched = activities.filter((a) =>
    preferredCategories.length > 0
      ? preferredCategories.includes(a.category)
      : true,
  );

  return {
    guest_email: guestEmail,
    activities: matched.slice(0, 5),
    reason:
      preferredCategories.length > 0
        ? `Based on preference for ${preferredCategories[0]}`
        : "Popular activities for new guests",
  };
}
