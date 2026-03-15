"use client";

import { useState } from "react";

const TOPICS = [
  "Fractional Ownership",
  "Lina Point Resort",
  "Investment Inquiry",
  "Partnership / Media",
  "General Question",
] as const;

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<string>(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), topic, message: message.trim() }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-white/5 border border-[#c9a55a]/30 rounded-2xl p-10 text-center space-y-3">
        <div className="text-4xl">⚓</div>
        <h2 className="text-xl font-semibold text-white">Message Sent</h2>
        <p className="text-white/60">We&apos;ll get back to you within 24 hours.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-[#c9a55a] hover:text-[#dab96a] underline underline-offset-2 text-sm"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-5">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-white/70 mb-1.5">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#c9a55a]/50 focus:border-[#c9a55a]/50"
          placeholder="Your name"
          disabled={status === "sending"}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-white/70 mb-1.5">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#c9a55a]/50 focus:border-[#c9a55a]/50"
          placeholder="you@example.com"
          disabled={status === "sending"}
        />
      </div>

      <div>
        <label htmlFor="contact-topic" className="block text-sm font-medium text-white/70 mb-1.5">
          Topic
        </label>
        <select
          id="contact-topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c9a55a]/50 focus:border-[#c9a55a]/50"
          disabled={status === "sending"}
        >
          {TOPICS.map((t) => (
            <option key={t} value={t} className="bg-[#0a0a1a]">
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-white/70 mb-1.5">
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#c9a55a]/50 focus:border-[#c9a55a]/50 resize-none"
          placeholder="Tell us what you're interested in..."
          disabled={status === "sending"}
        />
      </div>

      {status === "error" && (
        <p className="text-red-400 text-sm">Something went wrong. Please try again or email us directly.</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-3 bg-[#c9a55a] hover:bg-[#dab96a] text-[#0a0a1a] font-semibold rounded-lg transition-colors disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
