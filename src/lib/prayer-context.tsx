"use client"

import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"

export type ReminderOption = "off" | "at_time" | "5_before" | "10_before" | "15_before" | "30_before"

export interface PrayerReminders {
  fajr: ReminderOption
  dhuhr: ReminderOption
  asr: ReminderOption
  maghrib: ReminderOption
  isha: ReminderOption
  jumuah: ReminderOption
  [key: string]: ReminderOption
}

export const DEFAULT_REMINDERS: PrayerReminders = {
  fajr: "off", dhuhr: "off", asr: "off", maghrib: "off", isha: "off", jumuah: "off",
}

export interface PrayerSettings {
  method: string
  madhab: string
  timeFormat: "12h" | "24h"
  latitude: number
  longitude: number
  locationName: string
  notifications: boolean
  reminders: PrayerReminders
}

const DEFAULT_SETTINGS: PrayerSettings = {
  method: "Karachi",
  madhab: "Hanafi",
  timeFormat: "12h",
  latitude: 19.076,
  longitude: 72.8777,
  locationName: "Mumbai, India",
  notifications: false,
  reminders: DEFAULT_REMINDERS,
}

const STORAGE_KEY = "halalhub-prayer-settings"

export interface CitySearchResult {
  name: string
  latitude: number
  longitude: number
}

interface PrayerSettingsContextType {
  settings: PrayerSettings
  updateSettings: (partial: Partial<PrayerSettings>) => void
  detectLocation: () => Promise<void>
  locationLoading: boolean
  locationError: string | null
  searchCity: (query: string) => Promise<CitySearchResult[]>
  selectCity: (result: CitySearchResult) => void
}

const PrayerSettingsContext = createContext<PrayerSettingsContextType>({
  settings: DEFAULT_SETTINGS,
  updateSettings: () => {},
  detectLocation: async () => {},
  locationLoading: false,
  locationError: null,
  searchCity: async () => [],
  selectCity: () => {},
})

export function PrayerSettingsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [settings, setSettings] = useState<PrayerSettings>(DEFAULT_SETTINGS)
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const loadedFromDb = useRef(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setSettings({ ...DEFAULT_SETTINGS, ...parsed, reminders: { ...DEFAULT_REMINDERS, ...(parsed.reminders ?? {}) } })
      }
    } catch {}
  }, [])

  // Pull settings from user_prayer_settings once the user is known (server copy wins)
  useEffect(() => {
    if (!user?.uid || loadedFromDb.current) return
    loadedFromDb.current = true
    const supabase = createClient()
    ;(supabase as any)
      .from("user_prayer_settings")
      .select("calculation_method, madhab, time_format, location_type, manual_city, manual_lat, manual_lng, fajr_reminder, dhuhr_reminder, asr_reminder, maghrib_reminder, isha_reminder, jumuah_reminder")
      .eq("user_id", user.uid)
      .maybeSingle()
      .then(({ data }: { data: any }) => {
        if (!data) return
        setSettings(prev => {
          const next: PrayerSettings = {
            ...prev,
            method: data.calculation_method ?? prev.method,
            madhab: data.madhab ?? prev.madhab,
            timeFormat: (data.time_format as "12h" | "24h") ?? prev.timeFormat,
            reminders: {
              fajr: data.fajr_reminder ?? prev.reminders.fajr,
              dhuhr: data.dhuhr_reminder ?? prev.reminders.dhuhr,
              asr: data.asr_reminder ?? prev.reminders.asr,
              maghrib: data.maghrib_reminder ?? prev.reminders.maghrib,
              isha: data.isha_reminder ?? prev.reminders.isha,
              jumuah: data.jumuah_reminder ?? prev.reminders.jumuah,
            },
            ...(data.location_type === "manual" && data.manual_lat && data.manual_lng
              ? { latitude: Number(data.manual_lat), longitude: Number(data.manual_lng), locationName: data.manual_city ?? prev.locationName }
              : {}),
          }
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
          return next
        })
      })
  }, [user?.uid])

  // Push settings to user_prayer_settings (debounced) so they survive device changes
  const syncToDb = useCallback((next: PrayerSettings) => {
    if (!user?.uid) return
    if (syncTimer.current) clearTimeout(syncTimer.current)
    syncTimer.current = setTimeout(() => {
      const supabase = createClient()
      ;(supabase as any).from("user_prayer_settings").upsert({
        user_id: user.uid,
        calculation_method: next.method,
        madhab: next.madhab,
        time_format: next.timeFormat,
        location_type: "manual",
        manual_city: next.locationName,
        manual_lat: next.latitude,
        manual_lng: next.longitude,
        fajr_reminder: next.reminders.fajr,
        dhuhr_reminder: next.reminders.dhuhr,
        asr_reminder: next.reminders.asr,
        maghrib_reminder: next.reminders.maghrib,
        isha_reminder: next.reminders.isha,
        jumuah_reminder: next.reminders.jumuah,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" }).then(() => {})
    }, 1500)
  }, [user?.uid])

  const updateSettings = useCallback((partial: Partial<PrayerSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      syncToDb(next)
      return next
    })
  }, [syncToDb])

  const detectLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser")
      return
    }
    setLocationLoading(true)
    setLocationError(null)
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
        })
      })
      const { latitude, longitude } = position.coords
      let locationName = `${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&zoom=10`
        )
        const geo = await res.json()
        const city = geo.address?.city || geo.address?.town || geo.address?.village || ""
        const country = geo.address?.country || ""
        if (city || country) locationName = [city, country].filter(Boolean).join(", ")
      } catch {}
      updateSettings({ latitude, longitude, locationName })
    } catch (err: unknown) {
      const msg = err instanceof GeolocationPositionError
        ? err.code === 1
          ? "Location access is blocked for this site. Enable it in your browser's site settings, or"
          : err.code === 3
          ? "Location request timed out. Check your connection, or"
          : "Could not determine your location. Try again, or"
        : "Location detection failed. Try again, or"
      setLocationError(msg)
    } finally {
      setLocationLoading(false)
    }
  }, [updateSettings])

  const searchCity = useCallback(async (query: string): Promise<CitySearchResult[]> => {
    if (!query.trim()) return []
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=6&addressdetails=1`
      )
      const results = await res.json()
      return results.map((r: { display_name: string; lat: string; lon: string }) => ({
        name: r.display_name,
        latitude: parseFloat(r.lat),
        longitude: parseFloat(r.lon),
      }))
    } catch {
      return []
    }
  }, [])

  const selectCity = useCallback((result: CitySearchResult) => {
    setLocationError(null)
    updateSettings({ latitude: result.latitude, longitude: result.longitude, locationName: result.name })
  }, [updateSettings])

  return (
    <PrayerSettingsContext.Provider value={{ settings, updateSettings, detectLocation, locationLoading, locationError, searchCity, selectCity }}>
      {children}
    </PrayerSettingsContext.Provider>
  )
}

export const usePrayerSettings = () => useContext(PrayerSettingsContext)
