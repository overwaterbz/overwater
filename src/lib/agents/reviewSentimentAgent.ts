/**
 * Review Sentiment Agent — Overwater
 * Analyze guest reviews and surface sentiment trends.
 */

import type { SupabaseClient } from "@supabase/supabase-js";

export interface ReviewSummary {
  total_reviews: number;
  average_rating: number;
  positive_count: number;
  neutral_count: number;
  negative_count: number;
  recent_highlights: string[];
}

export type Sentiment = "positive" | "neutral" | "negative";

export function classifySentiment(rating: number): Sentiment {
  if (rating >= 4) return "positive";
  if (rating >= 3) return "neutral";
  return "negative";
}

export async function getReviewSummary(
  supabase: SupabaseClient,
  daysBack: number = 90,
): Promise<ReviewSummary> {
  const since = new Date();
  since.setDate(since.getDate() - daysBack);

  const { data, error } = await supabase
    .from("ow_reviews")
    .select("rating, comment, created_at")
    .gte("created_at", since.toISOString())
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Failed to fetch reviews: ${error.message}`);

  const reviews = data || [];
  const ratings = reviews.map((r: { rating: number }) => r.rating);
  const avg =
    ratings.length > 0
      ? ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length
      : 0;

  return {
    total_reviews: reviews.length,
    average_rating: Math.round(avg * 10) / 10,
    positive_count: ratings.filter((r: number) => r >= 4).length,
    neutral_count: ratings.filter((r: number) => r === 3).length,
    negative_count: ratings.filter((r: number) => r < 3).length,
    recent_highlights: reviews
      .filter((r: { rating: number }) => r.rating >= 4)
      .slice(0, 3)
      .map((r: { comment: string }) => r.comment),
  };
}
