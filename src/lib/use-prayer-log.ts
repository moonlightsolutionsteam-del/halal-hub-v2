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
      (supabase as any)
        .from("user_prayer_log")
        .select("prayer_date, prayer_name, status")
        .eq("user_id", user.uid)
        .gte("prayer_date", weekAgo),
      (supabase as any)
        .from("user_streaks")
        .select("current_count, longest_count")
        .eq("user_id", user.uid)
        .eq("streak_type", "prayer")
        .maybeSingle(),
    ])

    const todayMap: Partial<Record<PrayerName, PrayerLogStatus>> = {}
    const byDay = new Map<string, number>()
    for (const row of logs ?? []) {
      if (row.prayer_date === today) todayMap[row.prayer_name as PrayerName] = row.status
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

  /**
   * Mark (or unmark by toggling) a prayer for today.
   * Returns { streak, milestone } — milestone is set when a new milestone was just crossed.
   */
  const markPrayer = useCallback(async (
    prayer: PrayerName,
    status: PrayerLogStatus = "prayed",
  ): Promise<{ streak: number; milestone: number | null } | null> => {
    if (!user?.uid) return null
    setMarking(prayer)
    const supabase = createClient()
    const prevStreak = streak
    const { data, error } = await (supabase as any).rpc("mark_prayer", {
      p_date: localDateISO(),
      p_prayer: prayer,
      p_status: status,
    })
    setMarking(null)
    if (error) throw error

    const newStreak: number = data ?? 0
    setTodayLog(prev => ({ ...prev, [prayer]: status }))
    setStreak(newStreak)
    setLongestStreak(l => Math.max(l, newStreak))
    setWeek(prev => prev.map((d, i) =>
      i === prev.length - 1 && status === "prayed"
        ? { ...d, prayedCount: d.prayedCount + 1 }
        : d
    ))

    const milestone = STREAK_MILESTONES.find(m => newStreak >= m && prevStreak < m) ?? null
    return { streak: newStreak, milestone }
  }, [user?.uid, streak])

  return { todayLog, streak, longestStreak, week, loading, marking, markPrayer, reload: load, signedIn: !!user?.uid }
}
