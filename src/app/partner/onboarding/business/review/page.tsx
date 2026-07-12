"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useOnboarding } from "@/lib/onboarding-context"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import {
  CheckCircle2, Building2, MapPin, Clock, Phone, ShieldCheck,
  Camera, Edit2, Loader2, AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

function fmt12(t: string) {
  if (!t) return ""
  const [hStr, m] = t.split(":")
  const h = parseInt(hStr)
  return `${h === 0 ? 12 : h > 12 ? h - 12 : h}:${m} ${h < 12 ? "AM" : "PM"}`
}

function Section({ title, icon, href, children }: { title: string; icon: React.ReactNode; href: string; children: React.ReactNode }) {
  return (
    <Card className="rounded-[2rem] border-none shadow-soft bg-card">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <p className="font-black text-sm text-foreground">{title}</p>
          </div>
          <Link href={href} className="flex items-center gap-1 text-xs font-black text-primary hover:underline">
            <Edit2 className="h-3 w-3" /> Edit
          </Link>
        </div>
        {children}
      </CardContent>
    </Card>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-4">
      <span className="text-xs font-bold text-muted-foreground w-32 shrink-0">{label}</span>
      <span className="text-sm font-bold text-foreground">{value}</span>
    </div>
  )
}

export default function ReviewPage() {
  const router = useRouter()
  const { draft, reset } = useOnboarding()
  const { toast } = useToast()
  const [submitting, setSubmitting] = useState(false)

  const halalLabel = {
    "certified": "Halal Certified",
    "self-declared": "Self-Declared Halal",
    "halal-friendly": "Halal-Friendly",
    "not-applicable": "Not Applicable",
  }[draft.halalStatus] || draft.halalStatus

  const openDays = DAYS.filter(d => !draft.hours[d]?.closed)
  const closedDays = DAYS.filter(d => draft.hours[d]?.closed)

  async function handleSubmit() {
    setSubmitting(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login?redirectTo=/partner/onboarding/business/review")
        return
      }

      const address = [draft.addressLine1, draft.addressLine2].filter(Boolean).join(", ") || null

      const socialLinks: Record<string, string> = {}
      if (draft.instagram) socialLinks.instagram = draft.instagram
      if (draft.facebook) socialLinks.facebook = draft.facebook
      if (draft.youtube) socialLinks.youtube = draft.youtube
      if (draft.tiktok) socialLinks.tiktok = draft.tiktok

      const complianceDocs: Record<string, any> = {}
      if (draft.certificationBody) complianceDocs.body = draft.certificationBody
      if (draft.certificationNumber) complianceDocs.number = draft.certificationNumber
      if (draft.certificationExpiry) complianceDocs.expiry = draft.certificationExpiry
      if (draft.documentUrls.length > 0) {
        complianceDocs.documents = draft.documentUrls.map(d => {
          const [name, path] = d.split("::")
          return { name, path }
        })
      }

      const { error } = await supabase.from("businesses").insert({
        name: draft.businessName,
        category: draft.category,
        subcategory: draft.subcategory || null,
        description: draft.description || null,
        address,
        city: draft.city || null,
        state: draft.state || null,
        country: draft.country || null,
        latitude: draft.latitude ? parseFloat(draft.latitude) : null,
        longitude: draft.longitude ? parseFloat(draft.longitude) : null,
        phone: draft.phone || null,
        whatsapp: draft.whatsapp || null,
        email: draft.email || null,
        website: draft.website || null,
        logo_url: draft.logoUrl || null,
        cover_url: draft.coverUrl || null,
        images: draft.galleryUrls.length > 0 ? draft.galleryUrls : null,
        opening_hours: draft.hours,
        halal_verified: draft.halalStatus === "certified",
        under_no_cert: draft.halalStatus === "self-declared",
        full_responsibility: draft.halalDeclarationAgreed,
        social_links: Object.keys(socialLinks).length > 0 ? socialLinks : null,
        compliance_docs: Object.keys(complianceDocs).length > 0 ? complianceDocs : null,
        status: "pending",
        owner_id: user.id,
      })

      if (error) throw error

      reset()
      router.push("/partner/onboarding/business/success")
    } catch (err: any) {
      toast({
        title: "Submission failed",
        description: err?.message ?? "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const incomplete: string[] = []
  if (!draft.businessName) incomplete.push("Business name")
  if (!draft.city) incomplete.push("Location")
  if (!draft.phone) incomplete.push("Phone number")
  if (!draft.halalStatus) incomplete.push("Halal status")
  if (!draft.halalDeclarationAgreed) incomplete.push("Halal declaration")

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Step 8 of 8</p>
        <h1 className="text-xl sm:text-3xl font-black font-headline text-foreground flex items-center gap-3">
          <CheckCircle2 className="h-8 w-8 text-primary" /> Review & Submit
        </h1>
        <p className="text-sm text-muted-foreground font-medium">Almost there! Review your listing details before submitting for approval.</p>
      </div>

      {incomplete.length > 0 && (
        <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border-2 border-amber-200 dark:border-amber-800">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-black text-amber-900 dark:text-amber-400">Missing required information</p>
            <ul className="text-xs font-bold text-amber-700 dark:text-amber-500 list-disc list-inside space-y-0.5">
              {incomplete.map(i => <li key={i}>{i}</li>)}
            </ul>
          </div>
        </div>
      )}

      <Section title="Business Information" icon={<Building2 className="h-4 w-4 text-primary" />} href="/partner/onboarding/business/details">
        <Row label="Category" value={draft.categoryLabel} />
        <Row label="Business Type" value={draft.businessType} />
        <Row label="Name" value={draft.businessName} />
        <Row label="Brand Name" value={draft.brandName} />
        <Row label="Tagline" value={draft.tagline} />
        {draft.description && (
          <div className="mt-2 p-3 bg-muted/50 rounded-xl">
            <p className="text-xs font-medium text-muted-foreground leading-relaxed line-clamp-3">{draft.description}</p>
          </div>
        )}
      </Section>

      <Section title="Location" icon={<MapPin className="h-4 w-4 text-primary" />} href="/partner/onboarding/business/location">
        <Row label="Address" value={draft.addressLine1} />
        <Row label="Line 2" value={draft.addressLine2} />
        <Row label="Landmark" value={draft.landmark} />
        <Row label="City" value={draft.city} />
        <Row label="State" value={draft.state} />
        <Row label="Country" value={draft.country} />
        <Row label="Postal Code" value={draft.postalCode} />
        {draft.latitude && <Row label="GPS" value={`${Number(draft.latitude).toFixed(5)}, ${Number(draft.longitude).toFixed(5)}`} />}
      </Section>

      <Section title="Operating Hours" icon={<Clock className="h-4 w-4 text-primary" />} href="/partner/onboarding/business/hours">
        <div className="space-y-2">
          {openDays.map(d => {
            const h = draft.hours[d]
            return (
              <div key={d} className="flex items-center justify-between text-xs">
                <span className="font-bold text-foreground w-24">{d}</span>
                <span className="font-medium text-muted-foreground">{fmt12(h.open)} – {fmt12(h.close)}</span>
              </div>
            )
          })}
          {closedDays.length > 0 && (
            <div className="flex items-center justify-between text-xs pt-1 border-t">
              <span className="font-bold text-muted-foreground">Closed</span>
              <span className="font-medium text-muted-foreground">{closedDays.join(", ")}</span>
            </div>
          )}
        </div>
      </Section>

      <Section title="Contact & Social" icon={<Phone className="h-4 w-4 text-primary" />} href="/partner/onboarding/business/contact">
        <Row label="Phone" value={draft.phone} />
        <Row label="WhatsApp" value={draft.whatsapp} />
        <Row label="Email" value={draft.email} />
        <Row label="Website" value={draft.website} />
        <Row label="Instagram" value={draft.instagram} />
        <Row label="Facebook" value={draft.facebook} />
      </Section>

      <Section title="Halal Declaration" icon={<ShieldCheck className="h-4 w-4 text-primary" />} href="/partner/onboarding/business/halal">
        <Row label="Status" value={halalLabel} />
        <Row label="Certifier" value={draft.certificationBody} />
        <Row label="Cert. No." value={draft.certificationNumber} />
        <Row label="Expiry" value={draft.certificationExpiry} />
        <Row label="Slaughter" value={draft.slaughterMethod} />
        <div className="flex items-center gap-2 mt-2">
          {draft.halalDeclarationAgreed
            ? <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400 border-0">Declaration Agreed ✓</Badge>
            : <Badge variant="destructive" className="text-xs">Declaration Not Signed</Badge>
          }
        </div>
      </Section>

      <Section title="Media" icon={<Camera className="h-4 w-4 text-primary" />} href="/partner/onboarding/business/media">
        <div className="flex gap-2 flex-wrap">
          {draft.logoUrl && <Badge variant="secondary">Logo ✓</Badge>}
          {draft.coverUrl && <Badge variant="secondary">Cover Photo ✓</Badge>}
          {draft.galleryUrls.length > 0 && <Badge variant="secondary">{draft.galleryUrls.length} Gallery Image{draft.galleryUrls.length > 1 ? "s" : ""}</Badge>}
          {draft.documentUrls.length > 0 && <Badge variant="secondary">{draft.documentUrls.length} Document{draft.documentUrls.length > 1 ? "s" : ""}</Badge>}
          {!draft.logoUrl && !draft.coverUrl && draft.galleryUrls.length === 0 && (
            <p className="text-xs text-muted-foreground font-medium">No media uploaded. You can add photos after approval too.</p>
          )}
        </div>
      </Section>

      <Card className="rounded-[2rem] border-none shadow-xl bg-gradient-to-br from-primary to-emerald-600 text-white overflow-hidden">
        <CardContent className="p-8 space-y-4">
          <h3 className="text-xl font-black">Ready to Submit?</h3>
          <p className="text-sm text-white/80 font-medium leading-relaxed">
            Our team will review your submission within 24–48 hours. You'll receive an email notification once your listing is approved and goes live.
          </p>
          <ul className="space-y-2 text-xs font-bold text-white/80">
            {["Listing reviewed by our halal verification team", "Documents checked for authenticity", "Listing goes live upon approval", "You'll receive an email with your dashboard access"].map(item => (
              <li key={item} className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-white shrink-0" />{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-between gap-4">
        <Button variant="outline" className="rounded-2xl h-14 px-8 border-2 font-black uppercase text-xs tracking-widest" onClick={() => router.back()}>
          Back
        </Button>
        <Button
          className={cn("rounded-2xl h-14 px-10 font-black bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 flex-1 transition-all", incomplete.length > 0 && "opacity-50 cursor-not-allowed")}
          onClick={handleSubmit}
          disabled={submitting || incomplete.length > 0}
        >
          {submitting ? <><Loader2 className="h-5 w-5 animate-spin mr-2" /> Submitting...</> : "Submit for Review"}
        </Button>
      </div>
    </div>
  )
}
