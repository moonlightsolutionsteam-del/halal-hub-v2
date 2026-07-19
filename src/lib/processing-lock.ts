import { createClient } from "@/lib/supabase/client"

/**
 * Tries to acquire a named lock. Returns true if acquired, false if already held.
 * Locks auto-expire after 30s so a crashed browser never deadlocks the system.
 */
export async function acquireLock(lockKey: string, context?: string): Promise<boolean> {
  const supabase = createClient()

  // First sweep expired locks
  await supabase.rpc("release_expired_locks")

  const { error } = await supabase.from("processing_locks").insert({
    lock_key: lockKey,
    expires_at: new Date(Date.now() + 30_000).toISOString(),
    context: context ?? null,
  })

  // Unique constraint violation = lock already held
  return !error
}

export async function releaseLock(lockKey: string): Promise<void> {
  const supabase = createClient()
  await supabase.from("processing_locks").delete().eq("lock_key", lockKey)
}

/** Run an async operation under a named lock. Throws if lock is already held. */
export async function withLock<T>(
  lockKey: string,
  fn: () => Promise<T>,
  context?: string
): Promise<T> {
  const acquired = await acquireLock(lockKey, context)
  if (!acquired) {
    throw new Error(`Action "${lockKey}" is already in progress by another admin. Please wait and try again.`)
  }
  try {
    return await fn()
  } finally {
    await releaseLock(lockKey)
  }
}
