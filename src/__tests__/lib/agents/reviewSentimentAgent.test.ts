import { classifySentiment } from "@/lib/agents/reviewSentimentAgent";

describe("reviewSentimentAgent", () => {
  describe("classifySentiment", () => {
    it("returns positive for rating >= 4", () => {
      expect(classifySentiment(4)).toBe("positive");
      expect(classifySentiment(5)).toBe("positive");
    });

    it("returns neutral for rating 3", () => {
      expect(classifySentiment(3)).toBe("neutral");
    });

    it("returns negative for rating < 3", () => {
      expect(classifySentiment(2)).toBe("negative");
      expect(classifySentiment(1)).toBe("negative");
    });
  });
});
