"use client";

import { useState } from "react";

export function NewsletterSignup({ source = "overwater_footer" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm text-reef">✓ You&apos;re in! Check your inbox soon.</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 rounded-full bg-glass border border-glass-border px-4 py-2 text-sm focus:outline-none focus:border-lagoon/50 placeholder:text-foreground/30 min-w-0"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-maya px-4 py-2 text-sm font-semibold text-ocean-deep hover:bg-maya-warm transition-colors disabled:opacity-50 whitespace-nowrap"
      >
        {status === "loading" ? "..." : "Subscribe"}
      </button>
    </form>
  );
}
