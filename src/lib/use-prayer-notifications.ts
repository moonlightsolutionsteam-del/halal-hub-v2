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

export function usePrayerNotifications(enabled: boolean, prayerData: PrayerTimesResponse | null) {
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    if (!enabled || !prayerData || !getNotificationSupport()) return
    if (Notification.permission !== "granted") return

    timers.current.forEach(clearTimeout)
    timers.current = []

    const schedule = MAIN_PRAYERS.map((key) => ({
      name: PRAYER_NAMES[key],
      timestamp: new Date(prayerData.prayer_datetimes[key]).getTime(),
    })).filter((p) => p.timestamp > Date.now())

    schedule.forEach(({ name, timestamp }) => {
      const delay = timestamp - Date.now()
      const timer = setTimeout(() => {
        new Notification(`${name} Prayer Time`, {
          body: `It's time for ${name} prayer.`,
          tag: `prayer-${name}`,
        })
      }, delay)
      timers.current.push(timer)
    })

    navigator.serviceWorker.ready.then((registration) => {
      registration.active?.postMessage({
        type: "SCHEDULE_PRAYER_NOTIFICATIONS",
        prayers: schedule,
      })
    }).catch(() => {})

    return () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [enabled, prayerData])
}
