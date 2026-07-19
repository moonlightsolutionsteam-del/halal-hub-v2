"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Search, History, ChevronDown, ChevronRight } from "lucide-react"

type AuditEntry = {
  id: string
  action_type: string
  module: string
  description: string | null
  before_json: Record<string, unknown> | null
  after_json: Record<string, unknown> | null
  admin_name: string | null
  admin_tier: string | null
  ip_address: string | null
  created_at: string
}

const ACTION_COLORS: Record<string, string> = {
  FEATURE_ENABLED: "bg-emerald-500/15 text-emerald-600 border-emerald-200",
  FEATURE_DISABLED: "bg-red-500/15 text-red-600 border-red-200",
  ENQUIRY_ROUTED: "bg-blue-500/15 text-blue-600 border-blue-200",
  BUSINESS_APPROVED: "bg-emerald-500/15 text-emerald-600 border-emerald-200",
  BUSINESS_REJECTED: "bg-red-500/15 text-red-600 border-red-200",
  BUSINESS_UPDATED: "bg-amber-500/15 text-amber-600 border-amber-200",
  USER_BANNED: "bg-red-500/15 text-red-600 border-red-200",
  USER_UNBANNED: "bg-emerald-500/15 text-emerald-600 border-emerald-200",
}

function DiffView({ before, after }: { before: Record<string, unknown> | null; after: Record<string, unknown> | null }) {
  if (!before && !after) return null
  const keys = Array.from(new Set([...Object.keys(before ?? {}), ...Object.keys(after ?? {})]))
  return (
    <div className="mt-3 rounded-xl overflow-hidden border border-border text-[11px] font-mono">
      <div className="grid grid-cols-2 divide-x divide-border">
        <div className="bg-red-50/50 dark:bg-red-950/10 p-3 space-y-1">
          <p className="text-[10px] font-bold text-red-500 mb-2 font-sans uppercase tracking-wide">Before</p>
          {before ? keys.map(k => (
            <div key={k} className={`flex gap-2 ${after && JSON.stringify(after[k]) !== JSON.stringify(before[k]) ? "text-red-600 dark:text-red-400" : "text-muted-foreground"}`}>
              <span className="text-muted-foreground/60 shrink-0">{k}:</span>
              <span className="truncate">{JSON.stringify(before[k])}</span>
            </div>
          )) : <p className="text-muted-foreground/60">—</p>}
        </div>
        <div className="bg-emerald-50/50 dark:bg-emerald-950/10 p-3 space-y-1">
          <p className="text-[10px] font-bold text-emerald-600 mb-2 font-sans uppercase tracking-wide">After</p>
          {after ? keys.map(k => (
            <div key={k} className={`flex gap-2 ${before && JSON.stringify(after[k]) !== JSON.stringify(before[k]) ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}`}>
              <span className="text-muted-foreground/60 shrink-0">{k}:</span>
              <span className="truncate">{JSON.stringify(after[k])}</span>
            </div>
          )) : <p className="text-muted-foreground/60">—</p>}
        </div>
      </div>
    </div>
  )
}

function AuditRow({ entry }: { entry: AuditEntry }) {
  const [expanded, setExpanded] = React.useState(false)
  const hasDiff = entry.before_json || entry.after_json
  const colorClass = ACTION_COLORS[entry.action_type] ?? "bg-muted text-muted-foreground border-border"
  const date = new Date(entry.created_at).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })

  return (
    <Card className="rounded-2xl border-none shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={`text-[10px] px-2 py-0.5 font-bold ${colorClass}`}>{entry.action_type.replace(/_/g, " ")}</Badge>
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">{entry.module}</span>
              {entry.admin_tier && <Badge className="bg-muted text-muted-foreground border-border text-[10px] px-2 py-0.5">{entry.admin_tier}</Badge>}
            </div>
            <p className="text-sm text-foreground font-medium">{entry.description ?? "—"}</p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{date}</span>
              {entry.admin_name && <span>· {entry.admin_name}</span>}
              {entry.ip_address && <span>· {entry.ip_address}</span>}
            </div>
          </div>
          {hasDiff && (
            <button
              onClick={() => setExpanded(v => !v)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0 mt-0.5"
            >
              {expanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
              Diff
            </button>
          )}
        </div>
        {expanded && hasDiff && <DiffView before={entry.before_json} after={entry.after_json} />}
      </CardContent>
    </Card>
  )
}

export default function AuditLogPage() {
  const [entries, setEntries] = React.useState<AuditEntry[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [moduleFilter, setModuleFilter] = React.useState("all")
  const [actionFilter, setActionFilter] = React.useState("all")

  React.useEffect(() => {
    const supabase = createClient()
    supabase
      .from("admin_actions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200)
      .then(({ data }) => {
        setEntries(data ?? [])
        setLoading(false)
      })
  }, [])

  const modules = React.useMemo(() => Array.from(new Set(entries.map(e => e.module))).sort(), [entries])
  const actionTypes = React.useMemo(() => Array.from(new Set(entries.map(e => e.action_type))).sort(), [entries])

  const filtered = entries.filter(e => {
    if (moduleFilter !== "all" && e.module !== moduleFilter) return false
    if (actionFilter !== "all" && e.action_type !== actionFilter) return false
    const q = search.toLowerCase()
    if (!q) return true
    return (
      (e.description ?? "").toLowerCase().includes(q) ||
      (e.admin_name ?? "").toLowerCase().includes(q) ||
      e.action_type.toLowerCase().includes(q)
    )
  })

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
          <History className="h-6 w-6 text-primary" /> Platform Audit Log
        </h1>
        <p className="text-sm text-muted-foreground font-medium">
          Every admin action with before/after state. Immutable — entries are append-only.
        </p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Actions", value: entries.length },
          { label: "Modules", value: modules.length },
          { label: "Showing", value: filtered.length },
        ].map(({ label, value }) => (
          <Card key={label} className="rounded-2xl border-none shadow-sm">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-black text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search description, admin..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 h-11 rounded-xl"
          />
        </div>
        <Select value={moduleFilter} onValueChange={setModuleFilter}>
          <SelectTrigger className="h-11 rounded-xl w-full sm:w-44">
            <SelectValue placeholder="All modules" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All modules</SelectItem>
            {modules.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="h-11 rounded-xl w-full sm:w-52">
            <SelectValue placeholder="All actions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All actions</SelectItem>
            {actionTypes.map(a => <SelectItem key={a} value={a}>{a.replace(/_/g, " ")}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <History className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">{entries.length === 0 ? "No audit entries yet. Actions will appear here as admins operate the platform." : "No entries match your filters."}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(entry => <AuditRow key={entry.id} entry={entry} />)}
        </div>
      )}
    </div>
  )
}
