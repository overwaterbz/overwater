import { EVENT_SCORES, calculateTier } from "@/lib/agents/leadScoringEngine";

describe("leadScoringEngine", () => {
  it("has scores for quiz and booking events", () => {
    expect(EVENT_SCORES.quiz_completed).toBeGreaterThan(0);
    expect(EVENT_SCORES.page_view).toBe(5);
  });

  it("all scores positive", () => {
    for (const s of Object.values(EVENT_SCORES)) {
      expect(s).toBeGreaterThan(0);
    }
  });

  it("cold tier for low scores", () => {
    expect(calculateTier(0)).toBe("cold");
    expect(calculateTier(19)).toBe("cold");
  });

  it("warm tier for mid scores", () => {
    expect(calculateTier(20)).toBe("warm");
  });

  it("hot tier for high scores", () => {
    expect(calculateTier(50)).toBe("hot");
  });

  it("qualified tier for very high", () => {
    expect(calculateTier(80)).toBe("qualified");
  });
});
