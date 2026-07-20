// @ts-nocheck
"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useSeller } from "@/hooks/use-seller"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import {
  ShoppingBag, Search, Loader2, Truck, CheckCircle2,
  XCircle, Package, MapPin, Phone, ChevronDown, ChevronUp,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Order = {
  id: string
  status: string
  quantity: number
  unit_price_inr: number
  total_price_inr: number
  shipping_charge_inr: number
  tracking_id: string | null
  courier_name: string | null
  estimated_delivery: string | null
  created_at: string
  delivery_address: {
    name?: string
    phone?: string
    line1?: string
    city?: string
    state?: string
    pincode?: string
  } | null
  product: { title: string; id: string } | null
}

const STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  payment_pending:  { label: "Awaiting Payment", color: "text-slate-600",   bg: "bg-slate-100 dark:bg-slate-900/40" },
  confirmed:        { label: "Confirmed",         color: "text-blue-700",    bg: "bg-blue-100 dark:bg-blue-950/30" },
  processing:       { label: "Processing",        color: "text-indigo-700",  bg: "bg-indigo-100 dark:bg-indigo-950/30" },
  shipped:          { label: "Shipped",           color: "text-purple-700",  bg: "bg-purple-100 dark:bg-purple-950/30" },
  out_for_delivery: { label: "Out for Delivery",  color: "text-amber-700",   bg: "bg-amber-100 dark:bg-amber-950/30" },
  delivered:        { label: "Delivered",         color: "text-emerald-700", bg: "bg-emerald-100 dark:bg-emerald-950/30" },
  cancelled:        { label: "Cancelled",         color: "text-red-700",     bg: "bg-red-100 dark:bg-red-950/30" },
  return_requested: { label: "Return Requested",  color: "text-orange-700",  bg: "bg-orange-100 dark:bg-orange-950/30" },
  return_approved:  { label: "Return Approved",   color: "text-orange-600",  bg: "bg-orange-50 dark:bg-orange-950/20" },
  refund_completed: { label: "Refunded",          color: "text-slate-600",   bg: "bg-slate-100 dark:bg-slate-900/40" },
}

const SELLER_ACTIONS: Record<string, { next: string; label: string; icon: React.ElementType } | null> = {
  confirmed:        { next: "processing",  label: "Start Processing", icon: Package },
  processing:       { next: "shipped",     label: "Mark as Shipped",  icon: Truck },
  shipped:          { next: "delivered",   label: "Mark Delivered",   icon: CheckCircle2 },
  return_requested: { next: "return_approved", label: "Approve Return", icon: CheckCircle2 },
}

