"use client"

import * as React from "react"
import { MoreHorizontal, PlusCircle, Search, Briefcase, UserPlus, UserX } from "lucide-react"
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

type Vendor = {
  id: string
  name: string
  contact: string | null
  email: string | null
  stage: string | null
  onboarded_date: string | null
  health: string | null
  category: string | null
}

function getStageVariant(s: string | null) {
  if (s === "Active") return "secondary"
  if (s === "Churned") return "destructive"
  return "default"
}

export default function VendorLifecyclePage() {
  const [vendors, setVendors] = React.useState<Vendor[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [stageFilter, setStageFilter] = React.useState("all")
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState("")
  const [contact, setContact] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [category, setCategory] = React.useState("")
  const [saving, setSaving] = React.useState(false)

  const refresh = async () => {
    const supabase = createClient()
    const { data } = await (supabase as any).from("erp_vendors").select("*").order("created_at", { ascending: false })
    setVendors(data ?? [])
  }

  React.useEffect(() => { refresh().then(() => setLoading(false)) }, [])

  async function handleCreate() {
    if (!name.trim()) return
    setSaving(true)
    const supabase = createClient()
    await (supabase as any).from("erp_vendors").insert({ name: name.trim(), contact: contact || null, email: email || null, category: category || null, stage: "Onboarding", health: "Good", onboarded_date: new Date().toISOString().split("T")[0] })
    await logErpActivity({ employeeName: "Admin", action: "vendor_added", module: "operations", recordType: "vendor", recordTitle: name })
    await refresh()
    setSaving(false); setOpen(false)
    setName(""); setContact(""); setEmail(""); setCategory("")
  }

  async function updateStage(id: string, stage: string, vendorName: string) {
    const supabase = createClient()
    await (supabase as any).from("erp_vendors").update({ stage, updated_at: new Date().toISOString() }).eq("id", id)
    await logErpActivity({ employeeName: "Admin", action: `vendor_${stage.toLowerCase()}`, module: "operations", recordType: "vendor", recordId: id, recordTitle: vendorName })
    await refresh()
  }

  const filtered = vendors.filter(v => {
    const ms = !search || v.name.toLowerCase().includes(search.toLowerCase()) || (v.category ?? "").toLowerCase().includes(search.toLowerCase())
    const mst = stageFilter === "all" || v.stage === stageFilter
    return ms && mst
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Vendor Lifecycle</h1>
        <p className="text-muted-foreground">Manage vendor relationships from onboarding to churn.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Vendors", value: vendors.length },
          { label: "Active", value: vendors.filter(v => v.stage === "Active").length },
          { label: "Onboarding", value: vendors.filter(v => v.stage === "Onboarding").length },
          { label: "Churned", value: vendors.filter(v => v.stage === "Churned").length },
        ].map(({ label, value }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{label}</CardTitle><Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{value}</div></CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Vendors</CardTitle>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild><Button><PlusCircle className="mr-2 h-4 w-4" />Add Vendor</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Add Vendor</DialogTitle></DialogHeader>
                <div className="space-y-3 py-4">
                  <div className="space-y-1"><Label>Vendor Name *</Label><Input value={name} onChange={e => setName(e.target.value)} /></div>
                  <div className="space-y-1"><Label>Contact Person</Label><Input value={contact} onChange={e => setContact(e.target.value)} /></div>
                  <div className="space-y-1"><Label>Email</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
                  <div className="space-y-1"><Label>Category</Label><Input value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g., Infrastructure" /></div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreate} disabled={saving || !name.trim()}>{saving ? "Saving…" : "Add Vendor"}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search vendors..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Stage" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Onboarding">Onboarding</SelectItem>
                <SelectItem value="Churned">Churned</SelectItem>
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
                  <TableHead>Vendor</TableHead>
                  <TableHead className="hidden md:table-cell">Contact</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead className="hidden lg:table-cell">Onboarded</TableHead>
                  <TableHead className="hidden lg:table-cell">Health</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(v => (
                  <TableRow key={v.id}>
                    <TableCell>
                      <div className="font-medium">{v.name}</div>
                      <div className="text-xs text-muted-foreground">{v.category}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div>{v.contact ?? "—"}</div>
                      <div className="text-xs text-muted-foreground">{v.email}</div>
                    </TableCell>
                    <TableCell><Badge variant={getStageVariant(v.stage)}>{v.stage}</Badge></TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">{v.onboarded_date ?? "—"}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge variant={v.health === "Good" ? "secondary" : "outline"}>{v.health ?? "N/A"}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Update Stage</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => updateStage(v.id, "Active", v.name)}>Mark Active</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStage(v.id, "Onboarding", v.name)}>Move to Onboarding</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => updateStage(v.id, "Churned", v.name)}>Mark Churned</DropdownMenuItem>
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
