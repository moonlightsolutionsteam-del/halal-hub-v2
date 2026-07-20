"use client"

import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { createClient } from "@/lib/supabase/client"
import * as React from "react"
import {
  ShoppingCart, Package, Truck, DollarSign,
  Tag, BarChart2, Image, FileText, Megaphone,
  Settings, Users, ChevronRight, Star, MapPin,
  CheckCircle2, BookOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const MODULES = [
  {
    section: "Orders & Fulfilment",
    items: [
      { label: "Orders", description: "Incoming orders, status, and fulfilment", icon: ShoppingCart, href: "/vendor/grocery/orders", color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" },
      { label: "Delivery", description: "Delivery zones, riders, and tracking", icon: Truck, href: "/vendor/grocery/delivery", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" },
    ],
  },
  {
    section: "Products & Inventory",
    items: [
      { label: "Inventory", description: "Stock levels, SKUs, and reorder alerts", icon: Package, href: "/vendor/grocery/inventory", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" },
      { label: "Offers & Deals", description: "Discounts, bundle deals, and flash sales", icon: Tag, href: "/vendor/grocery/marketing/offers", color: "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400" },
    ],
  },
  {
    section: "Marketing",
    items: [
      { label: "Loyalty Program", description: "Reward repeat customers with points", icon: Users, href: "/vendor/grocery/marketing/loyalty", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" },
      { label: "Collaborations", description: "Brand deals and vendor partnerships", icon: Megaphone, href: "/vendor/grocery/marketing/collaborate", color: "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400" },
      { label: "Halal Transparency", description: "Certifications and sourcing disclosure", icon: CheckCircle2, href: "/vendor/grocery/marketing/transparency", color: "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400" },
    ],
  },
  {
    section: "Content & Engagement",
    items: [
      { label: "Posts & Updates", description: "Announce new products and promos", icon: FileText, href: "/vendor/grocery/engagement/posts", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" },
      { label: "Blog", description: "Recipes, health tips and articles", icon: BookOpen, href: "/vendor/grocery/engagement/blog", color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400" },
      { label: "Reviews", description: "Customer reviews and responses", icon: Star, href: "/vendor/grocery/engagement/reviews", color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400" },
      { label: "Enquiries", description: "Customer questions and direct messages", icon: Users, href: "/vendor/grocery/engagement/enquiry", color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" },
      { label: "Gallery", description: "Photos of products and store", icon: Image, href: "/vendor/grocery/gallery", color: "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400" },
    ],
  },
  {
    section: "Finance & Admin",
    items: [
      { label: "Bills & Invoices", description: "Platform fees and billing history", icon: DollarSign, href: "/vendor/grocery/bills", color: "bg-slate-100 dark:bg-slate-900/30 text-slate-600 dark:text-slate-400" },
      { label: "Documents", description: "Licences, halal certs, and legal docs", icon: FileText, href: "/vendor/grocery/documents", color: "bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400" },
      { label: "Analytics", description: "Sales trends and performance metrics", icon: BarChart2, href: "/vendor/grocery/account/support", color: "bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400" },
    ],
  },
]

type BizRow = { id: string; name: string; city: string | null; country: string | null; rating: number | null; halal_verified: boolean | null }

export default function GroceryDashboard() {
  const { user } = useAuth()
  const [biz, setBiz] = React.useState<BizRow | null>(null)
  const [orders, setOrders] = React.useState<number | null>(null)
  const [saves, setSaves] = React.useState<number | null>(null)

  React.useEffect(() => {
    if (!user?.uid) return
    const supabase = createClient()
    supabase
      .from("businesses")
      .select("id, name, city, country, rating, halal_verified")
      .eq("owner_id", user.uid)
      .limit(1)
      .then(({ data }) => {
        const row = data?.[0] ?? null
        setBiz(row)
        if (!row) return
        supabase.from("saved_businesses").select("id", { count: "exact", head: true })
          .eq("business_id", row.id)
          .then(({ count }) => setSaves(count ?? 0))
        supabase.from("check_ins").select("id", { count: "exact", head: true })
          .eq("business_id", row.id)
          .then(({ count }) => setOrders(count ?? 0))
      })
  }, [user?.uid])

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-emerald-600 flex items-center justify-center">
              <ShoppingCart className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-black text-foreground">Grocery Dashboard</span>
          </div>
          <Link href="/vendor/grocery/profile">
            <Button variant="ghost" size="sm" className="text-xs font-bold h-8 rounded-lg">Edit Profile</Button>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {user?.name ? `Welcome, ${user.name.split(" ")[0]}` : "Welcome"}
          </p>
          {biz ? (
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-foreground">{biz.name}</h1>
                {biz.city && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {biz.city}{biz.country ? `, ${biz.country}` : ""}
                  </p>
                )}
              </div>
              <div className="flex gap-2 flex-wrap justify-end">
                {biz.halal_verified && (
                  <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 text-[10px] font-bold gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Halal Verified
                  </Badge>
                )}
                {biz.rating && (
                  <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 text-[10px] font-bold gap-1">
                    <Star className="h-3 w-3" /> {biz.rating.toFixed(1)}
                  </Badge>
                )}
              </div>
            </div>
          ) : (
            <h1 className="text-2xl font-black text-foreground">Grocery Management</h1>
          )}
        </div>

        {biz && (
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-border/60 bg-card p-4">
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wide">Saved</p>
              <p className="text-2xl font-black text-foreground mt-1">{saves ?? "—"}</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card p-4">
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wide">Check-ins</p>
              <p className="text-2xl font-black text-foreground mt-1">{orders ?? "—"}</p>
            </div>
          </div>
        )}

        {MODULES.map(section => (
          <div key={section.section} className="space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">{section.section}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {section.items.map(mod => {
                const Icon = mod.icon
                return (
                  <Link key={mod.href} href={mod.href}>
                    <div className="group rounded-2xl border border-border/60 bg-card hover:border-primary/30 hover:shadow-md transition-all p-4 flex items-start gap-3 cursor-pointer">
                      <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${mod.color}`}>
                        <Icon className="h-[18px] w-[18px]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-foreground group-hover:text-primary transition-colors">{mod.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{mod.description}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/40 shrink-0 mt-0.5 group-hover:text-primary/60 transition-colors" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
