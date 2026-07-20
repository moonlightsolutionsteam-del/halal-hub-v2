// @ts-nocheck
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Coins, Search, Loader2, Trophy, TrendingUp, Users, Star, Zap,
  ChevronUp, ChevronDown, AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

type UserLevel = {
  user_id: string
  level: number
  level_name: string | null
  current_balance: number
  lifetime_coins_earned: number
  updated_at: string | null
  profile: { name: string | null; email: string | null; avatar_url: string | null } | null
}

type CoinEntry = {
  id: string
  user_id: string
  amount: number
  action_type: string
  description: string | null
  balance_after: number
  created_at: string
  profile: { name: string | null } | null
}

const LEVEL_COLORS: Record<number, string> = {
  5: "bg-amber-100 text-amber-700 border-amber-200",
  4: "bg-violet-100 text-violet-700 border-violet-200",
  3: "bg-blue-100 text-blue-700 border-blue-200",
  2: "bg-emerald-100 text-emerald-700 border-emerald-200",
  1: "bg-muted text-muted-foreground border-border",
}

const ACTION_COLORS: Record<string, string> = {
  post_published:         "bg-blue-100 text-blue-700",
  review_written:         "bg-emerald-100 text-emerald-700",
  daily_login:            "bg-amber-100 text-amber-700",
  review_photo:           "bg-teal-100 text-teal-700",
  review_video:           "bg-violet-100 text-violet-700",
  profile_completed:      "bg-pink-100 text-pink-700",
  referral_consumer:      "bg-orange-100 text-orange-700",
  referral_business:      "bg-red-100 text-red-700",
  referral_creator:       "bg-rose-100 text-rose-700",
  first_order:            "bg-lime-100 text-lime-700",
  order_delivered:        "bg-green-100 text-green-700",
  streak_7day:            "bg-cyan-100 text-cyan-700",
  streak_30day:           "bg-indigo-100 text-indigo-700",
  streak_90day:           "bg-purple-100 text-purple-700",
}

