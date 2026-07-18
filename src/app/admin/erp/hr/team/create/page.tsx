"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Loader2, UploadCloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { logErpActivity } from "@/lib/erp-logger"

const DEPARTMENTS = ["Sales", "Marketing", "Engineering", "HR", "Operations", "Finance", "Customer Success", "Legal"]
const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Intern", "Consultant", "Contractor"]

function generateEmpId(count: number) {
  return `EMP${String(count + 1).padStart(3, "0")}`
}

function getInitials(name: string) {
  return name.trim().split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase()
}

export default function CreateEmployeePage() {
  const router = useRouter()
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState("")
  const [managers, setManagers] = React.useState<{ id: string; name: string }[]>([])

  // form state
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [joinDate, setJoinDate] = React.useState("")
  const [department, setDepartment] = React.useState("")
  const [role, setRole] = React.useState("")
  const [manager, setManager] = React.useState("")
  const [employmentType, setEmploymentType] = React.useState("")
  const [zone, setZone] = React.useState("")

  React.useEffect(() => {
    const supabase = createClient()
    supabase.from("erp_employees").select("id, name").eq("status", "Active").order("name")
      .then(({ data }) => setManagers(data ?? []))
  }, [])

  async function handleSave() {
    if (!name.trim()) { setError("Full name is required."); return }
    if (!email.trim()) { setError("Email is required."); return }
    setError("")
    setSaving(true)
    const supabase = createClient()

    // generate emp_id based on current count
    const { count } = await supabase.from("erp_employees").select("id", { count: "exact", head: true })
    const empId = generateEmpId(count ?? 0)

    const { error: insertError } = await supabase.from("erp_employees").insert({
      name: name.trim(),
      email: email.trim(),
      phone: phone || null,
      join_date: joinDate || null,
      department: department || null,
      role: role || null,
      manager: manager || null,
      employment_type: employmentType || null,
      emp_id: empId,
      initials: getInitials(name),
      status: "Active",
    })

    if (insertError) {
      setError(insertError.message)
      setSaving(false)
      return
    }

    await logErpActivity({ employeeName: "Admin", action: "employee_created", module: "hr", recordType: "employee", recordTitle: name.trim() })
    router.push("/admin/erp/hr/team")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Add New Employee</h1>
        <p className="text-muted-foreground">Fill in the details below to create a new employee profile.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee Details</CardTitle>
              <CardDescription>Personal and contact information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label>Full Name <span className="text-destructive">*</span></Label>
                  <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Priya Sharma" />
                </div>
                <div className="grid gap-1.5">
                  <Label>Email Address <span className="text-destructive">*</span></Label>
                  <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="e.g., priya@halalhub.in" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label>Phone Number</Label>
                  <Input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91..." />
                </div>
                <div className="grid gap-1.5">
                  <Label>Joining Date</Label>
                  <Input type="date" value={joinDate} onChange={e => setJoinDate(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Role & Department</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label>Department</Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                    <SelectContent>{DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1.5">
                  <Label>Role / Position</Label>
                  <Input value={role} onChange={e => setRole(e.target.value)} placeholder="e.g., HR Manager" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label>Reporting Manager</Label>
                  <Select value={manager} onValueChange={setManager}>
                    <SelectTrigger><SelectValue placeholder="Select manager" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {managers.map(m => <SelectItem key={m.id} value={m.name}>{m.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1.5">
                  <Label>Employment Type</Label>
                  <Select value={employmentType} onValueChange={setEmploymentType}>
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>{EMPLOYMENT_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label>Zone (for Sales/Ops)</Label>
                <Input value={zone} onChange={e => setZone(e.target.value)} placeholder="e.g., South Mumbai" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Profile Photo</CardTitle></CardHeader>
            <CardContent>
              <div className="relative border-2 border-dashed border-muted-foreground/40 rounded-lg p-8 text-center hover:border-primary transition-colors">
                <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Upload an image</p>
                <p className="text-xs text-muted-foreground mt-1">Optional — initials will be used if not set</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {error && <p className="text-sm text-destructive font-medium">{error}</p>}

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => router.push("/admin/erp/hr/team")}>Cancel</Button>
        <Button onClick={handleSave} disabled={saving || !name || !email}>
          {saving ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Saving…</> : "Save Employee"}
        </Button>
      </div>
    </div>
  )
}
