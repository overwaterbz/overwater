"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";
import { ELEMENTS } from "@/lib/data";
import { Sparkles, ArrowRight, Waves, Flame, Wind, Leaf } from "lucide-react";

const ELEMENT_ICONS = { Water: Waves, Fire: Flame, Wind: Wind, Earth: Leaf };

const DAY_TIMELINE = [
  { time: "6:00 AM", title: "Sunrise Through Glass", desc: "Wake to Caribbean light filtering through your glass floor. Watch a stingray glide beneath your bed." },
  { time: "7:30 AM", title: "Rooftop Coffee", desc: "Fresh Belizean coffee on your private rooftop terrace. The reef stretches to the horizon." },
  { time: "9:00 AM", title: "Reef Snorkel", desc: "Step off your dock into the second-largest barrier reef on Earth. No boat needed." },
  { time: "11:00 AM", title: "Island Explore", desc: "Golf cart into town for local ceviche, or kayak to a secret sandbar." },
  { time: "1:00 PM", title: "Hammock Hour", desc: "Your over-the-water hammock, a good book, and the sound of gentle waves." },
  { time: "4:00 PM", title: "Sunset Ritual", desc: "The lagoon turns gold. You realize this isn't vacation — this is your life." },
  { time: "7:00 PM", title: "Fire & Stars", desc: "Dinner on the dock. The Milky Way emerges. No light pollution. Just you and infinity." },
];

export default function BlueprintPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Cover */}
        <FadeIn>
          <div className="text-center py-20 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,83,0.08),transparent_60%)]" />
            <Sparkles className="h-12 w-12 text-maya mx-auto mb-6 relative z-10" />
            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold mb-4 relative z-10">
              The Soulful Escape Blueprint
            </h1>
            <p className="text-xl text-foreground/60 font-[family-name:var(--font-display)] italic relative z-10">
              Living Over Water, Grounded by Earth
            </p>
            <p className="mt-4 text-sm text-foreground/40 relative z-10">
              Lina Point Overwater Resort — San Pedro, Ambergris Caye, Belize
            </p>
          </div>
        </FadeIn>

        {/* ─── Page 1: The Invitation ─── */}
        <FadeIn>
          <section className="glass-card p-8 sm:p-12 mb-8">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-maya mb-6">
              The Invitation
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                Close your eyes. Imagine waking up to the sound of gentle Caribbean waves — not from
                a hotel balcony, but from <strong className="text-foreground">your own overwater sanctuary</strong>.
              </p>
              <p>
                Through the glass floor beneath your bed, you watch a sea turtle glide over coral.
                Sunlight dances on the reef below. The morning breeze carries salt and possibility.
              </p>
              <p>
                This is not a vacation. This is <strong className="text-foreground">your life, redesigned</strong>.
                A fractional ownership of paradise that earns while you dream.
              </p>
              <p className="text-maya italic font-[family-name:var(--font-display)]">
                &ldquo;What if paradise wasn&apos;t a place you visited, but a place you owned?&rdquo;
              </p>
            </div>
          </section>
        </FadeIn>

        {/* ─── Page 2-3: Elemental Living ─── */}
        <FadeIn>
          <section className="mb-8">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-center mb-8">
              Elemental Living
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {Object.values(ELEMENTS).map((el) => {
                const Icon = ELEMENT_ICONS[el.name as keyof typeof ELEMENT_ICONS];
                return (
                  <motion.div
                    key={el.name}
                    whileHover={{ scale: 1.02 }}
                    className="glass-card p-6 border-t-2"
                    style={{ borderTopColor: el.color }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${el.color}20` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: el.color }} />
                      </div>
                      <div>
                        <h3 className="font-semibold" style={{ color: el.color }}>{el.name}</h3>
                        <p className="text-xs text-foreground/40">{el.tagline}</p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/60 leading-relaxed">{el.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>
        </FadeIn>

        {/* ─── Page 4: Three Soul Paths ─── */}
        <FadeIn>
          <section className="glass-card p-8 sm:p-12 mb-8">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-maya mb-6">
              Three Soul Paths
            </h2>
            <div className="space-y-8">
              {[
                {
                  path: "The Soulful Resident",
                  desc: "You want a second home you actually live in. Your weeks in paradise are sacred. The rest of the year, your share earns rental income — but the real value is the life you build here.",
                  icon: "🏡",
                },
                {
                  path: "The Conscious Investor",
                  desc: "You see the numbers: $1,600–$7,500 annual rental income per share, 0% financing, appreciating Caribbean waterfront. Smart money in paradise.",
                  icon: "📈",
                },
                {
                  path: "The Hybrid Creator",
                  desc: "You want both. Use your cabana when inspiration strikes. Rent it when you're building empires elsewhere. Your overwater home reflects your creative freedom.",
                  icon: "✨",
                },
              ].map((item) => (
                <div key={item.path} className="flex gap-4">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold mb-1">{item.path}</h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* ─── Page 5: A Day in Your Sanctuary ─── */}
        <FadeIn>
          <section className="mb-8">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-center mb-8">
              A Day in Your Sanctuary
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-glass-border sm:left-20" />
              <div className="space-y-6">
                {DAY_TIMELINE.map((item, i) => (
                  <FadeIn key={item.time} delay={i * 0.08}>
                    <div className="flex gap-4 sm:gap-8 items-start relative">
                      <div className="w-8 sm:w-16 text-right shrink-0">
                        <span className="text-xs text-maya font-mono">{item.time}</span>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-lagoon mt-2 shrink-0 relative z-10" />
                      <div>
                        <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                        <p className="text-sm text-foreground/50">{item.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ─── Page 8: The Magic Is You (Closing) ─── */}
        <FadeIn>
          <section className="glass-card maya-glow p-10 sm:p-16 text-center mb-8">
            <p className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-maya/90 italic mb-6">
              &ldquo;The Magic is You&rdquo;
            </p>
            <div className="space-y-4 text-foreground/60 leading-relaxed max-w-2xl mx-auto">
              <p>
                The glass floor is beautiful. The reef is breathtaking. The sunsets are legendary.
              </p>
              <p>
                But the real magic? <strong className="text-foreground">It&apos;s the person waking up above the water.</strong>
              </p>
              <p>
                It&apos;s the life you chose. The sanctuary you built. The income that flows while you sleep.
                The legacy that outlives the moment.
              </p>
              <p className="text-maya font-semibold">
                This is overwater living. This is your Soulful Escape. This is Lina Point.
              </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-maya px-8 py-4 text-base font-semibold text-ocean-deep hover:bg-maya-warm transition-colors"
              >
                <Sparkles className="h-5 w-5" />
                Take the Soulful Quiz
              </Link>
              <Link
                href="/own"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-lagoon/30 px-8 py-4 text-base font-semibold text-lagoon hover:bg-lagoon/10 transition-colors"
              >
                View Listings
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
