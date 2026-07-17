"use client"

import * as React from "react"
import { MoreHorizontal, PlusCircle, Search, CheckCircle2, CalendarClock, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { logErpActivity } from "@/lib/erp-logger"

type LeaveRecord = {
  id: string
  employee_name: string | null
  leave_type: string | null
  from_date: string | null
  to_date: string | null
  reason: string | null
  status: string | null
  created_at: string
}

type Employee = { id: string; name: string }

function getStatusVariant(status: string | null) {
  if (status === "Approved") return "secondary"
  if (status === "Pending") return "default"
  if (status === "Rejected") return "destructive"
  return "outline"
}

export default function LeaveManagementPage() {
  const [leaves, setLeaves] = React.useState<LeaveRecord[]>([])
  const [employees, setEmployees] = React.useState<Employee[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [open, setOpen] = React.useState(false)

  const [empId, setEmpId] = React.useState("")
  const [leaveType, setLeaveType] = React.useState("Casual")
  const [fromDate, setFromDate] = React.useState("")
  const [toDate, setToDate] = React.useState("")
  const [reason, setReason] = React.useState("")
  const [saving, setSaving] = React.useState(false)

  const refresh = React.useCallback(async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from("erp_leaves")
      .select("*")
      .order("created_at", { ascending: false })
    setLeaves(data ?? [])
  }, [])

  React.useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from("erp_leaves").select("*").order("created_at", { ascending: false }),
      supabase.from("erp_employees").select("id, name").order("name"),
    ]).then(([lv, emp]) => {
      setLeaves(lv.data ?? [])
      setEmployees(emp.data ?? [])
      setLoading(false)
    })
  }, [])

  async function updateStatus(id: string, status: string, empName: string) {
    const supabase = createClient()
    await supabase.from("erp_leaves").update({ status, updated_at: new Date().toISOString() }).eq("id", id)
    await logErpActivity({ employeeName: "Admin", action: `leave_${status.toLowerCase()}`, module: "hr", recordType: "leave", recordId: id, recordTitle: empName })
    await refresh()
  }

  async function handleSave() {
    if (!empId || !fromDate) return
    setSaving(true)
    const supabase = createClient()
    const emp = employees.find(e => e.id === empId)
    await supabase.from("erp_leaves").insert({
      employee_name: emp?.name,
      leave_type: leaveType,
      from_date: fromDate,
      to_date: toDate || fromDate,
      reason: reason || null,
      status: "Pending",
    })
    await logErpActivity({ employeeName: emp?.name ?? "Admin", action: "leave_requested", module: "hr", recordType: "leave", recordTitle: emp?.name })
    await refresh()
    setSaving(false)
    setOpen(false)
    setEmpId("")
    setFromDate("")
    setToDate("")
    setReason("")
  }

  const pending = leaves.filter(l => l.status === "Pending")
  const approved = leaves.filter(l => l.status === "Approved")
  const today = new Date().toISOString().split("T")[0]
  const onLeaveToday = approved.filter(l => l.from_date && l.to_date && l.from_date <= today && l.to_date >= today)

  const filtered = leaves.filter(l =>
    !search || (l.employee_name ?? "").toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Leave Management</h1>
        <p className="text-muted-foreground">Approve leave requests and track team availability.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pending.length}</div>
            <p className="text-xs text-muted-foreground">Require your approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team on Leave Today</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{onLeaveToday.length}</div>
            <p className="text-xs text-muted-foreground">{onLeaveToday.map(l => l.employee_name).join(", ") || "None"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved (Total)</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approved.length}</div>
            <p className="text-xs text-muted-foreground">All-time approved leaves</p>
          </CardContent>
        </Card>
      </div>

      {pending.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pending Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pending.map(l => (
                  <TableRow key={l.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback>{(l.employee_name ?? "?")[0]}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{l.employee_name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{l.from_date} {l.to_date && l.to_date !== l.from_date ? `→ ${l.to_date}` : ""}</TableCell>
                    <TableCell><Badge variant="outline">{l.leave_type}</Badge></TableCell>
                    <TableCell>{l.reason ?? "—"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => updateStatus(l.id, "Approved", l.employee_name ?? "")}>Approve</Button>
                        <Button variant="destructive" size="sm" onClick={() => updateStatus(l.id, "Rejected", l.employee_name ?? "")}>Reject</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Leave Records</CardTitle>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button><PlusCircle className="mr-2 h-4 w-4" />Log Leave</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Log Leave</DialogTitle>
                  <DialogDescription>Manually add a leave record for an employee.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Employee</Label>
                    <Select value={empId} onValueChange={setEmpId}>
                      <SelectTrigger><SelectValue placeholder="Select employee" /></SelectTrigger>
                      <SelectContent>
                        {employees.map(e => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Leave Type</Label>
                    <Select value={leaveType} onValueChange={setLeaveType}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Casual">Casual Leave</SelectItem>
                        <SelectItem value="Sick">Sick Leave</SelectItem>
                        <SelectItem value="Paid">Paid Leave</SelectItem>
                        <SelectItem value="Unpaid">Unpaid Leave</SelectItem>
                        <SelectItem value="WFH">WFH</SelectItem>
                        <SelectItem value="Emergency">Emergency Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>From</Label>
                      <Input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>To</Label>
                      <Input type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Reason</Label>
                    <Textarea placeholder="Reason for leave..." value={reason} onChange={e => setReason(e.target.value)} />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={handleSave} disabled={saving || !empId || !fromDate}>
                    {saving ? "Saving…" : "Save Record"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by employee..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-6 w-6 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(l => (
                  <TableRow key={l.id}>
                    <TableCell className="font-medium">{l.employee_name}</TableCell>
                    <TableCell><Badge variant="outline">{l.leave_type}</Badge></TableCell>
                    <TableCell>{l.from_date} {l.to_date && l.to_date !== l.from_date ? `→ ${l.to_date}` : ""}</TableCell>
                    <TableCell><Badge variant={getStatusVariant(l.status)}>{l.status}</Badge></TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" /><span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => updateStatus(l.id, "Approved", l.employee_name ?? "")}>Approve</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus(l.id, "Rejected", l.employee_name ?? "")}>Reject</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Cancel Leave</DropdownMenuItem>
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
