"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { AdminRoleGate } from "@/components/admin-role-gate"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Headset, AlertTriangle, Clock, CheckCircle2, Search, Loader2,
  ArrowUpCircle, BookOpen, Zap, ShieldAlert,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// ─── SLA Matrix ──────────────────────────────────────────────────────────────

const SLA_MATRIX = [
  { type: "abuse",        label: "Abuse / Fraud",    priority: "Critical", firstResponse: "1h",  resolution: "4h",  escalatesAt: "2h",  tier: "T3" },
  { type: "verification", label: "Halal Verification", priority: "Critical", firstResponse: "2h",  resolution: "8h",  escalatesAt: "4h",  tier: "T3" },
  { type: "billing",      label: "Billing",           priority: "High",     firstResponse: "4h",  resolution: "24h", escalatesAt: "8h",  tier: "T2" },
  { type: "technical",    label: "Technical",         priority: "High",     firstResponse: "4h",  resolution: "24h", escalatesAt: "8h",  tier: "T2" },
  { type: "account",      label: "Account",           priority: "Medium",   firstResponse: "8h",  resolution: "48h", escalatesAt: "16h", tier: "T2" },
  { type: "content",      label: "Content / Listing", priority: "Low",      firstResponse: "24h", resolution: "72h", escalatesAt: "48h", tier: "T1" },
  { type: "other",        label: "Other",             priority: "Low",      firstResponse: "24h", resolution: "72h", escalatesAt: "48h", tier: "T1" },
]

