"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Moon, Coins, Utensils, Church, Heart, BookOpen,
  ShoppingBag, Clock, Zap,
} from "lucide-react"

type Settings = {
  enabled: boolean
  banner_title: string
  banner_subtitle: string
  iftar_cta_text: string
  coin_multiplier: number
  city: string
  start_date: string
  end_date: string
}

type ContentItem = {
  id: string
  section: string
  title: string
  description: string | null
}

// Approximate Iftar/Suhoor offsets from sunset/fajr for Indian cities
// Format: [suhoor_hour, suhoor_min, iftar_hour, iftar_min]
const CITY_TIMES: Record<string, [number, number, number, number]> = {
  Mumbai:    [4, 45, 18, 55],
  Delhi:     [4, 15, 19, 10],
  Hyderabad: [4, 30, 18, 50],
  Chennai:   [4, 30, 18, 40],
  Kolkata:   [3, 55, 18, 20],
  Bangalore: [4, 35, 18, 45],
  Pune:      [4, 40, 18, 52],
  Lucknow:   [4, 10, 19, 0],
}

const SECTION_META: Record<string, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  iftar_deals:     { label: "Iftar Deals",    icon: Utensils,    color: "text-amber-600",   bg: "bg-amber-50 dark:bg-amber-950/30" },
  tarawih_mosques: { label: "Tarawih",        icon: Church,      color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
  charity:         { label: "Charity & Zakat",icon: Heart,       color: "text-red-500",     bg: "bg-red-50 dark:bg-red-950/30" },
  recipes:         { label: "Recipes",        icon: BookOpen,    color: "text-blue-600",    bg: "bg-blue-50 dark:bg-blue-950/30" },
  products:        { label: "Products",       icon: ShoppingBag, color: "text-violet-600",  bg: "bg-violet-50 dark:bg-violet-950/30" },
}

function useCountdown(target: Date) {
  const [diff, setDiff] = useState(target.getTime() - Date.now())
  useEffect(() => {
    const id = setInterval(() => setDiff(target.getTime() - Date.now()), 1000)
    return () => clearInterval(id)
  }, [target])
  const total = Math.max(0, diff)
  const h = Math.floor(total / 3_600_000)
  const m = Math.floor((total % 3_600_000) / 60_000)
  const s = Math.floor((total % 60_000) / 1000)
  return { h, m, s, passed: diff <= 0 }
}

function CountdownBlock({ label, target }: { label: string; target: Date }) {
  const { h, m, s, passed } = useCountdown(target)
  return (
    <div className="text-center">
      <p className="text-xs font-bold text-emerald-200 mb-1 uppercase tracking-widest">{label}</p>
      {passed ? (
        <p className="text-lg font-black text-white">Passed</p>
      ) : (
        <p className="text-3xl font-black text-white tabular-nums">
          {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
        </p>
      )}
    </div>
  )
}

function buildTodayTime(hour: number, min: number) {
  const d = new Date()
  d.setHours(hour, min, 0, 0)
  if (d.getTime() < Date.now()) d.setDate(d.getDate() + 1)
  return d
}

export default function RamadanPage() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [content, setContent] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from("ramadan_settings").select("*").eq("id", 1).single(),
      supabase.from("ramadan_content").select("id, section, title, description").eq("active", true).order("section").order("sort_order"),
    ]).then(([settingsRes, contentRes]) => {
      setSettings(settingsRes.data)
      setContent(contentRes.data ?? [])
      setLoading(false)
    })
  }, [])

  const times = CITY_TIMES[settings?.city ?? "Mumbai"] ?? CITY_TIMES["Mumbai"]
  const suhoorTarget = buildTodayTime(times[0], times[1])
  const iftarTarget  = buildTodayTime(times[2], times[3])

  const grouped = Object.keys(SECTION_META).map(sec => ({
    key: sec,
    items: content.filter(c => c.section === sec),
  })).filter(g => g.items.length > 0)

  const now = new Date()
  const isLive = settings
    ? settings.enabled && new Date(settings.start_date) <= now && new Date(settings.end_date) >= now
    : false

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-lg mx-auto">

      {/* Hero banner */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-900 p-6 text-white space-y-4 overflow-hidden relative">
        <div className="absolute top-4 right-4 opacity-10">
          <Moon className="h-24 w-24" />
        </div>
        <div className="flex items-center gap-2">
          <Moon className="h-5 w-5 text-emerald-300" />
          {isLive && (
            <Badge className="bg-white/20 text-white border-white/30 text-[10px] font-bold">
              <Zap className="h-2.5 w-2.5 mr-1" /> ×{settings?.coin_multiplier} Coins Active
            </Badge>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-black">
            {loading ? "Ramadan Mubarak" : (settings?.banner_title ?? "Ramadan Mubarak")}
          </h1>
          <p className="text-sm text-emerald-200 mt-1">
            {loading ? "" : (settings?.banner_subtitle ?? "")}
          </p>
        </div>
        <Link href="/explore?q=iftar">
          <button className="text-sm font-bold bg-white/20 hover:bg-white/30 px-5 py-2.5 rounded-full transition-colors">
            {settings?.iftar_cta_text ?? "Find Iftar near you"}
          </button>
        </Link>
      </div>

      {/* Suhoor / Iftar countdown */}
      {!loading && (
        <Card className="rounded-2xl border-none shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-5">
            <div className="flex items-center justify-between gap-3 mb-3">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {settings?.city ?? "Mumbai"} Prayer Times
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <CountdownBlock label="Suhoor ends" target={suhoorTarget} />
              <CountdownBlock label="Iftar begins" target={iftarTarget} />
            </div>
            <p className="text-[10px] text-slate-500 text-center mt-3">
              Approximate times · Verify with local mosque
            </p>
          </div>
        </Card>
      )}

      {/* Coin multiplier banner */}
      {isLive && (
        <Card className="rounded-2xl border-none shadow-sm bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0">
              <Coins className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-black text-amber-700 dark:text-amber-400">
                Ramadan Bonus — ×{settings?.coin_multiplier} Halal Coins
              </p>
              <p className="text-xs text-amber-600 dark:text-amber-500">
                Double coins on reviews, posts, and daily logins this Ramadan
              </p>
            </div>
            <Link href="/account/wallet" className="shrink-0">
              <Button size="sm" className="rounded-xl h-8 text-xs font-bold bg-amber-600 hover:bg-amber-700">
                My Wallet
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Content sections */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : grouped.length === 0 ? (
        <Card className="rounded-2xl border-none shadow-sm">
          <CardContent className="p-8 text-center text-muted-foreground">
            <Moon className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">Ramadan content coming soon</p>
            <p className="text-xs mt-1">Check back closer to Ramadan</p>
          </CardContent>
        </Card>
      ) : (
        grouped.map(({ key, items }) => {
          const meta = SECTION_META[key]
          const Icon = meta.icon
          return (
            <div key={key} className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <Icon className={`h-4 w-4 ${meta.color}`} />
                <p className="text-sm font-black text-foreground">{meta.label}</p>
              </div>
              <div className="space-y-2">
                {items.map(item => (
                  <Card key={item.id} className="rounded-2xl border-none shadow-sm">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${meta.bg}`}>
                        <Icon className={`h-5 w-5 ${meta.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-foreground">{item.title}</p>
                        {item.description && (
                          <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                        )}
                      </div>
                      <Button size="sm" variant="outline" className="rounded-xl h-8 text-xs font-bold shrink-0">
                        View
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        })
      )}

      <p className="text-xs text-center text-muted-foreground pb-2">
        Ramadan Kareem from HalalHub · May Allah accept your fasts
      </p>
    </div>
  )
}
