"use client"

import * as React from "react"
import { Loader2, Search, LogOut, ShieldCheck, Clock, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"

type ExitRecord = {
  id: string
  employee_name: string
  department: string | null
  exit_type: string | null
  last_working_day: string | null
  notice_period_days: number | null
  exit_reason: string | null
  clearance_status: string | null
  noc_issued: boolean | null
  interview_done: boolean | null
  interview_rating: number | null
  created_at: string | null
}

function clearanceVariant(s: string | null) {
  if (s === "Completed") return "secondary" as const
  if (s === "In Progress") return "default" as const
  return "outline" as const
}

function exitTypeVariant(t: string | null) {
  if (t === "Termination") return "destructive" as const
  if (t === "Retirement") return "secondary" as const
  return "outline" as const
}

function fmtDate(d: string | null) {
  if (!d) return "—"
  try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) } catch { return d }
}

function initials(name: string) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
}

export default function ExitPage() {
  const [records, setRecords] = React.useState<ExitRecord[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [clearanceFilter, setClearanceFilter] = React.useState("all")
  const [typeFilter, setTypeFilter] = React.useState("all")

  React.useEffect(() => {
    const supabase = createClient()
    supabase.from("erp_exit_records")
      .select("id, employee_name, department, exit_type, last_working_day, notice_period_days, exit_reason, clearance_status, noc_issued, interview_done, interview_rating, created_at")
      .order("created_at", { ascending: false })
      .limit(200)
      .then(({ data }) => { setRecords(data ?? []); setLoading(false) })
  }, [])

  const filtered = records.filter(r => {
    const q = search.toLowerCase()
    const ms = !q || r.employee_name.toLowerCase().includes(q) || (r.department ?? "").toLowerCase().includes(q)
    const cf = clearanceFilter === "all" || (r.clearance_status ?? "Pending") === clearanceFilter
    const tf = typeFilter === "all" || (r.exit_type ?? "") === typeFilter
    return ms && cf && tf
  })

  const today = new Date().toDateString()
  const thisMonth = records.filter(r => r.created_at && new Date(r.created_at).getMonth() === new Date().getMonth())
  const pendingClearance = records.filter(r => r.clearance_status !== "Completed")
  const interviewPending = records.filter(r => !r.interview_done)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Exit Management</h1>
        <p className="text-muted-foreground">Track employee exits, clearances, and offboarding workflows.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Exits</CardTitle><LogOut className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : records.length}</div>
            <p className="text-xs text-muted-foreground">{thisMonth.length} this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Clearance</CardTitle><Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : pendingClearance.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting full clearance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews Pending</CardTitle><XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : interviewPending.length}</div>
            <p className="text-xs text-muted-foreground">Exit interviews due</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cleared</CardTitle><ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : records.filter(r => r.clearance_status === "Completed").length}</div>
            <p className="text-xs text-muted-foreground">Full clearance done</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name or department..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[170px]"><SelectValue placeholder="Exit Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Resignation">Resignation</SelectItem>
                <SelectItem value="Termination">Termination</SelectItem>
                <SelectItem value="Retirement">Retirement</SelectItem>
                <SelectItem value="Contract End">Contract End</SelectItem>
              </SelectContent>
            </Select>
            <Select value={clearanceFilter} onValueChange={setClearanceFilter}>
              <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="Clearance" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
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
                  <TableHead className="hidden md:table-cell">Department</TableHead>
                  <TableHead>Exit Type</TableHead>
                  <TableHead className="hidden md:table-cell">Last Day</TableHead>
                  <TableHead>Clearance</TableHead>
                  <TableHead className="hidden lg:table-cell">NOC</TableHead>
                  <TableHead className="hidden lg:table-cell">Interview</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No exit records found.</TableCell></TableRow>
                ) : filtered.map(r => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7"><AvatarFallback className="text-xs">{initials(r.employee_name)}</AvatarFallback></Avatar>
                        <div>
                          <div className="font-medium text-sm">{r.employee_name}</div>
                          {r.exit_reason && <div className="text-xs text-muted-foreground truncate max-w-[140px]">{r.exit_reason}</div>}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{r.department ?? "—"}</TableCell>
                    <TableCell><Badge variant={exitTypeVariant(r.exit_type)}>{r.exit_type ?? "—"}</Badge></TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{fmtDate(r.last_working_day)}</TableCell>
                    <TableCell><Badge variant={clearanceVariant(r.clearance_status)}>{r.clearance_status ?? "Pending"}</Badge></TableCell>
                    <TableCell className="hidden lg:table-cell text-sm">{r.noc_issued ? <span className="text-emerald-600 font-medium">Issued</span> : <span className="text-muted-foreground">Pending</span>}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm">
                      {r.interview_done
                        ? <span className="text-emerald-600 font-medium">Done {r.interview_rating ? `(${r.interview_rating}/5)` : ""}</span>
                        : <span className="text-muted-foreground">Pending</span>}
                    </TableCell>
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
