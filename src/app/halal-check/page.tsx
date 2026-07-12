
"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Search, ScanLine, BookOpen, List, History, Bookmark,
  GraduationCap, ChevronRight, ShieldCheck, AlertTriangle,
  XCircle, HelpCircle, Sparkles, ArrowRight,
} from "lucide-react"
import { PRODUCT_CATEGORIES, STATUS_CONFIG, type HalalStatus } from "./data"
import { createClient } from "@/lib/supabase/client"

type ProductRow = { id: string; name: string; brand: string | null; category: string | null; halal_status: HalalStatus }

const QUICK_TOOLS = [
  { label: "Scan Barcode",    href: "/halal-check/scan",           icon: ScanLine,      bg: "bg-primary/10",         color: "text-primary",      desc: "Camera scanner" },
  { label: "E-Code Check",   href: "/halal-check/e-codes",        icon: BookOpen,      bg: "bg-blue-100 dark:bg-blue-950/40",   color: "text-blue-600",     desc: "E100–E1520" },
  { label: "INS Codes",      href: "/halal-check/ins-codes",      icon: List,          bg: "bg-violet-100 dark:bg-violet-950/40",color: "text-violet-600",   desc: "International" },
  { label: "Ingredient Check",href: "/halal-check/product-checker",icon: ShieldCheck,  bg: "bg-emerald-100 dark:bg-emerald-950/40",color: "text-emerald-600",desc: "Paste & analyse" },
  { label: "Scan History",   href: "/halal-check/history",        icon: History,       bg: "bg-amber-100 dark:bg-amber-950/40", color: "text-amber-600",    desc: "Recent lookups" },
  { label: "Saved Products", href: "/halal-check/saved",          icon: Bookmark,      bg: "bg-rose-100 dark:bg-rose-950/40",   color: "text-rose-600",     desc: "Favourites" },
  { label: "Learn",          href: "/halal-check/learn",          icon: GraduationCap, bg: "bg-teal-100 dark:bg-teal-950/40",   color: "text-teal-600",     desc: "Ingredients guide" },
]

const STATUS_PILLS: { status: HalalStatus; label: string }[] = [
  { status: "Halal",    label: "Halal" },
  { status: "Haram",    label: "Haram" },
  { status: "Mashbooh", label: "Mashbooh" },
  { status: "Unknown",  label: "Unknown" },
]

function StatusBadge({ status }: { status: HalalStatus }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <span className={cn("inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full border", cfg.color, cfg.bg, cfg.border)}>
      {cfg.icon} {cfg.label}
    </span>
  )
}

