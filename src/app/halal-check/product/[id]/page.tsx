
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  ArrowLeft, Bookmark, Share2, Flag, ShieldCheck, XCircle,
  AlertTriangle, HelpCircle, ChevronDown, ChevronUp, CheckCircle2,
  Package, Globe, Building2, Calendar, ExternalLink
} from "lucide-react"
import { STATUS_CONFIG, type HalalStatus } from "../../data"
import { useAuth } from "@/hooks/use-auth"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

type Product = {
  id: string
  barcode: string | null
  name: string
  brand: string | null
  category: string | null
  halal_status: HalalStatus
  certifications?: { body: string; country: string }[]
  country: string | null
  ingredients: string | null
  ingredient_analysis: { name: string; status: HalalStatus; reason: string }[]
  description: string | null
  manufacturer: string | null
  last_verified: string | null
  verification_source: string | null
  alternatives?: string[]
}

function StatusBadge({ status, large }: { status: HalalStatus; large?: boolean }) {
  const cfg = STATUS_CONFIG[status]
  const Icon = status === "Halal" ? ShieldCheck : status === "Haram" ? XCircle : status === "Mashbooh" ? AlertTriangle : HelpCircle
  return (
    <div className={cn(
      "inline-flex items-center gap-2 rounded-2xl border font-black",
      cfg.bg, cfg.border, cfg.color,
      large ? "px-5 py-2.5 text-sm gap-2.5" : "px-3 py-1.5 text-xs"
    )}>
      <Icon className={large ? "h-5 w-5" : "h-3.5 w-3.5"} />
      {cfg.label}
    </div>
  )
}

