// @ts-nocheck
"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Plus } from "lucide-react"

const DEPARTMENTS = ["Engineering","HR","Marketing","Operations","Finance","Legal","Sales","Design","Support","Infrastructure"]

type BudgetRow = { id: string; department: string; allocated: number | null; spent: number | null; period: string | null }

export default function BudgetPage() {
  const [rows, setRows] = React.useState<BudgetRow[]>([])
  const [loading, setLoading] = React.useState(true)
  const [adding, setAdding] = React.useState(false)
  const [dept, setDept] = React.useState(DEPARTMENTS[0])
  const [allocated, setAllocated] = React.useState("")
  const [period, setPeriod] = React.useState(() => {
    const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`
  })
  const [saving, setSaving] = React.useState(false)

  const load = React.useCallback(() => {
    const supabase = createClient()
    supabase.from("erp_budget").select("*").order("period", { ascending: false }).then(({ data }) => {
      setRows(data ?? []); setLoading(false)
    })
  }, [])

  React.useEffect(() => { load() }, [load])

  async function handleAdd() {
    if (!allocated) return
    setSaving(true)
    const supabase = createClient()
    await supabase.from("erp_budget").upsert({ department: dept, allocated: parseFloat(allocated), spent: 0, period }, { onConflict: "department,period" })
    setAllocated(""); setAdding(false); setSaving(false); load()
  }

  async function logSpend(id: string, current: number | null, amount: number) {
    const supabase = createClient()
    await supabase.from("erp_budget").update({ spent: (current ?? 0) + amount }).eq("id", id)
    load()
  }

  const totalAllocated = rows.reduce((s, r) => s + (r.allocated ?? 0), 0)
  const totalSpent = rows.reduce((s, r) => s + (r.spent ?? 0), 0)

  function fmt(n: number) { return n >= 100000 ? `₹${(n/100000).toFixed(1)}L` : n >= 1000 ? `₹${(n/1000).toFixed(0)}K` : `₹${n.toFixed(0)}` }

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">Budget Management</h1>
          <p className="text-muted-foreground text-sm">Departmental budgets, allocations, and variance tracking.</p>
        </div>
        <Button size="sm" className="gap-1.5 rounded-xl font-bold" onClick={() => setAdding(true)}>
          <Plus className="h-4 w-4" /> Add Budget
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums text-primary">{fmt(totalAllocated)}</p><p className="text-xs text-muted-foreground mt-0.5">Total Allocated</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums text-red-500">{fmt(totalSpent)}</p><p className="text-xs text-muted-foreground mt-0.5">Total Spent</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums text-emerald-600">{fmt(Math.max(totalAllocated - totalSpent, 0))}</p><p className="text-xs text-muted-foreground mt-0.5">Remaining</p></CardContent></Card>
      </div>

      {adding && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-black">Add / Update Budget</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-3 items-end">
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Department</label>
              <select className="h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium" value={dept} onChange={e => setDept(e.target.value)}>
                {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Period (YYYY-MM)</label>
              <Input className="w-32 h-9" value={period} onChange={e => setPeriod(e.target.value)} placeholder="2025-07" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Allocated (₹)</label>
              <Input className="w-32 h-9" type="number" value={allocated} onChange={e => setAllocated(e.target.value)} placeholder="500000" />
            </div>
            <Button className="h-9 rounded-lg font-bold" onClick={handleAdd} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
            </Button>
            <Button variant="ghost" className="h-9 rounded-lg font-bold" onClick={() => setAdding(false)}>Cancel</Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60">
                <th className="text-left px-4 py-2.5 text-xs font-black text-muted-foreground">Department</th>
                <th className="text-left px-4 py-2.5 text-xs font-black text-muted-foreground hidden sm:table-cell">Period</th>
                <th className="text-right px-4 py-2.5 text-xs font-black text-muted-foreground">Allocated</th>
                <th className="text-right px-4 py-2.5 text-xs font-black text-muted-foreground">Spent</th>
                <th className="text-right px-4 py-2.5 text-xs font-black text-muted-foreground">Remaining</th>
                <th className="px-4 py-2.5"></th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr><td colSpan={6} className="text-center py-10 text-muted-foreground text-sm">No budgets yet. Click "Add Budget" to start.</td></tr>
              )}
              {rows.map(r => {
                const alloc = r.allocated ?? 0
                const spent = r.spent ?? 0
                const rem = alloc - spent
                const pct = alloc > 0 ? Math.round((spent / alloc) * 100) : 0
                return (
                  <tr key={r.id} className="border-b border-border/40 last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 font-bold">{r.department}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs hidden sm:table-cell">{r.period}</td>
                    <td className="px-4 py-3 text-right tabular-nums font-medium">{fmt(alloc)}</td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      <span className={pct > 90 ? "text-red-600 font-black" : pct > 70 ? "text-amber-600 font-bold" : "font-medium"}>{fmt(spent)}</span>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      <Badge variant="outline" className={`text-xs font-bold ${rem < 0 ? "border-red-300 text-red-600" : rem < alloc*0.1 ? "border-amber-300 text-amber-600" : "border-emerald-300 text-emerald-600"}`}>
                        {fmt(Math.abs(rem))}{rem < 0 ? " over" : ""}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden ml-auto">
                        <div className={`h-full rounded-full ${pct > 90 ? "bg-red-500" : pct > 70 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
