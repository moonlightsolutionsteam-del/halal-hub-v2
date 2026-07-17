"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingBag, IndianRupee, Truck } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

type Order = {
  id: string
  status: string
  total_amount: number | null
  created_at: string | null
  profiles: { name: string | null } | null
}

const STATUS_COLORS: Record<string, string> = {
  pending:   "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
  confirmed: "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
  preparing: "bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400",
  ready:     "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
  delivered: "bg-muted text-muted-foreground",
  cancelled: "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400",
}

const NEXT_STATUS: Record<string, string> = {
  pending: "confirmed",
  confirmed: "preparing",
  preparing: "ready",
  ready: "delivered",
}

function timeAgo(iso: string | null): string {
  if (!iso) return ""
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default function ButcherOrdersPage() {
  const { user, loading: authLoading } = useAuth()
  const { toast } = useToast()
  const [orders, setOrders] = React.useState<Order[]>([])
  const [bizId, setBizId] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [updating, setUpdating] = React.useState<string | null>(null)

  const active = orders.filter(o => !["delivered", "cancelled"].includes(o.status)).length
  const revenue = orders.filter(o => o.status === "delivered").reduce((s, o) => s + (o.total_amount ?? 0), 0)

  React.useEffect(() => {
    if (authLoading) return
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    ;supabase
      .from("businesses").select("id").eq("owner_id", user.uid).limit(1).maybeSingle()
      .then(({ data }: { data: { id: string } | null }) => {
        if (!data) { setLoading(false); return }
        setBizId(data.id)
        loadOrders(data.id)
      })
  }, [user?.uid, authLoading])

  function loadOrders(id: string) {
    const supabase = createClient()
    ;supabase
      .from("business_orders")
      .select("id, status, total_amount, created_at, profiles(name)")
      .eq("business_id", id)
      .order("created_at", { ascending: false })
      .then(({ data }: { data: Order[] | null }) => {
        setOrders(data ?? [])
        setLoading(false)
      })
  }

  async function advanceStatus(order: Order) {
    const next = NEXT_STATUS[order.status]
    if (!next || !bizId) return
    setUpdating(order.id)
    const supabase = createClient()
    const { error } = await supabase
      .from("business_orders").update({ status: next }).eq("id", order.id)
    setUpdating(null)
    if (error) { toast({ variant: "destructive", title: "Update failed", description: error.message }); return }
    setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: next } : o))
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 max-w-5xl mx-auto pb-24">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
          <ShoppingBag className="h-3 w-3" /> Shop Fulfillment
        </div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Butcher Orders</h1>
        <p className="text-muted-foreground font-medium">Manage custom cuts, bulk orders, and home deliveries.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="rounded-[2rem] border-none shadow-sm bg-primary text-primary-foreground p-6 space-y-1">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Active Orders</p>
          <p className="text-4xl font-black tracking-tighter">{active}</p>
        </Card>
        <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 space-y-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Revenue (Delivered)</p>
          <p className="text-3xl font-black tracking-tighter text-foreground flex items-center gap-1">
            <IndianRupee className="h-5 w-5" />{revenue.toLocaleString("en-IN")}
          </p>
        </Card>
      </div>

      <div className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">All Orders</p>
        {orders.length === 0 && (
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-12 text-center space-y-3">
            <ShoppingBag className="h-10 w-10 text-muted-foreground/30 mx-auto" />
            <p className="font-black text-foreground">No orders yet</p>
            <p className="text-sm text-muted-foreground">Customer orders will appear here.</p>
          </Card>
        )}
        {orders.map(order => (
          <Card key={order.id} className="rounded-[2rem] border-none shadow-sm bg-card">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-black text-foreground">{order.profiles?.name ?? "Customer"}</p>
                    {order.status === "ready" && <Truck className="h-3.5 w-3.5 text-emerald-500" />}
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">{timeAgo(order.created_at)}</p>
                </div>
                <div className="flex items-center gap-2">
                  {order.total_amount != null && (
                    <span className="text-sm font-black text-foreground flex items-center gap-0.5">
                      <IndianRupee className="h-3.5 w-3.5" />{order.total_amount.toLocaleString("en-IN")}
                    </span>
                  )}
                  <Badge className={`text-[9px] font-black uppercase border-none ${STATUS_COLORS[order.status] ?? "bg-muted text-muted-foreground"}`}>
                    {order.status}
                  </Badge>
                </div>
              </div>
              {NEXT_STATUS[order.status] && (
                <Button size="sm" className="h-8 rounded-xl text-xs font-black bg-primary hover:bg-primary/90 text-white"
                  disabled={updating === order.id}
                  onClick={() => advanceStatus(order)}>
                  {updating === order.id ? "Updating…" : `Mark as ${NEXT_STATUS[order.status]}`}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
