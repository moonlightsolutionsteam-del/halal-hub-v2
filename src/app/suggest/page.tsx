
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  MapPin, Camera, ArrowLeft, ArrowRight,
  ShieldCheck, Loader2, Utensils,
  Store, ShoppingBag, Landmark, Video,
  GraduationCap, Briefcase, User, Link2
} from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

type EntityType = {
  id: string
  label: string
  icon: React.ElementType
  color: string
  bg: string
  description: string
  isPhysical: boolean
  namePlaceholder: string
  linkLabel?: string
  linkPlaceholder?: string
}

const ENTITY_TYPES: EntityType[] = [
  {
    id: "dining",
    label: "Restaurant",
    icon: Utensils,
    color: "text-orange-600",
    bg: "bg-orange-50",
    description: "Halal restaurant, café, or food stall",
    isPhysical: true,
    namePlaceholder: "e.g., The Halal Grill",
  },
  {
    id: "butcher",
    label: "Butcher",
    icon: Store,
    color: "text-red-600",
    bg: "bg-red-50",
    description: "Halal meat shop or butcher",
    isPhysical: true,
    namePlaceholder: "e.g., Al-Noor Meats",
  },
  {
    id: "grocery",
    label: "Grocery",
    icon: ShoppingBag,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    description: "Halal grocery store or supermarket",
    isPhysical: true,
    namePlaceholder: "e.g., Islamic Mart",
  },
  {
    id: "mosque",
    label: "Mosque",
    icon: Landmark,
    color: "text-blue-600",
    bg: "bg-blue-50",
    description: "Mosque, masjid, or Islamic centre",
    isPhysical: true,
    namePlaceholder: "e.g., Masjid Al-Furqan",
  },
  {
    id: "business",
    label: "Business",
    icon: Briefcase,
    color: "text-violet-600",
    bg: "bg-violet-50",
    description: "Any other halal business or service",
    isPhysical: true,
    namePlaceholder: "e.g., Modest Fashion Co.",
  },
  {
    id: "creator",
    label: "Creator",
    icon: Video,
    color: "text-pink-600",
    bg: "bg-pink-50",
    description: "YouTube, Instagram, TikTok, or podcast",
    isPhysical: false,
    namePlaceholder: "e.g., Muslim Foodie",
    linkLabel: "Channel / Profile Link",
    linkPlaceholder: "https://youtube.com/@...",
  },
  {
    id: "scholar",
    label: "Scholar",
    icon: GraduationCap,
    color: "text-amber-600",
    bg: "bg-amber-50",
    description: "Islamic scholar, speaker, or educator",
    isPhysical: false,
    namePlaceholder: "e.g., Sheikh Abdullah",
    linkLabel: "Website or Social Link",
    linkPlaceholder: "https://...",
  },
  {
    id: "person",
    label: "Refer a Person",
    icon: User,
    color: "text-sky-600",
    bg: "bg-sky-50",
    description: "Refer a friend or community member",
    isPhysical: false,
    namePlaceholder: "e.g., Ahmed Khan",
    linkLabel: "Their Profile or Contact",
    linkPlaceholder: "Instagram, WhatsApp, LinkedIn…",
  },
]

const PLATFORM_OPTIONS = [
  "YouTube", "Instagram", "TikTok", "Podcast", "Twitter / X", "Facebook", "Website", "Other"
]