const ESCALATION_TIERS = [
  {
    tier: "T1",
    name: "Front-line Support",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    handles: ["Content / Listing updates", "General enquiries", "Low-priority account help"],
    escalatesTo: "T2 after SLA breach",
    response: "Best effort, 24h SLA",
  },
  {
    tier: "T2",
    name: "Senior Support",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    handles: ["Billing disputes", "Technical bugs", "Account lockouts", "Verification delays"],
    escalatesTo: "T3 after 8h breach",
    response: "4–8h first response",
  },
  {
    tier: "T3",
    name: "Operations Lead",
    color: "bg-red-100 text-red-700 border-red-200",
    handles: ["Abuse & fraud reports", "Critical verification failures", "Escalated billing disputes"],
    escalatesTo: "CEO / Legal if unresolved in 24h",
    response: "1–2h first response",
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

const PRIORITY_COLORS: Record<string, string> = {
  critical: "bg-red-100 text-red-700 border-red-200",
  high:     "bg-amber-100 text-amber-700 border-amber-200",
  medium:   "bg-blue-100 text-blue-700 border-blue-200",
  low:      "bg-muted text-muted-foreground border-border",
}

const STATUS_COLORS: Record<string, string> = {
  open:        "bg-amber-100 text-amber-700 border-amber-200",
  in_progress: "bg-blue-100 text-blue-700 border-blue-200",
  escalated:   "bg-red-100 text-red-700 border-red-200",
  resolved:    "bg-emerald-100 text-emerald-700 border-emerald-200",
  closed:      "bg-muted text-muted-foreground border-border",
}

function ageHours(created_at: string) {
  return (Date.now() - new Date(created_at).getTime()) / 3_600_000
}

function slaForTicket(type: string) {
  return SLA_MATRIX.find(s => s.type === type) ?? SLA_MATRIX[SLA_MATRIX.length - 1]
}

function parseHours(str: string) {
  return parseFloat(str.replace("h", ""))
}

function SLAStatus({ type, created_at, status }: { type: string; created_at: string; status: string }) {
  if (status === "resolved" || status === "closed") {
    return <span className="text-xs text-muted-foreground font-medium">—</span>
  }
  const sla = slaForTicket(type)
  const age = ageHours(created_at)
  const resHours = parseHours(sla.resolution)
  const escHours = parseHours(sla.escalatesAt)
  const pct = Math.min(100, (age / resHours) * 100)

  if (age > resHours) {
    return (
      <div className="flex items-center gap-1 text-red-600">
        <AlertTriangle className="h-3 w-3 shrink-0" />
        <span className="text-[11px] font-black">SLA BREACHED</span>
      </div>
    )
  }
  if (age > escHours) {
    return (
      <div className="flex items-center gap-1 text-amber-600">
        <Clock className="h-3 w-3 shrink-0" />
        <span className="text-[11px] font-black">Escalate now</span>
      </div>
    )
  }
  const remaining = resHours - age
  return (
    <div className="space-y-0.5">
      <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full ${pct > 75 ? "bg-red-500" : pct > 50 ? "bg-amber-500" : "bg-emerald-500"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[10px] text-muted-foreground">{remaining.toFixed(1)}h left</span>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type Ticket = {
  id: string
  ticket_number: string
  user_name: string | null
  user_email: string | null
  type: string
  priority: string
  subject: string
  status: string
  assigned_to: string | null
  escalated_at: string | null
  resolved_at: string | null
  created_at: string
  updated_at: string
}

function SupportSLAContent() {
  const { toast } = useToast()
  const [tickets, setTickets] = React.useState<Ticket[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [updating, setUpdating] = React.useState<string | null>(null)

  React.useEffect(() => {
    const supabase = createClient()
    supabase
      .from("support_tickets")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200)
      .then(({ data }) => { setTickets(data ?? []); setLoading(false) })
  }, [])

  async function updateStatus(id: string, status: string) {
    setUpdating(id)
    const supabase = createClient()
    const extra: Record<string, string> = {}
    if (status === "escalated") extra.escalated_at = new Date().toISOString()
    if (status === "resolved")  extra.resolved_at  = new Date().toISOString()
    await supabase.from("support_tickets").update({ status, updated_at: new Date().toISOString(), ...extra }).eq("id", id)
    setTickets(ts => ts.map(t => t.id === id ? { ...t, status, ...extra } : t))
    toast({ title: `Ticket ${status.replace("_", " ")}` })
    setUpdating(null)
  }

  const open       = tickets.filter(t => t.status === "open")
  const inProgress = tickets.filter(t => t.status === "in_progress")
  const escalated  = tickets.filter(t => t.status === "escalated")
  const resolved   = tickets.filter(t => t.status === "resolved" || t.status === "closed")

  const breached = tickets.filter(t => {
    if (t.status === "resolved" || t.status === "closed") return false
    const sla = slaForTicket(t.type)
    return ageHours(t.created_at) > parseHours(sla.resolution)
  })

  const filtered = tickets.filter(t => {
    const q = search.toLowerCase()
    return !q || (t.subject ?? "").toLowerCase().includes(q)
      || (t.user_name ?? "").toLowerCase().includes(q)
      || (t.ticket_number ?? "").toLowerCase().includes(q)
      || t.type.includes(q)
  })

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
          <Headset className="h-6 w-6 text-primary" /> Support & SLA
        </h1>
        <p className="text-sm text-muted-foreground font-medium">
          Ticket queue with SLA breach tracking, escalation playbook, and per-type response targets.
        </p>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Open",       value: open.length,       color: "text-amber-600",   icon: Clock },
          { label: "In Progress",value: inProgress.length, color: "text-blue-600",    icon: Zap },
          { label: "Escalated",  value: escalated.length,  color: "text-red-600",     icon: ArrowUpCircle },
          { label: "SLA Breached",value: breached.length,  color: "text-red-600",     icon: AlertTriangle },
        ].map(({ label, value, color, icon: Icon }) => (
          <Card key={label} className={`rounded-2xl border-none shadow-sm ${label === "SLA Breached" && value > 0 ? "ring-1 ring-red-200" : ""}`}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-xl bg-muted ${color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xl font-black text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground font-medium">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {breached.length > 0 && (
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-50 border border-red-100 dark:bg-red-950/20 dark:border-red-900/30">
          <ShieldAlert className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-black text-red-700 dark:text-red-400">
              {breached.length} ticket{breached.length > 1 ? "s" : ""} have breached SLA — immediate action required
            </p>
            <p className="text-xs text-red-600 mt-0.5">
              {breached.slice(0, 3).map(t => t.ticket_number).join(", ")}{breached.length > 3 ? ` +${breached.length - 3} more` : ""}
            </p>
          </div>
        </div>
      )}

      <Tabs defaultValue="queue">
        <TabsList className="rounded-full h-11">
          <TabsTrigger value="queue"    className="rounded-full gap-1.5"><Headset className="h-3.5 w-3.5" /> Queue</TabsTrigger>
          <TabsTrigger value="sla"      className="rounded-full gap-1.5"><Clock className="h-3.5 w-3.5" /> SLA Matrix</TabsTrigger>
          <TabsTrigger value="playbook" className="rounded-full gap-1.5"><BookOpen className="h-3.5 w-3.5" /> Escalation Playbook</TabsTrigger>
        </TabsList>

        {/* ── Ticket Queue ── */}
        <TabsContent value="queue" className="mt-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tickets, users, subjects…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 h-11 rounded-xl"
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Headset className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No tickets found.</p>
            </div>
          ) : (
            filtered.map(t => {
              const sla = slaForTicket(t.type)
              const isBreached = (t.status !== "resolved" && t.status !== "closed") && ageHours(t.created_at) > parseHours(sla.resolution)
              return (
                <Card
                  key={t.id}
                  className={`rounded-2xl border-none shadow-sm ${isBreached ? "ring-1 ring-red-300 dark:ring-red-900/50" : ""}`}
                >
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-black text-muted-foreground font-mono">{t.ticket_number}</span>
                          <Badge className={`text-[10px] px-2 py-0.5 border ${PRIORITY_COLORS[t.priority] ?? PRIORITY_COLORS.low}`}>
                            {t.priority}
                          </Badge>
                          <Badge className={`text-[10px] px-2 py-0.5 border ${STATUS_COLORS[t.status] ?? STATUS_COLORS.open}`}>
                            {t.status.replace("_", " ")}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full font-medium">
                            {sla.label}
                          </span>
                        </div>
                        <p className="text-sm font-black text-foreground mt-1">{t.subject}</p>
                        <p className="text-xs text-muted-foreground">{t.user_name ?? "Unknown"} · {t.user_email}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <SLAStatus type={t.type} created_at={t.created_at} status={t.status} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {t.status === "open" && (
                        <>
                          <Button
                            size="sm"
                            className="rounded-xl h-7 text-xs font-bold gap-1"
                            disabled={updating === t.id}
                            onClick={() => updateStatus(t.id, "in_progress")}
                          >
                            {updating === t.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Zap className="h-3 w-3" />}
                            Pick Up
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-xl h-7 text-xs font-bold gap-1 border-red-200 text-red-600 hover:bg-red-50"
                            disabled={updating === t.id}
                            onClick={() => updateStatus(t.id, "escalated")}
                          >
                            <ArrowUpCircle className="h-3 w-3" /> Escalate
                          </Button>
                        </>
                      )}
                      {t.status === "in_progress" && (
                        <>
                          <Button
                            size="sm"
                            className="rounded-xl h-7 text-xs font-bold gap-1 bg-emerald-600 hover:bg-emerald-700"
                            disabled={updating === t.id}
                            onClick={() => updateStatus(t.id, "resolved")}
                          >
                            <CheckCircle2 className="h-3 w-3" /> Resolve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-xl h-7 text-xs font-bold gap-1 border-red-200 text-red-600 hover:bg-red-50"
                            disabled={updating === t.id}
                            onClick={() => updateStatus(t.id, "escalated")}
                          >
                            <ArrowUpCircle className="h-3 w-3" /> Escalate
                          </Button>
                        </>
                      )}
                      {t.status === "escalated" && (
                        <Button
                          size="sm"
                          className="rounded-xl h-7 text-xs font-bold gap-1 bg-emerald-600 hover:bg-emerald-700"
                          disabled={updating === t.id}
                          onClick={() => updateStatus(t.id, "resolved")}
                        >
                          <CheckCircle2 className="h-3 w-3" /> Resolve
                        </Button>
                      )}
                      {(t.status === "resolved" || t.status === "closed") && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                          {t.resolved_at ? `Resolved ${new Date(t.resolved_at).toLocaleDateString()}` : "Resolved"}
                        </span>
                      )}
                      <span className="text-[10px] text-muted-foreground ml-auto">
                        Opened {new Date(t.created_at).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </TabsContent>

        {/* ── SLA Matrix ── */}
        <TabsContent value="sla" className="mt-4">
          <Card className="rounded-2xl border-none shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-black">SLA Matrix</CardTitle>
              <CardDescription>Response and resolution targets by ticket type. Breach triggers auto-escalation.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 text-xs font-black text-muted-foreground">Ticket Type</th>
                    <th className="text-left py-2 pr-4 text-xs font-black text-muted-foreground">Priority</th>
                    <th className="text-left py-2 pr-4 text-xs font-black text-muted-foreground">First Response</th>
                    <th className="text-left py-2 pr-4 text-xs font-black text-muted-foreground">Resolution</th>
                    <th className="text-left py-2 pr-4 text-xs font-black text-muted-foreground">Escalate At</th>
                    <th className="text-left py-2 text-xs font-black text-muted-foreground">Tier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {SLA_MATRIX.map(row => (
                    <tr key={row.type} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 pr-4 font-bold text-foreground">{row.label}</td>
                      <td className="py-3 pr-4">
                        <Badge className={`text-[10px] px-2 py-0.5 border ${PRIORITY_COLORS[row.priority.toLowerCase()] ?? PRIORITY_COLORS.low}`}>
                          {row.priority}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4 font-mono text-xs font-bold text-foreground">{row.firstResponse}</td>
                      <td className="py-3 pr-4 font-mono text-xs font-bold text-foreground">{row.resolution}</td>
                      <td className="py-3 pr-4 font-mono text-xs font-bold text-amber-600">{row.escalatesAt}</td>
                      <td className="py-3">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                          row.tier === "T3" ? "bg-red-50 text-red-700 border-red-200" :
                          row.tier === "T2" ? "bg-amber-50 text-amber-700 border-amber-200" :
                          "bg-muted text-muted-foreground border-border"
                        }`}>{row.tier}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-none shadow-sm mt-4">
            <CardContent className="p-4 space-y-2">
              <p className="text-xs font-black text-foreground">Key Rules</p>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">·</span> SLA clock starts when ticket is submitted, not when first viewed</li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">·</span> Critical tickets (Abuse, Verification) must be acknowledged within 1h regardless of shift</li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">·</span> Escalation does not reset the SLA clock — original deadline stands</li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">·</span> Resolved tickets are closed automatically after 48h of no response</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Escalation Playbook ── */}
        <TabsContent value="playbook" className="mt-4 space-y-4">
          {ESCALATION_TIERS.map(tier => (
            <Card key={tier.tier} className="rounded-2xl border-none shadow-sm">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <Badge className={`text-xs px-3 py-1 border font-black ${tier.color}`}>{tier.tier}</Badge>
                  <p className="text-sm font-black text-foreground">{tier.name}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1">
                    <p className="font-black text-muted-foreground uppercase tracking-wide text-[10px]">Handles</p>
                    <ul className="space-y-1">
                      {tier.handles.map(h => (
                        <li key={h} className="flex items-start gap-1.5 text-foreground">
                          <span className="text-primary mt-0.5">·</span>{h}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-1">
                    <p className="font-black text-muted-foreground uppercase tracking-wide text-[10px]">Response Target</p>
                    <p className="text-foreground font-bold">{tier.response}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-black text-muted-foreground uppercase tracking-wide text-[10px]">Escalates To</p>
                    <p className="text-foreground font-bold flex items-center gap-1">
                      <ArrowUpCircle className="h-3 w-3 text-amber-500 shrink-0" />
                      {tier.escalatesTo}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="rounded-2xl border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-black">Escalation Decision Tree</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              {[
                { step: "1", label: "Ticket received", detail: "Auto-categorised by type → SLA clock starts" },
                { step: "2", label: "T1 first response", detail: "Acknowledge within 24h (Low) / 4h (High) / 1h (Critical)" },
                { step: "3", label: "Escalate if unresolved at escalation threshold", detail: "Reassign to T2/T3 — SLA deadline unchanged" },
                { step: "4", label: "T3 Operations Lead reviews", detail: "Billing/Legal authority to issue refunds or deactivate accounts" },
                { step: "5", label: "CEO / Legal if > 24h at T3", detail: "Only for fraud, regulatory, or media risk scenarios" },
              ].map(({ step, label, detail }) => (
                <div key={step} className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                    {step}
                  </div>
                  <div>
                    <p className="font-black text-foreground">{label}</p>
                    <p className="text-muted-foreground">{detail}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function SupportSLAPage() {
  return (
    <AdminRoleGate required="editor">
      <SupportSLAContent />
    </AdminRoleGate>
  )
}
