"use client"

import { useEffect, useState, useCallback } from "react"
import {
  Award, ShieldCheck, Building2, Clock, AlertTriangle, Ban,
  Search, MoreHorizontal, CheckCircle2, XCircle, Info, Pause,
  Loader2, Globe, MapPin, FileText, ChevronDown
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { logErpActivity } from "@/lib/erp-logger"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

type Body = {
  id: string
  name: string
  logo_url: string | null
  contact_email: string | null
  coverage_type: string
  coverage_states: string[]
  certification_categories: string[]
  status: string
  admin_internal_rating: number
  total_certs_issued: number
  total_active_certs: number
  created_at: string
  approved_at: string | null
  rejection_reason: string | null
  suspension_reason: string | null
  blacklist_reason: string | null
}

const STATUS_TABS = [
  { key: "pending", label: "New", icon: Clock, color: "text-amber-600" },
  { key: "under_review", label: "Under Review", icon: FileText, color: "text-blue-600" },
  { key: "info_requested", label: "Info Requested", icon: Info, color: "text-purple-600" },
  { key: "approved", label: "Approved", icon: CheckCircle2, color: "text-emerald-600" },
  { key: "rejected", label: "Rejected", icon: XCircle, color: "text-red-600" },
  { key: "suspended", label: "Suspended", icon: Pause, color: "text-orange-600" },
  { key: "blacklisted", label: "Blacklisted", icon: Ban, color: "text-red-800" },
]

const STATUS_BADGE: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  under_review: "bg-blue-50 text-blue-700 border-blue-200",
  info_requested: "bg-purple-50 text-purple-700 border-purple-200",
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
  suspended: "bg-orange-50 text-orange-700 border-orange-200",
  blacklisted: "bg-red-100 text-red-900 border-red-300",
}

type ActionType = "approve" | "reject" | "info_requested" | "under_review" | "suspend" | "blacklist"