export default function SuggestPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = React.useState(1)
  const [loading, setLoading] = React.useState(false)

  const [category, setCategory] = React.useState(ENTITY_TYPES[0].id)
  const [name, setName] = React.useState("")
  const [address, setAddress] = React.useState("")
  const [link, setLink] = React.useState("")
  const [platform, setPlatform] = React.useState("")
  const [reason, setReason] = React.useState("")

  const entity = ENTITY_TYPES.find(e => e.id === category) ?? ENTITY_TYPES[0]

  const reasonPlaceholder = entity.isPhysical
    ? "e.g., They serve hand-slaughtered beef and have a clean prayer area…"
    : entity.id === "person"
    ? "e.g., Ahmed is a great Muslim entrepreneur who deserves to be on the Hub…"
    : "e.g., This channel has amazing halal food content and a huge following…"

  const step2Heading = entity.isPhysical
    ? "Where is it located?"
    : entity.id === "person"
    ? "Who are you referring?"
    : "Where can we find them?"

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const fullLink = platform && link && !link.startsWith("http")
        ? link
        : link
      const res = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          placeName: name,
          address: entity.isPhysical ? address : null,
          link: !entity.isPhysical ? (platform ? `[${platform}] ${fullLink}` : fullLink) : link || null,
          reason,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      toast({ title: "Referral Submitted!", description: "You'll earn 50 Hub Coins once it's verified." })
      router.push("/account/suggestions")
    } catch (err: any) {
      toast({ title: "Error", description: err?.message ?? "Failed to submit.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const canProceedStep2 = name.trim().length > 0

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-3xl pb-32 text-foreground">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-2xl bg-card shadow-sm border shrink-0"
          onClick={() => (step === 1 ? router.back() : setStep(step - 1))}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="space-y-1.5">
          <h1 className="text-xl sm:text-3xl font-black font-headline tracking-tight">
            {step === 1 ? "What are you referring?" : step === 2 ? step2Heading : "Why this referral?"}
          </h1>
          <div className="flex gap-1.5">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  step >= i ? "bg-primary w-10" : "bg-muted w-6"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Step 1 — Entity type picker */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-400">
          <p className="text-muted-foreground font-medium">
            Refer anything in the Halal Hub ecosystem — a place, a creator, a scholar, or a person you think belongs here.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ENTITY_TYPES.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setCategory(opt.id)}
                className={cn(
                  "flex flex-col items-center justify-center p-4 sm:p-5 rounded-[2rem] transition-all border-4 text-left gap-3",
                  category === opt.id
                    ? "bg-card border-primary shadow-xl scale-[1.03]"
                    : "bg-card border-transparent text-muted-foreground hover:border-border"
                )}
              >
                <div
                  className={cn(
                    "h-11 w-11 rounded-2xl flex items-center justify-center shrink-0",
                    category === opt.id ? `${opt.bg} ${opt.color}` : "bg-muted text-muted-foreground"
                  )}
                >
                  <opt.icon className="h-5 w-5" />
                </div>
                <div className="text-center space-y-0.5">
                  <p className={cn("text-[10px] font-black uppercase tracking-tight", category === opt.id ? "text-primary" : "text-muted-foreground")}>
                    {opt.label}
                  </p>
                  <p className="text-[9px] font-medium text-muted-foreground leading-tight hidden sm:block">
                    {opt.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Selected preview */}
          <div className={cn("flex items-center gap-3 p-4 rounded-2xl border-2", `border-border bg-muted/40`)}>
            <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center shrink-0", entity.bg, entity.color)}>
              <entity.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-black text-foreground">{entity.label}</p>
              <p className="text-[11px] text-muted-foreground font-medium">{entity.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Step 2 — Details (dynamic) */}
      {step === 2 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-400">
          <Card className="rounded-[2rem] border-none shadow-sm bg-card">
            <CardContent className="p-6 sm:p-8 space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">
                  {entity.id === "person" ? "Full Name" : entity.id === "creator" || entity.id === "scholar" ? "Name / Channel" : "Place Name"}
                </Label>
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={entity.namePlaceholder}
                  className="h-13 rounded-2xl bg-muted border-none font-black text-lg"
                  autoFocus
                />
              </div>

              {/* Physical — address */}
              {entity.isPhysical && (
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">
                    Street Address
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      placeholder="Full address…"
                      className="h-12 rounded-2xl bg-muted border-none font-bold pl-12"
                    />
                  </div>
                </div>
              )}

              {/* Digital — platform picker */}
              {!entity.isPhysical && entity.id !== "person" && (
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Platform</Label>
                  <div className="flex flex-wrap gap-2">
                    {PLATFORM_OPTIONS.map(p => (
                      <button
                        key={p}
                        onClick={() => setPlatform(platform === p ? "" : p)}
                        className={cn(
                          "px-3 py-1.5 rounded-xl text-xs font-black border-2 transition-all",
                          platform === p
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-muted text-muted-foreground hover:border-primary/40"
                        )}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Digital — link */}
              {!entity.isPhysical && (
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">
                    {entity.linkLabel ?? "Profile / Link"}
                  </Label>
                  <div className="relative">
                    <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                      value={link}
                      onChange={e => setLink(e.target.value)}
                      placeholder={entity.linkPlaceholder}
                      className="h-12 rounded-2xl bg-muted border-none font-bold pl-12"
                    />
                  </div>
                </div>
              )}

              {/* Physical — optional website */}
              {entity.isPhysical && (
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">
                    Website <span className="text-muted-foreground/50 normal-case font-medium">(optional)</span>
                  </Label>
                  <div className="relative">
                    <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                      value={link}
                      onChange={e => setLink(e.target.value)}
                      placeholder="https://theirwebsite.com"
                      className="h-12 rounded-2xl bg-muted border-none font-bold pl-12"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 3 — Reason + proof */}
      {step === 3 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-400">
          <Card className="rounded-[2rem] border-none shadow-sm bg-card">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">
                  {entity.id === "person" ? "Why are you referring this person?" : "Why should this be on Halal Hub?"}
                </Label>
                <Textarea
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  placeholder={reasonPlaceholder}
                  className="min-h-[130px] rounded-2xl bg-muted border-none p-4 font-medium resize-none"
                  autoFocus
                />
              </div>

              <div
                className="p-8 border-4 border-dashed border-border rounded-[2rem] bg-muted/30 flex flex-col items-center justify-center text-center gap-3 hover:border-primary/30 hover:bg-card transition-all cursor-pointer group"
              >
                <div className="h-14 w-14 bg-card rounded-3xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Camera className="h-7 w-7 text-primary" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-base font-black text-foreground">Add a Photo</p>
                  <p className="text-xs font-medium text-muted-foreground">
                    {entity.isPhysical
                      ? "Menu, storefront, or halal certificate"
                      : "Screenshot of their profile or content"}
                  </p>
                </div>
                <p className="text-[10px] text-muted-foreground font-medium">Optional — helps the team verify faster</p>
              </div>

              <div className="p-5 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900 flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs font-medium text-emerald-900 dark:text-emerald-300 leading-relaxed">
                  Earn <span className="font-black text-emerald-600">+50 Hub Coins</span> once your referral is reviewed and approved by the Halal Hub team.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Nav buttons */}
      <div className="flex gap-3 pt-8">
        {step > 1 && (
          <Button
            variant="outline"
            className="rounded-2xl h-14 px-8 border-2 font-black uppercase text-xs tracking-widest"
            onClick={() => setStep(step - 1)}
          >
            Back
          </Button>
        )}
        <Button
          className="rounded-2xl h-14 px-10 font-black uppercase text-sm tracking-widest bg-primary hover:bg-primary/90 text-white shadow-xl flex-1 transition-all active:scale-[0.98]"
          onClick={() => (step === 3 ? handleSubmit() : setStep(step + 1))}
          disabled={loading || (step === 2 && !canProceedStep2)}
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : step === 3 ? (
            <>Submit Referral <ArrowRight className="ml-2 h-4 w-4" /></>
          ) : (
            <>Continue <ArrowRight className="ml-2 h-4 w-4" /></>
          )}
        </Button>
      </div>
    </div>
  )
}
