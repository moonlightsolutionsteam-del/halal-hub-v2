"use client"

import * as React from "react"
import {
  CalendarClock, UserCheck, FileText, Users, ClipboardList, Loader2,
  Wallet, Rocket, ArrowUpRight, GraduationCap, FolderOpen, AlertTriangle,
  CheckCircle2, Clock,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"
import { logErpActivity } from "@/lib/erp-logger"
import Link from "next/link"

type Employee = { id: string; name: string; initials: string | null; status: string | null }
type Attendance = { id: string; employee_name: string | null; initials: string | null; check_in: string | null; status: string | null }
type Leave = { id: string; employee_name: string | null; from_date: string | null; to_date: string | null; reason: string | null; status: string | null }
type Performance = { id: string; employee_name: string | null; rating: number | null; period: string | null }
type Recruitment = { id: string; position: string; applicants: number | null; status: string | null }
type OnboardingTask = { id: string; employee_name: string; task_name: string; due_date: string | null; status: string | null }
type TrainingRecord = { id: string; employee_name: string; course_title: string; due_date: string | null; status: string | null }
type ExitRecord = { id: string; employee_name: string; exit_type: string | null; last_working_day: string | null; clearance_status: string | null }
type PayrollRow = { id: string; employee_name: string; month: number; year: number; net_pay: number | null; status: string | null }
type Doc = { id: string; employee_name: string; doc_type: string; expiry_date: string | null; verified: boolean | null }

function fmtDate(d: string | null) {
  if (!d) return "—"
  try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) } catch { return d }
}

function isExpiringSoon(expiry: string | null) {
  if (!expiry) return false
  const diff = new Date(expiry).getTime() - Date.now()
  return diff > 0 && diff < 30 * 24 * 60 * 60 * 1000
}

function isOverdue(d: string | null, status: string | null) {
  if (!d || status === "Completed") return false
  return new Date(d) < new Date()
}

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

