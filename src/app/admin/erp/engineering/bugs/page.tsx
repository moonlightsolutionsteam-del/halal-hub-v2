"use client"

import * as React from "react"
import { MoreHorizontal, PlusCircle, Search, Bug, Clock, AlertTriangle, CheckCircle2 } from "lucide-react"
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

type BugRecord = {
  id: string
  bug_id: string | null
  title: string
  description: string | null
  priority: string | null
  status: string | null
  assignee: string | null
  assignee_initials: string | null
  reported_date: string | null
  module: string | null
}

function getPriorityVariant(p: string | null) {
  if (p === "Critical") return "destructive"
  if (p === "High") return "destructive"
  if (p === "Medium") return "default"
  return "outline"
}

function getStatusVariant(s: string | null) {
  if (s === "Completed") return "secondary"
  if (s === "In Progress") return "default"
  if (s === "Open") return "outline"
  return "outline"
}

export default function BugsPage() {
  const [bugs, setBugs] = React.useState<BugRecord[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [priority, setPriority] = React.useState("all")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState("")
  const [desc, setDesc] = React.useState("")
  const [bugPriority, setBugPriority] = React.useState("Medium")
  const [assignee, setAssignee] = React.useState("")
  const [bugModule, setBugModule] = React.useState("")
  const [saving, setSaving] = React.useState(false)

  const refresh = async () => {
    const supabase = createClient()
    const { data } = await (supabase as any).from("erp_bugs").select("*").order("created_at", { ascending: false })
    setBugs(data ?? [])
  }

  React.useEffect(() => { refresh().then(() => setLoading(false)) }, [])

  async function handleCreate() {
    if (!title.trim()) return
    setSaving(true)
    const supabase = createClient()
    const nextId = `BUG-${String(bugs.length + 1).padStart(3, "0")}`
    const initials = assignee.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    await (supabase as any).from("erp_bugs").insert({ bug_id: nextId, title: title.trim(), description: desc || null, priority: bugPriority, assignee: assignee || null, assignee_initials: initials || null, module: bugModule || null, status: "Open", reported_date: new Date().toISOString().split("T")[0] })
    await logErpActivity({ employeeName: "Admin", action: "bug_reported", module: "engineering", recordType: "bug", recordTitle: `${nextId} - ${title}` })
    await refresh()
    setSaving(false); setOpen(false)
    setTitle(""); setDesc(""); setAssignee(""); setBugModule("")
  }

  async function updateStatus(id: string, status: string, bugTitle: string) {
    const supabase = createClient()
    await (supabase as any).from("erp_bugs").update({ status, updated_at: new Date().toISOString() }).eq("id", id)
    await logErpActivity({ employeeName: "Admin", action: `bug_${status.toLowerCase().replace(" ", "_")}`, module: "engineering", recordType: "bug", recordId: id, recordTitle: bugTitle })
    await refresh()
  }

  const filtered = bugs.filter(b => {
    const ms = !search || b.title.toLowerCase().includes(search.toLowerCase()) || (b.bug_id ?? "").includes(search)
    const mp = priority === "all" || b.priority === priority
    const mst = statusFilter === "all" || b.status === statusFilter
    return ms && mp && mst
  })

  const critical = bugs.filter(b => b.priority === "Critical" && b.status !== "Completed").length
  const open_ = bugs.filter(b => b.status === "Open").length
  const inProgress = bugs.filter(b => b.status === "In Progress").length
  const completed = bugs.filter(b => b.status === "Completed").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Bug Tracker</h1>
        <p className="text-muted-foreground">Track and resolve reported bugs across all modules.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle><AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold text-destructive">{critical}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open</CardTitle><Bug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{open_}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle><Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{inProgress}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle><CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{completed}</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Bugs</CardTitle>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild><Button><PlusCircle className="mr-2 h-4 w-4" />Report Bug</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Report a Bug</DialogTitle></DialogHeader>
                <div className="space-y-3 py-4">
                  <div className="space-y-1"><Label>Title *</Label><Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Brief description of the bug" /></div>
                  <div className="space-y-1"><Label>Description</Label><Textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Steps to reproduce..." /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label>Priority</Label>
                      <Select value={bugPriority} onValueChange={setBugPriority}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Critical">Critical</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1"><Label>Module</Label><Input value={bugModule} onChange={e => setBugModule(e.target.value)} placeholder="e.g., Feed" /></div>
                  </div>
                  <div className="space-y-1"><Label>Assignee</Label><Input value={assignee} onChange={e => setAssignee(e.target.value)} placeholder="Full name" /></div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreate} disabled={saving || !title.trim()}>{saving ? "Saving…" : "Report Bug"}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search bugs..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="w-[140px]"><SelectValue placeholder="Priority" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
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
                  <TableHead>Bug</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Assignee</TableHead>
                  <TableHead className="hidden lg:table-cell">Module</TableHead>
                  <TableHead className="hidden lg:table-cell">Reported</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(b => (
                  <TableRow key={b.id}>
                    <TableCell>
                      <div className="font-medium">{b.title}</div>
                      <div className="text-xs text-muted-foreground font-mono">{b.bug_id}</div>
                    </TableCell>
                    <TableCell><Badge variant={getPriorityVariant(b.priority)}>{b.priority}</Badge></TableCell>
                    <TableCell><Badge variant={getStatusVariant(b.status)}>{b.status}</Badge></TableCell>
                    <TableCell className="hidden md:table-cell">
                      {b.assignee ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6 text-xs"><AvatarFallback>{b.assignee_initials ?? "?"}</AvatarFallback></Avatar>
                          {b.assignee}
                        </div>
                      ) : "—"}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">{b.module ?? "—"}</TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">{b.reported_date ?? "—"}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => updateStatus(b.id, "In Progress", b.title)}>Start Working</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus(b.id, "Completed", b.title)}>Mark Resolved</DropdownMenuItem>
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
