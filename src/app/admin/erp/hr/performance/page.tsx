"use client"

import * as React from "react"
import { PlusCircle, TrendingUp, Star, Users, Target, Loader2, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { logErpActivity } from "@/lib/erp-logger"

type Review = { id: string; employee_name: string | null; period: string | null; status: string | null; rating: number | null; goals_met: number | null; goals_total: number | null }
type Employee = { id: string; name: string }

const PERIODS = ["Q1 2026", "Q2 2026", "Q3 2026", "Q4 2026", "H1 2026", "H2 2026", "Annual 2026", "Q1 2025", "H2 2025", "Annual 2025"]

function statusVariant(s: string | null) {
  if (s === "Completed") return "secondary" as const
  if (s === "In Progress" || s === "Pending") return "default" as const
  return "outline" as const
}

export default function PerformancePage() {
  const [reviews, setReviews] = React.useState<Review[]>([])
  const [employees, setEmployees] = React.useState<Employee[]>([])
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  const [empId, setEmpId] = React.useState("")
  const [period, setPeriod] = React.useState("")
  const [rating, setRating] = React.useState("")
  const [goalsTotal, setGoalsTotal] = React.useState("")
  const [goalsMet, setGoalsMet] = React.useState("")

  function load() {
    const supabase = createClient()
    supabase.from("erp_performance")
      .select("id, employee_name, period, status, rating, goals_met, goals_total")
      .order("created_at", { ascending: false }).limit(50)
      .then(({ data }) => { setReviews(data ?? []); setLoading(false) })
  }

  React.useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from("erp_performance").select("id, employee_name, period, status, rating, goals_met, goals_total").order("created_at", { ascending: false }).limit(50),
      supabase.from("erp_employees").select("id, name").eq("status", "Active").order("name"),
    ]).then(([p, e]) => { setReviews(p.data ?? []); setEmployees(e.data ?? []); setLoading(false) })
  }, [])

  async function updateStatus(id: string, status: string, empName: string, period: string) {
    const supabase = createClient()
    await supabase.from("erp_performance").update({ status }).eq("id", id)
    await logErpActivity({ employeeName: "Admin", action: `performance_${status.toLowerCase().replace(/ /g, "_")}`, module: "hr", recordType: "performance", recordTitle: `${empName} — ${period}` })
    load()
  }

  async function handleAdd() {
    if (!empId || !period) return
    setSaving(true)
    const emp = employees.find(e => e.id === empId)
    const supabase = createClient()
    await supabase.from("erp_performance").insert({
      employee_id: empId, employee_name: emp!.name,
      period, status: "Pending",
      rating: rating ? Number(rating) : null,
      goals_total: goalsTotal ? Number(goalsTotal) : null,
      goals_met: goalsMet ? Number(goalsMet) : null,
    })
    await logErpActivity({ employeeName: "Admin", action: "performance_review_created", module: "hr", recordType: "performance", recordTitle: `${emp!.name} — ${period}` })
    setSaving(false); setOpen(false)
    setEmpId(""); setPeriod(""); setRating(""); setGoalsTotal(""); setGoalsMet("")
    load()
  }

  const pending = reviews.filter((r: Review) => r.status === "Pending" || r.status === "In Progress")
  const completed = reviews.filter(r => r.status === "Completed")
  const topPerformer = [...reviews].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))[0]
  const lowPerformers = reviews.filter(r => r.rating !== null && r.rating < 3)

  const avgGoalPct = reviews.length > 0
    ? reviews.filter(r => r.goals_total && r.goals_total > 0).reduce((s, r) => s + ((r.goals_met ?? 0) / (r.goals_total ?? 1)) * 100, 0) / reviews.filter(r => r.goals_total && (r.goals_total ?? 0) > 0).length
    : 0

  const departments = [...new Set(reviews.map(r => r.period).filter(Boolean))] as string[]

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Performance Management</h1>
        <p className="text-muted-foreground">Track goals, manage reviews, and improve team productivity.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Goal Completion</CardTitle><TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isNaN(avgGoalPct) ? "—" : `${Math.round(avgGoalPct)}%`}</div>
            <p className="text-xs text-muted-foreground">Across {reviews.length} reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle><Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${pending.length > 0 ? "text-yellow-600" : ""}`}>{pending.length}</div>
            <p className="text-xs text-muted-foreground">{pending.length > 0 ? "Manager action required" : "All clear"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performer</CardTitle><Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">{topPerformer?.employee_name?.split(" ")[0] ?? "—"}</div>
            <p className="text-xs text-muted-foreground">{topPerformer ? `Rating: ${topPerformer.rating}/5` : "No data yet"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Needs Improvement</CardTitle><Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowPerformers.length}</div>
            <p className="text-xs text-muted-foreground">Rating below 3/5</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Performance Reviews</CardTitle>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button size="sm"><PlusCircle className="mr-2 h-4 w-4" />New Review</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader><DialogTitle>Create Performance Review</DialogTitle></DialogHeader>
                  <div className="grid gap-4 py-2">
                    <div className="grid gap-1.5">
                      <Label>Employee</Label>
                      <Select value={empId} onValueChange={setEmpId}>
                        <SelectTrigger><SelectValue placeholder="Select employee" /></SelectTrigger>
                        <SelectContent>{employees.map(e => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-1.5">
                      <Label>Review Period</Label>
                      <Select value={period} onValueChange={setPeriod}>
                        <SelectTrigger><SelectValue placeholder="Select period" /></SelectTrigger>
                        <SelectContent>{PERIODS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="grid gap-1.5">
                        <Label>Rating (1–5)</Label>
                        <Input value={rating} onChange={e => setRating(e.target.value)} placeholder="4" />
                      </div>
                      <div className="grid gap-1.5">
                        <Label>Goals Total</Label>
                        <Input value={goalsTotal} onChange={e => setGoalsTotal(e.target.value)} placeholder="10" />
                      </div>
                      <div className="grid gap-1.5">
                        <Label>Goals Met</Label>
                        <Input value={goalsMet} onChange={e => setGoalsMet(e.target.value)} placeholder="8" />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleAdd} disabled={saving || !empId || !period}>{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Review"}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-6 text-muted-foreground">No reviews yet.</TableCell></TableRow>
                ) : reviews.slice(0, 10).map(r => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7 text-xs"><AvatarFallback>{(r.employee_name ?? "?").slice(0, 2).toUpperCase()}</AvatarFallback></Avatar>
                        <span className="font-medium">{r.employee_name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{r.period ?? "—"}</TableCell>
                    <TableCell className="tabular-nums">{r.rating !== null ? `${r.rating}/5` : "—"}</TableCell>
                    <TableCell><Badge variant={statusVariant(r.status)}>{r.status ?? "Pending"}</Badge></TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                          {r.status !== "In Progress" && (
                            <DropdownMenuItem onClick={() => updateStatus(r.id, "In Progress", r.employee_name ?? "", r.period ?? "")}>
                              🔄 Mark In Progress
                            </DropdownMenuItem>
                          )}
                          {r.status !== "Completed" && (
                            <DropdownMenuItem onClick={() => updateStatus(r.id, "Completed", r.employee_name ?? "", r.period ?? "")}>
                              ✅ Mark Completed
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          {r.status !== "Pending" && (
                            <DropdownMenuItem onClick={() => updateStatus(r.id, "Pending", r.employee_name ?? "", r.period ?? "")} className="text-muted-foreground">
                              Revert to Pending
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Goal Progress by Employee</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reviews.filter(r => r.goals_total && (r.goals_total ?? 0) > 0).slice(0, 6).length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">No goal data yet.</p>
              ) : reviews.filter(r => r.goals_total && (r.goals_total ?? 0) > 0).slice(0, 6).map(r => {
                const pct = Math.round(((r.goals_met ?? 0) / (r.goals_total ?? 1)) * 100)
                return (
                  <div key={r.id}>
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-semibold text-sm">{r.employee_name}</h4>
                      <span className="text-xs font-bold">{pct}%</span>
                    </div>
                    <Progress value={pct} />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
