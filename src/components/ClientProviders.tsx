"use client";

import dynamic from "next/dynamic";

const AIConcierge = dynamic(
  () => import("@/components/AIConcierge").then((m) => m.AIConcierge),
  { ssr: false },
);
const WhatsAppButton = dynamic(
  () => import("@/components/WhatsAppButton").then((m) => m.WhatsAppButton),
  { ssr: false },
);
const ExitIntentPopup = dynamic(
  () => import("@/components/ExitIntentPopup").then((m) => m.ExitIntentPopup),
  { ssr: false },
);

export function ClientProviders() {
  return (
    <>
      <AIConcierge />
      <WhatsAppButton />
      <ExitIntentPopup />
    </>
  );
}
