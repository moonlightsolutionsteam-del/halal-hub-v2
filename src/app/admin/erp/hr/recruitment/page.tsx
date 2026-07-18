"use client"

import * as React from "react"
import { MoreHorizontal, PlusCircle, Search, UserPlus, Loader2 } from "lucide-react"
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

type Job = {
  id: string
  position: string
  department: string | null
  status: string | null
  applicants: number | null
  posted_date: string | null
  closing_date: string | null
}

function getStatusVariant(s: string | null) {
  if (s === "Open") return "secondary"
  if (s === "Closed") return "destructive"
  if (s === "Filled") return "default"
  return "outline"
}

export default function RecruitmentPage() {
  const [jobs, setJobs] = React.useState<Job[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [open, setOpen] = React.useState(false)
  const [position, setPosition] = React.useState("")
  const [department, setDepartment] = React.useState("")
  const [closingDate, setClosingDate] = React.useState("")
  const [saving, setSaving] = React.useState(false)

  // Mark as Hired state
  const [hireOpen, setHireOpen] = React.useState(false)
  const [hiringJob, setHiringJob] = React.useState<Job | null>(null)
  const [hireName, setHireName] = React.useState("")
  const [hireEmail, setHireEmail] = React.useState("")
  const [hirePhone, setHirePhone] = React.useState("")
  const [hireJoinDate, setHireJoinDate] = React.useState("")
  const [hireSaving, setHireSaving] = React.useState(false)

  const refresh = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("erp_recruitment").select("*").order("posted_date", { ascending: false })
    setJobs(data ?? [])
  }

  React.useEffect(() => { refresh().then(() => setLoading(false)) }, [])

  async function handleCreate() {
    if (!position.trim()) return
    setSaving(true)
    const supabase = createClient()
    await supabase.from("erp_recruitment").insert({ position: position.trim(), department: department || null, status: "Open", applicants: 0, posted_date: new Date().toISOString().split("T")[0], closing_date: closingDate || null })
    await logErpActivity({ employeeName: "Admin", action: "job_posted", module: "hr", recordType: "recruitment", recordTitle: position })
    await refresh()
    setSaving(false); setOpen(false)
    setPosition(""); setDepartment(""); setClosingDate("")
  }

  function openHireDialog(job: Job) {
    setHiringJob(job)
    setHireName(""); setHireEmail(""); setHirePhone(""); setHireJoinDate("")
    setHireOpen(true)
  }

  async function handleHire() {
    if (!hiringJob || !hireName.trim() || !hireEmail.trim()) return
    setHireSaving(true)
    const supabase = createClient()

    // generate emp_id
    const { count } = await supabase.from("erp_employees").select("id", { count: "exact", head: true })
    const empId = `EMP${String((count ?? 0) + 1).padStart(3, "0")}`
    const initials = hireName.trim().split(/\s+/).map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()

    const { data: newEmp } = await supabase.from("erp_employees").insert({
      name: hireName.trim(), email: hireEmail.trim(),
      phone: hirePhone || null, join_date: hireJoinDate || null,
      department: hiringJob.department || null,
      role: hiringJob.position, employment_type: "Full-time",
      emp_id: empId, initials, status: "Active",
    }).select("id").single()

    if (newEmp) {
      const defaultTasks = [
        { task: "Complete ID & document verification", category: "Documentation" },
        { task: "IT setup & access provisioning", category: "IT Setup" },
        { task: "Policy review & employee handbook", category: "Policy Review" },
        { task: "Team introduction & org chart walkthrough", category: "Team Introduction" },
        { task: "Workstation & equipment setup", category: "Equipment" },
      ]
      await supabase.from("erp_onboarding").insert(
        defaultTasks.map(t => ({
          employee_id: newEmp.id, employee_name: hireName.trim(),
          task: t.task, category: t.category, status: "Pending",
          due_date: hireJoinDate || null,
        }))
      )
    }

    await supabase.from("erp_recruitment").update({ status: "Filled" }).eq("id", hiringJob.id)
    await logErpActivity({ employeeName: "Admin", action: "candidate_hired", module: "hr", recordType: "recruitment", recordTitle: `${hireName.trim()} — ${hiringJob.position}` })
    setHireSaving(false); setHireOpen(false)
    await refresh()
  }

  async function updateStatus(id: string, status: string, pos: string) {
    const supabase = createClient()
    await supabase.from("erp_recruitment").update({ status }).eq("id", id)
    await logErpActivity({ employeeName: "Admin", action: `job_${status.toLowerCase().replace(/\s+/g, "_")}`, module: "hr", recordType: "recruitment", recordId: id, recordTitle: pos })
    await refresh()
  }

  const filtered = jobs.filter(j => {
    const ms = !search || j.position.toLowerCase().includes(search.toLowerCase()) || (j.department ?? "").toLowerCase().includes(search.toLowerCase())
    const mst = statusFilter === "all" || j.status === statusFilter
    return ms && mst
  })

  const totalApplicants = jobs.reduce((s, j) => s + (j.applicants ?? 0), 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Recruitment</h1>
        <p className="text-muted-foreground">Manage job postings and track applicants.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Positions</CardTitle><UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{jobs.filter(j => j.status === "Open").length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Jobs</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{jobs.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Applicants</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{totalApplicants}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Filled</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{jobs.filter(j => j.status === "Filled").length}</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Job Postings</CardTitle>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild><Button><PlusCircle className="mr-2 h-4 w-4" />Post Job</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>New Job Posting</DialogTitle></DialogHeader>
                <div className="space-y-3 py-4">
                  <div className="space-y-1"><Label>Position *</Label><Input value={position} onChange={e => setPosition(e.target.value)} placeholder="e.g., Senior Backend Developer" /></div>
                  <div className="space-y-1"><Label>Department</Label><Input value={department} onChange={e => setDepartment(e.target.value)} /></div>
                  <div className="space-y-1"><Label>Closing Date</Label><Input type="date" value={closingDate} onChange={e => setClosingDate(e.target.value)} /></div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreate} disabled={saving || !position.trim()}>{saving ? "Saving…" : "Post Job"}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search positions..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="Filled">Filled</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
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
                  <TableHead>Position</TableHead>
                  <TableHead className="hidden md:table-cell">Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Applicants</TableHead>
                  <TableHead className="hidden lg:table-cell">Posted</TableHead>
                  <TableHead className="hidden lg:table-cell">Closing</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(j => (
                  <TableRow key={j.id}>
                    <TableCell className="font-medium">{j.position}</TableCell>
                    <TableCell className="hidden md:table-cell">{j.department ?? "—"}</TableCell>
                    <TableCell><Badge variant={getStatusVariant(j.status)}>{j.status}</Badge></TableCell>
                    <TableCell className="hidden md:table-cell tabular-nums">{j.applicants ?? 0}</TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">{j.posted_date ?? "—"}</TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">{j.closing_date ?? "—"}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          {j.status === "Open" && (
                            <DropdownMenuItem onClick={() => openHireDialog(j)}>
                              ✅ Mark as Hired
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => updateStatus(j.id, "On Hold", j.position)}>Put On Hold</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => updateStatus(j.id, "Closed", j.position)}>Close Position</DropdownMenuItem>
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
      {/* Mark as Hired dialog */}
      <Dialog open={hireOpen} onOpenChange={setHireOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Mark as Hired — {hiringJob?.position}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <p className="text-sm text-muted-foreground">This will create an employee record and auto-generate 5 standard onboarding tasks.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1.5 col-span-2">
                <Label>Full Name <span className="text-destructive">*</span></Label>
                <Input value={hireName} onChange={e => setHireName(e.target.value)} placeholder="e.g. Priya Sharma" />
              </div>
              <div className="grid gap-1.5 col-span-2">
                <Label>Email <span className="text-destructive">*</span></Label>
                <Input type="email" value={hireEmail} onChange={e => setHireEmail(e.target.value)} placeholder="priya@halalhub.in" />
              </div>
              <div className="grid gap-1.5">
                <Label>Phone</Label>
                <Input value={hirePhone} onChange={e => setHirePhone(e.target.value)} placeholder="+91..." />
              </div>
              <div className="grid gap-1.5">
                <Label>Join Date</Label>
                <Input type="date" value={hireJoinDate} onChange={e => setHireJoinDate(e.target.value)} />
              </div>
            </div>
            <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
              Department: <strong>{hiringJob?.department ?? "—"}</strong> · Role: <strong>{hiringJob?.position}</strong>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setHireOpen(false)}>Cancel</Button>
            <Button onClick={handleHire} disabled={hireSaving || !hireName.trim() || !hireEmail.trim()}>
              {hireSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Create Employee & Onboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
