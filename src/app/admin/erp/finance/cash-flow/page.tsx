"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, TrendingUp, TrendingDown } from "lucide-react"

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

function fmt(n: number) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`
  return `₹${n.toFixed(0)}`
}

type InvRow = { amount: number | null; status: string | null; created_at: string | null }
type ExpRow = { amount: number | null; status: string | null; created_at: string | null }

export default function CashFlowPage() {
  const [invoices, setInvoices] = React.useState<InvRow[]>([])
  const [expenses, setExpenses] = React.useState<ExpRow[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from("erp_invoices").select("amount, status, created_at").order("created_at", { ascending: false }),
      supabase.from("erp_expenses").select("amount, status, created_at").order("created_at", { ascending: false }),
    ]).then(([inv, exp]) => {
      setInvoices(inv.data ?? [])
      setExpenses(exp.data ?? [])
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  const now = new Date()
  const last6: string[] = []
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    last6.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`)
  }

  function monthBucket(rows: { amount: number | null; created_at: string | null }[]) {
    const m: Record<string, number> = {}
    for (const r of rows) {
      if (!r.created_at || !r.amount) continue
      const key = r.created_at.slice(0, 7)
      m[key] = (m[key] ?? 0) + r.amount
    }
    return m
  }

  const inflows = monthBucket(invoices.filter(i => i.status === "Paid"))
  const outflows = monthBucket(expenses)

  const totalIn = Object.values(inflows).reduce((s, v) => s + v, 0)
  const totalOut = Object.values(outflows).reduce((s, v) => s + v, 0)
  const netCash = totalIn - totalOut

  const maxVal = Math.max(...last6.map(m => Math.max(inflows[m] ?? 0, outflows[m] ?? 0)), 1)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline">Cash Flow</h1>
        <p className="text-muted-foreground text-sm">Inflows vs outflows over the last 6 months.</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="pt-4 pb-3">
            <div className="flex items-center gap-1 text-emerald-600 mb-1"><TrendingUp className="h-3.5 w-3.5" /><span className="text-[10px] font-bold uppercase">Inflows</span></div>
            <p className="text-xl font-black tabular-nums text-emerald-600">{fmt(totalIn)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3">
            <div className="flex items-center gap-1 text-red-500 mb-1"><TrendingDown className="h-3.5 w-3.5" /><span className="text-[10px] font-bold uppercase">Outflows</span></div>
            <p className="text-xl font-black tabular-nums text-red-500">{fmt(totalOut)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3">
            <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Net Cash</p>
            <p className={`text-xl font-black tabular-nums ${netCash >= 0 ? "text-emerald-600" : "text-red-600"}`}>{fmt(Math.abs(netCash))} {netCash < 0 && "(–)"}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm font-black">Monthly Cash Flow (Last 6 Months)</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-end gap-3 h-40 mb-2">
            {last6.map(m => {
              const inflow = inflows[m] ?? 0
              const outflow = outflows[m] ?? 0
              const inH = Math.round((inflow / maxVal) * 100)
              const outH = Math.round((outflow / maxVal) * 100)
              const label = MONTHS[parseInt(m.slice(5, 7)) - 1]
              return (
                <div key={m} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end justify-center gap-0.5" style={{ height: "120px" }}>
                    <div className="flex-1 bg-emerald-400 rounded-t-sm" style={{ height: `${Math.max(inH, inflow ? 3 : 0)}%` }} />
                    <div className="flex-1 bg-red-400 rounded-t-sm" style={{ height: `${Math.max(outH, outflow ? 3 : 0)}%` }} />
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground">{label}</span>
                </div>
              )
            })}
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-emerald-400 inline-block" />Inflows (paid invoices)</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-red-400 inline-block" />Outflows (expenses)</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
