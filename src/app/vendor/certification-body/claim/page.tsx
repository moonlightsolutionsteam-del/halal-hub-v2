"use client"

import { useEffect, useState, useCallback } from "react"
import {
  Award, Search, Globe, MapPin, CheckCircle2, Clock, Loader2,
  Building2, Mail, Phone, User, MessageSquare, ShieldCheck
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { logErpActivity } from "@/lib/erp-logger"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"

type CertBody = {
  id: string
  name: string
  country: string | null
  coverage_type: string
  certification_categories: string[]
  claim_status: string
  accrediting_authority: string | null
}

type ClaimForm = {
  vendor_name: string
  contact_email: string
  contact_phone: string
  designation: string
  message: string
}

const COVERAGE_BADGE: Record<string, string> = {
  international: "bg-purple-50 text-purple-700 border-purple-200",
  national: "bg-blue-50 text-blue-700 border-blue-200",
  regional: "bg-amber-50 text-amber-700 border-amber-200",
}

const CLAIM_STATUS_UI: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  unclaimed: { label: "Available to Claim", className: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
  claim_pending: { label: "Claim Pending", className: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock },
  claimed: { label: "Claimed", className: "bg-slate-50 text-slate-600 border-slate-200", icon: ShieldCheck },
}

const COUNTRIES = [
  "All Countries", "Australia", "Austria", "Argentina", "Bangladesh", "Belgium",
  "Bosnia and Herzegovina", "Brazil", "Brunei Darussalam", "Cambodia", "Canada",
  "Chile", "China", "Denmark", "France", "Germany", "Greece", "Hong Kong",
  "Hungary", "India", "Indonesia", "Ireland", "Italy", "Ivory Coast", "Japan",
  "Korea", "South Korea", "Kyrgyzstan", "Lithuania", "Malaysia", "Mexico",
  "Myanmar", "Netherlands", "New Zealand", "Norway", "Pakistan", "Philippines",
  "Poland", "Russia", "Singapore", "South Africa", "Spain", "Sri Lanka", "Sudan",
  "Switzerland", "Taiwan", "Turkey", "UAE", "Ukraine", "USA", "Uzbekistan", "Vietnam"
]

export default function ClaimBodyPage() {
  const [bodies, setBodies] = useState<CertBody[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [country, setCountry] = useState("All Countries")
  const [claimTarget, setClaimTarget] = useState<CertBody | null>(null)
  const [form, setForm] = useState<ClaimForm>({
    vendor_name: "", contact_email: "", contact_phone: "", designation: "", message: ""
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState<string | null>(null)

  const supabase = createClient()

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from("certification_bodies")
      .select("id, name, country, coverage_type, certification_categories, claim_status, accrediting_authority")
      .eq("is_pre_seeded", true)
      .order("name")
    setBodies(data ?? [])
    setLoading(false)
  }, [supabase])

  useEffect(() => { load() }, [load])

  const filtered = bodies.filter(b => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) ||
      (b.country ?? "").toLowerCase().includes(search.toLowerCase())
    const matchCountry = country === "All Countries" || b.country === country
    return matchSearch && matchCountry
  })

  const handleClaim = async () => {
    if (!claimTarget) return
    if (!form.vendor_name || !form.contact_email) return
    setSubmitting(true)
    try {
      const { error } = await supabase.from("certification_body_claims").insert({
        certification_body_id: claimTarget.id,
        vendor_name: form.vendor_name,
        contact_email: form.contact_email,
        contact_phone: form.contact_phone || null,
        designation: form.designation || null,
        message: form.message || null,
        status: "pending",
      })
      if (error) throw error

      await supabase
        .from("certification_bodies")
        .update({ claim_status: "claim_pending" })
        .eq("id", claimTarget.id)

      await logErpActivity({
        action: "certification_body_claim_submitted",
        entity_type: "certification_body",
        entity_id: claimTarget.id,
        details: { body_name: claimTarget.name, applicant: form.vendor_name, email: form.contact_email },
      })

      setSubmitted(claimTarget.id)
      setBodies(prev => prev.map(b => b.id === claimTarget.id ? { ...b, claim_status: "claim_pending" } : b))
      setClaimTarget(null)
      setForm({ vendor_name: "", contact_email: "", contact_phone: "", designation: "", message: "" })
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-6xl">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-black font-headline text-foreground">Claim Your Organisation</h1>
        <p className="text-sm text-muted-foreground font-medium">
          Find your certification body in the CICOT-recognised list and submit a claim to manage your profile on Halal Hub.
        </p>
      </div>

      {/* Info banner */}
      <Card className="rounded-2xl border-emerald-200 bg-emerald-50/50">
        <CardContent className="p-4 flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <p className="text-sm font-black text-emerald-800">146 CICOT-Recognised Bodies Listed</p>
            <p className="text-xs text-emerald-700 font-medium">
              These bodies are pre-verified from the official CICOT register. Submit a claim with your contact details and our team will verify and transfer the profile to you within 48 hours.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or country..."
            className="pl-9 rounded-xl font-medium"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger className="w-full sm:w-52 rounded-xl font-medium">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {COUNTRIES.map(c => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      {!loading && (
        <p className="text-xs text-muted-foreground font-medium">
          Showing {filtered.length} of {bodies.length} bodies
        </p>
      )}

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Building2 className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="font-bold">No bodies found</p>
          <p className="text-xs mt-1">Try adjusting your search or country filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(body => {
            const statusUi = CLAIM_STATUS_UI[body.claim_status] ?? CLAIM_STATUS_UI.unclaimed
            const StatusIcon = statusUi.icon
            const isJustSubmitted = submitted === body.id
            return (
              <Card key={body.id} className="rounded-2xl border-none shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                        <Award className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <p className="font-black text-sm text-foreground leading-tight">{body.name}</p>
                        {body.country && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                            <MapPin className="h-3 w-3" />
                            {body.country}
                          </div>
                        )}
                      </div>
                    </div>
                    <Badge className={`shrink-0 text-[10px] font-bold border rounded-lg px-2 py-0.5 ${statusUi.className}`}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {isJustSubmitted ? "Claim Pending" : statusUi.label}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {body.coverage_type && (
                      <Badge className={`text-[10px] font-bold border rounded-lg px-2 py-0.5 ${COVERAGE_BADGE[body.coverage_type] ?? "bg-muted"}`}>
                        <Globe className="h-3 w-3 mr-1" />
                        {body.coverage_type.charAt(0).toUpperCase() + body.coverage_type.slice(1)}
                      </Badge>
                    )}
                    {body.accrediting_authority && (
                      <Badge className="text-[10px] font-bold border rounded-lg px-2 py-0.5 bg-slate-50 text-slate-600 border-slate-200">
                        {body.accrediting_authority}
                      </Badge>
                    )}
                  </div>

                  {body.claim_status === "unclaimed" && (
                    <Button
                      size="sm"
                      className="w-full rounded-xl font-black bg-emerald-600 hover:bg-emerald-700 text-white h-9"
                      onClick={() => setClaimTarget(body)}
                    >
                      <ShieldCheck className="h-4 w-4 mr-2" />
                      Claim This Organisation
                    </Button>
                  )}
                  {body.claim_status === "claim_pending" && (
                    <div className="flex items-center justify-center gap-2 h-9 rounded-xl bg-amber-50 border border-amber-200">
                      <Clock className="h-4 w-4 text-amber-600" />
                      <span className="text-xs font-black text-amber-700">Claim Under Review</span>
                    </div>
                  )}
                  {body.claim_status === "claimed" && (
                    <div className="flex items-center justify-center gap-2 h-9 rounded-xl bg-slate-50 border border-slate-200">
                      <CheckCircle2 className="h-4 w-4 text-slate-400" />
                      <span className="text-xs font-black text-slate-500">Already Claimed</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Claim Dialog */}
      <Dialog open={!!claimTarget} onOpenChange={open => { if (!open) setClaimTarget(null) }}>
        <DialogContent className="max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-black text-lg">Claim Your Organisation</DialogTitle>
            <DialogDescription className="text-sm font-medium text-muted-foreground">
              Submitting a claim for: <span className="font-black text-foreground">{claimTarget?.name}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-wide">Your Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Full name"
                  className="pl-9 rounded-xl font-medium"
                  value={form.vendor_name}
                  onChange={e => setForm(f => ({ ...f, vendor_name: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-wide">Work Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="you@organisation.com"
                  className="pl-9 rounded-xl font-medium"
                  value={form.contact_email}
                  onChange={e => setForm(f => ({ ...f, contact_email: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-wide">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="+1 234 567"
                    className="pl-9 rounded-xl font-medium"
                    value={form.contact_phone}
                    onChange={e => setForm(f => ({ ...f, contact_phone: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-wide">Designation</Label>
                <Input
                  placeholder="e.g. Director"
                  className="rounded-xl font-medium"
                  value={form.designation}
                  onChange={e => setForm(f => ({ ...f, designation: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-wide">Message (optional)</Label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  placeholder="Any additional context for our verification team..."
                  className="pl-9 rounded-xl font-medium min-h-[80px] resize-none"
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button variant="outline" className="rounded-xl font-black flex-1" onClick={() => setClaimTarget(null)}>
              Cancel
            </Button>
            <Button
              className="rounded-xl font-black flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={!form.vendor_name || !form.contact_email || submitting}
              onClick={handleClaim}
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Claim"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
