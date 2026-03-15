import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIConcierge } from "@/components/AIConcierge";
import { WhatsAppButton } from "@/components/WhatsAppButton";

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
    description: "Fractional overwater living — starting in Belize, expanding worldwide. Glass-floor cabanas from $458/mo.",
    url: "https://overwater.com",
    siteName: "Overwater.com",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Overwater.com — Own the Magic",
    description: "Fractional overwater cabana ownership starting at $458/mo — Belize flagship, expanding worldwide",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <AIConcierge />
        <WhatsAppButton />
      </body>
    </html>
  );
}
