"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Plus, Trash2, BookOpen, AlertTriangle } from "lucide-react"

const CATEGORIES = ["Islamic Books", "Quran & Tafsir", "Hadith Collections", "Fiqh & Jurisprudence", "Biography / Seerah", "Children's Books", "Educational", "DVDs / Media", "Gift Items", "Stationery", "Prayer Items", "Islamic Art", "Other"]

type BookItem = {
  id: string
  title: string
  author: string | null
  category: string | null
  isbn: string | null
  price: number | null
  stock_qty: number | null
  low_stock_threshold: number | null
  language: string | null
  publisher: string | null
  is_available: boolean | null
  created_at: string
}

export default function MediaInventoryPage() {
  const { user } = useAuth()
  const [businessId, setBusinessId] = React.useState<string | null>(null)
  const [items, setItems] = React.useState<BookItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [adding, setAdding] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [form, setForm] = React.useState({
    title: "", author: "", category: CATEGORIES[0],
    isbn: "", price: "", stock_qty: "", low_stock_threshold: "3",
    language: "English", publisher: "",
  })

  const load = React.useCallback(() => {
    if (!user?.uid) return
    const supabase = createClient()
    supabase.from("businesses").select("id").eq("owner_id", user.uid).limit(1).maybeSingle()
      .then(({ data }: { data: { id: string } | null }) => {
        if (!data) { setLoading(false); return }
        setBusinessId(data.id)
        supabase.from("media_book_inventory").select("*").eq("business_id", data.id)
          .order("category").order("title")
          .then(({ data: rows }) => { setItems(rows ?? []); setLoading(false) })
      })
  }, [user?.uid])

  React.useEffect(() => { load() }, [load])

  async function handleAdd() {
    if (!form.title.trim() || !businessId) return
    setSaving(true)
    await createClient().from("media_book_inventory").insert({
      business_id: businessId, title: form.title.trim(),
      author: form.author.trim() || null, category: form.category,
      isbn: form.isbn.trim() || null,
      price: form.price ? parseFloat(form.price) : null,
      stock_qty: form.stock_qty ? parseInt(form.stock_qty) : null,
      low_stock_threshold: form.low_stock_threshold ? parseInt(form.low_stock_threshold) : 3,
      language: form.language.trim() || null, publisher: form.publisher.trim() || null,
      is_available: true,
    })
    setForm({ title: "", author: "", category: CATEGORIES[0], isbn: "", price: "", stock_qty: "", low_stock_threshold: "3", language: "English", publisher: "" })
    setAdding(false); setSaving(false); load()
  }

  async function handleDelete(id: string) {
    await createClient().from("media_book_inventory").delete().eq("id", id)
    load()
  }

  async function updateStock(id: string, delta: number, current: number) {
    await createClient().from("media_book_inventory").update({ stock_qty: Math.max(0, current + delta) }).eq("id", id)
    load()
  }

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  const lowStock = items.filter(i => i.stock_qty != null && i.low_stock_threshold != null && i.stock_qty <= i.low_stock_threshold)

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">Book Inventory</h1>
          <p className="text-muted-foreground text-sm">Islamic books, Qurans, media, and gift items.</p>
        </div>
        <Button size="sm" className="gap-1.5 rounded-xl font-bold" onClick={() => setAdding(true)}>
          <Plus className="h-4 w-4" /> Add Title
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums">{items.length}</p><p className="text-xs text-muted-foreground mt-0.5">Titles</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className={`text-xl font-black tabular-nums ${lowStock.length > 0 ? "text-amber-600" : "text-emerald-600"}`}>{lowStock.length}</p><p className="text-xs text-muted-foreground mt-0.5">Low stock</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums text-primary">{items.reduce((s, i) => s + (i.stock_qty ?? 0), 0)}</p><p className="text-xs text-muted-foreground mt-0.5">Total units</p></CardContent></Card>
      </div>

      {lowStock.length > 0 && (
        <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
            <p className="text-sm font-bold text-amber-700">{lowStock.length} title{lowStock.length > 1 ? "s" : ""} running low — reorder soon.</p>
          </CardContent>
        </Card>
      )}

      {adding && (
        <Card>
          <CardContent className="pt-5 grid grid-cols-2 gap-3">
            <div className="space-y-1 col-span-2 sm:col-span-1">
              <label className="text-xs font-bold text-muted-foreground">Title *</label>
              <Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Riyad us Saliheen" autoFocus />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Category</label>
              <select className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Author</label>
              <Input value={form.author} onChange={e => setForm(p => ({ ...p, author: e.target.value }))} placeholder="e.g. Imam al-Nawawi" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Publisher</label>
              <Input value={form.publisher} onChange={e => setForm(p => ({ ...p, publisher: e.target.value }))} placeholder="e.g. Darussalam" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Language</label>
              <Input value={form.language} onChange={e => setForm(p => ({ ...p, language: e.target.value }))} placeholder="e.g. English, Arabic, Urdu" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Price (₹)</label>
              <Input type="number" placeholder="0.00" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Stock (copies)</label>
              <Input type="number" placeholder="0" value={form.stock_qty} onChange={e => setForm(p => ({ ...p, stock_qty: e.target.value }))} />
            </div>
            <div className="col-span-2 flex gap-2 pt-1">
              <Button className="h-9 rounded-lg font-bold" onClick={handleAdd} disabled={saving}>{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add Title"}</Button>
              <Button variant="ghost" className="h-9 rounded-lg font-bold" onClick={() => setAdding(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {items.length === 0 && !adding && (
        <div className="text-center py-16 space-y-3">
          <BookOpen className="h-10 w-10 text-muted-foreground/30 mx-auto" />
          <p className="text-muted-foreground font-medium">No titles yet.</p>
          <p className="text-sm text-muted-foreground">Add your Islamic books, Qurans, and other media items.</p>
        </div>
      )}

      {CATEGORIES.filter(c => items.some(i => i.category === c)).map(cat => (
        <div key={cat} className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{cat}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {items.filter(i => i.category === cat).map(item => {
              const isLow = item.stock_qty != null && item.low_stock_threshold != null && item.stock_qty <= item.low_stock_threshold
              return (
                <Card key={item.id} className={isLow ? "border-amber-200" : ""}>
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-sm leading-tight">{item.title}</span>
                        {isLow && <AlertTriangle className="h-3 w-3 text-amber-500 shrink-0" />}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5 flex gap-2 flex-wrap">
                        {item.author && <span>{item.author}</span>}
                        {item.language && <span>· {item.language}</span>}
                        {item.price && <span className="font-bold text-primary">· ₹{item.price}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => updateStock(item.id, -1, item.stock_qty ?? 0)} className="h-7 w-7 rounded-lg border border-input text-sm font-bold hover:bg-muted transition-colors">−</button>
                      <span className="w-8 text-center text-sm font-black tabular-nums">{item.stock_qty ?? 0}</span>
                      <button onClick={() => updateStock(item.id, 1, item.stock_qty ?? 0)} className="h-7 w-7 rounded-lg border border-input text-sm font-bold hover:bg-muted transition-colors">+</button>
                      <button onClick={() => handleDelete(item.id)} className="ml-1 text-muted-foreground/40 hover:text-destructive transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
