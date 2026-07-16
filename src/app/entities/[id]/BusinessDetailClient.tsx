"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  ArrowLeft, MapPin, Phone, Globe, Heart, Share2,
  ShieldCheck, ShieldAlert, Star, CheckCircle2,
  ExternalLink, MessageCircle, PlayCircle, Clock,
  Instagram, Facebook, Twitter, Link2,
  Navigation, Users, Send, Calendar, Flag, X,
  CreditCard, Utensils, ChevronRight, Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { useSavedBusiness } from "@/hooks/use-saved-business"
import { createClient } from "@/lib/supabase/client"
import { announceNewAchievements } from "@/lib/engagement/announce-achievements"
import { cn } from "@/lib/utils"

interface CatalogItem {
  id: string
  title: string | null
  description: string | null
  price: number | null
  image_url: string | null
}

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
  prayer_times?: any
  latitude: number | null
  longitude: number | null
  firebase_business_id: string | null
}

// ── Category group mapping ────────────────────────────────────────────────────

type CategoryGroup =
  | "food"
  | "catering"
  | "meat"
  | "grocery"
  | "fashion"
  | "cosmetics"
  | "education"
  | "health"
  | "finance"
  | "travel"
  | "books"
  | "mosque"

function getCategoryGroup(cat: string | null): CategoryGroup {
  const c = (cat ?? "").toLowerCase()
  if (c.includes("mosque") || c.includes("masjid") || c.includes("islamic centre") || c.includes("islamic center")) return "mosque"
  if (c.includes("restaurant") || c.includes("food & dining")) return "food"
  if (c.includes("catering")) return "catering"
  if (c.includes("meat") || c.includes("butcher")) return "meat"
  if (c.includes("grocery") || c.includes("supermarket")) return "grocery"
  if (c.includes("fashion") || c.includes("modest wear")) return "fashion"
  if (c.includes("cosmetic") || c.includes("beauty") || c.includes("personal care")) return "cosmetics"
  if (c.includes("education") || c.includes("training") || c.includes("school")) return "education"
  if (c.includes("health") || c.includes("wellness") || c.includes("clinic") || c.includes("healing")) return "health"
  if (c.includes("finance") || c.includes("banking")) return "finance"
  if (c.includes("travel") || c.includes("tourism")) return "travel"
  if (c.includes("book") || c.includes("media") || c.includes("library")) return "books"
  return "food"
}

function categoryLabel(cat: string | null): string {
  const map: Record<string, string> = {
    restaurant: "Restaurant", "Food & Dining": "Food & Dining",
    meat: "Meat & Butchers", "Meat Shops & Butchers": "Meat & Butchers",
    grocery: "Grocery", "Grocery & Supermarkets": "Grocery",
    fashion: "Fashion", "Fashion & Modest Wear": "Modest Fashion",
    education: "Education", "Education & Training": "Education",
    "Travel & Tourism": "Travel & Tourism",
    "Catering Services": "Catering",
    "Bookstores & Islamic Media": "Books & Media",
    "Cosmetics & Personal Care": "Cosmetics",
    "Healthcare, Wellness & Spiritual Healing": "Healthcare",
    "Finance & Banking": "Islamic Finance",
    "Mosques & Islamic Centres": "Mosque",
  }
  if (!cat) return "Business"
  return map[cat] ?? cat
}

// ── Tab definitions per category ──────────────────────────────────────────────

interface TabDef { value: string; label: string }

function getTabsForGroup(group: CategoryGroup): TabDef[] {
  const media = { value: "media", label: "Gallery" }
  const events = { value: "events", label: "Events" }
  const offers = { value: "events", label: "Offers" }
  const halal = { value: "halal", label: "Halal" }
  const reviews = { value: "reviews", label: "Reviews" }

  switch (group) {
    case "food":      return [{ value: "info", label: "Info" }, { value: "second", label: "Menu" },       media, halal, events]
    case "catering":  return [{ value: "info", label: "Info" }, { value: "second", label: "Packages" },   media, halal, events]
    case "meat":      return [{ value: "info", label: "Info" }, { value: "second", label: "Stock" },      media, halal, offers]
    case "grocery":   return [{ value: "info", label: "Info" }, { value: "second", label: "Sections" },   media, halal, offers]
    case "fashion":   return [{ value: "info", label: "Info" }, { value: "second", label: "Range" },      media, halal, offers]
    case "cosmetics": return [{ value: "info", label: "Info" }, { value: "second", label: "Products" },   media, halal, offers]
    case "education": return [{ value: "info", label: "Info" }, { value: "second", label: "Courses" },    media, reviews, events]
    case "health":    return [{ value: "info", label: "Info" }, { value: "second", label: "Services" },   media, reviews, offers]
    case "finance":   return [{ value: "info", label: "Info" }, { value: "second", label: "Services" },   media, reviews, offers]
    case "travel":    return [{ value: "info", label: "Info" }, { value: "second", label: "Packages" },   media, reviews, events]
    case "books":     return [{ value: "info", label: "Info" }, { value: "second", label: "Collection" }, media, reviews, events]
    case "mosque":    return [{ value: "info", label: "Info" }, { value: "second", label: "Prayers" },    media, reviews, events]
  }
}

// ── Category highlight chips ──────────────────────────────────────────────────

interface Highlight { emoji: string; label: string }

