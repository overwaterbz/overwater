/* ─── Fractional ownership data for Overwater listings ─── */

export interface Listing {
  id: string;
  name: string;
  slug: string;
  type: "cabana" | "lot";
  bedrooms: number;
  sqft: number;
  fullPrice: number;           // Total unit price
  sharesAvailable: number;     // How many shares remain
  totalShares: number;         // e.g. 8 or 10
  monthlyPayment: number;      // Per-share monthly (0% interest)
  downPayment: number;         // Per-share upfront
  netIncomeMin: number;        // Per-share annual net rental income low est.
  netIncomeMax: number;        // Per-share annual net rental income high est.
  image: string;
  features: string[];
  description: string;
  floorplan?: string;
}

export const LISTINGS: Listing[] = [
  {
    id: "cabana-4-duplex",
    name: "Cabana 4 — Overwater Duplex",
    slug: "cabana-4-duplex",
    type: "cabana",
    bedrooms: 2,
    sqft: 1100,
    fullPrice: 450000,
    sharesAvailable: 6,
    totalShares: 8,
    monthlyPayment: 625,
    downPayment: 6250,
    netIncomeMin: 4375,
    netIncomeMax: 7125,
    image: "/images/cabana-duplex.jpg",
    features: [
      "Glass bottom floor panels",
      "Private plunge pool",
      "Rooftop terrace",
      "Full kitchen",
      "Over-the-reef location",
      "1,100 sq ft living space",
    ],
    description:
      "The crown jewel — a 2-bedroom overwater duplex with glass floors that reveal the Caribbean reef below. Private plunge pool, rooftop deck, full kitchen. This is not a timeshare — you own a real fractional deed through a Belize IBC.",
  },
  {
    id: "cabana-2-1br",
    name: "Cabana 2 — 1BR Overwater",
    slug: "cabana-2-1br",
    type: "cabana",
    bedrooms: 1,
    sqft: 650,
    fullPrice: 275000,
    sharesAvailable: 8,
    totalShares: 10,
    monthlyPayment: 458,
    downPayment: 2750,
    netIncomeMin: 1600,
    netIncomeMax: 2700,
    image: "/images/cabana-1br.jpg",
    features: [
      "Glass bottom floor panels",
      "Private deck over water",
      "Kitchenette",
      "Reef snorkeling from your door",
      "650 sq ft studio layout",
    ],
    description:
      "An intimate 1-bedroom overwater cabana with the same glass floors and reef access. Perfect entry point into fractional overwater ownership with strong rental returns.",
  },
  {
    id: "lot-3-new-build",
    name: "Lot 3 — New Overwater Build",
    slug: "lot-3-new-build",
    type: "lot",
    bedrooms: 2,
    sqft: 1200,
    fullPrice: 500000,
    sharesAvailable: 10,
    totalShares: 10,
    monthlyPayment: 695,
    downPayment: 5000,
    netIncomeMin: 4500,
    netIncomeMax: 7500,
    image: "/images/lot-new-build.jpg",
    features: [
      "Brand new construction",
      "Glass bottom floor throughout",
      "Infinity plunge pool",
      "Smart home tech",
      "Premium reef position",
      "1,200 sq ft modern design",
    ],
    description:
      "A ground-floor opportunity — new overwater cabana being built on Lot 3. Get in at pre-construction pricing with a custom modern design including smart home automation and infinity plunge pool.",
  },
  {
    id: "lot-6-new-build",
    name: "Lot 6 — New Overwater Build",
    slug: "lot-6-new-build",
    type: "lot",
    bedrooms: 2,
    sqft: 1200,
    fullPrice: 500000,
    sharesAvailable: 10,
    totalShares: 10,
    monthlyPayment: 695,
    downPayment: 5000,
    netIncomeMin: 4500,
    netIncomeMax: 7500,
    image: "/images/lot-new-build.jpg",
    features: [
      "Brand new construction",
      "Glass bottom floor throughout",
      "Rooftop sunset lounge",
      "Smart home tech",
      "Lagoon-side position",
      "1,200 sq ft modern design",
    ],
    description:
      "Lot 6 offers a lagoon-side overwater build with stunning sunset views. Same ownership structure, same income potential — different vantage point of paradise.",
  },
  {
    id: "lot-7-new-build",
    name: "Lot 7 — New Overwater Build",
    slug: "lot-7-new-build",
    type: "lot",
    bedrooms: 2,
    sqft: 1200,
    fullPrice: 500000,
    sharesAvailable: 10,
    totalShares: 10,
    monthlyPayment: 695,
    downPayment: 5000,
    netIncomeMin: 4500,
    netIncomeMax: 7500,
    image: "/images/lot-new-build.jpg",
    features: [
      "Brand new construction",
      "Glass bottom floor throughout",
      "Private dock access",
      "Smart home tech",
      "End-of-pier premium location",
      "1,200 sq ft modern design",
    ],
    description:
      "The end-of-pier position on Lot 7 offers 270-degree water views and the most private location on the property. Premium placement with maximum rental demand.",
  },
];

/* ─── Comparison: Dirt Lots vs Overwater Magic Shares ─── */
export interface ComparisonRow {
  feature: string;
  dirtLot: string;
  overwater: string;
}

