"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Waves } from "lucide-react";
import { createBrowserSupabaseClient } from "@/lib/supabase";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createBrowserSupabaseClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-ocean-deep">
      <div className="glass-card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Waves className="h-10 w-10 text-lagoon mx-auto mb-4" />
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-2">
            Welcome Back
          </h1>
          <p className="text-foreground/50 text-sm">
            Sign in to your Overwater account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-foreground/40 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-lagoon hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ocean-deep" />}>
      <LoginForm />
    </Suspense>
  );
}
