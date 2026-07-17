"use client"

import * as React from "react"
import { MoreHorizontal, PlusCircle, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { logErpActivity } from "@/lib/erp-logger"

type Task = {
  id: string
  task_id: string | null
  title: string
  assignee: string | null
  assignee_initials: string | null
  priority: string | null
  status: string | null
  due_date: string | null
  estimated_time: string | null
  description: string | null
  blocker_reason: string | null
}

function getPriorityVariant(p: string | null) {
  if (p === "Critical" || p === "High") return "destructive"
  if (p === "Medium") return "default"
  return "outline"
}

function getStatusVariant(s: string | null) {
  if (s === "Done") return "secondary"
  if (s === "In Progress" || s === "QA") return "default"
  if (s === "Blocked") return "destructive"
  return "outline"
}

export default function EngineeringTasksPage() {
  const [tasks, setTasks] = React.useState<Task[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState("")
  const [desc, setDesc] = React.useState("")
  const [taskPriority, setTaskPriority] = React.useState("Medium")
  const [assignee, setAssignee] = React.useState("")
  const [dueDate, setDueDate] = React.useState("")
  const [estTime, setEstTime] = React.useState("")
  const [saving, setSaving] = React.useState(false)

  const refresh = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("erp_tasks").select("*").eq("module", "engineering").order("created_at", { ascending: false })
    setTasks(data ?? [])
  }

  React.useEffect(() => { refresh().then(() => setLoading(false)) }, [])

  async function handleCreate() {
    if (!title.trim()) return
    setSaving(true)
    const supabase = createClient()
    const nextId = `TASK-${String(tasks.length + 1).padStart(3, "0")}`
    const initials = assignee.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    await supabase.from("erp_tasks").insert({ task_id: nextId, title: title.trim(), description: desc || null, priority: taskPriority, assignee: assignee || null, assignee_initials: initials || null, due_date: dueDate || null, estimated_time: estTime || null, module: "engineering", status: "To Do" })
    await logErpActivity({ employeeName: assignee || "Admin", action: "task_created", module: "engineering", recordType: "task", recordTitle: `${nextId} - ${title}` })
    await refresh()
    setSaving(false); setOpen(false)
    setTitle(""); setDesc(""); setAssignee(""); setDueDate(""); setEstTime("")
  }

  async function updateStatus(id: string, status: string, taskTitle: string) {
    const supabase = createClient()
    await supabase.from("erp_tasks").update({ status, updated_at: new Date().toISOString() }).eq("id", id)
    await logErpActivity({ employeeName: "Admin", action: `task_${status.toLowerCase().replace(/\s+/g, "_")}`, module: "engineering", recordType: "task", recordId: id, recordTitle: taskTitle })
    await refresh()
  }

  const filtered = tasks.filter(t => {
    const ms = !search || t.title.toLowerCase().includes(search.toLowerCase()) || (t.task_id ?? "").includes(search)
    const mst = statusFilter === "all" || t.status === statusFilter
    return ms && mst
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Engineering Tasks</h1>
        <p className="text-muted-foreground">Track development tasks, features, and sprint items.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "In Progress", value: tasks.filter(t => t.status === "In Progress").length },
          { label: "Blocked", value: tasks.filter(t => t.status === "Blocked").length },
          { label: "In QA", value: tasks.filter(t => t.status === "QA").length },
          { label: "Done", value: tasks.filter(t => t.status === "Done").length },
        ].map(({ label, value }) => (
          <Card key={label}>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">{label}</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">{value}</div></CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Tasks</CardTitle>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild><Button><PlusCircle className="mr-2 h-4 w-4" />Add Task</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Create Task</DialogTitle></DialogHeader>
                <div className="space-y-3 py-4">
                  <div className="space-y-1"><Label>Title *</Label><Input value={title} onChange={e => setTitle(e.target.value)} /></div>
                  <div className="space-y-1"><Label>Description</Label><Textarea value={desc} onChange={e => setDesc(e.target.value)} /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label>Priority</Label>
                      <Select value={taskPriority} onValueChange={setTaskPriority}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Critical">Critical</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1"><Label>Assignee</Label><Input value={assignee} onChange={e => setAssignee(e.target.value)} /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1"><Label>Due Date</Label><Input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} /></div>
                    <div className="space-y-1"><Label>Estimate</Label><Input value={estTime} onChange={e => setEstTime(e.target.value)} placeholder="e.g., 4h" /></div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreate} disabled={saving || !title.trim()}>{saving ? "Saving…" : "Create Task"}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search tasks..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="To Do">To Do</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="QA">QA</SelectItem>
                <SelectItem value="Blocked">Blocked</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12"><div className="h-6 w-6 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Assignee</TableHead>
                  <TableHead className="hidden lg:table-cell">Due</TableHead>
                  <TableHead className="hidden lg:table-cell">Est.</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(t => (
                  <TableRow key={t.id}>
                    <TableCell>
                      <div className="font-medium">{t.title}</div>
                      {t.blocker_reason && <div className="text-xs text-destructive mt-0.5">Blocker: {t.blocker_reason}</div>}
                      <div className="text-xs text-muted-foreground font-mono">{t.task_id}</div>
                    </TableCell>
                    <TableCell><Badge variant={getPriorityVariant(t.priority)}>{t.priority}</Badge></TableCell>
                    <TableCell><Badge variant={getStatusVariant(t.status)}>{t.status}</Badge></TableCell>
                    <TableCell className="hidden md:table-cell">
                      {t.assignee ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6 text-xs"><AvatarFallback>{t.assignee_initials ?? "?"}</AvatarFallback></Avatar>
                          {t.assignee}
                        </div>
                      ) : "—"}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">{t.due_date ?? "—"}</TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">{t.estimated_time ?? "—"}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => updateStatus(t.id, "In Progress", t.title)}>Start</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus(t.id, "QA", t.title)}>Move to QA</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus(t.id, "Done", t.title)}>Mark Done</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus(t.id, "Blocked", t.title)}>Mark Blocked</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
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
