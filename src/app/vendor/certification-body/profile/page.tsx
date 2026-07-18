"use client"

import { useEffect, useState, useCallback } from "react"
import { Save, Loader2, Building2, Globe, Mail, Phone, MapPin } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { logErpActivity } from "@/lib/erp-logger"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

type BodyProfile = {
  id: string
  name: string
  contact_email: string | null
  contact_phone: string | null
  website_url: string | null
  registered_address: string | null
  accrediting_authority: string | null
  registration_number: string | null
  coverage_type: string
  certification_categories: string[]
  standards_issued: string[]
}

const emptyProfile: Omit<BodyProfile, "id"> = {
  name: "",
  contact_email: "",
  contact_phone: "",
  website_url: "",
  registered_address: "",
  accrediting_authority: "",
  registration_number: "",
  coverage_type: "regional",
  certification_categories: [],
  standards_issued: [],
}

export default function CertifierProfilePage() {
  const [profile, setProfile] = useState<BodyProfile | null>(null)
  const [form, setForm] = useState(emptyProfile)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [catInput, setCatInput] = useState("")
  const [stdInput, setStdInput] = useState("")

  const supabase = createClient()

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from("certification_bodies")
      .select("id,name,contact_email,contact_phone,website_url,registered_address,accrediting_authority,registration_number,coverage_type,certification_categories,standards_issued")
      .eq("status", "approved")
      .limit(1)
      .single()

    if (data) {
      setProfile(data)
      setForm({
        name: data.name ?? "",
        contact_email: data.contact_email ?? "",
        contact_phone: data.contact_phone ?? "",
        website_url: data.website_url ?? "",
        registered_address: data.registered_address ?? "",
        accrediting_authority: data.accrediting_authority ?? "",
        registration_number: data.registration_number ?? "",
        coverage_type: data.coverage_type ?? "regional",
        certification_categories: data.certification_categories ?? [],
        standards_issued: data.standards_issued ?? [],
      })
    }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const handleSave = async () => {
    if (!profile) return
    setSaving(true)

    await supabase.from("certification_bodies").update({
      contact_email: form.contact_email || null,
      contact_phone: form.contact_phone || null,
      website_url: form.website_url || null,
      registered_address: form.registered_address || null,
      accrediting_authority: form.accrediting_authority || null,
      registration_number: form.registration_number || null,
      coverage_type: form.coverage_type,
      certification_categories: form.certification_categories,
      standards_issued: form.standards_issued,
      updated_at: new Date().toISOString(),
    }).eq("id", profile.id)

    await logErpActivity({
      employeeName: "Certifier",
      action: "PROFILE UPDATED",
      module: "Profile",
      recordType: "certification_body",
      recordId: profile.id,
      recordTitle: profile.name,
    })

    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const addTag = (field: "certification_categories" | "standards_issued", value: string) => {
    const trimmed = value.trim()
    if (!trimmed) return
    setForm(f => ({ ...f, [field]: [...(f[field] ?? []), trimmed] }))
    if (field === "certification_categories") setCatInput("")
    else setStdInput("")
  }

  const removeTag = (field: "certification_categories" | "standards_issued", tag: string) => {
    setForm(f => ({ ...f, [field]: (f[field] ?? []).filter(t => t !== tag) }))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="p-8 text-center space-y-3">
        <Building2 className="h-12 w-12 text-muted-foreground mx-auto" />
        <p className="font-black text-foreground">No approved certification body linked to this account.</p>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-8 space-y-6 bg-background min-h-screen pb-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Certification Hub</div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Organisation Profile</h1>
          <p className="text-muted-foreground font-medium text-sm">Your public-facing profile on HalalHub. Changes visible to businesses browsing certification bodies.</p>
        </div>
        <Button
          className="rounded-2xl font-black bg-emerald-600 hover:bg-emerald-700 text-white h-12 px-8 gap-2 shadow-lg"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Info */}
        <Card className="rounded-3xl border-none shadow-sm bg-card">
          <CardHeader className="p-6 pb-4 border-b">
            <CardTitle className="font-black text-base flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" /> Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Organisation Name</Label>
              <Input value={form.name} disabled className="rounded-2xl h-11 bg-muted opacity-70 cursor-not-allowed" />
              <p className="text-[10px] text-muted-foreground font-medium">Name changes require admin approval — contact support.</p>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest flex items-center gap-1.5">
                <Mail className="h-3 w-3" /> Contact Email
              </Label>
              <Input
                type="email"
                value={form.contact_email ?? ""}
                onChange={e => setForm(f => ({ ...f, contact_email: e.target.value }))}
                placeholder="contact@yourbody.com"
                className="rounded-2xl h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest flex items-center gap-1.5">
                <Phone className="h-3 w-3" /> Contact Phone
              </Label>
              <Input
                value={form.contact_phone ?? ""}
                onChange={e => setForm(f => ({ ...f, contact_phone: e.target.value }))}
                placeholder="+91 98765 43210"
                className="rounded-2xl h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest flex items-center gap-1.5">
                <Globe className="h-3 w-3" /> Website
              </Label>
              <Input
                type="url"
                value={form.website_url ?? ""}
                onChange={e => setForm(f => ({ ...f, website_url: e.target.value }))}
                placeholder="https://yourbody.com"
                className="rounded-2xl h-11"
              />
            </div>
          </CardContent>
        </Card>

        {/* Org Details */}
        <Card className="rounded-3xl border-none shadow-sm bg-card">
          <CardHeader className="p-6 pb-4 border-b">
            <CardTitle className="font-black text-base flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" /> Organisation Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest flex items-center gap-1.5">
                <MapPin className="h-3 w-3" /> Registered Address
              </Label>
              <Input
                value={form.registered_address ?? ""}
                onChange={e => setForm(f => ({ ...f, registered_address: e.target.value }))}
                placeholder="Full registered office address"
                className="rounded-2xl h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Registration Number</Label>
              <Input
                value={form.registration_number ?? ""}
                onChange={e => setForm(f => ({ ...f, registration_number: e.target.value }))}
                placeholder="e.g., U74999MH2015PTC123456"
                className="rounded-2xl h-11 font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Accrediting Authority</Label>
              <Input
                value={form.accrediting_authority ?? ""}
                onChange={e => setForm(f => ({ ...f, accrediting_authority: e.target.value }))}
                placeholder="e.g., JAKIM, MUI, ESMA"
                className="rounded-2xl h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Coverage Type</Label>
              <div className="flex gap-2">
                {["regional", "national", "international"].map(t => (
                  <button
                    key={t}
                    onClick={() => setForm(f => ({ ...f, coverage_type: t }))}
                    className={`flex-1 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest border-2 transition-colors ${form.coverage_type === t ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/50"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certification Categories */}
        <Card className="rounded-3xl border-none shadow-sm bg-card">
          <CardHeader className="p-6 pb-4 border-b">
            <CardTitle className="font-black text-base">Certification Categories</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex gap-2">
              <Input
                value={catInput}
                onChange={e => setCatInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addTag("certification_categories", catInput) } }}
                placeholder="e.g., Food & Beverages, Cosmetics..."
                className="rounded-2xl h-11"
              />
              <Button variant="outline" className="rounded-2xl font-black px-4 h-11 shrink-0" onClick={() => addTag("certification_categories", catInput)}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(form.certification_categories ?? []).map(c => (
                <Badge key={c} variant="secondary" className="rounded-full font-black text-xs px-3 py-1 gap-1 cursor-pointer hover:bg-destructive/10 hover:text-destructive" onClick={() => removeTag("certification_categories", c)}>
                  {c} ×
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Standards Issued */}
        <Card className="rounded-3xl border-none shadow-sm bg-card">
          <CardHeader className="p-6 pb-4 border-b">
            <CardTitle className="font-black text-base">Halal Standards Issued</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex gap-2">
              <Input
                value={stdInput}
                onChange={e => setStdInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addTag("standards_issued", stdInput) } }}
                placeholder="e.g., JAKIM, MS 1500:2019, HMC..."
                className="rounded-2xl h-11"
              />
              <Button variant="outline" className="rounded-2xl font-black px-4 h-11 shrink-0" onClick={() => addTag("standards_issued", stdInput)}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(form.standards_issued ?? []).map(s => (
                <Badge key={s} variant="outline" className="rounded-full font-black text-xs px-3 py-1 gap-1 cursor-pointer hover:bg-destructive/10 hover:text-destructive border-2" onClick={() => removeTag("standards_issued", s)}>
                  {s} ×
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
