"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Loader2, Plus, Trash2 } from "lucide-react"

const CATEGORIES = [
  "Legal & Compliance",
  "Accounting & Taxation",
  "Financial Advisory",
  "HR & Recruitment",
  "IT & Tech Support",
  "Marketing & Branding",
  "Business Consulting",
  "Architecture & Design",
  "Engineering",
  "Translation & Interpretation",
  "Notary & Documentation",
  "Other",
]

type ServiceRow = {
  id: string
  name: string
  category: string | null
  description: string | null
  price: number | null
  price_type: string | null
  contact: string | null
}

export default function ProfessionalServicesPage() {
  const { user } = useAuth()
  const [services, setServices] = React.useState<ServiceRow[]>([])
  const [loading, setLoading] = React.useState(true)
  const [adding, setAdding] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [form, setForm] = React.useState({
    name: "", category: CATEGORIES[0], description: "", price: "", price_type: "fixed", contact: "",
  })

  const load = React.useCallback(() => {
    if (!user?.uid) return
    createClient().from("professional_services").select("*").eq("vendor_uid", user.uid)
      .order("created_at", { ascending: false })
      .then(({ data }) => { setServices(data ?? []); setLoading(false) })
  }, [user?.uid])

  React.useEffect(() => { load() }, [load])

  async function handleAdd() {
    if (!form.name || !user?.uid) return
    setSaving(true)
    await createClient().from("professional_services").insert({
      vendor_uid: user.uid, name: form.name, category: form.category,
      description: form.description || null,
      price: form.price ? parseFloat(form.price) : null,
      price_type: form.price_type,
      contact: form.contact || null,
    })
    setForm({ name: "", category: CATEGORIES[0], description: "", price: "", price_type: "fixed", contact: "" })
    setAdding(false); setSaving(false); load()
  }

  async function handleDelete(id: string) {
    await createClient().from("professional_services").delete().eq("id", id)
    load()
  }

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  const PRICE_TYPES = [
    { value: "fixed", label: "Fixed" },
    { value: "hourly", label: "Per Hour" },
    { value: "project", label: "Per Project" },
    { value: "on_request", label: "On Request" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">Professional Services</h1>
          <p className="text-muted-foreground text-sm">Services you offer — consulting, legal, accounting, and more.</p>
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
              <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Business Registration Assistance" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Category</label>
              <select className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1 col-span-2">
              <label className="text-xs font-bold text-muted-foreground">Description</label>
              <Input value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="What does this service include?" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Pricing Type</label>
              <select className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium" value={form.price_type} onChange={e => setForm(p => ({ ...p, price_type: e.target.value }))}>
                {PRICE_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            {form.price_type !== "on_request" && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">Amount (₹)</label>
                <Input type="number" placeholder="e.g. 5000" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} />
              </div>
            )}
            <div className="space-y-1 col-span-2 sm:col-span-1">
              <label className="text-xs font-bold text-muted-foreground">Contact / Enquiry</label>
              <Input value={form.contact} onChange={e => setForm(p => ({ ...p, contact: e.target.value }))} placeholder="Phone, email, or website" />
            </div>
            <div className="col-span-2 flex gap-2 pt-1">
              <Button className="h-9 rounded-lg font-bold" onClick={handleAdd} disabled={saving}>{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Service"}</Button>
              <Button variant="ghost" className="h-9 rounded-lg font-bold" onClick={() => setAdding(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {services.length === 0 && !adding && (
        <div className="text-center py-16 space-y-2">
          <p className="text-muted-foreground font-medium">No services listed yet.</p>
          <p className="text-sm text-muted-foreground">Add the services you offer to attract clients via Halal Hub.</p>
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
                  <span className="text-xs font-bold text-primary">
                    {s.price_type === "on_request" ? "Price on request" : s.price ? `₹${s.price.toLocaleString()} ${PRICE_TYPES.find(t => t.value === s.price_type)?.label ?? ""}` : "Price on request"}
                  </span>
                  {s.contact && <span className="text-xs text-muted-foreground">{s.contact}</span>}
                </div>
              </div>
              <button onClick={() => handleDelete(s.id)} className="text-muted-foreground/40 hover:text-destructive transition-colors shrink-0 mt-0.5"><Trash2 className="h-4 w-4" /></button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
