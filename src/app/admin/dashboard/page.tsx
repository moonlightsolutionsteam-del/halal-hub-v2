"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Building2, ShieldCheck, Users, IndianRupee,
  ArrowUpRight, ExternalLink,
  TrendingUp, Zap, Globe,
  Network, AlertTriangle,
  LayoutGrid,
  UtensilsCrossed, ShoppingCart, Plane,
  Landmark,
  Settings, Server, Cpu, Wifi, History,
  CheckCircle2, ChevronRight,
  ArrowRightLeft, Terminal, Loader2,
  Clock
} from "lucide-react"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useAdminStats } from "@/hooks/use-admin-stats"

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "Food & Dining": UtensilsCrossed,
  "Grocery & Supermarkets": ShoppingCart,
  "Travel & Tourism": Plane,
  "Islamic Finance": Landmark,
  "Hotels & Accommodation": Building2,
  "Healthcare & Wellness": ShieldCheck,
  "Fashion & Modest Wear": ShoppingCart,
  "Events & Venues": Network,
  "Education & Learning": Landmark,
  "Beauty & Cosmetics": Globe,
  "Meat & Butchers": UtensilsCrossed,
  "Catering Services": UtensilsCrossed,
  "Media & Publishing": Globe,
}

export default function SuperAdminDashboard() {
  const [mounted, setMounted] = React.useState(false)
  const stats = useAdminStats()

  React.useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const topCategories = Object.entries(stats.categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)

  const COLORS = ["text-orange-500", "text-emerald-500", "text-amber-500", "text-blue-500"]
  const BGS = ["bg-orange-50", "bg-emerald-50", "bg-amber-50", "bg-blue-50"]

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen pb-24">

      {/* System Status Ribbon */}
      <div className="flex flex-wrap items-center gap-6 px-6 py-3 bg-zinc-900 rounded-3xl shadow-2xl border border-white/10 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-50" />
        <div className="flex items-center gap-3 relative z-10">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="text-[10px] font-black text-white uppercase tracking-widest">System Live</span>
        </div>
        <div className="h-4 w-px bg-white/10 mx-2" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="flex items-center gap-2 text-zinc-400">
            <Server className="h-3 w-3" />
            <span className="text-[10px] font-bold uppercase">Supabase Connected</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <Cpu className="h-3 w-3" />
            <span className="text-[10px] font-bold uppercase">
              {stats.loading ? "Loading..." : `${stats.totalBusinesses} Businesses`}
            </span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4 relative z-10">
          <Badge variant="outline" className="border-white/20 text-white text-[8px] font-black uppercase tracking-tighter">
            {stats.loading ? "Syncing..." : "Data Live"}
          </Badge>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <Zap className="h-3 w-3 fill-current" /> Operational Command
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-headline text-foreground tracking-tighter">HALAL HUB GLOBAL</h1>
          <p className="text-muted-foreground font-medium text-sm sm:text-lg italic">Tactical oversight of the unified Shariah-compliant ecosystem.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="rounded-2xl px-4 sm:px-6 font-black border-2 h-10 sm:h-12 gap-2 bg-card hover:bg-muted shadow-sm text-xs sm:text-sm">
            <History className="h-4 w-4" /> <span className="hidden sm:inline">Operations Log</span><span className="sm:hidden">Logs</span>
          </Button>
          <Button className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl px-4 sm:px-8 font-black shadow-2xl h-10 sm:h-12 gap-2 text-xs sm:text-sm">
            <Settings className="h-4 w-4" /> <span className="hidden sm:inline">System Config</span><span className="sm:hidden">Config</span>
          </Button>
        </div>
      </div>

      {/* Real KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {[
          {
            label: "Total Businesses",
            value: stats.loading ? "—" : stats.totalBusinesses.toLocaleString(),
            sub: `${stats.activeBusinesses} Active`,
            icon: Building2, color: "text-emerald-600", bg: "bg-emerald-50"
          },
          {
            label: "Pending Verifications",
            value: stats.loading ? "—" : stats.pendingBusinesses.toLocaleString(),
            sub: "Awaiting Review",
            icon: ShieldCheck, color: "text-amber-600", bg: "bg-amber-50"
          },
          {
            label: "Registered Users",
            value: stats.loading ? "—" : stats.totalUsers.toLocaleString(),
            sub: "Platform Participants",
            icon: Users, color: "text-blue-600", bg: "bg-blue-50"
          },
          {
            label: "Business Categories",
            value: stats.loading ? "—" : Object.keys(stats.categoryCounts).length.toString(),
            sub: "Active Verticals",
            icon: LayoutGrid, color: "text-primary", bg: "bg-primary/5"
          },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-[1.5rem] sm:rounded-[2.5rem] p-5 sm:p-8 bg-card group hover:shadow-xl transition-all duration-500 overflow-hidden relative">
            <div className="flex justify-between items-start mb-4 sm:mb-6">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none">{stat.label}</span>
                <div className="text-2xl sm:text-4xl font-black text-foreground tracking-tighter flex items-center gap-2">
                  {stats.loading ? <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /> : stat.value}
                </div>
              </div>
              <div className={cn("h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">{stat.sub}</p>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">
        {/* Verification Pipeline — real pending businesses */}
        <Card className="lg:col-span-8 rounded-2xl sm:rounded-[3rem] border-none shadow-sm bg-card overflow-hidden">
          <CardHeader className="p-5 sm:p-10 border-b bg-muted/30 flex flex-row items-center justify-between flex-wrap gap-3">
            <div className="space-y-1">
              <CardTitle className="text-lg sm:text-2xl font-black text-foreground">Pending Verification Queue</CardTitle>
              <CardDescription className="font-medium italic text-sm sm:text-base hidden sm:block">
                Businesses awaiting halal certification review.
              </CardDescription>
            </div>
            <Link href="/admin/verification">
              <Button variant="outline" size="sm" className="rounded-xl font-black text-[10px] h-10 px-6 border-2 uppercase tracking-widest bg-card gap-2">
                View All <ArrowUpRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            {stats.loading ? (
              <div className="flex items-center justify-center py-20 text-muted-foreground gap-3">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm font-bold">Loading verification queue...</span>
              </div>
            ) : stats.pendingList.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground">
                <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                <div className="text-center">
                  <p className="font-black text-foreground">Queue Empty</p>
                  <p className="text-sm font-medium">No businesses pending verification.</p>
                </div>
              </div>
            ) : (
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-6 sm:px-10 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Business</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Category</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Location</TableHead>
                    <TableHead className="text-right px-6 sm:px-10 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.pendingList.map((biz, i) => {
                    const colors = ["bg-rose-500", "bg-orange-500", "bg-blue-500", "bg-emerald-500", "bg-violet-500", "bg-amber-500"]
                    return (
                      <TableRow key={biz.id} className="border-border hover:bg-muted/50 transition-colors group">
                        <TableCell className="px-6 sm:px-10 py-5">
                          <div className="flex items-center gap-4">
                            <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center text-white font-black shadow-lg text-sm", colors[i % colors.length])}>
                              {biz.name.charAt(0)}
                            </div>
                            <span className="font-black text-foreground text-sm tracking-tight">{biz.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-[11px] font-bold text-muted-foreground">{biz.category}</TableCell>
                        <TableCell className="text-[11px] font-bold text-muted-foreground">
                          {[biz.city, biz.country].filter(Boolean).join(", ") || "—"}
                        </TableCell>
                        <TableCell className="text-right px-6 sm:px-10">
                          <Link href="/admin/businesses">
                            <Button size="sm" variant="ghost" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-muted hover:bg-primary hover:text-white font-black text-[10px] uppercase tracking-wider gap-1.5">
                              Review <ArrowRightLeft className="h-3 w-3" />
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Sector Health — real category counts */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-xl font-black text-foreground px-2 flex items-center gap-2">
            <LayoutGrid className="h-5 w-5 text-primary" /> Active Sectors
          </h3>
          {stats.loading ? (
            <div className="flex items-center justify-center py-16 text-muted-foreground gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-bold">Loading sectors...</span>
            </div>
          ) : topCategories.length === 0 ? (
            <Card className="border-none shadow-sm rounded-[2rem] p-8 bg-card text-center">
              <p className="text-sm font-bold text-muted-foreground">No active businesses yet.</p>
              <p className="text-xs text-muted-foreground mt-1">Run the seed SQL to populate sample data.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {topCategories.map(([cat, count], i) => {
                const Icon = CATEGORY_ICONS[cat] ?? Building2
                return (
                  <Card key={cat} className="border-none shadow-sm rounded-[2rem] p-6 bg-card group hover:bg-zinc-800 hover:text-white transition-all duration-500 cursor-pointer">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shadow-inner", BGS[i % BGS.length], COLORS[i % COLORS.length])}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-black uppercase tracking-tight truncate">{cat.split(" & ")[0]}</span>
                          <span className="text-[10px] font-black text-emerald-500">{count} active</span>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-border group-hover:border-white/10 pt-4">
                      <p className="text-2xl font-black">{count.toLocaleString()}</p>
                      <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Listed Businesses</p>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
          <Link href="/admin/businesses">
            <Button variant="outline" className="w-full rounded-2xl h-14 font-black border-2 bg-card hover:bg-muted shadow-sm gap-2">
              Manage All Businesses <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Links Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "All Businesses", href: "/admin/businesses", icon: Building2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Users", href: "/admin/users", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Verification", href: "/admin/verification", icon: ShieldCheck, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Reviews", href: "/admin/reviews", icon: CheckCircle2, color: "text-rose-600", bg: "bg-rose-50" },
          { label: "Feed", href: "/admin/feed", icon: Globe, color: "text-violet-600", bg: "bg-violet-50" },
          { label: "Settings", href: "/admin/global-settings", icon: Settings, color: "text-primary", bg: "bg-primary/5" },
        ].map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="border-none shadow-sm rounded-[2rem] p-5 bg-card hover:shadow-lg transition-all duration-300 group cursor-pointer h-full">
              <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shadow-inner mb-4 group-hover:scale-110 transition-transform", link.bg, link.color)}>
                <link.icon className="h-5 w-5" />
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-foreground">{link.label}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Floating Exit Button */}
      <Link href="/">
        <button className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group border-4 border-white active:scale-95">
          <div className="flex flex-col items-center">
            <ExternalLink className="h-6 w-6" />
            <span className="text-[8px] font-black uppercase mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Exit</span>
          </div>
        </button>
      </Link>
    </div>
  )
}
