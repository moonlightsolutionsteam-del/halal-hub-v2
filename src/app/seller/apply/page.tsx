"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Store, Building2, User, Palette, Package,
  CheckCircle2, ChevronRight, Loader2, ShieldCheck, UtensilsCrossed,
  Beef, ShoppingBasket, Shirt, Sparkles, BookOpen, HeartPulse, GraduationCap,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type SellerType = "business" | "msme" | "home" | "creator" | "wholesale"

const SELLER_TYPES: { value: SellerType; label: string; desc: string; icon: React.ElementType }[] = [
  { value: "business",  label: "Registered Business", icon: Building2, desc: "GST-registered companies, brands, manufacturers" },
  { value: "msme",      label: "MSME / Small Business", icon: Store,     desc: "MSME-registered micro and small businesses" },
  { value: "home",      label: "Home Seller",          icon: User,      desc: "Individual selling home-made or sourced products" },
  { value: "creator",   label: "Creator-Seller",       icon: Palette,   desc: "HalalHub creators who also sell their own products" },
  { value: "wholesale", label: "Wholesale Supplier",   icon: Package,   desc: "B2B sellers for bulk orders by other businesses" },
]

const VERTICALS: { value: string; label: string; icon: React.ElementType; hint: string }[] = [
  { value: "grocery",   label: "Grocery & Packaged Food", icon: ShoppingBasket, hint: "Dry goods, spices, packaged halal food" },
  { value: "meat",      label: "Meat & Poultry",          icon: Beef,           hint: "Fresh & frozen halal meat, seafood" },
  { value: "fashion",   label: "Fashion & Modest Wear",   icon: Shirt,          hint: "Abayas, thobes, hijabs, accessories" },
  { value: "cosmetics", label: "Cosmetics & Skincare",    icon: Sparkles,       hint: "Halal makeup, skincare, personal care" },
  { value: "media",     label: "Books & Islamic Media",   icon: BookOpen,       hint: "Islamic books, Quran copies, digital" },
  { value: "catering",  label: "Catering & Meal Kits",   icon: UtensilsCrossed,hint: "Meal kits, packaged food, event catering" },
  { value: "healthcare",label: "Health & Wellness",       icon: HeartPulse,     hint: "Halal supplements, herbal, Tibb products" },
  { value: "education", label: "Education & Courses",     icon: GraduationCap,  hint: "Online courses, study kits, Islamic learning" },
]

const PLEDGE_ITEMS = [
  "All products I list are halal-compliant and free from haram ingredients, materials, or processes",
  "I will provide valid halal certification where my product category requires it",
  "I will not list anything that violates Islamic values or HalalHub's content policies",
  "I understand false halal declarations may result in immediate store suspension",
  "I will notify HalalHub immediately if any product's halal status changes",
  "I agree to HalalHub's Seller Terms of Service and Marketplace Policy",
]

