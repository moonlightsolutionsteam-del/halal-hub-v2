"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ShoppingBag, Package } from "lucide-react"

export default function CheckoutSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6 px-6 text-center">
      <div className="relative">
        <div className="h-28 w-28 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center">
          <CheckCircle2 className="h-16 w-16 text-emerald-600 dark:text-emerald-400" />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-black font-headline">Order Placed!</h1>
        <p className="text-muted-foreground max-w-xs">
          Your order has been received. The seller will confirm and dispatch within 1–2 business days.
        </p>
      </div>

      <div className="bg-secondary/40 rounded-2xl p-4 w-full max-w-xs text-sm space-y-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Package className="h-4 w-4 shrink-0" />
          <span>Track your order in <strong>My Orders</strong></span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <ShoppingBag className="h-4 w-4 shrink-0" />
          <span>Payment on delivery — Cash / UPI</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Link href="/account/orders">
          <Button className="w-full h-11 rounded-xl font-bold">View My Orders</Button>
        </Link>
        <Link href="/marketplace">
          <Button variant="outline" className="w-full h-11 rounded-xl font-bold">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  )
}
