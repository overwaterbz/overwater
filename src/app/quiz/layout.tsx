import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soulful Escape Quiz",
  description: "Discover your element and get a personalized Ownership Blueprint for overwater living in Belize.",
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
