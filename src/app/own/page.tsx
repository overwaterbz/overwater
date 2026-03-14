"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";
import { ListingCard } from "@/components/ListingCard";
import { ShareCalculator } from "@/components/ShareCalculator";
import { LISTINGS } from "@/lib/data";
import {
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  Shield,
  FileText,
  TrendingUp,
} from "lucide-react";

const OWNERSHIP_STEPS = [
  { icon: Sparkles, title: "Choose Your Share", desc: "Pick the cabana and number of shares that fit your budget." },
  { icon: Shield, title: "Belize IBC Deed", desc: "You receive a real fractional deed through a Belize International Business Company." },
  { icon: TrendingUp, title: "Earn Rental Income", desc: "Your share earns proportional rental revenue, managed by Lina Point." },
  { icon: FileText, title: "Use & Enjoy", desc: "Book your personal weeks anytime. The rest is rented and earns for you." },
];

export default function OwnPage() {
  const [activeListing, setActiveListing] = useState(LISTINGS[0].id);
  const selected = LISTINGS.find((l) => l.id === activeListing) || LISTINGS[0];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Hero */}
        <FadeIn>
          <div className="text-center py-16">
            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold mb-4">
              Own the <span className="text-lagoon">Magic</span>
            </h1>
            <p className="text-foreground/60 max-w-2xl mx-auto leading-relaxed">
              Fractional ownership of real overwater cabanas with glass floors, private plunge pools, and
              rental income. Not a timeshare — a real Belize IBC deed.
            </p>
          </div>
        </FadeIn>

        {/* How It Works */}
        <FadeIn delay={0.1}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {OWNERSHIP_STEPS.map((step, i) => (
              <div key={step.title} className="glass-card p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-maya/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-6 w-6 text-maya" />
                </div>
                <div className="text-xs text-maya font-semibold mb-2">Step {i + 1}</div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-foreground/50">{step.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* All Listings */}
        <FadeIn>
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold mb-8 text-center">
            Available <span className="text-lagoon">Magic Shares</span>
          </h2>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {LISTINGS.map((listing, i) => (
            <div key={listing.id} id={listing.slug}>
              <ListingCard listing={listing} index={i} />
            </div>
          ))}
        </div>

        {/* Interactive Calculator */}
        <FadeIn>
          <div className="mb-8 text-center">
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold mb-4">
              Calculate Your <span className="text-maya">Investment</span>
            </h2>
            <p className="text-foreground/50 mb-6">Select a listing and adjust shares to see your numbers.</p>

            {/* Listing selector pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {LISTINGS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setActiveListing(l.id)}
                  className={`rounded-full px-4 py-2 text-sm transition-colors border ${
                    activeListing === l.id
                      ? "border-maya bg-maya/10 text-maya"
                      : "border-glass-border text-foreground/50 hover:border-lagoon/30"
                  }`}
                >
                  {l.name.split(" — ")[0]}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="max-w-lg mx-auto mb-20">
          <motion.div
            key={activeListing}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ShareCalculator listing={selected} />
          </motion.div>
        </div>

        {/* CTA */}
        <FadeIn>
          <div className="glass-card maya-glow p-10 sm:p-16 text-center max-w-3xl mx-auto">
            <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold mb-4">
              Ready for Your <span className="text-maya">Soulful Alignment Call</span>?
            </h3>
            <p className="text-foreground/60 mb-8 max-w-xl mx-auto">
              Talk directly with Rick about your ideal share, payment plan, and how ownership works.
              No pressure — just real answers about real overwater living.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:rick@linapoint.com?subject=Overwater%20Ownership%20Inquiry"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-maya px-8 py-4 text-base font-semibold text-ocean-deep hover:bg-maya-warm transition-colors"
              >
                <Mail className="h-5 w-5" />
                Email Rick
              </a>
              <a
                href="https://wa.me/5016106547"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-lagoon/30 px-8 py-4 text-base font-semibold text-lagoon hover:bg-lagoon/10 transition-colors"
              >
                <Phone className="h-5 w-5" />
                WhatsApp
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
