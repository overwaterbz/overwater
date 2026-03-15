const requiredVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
] as const;

const runtimeVars = ["SUPABASE_SERVICE_ROLE_KEY"] as const;

const missing = requiredVars.filter((v) => !process.env[v]);

if (missing.length > 0) {
  const message = `Missing required environment variables: ${missing.join(", ")}`;
  if (process.env.NODE_ENV === "production") {
    throw new Error(message);
  } else {
    console.warn(`⚠️ ${message}`);
  }
}

const missingRuntime = runtimeVars.filter((v) => !process.env[v]);
if (missingRuntime.length > 0) {
  console.warn(
    `⚠️ Missing runtime environment variables (needed at request time): ${missingRuntime.join(", ")}`,
  );
}
