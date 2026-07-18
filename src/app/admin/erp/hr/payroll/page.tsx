"use client"

import * as React from "react"
import { Loader2, Search, IndianRupee, Users, CheckCircle2, Clock, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"

type PayrollRow = {
  id: string
  employee_name: string
  month: number
  year: number
  basic: number | null
  hra: number | null
  allowances: number | null
  deductions: number | null
  tds: number | null
  net_pay: number | null
  status: string | null
  paid_date: string | null
}

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

function fmt(n: number | null) {
  if (!n) return "₹0"
  return `₹${n.toLocaleString("en-IN")}`
}

function statusVariant(s: string | null) {
  if (s === "Paid") return "secondary" as const
  if (s === "Processed") return "default" as const
  return "outline" as const
}

function initials(name: string) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
}

export default function PayrollPage() {
  const [records, setRecords] = React.useState<PayrollRow[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")

  const now = new Date()
  const currentMonth = now.getMonth() + 1
  const currentYear = now.getFullYear()

  React.useEffect(() => {
    const supabase = createClient()
    supabase.from("erp_payroll")
      .select("id, employee_name, month, year, basic, hra, allowances, deductions, tds, net_pay, status, paid_date")
      .order("year", { ascending: false })
      .order("month", { ascending: false })
      .limit(300)
      .then(({ data }) => { setRecords(data ?? []); setLoading(false) })
  }, [])

  const filtered = records.filter(r => {
    const q = search.toLowerCase()
    const ms = !q || r.employee_name.toLowerCase().includes(q)
    const sf = statusFilter === "all" || (r.status ?? "") === statusFilter
    return ms && sf
  })

  const thisMonth = records.filter(r => r.month === currentMonth && r.year === currentYear)
  const paidTotal = thisMonth.filter(r => r.status === "Paid").reduce((s, r) => s + (r.net_pay ?? 0), 0)
  const processedCount = thisMonth.filter(r => r.status === "Processed" || r.status === "Paid").length
  const draftCount = thisMonth.filter(r => r.status === "Draft").length

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-headline">Payroll</h1>
          <p className="text-muted-foreground">Monthly salary processing and payout records.</p>
        </div>
        <Button className="gap-2"><IndianRupee className="h-4 w-4" />Run Payroll</Button>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MTD Payout</CardTitle><IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : fmt(paidTotal)}</div>
            <p className="text-xs text-muted-foreground">{MONTHS[currentMonth - 1]} {currentYear}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processed</CardTitle><CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : processedCount}</div>
            <p className="text-xs text-muted-foreground">Payslips this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle><Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : draftCount}</div>
            <p className="text-xs text-muted-foreground">Drafts not processed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entries</CardTitle><Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : records.length}</div>
            <p className="text-xs text-muted-foreground">All-time records</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search employee..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Processed">Processed</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2 shrink-0"><Download className="h-4 w-4" />Export</Button>
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
                  <TableHead>Period</TableHead>
                  <TableHead className="hidden lg:table-cell text-right">Basic</TableHead>
                  <TableHead className="hidden lg:table-cell text-right">Allowances</TableHead>
                  <TableHead className="hidden md:table-cell text-right">Deductions</TableHead>
                  <TableHead className="text-right">Net Pay</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No payroll records. Run payroll to generate entries.</TableCell></TableRow>
                ) : filtered.map(r => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7"><AvatarFallback className="text-xs">{initials(r.employee_name)}</AvatarFallback></Avatar>
                        <span className="font-medium text-sm">{r.employee_name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{MONTHS[r.month - 1]} {r.year}</TableCell>
                    <TableCell className="hidden lg:table-cell text-right text-sm">{fmt(r.basic)}</TableCell>
                    <TableCell className="hidden lg:table-cell text-right text-sm">{fmt((r.hra ?? 0) + (r.allowances ?? 0))}</TableCell>
                    <TableCell className="hidden md:table-cell text-right text-sm text-destructive">{fmt((r.deductions ?? 0) + (r.tds ?? 0))}</TableCell>
                    <TableCell className="text-right font-semibold">{fmt(r.net_pay)}</TableCell>
                    <TableCell><Badge variant={statusVariant(r.status)}>{r.status ?? "Draft"}</Badge></TableCell>
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
