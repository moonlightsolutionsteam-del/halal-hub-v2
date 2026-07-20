"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, IndianRupee } from "lucide-react"

function fmt(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`
  return `₹${n.toFixed(0)}`
}

export default function UnitEconomicsPage() {
  const [invoiceTotal, setInvoiceTotal] = React.useState(0)
  const [expenseTotal, setExpenseTotal] = React.useState(0)
  const [payrollTotal, setPayrollTotal] = React.useState(0)
  const [userCount, setUserCount] = React.useState(0)
  const [bizCount, setBizCount] = React.useState(0)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const supabase = createClient()
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

    Promise.all([
      supabase.from("erp_invoices").select("amount, status"),
      supabase.from("erp_expenses").select("amount, status"),
      supabase.from("erp_payroll").select("net_pay, status, month, year"),
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase.from("businesses").select("id", { count: "exact", head: true }).eq("status", "active"),
    ]).then(([inv, exp, pay, usr, biz]) => {
      const paidInvoices = (inv.data ?? []).filter(i => i.status === "Paid")
      setInvoiceTotal(paidInvoices.reduce((s, i) => s + (i.amount ?? 0), 0))
      setExpenseTotal((exp.data ?? []).reduce((s, e) => s + (e.amount ?? 0), 0))

      const curMonth = now.getMonth() + 1
      const curYear = now.getFullYear()
      const curPayroll = (pay.data ?? []).filter(p => p.month === curMonth && p.year === curYear)
      setPayrollTotal(curPayroll.reduce((s, p) => s + (p.net_pay ?? 0), 0))

      setUserCount(usr.count ?? 0)
      setBizCount(biz.count ?? 0)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  const totalCosts = expenseTotal + payrollTotal
  const grossProfit = invoiceTotal - totalCosts
  const margin = invoiceTotal > 0 ? Math.round((grossProfit / invoiceTotal) * 100) : 0
  const revenuePerUser = userCount > 0 ? invoiceTotal / userCount : 0
  const revenuePerBiz = bizCount > 0 ? invoiceTotal / bizCount : 0

  const metrics = [
    { label: "Total Revenue (Paid Invoices)", value: fmt(invoiceTotal), sub: "From accounting module", color: "text-emerald-600" },
    { label: "Total Expenses", value: fmt(expenseTotal), sub: "All logged expenses", color: "text-red-600" },
    { label: "Payroll Cost (This Month)", value: fmt(payrollTotal), sub: "Net pay disbursed", color: "text-amber-600" },
    { label: "Gross Profit", value: fmt(Math.max(grossProfit, 0)), sub: `${margin}% margin`, color: grossProfit >= 0 ? "text-emerald-600" : "text-red-600" },
    { label: "Revenue / User (ARPU)", value: fmt(revenuePerUser), sub: `${userCount.toLocaleString()} total users`, color: "text-primary" },
    { label: "Revenue / Business", value: fmt(revenuePerBiz), sub: `${bizCount.toLocaleString()} active listings`, color: "text-primary" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline">Unit Economics</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Revenue, cost, and margin metrics derived from accounting and HR data.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {metrics.map(m => (
          <Card key={m.label}>
            <CardContent className="pt-4 pb-3">
              <p className={`text-xl font-black tabular-nums ${m.color}`}>{m.value}</p>
              <p className="text-xs font-bold text-foreground mt-1 leading-tight">{m.label}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{m.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-black">P&L Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { label: "Revenue", value: invoiceTotal, color: "bg-emerald-500" },
            { label: "Expenses", value: expenseTotal, color: "bg-red-400" },
            { label: "Payroll", value: payrollTotal, color: "bg-amber-400" },
          ].map(row => {
            const pct = invoiceTotal > 0 ? Math.round((row.value / invoiceTotal) * 100) : (row.value > 0 ? 100 : 0)
            return (
              <div key={row.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-bold">{row.label}</span>
                  <span className="text-xs font-black tabular-nums">{fmt(row.value)}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full ${row.color}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                </div>
              </div>
            )
          })}
          <div className="border-t pt-2 mt-2 flex justify-between">
            <span className="text-sm font-black">Gross Profit</span>
            <span className={`text-sm font-black tabular-nums ${grossProfit >= 0 ? "text-emerald-600" : "text-red-600"}`}>
              {fmt(Math.abs(grossProfit))} {grossProfit < 0 ? "(loss)" : ""}
            </span>
          </div>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground text-center">
        All figures sourced from ERP Accounting and HR modules. CAC/LTV will be available once marketing attribution is wired.
      </p>
    </div>
  )
}
