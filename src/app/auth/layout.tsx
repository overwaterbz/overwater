import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account | Overwater",
  description: "Sign in or create your Overwater account to access your ownership dashboard and Soulful Escape Blueprint.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children;
}
