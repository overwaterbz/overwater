/* ─── Marketing AI Agent — Grok-powered content generator ─── */

export interface GeneratedContent {
  headline: string;
  body: string;
  cta: string;
  hashtags: string[];
  platform: string;
}

export interface AgentRequest {
  platform: "instagram" | "facebook" | "twitter" | "email" | "blog";
  topic?: string;
  tone?: "inspiring" | "urgent" | "educational" | "luxury";
  listing?: string; // listing id to focus on
}

const BRAND_CONTEXT = `You are the marketing copywriter for Overwater.com — a fractional overwater cabana ownership brand.

BRAND PILLARS:
- Flagship: Lina Point Resort, San Pedro, Ambergris Caye, Belize
- Expanding worldwide: Caribbean, Central America, Southeast Asia, inland resort pools
- Fractional ownership via Belize IBC — real legal deeds, NOT a timeshare
- 0% interest financing, starting at $458/month
- Glass-floor overwater cabanas on the Belize Barrier Reef (UNESCO World Heritage Site)
- Brand philosophy: "The Magic is You" — soulful, elemental (Water, Fire, Wind, Earth)
- Soul Paths: Soulful Resident, Conscious Investor, Hybrid Creator

VOICE: Warm, aspirational, grounded. Avoid hype or salesy language. Speak to the soul, not just the wallet.
WEBSITE: https://overwater.com
WHATSAPP: +501-610-6547
CONTACT: rick@linapoint.com`;

export async function generateContent(
  req: AgentRequest,
  apiKey: string,
): Promise<GeneratedContent> {
  const prompt = buildPrompt(req);

  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "grok-3-mini",
      messages: [
        { role: "system", content: BRAND_CONTEXT },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.8,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Grok API error ${res.status}: ${text}`);
  }

  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content || "";

  return parseResponse(raw, req.platform);
}

function buildPrompt(req: AgentRequest): string {
  const parts = [
    `Generate a ${req.platform} marketing post for Overwater.com.`,
  ];

  if (req.topic) parts.push(`Topic/angle: ${req.topic}`);
  if (req.tone) parts.push(`Tone: ${req.tone}`);
  if (req.listing) parts.push(`Focus listing: ${req.listing}`);

  parts.push(
    `\nRespond in this EXACT format:
HEADLINE: (one punchy line)
BODY: (the post body, appropriate length for ${req.platform})
CTA: (call to action with link or next step)
HASHTAGS: (comma-separated, 5-8 relevant hashtags)`,
  );

  return parts.join("\n");
}

function parseResponse(raw: string, platform: string): GeneratedContent {
  const get = (label: string) => {
    const regex = new RegExp(`${label}:\\s*(.+?)(?=\\n[A-Z]+:|$)`, "s");
    return regex.exec(raw)?.[1]?.trim() || "";
  };

  return {
    headline: get("HEADLINE") || "Own the Magic",
    body: get("BODY") || raw,
    cta: get("CTA") || "Visit overwater.com",
    hashtags: (get("HASHTAGS") || "overwater,belize,fractionalownership")
      .split(",")
      .map((h) => h.trim().replace(/^#/, "")),
    platform,
  };
}
