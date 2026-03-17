/**
 * Revenue Optimization Agent — Overwater
 * Occupancy and revenue yield analysis for fractional shares.
 */

import type { SupabaseClient } from "@supabase/supabase-js";

export interface OccupancyMetrics {
  period: string;
  total_units: number;
  occupied: number;
  occupancy_rate: number;
  revenue: number;
  rev_per_unit: number;
}

export async function getOccupancyMetrics(
  supabase: SupabaseClient,
  monthsBack: number = 6,
): Promise<OccupancyMetrics[]> {
  const since = new Date();
  since.setMonth(since.getMonth() - monthsBack);

  const { data, error } = await supabase
    .from("ow_occupancy")
    .select("period, total_units, occupied, revenue")
    .gte("period", since.toISOString().slice(0, 7))
    .order("period");

  if (error) throw new Error(`Failed to fetch occupancy: ${error.message}`);

  return (data || []).map(
    (row: {
      period: string;
      total_units: number;
      occupied: number;
      revenue: number;
    }) => ({
      period: row.period,
      total_units: row.total_units,
      occupied: row.occupied,
      occupancy_rate:
        row.total_units > 0
          ? Math.round((row.occupied / row.total_units) * 1000) / 10
          : 0,
      revenue: row.revenue,
      rev_per_unit:
        row.occupied > 0 ? Math.round(row.revenue / row.occupied) : 0,
    }),
  );
}

export async function identifyLowPerformers(
  supabase: SupabaseClient,
): Promise<{ unit_id: string; occupancy_rate: number; suggestion: string }[]> {
  const { data, error } = await supabase
    .from("ow_unit_performance")
    .select("unit_id, occupancy_rate")
    .lt("occupancy_rate", 50)
    .order("occupancy_rate");

  if (error)
    throw new Error(`Failed to fetch unit performance: ${error.message}`);

  return (data || []).map((u: { unit_id: string; occupancy_rate: number }) => ({
    unit_id: u.unit_id,
    occupancy_rate: u.occupancy_rate,
    suggestion:
      u.occupancy_rate < 25
        ? "Consider promotional pricing or targeted marketing"
        : "Monitor — slightly below target",
  }));
}
