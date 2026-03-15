"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] bg-[#0a0a1a] text-[#e8e0d0] flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="text-5xl mb-6">⚓</div>
        <h2 className="text-2xl font-bold text-[#c9a55a] mb-3">Something Went Wrong</h2>
        <p className="text-[#8a7a6a] mb-8">
          We hit unexpected waters. Let&apos;s try again.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#c9a55a] text-[#0a0a1a] rounded-lg font-semibold hover:bg-[#d4b36a] transition"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-[#c9a55a44] text-[#c9a55a] rounded-lg font-semibold hover:bg-[#c9a55a11] transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
