"use client"

import * as React from "react"
import { Loader2, Search, UserPlus, CheckCircle2, Clock, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"

type Task = {
  id: string
  employee_name: string
  task: string
  category: string | null
  status: string | null
  due_date: string | null
  assigned_to: string | null
  completed_at: string | null
}

function statusVariant(s: string | null) {
  if (s === "Completed") return "secondary" as const
  if (s === "In Progress") return "default" as const
  return "outline" as const
}

function fmtDate(d: string | null) {
  if (!d) return "—"
  try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) } catch { return d }
}

function initials(name: string) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
}

function isOverdue(due: string | null, status: string | null) {
  if (!due || status === "Completed") return false
  return new Date(due) < new Date()
}

export default function OnboardingPage() {
  const [tasks, setTasks] = React.useState<Task[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [categoryFilter, setCategoryFilter] = React.useState("all")

  React.useEffect(() => {
    const supabase = createClient()
    supabase.from("erp_onboarding")
      .select("id, employee_name, task, category, status, due_date, assigned_to, completed_at")
      .order("created_at", { ascending: false })
      .limit(300)
      .then(({ data }) => { setTasks(data ?? []); setLoading(false) })
  }, [])

  const filtered = tasks.filter(t => {
    const q = search.toLowerCase()
    const ms = !q || t.employee_name.toLowerCase().includes(q) || (t.task ?? "").toLowerCase().includes(q)
    const sf = statusFilter === "all" || (t.status ?? "Pending") === statusFilter
    const cf = categoryFilter === "all" || (t.category ?? "") === categoryFilter
    return ms && sf && cf
  })

  const pending = tasks.filter(t => t.status !== "Completed")
  const completed = tasks.filter(t => t.status === "Completed")
  const overdue = tasks.filter(t => isOverdue(t.due_date, t.status))
  const categories = [...new Set(tasks.map(t => t.category).filter(Boolean))]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Onboarding</h1>
        <p className="text-muted-foreground">Track onboarding tasks and progress for new joiners.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle><UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : tasks.length}</div>
            <p className="text-xs text-muted-foreground">All onboarding tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle><Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : pending.length}</div>
            <p className="text-xs text-muted-foreground">Not yet completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle><CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : completed.length}</div>
            <p className="text-xs text-muted-foreground">{tasks.length ? Math.round(completed.length / tasks.length * 100) : 0}% completion rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle><AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : overdue.length}</div>
            <p className="text-xs text-muted-foreground">Past due date</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by employee or task..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(c => <SelectItem key={c!} value={c!}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px]"><SelectValue placeholder="Status" /></SelectTrigger>
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
                  <TableHead>Task</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="hidden md:table-cell">Assigned To</TableHead>
                  <TableHead className="hidden lg:table-cell">Due Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No onboarding tasks found.</TableCell></TableRow>
                ) : filtered.map(t => (
                  <TableRow key={t.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7"><AvatarFallback className="text-xs">{initials(t.employee_name)}</AvatarFallback></Avatar>
                        <span className="font-medium text-sm">{t.employee_name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{t.task}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{t.category ?? "—"}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{t.assigned_to ?? "—"}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm">
                      <span className={isOverdue(t.due_date, t.status) ? "text-destructive font-medium" : "text-muted-foreground"}>
                        {fmtDate(t.due_date)}
                      </span>
                    </TableCell>
                    <TableCell><Badge variant={statusVariant(t.status)}>{t.status ?? "Pending"}</Badge></TableCell>
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
