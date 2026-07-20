"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Loader2, Plus, Trash2, ExternalLink } from "lucide-react"

const CONTENT_TYPES = [
  "Article / Blog Post",
  "Video",
  "Podcast Episode",
  "E-Book",
  "Course / Tutorial",
  "Infographic",
  "Newsletter",
  "Documentary",
  "Short Film",
  "Audio Lecture",
  "Other",
]

type ContentRow = {
  id: string
  title: string
  content_type: string | null
  description: string | null
  url: string | null
  is_free: boolean | null
  price: number | null
  published_at: string | null
}

export default function MediaDigitalPage() {
  const { user } = useAuth()
  const [items, setItems] = React.useState<ContentRow[]>([])
  const [loading, setLoading] = React.useState(true)
  const [adding, setAdding] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [form, setForm] = React.useState({
    title: "", content_type: CONTENT_TYPES[0], description: "", url: "", is_free: true, price: "", published_at: "",
  })

  const load = React.useCallback(() => {
    if (!user?.uid) return
    createClient().from("media_digital_content").select("*").eq("vendor_uid", user.uid)
      .order("created_at", { ascending: false })
      .then(({ data }) => { setItems(data ?? []); setLoading(false) })
  }, [user?.uid])

  React.useEffect(() => { load() }, [load])

  async function handleAdd() {
    if (!form.title || !user?.uid) return
    setSaving(true)
    await createClient().from("media_digital_content").insert({
      vendor_uid: user.uid, title: form.title, content_type: form.content_type,
      description: form.description || null, url: form.url || null,
      is_free: form.is_free, price: form.is_free ? null : (form.price ? parseFloat(form.price) : null),
      published_at: form.published_at || null,
    })
    setForm({ title: "", content_type: CONTENT_TYPES[0], description: "", url: "", is_free: true, price: "", published_at: "" })
    setAdding(false); setSaving(false); load()
  }

  async function handleDelete(id: string) {
    await createClient().from("media_digital_content").delete().eq("id", id)
    load()
  }

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">Digital Content</h1>
          <p className="text-muted-foreground text-sm">Articles, videos, podcasts, and other digital content you publish.</p>
        </div>
        <Button size="sm" className="gap-1.5 rounded-xl font-bold" onClick={() => setAdding(true)}>
          <Plus className="h-4 w-4" /> Add Content
        </Button>
      </div>

      {adding && (
        <Card>
          <CardContent className="pt-5 grid grid-cols-2 gap-3">
            <div className="space-y-1 col-span-2 sm:col-span-1">
              <label className="text-xs font-bold text-muted-foreground">Title *</label>
              <Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Understanding Halal Finance" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Content Type</label>
              <select className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium" value={form.content_type} onChange={e => setForm(p => ({ ...p, content_type: e.target.value }))}>
                {CONTENT_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="space-y-1 col-span-2">
              <label className="text-xs font-bold text-muted-foreground">Description</label>
              <Input value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Brief summary..." />
            </div>
            <div className="space-y-1 col-span-2">
              <label className="text-xs font-bold text-muted-foreground">URL / Link</label>
              <Input value={form.url} onChange={e => setForm(p => ({ ...p, url: e.target.value }))} placeholder="https://..." />
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-muted-foreground">Access</label>
              <div className="flex gap-2 mt-0.5">
                {[true, false].map(f => (
                  <button key={String(f)} type="button" onClick={() => setForm(p => ({ ...p, is_free: f }))}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${form.is_free === f ? "bg-primary text-primary-foreground border-primary" : "border-input text-muted-foreground"}`}>
                    {f ? "Free" : "Paid"}
                  </button>
                ))}
              </div>
              {!form.is_free && <Input className="w-28 h-9" type="number" placeholder="Price (₹)" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} />}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Published Date</label>
              <Input type="date" value={form.published_at} onChange={e => setForm(p => ({ ...p, published_at: e.target.value }))} />
            </div>
            <div className="col-span-2 flex gap-2 pt-1">
              <Button className="h-9 rounded-lg font-bold" onClick={handleAdd} disabled={saving}>{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Content"}</Button>
              <Button variant="ghost" className="h-9 rounded-lg font-bold" onClick={() => setAdding(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {items.length === 0 && !adding && (
        <div className="text-center py-16 space-y-2">
          <p className="text-muted-foreground font-medium">No digital content yet.</p>
          <p className="text-sm text-muted-foreground">Add articles, videos, podcasts, and other content you publish.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map(item => (
          <Card key={item.id}>
            <CardContent className="p-4 flex items-start gap-3">
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black text-sm">{item.title}</span>
                  <Badge variant="outline" className="text-[10px] font-bold">{item.content_type}</Badge>
                  <Badge className={`text-[10px] font-bold ${item.is_free ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>{item.is_free ? "Free" : `₹${item.price?.toLocaleString()}`}</Badge>
                </div>
                {item.description && <p className="text-xs text-muted-foreground">{item.description}</p>}
                {item.published_at && <p className="text-xs text-muted-foreground">{new Date(item.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {item.url && (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                <button onClick={() => handleDelete(item.id)} className="text-muted-foreground/40 hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
