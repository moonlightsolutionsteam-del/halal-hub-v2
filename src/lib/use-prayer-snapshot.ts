"use client"

import { useState, useEffect, useCallback } from "react"
import { usePrayerSettings } from "@/lib/prayer-context"
import { getPrayerTimes, PRAYER_NAMES, type PrayerTimesResponse } from "@/lib/ummah-api"

export interface PrayerCountdown {
  hours: number
  minutes: number
  seconds: number
}

function getCountdown(targetISO: string): PrayerCountdown {
  const diff = Math.max(0, new Date(targetISO).getTime() - Date.now())
  return {
    hours: Math.floor(diff / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

export function usePrayerSnapshot() {
  const { settings } = usePrayerSettings()
  const [prayerData, setPrayerData] = useState<PrayerTimesResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [countdown, setCountdown] = useState<PrayerCountdown>({ hours: 0, minutes: 0, seconds: 0 })

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getPrayerTimes(settings.latitude, settings.longitude, settings.method, settings.madhab)
      setPrayerData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load prayer times")
    } finally {
      setLoading(false)
    }
  }, [settings.latitude, settings.longitude, settings.method, settings.madhab])

  useEffect(() => { load() }, [load])

  useEffect(() => {
    if (!prayerData) return
    const tick = () => {
      const nextTime = prayerData.prayer_datetimes[prayerData.current_status.next_prayer]
      if (nextTime) setCountdown(getCountdown(nextTime))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [prayerData])

  const nextPrayerKey = prayerData?.current_status.next_prayer ?? ""
  const nextPrayerName = PRAYER_NAMES[nextPrayerKey] ?? ""
  const nextPrayerTime = prayerData ? prayerData.prayer_times[nextPrayerKey as keyof typeof prayerData.prayer_times] : undefined

  return { prayerData, loading, error, countdown, nextPrayerName, nextPrayerTime, locationName: settings.locationName, timeFormat: settings.timeFormat }
}
