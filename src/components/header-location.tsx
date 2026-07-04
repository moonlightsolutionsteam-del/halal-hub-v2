"use client"

import { usePrayerSettings } from "@/lib/prayer-context"

export function HeaderLocation() {
  const { settings } = usePrayerSettings()
  return (
    <div className="hidden lg:flex flex-col items-end">
      <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground leading-none mb-1">Your Location</span>
      <span className="text-xs font-semibold text-foreground">{settings.locationName}</span>
    </div>
  )
}
