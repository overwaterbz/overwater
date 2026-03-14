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
    default: "Overwater.com — Own Real Overwater Living in Belize",
    template: "%s | Overwater.com",
  },
  description:
    "Fractional ownership of luxury glass-floor overwater cabanas at Lina Point Resort, San Pedro, Belize. Not dirt lots — real overwater living for the same monthly payment.",
  keywords: [
    "overwater cabana",
    "Belize real estate",
    "fractional ownership",
    "San Pedro Belize",
    "Lina Point",
    "glass floor cabana",
    "overwater living",
    "Caribbean investment",
  ],
  openGraph: {
    title: "Overwater.com — Own the Magic",
    description: "Tired of buying dirt you'll never use? Own real overwater living for the same monthly payment.",
    url: "https://overwater.com",
    siteName: "Overwater.com",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Overwater.com — Own the Magic",
    description: "Fractional overwater cabana ownership in Belize starting at $458/mo",
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
