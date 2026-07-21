// @ts-nocheck
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Package, ShoppingBag, ChevronRight } from "lucide-react"

const STATUS_COLORS: Record<string, string> = {
  pending:    "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  confirmed:  "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  processing: "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400",
  shipped:    "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400",
  delivered:  "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  cancelled:  "bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400",
}

type Order = {
  id: string
  status: string
  total_amount: number
  delivery_type: string
  created_at: string | null
  business_id: string
  items: { item_name: string; quantity: number; unit_price: number }[]
}

export default function MyOrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { setLoading(false); return }
    const supabase = createClient()
    ;(supabase as any)
      .from("business_orders")
      .select("id, status, total_amount, delivery_type, created_at, business_id, business_order_items(item_name, quantity, unit_price)")
      .eq("user_id", user.uid)
      .order("created_at", { ascending: false })
      .then(({ data }: any) => {
        setLoading(false)
        if (data) setOrders(data.map((o: any) => ({ ...o, items: o.business_order_items ?? [] })))
      })
  }, [user])

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4 text-center">
        <Package className="h-16 w-16 text-muted-foreground/30" />
        <p className="text-xl font-bold">Sign in to view your orders</p>
        <Link href="/login?next=/account/orders"><Button>Sign In</Button></Link>
      </div>
    )
  }

  return (
    <div className="pb-24 max-w-2xl mx-auto">
      <div className="px-4 py-5 border-b">
        <h1 className="text-2xl font-bold font-headline">My Orders</h1>
        <p className="text-sm text-muted-foreground mt-1">Track and manage your marketplace orders</p>
      </div>

      {loading && (
        <div className="p-4 space-y-3">
          {[1,2,3].map(i => <Skeleton key={i} className="h-28 w-full rounded-2xl" />)}
        </div>
      )}

      {!loading && orders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center px-4">
          <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center">
            <ShoppingBag className="h-10 w-10 text-primary/40" />
          </div>
          <p className="text-xl font-bold">No orders yet</p>
          <p className="text-muted-foreground text-sm max-w-xs">Your marketplace orders will appear here once you place one.</p>
          <Link href="/marketplace"><Button className="rounded-xl font-bold">Browse Marketplace</Button></Link>
        </div>
      )}

      {!loading && orders.length > 0 && (
        <div className="p-4 space-y-3">
          {orders.map(order => (
            <div key={order.id} className="border rounded-2xl overflow-hidden">
              {/* Order header */}
              <div className="px-4 py-3 bg-secondary/30 border-b flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Order ID</p>
                  <p className="font-mono text-xs font-bold">{order.id.slice(0, 8).toUpperCase()}</p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize ${STATUS_COLORS[order.status] ?? "bg-secondary text-foreground"}`}>
                  {order.status}
                </span>
              </div>

              {/* Items */}
              <div className="px-4 py-3 space-y-1">
                {order.items.slice(0, 2).map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="truncate text-foreground/80 flex-1 min-w-0 mr-2">{item.item_name} × {item.quantity}</span>
                    <span className="font-semibold shrink-0">₹{(item.unit_price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
                {order.items.length > 2 && (
                  <p className="text-xs text-muted-foreground">+{order.items.length - 2} more items</p>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {order.created_at ? new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : ""}
                  </p>
                  <p className="font-bold text-primary">₹{order.total_amount.toLocaleString("en-IN")}</p>
                </div>
                <Button variant="ghost" size="sm" className="rounded-xl gap-1 text-xs">
                  Details <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
