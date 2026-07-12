
"use client"

import { useState, useEffect, useMemo, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft, Search, ShieldCheck, XCircle, AlertTriangle,
  HelpCircle, ChevronRight, X
} from "lucide-react"
import { analyseIngredients, STATUS_CONFIG, type HalalStatus } from "../data"
import { createClient } from "@/lib/supabase/client"

type ProductRow = { id: string; name: string; brand: string | null; category: string | null; halal_status: HalalStatus }

function StatusBadge({ status }: { status: HalalStatus }) {
  const cfg = STATUS_CONFIG[status]
  const Icon = status === "Halal" ? ShieldCheck : status === "Haram" ? XCircle : status === "Mashbooh" ? AlertTriangle : HelpCircle
  return (
    <span className={cn("inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full border", cfg.color, cfg.bg, cfg.border)}>
      <Icon className="h-3 w-3" /> {cfg.label}
    </span>
  )
}

type Tab = "products" | "ingredients"

function ProductCheckerContent() {
  const searchParams = useSearchParams()
  const initial = searchParams.get("q") || ""

  const [tab, setTab] = useState<Tab>("products")
  const [productQuery, setProductQuery] = useState(initial)
  const [ingredientText, setIngredientText] = useState("")
  const [ingredientResults, setIngredientResults] = useState<ReturnType<typeof analyseIngredients>>([])
  const [analysed, setAnalysed] = useState(false)
  const [productResults, setProductResults] = useState<ProductRow[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    const q = productQuery.trim()
    setLoadingProducts(true)
    const handle = setTimeout(() => {
      let query = (supabase as any).from("halal_products").select("id, name, brand, category, halal_status").order("name")
      if (q) query = query.or(`name.ilike.%${q}%,brand.ilike.%${q}%,category.ilike.%${q}%,ingredients.ilike.%${q}%`)
      query.then(({ data }: { data: ProductRow[] | null }) => {
        setProductResults(data ?? [])
        setLoadingProducts(false)
      })
    }, 250)
    return () => clearTimeout(handle)
  }, [productQuery])

  function runIngredientCheck() {
    if (!ingredientText.trim()) return
    setIngredientResults(analyseIngredients(ingredientText))
    setAnalysed(true)
  }

  const worstStatus: HalalStatus = useMemo(() => {
    if (!ingredientResults.length) return "Unknown"
    if (ingredientResults.some(r => r.result?.status === "Haram")) return "Haram"
    if (ingredientResults.some(r => r.result?.status === "Mashbooh")) return "Mashbooh"
    if (ingredientResults.every(r => r.result?.status === "Halal")) return "Halal"
    return "Unknown"
  }, [ingredientResults])

  return (
    <div className="max-w-2xl lg:max-w-5xl mx-auto pb-32">
      <div className="flex items-center gap-3 px-4 py-4 border-b border-border/40">
        <Link href="/halal-check" className="w-9 h-9 rounded-xl border border-border/50 flex items-center justify-center hover:bg-muted transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-base font-black">Product & Ingredient Checker</h1>
          <p className="text-[10px] text-muted-foreground">Search products or paste ingredients to check</p>
        </div>
      </div>

      <div className="flex border-b border-border/40">
        {[
          { id: "products" as Tab, label: "Search Products" },
          { id: "ingredients" as Tab, label: "Check Ingredients" },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "flex-1 py-3 text-[11px] font-black uppercase tracking-wide transition-all border-b-2",
              tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "products" && (
        <div className="px-4 pt-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              value={productQuery}
              onChange={e => setProductQuery(e.target.value)}
              placeholder="Search by name, brand, or barcode…"
              className="pl-10 h-12 rounded-2xl border-border/60 text-sm"
            />
            {productQuery && (
              <button onClick={() => setProductQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>

          <p className="text-[10px] text-muted-foreground">
            {loadingProducts ? "Searching…" : <>{productResults.length} result{productResults.length !== 1 ? "s" : ""}</>}
          </p>

          <div className="space-y-2">
            {productResults.map(p => (
              <Link key={p.id} href={`/halal-check/product/${p.id}`} className="group block">
                <div className="flex items-center gap-3 rounded-2xl border border-border/50 bg-card px-4 py-3 hover:shadow-soft hover:bg-muted/20 transition-all">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm", STATUS_CONFIG[p.halal_status].bg, STATUS_CONFIG[p.halal_status].color)}>
                    {STATUS_CONFIG[p.halal_status].icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black truncate">{p.name}</p>
                    <p className="text-[10px] text-muted-foreground">{p.brand} · {p.category}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <StatusBadge status={p.halal_status} />
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
            {!loadingProducts && productResults.length === 0 && (
              <div className="text-center py-12 space-y-2">
                <Search className="h-8 w-8 text-muted-foreground mx-auto" />
                <p className="text-sm font-black text-muted-foreground">No products found</p>
                <p className="text-xs text-muted-foreground">Try checking ingredients instead</p>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "ingredients" && (
        <div className="px-4 pt-4 space-y-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Paste Ingredient List</p>
            <textarea
              value={ingredientText}
              onChange={e => { setIngredientText(e.target.value); setAnalysed(false) }}
              placeholder="e.g. Sugar, Gelatin (pork), Carmine (E120), Natural Flavours, Citric Acid…"
              rows={6}
              className="w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>

          <button
            onClick={runIngredientCheck}
            disabled={!ingredientText.trim()}
            className="w-full h-12 rounded-2xl bg-primary text-white font-black text-sm hover:bg-primary/90 disabled:opacity-40 transition-colors"
          >
            Analyse Ingredients
          </button>

          {analysed && ingredientResults.length > 0 && (
            <div className="space-y-3">
              <div className={cn("rounded-2xl border p-4 space-y-1", STATUS_CONFIG[worstStatus].bg, STATUS_CONFIG[worstStatus].border)}>
                <p className="text-[9px] font-black uppercase tracking-widest opacity-70">Overall Assessment</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{STATUS_CONFIG[worstStatus].icon}</span>
                  <div>
                    <p className={cn("text-base font-black", STATUS_CONFIG[worstStatus].color)}>{STATUS_CONFIG[worstStatus].label}</p>
                    <p className="text-[10px] text-muted-foreground">{STATUS_CONFIG[worstStatus].explanation}</p>
                  </div>
                </div>
              </div>

              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Ingredient Breakdown</p>
              <div className="space-y-1.5">
                {ingredientResults.map((r, i) => (
                  <div key={i} className="flex items-start justify-between gap-3 rounded-xl border border-border/40 bg-card px-3.5 py-2.5">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black">{r.ingredient}</p>
                      {r.result
                        ? <p className="text-[10px] text-muted-foreground mt-0.5">{r.result.reason}</p>
                        : <p className="text-[10px] text-muted-foreground mt-0.5">Not in database — verify manually</p>
                      }
                      {r.result?.alternatives && r.result.alternatives.length > 0 && (
                        <p className="text-[10px] text-primary mt-1">Halal alt: {r.result.alternatives.join(", ")}</p>
                      )}
                    </div>
                    <StatusBadge status={r.result?.status ?? "Unknown"} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {analysed && ingredientResults.length === 0 && (
            <div className="text-center py-8 space-y-2">
              <HelpCircle className="h-8 w-8 text-muted-foreground mx-auto" />
              <p className="text-sm font-black text-muted-foreground">No recognisable ingredients found</p>
              <p className="text-xs text-muted-foreground">Separate ingredients with commas</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function ProductCheckerPage() {
  return (
    <Suspense>
      <ProductCheckerContent />
    </Suspense>
  )
}
