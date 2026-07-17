"use client"

import * as React from "react"
import { MoreHorizontal, PlusCircle, Search, Package, Wrench } from "lucide-react"
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

type Asset = {
  id: string
  asset_id: string | null
  name: string
  category: string | null
  assigned_to: string | null
  status: string | null
  purchase_date: string | null
  purchase_price: number | null
}

function getStatusVariant(s: string | null) {
  if (s === "In Use") return "secondary"
  if (s === "In Repair") return "destructive"
  return "outline"
}

function fmt(n: number | null) {
  if (n == null) return "—"
  return `₹${n.toLocaleString("en-IN")}`
}

export default function AssetsPage() {
  const [assets, setAssets] = React.useState<Asset[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState("")
  const [category, setCategory] = React.useState("Laptop")
  const [assignedTo, setAssignedTo] = React.useState("")
  const [price, setPrice] = React.useState("")
  const [purchaseDate, setPurchaseDate] = React.useState("")
  const [saving, setSaving] = React.useState(false)

  const refresh = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("erp_assets").select("*").order("created_at", { ascending: false })
    setAssets(data ?? [])
  }

  React.useEffect(() => { refresh().then(() => setLoading(false)) }, [])

  async function handleCreate() {
    if (!name.trim()) return
    setSaving(true)
    const supabase = createClient()
    const nextId = `ASSET-${String(assets.length + 1).padStart(3, "0")}`
    await supabase.from("erp_assets").insert({ asset_id: nextId, name: name.trim(), category, assigned_to: assignedTo || null, purchase_price: price ? parseFloat(price) : null, purchase_date: purchaseDate || null, status: assignedTo ? "In Use" : "Available" })
    await logErpActivity({ employeeName: "Admin", action: "asset_registered", module: "operations", recordType: "asset", recordTitle: `${nextId} - ${name}` })
    await refresh()
    setSaving(false); setOpen(false)
    setName(""); setAssignedTo(""); setPrice(""); setPurchaseDate("")
  }

  async function updateStatus(id: string, status: string, assetName: string) {
    const supabase = createClient()
    await supabase.from("erp_assets").update({ status, updated_at: new Date().toISOString() }).eq("id", id)
    await logErpActivity({ employeeName: "Admin", action: `asset_${status.toLowerCase().replace(/\s+/g, "_")}`, module: "operations", recordType: "asset", recordId: id, recordTitle: assetName })
    await refresh()
  }

  const filtered = assets.filter(a => {
    const ms = !search || a.name.toLowerCase().includes(search.toLowerCase()) || (a.assigned_to ?? "").toLowerCase().includes(search.toLowerCase())
    const mst = statusFilter === "all" || a.status === statusFilter
    return ms && mst
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Assets</h1>
        <p className="text-muted-foreground">Track and manage all company assets and equipment.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Assets", value: assets.length },
          { label: "In Use", value: assets.filter(a => a.status === "In Use").length },
          { label: "Available", value: assets.filter(a => a.status === "Available").length },
          { label: "In Repair", value: assets.filter(a => a.status === "In Repair").length },
        ].map(({ label, value }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{label}</CardTitle><Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{value}</div></CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Assets</CardTitle>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild><Button><PlusCircle className="mr-2 h-4 w-4" />Add Asset</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Register Asset</DialogTitle></DialogHeader>
                <div className="space-y-3 py-4">
                  <div className="space-y-1"><Label>Name *</Label><Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g., MacBook Pro 14&quot;" /></div>
                  <div className="space-y-1">
                    <Label>Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Laptop">Laptop</SelectItem>
                        <SelectItem value="Mobile">Mobile</SelectItem>
                        <SelectItem value="Tablet">Tablet</SelectItem>
                        <SelectItem value="Printer">Printer</SelectItem>
                        <SelectItem value="Peripherals">Peripherals</SelectItem>
                        <SelectItem value="Furniture">Furniture</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1"><Label>Assigned To</Label><Input value={assignedTo} onChange={e => setAssignedTo(e.target.value)} placeholder="Employee name" /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1"><Label>Purchase Price (₹)</Label><Input type="number" value={price} onChange={e => setPrice(e.target.value)} /></div>
                    <div className="space-y-1"><Label>Purchase Date</Label><Input type="date" value={purchaseDate} onChange={e => setPurchaseDate(e.target.value)} /></div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreate} disabled={saving || !name.trim()}>{saving ? "Saving…" : "Register"}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name or assignee..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="In Use">In Use</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="In Repair">In Repair</SelectItem>
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
                  <TableHead>Asset</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="hidden md:table-cell">Assigned To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Purchase Date</TableHead>
                  <TableHead className="hidden lg:table-cell">Value</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(a => (
                  <TableRow key={a.id}>
                    <TableCell>
                      <div className="font-medium">{a.name}</div>
                      <div className="text-xs text-muted-foreground font-mono">{a.asset_id}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{a.category}</TableCell>
                    <TableCell className="hidden md:table-cell">{a.assigned_to ?? "Unassigned"}</TableCell>
                    <TableCell><Badge variant={getStatusVariant(a.status)}>{a.status}</Badge></TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">{a.purchase_date ?? "—"}</TableCell>
                    <TableCell className="hidden lg:table-cell tabular-nums">{fmt(a.purchase_price)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => updateStatus(a.id, "In Use", a.name)}>Mark In Use</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus(a.id, "Available", a.name)}>Mark Available</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus(a.id, "In Repair", a.name)}>Send to Repair</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Retire Asset</DropdownMenuItem>
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
