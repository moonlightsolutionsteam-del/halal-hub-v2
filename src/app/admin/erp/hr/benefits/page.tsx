"use client"

import * as React from "react"
import { Loader2, Search, Heart, IndianRupee, CheckCircle2, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"

type Benefit = {
  id: string
  employee_name: string
  benefit_type: string
  value: number | null
  frequency: string | null
  status: string | null
  start_date: string | null
  end_date: string | null
  provider: string | null
  policy_number: string | null
}

function statusVariant(s: string | null) {
  if (s === "Active") return "secondary" as const
  if (s === "Pending") return "default" as const
  return "outline" as const
}

function fmt(n: number | null) {
  if (!n) return "₹0"
  return `₹${n.toLocaleString("en-IN")}`
}

function fmtDate(d: string | null) {
  if (!d) return "—"
  try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) } catch { return d }
}

function initials(name: string) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
}

export default function BenefitsPage() {
  const [benefits, setBenefits] = React.useState<Benefit[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [typeFilter, setTypeFilter] = React.useState("all")

  React.useEffect(() => {
    const supabase = createClient()
    supabase.from("erp_benefits")
      .select("id, employee_name, benefit_type, value, frequency, status, start_date, end_date, provider, policy_number")
      .order("created_at", { ascending: false })
      .limit(300)
      .then(({ data }) => { setBenefits(data ?? []); setLoading(false) })
  }, [])

  const filtered = benefits.filter(b => {
    const q = search.toLowerCase()
    const ms = !q || b.employee_name.toLowerCase().includes(q) || b.benefit_type.toLowerCase().includes(q) || (b.provider ?? "").toLowerCase().includes(q)
    const sf = statusFilter === "all" || (b.status ?? "Active") === statusFilter
    const tf = typeFilter === "all" || b.benefit_type === typeFilter
    return ms && sf && tf
  })

  const active = benefits.filter(b => b.status === "Active")
  const monthlyTotal = active.filter(b => b.frequency === "Monthly").reduce((s, b) => s + (b.value ?? 0), 0)
  const annualTotal = active.filter(b => b.frequency === "Annual").reduce((s, b) => s + (b.value ?? 0), 0)
  const benefitTypes = [...new Set(benefits.map(b => b.benefit_type).filter(Boolean))]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Benefits</h1>
        <p className="text-muted-foreground">Track employee benefits — health, PF, gratuity, and more.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Benefits</CardTitle><Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : active.length}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Outgo</CardTitle><IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : fmt(monthlyTotal)}</div>
            <p className="text-xs text-muted-foreground">Monthly benefits total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Cost</CardTitle><IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : fmt(monthlyTotal * 12 + annualTotal)}</div>
            <p className="text-xs text-muted-foreground">Projected annual spend</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Benefit Types</CardTitle><CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : benefitTypes.length}</div>
            <p className="text-xs text-muted-foreground">Distinct types tracked</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by employee, type, or provider..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="Benefit Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {benefitTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
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
                  <TableHead>Employee</TableHead>
                  <TableHead>Benefit</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="hidden md:table-cell">Frequency</TableHead>
                  <TableHead className="hidden lg:table-cell">Provider</TableHead>
                  <TableHead className="hidden lg:table-cell">Policy No.</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No benefits records found.</TableCell></TableRow>
                ) : filtered.map(b => (
                  <TableRow key={b.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7"><AvatarFallback className="text-xs">{initials(b.employee_name)}</AvatarFallback></Avatar>
                        <span className="font-medium text-sm">{b.employee_name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-sm">{b.benefit_type}</TableCell>
                    <TableCell className="text-right font-semibold text-sm">{fmt(b.value)}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{b.frequency ?? "—"}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{b.provider ?? "—"}</TableCell>
                    <TableCell className="hidden lg:table-cell font-mono text-xs text-muted-foreground">{b.policy_number ?? "—"}</TableCell>
                    <TableCell><Badge variant={statusVariant(b.status)}>{b.status ?? "Active"}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
