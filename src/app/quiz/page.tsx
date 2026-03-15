"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import { QUIZ_QUESTIONS, ELEMENTS, LISTINGS } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

type Answers = Record<string, string>;

function tallyElement(answers: Answers): string {
  const counts: Record<string, number> = { Water: 0, Fire: 0, Wind: 0, Earth: 0 };
  for (const [qId, value] of Object.entries(answers)) {
    const question = QUIZ_QUESTIONS.find((q) => q.id === qId);
    if (!question) continue;
    const option = question.options.find((o) => o.value === value);
    if (option?.element) counts[option.element]++;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

function getRecommendedListing(answers: Answers) {
  const budget = answers.q6;
  if (budget === "under-500") return LISTINGS.find((l) => l.monthlyPayment <= 500) || LISTINGS[1];
  if (budget === "over-700") return LISTINGS.find((l) => l.type === "lot") || LISTINGS[2];
  return LISTINGS[0]; // Cabana 4 duplex for sweet spot
}

function getSoulPath(answers: Answers) {
  const val = answers.q5;
  if (val === "resident") return { name: "Soulful Resident", desc: "You want a second home you actually use and love. Your share gives you dedicated weeks in paradise plus rental income when you're away." };
  if (val === "investor") return { name: "Conscious Investor", desc: "Smart passive income from the Caribbean. Your share earns rental revenue managed for you while the asset appreciates." };
  return { name: "Hybrid Creator", desc: "The best of both worlds — enjoy your overwater time AND earn from it. Use it when you want, rent it when you don't." };
}

export default function QuizPage() {
  const [step, setStep] = useState(0); // 0 = intro, 1-6 = questions, 7 = results
  const [answers, setAnswers] = useState<Answers>({});

  const isIntro = step === 0;
  const isResults = step === QUIZ_QUESTIONS.length + 1;
  const currentQ = !isIntro && !isResults ? QUIZ_QUESTIONS[step - 1] : null;

  function selectAnswer(value: string) {
    if (!currentQ) return;
    setAnswers((prev) => ({ ...prev, [currentQ.id]: value }));
    setTimeout(() => setStep((s) => s + 1), 300);
  }

  const element = isResults ? ELEMENTS[tallyElement(answers)] : null;
  const listing = isResults ? getRecommendedListing(answers) : null;
  const soulPath = isResults ? getSoulPath(answers) : null;

  useEffect(() => {
    if (isResults && element && listing && soulPath) {
      trackEvent({
        event: "quiz_completed",
        properties: { element: element.name, listing: listing.id, soulPath: soulPath.name },
      });
    }
  }, [isResults, element, listing, soulPath]);

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">

        {/* Progress bar */}
        {!isIntro && (
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs text-foreground/40 mb-2">
              <span>
                {isResults ? "Your Blueprint" : `Question ${step} of ${QUIZ_QUESTIONS.length}`}
              </span>
              <span>{Math.round(((isResults ? QUIZ_QUESTIONS.length : step) / QUIZ_QUESTIONS.length) * 100)}%</span>
            </div>
            <div className="h-1 rounded-full bg-glass">
              <motion.div
                className="h-full rounded-full bg-maya"
                animate={{ width: `${((isResults ? QUIZ_QUESTIONS.length : step) / QUIZ_QUESTIONS.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* ═══════ INTRO ═══════ */}
          {isIntro && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16"
            >
              <Sparkles className="h-12 w-12 text-maya mx-auto mb-6" />
              <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold mb-4">
                Your Soulful Escape Blueprint
              </h1>
              <p className="text-foreground/60 leading-relaxed mb-4 max-w-lg mx-auto">
                Answer 6 quick questions and we&apos;ll match you with your element — Water, Fire,
                Wind, or Earth — and create a personalized ownership blueprint just for you.
              </p>
              <p className="text-sm text-foreground/40 mb-8">Takes about 60 seconds</p>
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 rounded-full bg-maya px-8 py-4 text-base font-semibold text-ocean-deep hover:bg-maya-warm transition-colors shadow-lg shadow-maya/20"
              >
                Begin
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>
          )}

          {/* ═══════ QUESTIONS ═══════ */}
          {currentQ && (
            <motion.div
              key={currentQ.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="py-8"
            >
              <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold mb-2">
                {currentQ.question}
              </h2>
              {currentQ.subtitle && (
                <p className="text-foreground/50 text-sm mb-8">{currentQ.subtitle}</p>
              )}
              {!currentQ.subtitle && <div className="mb-8" />}

              <div className="space-y-3">
                {currentQ.options.map((opt) => {
                  const selected = answers[currentQ.id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => selectAnswer(opt.value)}
                      className={`w-full text-left rounded-xl p-5 transition-all border ${
                        selected
                          ? "border-maya bg-maya/10 text-foreground"
                          : "border-glass-border bg-glass hover:border-lagoon/30 hover:bg-lagoon/5"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm sm:text-base">{opt.label}</span>
                        <ChevronRight className="h-4 w-4 text-foreground/30 shrink-0" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {step > 1 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="mt-6 flex items-center gap-1 text-sm text-foreground/40 hover:text-foreground/70 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              )}
            </motion.div>
          )}

          {/* ═══════ RESULTS ═══════ */}
          {isResults && element && listing && soulPath && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="py-8"
            >
              {/* Element reveal */}
              <div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="text-6xl mb-4"
                >
                  {element.icon}
                </motion.div>
                <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold mb-2">
                  Your Element: <span style={{ color: element.color }}>{element.name}</span>
                </h2>
                <p className="text-foreground/50 italic">{element.tagline}</p>
              </div>

              <div className="glass-card p-6 mb-6">
                <p className="text-foreground/70 leading-relaxed">{element.description}</p>
              </div>

              {/* Soul Path */}
              <div className="glass-card p-6 mb-6" style={{ borderColor: `${element.color}30` }}>
                <h3 className="font-semibold text-maya mb-2">Your Soul Path: {soulPath.name}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{soulPath.desc}</p>
              </div>

              {/* Recommended Listing */}
              <div className="glass-card p-6 mb-8">
                <h3 className="font-semibold text-lagoon mb-4">Your Recommended Magic Share</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-1/3 h-32 rounded-lg bg-gradient-to-br from-ocean-mid to-ocean-surface flex items-center justify-center">
                    <span className="text-3xl">🏝️</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-[family-name:var(--font-display)] text-lg font-semibold mb-2">
                      {listing.name}
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-foreground/40">Monthly</span>
                        <p className="font-bold text-maya">${listing.monthlyPayment}/mo</p>
                      </div>
                      <div>
                        <span className="text-foreground/40">Down Payment</span>
                        <p className="font-bold">${listing.downPayment.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-foreground/40">Annual Income</span>
                        <p className="font-bold text-reef">
                          ${listing.netIncomeMin.toLocaleString()}–${listing.netIncomeMax.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-foreground/40">Financing</span>
                        <p className="font-bold">0% Interest</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/own#${listing.slug}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-maya px-6 py-4 text-sm font-semibold text-ocean-deep hover:bg-maya-warm transition-colors"
                >
                  View This Listing
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="mailto:rick@linapoint.com?subject=Soulful%20Alignment%20Call"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-lagoon/30 px-6 py-4 text-sm font-semibold text-lagoon hover:bg-lagoon/10 transition-colors"
                >
                  Book a Call with Rick
                </a>
              </div>

              {/* Retake */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => { setStep(0); setAnswers({}); }}
                  className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors"
                >
                  Retake Quiz
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
