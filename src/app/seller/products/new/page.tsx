// @ts-nocheck
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useSeller } from "@/hooks/use-seller"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  ArrowLeft, Loader2, Package, ShieldCheck, Truck, Tag,
  SaveIcon, SendIcon,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const CATEGORIES = [
  { value: "grocery",    label: "Grocery & Packaged Food" },
  { value: "meat",       label: "Meat & Poultry" },
  { value: "fashion",    label: "Fashion & Modest Wear" },
  { value: "cosmetics",  label: "Cosmetics & Skincare" },
  { value: "media",      label: "Books & Islamic Media" },
  { value: "catering",   label: "Catering & Meal Kits" },
  { value: "healthcare", label: "Health & Wellness" },
  { value: "education",  label: "Education & Courses" },
]

const HALAL_CERT_BODIES = [
  "Halal India (T3)",
  "Jamiat Ulama-i-Hind (T3)",
  "Halal Certification Services India (T3)",
  "FSSAI (T2)",
  "IFANCA (T3)",
  "ISNA (T3)",
  "State Waqf Board (T2)",
]

function slugify(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

function SectionHeader({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2 pt-2">
      <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="h-3.5 w-3.5 text-primary" />
      </div>
      <p className="text-sm font-black text-foreground">{title}</p>
    </div>
  )
}

export default function NewProductPage() {
  const { seller } = useSeller()
  const router = useRouter()
  const { toast } = useToast()

  // Basics
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState(seller?.category ?? "")

  // Pricing & stock
  const [priceRupees, setPriceRupees] = useState("")
  const [comparePriceRupees, setComparePriceRupees] = useState("")
  const [stock, setStock] = useState("1")
  const [sku, setSku] = useState("")

  // Halal
  const [halalStatus, setHalalStatus] = useState<"self_declared" | "certified">("self_declared")
  const [certBody, setCertBody] = useState("")
  const [certExpiry, setCertExpiry] = useState("")

  // Shipping
  const [processingDays, setProcessingDays] = useState("2")
  const [returnEligible, setReturnEligible] = useState(true)
  const [freeShippingAbove, setFreeShippingAbove] = useState("")

  const [submitting, setSubmitting] = useState(false)
  const [savingDraft, setSavingDraft] = useState(false)

  function handleTitleChange(val: string) {
    setTitle(val)
    setSlug(slugify(val))
  }

  const priceValid = !!priceRupees && Number(priceRupees) > 0
  const canSubmit = title.trim().length >= 3 && priceValid && !!category && stock.trim().length > 0

  async function save(asDraft: boolean) {
    if (!seller || !canSubmit) return
    if (asDraft) setSavingDraft(true); else setSubmitting(true)

    const pricePaise = Math.round(Number(priceRupees) * 100)
    const comparePricePaise = comparePriceRupees ? Math.round(Number(comparePriceRupees) * 100) : null

    const { error } = await createClient()
      .from("mp_products")
      .insert({
        seller_id: seller.id,
        title: title.trim(),
        slug: slug || slugify(title.trim()),
        description: description.trim() || null,
        category: category || null,
        price_inr: pricePaise,
        compare_price_inr: comparePricePaise,
        stock_quantity: Number(stock),
        sku: sku.trim() || null,
        halal_status: halalStatus,
        halal_cert_body: certBody || null,
        halal_cert_expiry: certExpiry || null,
        processing_days: Number(processingDays),
        return_eligible: returnEligible,
        free_shipping_above_inr: freeShippingAbove ? Math.round(Number(freeShippingAbove) * 100) : null,
        status: asDraft ? "draft" : "pending",
        photos: [],
      })

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      toast({
        title: asDraft ? "Saved as draft" : "Product submitted for review",
        description: asDraft ? "You can publish it from your products page" : "Our team will review within 24 hours",
      })
      router.push("/seller/products")
    }

    if (asDraft) setSavingDraft(false); else setSubmitting(false)
  }

  return (
    <div className="p-4 md:p-6 max-w-lg mx-auto space-y-5 pb-32">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/seller/products">
          <Button variant="ghost" size="sm" className="rounded-xl h-9 w-9 p-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-black text-foreground">New Product</h1>
          <p className="text-xs text-muted-foreground">Submit for review or save as draft</p>
        </div>
      </div>

      {/* ── Section 1: Basics ── */}
      <SectionHeader icon={Package} title="Product Details" />

      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-xs font-bold text-muted-foreground">Product Name *</label>
          <Input
            placeholder="e.g. Organic Halal Chicken Breast 500g"
            value={title}
            onChange={e => handleTitleChange(e.target.value)}
            maxLength={120}
            className="rounded-xl"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-muted-foreground">Product URL</label>
          <div className="flex items-center rounded-xl border bg-muted/30 overflow-hidden">
            <span className="px-3 text-xs text-muted-foreground border-r py-2.5 bg-muted/50 shrink-0 whitespace-nowrap">
              halalhub.co.in/p/
            </span>
            <Input
              value={slug}
              onChange={e => setSlug(slugify(e.target.value))}
              className="border-none rounded-none bg-transparent text-xs font-bold"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-muted-foreground">Category *</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(c => (
                <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-muted-foreground">Description</label>
          <Textarea
            placeholder="Describe your product — ingredients, size, what makes it special..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            maxLength={1000}
            rows={3}
            className="rounded-xl resize-none"
          />
          <p className="text-[10px] text-right text-muted-foreground">{description.length}/1000</p>
        </div>
      </div>

      {/* ── Section 2: Pricing & Stock ── */}
      <SectionHeader icon={Tag} title="Pricing & Stock" />

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-muted-foreground">Price (₹) *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-bold">₹</span>
              <Input
                type="number"
                placeholder="0"
                value={priceRupees}
                onChange={e => setPriceRupees(e.target.value)}
                min="1"
                className="rounded-xl pl-7"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-muted-foreground">Compare at (₹)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-bold">₹</span>
              <Input
                type="number"
                placeholder="0"
                value={comparePriceRupees}
                onChange={e => setComparePriceRupees(e.target.value)}
                min="0"
                className="rounded-xl pl-7"
              />
            </div>
            <p className="text-[10px] text-muted-foreground">Strike-through price shown to buyers</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-muted-foreground">Stock Quantity *</label>
            <Input
              type="number"
              placeholder="1"
              value={stock}
              onChange={e => setStock(e.target.value)}
              min="0"
              className="rounded-xl"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-muted-foreground">SKU</label>
            <Input
              placeholder="e.g. HLB-500G"
              value={sku}
              onChange={e => setSku(e.target.value)}
              className="rounded-xl font-mono"
            />
          </div>
        </div>
      </div>

      {/* ── Section 3: Halal Status ── */}
      <SectionHeader icon={ShieldCheck} title="Halal Status" />

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {(["self_declared", "certified"] as const).map(v => (
            <Card
              key={v}
              className={`rounded-2xl border-2 cursor-pointer transition-all ${
                halalStatus === v ? "border-primary bg-primary/5" : "border-transparent shadow-sm"
              }`}
              onClick={() => setHalalStatus(v)}
            >
              <CardContent className="p-3 text-center">
                <ShieldCheck className={`h-5 w-5 mx-auto mb-1 ${halalStatus === v ? "text-primary" : "text-muted-foreground"}`} />
                <p className="text-xs font-black text-foreground">
                  {v === "self_declared" ? "Self-Declared" : "Certified"}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {v === "self_declared" ? "I confirm it's halal" : "I have a cert"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {halalStatus === "certified" && (
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Certification Body</label>
              <Select value={certBody} onValueChange={setCertBody}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select certifier" />
                </SelectTrigger>
                <SelectContent>
                  {HALAL_CERT_BODIES.map(b => (
                    <SelectItem key={b} value={b}>{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Certificate Expiry</label>
              <Input
                type="date"
                value={certExpiry}
                onChange={e => setCertExpiry(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <Card className="rounded-2xl border-none bg-muted/40 shadow-none">
              <CardContent className="p-3 text-xs text-muted-foreground">
                Our team will ask for the certificate document during product review via WhatsApp.
              </CardContent>
            </Card>
          </div>
        )}

        {halalStatus === "self_declared" && (
          <Card className="rounded-2xl border-none bg-amber-50 dark:bg-amber-950/20 shadow-none">
            <CardContent className="p-3 text-xs text-amber-700 dark:text-amber-400">
              Self-declared products show a Silver halal badge. Upgrade to Certified for a Gold badge and higher buyer trust.
            </CardContent>
          </Card>
        )}
      </div>

      {/* ── Section 4: Shipping ── */}
      <SectionHeader icon={Truck} title="Shipping & Returns" />

      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-xs font-bold text-muted-foreground">Processing Time</label>
          <Select value={processingDays} onValueChange={setProcessingDays}>
            <SelectTrigger className="rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 5, 7].map(d => (
                <SelectItem key={d} value={String(d)}>
                  {d === 1 ? "Same day" : `${d} business days`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-[10px] text-muted-foreground">Time from order to dispatch</p>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-muted-foreground">Free Shipping Above (₹)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-bold">₹</span>
            <Input
              type="number"
              placeholder="e.g. 499"
              value={freeShippingAbove}
              onChange={e => setFreeShippingAbove(e.target.value)}
              min="0"
              className="rounded-xl pl-7"
            />
          </div>
          <p className="text-[10px] text-muted-foreground">Leave empty if shipping is always charged</p>
        </div>

        <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-muted/40">
          <div>
            <p className="text-sm font-bold text-foreground">Accept Returns</p>
            <p className="text-xs text-muted-foreground">Buyers can request a return within 7 days</p>
          </div>
          <button
            onClick={() => setReturnEligible(r => !r)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              returnEligible ? "bg-primary" : "bg-muted-foreground/30"
            }`}
          >
            <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
              returnEligible ? "translate-x-6" : "translate-x-1"
            }`} />
          </button>
        </div>
      </div>

      {/* ── Action buttons ── */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border/50 flex gap-3 max-w-lg mx-auto">
        <Button
          variant="outline"
          className="flex-1 rounded-xl font-bold gap-1.5 h-11"
          onClick={() => save(true)}
          disabled={!canSubmit || savingDraft || submitting}
        >
          {savingDraft ? <Loader2 className="h-4 w-4 animate-spin" /> : <SaveIcon className="h-4 w-4" />}
          Save Draft
        </Button>
        <Button
          className="flex-1 rounded-xl font-bold gap-1.5 h-11"
          onClick={() => save(false)}
          disabled={!canSubmit || submitting || savingDraft}
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendIcon className="h-4 w-4" />}
          Submit for Review
        </Button>
      </div>
    </div>
  )
}
