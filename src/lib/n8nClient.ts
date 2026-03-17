/**
 * n8n Client — outbound triggers from Overwater → n8n
 *
 * Set these env vars:
 *   N8N_WEBHOOK_URL    = your n8n webhook trigger URL
 *   N8N_WEBHOOK_SECRET = shared secret for HMAC auth
 */

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || "";
const N8N_SECRET =
  process.env.N8N_WEBHOOK_SECRET || process.env.N8N_SECRET || "";

export type N8nWorkflow =
  | "new-inquiry" // Ownership inquiry submitted
  | "new-lead" // Newsletter signup or contact form
  | "quiz-completed" // Element quiz completed
  | "rate-alert" // Pricing change detected
  | "daily-digest" // Daily admin summary
  | "self-improve"; // AI self-improvement cycle

interface N8nTriggerPayload {
  workflow: N8nWorkflow;
  site: "overwater";
  data: Record<string, unknown>;
  timestamp?: string;
}

interface N8nResponse {
  ok: boolean;
  workflowId?: string;
  error?: string;
}

export async function triggerN8nWorkflow(
  workflow: N8nWorkflow,
  data: Record<string, unknown>,
): Promise<N8nResponse> {
  if (!N8N_WEBHOOK_URL) {
    console.log(
      `[n8n] Skipping "${workflow}" — N8N_WEBHOOK_URL not configured`,
    );
    return { ok: false, error: "N8N_WEBHOOK_URL not configured" };
  }

  const payload: N8nTriggerPayload = {
    workflow,
    site: "overwater",
    data,
    timestamp: new Date().toISOString(),
  };

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (N8N_SECRET) headers["x-n8n-secret"] = N8N_SECRET;

    const res = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(`[n8n] Webhook failed (${res.status}):`, text);
      return { ok: false, error: `HTTP ${res.status}` };
    }

    const result = await res.json().catch(() => ({}));
    console.log(`[n8n] Workflow "${workflow}" triggered successfully`);
    return { ok: true, workflowId: result.workflowId || result.executionId };
  } catch (err) {
    console.error(`[n8n] Failed to trigger "${workflow}":`, err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

export function fireN8nWorkflow(
  workflow: N8nWorkflow,
  data: Record<string, unknown>,
): void {
  triggerN8nWorkflow(workflow, data).catch(() => {});
}
