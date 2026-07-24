/**
 * Simple in-memory rate limiter for API routes.
 * For multi-instance deployments, replace with Upstash Redis.
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

// Clean up expired entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of store.entries()) {
      if (entry.resetAt < now) store.delete(key)
    }
  }, 5 * 60 * 1000)
}

interface RateLimitOptions {
  /** Max requests allowed in the window */
  limit: number
  /** Window size in seconds */
  windowSecs: number
}

interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  resetAt: number
}

export function rateLimit(
  identifier: string,
  options: RateLimitOptions
): RateLimitResult {
  const { limit, windowSecs } = options
  const now = Date.now()
  const windowMs = windowSecs * 1000

  const entry = store.get(identifier)

  if (!entry || entry.resetAt < now) {
    const resetAt = now + windowMs
    store.set(identifier, { count: 1, resetAt })
    return { success: true, limit, remaining: limit - 1, resetAt }
  }

  entry.count += 1

  if (entry.count > limit) {
    return { success: false, limit, remaining: 0, resetAt: entry.resetAt }
  }

  return { success: true, limit, remaining: limit - entry.count, resetAt: entry.resetAt }
}

/** Extract a stable identifier from a Next.js request for rate limiting */
export function getRequestIdentifier(request: Request, suffix = ""): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown"
  return `${ip}${suffix ? `:${suffix}` : ""}`
}