export const COMPARISON: ComparisonRow[] = [
  { feature: "Monthly Payment", dirtLot: "$500–700/mo", overwater: "$458–695/mo" },
  { feature: "What You Own", dirtLot: "Empty dirt plot in jungle", overwater: "Fractional deed to luxury overwater cabana" },
  { feature: "Infrastructure", dirtLot: "None — you build everything", overwater: "Turn-key: furnished, staffed, managed" },
  { feature: "Rental Income", dirtLot: "$0 (undeveloped land)", overwater: "$1,600–$7,500/year per share" },
  { feature: "Use It Today", dirtLot: "No — years of construction", overwater: "Yes — book your stay anytime" },
  { feature: "Glass-Floor Living", dirtLot: "Impossible", overwater: "Standard feature" },
  { feature: "0% Financing", dirtLot: "Rarely offered", overwater: "Yes — 0% interest, flexible terms" },
  { feature: "Resale Value", dirtLot: "Uncertain (undeveloped land)", overwater: "Appreciating waterfront asset" },
  { feature: "Management", dirtLot: "You handle everything", overwater: "Full concierge + rental management" },
  { feature: "The Vibe", dirtLot: "Hope & waiting", overwater: "Living your dream now" },
];

/* ─── Soulful Escape Quiz — questions from the Blueprint PDF ─── */
export interface QuizQuestion {
  id: string;
  step: number;
  question: string;
  subtitle?: string;
  options: { label: string; value: string; element?: string }[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    step: 1,
    question: "When you close your eyes and imagine waking up in paradise, what do you see first?",
    subtitle: "Trust your instinct — there's no wrong answer.",
    options: [
      { label: "Sunrise over turquoise water through a glass floor", value: "water-sunrise", element: "Water" },
      { label: "A warm breeze on a private rooftop terrace", value: "rooftop-breeze", element: "Wind" },
      { label: "A cozy nook with natural wood and soft candlelight", value: "cozy-nook", element: "Earth" },
      { label: "A crackling fire pit under infinite stars", value: "fire-stars", element: "Fire" },
    ],
  },
  {
    id: "q2",
    step: 2,
    question: "What matters most to you in an escape?",
    options: [
      { label: "Deep rest and reset — I need to come back to myself", value: "rest-reset", element: "Water" },
      { label: "Adventure and exploration — I want to feel alive", value: "adventure", element: "Fire" },
      { label: "Connection — with a partner, nature, or my own spirit", value: "connection", element: "Earth" },
      { label: "Freedom — no agenda, just wind and possibility", value: "freedom", element: "Wind" },
    ],
  },
  {
    id: "q3",
    step: 3,
    question: "What does 'ownership' mean to you?",
    subtitle: "Think beyond real estate — what does having a piece of paradise unlock?",
    options: [
      { label: "A sanctuary I can always return to", value: "sanctuary", element: "Earth" },
      { label: "A smart investment that works while I live my life", value: "investment", element: "Fire" },
      { label: "A creative canvas — somewhere I can make my own", value: "creative", element: "Wind" },
      { label: "A legacy — something my family inherits", value: "legacy", element: "Water" },
    ],
  },
  {
    id: "q4",
    step: 4,
    question: "How do you recharge?",
    options: [
      { label: "Alone, in stillness — meditation, journaling, water", value: "stillness", element: "Water" },
      { label: "Through movement — diving, kayaking, exploring", value: "movement", element: "Fire" },
      { label: "Through creation — cooking, decorating, building", value: "creation", element: "Wind" },
      { label: "Through grounding — nature walks, gardening, stargazing", value: "grounding", element: "Earth" },
    ],
  },
  {
    id: "q5",
    step: 5,
    question: "Which soul path resonates most?",
    subtitle: "Don't overthink it — feel which one lights up.",
    options: [
      { label: "Soulful Resident — I want a second home I actually use and love", value: "resident", element: "Earth" },
      { label: "Conscious Investor — I want passive income from paradise", value: "investor", element: "Fire" },
      { label: "Hybrid Creator — I want both: enjoy it AND earn from it", value: "hybrid", element: "Wind" },
    ],
  },
  {
    id: "q6",
    step: 6,
    question: "What's your ideal monthly investment for a piece of overwater paradise?",
    options: [
      { label: "Under $500/month — I want to start smart", value: "under-500" },
      { label: "$500–700/month — the sweet spot", value: "500-700" },
      { label: "$700+/month — I'm ready for the premium experience", value: "over-700" },
    ],
  },
];

/* ─── Elemental System from the Blueprint ─── */
export interface Element {
  name: string;
  tagline: string;
  color: string;
  icon: string;
  description: string;
}

export const ELEMENTS: Record<string, Element> = {
  Water: {
    name: "Water",
    tagline: "The Reflective Soul",
    color: "#0ea5e9",
    icon: "🌊",
    description:
      "You are drawn to stillness, depth, and the healing power of the sea. Your sanctuary is where the reef meets the glass floor — where you can simply be.",
  },
  Fire: {
    name: "Fire",
    tagline: "The Bold Creator",
    color: "#ef4444",
    icon: "🔥",
    description:
      "You bring energy, vision, and passion. Ownership to you means building something — a legacy, an empire, a lifestyle that reflects your ambition.",
  },
  Wind: {
    name: "Wind",
    tagline: "The Free Spirit",
    color: "#8b5cf6",
    icon: "💨",
    description:
      "You crave freedom, creativity, and possibility. Your paradise is a launchpad — a home base you come and go from, always on your own terms.",
  },
  Earth: {
    name: "Earth",
    tagline: "The Grounded Guardian",
    color: "#22c55e",
    icon: "🌿",
    description:
      "You seek roots, connection, and sanctuary. You want a place that feels like home — surrounded by nature, grounded in meaning, designed to last.",
  },
};
