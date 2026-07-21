"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Wallet, Plus, Trash2, Loader2, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

type Expense = {
  id: string
  title: string
  amount: number
  category: string
  paid_by_name: string | null
  split: boolean
  notes: string | null
  expense_date: string
  created_at: string
}

const CATEGORIES = ["Food", "Utilities", "Transport", "Shopping", "Events", "Education", "Health", "General"]

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString([], { month: "short", day: "numeric" })
}

export default function FamilyExpensesPage() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [groupId, setGroupId] = React.useState<string | null>(null)
  const [expenses, setExpenses] = React.useState<Expense[]>([])
  const [loading, setLoading] = React.useState(true)
  const [showAdd, setShowAdd] = React.useState(false)
  const [saving, setSaving] = React.useState(false)

  const [title, setTitle] = React.useState("")
  const [amount, setAmount] = React.useState("")
  const [category, setCategory] = React.useState("General")
  const [split, setSplit] = React.useState(false)
  const [notes, setNotes] = React.useState("")
  const [expDate, setExpDate] = React.useState(() => new Date().toISOString().slice(0, 10))

  React.useEffect(() => {
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    async function load() {
      const { data: myRow } = await (supabase as any)
        .from("family_members").select("group_id").eq("user_id", user!.uid).maybeSingle()
      if (!myRow) { setLoading(false); return }
      setGroupId(myRow.group_id)
      const { data } = await (supabase as any)
        .from("family_expenses")
        .select("id, title, amount, category, paid_by_name, split, notes, expense_date, created_at")
        .eq("group_id", myRow.group_id)
        .order("expense_date", { ascending: false })
      setExpenses(data ?? [])
      setLoading(false)
    }
    load()
  }, [user?.uid])

  const handleAdd = async () => {
    const amt = parseFloat(amount)
    if (!title.trim() || isNaN(amt) || !groupId) return
    setSaving(true)
    const supabase = createClient()
    const { data, error } = await (supabase as any)
      .from("family_expenses")
      .insert({
        group_id: groupId,
        title: title.trim(),
        amount: amt,
        category,
        paid_by: user?.uid,
        paid_by_name: user?.name ?? user?.email ?? "Me",
        split,
        notes: notes.trim() || null,
        expense_date: expDate,
      })
      .select("id, title, amount, category, paid_by_name, split, notes, expense_date, created_at")
      .single()

    if (error) {
      toast({ title: "Failed to save", description: error.message, variant: "destructive" })
    } else {
      setExpenses(prev => [data, ...prev])
      setTitle(""); setAmount(""); setCategory("General"); setSplit(false); setNotes("")
      setShowAdd(false)
      toast({ title: "Expense added!" })
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    const supabase = createClient()
    await (supabase as any).from("family_expenses").delete().eq("id", id)
    setExpenses(prev => prev.filter(e => e.id !== id))
    toast({ title: "Expense removed" })
  }

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0)

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  )

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-2xl space-y-5 pb-24">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href="/family-tree" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground mb-3 w-fit">
            <ArrowLeft className="h-4 w-4" /> Back to Hub
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-violet-100 dark:bg-violet-950/40 flex items-center justify-center text-violet-600">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black">Family Expenses</h1>
              <p className="text-xs text-muted-foreground font-bold">{expenses.length} expense{expenses.length !== 1 ? "s" : ""} · Total: <span className="text-foreground">${total.toFixed(2)}</span></p>
            </div>
          </div>
        </div>
        <Button onClick={() => setShowAdd(v => !v)} className="rounded-full h-10 px-5 font-black bg-violet-600 hover:bg-violet-700 text-white shadow-lg mt-8">
          {showAdd ? <X className="h-4 w-4" /> : <><Plus className="h-4 w-4 mr-1.5" /> Add</>}
        </Button>
      </div>

      {showAdd && (
        <Card className="rounded-2xl border-none shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
          <CardContent className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5 col-span-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Description</Label>
                <Input placeholder="e.g. Eid dinner groceries" className="h-12 rounded-xl bg-muted border-none font-bold"
                  value={title} onChange={e => setTitle(e.target.value)} autoFocus />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Amount</Label>
                <Input type="number" placeholder="0.00" className="h-11 rounded-xl bg-muted border-none font-bold text-lg"
                  value={amount} onChange={e => setAmount(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Date</Label>
                <Input type="date" className="h-11 rounded-xl bg-muted border-none font-medium"
                  value={expDate} onChange={e => setExpDate(e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Category</Label>
              <div className="flex gap-2 flex-wrap">
                {CATEGORIES.map(c => (
                  <button key={c} onClick={() => setCategory(c)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors ${category === c ? "bg-violet-600 text-white" : "bg-muted text-muted-foreground"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setSplit(v => !v)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-colors ${split ? "bg-violet-100 text-violet-700 dark:bg-violet-950/40" : "bg-muted text-muted-foreground"}`}>
                Split equally
              </button>
              <span className="text-xs text-muted-foreground font-medium">Mark if this expense should be divided among all members.</span>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Notes (optional)</Label>
              <Textarea placeholder="Any extra details…" className="rounded-xl bg-muted border-none resize-none min-h-[60px] font-medium"
                value={notes} onChange={e => setNotes(e.target.value)} />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleAdd} disabled={saving || !title.trim() || !amount} className="rounded-xl h-10 px-6 font-black bg-violet-600 hover:bg-violet-700 text-white">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Expense"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {!groupId && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <Wallet className="h-10 w-10 text-muted-foreground/20" />
          <p className="font-black">No family group yet</p>
          <Button asChild className="rounded-xl font-bold"><Link href="/family-tree/setup">Set Up Family Hub</Link></Button>
        </div>
      )}

      {groupId && expenses.length === 0 && !showAdd && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <Wallet className="h-10 w-10 text-muted-foreground/20" />
          <p className="font-black">No expenses yet</p>
          <p className="text-sm text-muted-foreground">Track shared family expenses.</p>
        </div>
      )}

      {expenses.length > 0 && (
        <div className="space-y-2">
          {expenses.map(exp => (
            <Card key={exp.id} className="rounded-2xl border-none shadow-sm group">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-black text-sm truncate">{exp.title}</p>
                    {exp.split && <Badge className="bg-violet-100 text-violet-700 dark:bg-violet-950/40 border-none text-[9px] font-black uppercase">Split</Badge>}
                  </div>
                  <p className="text-[11px] text-muted-foreground font-medium">{exp.category} · {exp.paid_by_name} · {fmtDate(exp.expense_date)}</p>
                </div>
                <p className="font-black text-base text-foreground shrink-0">${Number(exp.amount).toFixed(2)}</p>
                <button onClick={() => handleDelete(exp.id)}
                  className="h-8 w-8 rounded-xl flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors opacity-0 group-hover:opacity-100 shrink-0">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
