// @ts-nocheck
"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Loader2, Plus, Trash2 } from "lucide-react"

const SERVICE_CATEGORIES = [
  "Nikah (Marriage)",
  "Janazah (Funeral)",
  "Islamic Counselling",
  "Quran Classes",
  "Arabic Classes",
  "Hifz Programme",
  "Youth Programme",
  "Zakat Calculation",
  "Islamic Finance",
  "Community Hall Rental",
  "Revert Support",
  "Other",
]

type ServiceRow = {
  id: string
  name: string
  category: string | null
  description: string | null
  is_free: boolean | null
  price: number | null
  contact: string | null
}

export default function MosqueServicesPage() {
  const { user } = useAuth()
  const [services, setServices] = React.useState<ServiceRow[]>([])
  const [loading, setLoading] = React.useState(true)
  const [adding, setAdding] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [form, setForm] = React.useState({
    name: "",
    category: SERVICE_CATEGORIES[0],
    description: "",
    is_free: true,
    price: "",
    contact: "",
  })

  const load = React.useCallback(() => {
    if (!user?.uid) return
    const supabase = createClient()
    supabase
      .from("mosque_services")
      .select("*")
      .eq("mosque_owner_id", user.uid)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setServices(data ?? [])
        setLoading(false)
      })
  }, [user?.uid])

  React.useEffect(() => { load() }, [load])

  async function handleAdd() {
    if (!form.name || !user?.uid) return
    setSaving(true)
    const supabase = createClient()
    await supabase.from("mosque_services").insert({
      mosque_owner_id: user.uid,
      name: form.name,
      category: form.category,
      description: form.description || null,
      is_free: form.is_free,
      price: form.is_free ? null : (form.price ? parseFloat(form.price) : null),
      contact: form.contact || null,
    })
    setForm({ name: "", category: SERVICE_CATEGORIES[0], description: "", is_free: true, price: "", contact: "" })
    setAdding(false)
    setSaving(false)
    load()
  }

  async function handleDelete(id: string) {
    const supabase = createClient()
    await supabase.from("mosque_services").delete().eq("id", id)
    load()
  }

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">Mosque Services</h1>
          <p className="text-muted-foreground text-sm">Nikah, janazah, classes, counselling, and other community services your mosque offers.</p>
        </div>
        <Button size="sm" className="gap-1.5 rounded-xl font-bold" onClick={() => setAdding(true)}>
          <Plus className="h-4 w-4" /> Add Service
        </Button>
      </div>

      {adding && (
        <Card>
          <CardContent className="pt-5 grid grid-cols-2 gap-3">
            <div className="space-y-1 col-span-2 sm:col-span-1">
              <label className="text-xs font-bold text-muted-foreground">Service Name *</label>
              <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Nikah Ceremony Facilitation" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Category</label>
              <select
                className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium"
                value={form.category}
                onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
              >
                {SERVICE_CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1 col-span-2">
              <label className="text-xs font-bold text-muted-foreground">Description</label>
              <Input value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Brief details about this service..." />
            </div>
            <div className="space-y-1 flex items-center gap-3 col-span-2 sm:col-span-1">
              <label className="text-xs font-bold text-muted-foreground">Pricing</label>
              <div className="flex items-center gap-3 mt-0.5">
                <button
                  type="button"
                  onClick={() => setForm(p => ({ ...p, is_free: true }))}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${form.is_free ? "bg-primary text-primary-foreground border-primary" : "border-input text-muted-foreground"}`}
                >
                  Free
                </button>
                <button
                  type="button"
                  onClick={() => setForm(p => ({ ...p, is_free: false }))}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${!form.is_free ? "bg-primary text-primary-foreground border-primary" : "border-input text-muted-foreground"}`}
                >
                  Paid
                </button>
              </div>
              {!form.is_free && (
                <Input className="w-28 h-9" type="number" placeholder="Amount (₹)" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} />
              )}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Contact / Booking Info</label>
              <Input value={form.contact} onChange={e => setForm(p => ({ ...p, contact: e.target.value }))} placeholder="Phone, email, or walk-in" />
            </div>
            <div className="col-span-2 flex gap-2 pt-1">
              <Button className="h-9 rounded-lg font-bold" onClick={handleAdd} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Service"}
              </Button>
              <Button variant="ghost" className="h-9 rounded-lg font-bold" onClick={() => setAdding(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {services.length === 0 && !adding && (
        <div className="text-center py-16 space-y-3">
          <p className="text-muted-foreground font-medium">No services listed yet.</p>
          <p className="text-sm text-muted-foreground">Add services your mosque offers — nikah, janazah, Quran classes, and more.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {services.map(s => (
          <Card key={s.id}>
            <CardContent className="p-4 flex items-start gap-3">
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black text-sm">{s.name}</span>
                  <Badge variant="outline" className="text-[10px] font-bold">{s.category}</Badge>
                </div>
                {s.description && <p className="text-xs text-muted-foreground">{s.description}</p>}
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`text-xs font-bold ${s.is_free ? "text-emerald-600" : "text-primary"}`}>
                    {s.is_free ? "Free" : s.price ? `₹${s.price.toLocaleString()}` : "Price on request"}
                  </span>
                  {s.contact && <span className="text-xs text-muted-foreground">{s.contact}</span>}
                </div>
              </div>
              <button
                onClick={() => handleDelete(s.id)}
                className="text-muted-foreground/40 hover:text-destructive transition-colors shrink-0 mt-0.5"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
