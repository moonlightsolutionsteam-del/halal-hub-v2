"use client"

import * as React from "react"
import { MoreHorizontal, Search, Users, ClipboardList, BarChart, PlusCircle, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"

type Call = { id: string; contact: string; account: string | null; subject: string | null; call_date: string | null; owner: string | null; owner_initials: string | null; duration: string | null }
type Employee = { id: string; name: string; initials: string | null; status: string | null; department: string | null }

function fmtDate(d: string | null) {
  if (!d) return "—"
  try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) } catch { return d }
}

export default function SuperAdminFieldSalesPage() {
  const [calls, setCalls] = React.useState<Call[]>([])
  const [employees, setEmployees] = React.useState<Employee[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from("erp_calls").select("id, contact, account, subject, call_date, owner, owner_initials, duration").order("call_date", { ascending: false }).limit(50),
      supabase.from("erp_employees").select("id, name, initials, status, department").eq("status", "Active").limit(30),
    ]).then(([c, e]) => { setCalls(c.data ?? []); setEmployees(e.data ?? []); setLoading(false) })
  }, [])

  const todaysCalls = calls.filter(c => {
    if (!c.call_date) return false
    return new Date(c.call_date).toDateString() === new Date().toDateString()
  })

  const activeAgents = employees.filter(e => e.status === "Active")
  const departments = [...new Set(employees.map(e => e.department).filter(Boolean))]

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Field Sales</h1>
        <p className="text-muted-foreground">Manage territories, track visits, and monitor field team performance.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle><Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAgents.length}</div>
            <p className="text-xs text-muted-foreground">{departments.length} departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calls Today</CardTitle><ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysCalls.length}</div>
            <p className="text-xs text-muted-foreground">Logged today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle><BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calls.length}</div>
            <p className="text-xs text-muted-foreground">Last 50 records</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Agent</CardTitle><Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {(() => {
              const counts: Record<string, number> = {}
              calls.forEach(c => { if (c.owner) counts[c.owner] = (counts[c.owner] ?? 0) + 1 })
              const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]
              return top ? <><div className="text-xl font-bold truncate">{top[0].split(" ")[0]}</div><p className="text-xs text-muted-foreground">{top[1]} calls logged</p></> : <div className="text-2xl font-bold">—</div>
            })()}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Team Roster</CardTitle>
              <Button size="sm"><PlusCircle className="mr-2 h-4 w-4" />Add Agent</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead className="text-right">Calls</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.length === 0 ? (
                  <TableRow><TableCell colSpan={3} className="text-center py-6 text-muted-foreground">No agents found.</TableCell></TableRow>
                ) : employees.map(e => (
                  <TableRow key={e.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7 text-xs"><AvatarFallback>{e.initials ?? e.name.slice(0, 2).toUpperCase()}</AvatarFallback></Avatar>
                        <span className="font-medium">{e.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{e.department ?? "—"}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {calls.filter(c => c.owner === e.name).length}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Call Logs</CardTitle>
              <Button size="sm"><PlusCircle className="mr-2 h-4 w-4" />Log Call</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact</TableHead>
                  <TableHead className="hidden sm:table-cell">Agent</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {calls.length === 0 ? (
                  <TableRow><TableCell colSpan={3} className="text-center py-6 text-muted-foreground">No calls logged yet.</TableCell></TableRow>
                ) : calls.slice(0, 6).map(c => (
                  <TableRow key={c.id}>
                    <TableCell>
                      <div className="font-medium">{c.contact}</div>
                      {c.account && <div className="text-xs text-muted-foreground">{c.account}</div>}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">{c.owner ?? "—"}</TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">{fmtDate(c.call_date)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
