import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Overwater",
  description: "Insights on overwater living, fractional ownership, Belize real estate, and luxury Caribbean lifestyle.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
