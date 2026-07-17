"use client"

import * as React from "react"
import { ArrowDownCircle, ArrowUpCircle, Wallet, CreditCard, TrendingUp, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

type Invoice = { id: string; invoice_id: string | null; client_name: string | null; amount: number | null; status: string | null; created_at: string | null }
type Payout = { id: string; payout_id: string | null; recipient: string | null; amount: number | null; status: string | null; payment_method: string | null }
type Expense = { id: string; amount: number | null }

function fmt(n: number) { return `₹${n.toLocaleString("en-IN")}` }
function formatDate(ts: string | null) {
  if (!ts) return "—"
  try { return new Date(ts).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) } catch { return ts }
}

export default function AccountingDashboardPage() {
  const [invoices, setInvoices] = React.useState<Invoice[]>([])
  const [payouts, setPayouts] = React.useState<Payout[]>([])
  const [expenses, setExpenses] = React.useState<Expense[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from("erp_invoices").select("id, invoice_id, client_name, amount, status, created_at").order("created_at", { ascending: false }).limit(50),
      supabase.from("erp_payouts").select("id, payout_id, recipient, amount, status, payment_method").eq("status", "Pending").limit(20),
      supabase.from("erp_expenses").select("id, amount").limit(200),
    ]).then(([inv, pay, exp]) => {
      setInvoices(inv.data ?? [])
      setPayouts(pay.data ?? [])
      setExpenses(exp.data ?? [])
      setLoading(false)
    })
  }, [])

  const totalRevenue = invoices.filter(i => i.status === "Paid").reduce((s, i) => s + (i.amount ?? 0), 0)
  const totalExpenses = expenses.reduce((s, e) => s + (e.amount ?? 0), 0)
  const pendingAmount = payouts.reduce((s, p) => s + (p.amount ?? 0), 0)
  const recentInvoices = invoices.slice(0, 5)

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Accounting Dashboard</h1>
        <p className="text-muted-foreground">Centralized financial control center for Halal Hub.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle><ArrowUpCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fmt(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">{invoices.filter(i => i.status === "Paid").length} paid invoices</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle><ArrowDownCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fmt(totalExpenses)}</div>
            <p className="text-xs text-muted-foreground">{expenses.length} expense entries</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle><TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalRevenue - totalExpenses >= 0 ? "text-green-600" : "text-red-600"}`}>
              {fmt(totalRevenue - totalExpenses)}
            </div>
            <p className="text-xs text-muted-foreground">Revenue minus expenses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle><Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fmt(pendingAmount)}</div>
            <p className="text-xs text-muted-foreground">{payouts.length} payouts to process</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Invoices</CardTitle>
              <Button size="sm" variant="outline" asChild><Link href="/admin/erp/accounting/invoices">View All</Link></Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentInvoices.length === 0 ? (
                  <TableRow><TableCell colSpan={4} className="text-center py-6 text-muted-foreground">No invoices yet.</TableCell></TableRow>
                ) : recentInvoices.map(inv => (
                  <TableRow key={inv.id}>
                    <TableCell>
                      <div className="font-medium font-mono text-xs">{inv.invoice_id}</div>
                      <div className="text-xs text-muted-foreground">{formatDate(inv.created_at)}</div>
                    </TableCell>
                    <TableCell className="text-sm">{inv.client_name ?? "—"}</TableCell>
                    <TableCell className="text-right font-semibold tabular-nums">{fmt(inv.amount ?? 0)}</TableCell>
                    <TableCell>
                      <Badge variant={inv.status === "Paid" ? "secondary" : inv.status === "Overdue" ? "destructive" : "outline"}>
                        {inv.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Pending Payouts</CardTitle>
              <Button size="sm" variant="outline" asChild><Link href="/admin/erp/accounting/payouts">Manage</Link></Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recipient</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payouts.length === 0 ? (
                  <TableRow><TableCell colSpan={3} className="text-center py-6 text-muted-foreground">No pending payouts.</TableCell></TableRow>
                ) : payouts.map(p => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.recipient ?? "—"}</TableCell>
                    <TableCell className="text-right font-semibold tabular-nums">{fmt(p.amount ?? 0)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{p.payment_method ?? "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
