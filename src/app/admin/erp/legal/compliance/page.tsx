// @ts-nocheck
"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Plus, Calendar } from "lucide-react"

const CATEGORIES = ["MCA / ROC","GST / Tax","Labour","Trademark / IP","DPDP","RBI / FEMA","SEBI","Other"]
const STATUSES = ["Pending","Filed","Overdue","Waived"]
const STATUS_COLOR: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700",
  Filed: "bg-emerald-100 text-emerald-700",
  Overdue: "bg-red-100 text-red-700",
  Waived: "bg-slate-100 text-slate-600",
}

type Filing = { id: string; title: string; category: string | null; due_date: string | null; status: string | null; frequency: string | null; notes: string | null }

export default function CompliancePage() {
  const [rows, setRows] = React.useState<Filing[]>([])
  const [loading, setLoading] = React.useState(true)
  const [adding, setAdding] = React.useState(false)
  const [form, setForm] = React.useState({ title: "", category: CATEGORIES[0], due_date: "", status: STATUSES[0], frequency: "Annual", notes: "" })
  const [saving, setSaving] = React.useState(false)

  const load = React.useCallback(() => {
    const supabase = createClient()
    supabase.from("erp_compliance").select("*").order("due_date", { ascending: true }).then(({ data }) => {
      setRows(data ?? []); setLoading(false)
    })
  }, [])

  React.useEffect(() => { load() }, [load])

  async function handleAdd() {
    if (!form.title) return
    setSaving(true)
    const supabase = createClient()
    await supabase.from("erp_compliance").insert({ title: form.title, category: form.category, due_date: form.due_date || null, status: form.status, frequency: form.frequency || null, notes: form.notes || null })
    setForm({ title: "", category: CATEGORIES[0], due_date: "", status: STATUSES[0], frequency: "Annual", notes: "" })
    setAdding(false); setSaving(false); load()
  }

  async function updateStatus(id: string, status: string) {
    const supabase = createClient()
    await supabase.from("erp_compliance").update({ status }).eq("id", id)
    load()
  }

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  const overdue = rows.filter(r => r.status === "Overdue").length
  const pending = rows.filter(r => r.status === "Pending").length

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">Compliance Calendar</h1>
          <p className="text-muted-foreground text-sm">Regulatory deadlines, filings, and statutory obligations.</p>
        </div>
        <Button size="sm" className="gap-1.5 rounded-xl font-bold" onClick={() => setAdding(true)}>
          <Plus className="h-4 w-4" /> Add Filing
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums">{rows.length}</p><p className="text-xs text-muted-foreground mt-0.5">Total obligations</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className={`text-xl font-black tabular-nums ${overdue > 0 ? "text-red-600" : ""}`}>{overdue}</p><p className="text-xs text-muted-foreground mt-0.5">Overdue</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className={`text-xl font-black tabular-nums ${pending > 0 ? "text-amber-600" : ""}`}>{pending}</p><p className="text-xs text-muted-foreground mt-0.5">Pending</p></CardContent></Card>
      </div>

      {adding && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-black">Add Compliance Filing</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <div className="space-y-1 col-span-2"><label className="text-xs font-bold text-muted-foreground">Filing / Obligation *</label><Input value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} placeholder="e.g. Annual Return MCA Form MGT-7" /></div>
            <div className="space-y-1"><label className="text-xs font-bold text-muted-foreground">Category</label>
              <select className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium" value={form.category} onChange={e => setForm(p => ({...p, category: e.target.value}))}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1"><label className="text-xs font-bold text-muted-foreground">Frequency</label><Input value={form.frequency} onChange={e => setForm(p => ({...p, frequency: e.target.value}))} placeholder="Annual / Monthly / Quarterly" /></div>
            <div className="space-y-1"><label className="text-xs font-bold text-muted-foreground">Due Date</label><Input type="date" value={form.due_date} onChange={e => setForm(p => ({...p, due_date: e.target.value}))} /></div>
            <div className="space-y-1"><label className="text-xs font-bold text-muted-foreground">Status</label>
              <select className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium" value={form.status} onChange={e => setForm(p => ({...p, status: e.target.value}))}>
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-1 col-span-2"><label className="text-xs font-bold text-muted-foreground">Notes</label><Input value={form.notes} onChange={e => setForm(p => ({...p, notes: e.target.value}))} placeholder="Applicable authority, penalty for delay..." /></div>
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
                <th className="text-left px-4 py-2.5 text-xs font-black text-muted-foreground">Filing</th>
                <th className="text-left px-4 py-2.5 text-xs font-black text-muted-foreground hidden sm:table-cell">Category</th>
                <th className="text-left px-4 py-2.5 text-xs font-black text-muted-foreground hidden md:table-cell">Due</th>
                <th className="text-center px-4 py-2.5 text-xs font-black text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && <tr><td colSpan={4} className="text-center py-10 text-muted-foreground text-sm">No filings yet.</td></tr>}
              {rows.map(r => (
                <tr key={r.id} className="border-b border-border/40 last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="font-bold text-xs">{r.title}</p>
                        {r.frequency && <p className="text-[10px] text-muted-foreground">{r.frequency}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground hidden sm:table-cell">{r.category}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground hidden md:table-cell">
                    {r.due_date ? new Date(r.due_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" }) : "—"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <select className={`h-7 rounded-lg border border-transparent text-[10px] font-bold px-1.5 ${STATUS_COLOR[r.status ?? ""] ?? ""}`}
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
