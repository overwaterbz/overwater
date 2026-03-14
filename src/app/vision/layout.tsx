import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Vision",
  description: "The Lina Point story — overwater glass-floor cabanas, Belize IBC ownership, and the Magic is You philosophy.",
};

export default function VisionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
