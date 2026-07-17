"use client"

import { useEffect, useState } from "react"
import { getIslamicEvents } from "@/lib/ummah-api"
import { createClient } from "@/lib/supabase/client"

const LAST_GREETING_KEY = "hh_last_greeting"

function timeOfDayGreeting(date: Date): string {
  const h = date.getHours()
  if (h < 5) return "Assalamualaikum"
  if (h < 12) return "Good Morning"
  if (h < 17) return "Good Afternoon"
  if (h < 21) return "Good Evening"
  return "Assalamualaikum"
}

/** Occasion greeting for the current Hijri month/day, if any. */
function occasionGreeting(hijriMonth: number, hijriDay: number): string | null {
  if (hijriMonth === 9) return "Ramadan Mubarak"
  if (hijriMonth === 10 && hijriDay <= 3) return "Eid Mubarak"
  if (hijriMonth === 12 && hijriDay >= 8 && hijriDay <= 13) return hijriDay >= 10 ? "Eid Mubarak" : "Hajj Mubarak"
  if (hijriMonth === 1 && hijriDay <= 10) return "Blessed Muharram"
  if (hijriMonth === 3 && hijriDay <= 12) return "Blessed Rabi' al-Awwal"
  return null
}

async function weeklyStat(userId: string): Promise<string | null> {
  const supabase = createClient()
  const since = new Date(Date.now() - 7 * 86400000).toISOString()
  const { count } = await supabase
    .from("user_activity_events")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .in("event_type", ["business_saved", "business_checkin"])
    .gte("created_at", since)
  if (!count || count < 1) return null
  return `You've discovered ${count} halal spot${count === 1 ? "" : "s"} this week`
}

export function useSmartGreeting(name: string | null | undefined, userId: string | null | undefined) {
  const [greeting, setGreeting] = useState<string>("Assalamualaikum")
  const [subtext, setSubtext] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function build() {
      const now = new Date()
      const variants: string[] = []
      const isFriday = now.getDay() === 5

      if (isFriday) variants.push("Jumu'ah Mubarak")

      try {
        const events = await getIslamicEvents()
        const occasion = occasionGreeting(events.current_hijri_date.hijri.month, events.current_hijri_date.hijri.day)
        if (occasion) variants.push(occasion)
      } catch {
        // Islamic events API unavailable — fall back to time-of-day only
      }

      variants.push(timeOfDayGreeting(now))

      const last = typeof window !== "undefined" ? window.localStorage.getItem(LAST_GREETING_KEY) : null
      const pool = variants.length > 1 ? variants.filter(v => v !== last) : variants
      const chosen = pool[Math.floor(Math.random() * pool.length)] ?? variants[0]

      if (typeof window !== "undefined") window.localStorage.setItem(LAST_GREETING_KEY, chosen)

      let stat: string | null = null
      if (userId) {
        try { stat = await weeklyStat(userId) } catch { stat = null }
      }

      if (!cancelled) {
        setGreeting(chosen)
        setSubtext(stat)
      }
    }
    build()
    return () => { cancelled = true }
  }, [userId])

  const first = name?.trim().split(/\s+/)[0]
  const text = first ? `${greeting}, ${first}` : greeting

  return { text, subtext }
}
