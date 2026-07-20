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
import { Loader2, Plus, Trash2, Beef } from "lucide-react"

const CUT_TYPES = ["Whole Animal", "Whole Bird", "Leg / Shank", "Shoulder", "Loin / Rack", "Ribs", "Neck", "Breast", "Wings", "Offal / Liver", "Mince / Ground", "Sausage", "Marinated", "Bone-in", "Boneless", "Other"]
const ANIMALS = ["Chicken", "Lamb", "Goat", "Beef", "Camel", "Fish", "Mutton", "Turkey", "Rabbit", "Other"]
const UNITS = ["per kg", "per 500g", "per piece", "per pack", "per box"]

type MeatItem = {
  id: string
  name: string
  animal: string | null
  cut_type: string | null
  description: string | null
  price: number | null
  unit: string | null
  is_available: boolean | null
  created_at: string
}

export default function ButcherProductsPage() {
  const { user } = useAuth()
  const [businessId, setBusinessId] = React.useState<string | null>(null)
  const [items, setItems] = React.useState<MeatItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [adding, setAdding] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [form, setForm] = React.useState({
    name: "", animal: ANIMALS[0], cut_type: CUT_TYPES[0],
    description: "", price: "", unit: UNITS[0], is_available: true,
  })

  const load = React.useCallback(() => {
    if (!user?.uid) return
    const supabase = createClient()
    supabase.from("businesses").select("id").eq("owner_id", user.uid).limit(1).maybeSingle()
      .then(({ data }: { data: { id: string } | null }) => {
        if (!data) { setLoading(false); return }
        setBusinessId(data.id)
        supabase.from("butcher_products").select("*").eq("business_id", data.id)
          .order("animal").order("name")
          .then(({ data: rows }) => { setItems(rows ?? []); setLoading(false) })
      })
  }, [user?.uid])

  React.useEffect(() => { load() }, [load])

  async function handleAdd() {
    if (!form.name.trim() || !businessId) return
    setSaving(true)
    await createClient().from("butcher_products").insert({
      business_id: businessId, name: form.name.trim(), animal: form.animal,
      cut_type: form.cut_type, description: form.description.trim() || null,
      price: form.price ? parseFloat(form.price) : null, unit: form.unit, is_available: form.is_available,
    })
    setForm({ name: "", animal: ANIMALS[0], cut_type: CUT_TYPES[0], description: "", price: "", unit: UNITS[0], is_available: true })
    setAdding(false); setSaving(false); load()
  }

  async function toggleAvailable(id: string, current: boolean) {
    await createClient().from("butcher_products").update({ is_available: !current }).eq("id", id)
    load()
  }

  async function handleDelete(id: string) {
    await createClient().from("butcher_products").delete().eq("id", id)
    load()
  }

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  const byAnimal = ANIMALS.filter(a => items.some(i => i.animal === a))

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">Meat Inventory</h1>
          <p className="text-muted-foreground text-sm">Manage your halal cuts, birds, and specialty items.</p>
        </div>
        <Button size="sm" className="gap-1.5 rounded-xl font-bold" onClick={() => setAdding(true)}>
          <Plus className="h-4 w-4" /> Add Cut
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums">{items.length}</p><p className="text-xs text-muted-foreground mt-0.5">Total items</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums text-emerald-600">{items.filter(i => i.is_available).length}</p><p className="text-xs text-muted-foreground mt-0.5">Available</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums text-amber-600">{items.filter(i => !i.is_available).length}</p><p className="text-xs text-muted-foreground mt-0.5">Out of stock</p></CardContent></Card>
      </div>

      {adding && (
        <Card>
          <CardContent className="pt-5 grid grid-cols-2 gap-3">
            <div className="space-y-1 col-span-2 sm:col-span-1">
              <label className="text-xs font-bold text-muted-foreground">Item Name *</label>
              <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Whole Chicken" autoFocus />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Animal</label>
              <select className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium" value={form.animal} onChange={e => setForm(p => ({ ...p, animal: e.target.value }))}>
                {ANIMALS.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Cut Type</label>
              <select className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium" value={form.cut_type} onChange={e => setForm(p => ({ ...p, cut_type: e.target.value }))}>
                {CUT_TYPES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1 col-span-2">
              <label className="text-xs font-bold text-muted-foreground">Description</label>
              <Textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="e.g. Fresh, skin-on, cleaned" rows={2} className="resize-none rounded-xl" />
            </div>
            <div className="flex gap-2 items-end">
              <div className="space-y-1 flex-1">
                <label className="text-xs font-bold text-muted-foreground">Price (₹)</label>
                <Input type="number" placeholder="0.00" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} />
              </div>
              <div className="space-y-1 w-32">
                <label className="text-xs font-bold text-muted-foreground">Unit</label>
                <select className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium" value={form.unit} onChange={e => setForm(p => ({ ...p, unit: e.target.value }))}>
                  {UNITS.map(u => <option key={u}>{u}</option>)}
                </select>
              </div>
            </div>
            <div className="col-span-2 flex gap-2 pt-1">
              <Button className="h-9 rounded-lg font-bold" onClick={handleAdd} disabled={saving}>{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Item"}</Button>
              <Button variant="ghost" className="h-9 rounded-lg font-bold" onClick={() => setAdding(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {items.length === 0 && !adding && (
        <div className="text-center py-16 space-y-3">
          <Beef className="h-10 w-10 text-muted-foreground/30 mx-auto" />
          <p className="text-muted-foreground font-medium">No meat items yet.</p>
          <p className="text-sm text-muted-foreground">Add your cuts, birds, and specialty halal meats.</p>
        </div>
      )}

      {byAnimal.map(animal => (
        <div key={animal} className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{animal}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {items.filter(i => i.animal === animal).map(item => (
              <Card key={item.id} className={!item.is_available ? "opacity-60" : ""}>
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center shrink-0">
                    <Beef className="h-4 w-4 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-sm">{item.name}</span>
                      <Badge variant="outline" className="text-[10px] font-bold">{item.cut_type}</Badge>
                      {item.price && <span className="text-xs font-bold text-primary">₹{item.price} {item.unit}</span>}
                    </div>
                    {item.description && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{item.description}</p>}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => toggleAvailable(item.id, !!item.is_available)}
                      className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition-colors ${item.is_available ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-muted text-muted-foreground border-input"}`}>
                      {item.is_available ? "In Stock" : "Out"}
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-muted-foreground/40 hover:text-destructive transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
