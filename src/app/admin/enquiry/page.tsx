// @ts-nocheck
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Search, Loader2, ArrowRight, Bell, CheckCircle2, UserPlus, Clock, AlertTriangle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { withLock } from "@/lib/processing-lock"

type Msg = {
  id: string
  content: string
  is_read: boolean | null
  created_at: string
  sender: { name: string | null; email: string | null } | null
  receiver: { name: string | null } | null
  routed_to_crm?: boolean
}

// SLA targets in hours per priority
const SLA_HOURS: Record<"urgent" | "normal", number> = { urgent: 2, normal: 24 }

function getSlaStatus(createdAt: string, priority: "urgent" | "normal", isRead: boolean | null): { breach: boolean; hoursElapsed: number; target: number } {
  const hoursElapsed = (Date.now() - new Date(createdAt).getTime()) / 3_600_000
  const target = SLA_HOURS[priority]
  return { breach: !isRead && hoursElapsed > target, hoursElapsed, target }
}

// Heuristics to detect investment/partnership enquiries — these get founder alert
const INVESTMENT_KEYWORDS = ["invest", "funding", "partnership", "partnership", "acquisition", "stake", "equity", "venture", "angel", "seed round", "series"]

function detectEnquiryType(text: string): { type: string; priority: "urgent" | "normal" } {
  const lower = text.toLowerCase()
  if (INVESTMENT_KEYWORDS.some(k => lower.includes(k))) return { type: "Investment / Partnership", priority: "urgent" }
  if (lower.includes("complaint") || lower.includes("fraud") || lower.includes("scam")) return { type: "Complaint / Fraud", priority: "urgent" }
  if (lower.includes("certificate") || lower.includes("certification") || lower.includes("halal cert")) return { type: "Certification Enquiry", priority: "normal" }
  if (lower.includes("advertis") || lower.includes("listing") || lower.includes("feature")) return { type: "Vendor / Listing Enquiry", priority: "normal" }
  return { type: "General Enquiry", priority: "normal" }
}

