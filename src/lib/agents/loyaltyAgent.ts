/**
 * Loyalty Agent — Overwater
 * Manage guest loyalty tiers and reward points.
 */

import type { SupabaseClient } from "@supabase/supabase-js";

export interface LoyaltyProfile {
  email: string;
  tier: "bronze" | "silver" | "gold" | "platinum";
  total_points: number;
  stays: number;
  member_since: string;
}

const TIER_THRESHOLDS = {
  bronze: 0,
  silver: 500,
  gold: 1500,
  platinum: 5000,
} as const;

export function calculateTier(points: number): LoyaltyProfile["tier"] {
  if (points >= TIER_THRESHOLDS.platinum) return "platinum";
  if (points >= TIER_THRESHOLDS.gold) return "gold";
  if (points >= TIER_THRESHOLDS.silver) return "silver";
  return "bronze";
}

export async function getLoyaltyProfile(
  supabase: SupabaseClient,
  email: string,
): Promise<LoyaltyProfile | null> {
  const { data, error } = await supabase
    .from("ow_loyalty")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !data) return null;

  const profile = data as {
    email: string;
    total_points: number;
    stays: number;
    member_since: string;
  };
  return {
    email: profile.email,
    tier: calculateTier(profile.total_points),
    total_points: profile.total_points,
    stays: profile.stays,
    member_since: profile.member_since,
  };
}

export async function awardPoints(
  supabase: SupabaseClient,
  email: string,
  points: number,
  reason: string,
): Promise<void> {
  const { error } = await supabase.from("ow_loyalty_events").insert({
    email,
    points,
    reason,
    created_at: new Date().toISOString(),
  });
  if (error) throw new Error(`Failed to award points: ${error.message}`);

  // Update cumulative total
  await supabase.rpc("increment_loyalty_points", {
    p_email: email,
    p_points: points,
  });
}