const STEPS = ["Seller Type", "Store Setup", "Halal Pledge"]

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export default function SellerApplyPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  const [sellerType, setSellerType] = useState<SellerType | null>(null)
  const [vertical, setVertical] = useState<string | null>(null)
  const [storeName, setStoreName] = useState("")
  const [storeSlug, setStoreSlug] = useState("")
  const [city, setCity] = useState("")
  const [description, setDescription] = useState("")
  const [pledgeAccepted, setPledgeAccepted] = useState(false)

  function handleStoreNameChange(val: string) {
    setStoreName(val)
    setStoreSlug(slugify(val))
  }

  const canNext = () => {
    if (step === 0) return !!sellerType
    if (step === 1) return storeName.trim().length >= 3 && city.trim().length > 0 && !!vertical
    if (step === 2) return pledgeAccepted
    return false
  }

  async function handleSubmit() {
    if (!user?.uid || !sellerType || !vertical) return
    setSubmitting(true)
    const supabase = createClient()

    const { data: seller, error } = await supabase
      .from("mp_sellers")
      .insert({
        user_id: user.uid,
        store_name: storeName.trim(),
        store_slug: storeSlug,
        description: description.trim() || null,
        seller_type: sellerType,
        category: vertical,
        city: city.trim(),
        halal_declaration_signed: true,
        halal_declaration_signed_at: new Date().toISOString(),
        status: "pending",
      })
      .select("id")
      .single()

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
      setSubmitting(false)
      return
    }

    await supabase.from("mp_seller_applications").insert({
      seller_id: seller.id,
      action: "submitted",
      notes: `Application submitted. Vertical: ${vertical}`,
    })

    router.push("/seller/apply/submitted")
    setSubmitting(false)
  }

  const progress = ((step + 1) / STEPS.length) * 100

  return (
    <div className="p-4 md:p-6 max-w-lg mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-black text-foreground flex items-center gap-2">
          <Store className="h-5 w-5 text-primary" /> Sell on HalalHub
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Join India's halal marketplace — 3 quick steps to get started
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span className="font-bold text-primary">{STEPS[step]}</span>
          <span>Step {step + 1} of {STEPS.length}</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step 0 — Seller Type */}
      {step === 0 && (
        <div className="space-y-3">
          <p className="text-sm font-bold text-muted-foreground">What describes you best?</p>
          {SELLER_TYPES.map(t => {
            const Icon = t.icon
            const selected = sellerType === t.value
            return (
              <Card
                key={t.value}
                className={`rounded-2xl border-2 cursor-pointer transition-all ${
                  selected ? "border-primary bg-primary/5" : "border-transparent shadow-sm"
                }`}
                onClick={() => setSellerType(t.value)}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${selected ? "bg-primary/10" : "bg-muted"}`}>
                    <Icon className={`h-5 w-5 ${selected ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-foreground">{t.label}</p>
                    <p className="text-xs text-muted-foreground">{t.desc}</p>
                  </div>
                  {selected && <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Step 1 — Store Setup */}
      {step === 1 && (
        <div className="space-y-4">
          <p className="text-sm font-bold text-muted-foreground">Set up your store</p>

          <div className="space-y-1">
            <label className="text-xs font-bold text-muted-foreground">Store Name *</label>
            <Input
              placeholder="e.g. Fatima's Modest Boutique"
              value={storeName}
              onChange={e => handleStoreNameChange(e.target.value)}
              maxLength={80}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-muted-foreground">Store URL</label>
            <div className="flex items-center rounded-xl border bg-muted/30 overflow-hidden">
              <span className="px-3 text-xs text-muted-foreground border-r py-2.5 bg-muted/50 shrink-0 whitespace-nowrap">
                halalhub.co.in/shop/
              </span>
              <Input
                value={storeSlug}
                onChange={e => setStoreSlug(slugify(e.target.value))}
                className="border-none rounded-none bg-transparent text-xs font-bold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-muted-foreground">City *</label>
            <Input
              placeholder="e.g. Bengaluru"
              value={city}
              onChange={e => setCity(e.target.value)}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground">What do you sell? *</label>
            <div className="grid grid-cols-2 gap-2">
              {VERTICALS.map(v => {
                const Icon = v.icon
                const selected = vertical === v.value
                return (
                  <Card
                    key={v.value}
                    className={`rounded-2xl border-2 cursor-pointer transition-all ${
                      selected ? "border-primary bg-primary/5" : "border-transparent shadow-sm"
                    }`}
                    onClick={() => setVertical(v.value)}
                  >
                    <CardContent className="p-3 flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${selected ? "bg-primary/10" : "bg-muted"}`}>
                          <Icon className={`h-4 w-4 ${selected ? "text-primary" : "text-muted-foreground"}`} />
                        </div>
                        {selected && <CheckCircle2 className="h-4 w-4 text-primary" />}
                      </div>
                      <p className="text-xs font-black text-foreground leading-tight">{v.label}</p>
                      <p className="text-[10px] text-muted-foreground leading-tight">{v.hint}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-muted-foreground">Short description <span className="font-normal">(optional)</span></label>
            <Textarea
              placeholder="Tell buyers what makes your store special..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              maxLength={280}
              rows={2}
              className="rounded-xl resize-none text-sm"
            />
            <p className="text-[10px] text-muted-foreground text-right">{description.length}/280</p>
          </div>
        </div>
      )}

      {/* Step 2 — Halal Pledge */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <p className="text-sm font-black text-foreground">Halal Standards Pledge</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              HalalHub holds every seller to these standards. Please read and confirm.
            </p>
          </div>

          <Card className="rounded-2xl border-none shadow-sm">
            <CardContent className="p-4 space-y-3">
              {PLEDGE_ITEMS.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-foreground/80 leading-relaxed">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Summary before submit */}
          <Card className="rounded-2xl border-none bg-muted/40 shadow-none">
            <CardContent className="p-4 space-y-2">
              <p className="text-xs font-black text-muted-foreground mb-2">Submitting as</p>
              {[
                { k: "Store", v: storeName },
                { k: "Vertical", v: VERTICALS.find(v => v.value === vertical)?.label ?? vertical },
                { k: "City", v: city },
                { k: "Type", v: SELLER_TYPES.find(t => t.value === sellerType)?.label },
              ].map(({ k, v }) => (
                <div key={k} className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{k}</span>
                  <span className="text-xs font-bold text-foreground">{v}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={pledgeAccepted}
              onChange={e => setPledgeAccepted(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded accent-primary"
            />
            <span className="text-sm font-bold text-foreground leading-snug">
              I confirm everything above and pledge to uphold halal standards on HalalHub
            </span>
          </label>

          <p className="text-[10px] text-muted-foreground text-center">
            Our team reviews applications within 48 hours. You'll be notified by SMS and in-app.
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 pt-1">
        {step > 0 && (
          <Button variant="outline" className="rounded-xl flex-1 font-bold" onClick={() => setStep(s => s - 1)}>
            Back
          </Button>
        )}
        {step < STEPS.length - 1 ? (
          <Button
            className="rounded-xl flex-1 font-bold gap-1.5"
            disabled={!canNext()}
            onClick={() => setStep(s => s + 1)}
          >
            Continue <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            className="rounded-xl flex-1 font-bold gap-1.5"
            disabled={!canNext() || submitting}
            onClick={handleSubmit}
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Store className="h-4 w-4" />}
            Submit Application
          </Button>
        )}
      </div>
    </div>
  )
}