export default function AdminEnquiryPage() {
  const { toast } = useToast()
  const [messages, setMessages] = useState<Msg[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [routing, setRouting] = useState<string | null>(null)
  const [routedIds, setRoutedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from("messages")
      .select("id, content, is_read, created_at, sender:profiles!messages_sender_id_fkey(name, email), receiver:profiles!messages_receiver_id_fkey(name)")
      .order("created_at", { ascending: false })
      .limit(100)
      .then(({ data }: { data: Msg[] | null }) => {
        setMessages(data ?? [])
        setLoading(false)
      })
  }, [])

  async function routeToCrm(msg: Msg) {
    setRouting(msg.id)
    try {
      await withLock(`enquiry_route_${msg.id}`, () => _doRoute(msg), `Routing enquiry from ${msg.sender?.name ?? "Unknown"}`)
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Could not acquire lock"
      toast({ title: "Action blocked", description: message, variant: "destructive" })
      setRouting(null)
    }
  }

  async function _doRoute(msg: Msg) {
    const supabase = createClient()
    const { type, priority } = detectEnquiryType(msg.content)

    const { error } = await supabase.from("crm_leads").insert({
      name: msg.sender?.name ?? "Unknown",
      email: msg.sender?.email ?? null,
      source: "enquiry_form",
      enquiry_type: type,
      message: msg.content,
      priority,
      status: "new",
      notified_founder: priority === "urgent",
    })

    if (!error) {
      // Log to admin_actions
      await supabase.from("admin_actions").insert({
        action_type: "ENQUIRY_ROUTED",
        module: "enquiry",
        description: `Routed ${type} from ${msg.sender?.name ?? "Unknown"} to CRM Leads${priority === "urgent" ? " — founder notified" : ""}`,
        admin_name: "Auto-Router",
        admin_tier: "T1",
      })

      setRoutedIds(prev => new Set([...prev, msg.id]))
      toast({
        title: priority === "urgent" ? "🔔 Founder Notified" : "Lead created",
        description: `${type} routed to CRM${priority === "urgent" ? " — marked urgent" : ""}`,
      })
    } else {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    }
    setRouting(null)
  }

  // Auto-route all unread investment enquiries on mount
  useEffect(() => {
    if (loading || messages.length === 0) return
    const investmentMsgs = messages.filter(m =>
      !m.is_read && detectEnquiryType(m.content).priority === "urgent"
    )
    if (investmentMsgs.length > 0) {
      investmentMsgs.forEach(m => {
        if (!routedIds.has(m.id)) routeToCrm(m)
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  const filtered = messages.filter(m => {
    const q = search.toLowerCase()
    return !q ||
      (m.sender?.name ?? "").toLowerCase().includes(q) ||
      (m.receiver?.name ?? "").toLowerCase().includes(q) ||
      m.content.toLowerCase().includes(q)
  })

  const unread = filtered.filter(m => !m.is_read)
  const urgent = filtered.filter(m => detectEnquiryType(m.content).priority === "urgent")
  const slaBreached = filtered.filter(m => {
    const { priority } = detectEnquiryType(m.content)
    return getSlaStatus(m.created_at, priority, m.is_read).breach
  })

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-foreground">Enquiries & Messages</h1>
        <p className="text-sm text-muted-foreground font-medium">
          All platform messages. Investment and fraud enquiries auto-route to CRM and notify founder.
        </p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Unread", value: unread.length, color: "text-primary" },
          { label: "Urgent", value: urgent.length, color: "text-amber-600" },
          { label: "SLA Breached", value: slaBreached.length, color: slaBreached.length > 0 ? "text-red-600" : "text-muted-foreground" },
          { label: "Routed to CRM", value: routedIds.size, color: "text-emerald-600" },
        ].map(({ label, value, color }) => (
          <Card key={label} className="rounded-2xl border-none shadow-sm">
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-black ${color}`}>{value}</p>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* SLA targets legend */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <Clock className="h-3.5 w-3.5 shrink-0" />
        <span>SLA targets:</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500 inline-block" /> Urgent — 2 hrs</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-muted-foreground inline-block" /> Normal — 24 hrs</span>
      </div>

      {slaBreached.length > 0 && (
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-50 border border-red-100 dark:bg-red-950/20 dark:border-red-900/30">
          <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-black text-red-700 dark:text-red-400">{slaBreached.length} message{slaBreached.length > 1 ? "s" : ""} past SLA deadline</p>
            <p className="text-xs text-red-600 dark:text-red-500 mt-0.5">
              {slaBreached.slice(0, 3).map(m => m.sender?.name ?? "Unknown").join(", ")}{slaBreached.length > 3 ? ` +${slaBreached.length - 3} more` : ""}
            </p>
          </div>
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search messages, sender, or receiver..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9 h-11 rounded-xl"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <Tabs defaultValue="unread">
          <TabsList className="rounded-full h-11">
            <TabsTrigger value="unread" className="rounded-full">
              Unread <Badge className="ml-2 text-[10px] h-5 px-1.5">{unread.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="urgent" className="rounded-full">
              Urgent <Badge className="ml-2 text-[10px] h-5 px-1.5 bg-amber-500">{urgent.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="all" className="rounded-full">
              All <Badge className="ml-2 text-[10px] h-5 px-1.5">{filtered.length}</Badge>
            </TabsTrigger>
          </TabsList>

          {(["unread", "urgent", "all"] as const).map(tab => {
            const items = tab === "unread" ? unread : tab === "urgent" ? urgent : filtered
            return (
              <TabsContent key={tab} value={tab} className="mt-4 space-y-3">
                {items.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">{search ? "No messages match your search." : "No messages."}</p>
                  </div>
                ) : (
                  items.map(m => {
                    const { type, priority } = detectEnquiryType(m.content)
                    const isInvestment = priority === "urgent"
                    const alreadyRouted = routedIds.has(m.id)
                    const sla = getSlaStatus(m.created_at, priority, m.is_read)
                    const date = new Date(m.created_at).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
                    return (
                      <Card key={m.id} className={`rounded-2xl border-none shadow-sm ${sla.breach ? "ring-1 ring-red-300 bg-red-50/30 dark:bg-red-950/10" : !m.is_read ? "ring-1 ring-primary/30 bg-primary/5" : ""} ${isInvestment && !sla.breach ? "ring-1 ring-amber-300 bg-amber-50/50 dark:bg-amber-950/10" : ""}`}>
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-start gap-4">
                            <div className="flex-1 min-w-0 space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-black text-foreground">{m.sender?.name ?? "Unknown"}</span>
                                <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                                <span className="text-xs font-bold text-muted-foreground">{m.receiver?.name ?? "Unknown"}</span>
                                {!m.is_read && <Badge className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5">New</Badge>}
                                <Badge className={`text-[10px] px-2 py-0.5 ${isInvestment ? "bg-amber-500/15 text-amber-600 border-amber-200" : "bg-muted text-muted-foreground border-border"}`}>
                                  {type}
                                </Badge>
                                {isInvestment && <Bell className="h-3.5 w-3.5 text-amber-500" />}
                                {sla.breach && (
                                  <span className="flex items-center gap-1 text-[10px] font-bold text-red-600">
                                    <AlertTriangle className="h-3 w-3" />
                                    SLA +{Math.round(sla.hoursElapsed - sla.target)}h overdue
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-foreground line-clamp-2">{m.content}</p>
                              <p className="text-xs text-muted-foreground">{date} · SLA {sla.target}h</p>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            {alreadyRouted ? (
                              <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                Routed to CRM
                              </div>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                className="rounded-xl h-8 text-xs gap-1.5 font-bold"
                                disabled={routing === m.id}
                                onClick={() => routeToCrm(m)}
                              >
                                {routing === m.id
                                  ? <Loader2 className="h-3 w-3 animate-spin" />
                                  : <UserPlus className="h-3 w-3" />
                                }
                                Route to CRM
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })
                )}
              </TabsContent>
            )
          })}
        </Tabs>
      )}
    </div>
  )
}
