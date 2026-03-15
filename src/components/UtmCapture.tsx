"use client";

import { useEffect } from "react";
import { captureUtmParams } from "@/lib/analytics";

export function UtmCapture() {
  useEffect(() => {
    captureUtmParams();
  }, []);
  return null;
}
