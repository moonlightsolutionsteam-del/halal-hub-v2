"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Plus, Trash2, Sparkles } from "lucide-react"

const CATEGORIES = ["Skincare", "Foundation / Base", "Lipstick / Lip Gloss", "Eye Makeup", "Blush / Bronzer", "Nail Care", "Fragrance", "Hair Care", "Body Care", "Sun Protection", "Tools & Brushes", "Gift Set", "Other"]

type CosmeticProduct = {
  id: string
  name: string
  category: string | null
  description: string | null
  price: number | null
  is_halal_certified: boolean | null
  is_cruelty_free: boolean | null
  is_vegan: boolean | null
  is_available: boolean | null
  created_at: string
}

export default function CosmeticsProductsPage() {
  const { user } = useAuth()
  const [businessId, setBusinessId] = React.useState<string | null>(null)
  const [items, setItems] = React.useState<CosmeticProduct[]>([])
  const [loading, setLoading] = React.useState(true)
  const [adding, setAdding] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [form, setForm] = React.useState({
    name: "", category: CATEGORIES[0], description: "", price: "",
    is_halal_certified: true, is_cruelty_free: false, is_vegan: false, is_available: true,
  })

  const load = React.useCallback(() => {
    if (!user?.uid) return
    const supabase = createClient()
    supabase.from("businesses").select("id").eq("owner_id", user.uid).limit(1).maybeSingle()
      .then(({ data }: { data: { id: string } | null }) => {
        if (!data) { setLoading(false); return }
        setBusinessId(data.id)
        supabase.from("cosmetics_products").select("*").eq("business_id", data.id)
          .order("category").order("name")
          .then(({ data: rows }) => { setItems(rows ?? []); setLoading(false) })
      })
  }, [user?.uid])

  React.useEffect(() => { load() }, [load])

  async function handleAdd() {
    if (!form.name.trim() || !businessId) return
    setSaving(true)
    await createClient().from("cosmetics_products").insert({
      business_id: businessId, name: form.name.trim(), category: form.category,
      description: form.description.trim() || null,
      price: form.price ? parseFloat(form.price) : null,
      is_halal_certified: form.is_halal_certified,
      is_cruelty_free: form.is_cruelty_free,
      is_vegan: form.is_vegan, is_available: form.is_available,
    })
    setForm({ name: "", category: CATEGORIES[0], description: "", price: "", is_halal_certified: true, is_cruelty_free: false, is_vegan: false, is_available: true })
    setAdding(false); setSaving(false); load()
  }

  async function toggleAvailable(id: string, current: boolean) {
    await createClient().from("cosmetics_products").update({ is_available: !current }).eq("id", id)
    load()
  }

  async function handleDelete(id: string) {
    await createClient().from("cosmetics_products").delete().eq("id", id)
    load()
  }

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">Product Catalog</h1>
          <p className="text-muted-foreground text-sm">Halal-certified cosmetics and beauty products.</p>
        </div>
        <Button size="sm" className="gap-1.5 rounded-xl font-bold" onClick={() => setAdding(true)}>
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums">{items.length}</p><p className="text-xs text-muted-foreground mt-0.5">Products</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums text-emerald-600">{items.filter(i => i.is_halal_certified).length}</p><p className="text-xs text-muted-foreground mt-0.5">Halal certified</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums text-primary">{items.filter(i => i.is_available).length}</p><p className="text-xs text-muted-foreground mt-0.5">Available</p></CardContent></Card>
      </div>

      {adding && (
        <Card>
          <CardContent className="pt-5 grid grid-cols-2 gap-3">
            <div className="space-y-1 col-span-2 sm:col-span-1">
              <label className="text-xs font-bold text-muted-foreground">Product Name *</label>
              <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Rose Glow Halal Foundation" autoFocus />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Category</label>
              <select className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1 col-span-2">
              <label className="text-xs font-bold text-muted-foreground">Description</label>
              <Textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={2} className="resize-none rounded-xl" placeholder="Ingredients, skin type, usage..." />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Price (₹)</label>
              <Input type="number" placeholder="0.00" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} />
            </div>
            <div className="flex items-center gap-2 pt-5 flex-wrap">
              {(["is_halal_certified", "is_cruelty_free", "is_vegan"] as const).map(key => (
                <button key={key} type="button" onClick={() => setForm(p => ({ ...p, [key]: !p[key] }))}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${form[key] ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "border-input text-muted-foreground"}`}>
                  {key === "is_halal_certified" ? "Halal Certified" : key === "is_cruelty_free" ? "Cruelty Free" : "Vegan"}
                </button>
              ))}
            </div>
            <div className="col-span-2 flex gap-2 pt-1">
              <Button className="h-9 rounded-lg font-bold" onClick={handleAdd} disabled={saving}>{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Product"}</Button>
              <Button variant="ghost" className="h-9 rounded-lg font-bold" onClick={() => setAdding(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {items.length === 0 && !adding && (
        <div className="text-center py-16 space-y-3">
          <Sparkles className="h-10 w-10 text-muted-foreground/30 mx-auto" />
          <p className="text-muted-foreground font-medium">No products yet.</p>
          <p className="text-sm text-muted-foreground">Add your halal-certified cosmetics and beauty products.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map(item => (
          <Card key={item.id} className={!item.is_available ? "opacity-60" : ""}>
            <CardContent className="p-4 flex items-start gap-3">
              <div className="h-9 w-9 rounded-xl bg-pink-50 dark:bg-pink-950/30 flex items-center justify-center shrink-0">
                <Sparkles className="h-4 w-4 text-pink-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black text-sm">{item.name}</span>
                  <Badge variant="outline" className="text-[10px] font-bold">{item.category}</Badge>
                </div>
                <div className="flex gap-1.5 mt-1 flex-wrap">
                  {item.is_halal_certified && <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">Halal</span>}
                  {item.is_cruelty_free && <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full">Cruelty Free</span>}
                  {item.is_vegan && <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">Vegan</span>}
                  {item.price && <span className="text-xs font-bold text-primary">₹{item.price?.toLocaleString()}</span>}
                </div>
                {item.description && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{item.description}</p>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => toggleAvailable(item.id, !!item.is_available)}
                  className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition-colors ${item.is_available ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-muted text-muted-foreground border-input"}`}>
                  {item.is_available ? "Live" : "Off"}
                </button>
                <button onClick={() => handleDelete(item.id)} className="text-muted-foreground/40 hover:text-destructive transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
