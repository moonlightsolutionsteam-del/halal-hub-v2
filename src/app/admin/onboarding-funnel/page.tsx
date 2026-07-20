// @ts-nocheck
"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Target, Clock, FileCheck, TrendingUp, Users, CreditCard, AlertTriangle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

type FunnelStats = {
  totalSubmitted: number
  totalApproved: number
  totalRejected: number
  totalPending: number
  avgDaysToLive: number | null
  docCompletionRate: number
  firstSubmitPassRate: number
  avgDaysToFirstCredit: number | null
  stageDropoff: { stage: string; count: number; pct: number }[]
}

const TARGETS = {
  avgDaysToLive: 5,
  docCompletionRate: 85,
  firstSubmitPassRate: 70,
  avgDaysToFirstCredit: 14,
  stageDropoff: 20,
}

function KpiCard({
  label, value, target, unit = "", icon: Icon, description, warning
}: {
  label: string
  value: number | null
  target: number
  unit?: string
  icon: React.ElementType
  description: string
  warning?: boolean
}) {
  const met = value !== null && (warning ? value <= target : value >= target)
  const display = value === null ? "—" : `${Math.round(value)}${unit}`

  return (
    <Card className="rounded-2xl border-none shadow-sm">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-xl bg-muted">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <Badge className={met
            ? "bg-emerald-500/15 text-emerald-600 border-emerald-200"
            : "bg-amber-500/15 text-amber-600 border-amber-200"
          }>
            {met ? "On Target" : "Below Target"}
          </Badge>
        </div>
        <div>
          <p className="text-3xl font-black text-foreground">{display}</p>
          <p className="text-xs font-bold text-muted-foreground mt-0.5">{label}</p>
        </div>
        <div className="space-y-1">
          <Progress
            value={value === null ? 0 : warning
              ? Math.max(0, 100 - (value / target) * 100)
              : Math.min(100, (value / target) * 100)}
            className={`h-1.5 ${met ? "[&>div]:bg-emerald-500" : "[&>div]:bg-amber-500"}`}
          />
          <p className="text-[10px] text-muted-foreground">Target: {target}{unit} · {description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function OnboardingFunnelPage() {
  const [stats, setStats] = React.useState<FunnelStats | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const supabase = createClient()
    supabase
      .from("businesses")
      .select("id, status, created_at, updated_at, compliance_docs, subscription_plan")
      .then(({ data }) => {
        if (!data) { setLoading(false); return }

        const total = data.length
        const approved = data.filter(b => b.status === "active").length
        const rejected = data.filter(b => b.status === "rejected").length
        const pending = data.filter(b => b.status === "pending").length

        // Avg days to live: active businesses, days from created_at to updated_at (approval proxy)
        const activeTimes = data
          .filter(b => b.status === "active" && b.created_at && b.updated_at)
          .map(b => (new Date(b.updated_at).getTime() - new Date(b.created_at).getTime()) / 86_400_000)
          .filter(d => d > 0 && d < 365)
        const avgDaysToLive = activeTimes.length ? activeTimes.reduce((a, b) => a + b, 0) / activeTimes.length : null

        // Doc completion: businesses with compliance_docs containing at least 1 entry
        const withDocs = data.filter(b => {
          if (!b.compliance_docs) return false
          const docs = b.compliance_docs as Record<string, unknown>
          return Object.keys(docs).length > 0
        }).length
        const docCompletionRate = total > 0 ? (withDocs / total) * 100 : 0

        // First submit pass rate: approved / (approved + rejected)
        const decided = approved + rejected
        const firstSubmitPassRate = decided > 0 ? (approved / decided) * 100 : 0

        // Avg days to first credit: proxy — businesses with subscription_plan !== 'free'
        const paidCredit = data
          .filter(b => b.subscription_plan && b.subscription_plan !== "free" && b.created_at)
          .map(b => (new Date(b.updated_at ?? b.created_at).getTime() - new Date(b.created_at).getTime()) / 86_400_000)
          .filter(d => d >= 0 && d < 365)
        const avgDaysToFirstCredit = paidCredit.length ? paidCredit.reduce((a, b) => a + b, 0) / paidCredit.length : null

        // Stage drop-off
        const stageDropoff = [
          { stage: "Submitted", count: total, pct: 100 },
          { stage: "Docs Complete", count: withDocs, pct: total > 0 ? (withDocs / total) * 100 : 0 },
          { stage: "Admin Review", count: approved + rejected, pct: total > 0 ? ((approved + rejected) / total) * 100 : 0 },
          { stage: "Approved & Live", count: approved, pct: total > 0 ? (approved / total) * 100 : 0 },
          { stage: "Paid Credits", count: paidCredit.length, pct: total > 0 ? (paidCredit.length / total) * 100 : 0 },
        ]

        setStats({
          totalSubmitted: total,
          totalApproved: approved,
          totalRejected: rejected,
          totalPending: pending,
          avgDaysToLive,
          docCompletionRate,
          firstSubmitPassRate,
          avgDaysToFirstCredit,
          stageDropoff,
        })
        setLoading(false)
      })
  }, [])

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
          <Target className="h-6 w-6 text-primary" /> Onboarding Funnel KPIs
        </h1>
        <p className="text-sm text-muted-foreground font-medium">
          Blueprint targets: 5-day time-to-live, 85% doc completion, 70% pass rate, 14-day first credit, &lt;20% stage drop-off.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : stats ? (
        <>
          {/* Summary strip */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Submitted", value: stats.totalSubmitted, color: "text-foreground" },
              { label: "Approved", value: stats.totalApproved, color: "text-emerald-600" },
              { label: "Pending", value: stats.totalPending, color: "text-amber-600" },
              { label: "Rejected", value: stats.totalRejected, color: "text-red-600" },
            ].map(({ label, value, color }) => (
              <Card key={label} className="rounded-2xl border-none shadow-sm">
                <CardContent className="p-4 text-center">
                  <p className={`text-2xl font-black ${color}`}>{value}</p>
                  <p className="text-xs text-muted-foreground font-medium mt-0.5">{label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <KpiCard
              label="Avg Days to Live"
              value={stats.avgDaysToLive}
              target={TARGETS.avgDaysToLive}
              unit=" days"
              icon={Clock}
              description="Target ≤5 days from submission to approval"
              warning
            />
            <KpiCard
              label="Document Completion Rate"
              value={stats.docCompletionRate}
              target={TARGETS.docCompletionRate}
              unit="%"
              icon={FileCheck}
              description="Target 85% of vendors upload compliance docs"
            />
            <KpiCard
              label="First-Submission Pass Rate"
              value={stats.firstSubmitPassRate}
              target={TARGETS.firstSubmitPassRate}
              unit="%"
              icon={TrendingUp}
              description="Target 70% of submissions approved first time"
            />
            <KpiCard
              label="Days to First Credit Purchase"
              value={stats.avgDaysToFirstCredit}
              target={TARGETS.avgDaysToFirstCredit}
              unit=" days"
              icon={CreditCard}
              description="Target ≤14 days from go-live to first credit buy"
              warning
            />
          </div>

          {/* Funnel drop-off */}
          <Card className="rounded-2xl border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-black">Stage Drop-off</CardTitle>
              <CardDescription>Each stage should retain &gt;80% of the previous stage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {stats.stageDropoff.map((s, i) => {
                const dropoff = i === 0 ? 0 : stats.stageDropoff[i - 1].pct - s.pct
                const isAlert = dropoff > TARGETS.stageDropoff
                return (
                  <div key={s.stage} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-foreground">{s.stage}</span>
                        {isAlert && (
                          <div className="flex items-center gap-1 text-red-500">
                            <AlertTriangle className="h-3 w-3" />
                            <span className="text-[10px] font-bold">−{Math.round(dropoff)}% drop</span>
                          </div>
                        )}
                      </div>
                      <span className="text-xs font-bold text-muted-foreground">{s.count} ({Math.round(s.pct)}%)</span>
                    </div>
                    <Progress
                      value={s.pct}
                      className={`h-2 ${isAlert ? "[&>div]:bg-red-500" : "[&>div]:bg-primary"}`}
                    />
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </>
      ) : (
        <p className="text-muted-foreground text-sm">No data available.</p>
      )}
    </div>
  )
}
