"use client"

import * as React from "react"
import { MoreHorizontal, PlusCircle, Search, ListTodo, Clock, AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"

type Task = { id: string; title: string; description: string | null; priority: string | null; status: string | null; assignee: string | null; assignee_initials: string | null; due_date: string | null; module: string | null }

function statusVariant(s: string | null) {
  if (s === "Done" || s === "Completed") return "secondary" as const
  if (s === "In Progress") return "default" as const
  if (s === "Blocked") return "destructive" as const
  return "outline" as const
}

function priorityVariant(p: string | null) {
  if (p === "High" || p === "Critical") return "destructive" as const
  if (p === "Medium") return "default" as const
  return "secondary" as const
}

function fmtDate(d: string | null) {
  if (!d) return "—"
  try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) } catch { return d }
}

export default function TasksPage() {
  const [tasks, setTasks] = React.useState<Task[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")

  React.useEffect(() => {
    const supabase = createClient()
    supabase.from("erp_tasks")
      .select("id, title, description, priority, status, assignee, assignee_initials, due_date, module")
      .order("created_at", { ascending: false })
      .limit(200)
      .then(({ data }) => { setTasks(data ?? []); setLoading(false) })
  }, [])

  const filtered = tasks.filter(t => {
    const q = search.toLowerCase()
    const ms = !q || t.title.toLowerCase().includes(q) || (t.description ?? "").toLowerCase().includes(q) || (t.assignee ?? "").toLowerCase().includes(q)
    const fs = statusFilter === "all" || (t.status ?? "").toLowerCase().replace(" ", "-") === statusFilter
    return ms && fs
  })

  const overdue = tasks.filter(t => t.due_date && new Date(t.due_date) < new Date() && t.status !== "Done" && t.status !== "Completed")
  const pending = tasks.filter(t => t.status !== "Done" && t.status !== "Completed")
  const thisWeek = tasks.filter(t => {
    if (!t.due_date) return false
    const d = new Date(t.due_date), now = new Date()
    return (d.getTime() - now.getTime()) < 7 * 24 * 60 * 60 * 1000 && d >= now
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Tasks</h1>
        <p className="text-muted-foreground">Track and manage all activities for your sales team.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle><ListTodo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : tasks.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle><Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : pending.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle><AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${overdue.length > 0 ? "text-destructive" : ""}`}>
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : overdue.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due This Week</CardTitle><CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : thisWeek.length}</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Tasks</CardTitle>
            <Button><PlusCircle className="mr-2 h-4 w-4" />Add Task</Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search tasks..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Filter by Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="to-do">To-do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
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
                  <TableHead>Task</TableHead>
                  <TableHead className="hidden md:table-cell">Assignee</TableHead>
                  <TableHead className="hidden md:table-cell">Priority</TableHead>
                  <TableHead className="hidden lg:table-cell">Due</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No tasks found.</TableCell></TableRow>
                ) : filtered.map(t => (
                  <TableRow key={t.id}>
                    <TableCell>
                      <div className="font-medium">{t.title}</div>
                      {t.module && <div className="text-xs text-muted-foreground">{t.module}</div>}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {t.assignee ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6 text-xs"><AvatarFallback>{t.assignee_initials ?? t.assignee.slice(0, 2).toUpperCase()}</AvatarFallback></Avatar>
                          <span className="text-sm">{t.assignee}</span>
                        </div>
                      ) : "—"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell"><Badge variant={priorityVariant(t.priority)}>{t.priority ?? "—"}</Badge></TableCell>
                    <TableCell className="hidden lg:table-cell text-sm">{fmtDate(t.due_date)}</TableCell>
                    <TableCell className="hidden md:table-cell"><Badge variant={statusVariant(t.status)}>{t.status ?? "To-do"}</Badge></TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                          <DropdownMenuItem>Assign</DropdownMenuItem>
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
