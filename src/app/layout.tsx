import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import "@/lib/validateEnv";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UtmCapture } from "@/components/UtmCapture";
import { ClientProviders } from "@/components/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Overwater.com — Fractional Overwater Living Worldwide",
    template: "%s | Overwater.com",
  },
  description:
    "Fractional ownership of luxury glass-floor overwater cabanas — starting with Lina Point Resort in Belize and expanding worldwide. Not dirt lots — real overwater living.",
  keywords: [
    "overwater cabana",
    "fractional ownership",
    "overwater living",
    "Belize real estate",
    "San Pedro Belize",
    "Lina Point",
    "glass floor cabana",
    "Caribbean investment",
    "overwater resort",
    "luxury fractional",
  ],
  openGraph: {
    title: "Overwater.com — Own the Magic",
    description:
      "Fractional overwater living — starting in Belize, expanding worldwide. Glass-floor cabanas from $458/mo.",
    url: "https://overwater.com",
    siteName: "Overwater.com",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://overwater.com/api/og",
        width: 1200,
        height: 630,
        alt: "Overwater.com — Fractional Overwater Living",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Overwater.com — Own the Magic",
    description:
      "Fractional overwater cabana ownership starting at $458/mo — Belize flagship, expanding worldwide",
    images: ["https://overwater.com/api/og"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Overwater.com",
  url: "https://overwater.com",
  description:
    "Fractional ownership of luxury glass-floor overwater cabanas — starting with Lina Point Resort in Belize and expanding worldwide.",
  areaServed: {
    "@type": "Place",
    name: "Caribbean",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Pedro",
    addressRegion: "Ambergris Caye",
    addressCountry: "BZ",
  },
  sameAs: [
    "https://www.instagram.com/overwater.com_",
    "https://www.tiktok.com/@overwater.com",
  ],
  makesOffer: {
    "@type": "Offer",
    name: "Fractional Overwater Cabana Ownership",
    description: "Own a share of a luxury overwater cabana starting at $458/mo",
    priceCurrency: "USD",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a1a" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:bg-[#c9a55a] focus:text-[#0a0a1a] focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:ring-2 focus:ring-[#c9a55a]"
        >
          Skip to main content
        </a>
        <Header />
        <UtmCapture />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
        <ClientProviders />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
