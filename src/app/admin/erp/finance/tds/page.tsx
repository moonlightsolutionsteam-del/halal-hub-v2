"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Plus } from "lucide-react"

const SECTIONS = ["194C – Contractors","194J – Professionals","194I – Rent","192 – Salary","194Q – Purchase","194H – Commission"]

type TdsRow = { id: string; section: string; deductee: string; amount: number | null; tds_rate: number | null; tds_amount: number | null; quarter: string | null; filed: boolean | null }

export default function TdsPage() {
  const [rows, setRows] = React.useState<TdsRow[]>([])
  const [loading, setLoading] = React.useState(true)
  const [adding, setAdding] = React.useState(false)
  const [form, setForm] = React.useState({ section: SECTIONS[0], deductee: "", amount: "", tds_rate: "10", quarter: "Q1 FY26" })
  const [saving, setSaving] = React.useState(false)

  const load = React.useCallback(() => {
    const supabase = createClient()
    supabase.from("erp_tds").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setRows(data ?? [])
      setLoading(false)
    })
  }, [])

  React.useEffect(() => { load() }, [load])

  async function handleAdd() {
    if (!form.deductee || !form.amount) return
    setSaving(true)
    const supabase = createClient()
    const amt = parseFloat(form.amount)
    const rate = parseFloat(form.tds_rate)
    const tds_amount = Math.round((amt * rate) / 100)
    await supabase.from("erp_tds").insert({ section: form.section, deductee: form.deductee, amount: amt, tds_rate: rate, tds_amount, quarter: form.quarter, filed: false })
    setForm({ section: SECTIONS[0], deductee: "", amount: "", tds_rate: "10", quarter: "Q1 FY26" })
    setAdding(false); setSaving(false); load()
  }

  async function toggleFiled(id: string, current: boolean | null) {
    const supabase = createClient()
    await supabase.from("erp_tds").update({ filed: !current }).eq("id", id)
    load()
  }

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  const totalTds = rows.reduce((s, r) => s + (r.tds_amount ?? 0), 0)
  const unfiledTds = rows.filter(r => !r.filed).reduce((s, r) => s + (r.tds_amount ?? 0), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">TDS Management</h1>
          <p className="text-muted-foreground text-sm">Tax Deducted at Source tracking and filing status.</p>
        </div>
        <Button size="sm" className="gap-1.5 rounded-xl font-bold" onClick={() => setAdding(true)}>
          <Plus className="h-4 w-4" /> Add Entry
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums">{rows.length}</p><p className="text-xs text-muted-foreground mt-0.5">Total entries</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums text-red-500">₹{unfiledTds.toLocaleString()}</p><p className="text-xs text-muted-foreground mt-0.5">TDS pending filing</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums text-emerald-600">₹{totalTds.toLocaleString()}</p><p className="text-xs text-muted-foreground mt-0.5">Total TDS deducted</p></CardContent></Card>
      </div>

      {adding && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-black">Add TDS Entry</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <div className="space-y-1 col-span-2 sm:col-span-1"><label className="text-xs font-bold text-muted-foreground">Section</label>
              <select className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium" value={form.section} onChange={e => setForm(p => ({...p, section: e.target.value}))}>
                {SECTIONS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-1"><label className="text-xs font-bold text-muted-foreground">Quarter</label><Input value={form.quarter} onChange={e => setForm(p => ({...p, quarter: e.target.value}))} placeholder="Q1 FY26" /></div>
            <div className="space-y-1 col-span-2 sm:col-span-1"><label className="text-xs font-bold text-muted-foreground">Deductee Name *</label><Input value={form.deductee} onChange={e => setForm(p => ({...p, deductee: e.target.value}))} placeholder="Vendor / Employee name" /></div>
            <div className="space-y-1"><label className="text-xs font-bold text-muted-foreground">Payment Amount (₹) *</label><Input type="number" value={form.amount} onChange={e => setForm(p => ({...p, amount: e.target.value}))} /></div>
            <div className="space-y-1"><label className="text-xs font-bold text-muted-foreground">TDS Rate (%)</label><Input type="number" value={form.tds_rate} onChange={e => setForm(p => ({...p, tds_rate: e.target.value}))} /></div>
            {form.amount && form.tds_rate && <p className="text-xs text-muted-foreground col-span-2">TDS to deduct: <strong>₹{Math.round(parseFloat(form.amount) * parseFloat(form.tds_rate) / 100).toLocaleString()}</strong></p>}
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
                <th className="text-left px-4 py-2.5 text-xs font-black text-muted-foreground">Deductee</th>
                <th className="text-left px-4 py-2.5 text-xs font-black text-muted-foreground hidden sm:table-cell">Section</th>
                <th className="text-left px-4 py-2.5 text-xs font-black text-muted-foreground hidden sm:table-cell">Quarter</th>
                <th className="text-right px-4 py-2.5 text-xs font-black text-muted-foreground">TDS Amount</th>
                <th className="text-center px-4 py-2.5 text-xs font-black text-muted-foreground">Filed</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && <tr><td colSpan={5} className="text-center py-10 text-muted-foreground text-sm">No TDS entries yet.</td></tr>}
              {rows.map(r => (
                <tr key={r.id} className="border-b border-border/40 last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-bold">{r.deductee}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground hidden sm:table-cell">{r.section}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground hidden sm:table-cell">{r.quarter}</td>
                  <td className="px-4 py-3 text-right font-black tabular-nums">₹{(r.tds_amount ?? 0).toLocaleString()}</td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggleFiled(r.id, r.filed)}
                      className={`text-xs font-bold px-2 py-0.5 rounded-full transition-colors ${r.filed ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700 hover:bg-amber-100 hover:text-amber-700"}`}>
                      {r.filed ? "Filed" : "Pending"}
                    </button>
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
