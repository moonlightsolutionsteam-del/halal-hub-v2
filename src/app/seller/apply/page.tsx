"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  Store, Building2, User, Palette, Package,
  CheckCircle2, ChevronRight, Loader2, ShieldCheck,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type SellerType = "business" | "msme" | "home" | "creator" | "wholesale"

const SELLER_TYPES: { value: SellerType; label: string; desc: string; icon: React.ElementType; docs: string }[] = [
  { value: "business",   label: "Registered Business", icon: Building2, desc: "GST-registered companies, brands, manufacturers", docs: "GST certificate + trade license" },
  { value: "msme",       label: "MSME / Small Business", icon: Store, desc: "MSME-registered micro and small businesses", docs: "MSME certificate" },
  { value: "home",       label: "Home Seller", icon: User, desc: "Individual selling home-made or sourced products", docs: "Aadhar + PAN + product certification" },
  { value: "creator",    label: "Creator-Seller", icon: Palette, desc: "HalalHub creators who also sell their own products", docs: "Creator account linked automatically" },
  { value: "wholesale",  label: "Wholesale Supplier", icon: Package, desc: "B2B sellers for bulk orders by other businesses", docs: "GST certificate + company registration" },
]

const STEPS = ["Account Type", "Store Profile", "Documents", "Bank Details", "Declaration", "Review"]

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export default function SellerApplyPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  // Form state
  const [sellerType, setSellerType] = useState<SellerType | null>(null)
  const [storeName, setStoreName] = useState("")
  const [storeSlug, setStoreSlug] = useState("")
  const [description, setDescription] = useState("")
  const [city, setCity] = useState("")
  const [gstin, setGstin] = useState("")
  const [pan, setPan] = useState("")
  const [bankAccount, setBankAccount] = useState("")
  const [bankIfsc, setBankIfsc] = useState("")
  const [bankName, setBankName] = useState("")
  const [declarationAccepted, setDeclarationAccepted] = useState(false)

  function handleStoreNameChange(val: string) {
    setStoreName(val)
    setStoreSlug(slugify(val))
  }

  async function handleSubmit() {
    if (!user?.uid || !sellerType) return
    setSubmitting(true)
    const supabase = createClient()

    const { data: seller, error } = await supabase
      .from("mp_sellers")
      .insert({
        user_id: user.uid,
        store_name: storeName,
        store_slug: storeSlug,
        description,
        seller_type: sellerType,
        city,
        gstin: gstin || null,
        pan: pan || null,
        bank_account_number: bankAccount || null,
        bank_ifsc: bankIfsc || null,
        bank_name: bankName || null,
        halal_declaration_signed: declarationAccepted,
        halal_declaration_signed_at: declarationAccepted ? new Date().toISOString() : null,
        status: "pending",
      })
      .select("id")
      .single()

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
      setSubmitting(false)
      return
    }

    // Log the application submission
    await supabase.from("mp_seller_applications").insert({
      seller_id: seller.id,
      action: "submitted",
      notes: "Application submitted by seller",
    })

    toast({ title: "Application submitted!", description: "We'll review within 48 hours and notify you." })
    router.push("/seller/apply/submitted")
    setSubmitting(false)
  }

  const canNext = () => {
    if (step === 0) return !!sellerType
    if (step === 1) return storeName.trim().length >= 3 && storeSlug.length >= 3 && city.trim().length > 0
    if (step === 2) return true // docs are uploaded externally for now
    if (step === 3) return true // bank optional until Razorpay integration
    if (step === 4) return declarationAccepted
    return true
  }

  return (
    <div className="p-4 md:p-6 max-w-lg mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-black text-foreground flex items-center gap-2">
          <Store className="h-5 w-5 text-primary" /> Sell on HalalHub
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Join India's halal marketplace — reach Muslim consumers who trust us
        </p>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span>Step {step + 1} of {STEPS.length}</span>
          <span className="font-bold text-primary">{STEPS[step]}</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 0 — Account Type */}
      {step === 0 && (
        <div className="space-y-3">
          <p className="text-sm font-black text-foreground">What type of seller are you?</p>
          {SELLER_TYPES.map(t => {
            const Icon = t.icon
            return (
              <Card
                key={t.value}
                className={`rounded-2xl border-2 cursor-pointer transition-all ${
                  sellerType === t.value
                    ? "border-primary bg-primary/5"
                    : "border-transparent shadow-sm"
                }`}
                onClick={() => setSellerType(t.value)}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                    sellerType === t.value ? "bg-primary/10" : "bg-muted"
                  }`}>
                    <Icon className={`h-5 w-5 ${sellerType === t.value ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-foreground">{t.label}</p>
                    <p className="text-xs text-muted-foreground truncate">{t.desc}</p>
                  </div>
                  {sellerType === t.value && (
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  )}
                </CardContent>
              </Card>
            )
          })}
          {sellerType && (
            <Card className="rounded-2xl border-none bg-muted/50 shadow-none">
              <CardContent className="p-3">
                <p className="text-xs font-bold text-foreground">Documents you'll need:</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {SELLER_TYPES.find(t => t.value === sellerType)?.docs}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Step 1 — Store Profile */}
      {step === 1 && (
        <div className="space-y-3">
          <p className="text-sm font-black text-foreground">Tell us about your store</p>
          <div className="space-y-1">
            <label className="text-xs font-bold text-muted-foreground">Store Name *</label>
            <Input
              placeholder="e.g. Fatima's Modest Boutique"
              value={storeName}
              onChange={e => handleStoreNameChange(e.target.value)}
              maxLength={100}
              className="rounded-xl"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-muted-foreground">Store URL</label>
            <div className="flex items-center rounded-xl border bg-muted/30 overflow-hidden">
              <span className="px-3 text-xs text-muted-foreground border-r py-2.5 bg-muted/50 shrink-0">
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
            <Input placeholder="Bengaluru" value={city} onChange={e => setCity(e.target.value)} className="rounded-xl" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-muted-foreground">Store Description</label>
            <Textarea
              placeholder="Tell buyers what you sell and what makes your store halal-conscious..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              maxLength={500}
              rows={3}
              className="rounded-xl resize-none"
            />
            <p className="text-[10px] text-muted-foreground text-right">{description.length}/500</p>
          </div>
        </div>
      )}

      {/* Step 2 — Documents */}
      {step === 2 && (
        <div className="space-y-3">
          <p className="text-sm font-black text-foreground">Business documents</p>
          <Card className="rounded-2xl border-none bg-primary/5">
            <CardContent className="p-4">
              <p className="text-xs font-bold text-primary mb-1">
                Required for {SELLER_TYPES.find(t => t.value === sellerType)?.label}:
              </p>
              <p className="text-xs text-foreground/80">
                {SELLER_TYPES.find(t => t.value === sellerType)?.docs}
              </p>
            </CardContent>
          </Card>
          {(sellerType === "business" || sellerType === "wholesale") && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">GSTIN</label>
              <Input
                placeholder="22AAAAA0000A1Z5"
                value={gstin}
                onChange={e => setGstin(e.target.value.toUpperCase())}
                maxLength={15}
                className="rounded-xl font-mono"
              />
            </div>
          )}
          <div className="space-y-1">
            <label className="text-xs font-bold text-muted-foreground">PAN Number</label>
            <Input
              placeholder="ABCDE1234F"
              value={pan}
              onChange={e => setPan(e.target.value.toUpperCase())}
              maxLength={10}
              className="rounded-xl font-mono"
            />
          </div>
          <Card className="rounded-2xl border-dashed border-2 border-muted-foreground/20 shadow-none">
            <CardContent className="p-6 text-center text-muted-foreground">
              <p className="text-sm font-bold">Document uploads</p>
              <p className="text-xs mt-1">Upload feature coming soon — our team will contact you via WhatsApp to collect documents during review.</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 3 — Bank Details */}
      {step === 3 && (
        <div className="space-y-3">
          <p className="text-sm font-black text-foreground">Bank account for payouts</p>
          <Card className="rounded-2xl border-none bg-amber-50 dark:bg-amber-950/20 shadow-none">
            <CardContent className="p-3">
              <p className="text-xs text-amber-700 dark:text-amber-400 font-bold">
                Payout processing coming soon
              </p>
              <p className="text-xs text-amber-600 dark:text-amber-500 mt-0.5">
                Enter your bank details now — automated payouts via Razorpay will be enabled before your first sale goes live.
              </p>
            </CardContent>
          </Card>
          <div className="space-y-1">
            <label className="text-xs font-bold text-muted-foreground">Account Number</label>
            <Input placeholder="Enter account number" value={bankAccount} onChange={e => setBankAccount(e.target.value)} className="rounded-xl font-mono" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-muted-foreground">IFSC Code</label>
            <Input placeholder="SBIN0001234" value={bankIfsc} onChange={e => setBankIfsc(e.target.value.toUpperCase())} className="rounded-xl font-mono" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-muted-foreground">Bank Name</label>
            <Input placeholder="State Bank of India" value={bankName} onChange={e => setBankName(e.target.value)} className="rounded-xl" />
          </div>
        </div>
      )}

      {/* Step 4 — Halal Declaration */}
      {step === 4 && (
        <div className="space-y-4">
          <p className="text-sm font-black text-foreground">HalalHub Halal Standards Declaration</p>
          <Card className="rounded-2xl border-none shadow-sm">
            <CardContent className="p-4 space-y-3 text-xs text-foreground/80 leading-relaxed">
              <p>By signing this declaration, I confirm that:</p>
              <ul className="space-y-2 list-none">
                {[
                  "All products I list on HalalHub Marketplace are halal-compliant and do not contain any haram ingredients, materials, or processes",
                  "I will provide valid halal certification where required by product category",
                  "I will not list products that violate Islamic values, modesty standards, or HalalHub's content policies",
                  "I understand that false halal declarations may result in immediate store suspension and legal action",
                  "I will notify HalalHub immediately if any listed product's halal status changes",
                  "I agree to HalalHub's Seller Terms of Service and Marketplace Policy",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={declarationAccepted}
              onChange={e => setDeclarationAccepted(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded accent-primary"
            />
            <span className="text-sm font-bold text-foreground">
              I read and accept the HalalHub Halal Standards Declaration
            </span>
          </label>
        </div>
      )}

      {/* Step 5 — Review */}
      {step === 5 && (
        <div className="space-y-3">
          <p className="text-sm font-black text-foreground">Review your application</p>
          {[
            { label: "Seller Type", value: SELLER_TYPES.find(t => t.value === sellerType)?.label },
            { label: "Store Name", value: storeName },
            { label: "Store URL", value: `halalhub.co.in/shop/${storeSlug}` },
            { label: "City", value: city },
            { label: "GSTIN", value: gstin || "—" },
            { label: "PAN", value: pan || "—" },
            { label: "Bank", value: bankName ? `${bankName} (${bankAccount?.slice(-4).padStart(bankAccount.length, "•")})` : "—" },
            { label: "Halal Declaration", value: declarationAccepted ? "Signed ✓" : "Not signed" },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
              <span className="text-xs text-muted-foreground font-bold">{label}</span>
              <span className="text-xs font-bold text-foreground text-right max-w-[60%] truncate">{value}</span>
            </div>
          ))}
          <Card className="rounded-2xl border-none bg-primary/5 shadow-none">
            <CardContent className="p-3 text-xs text-primary/80">
              Our team reviews applications within <strong>48 hours</strong>. You'll receive an SMS and in-app notification when approved.
            </CardContent>
          </Card>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 pt-2">
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
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Store className="h-4 w-4" />}
            Submit Application
          </Button>
        )}
      </div>
    </div>
  )
}
