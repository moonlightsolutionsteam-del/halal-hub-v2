"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Building2, ShieldCheck, Users, IndianRupee, 
  ArrowUpRight, FileWarning, ExternalLink,
  TrendingUp, Activity, Zap, Globe,
  Network, MessageSquare, AlertTriangle,
  LayoutGrid, BarChart3, PieChart,
  UtensilsCrossed, ShoppingCart, Plane, 
  Landmark, MoreVertical, Search, Filter,
  Settings, Server, Cpu, Wifi, History,
  CheckCircle2, ChevronRight, MapPin, 
  ArrowRightLeft, Terminal
} from "lucide-react"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import { 
  Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip 
} from "recharts"
import { 
  ChartContainer, ChartTooltipContent, type ChartConfig 
} from "@/components/ui/chart"
import Link from "next/link"
import { cn } from "@/lib/utils"

const revenueData = [
  { month: "Jan", revenue: 4500000, target: 4000000 },
  { month: "Feb", revenue: 5200000, target: 4500000 },
  { month: "Mar", revenue: 4800000, target: 5000000 },
  { month: "Apr", revenue: 6100000, target: 5500000 },
  { month: "May", revenue: 5900000, target: 6000000 },
  { month: "Jun", revenue: 7200000, target: 6500000 },
  { month: "Jul", revenue: 8400000, target: 7000000 },
]

const verticalStats = [
  { name: "Dining", entities: 1240, health: 98, revenue: "₹4.2M", icon: UtensilsCrossed, color: "text-orange-500", bg: "bg-orange-50" },
  { name: "Retail", entities: 890, health: 92, revenue: "₹3.8M", icon: ShoppingCart, color: "text-emerald-500", bg: "bg-emerald-50" },
  { name: "Travel", entities: 156, health: 85, revenue: "₹12.4M", icon: Plane, color: "text-amber-500", bg: "bg-amber-50" },
  { name: "Inst.", entities: 320, health: 99, revenue: "₹1.2M", icon: Landmark, color: "text-blue-500", bg: "bg-blue-50" },
]

const chartConfig = {
  revenue: {
    label: "Actual Revenue",
    color: "hsl(var(--primary))",
  },
  target: {
    label: "Target Revenue",
    color: "hsl(var(--muted))",
  },
} satisfies ChartConfig

