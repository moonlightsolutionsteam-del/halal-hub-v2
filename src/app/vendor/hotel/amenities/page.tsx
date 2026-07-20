"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Check, X as XIcon } from "lucide-react"

const AMENITY_GROUPS: { group: string; items: string[] }[] = [
  {
    group: "Prayer & Faith",
    items: ["Prayer Room / Musalla", "Qibla Direction Indicator", "Prayer Mats in Rooms", "Zamzam Water", "Islamic Library", "Halal Dining Only"],
  },
  {
    group: "Dining",
    items: ["Halal Restaurant", "Room Service", "Breakfast Included", "Rooftop Dining", "Café / Lounge", "Private Dining"],
  },
  {
    group: "Wellness & Recreation",
    items: ["Swimming Pool (Ladies Only)", "Swimming Pool (Mixed)", "Gym / Fitness Centre", "Spa", "Sauna", "Yoga / Meditation Room"],
  },
  {
    group: "Family & Kids",
    items: ["Kids' Play Area", "Baby Cot Available", "Babysitting Service", "Family Rooms"],
  },
  {
    group: "Business",
    items: ["Conference Hall", "Meeting Rooms", "Business Centre", "High-Speed Wi-Fi", "Printing Services"],
  },
  {
    group: "Transport & Accessibility",
    items: ["Airport Shuttle", "Parking", "Valet Parking", "EV Charging", "Wheelchair Accessible", "Elevator"],
  },
  {
    group: "In-Room",
    items: ["Air Conditioning", "Flat Screen TV", "Minibar (Non-Alcoholic)", "Safe Box", "Bathtub", "Balcony / Terrace"],
  },
  {
    group: "General",
    items: ["24-Hour Reception", "Concierge Service", "Laundry Service", "Currency Exchange", "Luggage Storage", "Non-Smoking Rooms"],
  },
]

type AmenityRow = { id: string; name: string; group_name: string | null; is_available: boolean }

export default function HotelAmenitiesPage() {
  const { user } = useAuth()
  const [amenities, setAmenities] = React.useState<AmenityRow[]>([])
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState<string | null>(null)

  const load = React.useCallback(() => {
    if (!user?.uid) return
    createClient().from("hotel_amenities").select("*").eq("vendor_uid", user.uid)
      .then(({ data }) => { setAmenities(data ?? []); setLoading(false) })
  }, [user?.uid])

  React.useEffect(() => { load() }, [load])

  async function toggle(name: string, group: string, current: boolean) {
    if (!user?.uid) return
    setSaving(name)
    const supabase = createClient()
    const existing = amenities.find(a => a.name === name)
    if (existing) {
      await supabase.from("hotel_amenities").update({ is_available: !current }).eq("id", existing.id)
    } else {
      await supabase.from("hotel_amenities").insert({ vendor_uid: user.uid, name, group_name: group, is_available: true })
    }
    setSaving(null)
    load()
  }

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  const enabledCount = amenities.filter(a => a.is_available).length

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">Amenities</h1>
          <p className="text-muted-foreground text-sm">Toggle the amenities your hotel offers — they appear on your listing.</p>
        </div>
        <Badge className="bg-primary/10 text-primary font-black text-sm px-3 py-1">{enabledCount} enabled</Badge>
      </div>

      {AMENITY_GROUPS.map(({ group, items }) => (
        <div key={group} className="space-y-2">
          <h2 className="text-xs font-black text-muted-foreground uppercase tracking-widest">{group}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {items.map(item => {
              const row = amenities.find(a => a.name === item)
              const isOn = row?.is_available ?? false
              const isSaving = saving === item
              return (
                <button
                  key={item}
                  onClick={() => toggle(item, group, isOn)}
                  disabled={isSaving}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${isOn ? "border-primary/30 bg-primary/5" : "border-border bg-card hover:border-muted-foreground/30"}`}
                >
                  <div className={`h-6 w-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isOn ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    {isSaving ? <Loader2 className="h-3 w-3 animate-spin" /> : isOn ? <Check className="h-3 w-3" /> : <XIcon className="h-3 w-3" />}
                  </div>
                  <span className={`text-sm font-bold ${isOn ? "text-foreground" : "text-muted-foreground"}`}>{item}</span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
