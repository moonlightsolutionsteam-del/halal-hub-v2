"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

function fmt(n: number) { return n >= 100000 ? `₹${(n/100000).toFixed(1)}L` : n >= 1000 ? `₹${(n/1000).toFixed(0)}K` : `₹${n.toFixed(0)}` }

export default function MisReportsPage() {
  const [data, setData] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from("erp_invoices").select("amount, status"),
      supabase.from("erp_expenses").select("amount, category"),
      supabase.from("erp_payroll").select("net_pay, status"),
      supabase.from("erp_employees").select("id, status"),
      supabase.from("businesses").select("id, status, halal_verified"),
      supabase.from("profiles").select("id", { count: "exact", head: true }),
    ]).then(([inv, exp, pay, emp, biz, usr]) => {
      const invoices = inv.data ?? []
      const expenses = exp.data ?? []
      const payroll = pay.data ?? []
      const employees = emp.data ?? []
      const businesses = biz.data ?? []

      const paidRevenue = invoices.filter(i => i.status === "Paid").reduce((s, i) => s + (i.amount ?? 0), 0)
      const totalExpenses = expenses.reduce((s, e) => s + (e.amount ?? 0), 0)
      const totalPayroll = payroll.reduce((s, p) => s + (p.net_pay ?? 0), 0)

      const expByCategory: Record<string, number> = {}
      for (const e of expenses) {
        const cat = e.category ?? "Other"
        expByCategory[cat] = (expByCategory[cat] ?? 0) + (e.amount ?? 0)
      }

      setData({
        paidRevenue, totalExpenses, totalPayroll,
        grossProfit: paidRevenue - totalExpenses - totalPayroll,
        activeEmployees: employees.filter(e => e.status === "Active").length,
        totalBusinesses: businesses.length,
        activeBusinesses: businesses.filter(b => b.status === "active").length,
        verifiedBusinesses: businesses.filter(b => b.halal_verified).length,
        totalUsers: usr.count ?? 0,
        expByCategory: Object.entries(expByCategory).sort((a,b) => b[1]-a[1]).slice(0,5),
      })
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  const sections = [
    { title: "Revenue", rows: [
      ["Total Revenue (Paid Invoices)", fmt(data.paidRevenue)],
      ["Total Expenses", fmt(data.totalExpenses)],
      ["Total Payroll", fmt(data.totalPayroll)],
      ["Gross Profit", fmt(Math.max(data.grossProfit, 0))],
    ]},
    { title: "Platform", rows: [
      ["Registered Users", data.totalUsers.toLocaleString()],
      ["Total Business Listings", data.totalBusinesses.toLocaleString()],
      ["Active Listings", data.activeBusinesses.toLocaleString()],
      ["Halal Verified Listings", data.verifiedBusinesses.toLocaleString()],
    ]},
    { title: "HR", rows: [
      ["Active Employees", data.activeEmployees.toLocaleString()],
    ]},
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">MIS Reports</h1>
          <p className="text-muted-foreground text-sm">Management Information System — cross-module summary.</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 rounded-xl font-bold" onClick={() => window.print()}>
          <Download className="h-4 w-4" /> Export
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sections.map(s => (
          <Card key={s.title}>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-black">{s.title}</CardTitle></CardHeader>
            <CardContent className="space-y-0">
              {s.rows.map(([label, value]) => (
                <div key={label as string} className="flex justify-between py-2 border-b border-border/40 last:border-0">
                  <span className="text-sm text-muted-foreground font-medium">{label}</span>
                  <span className="text-sm font-black tabular-nums">{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-black">Expense Breakdown</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {data.expByCategory.length === 0 && <p className="text-xs text-muted-foreground">No expenses logged yet.</p>}
            {data.expByCategory.map(([cat, amt]: [string, number]) => (
              <div key={cat} className="flex justify-between">
                <span className="text-sm text-muted-foreground">{cat}</span>
                <span className="text-sm font-black tabular-nums">{fmt(amt)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
