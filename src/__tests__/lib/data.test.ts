import { LISTINGS, type Listing } from "@/lib/data";

describe("LISTINGS data", () => {
  it("should have at least one listing", () => {
    expect(LISTINGS.length).toBeGreaterThan(0);
  });

  it.each(LISTINGS)("$name has required fields", (listing: Listing) => {
    expect(listing.id).toBeTruthy();
    expect(listing.name).toBeTruthy();
    expect(listing.slug).toBeTruthy();
    expect(["cabana", "lot"]).toContain(listing.type);
    expect(listing.fullPrice).toBeGreaterThan(0);
    expect(listing.totalShares).toBeGreaterThan(0);
    expect(listing.monthlyPayment).toBeGreaterThan(0);
    expect(listing.image).toMatch(/^https?:\/\//);
    expect(listing.features.length).toBeGreaterThan(0);
    expect(listing.description).toBeTruthy();
  });

  it.each(LISTINGS)("$name has shares available <= total", (listing: Listing) => {
    expect(listing.sharesAvailable).toBeLessThanOrEqual(listing.totalShares);
    expect(listing.sharesAvailable).toBeGreaterThanOrEqual(0);
  });

  it.each(LISTINGS)("$name net income range is valid", (listing: Listing) => {
    expect(listing.netIncomeMin).toBeGreaterThanOrEqual(0);
    expect(listing.netIncomeMax).toBeGreaterThanOrEqual(listing.netIncomeMin);
  });

  it("slugs are unique", () => {
    const slugs = LISTINGS.map((l) => l.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("ids are unique", () => {
    const ids = LISTINGS.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
