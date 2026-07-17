"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Truck, MapPin, Clock, CheckCircle2,
  Navigation, Bike, Phone,
  ArrowUpRight, SlidersHorizontal, Search,
  IndianRupee
} from "lucide-react"
import { Input } from "@/components/ui/input"
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

function timeAgo(iso: string | null): string {
  if (!iso) return ""
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 2) return "Just now"
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  return `${hrs}h ago`
}

const STATUS_STYLES: Record<string, string> = {
  pending:   "border-amber-200 text-amber-700",
  confirmed: "border-blue-200 text-blue-600",
  preparing: "border-purple-200 text-purple-600",
  ready:     "border-emerald-200 text-emerald-600",
}

const NEXT_STATUS: Record<string, string> = {
  ready: "delivered",
}

export default function DeliveryManagementPage() {
  const { user, loading: authLoading } = useAuth()
  const { toast } = useToast()
  const [orders, setOrders] = React.useState<Order[]>([])
  const [bizId, setBizId] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [updating, setUpdating] = React.useState<string | null>(null)

  const inProgress = orders.filter(o => !["delivered", "cancelled"].includes(o.status))
  const readyCount = orders.filter(o => o.status === "ready").length

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
      .in("status", ["preparing", "ready", "confirmed", "pending"])
      .order("created_at", { ascending: false })
      .then(({ data }: { data: Order[] | null }) => {
        setOrders(data ?? [])
        setLoading(false)
      })
  }

  async function markDelivered(order: Order) {
    if (!bizId) return
    setUpdating(order.id)
    const supabase = createClient()
    const { error } = await supabase
      .from("business_orders").update({ status: "delivered" }).eq("id", order.id)
    setUpdating(null)
    if (error) { toast({ variant: "destructive", title: "Update failed", description: error.message }); return }
    setOrders(prev => prev.filter(o => o.id !== order.id))
    toast({ title: "Order marked delivered" })
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-7xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <Truck className="h-3 w-3" /> Fulfillment Logistics
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Delivery Management</h1>
          <p className="text-muted-foreground font-medium">Track active orders, manage delivery riders, and optimize routes.</p>
        </div>
        <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
          <SlidersHorizontal className="mr-2 h-4 w-4" /> Zones
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="rounded-[2rem] border-none shadow-sm bg-primary text-primary-foreground p-6 space-y-1">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Active Orders</p>
          <p className="text-4xl font-black tracking-tighter">{inProgress.length}</p>
        </Card>
        <Card className="rounded-[2rem] border-none shadow-sm bg-emerald-50 dark:bg-emerald-950/20 p-6 space-y-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400">Ready to Dispatch</p>
          <p className="text-4xl font-black tracking-tighter text-emerald-700 dark:text-emerald-400">{readyCount}</p>
        </Card>
        <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 space-y-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">In Preparation</p>
          <p className="text-4xl font-black tracking-tighter text-foreground">{orders.filter(o => o.status === "preparing").length}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Active Dispatch Queue */}
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden">
            <CardHeader className="p-8 border-b border-border">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <CardTitle className="text-xl font-black text-foreground">Active Dispatch Queue</CardTitle>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search orders..." className="pl-9 h-10 rounded-xl bg-muted border-none" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {orders.length === 0 ? (
                <div className="p-16 text-center space-y-3">
                  <Truck className="h-10 w-10 text-muted-foreground/30 mx-auto" />
                  <p className="font-black text-foreground">No active orders</p>
                  <p className="text-sm text-muted-foreground">Orders in preparation or ready for dispatch will appear here.</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {orders.map(order => (
                    <div key={order.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-muted/30 transition-colors group">
                      <div className="flex items-center gap-6">
                        <div className="h-14 w-14 rounded-2xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform shadow-inner shrink-0">
                          <Bike className="h-7 w-7" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-black text-muted-foreground font-mono">#{order.id.slice(0, 8).toUpperCase()}</span>
                            <Badge variant="outline" className={`text-[9px] font-black uppercase px-2 h-5 flex items-center ${STATUS_STYLES[order.status] ?? "border-muted text-muted-foreground"}`}>
                              {order.status}
                            </Badge>
                          </div>
                          <p className="font-black text-foreground text-sm">{order.profiles?.name ?? "Customer"}</p>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                            <Clock className="h-3 w-3" /> {timeAgo(order.created_at)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between md:justify-end gap-6">
                        {order.total_amount != null && (
                          <div className="text-right">
                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Amount</p>
                            <p className="text-sm font-black text-foreground flex items-center gap-0.5">
                              <IndianRupee className="h-3.5 w-3.5" />{order.total_amount.toLocaleString("en-IN")}
                            </p>
                          </div>
                        )}
                        {order.status === "ready" && (
                          <Button size="sm"
                            className="h-9 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white"
                            disabled={updating === order.id}
                            onClick={() => markDelivered(order)}>
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                            {updating === order.id ? "…" : "Mark Delivered"}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-8">
          {/* Rider Management (placeholder) */}
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-6">
            <CardTitle className="text-xl font-black text-foreground">Rider Management</CardTitle>
            <CardContent className="px-0 space-y-4">
              {[
                { name: "Omar Farooq", status: "Waiting", active: true },
                { name: "Sami Khan", status: "In Transit", active: true },
                { name: "Ibrahim Sheikh", status: "Off-duty", active: false },
              ].map((rider, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-3xl bg-muted/50 border border-transparent hover:border-primary/10 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-card rounded-full flex items-center justify-center text-primary font-black text-xs shadow-sm">
                      {rider.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-black text-foreground">{rider.name}</p>
                      <div className="flex items-center gap-2">
                        <div className={`h-1.5 w-1.5 rounded-full ${rider.active ? "bg-emerald-500" : "bg-muted"}`} />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">{rider.status}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" className="rounded-xl"><Phone className="h-4 w-4 text-muted-foreground" /></Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Route Optimization promo */}
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 space-y-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <CheckCircle2 className="h-24 w-24" />
            </div>
            <div className="relative z-10 space-y-4">
              <h3 className="text-xl font-black">Route Optimization</h3>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                AI-powered route planning to save delivery time and fuel costs.
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl h-12 font-black text-xs uppercase tracking-widest shadow-xl">
                Run Optimizer
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
