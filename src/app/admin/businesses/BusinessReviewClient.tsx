"use client"

import { useState, useTransition } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  CheckCircle2, XCircle, Clock, Search, Filter,
  Building2, MapPin, Phone, ShieldCheck,
  MessageSquare, ChevronDown, Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { updateBusinessStatus } from "./actions"
import { useToast } from "@/hooks/use-toast"

type Status = "pending" | "active" | "rejected"

interface Business {
  id: string
  name: string
  category: string | null
  city: string | null
  country: string | null
  phone: string | null
  halal_verified: boolean | null
  under_no_cert: boolean | null
  full_responsibility: boolean | null
  status: string | null
  created_at: string | null
  compliance_docs: any
  description: string | null
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pending:  { label: "Pending Review", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",  icon: <Clock className="h-3 w-3" /> },
  active:   { label: "Approved",       color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400", icon: <CheckCircle2 className="h-3 w-3" /> },
  rejected: { label: "Rejected",       color: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",           icon: <XCircle className="h-3 w-3" /> },
}

function halalLabel(b: Business) {
  if (b.halal_verified) return "Certified"
  if (b.under_no_cert)  return "Self-Declared"
  return "N/A"
}

export default function BusinessReviewClient({ businesses }: { businesses: Business[] }) {
  const { toast } = useToast()
  const [search, setSearch]           = useState("")
  const [filterStatus, setFilterStatus] = useState<Status | "all">("pending")
  const [expanded, setExpanded]       = useState<string | null>(null)
  const [pending, startTransition]    = useTransition()
  const [actionId, setActionId]       = useState<string | null>(null)

  const filtered = businesses.filter(b => {
    const matchSearch = !search ||
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      (b.city ?? "").toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === "all" || b.status === filterStatus
    return matchSearch && matchStatus
  })

  const counts = {
    pending:  businesses.filter(b => b.status === "pending").length,
    active:   businesses.filter(b => b.status === "active").length,
    rejected: businesses.filter(b => b.status === "rejected").length,
  }

  function act(id: string, status: Status) {
    setActionId(id)
    startTransition(async () => {
      try {
        await updateBusinessStatus(id, status)
        toast({ title: status === "active" ? "Business approved — now live!" : status === "rejected" ? "Submission rejected." : "Reset to pending." })
        setExpanded(null)
      } catch {
        toast({ title: "Action failed", variant: "destructive" })
      } finally {
        setActionId(null)
      }
    })
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Business Submissions</h1>
          <p className="text-sm font-bold text-muted-foreground">Review and approve new business listing applications.</p>
        </div>
      </div>

      {/* Status filter pills */}
      <div className="grid grid-cols-3 gap-4">
        {(["pending", "active", "rejected"] as Status[]).map(s => {
          const cfg = STATUS_CONFIG[s]
          return (
            <button
              key={s}
              onClick={() => setFilterStatus(prev => prev === s ? "all" : s)}
              className={cn(
                "p-5 rounded-[2rem] border-2 text-left transition-all",
                filterStatus === s ? "border-primary bg-primary/5" : "border-transparent bg-card shadow-soft hover:shadow-soft-md"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black", cfg.color)}>
                  {cfg.icon} {cfg.label}
                </div>
              </div>
              <p className="text-3xl font-black text-foreground">{counts[s]}</p>
            </button>
          )
        })}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search business name or city..."
          className="pl-11 h-11 rounded-2xl border-none shadow-soft bg-card"
        />
      </div>

      {/* List */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <Card className="rounded-[2rem] border-none shadow-soft">
            <CardContent className="p-12 text-center">
              <Building2 className="h-12 w-12 mx-auto text-muted-foreground opacity-40 mb-4" />
              <p className="font-black text-foreground">No submissions found</p>
              <p className="text-sm text-muted-foreground font-medium mt-1">
                {filterStatus === "pending" ? "No pending submissions right now." : "Try adjusting your search or filter."}
              </p>
            </CardContent>
          </Card>
        )}

        {filtered.map(biz => {
          const cfg = STATUS_CONFIG[biz.status ?? "pending"] ?? STATUS_CONFIG.pending
          const isExpanded = expanded === biz.id
          const isBusy = actionId === biz.id && pending

          return (
            <Card key={biz.id} className={cn("rounded-[2rem] border-2 shadow-soft transition-all", isExpanded ? "border-primary/20" : "border-transparent")}>
              <CardContent className="p-0">
                <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start gap-3 flex-wrap">
                      <p className="font-black text-foreground text-base">{biz.name}</p>
                      <div className={cn("flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black", cfg.color)}>
                        {cfg.icon} {cfg.label}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs font-bold text-muted-foreground">
                      {biz.category && <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />{biz.category}</span>}
                      {biz.city && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{biz.city}{biz.country ? `, ${biz.country}` : ""}</span>}
                      <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" />{halalLabel(biz)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Submitted {new Date(biz.created_at ?? "").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl shrink-0"
                    onClick={() => setExpanded(isExpanded ? null : biz.id)}
                  >
                    <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
                  </Button>
                </div>

                {isExpanded && (
                  <div className="border-t p-6 bg-muted/30 rounded-b-[2rem] space-y-4 animate-in fade-in duration-200">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                      {biz.phone     && <div><p className="font-black text-muted-foreground uppercase tracking-wider mb-1">Phone</p><p className="font-bold text-foreground">{biz.phone}</p></div>}
                      <div><p className="font-black text-muted-foreground uppercase tracking-wider mb-1">Halal Status</p><p className="font-bold text-foreground">{halalLabel(biz)}</p></div>
                      <div><p className="font-black text-muted-foreground uppercase tracking-wider mb-1">Full Responsibility</p><p className="font-bold text-foreground">{biz.full_responsibility ? "Yes" : "No"}</p></div>
                      {biz.compliance_docs?.body && <div><p className="font-black text-muted-foreground uppercase tracking-wider mb-1">Certifier</p><p className="font-bold text-foreground">{biz.compliance_docs.body}</p></div>}
                      {biz.compliance_docs?.number && <div><p className="font-black text-muted-foreground uppercase tracking-wider mb-1">Cert. No.</p><p className="font-bold text-foreground">{biz.compliance_docs.number}</p></div>}
                    </div>

                    {biz.description && (
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 bg-muted/50 p-3 rounded-xl">
                        {biz.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-3 pt-2">
                      {biz.status !== "active" && (
                        <Button
                          onClick={() => act(biz.id, "active")}
                          disabled={isBusy}
                          className="rounded-2xl h-10 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs gap-2"
                        >
                          {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                          Approve & Publish
                        </Button>
                      )}
                      {biz.status !== "rejected" && (
                        <Button
                          onClick={() => act(biz.id, "rejected")}
                          disabled={isBusy}
                          variant="outline"
                          className="rounded-2xl h-10 px-6 border-2 border-red-200 text-red-600 hover:bg-red-50 font-black text-xs gap-2 dark:border-red-900 dark:hover:bg-red-950/30"
                        >
                          {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4" />}
                          Reject
                        </Button>
                      )}
                      {biz.status !== "pending" && (
                        <Button
                          onClick={() => act(biz.id, "pending")}
                          disabled={isBusy}
                          variant="outline"
                          className="rounded-2xl h-10 px-6 border-2 font-black text-xs"
                        >
                          Reset to Pending
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
