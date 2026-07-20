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

// Actions eligible for seasonal multipliers (streaks/referrals excluded — one-off rewards)
const MULTIPLIER_ELIGIBLE = new Set<CoinAction>([
  "daily_login",
  "review_written",
  "review_photo",
  "review_video",
  "post_published",
  "order_delivered",
])

// Actions that can only be awarded once per user (lifetime)
const ONE_TIME_ACTIONS = new Set<CoinAction>([
  "profile_completed",
  "first_order",
])

// Daily caps: max coins earnable per action per day (pre-multiplier)
const DAILY_CAPS: Partial<Record<CoinAction, number>> = {
  daily_login:    5,
  review_written: 40,
  review_photo:   30,
  order_delivered: 50,
}

// Hourly velocity cap: max coins any user can earn across ALL actions in 1 hour
const HOURLY_VELOCITY_CAP = 200

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
  | { ok: true; coinsAwarded: number; newBalance: number; levelUp?: string; multiplier?: number }
  | { ok: false; reason: string }

export async function awardCoins(
  userId: string,
  action: CoinAction,
  opts?: { referenceId?: string; season?: string; description?: string }
): Promise<AwardCoinsResult> {
  const supabase = await createClient()
  const baseCoins = COIN_RATES[action]
  if (!baseCoins) return { ok: false, reason: "Unknown action" }

  // ── One-time check ────────────────────────────────────────────────────────
  if (ONE_TIME_ACTIONS.has(action)) {
    const { count } = await supabase
      .from("gamification_actions")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("action_type", action)
    if ((count ?? 0) > 0) return { ok: false, reason: "Already awarded (one-time action)" }
  }

  // ── Daily cap check ───────────────────────────────────────────────────────
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
    if (todayTotal + baseCoins > dailyCap) return { ok: false, reason: "Daily cap reached" }
  }

  // ── Velocity / anti-abuse check ───────────────────────────────────────────
  const oneHourAgo = new Date(Date.now() - 3_600_000).toISOString()
  const { data: hourlyRows } = await supabase
    .from("coin_ledger")
    .select("amount")
    .eq("user_id", userId)
    .gte("created_at", oneHourAgo)
    .gt("amount", 0)                 // only credits
  const hourlyTotal = (hourlyRows ?? []).reduce((s, r) => s + (r.amount ?? 0), 0)
  if (hourlyTotal + baseCoins > HOURLY_VELOCITY_CAP) {
    // Flag the user — fire-and-forget
    supabase.from("coin_abuse_flags").insert({
      user_id: userId,
      reason: `Hourly velocity cap exceeded: ${hourlyTotal + baseCoins} HC in 1h (cap: ${HOURLY_VELOCITY_CAP})`,
      action_type: action,
      coins_at_risk: hourlyTotal,
    }).then(() => {})
    return { ok: false, reason: "Hourly earning limit reached" }
  }

  // ── Seasonal multiplier ───────────────────────────────────────────────────
  let multiplier = 1
  let seasonName: string | null = opts?.season ?? null
  if (MULTIPLIER_ELIGIBLE.has(action)) {
    const now = new Date().toISOString()
    const { data: season } = await supabase
      .from("coin_seasons")
      .select("name, multiplier")
      .eq("active", true)
      .lte("starts_at", now)
      .gte("ends_at", now)
      .order("multiplier", { ascending: false })
      .limit(1)
      .single()
    if (season) {
      multiplier = Number(season.multiplier)
      seasonName = season.name
    }
  }

  const coins = Math.round(baseCoins * multiplier)

  // ── Balance + level ───────────────────────────────────────────────────────
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
  const leveledUp = levelInfo.level > (levelRow?.level ?? 1)

  // ── Write ledger entry ────────────────────────────────────────────────────
  const desc = multiplier > 1
    ? `${(opts?.description ?? action.replace(/_/g, " "))} ×${multiplier} (${seasonName})`
    : (opts?.description ?? action.replace(/_/g, " "))

  const { error: ledgerErr } = await supabase.from("coin_ledger").insert({
    user_id: userId,
    amount: coins,
    balance_after: newBalance,
    action_type: action,
    description: desc,
    reference_id: opts?.referenceId ?? null,
    season: seasonName,
  })
  if (ledgerErr) return { ok: false, reason: ledgerErr.message }

  // ── Log gamification action ───────────────────────────────────────────────
  await supabase.from("gamification_actions").insert({
    user_id: userId,
    action_type: action,
    coins_awarded: coins,
    reference_id: opts?.referenceId ?? null,
    season: seasonName,
  })

  // ── Upsert user_levels ────────────────────────────────────────────────────
  await supabase.from("user_levels").upsert({
    user_id: userId,
    current_balance: newBalance,
    lifetime_coins_earned: newLifetime,
    level: levelInfo.level,
    level_name: levelInfo.name,
    updated_at: new Date().toISOString(),
  }, { onConflict: "user_id" })

  await supabase
    .from("profiles")
    .update({ halal_coins_balance: newBalance })
    .eq("id", userId)

  return {
    ok: true,
    coinsAwarded: coins,
    newBalance,
    levelUp: leveledUp ? levelInfo.name : undefined,
    multiplier: multiplier > 1 ? multiplier : undefined,
  }
}
