"use client"

import * as React from "react"
import { Loader2, Search, IndianRupee, CheckCircle2, Clock, MoreHorizontal, PlusCircle, Download, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { logErpActivity } from "@/lib/erp-logger"

type PayrollRow = {
  id: string; employee_name: string; month: number; year: number
  basic: number | null; hra: number | null; allowances: number | null
  deductions: number | null; tds: number | null; net_pay: number | null
  status: string | null; paid_date: string | null
}
type Employee = { id: string; name: string }

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

function fmt(n: number | null) { return `₹${(n ?? 0).toLocaleString("en-IN")}` }
function initials(name: string) { return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() }
function statusVariant(s: string | null) {
  if (s === "Paid") return "secondary" as const
  if (s === "Processed") return "default" as const
  return "outline" as const
}

export default function PayrollPage() {
  const [records, setRecords] = React.useState<PayrollRow[]>([])
  const [employees, setEmployees] = React.useState<Employee[]>([])
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [open, setOpen] = React.useState(false)

  // form state
  const [empId, setEmpId] = React.useState("")
  const [month, setMonth] = React.useState(String(new Date().getMonth() + 1))
  const [year, setYear] = React.useState(String(new Date().getFullYear()))
  const [basic, setBasic] = React.useState("")
  const [hra, setHra] = React.useState("")
  const [allowances, setAllowances] = React.useState("")
  const [deductions, setDeductions] = React.useState("")
  const [tds, setTds] = React.useState("")

  const now = new Date()
  const currentMonth = now.getMonth() + 1
  const currentYear = now.getFullYear()

  function load() {
    const supabase = createClient()
    supabase.from("erp_payroll")
      .select("id, employee_name, month, year, basic, hra, allowances, deductions, tds, net_pay, status, paid_date")
      .order("year", { ascending: false }).order("month", { ascending: false }).limit(300)
      .then(({ data }) => { setRecords(data ?? []); setLoading(false) })
  }

  React.useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from("erp_payroll").select("id, employee_name, month, year, basic, hra, allowances, deductions, tds, net_pay, status, paid_date").order("year", { ascending: false }).order("month", { ascending: false }).limit(300),
      supabase.from("erp_employees").select("id, name").eq("status", "Active").order("name"),
    ]).then(([p, e]) => { setRecords(p.data ?? []); setEmployees(e.data ?? []); setLoading(false) })
  }, [])

  async function handleAdd() {
    if (!empId) return
    setSaving(true)
    const emp = employees.find(e => e.id === empId)
    const supabase = createClient()
    await supabase.from("erp_payroll").insert({
      employee_id: empId, employee_name: emp!.name,
      month: Number(month), year: Number(year),
      basic: Number(basic) || 0, hra: Number(hra) || 0,
      allowances: Number(allowances) || 0, deductions: Number(deductions) || 0,
      tds: Number(tds) || 0, status: "Draft",
    })
    await logErpActivity({ employeeName: "Admin", action: "payroll_entry_created", module: "hr", recordType: "payroll", recordTitle: `${emp!.name} - ${MONTHS[Number(month)-1]} ${year}` })
    setSaving(false); setOpen(false)
    setEmpId(""); setBasic(""); setHra(""); setAllowances(""); setDeductions(""); setTds("")
    load()
  }

  async function updateStatus(id: string, status: string, empName: string) {
    const supabase = createClient()
    const update: Record<string, unknown> = { status }
    if (status === "Paid") update.paid_date = new Date().toISOString().split("T")[0]
    await supabase.from("erp_payroll").update(update).eq("id", id)
    await logErpActivity({ employeeName: "Admin", action: `payroll_${status.toLowerCase()}`, module: "hr", recordType: "payroll", recordTitle: empName })
    load()
  }

  const filtered = records.filter(r => {
    const q = search.toLowerCase()
    return (!q || r.employee_name.toLowerCase().includes(q)) &&
           (statusFilter === "all" || (r.status ?? "Draft") === statusFilter)
  })

  const thisMonth = records.filter(r => r.month === currentMonth && r.year === currentYear)
  const paidTotal = thisMonth.filter(r => r.status === "Paid").reduce((s, r) => s + (r.net_pay ?? 0), 0)
  const processedCount = thisMonth.filter(r => r.status === "Processed" || r.status === "Paid").length
  const draftCount = thisMonth.filter(r => r.status === "Draft").length

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-headline">Payroll</h1>
          <p className="text-muted-foreground">Monthly salary processing and payout records.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><PlusCircle className="h-4 w-4" />Add Entry</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>New Payroll Entry</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-1.5">
                <Label>Employee</Label>
                <Select value={empId} onValueChange={setEmpId}>
                  <SelectTrigger><SelectValue placeholder="Select employee" /></SelectTrigger>
                  <SelectContent>{employees.map(e => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label>Month</Label>
                  <Select value={month} onValueChange={setMonth}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{MONTHS.map((m, i) => <SelectItem key={i} value={String(i+1)}>{m}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1.5">
                  <Label>Year</Label>
                  <Input value={year} onChange={e => setYear(e.target.value)} placeholder="2026" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5"><Label>Basic (₹)</Label><Input value={basic} onChange={e => setBasic(e.target.value)} placeholder="0" /></div>
                <div className="grid gap-1.5"><Label>HRA (₹)</Label><Input value={hra} onChange={e => setHra(e.target.value)} placeholder="0" /></div>
                <div className="grid gap-1.5"><Label>Allowances (₹)</Label><Input value={allowances} onChange={e => setAllowances(e.target.value)} placeholder="0" /></div>
                <div className="grid gap-1.5"><Label>Deductions (₹)</Label><Input value={deductions} onChange={e => setDeductions(e.target.value)} placeholder="0" /></div>
              </div>
              <div className="grid gap-1.5"><Label>TDS (₹)</Label><Input value={tds} onChange={e => setTds(e.target.value)} placeholder="0" /></div>
              {basic && (
                <p className="text-sm font-semibold text-primary">
                  Net Pay: {fmt((Number(basic)||0) + (Number(hra)||0) + (Number(allowances)||0) - (Number(deductions)||0) - (Number(tds)||0))}
                </p>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleAdd} disabled={saving || !empId}>{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Draft"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "MTD Payout", value: fmt(paidTotal), sub: `${MONTHS[currentMonth-1]} ${currentYear}`, icon: IndianRupee },
          { label: "Processed", value: processedCount, sub: "Payslips this month", icon: CheckCircle2 },
          { label: "Pending", value: draftCount, sub: "Drafts not processed", icon: Clock },
          { label: "Total Entries", value: records.length, sub: "All-time records", icon: Users },
        ].map(({ label, value, sub, icon: Icon }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{label}</CardTitle><Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : value}</div>
              <p className="text-xs text-muted-foreground">{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search employee..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Processed">Processed</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div> : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead className="hidden lg:table-cell text-right">Basic</TableHead>
                  <TableHead className="hidden lg:table-cell text-right">Allowances</TableHead>
                  <TableHead className="hidden md:table-cell text-right">Deductions</TableHead>
                  <TableHead className="text-right">Net Pay</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No payroll records. Click "Add Entry" to create one.</TableCell></TableRow>
                ) : filtered.map(r => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7"><AvatarFallback className="text-xs">{initials(r.employee_name)}</AvatarFallback></Avatar>
                        <span className="font-medium text-sm">{r.employee_name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{MONTHS[r.month - 1]} {r.year}</TableCell>
                    <TableCell className="hidden lg:table-cell text-right text-sm">{fmt(r.basic)}</TableCell>
                    <TableCell className="hidden lg:table-cell text-right text-sm">{fmt((r.hra ?? 0) + (r.allowances ?? 0))}</TableCell>
                    <TableCell className="hidden md:table-cell text-right text-sm text-destructive">{fmt((r.deductions ?? 0) + (r.tds ?? 0))}</TableCell>
                    <TableCell className="text-right font-semibold">{fmt(r.net_pay)}</TableCell>
                    <TableCell><Badge variant={statusVariant(r.status)}>{r.status ?? "Draft"}</Badge></TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          {r.status === "Draft" && (
                            <DropdownMenuItem onClick={() => updateStatus(r.id, "Processed", r.employee_name)}>
                              ✅ Mark Processed
                            </DropdownMenuItem>
                          )}
                          {r.status === "Processed" && (
                            <DropdownMenuItem onClick={() => updateStatus(r.id, "Paid", r.employee_name)}>
                              💰 Mark Paid
                            </DropdownMenuItem>
                          )}
                          {r.status === "Paid" && (
                            <DropdownMenuItem className="text-muted-foreground" disabled>Paid on {r.paid_date ?? "—"}</DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => updateStatus(r.id, "Draft", r.employee_name)} className="text-muted-foreground">
                            Revert to Draft
                          </DropdownMenuItem>
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
