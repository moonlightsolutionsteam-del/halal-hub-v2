"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  ArrowLeft, MapPin, Phone, Globe, Heart, Share2,
  ShieldCheck, ShieldAlert, Star, CheckCircle2,
  ExternalLink, MessageCircle, PlayCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { useSavedBusiness } from "@/hooks/use-saved-business"
import { createClient } from "@/lib/supabase/client"
import { announceNewAchievements } from "@/lib/engagement/announce-achievements"
import { cn } from "@/lib/utils"

interface Business {
  id: string
  name: string
  description: string | null
  category: string | null
  subcategory: string | null
  address: string | null
  city: string | null
  state: string | null
  country: string | null
  phone: string | null
  whatsapp: string | null
  email: string | null
  website: string | null
  image_url: string | null
  cover_url: string | null
  logo_url: string | null
  images: string[] | null
  ambience_images: string[] | null
  menu_images: string[] | null
  youtube_links: string[] | null
  rating: string | null
  review_count: number | null
  halal_verified: boolean | null
  halal_cert_url: string | null
  opening_hours: any
  hours_open: any
  hours_from: any
  hours_to: any
  selected_cuisines: string[] | null
  selected_amenities: string[] | null
  selected_dining: string[] | null
  selected_highlights: string[] | null
  selected_meat: string[] | null
  selected_payment: string[] | null
  alcohol_served: string | null
  separate_kitchen: boolean | null
  separate_storage: boolean | null
  separate_utensils: boolean | null
  under_no_cert: boolean | null
  full_responsibility: boolean | null
  price_range: string | null
  popular_dishes: string | null
  signature_dish: string | null
  primary_cuisine: string | null
  social_links: any
  latitude: number | null
  longitude: number | null
  firebase_business_id: string | null
}

function categoryLabel(cat: string | null): string {
  const map: Record<string, string> = {
    restaurant: "Restaurant", "Food & Dining": "Food & Dining",
    meat: "Meat & Butchers", "Meat Shops & Butchers": "Meat & Butchers",
    grocery: "Grocery", "Grocery & Supermarkets": "Grocery",
    fashion: "Fashion", "Fashion & Modest Wear": "Fashion",
    education: "Education", "Education & Training": "Education",
    "Travel & Tourism": "Travel & Tourism",
    "Catering Services": "Catering", catering: "Catering",
    "Bookstores & Islamic Media": "Books & Media",
    "Cosmetics & Personal Care": "Cosmetics",
    "Healthcare, Wellness & Spiritual Healing": "Healthcare",
    "Finance & Banking": "Finance",
  }
  if (!cat) return "Business"
  return map[cat] ?? cat
}

function allImages(b: Business): string[] {
  const imgs: string[] = []
  if (b.image_url) imgs.push(b.image_url)
  if (b.cover_url && b.cover_url !== b.image_url) imgs.push(b.cover_url)
  ;[...(b.images ?? []), ...(b.ambience_images ?? []), ...(b.menu_images ?? [])]
    .filter(Boolean)
    .forEach(u => { if (!imgs.includes(u)) imgs.push(u) })
  return imgs
}

