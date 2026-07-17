"use client"

import * as React from "react"
import { MoreHorizontal, Search, DollarSign, AlertTriangle, Clock, PlusCircle, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"

type Invoice = { id: string; invoice_id: string | null; vendor: string; amount: number | null; due_date: string | null; status: string | null }

function fmt(n: number) { return `₹${n.toLocaleString("en-IN")}` }

function daysOverdue(due: string | null) {
  if (!due) return 0
  const diff = new Date().getTime() - new Date(due).getTime()
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
}

function statusVariant(s: string | null) {
  if (s === "Overdue") return "destructive" as const
  if (s === "Pending") return "default" as const
  if (s === "Partial") return "outline" as const
  return "outline" as const
}

export default function ReceivablesDuesPage() {
  const [invoices, setInvoices] = React.useState<Invoice[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")

  React.useEffect(() => {
    const supabase = createClient()
    supabase.from("erp_invoices")
      .select("id, invoice_id, vendor, amount, due_date, status")
      .neq("status", "Paid")
      .order("due_date", { ascending: true })
      .limit(200)
      .then(({ data }) => { setInvoices(data ?? []); setLoading(false) })
  }, [])

  const filtered = invoices.filter(inv => {
    const q = search.toLowerCase()
    return !q || inv.vendor.toLowerCase().includes(q)
  })

  const totalDue = invoices.reduce((s, i) => s + (i.amount ?? 0), 0)
  const overdue30 = invoices.filter(i => daysOverdue(i.due_date) > 30)
  const badDebt = invoices.filter(i => daysOverdue(i.due_date) > 90)
  const overdue30Amount = overdue30.reduce((s, i) => s + (i.amount ?? 0), 0)
  const badDebtAmount = badDebt.reduce((s, i) => s + (i.amount ?? 0), 0)

  const bucket0_30 = invoices.filter(i => daysOverdue(i.due_date) <= 30)
  const bucket31_60 = invoices.filter(i => { const d = daysOverdue(i.due_date); return d > 30 && d <= 60 })
  const bucket61_90 = invoices.filter(i => { const d = daysOverdue(i.due_date); return d > 60 && d <= 90 })
  const bucket90p = invoices.filter(i => daysOverdue(i.due_date) > 90)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Receivables & Dues</h1>
        <p className="text-muted-foreground">Monitor and manage outstanding payments from vendors.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount Due</CardTitle><DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : fmt(totalDue)}</div>
            <p className="text-xs text-muted-foreground">{invoices.length} open invoices</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue (&gt; 30 days)</CardTitle><Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${overdue30.length > 0 ? "text-yellow-600" : ""}`}>{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : fmt(overdue30Amount)}</div>
            <p className="text-xs text-muted-foreground">{overdue30.length} vendors</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bad Debt Risk (&gt; 90 days)</CardTitle><AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${badDebt.length > 0 ? "text-destructive" : ""}`}>{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : fmt(badDebtAmount)}</div>
            <p className="text-xs text-muted-foreground">{badDebt.length} vendors</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Unpaid Vendors</CardTitle><PlusCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : invoices.length}</div>
            <p className="text-xs text-muted-foreground">Pending invoices</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Overdue Vendors</CardTitle>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search vendors..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Days Overdue</TableHead>
                  <TableHead>Amount Due</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No overdue invoices found.</TableCell></TableRow>
                ) : filtered.map(inv => {
                  const days = daysOverdue(inv.due_date)
                  return (
                    <TableRow key={inv.id}>
                      <TableCell>
                        <div className="font-medium">{inv.vendor}</div>
                        {inv.invoice_id && <div className="text-xs text-muted-foreground">{inv.invoice_id}</div>}
                      </TableCell>
                      <TableCell>
                        <Badge variant={days > 30 ? "destructive" : "default"}>{days} days</Badge>
                      </TableCell>
                      <TableCell className="font-semibold tabular-nums">{fmt(inv.amount ?? 0)}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant(inv.status)}>{inv.status ?? "Pending"}</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                            <DropdownMenuItem>Negotiate Settlement</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Freeze Features</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Mark as Bad Debt</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:gap-6 grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Aging Report</CardTitle>
            <CardDescription>Receivables by aging bucket.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bucket</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Vendors</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>0–30 Days</TableCell>
                  <TableCell className="tabular-nums">{loading ? "—" : fmt(bucket0_30.reduce((s, i) => s + (i.amount ?? 0), 0))}</TableCell>
                  <TableCell>{loading ? "—" : bucket0_30.length}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>31–60 Days</TableCell>
                  <TableCell className="tabular-nums">{loading ? "—" : fmt(bucket31_60.reduce((s, i) => s + (i.amount ?? 0), 0))}</TableCell>
                  <TableCell>{loading ? "—" : bucket31_60.length}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>61–90 Days</TableCell>
                  <TableCell className="tabular-nums">{loading ? "—" : fmt(bucket61_90.reduce((s, i) => s + (i.amount ?? 0), 0))}</TableCell>
                  <TableCell>{loading ? "—" : bucket61_90.length}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-destructive">90+ Days</TableCell>
                  <TableCell className="font-semibold text-destructive tabular-nums">{loading ? "—" : fmt(bucket90p.reduce((s, i) => s + (i.amount ?? 0), 0))}</TableCell>
                  <TableCell className="font-semibold text-destructive">{loading ? "—" : bucket90p.length}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Automation Rules</CardTitle>
            <CardDescription>Configure automatic reminders and actions for overdue payments.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label htmlFor="auto-reminders" className="font-semibold">Automated Reminders</Label>
                <p className="text-sm text-muted-foreground">Send reminders at 15, 30, and 60 days overdue.</p>
              </div>
              <Switch id="auto-reminders" defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label htmlFor="auto-block" className="font-semibold">Credit Blocking</Label>
                <p className="text-sm text-muted-foreground">Automatically freeze credit usage after 60 days.</p>
              </div>
              <Switch id="auto-block" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
