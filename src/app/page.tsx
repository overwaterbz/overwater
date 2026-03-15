"use client";

import Link from "next/link";
import Image from "next/image";
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
  Droplets,
  Flame,
  Wind,
  Leaf,
  Globe,
  Home,
  KeyRound,
  Building2,
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
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="https://linapoint.com/wp-content/uploads/2022/08/drone-2-scaled.jpg"
            alt="Aerial view of Lina Point Resort overwater cabanas in Belize"
            fill
            priority
            className="object-cover scale-110 animate-[kenburns_25s_ease-in-out_infinite_alternate]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/70 via-ocean-deep/40 to-ocean-deep" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </motion.div>

        {/* Water ripple effect */}
        <div className="absolute bottom-1/4 left-1/3 pointer-events-none">
          <div className="water-ripple" />
          <div className="water-ripple" />
          <div className="water-ripple" />
        </div>

        {/* Floating element icons */}
        <div className="absolute top-1/4 right-12 pointer-events-none hidden lg:block">
          <motion.div className="animate-float opacity-20" aria-hidden>
            <Droplets className="h-8 w-8 text-lagoon" />
          </motion.div>
        </div>
        <div className="absolute top-1/3 right-32 pointer-events-none hidden lg:block">
          <motion.div className="animate-float-delayed opacity-15" aria-hidden>
            <Wind className="h-6 w-6 text-reef" />
          </motion.div>
        </div>
        <div className="absolute bottom-1/3 right-20 pointer-events-none hidden lg:block">
          <motion.div className="animate-float-slow opacity-15" aria-hidden>
            <Flame className="h-7 w-7 text-coral" />
          </motion.div>
        </div>

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
              <span className="text-lagoon">Own real overwater living</span> for
              the same monthly payment.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-foreground/60 leading-relaxed mb-8 max-w-2xl"
            >
              Fractional ownership of luxury glass-floor overwater cabanas —
              starting at $458/month with 0% interest. Real deed. Real income.
              Real paradise.
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
                  <span className="text-sm text-foreground/60">
                    {item.text}
                  </span>
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
                Stop Buying Dirt.{" "}
                <span className="text-lagoon">Start Living Over Water.</span>
              </h2>
              <p className="text-foreground/50 max-w-2xl mx-auto">
                Other Belize developers charge you $500–700/month for a dirt lot
                with zero infrastructure. For the same payment, you own a share
                of a real overwater cabana — with income.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="glass-card-elevated p-6 sm:p-8">
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
            <div className="glass-card-elevated maya-border maya-glow p-10 sm:p-16 text-center max-w-3xl mx-auto">
              <div className="relative">
                <Sparkles className="h-10 w-10 text-maya mx-auto mb-6" />
                <div
                  className="sparkle-dot"
                  style={{ top: -8, left: "45%", animationDelay: "0s" }}
                />
                <div
                  className="sparkle-dot"
                  style={{ top: -4, left: "55%", animationDelay: "1s" }}
                />
                <div
                  className="sparkle-dot"
                  style={{ top: 0, left: "50%", animationDelay: "2s" }}
                />
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold mb-4">
                Discover Your <span className="text-maya">Soulful Escape</span>{" "}
                Blueprint
              </h2>
              <p className="text-foreground/60 mb-4 max-w-xl mx-auto leading-relaxed">
                Take our 60-second quiz to discover your element — Water, Fire,
                Wind, or Earth — and receive a personalized Ownership Blueprint
                with your ideal cabana, monthly payment, and projected returns.
              </p>
              <p className="text-sm text-maya/70 italic mb-8 max-w-lg mx-auto font-[family-name:var(--font-display)]">
                For curious souls and smart investors tired of empty land
                schemes — this is your portal.
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
                Real overwater cabanas. Real fractional deeds. Real rental
                income. Choose your piece of paradise.
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

      {/* ═══════ THE MAGIC IS YOU — ECOSYSTEM PORTAL ═══════ */}
      <section className="py-20 sm:py-28 border-t border-glass-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.06),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="font-[family-name:var(--font-display)] text-3xl sm:text-5xl font-bold text-maya/90 italic mb-6">
                &ldquo;The Magic is You&rdquo;
              </p>
              <p className="text-foreground/50 leading-relaxed mb-4 text-lg">
                Overwater living isn&apos;t about the glass floor or the reef
                below. It&apos;s about waking up to a life that reflects who you
                really are.
              </p>
              <p className="text-foreground/40 leading-relaxed">
                For curious souls and smart investors tired of empty land
                schemes — overwater.com is the Magic Portal to the Overwater
                lifestyle. Own fractional shares in soul-grounded sanctuaries,
                first over the Caribbean Sea, and soon, over oceans and resort
                pools worldwide.
              </p>
            </div>
          </FadeIn>

          {/* Ecosystem Portal Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <FadeIn delay={0.1}>
              <div className="glass-card-elevated maya-border p-6 text-center group">
                <div className="w-14 h-14 rounded-full bg-maya/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-maya/20 transition-colors">
                  <Globe className="h-7 w-7 text-maya" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-maya mb-2">
                  Overwater.com
                </h3>
                <p className="text-sm text-foreground/50 mb-4">
                  The Magic Portal — fractional ownership of overwater
                  sanctuaries worldwide.
                </p>
                <span className="text-xs text-lagoon">You are here</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <a
                href="https://magic-is-you.vercel.app?utm_source=overwater&utm_medium=portal&utm_campaign=ecosystem"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card-elevated maya-border p-6 text-center group block hover:scale-[1.02] transition-transform"
              >
                <div className="w-14 h-14 rounded-full bg-[#7b2d8e]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#7b2d8e]/20 transition-colors">
                  <Sparkles className="h-7 w-7 text-[#d4a853]" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#d4a853] mb-2">
                  The Magic is You
                </h3>
                <p className="text-sm text-foreground/50 mb-4">
                  Your Maya Cosmic Blueprint — discover your Day Sign, Spirit
                  Animal &amp; soul purpose.
                </p>
                <span className="text-xs text-foreground/30 group-hover:text-maya transition-colors">
                  Explore ↗
                </span>
              </a>
            </FadeIn>

            <FadeIn delay={0.3}>
              <a
                href="https://lina-point.vercel.app?utm_source=overwater&utm_medium=portal&utm_campaign=ecosystem"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card-elevated maya-border p-6 text-center group block hover:scale-[1.02] transition-transform"
              >
                <div className="w-14 h-14 rounded-full bg-lagoon/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-lagoon/20 transition-colors">
                  <Waves className="h-7 w-7 text-lagoon" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-lagoon mb-2">
                  Lina Point Resort
                </h3>
                <p className="text-sm text-foreground/50 mb-4">
                  The flagship — overwater cabanas, glass floors &amp; Caribbean
                  luxury in Belize.
                </p>
                <span className="text-xs text-foreground/30 group-hover:text-lagoon transition-colors">
                  Book a Stay ↗
                </span>
              </a>
            </FadeIn>

            <FadeIn delay={0.4}>
              <a
                href="https://kylapoint.com?utm_source=overwater&utm_medium=portal&utm_campaign=ecosystem"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card-elevated maya-border p-6 text-center group block hover:scale-[1.02] transition-transform"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-500/20 transition-colors">
                  <Home className="h-7 w-7 text-emerald-400" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-emerald-400 mb-2">
                  Kyla Point
                </h3>
                <p className="text-sm text-foreground/50 mb-4">
                  Soulful mainland living — homes, lots &amp; resort amenities
                  in Belize.
                </p>
                <span className="text-xs text-foreground/30 group-hover:text-emerald-400 transition-colors">
                  Explore ↗
                </span>
              </a>
            </FadeIn>

            <FadeIn delay={0.5}>
              <a
                href="https://pointrealtor.com?utm_source=overwater&utm_medium=portal&utm_campaign=ecosystem"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card-elevated maya-border p-6 text-center group block hover:scale-[1.02] transition-transform"
              >
                <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500/20 transition-colors">
                  <KeyRound className="h-7 w-7 text-amber-400" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-amber-400 mb-2">
                  Point Realtor
                </h3>
                <p className="text-sm text-foreground/50 mb-4">
                  Licensed brokerage — Caribbean &amp; Florida real estate
                  sales.
                </p>
                <span className="text-xs text-foreground/30 group-hover:text-amber-400 transition-colors">
                  Browse Listings ↗
                </span>
              </a>
            </FadeIn>

            <FadeIn delay={0.6}>
              <a
                href="https://pointenterprise.com?utm_source=overwater&utm_medium=portal&utm_campaign=ecosystem"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card-elevated maya-border p-6 text-center group block hover:scale-[1.02] transition-transform"
              >
                <div className="w-14 h-14 rounded-full bg-maya/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-maya/20 transition-colors">
                  <Building2 className="h-7 w-7 text-maya" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-maya mb-2">
                  Point Enterprise
                </h3>
                <p className="text-sm text-foreground/50 mb-4">
                  The family behind the magic — 20+ years of soulful companies.
                </p>
                <span className="text-xs text-foreground/30 group-hover:text-maya transition-colors">
                  Learn More ↗
                </span>
              </a>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
