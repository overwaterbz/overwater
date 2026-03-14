import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Own the Magic — Fractional Overwater Ownership",
  description: "Browse and calculate your fractional share of luxury overwater cabanas in San Pedro, Belize.",
};

export default function OwnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
