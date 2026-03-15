import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-[#e8e0d0] flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="text-6xl mb-6">🌊</div>
        <h2 className="text-3xl font-bold text-[#c9a55a] mb-3">Lost at Sea</h2>
        <p className="text-[#8a7a6a] mb-8">
          This page has drifted beyond the reef. Let&apos;s navigate you back.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/"
            className="px-6 py-3 bg-[#c9a55a] text-[#0a0a1a] rounded-lg font-semibold hover:bg-[#d4b36a] transition"
          >
            Return Home
          </Link>
          <Link
            href="/own"
            className="px-6 py-3 border border-[#c9a55a44] text-[#c9a55a] rounded-lg font-semibold hover:bg-[#c9a55a11] transition"
          >
            View Listings
          </Link>
          <Link
            href="/quiz"
            className="px-6 py-3 border border-[#c9a55a44] text-[#c9a55a] rounded-lg font-semibold hover:bg-[#c9a55a11] transition"
          >
            Take the Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}
