// @ts-nocheck
"use client"

import { useEffect, useState, useCallback } from "react"
import {
  Search, Clock, CheckCircle2, XCircle, Loader2,
  Mail, Calendar, Building2, MoreHorizontal
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { logErpActivity } from "@/lib/erp-logger"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

type Application = {
  id: string
  business_name: string
  halal_standard_requested: string | null
  product_scope: string | null
  message_to_body: string | null
  status: string
  certifier_notes: string | null
  estimated_completion_date: string | null
  submitted_at: string
  product_categories: string[]
}

const STATUS_STYLES: Record<string, string> = {
  submitted: "bg-amber-50 text-amber-700 border-amber-200",
  contacted: "bg-blue-50 text-blue-700 border-blue-200",
  in_progress: "bg-purple-50 text-purple-700 border-purple-200",
  inspection_scheduled: "bg-cyan-50 text-cyan-700 border-cyan-200",
  inspection_done: "bg-indigo-50 text-indigo-700 border-indigo-200",
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
  withdrawn: "bg-zinc-50 text-zinc-600 border-zinc-200",
}

const NEXT_STATUSES: Record<string, string[]> = {
  submitted: ["contacted", "rejected"],
  contacted: ["in_progress", "rejected"],
  in_progress: ["inspection_scheduled", "rejected"],
  inspection_scheduled: ["inspection_done"],
  inspection_done: ["approved", "rejected"],
}

export default function EnquiriesPage() {
  const [apps, setApps] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [bodyId, setBodyId] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [dialog, setDialog] = useState<{ app: Application; newStatus: string } | null>(null)
  const [notes, setNotes] = useState("")
  const [estimatedDate, setEstimatedDate] = useState("")
  const [saving, setSaving] = useState(false)

  const supabase = createClient()

  const load = useCallback(async () => {
    setLoading(true)
    const { data: body } = await supabase
      .from("certification_bodies")
      .select("id")
      .eq("status", "approved")
      .limit(1)
      .single()

    const id = body?.id ?? null
    setBodyId(id)
    if (!id) { setLoading(false); return }

    const { data } = await supabase
      .from("certification_applications")
      .select("id,business_name,halal_standard_requested,product_scope,message_to_body,status,certifier_notes,estimated_completion_date,submitted_at,product_categories")
      .eq("certification_body_id", id)
      .order("submitted_at", { ascending: false })

    setApps(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const handleStatusUpdate = async () => {
    if (!dialog || !bodyId) return
    setSaving(true)
    const { app, newStatus } = dialog

    await supabase.from("certification_applications").update({
      status: newStatus,
      certifier_notes: notes || null,
      estimated_completion_date: estimatedDate || null,
      updated_at: new Date().toISOString(),
    }).eq("id", app.id)

    await logErpActivity({
      employeeName: "Certifier",
      action: `STATUS: ${newStatus.toUpperCase()}`,
      module: "Enquiries",
      recordType: "certification_application",
      recordId: app.id,
      recordTitle: app.business_name,
      newValue: { status: newStatus, notes },
    })

    setDialog(null)
    setNotes("")
    setEstimatedDate("")
    setSaving(false)
    load()
  }

  const filtered = apps.filter(a =>
    !search ||
    a.business_name.toLowerCase().includes(search.toLowerCase()) ||
    (a.halal_standard_requested ?? "").toLowerCase().includes(search.toLowerCase())
  )

  const counts = {
    new: apps.filter(a => a.status === "submitted").length,
    active: apps.filter(a => ["contacted", "in_progress", "inspection_scheduled", "inspection_done"].includes(a.status)).length,
    done: apps.filter(a => ["approved", "rejected", "withdrawn"].includes(a.status)).length,
  }

  return (
    <div className="p-4 sm:p-8 space-y-6 bg-background min-h-screen pb-24">
      <div className="space-y-1">
        <div className="text-[10px] font-black uppercase tracking-widest text-purple-600">Certification Hub</div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Business Enquiries</h1>
        <p className="text-muted-foreground font-medium text-sm">Businesses applying for halal certification from your body.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "New Applications", value: counts.new, icon: Mail, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "In Progress", value: counts.active, icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Completed", value: counts.done, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((s, i) => (
          <Card key={i} className="rounded-3xl border-none shadow-sm bg-card">
            <CardContent className="p-5 flex items-center gap-3">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${s.bg}`}>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-black text-foreground">{s.value}</p>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-3xl border-none shadow-sm bg-card overflow-hidden">
        <CardHeader className="p-6 border-b">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle className="font-black text-base">All Applications</CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by business or standard..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 h-11 rounded-2xl bg-muted border-none font-medium"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : (
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow className="border-none">
                  <TableHead className="px-8 h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Business</TableHead>
                  <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground hidden md:table-cell">Standard Requested</TableHead>
                  <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:table-cell">Applied</TableHead>
                  <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
                  <TableHead className="text-right px-8 h-12"><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12 text-muted-foreground font-medium">
                      No enquiries found.
                    </TableCell>
                  </TableRow>
                ) : filtered.map(app => (
                  <TableRow key={app.id} className="border-border hover:bg-muted/40 transition-colors group">
                    <TableCell className="px-8 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-black text-sm text-foreground">{app.business_name}</p>
                          {app.product_scope && (
                            <p className="text-[10px] text-muted-foreground font-medium max-w-[180px] truncate">{app.product_scope}</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm font-bold text-muted-foreground">
                      {app.halal_standard_requested ?? "Not specified"}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-[11px] font-bold text-muted-foreground">
                      {new Date(app.submitted_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`font-black text-[9px] uppercase px-3 ${STATUS_STYLES[app.status] ?? ""}`}>
                        {app.status.replace(/_/g, " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right px-8">
                      {(NEXT_STATUSES[app.status] ?? []).length > 0 && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-2xl">
                            <DropdownMenuLabel className="font-black text-xs uppercase tracking-widest">Update Status</DropdownMenuLabel>
                            {(NEXT_STATUSES[app.status] ?? []).map(next => (
                              <DropdownMenuItem
                                key={next}
                                className={`gap-2 font-bold ${next === "rejected" ? "text-red-600" : next === "approved" ? "text-emerald-600" : ""}`}
                                onClick={() => { setDialog({ app, newStatus: next }); setNotes(app.certifier_notes ?? ""); setEstimatedDate(app.estimated_completion_date ?? "") }}
                              >
                                {next === "approved" ? <CheckCircle2 className="h-3.5 w-3.5" /> : next === "rejected" ? <XCircle className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                                {next.replace(/_/g, " ")}
                              </DropdownMenuItem>
                            ))}
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

      <Dialog open={!!dialog} onOpenChange={open => { if (!open) { setDialog(null); setNotes(""); setEstimatedDate("") } }}>
        <DialogContent className="rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle className="font-black text-xl capitalize">
              Move to: {dialog?.newStatus.replace(/_/g, " ")}
            </DialogTitle>
            <DialogDescription>Updating status for <strong>{dialog?.app.business_name}</strong></DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Internal Notes</Label>
              <Textarea
                placeholder="Add notes for this status update..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="rounded-2xl"
              />
            </div>
            {["inspection_scheduled", "in_progress"].includes(dialog?.newStatus ?? "") && (
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" /> Estimated Completion Date
                </Label>
                <Input type="date" value={estimatedDate} onChange={e => setEstimatedDate(e.target.value)} className="rounded-2xl h-11" />
              </div>
            )}
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" className="rounded-2xl font-black" onClick={() => { setDialog(null); setNotes(""); setEstimatedDate("") }}>Cancel</Button>
            <Button
              className={`rounded-2xl font-black text-white ${dialog?.newStatus === "approved" ? "bg-emerald-600 hover:bg-emerald-700" : dialog?.newStatus === "rejected" ? "bg-red-600 hover:bg-red-700" : "bg-primary hover:bg-primary/90"}`}
              disabled={saving}
              onClick={handleStatusUpdate}
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
