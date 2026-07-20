// @ts-nocheck
"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Plus, AlertTriangle } from "lucide-react"

const SEVERITIES = ["Critical","High","Medium","Low"]
const STATUSES = ["Open","Investigating","Contained","Resolved"]
const SEV_COLOR: Record<string, string> = {
  Critical: "bg-red-100 text-red-700",
  High: "bg-orange-100 text-orange-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-slate-100 text-slate-600",
}
const STATUS_COLOR: Record<string, string> = {
  Open: "bg-red-100 text-red-700",
  Investigating: "bg-amber-100 text-amber-700",
  Contained: "bg-blue-100 text-blue-700",
  Resolved: "bg-emerald-100 text-emerald-700",
}

type Incident = { id: string; title: string; severity: string | null; status: string | null; description: string | null; reported_by: string | null; created_at: string | null }

export default function IncidentsPage() {
  const [rows, setRows] = React.useState<Incident[]>([])
  const [loading, setLoading] = React.useState(true)
  const [adding, setAdding] = React.useState(false)
  const [form, setForm] = React.useState({ title: "", severity: SEVERITIES[1], status: STATUSES[0], description: "", reported_by: "" })
  const [saving, setSaving] = React.useState(false)

  const load = React.useCallback(() => {
    const supabase = createClient()
    supabase.from("erp_incidents").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setRows(data ?? []); setLoading(false)
    })
  }, [])

  React.useEffect(() => { load() }, [load])

  async function handleAdd() {
    if (!form.title) return
    setSaving(true)
    const supabase = createClient()
    await supabase.from("erp_incidents").insert({ title: form.title, severity: form.severity, status: form.status, description: form.description || null, reported_by: form.reported_by || null })
    setForm({ title: "", severity: SEVERITIES[1], status: STATUSES[0], description: "", reported_by: "" })
    setAdding(false); setSaving(false); load()
  }

  async function updateStatus(id: string, status: string) {
    const supabase = createClient()
    await supabase.from("erp_incidents").update({ status }).eq("id", id)
    load()
  }

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  const open = rows.filter(r => r.status !== "Resolved").length
  const critical = rows.filter(r => r.severity === "Critical" && r.status !== "Resolved").length

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">Security Incidents</h1>
          <p className="text-muted-foreground text-sm">Reported security events and remediation tracker.</p>
        </div>
        <Button size="sm" className="gap-1.5 rounded-xl font-bold" onClick={() => setAdding(true)}>
          <Plus className="h-4 w-4" /> Report Incident
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums">{rows.length}</p><p className="text-xs text-muted-foreground mt-0.5">Total incidents</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className={`text-xl font-black tabular-nums ${open > 0 ? "text-amber-600" : "text-emerald-600"}`}>{open}</p><p className="text-xs text-muted-foreground mt-0.5">Open / active</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className={`text-xl font-black tabular-nums ${critical > 0 ? "text-red-600" : ""}`}>{critical}</p><p className="text-xs text-muted-foreground mt-0.5">Critical unresolved</p></CardContent></Card>
      </div>

      {adding && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-black">Report Security Incident</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <div className="space-y-1 col-span-2"><label className="text-xs font-bold text-muted-foreground">Title *</label><Input value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} placeholder="Brief description of the incident" /></div>
            <div className="space-y-1"><label className="text-xs font-bold text-muted-foreground">Severity</label>
              <select className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium" value={form.severity} onChange={e => setForm(p => ({...p, severity: e.target.value}))}>
                {SEVERITIES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-1"><label className="text-xs font-bold text-muted-foreground">Status</label>
              <select className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium" value={form.status} onChange={e => setForm(p => ({...p, status: e.target.value}))}>
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-1 col-span-2"><label className="text-xs font-bold text-muted-foreground">Description</label><Input value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))} placeholder="What happened, when, impact..." /></div>
            <div className="space-y-1"><label className="text-xs font-bold text-muted-foreground">Reported by</label><Input value={form.reported_by} onChange={e => setForm(p => ({...p, reported_by: e.target.value}))} placeholder="Name / email" /></div>
            <div className="col-span-2 flex gap-2 mt-1">
              <Button className="h-9 rounded-lg font-bold" onClick={handleAdd} disabled={saving}>{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}</Button>
              <Button variant="ghost" className="h-9 rounded-lg font-bold" onClick={() => setAdding(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {rows.length === 0 && <p className="text-sm text-muted-foreground text-center py-10">No incidents reported. Great sign!</p>}
        {rows.map(r => (
          <Card key={r.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className={`h-4 w-4 mt-0.5 shrink-0 ${r.severity === "Critical" ? "text-red-600" : r.severity === "High" ? "text-orange-500" : "text-amber-400"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-black text-sm">{r.title}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${SEV_COLOR[r.severity ?? ""] ?? ""}`}>{r.severity}</span>
                  </div>
                  {r.description && <p className="text-xs text-muted-foreground mt-0.5 truncate">{r.description}</p>}
                  {r.reported_by && <p className="text-[10px] text-muted-foreground mt-0.5">Reported by {r.reported_by}</p>}
                </div>
                <div className="shrink-0">
                  <select
                    className={`h-7 rounded-lg border border-input bg-background px-2 text-xs font-bold ${STATUS_COLOR[r.status ?? ""] ?? ""}`}
                    value={r.status ?? STATUSES[0]}
                    onChange={e => updateStatus(r.id, e.target.value)}
                  >
                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
