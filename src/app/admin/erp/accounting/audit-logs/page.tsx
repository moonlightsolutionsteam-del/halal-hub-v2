"use client"

import * as React from "react"
import { Search, FileText, ShieldCheck, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"

type Log = { id: string; actor: string | null; actor_initials: string | null; action: string | null; module: string | null; target: string | null; details: string | null; created_at: string | null }

function actionVariant(a: string | null) {
  if (!a) return "outline" as const
  const lower = a.toLowerCase()
  if (lower.includes("delet") || lower.includes("void") || lower.includes("remov")) return "destructive" as const
  if (lower.includes("approv") || lower.includes("complet") || lower.includes("resolv")) return "secondary" as const
  if (lower.includes("edit") || lower.includes("updat") || lower.includes("overrid") || lower.includes("chang")) return "default" as const
  return "outline" as const
}

function fmtDate(d: string | null) {
  if (!d) return "—"
  try {
    const dt = new Date(d)
    return dt.toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
  } catch { return d }
}

export default function AuditLogsPage() {
  const [logs, setLogs] = React.useState<Log[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [moduleFilter, setModuleFilter] = React.useState("all")

  React.useEffect(() => {
    const supabase = createClient()
    supabase.from("erp_activity_logs")
      .select("id, actor, actor_initials, action, module, target, details, created_at")
      .order("created_at", { ascending: false })
      .limit(200)
      .then(({ data }) => { setLogs(data ?? []); setLoading(false) })
  }, [])

  const filtered = logs.filter(l => {
    const q = search.toLowerCase()
    const ms = !q || (l.actor ?? "").toLowerCase().includes(q) || (l.action ?? "").toLowerCase().includes(q) || (l.target ?? "").toLowerCase().includes(q) || (l.details ?? "").toLowerCase().includes(q)
    const mf = moduleFilter === "all" || (l.module ?? "").toLowerCase() === moduleFilter
    return ms && mf
  })

  const today = new Date().toDateString()
  const todayCount = logs.filter(l => l.created_at && new Date(l.created_at).toDateString() === today).length
  const modules = [...new Set(logs.map(l => l.module).filter(Boolean))]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Financial Audit Logs</h1>
        <p className="text-muted-foreground">Trace every financial action, manual override, and approval on the platform.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entries</CardTitle><FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : logs.length}</div>
            <p className="text-xs text-muted-foreground">Last 200 entries</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activity Today</CardTitle><ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : todayCount}</div>
            <p className="text-xs text-muted-foreground">Events logged today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Modules Covered</CardTitle><FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : modules.length}</div>
            <p className="text-xs text-muted-foreground">Distinct platform modules</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Filtered</CardTitle><FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : filtered.length}</div>
            <p className="text-xs text-muted-foreground">Matching current filters</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by admin, action, or target..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={moduleFilter} onValueChange={setModuleFilter}>
              <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Module" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modules</SelectItem>
                {modules.map(m => <SelectItem key={m!} value={(m ?? "").toLowerCase()}>{m}</SelectItem>)}
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
                  <TableHead className="hidden md:table-cell">Timestamp</TableHead>
                  <TableHead>Admin</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead className="hidden md:table-cell">Module</TableHead>
                  <TableHead className="hidden lg:table-cell">Target</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No audit entries found.</TableCell></TableRow>
                ) : filtered.map(l => (
                  <TableRow key={l.id}>
                    <TableCell className="hidden md:table-cell text-xs text-muted-foreground whitespace-nowrap">{fmtDate(l.created_at)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="text-xs">{l.actor_initials ?? (l.actor ? l.actor.slice(0, 2).toUpperCase() : "?")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{l.actor ?? "System"}</div>
                          <div className="text-xs text-muted-foreground md:hidden">{fmtDate(l.created_at)}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={actionVariant(l.action)}>{l.action ?? "—"}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{l.module ?? "—"}</TableCell>
                    <TableCell className="hidden lg:table-cell font-mono text-xs text-muted-foreground">{l.target ?? "—"}</TableCell>
                    <TableCell className="text-sm max-w-[240px] truncate text-muted-foreground">{l.details ?? "—"}</TableCell>
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
