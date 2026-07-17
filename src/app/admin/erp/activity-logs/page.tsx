"use client"

import * as React from "react"
import { Search, Activity } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"

type Log = {
  id: string
  employee_name: string | null
  action: string | null
  module: string | null
  record_type: string | null
  record_id: string | null
  record_title: string | null
  created_at: string | null
}

const MODULE_COLORS: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  hr: "secondary",
  crm: "default",
  accounting: "outline",
  marketing: "default",
  operations: "secondary",
  engineering: "outline",
}

function initials(name: string | null) {
  if (!name) return "?"
  return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
}

function formatAction(action: string | null) {
  if (!action) return "—"
  return action.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())
}

function formatTime(ts: string | null) {
  if (!ts) return "—"
  try { return new Date(ts).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) } catch { return ts }
}

export default function ActivityLogsPage() {
  const [logs, setLogs] = React.useState<Log[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [moduleFilter, setModuleFilter] = React.useState("all")
  const [employeeFilter, setEmployeeFilter] = React.useState("all")

  React.useEffect(() => {
    const fetch = async () => {
      const supabase = createClient()
      const { data } = await (supabase as any).from("erp_activity_logs").select("*").order("created_at", { ascending: false }).limit(500)
      setLogs(data ?? [])
      setLoading(false)
    }
    fetch()
  }, [])

  const employees = [...new Set(logs.map(l => l.employee_name).filter(Boolean))] as string[]
  const modules = [...new Set(logs.map(l => l.module).filter(Boolean))] as string[]

  const filtered = logs.filter(l => {
    const ms = !search || (l.employee_name ?? "").toLowerCase().includes(search.toLowerCase()) || (l.record_title ?? "").toLowerCase().includes(search.toLowerCase()) || (l.action ?? "").toLowerCase().includes(search.toLowerCase())
    const mm = moduleFilter === "all" || l.module === moduleFilter
    const me = employeeFilter === "all" || l.employee_name === employeeFilter
    return ms && mm && me
  })

  const todayCount = logs.filter(l => l.created_at?.startsWith(new Date().toISOString().split("T")[0])).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Activity Logs</h1>
        <p className="text-muted-foreground">Track all employee actions across every ERP module.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Actions", value: logs.length },
          { label: "Today", value: todayCount },
          { label: "Employees Active", value: employees.length },
          { label: "Modules", value: modules.length },
        ].map(({ label, value }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{label}</CardTitle><Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{value}</div></CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Activity</CardTitle>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by employee, action, or record..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={moduleFilter} onValueChange={setModuleFilter}>
              <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="Module" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modules</SelectItem>
                {modules.map(m => <SelectItem key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Employee" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Employees</SelectItem>
                {employees.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
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
                  <TableHead>Employee</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Module</TableHead>
                  <TableHead className="hidden md:table-cell">Record</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(l => (
                  <TableRow key={l.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7 text-xs"><AvatarFallback>{initials(l.employee_name)}</AvatarFallback></Avatar>
                        <span className="font-medium">{l.employee_name ?? "System"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{formatAction(l.action)}</span>
                    </TableCell>
                    <TableCell>
                      {l.module && <Badge variant={MODULE_COLORS[l.module] ?? "outline"}>{l.module}</Badge>}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="text-sm font-medium truncate max-w-[200px]">{l.record_title ?? "—"}</div>
                      {l.record_type && <div className="text-xs text-muted-foreground">{l.record_type}</div>}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm whitespace-nowrap">{formatTime(l.created_at)}</TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No activity found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
