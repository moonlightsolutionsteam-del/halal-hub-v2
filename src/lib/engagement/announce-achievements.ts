import { createClient } from "@/lib/supabase/client"

type ToastFn = (opts: { title: string; description?: string }) => void

/**
 * Call right after any user action that might trigger a DB-side achievement
 * unlock (the trigger runs inside the same transaction as the insert, so by
 * the time the insert's promise resolves the unlock — if any — has already
 * been written). Surfaces a toast per achievement unlocked in the last few
 * seconds so the win feels tied to the action that caused it.
 */
export async function announceNewAchievements(userId: string, toast: ToastFn) {
  const supabase = createClient()
  const since = new Date(Date.now() - 10_000).toISOString()
  const { data } = await (supabase as any)
    .from("user_achievements")
    .select("unlocked_at, achievements(name, description, points_reward)")
    .eq("user_id", userId)
    .gte("unlocked_at", since)

  for (const row of data ?? []) {
    const a = row.achievements
    if (!a) continue
    toast({ title: `Achievement Unlocked: ${a.name}`, description: `${a.description} · +${a.points_reward} Halal Coins` })
  }
}
