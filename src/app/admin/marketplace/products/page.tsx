"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { AdminRoleGate } from "@/components/admin-role-gate"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import {
  Package, Search, Loader2, CheckCircle2, XCircle,
  Flag, ShieldCheck, Shield, ShieldAlert, AlertTriangle, Eye,
  Star, RotateCcw,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type ProductRow = {
  id: string
  title: string
  category: string
  price_inr: number
  halal_status: "self_declared" | "admin_verified" | "certified"
  halal_cert_expiry: string | null
  halal_cert_expiry_warned: boolean
  status: string
  flag_count: number
  order_count: number
  return_count: number
  rating: number
  review_count: number
  created_at: string
  approved_at: string | null
  rejection_reason: string | null
  photos: { url: string }[]
  seller: { store_name: string; rating: number } | null
}

const STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  pending_review: { label: "Pending Review", color: "text-amber-700",   bg: "bg-amber-100 dark:bg-amber-900/30" },
  active:         { label: "Active",         color: "text-emerald-700", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
  paused:         { label: "Paused",         color: "text-orange-700",  bg: "bg-orange-100 dark:bg-orange-900/30" },
  rejected:       { label: "Rejected",       color: "text-red-700",     bg: "bg-red-100 dark:bg-red-900/30" },
  draft:          { label: "Draft",          color: "text-slate-600",   bg: "bg-slate-100 dark:bg-slate-800" },
  archived:       { label: "Archived",       color: "text-slate-500",   bg: "bg-slate-100 dark:bg-slate-800" },
}

const HALAL_META = {
  self_declared:  { label: "Self-Declared",   icon: ShieldAlert, color: "text-slate-500",   badge: "Silver" },
  admin_verified: { label: "HH Verified",     icon: ShieldCheck, color: "text-emerald-600", badge: "Green"  },
  certified:      { label: "3rd-Party Cert",  icon: Shield,      color: "text-amber-500",   badge: "Gold"   },
}

function formatPrice(paise: number) {
  return `₹${(paise / 100).toLocaleString("en-IN")}`
}

