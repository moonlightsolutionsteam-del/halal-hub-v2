"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Plus, Trash2, Shirt } from "lucide-react"

const CATEGORIES = ["Abaya", "Hijab", "Niqab", "Jubba / Thobe", "Salwar Kameez", "Kurta", "Modest Dress", "Modest Top", "Modest Trousers", "Kids Wear", "Accessories", "Sportswear", "Formal Wear", "Other"]
const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "One Size", "Custom"]
const GENDERS = ["Women", "Men", "Kids", "Unisex"]

type FashionProduct = {
  id: string
  name: string
  category: string | null
  gender: string | null
  sizes: string[] | null
  colors: string | null
  fabric: string | null
  description: string | null
  price: number | null
  is_halal_certified: boolean | null
  is_available: boolean | null
  created_at: string
}

export default function FashionProductsPage() {
  const { user } = useAuth()
  const [businessId, setBusinessId] = React.useState<string | null>(null)
  const [items, setItems] = React.useState<FashionProduct[]>([])
  const [loading, setLoading] = React.useState(true)
  const [adding, setAdding] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [selectedSizes, setSelectedSizes] = React.useState<string[]>([])
  const [form, setForm] = React.useState({
    name: "", category: CATEGORIES[0], gender: GENDERS[0],
    colors: "", fabric: "", description: "", price: "",
    is_halal_certified: false, is_available: true,
  })

  const load = React.useCallback(() => {
    if (!user?.uid) return
    const supabase = createClient()
    supabase.from("businesses").select("id").eq("owner_id", user.uid).limit(1).maybeSingle()
      .then(({ data }: { data: { id: string } | null }) => {
        if (!data) { setLoading(false); return }
        setBusinessId(data.id)
        supabase.from("fashion_products").select("*").eq("business_id", data.id)
          .order("category").order("name")
          .then(({ data: rows }) => { setItems(rows ?? []); setLoading(false) })
      })
  }, [user?.uid])

  React.useEffect(() => { load() }, [load])

  function toggleSize(s: string) {
    setSelectedSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  async function handleAdd() {
    if (!form.name.trim() || !businessId) return
    setSaving(true)
    await createClient().from("fashion_products").insert({
      business_id: businessId, name: form.name.trim(), category: form.category,
      gender: form.gender, sizes: selectedSizes.length ? selectedSizes : null,
      colors: form.colors.trim() || null, fabric: form.fabric.trim() || null,
      description: form.description.trim() || null,
      price: form.price ? parseFloat(form.price) : null,
      is_halal_certified: form.is_halal_certified, is_available: form.is_available,
    })
    setForm({ name: "", category: CATEGORIES[0], gender: GENDERS[0], colors: "", fabric: "", description: "", price: "", is_halal_certified: false, is_available: true })
    setSelectedSizes([]); setAdding(false); setSaving(false); load()
  }

  async function toggleAvailable(id: string, current: boolean) {
    await createClient().from("fashion_products").update({ is_available: !current }).eq("id", id)
    load()
  }

  async function handleDelete(id: string) {
    await createClient().from("fashion_products").delete().eq("id", id)
    load()
  }

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">Product Catalog</h1>
          <p className="text-muted-foreground text-sm">Your modest fashion collection — abayas, hijabs, and more.</p>
        </div>
        <Button size="sm" className="gap-1.5 rounded-xl font-bold" onClick={() => setAdding(true)}>
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums">{items.length}</p><p className="text-xs text-muted-foreground mt-0.5">Products</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums text-emerald-600">{items.filter(i => i.is_available).length}</p><p className="text-xs text-muted-foreground mt-0.5">Available</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums text-primary">{items.filter(i => i.is_halal_certified).length}</p><p className="text-xs text-muted-foreground mt-0.5">Certified</p></CardContent></Card>
      </div>

      {adding && (
        <Card>
          <CardContent className="pt-5 grid grid-cols-2 gap-3">
            <div className="space-y-1 col-span-2 sm:col-span-1">
              <label className="text-xs font-bold text-muted-foreground">Product Name *</label>
              <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Premium Embroidered Abaya" autoFocus />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Category</label>
              <select className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Gender</label>
              <select className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium" value={form.gender} onChange={e => setForm(p => ({ ...p, gender: e.target.value }))}>
                {GENDERS.map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div className="space-y-1 col-span-2">
              <label className="text-xs font-bold text-muted-foreground">Available Sizes</label>
              <div className="flex flex-wrap gap-1.5">
                {SIZES.map(s => (
                  <button key={s} type="button" onClick={() => toggleSize(s)}
                    className={`text-xs font-bold px-3 py-1 rounded-lg border transition-colors ${selectedSizes.includes(s) ? "bg-primary text-primary-foreground border-primary" : "border-input text-muted-foreground"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Colours</label>
              <Input value={form.colors} onChange={e => setForm(p => ({ ...p, colors: e.target.value }))} placeholder="e.g. Black, Navy, Ivory" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Fabric</label>
              <Input value={form.fabric} onChange={e => setForm(p => ({ ...p, fabric: e.target.value }))} placeholder="e.g. Nida, Crepe, Chiffon" />
            </div>
            <div className="space-y-1 col-span-2">
              <label className="text-xs font-bold text-muted-foreground">Description</label>
              <Textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={2} className="resize-none rounded-xl" placeholder="Style notes, care instructions..." />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Price (₹)</label>
              <Input type="number" placeholder="0.00" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} />
            </div>
            <div className="flex items-center gap-3 pt-5">
              <button type="button" onClick={() => setForm(p => ({ ...p, is_halal_certified: !p.is_halal_certified }))}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${form.is_halal_certified ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "border-input text-muted-foreground"}`}>
                Halal Certified
              </button>
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
          <Shirt className="h-10 w-10 text-muted-foreground/30 mx-auto" />
          <p className="text-muted-foreground font-medium">No products yet.</p>
          <p className="text-sm text-muted-foreground">Add your modest fashion collection to your Halal Hub listing.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map(item => (
          <Card key={item.id} className={!item.is_available ? "opacity-60" : ""}>
            <CardContent className="p-4 flex items-start gap-3">
              <div className="h-9 w-9 rounded-xl bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center shrink-0">
                <Shirt className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black text-sm">{item.name}</span>
                  <Badge variant="outline" className="text-[10px] font-bold">{item.category}</Badge>
                  {item.gender && <Badge variant="outline" className="text-[10px] font-bold">{item.gender}</Badge>}
                  {item.is_halal_certified && <span className="text-[10px] font-bold text-emerald-600">Certified</span>}
                </div>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  {item.price && <span className="text-xs font-bold text-primary">₹{item.price?.toLocaleString()}</span>}
                  {item.colors && <span className="text-xs text-muted-foreground">{item.colors}</span>}
                  {item.fabric && <span className="text-xs text-muted-foreground">· {item.fabric}</span>}
                </div>
                {item.sizes && item.sizes.length > 0 && (
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {item.sizes.map(s => <span key={s} className="text-[10px] font-bold bg-muted px-1.5 py-0.5 rounded">{s}</span>)}
                  </div>
                )}
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
