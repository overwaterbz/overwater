import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Overwater team. Ask about fractional ownership, Lina Point Resort, or anything else.",
  openGraph: {
    title: "Contact Us | Overwater.com",
    description:
      "Reach out about fractional overwater cabana ownership, Lina Point Resort, or partnership opportunities.",
    url: "https://overwater.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] py-16 px-4">
      <div className="max-w-2xl mx-auto space-y-10">
        <header className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-[family-name:var(--font-playfair)]">
            Get in Touch
          </h1>
          <p className="text-white/60 text-lg">
            Questions about ownership, Lina Point, or partnerships? We&apos;d love to hear from you.
          </p>
        </header>

        <ContactForm />

        <div className="text-center space-y-2 text-white/50 text-sm">
          <p>
            Or email us directly at{" "}
            <a
              href="mailto:rick@linapoint.com"
              className="text-[#c9a55a] hover:text-[#dab96a] underline underline-offset-2"
            >
              rick@linapoint.com
            </a>
          </p>
          <p>
            WhatsApp:{" "}
            <a
              href="https://wa.me/5016106547"
              className="text-[#c9a55a] hover:text-[#dab96a] underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              +501-610-6547
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
