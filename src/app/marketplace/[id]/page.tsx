"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  ArrowLeft, ShoppingCart, Minus, Plus, Store,
  ShieldCheck, Star, Package
} from "lucide-react"

type Product = {
  id: string
  title: string | null
  description: string | null
  price: number | null
  image_url: string | null
  category: string | null
  is_available: boolean
  stock_quantity: number | null
  business_id: string | null
  business_name: string | null
  firebase_business_id: string | null
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { addItem, items, updateQty } = useCart()
  const { toast } = useToast()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)

  const cartItem = items.find(i => i.id === id)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from("business_catalog_items")
      .select("id, title, description, price, image_url, category, is_available, stock_quantity, business_id, business_name, firebase_business_id")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        setLoading(false)
        if (data) setProduct(data as Product)
      })
  }, [id])

  function handleAddToCart() {
    if (!product) return
    addItem({
      id: product.id,
      title: product.title ?? "Product",
      price: product.price ?? 0,
      image_url: product.image_url,
      business_id: product.business_id ?? "",
      business_name: product.business_name ?? "Seller",
    })
    toast({ title: "Added to cart", description: product.title ?? "Product" })
  }

  if (loading) {
    return (
      <div className="p-4 space-y-4 max-w-2xl mx-auto">
        <Skeleton className="h-72 w-full rounded-2xl" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-24 w-full" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center px-4">
        <Package className="h-16 w-16 text-muted-foreground/30" />
        <p className="text-xl font-bold">Product not found</p>
        <Button onClick={() => router.back()} variant="outline">Go back</Button>
      </div>
    )
  }

  const inStock = product.is_available && (product.stock_quantity === null || product.stock_quantity > 0)

  return (
    <div className="pb-32 max-w-2xl mx-auto">
      {/* Back */}
      <div className="sticky top-16 z-10 bg-background/80 backdrop-blur border-b px-4 py-3 flex items-center gap-3">
        <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="font-semibold text-sm truncate">{product.title}</span>
        <Link href="/cart" className="ml-auto relative">
          <ShoppingCart className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
          {cartItem && (
            <span className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {cartItem.quantity}
            </span>
          )}
        </Link>
      </div>

      {/* Image */}
      <div className="relative w-full h-72 bg-muted">
        {product.image_url ? (
          <Image src={product.image_url} alt={product.title ?? ""} fill className="object-cover" unoptimized />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="h-20 w-20 text-muted-foreground/20" />
          </div>
        )}
        {product.category && (
          <Badge className="absolute top-3 left-3">{product.category}</Badge>
        )}
      </div>

      {/* Info */}
      <div className="p-4 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl font-bold font-headline leading-tight">{product.title}</h1>
          <span className="text-2xl font-black text-primary shrink-0">
            ₹{(product.price ?? 0).toLocaleString("en-IN")}
          </span>
        </div>

        {/* Halal badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="h-3.5 w-3.5" />
            Seller Declared Halal
          </div>
          <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${inStock ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-600"}`}>
            {inStock ? "In Stock" : "Out of Stock"}
          </div>
        </div>

        {/* Seller */}
        {product.business_name && (
          <Link
            href={product.business_id ? `/marketplace/store/${product.business_id}` : "#"}
            className="flex items-center gap-2 p-3 rounded-xl border bg-secondary/30 hover:bg-secondary/60 transition-colors"
          >
            <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Store className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Sold by</p>
              <p className="font-semibold text-sm truncate">{product.business_name}</p>
            </div>
            <div className="ml-auto flex items-center gap-0.5 text-amber-500">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span className="text-xs font-bold">4.5</span>
            </div>
          </Link>
        )}

        {/* Description */}
        {product.description && (
          <div className="space-y-1">
            <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Description</h2>
            <p className="text-sm leading-relaxed text-foreground/80">{product.description}</p>
          </div>
        )}

        {/* Delivery info */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Delivery", value: "2–5 business days" },
            { label: "Returns", value: "7-day return policy" },
          ].map(({ label, value }) => (
            <div key={label} className="p-3 rounded-xl border bg-secondary/20 text-center">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-xs font-semibold mt-0.5">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur border-t p-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          {/* Qty stepper */}
          {cartItem ? (
            <div className="flex items-center gap-2 border rounded-xl px-2 py-1">
              <button
                onClick={() => updateQty(product.id, cartItem.quantity - 1)}
                className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-6 text-center font-bold text-sm">{cartItem.quantity}</span>
              <button
                onClick={() => updateQty(product.id, cartItem.quantity + 1)}
                className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 border rounded-xl px-2 py-1">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-secondary">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-6 text-center font-bold text-sm">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-secondary">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}

          {cartItem ? (
            <Link href="/cart" className="flex-1">
              <Button className="w-full h-12 rounded-xl font-bold text-base gap-2">
                <ShoppingCart className="h-5 w-5" />
                View Cart ({cartItem.quantity})
              </Button>
            </Link>
          ) : (
            <Button
              className="flex-1 h-12 rounded-xl font-bold text-base gap-2"
              disabled={!inStock}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5" />
              {inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