export default function HalalCheckPage() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<ProductRow[]>([])
  const [recentProducts, setRecentProducts] = useState<ProductRow[]>([])
  const [productCount, setProductCount] = useState<number | null>(null)

  useEffect(() => {
    const supabase = createClient()
    ;(supabase as any)
      .from("halal_products")
      .select("id, name, brand, category, halal_status", { count: "exact" })
      .order("created_at", { ascending: false })
      .limit(5)
      .then(({ data, count }: { data: ProductRow[] | null; count: number | null }) => {
        setRecentProducts(data ?? [])
        setProductCount(count ?? 0)
      })
  }, [])

  useEffect(() => {
    if (query.trim().length < 2) { setResults([]); return }
    const supabase = createClient()
    const q = query.trim()
    const handle = setTimeout(() => {
      ;(supabase as any)
        .from("halal_products")
        .select("id, name, brand, category, halal_status")
        .or(`name.ilike.%${q}%,brand.ilike.%${q}%`)
        .limit(6)
        .then(({ data }: { data: ProductRow[] | null }) => setResults(data ?? []))
    }, 250)
    return () => clearTimeout(handle)
  }, [query])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) router.push(`/halal-check/product-checker?q=${encodeURIComponent(query)}`)
  }

  return (
    <div className="max-w-2xl lg:max-w-5xl mx-auto pb-32 px-4 py-5 space-y-7">

      {/* ── Hero ── */}
      <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-emerald-500/5 to-transparent border border-primary/10 p-5 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-primary/15 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary">Halal Hub</p>
            <h1 className="text-lg font-black text-foreground leading-tight">Halal Check</h1>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Verify the halal status of any product, E-code, or ingredient instantly.
        </p>

        {/* Search */}
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search product, ingredient, or E-code…"
            className="pl-10 pr-16 h-12 rounded-2xl border-border/60 bg-background text-sm font-medium"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white text-[11px] font-black px-3 py-1.5 rounded-xl hover:bg-primary/90 transition-colors"
          >
            Search
          </button>

          {/* Instant suggestions */}
          {results.length > 0 && (
            <div className="absolute top-14 left-0 right-0 z-20 bg-card border border-border rounded-2xl shadow-soft-lg overflow-hidden">
              {results.map(p => (
                <Link
                  key={p.id}
                  href={`/halal-check/product/${p.id}`}
                  className="flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors border-b border-border/40 last:border-0"
                  onClick={() => setQuery("")}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-black truncate">{p.name}</p>
                    <p className="text-[10px] text-muted-foreground">{p.brand} · {p.category}</p>
                  </div>
                  <StatusBadge status={p.halal_status} />
                </Link>
              ))}
            </div>
          )}
        </form>

        {/* Quick scan CTA */}
        <Link href="/halal-check/scan" className="flex items-center gap-3 bg-primary text-white rounded-2xl px-4 py-3 hover:bg-primary/90 transition-colors group">
          <ScanLine className="h-5 w-5" />
          <div className="flex-1">
            <p className="text-sm font-black">Scan a Barcode</p>
            <p className="text-[10px] opacity-80">Point camera at any product</p>
          </div>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* ── Status legend ── */}
      <section className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Halal Status Guide</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {[
            { status: "Halal" as HalalStatus, icon: ShieldCheck, desc: "Permissible. Safe to consume." },
            { status: "Haram" as HalalStatus, icon: XCircle, desc: "Forbidden. Do not consume." },
            { status: "Mashbooh" as HalalStatus, icon: AlertTriangle, desc: "Doubtful. Verify before consuming." },
            { status: "Unknown" as HalalStatus, icon: HelpCircle, desc: "Status unconfirmed. Investigate." },
          ].map(({ status, icon: Icon, desc }) => {
            const cfg = STATUS_CONFIG[status]
            return (
              <div key={status} className={cn("rounded-2xl border p-3 space-y-1.5", cfg.bg, cfg.border)}>
                <div className="flex items-center gap-1.5">
                  <Icon className={cn("h-4 w-4", cfg.color)} />
                  <span className={cn("text-xs font-black", cfg.color)}>{status}</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-snug">{desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Quick tools ── */}
      <section className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Tools</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {QUICK_TOOLS.map(tool => (
            <Link key={tool.href} href={tool.href} className="group block">
              <div className="rounded-2xl border border-border/50 bg-card p-3.5 space-y-2.5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", tool.bg)}>
                  <tool.icon className={cn("h-4 w-4", tool.color)} />
                </div>
                <div>
                  <p className="text-[12px] font-black text-foreground">{tool.label}</p>
                  <p className="text-[10px] text-muted-foreground">{tool.desc}</p>
                </div>
                <div className="flex items-center gap-0.5 text-[9px] font-black text-muted-foreground group-hover:text-primary transition-colors">
                  Open <ChevronRight className="h-2.5 w-2.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Recently added products ── */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Product Database</p>
          <span className="text-[10px] text-muted-foreground/60">{productCount ?? "…"} products</span>
        </div>
        <div className="space-y-2">
          {recentProducts.length === 0 ? (
            <p className="text-center text-xs text-muted-foreground py-6">No products in the database yet.</p>
          ) : recentProducts.map(p => (
            <Link key={p.id} href={`/halal-check/product/${p.id}`} className="group block">
              <div className="flex items-center gap-3 rounded-2xl border border-border/50 bg-card px-4 py-3 hover:shadow-soft hover:bg-muted/20 transition-all duration-200">
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm font-black", STATUS_CONFIG[p.halal_status].bg, STATUS_CONFIG[p.halal_status].color)}>
                  {STATUS_CONFIG[p.halal_status].icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black truncate">{p.name}</p>
                  <p className="text-[10px] text-muted-foreground">{p.brand} · {p.category}</p>
                </div>
                <StatusBadge status={p.halal_status} />
              </div>
            </Link>
          ))}
        </div>
        <Link href="/halal-check/product-checker" className="flex items-center justify-center gap-2 text-[11px] font-black text-primary py-2">
          View all products <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </section>

      {/* ── Browse categories ── */}
      <section className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Browse Categories</p>
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {PRODUCT_CATEGORIES.map(cat => (
            <div key={cat.name} className="shrink-0 flex flex-col items-center gap-1.5 cursor-pointer group">
              <div className="w-12 h-12 rounded-2xl border border-border/50 bg-card flex items-center justify-center text-xl group-hover:shadow-soft transition-shadow">
                {cat.icon}
              </div>
              <span className="text-[9px] font-black uppercase tracking-wide text-muted-foreground whitespace-nowrap">{cat.name.split(" ")[0]}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Educational CTA ── */}
      <Link href="/halal-check/learn" className="group block">
        <div className="rounded-3xl border border-teal-200 dark:border-teal-800 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/20 p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-900/60 flex items-center justify-center shrink-0">
            <GraduationCap className="h-6 w-6 text-teal-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-black text-foreground">Learn About Halal Ingredients</p>
            <p className="text-[11px] text-muted-foreground">FAQ, E-code guide, ingredient glossary & more</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
        </div>
      </Link>
    </div>
  )
}
