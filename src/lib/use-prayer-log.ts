"use client"

import { useCallback, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"

export type PrayerName = "fajr" | "dhuhr" | "asr" | "maghrib" | "isha"
export type PrayerLogStatus = "prayed" | "missed" | "qadha" | "exempt"

export interface DayLogSummary {
  date: string // yyyy-mm-dd
  prayedCount: number
}

export const STREAK_MILESTONES = [7, 30, 100, 365] as const
export const MILESTONE_COINS: Record<number, number> = { 7: 50, 30: 200, 100: 500, 365: 2000 }
export const PRAYER_COIN_VALUE = 10
export const DAILY_BONUS_COINS = 25

export interface MarkPrayerResult {
  streak: number
  coinsAwarded: number
  milestone: number | null
  badgesEarned: BadgeId[]
}

export type BadgeId =
  | "first_prayer"
  | "full_day"
  | "week_warrior"
  | "perfect_week"
  | "fajr_champion"
  | "month_mujahid"
  | "century"
  | "year_muttaqi"

export interface BadgeDefinition {
  id: BadgeId
  name: string
  desc: string
  icon: string
  color: string
}

export const BADGE_DEFS: BadgeDefinition[] = [
  { id: "first_prayer",  name: "First Steps",     desc: "Marked your very first prayer",          icon: "🌱", color: "text-green-600"  },
  { id: "full_day",      name: "Full Day",         desc: "Prayed all 5 prayers in one day",        icon: "✅", color: "text-emerald-600" },
  { id: "week_warrior",  name: "Week Warrior",     desc: "Maintained a 7-day prayer streak",       icon: "🔥", color: "text-orange-500"  },
  { id: "perfect_week",  name: "Perfect Week",     desc: "All 5 prayers for 7 days straight",      icon: "💫", color: "text-yellow-500"  },
  { id: "fajr_champion", name: "Fajr Champion",    desc: "Prayed Fajr 30 days in a row",           icon: "🌅", color: "text-amber-500"   },
  { id: "month_mujahid", name: "Month Mujahid",    desc: "Maintained a 30-day prayer streak",      icon: "⚔️", color: "text-blue-600"    },
  { id: "century",       name: "Century",          desc: "Maintained a 100-day prayer streak",     icon: "💎", color: "text-purple-600"  },
  { id: "year_muttaqi",  name: "Year of Taqwa",    desc: "Maintained a 365-day prayer streak",     icon: "👑", color: "text-yellow-600"  },
]

export interface RankDefinition {
  name: string
  minStreak: number
  icon: string
  color: string
  bg: string
}

export const RANKS: RankDefinition[] = [
  { name: "Mubtadi",   minStreak: 0,   icon: "🌱", color: "text-muted-foreground",  bg: "bg-muted/40"              },
  { name: "Muntasib",  minStreak: 7,   icon: "⭐", color: "text-amber-600",          bg: "bg-amber-50 dark:bg-amber-950/30"   },
  { name: "Mujahid",   minStreak: 30,  icon: "🔥", color: "text-orange-600",         bg: "bg-orange-50 dark:bg-orange-950/30" },
  { name: "Mukhlis",   minStreak: 100, icon: "💎", color: "text-purple-600",         bg: "bg-purple-50 dark:bg-purple-950/30" },
  { name: "Muttaqi",   minStreak: 365, icon: "👑", color: "text-yellow-600",         bg: "bg-yellow-50 dark:bg-yellow-950/30" },
]

export function getRank(streak: number): RankDefinition {
  return [...RANKS].reverse().find(r => streak >= r.minStreak) ?? RANKS[0]
}

function localDateISO(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

export function usePrayerLog() {
  const { user } = useAuth()
  const [todayLog, setTodayLog] = useState<Partial<Record<PrayerName, PrayerLogStatus>>>({})
  const [streak, setStreak] = useState<number>(0)
  const [longestStreak, setLongestStreak] = useState<number>(0)
  const [week, setWeek] = useState<DayLogSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [marking, setMarking] = useState<PrayerName | null>(null)

  const load = useCallback(async () => {
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    const today = localDateISO()
    const weekAgo = localDateISO(new Date(Date.now() - 6 * 86400000))

    const [{ data: logs }, { data: streakRow }] = await Promise.all([
      supabase
        .from("user_prayer_log")
        .select("prayer_date, prayer_name, status")
        .eq("user_id", user.uid)
        .gte("prayer_date", weekAgo),
      supabase
        .from("user_streaks")
        .select("current_count, longest_count")
        .eq("user_id", user.uid)
        .eq("streak_type", "prayer")
        .maybeSingle(),
    ])

    const todayMap: Partial<Record<PrayerName, PrayerLogStatus>> = {}
    const byDay = new Map<string, number>()
    for (const row of logs ?? []) {
      if (row.prayer_date === today) todayMap[row.prayer_name as PrayerName] = row.status as PrayerLogStatus
      if (row.status === "prayed") byDay.set(row.prayer_date, (byDay.get(row.prayer_date) ?? 0) + 1)
    }
    const weekDays: DayLogSummary[] = []
    for (let i = 6; i >= 0; i--) {
      const d = localDateISO(new Date(Date.now() - i * 86400000))
      weekDays.push({ date: d, prayedCount: byDay.get(d) ?? 0 })
    }

    setTodayLog(todayMap)
    setWeek(weekDays)
    setStreak(streakRow?.current_count ?? 0)
    setLongestStreak(streakRow?.longest_count ?? 0)
    setLoading(false)
  }, [user?.uid])

  useEffect(() => { load() }, [load])

  const markPrayer = useCallback(async (
    prayer: PrayerName,
    status: PrayerLogStatus = "prayed",
  ): Promise<MarkPrayerResult | null> => {
    if (!user?.uid) return null
    setMarking(prayer)
    const supabase = createClient()

    const { data, error } = await supabase.rpc("mark_prayer", {
      p_date: localDateISO(),
      p_prayer: prayer,
      p_status: status,
    })
    setMarking(null)
    if (error) throw error

    const rpc = data as any
    const result: MarkPrayerResult = {
      streak:        rpc.streak        ?? 0,
      coinsAwarded:  rpc.coins_awarded ?? 0,
      milestone:     rpc.milestone     ?? null,
      badgesEarned:  rpc.badges_earned ?? [],
    }

    setTodayLog(prev => ({ ...prev, [prayer]: status }))
    setStreak(result.streak)
    setLongestStreak(l => Math.max(l, result.streak))
    setWeek(prev => prev.map((d, i) =>
      i === prev.length - 1 && status === "prayed"
        ? { ...d, prayedCount: d.prayedCount + 1 }
        : d
    ))

    return result
  }, [user?.uid])

  return { todayLog, streak, longestStreak, week, loading, marking, markPrayer, reload: load, signedIn: !!user?.uid }
}
