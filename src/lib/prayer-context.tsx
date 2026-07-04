"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"

export interface PrayerSettings {
  method: string
  madhab: string
  timeFormat: "12h" | "24h"
  latitude: number
  longitude: number
  locationName: string
  notifications: boolean
}

const DEFAULT_SETTINGS: PrayerSettings = {
  method: "NorthAmerica",
  madhab: "Shafi",
  timeFormat: "12h",
  latitude: 40.7128,
  longitude: -74.006,
  locationName: "New York, USA",
  notifications: false,
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
  const [settings, setSettings] = useState<PrayerSettings>(DEFAULT_SETTINGS)
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setSettings(JSON.parse(stored))
    } catch {}
  }, [])

  const updateSettings = useCallback((partial: Partial<PrayerSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

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
