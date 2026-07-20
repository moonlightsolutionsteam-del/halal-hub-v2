// @ts-nocheck
"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Plus, Trash2, BookOpen, Users } from "lucide-react"

const PROGRAM_TYPES = [
  "Quran Classes",
  "Hifz Programme",
  "Arabic Language",
  "Islamic Studies",
  "Youth Circle",
  "Women's Circle",
  "Children's Madrasa",
  "Adult Learning",
  "Weekend School",
  "Special Lecture Series",
  "Ramadan Programme",
  "Other",
]

const DAYS = ["Daily", "Weekdays", "Weekend", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

type Program = {
  id: string
  name: string
  program_type: string | null
  description: string | null
  instructor: string | null
  schedule_days: string | null
  schedule_time: string | null
  capacity: number | null
  fee: number | null
  is_free: boolean | null
  is_active: boolean | null
  created_at: string
}

export default function MosqueProgramsPage() {
  const { user } = useAuth()
  const [mosqueId, setMosqueId] = React.useState<string | null>(null)
  const [programs, setPrograms] = React.useState<Program[]>([])
  const [loading, setLoading] = React.useState(true)
  const [adding, setAdding] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [form, setForm] = React.useState({
    name: "",
    program_type: PROGRAM_TYPES[0],
    description: "",
    instructor: "",
    schedule_days: "Weekdays",
    schedule_time: "",
    capacity: "",
    is_free: true,
    fee: "",
    is_active: true,
  })

  const load = React.useCallback(() => {
    if (!user?.uid) return
    const supabase = createClient()
    supabase.from("businesses").select("id").eq("owner_id", user.uid).limit(1).maybeSingle()
      .then(({ data }: { data: { id: string } | null }) => {
        if (!data) { setLoading(false); return }
        setMosqueId(data.id)
        supabase.from("mosque_programs").select("*")
          .eq("mosque_id", data.id)
          .order("is_active", { ascending: false })
          .order("created_at", { ascending: true })
          .then(({ data: rows }) => { setPrograms(rows ?? []); setLoading(false) })
      })
  }, [user?.uid])

  React.useEffect(() => { load() }, [load])

  async function handleAdd() {
    if (!form.name.trim() || !mosqueId) return
    setSaving(true)
    await createClient().from("mosque_programs").insert({
      mosque_id: mosqueId,
      name: form.name.trim(),
      program_type: form.program_type,
      description: form.description.trim() || null,
      instructor: form.instructor.trim() || null,
      schedule_days: form.schedule_days || null,
      schedule_time: form.schedule_time || null,
      capacity: form.capacity ? parseInt(form.capacity) : null,
      is_free: form.is_free,
      fee: form.is_free ? null : (form.fee ? parseFloat(form.fee) : null),
      is_active: form.is_active,
    })
    setForm({ name: "", program_type: PROGRAM_TYPES[0], description: "", instructor: "", schedule_days: "Weekdays", schedule_time: "", capacity: "", is_free: true, fee: "", is_active: true })
    setAdding(false)
    setSaving(false)
    load()
  }

  async function toggleActive(id: string, current: boolean) {
    await createClient().from("mosque_programs").update({ is_active: !current }).eq("id", id)
    load()
  }

  async function handleDelete(id: string) {
    await createClient().from("mosque_programs").delete().eq("id", id)
    load()
  }

  if (loading) return (
    <div className="flex justify-center py-24">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )

  const active = programs.filter(p => p.is_active)
  const inactive = programs.filter(p => !p.is_active)

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">Programmes</h1>
          <p className="text-muted-foreground text-sm">Islamic education programmes, classes, and circles at your mosque.</p>
        </div>
        <Button size="sm" className="gap-1.5 rounded-xl font-bold" onClick={() => setAdding(true)}>
          <Plus className="h-4 w-4" /> Add Programme
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums">{programs.length}</p><p className="text-xs text-muted-foreground mt-0.5">Total</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums text-emerald-600">{active.length}</p><p className="text-xs text-muted-foreground mt-0.5">Active</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums text-primary">{programs.reduce((s, p) => s + (p.capacity ?? 0), 0)}</p><p className="text-xs text-muted-foreground mt-0.5">Total capacity</p></CardContent></Card>
      </div>

      {adding && (
        <Card>
          <CardContent className="pt-5 grid grid-cols-2 gap-3">
            <div className="space-y-1 col-span-2 sm:col-span-1">
              <label className="text-xs font-bold text-muted-foreground">Programme Name *</label>
              <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Weekend Quran Classes" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Type</label>
              <select className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium" value={form.program_type} onChange={e => setForm(p => ({ ...p, program_type: e.target.value }))}>
                {PROGRAM_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="space-y-1 col-span-2">
              <label className="text-xs font-bold text-muted-foreground">Description</label>
              <Textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Who is it for, what will they learn?" rows={2} className="resize-none rounded-xl" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Instructor / Teacher</label>
              <Input value={form.instructor} onChange={e => setForm(p => ({ ...p, instructor: e.target.value }))} placeholder="Name or title" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Schedule</label>
              <select className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium" value={form.schedule_days} onChange={e => setForm(p => ({ ...p, schedule_days: e.target.value }))}>
                {DAYS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Time</label>
              <Input type="time" value={form.schedule_time} onChange={e => setForm(p => ({ ...p, schedule_time: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Capacity (seats)</label>
              <Input type="number" placeholder="e.g. 30" value={form.capacity} onChange={e => setForm(p => ({ ...p, capacity: e.target.value }))} />
            </div>
            <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
              <label className="text-xs font-bold text-muted-foreground">Fee</label>
              <div className="flex gap-2 mt-0.5">
                {[true, false].map(f => (
                  <button key={String(f)} type="button" onClick={() => setForm(p => ({ ...p, is_free: f }))}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${form.is_free === f ? "bg-primary text-primary-foreground border-primary" : "border-input text-muted-foreground"}`}>
                    {f ? "Free" : "Paid"}
                  </button>
                ))}
              </div>
              {!form.is_free && <Input className="w-28 h-9" type="number" placeholder="₹ / month" value={form.fee} onChange={e => setForm(p => ({ ...p, fee: e.target.value }))} />}
            </div>
            <div className="col-span-2 flex gap-2 pt-1">
              <Button className="h-9 rounded-lg font-bold" onClick={handleAdd} disabled={saving}>{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Programme"}</Button>
              <Button variant="ghost" className="h-9 rounded-lg font-bold" onClick={() => setAdding(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {programs.length === 0 && !adding && (
        <div className="text-center py-16 space-y-3">
          <BookOpen className="h-10 w-10 text-muted-foreground/30 mx-auto" />
          <p className="text-muted-foreground font-medium">No programmes yet.</p>
          <p className="text-sm text-muted-foreground">Add your Islamic education programmes, Quran classes, and circles.</p>
        </div>
      )}

      {active.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Active Programmes</p>
          {active.map(p => <ProgramCard key={p.id} program={p} onToggle={toggleActive} onDelete={handleDelete} />)}
        </div>
      )}

      {inactive.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Inactive</p>
          {inactive.map(p => <ProgramCard key={p.id} program={p} onToggle={toggleActive} onDelete={handleDelete} />)}
        </div>
      )}
    </div>
  )
}

function ProgramCard({ program: p, onToggle, onDelete }: {
  program: Program
  onToggle: (id: string, current: boolean) => void
  onDelete: (id: string) => void
}) {
  return (
    <Card className={!p.is_active ? "opacity-60" : ""}>
      <CardContent className="p-4 flex items-start gap-3">
        <div className="h-10 w-10 rounded-xl bg-teal-50 dark:bg-teal-950/30 flex items-center justify-center shrink-0">
          <BookOpen className="h-5 w-5 text-teal-600" />
        </div>
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-black text-sm">{p.name}</span>
            <Badge variant="outline" className="text-[10px] font-bold">{p.program_type}</Badge>
            {p.is_free
              ? <span className="text-[10px] font-bold text-emerald-600">Free</span>
              : p.fee ? <span className="text-[10px] font-bold text-primary">₹{p.fee}/month</span> : null
            }
          </div>
          {p.description && <p className="text-xs text-muted-foreground line-clamp-1">{p.description}</p>}
          <div className="flex items-center gap-3 flex-wrap text-xs text-muted-foreground">
            {p.instructor && <span>👤 {p.instructor}</span>}
            {p.schedule_days && <span>📅 {p.schedule_days}</span>}
            {p.schedule_time && <span>🕐 {p.schedule_time}</span>}
            {p.capacity && <span><Users className="h-3 w-3 inline mr-0.5" />{p.capacity} seats</span>}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onToggle(p.id, !!p.is_active)}
            className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-colors ${p.is_active ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-muted text-muted-foreground border-input"}`}
          >
            {p.is_active ? "Active" : "Inactive"}
          </button>
          <button onClick={() => onDelete(p.id)} className="text-muted-foreground/40 hover:text-destructive transition-colors">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
