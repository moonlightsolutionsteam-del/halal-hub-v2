"use client"

import * as React from "react"
import { MoreHorizontal, Search, Headset, Clock, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"

type Suggestion = { id: string; place_name: string | null; category: string | null; reason: string | null; status: string | null; user_id: string | null; created_at: string | null }

function statusVariant(s: string | null) {
  if (s === "approved" || s === "resolved") return "secondary" as const
  if (s === "rejected") return "destructive" as const
  if (s === "under_review" || s === "in_review") return "default" as const
  return "outline" as const
}

function statusLabel(s: string | null) {
  if (!s) return "Pending"
  return s.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())
}

function fmtDate(d: string | null) {
  if (!d) return "—"
  try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) } catch { return d }
}

export default function SupportPage() {
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")

  React.useEffect(() => {
    const supabase = createClient()
    supabase.from("suggestions")
      .select("id, place_name, category, reason, status, user_id, created_at")
      .order("created_at", { ascending: false })
      .limit(200)
      .then(({ data }) => { setSuggestions(data ?? []); setLoading(false) })
  }, [])

  const filtered = suggestions.filter(s => {
    const q = search.toLowerCase()
    const ms = !q || (s.place_name ?? "").toLowerCase().includes(q) || (s.category ?? "").toLowerCase().includes(q) || (s.reason ?? "").toLowerCase().includes(q)
    const sf = statusFilter === "all" || (s.status ?? "pending") === statusFilter
    return ms && sf
  })

  const open = suggestions.filter(s => !s.status || s.status === "pending" || s.status === "under_review" || s.status === "in_review")
  const resolved = suggestions.filter(s => s.status === "approved" || s.status === "resolved")

  const today = new Date().toDateString()
  const todayCount = suggestions.filter(s => s.created_at && new Date(s.created_at).toDateString() === today).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Support & Suggestions</h1>
        <p className="text-muted-foreground">Review and manage user-submitted place suggestions and reports.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle><Headset className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : suggestions.length}</div>
            <p className="text-xs text-muted-foreground">All user suggestions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open / In Review</CardTitle><AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : open.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting action</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle><CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : resolved.length}</div>
            <p className="text-xs text-muted-foreground">Approved or closed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Received Today</CardTitle><Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : todayCount}</div>
            <p className="text-xs text-muted-foreground">New today</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Suggestions</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by place, category, or reason..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
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
                  <TableHead>Place</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="hidden lg:table-cell">Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Submitted</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No suggestions found.</TableCell></TableRow>
                ) : filtered.map(s => (
                  <TableRow key={s.id}>
                    <TableCell>
                      <div className="font-medium">{s.place_name ?? "—"}</div>
                      {s.user_id && <div className="text-xs text-muted-foreground font-mono">uid: {s.user_id.slice(0, 8)}…</div>}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{s.category ?? "—"}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground max-w-[240px] truncate">{s.reason ?? "—"}</TableCell>
                    <TableCell><Badge variant={statusVariant(s.status)}>{statusLabel(s.status)}</Badge></TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{fmtDate(s.created_at)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Approve</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Reject</DropdownMenuItem>
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