export default function AdminCertificationsPage() {
  const [bodies, setBodies] = useState<Body[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("pending")
  const [actionDialog, setActionDialog] = useState<{ body: Body; type: ActionType } | null>(null)
  const [reason, setReason] = useState("")
  const [saving, setSaving] = useState(false)

  const supabase = createClient()

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from("certification_bodies")
      .select("id,name,logo_url,contact_email,coverage_type,coverage_states,certification_categories,status,admin_internal_rating,total_certs_issued,total_active_certs,created_at,approved_at,rejection_reason,suspension_reason,blacklist_reason")
      .order("created_at", { ascending: false })
    setBodies(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const statusCounts = STATUS_TABS.reduce<Record<string, number>>((acc, t) => {
    acc[t.key] = bodies.filter(b => b.status === t.key).length
    return acc
  }, {})

  const filtered = bodies.filter(b => {
    const matchTab = b.status === activeTab
    const matchSearch = !search || b.name.toLowerCase().includes(search.toLowerCase()) ||
      (b.contact_email ?? "").toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  const handleAction = async () => {
    if (!actionDialog) return
    setSaving(true)
    const { body, type } = actionDialog
    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() }

    if (type === "approve") {
      updates.status = "approved"
      updates.approved_at = new Date().toISOString()
    } else if (type === "reject") {
      updates.status = "rejected"
      updates.rejection_reason = reason
    } else if (type === "info_requested") {
      updates.status = "info_requested"
    } else if (type === "under_review") {
      updates.status = "under_review"
    } else if (type === "suspend") {
      updates.status = "suspended"
      updates.suspension_reason = reason
      updates.suspended_at = new Date().toISOString()
    } else if (type === "blacklist") {
      updates.status = "blacklisted"
      updates.blacklist_reason = reason
      updates.blacklisted_at = new Date().toISOString()
    }

    await supabase.from("certification_bodies").update(updates).eq("id", body.id)
    await logErpActivity({
      employeeName: "Admin",
      action: type.replace("_", " ").toUpperCase(),
      module: "Certifications",
      recordType: "certification_body",
      recordId: body.id,
      recordTitle: body.name,
      newValue: updates as Record<string, unknown>,
    })

    setActionDialog(null)
    setReason("")
    setSaving(false)
    load()
  }

  const needsReason = actionDialog?.type === "reject" || actionDialog?.type === "suspend" || actionDialog?.type === "blacklist"

  const totalApproved = bodies.filter(b => b.status === "approved").length
  const totalPending = bodies.filter(b => b.status === "pending").length
  const totalCerts = bodies.reduce((s, b) => s + (b.total_certs_issued ?? 0), 0)
  const totalActiveCerts = bodies.reduce((s, b) => s + (b.total_active_certs ?? 0), 0)

  return (
    <div className="p-4 sm:p-8 space-y-6 bg-background min-h-screen pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4 border-b">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <Award className="h-3 w-3" /> Trust & Verification
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-headline text-foreground tracking-tighter">CERTIFICATIONS</h1>
          <p className="text-muted-foreground font-medium text-sm italic">Manage halal certification bodies — approvals, compliance, and platform monitoring.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Approved Bodies", value: totalApproved, icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pending Review", value: totalPending, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Total Certs Issued", value: totalCerts, icon: Award, color: "text-primary", bg: "bg-primary/10" },
          { label: "Active Certificates", value: totalActiveCerts, icon: CheckCircle2, color: "text-blue-600", bg: "bg-blue-50" },
        ].map((s, i) => (
          <Card key={i} className="rounded-3xl border-none shadow-sm bg-card">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 ${s.bg}`}>
                <s.icon className={`h-6 w-6 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-black text-foreground">{s.value}</p>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Card className="rounded-3xl border-none shadow-sm bg-card overflow-hidden">
        <CardHeader className="p-6 border-b">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle className="font-black text-lg">Certification Bodies</CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 h-11 rounded-2xl bg-muted border-none font-medium"
              />
            </div>
          </div>
        </CardHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="px-6 pt-4 overflow-x-auto no-scrollbar">
            <TabsList className="bg-transparent gap-1 h-auto p-0 flex-nowrap">
              {STATUS_TABS.map(t => (
                <TabsTrigger
                  key={t.key}
                  value={t.key}
                  className="rounded-full px-4 py-2 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap gap-1.5"
                >
                  {t.label}
                  {statusCounts[t.key] > 0 && (
                    <span className="ml-1 rounded-full bg-current/20 px-1.5 py-0.5 text-[9px]">{statusCounts[t.key]}</span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {STATUS_TABS.map(tab => (
            <TabsContent key={tab.key} value={tab.key} className="mt-0">
              {loading ? (
                <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
              ) : (
                <Table>
                  <TableHeader className="bg-muted/40">
                    <TableRow className="border-none">
                      <TableHead className="px-8 h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Body</TableHead>
                      <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground hidden md:table-cell">Coverage</TableHead>
                      <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground hidden lg:table-cell">Categories</TableHead>
                      <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:table-cell">Certs</TableHead>
                      <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
                      <TableHead className="text-right px-8 h-12"><span className="sr-only">Actions</span></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-16 text-muted-foreground font-medium">
                          No certification bodies with status &ldquo;{tab.label}&rdquo;.
                        </TableCell>
                      </TableRow>
                    ) : filtered.map(body => (
                      <TableRow key={body.id} className="border-border hover:bg-muted/40 transition-colors group">
                        <TableCell className="px-8 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                              {body.logo_url
                                ? <img src={body.logo_url} alt={body.name} className="h-full w-full object-contain" />
                                : <Award className="h-4 w-4 text-muted-foreground" />
                              }
                            </div>
                            <div>
                              <p className="font-black text-foreground text-sm">{body.name}</p>
                              {body.contact_email && <p className="text-[10px] text-muted-foreground font-medium">{body.contact_email}</p>}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                            {body.coverage_type === "national" ? <Globe className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                            <span className="capitalize">{body.coverage_type}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {(body.certification_categories ?? []).slice(0, 2).map(c => (
                              <Badge key={c} variant="secondary" className="text-[9px] font-black px-2 py-0.5 rounded-full">{c}</Badge>
                            ))}
                            {(body.certification_categories ?? []).length > 2 && (
                              <Badge variant="secondary" className="text-[9px] font-black px-2 py-0.5 rounded-full">+{body.certification_categories.length - 2}</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div className="text-sm">
                            <span className="font-black text-foreground">{body.total_active_certs ?? 0}</span>
                            <span className="text-[10px] text-muted-foreground font-bold"> active / </span>
                            <span className="font-bold text-muted-foreground">{body.total_certs_issued ?? 0}</span>
                            <span className="text-[10px] text-muted-foreground font-bold"> total</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`font-black text-[9px] uppercase px-3 ${STATUS_BADGE[body.status] ?? ""}`}>
                            {body.status.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right px-8">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="ghost" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-2xl w-48">
                              <DropdownMenuLabel className="font-black text-[10px] uppercase tracking-widest">Actions</DropdownMenuLabel>
                              {body.status !== "approved" && (
                                <DropdownMenuItem className="gap-2 font-bold" onClick={() => setActionDialog({ body, type: "approve" })}>
                                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Approve
                                </DropdownMenuItem>
                              )}
                              {body.status === "pending" && (
                                <DropdownMenuItem className="gap-2 font-bold" onClick={() => setActionDialog({ body, type: "under_review" })}>
                                  <FileText className="h-3.5 w-3.5 text-blue-600" /> Mark Under Review
                                </DropdownMenuItem>
                              )}
                              {body.status !== "info_requested" && body.status !== "approved" && (
                                <DropdownMenuItem className="gap-2 font-bold" onClick={() => setActionDialog({ body, type: "info_requested" })}>
                                  <Info className="h-3.5 w-3.5 text-purple-600" /> Request More Info
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              {body.status === "approved" && (
                                <DropdownMenuItem className="gap-2 font-bold text-orange-600" onClick={() => setActionDialog({ body, type: "suspend" })}>
                                  <Pause className="h-3.5 w-3.5" /> Suspend
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="gap-2 font-bold text-red-600" onClick={() => setActionDialog({ body, type: "reject" })}>
                                <XCircle className="h-3.5 w-3.5" /> Reject
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 font-bold text-red-800" onClick={() => setActionDialog({ body, type: "blacklist" })}>
                                <Ban className="h-3.5 w-3.5" /> Blacklist
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </Card>

      {/* Action Confirmation Dialog */}
      <Dialog open={!!actionDialog} onOpenChange={open => { if (!open) { setActionDialog(null); setReason("") } }}>
        <DialogContent className="rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle className="font-black text-xl capitalize">
              {actionDialog?.type.replace("_", " ")} — {actionDialog?.body.name}
            </DialogTitle>
          </DialogHeader>
          {needsReason && (
            <div className="space-y-2 py-2">
              <Label className="font-black text-xs uppercase tracking-widest">
                Reason <span className="text-red-500">*</span>
              </Label>
              <Textarea
                placeholder="Provide a reason..."
                value={reason}
                onChange={e => setReason(e.target.value)}
                className="rounded-2xl min-h-[100px]"
              />
            </div>
          )}
          {!needsReason && (
            <p className="text-sm text-muted-foreground font-medium py-2">
              Are you sure you want to {actionDialog?.type.replace("_", " ")} this certification body?
            </p>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" className="rounded-2xl font-black" onClick={() => { setActionDialog(null); setReason("") }}>
              Cancel
            </Button>
            <Button
              className="rounded-2xl font-black bg-primary text-primary-foreground"
              disabled={saving || (needsReason && !reason.trim())}
              onClick={handleAction}
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
