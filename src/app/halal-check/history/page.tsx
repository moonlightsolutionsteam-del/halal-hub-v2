
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowLeft, History, Trash2, ScanLine, Eye, Package } from "lucide-react"
import { STATUS_CONFIG, type HalalStatus } from "../data"
import { useAuth } from "@/hooks/use-auth"
import { createClient } from "@/lib/supabase/client"

interface ScanHistoryEntry { id: string; barcode: string; productId?: string; productName?: string; productStatus?: HalalStatus; ts: number }
interface ViewHistoryEntry { id: string; productId: string; name: string; brand: string | null; status: HalalStatus; ts: number }

function timeAgo(ts: number) {
  const diff = Date.now() - ts
  const m = Math.floor(diff / 60000)
  const h = Math.floor(diff / 3600000)
  const d = Math.floor(diff / 86400000)
  if (d > 0) return `${d}d ago`
  if (h > 0) return `${h}h ago`
  if (m > 0) return `${m}m ago`
  return "Just now"
}

type Tab = "scans" | "views"

export default function HistoryPage() {
  const { user } = useAuth()
  const [tab, setTab] = useState<Tab>("views")
  const [scanHistory, setScanHistory] = useState<ScanHistoryEntry[]>([])
  const [viewHistory, setViewHistory] = useState<ViewHistoryEntry[]>([])

  useEffect(() => {
    if (!user?.uid) return
    const supabase = createClient()
    ;supabase
      .from("product_scans")
      .select("id, barcode, product_id, created_at, product:halal_products(id, name, halal_status)")
      .eq("user_id", user.uid)
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data }: { data: any[] | null }) => {
        setScanHistory((data ?? []).map(r => ({
          id: r.id, barcode: r.barcode, productId: r.product?.id ?? undefined,
          productName: r.product?.name, productStatus: r.product?.halal_status,
          ts: new Date(r.created_at).getTime(),
        })))
      })
    ;supabase
      .from("product_views")
      .select("id, created_at, product:halal_products(id, name, brand, halal_status)")
      .eq("user_id", user.uid)
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data }: { data: any[] | null }) => {
        setViewHistory((data ?? []).filter(r => r.product).map(r => ({
          id: r.id, productId: r.product.id, name: r.product.name, brand: r.product.brand,
          status: r.product.halal_status, ts: new Date(r.created_at).getTime(),
        })))
      })
  }, [user?.uid])

  async function clearScans() {
    if (!user?.uid) return
    const supabase = createClient()
    await supabase.from("product_scans").delete().eq("user_id", user.uid)
    setScanHistory([])
  }

  async function clearViews() {
    if (!user?.uid) return
    const supabase = createClient()
    await supabase.from("product_views").delete().eq("user_id", user.uid)
    setViewHistory([])
  }

  const current = tab === "scans" ? scanHistory : viewHistory

  return (
    <div className="max-w-2xl lg:max-w-5xl mx-auto pb-32">
      <div className="flex items-center gap-3 px-4 py-4 border-b border-border/40">
        <Link href="/halal-check" className="w-9 h-9 rounded-xl border border-border/50 flex items-center justify-center hover:bg-muted transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1">
          <h1 className="text-base font-black">History</h1>
          <p className="text-[10px] text-muted-foreground">Your recent scans and product views</p>
        </div>
        {current.length > 0 && (
          <button
            onClick={tab === "scans" ? clearScans : clearViews}
            className="flex items-center gap-1.5 text-[10px] font-black text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" /> Clear
          </button>
        )}
      </div>

      <div className="flex border-b border-border/40">
        {[
          { id: "views" as Tab, label: "Viewed Products", icon: Eye, count: viewHistory.length },
          { id: "scans" as Tab, label: "Barcode Scans", icon: ScanLine, count: scanHistory.length },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-3 text-[11px] font-black uppercase tracking-wide transition-all border-b-2",
              tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
            {t.count > 0 && <span className="bg-muted text-muted-foreground text-[9px] font-black px-1.5 py-0.5 rounded-full">{t.count}</span>}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4 space-y-2">
        {tab === "views" && viewHistory.length > 0 && viewHistory.map((entry, i) => {
          const cfg = STATUS_CONFIG[entry.status]
          return (
            <Link key={i} href={`/halal-check/product/${entry.productId}`} className="group block">
              <div className="flex items-center gap-3 rounded-2xl border border-border/50 bg-card px-4 py-3 hover:shadow-soft hover:bg-muted/20 transition-all">
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm", cfg.bg, cfg.color)}>
                  {cfg.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black truncate">{entry.name}</p>
                  <p className="text-[10px] text-muted-foreground">{entry.brand}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className={cn("text-[10px] font-black", cfg.color)}>{cfg.label}</span>
                  <p className="text-[9px] text-muted-foreground">{timeAgo(entry.ts)}</p>
                </div>
              </div>
            </Link>
          )
        })}

        {tab === "scans" && scanHistory.length > 0 && scanHistory.map((entry, i) => {
          const hasProduct = Boolean(entry.productId && entry.productStatus)
          return (
            <div key={i} className="group">
              {hasProduct ? (
                <Link href={`/halal-check/product/${entry.productId}`} className="flex items-center gap-3 rounded-2xl border border-border/50 bg-card px-4 py-3 hover:shadow-soft hover:bg-muted/20 transition-all">
                  <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm", STATUS_CONFIG[entry.productStatus!].bg, STATUS_CONFIG[entry.productStatus!].color)}>
                    {STATUS_CONFIG[entry.productStatus!].icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black truncate">{entry.productName}</p>
                    <p className="text-[10px] font-mono text-muted-foreground">{entry.barcode}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={cn("text-[10px] font-black", STATUS_CONFIG[entry.productStatus!].color)}>{STATUS_CONFIG[entry.productStatus!].label}</span>
                    <p className="text-[9px] text-muted-foreground">{timeAgo(entry.ts)}</p>
                  </div>
                </Link>
              ) : (
                <div className="flex items-center gap-3 rounded-2xl border border-border/50 bg-card px-4 py-3">
                  <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-muted-foreground">Unknown Product</p>
                    <p className="text-[10px] font-mono text-muted-foreground">{entry.barcode}</p>
                  </div>
                  <p className="text-[9px] text-muted-foreground shrink-0">{timeAgo(entry.ts)}</p>
                </div>
              )}
            </div>
          )
        })}

        {current.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
            <div className="w-16 h-16 rounded-3xl bg-muted flex items-center justify-center">
              <History className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-black text-muted-foreground">No {tab === "scans" ? "scans" : "views"} yet</p>
              <p className="text-xs text-muted-foreground">
                {tab === "scans" ? "Scan a product barcode to get started" : "Browse products to see your view history"}
              </p>
            </div>
            <Link href={tab === "scans" ? "/halal-check/scan" : "/halal-check/product-checker"} className="text-sm font-black text-primary">
              {tab === "scans" ? "Open Scanner" : "Browse Products"}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
