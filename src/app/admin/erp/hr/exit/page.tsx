"use client"

import * as React from "react"
import { Loader2, Search, ArrowUpRight, ShieldCheck, Clock, MoreHorizontal, PlusCircle, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { logErpActivity } from "@/lib/erp-logger"

type ExitRecord = {
  id: string; employee_name: string; department: string | null
  exit_type: string | null; last_working_day: string | null
  clearance_status: string | null; noc_issued: boolean | null
  exit_interview_done: boolean | null; exit_interview_rating: number | null
  notice_period: number | null; exit_reason: string | null
}
type Employee = { id: string; name: string; department: string | null }

const EXIT_TYPES = ["Resignation", "Retirement", "Termination", "Contract End", "Mutual Separation"]

function clearanceVariant(s: string | null) {
  if (s === "Cleared") return "secondary" as const
  if (s === "Pending") return "outline" as const
  return "destructive" as const
}

function fmtDate(d: string | null) {
  if (!d) return "—"
  try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) } catch { return d }
}

function initials(name: string) { return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() }

export default function ExitPage() {
  const [records, setRecords] = React.useState<ExitRecord[]>([])
  const [employees, setEmployees] = React.useState<Employee[]>([])
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [clearanceFilter, setClearanceFilter] = React.useState("all")
  const [open, setOpen] = React.useState(false)

  const [empId, setEmpId] = React.useState("")
  const [exitType, setExitType] = React.useState("")
  const [lastDay, setLastDay] = React.useState("")
  const [noticePeriod, setNoticePeriod] = React.useState("")
  const [exitReason, setExitReason] = React.useState("")

  function load() {
    const supabase = createClient()
    supabase.from("erp_exit_records")
      .select("id, employee_name, department, exit_type, last_working_day, clearance_status, noc_issued, exit_interview_done, exit_interview_rating, notice_period, exit_reason")
      .order("last_working_day", { ascending: false }).limit(200)
      .then(({ data }) => { setRecords(data ?? []); setLoading(false) })
  }

  React.useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from("erp_exit_records").select("id, employee_name, department, exit_type, last_working_day, clearance_status, noc_issued, exit_interview_done, exit_interview_rating, notice_period, exit_reason").order("last_working_day", { ascending: false }).limit(200),
      supabase.from("erp_employees").select("id, name, department").order("name"),
    ]).then(([r, e]) => { setRecords(r.data ?? []); setEmployees(e.data ?? []); setLoading(false) })
  }, [])

  async function handleAdd() {
    if (!empId || !exitType || !lastDay) return
    setSaving(true)
    const emp = employees.find(e => e.id === empId)
    const supabase = createClient()
    await supabase.from("erp_exit_records").insert({
      employee_id: empId, employee_name: emp!.name,
      department: emp!.department, exit_type: exitType,
      last_working_day: lastDay,
      notice_period: noticePeriod ? Number(noticePeriod) : null,
      exit_reason: exitReason || null,
      clearance_status: "Pending", noc_issued: false, exit_interview_done: false,
    })
    await logErpActivity({ employeeName: "Admin", action: "exit_initiated", module: "hr", recordType: "exit", recordTitle: `${emp!.name} — ${exitType}` })
    setSaving(false); setOpen(false)
    setEmpId(""); setExitType(""); setLastDay(""); setNoticePeriod(""); setExitReason("")
    load()
  }

  async function updateField(id: string, field: Record<string, unknown>, empName: string, action: string) {
    const supabase = createClient()
    await supabase.from("erp_exit_records").update(field).eq("id", id)
    await logErpActivity({ employeeName: "Admin", action, module: "hr", recordType: "exit", recordTitle: empName })
    load()
  }

  const filtered = records.filter(r => {
    const q = search.toLowerCase()
    return (!q || r.employee_name.toLowerCase().includes(q) || (r.department ?? "").toLowerCase().includes(q)) &&
           (clearanceFilter === "all" || (r.clearance_status ?? "Pending") === clearanceFilter)
  })

  const cleared = records.filter(r => r.clearance_status === "Cleared")
  const pendingClearance = records.filter(r => r.clearance_status === "Pending")
  const interviewPending = records.filter(r => !r.exit_interview_done)

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-headline">Exit Management</h1>
          <p className="text-muted-foreground">Track employee exits, clearances, NOC, and exit interviews.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><PlusCircle className="h-4 w-4" />Initiate Exit</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>Initiate Employee Exit</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-1.5">
                <Label>Employee</Label>
                <Select value={empId} onValueChange={setEmpId}>
                  <SelectTrigger><SelectValue placeholder="Select employee" /></SelectTrigger>
                  <SelectContent>{employees.map(e => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label>Exit Type</Label>
                <Select value={exitType} onValueChange={setExitType}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>{EXIT_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label>Last Working Day</Label>
                  <Input type="date" value={lastDay} onChange={e => setLastDay(e.target.value)} />
                </div>
                <div className="grid gap-1.5">
                  <Label>Notice Period (days)</Label>
                  <Input value={noticePeriod} onChange={e => setNoticePeriod(e.target.value)} placeholder="30" />
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label>Exit Reason</Label>
                <Input value={exitReason} onChange={e => setExitReason(e.target.value)} placeholder="Optional reason" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleAdd} disabled={saving || !empId || !exitType || !lastDay}>{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Initiate Exit"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Exits", value: records.length, sub: "All-time records", icon: ArrowUpRight },
          { label: "Pending Clearance", value: pendingClearance.length, sub: "Awaiting clearance", icon: Clock, amber: true },
          { label: "Interviews Pending", value: interviewPending.length, sub: "Exit interviews due", icon: XCircle },
          { label: "Cleared", value: cleared.length, sub: "Full clearance done", icon: ShieldCheck },
        ].map(({ label, value, sub, icon: Icon, amber }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{label}</CardTitle><Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${amber ? "text-amber-600" : ""}`}>{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : value}</div>
              <p className="text-xs text-muted-foreground">{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by employee or department..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={clearanceFilter} onValueChange={setClearanceFilter}>
              <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="Clearance" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Cleared">Cleared</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div> : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead className="hidden md:table-cell">Dept</TableHead>
                  <TableHead className="hidden lg:table-cell">Exit Type</TableHead>
                  <TableHead className="hidden md:table-cell">Last Day</TableHead>
                  <TableHead>Clearance</TableHead>
                  <TableHead className="hidden lg:table-cell">NOC</TableHead>
                  <TableHead className="hidden lg:table-cell">Interview</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No exit records. Click "Initiate Exit" to add one.</TableCell></TableRow>
                ) : filtered.map(r => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7"><AvatarFallback className="text-xs">{initials(r.employee_name)}</AvatarFallback></Avatar>
                        <span className="font-medium text-sm">{r.employee_name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{r.department ?? "—"}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{r.exit_type ?? "—"}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{fmtDate(r.last_working_day)}</TableCell>
                    <TableCell><Badge variant={clearanceVariant(r.clearance_status)}>{r.clearance_status ?? "Pending"}</Badge></TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {r.noc_issued ? <Badge variant="secondary">Issued</Badge> : <Badge variant="outline">Pending</Badge>}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {r.exit_interview_done
                        ? <span className="text-sm text-muted-foreground">{r.exit_interview_rating ? `${r.exit_interview_rating}/5 ⭐` : "Done"}</span>
                        : <Badge variant="outline">Pending</Badge>}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          {r.clearance_status !== "Cleared" && (
                            <DropdownMenuItem onClick={() => updateField(r.id, { clearance_status: "Cleared" }, r.employee_name, "exit_clearance_done")}>
                              ✅ Mark Clearance Done
                            </DropdownMenuItem>
                          )}
                          {!r.noc_issued && (
                            <DropdownMenuItem onClick={() => updateField(r.id, { noc_issued: true }, r.employee_name, "exit_noc_issued")}>
                              📄 Issue NOC
                            </DropdownMenuItem>
                          )}
                          {!r.exit_interview_done && (
                            <DropdownMenuItem onClick={() => updateField(r.id, { exit_interview_done: true, exit_interview_rating: 4 }, r.employee_name, "exit_interview_done")}>
                              🎤 Mark Interview Done
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          {r.clearance_status === "Cleared" && (
                            <DropdownMenuItem onClick={() => updateField(r.id, { clearance_status: "Pending" }, r.employee_name, "exit_clearance_reverted")} className="text-muted-foreground">
                              Revert Clearance
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
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
