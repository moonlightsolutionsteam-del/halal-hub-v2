"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Loader2, Plus, Trash2 } from "lucide-react"

const PRODUCT_TYPES = [
  "Savings Account",
  "Current Account",
  "Fixed Deposit",
  "Islamic Home Finance",
  "Islamic Business Finance",
  "Personal Finance",
  "Takaful (Insurance)",
  "Investment Fund",
  "Gold / Commodity",
  "Trade Finance",
  "Sukuk (Bond)",
  "Microfinance",
  "Other",
]

type ProductRow = {
  id: string
  name: string
  product_type: string | null
  description: string | null
  expected_return: string | null
  min_investment: number | null
  tenure: string | null
  is_shariah_certified: boolean | null
  contact: string | null
}

export default function FinanceProductsPage() {
  const { user } = useAuth()
  const [products, setProducts] = React.useState<ProductRow[]>([])
  const [loading, setLoading] = React.useState(true)
  const [adding, setAdding] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [form, setForm] = React.useState({
    name: "", product_type: PRODUCT_TYPES[0], description: "", expected_return: "",
    min_investment: "", tenure: "", is_shariah_certified: true, contact: "",
  })

  const load = React.useCallback(() => {
    if (!user?.uid) return
    createClient().from("finance_products").select("*").eq("vendor_uid", user.uid)
      .order("created_at", { ascending: false })
      .then(({ data }) => { setProducts(data ?? []); setLoading(false) })
  }, [user?.uid])

  React.useEffect(() => { load() }, [load])

  async function handleAdd() {
    if (!form.name || !user?.uid) return
    setSaving(true)
    await createClient().from("finance_products").insert({
      vendor_uid: user.uid, name: form.name, product_type: form.product_type,
      description: form.description || null, expected_return: form.expected_return || null,
      min_investment: form.min_investment ? parseFloat(form.min_investment) : null,
      tenure: form.tenure || null, is_shariah_certified: form.is_shariah_certified,
      contact: form.contact || null,
    })
    setForm({ name: "", product_type: PRODUCT_TYPES[0], description: "", expected_return: "", min_investment: "", tenure: "", is_shariah_certified: true, contact: "" })
    setAdding(false); setSaving(false); load()
  }

  async function handleDelete(id: string) {
    await createClient().from("finance_products").delete().eq("id", id)
    load()
  }

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">Financial Products</h1>
          <p className="text-muted-foreground text-sm">Shariah-compliant financial products and services you offer.</p>
        </div>
        <Button size="sm" className="gap-1.5 rounded-xl font-bold" onClick={() => setAdding(true)}>
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      {adding && (
        <Card>
          <CardContent className="pt-5 grid grid-cols-2 gap-3">
            <div className="space-y-1 col-span-2 sm:col-span-1">
              <label className="text-xs font-bold text-muted-foreground">Product Name *</label>
              <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. HalalSave Fixed Deposit" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Type</label>
              <select className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium" value={form.product_type} onChange={e => setForm(p => ({ ...p, product_type: e.target.value }))}>
                {PRODUCT_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="space-y-1 col-span-2">
              <label className="text-xs font-bold text-muted-foreground">Description</label>
              <Input value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Key features and benefits..." />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Expected Return / Profit Rate</label>
              <Input placeholder="e.g. 5.5% p.a." value={form.expected_return} onChange={e => setForm(p => ({ ...p, expected_return: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Min. Investment (₹)</label>
              <Input type="number" placeholder="e.g. 10000" value={form.min_investment} onChange={e => setForm(p => ({ ...p, min_investment: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Tenure</label>
              <Input placeholder="e.g. 12 months" value={form.tenure} onChange={e => setForm(p => ({ ...p, tenure: e.target.value }))} />
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-muted-foreground">Shariah Certified</label>
              <div className="flex gap-2 mt-0.5">
                {[true, false].map(v => (
                  <button key={String(v)} type="button" onClick={() => setForm(p => ({ ...p, is_shariah_certified: v }))}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${form.is_shariah_certified === v ? "bg-primary text-primary-foreground border-primary" : "border-input text-muted-foreground"}`}>
                    {v ? "Yes" : "No"}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1 col-span-2 sm:col-span-1">
              <label className="text-xs font-bold text-muted-foreground">Contact / Enquiry</label>
              <Input value={form.contact} onChange={e => setForm(p => ({ ...p, contact: e.target.value }))} placeholder="Phone or email" />
            </div>
            <div className="col-span-2 flex gap-2 pt-1">
              <Button className="h-9 rounded-lg font-bold" onClick={handleAdd} disabled={saving}>{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Product"}</Button>
              <Button variant="ghost" className="h-9 rounded-lg font-bold" onClick={() => setAdding(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {products.length === 0 && !adding && (
        <div className="text-center py-16 space-y-2">
          <p className="text-muted-foreground font-medium">No products listed yet.</p>
          <p className="text-sm text-muted-foreground">Add your Shariah-compliant financial products here.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {products.map(p => (
          <Card key={p.id}>
            <CardContent className="p-4 flex items-start gap-3">
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black text-sm">{p.name}</span>
                  <Badge variant="outline" className="text-[10px] font-bold">{p.product_type}</Badge>
                  {p.is_shariah_certified && <Badge className="bg-emerald-100 text-emerald-700 text-[10px] font-bold">Shariah ✓</Badge>}
                </div>
                {p.description && <p className="text-xs text-muted-foreground">{p.description}</p>}
                <div className="flex items-center gap-3 flex-wrap text-xs">
                  {p.expected_return && <span className="text-primary font-bold">{p.expected_return}</span>}
                  {p.min_investment && <span className="text-muted-foreground">Min ₹{p.min_investment.toLocaleString()}</span>}
                  {p.tenure && <span className="text-muted-foreground">{p.tenure}</span>}
                </div>
                {p.contact && <p className="text-xs text-muted-foreground">{p.contact}</p>}
              </div>
              <button onClick={() => handleDelete(p.id)} className="text-muted-foreground/40 hover:text-destructive transition-colors shrink-0 mt-0.5"><Trash2 className="h-4 w-4" /></button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
