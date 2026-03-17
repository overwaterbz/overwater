/**
 * Ecosystem Brand Profiles — Overwater context
 */

export interface BrandProfile {
  name: string;
  tagline: string;
  url: string;
  themes: string[];
  voice: string;
  keyMessages: string[];
  callToAction: string;
}

export const BRAND_PROFILES: Record<string, BrandProfile> = {
  overwater: {
    name: "Overwater.com",
    tagline: "Own the Magic",
    url: "https://overwater.com",
    themes: [
      "fractional overwater living",
      "glass-floor cabanas",
      "Caribbean investment",
      "soulful escape",
    ],
    voice:
      "Aspirational, warm, mystical. Speaks to the soul-searcher who wants to own a piece of paradise.",
    keyMessages: [
      "Fractional ownership starting at $458/mo",
      "Glass-floor overwater cabanas on the Belize Barrier Reef",
      "Not a timeshare — real fractional deeds",
      "0% interest owner financing, no banks",
      "Take the Soulful Escape Quiz to find your element",
    ],
    callToAction: "Take the quiz at overwater.com/quiz",
  },
  "lina-point": {
    name: "Lina Point Resort",
    tagline: "The Magic is You",
    url: "https://linapoint.com",
    themes: ["overwater luxury resort"],
    voice: "Luxury with soul.",
    keyMessages: ["Book direct — 6% below OTAs"],
    callToAction: "Book at linapoint.com",
  },
  "kyla-point": {
    name: "Kyla Point",
    tagline: "Your Home in Belize",
    url: "https://kylapoint.com",
    themes: ["master-planned community"],
    voice: "Warm, community-oriented.",
    keyMessages: ["Master-planned community"],
    callToAction: "Explore at kylapoint.com",
  },
  "magic-is-you": {
    name: "Magic is You",
    tagline: "Discover Your Cosmic Blueprint",
    url: "https://magic.overwater.com",
    themes: ["Mayan astrology"],
    voice: "Mystical, empowering.",
    keyMessages: ["Free cosmic blueprint"],
    callToAction: "Get your blueprint",
  },
  "point-realtor": {
    name: "Point Realtor",
    tagline: "Caribbean & Florida Real Estate",
    url: "https://pointrealtor.com",
    themes: ["real estate brokerage"],
    voice: "Professional, knowledgeable.",
    keyMessages: ["Full-service brokerage"],
    callToAction: "Find property",
  },
  "point-enterprise": {
    name: "Point Enterprise",
    tagline: "Building Tomorrow's Communities",
    url: "https://pointenterprise.com",
    themes: ["portfolio management"],
    voice: "Professional, visionary.",
    keyMessages: ["Multi-brand portfolio"],
    callToAction: "Learn more",
  },
};

export function getBrandProfile(key: string): BrandProfile | undefined {
  return BRAND_PROFILES[key];
}
export function getAllBrands(): BrandProfile[] {
  return Object.values(BRAND_PROFILES);
}
