// @ts-nocheck
"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Plus, Scale } from "lucide-react"

const TYPES = ["Litigation","Arbitration","Consumer Forum","Labour Dispute","Trademark","IP Infringement","Other"]
const STATUSES = ["Active","Pending Hearing","Under Review","Settled","Won","Lost","Dropped"]
const STATUS_COLOR: Record<string, string> = {
  Active: "bg-amber-100 text-amber-700",
  "Pending Hearing": "bg-blue-100 text-blue-700",
  "Under Review": "bg-slate-100 text-slate-700",
  Settled: "bg-emerald-100 text-emerald-700",
  Won: "bg-emerald-100 text-emerald-700",
  Lost: "bg-red-100 text-red-700",
  Dropped: "bg-slate-100 text-slate-600",
}

type LegalCase = { id: string; title: string; type: string | null; status: string | null; court_forum: string | null; opposing_party: string | null; next_date: string | null; notes: string | null }

export default function CasesPage() {
  const [rows, setRows] = React.useState<LegalCase[]>([])
  const [loading, setLoading] = React.useState(true)
  const [adding, setAdding] = React.useState(false)
  const [form, setForm] = React.useState({ title: "", type: TYPES[0], status: STATUSES[0], court_forum: "", opposing_party: "", next_date: "", notes: "" })
  const [saving, setSaving] = React.useState(false)

  const load = React.useCallback(() => {
    const supabase = createClient()
    supabase.from("erp_cases").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setRows(data ?? []); setLoading(false)
    })
  }, [])

  React.useEffect(() => { load() }, [load])

  async function handleAdd() {
    if (!form.title) return
    setSaving(true)
    const supabase = createClient()
    await supabase.from("erp_cases").insert({ title: form.title, type: form.type, status: form.status, court_forum: form.court_forum || null, opposing_party: form.opposing_party || null, next_date: form.next_date || null, notes: form.notes || null })
    setForm({ title: "", type: TYPES[0], status: STATUSES[0], court_forum: "", opposing_party: "", next_date: "", notes: "" })
    setAdding(false); setSaving(false); load()
  }

  async function updateStatus(id: string, status: string) {
    const supabase = createClient()
    await supabase.from("erp_cases").update({ status }).eq("id", id)
    load()
  }

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  const active = rows.filter(r => ["Active","Pending Hearing","Under Review"].includes(r.status ?? "")).length

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">Legal Cases</h1>
          <p className="text-muted-foreground text-sm">Litigation, arbitration, and legal matter tracker.</p>
        </div>
        <Button size="sm" className="gap-1.5 rounded-xl font-bold" onClick={() => setAdding(true)}>
          <Plus className="h-4 w-4" /> Add Case
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums">{rows.length}</p><p className="text-xs text-muted-foreground mt-0.5">Total cases</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className={`text-xl font-black tabular-nums ${active > 0 ? "text-amber-600" : ""}`}>{active}</p><p className="text-xs text-muted-foreground mt-0.5">Active / pending</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums text-emerald-600">{rows.filter(r => r.status === "Won" || r.status === "Settled").length}</p><p className="text-xs text-muted-foreground mt-0.5">Resolved favourably</p></CardContent></Card>
      </div>

      {adding && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-black">Add Legal Case</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <div className="space-y-1 col-span-2"><label className="text-xs font-bold text-muted-foreground">Case Title *</label><Input value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} placeholder="e.g. XYZ vs HalalHub — Consumer Dispute" /></div>
            <div className="space-y-1"><label className="text-xs font-bold text-muted-foreground">Type</label>
              <select className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium" value={form.type} onChange={e => setForm(p => ({...p, type: e.target.value}))}>
                {TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="space-y-1"><label className="text-xs font-bold text-muted-foreground">Status</label>
              <select className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium" value={form.status} onChange={e => setForm(p => ({...p, status: e.target.value}))}>
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-1"><label className="text-xs font-bold text-muted-foreground">Court / Forum</label><Input value={form.court_forum} onChange={e => setForm(p => ({...p, court_forum: e.target.value}))} placeholder="High Court / NCDRC / etc." /></div>
            <div className="space-y-1"><label className="text-xs font-bold text-muted-foreground">Opposing Party</label><Input value={form.opposing_party} onChange={e => setForm(p => ({...p, opposing_party: e.target.value}))} /></div>
            <div className="space-y-1"><label className="text-xs font-bold text-muted-foreground">Next Hearing Date</label><Input type="date" value={form.next_date} onChange={e => setForm(p => ({...p, next_date: e.target.value}))} /></div>
            <div className="space-y-1 col-span-2"><label className="text-xs font-bold text-muted-foreground">Notes</label><Input value={form.notes} onChange={e => setForm(p => ({...p, notes: e.target.value}))} placeholder="Case number, lawyer, key facts..." /></div>
            <div className="col-span-2 flex gap-2">
              <Button className="h-9 rounded-lg font-bold" onClick={handleAdd} disabled={saving}>{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}</Button>
              <Button variant="ghost" className="h-9 rounded-lg font-bold" onClick={() => setAdding(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {rows.length === 0 && <p className="text-sm text-muted-foreground text-center py-10">No cases tracked yet.</p>}
        {rows.map(r => (
          <Card key={r.id}>
            <CardContent className="p-4 flex items-start gap-3">
              <Scale className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-black text-sm">{r.title}</p>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {r.type && <span className="text-[10px] text-muted-foreground">{r.type}</span>}
                  {r.court_forum && <span className="text-[10px] text-muted-foreground">· {r.court_forum}</span>}
                  {r.opposing_party && <span className="text-[10px] text-muted-foreground">· vs {r.opposing_party}</span>}
                </div>
                {r.next_date && <p className="text-[10px] text-primary mt-0.5 font-bold">Next hearing: {new Date(r.next_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" })}</p>}
                {r.notes && <p className="text-xs text-muted-foreground mt-0.5 truncate">{r.notes}</p>}
              </div>
              <select className={`h-7 rounded-lg border border-transparent text-[10px] font-bold px-1.5 shrink-0 ${STATUS_COLOR[r.status ?? ""] ?? ""}`}
                value={r.status ?? STATUSES[0]} onChange={e => updateStatus(r.id, e.target.value)}>
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
