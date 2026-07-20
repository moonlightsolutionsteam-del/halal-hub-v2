// @ts-nocheck
"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Plus, BookOpen, ExternalLink } from "lucide-react"

const CATEGORIES = ["HR","IT Security","Finance","Legal","Operations","Data Privacy","Governance","SOP","Other"]
const STATUSES = ["Draft","Active","Under Review","Archived"]

type Policy = { id: string; title: string; category: string | null; version: string | null; status: string | null; owner: string | null; doc_url: string | null; last_reviewed: string | null }

const STATUS_COLOR: Record<string, string> = {
  Draft: "bg-slate-100 text-slate-700",
  Active: "bg-emerald-100 text-emerald-700",
  "Under Review": "bg-amber-100 text-amber-700",
  Archived: "bg-slate-100 text-slate-500",
}

export default function PoliciesPage() {
  const [rows, setRows] = React.useState<Policy[]>([])
  const [loading, setLoading] = React.useState(true)
  const [adding, setAdding] = React.useState(false)
  const [form, setForm] = React.useState({ title: "", category: CATEGORIES[0], version: "1.0", status: STATUSES[1], owner: "", doc_url: "", last_reviewed: "" })
  const [saving, setSaving] = React.useState(false)

  const load = React.useCallback(() => {
    const supabase = createClient()
    supabase.from("erp_policies").select("*").order("category", { ascending: true }).then(({ data }) => {
      setRows(data ?? []); setLoading(false)
    })
  }, [])

  React.useEffect(() => { load() }, [load])

  async function handleAdd() {
    if (!form.title) return
    setSaving(true)
    const supabase = createClient()
    await supabase.from("erp_policies").insert({ title: form.title, category: form.category, version: form.version || null, status: form.status, owner: form.owner || null, doc_url: form.doc_url || null, last_reviewed: form.last_reviewed || null })
    setForm({ title: "", category: CATEGORIES[0], version: "1.0", status: STATUSES[1], owner: "", doc_url: "", last_reviewed: "" })
    setAdding(false); setSaving(false); load()
  }

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  const byCategory: Record<string, Policy[]> = {}
  for (const r of rows) {
    const c = r.category ?? "Other"
    byCategory[c] = [...(byCategory[c] ?? []), r]
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">Policy Library</h1>
          <p className="text-muted-foreground text-sm">Internal policies, SOPs, and governance documents.</p>
        </div>
        <Button size="sm" className="gap-1.5 rounded-xl font-bold" onClick={() => setAdding(true)}>
          <Plus className="h-4 w-4" /> Add Policy
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums">{rows.length}</p><p className="text-xs text-muted-foreground mt-0.5">Total policies</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums text-emerald-600">{rows.filter(r => r.status === "Active").length}</p><p className="text-xs text-muted-foreground mt-0.5">Active</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums text-amber-600">{rows.filter(r => r.status === "Under Review" || r.status === "Draft").length}</p><p className="text-xs text-muted-foreground mt-0.5">Needs attention</p></CardContent></Card>
      </div>

      {adding && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-black">Add Policy / SOP</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <div className="space-y-1 col-span-2"><label className="text-xs font-bold text-muted-foreground">Title *</label><Input value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} placeholder="e.g. Work from Home Policy" /></div>
            <div className="space-y-1"><label className="text-xs font-bold text-muted-foreground">Category</label>
              <select className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium" value={form.category} onChange={e => setForm(p => ({...p, category: e.target.value}))}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1"><label className="text-xs font-bold text-muted-foreground">Status</label>
              <select className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium" value={form.status} onChange={e => setForm(p => ({...p, status: e.target.value}))}>
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-1"><label className="text-xs font-bold text-muted-foreground">Version</label><Input value={form.version} onChange={e => setForm(p => ({...p, version: e.target.value}))} placeholder="1.0" /></div>
            <div className="space-y-1"><label className="text-xs font-bold text-muted-foreground">Owner</label><Input value={form.owner} onChange={e => setForm(p => ({...p, owner: e.target.value}))} placeholder="Dept / Person" /></div>
            <div className="space-y-1"><label className="text-xs font-bold text-muted-foreground">Last Reviewed</label><Input type="date" value={form.last_reviewed} onChange={e => setForm(p => ({...p, last_reviewed: e.target.value}))} /></div>
            <div className="space-y-1 col-span-2"><label className="text-xs font-bold text-muted-foreground">Document URL (Google Drive / Notion)</label><Input value={form.doc_url} onChange={e => setForm(p => ({...p, doc_url: e.target.value}))} placeholder="https://..." /></div>
            <div className="col-span-2 flex gap-2">
              <Button className="h-9 rounded-lg font-bold" onClick={handleAdd} disabled={saving}>{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}</Button>
              <Button variant="ghost" className="h-9 rounded-lg font-bold" onClick={() => setAdding(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {Object.entries(byCategory).map(([cat, policies]) => (
        <div key={cat} className="space-y-2">
          <h2 className="text-xs font-black text-muted-foreground uppercase tracking-widest">{cat}</h2>
          {policies.map(r => (
            <Card key={r.id}>
              <CardContent className="p-4 flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{r.title}</span>
                    {r.version && <span className="text-[10px] text-muted-foreground">v{r.version}</span>}
                  </div>
                  {r.owner && <p className="text-[10px] text-muted-foreground">Owner: {r.owner}</p>}
                  {r.last_reviewed && <p className="text-[10px] text-muted-foreground">Reviewed: {new Date(r.last_reviewed).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" })}</p>}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_COLOR[r.status ?? ""] ?? ""}`}>{r.status}</span>
                  {r.doc_url && (
                    <a href={r.doc_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ))}

      {rows.length === 0 && !adding && <p className="text-sm text-muted-foreground text-center py-10">No policies added yet.</p>}
    </div>
  )
}
