"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/hooks/use-auth"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, MapPin, ShoppingBag, Loader2, CheckCircle2 } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()

  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [pincode, setPincode] = useState("")
  const [notes, setNotes] = useState("")
  const [placing, setPlacing] = useState(false)

  const DELIVERY_FEE = 49
  const grandTotal = total + DELIVERY_FEE

  // Group by seller
  const sellerGroups = new Map<string, typeof items>()
  for (const item of items) {
    const key = item.business_id || "unknown"
    if (!sellerGroups.has(key)) sellerGroups.set(key, [])
    sellerGroups.get(key)!.push(item)
  }

  async function placeOrder() {
    if (!user) {
      router.push("/login?next=/checkout")
      return
    }
    if (!address.trim() || !city.trim() || !pincode.trim()) {
      toast({ title: "Please fill in your delivery address", variant: "destructive" })
      return
    }
    if (items.length === 0) return

    setPlacing(true)
    const supabase = createClient()
    const deliveryAddress = `${address}, ${city} - ${pincode}`

    try {
      // Create one order per seller group
      for (const [businessId, groupItems] of sellerGroups.entries()) {
        const groupTotal = groupItems.reduce((s, i) => s + i.price * i.quantity, 0)

        const { data: order, error: orderErr } = await (supabase as any)
          .from("business_orders")
          .insert({
            user_id: user.uid,
            business_id: businessId === "unknown" ? null : businessId,
            total_amount: groupTotal + DELIVERY_FEE,
            delivery_type: "standard",
            notes: notes || null,
            status: "pending",
          })
          .select("id")
          .single()

        if (orderErr) throw orderErr

        // Insert order items
        const orderItems = groupItems.map(i => ({
          order_id: order.id,
          catalog_item_id: i.id,
          item_name: i.title,
          quantity: i.quantity,
          unit_price: i.price,
        }))

        const { error: itemsErr } = await (supabase as any)
          .from("business_order_items")
          .insert(orderItems)

        if (itemsErr) throw itemsErr
      }

      clearCart()
      router.push("/checkout/success")
    } catch (err: any) {
      toast({ title: "Failed to place order", description: err.message, variant: "destructive" })
    } finally {
      setPlacing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
        <p className="text-xl font-bold">Your cart is empty</p>
        <Link href="/marketplace"><Button>Browse Marketplace</Button></Link>
      </div>
    )
  }

  return (
    <div className="pb-36 max-w-2xl mx-auto">
      {/* Header */}
      <div className="sticky top-16 z-10 bg-background/90 backdrop-blur border-b px-4 py-3 flex items-center gap-3">
        <Link href="/cart" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-bold text-lg">Checkout</h1>
      </div>

      <div className="p-4 space-y-5">
        {/* Delivery Address */}
        <div className="border rounded-2xl p-4 space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <h2 className="font-bold">Delivery Address</h2>
          </div>
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">Street address</Label>
              <Input
                placeholder="House no., building, street..."
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">City</Label>
                <Input
                  placeholder="Bengaluru"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">Pincode</Label>
                <Input
                  placeholder="560001"
                  inputMode="numeric"
                  maxLength={6}
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order items summary */}
        <div className="border rounded-2xl overflow-hidden">
          <div className="px-4 py-3 bg-secondary/30 border-b">
            <h2 className="font-bold text-sm">Order Summary ({items.length} items)</h2>
          </div>
          <div className="divide-y">
            {items.map(item => (
              <div key={item.id} className="flex items-center justify-between px-4 py-3 text-sm">
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.business_name} · Qty {item.quantity}</p>
                </div>
                <span className="font-semibold shrink-0 ml-3">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery option */}
        <div className="border rounded-2xl p-4">
          <h2 className="font-bold text-sm mb-3">Delivery Option</h2>
          <div className="flex items-center justify-between p-3 border-2 border-primary rounded-xl bg-primary/5">
            <div>
              <p className="font-semibold text-sm">Standard Delivery</p>
              <p className="text-xs text-muted-foreground">2–5 business days</p>
            </div>
            <span className="font-bold text-sm">₹{DELIVERY_FEE}</span>
          </div>
        </div>

        {/* Notes */}
        <div className="border rounded-2xl p-4 space-y-2">
          <h2 className="font-bold text-sm">Order Notes (optional)</h2>
          <Textarea
            placeholder="Any special instructions for the seller..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="rounded-xl resize-none"
            rows={2}
          />
        </div>

        {/* Price breakdown */}
        <div className="border rounded-2xl p-4 space-y-2">
          <h2 className="font-bold">Price Details</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery</span>
              <span>₹{DELIVERY_FEE}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-base">
              <span>Total Payable</span>
              <span className="text-primary">₹{grandTotal.toLocaleString("en-IN")}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 px-3 py-2 rounded-lg mt-2">
            Payment on delivery — Cash / UPI accepted from seller. Online payments coming soon.
          </p>
        </div>
      </div>

      {/* Sticky place order */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur border-t p-4">
        <div className="max-w-2xl mx-auto">
          <Button
            className="w-full h-12 rounded-xl font-bold text-base"
            onClick={placeOrder}
            disabled={placing}
          >
            {placing ? (
              <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Placing Order...</>
            ) : (
              `Place Order · ₹${grandTotal.toLocaleString("en-IN")}`
            )}
          </Button>
          {!user && (
            <p className="text-xs text-center text-muted-foreground mt-2">
              You&apos;ll be asked to log in before placing the order.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
