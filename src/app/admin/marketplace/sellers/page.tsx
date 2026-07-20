// @ts-nocheck
"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { AdminRoleGate } from "@/components/admin-role-gate"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import {
  Store, Search, Loader2, CheckCircle2, XCircle,
  Clock, User, Building2, Eye, AlertCircle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type SellerRow = {
  id: string
  store_name: string
  store_slug: string
  seller_type: string
  city: string
  gstin: string | null
  pan: string | null
  status: string
  halal_declaration_signed: boolean
  created_at: string
  approved_at: string | null
  rejection_reason: string | null
  profile: { full_name: string | null; email: string | null } | null
}

const STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  pending:   { label: "Pending",   color: "text-amber-700",   bg: "bg-amber-100 dark:bg-amber-900/30" },
  active:    { label: "Active",    color: "text-emerald-700", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
  suspended: { label: "Suspended", color: "text-orange-700",  bg: "bg-orange-100 dark:bg-orange-900/30" },
  banned:    { label: "Banned",    color: "text-red-700",     bg: "bg-red-100 dark:bg-red-900/30" },
}

const TYPE_LABELS: Record<string, string> = {
  business: "Registered Business", msme: "MSME", home: "Home Seller",
  creator: "Creator-Seller", wholesale: "Wholesale",
}

