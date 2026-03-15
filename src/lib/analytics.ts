import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sid = sessionStorage.getItem("ow_session_id");
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem("ow_session_id", sid);
  }
  return sid;
}

interface EventPayload {
  event: string;
  properties?: Record<string, unknown>;
}

export async function trackEvent({ event, properties }: EventPayload) {
  if (!supabase) return;

  try {
    await supabase.from("events").insert({
      event,
      properties: properties ?? {},
      source: "overwater",
      session_id: getSessionId(),
      page_url: typeof window !== "undefined" ? window.location.pathname : null,
      created_at: new Date().toISOString(),
    });
  } catch {
    // Analytics should never break the app
  }
}

export function captureUtmParams() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  const utm: Record<string, string> = {};
  for (const key of utmKeys) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }
  if (Object.keys(utm).length > 0) {
    sessionStorage.setItem("ow_utm", JSON.stringify(utm));
    trackEvent({ event: "utm_captured", properties: utm });
  }
}

export function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem("ow_utm") || "{}");
  } catch {
    return {};
  }
}
