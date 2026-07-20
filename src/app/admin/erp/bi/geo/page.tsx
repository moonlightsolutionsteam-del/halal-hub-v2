"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, MapPin } from "lucide-react"

type Row = { city: string | null; country: string | null; category: string | null; status: string | null }
type CityGroup = { label: string; total: number; active: number; categories: Record<string, number> }

export default function GeoPage() {
  const [rows, setRows] = React.useState<Row[]>([])
  const [loading, setLoading] = React.useState(true)
  const [countryFilter, setCountryFilter] = React.useState("All")

  React.useEffect(() => {
    const supabase = createClient()
    supabase.from("businesses").select("city, country, category, status")
      .then(({ data }) => { setRows(data ?? []); setLoading(false) })
  }, [])

  const countries = ["All", ...Array.from(new Set(rows.map(r => r.country ?? "Unknown"))).sort()]

  const filtered = countryFilter === "All" ? rows : rows.filter(r => (r.country ?? "Unknown") === countryFilter)

  const cityMap: Record<string, CityGroup> = {}
  for (const r of filtered) {
    const city = r.city ?? "Unknown"
    const country = r.country ?? ""
    const label = country ? `${city}, ${country}` : city
    if (!cityMap[label]) cityMap[label] = { label, total: 0, active: 0, categories: {} }
    cityMap[label].total++
    if (r.status === "active") cityMap[label].active++
    const cat = r.category ?? "Other"
    cityMap[label].categories[cat] = (cityMap[label].categories[cat] ?? 0) + 1
  }

  const cities = Object.values(cityMap).sort((a, b) => b.total - a.total)
  const maxCount = cities[0]?.total ?? 1

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline">Geographic Intelligence</h1>
        <p className="text-muted-foreground text-sm mt-0.5">City-wise coverage and listing distribution across {countries.length - 1} countries.</p>
      </div>

      {/* Country filter */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {countries.map(c => (
          <button key={c} onClick={() => setCountryFilter(c)}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              countryFilter === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="pt-4 pb-3">
            <p className="text-2xl font-black tabular-nums">{cities.length}</p>
            <p className="text-xs text-muted-foreground font-medium mt-0.5">Cities covered</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3">
            <p className="text-2xl font-black tabular-nums">{filtered.length}</p>
            <p className="text-xs text-muted-foreground font-medium mt-0.5">Total listings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3">
            <p className="text-2xl font-black tabular-nums">{filtered.filter(r => r.status === "active").length}</p>
            <p className="text-xs text-muted-foreground font-medium mt-0.5">Active listings</p>
          </CardContent>
        </Card>
      </div>

      {/* City list */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-black flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Coverage by City</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {cities.slice(0, 30).map(city => {
            const topCat = Object.entries(city.categories).sort((a, b) => b[1] - a[1])[0]
            const pct = Math.round((city.total / maxCount) * 100)
            const activePct = city.total ? Math.round((city.active / city.total) * 100) : 0
            return (
              <div key={city.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-foreground">{city.label}</span>
                  <div className="flex items-center gap-2">
                    {topCat && <span className="text-[10px] text-muted-foreground hidden sm:inline">{topCat[0]}</span>}
                    <Badge variant="outline" className="text-[10px] font-bold tabular-nums">{city.total}</Badge>
                    <Badge variant="outline" className={`text-[10px] font-bold tabular-nums ${activePct >= 80 ? "border-emerald-300 text-emerald-600" : "border-amber-300 text-amber-600"}`}>
                      {activePct}% active
                    </Badge>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
          {cities.length > 30 && (
            <p className="text-xs text-muted-foreground text-center pt-2">+{cities.length - 30} more cities</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
