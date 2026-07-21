"use client"

import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ShoppingCart } from "lucide-react"

// Group cart items by business
function groupBySeller(items: ReturnType<typeof useCart>["items"]) {
  const map = new Map<string, { name: string; items: typeof items }>()
  for (const item of items) {
    const key = item.business_id || "unknown"
    if (!map.has(key)) map.set(key, { name: item.business_name, items: [] })
    map.get(key)!.items.push(item)
  }
  return [...map.entries()]
}

export default function CartPage() {
  const { items, removeItem, updateQty, total, count } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 px-4 text-center">
        <div className="h-24 w-24 rounded-3xl bg-primary/10 flex items-center justify-center">
          <ShoppingBag className="h-12 w-12 text-primary/40" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-headline">Your cart is empty</h1>
          <p className="text-muted-foreground mt-1 text-sm">Browse the marketplace to add products.</p>
        </div>
        <Link href="/marketplace">
          <Button className="rounded-xl h-11 font-bold px-6 gap-2">
            <ShoppingCart className="h-4 w-4" /> Browse Marketplace
          </Button>
        </Link>
      </div>
    )
  }

  const groups = groupBySeller(items)
  const DELIVERY_FEE = 49

  return (
    <div className="pb-40 max-w-2xl mx-auto">
      {/* Header */}
      <div className="sticky top-16 z-10 bg-background/90 backdrop-blur border-b px-4 py-3 flex items-center gap-3">
        <Link href="/marketplace" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-bold text-lg">Cart</h1>
        <span className="text-sm text-muted-foreground">({count} {count === 1 ? "item" : "items"})</span>
      </div>

      <div className="p-4 space-y-4">
        {groups.map(([sellerId, group]) => (
          <div key={sellerId} className="border rounded-2xl overflow-hidden">
            {/* Seller header */}
            <div className="px-4 py-2.5 bg-secondary/40 border-b flex items-center gap-2">
              <ShoppingBag className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm font-semibold">{group.name}</span>
            </div>

            {/* Items */}
            <div className="divide-y">
              {group.items.map(item => (
                <div key={item.id} className="flex gap-3 p-3">
                  {/* Image */}
                  <div className="relative h-20 w-20 rounded-xl overflow-hidden bg-muted shrink-0">
                    {item.image_url ? (
                      <Image src={item.image_url} alt={item.title} fill className="object-cover" unoptimized />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <ShoppingBag className="h-8 w-8 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm leading-tight line-clamp-2">{item.title}</p>
                    <p className="text-primary font-bold mt-1">₹{item.price.toLocaleString("en-IN")}</p>

                    <div className="flex items-center justify-between mt-2">
                      {/* Qty stepper */}
                      <div className="flex items-center gap-1 border rounded-lg">
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="h-7 w-7 flex items-center justify-center hover:bg-secondary rounded-l-lg transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center text-sm font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="h-7 w-7 flex items-center justify-center hover:bg-secondary rounded-r-lg transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Seller subtotal */}
            <div className="px-4 py-2.5 bg-secondary/20 border-t flex justify-between text-sm">
              <span className="text-muted-foreground">
                Subtotal ({group.items.reduce((s, i) => s + i.quantity, 0)} items)
              </span>
              <span className="font-semibold">
                ₹{group.items.reduce((s, i) => s + i.price * i.quantity, 0).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        ))}

        {/* Order summary */}
        <div className="border rounded-2xl p-4 space-y-3">
          <h2 className="font-bold">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery fee</span>
              <span>₹{DELIVERY_FEE}</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>GST (included)</span>
              <span>₹{Math.round(total * 0.05).toLocaleString("en-IN")}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-base">
              <span>Total</span>
              <span className="text-primary">₹{(total + DELIVERY_FEE).toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky checkout */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur border-t p-4">
        <div className="max-w-2xl mx-auto space-y-2">
          <Link href="/checkout">
            <Button className="w-full h-13 rounded-xl font-bold text-base h-12">
              Proceed to Checkout · ₹{(total + DELIVERY_FEE).toLocaleString("en-IN")}
            </Button>
          </Link>
          <Link href="/marketplace" className="block text-center text-xs text-muted-foreground hover:text-primary transition-colors">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
