import * as Sentry from "@sentry/nextjs"

export async function register() {
  // Validate required env vars at startup — fails fast with a clear error message
  await import("./src/lib/env")

  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config")
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config")
  }
}

export const onRequestError = Sentry.captureRequestError
