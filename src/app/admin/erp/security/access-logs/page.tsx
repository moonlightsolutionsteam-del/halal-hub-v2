// @ts-nocheck
"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Loader2, Search, Activity } from "lucide-react"

type LogRow = { id: string; action: string | null; module: string | null; user_id: string | null; user_email: string | null; details: string | null; created_at: string | null }

function timeAgo(iso: string | null) {
  if (!iso) return "—"
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" })
}

export default function AccessLogsPage() {
  const [logs, setLogs] = React.useState<LogRow[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")

  React.useEffect(() => {
    const supabase = createClient()
    supabase.from("erp_activity_logs")
      .select("id, action, module, user_id, user_email, details, created_at")
      .order("created_at", { ascending: false })
      .limit(200)
      .then(({ data }) => { setLogs(data ?? []); setLoading(false) })
  }, [])

  const filtered = search
    ? logs.filter(l =>
        (l.action ?? "").toLowerCase().includes(search.toLowerCase()) ||
        (l.module ?? "").toLowerCase().includes(search.toLowerCase()) ||
        (l.user_email ?? "").toLowerCase().includes(search.toLowerCase()) ||
        (l.details ?? "").toLowerCase().includes(search.toLowerCase())
      )
    : logs

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline">Access Logs</h1>
        <p className="text-muted-foreground text-sm">ERP admin activity trail — last 200 events.</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums">{logs.length}</p><p className="text-xs text-muted-foreground mt-0.5">Total events logged</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums">{new Set(logs.map(l => l.module)).size}</p><p className="text-xs text-muted-foreground mt-0.5">Modules touched</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums">{new Set(logs.map(l => l.user_email).filter(Boolean)).size}</p><p className="text-xs text-muted-foreground mt-0.5">Unique admins</p></CardContent></Card>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input className="pl-9 rounded-xl" placeholder="Search by action, module, user..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60">
                <th className="text-left px-4 py-2.5 text-xs font-black text-muted-foreground">Action</th>
                <th className="text-left px-4 py-2.5 text-xs font-black text-muted-foreground hidden sm:table-cell">Module</th>
                <th className="text-left px-4 py-2.5 text-xs font-black text-muted-foreground hidden md:table-cell">User</th>
                <th className="text-right px-4 py-2.5 text-xs font-black text-muted-foreground">When</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && <tr><td colSpan={4} className="text-center py-10 text-muted-foreground text-sm">No logs found{search ? " for this search" : ""}.</td></tr>}
              {filtered.map(log => (
                <tr key={log.id} className="border-b border-border/40 last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <Activity className="h-3 w-3 text-muted-foreground shrink-0" />
                      <span className="font-medium text-xs">{log.action ?? "—"}</span>
                    </div>
                    {log.details && <p className="text-[10px] text-muted-foreground mt-0.5 ml-5 truncate max-w-xs">{log.details}</p>}
                  </td>
                  <td className="px-4 py-2.5 hidden sm:table-cell">
                    <Badge variant="outline" className="text-[10px] font-bold">{log.module ?? "—"}</Badge>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground hidden md:table-cell">{log.user_email ?? "—"}</td>
                  <td className="px-4 py-2.5 text-right text-xs text-muted-foreground whitespace-nowrap">{timeAgo(log.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
