"use client"

import * as React from "react"
import { MoreHorizontal, PlusCircle, Search, CreditCard, DollarSign, AlertTriangle, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"

type Sub = { id: string; business_id: string | null; plan: string; status: string | null; price_paid: number | null; expires_at: string | null; starts_at: string | null }
type Business = { id: string; name: string; owner_id: string | null }

function fmt(n: number | null) { return n != null ? `₹${n.toLocaleString("en-IN")}` : "—" }
function fmtDate(d: string | null) {
  if (!d) return "—"
  try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) } catch { return d }
}

function statusVariant(s: string | null) {
  if (s === "active") return "secondary" as const
  if (s === "expired" || s === "cancelled") return "destructive" as const
  return "outline" as const
}

export default function VendorBillingPage() {
  const [subs, setSubs] = React.useState<Sub[]>([])
  const [businesses, setBusinesses] = React.useState<Business[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")

  React.useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from("partner_subscriptions").select("id, business_id, plan, status, price_paid, expires_at, starts_at").order("starts_at", { ascending: false }).limit(200),
      supabase.from("businesses").select("id, name, owner_id").limit(500),
    ]).then(([s, b]) => { setSubs(s.data ?? []); setBusinesses(b.data ?? []); setLoading(false) })
  }, [])

  const bizMap = React.useMemo(() => {
    const m: Record<string, Business> = {}
    businesses.forEach(b => { m[b.id] = b })
    return m
  }, [businesses])

  const filtered = subs.filter(s => {
    const biz = s.business_id ? bizMap[s.business_id] : null
    const q = search.toLowerCase()
    const ms = !q || s.plan.toLowerCase().includes(q) || (biz?.name ?? "").toLowerCase().includes(q)
    const sf = statusFilter === "all" || (s.status ?? "") === statusFilter
    return ms && sf
  })

  const active = subs.filter(s => s.status === "active")
  const totalRevenue = subs.reduce((sum, s) => sum + (s.price_paid ?? 0), 0)
  const expiredOrCancelled = subs.filter(s => s.status === "expired" || s.status === "cancelled")
  const expiringSoon = subs.filter(s => {
    if (!s.expires_at || s.status !== "active") return false
    const diff = new Date(s.expires_at).getTime() - new Date().getTime()
    return diff > 0 && diff < 30 * 24 * 60 * 60 * 1000
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Vendor Billing</h1>
        <p className="text-muted-foreground">Track and manage subscription billing for all vendor partners.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle><CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : active.length}</div>
            <p className="text-xs text-muted-foreground">{expiringSoon.length} expiring within 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle><DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : fmt(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">All subscription payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired / Cancelled</CardTitle><AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${expiredOrCancelled.length > 0 ? "text-destructive" : ""}`}>{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : expiredOrCancelled.length}</div>
            <p className="text-xs text-muted-foreground">Need renewal or removal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle><CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : subs.length}</div>
            <p className="text-xs text-muted-foreground">All time subscriptions</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Subscriptions</CardTitle>
            <Button><PlusCircle className="mr-2 h-4 w-4" />Create Invoice</Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by vendor or plan..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Filter by Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
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
                  <TableHead className="hidden md:table-cell">Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Price Paid</TableHead>
                  <TableHead className="hidden lg:table-cell">Expires</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No subscriptions found.</TableCell></TableRow>
                ) : filtered.map(s => {
                  const biz = s.business_id ? bizMap[s.business_id] : null
                  return (
                    <TableRow key={s.id}>
                      <TableCell>
                        <div className="font-medium">{biz?.name ?? "Unknown Vendor"}</div>
                        {s.business_id && <div className="text-xs text-muted-foreground font-mono">{s.business_id.slice(0, 8)}…</div>}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline">{s.plan}</Badge>
                      </TableCell>
                      <TableCell><Badge variant={statusVariant(s.status)}>{s.status ?? "—"}</Badge></TableCell>
                      <TableCell className="hidden lg:table-cell tabular-nums font-semibold">{fmt(s.price_paid)}</TableCell>
                      <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{fmtDate(s.expires_at)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Billing Profile</DropdownMenuItem>
                            <DropdownMenuItem>Send Payment Reminder</DropdownMenuItem>
                            <DropdownMenuItem>Generate Invoice</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Block Account</DropdownMenuItem>
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
    </div>
  )
}