export default function BusinessDetailClient({ business }: { business: Business }) {
  const { user } = useAuth()
  const { saved, toggle: toggleSaved } = useSavedBusiness(business.id)
  const { toast } = useToast()
  const router = useRouter()
  const [checkingIn, setCheckingIn] = useState(false)
  const [checkedIn, setCheckedIn] = useState(false)

  const images = allImages(business)
  const heroImg = business.cover_url ?? business.image_url

  async function handleCheckIn() {
    if (!user) {
      router.push(`/login?redirectTo=/entities/${business.id}`)
      return
    }
    if (checkedIn) {
      toast({ title: "Already checked in today!", description: "Come back tomorrow for more coins." })
      return
    }
    setCheckingIn(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.from("check_ins").insert({
        user_id: user.uid,
        business_id: business.id,
        coins_earned: 5,
      })
      if (error) {
        if (error.code === "23505") {
          toast({ title: "Already checked in today!", description: "Come back tomorrow for more coins." })
          setCheckedIn(true)
        } else {
          throw error
        }
      } else {
        setCheckedIn(true)
        toast({ title: "Checked in! +5 Halal Coins", description: `Welcome to ${business.name}` })
        announceNewAchievements(user.uid, toast)
      }
    } catch (err: any) {
      toast({ title: "Check-in failed", description: err?.message, variant: "destructive" })
    } finally {
      setCheckingIn(false)
    }
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: business.name ?? "", url: window.location.href }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({ title: "Link copied!" })
    }
  }

  const location = [business.address, business.city, business.state].filter(Boolean).join(", ")

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* ── Hero ── */}
      <div className="relative h-56 sm:h-72 w-full bg-muted overflow-hidden">
        {heroImg ? (
          <Image src={heroImg} alt={business.name ?? ""} fill className="object-cover" priority />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-muted" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        {/* Back button */}
        <div className="absolute top-4 left-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-2xl bg-background/80 backdrop-blur-sm border shadow-sm h-10 w-10"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Share + Save */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-2xl bg-background/80 backdrop-blur-sm border shadow-sm h-10 w-10"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-2xl bg-background/80 backdrop-blur-sm border shadow-sm h-10 w-10",
              saved && "text-rose-500 border-rose-200"
            )}
            onClick={async () => {
              if (!user) {
                router.push(`/login?redirectTo=/entities/${business.id}`)
                return
              }
              const result = await toggleSaved()
              if (result.saved) announceNewAchievements(user.uid, toast)
            }}
          >
            <Heart className={cn("h-4 w-4", saved && "fill-rose-500 text-rose-500")} />
          </Button>
        </div>
      </div>

      {/* ── Identity ── */}
      <div className="container mx-auto max-w-3xl px-4 -mt-10 relative z-10 space-y-4">
        <div className="flex items-end gap-4">
          {/* Logo / fallback */}
          <div className="shrink-0 h-20 w-20 rounded-[1.5rem] border-4 border-background shadow-xl overflow-hidden bg-muted">
            {business.logo_url ? (
              <Image src={business.logo_url} alt={business.name ?? ""} width={80} height={80} className="object-cover w-full h-full" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/10">
                <span className="text-2xl font-black text-primary">{(business.name ?? "?")[0]}</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0 pb-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              {business.halal_verified && (
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 gap-1 text-[10px] font-black uppercase tracking-wide">
                  <ShieldCheck className="h-3 w-3" /> Halal Verified
                </Badge>
              )}
              <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wide">
                {categoryLabel(business.category)}
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight leading-tight truncate">
              {business.name}
            </h1>
            {location && (
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 shrink-0" /> {location}
              </p>
            )}
          </div>
        </div>

        {/* Rating row */}
        {(business.rating || business.review_count) && (
          <div className="flex items-center gap-3 text-sm">
            {business.rating && (
              <div className="flex items-center gap-1 font-black text-foreground">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {parseFloat(business.rating).toFixed(1)}
              </div>
            )}
            {(business.review_count ?? 0) > 0 && (
              <span className="text-muted-foreground">{business.review_count} reviews</span>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Button
            className={cn(
              "col-span-2 h-12 rounded-2xl font-black gap-2",
              checkedIn ? "bg-emerald-600 hover:bg-emerald-700" : ""
            )}
            onClick={handleCheckIn}
            disabled={checkingIn}
          >
            <CheckCircle2 className="h-4 w-4" />
            {checkingIn ? "Checking in…" : checkedIn ? "Checked In! +5 🪙" : "Check In (+5 Coins)"}
          </Button>
          {business.phone && (
            <Button variant="outline" className="h-12 rounded-2xl font-black gap-2" asChild>
              <a href={`tel:${business.phone}`}>
                <Phone className="h-4 w-4" /> Call
              </a>
            </Button>
          )}
          {business.whatsapp && (
            <Button variant="outline" className="h-12 rounded-2xl font-black gap-2" asChild>
              <a href={`https://wa.me/${business.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </Button>
          )}
          {!business.phone && !business.whatsapp && (
            <Button variant="outline" className="h-12 rounded-2xl font-black gap-2 col-span-2" disabled>
              <Phone className="h-4 w-4" /> No contact listed
            </Button>
          )}
        </div>

        {/* ── Tabs ── */}
        <Tabs defaultValue="info" className="w-full mt-4">
          <TabsList className="bg-muted/40 rounded-2xl p-1 h-auto w-full grid grid-cols-5 gap-1">
            {["info", "media", "offers", "halal", "events"].map(t => (
              <TabsTrigger
                key={t}
                value={t}
                className="rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wide py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                {t}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* INFO */}
          <TabsContent value="info" className="mt-4 space-y-4 animate-in fade-in duration-300">
            {business.description && (
              <Card className="rounded-2xl border-border/50">
                <CardContent className="p-4 space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">About</p>
                  <p className="text-sm text-foreground leading-relaxed">{business.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Contact & location */}
            <Card className="rounded-2xl border-border/50">
              <CardContent className="p-4 space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Contact & Location</p>
                {location && (
                  <InfoRow icon={<MapPin className="h-4 w-4" />} label={location} />
                )}
                {business.phone && (
                  <InfoRow icon={<Phone className="h-4 w-4" />} label={business.phone} href={`tel:${business.phone}`} />
                )}
                {business.website && (
                  <InfoRow icon={<Globe className="h-4 w-4" />} label={business.website} href={business.website} external />
                )}
              </CardContent>
            </Card>

            {/* Cuisines / amenities */}
            {(business.selected_cuisines?.length || business.primary_cuisine) && (
              <Card className="rounded-2xl border-border/50">
                <CardContent className="p-4 space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Cuisine</p>
                  <div className="flex flex-wrap gap-1.5">
                    {business.primary_cuisine && (
                      <Chip label={business.primary_cuisine} />
                    )}
                    {business.selected_cuisines?.filter(c => c !== business.primary_cuisine).map(c => (
                      <Chip key={c} label={c} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {business.selected_amenities?.length && (
              <Card className="rounded-2xl border-border/50">
                <CardContent className="p-4 space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Amenities</p>
                  <div className="flex flex-wrap gap-1.5">
                    {business.selected_amenities.map(a => <Chip key={a} label={a} />)}
                  </div>
                </CardContent>
              </Card>
            )}

            {(business.signature_dish || business.popular_dishes) && (
              <Card className="rounded-2xl border-border/50">
                <CardContent className="p-4 space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Must Try</p>
                  {business.signature_dish && (
                    <p className="text-sm font-black text-foreground">{business.signature_dish}</p>
                  )}
                  {business.popular_dishes && (
                    <p className="text-sm text-muted-foreground">{business.popular_dishes}</p>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* MEDIA */}
          <TabsContent value="media" className="mt-4 space-y-4 animate-in fade-in duration-300">
            {images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {images.map((src, i) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                    <Image src={src} alt={`${business.name} photo ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState icon="🖼️" title="No photos yet" desc="Be the first to add photos of this place." />
            )}
            {business.youtube_links?.filter(Boolean).map((url, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-2xl border border-border/50 bg-card hover:bg-muted/40 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-rose-100 dark:bg-rose-950/40 flex items-center justify-center shrink-0">
                  <PlayCircle className="h-5 w-5 text-rose-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-foreground truncate">Watch Video {i + 1}</p>
                  <p className="text-xs text-muted-foreground truncate">{url}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
              </a>
            ))}
          </TabsContent>

          {/* OFFERS */}
          <TabsContent value="offers" className="mt-4 animate-in fade-in duration-300">
            <EmptyState icon="🎁" title="No active offers" desc="This business hasn't added any offers yet. Check back soon!" />
          </TabsContent>

          {/* HALAL */}
          <TabsContent value="halal" className="mt-4 space-y-4 animate-in fade-in duration-300">
            <Card className="rounded-2xl border-border/50">
              <CardContent className="p-4 space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Halal Status</p>
                <div className={cn(
                  "flex items-center gap-3 p-3 rounded-xl",
                  business.halal_verified ? "bg-emerald-50 dark:bg-emerald-950/30" : "bg-amber-50 dark:bg-amber-950/30"
                )}>
                  {business.halal_verified ? (
                    <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                  ) : (
                    <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0" />
                  )}
                  <div>
                    <p className={cn("text-sm font-black", business.halal_verified ? "text-emerald-700 dark:text-emerald-400" : "text-amber-700 dark:text-amber-400")}>
                      {business.halal_verified ? "Halal Verified" : "Not Yet Verified"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {business.halal_verified
                        ? "This business has been verified halal by Halal Hub."
                        : "Verification is pending or not yet requested."}
                    </p>
                  </div>
                </div>
                {business.halal_cert_url && (
                  <a href={business.halal_cert_url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary font-bold hover:underline">
                    <ExternalLink className="h-3.5 w-3.5" /> View Certificate
                  </a>
                )}
              </CardContent>
            </Card>

            {/* Meat & slaughter */}
            {business.selected_meat?.length && (
              <Card className="rounded-2xl border-border/50">
                <CardContent className="p-4 space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Meat & Slaughter</p>
                  <div className="flex flex-wrap gap-1.5">
                    {business.selected_meat.map(m => <Chip key={m} label={m} />)}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Kitchen compliance */}
            {(business.separate_kitchen != null || business.alcohol_served != null) && (
              <Card className="rounded-2xl border-border/50">
                <CardContent className="p-4 space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Kitchen Compliance</p>
                  <ComplianceRow label="Separate Halal Kitchen" value={business.separate_kitchen} />
                  <ComplianceRow label="Separate Storage" value={business.separate_storage} />
                  <ComplianceRow label="Separate Utensils" value={business.separate_utensils} />
                  {business.alcohol_served && (
                    <ComplianceRow
                      label="Alcohol Served"
                      value={business.alcohol_served === "no" || business.alcohol_served === "No"}
                      inverted
                      note={business.alcohol_served}
                    />
                  )}
                </CardContent>
              </Card>
            )}

            {business.under_no_cert && (
              <Card className="rounded-2xl border-amber-200/60 dark:border-amber-800/40 bg-amber-50/50 dark:bg-amber-950/20">
                <CardContent className="p-4">
                  <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                    This business operates without formal certification but has made a self-declaration of halal compliance.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* EVENTS */}
          <TabsContent value="events" className="mt-4 animate-in fade-in duration-300">
            <EmptyState icon="📅" title="No upcoming events" desc="This business hasn't listed any events yet." />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function InfoRow({
  icon, label, href, external,
}: {
  icon: React.ReactNode
  label: string
  href?: string
  external?: boolean
}) {
  const content = (
    <div className="flex items-center gap-3 text-sm">
      <div className="text-muted-foreground shrink-0">{icon}</div>
      <span className={cn("text-foreground flex-1 truncate", href && "text-primary")}>{label}</span>
      {external && <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0" />}
    </div>
  )
  if (href) return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="block hover:opacity-80 transition-opacity">{content}</a>
  return <div>{content}</div>
}

function Chip({ label }: { label: string }) {
  return (
    <span className="px-2.5 py-1 rounded-full bg-muted text-xs font-bold text-foreground border border-border/50">
      {label}
    </span>
  )
}

function ComplianceRow({
  label, value, inverted = false, note,
}: {
  label: string
  value: boolean | null | undefined
  inverted?: boolean
  note?: string
}) {
  if (value == null) return null
  const positive = inverted ? !value : !!value
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}{note ? ` (${note})` : ""}</span>
      <span className={cn("text-xs font-black", positive ? "text-emerald-600" : "text-muted-foreground/50")}>
        {positive ? "✓ Yes" : "✗ No"}
      </span>
    </div>
  )
}

function EmptyState({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-3 text-center">
      <div className="text-5xl">{icon}</div>
      <p className="text-sm font-black text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground max-w-xs">{desc}</p>
    </div>
  )
}
