"use client"

import * as React from "react"
import { Loader2, Search, Heart, IndianRupee, CheckCircle2, Clock, MoreHorizontal, PlusCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { logErpActivity } from "@/lib/erp-logger"

type Benefit = {
  id: string; employee_name: string; benefit_type: string
  value: number | null; frequency: string | null; status: string | null
  start_date: string | null; end_date: string | null
  provider: string | null; policy_number: string | null
}
type Employee = { id: string; name: string }

const BENEFIT_TYPES = ["Health Insurance", "PF (Provident Fund)", "Gratuity", "ESIC", "Travel Allowance", "Meal Vouchers", "Life Insurance", "Group Mediclaim", "NPS", "Other"]
const FREQUENCIES = ["Monthly", "Quarterly", "Annual", "One-time"]

function statusVariant(s: string | null) {
  if (s === "Active") return "secondary" as const
  if (s === "Pending") return "default" as const
  return "outline" as const
}

function fmt(n: number | null) { return `₹${(n ?? 0).toLocaleString("en-IN")}` }
function initials(name: string) { return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() }

export default function BenefitsPage() {
  const [benefits, setBenefits] = React.useState<Benefit[]>([])
  const [employees, setEmployees] = React.useState<Employee[]>([])
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [typeFilter, setTypeFilter] = React.useState("all")
  const [open, setOpen] = React.useState(false)

  const [empId, setEmpId] = React.useState("")
  const [benefitType, setBenefitType] = React.useState("")
  const [value, setValue] = React.useState("")
  const [frequency, setFrequency] = React.useState("")
  const [provider, setProvider] = React.useState("")
  const [policyNumber, setPolicyNumber] = React.useState("")
  const [startDate, setStartDate] = React.useState("")

  function load() {
    const supabase = createClient()
    supabase.from("erp_benefits")
      .select("id, employee_name, benefit_type, value, frequency, status, start_date, end_date, provider, policy_number")
      .order("created_at", { ascending: false }).limit(300)
      .then(({ data }) => { setBenefits(data ?? []); setLoading(false) })
  }

  React.useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from("erp_benefits").select("id, employee_name, benefit_type, value, frequency, status, start_date, end_date, provider, policy_number").order("created_at", { ascending: false }).limit(300),
      supabase.from("erp_employees").select("id, name").eq("status", "Active").order("name"),
    ]).then(([b, e]) => { setBenefits(b.data ?? []); setEmployees(e.data ?? []); setLoading(false) })
  }, [])

  async function handleAdd() {
    if (!empId || !benefitType) return
    setSaving(true)
    const emp = employees.find(e => e.id === empId)
    const supabase = createClient()
    await supabase.from("erp_benefits").insert({
      employee_id: empId, employee_name: emp!.name,
      benefit_type: benefitType, value: value ? Number(value) : null,
      frequency: frequency || null, provider: provider || null,
      policy_number: policyNumber || null,
      start_date: startDate || null, status: "Active",
    })
    await logErpActivity({ employeeName: "Admin", action: "benefit_added", module: "hr", recordType: "benefit", recordTitle: `${benefitType} — ${emp!.name}` })
    setSaving(false); setOpen(false)
    setEmpId(""); setBenefitType(""); setValue(""); setFrequency(""); setProvider(""); setPolicyNumber(""); setStartDate("")
    load()
  }

  async function toggleStatus(id: string, current: string | null, empName: string, bType: string) {
    const newStatus = current === "Active" ? "Inactive" : "Active"
    const supabase = createClient()
    await supabase.from("erp_benefits").update({ status: newStatus }).eq("id", id)
    await logErpActivity({ employeeName: "Admin", action: `benefit_${newStatus.toLowerCase()}`, module: "hr", recordType: "benefit", recordTitle: `${bType} — ${empName}` })
    load()
  }

  const filtered = benefits.filter(b => {
    const q = search.toLowerCase()
    const ms = !q || b.employee_name.toLowerCase().includes(q) || b.benefit_type.toLowerCase().includes(q) || (b.provider ?? "").toLowerCase().includes(q)
    const sf = statusFilter === "all" || (b.status ?? "Active") === statusFilter
    const tf = typeFilter === "all" || b.benefit_type === typeFilter
    return ms && sf && tf
  })

  const active = benefits.filter(b => b.status === "Active")
  const monthlyTotal = active.filter(b => b.frequency === "Monthly").reduce((s, b) => s + (b.value ?? 0), 0)
  const annualTotal = active.filter(b => b.frequency === "Annual").reduce((s, b) => s + (b.value ?? 0), 0)
  const benefitTypes = [...new Set(benefits.map(b => b.benefit_type).filter(Boolean))]

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-headline">Benefits</h1>
          <p className="text-muted-foreground">Track employee benefits — health, PF, gratuity, and more.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><PlusCircle className="h-4 w-4" />Add Benefit</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>Add Employee Benefit</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-1.5">
                <Label>Employee</Label>
                <Select value={empId} onValueChange={setEmpId}>
                  <SelectTrigger><SelectValue placeholder="Select employee" /></SelectTrigger>
                  <SelectContent>{employees.map(e => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label>Benefit Type</Label>
                <Select value={benefitType} onValueChange={setBenefitType}>
                  <SelectTrigger><SelectValue placeholder="Select benefit" /></SelectTrigger>
                  <SelectContent>{BENEFIT_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label>Value (₹)</Label>
                  <Input value={value} onChange={e => setValue(e.target.value)} placeholder="0" />
                </div>
                <div className="grid gap-1.5">
                  <Label>Frequency</Label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger><SelectValue placeholder="Freq" /></SelectTrigger>
                    <SelectContent>{FREQUENCIES.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label>Provider</Label>
                  <Input value={provider} onChange={e => setProvider(e.target.value)} placeholder="e.g. HDFC ERGO" />
                </div>
                <div className="grid gap-1.5">
                  <Label>Policy No.</Label>
                  <Input value={policyNumber} onChange={e => setPolicyNumber(e.target.value)} placeholder="Optional" />
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label>Start Date</Label>
                <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleAdd} disabled={saving || !empId || !benefitType}>{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add Benefit"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active Benefits", value: active.length, sub: "Currently active", icon: Heart },
          { label: "Monthly Outgo", value: fmt(monthlyTotal), sub: "Monthly benefits total", icon: IndianRupee },
          { label: "Annual Cost", value: fmt(monthlyTotal * 12 + annualTotal), sub: "Projected annual spend", icon: Clock },
          { label: "Benefit Types", value: benefitTypes.length, sub: "Distinct types tracked", icon: CheckCircle2 },
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
              <Input placeholder="Search by employee, type, or provider..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="Benefit Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {benefitTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
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
                  <TableHead>Benefit</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="hidden md:table-cell">Frequency</TableHead>
                  <TableHead className="hidden lg:table-cell">Provider</TableHead>
                  <TableHead className="hidden lg:table-cell">Policy No.</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No benefits records. Click "Add Benefit" to create one.</TableCell></TableRow>
                ) : filtered.map(b => (
                  <TableRow key={b.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7"><AvatarFallback className="text-xs">{initials(b.employee_name)}</AvatarFallback></Avatar>
                        <span className="font-medium text-sm">{b.employee_name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-sm">{b.benefit_type}</TableCell>
                    <TableCell className="text-right font-semibold text-sm">{fmt(b.value)}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{b.frequency ?? "—"}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{b.provider ?? "—"}</TableCell>
                    <TableCell className="hidden lg:table-cell font-mono text-xs text-muted-foreground">{b.policy_number ?? "—"}</TableCell>
                    <TableCell><Badge variant={statusVariant(b.status)}>{b.status ?? "Active"}</Badge></TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => toggleStatus(b.id, b.status, b.employee_name, b.benefit_type)}>
                            {b.status === "Active" ? "⏸ Deactivate" : "▶ Activate"}
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
