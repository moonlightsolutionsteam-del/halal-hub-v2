"use client"

import * as React from "react"
import { MoreHorizontal, PlusCircle, Search, Wallet } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { logErpActivity } from "@/lib/erp-logger"

type Payout = {
  id: string
  payout_id: string | null
  payee: string | null
  payout_type: string | null
  amount: number | null
  date: string | null
  method: string | null
  status: string | null
}

function getStatusVariant(s: string | null) {
  if (s === "Paid") return "secondary"
  if (s === "Failed") return "destructive"
  return "outline"
}

function fmt(n: number | null) {
  if (n == null) return "—"
  return `₹${n.toLocaleString("en-IN")}`
}

export default function PayoutsPage() {
  const [payouts, setPayouts] = React.useState<Payout[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [open, setOpen] = React.useState(false)
  const [payee, setPayee] = React.useState("")
  const [payoutType, setPayoutType] = React.useState("Salary")
  const [amount, setAmount] = React.useState("")
  const [method, setMethod] = React.useState("Bank Transfer")
  const [date, setDate] = React.useState("")
  const [saving, setSaving] = React.useState(false)

  const refresh = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("erp_payouts").select("*").order("date", { ascending: false })
    setPayouts(data ?? [])
  }

  React.useEffect(() => { refresh().then(() => setLoading(false)) }, [])

  async function handleCreate() {
    if (!payee.trim() || !amount) return
    setSaving(true)
    const supabase = createClient()
    const nextId = `PAY-${String(payouts.length + 1).padStart(3, "0")}`
    await supabase.from("erp_payouts").insert({ payout_id: nextId, payee: payee.trim(), payout_type: payoutType, amount: parseFloat(amount), method, date: date || new Date().toISOString().split("T")[0], status: "Pending" })
    await logErpActivity({ employeeName: "Admin", action: "payout_created", module: "accounting", recordType: "payout", recordTitle: `${nextId} - ${payee}` })
    await refresh()
    setSaving(false); setOpen(false)
    setPayee(""); setAmount(""); setDate("")
  }

  async function markPaid(id: string, pid: string | null, payeeName: string | null) {
    const supabase = createClient()
    await supabase.from("erp_payouts").update({ status: "Paid" }).eq("id", id)
    await logErpActivity({ employeeName: "Admin", action: "payout_paid", module: "accounting", recordType: "payout", recordId: id, recordTitle: `${pid} - ${payeeName}` })
    await refresh()
  }

  const filtered = payouts.filter(p => {
    const ms = !search || (p.payee ?? "").toLowerCase().includes(search.toLowerCase()) || (p.payout_id ?? "").toLowerCase().includes(search.toLowerCase())
    const mst = statusFilter === "all" || p.status === statusFilter
    return ms && mst
  })

  const totalPaid = payouts.filter(p => p.status === "Paid").reduce((s, p) => s + (p.amount ?? 0), 0)
  const pending = payouts.filter(p => p.status === "Pending").reduce((s, p) => s + (p.amount ?? 0), 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Payouts</h1>
        <p className="text-muted-foreground">Manage salary, freelancer, and vendor payouts.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Payouts</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{payouts.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Paid</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{fmt(totalPaid)}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Pending Amount</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-yellow-600">{fmt(pending)}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Pending Count</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{payouts.filter(p => p.status === "Pending").length}</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Payouts</CardTitle>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild><Button><PlusCircle className="mr-2 h-4 w-4" />New Payout</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Create Payout</DialogTitle></DialogHeader>
                <div className="space-y-3 py-4">
                  <div className="space-y-1"><Label>Payee *</Label><Input value={payee} onChange={e => setPayee(e.target.value)} placeholder="Employee or vendor name" /></div>
                  <div className="space-y-1">
                    <Label>Type</Label>
                    <Select value={payoutType} onValueChange={setPayoutType}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Salary">Salary</SelectItem>
                        <SelectItem value="Freelancer">Freelancer</SelectItem>
                        <SelectItem value="Vendor">Vendor</SelectItem>
                        <SelectItem value="Bonus">Bonus</SelectItem>
                        <SelectItem value="Reimbursement">Reimbursement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1"><Label>Amount (₹) *</Label><Input type="number" value={amount} onChange={e => setAmount(e.target.value)} /></div>
                  <div className="space-y-1">
                    <Label>Method</Label>
                    <Select value={method} onValueChange={setMethod}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                        <SelectItem value="UPI">UPI</SelectItem>
                        <SelectItem value="Cheque">Cheque</SelectItem>
                        <SelectItem value="Cash">Cash</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1"><Label>Date</Label><Input type="date" value={date} onChange={e => setDate(e.target.value)} /></div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreate} disabled={saving || !payee.trim() || !amount}>{saving ? "Saving…" : "Create"}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search payouts..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
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
                  <TableHead>Payee</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Method</TableHead>
                  <TableHead className="hidden lg:table-cell">Date</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(p => (
                  <TableRow key={p.id}>
                    <TableCell className="font-mono text-xs">{p.payout_id}</TableCell>
                    <TableCell className="font-medium">{p.payee}</TableCell>
                    <TableCell className="hidden md:table-cell">{p.payout_type}</TableCell>
                    <TableCell className="tabular-nums font-medium">{fmt(p.amount)}</TableCell>
                    <TableCell><Badge variant={getStatusVariant(p.status)}>{p.status}</Badge></TableCell>
                    <TableCell className="hidden lg:table-cell">{p.method}</TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">{p.date}</TableCell>
                    <TableCell>
                      {p.status === "Pending" && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => markPaid(p.id, p.payout_id, p.payee)}>Mark as Paid</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
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
