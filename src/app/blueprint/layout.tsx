import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Soulful Escape Blueprint",
  description: "The full interactive Blueprint experience — discover Elemental Living, Soul Paths, and A Day in Your Sanctuary.",
};

export default function BlueprintLayout({ children }: { children: React.ReactNode }) {
  return children;
}
