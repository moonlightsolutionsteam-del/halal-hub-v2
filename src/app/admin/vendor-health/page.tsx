// @ts-nocheck
"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Loader2, Search, HeartPulse, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react"

type Vendor = {
  id: string
  name: string
  category: string | null
  city: string | null
  status: string | null
  subscription_plan: string | null
  rating: number | null
  review_count: number | null
  halal_verified: boolean | null
  website: string | null
  whatsapp: string | null
  updated_at: string | null
  created_at: string
}

function computeHealth(v: Vendor): { score: number; breakdown: Record<string, number> } {
  // 5 dimensions × 20pts each = 100
  const credits = v.subscription_plan && v.subscription_plan !== "free" ? 20 : 0
  const featureUse = [v.website, v.whatsapp, v.halal_verified].filter(Boolean).length >= 2 ? 20 : [v.website, v.whatsapp, v.halal_verified].filter(Boolean).length * 7
  const reviews = Math.min(20, (v.review_count ?? 0) * 2)
  // WhatsApp CTR: use whatsapp presence as proxy (no click data yet)
  const whatsappCtr = v.whatsapp ? 20 : 0
  // Last login: use updated_at as proxy for recent activity
  const daysSince = v.updated_at
    ? (Date.now() - new Date(v.updated_at).getTime()) / 86_400_000
    : 999
  const lastLogin = daysSince < 7 ? 20 : daysSince < 30 ? 14 : daysSince < 90 ? 7 : 0
  const score = credits + featureUse + reviews + whatsappCtr + lastLogin
  return {
    score,
    breakdown: { credits, featureUse, reviews, whatsappCtr, lastLogin },
  }
}

function HealthBadge({ score }: { score: number }) {
  if (score >= 70) return <Badge className="bg-emerald-500/15 text-emerald-600 border-emerald-200 font-bold">Healthy</Badge>
  if (score >= 40) return <Badge className="bg-amber-500/15 text-amber-600 border-amber-200 font-bold">At Risk</Badge>
  return <Badge className="bg-red-500/15 text-red-600 border-red-200 font-bold">Critical</Badge>
}

function scoreColor(score: number) {
  if (score >= 70) return "bg-emerald-500"
  if (score >= 40) return "bg-amber-500"
  return "bg-red-500"
}

export default function VendorHealthPage() {
  const [vendors, setVendors] = React.useState<Vendor[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")

  React.useEffect(() => {
    const supabase = createClient()
    supabase
      .from("businesses")
      .select("id, name, category, city, status, subscription_plan, rating, review_count, halal_verified, website, whatsapp, updated_at, created_at")
      .eq("status", "active")
      .limit(300)
      .then(({ data }) => {
        setVendors(data ?? [])
        setLoading(false)
      })
  }, [])

  const scored = React.useMemo(
    () =>
      vendors
        .map(v => ({ ...v, health: computeHealth(v) }))
        .sort((a, b) => a.health.score - b.health.score),
    [vendors]
  )

  const filtered = scored.filter(v => {
    const q = search.toLowerCase()
    return !q || (v.name ?? "").toLowerCase().includes(q) || (v.city ?? "").toLowerCase().includes(q) || (v.category ?? "").toLowerCase().includes(q)
  })

  const critical = scored.filter(v => v.health.score < 40)
  const atRisk = scored.filter(v => v.health.score >= 40 && v.health.score < 70)
  const healthy = scored.filter(v => v.health.score >= 70)
  const avgScore = scored.length ? Math.round(scored.reduce((a, b) => a + b.health.score, 0) / scored.length) : 0

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
          <HeartPulse className="h-6 w-6 text-primary" /> Vendor Health Score
        </h1>
        <p className="text-sm text-muted-foreground font-medium">
          5-dimension health score per vendor. Score &lt; 40 triggers intervention alert.
        </p>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Avg Platform Score", value: `${avgScore}/100`, icon: TrendingUp, color: "text-primary" },
          { label: "Healthy (≥70)", value: healthy.length, icon: CheckCircle2, color: "text-emerald-600" },
          { label: "At Risk (40–69)", value: atRisk.length, icon: AlertTriangle, color: "text-amber-600" },
          { label: "Critical (<40)", value: critical.length, icon: AlertTriangle, color: "text-red-600" },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="rounded-2xl border-none shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-xl bg-muted ${color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">{label}</p>
                <p className="text-xl font-black text-foreground">{value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {critical.length > 0 && (
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-50 border border-red-100 dark:bg-red-950/20 dark:border-red-900/30">
          <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-black text-red-700 dark:text-red-400">
              {critical.length} vendor{critical.length > 1 ? "s" : ""} need immediate intervention
            </p>
            <p className="text-xs text-red-600 dark:text-red-500 mt-0.5">
              {critical.slice(0, 3).map(v => v.name).join(", ")}{critical.length > 3 ? ` +${critical.length - 3} more` : ""}
            </p>
          </div>
        </div>
      )}

      {/* Dimension legend */}
      <div className="flex flex-wrap gap-2 text-xs">
        {["Credits (20pt)", "Feature Use (20pt)", "Reviews (20pt)", "WhatsApp (20pt)", "Last Active (20pt)"].map(d => (
          <span key={d} className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium">{d}</span>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search vendors..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9 h-11 rounded-xl"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="space-y-3">
          {filtered.map(v => (
            <Card key={v.id} className={`rounded-2xl border-none shadow-sm ${v.health.score < 40 ? "ring-1 ring-red-200 dark:ring-red-900/40" : ""}`}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-black text-sm text-foreground truncate">{v.name}</p>
                    <p className="text-xs text-muted-foreground">{[v.category, v.city].filter(Boolean).join(" · ")}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-lg font-black text-foreground">{v.health.score}</span>
                    <HealthBadge score={v.health.score} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Progress value={v.health.score} className={`h-2 [&>div]:${scoreColor(v.health.score)}`} />
                  <div className="grid grid-cols-5 gap-1 text-center">
                    {Object.entries(v.health.breakdown).map(([key, pts]) => (
                      <div key={key} className="space-y-0.5">
                        <div className={`h-1 rounded-full ${pts > 0 ? "bg-primary/60" : "bg-muted"}`} />
                        <p className="text-[9px] text-muted-foreground font-bold">{pts}pt</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
