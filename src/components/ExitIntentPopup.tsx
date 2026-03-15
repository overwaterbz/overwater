"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const trigger = useCallback(() => {
    if (sessionStorage.getItem("ow-exit-shown")) return;
    sessionStorage.setItem("ow-exit-shown", "1");
    setShow(true);
  }, []);

  useEffect(() => {
    // Desktop only — detect mouse leaving viewport top
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [trigger]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease]"
      onClick={() => setShow(false)}
    >
      <div
        className="relative bg-ocean-deep border border-white/10 rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 text-white/50 hover:text-white text-xl leading-none"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="text-5xl mb-4">🌊</div>
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-white mb-2">
          Wait — Before You Go
        </h2>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          Discover which overwater element matches your soul. Take our 60-second
          quiz and unlock your personalized Belize blueprint.
        </p>

        <button
          onClick={() => {
            setShow(false);
            router.push("/quiz");
          }}
          className="w-full bg-gradient-to-r from-maya to-ocean-light text-white font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition mb-3"
        >
          Take the Free Quiz →
        </button>
        <button
          onClick={() => setShow(false)}
          className="text-xs text-gray-500 hover:text-gray-300 transition"
        >
          No thanks, I&apos;ll keep browsing
        </button>
      </div>
    </div>
  );
}
