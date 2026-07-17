"use client"

import * as React from "react"
import { CalendarClock, UserCheck, FileText, Users, TrendingDown, ClipboardList, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

type Employee = { id: string; name: string; initials: string | null; status: string | null }
type Attendance = { id: string; employee_name: string | null; initials: string | null; check_in: string | null; status: string | null }
type Leave = { id: string; employee_name: string | null; from_date: string | null; to_date: string | null; reason: string | null; status: string | null }
type Performance = { id: string; employee_name: string | null; rating: number | null; period: string | null }
type Recruitment = { id: string; position: string; applicants: number | null; status: string | null }

function statusVariant(s: string | null) {
  if (s === "On Time" || s === "Present") return "secondary" as const
  if (s === "Late") return "destructive" as const
  return "outline" as const
}

function fmtDate(d: string | null) {
  if (!d) return "—"
  try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) } catch { return d }
}

export default function HrDashboardPage() {
  const [employees, setEmployees] = React.useState<Employee[]>([])
  const [attendance, setAttendance] = React.useState<Attendance[]>([])
  const [leaves, setLeaves] = React.useState<Leave[]>([])
  const [performers, setPerformers] = React.useState<Performance[]>([])
  const [openRoles, setOpenRoles] = React.useState<Recruitment[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const supabase = createClient()
    const today = new Date().toISOString().slice(0, 10)
    Promise.all([
      supabase.from("erp_employees").select("id, name, initials, status"),
      supabase.from("erp_attendance").select("id, employee_name, initials, check_in, status").eq("date", today),
      supabase.from("erp_leaves").select("id, employee_name, from_date, to_date, reason, status").eq("status", "Pending").limit(10),
      supabase.from("erp_performance").select("id, employee_name, rating, period").order("rating", { ascending: false }).limit(5),
      supabase.from("erp_recruitment").select("id, position, applicants, status").eq("status", "Open").limit(5),
    ]).then(([emp, att, lv, perf, rec]) => {
      setEmployees(emp.data ?? [])
      setAttendance(att.data ?? [])
      setLeaves(lv.data ?? [])
      setPerformers(perf.data ?? [])
      setOpenRoles(rec.data ?? [])
      setLoading(false)
    })
  }, [])

  const presentCount = attendance.filter(a => a.status !== "On Leave" && a.status !== "Absent").length
  const onLeaveCount = attendance.filter(a => a.status === "On Leave").length

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">HR Dashboard</h1>
        <p className="text-muted-foreground">Real-time view of your team's health and performance.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle><Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.length}</div>
            <p className="text-xs text-muted-foreground">{employees.filter(e => e.status === "Active").length} active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle><UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{presentCount}{employees.length > 0 ? `/${employees.length}` : ""}</div>
            <p className="text-xs text-muted-foreground">{employees.length > 0 ? `${Math.round((presentCount / employees.length) * 100)}% attendance` : "No data"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Leave Today</CardTitle><CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{onLeaveCount}</div>
            <p className="text-xs text-muted-foreground">Approved leaves</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Leave Requests</CardTitle><FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${leaves.length > 0 ? "text-yellow-600" : ""}`}>{leaves.length}</div>
            <p className="text-xs text-muted-foreground">{leaves.length > 0 ? "Action required" : "All cleared"}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Today's Attendance Log</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendance.length === 0 ? (
                  <TableRow><TableCell colSpan={3} className="text-center py-6 text-muted-foreground">No attendance recorded today.</TableCell></TableRow>
                ) : attendance.map(a => (
                  <TableRow key={a.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8"><AvatarFallback>{a.initials ?? (a.employee_name ?? "?").slice(0, 2).toUpperCase()}</AvatarFallback></Avatar>
                        <div className="font-medium">{a.employee_name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{a.check_in ? new Date(`1970-01-01T${a.check_in}`).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : "—"}</TableCell>
                    <TableCell><Badge variant={statusVariant(a.status)}>{a.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Pending Leave Requests</CardTitle>
              <Button size="sm" variant="outline" asChild><Link href="/admin/erp/hr/leaves">View All</Link></Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaves.length === 0 ? (
                  <TableRow><TableCell colSpan={3} className="text-center py-6 text-muted-foreground">No pending requests.</TableCell></TableRow>
                ) : leaves.map(l => (
                  <TableRow key={l.id}>
                    <TableCell>
                      <div className="font-medium">{l.employee_name}</div>
                      <div className="text-xs text-muted-foreground">{l.reason}</div>
                    </TableCell>
                    <TableCell className="text-sm">{fmtDate(l.from_date)} – {fmtDate(l.to_date)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" size="sm">Approve</Button>
                        <Button variant="destructive" size="sm">Reject</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Performance Highlights</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Top Performers</h3>
                {performers.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No performance records yet.</p>
                ) : performers.slice(0, 3).map(p => (
                  <div key={p.id} className="flex items-center gap-3 p-2 bg-secondary/50 rounded-lg mb-2">
                    <Avatar className="h-8 w-8"><AvatarFallback>{(p.employee_name ?? "?").slice(0, 2).toUpperCase()}</AvatarFallback></Avatar>
                    <div>
                      <p className="font-medium">{p.employee_name}</p>
                      <p className="text-xs text-primary">Rating: {p.rating}/5 — {p.period}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="font-semibold mb-2">Pending Reviews</h3>
                <div className="flex items-center gap-3 p-2 bg-yellow-500/10 rounded-lg">
                  <ClipboardList className="h-6 w-6 text-yellow-600" />
                  <p className="text-sm">{performers.filter(p => p.rating === null).length} reviews awaiting completion.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recruitment Pipeline</CardTitle>
              <Button size="sm" variant="outline" asChild><Link href="/admin/erp/hr/recruitment">View All</Link></Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {openRoles.length === 0 ? (
              <p className="text-sm text-muted-foreground">No open positions.</p>
            ) : openRoles.map(r => (
              <div key={r.id} className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                <span className="font-medium">{r.position}</span>
                <Badge>{r.applicants ?? 0} Applicants</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
