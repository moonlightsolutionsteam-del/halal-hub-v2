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
import { Loader2, Plus, Trash2, Megaphone, Pin } from "lucide-react"

const CATEGORIES = [
  "General",
  "Prayer Times Update",
  "Jumu'ah",
  "Ramadan",
  "Eid",
  "Event",
  "Fundraising",
  "Community",
  "Urgent",
]

type Announcement = {
  id: string
  title: string
  body: string | null
  category: string | null
  is_pinned: boolean | null
  created_at: string
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

const CATEGORY_COLOR: Record<string, string> = {
  "Urgent":              "bg-red-100 text-red-700",
  "Prayer Times Update": "bg-teal-100 text-teal-700",
  "Ramadan":             "bg-emerald-100 text-emerald-700",
  "Eid":                 "bg-amber-100 text-amber-700",
  "Fundraising":         "bg-blue-100 text-blue-700",
  "Jumu'ah":             "bg-indigo-100 text-indigo-700",
  "Event":               "bg-purple-100 text-purple-700",
}

export default function MosqueAnnouncementsPage() {
  const { user } = useAuth()
  const [mosqueId, setMosqueId] = React.useState<string | null>(null)
  const [items, setItems] = React.useState<Announcement[]>([])
  const [loading, setLoading] = React.useState(true)
  const [adding, setAdding] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [form, setForm] = React.useState({
    title: "", body: "", category: "General", is_pinned: false,
  })

  const load = React.useCallback(() => {
    if (!user?.uid) return
    const supabase = createClient()
    supabase.from("businesses").select("id").eq("owner_id", user.uid).limit(1).maybeSingle()
      .then(({ data }: { data: { id: string } | null }) => {
        if (!data) { setLoading(false); return }
        setMosqueId(data.id)
        supabase.from("mosque_announcements").select("*")
          .eq("mosque_id", data.id)
          .order("is_pinned", { ascending: false })
          .order("created_at", { ascending: false })
          .then(({ data: rows }) => { setItems(rows ?? []); setLoading(false) })
      })
  }, [user?.uid])

  React.useEffect(() => { load() }, [load])

  async function handleAdd() {
    if (!form.title.trim() || !mosqueId) return
    setSaving(true)
    const supabase = createClient()
    await supabase.from("mosque_announcements").insert({
      mosque_id: mosqueId,
      title: form.title.trim(),
      body: form.body.trim() || null,
      category: form.category,
      is_pinned: form.is_pinned,
    })
    setForm({ title: "", body: "", category: "General", is_pinned: false })
    setAdding(false)
    setSaving(false)
    load()
  }

  async function handleDelete(id: string) {
    await createClient().from("mosque_announcements").delete().eq("id", id)
    load()
  }

  async function togglePin(id: string, current: boolean) {
    await createClient().from("mosque_announcements").update({ is_pinned: !current }).eq("id", id)
    load()
  }

  if (loading) return (
    <div className="flex justify-center py-24">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )

  const pinned = items.filter(a => a.is_pinned)
  const recent = items.filter(a => !a.is_pinned)

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">Announcements</h1>
          <p className="text-muted-foreground text-sm">Post notices for your community — they appear on your mosque listing.</p>
        </div>
        <Button size="sm" className="gap-1.5 rounded-xl font-bold" onClick={() => setAdding(true)}>
          <Plus className="h-4 w-4" /> New Announcement
        </Button>
      </div>

      {adding && (
        <Card>
          <CardContent className="pt-5 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <label className="text-xs font-bold text-muted-foreground">Title *</label>
                <Input
                  value={form.title}
                  onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Jumu'ah time changed to 1:30 PM"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">Category</label>
                <select
                  className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium"
                  value={form.category}
                  onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                >
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-1 col-span-2">
                <label className="text-xs font-bold text-muted-foreground">Message (optional)</label>
                <Textarea
                  value={form.body}
                  onChange={e => setForm(p => ({ ...p, body: e.target.value }))}
                  placeholder="Additional details for the community..."
                  rows={3}
                  className="resize-none rounded-xl"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setForm(p => ({ ...p, is_pinned: !p.is_pinned }))}
                className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${form.is_pinned ? "bg-primary text-primary-foreground border-primary" : "border-input text-muted-foreground"}`}
              >
                <Pin className="h-3 w-3" /> Pin to top
              </button>
              <div className="flex gap-2 ml-auto">
                <Button className="h-9 rounded-lg font-bold" onClick={handleAdd} disabled={saving}>
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Post"}
                </Button>
                <Button variant="ghost" className="h-9 rounded-lg font-bold" onClick={() => setAdding(false)}>Cancel</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {items.length === 0 && !adding && (
        <div className="text-center py-16 space-y-3">
          <Megaphone className="h-10 w-10 text-muted-foreground/30 mx-auto" />
          <p className="text-muted-foreground font-medium">No announcements yet.</p>
          <p className="text-sm text-muted-foreground">Post prayer time changes, event notices, and community updates here.</p>
        </div>
      )}

      {pinned.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
            <Pin className="h-3 w-3" /> Pinned
          </p>
          {pinned.map(a => <AnnouncementCard key={a.id} item={a} onDelete={handleDelete} onPin={togglePin} />)}
        </div>
      )}

      {recent.length > 0 && (
        <div className="space-y-2">
          {pinned.length > 0 && (
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Recent</p>
          )}
          {recent.map(a => <AnnouncementCard key={a.id} item={a} onDelete={handleDelete} onPin={togglePin} />)}
        </div>
      )}
    </div>
  )
}

function AnnouncementCard({
  item,
  onDelete,
  onPin,
}: {
  item: Announcement
  onDelete: (id: string) => void
  onPin: (id: string, current: boolean) => void
}) {
  return (
    <Card className={item.is_pinned ? "border-primary/30 bg-primary/5" : ""}>
      <CardContent className="p-4 flex items-start gap-3">
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            {item.is_pinned && <Pin className="h-3 w-3 text-primary shrink-0" />}
            <span className="font-black text-sm leading-tight">{item.title}</span>
            {item.category && item.category !== "General" && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${CATEGORY_COLOR[item.category] ?? "bg-muted text-muted-foreground"}`}>
                {item.category}
              </span>
            )}
          </div>
          {item.body && <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>}
          <p className="text-[10px] text-muted-foreground/60">{timeAgo(item.created_at)}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onPin(item.id, !!item.is_pinned)}
            className={`p-1.5 rounded-lg transition-colors ${item.is_pinned ? "text-primary" : "text-muted-foreground/40 hover:text-muted-foreground"}`}
            title={item.is_pinned ? "Unpin" : "Pin"}
          >
            <Pin className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-1.5 rounded-lg text-muted-foreground/40 hover:text-destructive transition-colors"
            title="Delete"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