function getCategoryHighlights(group: CategoryGroup): Highlight[] {
  switch (group) {
    case "food":      return [{ emoji: "🍽️", label: "Dine In" }, { emoji: "📦", label: "Takeaway" }, { emoji: "🛵", label: "Delivery" }, { emoji: "🎉", label: "Private Events" }]
    case "catering":  return [{ emoji: "💒", label: "Weddings" }, { emoji: "🏢", label: "Corporate" }, { emoji: "🍽️", label: "Aqiqah & Walima" }, { emoji: "👨‍🍳", label: "Live Counters" }, { emoji: "📋", label: "Custom Menus" }, { emoji: "🚚", label: "Setup & Logistics" }]
    case "meat":      return [{ emoji: "🐔", label: "Chicken" }, { emoji: "🐑", label: "Mutton" }, { emoji: "🐄", label: "Beef" }, { emoji: "🐟", label: "Seafood" }, { emoji: "⚔️", label: "Zabihah Certified" }, { emoji: "🔪", label: "Custom Cuts" }]
    case "grocery":   return [{ emoji: "🥦", label: "Fresh Produce" }, { emoji: "🥛", label: "Dairy" }, { emoji: "❄️", label: "Frozen Foods" }, { emoji: "🌍", label: "Imported Goods" }, { emoji: "🌿", label: "Organic Range" }, { emoji: "🏠", label: "Home Delivery" }]
    case "fashion":   return [{ emoji: "🧕", label: "Abayas" }, { emoji: "🧣", label: "Hijabs" }, { emoji: "👗", label: "Modest Casuals" }, { emoji: "🤍", label: "Prayer Sets" }, { emoji: "✂️", label: "Custom Tailoring" }, { emoji: "📦", label: "Ships Nationwide" }]
    case "cosmetics": return [{ emoji: "💄", label: "Halal Makeup" }, { emoji: "🧴", label: "Skincare" }, { emoji: "🌸", label: "Fragrance" }, { emoji: "✅", label: "Alcohol-Free" }, { emoji: "🌿", label: "Natural Ingredients" }, { emoji: "💆", label: "Beauty Consultations" }]
    case "education": return [{ emoji: "📖", label: "Quran & Tajweed" }, { emoji: "🕌", label: "Islamic Studies" }, { emoji: "🔤", label: "Arabic Language" }, { emoji: "🎓", label: "Certified Curriculum" }, { emoji: "🌙", label: "Weekend Batches" }, { emoji: "💻", label: "Online Classes" }]
    case "health":    return [{ emoji: "🩺", label: "General Medicine" }, { emoji: "🦷", label: "Dental Care" }, { emoji: "💆", label: "Physiotherapy" }, { emoji: "🌿", label: "Hijama Therapy" }, { emoji: "👩", label: "Female-Only Slots" }, { emoji: "🧠", label: "Mental Wellness" }]
    case "finance":   return [{ emoji: "🏠", label: "Islamic Mortgage" }, { emoji: "📈", label: "Halal Investments" }, { emoji: "📜", label: "Sukuk" }, { emoji: "🌙", label: "Zakat Planning" }, { emoji: "🌍", label: "NRI Advisory" }, { emoji: "☕", label: "Free Consultation" }]
    case "travel":    return [{ emoji: "🕋", label: "Hajj Packages" }, { emoji: "🌙", label: "Umrah Packages" }, { emoji: "🇹🇷", label: "Turkey" }, { emoji: "🇲🇾", label: "Malaysia" }, { emoji: "🇦🇪", label: "UAE" }, { emoji: "🤲", label: "Guided Group Tours" }]
    case "books":     return [{ emoji: "📖", label: "Quran & Tafseer" }, { emoji: "🕌", label: "Fiqh & Seerah" }, { emoji: "👶", label: "Children's Books" }, { emoji: "🔤", label: "Arabic Learning" }, { emoji: "🎵", label: "Audio & Media" }, { emoji: "📦", label: "Bulk Orders" }]
    case "mosque":    return [{ emoji: "🕌", label: "5 Daily Prayers" }, { emoji: "🗓️", label: "Jumu'ah" }, { emoji: "💧", label: "Wudu Facilities" }, { emoji: "👩", label: "Ladies' Section" }, { emoji: "📖", label: "Quran Classes" }, { emoji: "🌙", label: "Ramadan Programmes" }]
  }
}

// ── Set as My Mosque (blueprint §7.3) ─────────────────────────────────────────

function SetMyMosqueButton({ mosqueId, mosqueName }: { mosqueId: string; mosqueName: string }) {
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [isMine, setIsMine] = useState<boolean | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!user?.uid) { setIsMine(false); return }
    const supabase = createClient()
    ;(supabase as any)
      .from("user_prayer_settings")
      .select("my_mosque_id")
      .eq("user_id", user.uid)
      .maybeSingle()
      .then(({ data }: { data: any }) => setIsMine(data?.my_mosque_id === mosqueId))
  }, [user?.uid, mosqueId])

  const toggle = async () => {
    if (!user?.uid) { router.push(`/login?redirectTo=/entities/${mosqueId}`); return }
    setSaving(true)
    const supabase = createClient()
    const next = !isMine
    const { error } = await (supabase as any).from("user_prayer_settings").upsert(
      { user_id: user.uid, my_mosque_id: next ? mosqueId : null, updated_at: new Date().toISOString() },
      { onConflict: "user_id" },
    )
    setSaving(false)
    if (error) {
      toast({ title: "Could not update", description: error.message })
      return
    }
    setIsMine(next)
    toast({
      title: next ? "Set as your mosque 🕌" : "Removed as your mosque",
      description: next
        ? `${mosqueName}'s Jumu'ah time will now appear on your Prayer Times screen.`
        : undefined,
    })
  }

  return (
    <Button
      onClick={toggle}
      disabled={saving || isMine === null}
      className={cn(
        "w-full h-12 rounded-2xl font-black gap-2",
        isMine ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""
      )}
      variant={isMine ? "default" : "outline"}
    >
      <CheckCircle2 className="h-4 w-4" />
      {saving ? "Saving…" : isMine ? "✓ My Mosque" : "Set as My Mosque"}
    </Button>
  )
}

// ── Halal tab variant ─────────────────────────────────────────────────────────

