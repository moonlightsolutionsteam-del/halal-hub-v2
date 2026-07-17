"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CircleDollarSign, TrendingUp, Users, Target, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"

type Donation = { id: string; amount: number; purpose: string | null; status: string; user_id: string | null; created_at: string | null }

function fmt(n: number) { return `₹${n.toLocaleString("en-IN")}` }
function fmtDate(d: string | null) {
  if (!d) return "—"
  try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) } catch { return d }
}

export default function MosqueDonationsPage() {
  const { user, loading: authLoading } = useAuth()
  const [donations, setDonations] = React.useState<Donation[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (authLoading || !user?.uid) return
    const supabase = createClient()
    supabase.from("businesses").select("id").eq("owner_id", user.uid).limit(1).maybeSingle()
      .then(({ data: biz }) => {
        if (!biz) { setLoading(false); return }
        supabase.from("business_donations").select("id, amount, purpose, status, user_id, created_at")
          .eq("business_id", biz.id).order("created_at", { ascending: false }).limit(100)
          .then(({ data }) => { setDonations(data ?? []); setLoading(false) })
      })
  }, [user?.uid, authLoading])

  const totalMonth = donations.filter(d => {
    if (!d.created_at) return false
    const date = new Date(d.created_at)
    const now = new Date()
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  }).reduce((s, d) => s + d.amount, 0)

  const totalAll = donations.reduce((s, d) => s + d.amount, 0)
  const campaigns = [...new Set(donations.map(d => d.purpose).filter(Boolean))]
  const uniqueDonors = new Set(donations.map(d => d.user_id).filter(Boolean)).size

  const kpis = [
    { label: "Total This Month", value: fmt(totalMonth), icon: CircleDollarSign },
    { label: "Total All Time", value: fmt(totalAll), icon: TrendingUp },
    { label: "Unique Donors", value: String(uniqueDonors), icon: Users },
    { label: "Active Campaigns", value: String(campaigns.length), icon: Target },
  ]

  if (loading || authLoading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Donations</h1>
        <p className="text-sm font-bold text-muted-foreground">Track contributions from your community.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="rounded-[2rem] border-none shadow-soft">
            <CardContent className="p-5 space-y-2">
              <kpi.icon className="h-5 w-5 text-teal-600" />
              <p className="text-xl font-black text-foreground">{kpi.value}</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-[2rem] border-none shadow-soft">
        <CardHeader><CardTitle className="font-black">Donation History</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Purpose / Campaign</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No donations received yet.</TableCell></TableRow>
              ) : donations.map(d => (
                <TableRow key={d.id}>
                  <TableCell className="font-medium">{d.purpose ?? "General Donation"}</TableCell>
                  <TableCell className="font-black tabular-nums">{fmt(d.amount)}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{fmtDate(d.created_at)}</TableCell>
                  <TableCell>
                    <Badge variant={d.status === "completed" ? "secondary" : d.status === "failed" ? "destructive" : "outline"}>
                      {d.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