export default function SuperAdminDashboard() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen pb-24 selection:bg-primary/10">
      
      {/* System Integrity Ribbon */}
      <div className="flex flex-wrap items-center gap-6 px-6 py-3 bg-zinc-900 rounded-3xl shadow-2xl border border-white/10 overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-50" />
        <div className="flex items-center gap-3 relative z-10">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="text-[10px] font-black text-white uppercase tracking-widest">System Live</span>
        </div>
        <div className="h-4 w-px bg-card/10 mx-2" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Wifi className="h-3 w-3" />
            <span className="text-[10px] font-bold uppercase">Latency: 24ms</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Cpu className="h-3 w-3" />
            <span className="text-[10px] font-bold uppercase">Load: 14.2%</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Server className="h-3 w-3" />
            <span className="text-[10px] font-bold uppercase">Nodes: 128 Online</span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4 relative z-10">
          <Badge variant="outline" className="border-white/20 text-white text-[8px] font-black uppercase tracking-tighter">Firewall: Active</Badge>
          <span className="text-[10px] font-black text-primary uppercase tracking-widest animate-pulse">Scanning Threats...</span>
        </div>
      </div>

      {/* Control Room Header */}
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

      {/* Global Mission KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {[
          { label: "Net Ecosystem GMV", value: "₹85.4M", trend: "+12.4%", sub: "MTD Growth", icon: IndianRupee, color: "text-emerald-600", bg: "bg-emerald-50", spark: [10, 40, 30, 50, 40, 60, 80] },
          { label: "Verified Identity Base", value: "45,892", trend: "94.2%", sub: "Audit Compliance", icon: ShieldCheck, color: "text-blue-600", bg: "bg-blue-50", spark: [80, 85, 88, 90, 92, 94, 94] },
          { label: "Global Node Registry", value: "1.24M", trend: "+2.4k", sub: "New Nodes Today", icon: Network, color: "text-purple-600", bg: "bg-purple-50", spark: [20, 30, 45, 40, 55, 70, 90] },
          { label: "Platform Trust Score", value: "A+", trend: "Optimum", sub: "System Integrity", icon: CheckCircle2, color: "text-primary", bg: "bg-primary/5", spark: [90, 92, 95, 94, 96, 98, 100] },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-[1.5rem] sm:rounded-[2.5rem] p-5 sm:p-8 bg-card group hover:shadow-xl transition-all duration-500 overflow-hidden relative">
            <div className="flex justify-between items-start mb-4 sm:mb-6">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none">{stat.label}</span>
                <div className="text-2xl sm:text-4xl font-black text-foreground tracking-tighter">{stat.value}</div>
              </div>
              <div className={cn("h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div className="space-y-0.5">
                <p className={cn("text-xs font-black uppercase", stat.color)}>{stat.trend}</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">{stat.sub}</p>
              </div>
              <div className="flex gap-1 items-end h-8">
                {stat.spark.map((v, idx) => (
                  <div key={idx} className={cn("w-1 rounded-full", stat.bg.replace('bg-', 'bg-opacity-50 bg-'))} style={{ height: `${v}%`, opacity: 0.3 + (idx / 10) }} />
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Analytics Command Center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">
        {/* Tactical Revenue Growth */}
        <Card className="lg:col-span-8 rounded-2xl sm:rounded-[3rem] border-none shadow-sm bg-card overflow-hidden">
          <CardHeader className="p-5 sm:p-10 border-b bg-muted/30 flex flex-row items-center justify-between flex-wrap gap-3">
            <div className="space-y-1">
              <CardTitle className="text-lg sm:text-2xl font-black text-foreground">Ecosystem Revenue Velocity</CardTitle>
              <CardDescription className="font-medium italic text-sm sm:text-base hidden sm:block">Real-time performance tracking across all 13 business verticals vs targets.</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-[10px] font-black uppercase text-muted-foreground">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-muted" />
                <span className="text-[10px] font-black uppercase text-muted-foreground">Target</span>
              </div>
              <Badge className="bg-primary text-white font-black text-[9px] px-4 py-1 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-primary/20">LIVE OPS</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-10">
            <ChartContainer config={chartConfig} className="h-[200px] sm:h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold', fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(value) => `₹${value / 1000000}M`} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="target" stroke="var(--color-target)" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                  <Area type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Vertical Sector Command Centers */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-xl font-black text-foreground px-2 flex items-center gap-2">
            <LayoutGrid className="h-5 w-5 text-primary" /> Sector Health Status
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {verticalStats.map((v, i) => (
              <Card key={i} className="border-none shadow-sm rounded-[2rem] p-6 bg-card group hover:bg-zinc-800 hover:text-white transition-all duration-500 cursor-pointer">
                <div className="flex items-center gap-4 mb-4">
                  <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shadow-inner group-hover:bg-card/10", v.bg, v.color)}>
                    <v.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-black uppercase tracking-tight">{v.name}</span>
                      <span className="text-[10px] font-black text-emerald-500">{v.health}% OK</span>
                    </div>
                    <Progress value={v.health} className="h-1.5 mt-1.5 bg-muted group-hover:bg-card/10" />
                  </div>
                </div>
                <div className="flex justify-between items-end border-t border-border group-hover:border-white/10 pt-4 mt-2">
                  <div className="space-y-0.5">
                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Active Entities</p>
                    <p className="text-lg font-black">{v.entities.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Revenue</p>
                    <p className="text-lg font-black text-primary group-hover:text-emerald-400">{v.revenue}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <Button variant="outline" className="w-full rounded-2xl h-14 font-black border-2 bg-card hover:bg-muted shadow-sm gap-2">
            Full Sector Audit <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Moderation & Quality Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Global Verification Pipeline */}
        <Card className="lg:col-span-7 rounded-[3rem] border-none shadow-sm bg-card overflow-hidden">
          <CardHeader className="p-10 border-b bg-muted/30 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-black">Verification Command Pipeline</CardTitle>
              <CardDescription className="font-medium italic">High-priority cross-vertical certification requests.</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl font-black text-[10px] h-10 px-6 border-2 uppercase tracking-widest bg-card">Real-time Stream</Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="border-none">
                  <TableHead className="px-10 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Identity / Origin</TableHead>
                  <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Documentation</TableHead>
                  <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground text-center">Audit Severity</TableHead>
                  <TableHead className="text-right px-10 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { name: "Al-Barakah Meats", vertical: "Butchers", doc: "Slaughterhouse Proof", status: "Critical", loc: "London, UK", color: "bg-rose-500" },
                  { name: "Noor Beauty Labs", vertical: "Cosmetics", doc: "Lab Purity Report", status: "High", loc: "Dubai, UAE", color: "bg-orange-500" },
                  { name: "Royal Suites", vertical: "Hotels", doc: "Privacy Charter v2", status: "Routine", loc: "New York, US", color: "bg-blue-500" },
                  { name: "Iman Knowledge", vertical: "Education", doc: "Curriculum Vetting", status: "Routine", loc: "London, UK", color: "bg-emerald-500" },
                ].map((item, i) => (
                  <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors group">
                    <TableCell className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center text-white font-black shadow-lg", item.color)}>
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-black text-foreground text-sm tracking-tight">{item.name}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black text-primary uppercase">{item.vertical}</span>
                            <span className="text-[9px] font-bold text-muted-foreground uppercase">• {item.loc}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-[11px] font-bold text-muted-foreground italic">{item.doc}</TableCell>
                    <TableCell className="text-center">
                      <Badge className={cn(
                        "rounded-full px-4 py-1 text-[8px] font-black uppercase border-none",
                        item.status === 'Critical' ? 'bg-rose-600 text-white animate-pulse shadow-lg shadow-rose-200' : 
                        item.status === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-muted text-muted-foreground'
                      )}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right px-10">
                      <Button size="icon" variant="ghost" className="rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-muted hover:bg-primary hover:text-white"><ArrowRightLeft className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Global Activity Map & Insights */}
        <div className="lg:col-span-5 space-y-8">
          <Card className="rounded-[3rem] border-none shadow-sm bg-card p-10 relative overflow-hidden h-[300px]">
            <Globe className="absolute -top-10 -right-10 h-64 w-64 opacity-5 text-foreground" />
            <div className="relative z-10 space-y-6">
              <div className="space-y-1">
                <CardTitle className="text-xl font-black">Global Traffic Density</CardTitle>
                <p className="text-sm font-medium text-muted-foreground">Activity heatmap across active nodes.</p>
              </div>
              <div className="space-y-4">
                {[
                  { region: "Middle East", activity: 85 },
                  { region: "Europe", activity: 62 },
                  { region: "South Asia", activity: 78 },
                ].map((r, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      <span>{r.region}</span>
                      <span className="text-primary">{r.activity}% flux</span>
                    </div>
                    <Progress value={r.activity} className="h-1 bg-muted" />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Live Operational Terminal */}
          <Card className="rounded-[3rem] border-none shadow-sm bg-zinc-900 text-emerald-400 p-10 relative overflow-hidden">
            <Terminal className="absolute -bottom-4 -right-4 h-24 w-24 opacity-10 text-emerald-400" />
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-2 border-b border-emerald-400/20 pb-4">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400/80">Live Operations Feed</h3>
              </div>
              <div className="space-y-2 font-mono text-[10px] leading-relaxed">
                <p className="opacity-60">[14:24:02] <span className="text-white">NODE_CREATE:</span> Family Tree Branch #882 verified in UK.</p>
                <p className="opacity-60">[14:23:45] <span className="text-white">AUDIT_PASS:</span> 'Istanbul Bistro' hygiene check complete.</p>
                <p className="opacity-100 animate-pulse">[14:23:12] <span className="text-white">SECURITY_ALERT:</span> Blocked anomalous KYC attempt from IP 192.168.x.x</p>
                <p className="opacity-60">[14:22:50] <span className="text-white">SYS_SYNC:</span> Prayer time algorithm updated for 42 masjids.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Floating Return Button */}
      <Link href="/">
        <button className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group border-4 border-white active:scale-95">
          <div className="flex flex-col items-center">
            <ExternalLink className="h-6 w-6" />
            <span className="text-[8px] font-black uppercase mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Exit Panel</span>
          </div>
        </button>
      </Link>
    </div>
  )
}
