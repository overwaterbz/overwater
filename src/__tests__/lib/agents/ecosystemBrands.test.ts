import {
  getBrandProfile,
  getAllBrands,
  BRAND_PROFILES,
} from "@/lib/agents/ecosystemBrands";

describe("ecosystemBrands", () => {
  it("contains all 6 brands", () => {
    expect(Object.keys(BRAND_PROFILES)).toHaveLength(6);
  });

  it("returns overwater as primary brand", () => {
    const ow = getBrandProfile("overwater");
    expect(ow).toBeDefined();
    expect(ow!.name).toBe("Overwater.com");
    expect(ow!.url).toBe("https://overwater.com");
  });

  it("returns undefined for unknown key", () => {
    expect(getBrandProfile("fake")).toBeUndefined();
  });

  it("getAllBrands returns 6", () => {
    expect(getAllBrands()).toHaveLength(6);
  });

  it("every brand has themes array", () => {
    for (const brand of getAllBrands()) {
      expect(brand.themes.length).toBeGreaterThan(0);
    }
  });
});
