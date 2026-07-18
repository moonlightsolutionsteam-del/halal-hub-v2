"use client"

import * as React from "react"
import { AlertTriangle, ShieldAlert, CheckCircle2, Clock, PlusCircle, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"

type Bug = { id: string; bug_id: string | null; title: string; description: string | null; priority: string | null; status: string | null; module: string | null; assignee: string | null; assignee_initials: string | null; reported_date: string | null }

function priorityVariant(p: string | null) {
  if (p === "Critical") return "destructive" as const
  if (p === "High") return "default" as const
  return "outline" as const
}

function statusVariant(s: string | null) {
  if (s === "Closed" || s === "Resolved") return "secondary" as const
  if (s === "In Progress") return "default" as const
  if (s === "Blocked") return "destructive" as const
  return "outline" as const
}

function fmtDate(d: string | null) {
  if (!d) return "—"
  try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) } catch { return d }
}

export default function RisksPage() {
  const [bugs, setBugs] = React.useState<Bug[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const supabase = createClient()
    supabase.from("erp_bugs")
      .select("id, bug_id, title, description, priority, status, module, assignee, assignee_initials, reported_date")
      .neq("status", "Closed")
      .order("reported_date", { ascending: false })
      .limit(100)
      .then(({ data }) => { setBugs(data ?? []); setLoading(false) })
  }, [])

  const critical = bugs.filter(b => b.priority === "Critical")
  const high = bugs.filter(b => b.priority === "High")
  const inProgress = bugs.filter(b => b.status === "In Progress")
  const blocked = bugs.filter(b => b.status === "Blocked")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Risk Register</h1>
        <p className="text-muted-foreground">Track open engineering risks and critical issues across the platform.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Issues</CardTitle><AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${critical.length > 0 ? "text-destructive" : ""}`}>{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : critical.length}</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle><ShieldAlert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : high.length}</div>
            <p className="text-xs text-muted-foreground">Elevated risk level</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle><Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : inProgress.length}</div>
            <p className="text-xs text-muted-foreground">Being mitigated</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blocked</CardTitle><CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${blocked.length > 0 ? "text-destructive" : ""}`}>{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : blocked.length}</div>
            <p className="text-xs text-muted-foreground">Needs unblocking</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Open Risk Items</CardTitle>
            <Button><PlusCircle className="mr-2 h-4 w-4" />Add Risk</Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Risk / Issue</TableHead>
                  <TableHead className="hidden md:table-cell">Module</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Owner</TableHead>
                  <TableHead className="hidden lg:table-cell">Reported</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bugs.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No open risk items. All clear!</TableCell></TableRow>
                ) : bugs.map(b => (
                  <TableRow key={b.id}>
                    <TableCell>
                      <div className="font-medium">{b.title}</div>
                      {b.description && <div className="text-xs text-muted-foreground truncate max-w-[280px]">{b.description}</div>}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{b.module ?? "—"}</TableCell>
                    <TableCell><Badge variant={priorityVariant(b.priority)}>{b.priority ?? "—"}</Badge></TableCell>
                    <TableCell><Badge variant={statusVariant(b.status)}>{b.status ?? "Open"}</Badge></TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {b.assignee ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6 text-xs"><AvatarFallback>{b.assignee_initials ?? b.assignee.slice(0, 2).toUpperCase()}</AvatarFallback></Avatar>
                          <span className="text-sm">{b.assignee}</span>
                        </div>
                      ) : "—"}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{fmtDate(b.reported_date)}</TableCell>
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
