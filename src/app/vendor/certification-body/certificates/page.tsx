// @ts-nocheck
"use client"

import * as React from "react"
import {
  Search, PlusCircle, CheckCircle2, Clock, AlertTriangle,
  FileText, MoreHorizontal, Download, RefreshCw, XCircle, Loader2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

type Cert = {
  id: string
  business_name: string
  certificate_number: string
  scope_of_certification: string | null
  issue_date: string
  expiry_date: string
  status: string
  certificate_url: string | null
}

const STATUS_STYLES: Record<string, string> = {
  active:        "bg-emerald-50 text-emerald-600 border-emerald-200",
  expiring_soon: "bg-amber-50 text-amber-600 border-amber-200",
  expired:       "bg-red-50 text-red-600 border-red-200",
  revoked:       "bg-gray-100 text-gray-500 border-gray-200",
}
const STATUS_LABELS: Record<string, string> = {
  active: "Active", expiring_soon: "Expiring Soon", expired: "Expired", revoked: "Revoked",
}

function computeStatus(expiryDate: string): string {
  const now = Date.now()
  const exp = new Date(expiryDate).getTime()
  if (exp < now) return "expired"
  if (exp - now < 30 * 24 * 60 * 60 * 1000) return "expiring_soon"
  return "active"
}

export default function CertificateManagementPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const fileRef = React.useRef<HTMLInputElement>(null)

  const [certs, setCerts] = React.useState<Cert[]>([])
  const [bodyId, setBodyId] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [open, setOpen] = React.useState(false)
  const [saving, setSaving] = React.useState(false)

  const [bizName, setBizName] = React.useState("")
  const [certNum, setCertNum] = React.useState("")
  const [scope, setScope] = React.useState("")
  const [issueDate, setIssueDate] = React.useState("")
  const [expiryDate, setExpiryDate] = React.useState("")
  const [file, setFile] = React.useState<File | null>(null)

  React.useEffect(() => {
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    async function load() {
      const { data: body } = await supabase
        .from("certification_bodies")
        .select("id")
        .eq("user_id", user.uid)
        .maybeSingle()
      if (!body) { setLoading(false); return }
      setBodyId(body.id)
      const { data } = await supabase
        .from("halal_certificates")
        .select("id, business_name, certificate_number, scope_of_certification, issue_date, expiry_date, status, certificate_url")
        .eq("certification_body_id", body.id)
        .order("issue_date", { ascending: false })
      setCerts((data ?? []).map(c => ({ ...c, status: computeStatus(c.expiry_date) })))
      setLoading(false)
    }
    load()
  }, [user?.uid])

  const handleIssue = async () => {
    if (!bizName.trim() || !certNum.trim() || !issueDate || !expiryDate || !bodyId) return
    setSaving(true)
    const supabase = createClient()
    let certUrl: string | null = null

    if (file) {
      const ext = file.name.split(".").pop() ?? "pdf"
      const path = `cert-docs/${bodyId}/${Date.now()}.${ext}`
      const { error: upErr } = await supabase.storage.from("media").upload(path, file, { upsert: false })
      if (!upErr) {
        const { data: urlData } = supabase.storage.from("media").getPublicUrl(path)
        certUrl = urlData.publicUrl
      }
    }

    const status = computeStatus(expiryDate)
    const { data, error } = await supabase
      .from("halal_certificates")
      .insert({
        certification_body_id: bodyId,
        business_name: bizName.trim(),
        certificate_number: certNum.trim(),
        scope_of_certification: scope.trim() || null,
        issue_date: issueDate,
        expiry_date: expiryDate,
        status,
        certificate_url: certUrl,
        halal_standard: "HI",
      })
      .select("id, business_name, certificate_number, scope_of_certification, issue_date, expiry_date, status, certificate_url")
      .single()

    if (error) {
      toast({ title: "Failed to issue", description: error.message, variant: "destructive" })
    } else {
      setCerts(prev => [{ ...data, status }, ...prev])
      setBizName(""); setCertNum(""); setScope(""); setIssueDate(""); setExpiryDate(""); setFile(null)
      setOpen(false)
      toast({ title: "Certificate issued!" })
    }
    setSaving(false)
  }

  const handleRevoke = async (id: string) => {
    const supabase = createClient()
    await supabase.from("halal_certificates").update({ status: "revoked" }).eq("id", id)
    setCerts(prev => prev.map(c => c.id === id ? { ...c, status: "revoked" } : c))
    toast({ title: "Certificate revoked" })
  }

  const filtered = certs.filter(c =>
    !search || c.business_name.toLowerCase().includes(search.toLowerCase()) ||
    c.certificate_number.includes(search)
  )

  const counts = {
    active: certs.filter(c => c.status === "active").length,
    expiring: certs.filter(c => c.status === "expiring_soon").length,
    expired: certs.filter(c => c.status === "expired").length,
  }

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Certification Hub</div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Certificate Management</h1>
          <p className="text-muted-foreground font-medium text-sm">Issue, renew, and manage Halal certificates for businesses.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-12 px-8 font-black gap-2 shadow-lg">
              <PlusCircle className="h-4 w-4" /> Issue New Certificate
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md rounded-3xl">
            <DialogHeader>
              <DialogTitle className="font-black text-xl">Issue New Certificate</DialogTitle>
              <DialogDescription>Fill in the details to generate a new Halal certificate.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest">Business Name</Label>
                <Input placeholder="e.g. Medina Meats" className="rounded-2xl h-11"
                  value={bizName} onChange={e => setBizName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest">Certificate Number</Label>
                <Input placeholder="e.g. HI-2024-001" className="rounded-2xl h-11 font-mono"
                  value={certNum} onChange={e => setCertNum(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest">Scope of Certification</Label>
                <Textarea placeholder="e.g. All food items, specific meat products…" className="rounded-2xl"
                  value={scope} onChange={e => setScope(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest">Issue Date</Label>
                  <Input type="date" className="rounded-2xl h-11"
                    value={issueDate} onChange={e => setIssueDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest">Expiry Date</Label>
                  <Input type="date" className="rounded-2xl h-11"
                    value={expiryDate} onChange={e => setExpiryDate(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest">Upload Certificate (optional)</Label>
                <input ref={fileRef} type="file" accept=".pdf,image/*" className="hidden"
                  onChange={e => setFile(e.target.files?.[0] ?? null)} />
                <button onClick={() => fileRef.current?.click()}
                  className="w-full h-11 rounded-2xl bg-muted border-2 border-dashed border-border text-sm font-bold text-muted-foreground hover:border-emerald-400 transition-colors">
                  {file ? file.name : "Choose PDF or image"}
                </button>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" className="rounded-2xl font-black" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleIssue} disabled={saving || !bizName.trim() || !certNum.trim() || !issueDate || !expiryDate}
                className="rounded-2xl font-black bg-emerald-600 hover:bg-emerald-700 text-white">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Issue Certificate"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: "Active",        value: counts.active,    icon: CheckCircle2, bg: "bg-emerald-50 dark:bg-emerald-950/30", color: "text-emerald-600" },
          { label: "Expiring Soon", value: counts.expiring,  icon: Clock,         bg: "bg-amber-50 dark:bg-amber-950/30",   color: "text-amber-600"   },
          { label: "Expired",       value: counts.expired,   icon: AlertTriangle, bg: "bg-red-50 dark:bg-red-950/30",       color: "text-red-600"     },
          { label: "Total Issued",  value: certs.length,     icon: FileText,      bg: "bg-blue-50 dark:bg-blue-950/30",     color: "text-blue-600"    },
        ].map((s, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl bg-card p-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-tighter">{s.label}</span>
              <div className={`h-8 w-8 rounded-xl flex items-center justify-center ${s.bg}`}>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              {loading ? <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /> : <div className="text-2xl font-black">{s.value}</div>}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
        <CardHeader className="p-6 sm:p-8 border-b">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle className="text-xl font-black">All Issued Certificates</CardTitle>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by business or cert number…"
                className="pl-9 h-11 rounded-2xl bg-muted border-none font-medium"
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
              <FileText className="h-10 w-10 text-muted-foreground/20" />
              <p className="font-black">{certs.length === 0 ? "No certificates issued yet" : "No results"}</p>
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="border-none">
                  <TableHead className="px-8 h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Business</TableHead>
                  <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:table-cell">Certificate No.</TableHead>
                  <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:table-cell">Expiry</TableHead>
                  <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
                  <TableHead className="text-right px-8 h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(cert => (
                  <TableRow key={cert.id} className="border-border hover:bg-muted/50 transition-colors group">
                    <TableCell className="px-8 py-5 font-black text-foreground">{cert.business_name}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground hidden sm:table-cell">{cert.certificate_number}</TableCell>
                    <TableCell className="text-sm font-bold text-muted-foreground hidden sm:table-cell">{cert.expiry_date}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`font-black text-[9px] uppercase px-3 ${STATUS_STYLES[cert.status] ?? ""}`}>
                        {STATUS_LABELS[cert.status] ?? cert.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right px-8">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl">
                          <DropdownMenuLabel className="font-black text-xs uppercase tracking-widest">Actions</DropdownMenuLabel>
                          {cert.certificate_url && (
                            <DropdownMenuItem asChild className="gap-2 font-bold">
                              <a href={cert.certificate_url} target="_blank" rel="noopener noreferrer">
                                <Download className="h-3.5 w-3.5" /> Download
                              </a>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleRevoke(cert.id)}
                            className="text-red-600 gap-2 font-bold cursor-pointer">
                            <XCircle className="h-3.5 w-3.5" /> Revoke
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
