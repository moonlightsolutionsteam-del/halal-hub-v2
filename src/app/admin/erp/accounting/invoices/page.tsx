"use client"

import * as React from "react"
import { MoreHorizontal, PlusCircle, Search, FileText, AlertTriangle, CheckCircle2 } from "lucide-react"
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

type Invoice = {
  id: string
  invoice_id: string | null
  vendor: string
  date: string | null
  due_date: string | null
  amount: number | null
  status: string | null
}

function getStatusVariant(s: string | null) {
  if (s === "Paid") return "secondary"
  if (s === "Overdue") return "destructive"
  return "default"
}

function fmt(amount: number | null) {
  if (amount == null) return "—"
  return `₹${amount.toLocaleString("en-IN")}`
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = React.useState<Invoice[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [open, setOpen] = React.useState(false)
  const [vendor, setVendor] = React.useState("")
  const [amount, setAmount] = React.useState("")
  const [date, setDate] = React.useState("")
  const [dueDate, setDueDate] = React.useState("")
  const [saving, setSaving] = React.useState(false)

  const refresh = async () => {
    const supabase = createClient()
    const { data } = await (supabase as any).from("erp_invoices").select("*").order("created_at", { ascending: false })
    setInvoices(data ?? [])
  }

  React.useEffect(() => { refresh().then(() => setLoading(false)) }, [])

  async function handleCreate() {
    if (!vendor.trim()) return
    setSaving(true)
    const supabase = createClient()
    const nextId = `INV-${String(invoices.length + 1).padStart(3, "0")}`
    await (supabase as any).from("erp_invoices").insert({ invoice_id: nextId, vendor: vendor.trim(), amount: amount ? parseFloat(amount) : null, date: date || null, due_date: dueDate || null, status: "Pending" })
    await logErpActivity({ employeeName: "Admin", action: "invoice_created", module: "accounting", recordType: "invoice", recordTitle: `${nextId} - ${vendor}` })
    await refresh()
    setSaving(false); setOpen(false)
    setVendor(""); setAmount(""); setDate(""); setDueDate("")
  }

  async function markPaid(id: string, invId: string | null) {
    const supabase = createClient()
    await (supabase as any).from("erp_invoices").update({ status: "Paid", updated_at: new Date().toISOString() }).eq("id", id)
    await logErpActivity({ employeeName: "Admin", action: "invoice_paid", module: "accounting", recordType: "invoice", recordTitle: invId ?? id })
    await refresh()
  }

  const filtered = invoices.filter(i => {
    const ms = !search || i.vendor.toLowerCase().includes(search.toLowerCase()) || (i.invoice_id ?? "").includes(search)
    const mst = statusFilter === "all" || i.status === statusFilter
    return ms && mst
  })

  const totalPaid = invoices.filter(i => i.status === "Paid").reduce((s, i) => s + (i.amount ?? 0), 0)
  const totalPending = invoices.filter(i => i.status === "Pending").reduce((s, i) => s + (i.amount ?? 0), 0)
  const overdue = invoices.filter(i => i.status === "Overdue").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Invoices</h1>
        <p className="text-muted-foreground">Track vendor invoices and payment status.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle><CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{fmt(totalPaid)}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle><FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold text-yellow-600">{fmt(totalPending)}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle><AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold text-destructive">{overdue}</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Invoices</CardTitle>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild><Button><PlusCircle className="mr-2 h-4 w-4" />New Invoice</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Create Invoice</DialogTitle></DialogHeader>
                <div className="space-y-3 py-4">
                  <div className="space-y-1"><Label>Vendor *</Label><Input value={vendor} onChange={e => setVendor(e.target.value)} /></div>
                  <div className="space-y-1"><Label>Amount (₹)</Label><Input type="number" value={amount} onChange={e => setAmount(e.target.value)} /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1"><Label>Invoice Date</Label><Input type="date" value={date} onChange={e => setDate(e.target.value)} /></div>
                    <div className="space-y-1"><Label>Due Date</Label><Input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} /></div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreate} disabled={saving || !vendor.trim()}>{saving ? "Saving…" : "Create"}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search vendor or ID..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
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
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="hidden md:table-cell">Due</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(inv => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-mono text-sm">{inv.invoice_id}</TableCell>
                    <TableCell className="font-medium">{inv.vendor}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{inv.date ?? "—"}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{inv.due_date ?? "—"}</TableCell>
                    <TableCell className="font-medium tabular-nums">{fmt(inv.amount)}</TableCell>
                    <TableCell><Badge variant={getStatusVariant(inv.status)}>{inv.status}</Badge></TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => markPaid(inv.id, inv.invoice_id)}>Mark as Paid</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
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
