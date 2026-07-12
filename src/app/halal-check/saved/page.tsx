
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowLeft, Bookmark, Trash2, ChevronRight } from "lucide-react"
import { STATUS_CONFIG, type HalalStatus } from "../data"
import { useAuth } from "@/hooks/use-auth"
import { createClient } from "@/lib/supabase/client"

type Product = { id: string; name: string; brand: string | null; category: string | null; halal_status: HalalStatus }

export default function SavedProductsPage() {
  const { user } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!user?.uid) { setLoaded(true); return }
    const supabase = createClient()
    ;(supabase as any)
      .from("saved_products")
      .select("product:halal_products(id, name, brand, category, halal_status)")
      .eq("user_id", user.uid)
      .order("created_at", { ascending: false })
      .then(({ data }: { data: { product: Product }[] | null }) => {
        setProducts((data ?? []).map(row => row.product).filter(Boolean))
        setLoaded(true)
      })
  }, [user?.uid])

  async function remove(id: string) {
    if (!user?.uid) return
    const supabase = createClient()
    await (supabase as any).from("saved_products").delete().eq("user_id", user.uid).eq("product_id", id)
    setProducts(p => p.filter(pr => pr.id !== id))
  }

  async function clearAll() {
    if (!user?.uid) return
    const supabase = createClient()
    await (supabase as any).from("saved_products").delete().eq("user_id", user.uid)
    setProducts([])
  }

  return (
    <div className="max-w-2xl lg:max-w-5xl mx-auto pb-32">
      <div className="flex items-center gap-3 px-4 py-4 border-b border-border/40">
        <Link href="/halal-check" className="w-9 h-9 rounded-xl border border-border/50 flex items-center justify-center hover:bg-muted transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1">
          <h1 className="text-base font-black">Saved Products</h1>
          <p className="text-[10px] text-muted-foreground">{products.length} saved product{products.length !== 1 ? "s" : ""}</p>
        </div>
        {products.length > 0 && (
          <button onClick={clearAll} className="flex items-center gap-1.5 text-[10px] font-black text-muted-foreground hover:text-destructive transition-colors">
            <Trash2 className="h-3.5 w-3.5" /> Clear All
          </button>
        )}
      </div>

      <div className="px-4 pt-4 space-y-2">
        {loaded && products.length > 0 && products.map(p => {
          const cfg = STATUS_CONFIG[p.halal_status]
          return (
            <div key={p.id} className="group flex items-center gap-2">
              <Link href={`/halal-check/product/${p.id}`} className="flex-1">
                <div className="flex items-center gap-3 rounded-2xl border border-border/50 bg-card px-4 py-3 hover:shadow-soft hover:bg-muted/20 transition-all">
                  <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm", cfg.bg, cfg.color)}>
                    {cfg.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black truncate">{p.name}</p>
                    <p className="text-[10px] text-muted-foreground">{p.brand} · {p.category}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={cn("text-[10px] font-black", cfg.color)}>{cfg.label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </Link>
              <button
                onClick={() => remove(p.id)}
                className="w-9 h-9 rounded-xl border border-border/50 flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive/50 transition-colors shrink-0"
              >
                <Bookmark className="h-4 w-4 fill-current" />
              </button>
            </div>
          )
        })}

        {loaded && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
            <div className="w-16 h-16 rounded-3xl bg-muted flex items-center justify-center">
              <Bookmark className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-black text-muted-foreground">No saved products yet</p>
              <p className="text-xs text-muted-foreground">Bookmark products from the product detail page</p>
            </div>
            <Link href="/halal-check/product-checker" className="text-sm font-black text-primary">
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
