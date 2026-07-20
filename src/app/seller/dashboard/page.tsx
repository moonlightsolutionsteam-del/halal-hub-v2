"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useSeller } from "@/hooks/use-seller"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Package, ShoppingBag, Star, TrendingUp,
  Plus, ChevronRight, AlertCircle, Clock,
} from "lucide-react"

type RecentOrder = {
  id: string
  status: string
  total_price_inr: number
  quantity: number
  created_at: string
  product: { title: string } | null
}

const STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  payment_pending:   { label: "Awaiting Payment", color: "text-amber-700",   bg: "bg-amber-100 dark:bg-amber-950/30" },
  confirmed:         { label: "Confirmed",         color: "text-blue-700",    bg: "bg-blue-100 dark:bg-blue-950/30" },
  processing:        { label: "Processing",         color: "text-indigo-700",  bg: "bg-indigo-100 dark:bg-indigo-950/30" },
  shipped:           { label: "Shipped",            color: "text-purple-700",  bg: "bg-purple-100 dark:bg-purple-950/30" },
  delivered:         { label: "Delivered",          color: "text-emerald-700", bg: "bg-emerald-100 dark:bg-emerald-950/30" },
  cancelled:         { label: "Cancelled",          color: "text-red-700",     bg: "bg-red-100 dark:bg-red-950/30" },
  return_requested:  { label: "Return Requested",   color: "text-orange-700",  bg: "bg-orange-100 dark:bg-orange-950/30" },
  refund_completed:  { label: "Refunded",           color: "text-slate-700",   bg: "bg-slate-100 dark:bg-slate-900/40" },
}

function fmt(paise: number) {
  return `₹${(paise / 100).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`
}

function timeAgo(d: string) {
  const m = Math.floor((Date.now() - new Date(d).getTime()) / 60000)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export default function SellerDashboardPage() {
  const { seller } = useSeller()
  const [productCount, setProductCount] = useState<number>(0)
  const [pendingOrders, setPendingOrders] = useState<number>(0)
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!seller) return
    const supabase = createClient()

    Promise.all([
      supabase.from("mp_products").select("id", { count: "exact", head: true }).eq("seller_id", seller.id),
      supabase.from("mp_orders").select("id", { count: "exact", head: true }).eq("seller_id", seller.id).in("status", ["confirmed", "processing"]),
      supabase.from("mp_orders")
        .select("id, status, total_price_inr, quantity, created_at, product:mp_products(title)")
        .eq("seller_id", seller.id)
        .order("created_at", { ascending: false })
        .limit(5),
    ]).then(([pCount, oCount, orders]) => {
      setProductCount(pCount.count ?? 0)
      setPendingOrders(oCount.count ?? 0)
      setRecentOrders((orders.data ?? []) as RecentOrder[])
      setLoading(false)
    })
  }, [seller])

  if (!seller) return null

  const gmv = seller.total_gmv ?? 0
  const rating = seller.rating ?? 0

  return (
    <div className="p-4 md:p-6 space-y-5">
      {/* Welcome */}
      <div>
        <h1 className="text-xl font-black text-foreground">Hello, {seller.store_name} 👋</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Here's how your store is doing</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Total Revenue",    value: fmt(gmv),            icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/20" },
          { label: "Pending Orders",   value: String(pendingOrders), icon: Clock,      color: "text-amber-600",   bg: "bg-amber-50 dark:bg-amber-950/20" },
          { label: "Products Listed",  value: String(productCount),  icon: Package,    color: "text-blue-600",    bg: "bg-blue-50 dark:bg-blue-950/20" },
          { label: "Store Rating",     value: rating ? `${Number(rating).toFixed(1)} ★` : "—", icon: Star, color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-950/20" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className="rounded-2xl border-none shadow-sm">
            <CardContent className={`p-4 rounded-2xl ${bg}`}>
              <Icon className={`h-4 w-4 ${color} mb-2`} />
              <p className={`text-xl font-black ${color}`}>{loading ? "—" : value}</p>
              <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/seller/products/new">
          <Button className="w-full rounded-xl font-bold gap-2 h-11">
            <Plus className="h-4 w-4" /> Add Product
          </Button>
        </Link>
        <Link href="/seller/orders">
          <Button variant="outline" className="w-full rounded-xl font-bold gap-2 h-11">
            <ShoppingBag className="h-4 w-4" /> View Orders
          </Button>
        </Link>
      </div>

      {/* Pending actions alert */}
      {pendingOrders > 0 && (
        <Card className="rounded-2xl border-none bg-amber-50 dark:bg-amber-950/20 shadow-none">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-black text-amber-800 dark:text-amber-300">
                {pendingOrders} order{pendingOrders > 1 ? "s" : ""} need your attention
              </p>
              <p className="text-xs text-amber-700/70 dark:text-amber-400/70">Confirm and start processing</p>
            </div>
            <Link href="/seller/orders?filter=pending">
              <ChevronRight className="h-4 w-4 text-amber-600" />
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Recent orders */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-black text-foreground">Recent Orders</p>
          <Link href="/seller/orders" className="text-xs text-primary font-bold">See all</Link>
        </div>

        {loading ? (
          <Card className="rounded-2xl border-none shadow-sm">
            <CardContent className="p-8 text-center text-muted-foreground text-sm">Loading...</CardContent>
          </Card>
        ) : recentOrders.length === 0 ? (
          <Card className="rounded-2xl border-none shadow-sm">
            <CardContent className="p-8 text-center">
              <ShoppingBag className="h-8 w-8 mx-auto text-muted-foreground/30 mb-2" />
              <p className="text-sm font-bold text-foreground">No orders yet</p>
              <p className="text-xs text-muted-foreground mt-0.5">Orders will appear here once buyers purchase your products</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {recentOrders.map(order => {
              const sm = STATUS_META[order.status] ?? STATUS_META.confirmed
              return (
                <Card key={order.id} className="rounded-2xl border-none shadow-sm">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-foreground truncate">
                        {order.product?.title ?? "Product"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty {order.quantity} · {fmt(order.total_price_inr)} · {timeAgo(order.created_at)}
                      </p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${sm.bg} ${sm.color}`}>
                      {sm.label}
                    </span>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
