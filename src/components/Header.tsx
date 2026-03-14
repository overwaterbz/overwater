"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Waves } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/own", label: "Own the Magic" },
  { href: "/quiz", label: "Soulful Quiz" },
  { href: "/blueprint", label: "The Blueprint" },
  { href: "/vision", label: "Vision" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-glass-border backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Waves className="h-7 w-7 text-lagoon group-hover:text-maya transition-colors" />
            <span className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-wide">
              overwater<span className="text-maya">.com</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/70 hover:text-lagoon transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/quiz"
              className="rounded-full bg-maya px-5 py-2 text-sm font-semibold text-ocean-deep hover:bg-maya-warm transition-colors"
            >
              Take the Quiz
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-foreground/70 hover:text-lagoon"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-t border-glass-border"
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-foreground/70 hover:bg-glass hover:text-lagoon transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/quiz"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-maya px-5 py-3 text-center text-sm font-semibold text-ocean-deep hover:bg-maya-warm transition-colors"
              >
                Take the Soulful Quiz
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
