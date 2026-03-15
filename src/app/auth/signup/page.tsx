"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Waves } from "lucide-react";
import { createBrowserSupabaseClient } from "@/lib/supabase";
import { trackEvent } from "@/lib/analytics";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createBrowserSupabaseClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    trackEvent({ event: "signup_completed", properties: { source: "overwater" } });
    router.push("/");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-ocean-deep">
      <div className="glass-card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Waves className="h-10 w-10 text-lagoon mx-auto mb-4" />
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-2">
            Join Overwater
          </h1>
          <p className="text-foreground/50 text-sm">
            Create your account to save your quiz results & track your journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm text-foreground/60 mb-1">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 bg-glass border border-glass-border rounded-lg text-foreground focus:border-lagoon/50 focus:outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-foreground/60 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-glass border border-glass-border rounded-lg text-foreground focus:border-lagoon/50 focus:outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-foreground/60 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-glass border border-glass-border rounded-lg text-foreground focus:border-lagoon/50 focus:outline-none transition"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-maya px-5 py-3 text-sm font-semibold text-ocean-deep hover:bg-maya-warm transition-colors disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-foreground/40 mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-lagoon hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
