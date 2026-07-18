"use client"

import * as React from "react"
import { MoreHorizontal, PlusCircle, Search, Target, Users, TrendingUp, Clock, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"

type Lead = { id: string; name: string; company: string | null; source: string | null; status: string | null; owner: string | null; owner_initials: string | null; email: string | null; phone: string | null; last_update: string | null }

function statusVariant(s: string | null) {
  if (s === "Converted" || s === "Won") return "secondary" as const
  if (s === "Lost" || s === "Disqualified") return "destructive" as const
  if (s === "Onboarding" || s === "In Progress") return "default" as const
  return "outline" as const
}

export default function OperationsLeadsPage() {
  const [leads, setLeads] = React.useState<Lead[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")

  React.useEffect(() => {
    const supabase = createClient()
    supabase.from("erp_leads")
      .select("id, name, company, source, status, owner, owner_initials, email, phone, last_update")
      .order("last_update", { ascending: false })
      .limit(200)
      .then(({ data }) => { setLeads(data ?? []); setLoading(false) })
  }, [])

  const filtered = leads.filter(l => {
    const q = search.toLowerCase()
    const ms = !q || l.name.toLowerCase().includes(q) || (l.company ?? "").toLowerCase().includes(q) || (l.owner ?? "").toLowerCase().includes(q)
    const sf = statusFilter === "all" || (l.status ?? "").toLowerCase() === statusFilter
    return ms && sf
  })

  const converted = leads.filter(l => l.status === "Converted" || l.status === "Won")
  const active = leads.filter(l => l.status !== "Converted" && l.status !== "Won" && l.status !== "Lost" && l.status !== "Disqualified")
  const conversionRate = leads.length > 0 ? Math.round((converted.length / leads.length) * 100) : 0
  const newLeads = leads.filter(l => l.status === "New" || l.status === "Open")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Leads Management</h1>
        <p className="text-muted-foreground">Track and convert business prospects into platform partners.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle><Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : leads.length}</div>
            <p className="text-xs text-muted-foreground">{newLeads.length} new / open</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Pipeline</CardTitle><Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : active.length}</div>
            <p className="text-xs text-muted-foreground">Being nurtured</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Converted</CardTitle><TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : converted.length}</div>
            <p className="text-xs text-muted-foreground">{conversionRate}% conversion rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sources</CardTitle><Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : [...new Set(leads.map(l => l.source).filter(Boolean))].length}</div>
            <p className="text-xs text-muted-foreground">Distinct lead sources</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Leads</CardTitle>
            <Button><PlusCircle className="mr-2 h-4 w-4" />Add Lead</Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search leads..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="onboarding">Onboarding</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
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
                  <TableHead>Business</TableHead>
                  <TableHead className="hidden md:table-cell">Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Owner</TableHead>
                  <TableHead className="hidden lg:table-cell">Last Update</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No leads found.</TableCell></TableRow>
                ) : filtered.map(l => (
                  <TableRow key={l.id}>
                    <TableCell>
                      <div className="font-medium">{l.name}</div>
                      {l.company && <div className="text-xs text-muted-foreground">{l.company}</div>}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{l.source ?? "—"}</TableCell>
                    <TableCell><Badge variant={statusVariant(l.status)}>{l.status ?? "New"}</Badge></TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {l.owner ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6 text-xs"><AvatarFallback>{l.owner_initials ?? l.owner.slice(0, 2).toUpperCase()}</AvatarFallback></Avatar>
                          <span className="text-sm">{l.owner}</span>
                        </div>
                      ) : "—"}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{l.last_update ?? "—"}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Log Activity</DropdownMenuItem>
                          <DropdownMenuItem>Convert to Vendor</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Disqualify</DropdownMenuItem>
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
