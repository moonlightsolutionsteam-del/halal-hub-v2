"use client"

import * as React from "react"
import { MoreHorizontal, PlusCircle, Search, Briefcase } from "lucide-react"
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

type Deal = {
  id: string
  business_name: string
  contact: string | null
  stage: string | null
  value: number | null
  owner: string | null
  owner_initials: string | null
  last_update: string | null
}

function getStageVariant(s: string | null) {
  if (s === "Closed Won") return "secondary"
  if (s === "Lost") return "destructive"
  if (s === "Negotiation") return "default"
  return "outline"
}

function fmt(n: number | null) {
  if (n == null) return "—"
  return `₹${n.toLocaleString("en-IN")}`
}

export default function DealsPage() {
  const [deals, setDeals] = React.useState<Deal[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [stageFilter, setStageFilter] = React.useState("all")
  const [open, setOpen] = React.useState(false)
  const [bizName, setBizName] = React.useState("")
  const [contact, setContact] = React.useState("")
  const [value, setValue] = React.useState("")
  const [owner, setOwner] = React.useState("")
  const [saving, setSaving] = React.useState(false)

  const refresh = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("erp_deals").select("*").order("last_update", { ascending: false })
    setDeals(data ?? [])
  }

  React.useEffect(() => { refresh().then(() => setLoading(false)) }, [])

  async function handleCreate() {
    if (!bizName.trim()) return
    setSaving(true)
    const supabase = createClient()
    const initials = owner.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    await supabase.from("erp_deals").insert({ business_name: bizName.trim(), contact: contact || null, value: value ? parseFloat(value) : null, owner: owner || null, owner_initials: initials || null, stage: "Lead", last_update: new Date().toISOString() })
    await logErpActivity({ employeeName: owner || "Admin", action: "deal_created", module: "crm", recordType: "deal", recordTitle: bizName })
    await refresh()
    setSaving(false); setOpen(false)
    setBizName(""); setContact(""); setValue(""); setOwner("")
  }

  async function updateStage(id: string, stage: string, dealName: string) {
    const supabase = createClient()
    await supabase.from("erp_deals").update({ stage, last_update: new Date().toISOString() }).eq("id", id)
    await logErpActivity({ employeeName: "Admin", action: `deal_${stage.toLowerCase().replace(/\s+/g, "_")}`, module: "crm", recordType: "deal", recordId: id, recordTitle: dealName })
    await refresh()
  }

  const filtered = deals.filter(d => {
    const ms = !search || d.business_name.toLowerCase().includes(search.toLowerCase()) || (d.contact ?? "").toLowerCase().includes(search.toLowerCase())
    const mst = stageFilter === "all" || d.stage === stageFilter
    return ms && mst
  })

  const pipeline = deals.filter(d => d.stage !== "Closed Won" && d.stage !== "Lost").reduce((s, d) => s + (d.value ?? 0), 0)
  const won = deals.filter(d => d.stage === "Closed Won").reduce((s, d) => s + (d.value ?? 0), 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Deals</h1>
        <p className="text-muted-foreground">Manage your active deal pipeline and closed deals.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Deals</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{deals.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Pipeline Value</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{fmt(pipeline)}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Won</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">{fmt(won)}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Closed Won</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{deals.filter(d => d.stage === "Closed Won").length}</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Deals</CardTitle>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild><Button><PlusCircle className="mr-2 h-4 w-4" />Add Deal</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>New Deal</DialogTitle></DialogHeader>
                <div className="space-y-3 py-4">
                  <div className="space-y-1"><Label>Business Name *</Label><Input value={bizName} onChange={e => setBizName(e.target.value)} /></div>
                  <div className="space-y-1"><Label>Contact</Label><Input value={contact} onChange={e => setContact(e.target.value)} /></div>
                  <div className="space-y-1"><Label>Deal Value (₹)</Label><Input type="number" value={value} onChange={e => setValue(e.target.value)} /></div>
                  <div className="space-y-1"><Label>Owner</Label><Input value={owner} onChange={e => setOwner(e.target.value)} /></div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreate} disabled={saving || !bizName.trim()}>{saving ? "Saving…" : "Create Deal"}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search deals..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Stage" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="Lead">Lead</SelectItem>
                <SelectItem value="Proposal">Proposal</SelectItem>
                <SelectItem value="Negotiation">Negotiation</SelectItem>
                <SelectItem value="Closed Won">Closed Won</SelectItem>
                <SelectItem value="Lost">Lost</SelectItem>
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
                  <TableHead>Business</TableHead>
                  <TableHead className="hidden md:table-cell">Contact</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead className="hidden lg:table-cell">Owner</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(d => (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium">{d.business_name}</TableCell>
                    <TableCell className="hidden md:table-cell">{d.contact ?? "—"}</TableCell>
                    <TableCell><Badge variant={getStageVariant(d.stage)}>{d.stage}</Badge></TableCell>
                    <TableCell className="tabular-nums">{fmt(d.value)}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {d.owner ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6 text-xs"><AvatarFallback>{d.owner_initials ?? "?"}</AvatarFallback></Avatar>
                          {d.owner}
                        </div>
                      ) : "—"}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Move to Stage</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => updateStage(d.id, "Proposal", d.business_name)}>Proposal</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStage(d.id, "Negotiation", d.business_name)}>Negotiation</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStage(d.id, "Closed Won", d.business_name)}>Closed Won</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => updateStage(d.id, "Lost", d.business_name)}>Mark Lost</DropdownMenuItem>
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
