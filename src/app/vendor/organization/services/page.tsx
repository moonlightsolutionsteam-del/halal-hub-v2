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
  "Community Support",
  "Education & Training",
  "Food Distribution",
  "Zakat & Sadaqah",
  "Counselling & Welfare",
  "Youth Programmes",
  "Women's Programmes",
  "Legal Aid",
  "Medical Aid",
  "Revert Support",
  "Disaster Relief",
  "Advocacy",
  "Other",
]

type ServiceRow = {
  id: string
  name: string
  category: string | null
  description: string | null
  is_free: boolean | null
  contact: string | null
  eligibility: string | null
}

export default function OrganizationServicesPage() {
  const { user } = useAuth()
  const [services, setServices] = React.useState<ServiceRow[]>([])
  const [loading, setLoading] = React.useState(true)
  const [adding, setAdding] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [form, setForm] = React.useState({
    name: "", category: CATEGORIES[0], description: "", is_free: true, contact: "", eligibility: "",
  })

  const load = React.useCallback(() => {
    if (!user?.uid) return
    createClient().from("organization_services").select("*").eq("vendor_uid", user.uid)
      .order("created_at", { ascending: false })
      .then(({ data }) => { setServices(data ?? []); setLoading(false) })
  }, [user?.uid])

  React.useEffect(() => { load() }, [load])

  async function handleAdd() {
    if (!form.name || !user?.uid) return
    setSaving(true)
    await createClient().from("organization_services").insert({
      vendor_uid: user.uid, name: form.name, category: form.category,
      description: form.description || null, is_free: form.is_free,
      contact: form.contact || null, eligibility: form.eligibility || null,
    })
    setForm({ name: "", category: CATEGORIES[0], description: "", is_free: true, contact: "", eligibility: "" })
    setAdding(false); setSaving(false); load()
  }

  async function handleDelete(id: string) {
    await createClient().from("organization_services").delete().eq("id", id)
    load()
  }

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">Organisation Services</h1>
          <p className="text-muted-foreground text-sm">Community services and programmes your organisation offers.</p>
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
              <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Food Parcel Distribution" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Category</label>
              <select className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1 col-span-2">
              <label className="text-xs font-bold text-muted-foreground">Description</label>
              <Input value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Who does this serve and how?" />
            </div>
            <div className="space-y-1 col-span-2">
              <label className="text-xs font-bold text-muted-foreground">Eligibility (optional)</label>
              <Input value={form.eligibility} onChange={e => setForm(p => ({ ...p, eligibility: e.target.value }))} placeholder="e.g. Low-income families in the area" />
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-muted-foreground">Cost</label>
              <div className="flex gap-2 mt-0.5">
                {[true, false].map(f => (
                  <button key={String(f)} type="button" onClick={() => setForm(p => ({ ...p, is_free: f }))}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${form.is_free === f ? "bg-primary text-primary-foreground border-primary" : "border-input text-muted-foreground"}`}>
                    {f ? "Free" : "Paid"}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Contact</label>
              <Input value={form.contact} onChange={e => setForm(p => ({ ...p, contact: e.target.value }))} placeholder="Phone, email, or walk-in" />
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
          <p className="text-sm text-muted-foreground">Add the community services your organisation provides.</p>
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
                  <Badge className={`text-[10px] font-bold ${s.is_free ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>{s.is_free ? "Free" : "Paid"}</Badge>
                </div>
                {s.description && <p className="text-xs text-muted-foreground">{s.description}</p>}
                {s.eligibility && <p className="text-xs text-muted-foreground italic">Eligibility: {s.eligibility}</p>}
                {s.contact && <p className="text-xs text-muted-foreground">{s.contact}</p>}
              </div>
              <button onClick={() => handleDelete(s.id)} className="text-muted-foreground/40 hover:text-destructive transition-colors shrink-0 mt-0.5"><Trash2 className="h-4 w-4" /></button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
