
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, Filter, MoreVertical, 
  ShieldCheck, Star, ArrowUpRight,
  BarChart3, Users, Download,
  MessageSquare, Clock, CheckCircle2,
  Tag, Plus, Heart, Activity, 
  FileText, Landmark, Calendar, Eye, 
  XCircle, Trash2, Edit2, ShieldAlert,
  Coins, Wallet, Layers, Award, Percent,
  TrendingUp, Scale, Settings, ExternalLink, Gift,
  PenTool, Video, Mic, Play, Film, Globe,
  Zap, Share2, HeartPulse, UserPlus, Crown,
  AlertTriangle, Target, Megaphone, Gauge,
  Briefcase, BarChart, Sliders, LayoutGrid,
  Image as ImageIcon
} from "lucide-react"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function SuperAdminCreatorsControlTower() {
  const [activeTab, setActiveTab] = React.useState("dashboard")

  const MOCK_CREATORS = [
    { id: "CRT-001", name: "Shaykh Hamza", username: "@hamza_legacy", category: "Scholar", reach: "250k", score: 98, tier: "Elite", status: "Active", earnings: "₹4.2M" },
    { id: "CRT-002", name: "The Halal Foodie", username: "@halal_eats", category: "Influencer", reach: "120k", score: 85, tier: "Gold", status: "Active", earnings: "₹1.8M" },
    { id: "CRT-003", name: "Amina's Art", username: "@aminart", category: "Artist", reach: "45k", score: 72, tier: "Silver", status: "Vetting", earnings: "₹45k" },
    { id: "CRT-004", name: "Zaid's Wellness", username: "@zaid_fit", category: "Educator", reach: "15k", score: 64, tier: "Silver", status: "Active", earnings: "₹12k" },
  ];

  const MOCK_CONTENT = [
    { id: "POST-101", creator: "@hamza_legacy", type: "Video", date: "2h ago", flag: "None", status: "Approved" },
    { id: "POST-102", creator: "@halal_eats", type: "Reel", date: "5h ago", flag: "None", status: "Pending" },
    { id: "POST-103", creator: "@user_99", type: "Image", date: "1d ago", flag: "Non-Halal", status: "Flagged" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-24">
      {/* Control Tower Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600 font-black uppercase tracking-[0.2em] text-[10px]">
            <Gauge className="h-3 w-3" /> System Control Tower
          </div>
          <h1 className="text-4xl font-black font-headline text-slate-900 uppercase tracking-tighter">Creator Ecosystem</h1>
          <p className="text-muted-foreground font-medium text-lg italic max-w-2xl">Centralized oversight for quality control, campaigns, financial settlements, and platform health.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-2xl px-6 font-black border-2 h-12 gap-2 bg-white">
            <Megaphone className="h-4 w-4" /> Broadcast
          </Button>
          <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-2xl px-8 font-black shadow-2xl h-12 gap-2">
            <Settings className="h-4 w-4" /> Config
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="flex items-center justify-between bg-white p-2 rounded-2xl shadow-sm border overflow-x-auto no-scrollbar">
          <TabsList className="bg-transparent h-auto p-0 gap-1 flex justify-start min-w-max">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
              { id: "directory", label: "Directory", icon: Users },
              { id: "moderation", label: "Moderation", icon: ShieldCheck },
              { id: "campaigns", label: "Campaigns", icon: Target },
              { id: "finance", label: "Financials", icon: Wallet },
              { id: "economy", label: "Coin Economy", icon: Coins },
              { id: "safety", label: "Fraud & Risk", icon: ShieldAlert },
              { id: "growth", label: "Growth Tools", icon: TrendingUp },
              { id: "config", label: "System Config", icon: Sliders }
            ].map((tab) => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id} 
                className="rounded-xl data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 px-6 py-2.5 font-bold transition-all shadow-none border-none whitespace-nowrap uppercase text-[10px] tracking-widest gap-2"
              >
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* 3. SUPER ADMIN DASHBOARD */}
        <TabsContent value="dashboard" className="space-y-8 m-0 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Total Creators", value: "4,250", trend: "+12.4%", sub: "Growth Rate", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Active Content", value: "842", trend: "High", sub: "Daily Uploads", icon: Video, color: "text-purple-600", bg: "bg-purple-50" },
              { label: "Total Payouts", value: "₹8.4M", trend: "92%", sub: "Completion Rate", icon: Wallet, color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Coin Circulation", value: "1.2M", trend: "Optimal", sub: "Economy Health", icon: Coins, color: "text-amber-600", bg: "bg-amber-50" },
            ].map((stat, i) => (
              <Card key={i} className="border-none shadow-sm rounded-[2rem] p-8 bg-white group hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{stat.label}</span>
                    <div className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</div>
                  </div>
                  <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <p className={cn("text-xs font-black uppercase", stat.color)}>{stat.trend}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{stat.sub}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="p-8 border-b flex flex-row items-center justify-between bg-slate-50/30">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-black">Creator Performance Matrix</CardTitle>
                  <CardDescription className="font-medium italic">Ranking engagement metrics vs campaign success across tiers.</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="rounded-xl font-black text-xs h-9 bg-white">Full Analytics</Button>
              </CardHeader>
              <CardContent className="p-8 h-[300px] flex items-center justify-center text-slate-300 italic font-medium">
                [High-Fidelity Interaction Chart: Engagement vs Consistency]
              </CardContent>
            </Card>

            <div className="space-y-6">
              <h3 className="text-lg font-black text-slate-900 px-2 uppercase tracking-tighter">Top Earners (MTD)</h3>
              <div className="space-y-4">
                {MOCK_CREATORS.slice(0, 3).map((c, i) => (
                  <Card key={i} className="border-none shadow-sm rounded-2xl p-4 bg-white hover:bg-slate-900 hover:text-white transition-all group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-white/10 group-hover:text-blue-400 font-black text-xs shadow-inner">
                        #{i + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-black tracking-tight">{c.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">{c.username}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-emerald-500">{c.earnings}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Settled</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <Button variant="outline" className="w-full rounded-xl h-12 font-black border-2 text-[10px] uppercase tracking-widest bg-white">Full Revenue Report</Button>
            </div>
          </div>
        </TabsContent>

        {/* 4. CREATOR MANAGEMENT PANEL */}
        <TabsContent value="directory" className="animate-in fade-in duration-500 m-0">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="p-8 border-b space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input placeholder="Search name, username, city or ID..." className="pl-9 h-12 rounded-2xl bg-slate-50 border-none font-medium" />
                </div>
                <div className="flex items-center gap-3">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-32 h-12 rounded-xl bg-slate-50 border-none font-bold text-xs uppercase">
                      <SelectValue placeholder="Tier" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-none shadow-2xl">
                      <SelectItem value="all">All Tiers</SelectItem>
                      <SelectItem value="elite">Elite</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="silver">Silver</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="rounded-xl h-12 gap-2 border-2 font-bold px-6 bg-white"><Filter className="h-4 w-4" /> Filters</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 rounded-2xl h-12 px-8 font-black text-white shadow-lg shadow-blue-200">
                    <UserPlus className="mr-2 h-4 w-4" /> Register
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Creator Identity</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Reach / Stats</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-center">Int. Score</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400 text-center">Tier</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Status</TableHead>
                    <TableHead className="text-right px-8 h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Control</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_CREATORS.map((crt) => (
                    <TableRow key={crt.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors group">
                      <TableCell className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                            <AvatarImage src={`https://picsum.photos/seed/${crt.id}/100/100`} />
                            <AvatarFallback>{crt.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-black text-slate-800 text-base leading-tight">{crt.name}</p>
                            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">{crt.username} • {crt.category}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-black text-slate-900 text-sm">{crt.reach}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Followers</p>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="inline-flex flex-col items-center">
                          <span className="font-black text-sm text-blue-600">{crt.score}</span>
                          <Progress value={crt.score} className="h-1 w-12 bg-slate-100" />
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={cn(
                          "rounded-full px-3 text-[9px] font-black uppercase border-none",
                          crt.tier === 'Elite' ? 'bg-slate-900 text-amber-400' : 
                          crt.tier === 'Gold' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                        )}>
                          {crt.tier}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn(
                          "border-none font-black text-[9px] px-3 h-6 flex items-center w-fit",
                          crt.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        )}>
                          {crt.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-8">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <Button size="icon" variant="ghost" className="rounded-xl hover:bg-white hover:shadow-sm"><Edit2 className="h-4 w-4 text-slate-400" /></Button>
                          <Button size="icon" variant="ghost" className="rounded-xl hover:bg-white hover:shadow-sm"><ShieldAlert className="h-4 w-4 text-slate-400" /></Button>
                          <Button size="icon" variant="ghost" className="rounded-xl hover:bg-rose-50 hover:text-rose-600"><Trash2 className="h-4 w-4 text-slate-400" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 6. CONTENT MODERATION SYSTEM */}
        <TabsContent value="moderation" className="animate-in fade-in duration-500 m-0 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
                <CardHeader className="p-8 border-b bg-slate-50/30 flex flex-row items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-black">Moderation Queue</CardTitle>
                    <CardDescription className="italic">Review uploads for Shariah compliance and quality standards.</CardDescription>
                  </div>
                  <Badge className="bg-rose-50 text-rose-600 border-none font-black px-4 h-8 flex items-center uppercase text-[10px] tracking-widest">12 PENDING AUDITS</Badge>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableBody>
                      {MOCK_CONTENT.map((post, i) => (
                        <TableRow key={i} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                          <TableCell className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner group-hover:scale-110 transition-transform">
                                {post.type === 'Video' ? <Video className="h-6 w-6" /> : <ImageIcon className="h-6 w-6" />}
                              </div>
                              <div>
                                <p className="font-black text-slate-900 text-base">{post.creator}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{post.date} • {post.type}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Flag Category</p>
                              <Badge variant="outline" className={cn(
                                "text-[9px] font-black uppercase px-2 h-6 flex items-center w-fit border-none",
                                post.flag === 'None' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                              )}>
                                {post.flag}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-right px-8">
                            <div className="flex items-center justify-end gap-2">
                              <Button size="icon" variant="ghost" className="rounded-xl text-emerald-600 hover:bg-emerald-50 shadow-none"><CheckCircle2 className="h-5 w-5" /></Button>
                              <Button size="icon" variant="ghost" className="rounded-xl text-rose-600 hover:bg-rose-50 shadow-none"><XCircle className="h-5 w-5" /></Button>
                              <Button size="icon" variant="ghost" className="rounded-xl bg-slate-50 hover:bg-white shadow-none"><Eye className="h-5 w-5" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-4 space-y-6">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-8 space-y-6 relative overflow-hidden">
                <ShieldCheck className="absolute -top-4 -right-4 h-24 w-24 opacity-10 text-emerald-400" />
                <div className="space-y-2 relative z-10">
                  <h3 className="text-xl font-black">AI Auto-Mod Status</h3>
                  <p className="text-xs text-slate-400 leading-relaxed italic">
                    Platform AI is currently filtering 85% of base-level violations (low quality, clear spam). Human review required for theological nuance.
                  </p>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 relative z-10">
                  <span className="text-xs font-bold text-slate-400">System Accuracy</span>
                  <span className="text-sm font-black text-emerald-400">92.4%</span>
                </div>
                <Button variant="secondary" className="w-full rounded-xl font-black text-[10px] h-12 uppercase tracking-widest shadow-2xl relative z-10">Configure AI Sensitivity</Button>
              </Card>

              <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6">
                <h3 className="text-xl font-black text-slate-900">Community Reports</h3>
                <div className="space-y-4">
                  {[
                    { label: "Misleading Info", count: 12 },
                    { label: "Offensive Context", count: 5 },
                    { label: "Copyright Claim", count: 2 },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-rose-200 transition-all cursor-pointer group">
                      <span className="text-sm font-bold text-slate-700">{r.label}</span>
                      <Badge className="bg-white text-rose-600 font-black text-[10px]">{r.count}</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* 7. CAMPAIGN MANAGEMENT PANEL */}
        <TabsContent value="campaigns" className="animate-in fade-in duration-500 m-0 space-y-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-2">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Active Sponsor Pipeline</h2>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="rounded-xl h-12 px-6 font-bold border-2 bg-white">Campaign Analytics</Button>
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl h-12 px-8 font-black text-white shadow-lg shadow-blue-200">
                <Plus className="mr-2 h-4 w-4" /> Force Assign
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Winter Abaya Drop", brand: "Modest Attire Co.", budget: "₹1.5M", creators: "12/15", completion: 82, status: "Live" },
              { title: "Organic Beef Drive", brand: "Punjab Meats", budget: "₹450k", creators: "5/5", completion: 100, status: "Success" },
              { title: "Halal Glow Launch", brand: "Pure Glow Beauty", budget: "₹850k", creators: "8/20", completion: 35, status: "Active" },
            ].map((camp, i) => (
              <Card key={i} className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-blue-100">
                <CardHeader className="p-8 pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner group-hover:scale-110 transition-transform">
                      <Target className="h-6 w-6" />
                    </div>
                    <Badge className={cn(
                      "border-none font-black text-[8px] px-3 h-6 flex items-center uppercase tracking-widest",
                      camp.status === 'Success' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                    )}>
                      {camp.status}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 leading-tight">{camp.title}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Brand: {camp.brand}</p>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-6">
                  <div className="flex justify-between items-end border-t border-slate-50 pt-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Budget (Credits)</p>
                      <p className="text-xl font-black text-slate-900">{camp.budget}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Creators</p>
                      <p className="text-xl font-black text-blue-600">{camp.creators}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                      <span className="text-slate-400">Completion</span>
                      <span className="text-slate-900">{camp.completion}%</span>
                    </div>
                    <Progress value={camp.completion} className="h-1.5 bg-slate-50" />
                  </div>
                </CardContent>
                <CardFooter className="p-8 pt-0 mt-auto grid grid-cols-2 gap-3">
                  <Button variant="outline" className="rounded-xl h-11 font-black text-[10px] uppercase tracking-widest border-2">Monitor ROI</Button>
                  <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-11 font-black text-[10px] uppercase tracking-widest shadow-xl">Manage Leads</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 8. FINANCIAL CONTROL PANEL */}
        <TabsContent value="finance" className="animate-in fade-in duration-500 m-0 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10 space-y-10 relative overflow-hidden">
                <div className="flex justify-between items-center relative z-10">
                  <div className="space-y-1">
                    <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Settlement Ledger</h3>
                    <p className="text-muted-foreground font-medium italic">Global payout approvals and wallet monitoring for the ecosystem.</p>
                  </div>
                  <Button variant="ghost" className="font-black text-xs text-blue-600 uppercase tracking-widest">Payout Policy <ExternalLink className="ml-2 h-4 w-4" /></Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  <div className="p-8 bg-slate-50 rounded-[2rem] border shadow-inner text-center space-y-2">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Total Creator Earnings</p>
                    <p className="text-5xl font-black text-slate-900 tracking-tighter">₹18.4M</p>
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-tighter">+12.4% vs prev. month</p>
                  </div>
                  <div className="p-8 bg-slate-50 rounded-[2rem] border shadow-inner text-center space-y-2">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Platform Commission</p>
                    <p className="text-5xl font-black text-blue-600 tracking-tighter">₹1.8M</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">10% Platform Flat Fee</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-sm font-black uppercase text-slate-400 tracking-widest px-2">Pending Disursements</h4>
                  <div className="divide-y border rounded-[2rem] overflow-hidden bg-white">
                    {[
                      { id: "PAY-901", creator: "@hamza_legacy", amount: "₹4,45,000", date: "Nov 01", status: "Awaiting Appr" },
                      { id: "PAY-902", creator: "@halal_eats", amount: "₹1,12,200", date: "Oct 28", status: "Hold" },
                    ].map((set, i) => (
                      <div key={i} className="p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 font-black text-xs">
                            {set.creator[1].toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900">{set.creator}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{set.id} • {set.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-8">
                          <span className="text-xl font-black text-slate-900">{set.amount}</span>
                          <Badge className={cn(
                            "border-none font-black text-[8px] px-3 h-6 flex items-center uppercase",
                            set.status === 'Hold' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                          )}>
                            {set.status}
                          </Badge>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="icon" variant="ghost" className="rounded-xl text-emerald-600 hover:bg-emerald-50"><CheckCircle2 className="h-4 w-4" /></Button>
                            <Button size="icon" variant="ghost" className="rounded-xl text-rose-600 hover:bg-rose-50"><XCircle className="h-4 w-4" /></Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
            <div className="lg:col-span-4 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-8 space-y-8 relative overflow-hidden flex flex-col justify-between h-full">
                <Wallet className="absolute -top-4 -right-4 h-48 w-48 opacity-10 text-blue-400" />
                <div className="relative z-10 space-y-6">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Vertical Liquidity Reserve</p>
                    <h2 className="text-6xl font-black tracking-tighter text-blue-400">₹4.2M</h2>
                    <p className="text-xs font-bold text-slate-400 uppercase leading-relaxed max-w-[200px]">
                      Reserve budget for creator payouts, bonus incentives, and ad-rev mitigation.
                    </p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                      <span className="text-slate-400">Cash Flow</span>
                      <span className="text-emerald-400">OPTIMAL</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                      <span className="text-slate-400">Audit Status</span>
                      <span className="text-primary uppercase">Passed</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 relative z-10 pt-8">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-14 font-black uppercase text-xs tracking-widest shadow-xl">Financial Health Hub</Button>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 rounded-2xl h-14 font-black uppercase text-xs tracking-widest">Adjust Payout Rules</Button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* 9. COIN ECONOMY CONTROL */}
        <TabsContent value="economy" className="animate-in fade-in duration-500 m-0 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 rounded-[2.5rem] border-none shadow-sm bg-white p-10 space-y-10">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Economy Governance</h3>
                  <p className="text-muted-foreground font-medium italic">Configure Hub Coin earning values, conversion rates, and supply limits.</p>
                </div>
                <div className="h-16 w-16 bg-amber-50 rounded-3xl flex items-center justify-center text-amber-600 shadow-inner">
                  <Coins className="h-8 w-8" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="font-black text-[10px] uppercase text-slate-400 tracking-widest">Earn Rate (per Like)</Label>
                      <span className="text-sm font-black text-blue-600">0.05 Coins</span>
                    </div>
                    <Input type="range" min="0" max="1" step="0.01" defaultValue="0.05" className="h-2 accent-blue-600" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="font-black text-[10px] uppercase text-slate-400 tracking-widest">Conversion Rate (Redeem)</Label>
                      <span className="text-sm font-black text-blue-600">100 Coins = ₹1.00</span>
                    </div>
                    <Input type="range" min="50" max="200" step="10" defaultValue="100" className="h-2 accent-blue-600" />
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="font-black text-[10px] uppercase text-slate-400 tracking-widest">Daily User Limit</Label>
                      <span className="text-sm font-black text-blue-600">500 Coins</span>
                    </div>
                    <Input type="range" min="100" max="2000" step="50" defaultValue="500" className="h-2 accent-blue-600" />
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-700 uppercase tracking-tighter">Freeze Economy</span>
                      <Switch />
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium italic">Emergency halt for all coin issuances and redemptions across the platform.</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-8 border-t border-slate-100 flex justify-end gap-4">
                <Button variant="outline" className="rounded-xl h-12 px-8 font-black uppercase text-[10px] tracking-widest border-2">Reset to Defaults</Button>
                <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-12 px-10 font-black uppercase text-[10px] tracking-widest shadow-xl">Apply Changes</Button>
              </div>
            </Card>

            <div className="space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6">
                <h3 className="text-xl font-black text-slate-900">Inflation Monitor</h3>
                <div className="space-y-6">
                  {[
                    { label: "Circulation Velocity", current: "Medium", val: 45, color: "bg-blue-500" },
                    { label: "Market Float Ratio", current: "Stable", val: 78, color: "bg-emerald-500" },
                    { label: "Abuse Risk Index", current: "Low", val: 12, color: "bg-amber-500" },
                  ].map((stat, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span className="text-slate-500">{stat.label}</span>
                        <span className="text-slate-900">{stat.current}</span>
                      </div>
                      <Progress value={stat.val} className={cn("h-1.5", stat.color.replace('bg-', 'bg-opacity-20 bg-'))} />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="rounded-[2.5rem] border-none shadow-sm bg-amber-50 p-8 space-y-4 border-2 border-amber-100">
                <div className="flex items-center gap-3 text-amber-600">
                  <AlertTriangle className="h-5 w-5" />
                  <h4 className="text-sm font-black uppercase tracking-widest">Economy Warning</h4>
                </div>
                <p className="text-[11px] text-amber-900/70 font-medium leading-relaxed italic">
                  Suspicious activity detected in User Group #44 (Potential Coin Farm). 12 accounts flagged for manual audit in the Safety tab.
                </p>
                <Button variant="outline" size="sm" className="w-full rounded-xl border-amber-200 text-amber-700 bg-white font-black text-[9px] uppercase tracking-widest h-9">Investigate Abuse</Button>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* 11. AI / SCORING CONTROL */}
        <TabsContent value="config" className="animate-in fade-in duration-500 m-0 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10">
            <div className="space-y-10">
              <div className="space-y-2 border-b pb-6">
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">AI Scoring & Ranking Engine</h3>
                <p className="text-muted-foreground font-medium text-lg italic">Adjust weights for creator rankings and platform visibility algorithms.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="font-black text-xs uppercase text-slate-400 tracking-widest">Engagement Weight</Label>
                      <span className="text-sm font-black text-blue-600">40%</span>
                    </div>
                    <Input type="range" min="0" max="100" step="5" defaultValue="40" className="h-2 accent-blue-600" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="font-black text-xs uppercase text-slate-400 tracking-widest">Content Quality (AI Score)</Label>
                      <span className="text-sm font-black text-blue-600">30%</span>
                    </div>
                    <Input type="range" min="0" max="100" step="5" defaultValue="30" className="h-2 accent-blue-600" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="font-black text-xs uppercase text-slate-400 tracking-widest">Consistency Factor</Label>
                      <span className="text-sm font-black text-blue-600">20%</span>
                    </div>
                    <Input type="range" min="0" max="100" step="5" defaultValue="20" className="h-2 accent-blue-600" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="font-black text-xs uppercase text-slate-400 tracking-widest">Campaign Success ROI</Label>
                      <span className="text-sm font-black text-blue-600">10%</span>
                    </div>
                    <Input type="range" min="0" max="100" step="5" defaultValue="10" className="h-2 accent-blue-600" />
                  </div>
                </div>
                <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white space-y-8 relative overflow-hidden flex flex-col justify-between">
                  <Zap className="absolute -top-4 -right-4 h-32 w-32 opacity-10 text-blue-400" />
                  <div className="space-y-4 relative z-10">
                    <h4 className="text-2xl font-black text-blue-400 uppercase tracking-tighter">Manual Algorithm Override</h4>
                    <p className="text-slate-400 text-sm leading-relaxed italic">
                      Boost specific creators or categories manually for time-sensitive events (e.g., Ramadan, Eid). This override bypasses the standard AI weights for a set period.
                    </p>
                  </div>
                  <div className="space-y-4 relative z-10">
                    <Button variant="secondary" className="w-full rounded-2xl font-black text-xs h-14 uppercase tracking-widest shadow-xl bg-white text-slate-900">Configure Event Boosts</Button>
                    <p className="text-[10px] text-center text-slate-500 font-bold uppercase tracking-widest">Active Manual Boosts: 0</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* 12. TIER MANAGEMENT SYSTEM */}
        {/* Placeholder Tabs for Advanced Architectures - Consistent High-Fidelity Design */}
        {["safety", "growth"].map((tab) => (
          <TabsContent key={tab} value={tab} className="animate-in fade-in duration-500 m-0">
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-24 text-center space-y-8">
              <div className="h-24 w-24 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-200 mx-auto shadow-inner">
                <Settings className="h-12 w-12 animate-spin-slow" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{tab.replace(/-/g, ' ')} Module</h3>
                <p className="text-muted-foreground font-medium max-w-md mx-auto italic text-lg leading-relaxed">
                  Advanced tactical control panel for platform risk, fraud audits, and ecosystem growth campaigns.
                </p>
              </div>
              <Button variant="outline" className="rounded-2xl border-2 font-black px-12 h-14 uppercase text-xs tracking-[0.2em] hover:bg-slate-50">Sync System Data</Button>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Floating Return Button */}
      <Link href="/admin/dashboard">
        <button className="fixed bottom-8 right-8 w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group border-4 border-white active:scale-95">
          <div className="flex flex-col items-center">
            <ExternalLink className="h-6 w-6" />
            <span className="text-[8px] font-black uppercase mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Exit Tower</span>
          </div>
        </button>
      </Link>
    </div>
  )
}

function TagIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42l-8.704-8.704Z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  )
}
