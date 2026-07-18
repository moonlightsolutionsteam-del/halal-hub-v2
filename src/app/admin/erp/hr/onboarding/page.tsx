"use client"

import * as React from "react"
import { Loader2, Search, Rocket, Clock, CheckCircle2, AlertTriangle, MoreHorizontal, PlusCircle } from "lucide-react"
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

type Task = {
  id: string; employee_name: string; task_name: string; category: string | null
  assigned_to: string | null; due_date: string | null; status: string | null
  completed_at: string | null
}
type Employee = { id: string; name: string }

const CATEGORIES = ["Documentation", "IT Setup", "Policy Review", "Training", "Team Introduction", "Equipment", "Access Provisioning", "Other"]

function statusVariant(s: string | null) {
  if (s === "Completed") return "secondary" as const
  if (s === "In Progress") return "default" as const
  return "outline" as const
}

function fmtDate(d: string | null) {
  if (!d) return "—"
  try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) } catch { return d }
}

function isOverdue(d: string | null, status: string | null) {
  if (!d || status === "Completed") return false
  return new Date(d) < new Date()
}

function initials(name: string) { return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() }

export default function OnboardingPage() {
  const [tasks, setTasks] = React.useState<Task[]>([])
  const [employees, setEmployees] = React.useState<Employee[]>([])
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [open, setOpen] = React.useState(false)

  const [empId, setEmpId] = React.useState("")
  const [taskName, setTaskName] = React.useState("")
  const [category, setCategory] = React.useState("")
  const [assignedTo, setAssignedTo] = React.useState("")
  const [dueDate, setDueDate] = React.useState("")

  function load() {
    const supabase = createClient()
    supabase.from("erp_onboarding_tasks")
      .select("id, employee_name, task_name, category, assigned_to, due_date, status, completed_at")
      .order("due_date", { ascending: true }).limit(300)
      .then(({ data }) => { setTasks(data ?? []); setLoading(false) })
  }

  React.useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from("erp_onboarding_tasks").select("id, employee_name, task_name, category, assigned_to, due_date, status, completed_at").order("due_date", { ascending: true }).limit(300),
      supabase.from("erp_employees").select("id, name").eq("status", "Active").order("name"),
    ]).then(([t, e]) => { setTasks(t.data ?? []); setEmployees(e.data ?? []); setLoading(false) })
  }, [])

  async function handleAdd() {
    if (!empId || !taskName) return
    setSaving(true)
    const emp = employees.find(e => e.id === empId)
    const supabase = createClient()
    await supabase.from("erp_onboarding_tasks").insert({
      employee_id: empId, employee_name: emp!.name,
      task_name: taskName, category: category || null,
      assigned_to: assignedTo || null, due_date: dueDate || null,
      status: "Pending",
    })
    await logErpActivity({ employeeName: "Admin", action: "onboarding_task_created", module: "hr", recordType: "onboarding", recordTitle: `${taskName} — ${emp!.name}` })
    setSaving(false); setOpen(false)
    setEmpId(""); setTaskName(""); setCategory(""); setAssignedTo(""); setDueDate("")
    load()
  }

  async function updateStatus(id: string, status: string, empName: string, taskTitle: string) {
    const supabase = createClient()
    const update: Record<string, unknown> = { status }
    if (status === "Completed") update.completed_at = new Date().toISOString()
    else update.completed_at = null
    await supabase.from("erp_onboarding_tasks").update(update).eq("id", id)
    await logErpActivity({ employeeName: "Admin", action: `onboarding_${status.toLowerCase().replace(/ /g, "_")}`, module: "hr", recordType: "onboarding", recordTitle: `${taskTitle} — ${empName}` })
    load()
  }

  const filtered = tasks.filter(t => {
    const q = search.toLowerCase()
    return (!q || t.employee_name.toLowerCase().includes(q) || t.task_name.toLowerCase().includes(q) || (t.category ?? "").toLowerCase().includes(q)) &&
           (statusFilter === "all" || (t.status ?? "Pending") === statusFilter)
  })

  const completed = tasks.filter(t => t.status === "Completed")
  const inProgress = tasks.filter(t => t.status === "In Progress")
  const overdue = tasks.filter(t => isOverdue(t.due_date, t.status))

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-headline">Onboarding</h1>
          <p className="text-muted-foreground">Track and manage new hire onboarding tasks.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><PlusCircle className="h-4 w-4" />Add Task</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>New Onboarding Task</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-1.5">
                <Label>Employee</Label>
                <Select value={empId} onValueChange={setEmpId}>
                  <SelectTrigger><SelectValue placeholder="Select employee" /></SelectTrigger>
                  <SelectContent>{employees.map(e => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label>Task Name</Label>
                <Input value={taskName} onChange={e => setTaskName(e.target.value)} placeholder="e.g. Complete ID verification" />
              </div>
              <div className="grid gap-1.5">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label>Assigned To</Label>
                  <Input value={assignedTo} onChange={e => setAssignedTo(e.target.value)} placeholder="Name or dept" />
                </div>
                <div className="grid gap-1.5">
                  <Label>Due Date</Label>
                  <Input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleAdd} disabled={saving || !empId || !taskName}>{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add Task"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Tasks", value: tasks.length, sub: "All onboarding tasks", icon: Rocket },
          { label: "In Progress", value: inProgress.length, sub: "Currently active", icon: Clock },
          { label: "Completed", value: completed.length, sub: `${tasks.length ? Math.round(completed.length / tasks.length * 100) : 0}% completion rate`, icon: CheckCircle2 },
          { label: "Overdue", value: overdue.length, sub: "Past due date", icon: AlertTriangle, red: true },
        ].map(({ label, value, sub, icon: Icon, red }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{label}</CardTitle><Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${red ? "text-destructive" : ""}`}>{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : value}</div>
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
              <Input placeholder="Search tasks or employees..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
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
          {loading ? <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div> : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="hidden lg:table-cell">Assigned To</TableHead>
                  <TableHead className="hidden md:table-cell">Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No onboarding tasks. Click "Add Task" to create one.</TableCell></TableRow>
                ) : filtered.map(t => (
                  <TableRow key={t.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7"><AvatarFallback className="text-xs">{initials(t.employee_name)}</AvatarFallback></Avatar>
                        <span className="font-medium text-sm">{t.employee_name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-sm">{t.task_name}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{t.category ?? "—"}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{t.assigned_to ?? "—"}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm">
                      <span className={isOverdue(t.due_date, t.status) ? "text-destructive font-medium" : "text-muted-foreground"}>
                        {fmtDate(t.due_date)}
                      </span>
                    </TableCell>
                    <TableCell><Badge variant={statusVariant(t.status)}>{t.status ?? "Pending"}</Badge></TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                          {t.status !== "In Progress" && (
                            <DropdownMenuItem onClick={() => updateStatus(t.id, "In Progress", t.employee_name, t.task_name)}>
                              🔄 Mark In Progress
                            </DropdownMenuItem>
                          )}
                          {t.status !== "Completed" && (
                            <DropdownMenuItem onClick={() => updateStatus(t.id, "Completed", t.employee_name, t.task_name)}>
                              ✅ Mark Completed
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          {t.status !== "Pending" && (
                            <DropdownMenuItem onClick={() => updateStatus(t.id, "Pending", t.employee_name, t.task_name)} className="text-muted-foreground">
                              Revert to Pending
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
