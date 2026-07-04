
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Search, Filter, MoreVertical, 
  ShieldCheck, Star, ArrowUpRight,
  BarChart3, MapPin, Users, Download,
  MessageSquare, Clock, CheckCircle2,
  Tag, Plus, Heart, Activity, 
  FileText, Landmark, Calendar, Eye, 
  XCircle, Trash2, Edit2, ShieldAlert,
  Coins, Wallet, Layers, Award, Percent,
  TrendingUp, Scale, Settings, ExternalLink, Gift,
  Sparkles, Ticket, LayoutGrid, Smartphone, 
  ClipboardList, History, Zap, Shield,
  Wifi, Server, Cpu, Terminal, Building
} from "lucide-react"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function SuperAdminEventManagement() {
  const [activeTab, setActiveTab] = React.useState("dashboard")
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const MOCK_VENUES = [
    { id: "VEN-001", name: "The Grand Halal Ballroom", city: "Manhattan, NY", type: "Banquet Hall", status: "Verified", rating: 4.9, capacity: 500 },
    { id: "VEN-002", name: "Heritage Garden Spaces", city: "Brooklyn, NY", type: "Outdoor", status: "Verified", rating: 4.7, capacity: 250 },
    { id: "VEN-003", name: "Royal Plaza Suites", city: "Queens, NY", type: "Hotel Ballroom", status: "Pending", rating: 4.8, capacity: 1000 },
    { id: "VEN-004", name: "Crescent Community Center", city: "Jersey City, NJ", type: "Civic Space", status: "Verified", rating: 4.5, capacity: 150 },
  ];

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen pb-24 selection:bg-primary/10">
      
      {/* System Integrity Ribbon */}
      <div className="flex flex-wrap items-center gap-6 px-6 py-3 bg-zinc-900 rounded-3xl shadow-2xl border border-white/10 overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-transparent opacity-50" />
        <div className="flex items-center gap-3 relative z-10">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="text-[10px] font-black text-white uppercase tracking-widest">Events Network Live</span>
        </div>
        <div className="h-4 w-px bg-card/10 mx-2" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Wifi className="h-3 w-3" />
            <span className="text-[10px] font-bold uppercase">Escrow Sync: 12ms</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Server className="h-3 w-3" />
            <span className="text-[10px] font-bold uppercase">Nodes: 42 Active</span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4 relative z-10">
          <Badge variant="outline" className="border-white/20 text-white text-[8px] font-black uppercase tracking-tighter">Ticketing: Operational</Badge>
        </div>
      </div>

      {/* Control Room Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-purple-600 font-black uppercase tracking-widest text-[10px]">
            <Zap className="h-3 w-3 fill-current" /> Tactical Oversight
          </div>
          <h1 className="text-5xl font-black font-headline text-foreground tracking-tighter">EVENTS & CONFERENCES</h1>
          <p className="text-muted-foreground font-medium text-lg italic">Platform oversight for halls, ticketing, and Shariah-compliant hosting.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-2xl px-6 font-black border-2 h-12 gap-2 bg-card hover:bg-muted shadow-sm">
            <History className="h-4 w-4" /> Operations Log
          </Button>
          <Button className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl px-8 font-black shadow-2xl h-12 gap-2">
            <Settings className="h-4 w-4" /> Vertical Config
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="flex items-center justify-between bg-card p-2 rounded-2xl shadow-sm border overflow-x-auto no-scrollbar">
          <TabsList className="bg-transparent h-auto p-0 gap-1 flex justify-start min-w-max">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
              { id: "all", label: "Venue Registry", icon: Building },
              { id: "verification", label: "Trust Audits", icon: ShieldCheck },
              { id: "governance", label: "Compliance", icon: Scale },
              { id: "reviews", label: "Moderation", icon: ShieldAlert },
              { id: "billing", label: "Settlements", icon: Wallet }
            ].map((tab) => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id} 
                className="rounded-xl data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600 px-6 py-2.5 font-bold transition-all shadow-none border-none whitespace-nowrap uppercase text-[10px] tracking-widest gap-2"
              >
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* DASHBOARD TAB */}
        <TabsContent value="dashboard" className="space-y-8 m-0 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Active Listings", value: "210", trend: "+5.4%", sub: "Monthly Growth", icon: Building, color: "text-purple-600", bg: "bg-purple-50" },
              { label: "Live Bookings", value: "12.4k", trend: "High", sub: "This Quarter", icon: Ticket, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Escrow Balance", value: "₹42.8M", trend: "Secured", sub: "Platform Reserve", icon: Wallet, color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Compliance Rate", value: "98%", trend: "Optimum", sub: "Audit Accuracy", icon: ShieldCheck, color: "text-amber-600", bg: "bg-amber-50" },
            ].map((stat, i) => (
              <Card key={i} className="border-none shadow-sm rounded-[2.5rem] p-8 bg-card group hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none">{stat.label}</span>
                    <div className="text-4xl font-black text-foreground tracking-tighter">{stat.value}</div>
                  </div>
                  <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="space-y-0.5 relative z-10">
                  <p className={cn("text-xs font-black uppercase", stat.color)}>{stat.trend}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">{stat.sub}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <Card className="lg:col-span-8 rounded-[3rem] border-none shadow-sm bg-card overflow-hidden">
              <CardHeader className="p-10 border-b bg-rose-50/20 flex flex-row items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-2xl font-black text-rose-600 flex items-center gap-2">
                    <ShieldAlert className="h-6 w-6" /> High-Risk Moderation
                  </CardTitle>
                  <p className="text-sm text-muted-foreground font-medium italic">Review flagged events or venue privacy protocol violations.</p>
                </div>
                <Button size="sm" className="bg-rose-600 hover:bg-rose-700 rounded-xl font-black text-[10px] uppercase tracking-widest h-10 px-6 text-white group shadow-lg shadow-rose-200">
                  Open Audit Queue <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-rose-50/5">
                    <TableRow className="border-none">
                      <TableHead className="px-10 h-14 font-black uppercase text-[10px] tracking-widest text-rose-400">Event / Venue</TableHead>
                      <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-rose-400">Violation Type</TableHead>
                      <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-rose-400 text-center">Urgency</TableHead>
                      <TableHead className="text-right px-10 h-14 font-black uppercase text-[10px] tracking-widest text-rose-400">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "Global Halal Expo", venue: "ExCel Center", type: "Security Protocol", level: "Critical", status: "In Review" },
                      { name: "Private Nikah Gala", venue: "The Grand Hall", type: "Privacy Breach", level: "Moderate", status: "Pending" },
                    ].map((item, i) => (
                      <TableRow key={i} className="border-rose-50 hover:bg-rose-50/5 transition-colors">
                        <TableCell className="px-10 py-6">
                          <p className="font-black text-foreground text-sm tracking-tight">{item.name}</p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">{item.venue}</p>
                        </TableCell>
                        <TableCell className="font-bold text-muted-foreground text-xs italic">{item.type}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={cn(
                            "border-none px-3 font-black text-[9px] uppercase",
                            item.level === 'Critical' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
                          )}>
                            {item.level}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right px-10 font-black text-muted-foreground text-[10px] uppercase">
                          {item.status}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="lg:col-span-4 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-10 relative overflow-hidden h-full flex flex-col justify-between">
                <Terminal className="absolute -bottom-4 -right-4 h-32 w-32 opacity-10 text-purple-400" />
                <div className="relative z-10 space-y-6">
                  <div className="h-14 w-14 rounded-2xl bg-card/10 flex items-center justify-center text-purple-400 border border-white/10 shadow-3xl">
                    <History className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black tracking-tight leading-tight">Operational Feed</h3>
                    <div className="space-y-2 font-mono text-[10px] leading-relaxed opacity-60">
                      <p>[14:24] <span className="text-white">VENUE_CERT:</span> 'Grand Ballroom' passed audit.</p>
                      <p>[14:23] <span className="text-white">ESCROW_HOLD:</span> ₹1.2M locked for Expo 2024.</p>
                      <p className="text-rose-400 animate-pulse">[14:22] <span className="text-white">ALERT:</span> Privacy breach reported in NY.</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-2xl h-14 font-black uppercase text-xs tracking-widest shadow-xl relative z-10">
                  Full System Logs
                </Button>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Other Tabs Placeholder */}
        {["all", "verification", "governance", "reviews", "billing"].map((tab) => (
          <TabsContent key={tab} value={tab} className="animate-in fade-in duration-500 m-0">
            <Card className="rounded-[3rem] border-none shadow-sm bg-card p-32 text-center space-y-8">
              <div className="h-24 w-24 rounded-[2rem] bg-muted flex items-center justify-center text-muted-foreground mx-auto shadow-inner">
                <Settings className="h-12 w-12 animate-spin-slow" />
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-black text-foreground uppercase tracking-tighter">{tab.replace(/-/g, ' ')} Tactical Panel</h3>
                <p className="text-muted-foreground font-medium max-w-md mx-auto italic text-lg leading-relaxed">
                  Advanced administrative control for the global events vertical and institutional standards.
                </p>
              </div>
              <Button variant="outline" className="rounded-2xl border-2 font-black px-12 h-14 uppercase text-xs tracking-[0.2em] hover:bg-muted">Sync Registry</Button>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Floating Return Button */}
      <Link href="/admin/dashboard">
        <button className="fixed bottom-8 right-8 w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group border-4 border-white active:scale-95">
          <div className="flex flex-col items-center">
            <ExternalLink className="h-6 w-6" />
            <span className="text-[8px] font-black uppercase mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Exit Panel</span>
          </div>
        </button>
      </Link>
    </div>
  )
}
