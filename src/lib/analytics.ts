import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

interface EventPayload {
  event: string;
  properties?: Record<string, unknown>;
}

/**
 * Track an analytics event to Supabase.
 * Silently no-ops if Supabase is not configured.
 */
export async function trackEvent({ event, properties }: EventPayload) {
  if (!supabase) return;

  try {
    await supabase.from("events").insert({
      event,
      properties: properties ?? {},
      created_at: new Date().toISOString(),
    });
  } catch {
    // Analytics should never break the app
  }
}