export default function AdminGamificationPage() {
  const [levels, setLevels] = useState<UserLevel[]>([])
  const [ledger, setLedger] = useState<CoinEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [sortField, setSortField] = useState<"current_balance" | "lifetime_coins_earned" | "level">("current_balance")
  const [sortDir, setSortDir] = useState<"desc" | "asc">("desc")

  useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase
        .from("user_levels")
        .select("*, profile:profiles!user_levels_user_id_fkey(name, email, avatar_url)")
        .order("current_balance", { ascending: false })
        .limit(200),
      supabase
        .from("coin_ledger")
        .select("id, user_id, amount, action_type, description, balance_after, created_at, profile:profiles!coin_ledger_user_id_fkey(name)")
        .order("created_at", { ascending: false })
        .limit(300),
    ]).then(([levelsRes, ledgerRes]) => {
      setLevels(levelsRes.data ?? [])
      setLedger(ledgerRes.data ?? [])
      setLoading(false)
    })
  }, [])

  function toggleSort(field: typeof sortField) {
    if (sortField === field) {
      setSortDir(d => d === "desc" ? "asc" : "desc")
    } else {
      setSortField(field)
      setSortDir("desc")
    }
  }

  const filtered = levels
    .filter(u => {
      const q = search.toLowerCase()
      return !q ||
        (u.profile?.name ?? "").toLowerCase().includes(q) ||
        (u.profile?.email ?? "").toLowerCase().includes(q)
    })
    .sort((a, b) => {
      const av = a[sortField] ?? 0
      const bv = b[sortField] ?? 0
      return sortDir === "desc" ? (bv as number) - (av as number) : (av as number) - (bv as number)
    })

  // Stats
  const totalCoinsInCirculation = levels.reduce((s, u) => s + (u.current_balance ?? 0), 0)
  const totalLifetime = levels.reduce((s, u) => s + (u.lifetime_coins_earned ?? 0), 0)
  const champions = levels.filter(u => u.level === 5).length
  const activeEarners = levels.filter(u => (u.current_balance ?? 0) > 0).length

  const levelDist = [5, 4, 3, 2, 1].map(l => ({
    level: l,
    name: levels.find(u => u.level === l)?.level_name ?? ["", "Explorer", "Community Member", "Trusted Reviewer", "HalalHub Regular", "Community Champion"][l],
    count: levels.filter(u => u.level === l).length,
  }))

  const SortButton = ({ field, label }: { field: typeof sortField; label: string }) => (
    <button
      onClick={() => toggleSort(field)}
      className="flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
    >
      {label}
      {sortField === field
        ? sortDir === "desc"
          ? <ChevronDown className="h-3 w-3" />
          : <ChevronUp className="h-3 w-3" />
        : <ChevronDown className="h-3 w-3 opacity-30" />
      }
    </button>
  )

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-foreground">Gamification Engine</h1>
          <p className="text-sm text-muted-foreground font-medium">
            Halal Coins, user levels, and earning history across the platform.
          </p>
        </div>
        <Link href="/admin/gamification/abuse">
          <button className="flex items-center gap-1.5 text-xs font-bold text-amber-600 border border-amber-200 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/20 dark:border-amber-900/30 px-3 py-2 rounded-xl transition-colors">
            <AlertTriangle className="h-3.5 w-3.5" /> Anti-Abuse & Seasons
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Coins in Circulation", value: totalCoinsInCirculation.toLocaleString(), icon: Coins, color: "text-amber-600" },
          { label: "Lifetime Earned",       value: totalLifetime.toLocaleString(),           icon: TrendingUp, color: "text-emerald-600" },
          { label: "Active Earners",         value: activeEarners,                            icon: Users, color: "text-blue-600" },
          { label: "Champions (Lv 5)",       value: champions,                                icon: Trophy, color: "text-violet-600" },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="rounded-2xl border-none shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`h-9 w-9 rounded-xl flex items-center justify-center bg-muted ${color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className={`text-lg font-black ${color}`}>{value}</p>
                <p className="text-xs text-muted-foreground font-medium">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Level distribution */}
      <Card className="rounded-2xl border-none shadow-sm">
        <CardContent className="p-5">
          <p className="text-sm font-black text-foreground mb-3">Level Distribution</p>
          <div className="space-y-2">
            {levelDist.map(({ level, name, count }) => {
              const pct = levels.length ? Math.round((count / levels.length) * 100) : 0
              return (
                <div key={level} className="flex items-center gap-3">
                  <Badge className={`text-[10px] px-2 py-0.5 border shrink-0 w-36 justify-center ${LEVEL_COLORS[level]}`}>
                    Lv {level} · {name}
                  </Badge>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${level === 5 ? "bg-amber-500" : level === 4 ? "bg-violet-500" : level === 3 ? "bg-blue-500" : level === 2 ? "bg-emerald-500" : "bg-muted-foreground/30"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-muted-foreground shrink-0 w-10 text-right">{count}</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="leaderboard">
        <TabsList className="rounded-full h-11">
          <TabsTrigger value="leaderboard" className="rounded-full gap-1.5">
            <Star className="h-3.5 w-3.5" /> Leaderboard
          </TabsTrigger>
          <TabsTrigger value="ledger" className="rounded-full gap-1.5">
            <Zap className="h-3.5 w-3.5" /> Coin History
          </TabsTrigger>
        </TabsList>

        {/* Leaderboard */}
        <TabsContent value="leaderboard" className="mt-4 space-y-3">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 h-11 rounded-xl"
              />
            </div>
            <div className="flex items-center gap-2 px-3 bg-muted rounded-xl text-xs">
              <span className="text-muted-foreground font-medium">Sort:</span>
              <SortButton field="current_balance" label="Balance" />
              <SortButton field="lifetime_coins_earned" label="Lifetime" />
              <SortButton field="level" label="Level" />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Coins className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No users yet. Coins are earned by posting and reviewing.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((u, i) => (
                <Card key={u.user_id} className="rounded-2xl border-none shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      {/* Rank */}
                      <span className={`text-sm font-black shrink-0 w-6 text-center ${i < 3 ? "text-amber-500" : "text-muted-foreground/50"}`}>
                        {i + 1}
                      </span>
                      {/* Avatar */}
                      <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                        {u.profile?.avatar_url
                          ? <img src={u.profile.avatar_url} alt="" className="h-full w-full object-cover" />
                          : <span className="text-sm font-black text-muted-foreground">{(u.profile?.name ?? "?")[0]?.toUpperCase()}</span>
                        }
                      </div>
                      {/* User info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-foreground truncate">{u.profile?.name ?? u.profile?.email ?? "Unknown"}</p>
                        <p className="text-xs text-muted-foreground">{u.profile?.email ?? u.user_id.slice(0, 8)}</p>
                      </div>
                      {/* Level badge */}
                      <Badge className={`text-[10px] px-2 py-0.5 border shrink-0 ${LEVEL_COLORS[u.level ?? 1]}`}>
                        Lv {u.level} · {u.level_name ?? "Explorer"}
                      </Badge>
                      {/* Coins */}
                      <div className="text-right shrink-0">
                        <p className="text-base font-black text-amber-600">{(u.current_balance ?? 0).toLocaleString()} <span className="text-xs font-medium">HC</span></p>
                        <p className="text-xs text-muted-foreground">{(u.lifetime_coins_earned ?? 0).toLocaleString()} lifetime</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Coin History */}
        <TabsContent value="ledger" className="mt-4 space-y-2">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : ledger.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Zap className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No coin transactions yet.</p>
            </div>
          ) : (
            <>
              <p className="text-xs text-muted-foreground font-medium px-1">Last {ledger.length} transactions</p>
              {ledger.map(e => (
                <Card key={e.id} className="rounded-2xl border-none shadow-sm">
                  <CardContent className="p-3.5 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                      <Coins className="h-3.5 w-3.5 text-amber-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-foreground">{e.profile?.name ?? "Unknown"}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${ACTION_COLORS[e.action_type] ?? "bg-muted text-muted-foreground"}`}>
                          {e.action_type.replace(/_/g, " ")}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{e.description}</p>
                      <p className="text-xs text-muted-foreground/70">
                        {new Date(e.created_at).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-black text-amber-600">+{e.amount} HC</p>
                      <p className="text-xs text-muted-foreground">bal: {e.balance_after}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
