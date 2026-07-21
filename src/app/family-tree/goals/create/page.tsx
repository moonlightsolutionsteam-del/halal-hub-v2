"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Target, Plus, Trash2, Loader2, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

type Goal = {
  id: string
  title: string
  category: string
  target_date: string | null
  progress: number
  target: number
  status: string
  creator_name: string | null
  created_at: string
}

const CATEGORIES = ["Spiritual", "Health", "Education", "Finance", "Family", "Charity", "General"]

function fmtDate(d: string | null) {
  if (!d) return null
  return new Date(d).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })
}

export default function FamilyGoalsPage() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [groupId, setGroupId] = React.useState<string | null>(null)
  const [goals, setGoals] = React.useState<Goal[]>([])
  const [loading, setLoading] = React.useState(true)
  const [showAdd, setShowAdd] = React.useState(false)
  const [saving, setSaving] = React.useState(false)

  const [title, setTitle] = React.useState("")
  const [category, setCategory] = React.useState("General")
  const [targetDate, setTargetDate] = React.useState("")

  React.useEffect(() => {
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    async function load() {
      const { data: myRow } = await (supabase as any)
        .from("family_members").select("group_id").eq("user_id", user!.uid).maybeSingle()
      if (!myRow) { setLoading(false); return }
      setGroupId(myRow.group_id)
      const { data } = await (supabase as any)
        .from("family_goals")
        .select("id, title, category, target_date, progress, target, status, creator_name, created_at")
        .eq("group_id", myRow.group_id)
        .order("created_at", { ascending: false })
      setGoals(data ?? [])
      setLoading(false)
    }
    load()
  }, [user?.uid])

  const handleAdd = async () => {
    if (!title.trim() || !groupId) return
    setSaving(true)
    const supabase = createClient()
    const { data, error } = await (supabase as any)
      .from("family_goals")
      .insert({
        group_id: groupId,
        title: title.trim(),
        category,
        target_date: targetDate || null,
        progress: 0,
        target: 100,
        status: "active",
        created_by: user?.uid,
        creator_name: user?.name ?? user?.email ?? "Member",
      })
      .select("id, title, category, target_date, progress, target, status, creator_name, created_at")
      .single()

    if (error) {
      toast({ title: "Failed to save", description: error.message, variant: "destructive" })
    } else {
      setGoals(prev => [data, ...prev])
      setTitle(""); setCategory("General"); setTargetDate("")
      setShowAdd(false)
      toast({ title: "Goal set!" })
    }
    setSaving(false)
  }

  const handleProgress = async (goal: Goal, delta: number) => {
    const newProgress = Math.max(0, Math.min(goal.target, goal.progress + delta))
    const newStatus = newProgress >= goal.target ? "completed" : "active"
    const supabase = createClient()
    await (supabase as any).from("family_goals").update({ progress: newProgress, status: newStatus }).eq("id", goal.id)
    setGoals(prev => prev.map(g => g.id === goal.id ? { ...g, progress: newProgress, status: newStatus } : g))
  }

  const handleDelete = async (id: string) => {
    const supabase = createClient()
    await (supabase as any).from("family_goals").delete().eq("id", id)
    setGoals(prev => prev.filter(g => g.id !== id))
    toast({ title: "Goal removed" })
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  )

  const active = goals.filter(g => g.status === "active")
  const completed = goals.filter(g => g.status === "completed")

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-2xl space-y-5 pb-24">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href="/family-tree" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground mb-3 w-fit">
            <ArrowLeft className="h-4 w-4" /> Back to Hub
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-teal-100 dark:bg-teal-950/40 flex items-center justify-center text-teal-600">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black">Family Goals</h1>
              <p className="text-xs text-muted-foreground font-bold">{active.length} active · {completed.length} completed</p>
            </div>
          </div>
        </div>
        <Button onClick={() => setShowAdd(v => !v)} className="rounded-full h-10 px-5 font-black bg-teal-600 hover:bg-teal-700 text-white shadow-lg mt-8">
          {showAdd ? <X className="h-4 w-4" /> : <><Plus className="h-4 w-4 mr-1.5" /> Add</>}
        </Button>
      </div>

      {showAdd && (
        <Card className="rounded-2xl border-none shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
          <CardContent className="p-5 space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Goal</Label>
              <Input placeholder="e.g. Read Quran together every week" className="h-12 rounded-xl bg-muted border-none font-bold"
                value={title} onChange={e => setTitle(e.target.value)} autoFocus />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Category</Label>
              <div className="flex gap-2 flex-wrap">
                {CATEGORIES.map(c => (
                  <button key={c} onClick={() => setCategory(c)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors ${category === c ? "bg-teal-600 text-white" : "bg-muted text-muted-foreground"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Target Date (optional)</Label>
              <Input type="date" className="h-11 rounded-xl bg-muted border-none font-medium"
                value={targetDate} onChange={e => setTargetDate(e.target.value)} />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleAdd} disabled={saving || !title.trim()} className="rounded-xl h-10 px-6 font-black bg-teal-600 hover:bg-teal-700 text-white">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Set Goal"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {!groupId && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <Target className="h-10 w-10 text-muted-foreground/20" />
          <p className="font-black">No family group yet</p>
          <Button asChild className="rounded-xl font-bold"><Link href="/family-tree/setup">Set Up Family Hub</Link></Button>
        </div>
      )}

      {groupId && goals.length === 0 && !showAdd && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <Target className="h-10 w-10 text-muted-foreground/20" />
          <p className="font-black">No goals yet</p>
          <p className="text-sm text-muted-foreground">Set shared goals to keep the family aligned.</p>
        </div>
      )}

      {[{ label: "Active", items: active }, { label: "Completed", items: completed }].map(({ label, items }) =>
        items.length > 0 ? (
          <div key={label} className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</p>
            {items.map(goal => {
              const pct = Math.round((goal.progress / goal.target) * 100)
              return (
                <Card key={goal.id} className="rounded-2xl border-none shadow-sm group">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-black text-sm">{goal.title}</p>
                          <Badge className="bg-teal-100 text-teal-700 dark:bg-teal-950/40 border-none text-[9px] font-black uppercase">{goal.category}</Badge>
                        </div>
                        <p className="text-[11px] text-muted-foreground font-medium mt-0.5">
                          {goal.creator_name}{goal.target_date ? ` · Due ${fmtDate(goal.target_date)}` : ""}
                        </p>
                      </div>
                      <button onClick={() => handleDelete(goal.id)}
                        className="h-8 w-8 rounded-xl flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors opacity-0 group-hover:opacity-100 shrink-0">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-muted-foreground uppercase">{pct}% complete</span>
                        {goal.status === "active" && (
                          <div className="flex gap-1">
                            <button onClick={() => handleProgress(goal, -10)}
                              className="h-6 w-6 rounded-lg bg-muted text-muted-foreground text-xs font-black hover:bg-muted/80 transition-colors">−</button>
                            <button onClick={() => handleProgress(goal, 10)}
                              className="h-6 w-6 rounded-lg bg-teal-100 text-teal-700 dark:bg-teal-950/40 text-xs font-black hover:bg-teal-200 transition-colors">+</button>
                          </div>
                        )}
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-teal-600 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : null
      )}
    </div>
  )
}
