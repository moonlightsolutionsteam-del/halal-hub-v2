"use client"

import * as React from "react"
import { Bug, Rocket, AlertTriangle, KanbanSquare, HardDrive, Users, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

type BugRow = { id: string; bug_id: string | null; description: string | null; priority: string | null; status: string | null; module: string | null }
type TaskRow = { id: string; status: string | null; priority: string | null; due_date: string | null }
type Release = { id: string; version: string; features: string | null; status: string | null; deployment_date: string | null }
type Vendor = { id: string; name: string; active_tasks: number | null; sla_status: string | null }

function releaseVariant(s: string | null) {
  if (s === "Deployed" || s === "Live") return "secondary" as const
  if (s === "In QA") return "default" as const
  return "outline" as const
}

export default function EngineeringDashboardPage() {
  const [bugs, setBugs] = React.useState<BugRow[]>([])
  const [tasks, setTasks] = React.useState<TaskRow[]>([])
  const [releases, setReleases] = React.useState<Release[]>([])
  const [vendors, setVendors] = React.useState<Vendor[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from("erp_bugs").select("id, bug_id, description, priority, status, module").neq("status", "Closed").order("created_at", { ascending: false }).limit(30),
      supabase.from("erp_tasks").select("id, status, priority, due_date").order("created_at", { ascending: false }).limit(100),
      supabase.from("erp_releases").select("id, version, features, status, deployment_date").order("deployment_date", { ascending: false }).limit(6),
      supabase.from("erp_vendors").select("id, name, active_tasks, sla_status").limit(10),
    ]).then(([b, t, r, v]) => {
      setBugs(b.data ?? [])
      setTasks(t.data ?? [])
      setReleases(r.data ?? [])
      setVendors(v.data ?? [])
      setLoading(false)
    })
  }, [])

  const criticalBugs = bugs.filter(b => b.priority === "Critical")
  const highBugs = bugs.filter(b => b.priority === "High")
  const blockedTasks = tasks.filter(t => t.status === "Blocked")
  const completedTasks = tasks.filter(t => t.status === "Done" || t.status === "Completed")
  const overdueTasks = tasks.filter(t => t.due_date && new Date(t.due_date) < new Date() && t.status !== "Done" && t.status !== "Completed")

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Engineering Dashboard</h1>
        <p className="text-muted-foreground">Control panel for system health, delivery, and technical risks.</p>
      </div>

      {criticalBugs.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Critical Bugs Detected</AlertTitle>
          <AlertDescription>{criticalBugs.length} critical bug{criticalBugs.length > 1 ? "s" : ""} open: {criticalBugs.slice(0, 2).map(b => b.description ?? b.bug_id).join(", ")}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><KanbanSquare className="text-primary" /> Delivery Status</CardTitle>
            <CardDescription>{tasks.length} total tasks tracked</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Progress value={tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0} className="h-4" />
              <div className="flex justify-between items-center mt-2 text-sm">
                <p>{completedTasks.length} / {tasks.length} tasks completed</p>
                <p className="font-bold">{tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0}%</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-red-100/50 dark:bg-red-900/20 rounded-lg">
                <p className="font-bold text-xl text-red-600 dark:text-red-400">{blockedTasks.length}</p>
                <p className="text-xs font-medium text-red-700 dark:text-red-300">Blocked Tasks</p>
              </div>
              <div className="p-3 bg-yellow-100/50 dark:bg-yellow-900/20 rounded-lg">
                <p className="font-bold text-xl text-yellow-600 dark:text-yellow-400">{overdueTasks.length}</p>
                <p className="text-xs font-medium text-yellow-700 dark:text-yellow-300">Overdue Tasks</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bug className="text-primary" /> Bug Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-around text-center">
              <div>
                <p className="text-3xl font-bold text-red-500">{criticalBugs.length}</p>
                <p className="text-xs font-semibold">Critical</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-yellow-500">{highBugs.length}</p>
                <p className="text-xs font-semibold">High Priority</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Open bugs</p>
              <p className="font-bold text-lg">{bugs.length}</p>
            </div>
            <Button size="sm" variant="outline" className="w-full" asChild>
              <Link href="/admin/erp/engineering/bugs">View All Bugs</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2"><Rocket className="text-primary" /> Release Pipeline</CardTitle>
              <Button size="sm" variant="outline" asChild><Link href="/admin/erp/engineering/releases">View All</Link></Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Version</TableHead>
                  <TableHead className="hidden sm:table-cell">Features</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {releases.length === 0 ? (
                  <TableRow><TableCell colSpan={3} className="text-center py-6 text-muted-foreground">No releases yet.</TableCell></TableRow>
                ) : releases.map(r => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium font-mono text-sm">{r.version}</TableCell>
                    <TableCell className="hidden sm:table-cell max-w-[180px] truncate text-sm">{r.features ?? "—"}</TableCell>
                    <TableCell><Badge variant={releaseVariant(r.status)}>{r.status ?? "Planned"}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="text-primary" /> Vendor Performance</CardTitle>
          </CardHeader>
          <CardContent>
            {vendors.length === 0 ? (
              <p className="text-sm text-center py-6 text-muted-foreground">No vendors tracked yet.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead className="text-center">Active Tasks</TableHead>
                    <TableHead>SLA</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendors.map(v => (
                    <TableRow key={v.id}>
                      <TableCell className="font-medium">{v.name}</TableCell>
                      <TableCell className="text-center tabular-nums">{v.active_tasks ?? 0}</TableCell>
                      <TableCell>
                        <Badge variant={v.sla_status === "Good" ? "secondary" : v.sla_status === "Breached" ? "destructive" : "outline"}>
                          {v.sla_status ?? "—"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
