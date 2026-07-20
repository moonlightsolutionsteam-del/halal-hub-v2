// @ts-nocheck
"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useSeller } from "@/hooks/use-seller"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Plus, Search, Package, Loader2, Eye, Edit,
  PauseCircle, PlayCircle, AlertTriangle, ShieldCheck,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Product = {
  id: string
  title: string
  category: string | null
  price_inr: number
  stock_quantity: number
  status: string
  halal_status: string
  flag_count: number
  order_count: number
  rating: number | null
  created_at: string
}

const STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  draft:    { label: "Draft",    color: "text-slate-600",   bg: "bg-slate-100 dark:bg-slate-900/40" },
  pending:  { label: "Pending",  color: "text-amber-700",   bg: "bg-amber-100 dark:bg-amber-950/30" },
  live:     { label: "Live",     color: "text-emerald-700", bg: "bg-emerald-100 dark:bg-emerald-950/30" },
  paused:   { label: "Paused",   color: "text-orange-700",  bg: "bg-orange-100 dark:bg-orange-950/30" },
  rejected: { label: "Rejected", color: "text-red-700",     bg: "bg-red-100 dark:bg-red-950/30" },
}

const HALAL_META: Record<string, { label: string; color: string }> = {
  self_declared: { label: "Self-declared",   color: "text-amber-600" },
  admin_verified:{ label: "Admin Verified",  color: "text-blue-600" },
  certified:     { label: "Certified",       color: "text-emerald-600" },
}

function fmt(paise: number) {
  return `₹${(paise / 100).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`
}

export default function SellerProductsPage() {
  const { seller } = useSeller()
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [toggling, setToggling] = useState<string | null>(null)

  useEffect(() => {
    if (!seller) return
    createClient()
      .from("mp_products")
      .select("id, title, category, price_inr, stock_quantity, status, halal_status, flag_count, order_count, rating, created_at")
      .eq("seller_id", seller.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => { setProducts((data ?? []) as Product[]); setLoading(false) })
  }, [seller])

  async function togglePause(product: Product) {
    const next = product.status === "live" ? "paused" : "live"
    setToggling(product.id)
    const { error } = await createClient()
      .from("mp_products")
      .update({ status: next })
      .eq("id", product.id)
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      setProducts(ps => ps.map(p => p.id === product.id ? { ...p, status: next } : p))
      toast({ title: next === "paused" ? "Product paused" : "Product live again" })
    }
    setToggling(null)
  }

  const filtered = products.filter(p => {
    const q = search.toLowerCase()
    const matchQ = !q || p.title.toLowerCase().includes(q)
    const matchF = filter === "all" || p.status === filter
    return matchQ && matchF
  })

  const counts = {
    live: products.filter(p => p.status === "live").length,
    pending: products.filter(p => p.status === "pending").length,
    draft: products.filter(p => p.status === "draft").length,
  }

  if (!seller) return null

  return (
    <div className="p-4 md:p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-foreground flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" /> My Products
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {counts.live} live · {counts.pending} pending · {counts.draft} drafts
          </p>
        </div>
        <Link href="/seller/products/new">
          <Button size="sm" className="rounded-xl font-bold gap-1.5 h-9">
            <Plus className="h-3.5 w-3.5" /> Add
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 rounded-xl"
          />
        </div>
        <div className="flex gap-1">
          {["all", "live", "pending", "draft", "paused"].map(s => (
            <Button
              key={s}
              size="sm"
              variant={filter === s ? "default" : "outline"}
              className="rounded-xl h-9 text-xs font-bold capitalize"
              onClick={() => setFilter(s)}
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
      ) : filtered.length === 0 ? (
        <Card className="rounded-2xl border-none shadow-sm">
          <CardContent className="p-12 text-center">
            <Package className="h-10 w-10 mx-auto text-muted-foreground/30 mb-3" />
            <p className="font-bold text-foreground">
              {search ? "No products match your search" : "No products yet"}
            </p>
            {!search && (
              <Link href="/seller/products/new">
                <Button size="sm" className="rounded-xl font-bold mt-3 gap-1.5">
                  <Plus className="h-3.5 w-3.5" /> Add your first product
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filtered.map(product => {
            const sm = STATUS_META[product.status] ?? STATUS_META.draft
            const hm = HALAL_META[product.halal_status] ?? HALAL_META.self_declared
            return (
              <Card key={product.id} className="rounded-2xl border-none shadow-sm">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    {/* Thumbnail placeholder */}
                    <div className="h-14 w-14 rounded-xl bg-muted flex items-center justify-center shrink-0 text-xl font-black text-muted-foreground/40">
                      {product.title.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-black text-foreground leading-tight">{product.title}</p>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${sm.bg} ${sm.color}`}>
                          {sm.label}
                        </span>
                        {product.flag_count >= 3 && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950/30 text-red-600 flex items-center gap-0.5">
                            <AlertTriangle className="h-2.5 w-2.5" /> {product.flag_count} flags
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="font-bold text-foreground">{fmt(product.price_inr)}</span>
                        <span>Stock: {product.stock_quantity}</span>
                        <span>{product.order_count} sold</span>
                        {product.rating && <span>★ {Number(product.rating).toFixed(1)}</span>}
                      </div>
                      <p className={`text-[10px] font-bold mt-0.5 flex items-center gap-1 ${hm.color}`}>
                        <ShieldCheck className="h-2.5 w-2.5" /> {hm.label}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link href={`/seller/products/${product.id}/edit`} className="flex-1">
                      <Button size="sm" variant="outline" className="w-full rounded-xl h-8 text-xs font-bold gap-1">
                        <Edit className="h-3 w-3" /> Edit
                      </Button>
                    </Link>
                    {(product.status === "live" || product.status === "paused") && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 rounded-xl h-8 text-xs font-bold gap-1"
                        onClick={() => togglePause(product)}
                        disabled={toggling === product.id}
                      >
                        {toggling === product.id
                          ? <Loader2 className="h-3 w-3 animate-spin" />
                          : product.status === "live"
                            ? <><PauseCircle className="h-3 w-3" /> Pause</>
                            : <><PlayCircle className="h-3 w-3" /> Unpause</>
                        }
                      </Button>
                    )}
                    <Link href={`/marketplace/product/${product.id}`} className="shrink-0">
                      <Button size="sm" variant="ghost" className="rounded-xl h-8 w-8 p-0">
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
