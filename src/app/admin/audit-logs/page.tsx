"use client"

import * as React from "react"
import { Search, FileText, Shield, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"

type LogRow = {
  id: string
  employee_name: string | null
  action: string
  module: string | null
  record_type: string | null
  record_title: string | null
  created_at: string | null
}

function formatTime(ts: string | null) {
  if (!ts) return "—"
  try { return new Date(ts).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) }
  catch { return ts }
}

function moduleVariant(m: string | null) {
  if (m === "hr") return "secondary"
  if (m === "crm") return "default"
  if (m === "accounting") return "outline"
  if (m === "engineering") return "outline"
  return "default"
}

export default function AuditLogsPage() {
  const [logs, setLogs] = React.useState<LogRow[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [moduleFilter, setModuleFilter] = React.useState("all")

  React.useEffect(() => {
    const supabase = createClient()
    supabase
      .from("erp_activity_logs")
      .select("id, employee_name, action, module, record_type, record_title, created_at")
      .order("created_at", { ascending: false })
      .limit(300)
      .then(({ data }) => {
        setLogs(data ?? [])
        setLoading(false)
      })
  }, [])

  const modules = [...new Set(logs.map(l => l.module).filter(Boolean))] as string[]

  const filtered = logs.filter(l => {
    const q = search.toLowerCase()
    const ms = !q ||
      (l.employee_name ?? "").toLowerCase().includes(q) ||
      l.action.toLowerCase().includes(q) ||
      (l.record_title ?? "").toLowerCase().includes(q)
    const mm = moduleFilter === "all" || l.module === moduleFilter
    return ms && mm
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Audit Logs</h1>
        <p className="text-muted-foreground">Track all significant actions taken by admins and staff.</p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Actions</CardTitle><FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{logs.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today</CardTitle><Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {logs.filter(l => l.created_at && new Date(l.created_at).toDateString() === new Date().toDateString()).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Active Modules</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{modules.length}</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by actor, action, or record..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={moduleFilter} onValueChange={setModuleFilter}>
              <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="All Modules" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modules</SelectItem>
                {modules.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
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
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Actor</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead className="hidden md:table-cell">Module</TableHead>
                  <TableHead className="hidden lg:table-cell">Record</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No log entries found.</TableCell></TableRow>
                ) : filtered.map(l => (
                  <TableRow key={l.id}>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{formatTime(l.created_at)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7 text-xs">
                          <AvatarFallback>{(l.employee_name || "?").slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">{l.employee_name ?? "System"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-sm">{l.action.replace(/_/g, " ")}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {l.module ? <Badge variant={moduleVariant(l.module)}>{l.module}</Badge> : "—"}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground truncate max-w-[200px]">
                      {l.record_title ?? l.record_type ?? "—"}
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
