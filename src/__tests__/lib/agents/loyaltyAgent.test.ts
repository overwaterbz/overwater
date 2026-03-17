import { calculateTier } from "@/lib/agents/loyaltyAgent";

describe("loyaltyAgent", () => {
  describe("calculateTier", () => {
    it("returns bronze for 0 points", () => {
      expect(calculateTier(0)).toBe("bronze");
    });

    it("returns silver for 500+ points", () => {
      expect(calculateTier(500)).toBe("silver");
      expect(calculateTier(1499)).toBe("silver");
    });

    it("returns gold for 1500+ points", () => {
      expect(calculateTier(1500)).toBe("gold");
      expect(calculateTier(4999)).toBe("gold");
    });

    it("returns platinum for 5000+ points", () => {
      expect(calculateTier(5000)).toBe("platinum");
      expect(calculateTier(10000)).toBe("platinum");
    });
  });
});
