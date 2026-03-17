import {
  SEASONAL_RATES,
  calculateMonthlyRate,
  getPricingTiers,
} from "@/lib/agents/pricingOptimizationAgent";

describe("pricingOptimizationAgent", () => {
  describe("SEASONAL_RATES", () => {
    it("covers all 12 months", () => {
      const allMonths = SEASONAL_RATES.flatMap((r) => r.months);
      for (let m = 1; m <= 12; m++) {
        expect(allMonths).toContain(m);
      }
    });

    it("has multipliers > 0", () => {
      for (const rate of SEASONAL_RATES) {
        expect(rate.multiplier).toBeGreaterThan(0);
      }
    });
  });

  describe("calculateMonthlyRate", () => {
    it("returns higher rate for peak month (Dec)", () => {
      const peakRate = calculateMonthlyRate(12);
      const shoulderRate = calculateMonthlyRate(5);
      expect(peakRate).toBeGreaterThan(shoulderRate);
    });

    it("returns a positive number for any month", () => {
      for (let m = 1; m <= 12; m++) {
        expect(calculateMonthlyRate(m)).toBeGreaterThan(0);
      }
    });
  });

  describe("getPricingTiers", () => {
    it("returns at least 2 tiers", () => {
      const tiers = getPricingTiers();
      expect(tiers.length).toBeGreaterThanOrEqual(2);
    });

    it("each tier has monthly > 0 and total > 0", () => {
      for (const t of getPricingTiers()) {
        expect(t.monthly).toBeGreaterThan(0);
        expect(t.total).toBeGreaterThan(0);
      }
    });

    it("each tier has an availability status", () => {
      for (const t of getPricingTiers()) {
        expect(["available", "limited", "sold_out"]).toContain(t.availability);
      }
    });
  });
});
