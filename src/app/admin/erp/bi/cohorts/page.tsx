"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

type ProfileRow = { created_at: string | null }
type BizRow = { created_at: string | null; status: string | null }

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

function monthLabel(d: Date) { return `${MONTHS[d.getMonth()]} ${d.getFullYear()}` }

export default function CohortsPage() {
  const [profiles, setProfiles] = React.useState<ProfileRow[]>([])
  const [businesses, setBusinesses] = React.useState<BizRow[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from("profiles").select("created_at").order("created_at"),
      supabase.from("businesses").select("created_at, status").order("created_at"),
    ]).then(([p, b]) => {
      setProfiles(p.data ?? [])
      setBusinesses(b.data ?? [])
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  // Build monthly cohort maps
  const userCohort: Record<string, number> = {}
  const bizCohort: Record<string, number> = {}
  const activeBizCohort: Record<string, number> = {}

  for (const p of profiles) {
    if (!p.created_at) continue
    const d = new Date(p.created_at)
    const key = monthLabel(d)
    userCohort[key] = (userCohort[key] ?? 0) + 1
  }
  for (const b of businesses) {
    if (!b.created_at) continue
    const d = new Date(b.created_at)
    const key = monthLabel(d)
    bizCohort[key] = (bizCohort[key] ?? 0) + 1
    if (b.status === "active") activeBizCohort[key] = (activeBizCohort[key] ?? 0) + 1
  }

  // Build last 12 months of labels
  const now = new Date()
  const last12: string[] = []
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    last12.push(monthLabel(d))
  }

  const maxUsers = Math.max(...last12.map(m => userCohort[m] ?? 0), 1)
  const maxBiz = Math.max(...last12.map(m => bizCohort[m] ?? 0), 1)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline">Cohort Analysis</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Monthly user and vendor registration trends over the last 12 months.</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="pt-4 pb-3">
            <p className="text-2xl font-black tabular-nums">{profiles.length.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Total users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3">
            <p className="text-2xl font-black tabular-nums">{businesses.length.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Total businesses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3">
            <p className="text-2xl font-black tabular-nums">
              {userCohort[last12[last12.length - 1]] ?? 0}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">New users this month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-black">Monthly User Signups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-1.5 h-32">
            {last12.map(m => {
              const count = userCohort[m] ?? 0
              const h = Math.round((count / maxUsers) * 100)
              return (
                <div key={m} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] font-bold text-muted-foreground tabular-nums">{count || ""}</span>
                  <div className="w-full rounded-t-sm bg-primary/80" style={{ height: `${Math.max(h, count ? 4 : 0)}%` }} />
                  <span className="text-[8px] text-muted-foreground rotate-[-45deg] origin-top-left translate-y-2 translate-x-1 whitespace-nowrap hidden sm:block">{m.split(" ")[0]}</span>
                </div>
              )
            })}
          </div>
          <div className="flex justify-between text-[9px] text-muted-foreground mt-6 sm:mt-2">
            <span>{last12[0]}</span><span>{last12[last12.length - 1]}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-black">Monthly Business Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-1.5 h-32">
            {last12.map(m => {
              const total = bizCohort[m] ?? 0
              const active = activeBizCohort[m] ?? 0
              const h = Math.round((total / maxBiz) * 100)
              return (
                <div key={m} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] font-bold text-muted-foreground tabular-nums">{total || ""}</span>
                  <div className="w-full rounded-t-sm overflow-hidden flex flex-col-reverse" style={{ height: `${Math.max(h, total ? 4 : 0)}%` }}>
                    <div className="w-full bg-emerald-500" style={{ height: total ? `${Math.round((active / total) * 100)}%` : "0%" }} />
                    <div className="w-full bg-muted flex-1" />
                  </div>
                  <span className="text-[8px] text-muted-foreground rotate-[-45deg] origin-top-left translate-y-2 translate-x-1 whitespace-nowrap hidden sm:block">{m.split(" ")[0]}</span>
                </div>
              )
            })}
          </div>
          <div className="flex justify-between text-[9px] text-muted-foreground mt-6 sm:mt-2">
            <span>{last12[0]}</span><span>{last12[last12.length - 1]}</span>
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-muted inline-block" />Pending</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-emerald-500 inline-block" />Active</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