function IngredientBadge({ status }: { status: HalalStatus }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <span className={cn("text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-lg border", cfg.color, cfg.bg, cfg.border)}>
      {cfg.label}
    </span>
  )
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const { toast } = useToast()
  const [product, setProduct] = useState<Product | null | undefined>(undefined)
  const [saved, setSaved] = useState(false)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [reporting, setReporting] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    ;(supabase as any)
      .from("halal_products")
      .select("id, barcode, name, brand, category, halal_status, certifications, country, ingredients, ingredient_analysis, description, manufacturer, last_verified, verification_source, alternatives")
      .eq("id", id)
      .single()
      .then(({ data }: { data: Product | null }) => setProduct(data ?? null))
  }, [id])

  useEffect(() => {
    if (!product || !user?.uid) return
    const supabase = createClient()
    ;(supabase as any).from("saved_products").select("id").eq("user_id", user.uid).eq("product_id", product.id).maybeSingle()
      .then(({ data }: { data: { id: string } | null }) => setSaved(!!data))
    ;(supabase as any).from("product_views").insert({ user_id: user.uid, product_id: product.id }).then(() => {})
  }, [product, user?.uid])

  async function toggleSave() {
    if (!product || !user?.uid) {
      toast({ variant: "destructive", title: "Sign in required", description: "Please sign in to save products." })
      return
    }
    const supabase = createClient()
    if (saved) {
      await (supabase as any).from("saved_products").delete().eq("user_id", user.uid).eq("product_id", product.id)
      setSaved(false)
    } else {
      await (supabase as any).from("saved_products").insert({ user_id: user.uid, product_id: product.id })
      setSaved(true)
    }
  }

  async function reportIncorrect() {
    if (!product) return
    setReporting(true)
    const supabase = createClient()
    const { error } = await (supabase as any).from("contacts").insert({
      user_id: user?.uid ?? null,
      name: user?.name ?? "Anonymous",
      email: user?.email ?? "unknown@halalhub.app",
      subject: `Halal Check Report: ${product.name}`,
      message: `Product: ${product.name} (${product.brand ?? "unknown brand"})\nBarcode: ${product.barcode ?? "n/a"}\nCurrent status: ${product.halal_status}\n\nReported as possibly incorrect.`,
    })
    setReporting(false)
    toast(error
      ? { variant: "destructive", title: "Couldn't submit report", description: error.message }
      : { title: "Report submitted", description: "Thank you — our team will review this product." })
  }

  function toggle(key: string) {
    setExpanded(p => ({ ...p, [key]: !p[key] }))
  }

  if (product === undefined) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  if (product === null) {
    return (
      <div className="max-w-2xl lg:max-w-5xl mx-auto px-4 py-8 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-muted flex items-center justify-center mx-auto">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-lg font-black">Product Not Found</h1>
        <p className="text-sm text-muted-foreground">This product isn't in our database yet.</p>
        <Link href="/halal-check" className="inline-flex items-center gap-2 text-primary font-black text-sm">
          <ArrowLeft className="h-4 w-4" /> Back to Halal Check
        </Link>
      </div>
    )
  }

  const cfg = STATUS_CONFIG[product.halal_status]
  const ingredientAnalysis = product.ingredient_analysis ?? []
  const halalCount = ingredientAnalysis.filter(i => i.status === "Halal").length
  const haramCount = ingredientAnalysis.filter(i => i.status === "Haram").length
  const mashboohCount = ingredientAnalysis.filter(i => i.status === "Mashbooh").length

  return (
    <div className="max-w-2xl lg:max-w-5xl mx-auto pb-32">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border/40">
        <Link href="/halal-check" className="w-9 h-9 rounded-xl border border-border/50 flex items-center justify-center hover:bg-muted transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex items-center gap-2">
          <button onClick={toggleSave} className={cn("w-9 h-9 rounded-xl border flex items-center justify-center transition-colors", saved ? "border-primary bg-primary/10 text-primary" : "border-border/50 hover:bg-muted")}>
            <Bookmark className={cn("h-4 w-4", saved && "fill-current")} />
          </button>
          <button className="w-9 h-9 rounded-xl border border-border/50 flex items-center justify-center hover:bg-muted transition-colors">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Hero status banner */}
      <div className={cn("px-4 py-6 border-b", cfg.bg, cfg.border.replace("border", "border-b"))}>
        <div className="space-y-4">
          <StatusBadge status={product.halal_status} large />
          <div>
            <h1 className="text-xl font-black text-foreground leading-tight">{product.name}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{product.brand} · {product.category}</p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{cfg.explanation}</p>
        </div>
      </div>

      <div className="px-4 py-5 space-y-5">

        {/* Quick facts */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: Globe, label: "Country", value: product.country },
            { icon: Building2, label: "Manufacturer", value: product.manufacturer },
            { icon: Calendar, label: "Last Verified", value: product.last_verified },
            { icon: ExternalLink, label: "Source", value: product.verification_source },
          ].map(fact => (
            <div key={fact.label} className="rounded-2xl border border-border/50 bg-card px-3.5 py-3 space-y-0.5">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <fact.icon className="h-3 w-3" />
                <span className="text-[9px] font-black uppercase tracking-wider">{fact.label}</span>
              </div>
              <p className="text-xs font-black truncate">{fact.value}</p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        {product.certifications && product.certifications.length > 0 && (
          <section className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Certifications</p>
            <div className="flex flex-wrap gap-2">
              {product.certifications.map((cert, i) => (
                <div key={i} className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 rounded-xl px-3 py-1.5">
                  <CheckCircle2 className="h-3 w-3" />
                  <span className="text-[11px] font-black">{cert.body}</span>
                  <span className="text-[9px] opacity-70">({cert.country})</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Ingredient analysis */}
        <section className="space-y-2">
          <button onClick={() => toggle("ingredients")} className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Ingredient Analysis</p>
              <span className="text-[9px] text-muted-foreground">({ingredientAnalysis.length} found)</span>
            </div>
            {expanded.ingredients ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </button>

          {/* Summary bar */}
          <div className="flex gap-2">
            {haramCount > 0 && <span className="text-[10px] bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 px-2 py-0.5 rounded-lg font-black">{haramCount} Haram</span>}
            {mashboohCount > 0 && <span className="text-[10px] bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded-lg font-black">{mashboohCount} Doubtful</span>}
            {halalCount > 0 && <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-lg font-black">{halalCount} Halal</span>}
          </div>

          {(expanded.ingredients || ingredientAnalysis.length <= 4) && (
            <div className="space-y-1.5">
              {ingredientAnalysis.map((ing, i) => (
                <div key={i} className="flex items-start justify-between gap-3 rounded-xl border border-border/40 bg-card px-3.5 py-2.5">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black">{ing.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{ing.reason}</p>
                  </div>
                  <IngredientBadge status={ing.status} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Full ingredients list */}
        <section className="space-y-2">
          <button onClick={() => toggle("full")} className="w-full flex items-center justify-between">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Full Ingredients List</p>
            {expanded.full ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </button>
          {expanded.full && (
            <div className="rounded-2xl border border-border/50 bg-muted/30 px-4 py-3">
              <p className="text-xs text-muted-foreground leading-relaxed">{product.ingredients}</p>
            </div>
          )}
        </section>

        {/* Alternatives */}
        {product.alternatives && product.alternatives.length > 0 && (
          <section className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Halal Alternatives</p>
            <div className="flex flex-wrap gap-2">
              {product.alternatives.map((alt, i) => (
                <span key={i} className="text-xs bg-card border border-border/50 px-3 py-1.5 rounded-xl font-medium">{alt}</span>
              ))}
            </div>
          </section>
        )}

        {/* Description */}
        <section className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">About</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
        </section>

        {/* Barcode */}
        <div className="rounded-2xl border border-border/50 bg-card px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Barcode</p>
            <p className="text-sm font-mono font-black">{product.barcode}</p>
          </div>
          <Package className="h-5 w-5 text-muted-foreground" />
        </div>

        {/* Report button */}
        <button
          onClick={reportIncorrect}
          disabled={reporting}
          className="w-full flex items-center justify-center gap-2 border border-border/50 rounded-2xl h-11 text-xs font-black text-muted-foreground hover:bg-muted hover:text-foreground transition-colors disabled:opacity-50"
        >
          <Flag className="h-3.5 w-3.5" /> {reporting ? "Submitting…" : "Report Incorrect Information"}
        </button>
      </div>
    </div>
  )
}
