"use server"

import { createClient } from "@/lib/supabase/server"

export type CoinAction =
  | "daily_login"
  | "review_written"
  | "review_photo"
  | "review_video"
  | "first_review_on_listing"
  | "post_published"
  | "profile_completed"
  | "referral_consumer"
  | "referral_business"
  | "referral_creator"
  | "first_order"
  | "order_delivered"
  | "streak_7day"
  | "streak_30day"
  | "streak_90day"

const COIN_RATES: Record<CoinAction, number> = {
  daily_login:             5,
  review_written:          20,
  review_photo:            10,
  review_video:            25,
  first_review_on_listing: 10,
  post_published:          25,
  profile_completed:       30,
  referral_consumer:       50,
  referral_business:       150,
  referral_creator:        100,
  first_order:             25,
  order_delivered:         10,
  streak_7day:             25,
  streak_30day:            100,
  streak_90day:            300,
}

// Actions that can only be awarded once per user (lifetime)
const ONE_TIME_ACTIONS = new Set<CoinAction>([
  "profile_completed",
  "first_order",
])

// Daily caps: max coins earnable per action per day
const DAILY_CAPS: Partial<Record<CoinAction, number>> = {
  daily_login:    5,   // 1 award/day
  review_written: 40,  // 2 reviews/day
  review_photo:   30,  // 3 photos/day
  order_delivered: 50,
}

const LEVEL_THRESHOLDS = [
  { level: 5, name: "Community Champion", min: 10000 },
  { level: 4, name: "HalalHub Regular",   min: 5000 },
  { level: 3, name: "Trusted Reviewer",   min: 2000 },
  { level: 2, name: "Community Member",   min: 500 },
  { level: 1, name: "Explorer",           min: 0 },
]

function computeLevel(lifetimeEarned: number) {
  return LEVEL_THRESHOLDS.find(t => lifetimeEarned >= t.min) ?? LEVEL_THRESHOLDS[4]
}

export type AwardCoinsResult =
  | { ok: true; coinsAwarded: number; newBalance: number; levelUp?: string }
  | { ok: false; reason: string }

export async function awardCoins(
  userId: string,
  action: CoinAction,
  opts?: { referenceId?: string; season?: string; description?: string }
): Promise<AwardCoinsResult> {
  const supabase = await createClient()
  const coins = COIN_RATES[action]
  if (!coins) return { ok: false, reason: "Unknown action" }

  // One-time check
  if (ONE_TIME_ACTIONS.has(action)) {
    const { count } = await supabase
      .from("gamification_actions")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("action_type", action)
    if ((count ?? 0) > 0) return { ok: false, reason: "Already awarded (one-time action)" }
  }

  // Daily cap check
  const dailyCap = DAILY_CAPS[action]
  if (dailyCap !== undefined) {
    const today = new Date().toISOString().slice(0, 10)
    const { data: todayRows } = await supabase
      .from("gamification_actions")
      .select("coins_awarded")
      .eq("user_id", userId)
      .eq("action_type", action)
      .gte("created_at", `${today}T00:00:00Z`)
    const todayTotal = (todayRows ?? []).reduce((s, r) => s + (r.coins_awarded ?? 0), 0)
    if (todayTotal + coins > dailyCap) return { ok: false, reason: "Daily cap reached" }
  }

  // Get current balance from user_levels
  const { data: levelRow } = await supabase
    .from("user_levels")
    .select("current_balance, lifetime_coins_earned, level")
    .eq("user_id", userId)
    .single()

  const currentBalance = levelRow?.current_balance ?? 0
  const lifetimeEarned = levelRow?.lifetime_coins_earned ?? 0
  const newBalance = currentBalance + coins
  const newLifetime = lifetimeEarned + coins

  const levelInfo = computeLevel(newLifetime)
  const oldLevelInfo = computeLevel(lifetimeEarned)
  const leveledUp = levelInfo.level > (levelRow?.level ?? 1)

  // Insert coin ledger entry
  const { error: ledgerErr } = await supabase.from("coin_ledger").insert({
    user_id: userId,
    amount: coins,
    balance_after: newBalance,
    action_type: action,
    description: opts?.description ?? action.replace(/_/g, " "),
    reference_id: opts?.referenceId ?? null,
    season: opts?.season ?? null,
  })
  if (ledgerErr) return { ok: false, reason: ledgerErr.message }

  // Log gamification action
  await supabase.from("gamification_actions").insert({
    user_id: userId,
    action_type: action,
    coins_awarded: coins,
    reference_id: opts?.referenceId ?? null,
    season: opts?.season ?? null,
  })

  // Upsert user_levels
  await supabase.from("user_levels").upsert({
    user_id: userId,
    current_balance: newBalance,
    lifetime_coins_earned: newLifetime,
    level: levelInfo.level,
    level_name: levelInfo.name,
    updated_at: new Date().toISOString(),
  }, { onConflict: "user_id" })

  // Also update profiles.halal_coins_balance
  await supabase
    .from("profiles")
    .update({ halal_coins_balance: newBalance })
    .eq("id", userId)

  return {
    ok: true,
    coinsAwarded: coins,
    newBalance,
    levelUp: leveledUp ? levelInfo.name : undefined,
  }
}
