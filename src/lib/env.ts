/**
 * Validates required environment variables at startup.
 * Import this in instrumentation.ts so it runs on server boot.
 */

const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
] as const

const serverOnly = [
  "SUPABASE_SERVICE_ROLE_KEY",
] as const

function validateEnv() {
  const missing: string[] = []

  for (const key of required) {
    if (!process.env[key]) missing.push(key)
  }

  // Server-side only vars — only check outside the browser
  if (typeof window === "undefined") {
    for (const key of serverOnly) {
      if (!process.env[key]) missing.push(key)
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.map(k => `  - ${k}`).join("\n")}\n\nCopy .env.example to .env.local and fill in the values.`
    )
  }
}

validateEnv()

export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  resendApiKey: process.env.RESEND_API_KEY ?? "",
  razorpayKeyId: process.env.RAZORPAY_KEY_ID ?? "",
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET ?? "",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "https://halalhub.in",
  devMode: process.env.NEXT_PUBLIC_DEV_MODE === "true",
} as const
