"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Edit2, Save, X, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"
import { logErpActivity } from "@/lib/erp-logger"

type Employee = {
  id: string; emp_id: string; name: string; initials: string | null
  department: string | null; role: string | null; status: string | null
  email: string | null; phone: string | null; manager: string | null
  employment_type: string | null; join_date: string | null
}
type Payslip = { id: string; month: number; year: number; basic: number | null; net_pay: number | null; status: string | null; paid_date: string | null }
type Leave = { id: string; leave_type: string; from_date: string; to_date: string; status: string | null; reason: string | null }
type Attendance = { id: string; date: string; check_in: string | null; check_out: string | null; hours: number | null; status: string | null }
type Performance = { id: string; period: string | null; rating: number | null; status: string | null; goals_total: number | null; goals_met: number | null }
type Training = { id: string; title: string; type: string | null; status: string | null; score: number | null; due_date: string | null }
type Document = { id: string; doc_type: string; file_name: string | null; verified: boolean | null; expiry_date: string | null }
type Benefit = { id: string; benefit_type: string; value: number | null; frequency: string | null; status: string | null }
type OnboardingTask = { id: string; task: string; status: string | null; due_date: string | null }
type ExitRecord = { id: string; exit_type: string | null; last_working_day: string | null; clearance_status: string | null }

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const DEPTS = ["Sales","Marketing","Engineering","HR","Operations","Finance","Customer Success","Legal"]
const EMP_TYPES = ["Full-time","Part-time","Intern","Consultant","Contractor"]

function fmt(d: string | null) {
  if (!d) return "—"
  try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) } catch { return d }
}
function fmtCurrency(n: number | null) { return `₹${(n ?? 0).toLocaleString("en-IN")}` }

