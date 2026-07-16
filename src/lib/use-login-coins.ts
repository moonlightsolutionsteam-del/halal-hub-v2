"use client"

import { useEffect, useRef, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"

export interface LoginCoinsResult {
  alreadyAwarded: boolean
  coinsAwarded: number
  streak: number
  milestone: number | null
  newLevel: number | null
  lifetimeCoins: number
}

function todayISO() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

// Called once per calendar day per signed-in user. Returns the coin grant result.
export function useLoginCoins(): LoginCoinsResult | null {
  const { user } = useAuth()
  const [result, setResult] = useState<LoginCoinsResult | null>(null)
  const firedRef = useRef(false)

  useEffect(() => {
    if (!user?.uid || firedRef.current) return

    // Client-side fast path: check localStorage to avoid extra RPC calls within same day
    const storageKey = `hhv2_login_coins_${user.uid}_${todayISO()}`
    if (localStorage.getItem(storageKey)) {
      firedRef.current = true
      return
    }

    firedRef.current = true

    const supabase = createClient()
    ;(supabase as any).rpc("award_login_coins", { p_date: todayISO() }).then(({ data, error }: any) => {
      if (error || !data) return
      localStorage.setItem(storageKey, "1")
      setResult({
        alreadyAwarded: data.already_awarded ?? true,
        coinsAwarded:   data.coins_awarded   ?? 0,
        streak:         data.streak          ?? 0,
        milestone:      data.milestone       ?? null,
        newLevel:       data.new_level       ?? null,
        lifetimeCoins:  data.lifetime_coins  ?? 0,
      })
    })
  }, [user?.uid])

  return result
}

// Consumer level definitions (§6.1)
export const CONSUMER_LEVELS = [
  { level: 1, name: "Explorer",          minCoins: 0,     maxCoins: 499,  badge: null,           color: "text-muted-foreground",   bg: "bg-muted/40" },
  { level: 2, name: "Community Member",  minCoins: 500,   maxCoins: 1999, badge: "Community",    color: "text-sky-600",            bg: "bg-sky-50 dark:bg-sky-950/30" },
  { level: 3, name: "Trusted Reviewer",  minCoins: 2000,  maxCoins: 4999, badge: "Trusted",      color: "text-emerald-600",        bg: "bg-emerald-50 dark:bg-emerald-950/30" },
  { level: 4, name: "HalalHub Regular",  minCoins: 5000,  maxCoins: 9999, badge: "Regular",      color: "text-amber-600",          bg: "bg-amber-50 dark:bg-amber-950/30" },
  { level: 5, name: "Community Champion",minCoins: 10000, maxCoins: null, badge: "Champion",     color: "text-yellow-600",         bg: "bg-yellow-50 dark:bg-yellow-950/30" },
] as const

export const LEVEL_ICONS = ["🌱", "⭐", "🛡️", "🥇", "🏆"] as const

export function getConsumerLevel(lifetimeCoins: number) {
  return [...CONSUMER_LEVELS].reverse().find(l => lifetimeCoins >= l.minCoins) ?? CONSUMER_LEVELS[0]
}

export function levelProgress(lifetimeCoins: number) {
  const current = getConsumerLevel(lifetimeCoins)
  if (current.level === 5) return 100
  const next = CONSUMER_LEVELS[current.level] // next level is at index current.level (0-indexed)
  const range = next.minCoins - current.minCoins
  const earned = lifetimeCoins - current.minCoins
  return Math.min(100, Math.round((earned / range) * 100))
}
