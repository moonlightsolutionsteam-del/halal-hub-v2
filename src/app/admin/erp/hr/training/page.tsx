"use client"

import * as React from "react"
import { Loader2, Search, GraduationCap, Clock, CheckCircle2, BarChart3, MoreHorizontal, PlusCircle } from "lucide-react"
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

type TrainingRecord = {
  id: string; employee_name: string; course_title: string
  training_type: string | null; trainer: string | null
  duration_hours: number | null; score: number | null
  status: string | null; due_date: string | null; completed_date: string | null
}
type Employee = { id: string; name: string }

const TRAINING_TYPES = ["Technical", "Soft Skills", "Compliance", "Safety", "Leadership", "Product", "Customer Service", "Other"]

function statusVariant(s: string | null) {
  if (s === "Completed") return "secondary" as const
  if (s === "In Progress") return "default" as const
  return "outline" as const
}

function fmtDate(d: string | null) {
  if (!d) return "—"
  try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) } catch { return d }
}

function initials(name: string) { return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() }

export default function TrainingPage() {
  const [records, setRecords] = React.useState<TrainingRecord[]>([])
  const [employees, setEmployees] = React.useState<Employee[]>([])
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [open, setOpen] = React.useState(false)
  const [completeOpen, setCompleteOpen] = React.useState(false)
  const [completingId, setCompletingId] = React.useState("")
  const [completingName, setCompletingName] = React.useState("")
  const [completingCourse, setCompletingCourse] = React.useState("")
  const [score, setScore] = React.useState("")

  const [empId, setEmpId] = React.useState("")
  const [courseTitle, setCourseTitle] = React.useState("")
  const [trainingType, setTrainingType] = React.useState("")
  const [trainer, setTrainer] = React.useState("")
  const [durationHours, setDurationHours] = React.useState("")
  const [dueDate, setDueDate] = React.useState("")

  function load() {
    const supabase = createClient()
    supabase.from("erp_training_records")
      .select("id, employee_name, course_title, training_type, trainer, duration_hours, score, status, due_date, completed_date")
      .order("due_date", { ascending: true }).limit(300)
      .then(({ data }) => { setRecords(data ?? []); setLoading(false) })
  }

  React.useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from("erp_training_records").select("id, employee_name, course_title, training_type, trainer, duration_hours, score, status, due_date, completed_date").order("due_date", { ascending: true }).limit(300),
      supabase.from("erp_employees").select("id, name").eq("status", "Active").order("name"),
    ]).then(([t, e]) => { setRecords(t.data ?? []); setEmployees(e.data ?? []); setLoading(false) })
  }, [])

  async function handleAdd() {
    if (!empId || !courseTitle) return
    setSaving(true)
    const emp = employees.find(e => e.id === empId)
    const supabase = createClient()
    await supabase.from("erp_training_records").insert({
      employee_id: empId, employee_name: emp!.name,
      course_title: courseTitle, training_type: trainingType || null,
      trainer: trainer || null, duration_hours: durationHours ? Number(durationHours) : null,
      due_date: dueDate || null, status: "Assigned",
    })
    await logErpActivity({ employeeName: "Admin", action: "training_assigned", module: "hr", recordType: "training", recordTitle: `${courseTitle} — ${emp!.name}` })
    setSaving(false); setOpen(false)
    setEmpId(""); setCourseTitle(""); setTrainingType(""); setTrainer(""); setDurationHours(""); setDueDate("")
    load()
  }

  async function updateStatus(id: string, status: string, empName: string, course: string) {
    const supabase = createClient()
    await supabase.from("erp_training_records").update({ status }).eq("id", id)
    await logErpActivity({ employeeName: "Admin", action: `training_${status.toLowerCase()}`, module: "hr", recordType: "training", recordTitle: `${course} — ${empName}` })
    load()
  }

  async function handleComplete() {
    if (!completingId) return
    const supabase = createClient()
    await supabase.from("erp_training_records").update({
      status: "Completed",
      score: score ? Number(score) : null,
      completed_date: new Date().toISOString().split("T")[0],
    }).eq("id", completingId)
    await logErpActivity({ employeeName: "Admin", action: "training_completed", module: "hr", recordType: "training", recordTitle: `${completingCourse} — ${completingName}` })
    setCompleteOpen(false); setScore(""); setCompletingId(""); setCompletingName(""); setCompletingCourse("")
    load()
  }

  const filtered = records.filter(r => {
    const q = search.toLowerCase()
    return (!q || r.employee_name.toLowerCase().includes(q) || r.course_title.toLowerCase().includes(q) || (r.training_type ?? "").toLowerCase().includes(q)) &&
           (statusFilter === "all" || (r.status ?? "Assigned") === statusFilter)
  })

  const completed = records.filter(r => r.status === "Completed")
  const inProgress = records.filter(r => r.status === "In Progress")
  const completedWithScore = completed.filter(r => r.score !== null)
  const avgScore = completedWithScore.length ? Math.round(completedWithScore.reduce((s, r) => s + (r.score ?? 0), 0) / completedWithScore.length) : 0

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-headline">Training & LMS</h1>
          <p className="text-muted-foreground">Assign courses, track progress, and record completion scores.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><PlusCircle className="h-4 w-4" />Assign Training</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>Assign Training Course</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-1.5">
                <Label>Employee</Label>
                <Select value={empId} onValueChange={setEmpId}>
                  <SelectTrigger><SelectValue placeholder="Select employee" /></SelectTrigger>
                  <SelectContent>{employees.map(e => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label>Course Title</Label>
                <Input value={courseTitle} onChange={e => setCourseTitle(e.target.value)} placeholder="e.g. Advanced Excel" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label>Type</Label>
                  <Select value={trainingType} onValueChange={setTrainingType}>
                    <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                    <SelectContent>{TRAINING_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1.5">
                  <Label>Duration (hrs)</Label>
                  <Input value={durationHours} onChange={e => setDurationHours(e.target.value)} placeholder="8" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label>Trainer</Label>
                  <Input value={trainer} onChange={e => setTrainer(e.target.value)} placeholder="Name" />
                </div>
                <div className="grid gap-1.5">
                  <Label>Due Date</Label>
                  <Input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleAdd} disabled={saving || !empId || !courseTitle}>{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Assign"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Complete with score dialog */}
      <Dialog open={completeOpen} onOpenChange={setCompleteOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Mark Training Complete</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
            <p className="text-sm text-muted-foreground">{completingCourse} — {completingName}</p>
            <div className="grid gap-1.5">
              <Label>Score (optional, out of 100)</Label>
              <Input value={score} onChange={e => setScore(e.target.value)} placeholder="e.g. 85" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCompleteOpen(false)}>Cancel</Button>
            <Button onClick={handleComplete}>Save Completion</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Courses", value: records.length, sub: "All training records", icon: GraduationCap },
          { label: "In Progress", value: inProgress.length, sub: "Currently ongoing", icon: Clock },
          { label: "Completed", value: completed.length, sub: "Training finished", icon: CheckCircle2 },
          { label: "Avg Score", value: completedWithScore.length ? `${avgScore}%` : "—", sub: "Across completed courses", icon: BarChart3 },
        ].map(({ label, value, sub, icon: Icon }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{label}</CardTitle><Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : value}</div>
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
              <Input placeholder="Search courses or employees..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Assigned">Assigned</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div> : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead className="hidden lg:table-cell">Trainer</TableHead>
                  <TableHead className="hidden lg:table-cell">Duration</TableHead>
                  <TableHead className="hidden md:table-cell text-right">Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No training records. Click "Assign Training" to get started.</TableCell></TableRow>
                ) : filtered.map(r => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium text-sm">{r.course_title}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7"><AvatarFallback className="text-xs">{initials(r.employee_name)}</AvatarFallback></Avatar>
                        <span className="text-sm">{r.employee_name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{r.training_type ?? "—"}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{r.trainer ?? "—"}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{r.duration_hours ? `${r.duration_hours}h` : "—"}</TableCell>
                    <TableCell className="hidden md:table-cell text-right font-semibold text-sm">{r.score !== null ? `${r.score}%` : "—"}</TableCell>
                    <TableCell><Badge variant={statusVariant(r.status)}>{r.status ?? "Assigned"}</Badge></TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          {r.status !== "In Progress" && r.status !== "Completed" && (
                            <DropdownMenuItem onClick={() => updateStatus(r.id, "In Progress", r.employee_name, r.course_title)}>
                              🔄 Mark In Progress
                            </DropdownMenuItem>
                          )}
                          {r.status !== "Completed" && (
                            <DropdownMenuItem onClick={() => { setCompletingId(r.id); setCompletingName(r.employee_name); setCompletingCourse(r.course_title); setCompleteOpen(true) }}>
                              ✅ Mark Complete…
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          {r.status !== "Assigned" && (
                            <DropdownMenuItem onClick={() => updateStatus(r.id, "Assigned", r.employee_name, r.course_title)} className="text-muted-foreground">
                              Revert to Assigned
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
