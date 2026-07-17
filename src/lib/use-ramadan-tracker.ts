"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"

export type FastStatus = "fasted" | "missed" | "qadha" | "travelling"

export interface RamadanFastLog {
  [day: number]: FastStatus
}

export function useRamadanTracker(ramadanYear: number | null) {
  const { user } = useAuth()
  const [fastLog, setFastLog] = useState<RamadanFastLog>({})
  const [khatmJuz, setKhatmJuz] = useState<Set<number>>(new Set())
  const [loading, setLoading] = useState(false)

  const loadLog = useCallback(async () => {
    if (!user?.uid || !ramadanYear) return
    setLoading(true)
    const supabase = createClient()
    const [{ data: fasting }, { data: settings }] = await Promise.all([
      supabase
        .from("user_ramadan_tracker")
        .select("day, status")
        .eq("user_id", user.uid)
        .eq("ramadan_year", ramadanYear),
      supabase
        .from("user_prayer_settings")
        .select("khatm_juz_completed")
        .eq("user_id", user.uid)
        .maybeSingle(),
    ])
    if (fasting) {
      const log: RamadanFastLog = {}
      for (const row of fasting) log[row.day] = row.status as FastStatus
      setFastLog(log)
    }
    if (settings?.khatm_juz_completed) {
      setKhatmJuz(new Set(settings.khatm_juz_completed as number[]))
    }
    setLoading(false)
  }, [user?.uid, ramadanYear])

  useEffect(() => { loadLog() }, [loadLog])

  const markFasting = useCallback(async (day: number, status: FastStatus) => {
    if (!user?.uid || !ramadanYear) return
    setFastLog((prev) => ({ ...prev, [day]: status }))
    const supabase = createClient()
    await supabase
      .from("user_ramadan_tracker")
      .upsert({ user_id: user.uid, ramadan_year: ramadanYear, day, status, marked_at: new Date().toISOString() }, { onConflict: "user_id,ramadan_year,day" })
  }, [user?.uid, ramadanYear])

  const clearFasting = useCallback(async (day: number) => {
    if (!user?.uid || !ramadanYear) return
    setFastLog((prev) => { const next = { ...prev }; delete next[day]; return next })
    const supabase = createClient()
    await supabase
      .from("user_ramadan_tracker")
      .delete()
      .eq("user_id", user.uid)
      .eq("ramadan_year", ramadanYear)
      .eq("day", day)
  }, [user?.uid, ramadanYear])

  const toggleKhatmJuz = useCallback(async (juz: number) => {
    if (!user?.uid) return
    setKhatmJuz((prev) => {
      const next = new Set(prev)
      if (next.has(juz)) next.delete(juz); else next.add(juz)
      const arr = Array.from(next)
      const supabase = createClient()
      ;supabase
        .from("user_prayer_settings")
        .upsert({ user_id: user.uid, khatm_juz_completed: arr, updated_at: new Date().toISOString() }, { onConflict: "user_id" })
        .then(() => {})
      return next
    })
  }, [user?.uid])

  const fastedCount = Object.values(fastLog).filter((s) => s === "fasted" || s === "qadha").length

  return { fastLog, khatmJuz, loading, markFasting, clearFasting, toggleKhatmJuz, fastedCount, signedIn: !!user?.uid }
}
