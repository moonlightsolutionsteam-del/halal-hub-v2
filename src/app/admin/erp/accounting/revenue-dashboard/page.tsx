// @ts-nocheck
"use client"

import * as React from "react"
import { DollarSign, ArrowDownCircle, ArrowUpCircle, Wallet, Download, CreditCard, Users, AlertTriangle, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { createClient } from "@/lib/supabase/client"

type Invoice = { id: string; invoice_id: string | null; vendor: string; amount: number | null; date: string | null; status: string | null; description: string | null }
type Expense = { id: string; amount: number | null; date: string | null; category: string | null }
type Payout = { id: string; recipient: string | null; amount: number | null; payment_method: string | null; status: string | null }
type Sub = { id: string; status: string | null; price_paid: number | null }

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function fmt(n: number) { return `₹${n.toLocaleString("en-IN")}` }
function fmtDate(d: string | null) {
  if (!d) return "—"
  try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) } catch { return d }
}

const chartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
  expenses: { label: "Expenses", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig

export default function RevenueDashboardPage() {
  const [invoices, setInvoices] = React.useState<Invoice[]>([])
  const [expenses, setExpenses] = React.useState<Expense[]>([])
  const [payouts, setPayouts] = React.useState<Payout[]>([])
  const [subs, setSubs] = React.useState<Sub[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from("erp_invoices").select("id, invoice_id, vendor, amount, date, status, description").order("date", { ascending: false }).limit(200),
      supabase.from("erp_expenses").select("id, amount, date, category").order("date", { ascending: false }).limit(200),
      supabase.from("erp_payouts").select("id, recipient, amount, payment_method, status").eq("status", "Pending").limit(20),
      supabase.from("partner_subscriptions").select("id, status, price_paid").limit(500),
    ]).then(([inv, exp, pay, sub]) => {
      setInvoices(inv.data ?? [])
      setExpenses(exp.data ?? [])
      setPayouts(pay.data ?? [])
      setSubs(sub.data ?? [])
      setLoading(false)
    })
  }, [])

  const paidInvoices = invoices.filter(i => i.status === "Paid")
  const totalRevenue = paidInvoices.reduce((s, i) => s + (i.amount ?? 0), 0)
  const totalExpenses = expenses.reduce((s, e) => s + (e.amount ?? 0), 0)
  const pendingPayoutTotal = payouts.reduce((s, p) => s + (p.amount ?? 0), 0)
  const activeSubs = subs.filter(s => s.status === "active")
  const avgRevenuePerVendor = activeSubs.length > 0 ? Math.round(totalRevenue / activeSubs.length) : 0
  const unpaidInvoices = invoices.filter(i => i.status !== "Paid")
  const unpaidTotal = unpaidInvoices.reduce((s, i) => s + (i.amount ?? 0), 0)

  const chartData = React.useMemo(() => {
    const now = new Date()
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
      const m = d.getMonth()
      const y = d.getFullYear()
      const rev = invoices.filter(inv => {
        if (!inv.date || inv.status !== "Paid") return false
        const id = new Date(inv.date)
        return id.getMonth() === m && id.getFullYear() === y
      }).reduce((s, inv) => s + (inv.amount ?? 0), 0)
      const exp = expenses.filter(e => {
        if (!e.date) return false
        const ed = new Date(e.date)
        return ed.getMonth() === m && ed.getFullYear() === y
      }).reduce((s, e) => s + (e.amount ?? 0), 0)
      return { month: MONTHS[m], revenue: rev, expenses: exp }
    })
  }, [invoices, expenses])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Revenue Dashboard</h1>
        <p className="text-muted-foreground">High-level business health view.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle><ArrowUpCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : fmt(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">{paidInvoices.length} paid invoices</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle><ArrowDownCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : fmt(totalExpenses)}</div>
            <p className="text-xs text-muted-foreground">{expenses.length} expense entries</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle><DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold tabular-nums ${totalRevenue - totalExpenses >= 0 ? "text-green-600" : "text-destructive"}`}>
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : fmt(totalRevenue - totalExpenses)}
            </div>
            <p className="text-xs text-muted-foreground">Revenue minus expenses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Paid Vendors</CardTitle><Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : activeSubs.length}</div>
            <p className="text-xs text-muted-foreground">{loading ? "—" : `Avg. ${fmt(avgRevenuePerVendor)} each`}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle><Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : fmt(pendingPayoutTotal)}</div>
            <p className="text-xs text-muted-foreground">{payouts.length} payouts pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Dues</CardTitle><AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold tabular-nums ${unpaidTotal > 0 ? "text-destructive" : ""}`}>{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : fmt(unpaidTotal)}</div>
            <p className="text-xs text-muted-foreground">{unpaidInvoices.length} unpaid invoices</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Halal Coins Earned</CardTitle><CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">—</div>
            <p className="text-xs text-muted-foreground">Via credits ledger</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscriptions</CardTitle><CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : subs.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue vs Expenses</CardTitle>
          <CardDescription>Monthly breakdown — last 6 months.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          ) : (
            <ChartContainer config={chartConfig} className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickFormatter={(v) => `₹${Number(v) / 1000}k`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                  <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.length === 0 ? (
                    <TableRow><TableCell colSpan={3} className="text-center py-6 text-muted-foreground">No invoices yet.</TableCell></TableRow>
                  ) : invoices.slice(0, 6).map(inv => (
                    <TableRow key={inv.id}>
                      <TableCell>
                        <div className="font-mono text-xs">{inv.invoice_id ?? inv.id.slice(0, 8)}</div>
                        <div className="text-xs text-muted-foreground">{fmtDate(inv.date)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{inv.vendor}</div>
                        <Badge variant={inv.status === "Paid" ? "secondary" : "outline"} className="text-xs">{inv.status}</Badge>
                      </TableCell>
                      <TableCell className={`text-right font-semibold tabular-nums ${inv.status === "Paid" ? "text-green-600" : ""}`}>
                        {fmt(inv.amount ?? 0)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Pending Payouts</CardTitle>
              <Button size="sm" variant="outline"><Download className="mr-2 h-4 w-4" />Export</Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Recipient</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payouts.length === 0 ? (
                    <TableRow><TableCell colSpan={3} className="text-center py-6 text-muted-foreground">No pending payouts.</TableCell></TableRow>
                  ) : payouts.map(p => (
                    <TableRow key={p.id}>
                      <TableCell>
                        <div className="font-medium">{p.recipient ?? "—"}</div>
                        <div className="text-xs text-muted-foreground">{p.payment_method ?? "—"}</div>
                      </TableCell>
                      <TableCell className="text-right font-semibold tabular-nums">{fmt(p.amount ?? 0)}</TableCell>
                      <TableCell><Button size="sm">Process</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
