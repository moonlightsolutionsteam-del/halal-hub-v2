"use client"

import { useEffect, useRef } from "react"
import type { PrayerTimesResponse } from "@/lib/ummah-api"
import { PRAYER_NAMES, MAIN_PRAYERS } from "@/lib/ummah-api"

export type NotificationPermissionState = "default" | "granted" | "denied" | "unsupported"

export function getNotificationSupport(): boolean {
  return typeof window !== "undefined" && "Notification" in window && "serviceWorker" in navigator
}

export async function requestNotificationPermission(): Promise<NotificationPermissionState> {
  if (!getNotificationSupport()) return "unsupported"
  const result = await Notification.requestPermission()
  return result as NotificationPermissionState
}

export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!("serviceWorker" in navigator)) return null
  try {
    return await navigator.serviceWorker.register("/sw.js")
  } catch {
    return null
  }
}

type ReminderOption = "off" | "at_time" | "5_before" | "10_before" | "15_before" | "30_before"
type PrayerReminders = Partial<Record<string, ReminderOption>>

function offsetMinutes(option: ReminderOption): number {
  switch (option) {
    case "5_before": return 5
    case "10_before": return 10
    case "15_before": return 15
    case "30_before": return 30
    default: return 0
  }
}

/**
 * Schedules browser notifications per prayer, honouring per-prayer reminder settings
 * (blueprint §3.2). When `reminders` is omitted, all 5 prayers notify at prayer time
 * (legacy behaviour behind the master toggle). On Fridays the jumuah setting replaces
 * the dhuhr one when configured.
 */
export function usePrayerNotifications(
  enabled: boolean,
  prayerData: PrayerTimesResponse | null,
  reminders?: PrayerReminders,
) {
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    if (!enabled || !prayerData || !getNotificationSupport()) return
    if (Notification.permission !== "granted") return

    timers.current.forEach(clearTimeout)
    timers.current = []

    const isFriday = new Date().getDay() === 5

    const schedule = MAIN_PRAYERS.flatMap((key) => {
      let option: ReminderOption = reminders ? (reminders[key] ?? "off") : "at_time"
      let label = PRAYER_NAMES[key]
      if (key === "dhuhr" && isFriday && reminders?.jumuah && reminders.jumuah !== "off") {
        option = reminders.jumuah
        label = "Jumu'ah"
      }
      if (option === "off") return []
      const prayerTs = new Date(prayerData.prayer_datetimes[key]).getTime()
      const mins = offsetMinutes(option)
      const fireTs = prayerTs - mins * 60000
      if (fireTs <= Date.now()) return []
      return [{
        name: label,
        timestamp: fireTs,
        body: mins > 0
          ? `${label} is in ${mins} minutes. Prepare for prayer.`
          : label === "Jumu'ah"
          ? "Jumu'ah prayer time. May your Friday be blessed."
          : `It's time for ${label} prayer.`,
      }]
    })

    schedule.forEach(({ name, timestamp, body }) => {
      const delay = timestamp - Date.now()
      const timer = setTimeout(() => {
        new Notification(`${name} Prayer Time`, { body, tag: `prayer-${name}` })
      }, delay)
      timers.current.push(timer)
    })

    navigator.serviceWorker.ready.then((registration) => {
      registration.active?.postMessage({
        type: "SCHEDULE_PRAYER_NOTIFICATIONS",
        prayers: schedule.map(({ name, timestamp }) => ({ name, timestamp })),
      })
    }).catch(() => {})

    return () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [enabled, prayerData, reminders])
}
