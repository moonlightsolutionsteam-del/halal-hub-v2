
"use client"

import * as React from "react"
import { useAdminCategory } from "@/hooks/use-admin-category"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function SuperAdminEventManagement() {
  const [activeTab, setActiveTab] = React.useState("dashboard")
  const [mounted, setMounted] = React.useState(false)
  const cat = useAdminCategory("Events & Venues")

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen pb-24 selection:bg-primary/10">

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
          <h1 className="text-3xl sm:text-5xl font-black font-headline text-foreground tracking-tighter">EVENTS & CONFERENCES</h1>
          <p className="text-muted-foreground font-medium text-sm sm:text-lg italic">Platform oversight for halls, ticketing, and Shariah-compliant hosting.</p>
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
              { id: "governance", label: "Halal Governance", icon: Scale },
              { id: "reviews", label: "Moderation", icon: ShieldAlert },
              { id: "offers", label: "Offers", icon: Tag },
              { id: "loyalty", label: "Loyalty", icon: Coins },
              { id: "certificates", label: "Certificates", icon: Award },
              { id: "categories", label: "Categories", icon: Layers },
              { id: "billing", label: "Settlements", icon: Wallet },
            ].map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="rounded-xl data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600 px-5 py-2.5 font-bold transition-all shadow-none border-none whitespace-nowrap uppercase text-[10px] tracking-widest gap-2"
              >
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* DASHBOARD TAB */}
        <TabsContent value="dashboard" className="space-y-8 m-0 animate-in fade-in duration-500">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[
              { label: "Active Listings", value: cat.loading ? "—" : String(cat.total), trend: `${cat.active} active`, sub: "Monthly Growth", icon: Building, color: "text-purple-600", bg: "bg-purple-50" },
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
                      <p>[14:24] <span className="text-white">VENUE_CERT:</span> &apos;Grand Ballroom&apos; passed audit.</p>
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

        {/* ALL VENUES TAB */}
        <TabsContent value="all" className="animate-in fade-in duration-500 m-0">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden">
            <CardHeader className="p-8 border-b space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search venues by name, ID or city..." className="pl-9 h-12 rounded-2xl bg-muted border-none font-medium" />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="rounded-xl h-12 gap-2 border-2 font-bold"><Filter className="h-4 w-4" /> Filters</Button>
                  <Button className="bg-purple-600 hover:bg-purple-700 rounded-2xl h-12 px-8 font-black text-white shadow-lg">
                    <Plus className="mr-2 h-4 w-4" /> Add Venue
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Venue Identity</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Location</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground text-center">Trust Rating</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
                    <TableHead className="text-right px-8 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cat.loading ? (
                    <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
                  ) : cat.businesses.length === 0 ? (
                    <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No venues found.</TableCell></TableRow>
                  ) : cat.businesses.map((biz) => (
                    <TableRow key={biz.id} className="border-border hover:bg-muted/50 transition-colors group">
                      <TableCell className="px-8 py-5">
                        <p className="font-black text-foreground text-base">{biz.name}</p>
                        <p className="text-[10px] font-bold text-purple-600 uppercase tracking-tighter">{biz.id.slice(0, 8).toUpperCase()} • {biz.subcategory ?? "—"}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                          <MapPin className="h-3 w-3" /> {[biz.city, biz.country].filter(Boolean).join(", ") || "—"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-1.5 font-black text-sm">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {biz.rating ?? "—"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          biz.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 font-black text-[9px] px-3' : biz.status === 'rejected' ? 'bg-red-50 text-red-600 border-red-200 font-black text-[9px] px-3' : 'bg-amber-50 text-amber-600 border-amber-200 font-black text-[9px] px-3'
                        }>
                          {biz.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-8">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="icon" variant="ghost" className="rounded-xl"><Edit2 className="h-4 w-4 text-muted-foreground" /></Button>
                          <Button size="icon" variant="ghost" className="rounded-xl hover:text-rose-600 transition-colors"><Trash2 className="h-4 w-4 text-muted-foreground" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* VERIFICATION TAB */}
        <TabsContent value="verification" className="animate-in fade-in duration-500 m-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden">
                <CardHeader className="p-8 border-b">
                  <CardTitle className="text-xl font-black">Audit Queue</CardTitle>
                  <CardDescription className="font-medium">Venues awaiting document verification and privacy audits.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableBody>
                      {[
                        { name: "Grand Imperial Hall", docs: 5, date: "2 mins ago", type: "Initial Audit" },
                        { name: "Garden of Paradise", docs: 3, date: "45 mins ago", type: "License Renewal" },
                        { name: "Hotel Zenith Banquet", docs: 8, date: "3 hours ago", type: "Full Compliance" },
                      ].map((item, i) => (
                        <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors">
                          <TableCell className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner shrink-0">
                                <FileText className="h-6 w-6" />
                              </div>
                              <div>
                                <p className="font-black text-foreground text-base">{item.name}</p>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{item.date}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="font-black text-[9px] uppercase px-3">
                              {item.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                              <Layers className="h-3.5 w-3.5" /> {item.docs} Documents
                            </div>
                          </TableCell>
                          <TableCell className="text-right px-8">
                            <Button className="bg-purple-600 hover:bg-purple-700 rounded-full font-black text-[10px] uppercase tracking-widest h-9 px-6 text-white shadow-md">Begin Review</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-4 space-y-6">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 space-y-6 relative overflow-hidden">
                <ShieldCheck className="absolute -top-4 -right-4 h-24 w-24 opacity-10" />
                <div className="space-y-2 relative z-10">
                  <h3 className="text-xl font-black">Audit SLA Alert</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    12 applications have been in the queue for more than 48 hours. Prioritizing older audits improves partner onboarding speed.
                  </p>
                </div>
                <Button variant="secondary" className="w-full rounded-xl font-black text-xs h-12 shadow-2xl">Prioritize Queue</Button>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* HALAL GOVERNANCE TAB */}
        <TabsContent value="governance" className="animate-in fade-in duration-500 m-0">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10">
            <div className="space-y-10">
              <div className="space-y-2 border-b pb-6">
                <h3 className="text-3xl font-black text-foreground">Hosting & Privacy Protocols</h3>
                <p className="text-muted-foreground font-medium text-lg italic">Define global mandatory compliance criteria for event listing partners.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  {[
                    { label: "Mandatory Gender Segregation Capability", active: true },
                    { label: "On-site Permanent Wudu Stations", active: true },
                    { label: "Verified Halal-Only In-house Kitchen", active: true },
                    { label: "Strict No-Alcohol Policy On-site", active: true },
                    { label: "Female Staff-Only Serving Teams", active: false },
                    { label: "Internal Prayer Hall Access", active: true },
                  ].map((rule, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-muted rounded-2xl border border-transparent hover:border-purple-200 transition-all cursor-pointer shadow-sm">
                      <span className="font-bold text-foreground text-sm">{rule.label}</span>
                      <Badge className={rule.active ? "bg-emerald-500 text-white font-black text-[8px]" : "bg-muted-foreground/20 text-muted-foreground font-black text-[8px]"}>
                        {rule.active ? "MANDATORY" : "OPTIONAL"}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="bg-zinc-900 rounded-[2.5rem] p-10 text-white space-y-8 relative overflow-hidden flex flex-col justify-between">
                  <Scale className="absolute -top-4 -right-4 h-32 w-32 opacity-10" />
                  <div className="space-y-4 relative z-10">
                    <h4 className="text-2xl font-black text-purple-400 uppercase tracking-tighter">Venue Charter v2.4</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      All new venues must digitally sign the updated privacy charter before going live. This version includes updated guidelines for mixed-use ballroom spaces.
                    </p>
                  </div>
                  <div className="space-y-4 relative z-10">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 rounded-xl font-black text-[10px] h-12 uppercase tracking-widest shadow-xl">Update Charter Template</Button>
                    <p className="text-[10px] text-center text-zinc-500 font-bold">Last Updated: Sept 12, 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* REVIEWS / MODERATION TAB */}
        <TabsContent value="reviews" className="animate-in fade-in duration-500 m-0">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden">
            <CardHeader className="p-8 border-b flex flex-row items-center justify-between bg-amber-50/10">
              <div className="space-y-1">
                <CardTitle className="text-xl font-black">Community Feedback</CardTitle>
                <CardDescription className="font-medium italic">Moderate guest reviews and reported safety flags.</CardDescription>
              </div>
              <Badge className="bg-amber-50 text-amber-600 border-none font-black px-4 h-8 flex items-center text-[9px] tracking-widest uppercase">15 Pending Reports</Badge>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Report ID</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Venue & Content</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground text-center">Flag Reason</TableHead>
                    <TableHead className="text-right px-8 h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: "REP-901", venue: "The Grand Hall", content: "Review #8821", reason: "Inappropriate Language", date: "2h ago" },
                    { id: "REP-902", venue: "Royal Plaza", content: "Photo #1042", reason: "Privacy Violation", date: "5h ago" },
                  ].map((rep, i) => (
                    <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors group">
                      <TableCell className="px-8 py-6">
                        <div className="font-black text-foreground text-xs">{rep.id}</div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase">{rep.date}</div>
                      </TableCell>
                      <TableCell>
                        <p className="font-black text-foreground text-base">{rep.content}</p>
                        <p className="text-[10px] font-bold text-purple-600 uppercase">at {rep.venue}</p>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="border-rose-100 text-rose-600 bg-rose-50 font-black text-[9px] px-3 uppercase tracking-tighter">
                          {rep.reason}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-8">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="outline" className="rounded-xl font-black text-[10px] border-2 uppercase h-9">Dismiss</Button>
                          <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-black text-[10px] uppercase h-9 shadow-lg">Take Action</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* OFFERS TAB */}
        <TabsContent value="offers" className="animate-in fade-in duration-500 m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Winter Wedding Discount", code: "WINTER2024", discount: "₹25,000 OFF", active: true, claims: 12 },
              { title: "Early Bird Expo Booth", code: "EXPOEARLY", discount: "15% OFF", active: true, claims: 45 },
              { title: "Corporate Seminar Deal", code: "CORP24", discount: "Free A/V Package", active: false, claims: 8 },
            ].map((offer, i) => (
              <Card key={i} className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden flex flex-col justify-between border-2 border-transparent hover:border-purple-100 transition-all group">
                <CardHeader className="p-8 pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner group-hover:scale-110 transition-transform">
                      <Tag className="h-6 w-6" />
                    </div>
                    <Badge className={offer.active ? "bg-emerald-50 text-emerald-600 border-none font-black text-[8px]" : "bg-muted text-muted-foreground border-none font-black text-[8px]"}>
                      {offer.active ? "ACTIVE" : "EXPIRED"}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-black text-foreground leading-tight">{offer.title}</h3>
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-[10px] font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md uppercase tracking-tighter">{offer.code}</span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">• {offer.claims} Claims</span>
                  </div>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <p className="text-2xl font-black text-foreground">{offer.discount}</p>
                </CardContent>
                <CardFooter className="p-8 border-t bg-muted/30 flex gap-2">
                  <Button variant="outline" className="flex-1 rounded-xl h-10 font-black text-[10px] uppercase tracking-widest border-2">Edit</Button>
                  <Button size="icon" variant="ghost" className="rounded-xl h-10 w-10 text-rose-500 hover:bg-rose-50"><Trash2 className="h-4 w-4" /></Button>
                </CardFooter>
              </Card>
            ))}
            <button className="rounded-[2.5rem] border-4 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center p-12 text-center gap-4 hover:bg-card hover:border-purple-200 transition-all cursor-pointer group min-h-[300px]">
              <div className="h-16 w-16 bg-card rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Plus className="h-8 w-8 text-purple-600" />
              </div>
              <div className="space-y-1">
                <p className="font-black text-xl text-foreground">New Campaign</p>
                <p className="text-sm text-muted-foreground font-medium">Create seasonal or targeted deals</p>
              </div>
            </button>
          </div>
        </TabsContent>

        {/* LOYALTY TAB */}
        <TabsContent value="loyalty" className="animate-in fade-in duration-500 m-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-purple-600 text-white p-10 relative overflow-hidden">
                <Coins className="absolute -top-4 -right-4 h-48 w-48 opacity-10" />
                <div className="relative z-10 space-y-8">
                  <div className="space-y-2">
                    <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Vertical Redemption Rate</p>
                    <h2 className="text-7xl font-black tracking-tighter">68.4%</h2>
                    <div className="flex items-center gap-2 text-sm font-bold bg-white/20 w-fit px-4 py-1.5 rounded-full backdrop-blur-md">
                      <TrendingUp className="h-4 w-4" /> +12% this month
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-white/10 pt-8">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase opacity-60 tracking-widest leading-none mb-1">Coins Issued</p>
                      <p className="text-2xl font-black">1.2M</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase opacity-60 tracking-widest leading-none mb-1">Redemptions</p>
                      <p className="text-2xl font-black">840k</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase opacity-60 tracking-widest leading-none mb-1">Avg. Save</p>
                      <p className="text-2xl font-black">₹450</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="lg:col-span-4 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-foreground">Loyalty Tiers</h3>
                  <p className="text-sm text-muted-foreground font-medium">Manage how users earn Hub Coins for venue bookings.</p>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Standard Earn", rate: "1 Coin / ₹100" },
                    { label: "Verified Partner Multiplier", rate: "1.5x Multiplier" },
                    { label: "Early Bird Bonus", rate: "500 Flat Coins" },
                  ].map((tier, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-2xl border">
                      <span className="text-xs font-black text-foreground uppercase tracking-tighter">{tier.label}</span>
                      <span className="text-sm font-black text-purple-600">{tier.rate}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-12 font-black uppercase text-[10px] tracking-widest">Adjust Ratios</Button>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* CERTIFICATES TAB */}
        <TabsContent value="certificates" className="animate-in fade-in duration-500 m-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden">
              <CardHeader className="p-8 border-b bg-muted/30 flex flex-row items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-black">Trust Assets Registry</CardTitle>
                  <CardDescription className="font-medium italic">Track physical and digital certification distribution.</CardDescription>
                </div>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 rounded-xl font-black text-xs h-10 px-6 text-white shadow-lg">
                  Generate Batch <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow className="border-none">
                      <TableHead className="px-8 h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Partner</TableHead>
                      <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Asset Type</TableHead>
                      <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground text-center">Status</TableHead>
                      <TableHead className="text-right px-8 h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Dispatched</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "The Grand Hall", type: "Digital Badge + QR Kit", status: "Active", date: "Nov 01" },
                      { name: "Heritage Spaces", type: "Privacy Charter Seal", status: "In Transit", date: "Oct 28" },
                      { name: "Crescent Center", type: "Digital Certificate", status: "Active", date: "Oct 15" },
                    ].map((item, i) => (
                      <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors">
                        <TableCell className="px-8 py-5 font-bold text-foreground text-sm">{item.name}</TableCell>
                        <TableCell className="font-bold text-muted-foreground text-xs italic">{item.type}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={item.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-none px-3 font-black text-[8px]' : 'bg-blue-50 text-blue-600 border-none px-3 font-black text-[8px]'}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right px-8 font-black text-muted-foreground text-[10px] uppercase">
                          {item.date}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <div className="space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-6">
                <h3 className="text-xl font-black text-foreground">Asset Inventory</h3>
                <div className="space-y-4">
                  {[
                    { label: "Physical QR Kits", count: 124 },
                    { label: "Window Decals", count: 85 },
                    { label: "Charter Plaques", count: 42 },
                  ].map((inv, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-2xl border">
                      <span className="text-xs font-black text-foreground uppercase tracking-widest">{inv.label}</span>
                      <span className="text-lg font-black text-foreground">{inv.count}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full rounded-xl h-12 font-black uppercase text-[10px] tracking-widest border-2">Order Supplies</Button>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* CATEGORIES TAB */}
        <TabsContent value="categories" className="animate-in fade-in duration-500 m-0">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden">
            <CardHeader className="p-8 border-b flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-black">Venue Taxonomy</CardTitle>
                <CardDescription className="font-medium">Control primary categories and listing tags for the events vertical.</CardDescription>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700 rounded-full font-black text-xs px-8 h-10 text-white shadow-lg">
                <Plus className="mr-2 h-4 w-4" /> Add Category
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Category Name</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Active Venues</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Search Trend</TableHead>
                    <TableHead className="text-right px-8 h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Banquet Halls", count: 124, trend: "Rising" },
                    { name: "Outdoor Gardens", count: 45, trend: "Steady" },
                    { name: "Hotel Ballrooms", count: 32, trend: "High Demand" },
                    { name: "Civic Spaces", count: 12, trend: "Stable" },
                  ].map((item, i) => (
                    <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors group">
                      <TableCell className="px-8 py-5 font-black text-foreground text-sm uppercase tracking-tight">{item.name}</TableCell>
                      <TableCell className="font-bold text-muted-foreground text-xs">{item.count} establishments</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={item.trend.includes('Rising') || item.trend.includes('High') ? 'bg-emerald-50 text-emerald-600 border-none font-black text-[8px] px-3' : 'bg-muted text-muted-foreground border-none font-black text-[8px] px-3'}>
                          {item.trend}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-8">
                        <Button size="icon" variant="ghost" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"><Edit2 className="h-4 w-4 text-muted-foreground" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* WALLET & BILLING TAB */}
        <TabsContent value="billing" className="animate-in fade-in duration-500 m-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10 space-y-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-foreground">Vertical Financial Health</h3>
                  <Button variant="ghost" className="font-black text-xs text-purple-600 uppercase tracking-widest">Billing Policy PDF <ExternalLink className="ml-2 h-4 w-4" /></Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-muted rounded-[2rem] space-y-2 border shadow-inner">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Avg. Platform Fee</p>
                    <p className="text-4xl font-black text-foreground">7.5% <span className="text-sm font-bold text-muted-foreground italic">flat</span></p>
                    <p className="text-xs font-bold text-emerald-600">Applied to digital ticket sales</p>
                  </div>
                  <div className="p-8 bg-muted rounded-[2rem] space-y-2 border shadow-inner">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Escrow Holdings</p>
                    <p className="text-4xl font-black text-foreground">₹18.4M</p>
                    <p className="text-xs font-bold text-muted-foreground uppercase">Awaiting post-event release</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-black uppercase text-muted-foreground tracking-widest">Recent Settlements</h4>
                  <div className="divide-y border rounded-2xl overflow-hidden">
                    {[
                      { id: "SET-991", venue: "The Grand Hall", amount: "₹45,000", status: "Released", date: "Nov 01" },
                      { id: "SET-992", venue: "Heritage Spaces", amount: "₹12,200", status: "Processing", date: "Oct 30" },
                    ].map((set, i) => (
                      <div key={i} className="p-4 bg-card flex items-center justify-between text-xs font-bold">
                        <span className="text-muted-foreground">{set.id}</span>
                        <span className="text-foreground">{set.venue}</span>
                        <span className="text-purple-600">{set.amount}</span>
                        <Badge className={set.status === 'Released' ? 'bg-emerald-50 text-emerald-600 border-none' : 'bg-blue-50 text-blue-600 border-none'}>{set.status}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
            <div className="lg:col-span-4 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 space-y-8 relative overflow-hidden flex flex-col justify-between h-full">
                <Wallet className="absolute -top-4 -right-4 h-32 w-32 opacity-10 text-purple-400" />
                <div className="relative z-10 space-y-4">
                  <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">System Reserve</p>
                  <h2 className="text-6xl font-black tracking-tighter text-purple-400">₹42.8M</h2>
                  <p className="text-xs font-bold text-zinc-400 uppercase leading-relaxed">
                    Vertical liquidity reserve for venue payouts and refund mitigation.
                  </p>
                </div>
                <div className="space-y-4 relative z-10">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-14 font-black uppercase text-xs tracking-widest shadow-xl">Financial Dashboard</Button>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 rounded-xl h-14 font-black uppercase text-xs tracking-widest">Update Payout Rules</Button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
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
