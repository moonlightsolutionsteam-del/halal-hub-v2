"use client"

import * as React from "react"
import { PlusCircle, Search, CheckCircle2, AlertTriangle, Clock, UserCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { logErpActivity } from "@/lib/erp-logger"

type AttendanceRecord = {
  id: string
  employee_name: string | null
  initials: string | null
  date: string
  check_in: string | null
  check_out: string | null
  hours: number | null
  status: string | null
  notes: string | null
}

type Employee = { id: string; name: string; initials: string | null }

function getStatusVariant(status: string | null) {
  if (status === "On Time" || status === "Present") return "secondary"
  if (status === "Late") return "destructive"
  if (status === "On Leave") return "outline"
  if (status === "Absent") return "destructive"
  return "default"
}

export default function AttendancePage() {
  const [records, setRecords] = React.useState<AttendanceRecord[]>([])
  const [employees, setEmployees] = React.useState<Employee[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [open, setOpen] = React.useState(false)

  const [selectedEmpId, setSelectedEmpId] = React.useState("")
  const [checkIn, setCheckIn] = React.useState("")
  const [checkOut, setCheckOut] = React.useState("")
  const [status, setStatus] = React.useState("Present")
  const [notes, setNotes] = React.useState("")
  const [saving, setSaving] = React.useState(false)

  const today = new Date().toISOString().split("T")[0]

  React.useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from("erp_attendance").select("*").eq("date", today).order("employee_name"),
      supabase.from("erp_employees").select("id, name, initials").order("name"),
    ]).then(([att, emp]) => {
      setRecords(att.data ?? [])
      setEmployees(emp.data ?? [])
      setLoading(false)
    })
  }, [today])

  async function handleSave() {
    if (!selectedEmpId) return
    setSaving(true)
    const supabase = createClient()
    const emp = employees.find(e => e.id === selectedEmpId)
    let hours: number | null = null
    if (checkIn && checkOut) {
      const [h1, m1] = checkIn.split(":").map(Number)
      const [h2, m2] = checkOut.split(":").map(Number)
      hours = Math.round(((h2 * 60 + m2) - (h1 * 60 + m1)) / 6) / 10
    }
    await supabase.from("erp_attendance").insert({
      employee_id: selectedEmpId,
      employee_name: emp?.name,
      initials: emp?.initials,
      date: today,
      check_in: checkIn || null,
      check_out: checkOut || null,
      hours,
      status,
      notes: notes || null,
    })
    await logErpActivity({ employeeName: emp?.name ?? "Admin", action: "marked_attendance", module: "hr", recordType: "attendance", recordTitle: emp?.name })
    const { data } = await supabase.from("erp_attendance").select("*").eq("date", today).order("employee_name")
    setRecords(data ?? [])
    setSaving(false)
    setOpen(false)
    setSelectedEmpId("")
    setCheckIn("")
    setCheckOut("")
    setStatus("Present")
    setNotes("")
  }

  const filtered = records.filter(r =>
    !search || (r.employee_name ?? "").toLowerCase().includes(search.toLowerCase())
  )

  const present = records.filter(r => r.status === "On Time" || r.status === "Present" || r.status === "Late").length
  const onTime = records.filter(r => r.status === "On Time").length
  const onLeave = records.filter(r => r.status === "On Leave").length
  const absent = records.filter(r => r.status === "Absent").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Attendance Management</h1>
        <p className="text-muted-foreground">Track and manage employee attendance logs.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{present}/{records.length}</div>
            <p className="text-xs text-muted-foreground">{records.length ? Math.round(present / records.length * 100) : 0}% of team</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Time</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{onTime}</div>
            <p className="text-xs text-muted-foreground">vs {records.filter(r => r.status === "Late").length} Late</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Leave</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{onLeave}</div>
            <p className="text-xs text-muted-foreground">Approved leave</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{absent}</div>
            <p className="text-xs text-muted-foreground">Unplanned absence</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Attendance Log — {today}</CardTitle>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button><PlusCircle className="mr-2 h-4 w-4" />Mark Attendance</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Manual Attendance Entry</DialogTitle>
                  <DialogDescription>Manually log attendance for an employee.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Employee</Label>
                    <Select value={selectedEmpId} onValueChange={setSelectedEmpId}>
                      <SelectTrigger><SelectValue placeholder="Select an employee" /></SelectTrigger>
                      <SelectContent>
                        {employees.map(e => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Check-in</Label>
                      <Input type="time" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Check-out</Label>
                      <Input type="time" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="On Time">On Time</SelectItem>
                        <SelectItem value="Late">Late</SelectItem>
                        <SelectItem value="Present">Present</SelectItem>
                        <SelectItem value="On Leave">On Leave</SelectItem>
                        <SelectItem value="Absent">Absent</SelectItem>
                        <SelectItem value="WFH">Work From Home</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Notes (Optional)</Label>
                    <Textarea placeholder="e.g., Left early for appointment." value={notes} onChange={e => setNotes(e.target.value)} />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={handleSave} disabled={saving || !selectedEmpId}>
                    {saving ? "Saving…" : "Save Entry"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by employee name..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
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
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(r => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback>{r.initials ?? "?"}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{r.employee_name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{r.check_in ?? "—"}</TableCell>
                    <TableCell>{r.check_out ?? "—"}</TableCell>
                    <TableCell>{r.hours != null ? `${r.hours}h` : "—"}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(r.status)}>{r.status ?? "Unknown"}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Edit</Button>
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
