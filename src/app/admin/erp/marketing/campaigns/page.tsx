"use client"

import * as React from "react"
import { MoreHorizontal, PlusCircle, Search, Megaphone, Users, Target, BarChart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { logErpActivity } from "@/lib/erp-logger"

type Campaign = {
  id: string
  name: string
  campaign_type: string | null
  status: string | null
  budget: number | null
  spend: number | null
  reach: number | null
  clicks: number | null
  conversions: number | null
  start_date: string | null
}

function getStatusVariant(s: string | null) {
  if (s === "Active") return "secondary"
  if (s === "Paused") return "outline"
  if (s === "Completed") return "default"
  return "outline"
}

function fmt(n: number | null) {
  if (n == null) return "—"
  return `₹${n.toLocaleString("en-IN")}`
}

function fmtN(n: number | null) {
  if (n == null) return "—"
  return n.toLocaleString("en-IN")
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = React.useState<Campaign[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [open, setOpen] = React.useState(false)
  const [cName, setCName] = React.useState("")
  const [cType, setCType] = React.useState("Email")
  const [budget, setBudget] = React.useState("")
  const [startDate, setStartDate] = React.useState("")
  const [saving, setSaving] = React.useState(false)

  const refresh = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("erp_campaigns").select("*").order("created_at", { ascending: false })
    setCampaigns(data ?? [])
  }

  React.useEffect(() => { refresh().then(() => setLoading(false)) }, [])

  async function handleCreate() {
    if (!cName.trim()) return
    setSaving(true)
    const supabase = createClient()
    await supabase.from("erp_campaigns").insert({ name: cName.trim(), campaign_type: cType, budget: budget ? parseFloat(budget) : null, start_date: startDate || null, status: "Draft" })
    await logErpActivity({ employeeName: "Admin", action: "campaign_created", module: "marketing", recordType: "campaign", recordTitle: cName })
    await refresh()
    setSaving(false); setOpen(false)
    setCName(""); setBudget(""); setStartDate("")
  }

  async function updateStatus(id: string, status: string, name: string) {
    const supabase = createClient()
    await supabase.from("erp_campaigns").update({ status, updated_at: new Date().toISOString() }).eq("id", id)
    await logErpActivity({ employeeName: "Admin", action: `campaign_${status.toLowerCase()}`, module: "marketing", recordType: "campaign", recordId: id, recordTitle: name })
    await refresh()
  }

  const filtered = campaigns.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()))

  const totalReach = campaigns.reduce((s, c) => s + (c.reach ?? 0), 0)
  const totalSpend = campaigns.reduce((s, c) => s + (c.spend ?? 0), 0)
  const active = campaigns.filter(c => c.status === "Active").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Campaigns</h1>
        <p className="text-muted-foreground">Manage your marketing campaigns across all channels.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle><Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{active}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle><Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{fmtN(totalReach)}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spend</CardTitle><BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{fmt(totalSpend)}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle><Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{campaigns.length}</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Campaigns</CardTitle>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild><Button><PlusCircle className="mr-2 h-4 w-4" />New Campaign</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Create Campaign</DialogTitle></DialogHeader>
                <div className="space-y-3 py-4">
                  <div className="space-y-1"><Label>Campaign Name *</Label><Input value={cName} onChange={e => setCName(e.target.value)} /></div>
                  <div className="space-y-1">
                    <Label>Type</Label>
                    <Select value={cType} onValueChange={setCType}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Email">Email</SelectItem>
                        <SelectItem value="Social">Social Media</SelectItem>
                        <SelectItem value="Push">Push Notification</SelectItem>
                        <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1"><Label>Budget (₹)</Label><Input type="number" value={budget} onChange={e => setBudget(e.target.value)} /></div>
                  <div className="space-y-1"><Label>Start Date</Label><Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} /></div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreate} disabled={saving || !cName.trim()}>{saving ? "Saving…" : "Create"}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search campaigns..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12"><div className="h-6 w-6 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Budget</TableHead>
                  <TableHead className="hidden md:table-cell">Spend</TableHead>
                  <TableHead className="hidden lg:table-cell">Reach</TableHead>
                  <TableHead className="hidden lg:table-cell">Conversions</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(c => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell>{c.campaign_type}</TableCell>
                    <TableCell><Badge variant={getStatusVariant(c.status)}>{c.status}</Badge></TableCell>
                    <TableCell className="hidden md:table-cell tabular-nums">{fmt(c.budget)}</TableCell>
                    <TableCell className="hidden md:table-cell tabular-nums">{fmt(c.spend)}</TableCell>
                    <TableCell className="hidden lg:table-cell tabular-nums">{fmtN(c.reach)}</TableCell>
                    <TableCell className="hidden lg:table-cell tabular-nums">{fmtN(c.conversions)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => updateStatus(c.id, "Active", c.name)}>Activate</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus(c.id, "Paused", c.name)}>Pause</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus(c.id, "Completed", c.name)}>Mark Complete</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
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
