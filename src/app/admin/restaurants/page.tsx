
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
  Store, UtensilsCrossed
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"

export default function SuperAdminRestaurantManagement() {
  const [activeTab, setActiveTab] = React.useState("dashboard")

  const MOCK_RESTAURANTS = [
    { id: "RES-001", name: "The Bosphorus Kitchen", city: "New York", cuisine: "Turkish", status: "Verified", rating: 4.8, joined: "Oct 2023" },
    { id: "RES-002", name: "Al-Zaeem Shawarma", city: "Dubai", cuisine: "Arabic", status: "Verified", rating: 4.5, joined: "Nov 2023" },
    { id: "RES-003", name: "Karim's Restaurant", city: "Delhi", cuisine: "Mughlai", status: "Pending", rating: 4.9, joined: "Jan 2024" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-7xl mx-auto pb-24">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Restaurant Management</h1>
        <p className="text-muted-foreground font-medium text-sm sm:text-lg">Platform-wide oversight for directory listings, audits, and community safety.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="flex items-center justify-between bg-card p-2 rounded-2xl shadow-sm border overflow-x-auto no-scrollbar">
          <TabsList className="bg-transparent h-auto p-0 gap-1 flex justify-start min-w-max">
            {[
              { id: "dashboard", label: "Dashboard" },
              { id: "all", label: "All Restaurants" },
              { id: "verification", label: "Verification Queue" },
              { id: "moderation", label: "Moderation" },
              { id: "promotions", label: "Promotions" },
              { id: "loyalty", label: "Loyalty Rewards" },
              { id: "governance", label: "Halal Governance" },
              { id: "onboarding", label: "Certs & Onboarding" },
              { id: "categories", label: "Categories" },
              { id: "billing", label: "Wallet & Billing" }
            ].map((tab) => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id} 
                className="rounded-xl data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-6 py-2.5 font-bold transition-all shadow-none border-none whitespace-nowrap uppercase text-[10px] tracking-widest"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* DASHBOARD TAB */}
        <TabsContent value="dashboard" className="space-y-8 m-0 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total Active</span>
                <div className="h-10 w-10 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
                  <Store className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl sm:text-4xl font-black text-foreground">890</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase">+15 new this month</p>
              </div>
            </Card>

            <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Verified Hubs</span>
                <div className="h-10 w-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl sm:text-4xl font-black text-foreground">750</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">84% of total</p>
              </div>
            </Card>

            <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Growth Factor</span>
                <div className="h-10 w-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl sm:text-4xl font-black text-foreground">12%</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Conversion Lift</p>
              </div>
            </Card>
          </div>

          <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
            <CardHeader className="p-8 border-b">
              <CardTitle className="text-xl font-black">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              {[
                { user: "Yasar Khan", action: "approved verification for Karim's.", time: "2h ago", icon: CheckCircle2, color: "text-emerald-500" },
                { user: "MOHAMMED HUZAIFA", action: "suspended user 'spam_user_123'.", time: "5h ago", icon: Activity, color: "text-rose-500" },
              ].map((act, i) => (
                <div key={i} className="flex gap-4 group items-center">
                  <div className={`h-10 w-10 rounded-xl ${act.color} bg-opacity-10 flex items-center justify-center shrink-0`}>
                    <act.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground leading-snug">
                      <span className="font-black text-foreground">{act.user}</span> {act.action}
                    </p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">{act.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ALL RESTAURANTS TAB */}
        <TabsContent value="all" className="animate-in fade-in duration-500 m-0">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden">
            <CardHeader className="p-8 border-b space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search by name, ID or city..." className="pl-9 h-12 rounded-2xl bg-muted border-none font-medium" />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="rounded-xl h-12 gap-2 border-2 font-bold"><Filter className="h-4 w-4" /> Filters</Button>
                  <Button className="bg-primary hover:bg-primary/90 rounded-2xl h-12 px-8 font-black text-white shadow-lg shadow-primary/20">
                    <Plus className="mr-2 h-4 w-4" /> Add Listing
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black uppercase text-[10px] tracking-widest">ID / Date</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest">Restaurant</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest">Location</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-center">Trust Rating</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest">Status</TableHead>
                    <TableHead className="text-right px-8 h-14 font-black uppercase text-[10px] tracking-widest">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_RESTAURANTS.map((res) => (
                    <TableRow key={res.id} className="border-border hover:bg-muted/50 transition-colors">
                      <TableCell className="px-8 py-5 font-black text-foreground text-xs">{res.id}</TableCell>
                      <TableCell>
                        <p className="font-black text-foreground text-base">{res.name}</p>
                        <p className="text-[10px] font-bold text-primary uppercase">{res.cuisine}</p>
                      </TableCell>
                      <TableCell className="text-xs font-bold text-muted-foreground">{res.city}</TableCell>
                      <TableCell className="text-center font-black text-sm text-amber-500">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="h-3 w-3 fill-current" /> {res.rating}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          res.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-amber-50 text-amber-600 border-amber-200'
                        }>
                          {res.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-8">
                        <Button size="icon" variant="ghost" className="rounded-xl"><MoreVertical className="h-4 w-4 text-muted-foreground" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* VERIFICATION QUEUE TAB */}
        <TabsContent value="verification" className="animate-in fade-in duration-500 m-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden">
                <CardHeader className="p-8 bg-muted/50">
                  <CardTitle className="text-xl font-black">Audit Queue</CardTitle>
                  <CardDescription>Businesses awaiting document verification and Halal trust audits.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableBody>
                      {[
                        { name: "Global Meat Hub", date: "2 mins ago", type: "Halal Audit", docs: 3 },
                        { name: "Istanbul Bistro", date: "45 mins ago", type: "Health Permit", docs: 1 },
                        { name: "Al-Zaeem Sweets", date: "3 hours ago", type: "New Store", docs: 5 },
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
                            <Badge variant="secondary" className="bg-muted text-muted-foreground border-none font-black text-[9px] uppercase px-3">
                              {item.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right px-8">
                            <Button className="bg-primary hover:bg-primary/90 rounded-full font-black text-[10px] uppercase tracking-widest h-9 px-6 text-white shadow-md">Begin Review</Button>
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
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    12 applications have been in the queue for more than 48 hours. Prioritizing older audits improves partner satisfaction.
                  </p>
                </div>
                <Button variant="secondary" className="w-full rounded-xl font-black text-xs h-12 shadow-2xl">Prioritize Queue</Button>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* MODERATION TAB */}
        <TabsContent value="moderation" className="animate-in fade-in duration-500 m-0">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden">
            <CardHeader className="p-8 border-b flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-black text-rose-600">Content Moderation</CardTitle>
                <CardDescription>Flagged items from the community that require admin resolution.</CardDescription>
              </div>
              <Badge className="bg-rose-50 text-rose-600 border-none font-black px-4 h-8 flex items-center">15 PENDING REPORTS</Badge>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-rose-50/30">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black uppercase text-[10px] tracking-widest text-rose-400">Report ID</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-rose-400">Flagged Content</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-rose-400">Reason</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-rose-400">Reported By</TableHead>
                    <TableHead className="text-right px-8 font-black uppercase text-[10px] tracking-widest text-rose-400">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: "REP-991", item: "Review #8821", restaurant: "Al Bake", reason: "Inappropriate language", user: "Zaid Ali", time: "2h ago" },
                    { id: "REP-992", item: "Photo #1042", restaurant: "Sultan's", reason: "Non-halal item pictured", user: "Sarah K.", time: "5h ago" },
                  ].map((rep) => (
                    <TableRow key={rep.id} className="border-border hover:bg-rose-50/10 transition-colors">
                      <TableCell className="px-8 py-6 font-black text-xs text-foreground">{rep.id}</TableCell>
                      <TableCell>
                        <p className="font-black text-foreground text-sm">{rep.item}</p>
                        <p className="text-[10px] font-bold text-primary uppercase">at {rep.restaurant}</p>
                      </TableCell>
                      <TableCell className="text-rose-600 text-xs font-bold uppercase">{rep.reason}</TableCell>
                      <TableCell className="text-xs font-bold text-muted-foreground">{rep.user}</TableCell>
                      <TableCell className="text-right px-8">
                        <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-black text-[10px] uppercase h-9">Moderate</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* LOYALTY REWARDS TAB */}
        <TabsContent value="loyalty" className="animate-in fade-in duration-500 m-0 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10 space-y-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-foreground">Program Performance</h3>
                <p className="text-sm text-muted-foreground font-medium">Global platform-wide loyalty metrics.</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-muted rounded-3xl space-y-1 shadow-inner text-center">
                  <p className="text-[10px] font-black uppercase text-muted-foreground">Total Issued</p>
                  <p className="text-3xl font-black text-foreground">4.2M</p>
                </div>
                <div className="p-6 bg-emerald-50 rounded-3xl space-y-1 shadow-inner text-center">
                  <p className="text-[10px] font-black uppercase text-emerald-600">Redeemed</p>
                  <p className="text-3xl font-black text-emerald-700">68%</p>
                </div>
              </div>
              <Button className="w-full bg-primary rounded-2xl h-14 font-black uppercase text-xs tracking-widest shadow-xl text-white">Adjust Reward Ratios</Button>
            </Card>

            <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-10 relative overflow-hidden flex flex-col justify-between">
              <Gift className="absolute -top-4 -right-4 h-32 w-32 opacity-10 text-primary" />
              <div className="relative z-10 space-y-6">
                <h3 className="text-2xl font-black font-headline">Featured Reward Partner</h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  Boost visibility for restaurants offering Hub Coin bonuses.
                </p>
                <div className="p-4 bg-card/5 rounded-2xl border border-white/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-white/80">Active Bonus Partners: 12</span>
                  <Badge className="bg-emerald-500 text-white border-none font-black text-[9px]">LIVE</Badge>
                </div>
              </div>
              <Button variant="secondary" className="w-full rounded-xl font-black text-[10px] uppercase h-12 shadow-2xl mt-6">Promote Partner</Button>
            </Card>
          </div>
        </TabsContent>

        {/* HALAL GOVERNANCE TAB */}
        <TabsContent value="governance" className="animate-in fade-in duration-500 m-0 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10">
            <div className="flex flex-col md:flex-row justify-between items-start gap-10">
              <div className="space-y-6 flex-1">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-foreground">Governance & Standards</h3>
                  <p className="text-lg text-muted-foreground font-medium">Define compliance criteria for dining establishments.</p>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Slaughterhouse Proof requirement", active: true },
                    { label: "Annual kitchen spot-audit", active: true },
                    { label: "Alcohol-Free Site Protocol", active: true },
                    { label: "Hygiene Certification Lvl 4+", active: true },
                  ].map((rule, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-2xl border border-transparent hover:border-primary/20 transition-all cursor-pointer">
                      <span className="font-bold text-foreground">{rule.label}</span>
                      <Badge className={rule.active ? "bg-emerald-500 text-white" : "bg-muted"}>
                        {rule.active ? "MANDATORY" : "OPTIONAL"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              <Card className="w-full md:w-80 bg-indigo-50 border-none rounded-[2rem] p-8 space-y-6">
                <Scale className="h-10 w-10 text-indigo-600" />
                <h4 className="text-xl font-black text-indigo-900">Audit Protocol</h4>
                <p className="text-sm text-indigo-800/70 font-medium text-xs">Set re-verification frequency.</p>
                <Select defaultValue="6m">
                  <SelectTrigger className="bg-card border-indigo-100 rounded-xl font-bold h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-none shadow-2xl">
                    <SelectItem value="3m">Every 3 Months</SelectItem>
                    <SelectItem value="6m">Every 6 Months</SelectItem>
                    <SelectItem value="12m">Annually</SelectItem>
                  </SelectContent>
                </Select>
              </Card>
            </div>
          </Card>
        </TabsContent>

        {/* WALLET & BILLING TAB */}
        <TabsContent value="billing" className="animate-in fade-in duration-500 m-0 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10 space-y-8">
                <h3 className="text-2xl font-black text-foreground">Settlement Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <Label className="font-black text-[10px] uppercase text-muted-foreground tracking-widest">Global Coin Ratio</Label>
                    <div className="flex items-center gap-4 p-6 bg-muted rounded-[2rem] border-2 border-border">
                      <Coins className="h-8 w-8 text-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-black text-foreground">1 Hub Coin = ₹1.00</p>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase">Redeem Value</p>
                      </div>
                      <Button variant="ghost" size="sm" className="font-black text-xs text-primary">Edit</Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label className="font-black text-[10px] uppercase text-muted-foreground tracking-widest">Commission</Label>
                    <div className="flex items-center gap-4 p-6 bg-muted rounded-[2rem] border-2 border-border">
                      <Percent className="h-8 w-8 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-sm font-black text-foreground">5.0% flat fee</p>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase">On digital orders</p>
                      </div>
                      <Button variant="ghost" size="sm" className="font-black text-xs text-primary">Edit</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="lg:col-span-4 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 space-y-6 relative overflow-hidden">
                <Wallet className="absolute -top-4 -right-4 h-32 w-32 opacity-10 text-primary" />
                <div className="relative z-10 space-y-2">
                  <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">System Reserve</p>
                  <h2 className="text-5xl font-black tracking-tighter">₹42.8M</h2>
                  <p className="text-xs font-bold text-muted-foreground uppercase">Available for partner payouts</p>
                </div>
                <Button className="w-full bg-primary rounded-xl h-12 font-black uppercase text-[10px] tracking-widest relative z-10 shadow-xl text-white">Financial Dashboard</Button>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* OTHER TABS - WRAPPED FOR CONSISTENCY */}
        {["promotions", "onboarding", "categories"].map((tab) => (
          <TabsContent key={tab} value={tab} className="animate-in fade-in duration-500 m-0">
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-20 text-center space-y-6">
              <div className="h-20 w-20 rounded-[2rem] bg-muted flex items-center justify-center text-muted-foreground mx-auto">
                <Settings className="h-10 w-10 animate-spin-slow" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">{tab.replace(/-/g, ' ')} Module</h3>
                <p className="text-muted-foreground font-medium max-w-sm mx-auto">
                  Advanced administrative engine for restaurant ecosystem oversight.
                </p>
              </div>
              <Button variant="outline" className="rounded-xl border-2 font-bold px-8">Refresh Registry</Button>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Link href="/admin/dashboard">
        <button className="fixed bottom-8 right-8 w-14 h-14 bg-zinc-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group">
          <div className="flex flex-col items-center">
            <ExternalLink className="h-5 w-5" />
            <span className="text-[8px] font-black uppercase mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Exit</span>
          </div>
        </button>
      </Link>
    </div>
  )
}
