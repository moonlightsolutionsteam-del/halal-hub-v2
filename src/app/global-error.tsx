"use client"

import * as Sentry from "@sentry/nextjs"
import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6">
          <div className="text-center space-y-4 max-w-sm">
            <div className="text-5xl">🕌</div>
            <h1 className="text-2xl font-black">Something went wrong</h1>
            <p className="text-sm text-muted-foreground">
              Our team has been notified. Please try again.
            </p>
            <button
              onClick={reset}
              className="mt-4 px-6 py-3 rounded-2xl bg-primary text-white font-bold text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
