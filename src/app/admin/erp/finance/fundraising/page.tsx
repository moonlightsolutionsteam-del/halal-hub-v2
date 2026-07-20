// @ts-nocheck
"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Plus } from "lucide-react"

const STAGES = ["Identified","Introductory Meeting","Due Diligence","Term Sheet","Closed","Passed"]
const STAGE_COLOR: Record<string, string> = {
  "Identified": "bg-slate-100 text-slate-700",
  "Introductory Meeting": "bg-blue-100 text-blue-700",
  "Due Diligence": "bg-amber-100 text-amber-700",
  "Term Sheet": "bg-purple-100 text-purple-700",
  "Closed": "bg-emerald-100 text-emerald-700",
  "Passed": "bg-red-100 text-red-700",
}

type FundRow = { id: string; investor_name: string; fund_name: string | null; amount: number | null; stage: string | null; notes: string | null; created_at: string | null }

function fmt(n: number) { return n >= 10000000 ? `₹${(n/10000000).toFixed(1)}Cr` : n >= 100000 ? `₹${(n/100000).toFixed(1)}L` : `₹${n.toLocaleString()}` }

export default function FundraisingPage() {
  const [rows, setRows] = React.useState<FundRow[]>([])
  const [loading, setLoading] = React.useState(true)
  const [adding, setAdding] = React.useState(false)
  const [form, setForm] = React.useState({ investor_name: "", fund_name: "", amount: "", stage: STAGES[0], notes: "" })
  const [saving, setSaving] = React.useState(false)

  const load = React.useCallback(() => {
    const supabase = createClient()
    supabase.from("erp_fundraising").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setRows(data ?? [])
      setLoading(false)
    })
  }, [])

  React.useEffect(() => { load() }, [load])

  async function handleAdd() {
    if (!form.investor_name) return
    setSaving(true)
    const supabase = createClient()
    await supabase.from("erp_fundraising").insert({
      investor_name: form.investor_name,
      fund_name: form.fund_name || null,
      amount: form.amount ? parseFloat(form.amount) : null,
      stage: form.stage,
      notes: form.notes || null,
    })
    setForm({ investor_name: "", fund_name: "", amount: "", stage: STAGES[0], notes: "" })
    setAdding(false); setSaving(false); load()
  }

  async function updateStage(id: string, stage: string) {
    const supabase = createClient()
    await supabase.from("erp_fundraising").update({ stage }).eq("id", id)
    load()
  }

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  const totalPipeline = rows.filter(r => r.stage !== "Passed").reduce((s, r) => s + (r.amount ?? 0), 0)
  const totalClosed = rows.filter(r => r.stage === "Closed").reduce((s, r) => s + (r.amount ?? 0), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">Fundraising Pipeline</h1>
          <p className="text-muted-foreground text-sm">Investor relations and capital raise tracking.</p>
        </div>
        <Button size="sm" className="gap-1.5 rounded-xl font-bold" onClick={() => setAdding(true)}>
          <Plus className="h-4 w-4" /> Add Investor
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums">{rows.length}</p><p className="text-xs text-muted-foreground mt-0.5">Investors tracked</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums text-primary">{fmt(totalPipeline)}</p><p className="text-xs text-muted-foreground mt-0.5">Total pipeline value</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums text-emerald-600">{fmt(totalClosed)}</p><p className="text-xs text-muted-foreground mt-0.5">Closed</p></CardContent></Card>
      </div>

      {adding && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-black">Add Investor</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <div className="space-y-1"><label className="text-xs font-bold text-muted-foreground">Investor Name *</label><Input value={form.investor_name} onChange={e => setForm(p => ({...p, investor_name: e.target.value}))} placeholder="Sequoia India" /></div>
            <div className="space-y-1"><label className="text-xs font-bold text-muted-foreground">Fund / Firm</label><Input value={form.fund_name} onChange={e => setForm(p => ({...p, fund_name: e.target.value}))} placeholder="Fund IV" /></div>
            <div className="space-y-1"><label className="text-xs font-bold text-muted-foreground">Amount (₹)</label><Input type="number" value={form.amount} onChange={e => setForm(p => ({...p, amount: e.target.value}))} placeholder="5000000" /></div>
            <div className="space-y-1"><label className="text-xs font-bold text-muted-foreground">Stage</label>
              <select className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium" value={form.stage} onChange={e => setForm(p => ({...p, stage: e.target.value}))}>
                {STAGES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-1 col-span-2"><label className="text-xs font-bold text-muted-foreground">Notes</label><Input value={form.notes} onChange={e => setForm(p => ({...p, notes: e.target.value}))} placeholder="Optional notes" /></div>
            <div className="col-span-2 flex gap-2">
              <Button className="h-9 rounded-lg font-bold" onClick={handleAdd} disabled={saving}>{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}</Button>
              <Button variant="ghost" className="h-9 rounded-lg font-bold" onClick={() => setAdding(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {rows.length === 0 && <p className="text-sm text-muted-foreground text-center py-10">No investors tracked yet.</p>}
        {rows.map(r => (
          <Card key={r.id}>
            <CardContent className="p-4 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="font-black text-foreground">{r.investor_name}</p>
                {r.fund_name && <p className="text-xs text-muted-foreground">{r.fund_name}</p>}
                {r.notes && <p className="text-xs text-muted-foreground italic">{r.notes}</p>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {r.amount && <span className="text-sm font-black tabular-nums">{fmt(r.amount)}</span>}
                <select
                  className="h-7 rounded-lg border border-input bg-background px-2 text-xs font-bold"
                  value={r.stage ?? STAGES[0]}
                  onChange={e => updateStage(r.id, e.target.value)}
                >
                  {STAGES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
