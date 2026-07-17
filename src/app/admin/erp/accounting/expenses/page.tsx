"use client"

import * as React from "react"
import { MoreHorizontal, PlusCircle, Search, Receipt, DollarSign, ArrowUpCircle } from "lucide-react"
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

type Expense = {
  id: string
  expense_id: string | null
  category: string | null
  vendor: string | null
  amount: number | null
  date: string | null
  status: string | null
  submitted_by: string | null
}

function fmt(amount: number | null) {
  if (amount == null) return "—"
  return `₹${amount.toLocaleString("en-IN")}`
}

function getStatusVariant(s: string | null) {
  if (s === "Paid") return "secondary"
  if (s === "Rejected") return "destructive"
  return "default"
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = React.useState<Expense[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [open, setOpen] = React.useState(false)
  const [category, setCategory] = React.useState("Marketing")
  const [vendor, setVendor] = React.useState("")
  const [amount, setAmount] = React.useState("")
  const [expDate, setExpDate] = React.useState("")
  const [submittedBy, setSubmittedBy] = React.useState("")
  const [saving, setSaving] = React.useState(false)

  const refresh = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("erp_expenses").select("*").order("created_at", { ascending: false })
    setExpenses(data ?? [])
  }

  React.useEffect(() => { refresh().then(() => setLoading(false)) }, [])

  async function handleCreate() {
    if (!vendor.trim()) return
    setSaving(true)
    const supabase = createClient()
    const nextId = `EXP-${String(expenses.length + 1).padStart(3, "0")}`
    await supabase.from("erp_expenses").insert({ expense_id: nextId, category, vendor: vendor.trim(), amount: amount ? parseFloat(amount) : null, date: expDate || new Date().toISOString().split("T")[0], submitted_by: submittedBy || null, status: "Pending" })
    await logErpActivity({ employeeName: submittedBy || "Admin", action: "expense_submitted", module: "accounting", recordType: "expense", recordTitle: `${nextId} - ${vendor}` })
    await refresh()
    setSaving(false); setOpen(false)
    setVendor(""); setAmount(""); setExpDate(""); setSubmittedBy("")
  }

  async function markPaid(id: string, expId: string | null) {
    const supabase = createClient()
    await supabase.from("erp_expenses").update({ status: "Paid" }).eq("id", id)
    await logErpActivity({ employeeName: "Admin", action: "expense_paid", module: "accounting", recordType: "expense", recordTitle: expId ?? id })
    await refresh()
  }

  const filtered = expenses.filter(e => {
    const ms = !search || (e.vendor ?? "").toLowerCase().includes(search.toLowerCase()) || (e.category ?? "").toLowerCase().includes(search.toLowerCase())
    const mst = statusFilter === "all" || e.status === statusFilter
    return ms && mst
  })

  const totalPaid = expenses.filter(e => e.status === "Paid").reduce((s, e) => s + (e.amount ?? 0), 0)
  const totalPending = expenses.filter(e => e.status === "Pending").reduce((s, e) => s + (e.amount ?? 0), 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Expenses</h1>
        <p className="text-muted-foreground">Track and approve team expense submissions.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle><Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{fmt(totalPaid + totalPending)}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle><DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{fmt(totalPaid)}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle><ArrowUpCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold text-yellow-600">{fmt(totalPending)}</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Expenses</CardTitle>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild><Button><PlusCircle className="mr-2 h-4 w-4" />Add Expense</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Submit Expense</DialogTitle></DialogHeader>
                <div className="space-y-3 py-4">
                  <div className="space-y-1">
                    <Label>Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Software">Software</SelectItem>
                        <SelectItem value="Travel">Travel</SelectItem>
                        <SelectItem value="Office">Office</SelectItem>
                        <SelectItem value="Training">Training</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1"><Label>Vendor *</Label><Input value={vendor} onChange={e => setVendor(e.target.value)} /></div>
                  <div className="space-y-1"><Label>Amount (₹)</Label><Input type="number" value={amount} onChange={e => setAmount(e.target.value)} /></div>
                  <div className="space-y-1"><Label>Date</Label><Input type="date" value={expDate} onChange={e => setExpDate(e.target.value)} /></div>
                  <div className="space-y-1"><Label>Submitted By</Label><Input value={submittedBy} onChange={e => setSubmittedBy(e.target.value)} /></div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreate} disabled={saving || !vendor.trim()}>{saving ? "Saving…" : "Submit"}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search expenses..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
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
                  <TableHead>ID</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="hidden md:table-cell">Submitted By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(e => (
                  <TableRow key={e.id}>
                    <TableCell className="font-mono text-sm">{e.expense_id}</TableCell>
                    <TableCell>{e.category}</TableCell>
                    <TableCell className="font-medium">{e.vendor}</TableCell>
                    <TableCell className="tabular-nums">{fmt(e.amount)}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{e.date ?? "—"}</TableCell>
                    <TableCell className="hidden md:table-cell">{e.submitted_by ?? "—"}</TableCell>
                    <TableCell><Badge variant={getStatusVariant(e.status)}>{e.status}</Badge></TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => markPaid(e.id, e.expense_id)}>Approve & Pay</DropdownMenuItem>
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
