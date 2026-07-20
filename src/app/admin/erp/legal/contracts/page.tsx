"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Plus, FileText } from "lucide-react"

const TYPES = ["Vendor","Partner","Employment","NDA","SaaS","Service","Other"]
const STATUSES = ["Draft","Active","Expiring Soon","Expired","Terminated"]
const STATUS_COLOR: Record<string, string> = {
  Draft: "bg-slate-100 text-slate-700",
  Active: "bg-emerald-100 text-emerald-700",
  "Expiring Soon": "bg-amber-100 text-amber-700",
  Expired: "bg-red-100 text-red-700",
  Terminated: "bg-red-100 text-red-700",
}

type Contract = { id: string; title: string; party: string | null; type: string | null; status: string | null; value: number | null; start_date: string | null; end_date: string | null; notes: string | null }

export default function ContractsPage() {
  const [rows, setRows] = React.useState<Contract[]>([])
  const [loading, setLoading] = React.useState(true)
  const [adding, setAdding] = React.useState(false)
  const [form, setForm] = React.useState({ title: "", party: "", type: TYPES[0], status: STATUSES[1], value: "", start_date: "", end_date: "", notes: "" })
  const [saving, setSaving] = React.useState(false)

  const load = React.useCallback(() => {
    const supabase = createClient()
    supabase.from("erp_contracts").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setRows(data ?? []); setLoading(false)
    })
  }, [])

  React.useEffect(() => { load() }, [load])

  async function handleAdd() {
    if (!form.title || !form.party) return
    setSaving(true)
    const supabase = createClient()
    await supabase.from("erp_contracts").insert({
      title: form.title, party: form.party, type: form.type, status: form.status,
      value: form.value ? parseFloat(form.value) : null,
      start_date: form.start_date || null, end_date: form.end_date || null, notes: form.notes || null,
    })
    setForm({ title: "", party: "", type: TYPES[0], status: STATUSES[1], value: "", start_date: "", end_date: "", notes: "" })
    setAdding(false); setSaving(false); load()
  }

  async function updateStatus(id: string, status: string) {
    const supabase = createClient()
    await supabase.from("erp_contracts").update({ status }).eq("id", id)
    load()
  }

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  const active = rows.filter(r => r.status === "Active").length
  const totalValue = rows.filter(r => r.value).reduce((s, r) => s + (r.value ?? 0), 0)

  function fmt(n: number) { return n >= 100000 ? `₹${(n/100000).toFixed(1)}L` : `₹${n.toLocaleString()}` }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">Contract Repository</h1>
          <p className="text-muted-foreground text-sm">Vendor, partner, employment, and NDA contracts.</p>
        </div>
        <Button size="sm" className="gap-1.5 rounded-xl font-bold" onClick={() => setAdding(true)}>
          <Plus className="h-4 w-4" /> Add Contract
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums">{rows.length}</p><p className="text-xs text-muted-foreground mt-0.5">Total contracts</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums text-emerald-600">{active}</p><p className="text-xs text-muted-foreground mt-0.5">Active</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums">{totalValue ? fmt(totalValue) : "—"}</p><p className="text-xs text-muted-foreground mt-0.5">Total contract value</p></CardContent></Card>
      </div>

      {adding && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-black">Add Contract</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <div className="space-y-1 col-span-2 sm:col-span-1"><label className="text-xs font-bold text-muted-foreground">Contract Title *</label><Input value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} placeholder="e.g. AWS Service Agreement" /></div>
            <div className="space-y-1"><label className="text-xs font-bold text-muted-foreground">Counter-party *</label><Input value={form.party} onChange={e => setForm(p => ({...p, party: e.target.value}))} placeholder="Company / Person" /></div>
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
            <div className="space-y-1"><label className="text-xs font-bold text-muted-foreground">Value (₹)</label><Input type="number" value={form.value} onChange={e => setForm(p => ({...p, value: e.target.value}))} /></div>
            <div className="space-y-1"><label className="text-xs font-bold text-muted-foreground">Start Date</label><Input type="date" value={form.start_date} onChange={e => setForm(p => ({...p, start_date: e.target.value}))} /></div>
            <div className="space-y-1"><label className="text-xs font-bold text-muted-foreground">End Date</label><Input type="date" value={form.end_date} onChange={e => setForm(p => ({...p, end_date: e.target.value}))} /></div>
            <div className="space-y-1 col-span-2"><label className="text-xs font-bold text-muted-foreground">Notes</label><Input value={form.notes} onChange={e => setForm(p => ({...p, notes: e.target.value}))} placeholder="Key terms, renewal clauses..." /></div>
            <div className="col-span-2 flex gap-2">
              <Button className="h-9 rounded-lg font-bold" onClick={handleAdd} disabled={saving}>{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}</Button>
              <Button variant="ghost" className="h-9 rounded-lg font-bold" onClick={() => setAdding(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60">
                <th className="text-left px-4 py-2.5 text-xs font-black text-muted-foreground">Contract</th>
                <th className="text-left px-4 py-2.5 text-xs font-black text-muted-foreground hidden sm:table-cell">Type</th>
                <th className="text-left px-4 py-2.5 text-xs font-black text-muted-foreground hidden md:table-cell">Expires</th>
                <th className="text-right px-4 py-2.5 text-xs font-black text-muted-foreground hidden sm:table-cell">Value</th>
                <th className="text-center px-4 py-2.5 text-xs font-black text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && <tr><td colSpan={5} className="text-center py-10 text-muted-foreground text-sm">No contracts yet.</td></tr>}
              {rows.map(r => (
                <tr key={r.id} className="border-b border-border/40 last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="font-bold text-xs leading-tight">{r.title}</p>
                        <p className="text-[10px] text-muted-foreground">{r.party}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell"><Badge variant="outline" className="text-[10px] font-bold">{r.type}</Badge></td>
                  <td className="px-4 py-3 text-xs text-muted-foreground hidden md:table-cell">{r.end_date ? new Date(r.end_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" }) : "—"}</td>
                  <td className="px-4 py-3 text-right text-xs font-bold tabular-nums hidden sm:table-cell">{r.value ? fmt(r.value) : "—"}</td>
                  <td className="px-4 py-3 text-center">
                    <select className={`h-7 rounded-lg border border-transparent text-[10px] font-bold px-1.5 ${STATUS_COLOR[r.status ?? ""] ?? "bg-slate-100"}`}
                      value={r.status ?? STATUSES[0]} onChange={e => updateStatus(r.id, e.target.value)}>
                      {STATUSES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
