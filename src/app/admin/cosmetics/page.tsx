
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
  BarChart3, MapPin, Users, Download,
  MessageSquare, Clock, CheckCircle2,
  Tag, Plus, Heart, Activity, 
  FileText, Landmark, Calendar, Eye, 
  XCircle, Trash2, Edit2, ShieldAlert,
  Coins, Wallet, Layers, Award, Percent,
  TrendingUp, Scale, Settings, ExternalLink, Gift,
  Sparkles, Beaker, FlaskConical, Zap
} from "lucide-react"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import Link from "next/link"

export default function SuperAdminCosmeticsManagement() {
  const [activeTab, setActiveTab] = React.useState("dashboard")

  const MOCK_LABS = [
    { id: "COS-L01", name: "Pure Glow Cosmetics", type: "Skincare", status: "Verified", rating: 4.9, scanner: "1.2k" },
    { id: "COS-L02", name: "Noor Beauty Labs", type: "Makeup", status: "Pending", rating: 4.8, scanner: "850" },
    { id: "COS-L03", name: "Velvet Veil", type: "Fragrance", status: "Verified", rating: 4.7, scanner: "2.1k" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-24">
      <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline text-foreground uppercase tracking-tighter text-rose-600">Cosmetics & Beauty</h1>
        <p className="text-muted-foreground font-medium text-lg italic">Manage ethical beauty brands, lab-verified formulations, and purity logs.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="flex items-center justify-between bg-card p-2 rounded-2xl shadow-sm border overflow-x-auto no-scrollbar">
          <TabsList className="bg-transparent h-auto p-0 gap-1 flex justify-start min-w-max">
            {[
              { id: "dashboard", label: "Dashboard" },
              { id: "all", label: "All Brands" },
              { id: "verification", label: "Verification" },
              { id: "governance", label: "Purity Standards" },
              { id: "reviews", label: "Reviews" },
              { id: "offers", label: "Offers" },
              { id: "loyalty", label: "Loyalty" },
              { id: "certificates", label: "Certificates" },
              { id: "categories", label: "Categories" },
              { id: "billing", label: "Wallet & Billing" }
            ].map((tab) => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id} 
                className="rounded-xl data-[state=active]:bg-rose-50 data-[state=active]:text-rose-600 px-6 py-2.5 font-bold transition-all shadow-none border-none whitespace-nowrap uppercase text-[10px] tracking-widest"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="space-y-8 m-0 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Active Brands</span>
                <div className="h-10 w-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-foreground">92</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase">+5 this month</p>
              </div>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Lab Audited</span>
                <div className="h-10 w-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Beaker className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-foreground">85%</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Verification rate</p>
              </div>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Ingredient Hits</span>
                <div className="h-10 w-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <FlaskConical className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-foreground">1.2k</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Daily scanner usage</p>
              </div>
            </Card>
          </div>

          <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
            <CardHeader className="p-8 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-black text-foreground">Lab Reports Queue</CardTitle>
              <Button size="sm" className="bg-rose-600 hover:bg-rose-700 rounded-xl font-black text-xs h-10 px-6 text-white group shadow-lg shadow-rose-200">
                Begin Verification <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Brand Name</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Report Type</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground text-center">Issuer</TableHead>
                    <TableHead className="text-right px-8 h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Pure Glow Cosmetics", type: "Breathability", issuer: "Beauty Ethics Lab", status: "Verified" },
                    { name: "Noor Beauty Labs", type: "Alcohol Check", issuer: "Global Purity Lab", status: "Pending" },
                  ].map((item, i) => (
                    <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors">
                      <TableCell className="px-8 py-5 font-bold text-foreground text-sm">{item.name}</TableCell>
                      <TableCell className="font-bold text-muted-foreground text-xs">{item.type}</TableCell>
                      <TableCell className="text-center font-bold text-[10px] text-muted-foreground uppercase">{item.issuer}</TableCell>
                      <TableCell className="text-right px-8">
                        <Badge className={item.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-none font-black text-[9px] px-3' : 'bg-amber-50 text-amber-600 border-none font-black text-[9px] px-3'}>
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="governance" className="animate-in fade-in duration-500 m-0">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10">
            <div className="space-y-10">
              <div className="space-y-2 border-b pb-6">
                <h3 className="text-3xl font-black text-foreground uppercase tracking-tight">Purity & Ethics Standards</h3>
                <p className="text-muted-foreground font-medium text-lg italic">Global mandatory compliance criteria for beauty partners.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  {[
                    { label: "Breathable Formulation Audit", active: true },
                    { label: "Zero Animal Derivative Proof", active: true },
                    { label: "Solvent Purity Log", active: true },
                    { label: "Sustainable Packaging Charter", active: false },
                  ].map((rule, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-muted rounded-2xl border border-transparent hover:border-rose-200 transition-all cursor-pointer group shadow-sm">
                      <span className="font-bold text-foreground text-sm">{rule.label}</span>
                      <Badge className={rule.active ? "bg-emerald-500 text-white font-black text-[8px]" : "bg-muted text-muted-foreground font-black text-[8px]"}>
                        {rule.active ? "MANDATORY" : "OPTIONAL"}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="bg-zinc-900 rounded-[2.5rem] p-10 text-white space-y-6 relative overflow-hidden flex flex-col justify-between">
                  <FlaskConical className="absolute -top-4 -right-4 h-32 w-32 opacity-10 text-rose-400" />
                  <div className="space-y-2 relative z-10">
                    <h4 className="text-xl font-black text-rose-400 uppercase tracking-tighter">Lab Bridge</h4>
                    <p className="text-muted-foreground text-sm">Direct integration with ethical lab partners for instant verification.</p>
                  </div>
                  <Button variant="secondary" className="w-full rounded-xl font-black text-[10px] h-12 uppercase tracking-widest relative z-10 shadow-xl bg-card text-foreground">Sync Lab Data</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="loyalty" className="animate-in fade-in duration-500 m-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-rose-600 text-white p-10 relative overflow-hidden">
                <Coins className="absolute -top-4 -right-4 h-48 w-48 opacity-10" />
                <div className="relative z-10 space-y-8">
                  <div className="space-y-2">
                    <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Glow Coin Circulation</p>
                    <h2 className="text-7xl font-black tracking-tighter">1.8M</h2>
                    <div className="flex items-center gap-2 text-sm font-bold bg-card/20 w-fit px-4 py-1.5 rounded-full backdrop-blur-md">
                      <TrendingUp className="h-4 w-4" /> +22% YoY
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-white/10 pt-8">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase opacity-60 tracking-widest leading-none mb-1">Active Members</p>
                      <p className="text-2xl font-black">24.2k</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase opacity-60 tracking-widest leading-none mb-1">Redemptions</p>
                      <p className="text-2xl font-black">15.4k</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase opacity-60 tracking-widest leading-none mb-1">Avg Ticket</p>
                      <p className="text-2xl font-black">₹1,850</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="lg:col-span-4 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-foreground">Glow Tiers</h3>
                  <p className="text-sm text-muted-foreground font-medium italic">Manage how clients earn Hub Coins for beauty and purity products.</p>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Standard Earn", rate: "1 Coin / ₹100" },
                    { label: "Lab Verified Bonus", rate: "1.2x Multiplier" },
                    { label: "Empty Pack Recycle", rate: "50 Flat Coins" },
                  ].map((tier, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-2xl border">
                      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter">{tier.label}</span>
                      <span className="text-sm font-black text-rose-600">{tier.rate}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-12 font-black uppercase text-[10px] tracking-widest">Adjust Ratios</Button>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Other Tabs - Wrapped for consistent high-fidelity UI */}
        {["all", "verification", "reviews", "offers", "certificates", "categories", "billing"].map((tab) => (
          <TabsContent key={tab} value={tab} className="animate-in fade-in duration-500 m-0">
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-20 text-center space-y-6">
              <div className="h-20 w-20 rounded-[2rem] bg-muted flex items-center justify-center text-muted-foreground mx-auto">
                <Settings className="h-10 w-10 animate-spin-slow" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">{tab.replace(/-/g, ' ')} Module</h3>
                <p className="text-muted-foreground font-medium max-w-sm mx-auto italic">
                  Managing beauty standards and brand purity across the global network.
                </p>
              </div>
              <Button variant="outline" className="rounded-xl border-2 font-bold px-8 h-12 border-rose-100 text-rose-600 hover:bg-rose-50">Refresh Brand Data</Button>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Link href="/admin/dashboard">
        <button className="fixed bottom-8 right-8 w-14 h-14 bg-zinc-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group">
          <div className="flex flex-col items-center">
            <ExternalLink className="h-5 w-5" />
            <span className="text-[8px] font-black uppercase mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Exit Panel</span>
          </div>
        </button>
      </Link>
    </div>
  )
}