function timeAgo(dateStr: string) {
  const m = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

function ReviewDialog({
  seller,
  onClose,
  onUpdate,
}: {
  seller: SellerRow
  onClose: () => void
  onUpdate: (id: string, status: string) => void
}) {
  const [rejectionReason, setRejectionReason] = useState("")
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  async function doAction(action: "active" | "rejected") {
    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase
      .from("mp_sellers")
      .update({
        status: action === "active" ? "active" : "pending",
        rejection_reason: action === "rejected" ? rejectionReason : null,
        approved_at: action === "active" ? new Date().toISOString() : null,
      })
      .eq("id", seller.id)

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      await supabase.from("mp_seller_applications").insert({
        seller_id: seller.id,
        action: action === "active" ? "approved" : "rejected",
        notes: action === "rejected" ? rejectionReason : "Approved by admin",
      })

      // Notify seller
      if (seller.profile) {
        const userId = await supabase
          .from("mp_sellers")
          .select("user_id")
          .eq("id", seller.id)
          .single()
          .then(r => r.data?.user_id)

        if (userId) {
          await supabase.from("notifications").insert({
            user_id: userId,
            type: "seller_application",
            title: action === "active"
              ? "🎉 Your store is approved!"
              : "Application update",
            body: action === "active"
              ? `${seller.store_name} is now live on HalalHub Marketplace. Start listing your products!`
              : `Your application needs attention: ${rejectionReason}`,
            read: false,
          })
        }
      }

      toast({
        title: action === "active" ? "Seller approved" : "Sent back to seller",
        description: action === "active" ? `${seller.store_name} is now active` : "Seller notified with reason",
      })
      onUpdate(seller.id, action === "active" ? "active" : "pending")
      onClose()
    }
    setSaving(false)
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="rounded-2xl max-w-sm max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-black">Review Application</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {/* Store info */}
          <Card className="rounded-xl border-none bg-muted/40 shadow-none">
            <CardContent className="p-3 space-y-2 text-xs">
              {[
                ["Store", seller.store_name],
                ["URL", `halalhub.co.in/shop/${seller.store_slug}`],
                ["Type", TYPE_LABELS[seller.seller_type] ?? seller.seller_type],
                ["City", seller.city],
                ["GSTIN", seller.gstin ?? "—"],
                ["PAN", seller.pan ?? "—"],
                ["Halal Declaration", seller.halal_declaration_signed ? "Signed ✓" : "Not signed"],
                ["Applied", timeAgo(seller.created_at)],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between">
                  <span className="text-muted-foreground font-bold">{k}</span>
                  <span className="font-bold text-foreground text-right max-w-[60%] truncate">{v}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Seller account */}
          <div className="flex items-center gap-2 text-xs">
            <User className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">{seller.profile?.full_name ?? "Unknown"}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{seller.profile?.email ?? "—"}</span>
          </div>

          {!seller.halal_declaration_signed && (
            <Card className="rounded-xl border-none bg-red-50 dark:bg-red-950/20 shadow-none">
              <CardContent className="p-3 flex items-center gap-2 text-xs text-red-600">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                Halal declaration not signed — require before approval
              </CardContent>
            </Card>
          )}

          {/* Reject reason */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-muted-foreground">
              Reason (required if sending back)
            </label>
            <Textarea
              placeholder="e.g. GST certificate missing. Please upload and resubmit."
              value={rejectionReason}
              onChange={e => setRejectionReason(e.target.value)}
              rows={3}
              className="rounded-xl resize-none text-xs"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              variant="outline"
              className="flex-1 rounded-xl h-9 text-xs font-bold border-red-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
              onClick={() => doAction("rejected")}
              disabled={saving || !rejectionReason.trim()}
            >
              {saving ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <XCircle className="h-3.5 w-3.5 mr-1" />}
              Send Back
            </Button>
            <Button
              className="flex-1 rounded-xl h-9 text-xs font-bold"
              onClick={() => doAction("active")}
              disabled={saving || !seller.halal_declaration_signed}
            >
              {saving ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <CheckCircle2 className="h-3.5 w-3.5 mr-1" />}
              Approve Store
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function SellerQueueContent() {
  const [sellers, setSellers] = useState<SellerRow[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("pending")
  const [reviewing, setReviewing] = useState<SellerRow | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from("mp_sellers")
      .select("*, profile:profiles(full_name, email)")
      .order("created_at", { ascending: false })
      .then(({ data }) => { setSellers((data as SellerRow[]) ?? []); setLoading(false) })
  }, [])

  function handleUpdate(id: string, status: string) {
    setSellers(ss => ss.map(s => s.id === id ? { ...s, status } : s))
  }

  const filtered = sellers.filter(s => {
    const q = search.toLowerCase()
    const matchSearch = !q
      || s.store_name.toLowerCase().includes(q)
      || s.profile?.email?.toLowerCase().includes(q)
      || s.city?.toLowerCase().includes(q)
    const matchStatus = filterStatus === "all" || s.status === filterStatus
    return matchSearch && matchStatus
  })

  const counts = {
    pending: sellers.filter(s => s.status === "pending").length,
    active: sellers.filter(s => s.status === "active").length,
    total: sellers.length,
  }

  return (
    <div className="p-4 md:p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-foreground flex items-center gap-2">
            <Store className="h-5 w-5 text-primary" /> Seller Applications
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {counts.pending} pending · {counts.active} active · {counts.total} total
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Pending Review", value: counts.pending, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/20" },
          { label: "Active Stores", value: counts.active, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/20" },
          { label: "Total Applied", value: counts.total, color: "text-primary", bg: "bg-primary/5" },
        ].map(({ label, value, color, bg }) => (
          <Card key={label} className="rounded-2xl border-none shadow-sm">
            <CardContent className={`p-3 ${bg} rounded-2xl`}>
              <p className={`text-xl font-black ${color}`}>{value}</p>
              <p className="text-[10px] text-muted-foreground leading-tight">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search sellers..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 rounded-xl" />
        </div>
        <div className="flex gap-1">
          {["pending", "active", "all"].map(s => (
            <Button
              key={s}
              size="sm"
              variant={filterStatus === s ? "default" : "outline"}
              className="rounded-xl h-9 text-xs font-bold capitalize"
              onClick={() => setFilterStatus(s)}
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
      ) : filtered.length === 0 ? (
        <Card className="rounded-2xl border-none shadow-sm">
          <CardContent className="p-10 text-center text-muted-foreground">
            <Store className="h-10 w-10 mx-auto mb-3 opacity-20" />
            <p className="font-bold text-foreground">No sellers found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filtered.map(seller => {
            const sm = STATUS_META[seller.status] ?? STATUS_META.pending
            return (
              <Card key={seller.id} className="rounded-2xl border-none shadow-sm">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center shrink-0 text-sm font-black text-muted-foreground">
                    {seller.store_name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-black text-foreground truncate">{seller.store_name}</p>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${sm.bg} ${sm.color}`}>
                        {sm.label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {TYPE_LABELS[seller.seller_type]} · {seller.city} · {timeAgo(seller.created_at)}
                    </p>
                    {!seller.halal_declaration_signed && (
                      <p className="text-[10px] text-red-500 font-bold mt-0.5">⚠ Declaration not signed</p>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant={seller.status === "pending" ? "default" : "outline"}
                    className="rounded-xl h-8 text-xs font-bold shrink-0 gap-1"
                    onClick={() => setReviewing(seller)}
                  >
                    <Eye className="h-3.5 w-3.5" />
                    {seller.status === "pending" ? "Review" : "View"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {reviewing && (
        <ReviewDialog
          seller={reviewing}
          onClose={() => setReviewing(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  )
}

export default function AdminSellersPage() {
  return (
    <AdminRoleGate required="editor">
      <SellerQueueContent />
    </AdminRoleGate>
  )
}