function fmt(paise: number) {
  return `₹${(paise / 100).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

function OrderCard({ order, onUpdate }: { order: Order; onUpdate: (id: string, status: string) => void }) {
  const { toast } = useToast()
  const [expanded, setExpanded] = useState(false)
  const [acting, setActing] = useState(false)
  const [showShip, setShowShip] = useState(false)
  const [trackingId, setTrackingId] = useState(order.tracking_id ?? "")
  const [courierName, setCourierName] = useState(order.courier_name ?? "")
  const [cancelNote, setCancelNote] = useState("")
  const [showCancel, setShowCancel] = useState(false)

  const sm = STATUS_META[order.status] ?? STATUS_META.confirmed
  const action = SELLER_ACTIONS[order.status]

  async function doAction() {
    if (order.status === "processing") { setShowShip(true); return }

    setActing(true)
    const { error } = await createClient()
      .from("mp_orders")
      .update({
        status: action!.next,
        ...(action!.next === "delivered" ? { delivered_at: new Date().toISOString() } : {}),
      })
      .eq("id", order.id)
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" })
    else { onUpdate(order.id, action!.next); toast({ title: "Order updated" }) }
    setActing(false)
  }

  async function confirmShip() {
    if (!trackingId.trim() || !courierName.trim()) {
      toast({ title: "Enter tracking ID and courier name", variant: "destructive" }); return
    }
    setActing(true)
    const { error } = await createClient()
      .from("mp_orders")
      .update({ status: "shipped", tracking_id: trackingId.trim(), courier_name: courierName.trim() })
      .eq("id", order.id)
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" })
    else { onUpdate(order.id, "shipped"); setShowShip(false); toast({ title: "Marked as shipped" }) }
    setActing(false)
  }

  async function cancelOrder() {
    setActing(true)
    const { error } = await createClient()
      .from("mp_orders")
      .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
      .eq("id", order.id)
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" })
    else { onUpdate(order.id, "cancelled"); setShowCancel(false); toast({ title: "Order cancelled" }) }
    setActing(false)
  }

  const addr = order.delivery_address

  return (
    <>
      <Card className="rounded-2xl border-none shadow-sm">
        <CardContent className="p-4 space-y-3">
          {/* Top row */}
          <div className="flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-black text-foreground truncate">{order.product?.title ?? "Product"}</p>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${sm.bg} ${sm.color}`}>
                  {sm.label}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Qty {order.quantity} · {fmt(order.total_price_inr)} · {fmtDate(order.created_at)}
              </p>
            </div>
            <button onClick={() => setExpanded(e => !e)} className="text-muted-foreground shrink-0 mt-1">
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>

          {/* Expanded details */}
          {expanded && (
            <div className="space-y-3 pt-1 border-t border-border/50">
              {/* Delivery address */}
              {addr && (
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Deliver to</p>
                  <div className="flex items-start gap-2 text-xs">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-foreground">{addr.name ?? "—"}</p>
                      <p className="text-muted-foreground">{addr.line1}</p>
                      <p className="text-muted-foreground">{[addr.city, addr.state, addr.pincode].filter(Boolean).join(", ")}</p>
                    </div>
                  </div>
                  {addr.phone && (
                    <div className="flex items-center gap-2 text-xs">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">{addr.phone}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Tracking info */}
              {order.tracking_id && (
                <div className="text-xs space-y-0.5">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Tracking</p>
                  <p className="font-bold text-foreground">{order.courier_name} — {order.tracking_id}</p>
                  {order.estimated_delivery && (
                    <p className="text-muted-foreground">Est. delivery: {fmtDate(order.estimated_delivery)}</p>
                  )}
                </div>
              )}

              {/* Pricing breakdown */}
              <div className="space-y-1 text-xs">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Order value</p>
                {[
                  ["Items", fmt(order.unit_price_inr * order.quantity)],
                  ["Shipping", fmt(order.shipping_charge_inr)],
                  ["Total", fmt(order.total_price_inr)],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-muted-foreground">{k}</span>
                    <span className={`font-bold ${k === "Total" ? "text-foreground" : "text-muted-foreground"}`}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          {action && (
            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1 rounded-xl h-9 text-xs font-bold gap-1.5"
                onClick={doAction}
                disabled={acting}
              >
                {acting ? <Loader2 className="h-3 w-3 animate-spin" /> : <action.icon className="h-3.5 w-3.5" />}
                {action.label}
              </Button>
              {(order.status === "confirmed" || order.status === "processing") && (
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-xl h-9 text-xs font-bold border-red-200 text-red-600 hover:bg-red-50"
                  onClick={() => setShowCancel(true)}
                  disabled={acting}
                >
                  <XCircle className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ship dialog */}
      <Dialog open={showShip} onOpenChange={setShowShip}>
        <DialogContent className="rounded-2xl max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-black">Ship Order</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Courier Name *</label>
              <Input placeholder="e.g. BlueDart, Delhivery" value={courierName} onChange={e => setCourierName(e.target.value)} className="rounded-xl" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Tracking ID *</label>
              <Input placeholder="e.g. BD123456789IN" value={trackingId} onChange={e => setTrackingId(e.target.value)} className="rounded-xl font-mono" />
            </div>
            <Button className="w-full rounded-xl font-bold" onClick={confirmShip} disabled={acting}>
              {acting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Confirm Shipment
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cancel dialog */}
      <Dialog open={showCancel} onOpenChange={setShowCancel}>
        <DialogContent className="rounded-2xl max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-black text-red-600">Cancel Order?</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">The buyer will be notified and refunded automatically.</p>
            <Textarea
              placeholder="Reason for cancellation (optional)"
              value={cancelNote}
              onChange={e => setCancelNote(e.target.value)}
              rows={2}
              className="rounded-xl resize-none text-sm"
            />
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 rounded-xl font-bold" onClick={() => setShowCancel(false)}>Keep Order</Button>
              <Button variant="destructive" className="flex-1 rounded-xl font-bold" onClick={cancelOrder} disabled={acting}>
                {acting ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : null}
                Cancel Order
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default function SellerOrdersPage() {
  const { seller } = useSeller()
  const searchParams = useSearchParams()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState(searchParams.get("filter") === "pending" ? "confirmed" : "all")

  useEffect(() => {
    if (!seller) return
    createClient()
      .from("mp_orders")
      .select("id, status, quantity, unit_price_inr, total_price_inr, shipping_charge_inr, tracking_id, courier_name, estimated_delivery, created_at, delivery_address, product:mp_products(title, id)")
      .eq("seller_id", seller.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => { setOrders((data ?? []) as Order[]); setLoading(false) })
  }, [seller])

  function handleUpdate(id: string, status: string) {
    setOrders(os => os.map(o => o.id === id ? { ...o, status } : o))
  }

  const filtered = orders.filter(o => {
    const q = search.toLowerCase()
    const matchQ = !q || o.product?.title?.toLowerCase().includes(q) || o.id.includes(q)
    const matchF = filter === "all" || o.status === filter
    return matchQ && matchF
  })

  const counts = {
    pending: orders.filter(o => ["confirmed", "processing"].includes(o.status)).length,
    active: orders.filter(o => ["shipped", "out_for_delivery"].includes(o.status)).length,
    total: orders.length,
  }

  if (!seller) return null

  return (
    <div className="p-4 md:p-6 space-y-5">
      <div>
        <h1 className="text-xl font-black text-foreground flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-primary" /> Orders
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          {counts.pending} to process · {counts.active} in transit · {counts.total} total
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 rounded-xl" />
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {[
            { v: "all",       l: "All" },
            { v: "confirmed", l: "To Process" },
            { v: "shipped",   l: "Shipped" },
            { v: "delivered", l: "Delivered" },
            { v: "return_requested", l: "Returns" },
          ].map(({ v, l }) => (
            <Button
              key={v}
              size="sm"
              variant={filter === v ? "default" : "outline"}
              className="rounded-xl h-9 text-xs font-bold whitespace-nowrap"
              onClick={() => setFilter(v)}
            >
              {l}
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
            <ShoppingBag className="h-10 w-10 mx-auto text-muted-foreground/30 mb-3" />
            <p className="font-bold text-foreground">No orders here</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map(order => (
            <OrderCard key={order.id} order={order} onUpdate={handleUpdate} />
          ))}
        </div>
      )}
    </div>
  )
}