function timeAgo(dateStr: string) {
  const m = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

function returnRate(product: ProductRow) {
  if (!product.order_count) return 0
  return Math.round((product.return_count / product.order_count) * 100)
}

function AutoTriggerBadges({ product }: { product: ProductRow }) {
  const triggers = []
  if (product.flag_count >= 3) triggers.push({ label: `${product.flag_count} flags`, color: "text-red-600 bg-red-100 dark:bg-red-950/30" })
  if (product.seller && product.seller.rating < 3.0 && product.seller.rating > 0)
    triggers.push({ label: `Seller ${product.seller.rating}★`, color: "text-orange-600 bg-orange-100 dark:bg-orange-950/30" })
  if (returnRate(product) > 20)
    triggers.push({ label: `${returnRate(product)}% return`, color: "text-amber-600 bg-amber-100 dark:bg-amber-950/30" })
  if (product.halal_cert_expiry && new Date(product.halal_cert_expiry) < new Date())
    triggers.push({ label: "Cert expired", color: "text-red-600 bg-red-100 dark:bg-red-950/30" })

  if (!triggers.length) return null
  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {triggers.map(t => (
        <span key={t.label} className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${t.color}`}>
          ⚠ {t.label}
        </span>
      ))}
    </div>
  )
}

function ProductReviewDialog({
  product,
  onClose,
  onUpdate,
}: {
  product: ProductRow
  onClose: () => void
  onUpdate: (id: string, status: string) => void
}) {
  const [rejectionReason, setRejectionReason] = useState(product.rejection_reason ?? "")
  const [halal, setHalal] = useState(product.halal_status)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  async function doAction(newStatus: "active" | "rejected" | "paused") {
    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase
      .from("mp_products")
      .update({
        status: newStatus,
        halal_status: halal,
        rejection_reason: newStatus === "rejected" ? rejectionReason : null,
        approved_at: newStatus === "active" ? new Date().toISOString() : null,
      })
      .eq("id", product.id)

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      toast({
        title: newStatus === "active" ? "Product approved" : newStatus === "paused" ? "Product paused" : "Product rejected",
      })
      onUpdate(product.id, newStatus)
      onClose()
    }
    setSaving(false)
  }

  const rr = returnRate(product)

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="rounded-2xl max-w-sm max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-black">Review Product</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {/* Product thumb + info */}
          <div className="flex gap-3">
            {product.photos?.[0]?.url ? (
              <img src={product.photos[0].url} alt={product.title}
                className="h-20 w-20 rounded-xl object-cover shrink-0" />
            ) : (
              <div className="h-20 w-20 rounded-xl bg-muted flex items-center justify-center shrink-0">
                <Package className="h-7 w-7 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-foreground leading-tight">{product.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{product.category}</p>
              <p className="text-sm font-black text-primary mt-1">{formatPrice(product.price_inr)}</p>
              <p className="text-xs text-muted-foreground">{product.seller?.store_name}</p>
            </div>
          </div>

          {/* Auto-trigger alerts */}
          {[
            product.flag_count >= 3 && { type: "error", msg: `${product.flag_count} community flags — auto-paused for review` },
            product.seller && product.seller.rating < 3.0 && product.seller.rating > 0 && { type: "warn", msg: `Seller rating ${product.seller.rating}★ — manual approval required for all new listings` },
            rr > 20 && { type: "warn", msg: `Return rate ${rr}% exceeds 20% threshold — review required` },
            product.halal_cert_expiry && new Date(product.halal_cert_expiry) < new Date() && { type: "error", msg: `Halal certificate expired on ${product.halal_cert_expiry}` },
          ].filter(Boolean).map((alert: any) => (
            <Card key={alert.msg} className={`rounded-xl border-none shadow-none ${alert.type === "error" ? "bg-red-50 dark:bg-red-950/20" : "bg-amber-50 dark:bg-amber-950/20"}`}>
              <CardContent className={`p-3 flex items-start gap-2 text-xs font-bold ${alert.type === "error" ? "text-red-600" : "text-amber-700"}`}>
                <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                {alert.msg}
              </CardContent>
            </Card>
          ))}

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Orders", value: product.order_count },
              { label: "Returns", value: `${rr}%` },
              { label: "Rating", value: product.rating ? `${product.rating}★` : "—" },
              { label: "Flags", value: product.flag_count },
            ].map(({ label, value }) => (
              <Card key={label} className="rounded-xl border-none bg-muted/40 shadow-none">
                <CardContent className="p-2 text-center">
                  <p className="text-sm font-black text-foreground">{value}</p>
                  <p className="text-[10px] text-muted-foreground">{label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Halal status override */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-muted-foreground">Halal Verification Tier</label>
            <div className="flex gap-2">
              {(Object.keys(HALAL_META) as (keyof typeof HALAL_META)[]).map(k => {
                const m = HALAL_META[k]
                const Icon = m.icon
                return (
                  <button
                    key={k}
                    onClick={() => setHalal(k)}
                    className={`flex-1 flex flex-col items-center gap-1 p-2 rounded-xl border-2 text-[10px] font-bold transition-all ${
                      halal === k ? "border-primary bg-primary/5" : "border-transparent bg-muted/40"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${m.color}`} />
                    {m.badge}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Rejection reason */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-muted-foreground">Rejection reason (if rejecting)</label>
            <Textarea
              value={rejectionReason}
              onChange={e => setRejectionReason(e.target.value)}
              placeholder="e.g. Halal certificate required for this category. Please upload and resubmit."
              rows={2}
              className="rounded-xl resize-none text-xs"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 rounded-xl h-9 text-xs font-bold border-red-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
              onClick={() => doAction("rejected")}
              disabled={saving || !rejectionReason.trim()}
            >
              <XCircle className="h-3.5 w-3.5 mr-1" /> Reject
            </Button>
            <Button
              variant="outline"
              className="rounded-xl h-9 text-xs font-bold px-3"
              onClick={() => doAction("paused")}
              disabled={saving}
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
            <Button
              className="flex-1 rounded-xl h-9 text-xs font-bold"
              onClick={() => doAction("active")}
              disabled={saving}
            >
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Approve
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ProductModerationContent() {
  const [products, setProducts] = useState<ProductRow[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("pending_review")
  const [reviewing, setReviewing] = useState<ProductRow | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from("mp_products")
      .select("*, seller:mp_sellers(store_name, rating)")
      .order("created_at", { ascending: false })
      .then(({ data }) => { setProducts((data as ProductRow[]) ?? []); setLoading(false) })
  }, [])

  function handleUpdate(id: string, status: string) {
    setProducts(ps => ps.map(p => p.id === id ? { ...p, status } : p))
  }

  const filtered = products.filter(p => {
    const q = search.toLowerCase()
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    const matchStatus = filterStatus === "all" || p.status === filterStatus
    return matchSearch && matchStatus
  })

  // Products needing attention (auto-trigger rules)
  const needsAttention = products.filter(p =>
    p.flag_count >= 3 ||
    (p.seller && p.seller.rating < 3.0 && p.seller.rating > 0 && p.status === "pending_review") ||
    returnRate(p) > 20 ||
    (p.halal_cert_expiry && new Date(p.halal_cert_expiry) < new Date())
  )

  const counts = {
    pending: products.filter(p => p.status === "pending_review").length,
    active: products.filter(p => p.status === "active").length,
    flagged: products.filter(p => p.flag_count >= 3).length,
    alerts: needsAttention.length,
  }

  return (
    <div className="p-4 md:p-6 space-y-5">
      <div>
        <h1 className="text-xl font-black text-foreground flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" /> Product Moderation
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          {counts.pending} pending · {counts.active} live · {counts.alerts} need attention
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Pending", value: counts.pending, color: "text-amber-600" },
          { label: "Live",    value: counts.active,  color: "text-emerald-600" },
          { label: "Flagged", value: counts.flagged, color: "text-red-600" },
          { label: "Alerts",  value: counts.alerts,  color: "text-orange-600" },
        ].map(({ label, value, color }) => (
          <Card key={label} className="rounded-2xl border-none shadow-sm">
            <CardContent className="p-3 text-center">
              <p className={`text-xl font-black ${color}`}>{value}</p>
              <p className="text-[10px] text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alert banner — auto-trigger rules */}
      {needsAttention.length > 0 && filterStatus !== "all" && (
        <Card className="rounded-2xl border-none bg-red-50 dark:bg-red-950/20 shadow-none">
          <CardContent className="p-3 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-black text-red-700">{needsAttention.length} product{needsAttention.length > 1 ? "s" : ""} triggered auto-review rules</p>
              <p className="text-[10px] text-red-600 mt-0.5">
                {needsAttention.map(p => p.title).slice(0, 3).join(", ")}{needsAttention.length > 3 ? ` +${needsAttention.length - 3} more` : ""}
              </p>
            </div>
            <Button size="sm" variant="outline" className="rounded-xl h-7 text-xs font-bold ml-auto border-red-200 text-red-600 shrink-0"
              onClick={() => setFilterStatus("all")}>
              View all
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 rounded-xl" />
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {["pending_review", "active", "paused", "all"].map(s => (
            <Button key={s} size="sm"
              variant={filterStatus === s ? "default" : "outline"}
              className="rounded-xl h-9 text-xs font-bold shrink-0 capitalize"
              onClick={() => setFilterStatus(s)}
            >
              {s === "pending_review" ? "Pending" : s}
            </Button>
          ))}
        </div>
      </div>

      {/* Product list */}
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
      ) : filtered.length === 0 ? (
        <Card className="rounded-2xl border-none shadow-sm">
          <CardContent className="p-10 text-center text-muted-foreground">
            <Package className="h-10 w-10 mx-auto mb-3 opacity-20" />
            <p className="font-bold text-foreground">No products found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filtered.map(product => {
            const sm = STATUS_META[product.status] ?? STATUS_META.pending_review
            const hm = HALAL_META[product.halal_status]
            const HIcon = hm.icon
            const hasAlerts = needsAttention.some(p => p.id === product.id)
            return (
              <Card key={product.id} className={`rounded-2xl border-none shadow-sm ${hasAlerts ? "ring-1 ring-red-200 dark:ring-red-900/50" : ""}`}>
                <CardContent className="p-4 flex items-center gap-3">
                  {product.photos?.[0]?.url ? (
                    <img src={product.photos[0].url} alt={product.title}
                      className="h-12 w-12 rounded-xl object-cover shrink-0" />
                  ) : (
                    <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <p className="text-sm font-black text-foreground truncate">{product.title}</p>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${sm.bg} ${sm.color}`}>
                        {sm.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground">{product.category}</span>
                      <span className="text-xs font-bold text-foreground">{formatPrice(product.price_inr)}</span>
                      <span className={`flex items-center gap-0.5 text-[10px] font-bold ${hm.color}`}>
                        <HIcon className="h-3 w-3" />{hm.badge}
                      </span>
                    </div>
                    <AutoTriggerBadges product={product} />
                  </div>
                  <Button
                    size="sm"
                    variant={product.status === "pending_review" || hasAlerts ? "default" : "outline"}
                    className="rounded-xl h-8 text-xs font-bold shrink-0 gap-1"
                    onClick={() => setReviewing(product)}
                  >
                    <Eye className="h-3.5 w-3.5" />
                    {product.status === "pending_review" || hasAlerts ? "Review" : "View"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {reviewing && (
        <ProductReviewDialog
          product={reviewing}
          onClose={() => setReviewing(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  )
}

export default function AdminProductsPage() {
  return (
    <AdminRoleGate required="editor">
      <ProductModerationContent />
    </AdminRoleGate>
  )
}
