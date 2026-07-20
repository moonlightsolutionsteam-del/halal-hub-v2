// @ts-nocheck
"use client"

import { useEffect, useState, useCallback } from "react"
import {
  Search, Clock, CheckCircle2, XCircle, Loader2,
  AlertTriangle, MoreHorizontal
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
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

type Request = {
  id: string
  business_name: string
  claimed_certificate_number: string
  claimed_issue_date: string | null
  claimed_expiry_date: string | null
  supporting_doc_url: string | null
  notes: string | null
  status: string
  certifier_response: string | null
  response_deadline: string | null
  created_at: string
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  denied: "bg-red-50 text-red-700 border-red-200",
  escalated: "bg-purple-50 text-purple-700 border-purple-200",
  expired: "bg-zinc-50 text-zinc-600 border-zinc-200",
}

type ActionType = "confirmed" | "denied" | "escalated"

export default function VerificationRequestsPage() {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [bodyId, setBodyId] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [dialog, setDialog] = useState<{ req: Request; type: ActionType } | null>(null)
  const [response, setResponse] = useState("")
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
      .from("certifier_verification_requests")
      .select("id,business_name,claimed_certificate_number,claimed_issue_date,claimed_expiry_date,supporting_doc_url,notes,status,certifier_response,response_deadline,created_at")
      .eq("certification_body_id", id)
      .order("created_at", { ascending: false })

    setRequests(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const handleAction = async () => {
    if (!dialog || !bodyId) return
    setSaving(true)
    const { req, type } = dialog

    await supabase.from("certifier_verification_requests").update({
      status: type,
      certifier_response: response || null,
      responded_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }).eq("id", req.id)

    await logErpActivity({
      employeeName: "Certifier",
      action: type.toUpperCase(),
      module: "Verification Requests",
      recordType: "certifier_verification_request",
      recordId: req.id,
      recordTitle: `${req.claimed_certificate_number} — ${req.business_name}`,
      newValue: { status: type, response },
    })

    setDialog(null)
    setResponse("")
    setSaving(false)
    load()
  }

  const filtered = requests.filter(r =>
    !search ||
    r.business_name.toLowerCase().includes(search.toLowerCase()) ||
    r.claimed_certificate_number.toLowerCase().includes(search.toLowerCase())
  )

  const pending = requests.filter(r => r.status === "pending").length
  const confirmed = requests.filter(r => r.status === "confirmed").length
  const denied = requests.filter(r => r.status === "denied").length

  const isOverdue = (deadline: string | null) => deadline ? new Date(deadline) < new Date() : false

  return (
    <div className="p-4 sm:p-8 space-y-6 bg-background min-h-screen pb-24">
      <div className="space-y-1">
        <div className="text-[10px] font-black uppercase tracking-widest text-blue-600">Certification Hub</div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Verification Requests</h1>
        <p className="text-muted-foreground font-medium text-sm">Businesses claiming existing certificates for review. Respond within 48 hours.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Pending", value: pending, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Confirmed", value: confirmed, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Denied", value: denied, icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
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
            <CardTitle className="font-black text-base">All Verification Requests</CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by business or cert number..."
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
                  <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:table-cell">Cert Claimed</TableHead>
                  <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground hidden md:table-cell">Deadline</TableHead>
                  <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
                  <TableHead className="text-right px-8 h-12"><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12 text-muted-foreground font-medium">
                      No verification requests found.
                    </TableCell>
                  </TableRow>
                ) : filtered.map(r => (
                  <TableRow key={r.id} className="border-border hover:bg-muted/40 transition-colors group">
                    <TableCell className="px-8 py-4">
                      <p className="font-black text-sm text-foreground">{r.business_name}</p>
                      {r.notes && <p className="text-[10px] text-muted-foreground font-medium mt-0.5 max-w-[200px] truncate">{r.notes}</p>}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <p className="font-mono text-xs font-bold text-foreground">{r.claimed_certificate_number}</p>
                      {r.claimed_expiry_date && (
                        <p className="text-[10px] text-muted-foreground font-medium">Exp: {r.claimed_expiry_date}</p>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {r.response_deadline ? (
                        <span className={`text-xs font-bold ${isOverdue(r.response_deadline) ? "text-red-600" : "text-muted-foreground"}`}>
                          {isOverdue(r.response_deadline) && <AlertTriangle className="inline h-3 w-3 mr-1" />}
                          {new Date(r.response_deadline).toLocaleDateString()}
                        </span>
                      ) : "—"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`font-black text-[9px] uppercase px-3 ${STATUS_STYLES[r.status] ?? ""}`}>
                        {r.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right px-8">
                      {r.status === "pending" && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-2xl">
                            <DropdownMenuLabel className="font-black text-xs uppercase tracking-widest">Respond</DropdownMenuLabel>
                            <DropdownMenuItem className="gap-2 font-bold text-emerald-600" onClick={() => setDialog({ req: r, type: "confirmed" })}>
                              <CheckCircle2 className="h-3.5 w-3.5" /> Confirm
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 font-bold text-red-600" onClick={() => setDialog({ req: r, type: "denied" })}>
                              <XCircle className="h-3.5 w-3.5" /> Deny
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 font-bold text-purple-600" onClick={() => setDialog({ req: r, type: "escalated" })}>
                              <AlertTriangle className="h-3.5 w-3.5" /> Escalate
                            </DropdownMenuItem>
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

      <Dialog open={!!dialog} onOpenChange={open => { if (!open) { setDialog(null); setResponse("") } }}>
        <DialogContent className="rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle className="font-black text-xl capitalize">{dialog?.type} Request</DialogTitle>
            <DialogDescription>
              Responding to claim for cert <strong>{dialog?.req.claimed_certificate_number}</strong> by <strong>{dialog?.req.business_name}</strong>.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-2">
            <Label className="font-black text-xs uppercase tracking-widest">Response / Notes (optional)</Label>
            <Textarea
              placeholder="Add any notes for this business..."
              value={response}
              onChange={e => setResponse(e.target.value)}
              className="rounded-2xl"
            />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" className="rounded-2xl font-black" onClick={() => { setDialog(null); setResponse("") }}>Cancel</Button>
            <Button
              className={`rounded-2xl font-black text-white ${dialog?.type === "confirmed" ? "bg-emerald-600 hover:bg-emerald-700" : dialog?.type === "denied" ? "bg-red-600 hover:bg-red-700" : "bg-purple-600 hover:bg-purple-700"}`}
              disabled={saving}
              onClick={handleAction}
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {dialog?.type === "confirmed" ? "Confirm" : dialog?.type === "denied" ? "Deny" : "Escalate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