function isFullHalalCategory(group: CategoryGroup): boolean {
  return ["food", "catering", "meat", "grocery", "cosmetics"].includes(group)
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function allImages(b: Business): string[] {
  const imgs: string[] = []
  if (b.image_url) imgs.push(b.image_url)
  if (b.cover_url && b.cover_url !== b.image_url) imgs.push(b.cover_url)
  ;[...(b.images ?? []), ...(b.ambience_images ?? []), ...(b.menu_images ?? [])]
    .filter(Boolean)
    .forEach(u => { if (!imgs.includes(u)) imgs.push(u) })
  return imgs
}

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
const DAY_SHORT: Record<string, string> = {
  monday: "Mon", tuesday: "Tue", wednesday: "Wed", thursday: "Thu",
  friday: "Fri", saturday: "Sat", sunday: "Sun",
}

function HoursDisplay({ hours }: { hours: any }) {
  if (!hours || typeof hours !== "object") return null
  const entries = DAYS.filter(d => hours[d]).map(d => ({
    day: DAY_SHORT[d],
    open: hours[d]?.open ?? "closed",
    close: hours[d]?.close ?? "",
  }))
  if (!entries.length) return null

  return (
    <Card className="rounded-2xl border-border/50">
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center gap-2 mb-1">
          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Opening Hours</p>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1">
          {entries.map(({ day, open, close }) => (
            <div key={day} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground font-medium w-8">{day}</span>
              {open === "closed" ? (
                <span className="text-muted-foreground/50 text-xs font-bold">Closed</span>
              ) : (
                <span className="font-bold text-foreground text-xs">{open} – {close}</span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function SocialLinks({ links }: { links: any }) {
  if (!links || typeof links !== "object") return null
  const { instagram, facebook, twitter, website } = links
  const items = [
    instagram && { icon: <Instagram className="h-4 w-4" />, label: instagram, href: `https://instagram.com/${instagram.replace(/^@/, "")}`, color: "text-pink-600 bg-pink-50 dark:bg-pink-950/30" },
    facebook && { icon: <Facebook className="h-4 w-4" />, label: "Facebook", href: facebook.startsWith("http") ? facebook : `https://${facebook}`, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/30" },
    twitter && { icon: <Twitter className="h-4 w-4" />, label: twitter, href: `https://twitter.com/${twitter.replace(/^@/, "")}`, color: "text-sky-600 bg-sky-50 dark:bg-sky-950/30" },
    website && { icon: <Globe className="h-4 w-4" />, label: website, href: website.startsWith("http") ? website : `https://${website}`, color: "text-primary bg-primary/5" },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; href: string; color: string }[]

  if (!items.length) return null
  return (
    <Card className="rounded-2xl border-border/50">
      <CardContent className="p-4 space-y-2">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Follow & Connect</p>
        <div className="flex flex-wrap gap-2">
          {items.map(({ icon, label, href, color }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer"
              className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-opacity hover:opacity-80", color)}>
              {icon}
              <span className="truncate max-w-[120px]">{label}</span>
              <ExternalLink className="h-3 w-3 shrink-0 opacity-50" />
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// ── Second tab content per category group ─────────────────────────────────────

function SecondTabContent({ business, group, menuItems }: { business: Business; group: CategoryGroup; menuItems: CatalogItem[] }) {
  const highlights = getCategoryHighlights(group)

  // Shared building blocks
  const HighlightChips = () => highlights.length ? (
    <Card className="rounded-2xl border-border/50">
      <CardContent className="p-4 space-y-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          {group === "meat" ? "What We Offer" :
           group === "catering" ? "Event Types" :
           group === "grocery" ? "Store Sections" :
           group === "fashion" ? "What We Carry" :
           group === "cosmetics" ? "Product Range" :
           group === "education" ? "Programmes" :
           group === "health" ? "Specialities" :
           group === "finance" ? "Our Services" :
           group === "travel" ? "Travel Packages" :
           group === "books" ? "Our Collection" :
           "Highlights"}
        </p>
        <div className="flex flex-wrap gap-2">
          {highlights.map(({ emoji, label }) => (
            <span key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted text-xs font-bold text-foreground">
              <span>{emoji}</span> {label}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  ) : null

  const PriceCard = ({ label }: { label: string }) => business.price_range ? (
    <Card className="rounded-2xl border-border/50">
      <CardContent className="p-4 flex items-center justify-between">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="text-sm font-black text-foreground">{business.price_range}</p>
      </CardContent>
    </Card>
  ) : null

  const SubcategoryBadge = () => business.subcategory ? (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className="rounded-xl font-bold text-xs">{business.subcategory}</Badge>
    </div>
  ) : null

  // ── FOOD ──
  if (group === "food") {
    const menuImgs = business.menu_images?.filter(Boolean) ?? []
    const hasContent = menuItems.length > 0 || business.signature_dish || business.popular_dishes || menuImgs.length > 0
    return (
      <div className="space-y-4">
        {/* Must Try dishes */}
        {(business.signature_dish || business.popular_dishes) && (
          <Card className="rounded-2xl border-border/50">
            <CardContent className="p-4 space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Must Try</p>
              {business.signature_dish && <p className="text-sm font-black text-foreground">{business.signature_dish}</p>}
              {business.popular_dishes && <p className="text-sm text-muted-foreground">{business.popular_dishes}</p>}
            </CardContent>
          </Card>
        )}

        {/* Live menu items from vendor panel */}
        {menuItems.length > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Menu</p>
            <div className="space-y-2">
              {menuItems.map(item => (
                <Card key={item.id} className="rounded-2xl border-border/50">
                  <CardContent className="p-3 flex items-center gap-3">
                    {item.image_url && (
                      <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-muted shrink-0">
                        <Image src={item.image_url} alt={item.title ?? ""} fill className="object-cover" sizes="64px" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-black text-foreground">{item.title}</p>
                        {item.price != null && (
                          <p className="text-sm font-black text-primary shrink-0">₹{item.price}</p>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{item.description}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Menu photo images (fallback when no catalog items) */}
        {menuItems.length === 0 && menuImgs.length > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Menu Photos</p>
            <div className="grid grid-cols-2 gap-2">
              {menuImgs.map((src, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                  <Image src={src} alt="Menu" fill className="object-cover" sizes="50vw" />
                </div>
              ))}
            </div>
          </div>
        )}

        {business.selected_dining?.length ? (
          <Card className="rounded-2xl border-border/50">
            <CardContent className="p-4 space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Dining Options</p>
              <div className="flex flex-wrap gap-1.5">
                {business.selected_dining.map(d => <Chip key={d} label={d} />)}
              </div>
            </CardContent>
          </Card>
        ) : null}
        <PriceCard label="Price Range" />
        {!hasContent && (
          <EmptyState icon="🍽️" title="Menu coming soon" desc="This restaurant hasn't uploaded their menu yet." />
        )}
      </div>
    )
  }

  // ── CATERING ──
  if (group === "catering") {
    return (
      <div className="space-y-4">
        <SubcategoryBadge />
        <HighlightChips />
        <PriceCard label="Starting Price (Per Person)" />
        <Card className="rounded-2xl border-border/50 bg-primary/5 border-primary/20">
          <CardContent className="p-4 space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary/80">Book a Consultation</p>
            <p className="text-sm text-muted-foreground font-medium">Contact us to discuss your event requirements, guest count, and preferred menu options.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ── MEAT ──
  if (group === "meat") {
    return (
      <div className="space-y-4">
        {business.selected_meat?.length ? (
          <Card className="rounded-2xl border-border/50">
            <CardContent className="p-4 space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Available Stock</p>
              <div className="flex flex-wrap gap-1.5">
                {business.selected_meat.map(m => <Chip key={m} label={m} />)}
              </div>
            </CardContent>
          </Card>
        ) : (
          <HighlightChips />
        )}
        <PriceCard label="Price Range (Per kg)" />
        {business.halal_verified && (
          <Card className="rounded-2xl border-emerald-200/60 dark:border-emerald-800/40 bg-emerald-50/50 dark:bg-emerald-950/20">
            <CardContent className="p-4 flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
              <div>
                <p className="text-sm font-black text-emerald-700 dark:text-emerald-400">Zabihah Certified</p>
                <p className="text-xs text-muted-foreground">Daily on-site slaughter under Islamic supervision</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  // ── GROCERY ──
  if (group === "grocery") {
    return (
      <div className="space-y-4">
        <HighlightChips />
        {business.halal_verified && (
          <Card className="rounded-2xl border-emerald-200/60 dark:border-emerald-800/40 bg-emerald-50/50 dark:bg-emerald-950/20">
            <CardContent className="p-4 flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
              <div>
                <p className="text-sm font-black text-emerald-700 dark:text-emerald-400">100% Halal Assurance</p>
                <p className="text-xs text-muted-foreground">Every product verified — no ambiguous additives, no alcohol-based goods</p>
              </div>
            </CardContent>
          </Card>
        )}
        <PriceCard label="Pricing" />
      </div>
    )
  }

  // ── FASHION ──
  if (group === "fashion") {
    return (
      <div className="space-y-4">
        <SubcategoryBadge />
        <HighlightChips />
        <PriceCard label="Price Range" />
        {business.website && (
          <Card className="rounded-2xl border-border/50">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Shop Online</p>
                <p className="text-sm font-bold text-primary truncate">{business.website}</p>
              </div>
              <a href={business.website.startsWith("http") ? business.website : `https://${business.website}`}
                target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  // ── COSMETICS ──
  if (group === "cosmetics") {
    return (
      <div className="space-y-4">
        <SubcategoryBadge />
        <HighlightChips />
        {business.halal_verified && (
          <Card className="rounded-2xl border-emerald-200/60 dark:border-emerald-800/40 bg-emerald-50/50 dark:bg-emerald-950/20">
            <CardContent className="p-4 flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
              <div>
                <p className="text-sm font-black text-emerald-700 dark:text-emerald-400">Halal Certified Products</p>
                <p className="text-xs text-muted-foreground">All products free from alcohol, animal-derived ingredients, and harmful chemicals</p>
              </div>
            </CardContent>
          </Card>
        )}
        <PriceCard label="Price Range" />
      </div>
    )
  }

  // ── EDUCATION ──
  if (group === "education") {
    return (
      <div className="space-y-4">
        <SubcategoryBadge />
        <HighlightChips />
        <PriceCard label="Fees" />
        {business.opening_hours && (
          <Card className="rounded-2xl border-border/50">
            <CardContent className="p-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Schedule</p>
              <p className="text-sm text-muted-foreground font-medium">Morning, evening, and weekend batches available. Contact us for timings.</p>
            </CardContent>
          </Card>
        )}
        {business.website && (
          <Card className="rounded-2xl border-border/50">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Apply / Enquire</p>
                <p className="text-sm font-bold text-primary truncate">{business.website}</p>
              </div>
              <a href={business.website.startsWith("http") ? business.website : `https://${business.website}`}
                target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  // ── HEALTH ──
  if (group === "health") {
    return (
      <div className="space-y-4">
        <SubcategoryBadge />
        <HighlightChips />
        <PriceCard label="Consultation Fee" />
        <Card className="rounded-2xl border-border/50 bg-primary/5 border-primary/20">
          <CardContent className="p-4 space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary/80">Gender Sensitivity</p>
            <p className="text-sm text-muted-foreground font-medium">Female-only appointment slots available. Please call ahead to book.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ── FINANCE ──
  if (group === "finance") {
    return (
      <div className="space-y-4">
        <SubcategoryBadge />
        <HighlightChips />
        <PriceCard label="Advisory Fees" />
        <Card className="rounded-2xl border-primary/20 bg-primary/5">
          <CardContent className="p-4 space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary/80">Free Initial Consultation</p>
            <p className="text-sm text-muted-foreground font-medium">Book a no-obligation 30-minute session to discuss your financial goals within an Islamic framework.</p>
          </CardContent>
        </Card>
        {business.website && (
          <Card className="rounded-2xl border-border/50">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Book Online</p>
                <p className="text-sm font-bold text-primary truncate">{business.website}</p>
              </div>
              <a href={business.website.startsWith("http") ? business.website : `https://${business.website}`}
                target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  // ── TRAVEL ──
  if (group === "travel") {
    return (
      <div className="space-y-4">
        <SubcategoryBadge />
        <HighlightChips />
        <PriceCard label="Package Prices (Per Person)" />
        <Card className="rounded-2xl border-primary/20 bg-primary/5">
          <CardContent className="p-4 space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary/80">IATA & MOIA Registered</p>
            <p className="text-sm text-muted-foreground font-medium">Licensed Hajj & Umrah operator with Ministry of Minority Affairs approval. Groups accompanied by experienced guides.</p>
          </CardContent>
        </Card>
        {business.website && (
          <Card className="rounded-2xl border-border/50">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">View All Packages</p>
                <p className="text-sm font-bold text-primary truncate">{business.website}</p>
              </div>
              <a href={business.website.startsWith("http") ? business.website : `https://${business.website}`}
                target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  // ── BOOKS ──
  if (group === "books") {
    return (
      <div className="space-y-4">
        <SubcategoryBadge />
        <HighlightChips />
        <PriceCard label="Price Range" />
        {business.website && (
          <Card className="rounded-2xl border-border/50">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Shop Online / Catalogue</p>
                <p className="text-sm font-bold text-primary truncate">{business.website}</p>
              </div>
              <a href={business.website.startsWith("http") ? business.website : `https://${business.website}`}
                target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
            </CardContent>
          </Card>
        )}
        <Card className="rounded-2xl border-border/50 bg-muted/30">
          <CardContent className="p-4 space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Bulk & Institutional Orders</p>
            <p className="text-sm text-muted-foreground font-medium">Supply to madrasas, Islamic schools, and mosques. Contact us for wholesale pricing.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ── MOSQUE ──
  if (group === "mosque") {
    const pt = business.prayer_times ?? {}
    const congregation: { name: string; time: string | undefined }[] = [
      { name: "Fajr", time: pt.fajr },
      { name: "Dhuhr", time: pt.dhuhr },
      { name: "Asr", time: pt.asr },
      { name: "Maghrib", time: pt.maghrib },
      { name: "Isha", time: pt.isha },
    ]
    const hasTimes = congregation.some(p => p.time)
    return (
      <div className="space-y-4">
        <SetMyMosqueButton mosqueId={business.id} mosqueName={business.name} />

        {pt.jumuah && (
          <Card className="rounded-2xl border-primary/20 bg-primary/5">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary/80">Jumu'ah Prayer</p>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">
                  {Array.isArray(pt.khutbah_languages) && pt.khutbah_languages.length > 0
                    ? `Khutbah in ${pt.khutbah_languages.join(" & ")}`
                    : "Friday congregation"}
                </p>
              </div>
              <p className="text-2xl font-black text-primary tabular-nums">{pt.jumuah}</p>
            </CardContent>
          </Card>
        )}

        {hasTimes && (
          <Card className="rounded-2xl border-border/50">
            <CardContent className="p-4 space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Congregation Times</p>
              {congregation.filter(p => p.time).map(({ name, time }) => (
                <div key={name} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-medium">{name}</span>
                  <span className="font-black text-foreground tabular-nums">{time}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <Card className="rounded-2xl border-border/50">
          <CardContent className="p-4 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Facilities</p>
            <div className="flex flex-wrap gap-1.5">
              {pt.wudu && <Chip label="💧 Wudu Facilities" />}
              {pt.ladies_section && <Chip label="👩 Ladies' Section" />}
              {!pt.wudu && !pt.ladies_section && <Chip label="Contact mosque for facilities" />}
            </div>
          </CardContent>
        </Card>

        {!hasTimes && (
          <EmptyState icon="🕌" title="Prayer times not listed" desc="This mosque hasn't added congregation times yet." />
        )}
      </div>
    )
  }

  return null
}

// ── Halal tab content ─────────────────────────────────────────────────────────

function HalalTabContent({ business, group }: { business: Business; group: CategoryGroup }) {
  const full = isFullHalalCategory(group)

  return (
    <div className="space-y-4">
      {/* Status */}
      <Card className="rounded-2xl border-border/50">
        <CardContent className="p-4 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Halal Status</p>
          <div className={cn(
            "flex items-center gap-3 p-3 rounded-xl",
            business.halal_verified ? "bg-emerald-50 dark:bg-emerald-950/30" : "bg-amber-50 dark:bg-amber-950/30"
          )}>
            {business.halal_verified
              ? <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
              : <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0" />}
            <div>
              <p className={cn("text-sm font-black", business.halal_verified ? "text-emerald-700 dark:text-emerald-400" : "text-amber-700 dark:text-amber-400")}>
                {business.halal_verified ? "Halal Verified" : "Pending Verification"}
              </p>
              <p className="text-xs text-muted-foreground">
                {business.halal_verified
                  ? "Verified and approved by Halal Hub."
                  : "Verification is in progress or not yet requested."}
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

      {/* Food/Meat/Grocery/Catering: full kitchen compliance */}
      {full && (
        <>
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

          {(business.separate_kitchen != null || business.alcohol_served != null) && (
            <Card className="rounded-2xl border-border/50">
              <CardContent className="p-4 space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Kitchen Compliance</p>
                <ComplianceRow label="Dedicated Halal Kitchen" value={business.separate_kitchen} />
                <ComplianceRow label="Separate Halal Storage" value={business.separate_storage} />
                <ComplianceRow label="Dedicated Utensils" value={business.separate_utensils} />
                {business.alcohol_served && (
                  <ComplianceRow
                    label="Alcohol-Free Premises"
                    value={business.alcohol_served.toLowerCase() === "no"}
                  />
                )}
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Cosmetics: product-level halal */}
      {group === "cosmetics" && (
        <Card className="rounded-2xl border-border/50">
          <CardContent className="p-4 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Product Standards</p>
            {[
              "No alcohol or ethanol-based ingredients",
              "No pork-derived gelatin or collagen",
              "No carmine (insect-derived pigment)",
              "Cruelty-free formulations",
            ].map(s => (
              <div key={s} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span className="text-foreground font-medium">{s}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Non-food: general info */}
      {!full && group !== "cosmetics" && (
        <Card className="rounded-2xl border-border/50 bg-muted/30">
          <CardContent className="p-4 space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">About Our Halal Commitment</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {group === "finance" && "All advisory services strictly adhere to Islamic finance principles — no riba (interest), no investments in prohibited industries (alcohol, gambling, weapons), and full transparency in fee structures."}
              {group === "education" && "Our curriculum and teaching methods are developed in accordance with Islamic values. All staff uphold Islamic ethical standards in their conduct and interactions."}
              {group === "health" && "Medications and treatments prescribed are reviewed for halal compliance where possible. Gelatin capsules and alcohol-based formulations are avoided unless medically essential and disclosed."}
              {group === "travel" && "All accommodation, transport, and catering arrangements are halal-assured. Prayer facilities and qibla direction are provided at all destinations."}
              {group === "books" && "All content sold and promoted upholds Islamic values. We do not stock material that contradicts Islamic ethics or promotes impermissible practices."}
              {group === "fashion" && "All clothing is designed to meet Islamic modesty (hijab) standards. No revealing cuts, sheer fabrics, or designs that compromise modesty."}
              {!["finance","education","health","travel","books","fashion"].includes(group) && "This business is committed to operating in accordance with Islamic principles and Halal Hub community standards."}
            </p>
          </CardContent>
        </Card>
      )}

      {business.under_no_cert && (
        <Card className="rounded-2xl border-amber-200/60 dark:border-amber-800/40 bg-amber-50/50 dark:bg-amber-950/20">
          <CardContent className="p-4">
            <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
              This business operates without formal halal certification but has made a self-declaration of compliance.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Halal transparency badge */}
      <Card className="rounded-2xl border-border/50">
        <CardContent className="p-4 flex items-center gap-3">
          <Award className="h-5 w-5 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black text-foreground">
              {business.halal_verified ? "Certified by HalalHub" : "Self Declared"}
            </p>
            <p className="text-xs text-muted-foreground">
              {business.halal_verified
                ? "Reviewed and approved by HalalHub's verification team"
                : "Business has self-declared their halal practices"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Suggest an Edit */}
      <div className="flex justify-center pt-2">
        <button className="text-xs text-muted-foreground hover:text-primary transition-colors font-medium underline underline-offset-2">
          Suggest an Edit
        </button>
      </div>
    </div>
  )
}

// ── Enquire modal ─────────────────────────────────────────────────────────────

function EnquireModal({ business, onClose }: { business: Business; onClose: () => void }) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [name, setName] = useState(user?.name ?? "")
  const [mobile, setMobile] = useState(user?.phone ?? "")
  const [query, setQuery] = useState("")
  const [sending, setSending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !mobile.trim() || !query.trim()) {
      toast({ title: "Please fill all fields", variant: "destructive" }); return
    }
    setSending(true)
    await new Promise(r => setTimeout(r, 800))
    setSending(false)
    toast({ title: "Enquiry sent!", description: `${business.name} will get back to you soon.` })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative w-full sm:max-w-md bg-background rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black">Enquire</h2>
            <p className="text-xs text-muted-foreground">{business.name}</p>
          </div>
          <Button variant="ghost" size="icon" className="rounded-2xl" onClick={onClose}><X className="h-4 w-4" /></Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Full Name</label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="rounded-xl h-11" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Mobile Number</label>
            <Input value={mobile} onChange={e => setMobile(e.target.value)} placeholder="+91 XXXXX XXXXX" type="tel" className="rounded-xl h-11" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Your Query</label>
            <Textarea value={query} onChange={e => setQuery(e.target.value)} placeholder="Ask anything about this business…" className="rounded-xl resize-none" rows={3} />
          </div>
          <Button type="submit" className="w-full h-12 rounded-2xl font-black gap-2" disabled={sending}>
            <Send className="h-4 w-4" />
            {sending ? "Sending…" : "Send Enquiry"}
          </Button>
        </form>
      </div>
    </div>
  )
}

// ── Reserve modal ─────────────────────────────────────────────────────────────

function ReserveModal({ business, onClose }: { business: Business; onClose: () => void }) {
  const { toast } = useToast()
  const [guests, setGuests] = useState("2")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [requests, setRequests] = useState("")
  const [sending, setSending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!guests || !date || !time) {
      toast({ title: "Please fill required fields", variant: "destructive" }); return
    }
    setSending(true)
    await new Promise(r => setTimeout(r, 800))
    setSending(false)
    toast({ title: "Reservation requested!", description: `${business.name} will confirm your booking.` })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative w-full sm:max-w-md bg-background rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black">Reserve a Table</h2>
            <p className="text-xs text-muted-foreground">{business.name}</p>
          </div>
          <Button variant="ghost" size="icon" className="rounded-2xl" onClick={onClose}><X className="h-4 w-4" /></Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Guests *</label>
              <Input value={guests} onChange={e => setGuests(e.target.value)} placeholder="2" type="number" min="1" max="50" className="rounded-xl h-11" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Time *</label>
              <Input value={time} onChange={e => setTime(e.target.value)} type="time" className="rounded-xl h-11" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Date *</label>
            <Input value={date} onChange={e => setDate(e.target.value)} type="date" className="rounded-xl h-11" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Special Requests</label>
            <Textarea value={requests} onChange={e => setRequests(e.target.value)} placeholder="Birthday celebration, dietary needs, seating preference…" className="rounded-xl resize-none" rows={2} />
          </div>
          <Button type="submit" className="w-full h-12 rounded-2xl font-black gap-2" disabled={sending}>
            <Calendar className="h-4 w-4" />
            {sending ? "Booking…" : "Request Reservation"}
          </Button>
        </form>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function BusinessDetailClient({ business }: { business: Business }) {
  const { user } = useAuth()
  const { saved, toggle: toggleSaved } = useSavedBusiness(business.id)
  const { toast } = useToast()
  const router = useRouter()
  const [checkingIn, setCheckingIn] = useState(false)
  const [checkedIn, setCheckedIn] = useState(false)
  const [showEnquire, setShowEnquire] = useState(false)
  const [showReserve, setShowReserve] = useState(false)
  const [checkinCount, setCheckinCount] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("info")
  const [menuItems, setMenuItems] = useState<CatalogItem[]>([])

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from("check_ins")
      .select("*", { count: "exact", head: true })
      .eq("business_id", business.id)
      .then(({ count }) => { if (count != null) setCheckinCount(count) })

    ;(supabase as any)
      .from("business_catalog_items")
      .select("id, title, description, price, image_url")
      .eq("business_id", business.id)
      .order("created_at", { ascending: true })
      .then(({ data }: { data: CatalogItem[] | null }) => {
        if (data) setMenuItems(data)
      })
  }, [business.id])

  const group = getCategoryGroup(business.category)
  const tabs = getTabsForGroup(group)
  const images = allImages(business)
  const heroImg = business.cover_url ?? business.image_url
  const location = [business.address, business.city, business.state].filter(Boolean).join(", ")

  async function handleCheckIn() {
    if (!user) { router.push(`/login?redirectTo=/entities/${business.id}`); return }
    if (checkedIn) { toast({ title: "Already checked in today!", description: "Come back tomorrow for more coins." }); return }
    setCheckingIn(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.from("check_ins").insert({ user_id: user.uid, business_id: business.id, coins_earned: 5 })
      if (error) {
        if (error.code === "23505") { toast({ title: "Already checked in today!" }); setCheckedIn(true) }
        else throw error
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

  return (
    <>
    {showEnquire && <EnquireModal business={business} onClose={() => setShowEnquire(false)} />}
    {showReserve && <ReserveModal business={business} onClose={() => setShowReserve(false)} />}
    <div className="min-h-screen bg-background pb-24">
      {/* ── Hero ── */}
      <div className="relative h-56 sm:h-72 w-full bg-muted overflow-hidden">
        {heroImg ? (
          <Image src={heroImg} alt={business.name ?? ""} fill className="object-cover" priority />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-muted" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute top-4 left-4 z-10">
          <Button variant="ghost" size="icon" className="rounded-2xl bg-background/80 backdrop-blur-sm border shadow-sm h-10 w-10" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-2xl bg-background/80 backdrop-blur-sm border shadow-sm h-10 w-10" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost" size="icon"
            className={cn("rounded-2xl bg-background/80 backdrop-blur-sm border shadow-sm h-10 w-10", saved && "text-rose-500 border-rose-200")}
            onClick={async () => {
              if (!user) { router.push(`/login?redirectTo=/entities/${business.id}`); return }
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
            <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight leading-tight">
              {business.name}
            </h1>
            {location && (
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 shrink-0" /> {location}
              </p>
            )}
          </div>
        </div>

        {/* Rating + check-in count */}
        <div className="flex items-center gap-3 text-sm flex-wrap">
          {business.rating && (
            <div className="flex items-center gap-1 font-black text-foreground">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {parseFloat(business.rating).toFixed(1)}
            </div>
          )}
          {(business.review_count ?? 0) > 0 && (
            <span className="text-muted-foreground">{business.review_count} reviews</span>
          )}
          {(business.rating || business.review_count) && checkinCount != null && checkinCount > 0 && (
            <span className="text-muted-foreground">·</span>
          )}
          {checkinCount != null && checkinCount > 0 && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              <span>{checkinCount} check-ins</span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="space-y-2">
          {/* Primary row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Button
              className={cn("col-span-2 h-12 rounded-2xl font-black gap-2", checkedIn ? "bg-emerald-600 hover:bg-emerald-700" : "")}
              onClick={handleCheckIn}
              disabled={checkingIn}
            >
              <CheckCircle2 className="h-4 w-4" />
              {checkingIn ? "Checking in…" : checkedIn ? "Checked In! +5 🪙" : "Check In (+5 Coins)"}
            </Button>
            {business.phone && (
              <Button variant="outline" className="h-12 rounded-2xl font-black gap-2" asChild>
                <a href={`tel:${business.phone}`}><Phone className="h-4 w-4" /> Call</a>
              </Button>
            )}
            {business.whatsapp ? (
              <Button variant="outline" className="h-12 rounded-2xl font-black gap-2" asChild>
                <a href={`https://wa.me/${business.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </Button>
            ) : !business.phone ? (
              <Button variant="outline" className="h-12 rounded-2xl font-black gap-2 col-span-2" disabled>
                <Phone className="h-4 w-4" /> No contact listed
              </Button>
            ) : null}
          </div>

          {/* Secondary row */}
          <div className="grid gap-2" style={{ gridTemplateColumns: group === "food" ? "1fr 1fr 1fr" : "1fr 1fr" }}>
            <Button variant="outline" className="h-11 rounded-2xl font-black gap-1.5 text-sm" onClick={() => setShowEnquire(true)}>
              <Send className="h-3.5 w-3.5" /> Enquire
            </Button>
            {group === "food" && (
              <Button variant="outline" className="h-11 rounded-2xl font-black gap-1.5 text-sm" onClick={() => setShowReserve(true)}>
                <Calendar className="h-3.5 w-3.5" /> Reserve
              </Button>
            )}
            {business.latitude && business.longitude ? (
              <Button variant="outline" className="h-11 rounded-2xl font-black gap-1.5 text-sm" asChild>
                <a href={`https://maps.google.com/?q=${business.latitude},${business.longitude}`} target="_blank" rel="noopener noreferrer">
                  <Navigation className="h-3.5 w-3.5" /> Directions
                </a>
              </Button>
            ) : (
              <Button variant="outline" className="h-11 rounded-2xl font-black gap-1.5 text-sm" asChild>
                <a href={`https://maps.google.com/?q=${encodeURIComponent([business.name, business.address, business.city].filter(Boolean).join(", "))}`} target="_blank" rel="noopener noreferrer">
                  <Navigation className="h-3.5 w-3.5" /> Directions
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Plan Your Meal banner — food only */}
        {group === "food" && (menuItems.length > 0 || business.menu_images?.length || business.signature_dish || business.popular_dishes) && (
          <div className="flex items-center justify-between p-4 rounded-2xl bg-primary/5 border border-primary/15">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-primary/80">Plan Your Meal</p>
              <p className="text-sm text-muted-foreground font-medium mt-0.5">Browse the menu before you visit</p>
            </div>
            <Button size="sm" className="rounded-xl font-black gap-1.5 h-9" onClick={() => setActiveTab("second")}>
              View Menu <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}

        {/* ── Tabs ── */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
          <TabsList className="bg-muted/40 rounded-2xl p-1 h-auto w-full grid gap-1" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
            {tabs.map(t => (
              <TabsTrigger
                key={t.value + t.label}
                value={t.value === "events" && tabs.find(x => x.label === "Offers") ? "events" : t.value}
                className="rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wide py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                {t.label}
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

            {/* Contact */}
            <Card className="rounded-2xl border-border/50">
              <CardContent className="p-4 space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Contact & Location</p>
                {location && <InfoRow icon={<MapPin className="h-4 w-4" />} label={location} />}
                {business.phone && <InfoRow icon={<Phone className="h-4 w-4" />} label={business.phone} href={`tel:${business.phone}`} />}
                {business.email && <InfoRow icon={<Link2 className="h-4 w-4" />} label={business.email} href={`mailto:${business.email}`} />}
                {business.website && <InfoRow icon={<Globe className="h-4 w-4" />} label={business.website} href={business.website.startsWith("http") ? business.website : `https://${business.website}`} external />}
                <a
                  href={business.latitude && business.longitude
                    ? `https://maps.google.com/?q=${business.latitude},${business.longitude}`
                    : `https://maps.google.com/?q=${encodeURIComponent([business.name, business.address, business.city].filter(Boolean).join(", "))}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary font-bold hover:underline pt-1"
                >
                  <Navigation className="h-3.5 w-3.5 shrink-0" /> Get Directions
                </a>
              </CardContent>
            </Card>

            {/* Food-specific: cuisine */}
            {(group === "food" || group === "catering") && (business.selected_cuisines?.length || business.primary_cuisine) && (
              <Card className="rounded-2xl border-border/50">
                <CardContent className="p-4 space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Cuisine</p>
                  <div className="flex flex-wrap gap-1.5">
                    {business.primary_cuisine && <Chip label={business.primary_cuisine} />}
                    {business.selected_cuisines?.filter(c => c !== business.primary_cuisine).map(c => <Chip key={c} label={c} />)}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Food-specific: amenities */}
            {(group === "food") && business.selected_amenities?.length && (
              <Card className="rounded-2xl border-border/50">
                <CardContent className="p-4 space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Amenities</p>
                  <div className="flex flex-wrap gap-1.5">
                    {business.selected_amenities.map(a => <Chip key={a} label={a} />)}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Business highlights */}
            {business.selected_highlights?.length ? (
              <Card className="rounded-2xl border-border/50">
                <CardContent className="p-4 space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Highlights</p>
                  <div className="flex flex-wrap gap-1.5">
                    {business.selected_highlights.map(h => <Chip key={h} label={h} />)}
                  </div>
                </CardContent>
              </Card>
            ) : null}

            {/* Payment methods */}
            {business.selected_payment?.length ? (
              <Card className="rounded-2xl border-border/50">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Payment Methods</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {business.selected_payment.map(p => <Chip key={p} label={p} />)}
                  </div>
                </CardContent>
              </Card>
            ) : null}

            {/* Pricing */}
            {business.price_range && (
              <Card className="rounded-2xl border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Utensils className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Pricing</p>
                  </div>
                  <p className="text-sm font-black text-foreground">{business.price_range}</p>
                </CardContent>
              </Card>
            )}

            {/* Opening hours */}
            <HoursDisplay hours={business.opening_hours} />

            {/* Social links */}
            <SocialLinks links={business.social_links} />
          </TabsContent>

          {/* SECOND TAB (category-specific) */}
          <TabsContent value="second" className="mt-4 animate-in fade-in duration-300">
            <SecondTabContent business={business} group={group} menuItems={menuItems} />
          </TabsContent>

          {/* GALLERY */}
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
              <EmptyState icon="🖼️" title="No photos yet" desc="Photos of this business will appear here." />
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

          {/* HALAL tab (food/meat/grocery/catering/cosmetics) OR REVIEWS (non-food) */}
          <TabsContent value="halal" className="mt-4 animate-in fade-in duration-300">
            <HalalTabContent business={business} group={group} />
          </TabsContent>
          <TabsContent value="reviews" className="mt-4 animate-in fade-in duration-300">
            <EmptyState icon="⭐" title="No reviews yet" desc="Be the first to leave a review for this business." />
          </TabsContent>

          {/* EVENTS / OFFERS */}
          <TabsContent value="events" className="mt-4 animate-in fade-in duration-300">
            <EmptyState
              icon={tabs.find(t => t.value === "events")?.label === "Offers" ? "🎁" : "📅"}
              title={tabs.find(t => t.value === "events")?.label === "Offers" ? "No active offers" : "No upcoming events"}
              desc="Check back soon — this business will post updates here."
            />
          </TabsContent>
        </Tabs>

        {/* Report link */}
        <div className="flex justify-center py-4">
          <a href={`/entities/${business.id}/report`} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors font-medium">
            <Flag className="h-3 w-3" /> Report this Business
          </a>
        </div>
      </div>
    </div>
    </>
  )
}

// ── Shared UI helpers ─────────────────────────────────────────────────────────

function InfoRow({ icon, label, href, external }: { icon: React.ReactNode; label: string; href?: string; external?: boolean }) {
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

function ComplianceRow({ label, value, inverted = false, note }: { label: string; value: boolean | null | undefined; inverted?: boolean; note?: string }) {
  if (value == null) return null
  const positive = inverted ? !value : !!value
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}{note ? ` (${note})` : ""}</span>
      <span className={cn("text-xs font-black", positive ? "text-emerald-600" : "text-muted-foreground/50")}>{positive ? "✓ Yes" : "✗ No"}</span>
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
