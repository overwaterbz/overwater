/**
 * Pricing Optimization Agent — Overwater
 * Dynamic fractional share pricing by season and demand.
 */

export interface PricingTier {
  tier: string;
  monthly: number;
  total: number;
  availability: "available" | "limited" | "sold_out";
}

export interface SeasonalRate {
  season: string;
  months: number[];
  multiplier: number;
}

export const SEASONAL_RATES: SeasonalRate[] = [
  { season: "peak", months: [12, 1, 2, 3], multiplier: 1.15 },
  { season: "high", months: [4, 7, 8, 11], multiplier: 1.0 },
  { season: "shoulder", months: [5, 6, 9, 10], multiplier: 0.9 },
];

const BASE_MONTHLY = 458;

export function calculateMonthlyRate(month: number): number {
  const rate = SEASONAL_RATES.find((r) => r.months.includes(month));
  return Math.round(BASE_MONTHLY * (rate?.multiplier || 1.0));
}

export function getPricingTiers(): PricingTier[] {
  return [
    { tier: "Explorer", monthly: 458, total: 54960, availability: "available" },
    {
      tier: "Pathfinder",
      monthly: 658,
      total: 78960,
      availability: "available",
    },
    { tier: "Visionary", monthly: 958, total: 114960, availability: "limited" },
  ];
}
