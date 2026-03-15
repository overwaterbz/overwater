import { NextRequest, NextResponse } from "next/server";
import { LISTINGS, ELEMENTS } from "@/lib/data";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are the AI Concierge for Overwater.com — the global Magic Portal for fractional overwater living.

Your role: Answer questions about fractional overwater cabana ownership, pricing, the Soulful Escape Blueprint, and the expanding Overwater brand. Be warm, knowledgeable, and concise.

KEY FACTS:
- Overwater.com is a global brand. Lina Point in Belize is the flagship resort, with expansion planned across the Caribbean, Central America, Southeast Asia, and luxury resort destinations worldwide.
- The brand includes "overwater-over-ocean" builds on coastlines AND "overwater-over-pool" cabanas at inland resorts.
- Lina Point is an existing overwater resort in San Pedro, Ambergris Caye, Belize
- Fractional ownership through Belize IBC (International Business Company) — real legal deeds
- NOT a timeshare — you own a fractional deed with transfer/inheritance rights
- 0% interest owner financing, no banks or credit checks
- Glass-floor overwater cabanas on the Belize Barrier Reef (UNESCO World Heritage Site)

LISTINGS:
${LISTINGS.map((l) => `- ${l.name}: ${l.bedrooms}BR, ${l.sqft}sqft, $${l.monthlyPayment}/mo per share, $${l.downPayment} down, $${l.netIncomeMin}-$${l.netIncomeMax}/yr rental income, ${l.sharesAvailable}/${l.totalShares} shares available`).join("\n")}

ELEMENTS (for the Soulful Quiz):
${Object.values(ELEMENTS).map((e) => `- ${e.name} (${e.tagline}): ${e.description}`).join("\n")}

SOUL PATHS: Soulful Resident (second home user), Conscious Investor (passive income), Hybrid Creator (both)

Always end responses by suggesting next steps: take the quiz (/quiz), view listings (/own), or contact Rick (rick@linapoint.com, WhatsApp +501-610-6547).
Keep responses under 150 words. Be friendly but professional.`;

export async function POST(req: NextRequest) {
  const { messages } = (await req.json()) as { messages: Message[] };

  const grokKey = process.env.GROK_API_KEY || process.env.XAI_API_KEY;

  // If no API key, provide intelligent fallback responses
  if (!grokKey) {
    const lastMsg = messages[messages.length - 1]?.content?.toLowerCase() || "";
    let reply = "";

    if (lastMsg.includes("price") || lastMsg.includes("cost") || lastMsg.includes("payment") || lastMsg.includes("monthly")) {
      reply = "Our Magic Shares start at just $458/month per share with 0% interest! The Cabana 4 Duplex (2BR, glass floors, plunge pool) is $625/mo with $6,250 down. Check out all options at /own or email Rick at rick@linapoint.com.";
    } else if (lastMsg.includes("income") || lastMsg.includes("rental") || lastMsg.includes("roi") || lastMsg.includes("invest")) {
      reply = "Each share generates real rental income: $1,600–$7,500/year depending on the listing and number of shares. Your cabana is professionally managed and rented year-round. View the calculator at /own to model your returns!";
    } else if (lastMsg.includes("quiz") || lastMsg.includes("element") || lastMsg.includes("blueprint")) {
      reply = "The Soulful Escape Quiz matches you with your element (Water, Fire, Wind, or Earth) and recommends a Soul Path + ideal cabana. It takes about 60 seconds — try it at /quiz!";
    } else if (lastMsg.includes("belize") || lastMsg.includes("location") || lastMsg.includes("where")) {
      reply = "Lina Point is located in San Pedro, on Ambergris Caye, Belize — consistently ranked the #1 island in the world. English-speaking, stable government, and the Belize Barrier Reef (UNESCO World Heritage Site) is literally your front yard!";
    } else {
      reply = "Great question! Overwater.com offers fractional ownership of luxury glass-floor overwater cabanas at Lina Point Resort in Belize. Starting at $458/mo with 0% interest. Take our 60-second Soulful Quiz at /quiz to find your perfect match, or view all listings at /own!";
    }

    return NextResponse.json({ reply });
  }

  try {
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${grokKey}`,
      },
      body: JSON.stringify({
        model: "grok-3-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-6),
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[concierge] Grok API error:", res.status, text);
      return NextResponse.json({
        reply: "I'm having a moment — please try again or reach out to Rick directly at rick@linapoint.com!",
      });
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "I'd love to help! Email rick@linapoint.com for a direct conversation.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[concierge] Error:", err);
    return NextResponse.json({
      reply: "Connection issue — please try again or contact Rick at rick@linapoint.com or WhatsApp +501-610-6547.",
    });
  }
}
