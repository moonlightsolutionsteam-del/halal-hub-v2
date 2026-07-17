"use client"

import * as React from "react"
import { MoreHorizontal, PlusCircle, Search, Users, Target, UserPlus } from "lucide-react"
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
import { createClient } from "@/lib/supabase/client"
import { logErpActivity } from "@/lib/erp-logger"

type Lead = {
  id: string
  name: string
  company: string | null
  email: string | null
  status: string | null
  source: string | null
  owner: string | null
  owner_initials: string | null
  last_update: string | null
}

function getStatusVariant(s: string | null) {
  if (s === "New") return "secondary"
  if (s === "Contacted") return "default"
  if (s === "Qualified") return "outline"
  if (s === "Proposal" || s === "Negotiation") return "default"
  if (s === "Unqualified") return "destructive"
  return "outline"
}

export default function LeadsPage() {
  const [leads, setLeads] = React.useState<Lead[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState("")
  const [company, setCompany] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [source, setSource] = React.useState("")
  const [owner, setOwner] = React.useState("")
  const [saving, setSaving] = React.useState(false)

  const refresh = async () => {
    const supabase = createClient()
    const { data } = await (supabase as any).from("erp_leads").select("*").order("last_update", { ascending: false })
    setLeads(data ?? [])
  }

  React.useEffect(() => {
    refresh().then(() => setLoading(false))
  }, [])

  async function handleCreate() {
    if (!name.trim()) return
    setSaving(true)
    const supabase = createClient()
    await (supabase as any).from("erp_leads").insert({ name: name.trim(), company: company || null, email: email || null, source: source || null, owner: owner || null, status: "New", last_update: new Date().toISOString() })
    await logErpActivity({ employeeName: owner || "Admin", action: "lead_created", module: "crm", recordType: "lead", recordTitle: name })
    await refresh()
    setSaving(false)
    setOpen(false)
    setName(""); setCompany(""); setEmail(""); setSource(""); setOwner("")
  }

  async function updateStatus(id: string, status: string, leadName: string) {
    const supabase = createClient()
    await (supabase as any).from("erp_leads").update({ status, last_update: new Date().toISOString() }).eq("id", id)
    await logErpActivity({ employeeName: "Admin", action: "lead_status_updated", module: "crm", recordType: "lead", recordId: id, recordTitle: leadName, newValue: { status } })
    await refresh()
  }

  const filtered = leads.filter(l => {
    const matchSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) || (l.company ?? "").toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || l.status === statusFilter
    return matchSearch && matchStatus
  })

  const counts = {
    total: leads.length,
    new: leads.filter(l => l.status === "New").length,
    qualified: leads.filter(l => l.status === "Qualified").length,
    converted: leads.filter(l => l.status === "Closed Won").length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Leads</h1>
        <p className="text-muted-foreground">Track and manage your sales pipeline leads.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Leads", value: counts.total, icon: Users },
          { label: "New", value: counts.new, icon: UserPlus },
          { label: "Qualified", value: counts.qualified, icon: Target },
          { label: "Converted", value: counts.converted, icon: Target },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{label}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{value}</div></CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Leads</CardTitle>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button><PlusCircle className="mr-2 h-4 w-4" />Add Lead</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>New Lead</DialogTitle></DialogHeader>
                <div className="space-y-3 py-4">
                  <div className="space-y-1"><Label>Name *</Label><Input value={name} onChange={e => setName(e.target.value)} placeholder="Contact name" /></div>
                  <div className="space-y-1"><Label>Company</Label><Input value={company} onChange={e => setCompany(e.target.value)} placeholder="Business name" /></div>
                  <div className="space-y-1"><Label>Email</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
                  <div className="space-y-1"><Label>Source</Label><Input value={source} onChange={e => setSource(e.target.value)} placeholder="e.g., Referral" /></div>
                  <div className="space-y-1"><Label>Owner</Label><Input value={owner} onChange={e => setOwner(e.target.value)} placeholder="Assigned to" /></div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreate} disabled={saving || !name.trim()}>{saving ? "Saving…" : "Create Lead"}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search leads..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Filter by status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="Qualified">Qualified</SelectItem>
                <SelectItem value="Proposal">Proposal</SelectItem>
                <SelectItem value="Negotiation">Negotiation</SelectItem>
                <SelectItem value="Unqualified">Unqualified</SelectItem>
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
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Owner</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(l => (
                  <TableRow key={l.id}>
                    <TableCell>
                      <div className="font-medium">{l.name}</div>
                      <div className="text-sm text-muted-foreground">{l.company}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{l.source ?? "—"}</TableCell>
                    <TableCell><Badge variant={getStatusVariant(l.status)}>{l.status}</Badge></TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6 text-xs"><AvatarFallback>{l.owner_initials ?? "?"}</AvatarFallback></Avatar>
                        {l.owner}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => updateStatus(l.id, "Contacted", l.name)}>Mark Contacted</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus(l.id, "Qualified", l.name)}>Mark Qualified</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus(l.id, "Proposal", l.name)}>Send Proposal</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => updateStatus(l.id, "Unqualified", l.name)}>Disqualify</DropdownMenuItem>
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
