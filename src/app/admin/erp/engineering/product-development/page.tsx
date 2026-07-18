"use client"

import * as React from "react"
import { MoreHorizontal, PlusCircle, Search, ListTodo, Rocket, Flag, CheckCircle2, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"

type Task = { id: string; task_id: string | null; title: string; description: string | null; priority: string | null; status: string | null; assignee: string | null; assignee_initials: string | null; module: string | null; feature: string | null; due_date: string | null }
type Release = { id: string; version: string; status: string | null; features: string | null; release_date: string | null }

function priorityVariant(p: string | null) {
  if (p === "Critical" || p === "High") return "destructive" as const
  if (p === "Medium") return "default" as const
  return "secondary" as const
}

function statusVariant(s: string | null) {
  if (s === "Done" || s === "Completed") return "secondary" as const
  if (s === "In Progress" || s === "In Dev" || s === "In QA") return "default" as const
  if (s === "Blocked") return "destructive" as const
  return "outline" as const
}

export default function ProductDevelopmentPage() {
  const [tasks, setTasks] = React.useState<Task[]>([])
  const [releases, setReleases] = React.useState<Release[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [priorityFilter, setPriorityFilter] = React.useState("all")

  React.useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from("erp_tasks").select("id, task_id, title, description, priority, status, assignee, assignee_initials, module, feature, due_date").order("created_at", { ascending: false }).limit(300),
      supabase.from("erp_releases").select("id, version, status, features, release_date").order("release_date", { ascending: false }).limit(20),
    ]).then(([t, r]) => { setTasks(t.data ?? []); setReleases(r.data ?? []); setLoading(false) })
  }, [])

  const filtered = tasks.filter(t => {
    const q = search.toLowerCase()
    const ms = !q || t.title.toLowerCase().includes(q) || (t.module ?? "").toLowerCase().includes(q) || (t.assignee ?? "").toLowerCase().includes(q)
    const pf = priorityFilter === "all" || (t.priority ?? "").toLowerCase() === priorityFilter
    return ms && pf
  })

  const backlog = tasks.filter(t => !t.status || t.status === "To-do" || t.status === "Backlog" || t.status === "Idea")
  const inDev = tasks.filter(t => t.status === "In Progress" || t.status === "In Dev")
  const inQA = tasks.filter(t => t.status === "In QA" || t.status === "In Review")
  const done = tasks.filter(t => t.status === "Done" || t.status === "Completed")

  function TaskTable({ items }: { items: Task[] }) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task / Feature</TableHead>
            <TableHead className="hidden md:table-cell">Module</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden lg:table-cell">Owner</TableHead>
            <TableHead><span className="sr-only">Actions</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No tasks found.</TableCell></TableRow>
          ) : items.map(t => (
            <TableRow key={t.id}>
              <TableCell>
                <div className="font-medium">{t.title}</div>
                {t.feature && <div className="text-xs text-muted-foreground">{t.feature}</div>}
              </TableCell>
              <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{t.module ?? "—"}</TableCell>
              <TableCell><Badge variant={priorityVariant(t.priority)}>{t.priority ?? "—"}</Badge></TableCell>
              <TableCell><Badge variant={statusVariant(t.status)}>{t.status ?? "Backlog"}</Badge></TableCell>
              <TableCell className="hidden lg:table-cell">
                {t.assignee ? (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 text-xs"><AvatarFallback>{t.assignee_initials ?? t.assignee.slice(0, 2).toUpperCase()}</AvatarFallback></Avatar>
                    <span className="text-sm">{t.assignee}</span>
                  </div>
                ) : "—"}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Archive</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Product Development</h1>
        <p className="text-muted-foreground">Track features, backlog, and release pipeline.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Backlog</CardTitle><ListTodo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : backlog.length}</div>
            <p className="text-xs text-muted-foreground">Features pending start</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Development</CardTitle><Rocket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : inDev.length}</div>
            <p className="text-xs text-muted-foreground">Actively being built</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In QA / Review</CardTitle><Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : inQA.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting sign-off</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle><CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : done.length}</div>
            <p className="text-xs text-muted-foreground">Shipped tasks</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All ({loading ? "…" : tasks.length})</TabsTrigger>
            <TabsTrigger value="backlog">Backlog ({loading ? "…" : backlog.length})</TabsTrigger>
            <TabsTrigger value="indev">In Dev ({loading ? "…" : inDev.length})</TabsTrigger>
            <TabsTrigger value="qa">In QA ({loading ? "…" : inQA.length})</TabsTrigger>
            <TabsTrigger value="done">Done ({loading ? "…" : done.length})</TabsTrigger>
          </TabsList>
          <Button><PlusCircle className="mr-2 h-4 w-4" />Add Feature</Button>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search tasks or features..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="Priority" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : (
          <>
            <TabsContent value="all"><Card><CardContent className="pt-4"><TaskTable items={filtered} /></CardContent></Card></TabsContent>
            <TabsContent value="backlog"><Card><CardContent className="pt-4"><TaskTable items={backlog.filter(t => { const q = search.toLowerCase(); return !q || t.title.toLowerCase().includes(q) })} /></CardContent></Card></TabsContent>
            <TabsContent value="indev"><Card><CardContent className="pt-4"><TaskTable items={inDev.filter(t => { const q = search.toLowerCase(); return !q || t.title.toLowerCase().includes(q) })} /></CardContent></Card></TabsContent>
            <TabsContent value="qa"><Card><CardContent className="pt-4"><TaskTable items={inQA.filter(t => { const q = search.toLowerCase(); return !q || t.title.toLowerCase().includes(q) })} /></CardContent></Card></TabsContent>
            <TabsContent value="done"><Card><CardContent className="pt-4"><TaskTable items={done.filter(t => { const q = search.toLowerCase(); return !q || t.title.toLowerCase().includes(q) })} /></CardContent></Card></TabsContent>
          </>
        )}
      </Tabs>

      {releases.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Release Pipeline</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Version</TableHead>
                  <TableHead className="hidden md:table-cell">Features</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Release Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {releases.map(r => (
                  <TableRow key={r.id}>
                    <TableCell className="font-mono font-semibold">{r.version}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground max-w-[300px] truncate">{r.features ?? "—"}</TableCell>
                    <TableCell>
                      <Badge variant={r.status === "Deployed" ? "secondary" : r.status === "In QA" ? "default" : "outline"}>{r.status ?? "Planned"}</Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                      {r.release_date ? new Date(r.release_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
