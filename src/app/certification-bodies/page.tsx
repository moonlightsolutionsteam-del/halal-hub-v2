"use client"

import { useEffect, useState } from "react"
import {
  Award, Search, Globe, MapPin, CheckCircle2, Clock,
  Loader2, ShieldCheck, ArrowLeft, BadgeCheck, Mail,
  Phone, User, MessageSquare, CalendarDays, AlertCircle,
  Beef, FlaskConical, Sparkles, ExternalLink
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
  Dialog, DialogContent, DialogFooter, DialogHeader,
  DialogTitle, DialogDescription
} from "@/components/ui/dialog"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import Link from "next/link"

type CertBody = {
  id: string
  name: string
  country: string | null
  coverage_type: string
  certification_categories: string[]
  accrediting_authority: string | null
  claim_status: string
  is_pre_seeded: boolean
  recognition_expires_at: string | null
  address: string | null
  phone: string | null
  email: string | null
  website: string | null
  contact_person: string | null
  cert_slaughtering: boolean
  cert_raw_material: boolean
  cert_flavor: boolean
}

type ClaimForm = {
  vendor_name: string
  contact_email: string
  contact_phone: string
  designation: string
  message: string
}

const COVERAGE_BADGE: Record<string, string> = {
  international: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300",
  national: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300",
  regional: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300",
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

const COVERAGE_FILTERS = ["All", "International", "National", "Regional"]

export default function CertificationBodiesPage() {
  const [bodies, setBodies] = useState<CertBody[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [country, setCountry] = useState("All Countries")
  const [coverage, setCoverage] = useState("All")
  const [claimTarget, setClaimTarget] = useState<CertBody | null>(null)
  const [form, setForm] = useState<ClaimForm>({
    vendor_name: "", contact_email: "", contact_phone: "", designation: "", message: ""
  })
  const [submitting, setSubmitting] = useState(false)
  const [justClaimed, setJustClaimed] = useState<Set<string>>(new Set())

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from("certification_bodies")
      .select("id, name, country, coverage_type, certification_categories, accrediting_authority, claim_status, is_pre_seeded, recognition_expires_at, address, phone, email, website, contact_person, cert_slaughtering, cert_raw_material, cert_flavor")
      .eq("status", "approved")
      .order("name")
      .then(({ data }) => {
        setBodies(data ?? [])
        setLoading(false)
      })
  }, [])

  const filtered = bodies.filter(b => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) ||
      (b.country ?? "").toLowerCase().includes(search.toLowerCase())
    const matchCountry = country === "All Countries" || b.country === country
    const matchCoverage = coverage === "All" || b.coverage_type === coverage.toLowerCase()
    return matchSearch && matchCountry && matchCoverage
  })

  const handleSubmitClaim = async () => {
    if (!claimTarget || !form.vendor_name || !form.contact_email) return
    setSubmitting(true)
    try {
      const supabase = createClient()
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

      setJustClaimed(prev => new Set([...prev, claimTarget.id]))
      setBodies(prev => prev.map(b => b.id === claimTarget.id ? { ...b, claim_status: "claim_pending" } : b))
      setClaimTarget(null)
      setForm({ vendor_name: "", contact_email: "", contact_phone: "", designation: "", message: "" })
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const claimableCount = bodies.filter(b => b.is_pre_seeded && b.claim_status === "unclaimed").length

  return (
    <div className="container mx-auto p-3 sm:p-6 space-y-6 max-w-7xl pb-20">
      {/* Back link */}
      <Link href="/" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <ShieldCheck className="h-3 w-3" /> Halal Certification
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-headline text-foreground tracking-tighter">
            Certification Bodies
          </h1>
          <p className="text-muted-foreground font-medium text-sm">
            {bodies.length} globally recognised halal certification organisations from 52+ countries
          </p>
        </div>
        <Card className="rounded-2xl border-none bg-emerald-50 dark:bg-emerald-950/20 shrink-0">
          <CardContent className="p-4 flex items-center gap-3">
            <BadgeCheck className="h-8 w-8 text-emerald-600 shrink-0" />
            <div>
              <p className="font-black text-sm text-emerald-800 dark:text-emerald-300">
                {claimableCount} bodies available to claim
              </p>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                Are you one of them? Claim your profile below.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or country..."
            className="pl-9 rounded-xl font-medium h-11"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger className="w-full sm:w-52 rounded-xl font-medium h-11">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {COUNTRIES.map(c => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-2 flex-wrap">
          {COVERAGE_FILTERS.map(f => (
            <Button
              key={f}
              size="sm"
              variant={coverage === f ? "default" : "outline"}
              className={`rounded-full font-bold text-xs h-11 px-4 ${coverage === f ? "bg-primary text-primary-foreground" : ""}`}
              onClick={() => setCoverage(f)}
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      {!loading && (
        <p className="text-xs text-muted-foreground font-medium">
          Showing {filtered.length} of {bodies.length} certification bodies
        </p>
      )}

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24 text-muted-foreground">
          <Award className="h-12 w-12 mx-auto mb-3 opacity-20" />
          <p className="font-bold">No bodies found</p>
          <p className="text-xs mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(body => {
            const isClaimed = body.claim_status === "claimed"
            const isPending = body.claim_status === "claim_pending"
            const isUnclaimed = body.claim_status === "unclaimed"
            const wasJustClaimed = justClaimed.has(body.id)
            const expiryDate = body.recognition_expires_at ? new Date(body.recognition_expires_at) : null
            const isRecognitionActive = expiryDate ? expiryDate > new Date() : false
            const expiryLabel = expiryDate
              ? expiryDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
              : null

            return (
              <Card key={body.id} className="rounded-2xl border-none shadow-sm hover:shadow-md transition-all bg-card">
                <CardContent className="p-5 space-y-3">
                  {/* Name + location */}
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <p className="font-black text-sm text-foreground leading-tight">{body.name}</p>
                      {body.country && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                          <MapPin className="h-3 w-3 shrink-0" />
                          {body.country}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {body.coverage_type && (
                      <Badge className={`text-[10px] font-bold border rounded-full px-2 py-0.5 ${COVERAGE_BADGE[body.coverage_type] ?? "bg-muted"}`}>
                        <Globe className="h-2.5 w-2.5 mr-1" />
                        {body.coverage_type.charAt(0).toUpperCase() + body.coverage_type.slice(1)}
                      </Badge>
                    )}
                    {body.accrediting_authority && (
                      <Badge className="text-[10px] font-bold border rounded-full px-2 py-0.5 bg-muted text-muted-foreground border-border">
                        {body.accrediting_authority}
                      </Badge>
                    )}
                    {isClaimed && (
                      <Badge className="text-[10px] font-bold border rounded-full px-2 py-0.5 bg-emerald-50 text-emerald-700 border-emerald-200">
                        <CheckCircle2 className="h-2.5 w-2.5 mr-1" /> Verified on Halal Hub
                      </Badge>
                    )}
                  </div>

                  {/* CICOT Recognition expiry */}
                  {expiryLabel && (
                    <div className={`flex items-center gap-2 rounded-xl px-3 py-2 ${
                      isRecognitionActive
                        ? "bg-emerald-50 dark:bg-emerald-950/20"
                        : "bg-amber-50 dark:bg-amber-950/20"
                    }`}>
                      {isRecognitionActive
                        ? <CalendarDays className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        : <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                      }
                      <div className="flex-1 min-w-0">
                        <p className={`text-[10px] font-black uppercase tracking-wide ${
                          isRecognitionActive ? "text-emerald-700 dark:text-emerald-400" : "text-amber-700 dark:text-amber-400"
                        }`}>
                          {isRecognitionActive ? "CICOT Recognised" : "Renewal Due"}
                        </p>
                        <p className={`text-[11px] font-bold ${
                          isRecognitionActive ? "text-emerald-600 dark:text-emerald-500" : "text-amber-600 dark:text-amber-500"
                        }`}>
                          {isRecognitionActive ? `Valid until ${expiryLabel}` : `Expired ${expiryLabel}`}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Certification categories */}
                  {(body.cert_slaughtering || body.cert_raw_material || body.cert_flavor) && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {body.cert_slaughtering && (
                        <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-100 dark:bg-red-950/20 dark:text-red-400">
                          <Beef className="h-2.5 w-2.5" /> Slaughtering
                        </span>
                      )}
                      {body.cert_raw_material && (
                        <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 dark:bg-blue-950/20 dark:text-blue-400">
                          <FlaskConical className="h-2.5 w-2.5" /> Raw Material
                        </span>
                      )}
                      {body.cert_flavor && (
                        <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-100 dark:bg-green-950/20 dark:text-green-400">
                          <Sparkles className="h-2.5 w-2.5" /> Flavor
                        </span>
                      )}
                    </div>
                  )}

                  {/* Contact info */}
                  {(body.email || body.website || body.phone) && (
                    <div className="space-y-1 pt-0.5">
                      {body.email && (
                        <a href={`mailto:${body.email}`} className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground hover:text-primary transition-colors group truncate">
                          <Mail className="h-3 w-3 shrink-0 text-muted-foreground/50 group-hover:text-primary" />
                          <span className="truncate">{body.email}</span>
                        </a>
                      )}
                      {body.phone && (
                        <a href={`tel:${body.phone}`} className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground hover:text-primary transition-colors group">
                          <Phone className="h-3 w-3 shrink-0 text-muted-foreground/50 group-hover:text-primary" />
                          <span>{body.phone}</span>
                        </a>
                      )}
                      {body.website && (
                        <a href={body.website.startsWith('http') ? body.website : `https://${body.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground hover:text-primary transition-colors group truncate">
                          <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground/50 group-hover:text-primary" />
                          <span className="truncate">{body.website}</span>
                        </a>
                      )}
                    </div>
                  )}

                  {/* Claim CTA */}
                  {body.is_pre_seeded && isUnclaimed && (
                    <Button
                      size="sm"
                      className="w-full rounded-xl font-black h-9 bg-emerald-600 hover:bg-emerald-700 text-white"
                      onClick={() => setClaimTarget(body)}
                    >
                      <BadgeCheck className="h-4 w-4 mr-2" />
                      Claim Your Organisation
                    </Button>
                  )}
                  {body.is_pre_seeded && (isPending || wasJustClaimed) && (
                    <div className="flex items-center justify-center gap-2 h-9 rounded-xl bg-amber-50 border border-amber-200">
                      <Clock className="h-4 w-4 text-amber-600" />
                      <span className="text-xs font-black text-amber-700">Claim Under Review</span>
                    </div>
                  )}
                  {isClaimed && !isPending && (
                    <div className="flex items-center justify-center gap-2 h-9 rounded-xl bg-emerald-50/60 border border-emerald-100">
                      <ShieldCheck className="h-4 w-4 text-emerald-500" />
                      <span className="text-xs font-black text-emerald-700">Active on Halal Hub</span>
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
              Submitting a claim for:{" "}
              <span className="font-black text-foreground">{claimTarget?.name}</span>
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

          <p className="text-[11px] text-muted-foreground font-medium bg-muted rounded-xl px-3 py-2">
            Our team will verify your identity and transfer the profile to your account within 48 hours. You will then receive access to the Certification Body vendor panel.
          </p>

          <DialogFooter className="flex gap-2">
            <Button variant="outline" className="rounded-xl font-black flex-1" onClick={() => setClaimTarget(null)}>
              Cancel
            </Button>
            <Button
              className="rounded-xl font-black flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={!form.vendor_name || !form.contact_email || submitting}
              onClick={handleSubmitClaim}
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Claim"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
