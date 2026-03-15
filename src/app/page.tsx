"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Sparkles,
  Waves,
  Shield,
  TrendingUp,
  Star,
  ChevronDown,
} from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { ComparisonTable } from "@/components/ComparisonTable";
import { ListingCard } from "@/components/ListingCard";
import { LISTINGS } from "@/lib/data";

const TRUST_POINTS = [
  { icon: Shield, text: "Belize IBC legal ownership" },
  { icon: TrendingUp, text: "Real rental income from day one" },
  { icon: Waves, text: "Glass-floor overwater living" },
  { icon: Star, text: "0% interest financing" },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 ocean-gradient"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.15),transparent_70%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16"
        >
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-maya/10 border border-maya/20 px-4 py-1.5 text-sm text-maya mb-6">
                <Sparkles className="h-4 w-4" />
                Flagship: Lina Point Resort, Belize &middot; Expanding Worldwide
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Tired of buying dirt{" "}
              <span className="text-foreground/40">you&apos;ll never use?</span>
              <br />
              <span className="text-lagoon">Own real overwater living</span>{" "}
              for the same monthly payment.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-foreground/60 leading-relaxed mb-8 max-w-2xl"
            >
              Fractional ownership of luxury glass-floor overwater cabanas — starting at $458/month
              with 0% interest. Real deed. Real income. Real paradise.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-maya px-8 py-4 text-base font-semibold text-ocean-deep hover:bg-maya-warm transition-colors shadow-lg shadow-maya/20"
              >
                <Sparkles className="h-5 w-5" />
                Take the 60-Second Soulful Quiz
              </Link>
              <Link
                href="/own"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-lagoon/30 px-8 py-4 text-base font-semibold text-lagoon hover:bg-lagoon/10 transition-colors"
              >
                View Listings
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="h-6 w-6 text-foreground/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════ TRUST BAR ═══════ */}
      <section className="py-12 border-y border-glass-border bg-ocean-deep/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TRUST_POINTS.map((item, i) => (
              <FadeIn key={item.text} delay={i * 0.1}>
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-lagoon shrink-0" />
                  <span className="text-sm text-foreground/60">{item.text}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ COMPARISON TABLE ═══════ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold mb-4">
                Stop Buying Dirt. <span className="text-lagoon">Start Living Over Water.</span>
              </h2>
              <p className="text-foreground/50 max-w-2xl mx-auto">
                Other Belize developers charge you $500–700/month for a dirt lot with zero infrastructure.
                For the same payment, you own a share of a real overwater cabana — with income.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="glass-card p-6 sm:p-8">
              <ComparisonTable />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ QUIZ CTA ═══════ */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,168,83,0.1),transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="glass-card maya-glow p-10 sm:p-16 text-center max-w-3xl mx-auto">
              <Sparkles className="h-10 w-10 text-maya mx-auto mb-6" />
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold mb-4">
                Discover Your <span className="text-maya">Soulful Escape</span> Blueprint
              </h2>
              <p className="text-foreground/60 mb-8 max-w-xl mx-auto leading-relaxed">
                Take our 60-second quiz to discover your element — Water, Fire, Wind, or Earth — and
                receive a personalized Ownership Blueprint with your ideal cabana, monthly payment, and
                projected returns.
              </p>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 rounded-full bg-maya px-8 py-4 text-base font-semibold text-ocean-deep hover:bg-maya-warm transition-colors shadow-lg shadow-maya/20"
              >
                <Sparkles className="h-5 w-5" />
                Begin Your Journey
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ FEATURED LISTINGS ═══════ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold mb-4">
                Featured <span className="text-lagoon">Magic Shares</span>
              </h2>
              <p className="text-foreground/50 max-w-2xl mx-auto">
                Real overwater cabanas. Real fractional deeds. Real rental income. Choose your piece of
                paradise.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LISTINGS.slice(0, 3).map((listing, i) => (
              <ListingCard key={listing.id} listing={listing} index={i} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/own"
              className="inline-flex items-center gap-2 text-lagoon hover:text-maya transition-colors font-medium"
            >
              View all {LISTINGS.length} listings
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ THE MAGIC IS YOU ═══════ */}
      <section className="py-20 sm:py-28 border-t border-glass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <p className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-maya/90 italic mb-6">
                &ldquo;The Magic is You&rdquo;
              </p>
              <p className="text-foreground/50 leading-relaxed mb-8">
                Overwater living isn&apos;t about the glass floor or the reef below.
                It&apos;s about waking up to a life that reflects who you really are.
                Your element. Your path. Your sanctuary — first over the Caribbean Sea,
                and soon, over oceans and resort pools worldwide.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://magic-is-you.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-maya/30 px-6 py-2.5 text-sm font-medium text-maya hover:bg-maya/10 transition-colors"
                >
                  Explore Magic Is You ↗
                </a>
                <a
                  href="https://lina-point.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-lagoon/30 px-6 py-2.5 text-sm font-medium text-lagoon hover:bg-lagoon/10 transition-colors"
                >
                  Book a Stay at Lina Point ↗
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
