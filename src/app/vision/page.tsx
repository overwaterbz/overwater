"use client";

import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import {
  Waves,
  Building2,
  TreePalm,
  Globe,
  Shield,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const VISION_POINTS = [
  {
    icon: Waves,
    title: "Living Over Water, Grounded by Earth",
    desc: "We build on water, not against it. Glass floors connect you to the reef. Natural materials honor the land. Every cabana is a bridge between sky and sea.",
  },
  {
    icon: Building2,
    title: "Real Infrastructure, Not Empty Promises",
    desc: "Unlike dirt-lot developers who sell dreams, Lina Point delivers: furnished cabanas, full staff, restaurant, bar, infinity pool, boat dock, and a proven rental management system.",
  },
  {
    icon: TreePalm,
    title: "San Pedro, Ambergris Caye",
    desc: "Consistently ranked the #1 island in the world. English-speaking, stable government, favorable tax structure. The Belize Barrier Reef — a UNESCO World Heritage Site — is your front yard.",
  },
  {
    icon: Globe,
    title: "IBC Ownership Structure",
    desc: "Fractional deeds held through Belize International Business Companies. Real legal ownership with transfer and inheritance rights. Not a timeshare — a real asset.",
  },
  {
    icon: Shield,
    title: "0% Interest Financing",
    desc: "No banks, no credit checks, no hidden fees. Direct owner financing with 0% interest. Start with as low as $2,750 down and $458/month.",
  },
  {
    icon: Users,
    title: "Maya-Inspired Community",
    desc: "Built with respect for the ancient Maya civilization that thrived across Belize for millennia. Geometric patterns, natural materials, and a philosophy of balance inform every design choice.",
  },
];

export default function VisionPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Hero */}
        <FadeIn>
          <div className="text-center py-20">
            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold mb-4">
              Our <span className="text-lagoon">Vision</span>
            </h1>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-[family-name:var(--font-display)] italic">
              &ldquo;What if paradise wasn&apos;t just a place you visited, but a place you owned — and it owned a piece of your soul?&rdquo;
            </p>
          </div>
        </FadeIn>

        {/* Story */}
        <FadeIn>
          <div className="glass-card p-8 sm:p-12 mb-16 max-w-3xl mx-auto">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-maya mb-6">
              The Lina Point Story
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                Lina Point began as a vision: overwater cabanas with glass floors in the Caribbean,
                accessible to real people — not just billionaires. A place where you could wake up,
                look down through your floor, and watch a nurse shark glide over coral.
              </p>
              <p>
                The resort is already built and operating on Ambergris Caye, San Pedro, Belize — the island
                TripAdvisor has called the #1 island in the world. The existing duplexes and cabanas host
                guests year-round, generating real rental income.
              </p>
              <p>
                Now we&apos;re expanding: three new overwater builds on Lots 3, 6, and 7, all available as
                fractional Magic Shares. Same monthly payment as a Belize dirt lot — but you get
                a real, furnished, income-generating overwater cabana.
              </p>
              <p>
                This is the <strong className="text-foreground">Magic Portal</strong> — where the Soulful Escape
                Blueprint, the &ldquo;Magic is You&rdquo; philosophy, and a smart investment all meet
                at the waterline.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Vision Points Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {VISION_POINTS.map((point, i) => (
            <FadeIn key={point.title} delay={i * 0.08}>
              <div className="glass-card p-6 h-full">
                <div className="w-12 h-12 rounded-full bg-lagoon/10 flex items-center justify-center mb-4">
                  <point.icon className="h-6 w-6 text-lagoon" />
                </div>
                <h3 className="font-semibold mb-2">{point.title}</h3>
                <p className="text-sm text-foreground/50 leading-relaxed">{point.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Numbers */}
        <FadeIn>
          <div className="glass-card p-8 sm:p-12 mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-center mb-8">
              By the Numbers
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              {[
                { value: "5", label: "Cabanas & Lots" },
                { value: "$458", label: "Lowest Monthly" },
                { value: "0%", label: "Interest Rate" },
                { value: "$7.5K", label: "Max Annual Income" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl sm:text-4xl font-bold text-lagoon">{stat.value}</p>
                  <p className="text-sm text-foreground/50 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Global Expansion */}
        <FadeIn>
          <div className="glass-card p-8 sm:p-12 mb-16 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-maya/10 flex items-center justify-center">
                <Globe className="h-6 w-6 text-maya" />
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-maya">
                Expanding Beyond Belize
              </h2>
            </div>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                Lina Point is our flagship — but the Overwater brand is bigger than one resort.
                We&apos;re scouting locations across the Caribbean, Central America, Southeast Asia,
                and resort destinations worldwide for the next generation of overwater living.
              </p>
              <p>
                Our vision includes <strong className="text-foreground">overwater-over-ocean</strong> builds
                on pristine coastlines and <strong className="text-foreground">overwater-over-pool</strong> cabanas
                at luxury inland resorts — bringing the glass-floor lifestyle to places you&apos;d never expect.
              </p>
              <p>
                Same fractional model. Same 0% financing. Same &ldquo;Magic is You&rdquo; philosophy.
                New horizons.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn>
          <div className="text-center">
            <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-maya/90 italic mb-6">
              &ldquo;The Magic is You&rdquo;
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 rounded-full bg-maya px-8 py-4 text-base font-semibold text-ocean-deep hover:bg-maya-warm transition-colors"
              >
                <Sparkles className="h-5 w-5" />
                Take the Quiz
              </Link>
              <Link
                href="/own"
                className="inline-flex items-center gap-2 rounded-full border border-lagoon/30 px-8 py-4 text-base font-semibold text-lagoon hover:bg-lagoon/10 transition-colors"
              >
                View Listings <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
