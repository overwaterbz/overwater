"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Copy,
  Check,
  Loader2,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  FileText,
} from "lucide-react";

interface GeneratedContent {
  headline: string;
  body: string;
  cta: string;
  hashtags: string[];
  platform: string;
}

const PLATFORMS = [
  { id: "instagram", label: "Instagram", icon: Instagram },
  { id: "facebook", label: "Facebook", icon: Facebook },
  { id: "twitter", label: "Twitter / X", icon: Twitter },
  { id: "email", label: "Email", icon: Mail },
  { id: "blog", label: "Blog Post", icon: FileText },
] as const;

const TONES = [
  { id: "inspiring", label: "Inspiring" },
  { id: "urgent", label: "Urgent" },
  { id: "educational", label: "Educational" },
  { id: "luxury", label: "Luxury" },
] as const;

const LISTINGS = [
  { id: "", label: "General (no specific listing)" },
  { id: "cabana-4-duplex", label: "Cabana 4 — Overwater Duplex" },
  { id: "cabana-2-1br", label: "Cabana 2 — 1BR Overwater" },
  { id: "lot-3-new-build", label: "Lot 3 — New Build" },
  { id: "lot-6-new-build", label: "Lot 6 — New Build" },
  { id: "lot-7-new-build", label: "Lot 7 — New Build" },
];

export default function MarketingAgentPage() {
  const [apiKey, setApiKey] = useState("");
  const [platform, setPlatform] = useState<string>("instagram");
  const [tone, setTone] = useState<string>("inspiring");
  const [topic, setTopic] = useState("");
  const [listing, setListing] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<GeneratedContent[]>([]);

  async function generate() {
    if (!apiKey.trim()) {
      setError("Enter your Marketing API Key");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/marketing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          platform,
          tone,
          topic: topic.trim() || undefined,
          listing: listing || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      const data = await res.json();
      setResult(data.content);
      setHistory((prev) => [data.content, ...prev].slice(0, 20));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard() {
    if (!result) return;
    const text = `${result.headline}\n\n${result.body}\n\n${result.cta}\n\n${result.hashtags.map((h) => `#${h}`).join(" ")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center py-12">
          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold mb-3">
            <Sparkles className="h-8 w-8 text-maya inline mr-3" />
            Marketing <span className="text-lagoon">AI Agent</span>
          </h1>
          <p className="text-foreground/50 max-w-xl mx-auto">
            Generate on-brand marketing content for any platform using Grok AI,
            powered by the Overwater brand voice.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* ─── Controls ─── */}
          <div className="glass-card p-6 sm:p-8 space-y-6">
            {/* API Key */}
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-2">
                Marketing API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Paste your MARKETING_API_KEY"
                className="w-full rounded-lg bg-ocean-deep/50 border border-glass-border px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-lagoon/50"
              />
            </div>

            {/* Platform */}
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-2">Platform</label>
              <div className="grid grid-cols-5 gap-2">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id)}
                    className={`flex flex-col items-center gap-1 rounded-lg border p-3 text-xs transition-colors ${
                      platform === p.id
                        ? "border-lagoon bg-lagoon/10 text-lagoon"
                        : "border-glass-border text-foreground/40 hover:border-foreground/20"
                    }`}
                  >
                    <p.icon className="h-4 w-4" />
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-2">Tone</label>
              <div className="grid grid-cols-4 gap-2">
                {TONES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTone(t.id)}
                    className={`rounded-lg border px-3 py-2 text-xs transition-colors ${
                      tone === t.id
                        ? "border-maya bg-maya/10 text-maya"
                        : "border-glass-border text-foreground/40 hover:border-foreground/20"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic */}
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-2">
                Topic / Angle <span className="text-foreground/30">(optional)</span>
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder='e.g. "Summer promo" or "Why overwater beats dirt lots"'
                className="w-full rounded-lg bg-ocean-deep/50 border border-glass-border px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-lagoon/50"
              />
            </div>

            {/* Listing focus */}
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-2">
                Focus Listing <span className="text-foreground/30">(optional)</span>
              </label>
              <select
                value={listing}
                onChange={(e) => setListing(e.target.value)}
                className="w-full rounded-lg bg-ocean-deep/50 border border-glass-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-lagoon/50"
              >
                {LISTINGS.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Generate button */}
            <button
              onClick={generate}
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-maya px-8 py-3 text-base font-semibold text-ocean-deep hover:bg-maya-warm transition-colors disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating…
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate Content
                </>
              )}
            </button>

            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}
          </div>

          {/* ─── Output ─── */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {result && (
                <motion.div
                  key={result.headline}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="glass-card p-6 sm:p-8"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-lagoon font-semibold uppercase tracking-wider">
                      {result.platform}
                    </span>
                    <button
                      onClick={copyToClipboard}
                      className="inline-flex items-center gap-1.5 text-xs text-foreground/40 hover:text-maya transition-colors"
                    >
                      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      {copied ? "Copied!" : "Copy all"}
                    </button>
                  </div>

                  <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-maya mb-3">
                    {result.headline}
                  </h2>
                  <p className="text-foreground/70 leading-relaxed mb-4 whitespace-pre-wrap">
                    {result.body}
                  </p>
                  <p className="text-sm text-lagoon font-medium mb-4">
                    {result.cta}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.hashtags.map((h) => (
                      <span
                        key={h}
                        className="text-xs rounded-full bg-lagoon/10 border border-lagoon/20 px-3 py-1 text-lagoon"
                      >
                        #{h}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* History */}
            {history.length > 1 && (
              <div className="glass-card p-6">
                <h3 className="text-sm font-semibold text-foreground/50 mb-3">
                  Recent Generations ({history.length})
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {history.slice(1).map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setResult(item)}
                      className="w-full text-left rounded-lg border border-glass-border p-3 hover:border-lagoon/30 transition-colors"
                    >
                      <span className="text-xs text-lagoon">{item.platform}</span>
                      <p className="text-sm text-foreground/70 truncate">{item.headline}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
