"use client"

import * as React from "react"
import { Loader2, Search, FolderOpen, ShieldCheck, Clock, AlertTriangle, ExternalLink, MoreHorizontal, PlusCircle } from "lucide-react"
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

type Doc = {
  id: string; employee_name: string; doc_type: string
  file_name: string | null; file_url: string | null
  uploaded_by: string | null; verified: boolean | null
  expiry_date: string | null; created_at: string | null
}
type Employee = { id: string; name: string }

const DOC_TYPES = ["Aadhaar Card", "PAN Card", "Passport", "Driving Licence", "10th Certificate", "12th Certificate", "Degree Certificate", "Offer Letter", "Appointment Letter", "Experience Letter", "Relieving Letter", "Bank Details", "Photo", "Other"]

function fmtDate(d: string | null) {
  if (!d) return "—"
  try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) } catch { return d }
}

function isExpiringSoon(expiry: string | null) {
  if (!expiry) return false
  const diff = new Date(expiry).getTime() - Date.now()
  return diff > 0 && diff < 30 * 24 * 60 * 60 * 1000
}

function isExpired(expiry: string | null) {
  if (!expiry) return false
  return new Date(expiry) < new Date()
}

function initials(name: string) { return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() }

export default function DocumentsPage() {
  const [docs, setDocs] = React.useState<Doc[]>([])
  const [employees, setEmployees] = React.useState<Employee[]>([])
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [typeFilter, setTypeFilter] = React.useState("all")
  const [verifiedFilter, setVerifiedFilter] = React.useState("all")
  const [open, setOpen] = React.useState(false)

  const [empId, setEmpId] = React.useState("")
  const [docType, setDocType] = React.useState("")
  const [fileName, setFileName] = React.useState("")
  const [uploadedBy, setUploadedBy] = React.useState("")
  const [expiryDate, setExpiryDate] = React.useState("")

  function load() {
    const supabase = createClient()
    supabase.from("erp_employee_documents")
      .select("id, employee_name, doc_type, file_name, file_url, uploaded_by, verified, expiry_date, created_at")
      .order("created_at", { ascending: false }).limit(300)
      .then(({ data }) => { setDocs(data ?? []); setLoading(false) })
  }

  React.useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from("erp_employee_documents").select("id, employee_name, doc_type, file_name, file_url, uploaded_by, verified, expiry_date, created_at").order("created_at", { ascending: false }).limit(300),
      supabase.from("erp_employees").select("id, name").order("name"),
    ]).then(([d, e]) => { setDocs(d.data ?? []); setEmployees(e.data ?? []); setLoading(false) })
  }, [])

  async function handleAdd() {
    if (!empId || !docType) return
    setSaving(true)
    const emp = employees.find(e => e.id === empId)
    const supabase = createClient()
    await supabase.from("erp_employee_documents").insert({
      employee_id: empId, employee_name: emp!.name,
      doc_type: docType, file_name: fileName || null,
      uploaded_by: uploadedBy || "Admin",
      expiry_date: expiryDate || null,
      verified: false,
    })
    await logErpActivity({ employeeName: "Admin", action: "document_uploaded", module: "hr", recordType: "document", recordTitle: `${docType} — ${emp!.name}` })
    setSaving(false); setOpen(false)
    setEmpId(""); setDocType(""); setFileName(""); setUploadedBy(""); setExpiryDate("")
    load()
  }

  async function markVerified(id: string, empName: string, dType: string) {
    const supabase = createClient()
    await supabase.from("erp_employee_documents").update({ verified: true }).eq("id", id)
    await logErpActivity({ employeeName: "Admin", action: "document_verified", module: "hr", recordType: "document", recordTitle: `${dType} — ${empName}` })
    load()
  }

  const filtered = docs.filter(d => {
    const q = search.toLowerCase()
    const ms = !q || d.employee_name.toLowerCase().includes(q) || d.doc_type.toLowerCase().includes(q) || (d.file_name ?? "").toLowerCase().includes(q)
    const tf = typeFilter === "all" || d.doc_type === typeFilter
    const vf = verifiedFilter === "all"
      || (verifiedFilter === "verified" && d.verified)
      || (verifiedFilter === "pending" && !d.verified)
    return ms && tf && vf
  })

  const verified = docs.filter(d => d.verified)
  const expiringSoon = docs.filter(d => isExpiringSoon(d.expiry_date))
  const expired = docs.filter(d => isExpired(d.expiry_date))
  const docTypes = [...new Set(docs.map(d => d.doc_type).filter(Boolean))]

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-headline">Document Vault</h1>
          <p className="text-muted-foreground">Centralized storage for all employee documents and compliance records.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><PlusCircle className="h-4 w-4" />Add Document</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>Add Employee Document</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-1.5">
                <Label>Employee</Label>
                <Select value={empId} onValueChange={setEmpId}>
                  <SelectTrigger><SelectValue placeholder="Select employee" /></SelectTrigger>
                  <SelectContent>{employees.map(e => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label>Document Type</Label>
                <Select value={docType} onValueChange={setDocType}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>{DOC_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label>File Name</Label>
                <Input value={fileName} onChange={e => setFileName(e.target.value)} placeholder="e.g. aadhaar_john.pdf" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label>Uploaded By</Label>
                  <Input value={uploadedBy} onChange={e => setUploadedBy(e.target.value)} placeholder="Your name" />
                </div>
                <div className="grid gap-1.5">
                  <Label>Expiry Date</Label>
                  <Input type="date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleAdd} disabled={saving || !empId || !docType}>{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add Document"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Documents", value: docs.length, sub: `${docTypes.length} document types`, icon: FolderOpen },
          { label: "Verified", value: verified.length, sub: `${docs.length ? Math.round(verified.length / docs.length * 100) : 0}% verified`, icon: ShieldCheck },
          { label: "Expiring Soon", value: expiringSoon.length, sub: "Within 30 days", icon: Clock, amber: true },
          { label: "Expired", value: expired.length, sub: "Renewal required", icon: AlertTriangle, red: true },
        ].map(({ label, value, sub, icon: Icon, amber, red }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{label}</CardTitle><Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${amber ? "text-amber-600" : red ? "text-destructive" : ""}`}>{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : value}</div>
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
              <Input placeholder="Search by employee or document type..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[170px]"><SelectValue placeholder="Doc Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {docTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={verifiedFilter} onValueChange={setVerifiedFilter}>
              <SelectTrigger className="w-full sm:w-[140px]"><SelectValue placeholder="Verified" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Unverified</SelectItem>
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
                  <TableHead>Document</TableHead>
                  <TableHead className="hidden md:table-cell">File</TableHead>
                  <TableHead className="hidden lg:table-cell">Uploaded By</TableHead>
                  <TableHead className="hidden lg:table-cell">Expiry</TableHead>
                  <TableHead>Verified</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No documents uploaded yet. Click "Add Document" to begin.</TableCell></TableRow>
                ) : filtered.map(d => (
                  <TableRow key={d.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7"><AvatarFallback className="text-xs">{initials(d.employee_name)}</AvatarFallback></Avatar>
                        <span className="font-medium text-sm">{d.employee_name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-sm">{d.doc_type}</TableCell>
                    <TableCell className="hidden md:table-cell text-xs text-muted-foreground font-mono truncate max-w-[160px]">{d.file_name ?? "—"}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{d.uploaded_by ?? "—"}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm">
                      {d.expiry_date ? (
                        <span className={isExpired(d.expiry_date) ? "text-destructive font-medium" : isExpiringSoon(d.expiry_date) ? "text-amber-600 font-medium" : "text-muted-foreground"}>
                          {fmtDate(d.expiry_date)}
                        </span>
                      ) : "—"}
                    </TableCell>
                    <TableCell>
                      {d.verified ? <Badge variant="secondary">Verified</Badge> : <Badge variant="outline">Pending</Badge>}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {d.file_url && (
                          <Button size="icon" variant="ghost" asChild>
                            <a href={d.file_url} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4" /></a>
                          </Button>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            {!d.verified && (
                              <DropdownMenuItem onClick={() => markVerified(d.id, d.employee_name, d.doc_type)}>
                                ✅ Mark Verified
                              </DropdownMenuItem>
                            )}
                            {d.verified && (
                              <DropdownMenuItem className="text-muted-foreground" disabled>Already verified</DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
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
