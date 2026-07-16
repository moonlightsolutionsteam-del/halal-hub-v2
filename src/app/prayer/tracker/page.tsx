"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { usePrayerLog, BADGE_DEFS, RANKS, getRank, type BadgeId } from "@/lib/use-prayer-log"
import { Flame, ChevronLeft, ChevronRight, Coins, Trophy, TrendingUp, Star, Lock } from "lucide-react"
import Link from "next/link"

type PrayerKey = "fajr" | "dhuhr" | "asr" | "maghrib" | "isha"
const PRAYERS: PrayerKey[] = ["fajr", "dhuhr", "asr", "maghrib", "isha"]
const PRAYER_LABELS: Record<PrayerKey, string> = { fajr: "F", dhuhr: "D", asr: "A", maghrib: "M", isha: "I" }

interface DayCell {
  date: string // yyyy-mm-dd
  day: number
  prayed: Set<PrayerKey>
  total: number // 0-5
}

interface Stats {
  totalPrayers: number
  totalCoins: number
  badges: BadgeId[]
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function isoDate(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`
}

export default function PrayerTrackerPage() {
  const { user } = useAuth()
  const { streak, longestStreak, loading: hookLoading } = usePrayerLog()

  const now = new Date()
  const [viewYear, setViewYear] = useState(now.getFullYear())
  const [viewMonth, setViewMonth] = useState(now.getMonth())
  const [cells, setCells] = useState<DayCell[]>([])
  const [monthLoading, setMonthLoading] = useState(false)
  const [stats, setStats] = useState<Stats | null>(null)

  const rank = getRank(streak)

  const loadMonth = useCallback(async (y: number, m: number) => {
    if (!user?.uid) return
    setMonthLoading(true)
    const supabase = createClient()
    const { data } = await (supabase as any).rpc("get_prayer_month_log", { p_year: y, p_month: m + 1 })

    const byDay = new Map<string, Set<PrayerKey>>()
    for (const row of data ?? []) {
      if (row.status !== "prayed") continue
      if (!byDay.has(row.prayer_date)) byDay.set(row.prayer_date, new Set())
      byDay.get(row.prayer_date)!.add(row.prayer_name as PrayerKey)
    }

    const days = daysInMonth(y, m)
    const result: DayCell[] = []
    for (let d = 1; d <= days; d++) {
      const date = isoDate(y, m, d)
      const prayed = byDay.get(date) ?? new Set<PrayerKey>()
      result.push({ date, day: d, prayed, total: prayed.size })
    }
    setCells(result)
    setMonthLoading(false)
  }, [user?.uid])

  const loadStats = useCallback(async () => {
    if (!user?.uid) return
    const supabase = createClient()
    const { data } = await (supabase as any).rpc("get_prayer_stats")
    if (data) {
      setStats({
        totalPrayers: data.total_prayers ?? 0,
        totalCoins:   data.total_coins   ?? 0,
        badges:       data.badges        ?? [],
      })
    }
  }, [user?.uid])

  useEffect(() => { loadMonth(viewYear, viewMonth) }, [loadMonth, viewYear, viewMonth])
  useEffect(() => { loadStats() }, [loadStats])

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    const canGoNext = viewYear < now.getFullYear() || (viewYear === now.getFullYear() && viewMonth < now.getMonth())
    if (!canGoNext) return
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"]

  // Completion rate for this month (days that have passed)
  const today = isoDate(now.getFullYear(), now.getMonth(), now.getDate())
  const pastCells = cells.filter(c => c.date <= today)
  const completionRate = pastCells.length === 0 ? 0
    : Math.round(pastCells.reduce((sum, c) => sum + c.total, 0) / (pastCells.length * 5) * 100)

  // Calendar first-day offset
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay()

  if (!user?.uid) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <Card className="rounded-[2rem] border-none shadow-sm max-w-sm w-full">
          <CardContent className="p-8 text-center space-y-4">
            <Lock className="h-10 w-10 text-muted-foreground mx-auto" />
            <p className="font-black text-foreground">Sign in to view your tracker</p>
            <Link href="/login">
              <Button className="rounded-full font-bold">Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">

        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/prayer-times" className="text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-3xl font-black text-foreground tracking-tight">Prayer Tracker</h1>
          </div>
          <p className="text-sm text-muted-foreground font-medium pl-7">Your ibadah journey &amp; achievements</p>
        </div>

        {/* Rank + Streak hero */}
        <Card className={cn("rounded-[2rem] border-none shadow-sm", rank.bg)}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Current Rank</p>
                <div className={cn("text-2xl font-black flex items-center gap-2", rank.color)}>
                  <span className="text-3xl">{rank.icon}</span>
                  <span>{rank.name}</span>
                </div>
                {/* Next rank progress */}
                {(() => {
                  const nextRank = RANKS.find(r => r.minStreak > streak)
                  if (!nextRank) return <p className="text-xs text-muted-foreground font-medium">Maximum rank achieved 👑</p>
                  const prev = [...RANKS].reverse().find(r => r.minStreak <= streak)!
                  const progress = ((streak - prev.minStreak) / (nextRank.minStreak - prev.minStreak)) * 100
                  return (
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
                        <span>{streak} days</span>
                        <span>{nextRank.name} at {nextRank.minStreak}d</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden w-48">
                        <div className="h-full rounded-full bg-current transition-all" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  )
                })()}
              </div>
              <div className="text-center">
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-black text-foreground tabular-nums">{streak}</span>
                  <span className="text-base font-bold text-muted-foreground pb-1">day{streak !== 1 ? "s" : ""}</span>
                </div>
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">streak</p>
                {longestStreak > streak && (
                  <p className="text-[10px] text-muted-foreground mt-0.5">Best: {longestStreak}d</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="rounded-[2rem] border-none shadow-sm">
            <CardContent className="p-4 text-center space-y-1">
              <TrendingUp className="h-4 w-4 text-emerald-500 mx-auto" />
              <p className="text-xl font-black text-foreground tabular-nums">{stats?.totalPrayers ?? "—"}</p>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-wide">Prayers</p>
            </CardContent>
          </Card>
          <Card className="rounded-[2rem] border-none shadow-sm">
            <CardContent className="p-4 text-center space-y-1">
              <Coins className="h-4 w-4 text-amber-500 mx-auto" />
              <p className="text-xl font-black text-foreground tabular-nums">{stats?.totalCoins ?? "—"}</p>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-wide">Coins</p>
            </CardContent>
          </Card>
          <Card className="rounded-[2rem] border-none shadow-sm">
            <CardContent className="p-4 text-center space-y-1">
              <Flame className="h-4 w-4 text-orange-500 mx-auto" />
              <p className="text-xl font-black text-foreground tabular-nums">{completionRate}%</p>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-wide">This Month</p>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Calendar Heatmap */}
        <Card className="rounded-[2rem] border-none shadow-sm">
          <CardContent className="p-5 space-y-4">
            {/* Month nav */}
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon" onClick={prevMonth} className="h-7 w-7 rounded-full">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <p className="text-sm font-black text-foreground">{MONTH_NAMES[viewMonth]} {viewYear}</p>
              <Button
                variant="ghost" size="icon" onClick={nextMonth} className="h-7 w-7 rounded-full"
                disabled={viewYear >= now.getFullYear() && viewMonth >= now.getMonth()}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Day-of-week headers */}
            <div className="grid grid-cols-7 gap-1">
              {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
                <div key={d} className="text-center text-[9px] font-black text-muted-foreground/60 uppercase">{d}</div>
              ))}
            </div>

            {/* Calendar grid */}
            {monthLoading ? (
              <div className="h-40 flex items-center justify-center text-sm text-muted-foreground font-medium">Loading…</div>
            ) : (
              <div className="grid grid-cols-7 gap-1">
                {/* Offset blanks */}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`blank-${i}`} />
                ))}
                {cells.map(({ date, day, total }) => {
                  const isFuture = date > today
                  const isToday  = date === today
                  return (
                    <div
                      key={date}
                      title={`${day} — ${total}/5 prayers`}
                      className={cn(
                        "aspect-square rounded-lg flex flex-col items-center justify-center gap-0.5 transition-colors",
                        isFuture  ? "opacity-20" :
                        total === 5 ? "bg-emerald-500 text-white" :
                        total >= 3 ? "bg-emerald-400/60 text-emerald-900 dark:text-emerald-100" :
                        total >= 1 ? "bg-emerald-200/70 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300" :
                        "bg-muted/60 text-muted-foreground/50",
                        isToday && "ring-2 ring-primary ring-offset-1"
                      )}
                    >
                      <span className="text-[9px] font-black leading-none">{day}</span>
                      {!isFuture && total > 0 && (
                        <span className="text-[7px] leading-none opacity-80">{total}/5</span>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            {/* Legend */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-[10px] text-muted-foreground font-medium">Less</span>
              {["bg-muted/60","bg-emerald-200/70","bg-emerald-400/60","bg-emerald-500"].map((cls, i) => (
                <div key={i} className={cn("h-4 w-4 rounded", cls)} />
              ))}
              <span className="text-[10px] text-muted-foreground font-medium">All 5</span>
            </div>
          </CardContent>
        </Card>

        {/* Per-prayer breakdown for current month */}
        {!monthLoading && cells.length > 0 && (
          <Card className="rounded-[2rem] border-none shadow-sm">
            <CardContent className="p-5 space-y-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Prayer Breakdown — {MONTH_NAMES[viewMonth]}</p>
              <div className="space-y-2.5">
                {PRAYERS.map(prayer => {
                  const count = pastCells.filter(c => c.prayed.has(prayer)).length
                  const pct = pastCells.length === 0 ? 0 : Math.round(count / pastCells.length * 100)
                  const label = prayer.charAt(0).toUpperCase() + prayer.slice(1)
                  return (
                    <div key={prayer} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-foreground">{label}</span>
                        <span className="text-muted-foreground tabular-nums">{count}/{pastCells.length} ({pct}%)</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-emerald-500 transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Badges */}
        <Card className="rounded-[2rem] border-none shadow-sm">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-500" />
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Badges &amp; Achievements</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {BADGE_DEFS.map(badge => {
                const earned = stats?.badges.includes(badge.id) ?? false
                return (
                  <div
                    key={badge.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-2xl border transition-all",
                      earned
                        ? "border-transparent bg-emerald-50 dark:bg-emerald-950/30"
                        : "border-dashed border-muted-foreground/20 opacity-50 grayscale"
                    )}
                  >
                    <span className="text-2xl shrink-0">{badge.icon}</span>
                    <div className="min-w-0">
                      <p className={cn("text-xs font-black truncate", earned ? badge.color : "text-muted-foreground")}>{badge.name}</p>
                      <p className="text-[10px] text-muted-foreground leading-snug">{badge.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Rank roadmap */}
        <Card className="rounded-[2rem] border-none shadow-sm">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Rank Roadmap</p>
            </div>
            <div className="space-y-2">
              {RANKS.map((r, i) => {
                const unlocked = streak >= r.minStreak
                const isCurrent = getRank(streak).name === r.name
                return (
                  <div
                    key={r.name}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-2xl transition-all",
                      isCurrent ? cn(r.bg, "ring-1 ring-current/20") : unlocked ? "bg-muted/30" : "opacity-40"
                    )}
                  >
                    <span className="text-xl">{r.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-sm font-black", isCurrent ? r.color : "text-foreground")}>{r.name}</p>
                      <p className="text-[10px] text-muted-foreground">{r.minStreak === 0 ? "Starting rank" : `${r.minStreak}-day streak`}</p>
                    </div>
                    {isCurrent && <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full shrink-0">Current</span>}
                    {unlocked && !isCurrent && <span className="text-[10px] font-black text-emerald-600 shrink-0">✓</span>}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Coin earn guide */}
        <Card className="rounded-[2rem] border-none shadow-sm bg-amber-50/50 dark:bg-amber-950/20">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Coins className="h-4 w-4 text-amber-500" />
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">How to Earn Coins</p>
            </div>
            <div className="space-y-2">
              {[
                { label: "Per prayer marked",        coins: "+10" },
                { label: "All 5 prayers in a day",   coins: "+25 bonus" },
                { label: "7-day streak",              coins: "+50" },
                { label: "30-day streak",             coins: "+200" },
                { label: "100-day streak",            coins: "+500" },
                { label: "365-day streak",            coins: "+2,000" },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-black text-amber-600 tabular-nums">{row.coins}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