export default function EmployeeProfilePage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [emp, setEmp] = React.useState<Employee | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [editing, setEditing] = React.useState(false)
  const [saving, setSaving] = React.useState(false)

  const [editName, setEditName] = React.useState("")
  const [editRole, setEditRole] = React.useState("")
  const [editDept, setEditDept] = React.useState("")
  const [editPhone, setEditPhone] = React.useState("")
  const [editEmail, setEditEmail] = React.useState("")
  const [editManager, setEditManager] = React.useState("")
  const [editType, setEditType] = React.useState("")

  const [payroll, setPayroll] = React.useState<Payslip[]>([])
  const [leaves, setLeaves] = React.useState<Leave[]>([])
  const [attendance, setAttendance] = React.useState<Attendance[]>([])
  const [performance, setPerformance] = React.useState<Performance[]>([])
  const [training, setTraining] = React.useState<Training[]>([])
  const [documents, setDocuments] = React.useState<Document[]>([])
  const [benefits, setBenefits] = React.useState<Benefit[]>([])
  const [onboarding, setOnboarding] = React.useState<OnboardingTask[]>([])
  const [exitRecord, setExitRecord] = React.useState<ExitRecord | null>(null)

  const [terminateOpen, setTerminateOpen] = React.useState(false)
  const [terminateReason, setTerminateReason] = React.useState("")
  const [lastDay, setLastDay] = React.useState("")

  async function load() {
    const supabase = createClient()
    const [empRes, payRes, leaveRes, attRes, perfRes, trainRes, docRes, benRes, onbRes, exitRes] = await Promise.all([
      supabase.from("erp_employees").select("*").eq("id", id).single(),
      supabase.from("erp_payroll").select("id,month,year,basic,net_pay,status,paid_date").eq("employee_id", id).order("year", { ascending: false }).order("month", { ascending: false }).limit(24),
      supabase.from("erp_leaves").select("id,leave_type,from_date,to_date,status,reason").eq("employee_id", id).order("from_date", { ascending: false }).limit(30),
      supabase.from("erp_attendance").select("id,date,check_in,check_out,hours,status").eq("employee_id", id).order("date", { ascending: false }).limit(30),
      supabase.from("erp_performance").select("id,period,rating,status,goals_total,goals_met").eq("employee_id", id).order("created_at", { ascending: false }),
      supabase.from("erp_training").select("id,title,type,status,score,due_date").eq("employee_id", id).order("created_at", { ascending: false }),
      supabase.from("erp_employee_documents").select("id,doc_type,file_name,verified,expiry_date").eq("employee_id", id).order("created_at", { ascending: false }),
      supabase.from("erp_benefits").select("id,benefit_type,value,frequency,status").eq("employee_id", id),
      supabase.from("erp_onboarding").select("id,task,status,due_date").eq("employee_id", id).order("due_date"),
      supabase.from("erp_exit_records").select("id,exit_type,last_working_day,clearance_status").eq("employee_id", id).maybeSingle(),
    ])

    if (empRes.data) {
      const e = empRes.data as Employee
      setEmp(e)
      setEditName(e.name); setEditRole(e.role ?? ""); setEditDept(e.department ?? "")
      setEditPhone(e.phone ?? ""); setEditEmail(e.email ?? ""); setEditManager(e.manager ?? ""); setEditType(e.employment_type ?? "")
    }
    setPayroll((payRes.data ?? []) as Payslip[])
    setLeaves((leaveRes.data ?? []) as Leave[])
    setAttendance((attRes.data ?? []) as Attendance[])
    setPerformance((perfRes.data ?? []) as Performance[])
    setTraining((trainRes.data ?? []) as Training[])
    setDocuments((docRes.data ?? []) as Document[])
    setBenefits((benRes.data ?? []) as Benefit[])
    setOnboarding((onbRes.data ?? []) as OnboardingTask[])
    setExitRecord((exitRes.data ?? null) as ExitRecord | null)
    setLoading(false)
  }

  React.useEffect(() => { load() }, [id])

  async function handleSave() {
    if (!emp) return
    setSaving(true)
    const supabase = createClient()
    await supabase.from("erp_employees").update({
      name: editName, role: editRole || null, department: editDept || null,
      phone: editPhone || null, email: editEmail || null,
      manager: editManager || null, employment_type: editType || null,
      initials: editName.trim().split(/\s+/).map((w: string) => w[0]).join("").slice(0, 2).toUpperCase(),
    }).eq("id", emp.id)
    await logErpActivity({ employeeName: "Admin", action: "employee_updated", module: "hr", recordType: "employee", recordTitle: editName })
    setSaving(false); setEditing(false); load()
  }

  async function handleTerminate() {
    if (!emp || !lastDay) return
    setSaving(true)
    const supabase = createClient()
    await Promise.all([
      supabase.from("erp_employees").update({ status: "Terminated" }).eq("id", emp.id),
      supabase.from("erp_exit_records").insert({
        employee_id: emp.id, employee_name: emp.name, department: emp.department,
        exit_type: "Termination", last_working_day: lastDay,
        exit_reason: terminateReason || null,
        clearance_status: "Pending", noc_issued: false, interview_done: false,
      }),
    ])
    await logErpActivity({ employeeName: "Admin", action: "employee_terminated", module: "hr", recordType: "employee", recordTitle: emp.name })
    setSaving(false); setTerminateOpen(false); load()
  }

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
  if (!emp) return <div className="py-12 text-center text-muted-foreground">Employee not found.</div>

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/admin/erp/hr/team")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Avatar className="h-14 w-14 text-lg">
            <AvatarFallback>{emp.initials ?? emp.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold font-headline">{emp.name}</h1>
            <p className="text-muted-foreground text-sm">{[emp.role, emp.department, emp.emp_id].filter(Boolean).join(" · ")}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={emp.status === "Active" ? "secondary" : emp.status === "Terminated" ? "destructive" : "outline"}>
            {emp.status ?? "Active"}
          </Badge>
          {!editing ? (
            <>
              <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                <Edit2 className="h-3.5 w-3.5 mr-1.5" />Edit
              </Button>
              {emp.status !== "Terminated" && (
                <Button variant="destructive" size="sm" onClick={() => setTerminateOpen(true)}>Terminate</Button>
              )}
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={() => setEditing(false)}>
                <X className="h-3.5 w-3.5 mr-1.5" />Cancel
              </Button>
              <Button size="sm" onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" /> : <Save className="h-3.5 w-3.5 mr-1.5" />}Save
              </Button>
            </>
          )}
        </div>
      </div>

      {exitRecord && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          Exit initiated · {exitRecord.exit_type} · Last day: {fmt(exitRecord.last_working_day)} · Clearance: {exitRecord.clearance_status}
          <Link href="/admin/erp/hr/exit" className="ml-auto underline shrink-0">View Exit Record →</Link>
        </div>
      )}

      <Tabs defaultValue="overview">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payroll">Payroll{payroll.length > 0 && <span className="ml-1.5 text-xs opacity-60">{payroll.length}</span>}</TabsTrigger>
          <TabsTrigger value="leaves">Leaves{leaves.length > 0 && <span className="ml-1.5 text-xs opacity-60">{leaves.length}</span>}</TabsTrigger>
          <TabsTrigger value="performance">Performance{performance.length > 0 && <span className="ml-1.5 text-xs opacity-60">{performance.length}</span>}</TabsTrigger>
          <TabsTrigger value="training">Training{training.length > 0 && <span className="ml-1.5 text-xs opacity-60">{training.length}</span>}</TabsTrigger>
          <TabsTrigger value="documents">Documents{documents.length > 0 && <span className="ml-1.5 text-xs opacity-60">{documents.length}</span>}</TabsTrigger>
          <TabsTrigger value="benefits">Benefits{benefits.length > 0 && <span className="ml-1.5 text-xs opacity-60">{benefits.length}</span>}</TabsTrigger>
        </TabsList>

        {/* OVERVIEW */}
        <TabsContent value="overview" className="space-y-6 pt-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Employee Details</CardTitle></CardHeader>
              <CardContent>
                {editing ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-1.5">
                      <Label>Full Name</Label>
                      <Input value={editName} onChange={e => setEditName(e.target.value)} />
                    </div>
                    <div className="grid gap-1.5">
                      <Label>Email</Label>
                      <Input value={editEmail} onChange={e => setEditEmail(e.target.value)} />
                    </div>
                    <div className="grid gap-1.5">
                      <Label>Phone</Label>
                      <Input value={editPhone} onChange={e => setEditPhone(e.target.value)} />
                    </div>
                    <div className="grid gap-1.5">
                      <Label>Role / Position</Label>
                      <Input value={editRole} onChange={e => setEditRole(e.target.value)} />
                    </div>
                    <div className="grid gap-1.5">
                      <Label>Department</Label>
                      <Select value={editDept} onValueChange={setEditDept}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>{DEPTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-1.5">
                      <Label>Employment Type</Label>
                      <Select value={editType} onValueChange={setEditType}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>{EMP_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-1.5 col-span-2">
                      <Label>Reporting Manager</Label>
                      <Input value={editManager} onChange={e => setEditManager(e.target.value)} />
                    </div>
                  </div>
                ) : (
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                    {([
                      ["Emp ID", emp.emp_id],
                      ["Joined", fmt(emp.join_date)],
                      ["Email", emp.email],
                      ["Phone", emp.phone],
                      ["Department", emp.department],
                      ["Role", emp.role],
                      ["Type", emp.employment_type],
                      ["Manager", emp.manager],
                    ] as [string, string | null][]).map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{k}</dt>
                        <dd className="font-semibold mt-0.5 truncate">{v ?? "—"}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Onboarding Tasks</CardTitle>
                  <Link href="/admin/erp/hr/onboarding">
                    <Button variant="ghost" size="sm" className="text-xs h-7">View All →</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {onboarding.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">No onboarding tasks assigned.</p>
                ) : (
                  <div className="space-y-1.5">
                    {onboarding.map(t => (
                      <div key={t.id} className="flex items-center justify-between gap-2 py-1.5 border-b last:border-0">
                        <span className={`text-sm ${t.status === "Completed" ? "line-through text-muted-foreground" : ""}`}>{t.task}</span>
                        <Badge variant={t.status === "Completed" ? "secondary" : t.status === "In Progress" ? "default" : "outline"} className="text-xs shrink-0">
                          {t.status ?? "Pending"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Recent Attendance</CardTitle>
                <Link href="/admin/erp/hr/attendance"><Button variant="ghost" size="sm" className="text-xs h-7">View All →</Button></Link>
              </div>
            </CardHeader>
            <CardContent>
              {attendance.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">No attendance records found.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Check In</TableHead>
                      <TableHead>Check Out</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendance.slice(0, 10).map(a => (
                      <TableRow key={a.id}>
                        <TableCell className="text-sm">{fmt(a.date)}</TableCell>
                        <TableCell className="font-mono text-sm">{a.check_in ?? "—"}</TableCell>
                        <TableCell className="font-mono text-sm">{a.check_out ?? "—"}</TableCell>
                        <TableCell className="text-sm">{a.hours ? `${a.hours}h` : "—"}</TableCell>
                        <TableCell>
                          <Badge variant={a.status === "Present" ? "secondary" : a.status === "Absent" ? "destructive" : "outline"} className="text-xs">
                            {a.status ?? "—"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* PAYROLL */}
        <TabsContent value="payroll" className="pt-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Payroll History</CardTitle>
                <Link href="/admin/erp/hr/payroll"><Button variant="ghost" size="sm" className="text-xs h-7">Manage →</Button></Link>
              </div>
            </CardHeader>
            <CardContent>
              {payroll.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No payroll records yet.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead className="text-right">Basic</TableHead>
                      <TableHead className="text-right">Net Pay</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Paid On</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payroll.map(p => (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{MONTHS[(p.month ?? 1) - 1]} {p.year}</TableCell>
                        <TableCell className="text-right text-sm">{fmtCurrency(p.basic)}</TableCell>
                        <TableCell className="text-right font-semibold">{fmtCurrency(p.net_pay)}</TableCell>
                        <TableCell><Badge variant={p.status === "Paid" ? "secondary" : p.status === "Processed" ? "default" : "outline"} className="text-xs">{p.status}</Badge></TableCell>
                        <TableCell className="text-muted-foreground text-sm">{fmt(p.paid_date)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* LEAVES */}
        <TabsContent value="leaves" className="pt-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Leave History</CardTitle>
                <Link href="/admin/erp/hr/leaves"><Button variant="ghost" size="sm" className="text-xs h-7">Manage →</Button></Link>
              </div>
            </CardHeader>
            <CardContent>
              {leaves.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No leave records found.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead className="hidden md:table-cell">Reason</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaves.map(l => (
                      <TableRow key={l.id}>
                        <TableCell className="font-medium">{l.leave_type}</TableCell>
                        <TableCell className="text-sm">{fmt(l.from_date)}</TableCell>
                        <TableCell className="text-sm">{fmt(l.to_date)}</TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground text-sm max-w-[200px] truncate">{l.reason ?? "—"}</TableCell>
                        <TableCell><Badge variant={l.status === "Approved" ? "secondary" : l.status === "Rejected" ? "destructive" : "outline"} className="text-xs">{l.status ?? "Pending"}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* PERFORMANCE */}
        <TabsContent value="performance" className="pt-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Performance Reviews</CardTitle>
                <Link href="/admin/erp/hr/performance"><Button variant="ghost" size="sm" className="text-xs h-7">Manage →</Button></Link>
              </div>
            </CardHeader>
            <CardContent>
              {performance.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No reviews yet. Add one from the Performance module.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Goals Met</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {performance.map(p => (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{p.period ?? "—"}</TableCell>
                        <TableCell>{p.rating !== null ? `${p.rating}/5 ⭐` : "—"}</TableCell>
                        <TableCell>{p.goals_total ? `${p.goals_met ?? 0} / ${p.goals_total}` : "—"}</TableCell>
                        <TableCell><Badge variant={p.status === "Completed" ? "secondary" : "outline"} className="text-xs">{p.status ?? "Pending"}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* TRAINING */}
        <TabsContent value="training" className="pt-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Training Records</CardTitle>
                <Link href="/admin/erp/hr/training"><Button variant="ghost" size="sm" className="text-xs h-7">Manage →</Button></Link>
              </div>
            </CardHeader>
            <CardContent>
              {training.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No training assigned yet.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead className="hidden md:table-cell">Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Score</TableHead>
                      <TableHead className="hidden md:table-cell">Due</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {training.map(t => (
                      <TableRow key={t.id}>
                        <TableCell className="font-medium">{t.title}</TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{t.type ?? "—"}</TableCell>
                        <TableCell><Badge variant={t.status === "Completed" ? "secondary" : t.status === "In Progress" ? "default" : "outline"} className="text-xs">{t.status ?? "Assigned"}</Badge></TableCell>
                        <TableCell className="text-right font-semibold text-sm">{t.score !== null ? `${t.score}%` : "—"}</TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{fmt(t.due_date)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* DOCUMENTS */}
        <TabsContent value="documents" className="pt-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Documents</CardTitle>
                <Link href="/admin/erp/hr/documents"><Button variant="ghost" size="sm" className="text-xs h-7">Manage →</Button></Link>
              </div>
            </CardHeader>
            <CardContent>
              {documents.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No documents uploaded. Add from the Documents module.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead className="hidden md:table-cell">File</TableHead>
                      <TableHead>Expiry</TableHead>
                      <TableHead>Verified</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map(d => (
                      <TableRow key={d.id}>
                        <TableCell className="font-medium">{d.doc_type}</TableCell>
                        <TableCell className="hidden md:table-cell font-mono text-xs text-muted-foreground">{d.file_name ?? "—"}</TableCell>
                        <TableCell className="text-sm">{fmt(d.expiry_date)}</TableCell>
                        <TableCell>{d.verified ? <Badge variant="secondary" className="text-xs">Verified</Badge> : <Badge variant="outline" className="text-xs">Pending</Badge>}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* BENEFITS */}
        <TabsContent value="benefits" className="pt-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Benefits</CardTitle>
                <Link href="/admin/erp/hr/benefits"><Button variant="ghost" size="sm" className="text-xs h-7">Manage →</Button></Link>
              </div>
            </CardHeader>
            <CardContent>
              {benefits.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No benefits assigned yet.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {benefits.map(b => (
                      <TableRow key={b.id}>
                        <TableCell className="font-medium">{b.benefit_type}</TableCell>
                        <TableCell className="text-right font-semibold">{fmtCurrency(b.value)}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{b.frequency ?? "—"}</TableCell>
                        <TableCell><Badge variant={b.status === "Active" ? "secondary" : "outline"} className="text-xs">{b.status ?? "Active"}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Terminate Dialog */}
      <Dialog open={terminateOpen} onOpenChange={setTerminateOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle className="text-destructive">Terminate {emp.name}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
            <p className="text-sm text-muted-foreground">This will set the employee status to Terminated and open an exit record. You can manage their clearance and NOC from the Exit Management module.</p>
            <div className="grid gap-1.5">
              <Label>Last Working Day <span className="text-destructive">*</span></Label>
              <Input type="date" value={lastDay} onChange={e => setLastDay(e.target.value)} />
            </div>
            <div className="grid gap-1.5">
              <Label>Reason (optional)</Label>
              <Input value={terminateReason} onChange={e => setTerminateReason(e.target.value)} placeholder="e.g. Performance, Restructuring…" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTerminateOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleTerminate} disabled={saving || !lastDay}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm Termination"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
