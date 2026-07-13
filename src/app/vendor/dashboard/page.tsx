
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users, Star, Wallet,
  PlusCircle, Tag, Calendar, Rocket,
  ArrowUpRight, Clock, MapPin,
  ShieldCheck, Award, CheckCircle2,
  Eye
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"

type BizRow = {
  id: string; name: string; category: string | null; city: string | null; country: string | null
  rating: number | null; halal_verified: boolean | null; status: string | null
}

export default function VendorDashboard() {
  const { user, loading: authLoading } = useAuth()
  const [business, setBusiness] = React.useState<BizRow | null>(null)
  const [checkIns, setCheckIns] = React.useState<number | null>(null)
  const [saves, setSaves] = React.useState<number | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (authLoading) return
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()

    ;(supabase as any)
      .from("businesses")
      .select("id, name, category, city, country, rating, halal_verified, status")
      .eq("owner_id", user.uid)
      .limit(1)
      .then(({ data }: { data: BizRow[] | null }) => {
        const biz = data?.[0] ?? null
        setBusiness(biz)
        setLoading(false)
        if (!biz) return

        ;(supabase as any).from("check_ins").select("id", { count: "exact", head: true })
          .eq("business_id", biz.id)
          .then(({ count }: { count: number | null }) => setCheckIns(count ?? 0))

        ;(supabase as any).from("saved_businesses").select("id", { count: "exact", head: true })
          .eq("business_id", biz.id)
          .then(({ count }: { count: number | null }) => setSaves(count ?? 0))
      })
  }, [user?.uid, authLoading])

  const quickActions = [
    { label: "Add Menu Item", icon: PlusCircle, color: "text-emerald-500", bg: "bg-emerald-50", href: "/vendor/products" },
    { label: "Create Offer",  icon: Tag,         color: "text-blue-500",   bg: "bg-blue-50",    href: "/vendor/orders" },
    { label: "New Event",     icon: Calendar,    color: "text-purple-500", bg: "bg-purple-50",  href: "/vendor/reservations" },
    { label: "Boost Listing", icon: Rocket,      color: "text-amber-500",  bg: "bg-amber-50",   href: "/vendor/profile" },
  ]

  const kpis = [
    {
      label: "Check-ins",
      value: checkIns === null ? "—" : String(checkIns),
      trend: "Total all-time check-ins",
      icon: MapPin,
    },
    {
      label: "Saved By",
      value: saves === null ? "—" : String(saves),
      trend: "Users who bookmarked you",
      icon: Eye,
    },
    {
      label: "Rating",
      value: business?.rating ? business.rating.toFixed(1) : "—",
      trend: "Overall halal rating",
      icon: Star,
    },
    {
      label: "Status",
      value: business?.status === "active" ? "Active" : business?.status ?? "—",
      trend: business?.halal_verified ? "Halal verified" : "Not yet verified",
      icon: ShieldCheck,
    },
  ]

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!business) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-screen gap-6 text-center">
        <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center">
          <Award className="h-10 w-10 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-foreground">No Business Listed Yet</h1>
          <p className="text-muted-foreground font-medium max-w-sm">Register your business to access the vendor dashboard and start reaching halal-conscious customers.</p>
        </div>
        <Link href="/partner/onboarding/business/category">
          <Button className="rounded-2xl h-14 px-10 font-black bg-primary text-white shadow-lg">Register Your Business</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="p-3 sm:p-8 space-y-4 sm:space-y-8 bg-background min-h-screen">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-0.5">
          <h1 className="text-xl sm:text-3xl font-black font-headline text-foreground">{business.name}</h1>
          <div className="flex items-center gap-3 flex-wrap">
            {business.category && <p className="text-xs font-bold text-muted-foreground">{business.category}</p>}
            {(business.city || business.country) && (
              <p className="flex items-center gap-1 text-xs font-bold text-muted-foreground">
                <MapPin className="h-3 w-3" /> {[business.city, business.country].filter(Boolean).join(", ")}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {business.halal_verified && (
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 border font-black text-[10px] uppercase gap-1">
              <CheckCircle2 className="h-3 w-3" /> Halal Verified
            </Badge>
          )}
          <Link href={`/entities/${business.id}`}>
            <Button size="sm" variant="outline" className="rounded-xl font-black text-xs gap-1.5">
              <Eye className="h-3.5 w-3.5" /> View Listing
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6">
        {kpis.map((kpi, i) => (
          <Card key={i} className="border-none shadow-sm rounded-2xl sm:rounded-3xl bg-card">
            <CardHeader className="flex flex-row items-center justify-between p-3 pb-1 sm:p-5 sm:pb-2">
              <span className="text-[10px] sm:text-sm font-bold text-muted-foreground leading-tight">{kpi.label}</span>
              <kpi.icon className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0 ml-1" />
            </CardHeader>
            <CardContent className="px-3 pb-3 pt-0 sm:px-5 sm:pb-4">
              <div className="text-lg sm:text-2xl font-black text-foreground">{kpi.value}</div>
              <p className="text-[9px] sm:text-[10px] font-bold text-emerald-600 mt-0.5 uppercase tracking-tight">{kpi.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8">
        <div className="lg:col-span-8 space-y-4 sm:space-y-8">
          <section className="space-y-2 sm:space-y-4">
            <h2 className="text-sm sm:text-lg font-black text-foreground px-1">Quick Actions</h2>
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {quickActions.map((action, i) => (
                <Link key={i} href={action.href}>
                  <button className="group w-full flex flex-col items-center justify-center p-2 sm:p-6 bg-card rounded-xl sm:rounded-[2rem] shadow-sm hover:shadow-md transition-all border border-transparent hover:border-primary/20">
                    <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl flex items-center justify-center mb-1 sm:mb-3 ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                      <action.icon className="h-4 w-4 sm:h-6 sm:w-6" />
                    </div>
                    <span className="text-[9px] sm:text-xs font-black text-foreground text-center leading-tight">{action.label}</span>
                  </button>
                </Link>
              ))}
            </div>
          </section>

          <Card className="rounded-[1.5rem] sm:rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card">
            <CardHeader className="p-4 sm:p-8 flex flex-row items-center justify-between">
              <div className="space-y-0.5 sm:space-y-1 min-w-0">
                <CardTitle className="text-base sm:text-xl font-black">Business Details</CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium hidden sm:block">Your listing information on Halal Hub.</p>
              </div>
              <Link href="/vendor/profile">
                <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full font-black text-xs px-4 sm:px-6 h-9 sm:h-10 shrink-0">
                  Edit Profile <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableBody>
                  {[
                    { label: "Business Name", value: business.name },
                    { label: "Category",      value: business.category ?? "—" },
                    { label: "Location",      value: [business.city, business.country].filter(Boolean).join(", ") || "—" },
                    { label: "Status",        value: business.status ?? "—" },
                    { label: "Rating",        value: business.rating ? `${business.rating.toFixed(1)} / 5` : "No ratings yet" },
                  ].map((row, i) => (
                    <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors">
                      <TableCell className="px-4 sm:px-8 py-3 sm:py-4 font-black text-muted-foreground text-xs uppercase tracking-wider w-40">{row.label}</TableCell>
                      <TableCell className="px-4 sm:px-8 py-3 sm:py-4 font-bold text-foreground text-sm">{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-5 sm:space-y-8">
          <Card className="rounded-[1.5rem] sm:rounded-[2.5rem] border-none shadow-xl bg-zinc-900 text-white p-5 sm:p-8 space-y-4 sm:space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck className="h-24 w-24" />
            </div>
            <div className="relative z-10 space-y-4">
              <h3 className="text-xl font-black">Trust & Compliance</h3>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                Build 2x more trust by getting verified. Apply for FSSAI or Halal certification today.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-card/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="text-xs font-bold">Halal Hub Audit</span>
                  </div>
                  <Badge variant="outline" className={`text-[8px] font-black uppercase ${business.halal_verified ? "border-emerald-500/50 text-emerald-400" : "border-red-500/50 text-red-400"}`}>
                    {business.halal_verified ? "VERIFIED" : "PENDING"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-2xl bg-card/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs font-bold">Listing Status</span>
                  </div>
                  <Badge variant="outline" className={`text-[8px] font-black uppercase ${business.status === "active" ? "border-emerald-500/50 text-emerald-400" : "border-amber-500/50 text-amber-400"}`}>
                    {business.status?.toUpperCase() ?? "PENDING"}
                  </Badge>
                </div>
              </div>
              <Link href="/vendor/verification" className="block w-full">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-12 font-black text-[10px] uppercase tracking-widest shadow-xl">
                  Get Certified
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="rounded-[1.5rem] sm:rounded-[2.5rem] border-none shadow-sm bg-card p-4 sm:p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-base sm:text-xl font-black">Engagement Summary</CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-3 sm:space-y-4">
              {[
                { text: `${checkIns ?? "—"} total check-ins`, icon: MapPin, color: "text-emerald-500" },
                { text: `${saves ?? "—"} users saved your listing`, icon: Star, color: "text-amber-500" },
                { text: `Rating: ${business.rating ? business.rating.toFixed(1) + " / 5" : "No ratings yet"}`, icon: Clock, color: "text-blue-500" },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-4 p-3 sm:p-4 rounded-2xl bg-muted/50 hover:bg-card hover:shadow-sm transition-all border border-transparent hover:border-border group">
                  <div className={`h-8 w-8 rounded-xl flex items-center justify-center ${activity.color} bg-card shadow-sm shrink-0 group-hover:scale-110 transition-transform`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-bold text-foreground leading-tight pt-1">{activity.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
