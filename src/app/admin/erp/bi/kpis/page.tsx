"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Building2, Users, Star, MapPin, Heart,
  Calendar, Store, TrendingUp, ShieldCheck,
  Loader2, CheckCircle2,
} from "lucide-react"

type CategoryCount = { category: string | null; count: number }
type CityCount = { city: string | null; country: string | null; count: number }

interface KpiData {
  totalBusinesses: number
  activeBusinesses: number
  verifiedBusinesses: number
  pendingBusinesses: number
  totalUsers: number
  totalReservations: number
  pendingReservations: number
  confirmedReservations: number
  totalCheckIns: number
  totalSaves: number
  topCategories: CategoryCount[]
  topCities: CityCount[]
}

function KpiCard({
  label, value, sub, icon: Icon, color,
}: {
  label: string; value: string | number; sub?: string; icon: React.ElementType; color: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-black tabular-nums">{typeof value === "number" ? value.toLocaleString() : value}</div>
        {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
      </CardContent>
    </Card>
  )
}

export default function PlatformKpisPage() {
  const [data, setData] = React.useState<KpiData | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [refreshed, setRefreshed] = React.useState<Date | null>(null)

  const load = React.useCallback(async () => {
    setLoading(true)
    const supabase = createClient()

    const [bizRes, reservRes, checkInsRes, savesRes, usersRes] = await Promise.all([
      supabase.from("businesses").select("id, status, halal_verified, category, city, country, rating"),
      supabase.from("business_reservations").select("id, status"),
      supabase.from("check_ins").select("id", { count: "exact", head: true }),
      supabase.from("saved_businesses").select("id", { count: "exact", head: true }),
      supabase.from("profiles").select("id", { count: "exact", head: true }),
    ])

    const businesses = bizRes.data ?? []
    const reservations = reservRes.data ?? []

    // Category breakdown
    const catMap: Record<string, number> = {}
    for (const b of businesses) {
      const cat = b.category ?? "Unknown"
      catMap[cat] = (catMap[cat] ?? 0) + 1
    }
    const topCategories = Object.entries(catMap)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8)

    // City breakdown
    const cityMap: Record<string, { city: string | null; country: string | null; count: number }> = {}
    for (const b of businesses) {
      const key = `${b.city ?? ""}|${b.country ?? ""}`
      if (!cityMap[key]) cityMap[key] = { city: b.city, country: b.country, count: 0 }
      cityMap[key].count++
    }
    const topCities = Object.values(cityMap)
      .sort((a, b) => b.count - a.count)
      .slice(0, 8)

    setData({
      totalBusinesses: businesses.length,
      activeBusinesses: businesses.filter(b => b.status === "active").length,
      verifiedBusinesses: businesses.filter(b => b.halal_verified).length,
      pendingBusinesses: businesses.filter(b => b.status === "pending").length,
      totalUsers: usersRes.count ?? 0,
      totalReservations: reservations.length,
      pendingReservations: reservations.filter(r => r.status === "pending").length,
      confirmedReservations: reservations.filter(r => r.status === "confirmed").length,
      totalCheckIns: checkInsRes.count ?? 0,
      totalSaves: savesRes.count ?? 0,
      topCategories,
      topCities,
    })
    setRefreshed(new Date())
    setLoading(false)
  }, [])

  React.useEffect(() => { load() }, [load])

  if (loading) return (
    <div className="flex justify-center py-24">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
  if (!data) return null

  const verifiedRate = data.totalBusinesses ? Math.round((data.verifiedBusinesses / data.totalBusinesses) * 100) : 0
  const activeRate = data.totalBusinesses ? Math.round((data.activeBusinesses / data.totalBusinesses) * 100) : 0

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">Platform KPIs</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Top-line metrics across all platform verticals — live from Supabase.</p>
        </div>
        <div className="text-right">
          <button
            onClick={load}
            className="text-xs font-bold text-primary hover:underline"
          >
            Refresh
          </button>
          {refreshed && (
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Updated {refreshed.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
            </p>
          )}
        </div>
      </div>

      {/* Supply KPIs */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Supply — Business Listings</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard label="Total Listings" value={data.totalBusinesses} sub="All categories" icon={Building2} color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" />
          <KpiCard label="Active Listings" value={data.activeBusinesses} sub={`${activeRate}% of total`} icon={Store} color="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" />
          <KpiCard label="Halal Verified" value={data.verifiedBusinesses} sub={`${verifiedRate}% verified`} icon={ShieldCheck} color="bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400" />
          <KpiCard label="Pending Review" value={data.pendingBusinesses} sub="Awaiting approval" icon={CheckCircle2} color="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" />
        </div>
      </div>

      {/* Demand KPIs */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Demand — User Activity</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard label="Registered Users" value={data.totalUsers} sub="Total profiles" icon={Users} color="bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400" />
          <KpiCard label="Check-ins" value={data.totalCheckIns} sub="All-time" icon={MapPin} color="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" />
          <KpiCard label="Saved Businesses" value={data.totalSaves} sub="Wishlist saves" icon={Heart} color="bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400" />
          <KpiCard label="Reservations" value={data.totalReservations} sub={`${data.pendingReservations} pending`} icon={Calendar} color="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" />
        </div>
      </div>

      {/* Category breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-black">Listings by Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.topCategories.map(cat => {
              const pct = data.totalBusinesses ? Math.round((cat.count / data.totalBusinesses) * 100) : 0
              return (
                <div key={cat.category} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold text-foreground truncate">{cat.category ?? "Unknown"}</span>
                      <span className="text-xs font-black tabular-nums text-muted-foreground ml-2">{cat.count.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-bold tabular-nums shrink-0">{pct}%</Badge>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-black">Listings by City</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.topCities.map((c, i) => {
              const pct = data.totalBusinesses ? Math.round((c.count / data.totalBusinesses) * 100) : 0
              const label = [c.city, c.country].filter(Boolean).join(", ") || "Unknown"
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold text-foreground truncate">{label}</span>
                      <span className="text-xs font-black tabular-nums text-muted-foreground ml-2">{c.count.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-teal-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-bold tabular-nums shrink-0">{pct}%</Badge>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Reservation status */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-black">Reservation Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Pending", value: data.pendingReservations, color: "text-amber-600" },
              { label: "Confirmed", value: data.confirmedReservations, color: "text-emerald-600" },
              { label: "Total All-Time", value: data.totalReservations, color: "text-primary" },
            ].map(item => (
              <div key={item.label} className="text-center p-3 rounded-xl bg-muted/50">
                <p className={`text-2xl font-black tabular-nums ${item.color}`}>{item.value.toLocaleString()}</p>
                <p className="text-xs font-bold text-muted-foreground mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