export default function HrDashboardPage() {
  const [employees, setEmployees] = React.useState<Employee[]>([])
  const [attendance, setAttendance] = React.useState<Attendance[]>([])
  const [leaves, setLeaves] = React.useState<Leave[]>([])
  const [performers, setPerformers] = React.useState<Performance[]>([])
  const [openRoles, setOpenRoles] = React.useState<Recruitment[]>([])
  const [onboardingTasks, setOnboardingTasks] = React.useState<OnboardingTask[]>([])
  const [trainingRecords, setTrainingRecords] = React.useState<TrainingRecord[]>([])
  const [exitRecords, setExitRecords] = React.useState<ExitRecord[]>([])
  const [payrollRows, setPayrollRows] = React.useState<PayrollRow[]>([])
  const [docs, setDocs] = React.useState<Doc[]>([])
  const [loading, setLoading] = React.useState(true)

  const now = new Date()
  const currentMonth = now.getMonth() + 1
  const currentYear = now.getFullYear()

  function loadLeaves() {
    const supabase = createClient()
    supabase.from("erp_leaves").select("id, employee_name, from_date, to_date, reason, status").eq("status", "Pending").limit(10)
      .then(({ data }) => setLeaves(data ?? []))
  }

  React.useEffect(() => {
    const supabase = createClient()
    const today = now.toISOString().slice(0, 10)
    Promise.all([
      supabase.from("erp_employees").select("id, name, initials, status"),
      supabase.from("erp_attendance").select("id, employee_name, initials, check_in, status").eq("date", today),
      supabase.from("erp_leaves").select("id, employee_name, from_date, to_date, reason, status").eq("status", "Pending").limit(10),
      supabase.from("erp_performance").select("id, employee_name, rating, period").order("rating", { ascending: false }).limit(5),
      supabase.from("erp_recruitment").select("id, position, applicants, status").eq("status", "Open").limit(5),
      supabase.from("erp_onboarding_tasks").select("id, employee_name, task_name, due_date, status").neq("status", "Completed").order("due_date").limit(10),
      supabase.from("erp_training_records").select("id, employee_name, course_title, due_date, status").in("status", ["Assigned", "In Progress"]).order("due_date").limit(10),
      supabase.from("erp_exit_records").select("id, employee_name, exit_type, last_working_day, clearance_status").neq("clearance_status", "Cleared").limit(10),
      supabase.from("erp_payroll").select("id, employee_name, month, year, net_pay, status").eq("month", currentMonth).eq("year", currentYear).limit(50),
      supabase.from("erp_employee_documents").select("id, employee_name, doc_type, expiry_date, verified").limit(200),
    ]).then(([emp, att, lv, perf, rec, ob, tr, ex, pay, dc]) => {
      setEmployees(emp.data ?? [])
      setAttendance(att.data ?? [])
      setLeaves(lv.data ?? [])
      setPerformers(perf.data ?? [])
      setOpenRoles(rec.data ?? [])
      setOnboardingTasks(ob.data ?? [])
      setTrainingRecords(tr.data ?? [])
      setExitRecords(ex.data ?? [])
      setPayrollRows(pay.data ?? [])
      setDocs(dc.data ?? [])
      setLoading(false)
    })
  }, [])

  async function approveLeave(id: string, empName: string) {
    const supabase = createClient()
    await supabase.from("erp_leaves").update({ status: "Approved" }).eq("id", id)
    await logErpActivity({ employeeName: "Admin", action: "leave_approved", module: "hr", recordType: "leave", recordTitle: empName })
    loadLeaves()
  }

  async function rejectLeave(id: string, empName: string) {
    const supabase = createClient()
    await supabase.from("erp_leaves").update({ status: "Rejected" }).eq("id", id)
    await logErpActivity({ employeeName: "Admin", action: "leave_rejected", module: "hr", recordType: "leave", recordTitle: empName })
    loadLeaves()
  }

  const presentCount = attendance.filter(a => a.status !== "On Leave" && a.status !== "Absent").length
  const onLeaveCount = attendance.filter(a => a.status === "On Leave").length

  // New module derived stats
  const overdueOnboarding = onboardingTasks.filter(t => isOverdue(t.due_date, t.status))
  const pendingExitClearance = exitRecords.filter(r => r.clearance_status !== "Cleared")
  const payrollDrafts = payrollRows.filter(r => r.status === "Draft")
  const expiringDocs = docs.filter(d => isExpiringSoon(d.expiry_date))
  const unverifiedDocs = docs.filter(d => !d.verified)
  const trainingDue = trainingRecords.filter(r => r.due_date && new Date(r.due_date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">HR Dashboard</h1>
        <p className="text-muted-foreground">Real-time view of your team's health across all HR functions.</p>
      </div>

      {/* Row 1 — Core stats */}
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
            <div className={`text-2xl font-bold ${leaves.length > 0 ? "text-amber-600" : ""}`}>{leaves.length}</div>
            <p className="text-xs text-muted-foreground">{leaves.length > 0 ? "Action required" : "All cleared"}</p>
          </CardContent>
        </Card>
      </div>

      {/* Row 2 — New module stats */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payroll Drafts</CardTitle><Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${payrollDrafts.length > 0 ? "text-amber-600" : ""}`}>{payrollDrafts.length}</div>
            <p className="text-xs text-muted-foreground">{MONTHS[currentMonth - 1]} {currentYear} — unprocessed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Onboarding Overdue</CardTitle><Rocket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${overdueOnboarding.length > 0 ? "text-destructive" : ""}`}>{overdueOnboarding.length}</div>
            <p className="text-xs text-muted-foreground">{onboardingTasks.length} pending tasks total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exit Pending Clearance</CardTitle><ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${pendingExitClearance.length > 0 ? "text-amber-600" : ""}`}>{pendingExitClearance.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting full clearance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Docs Expiring Soon</CardTitle><FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${expiringDocs.length > 0 ? "text-amber-600" : ""}`}>{expiringDocs.length}</div>
            <p className="text-xs text-muted-foreground">{unverifiedDocs.length} unverified</p>
          </CardContent>
        </Card>
      </div>

      {/* Section 1 — Attendance + Leave requests */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Today's Attendance</CardTitle>
              <Button size="sm" variant="outline" asChild><Link href="/admin/erp/hr/attendance">View All</Link></Button>
            </div>
          </CardHeader>
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
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7"><AvatarFallback className="text-xs">{a.initials ?? (a.employee_name ?? "?").slice(0, 2).toUpperCase()}</AvatarFallback></Avatar>
                        <span className="font-medium text-sm">{a.employee_name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{a.check_in ? new Date(`1970-01-01T${a.check_in}`).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : "—"}</TableCell>
                    <TableCell>
                      <Badge variant={a.status === "On Time" || a.status === "Present" ? "secondary" : a.status === "Late" ? "destructive" : "outline"}>
                        {a.status}
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
                      <div className="font-medium text-sm">{l.employee_name}</div>
                      <div className="text-xs text-muted-foreground">{l.reason}</div>
                    </TableCell>
                    <TableCell className="text-sm whitespace-nowrap">{fmtDate(l.from_date)} – {fmtDate(l.to_date)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" size="sm" onClick={() => approveLeave(l.id, l.employee_name ?? "")}>Approve</Button>
                        <Button variant="destructive" size="sm" onClick={() => rejectLeave(l.id, l.employee_name ?? "")}>Reject</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Section 2 — Onboarding + Payroll this month */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Onboarding — Open Tasks</CardTitle>
              <Button size="sm" variant="outline" asChild><Link href="/admin/erp/hr/onboarding">View All</Link></Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {onboardingTasks.length === 0 ? (
                  <TableRow><TableCell colSpan={4} className="text-center py-6 text-muted-foreground">All onboarding tasks complete.</TableCell></TableRow>
                ) : onboardingTasks.slice(0, 6).map(t => (
                  <TableRow key={t.id}>
                    <TableCell className="text-sm font-medium">{t.employee_name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground truncate max-w-[120px]">{t.task_name}</TableCell>
                    <TableCell className="text-sm">
                      <span className={isOverdue(t.due_date, t.status) ? "text-destructive font-medium" : "text-muted-foreground"}>
                        {fmtDate(t.due_date)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={t.status === "In Progress" ? "default" : "outline"}>{t.status ?? "Pending"}</Badge>
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
              <CardTitle>Payroll — {MONTHS[currentMonth - 1]} {currentYear}</CardTitle>
              <Button size="sm" variant="outline" asChild><Link href="/admin/erp/hr/payroll">Manage</Link></Button>
            </div>
          </CardHeader>
          <CardContent>
            {payrollRows.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">No payroll entries this month.</p>
            ) : (
              <div className="space-y-3">
                {[
                  { label: "Draft", icon: Clock, color: "text-amber-600", count: payrollRows.filter(r => r.status === "Draft").length },
                  { label: "Processed", icon: CheckCircle2, color: "text-primary", count: payrollRows.filter(r => r.status === "Processed").length },
                  { label: "Paid", icon: Wallet, color: "text-green-600", count: payrollRows.filter(r => r.status === "Paid").length },
                ].map(({ label, icon: Icon, color, count }) => (
                  <div key={label} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Icon className={`h-4 w-4 ${color}`} />
                      <span className="text-sm font-medium">{label}</span>
                    </div>
                    <span className={`font-bold ${color}`}>{count} payslip{count !== 1 ? "s" : ""}</span>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground pt-1 text-right">
                  Total MTD paid: ₹{payrollRows.filter(r => r.status === "Paid").reduce((s, r) => s + (r.net_pay ?? 0), 0).toLocaleString("en-IN")}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Section 3 — Training + Exit */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Training — In Progress / Due</CardTitle>
              <Button size="sm" variant="outline" asChild><Link href="/admin/erp/hr/training">View All</Link></Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainingRecords.length === 0 ? (
                  <TableRow><TableCell colSpan={4} className="text-center py-6 text-muted-foreground">No active training courses.</TableCell></TableRow>
                ) : trainingRecords.slice(0, 6).map(r => (
                  <TableRow key={r.id}>
                    <TableCell className="text-sm font-medium">{r.employee_name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground truncate max-w-[120px]">{r.course_title}</TableCell>
                    <TableCell className="text-sm">
                      <span className={r.due_date && new Date(r.due_date) < new Date() ? "text-destructive font-medium" : "text-muted-foreground"}>
                        {fmtDate(r.due_date)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={r.status === "In Progress" ? "default" : "outline"}>{r.status ?? "Assigned"}</Badge>
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
              <CardTitle>Exit Management — Pending</CardTitle>
              <Button size="sm" variant="outline" asChild><Link href="/admin/erp/hr/exit">View All</Link></Button>
            </div>
          </CardHeader>
          <CardContent>
            {exitRecords.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">No pending exit clearances.</p>
            ) : (
              <div className="space-y-2">
                {exitRecords.slice(0, 5).map(r => (
                  <div key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div>
                      <p className="font-medium text-sm">{r.employee_name}</p>
                      <p className="text-xs text-muted-foreground">{r.exit_type} · Last day: {fmtDate(r.last_working_day)}</p>
                    </div>
                    <Badge variant="outline" className="text-amber-600 border-amber-300">Pending</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Section 4 — Performance + Recruitment */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Performance Highlights</CardTitle>
              <Button size="sm" variant="outline" asChild><Link href="/admin/erp/hr/performance">View All</Link></Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Top Performers</h3>
              {performers.length === 0 ? (
                <p className="text-sm text-muted-foreground">No performance records yet.</p>
              ) : performers.slice(0, 3).map(p => (
                <div key={p.id} className="flex items-center gap-3 p-2 bg-secondary/50 rounded-lg">
                  <Avatar className="h-8 w-8"><AvatarFallback className="text-xs">{(p.employee_name ?? "?").slice(0, 2).toUpperCase()}</AvatarFallback></Avatar>
                  <div>
                    <p className="font-medium text-sm">{p.employee_name}</p>
                    <p className="text-xs text-primary">Rating: {p.rating}/5 — {p.period}</p>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-3 p-3 bg-amber-500/10 rounded-lg">
                <ClipboardList className="h-5 w-5 text-amber-600 shrink-0" />
                <p className="text-sm">{performers.filter(p => p.rating === null).length} reviews pending completion</p>
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
          <CardContent className="space-y-2">
            {openRoles.length === 0 ? (
              <p className="text-sm text-muted-foreground">No open positions.</p>
            ) : openRoles.map(r => (
              <div key={r.id} className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                <span className="font-medium text-sm">{r.position}</span>
                <Badge>{r.applicants ?? 0} Applicants</Badge>
              </div>
            ))}
            {expiringDocs.length > 0 && (
              <div className="flex items-center gap-2 p-3 bg-amber-500/10 rounded-lg mt-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  <span className="font-semibold">{expiringDocs.length} document{expiringDocs.length !== 1 ? "s" : ""}</span> expiring within 30 days.{" "}
                  <Link href="/admin/erp/hr/documents" className="underline">Review</Link>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
