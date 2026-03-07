
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
  ChevronDown, Store, Tag, Plus,
  Heart, Activity, FileText, Landmark,
  Calendar, Eye, XCircle, AlertTriangle,
  Smartphone, Trash2, Edit2, ShieldAlert,
  Coins, Wallet, Layers, Award, Percent,
  TrendingUp, Scale, Settings, ExternalLink, Gift
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
    { id: "RES-004", name: "Green Curry Thai", city: "London", cuisine: "Thai", status: "Verified", rating: 4.2, joined: "Dec 2023" },
    { id: "RES-005", name: "Steak House", city: "New York", cuisine: "Steakhouse", status: "Flagged", rating: 3.8, joined: "Feb 2024" },
  ];

  const MOCK_REPORTS = [
    { id: "REP-991", item: "Review #8821", restaurant: "Al Bake", reason: "Inappropriate language", user: "Zaid Ali", time: "2h ago" },
    { id: "REP-992", item: "Photo #1042", restaurant: "Sultan's", reason: "Non-halal item pictured", user: "Sarah K.", time: "5h ago" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-24">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-headline text-slate-900">Restaurant Management</h1>
          <p className="text-muted-foreground font-medium">Control center for directory listings, audits, and community safety.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2">
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
          <Button className="bg-primary hover:bg-primary/90 rounded-full px-8 font-black text-white shadow-lg shadow-primary/20">
            <Plus className="mr-2 h-4 w-4" /> Add Listing
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="bg-white p-2 rounded-2xl shadow-sm border overflow-x-auto no-scrollbar">
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
                className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-2.5 font-bold transition-all shadow-none border-none whitespace-nowrap"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* DASHBOARD TAB */}
        <TabsContent value="dashboard" className="space-y-8 m-0 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Total Restaurants</span>
                <div className="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-100 transition-colors">
                  <Store className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-slate-900">890</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase">+15 new this month</p>
              </div>
            </Card>

            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Verified Listings</span>
                <div className="h-10 w-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-slate-900">750</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">84% of total</p>
              </div>
            </Card>

            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Growth Factor</span>
                <div className="h-10 w-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-slate-900">12%</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Conversion Lift</p>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black">Recent Reviews</h3>
                <Button variant="outline" size="sm" className="rounded-full font-black text-[10px] uppercase border-2 text-primary hover:bg-primary/5 px-4 h-8">
                  View All <ArrowUpRight className="ml-1.5 h-3 w-3" />
                </Button>
              </div>
              <div className="space-y-6">
                {[
                  { user: "Aisha K.", restaurant: "Karim's Restaurant", rating: 5, comment: "Amazing food as always!", initial: "AK", color: "bg-blue-100 text-blue-600" },
                  { user: "Rohan S.", restaurant: "Al Bake", rating: 4, comment: "The shawarma is legendary.", initial: "RS", color: "bg-emerald-100 text-emerald-600" },
                ].map((review, i) => (
                  <div key={i} className="flex gap-4">
                    <Avatar className="h-10 w-10 rounded-2xl">
                      <AvatarFallback className={review.color + " font-black text-xs"}>{review.initial}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-slate-900">
                          {review.user} <span className="font-medium text-slate-400 mx-1">on</span> <span className="text-primary">{review.restaurant}</span>
                        </p>
                        <div className="flex items-center gap-0.5">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="text-[10px] font-black">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed italic line-clamp-1">"{review.comment}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6">
              <h3 className="text-xl font-black">Verification Queue</h3>
              <div className="space-y-1">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-none">
                      <TableHead className="h-8 font-black uppercase text-[10px] text-slate-400 p-0">Restaurant</TableHead>
                      <TableHead className="h-8 font-black uppercase text-[10px] text-slate-400 p-0 text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "Sultan's Dine", area: "South Delhi", status: "Pending Docs", variant: "secondary" },
                      { name: "Al-Huda Masjid", area: "Old Delhi", status: "Pending Review", variant: "outline" },
                      { name: "Modern Abayas", area: "Bangalore", status: "Pending Review", variant: "outline" },
                    ].map((item, i) => (
                      <TableRow key={i} className="border-slate-50 hover:bg-slate-50/50">
                        <TableCell className="py-4 pl-0">
                          <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{item.area}</p>
                        </TableCell>
                        <TableCell className="py-4 pr-0 text-right">
                          <Badge variant="outline" className={
                            item.status === 'Pending Docs' ? 'bg-emerald-50 text-emerald-600 border-none px-3 font-black text-[9px]' : 'bg-emerald-50/50 text-emerald-700 border-emerald-100 px-3 font-black text-[9px]'
                          }>
                            {item.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>

            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6">
              <h3 className="text-xl font-black">Admin Activity</h3>
              <div className="space-y-6">
                {[
                  { user: "Yasar Khan", action: "approved verification for Karim's.", time: "2h ago", icon: CheckCircle2, color: "text-emerald-500" },
                  { user: "MOHAMMED HUZAIFA", action: "suspended user 'spam_user_123'.", time: "5h ago", icon: Activity, color: "text-rose-500" },
                ].map((act, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className={`h-10 w-10 rounded-[1.2rem] ${act.color} bg-opacity-10 flex items-center justify-center shrink-0`}>
                      <act.icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm text-slate-600 leading-snug">
                        <span className="font-black text-slate-900">{act.user}</span> {act.action}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <section className="space-y-6">
            <h3 className="text-xl font-black px-2">Analytics & Reports</h3>
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Restaurant growth analytics", icon: BarChart3 },
                  { label: "City-wise restaurant analysis", icon: MapPin },
                  { label: "Reviews & ratings analytics", icon: Star },
                  { label: "Loyalty engagement analytics", icon: Heart },
                  { label: "Offer conversion analytics", icon: Tag },
                  { label: "Event performance analysis", icon: Calendar },
                  { label: "Coin usage analytics", icon: Landmark },
                ].map((btn, i) => (
                  <Button key={i} variant="outline" className="justify-start gap-3 h-14 rounded-2xl border-slate-100 bg-slate-50/50 hover:bg-white hover:border-primary transition-all group font-bold text-xs text-slate-600">
                    <btn.icon className="h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
                    {btn.label}
                  </Button>
                ))}
                <Button className="h-14 rounded-2xl bg-emerald-50 text-emerald-600 border-none font-black text-xs uppercase tracking-widest hover:bg-emerald-100 transition-all">
                  <Download className="mr-2 h-4 w-4" /> Export reports (CSV)
                </Button>
              </div>
            </Card>
          </section>
        </TabsContent>

        {/* ALL RESTAURANTS TAB */}
        <TabsContent value="all" className="animate-in fade-in duration-500 m-0">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="p-8 border-b space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input placeholder="Search by name, ID or city..." className="pl-9 h-12 rounded-2xl bg-slate-50 border-none font-medium" />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="rounded-xl h-12 gap-2 border-2 font-bold"><Filter className="h-4 w-4" /> Filters</Button>
                  <Button variant="outline" className="rounded-xl h-12 gap-2 border-2 font-bold"><Layers className="h-4 w-4" /> Bulk Actions</Button>
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {["All", "Verified", "Pending", "Flagged", "Unclaimed"].map((f) => (
                  <Badge key={f} variant={f === 'All' ? 'default' : 'outline'} className="px-4 py-1.5 rounded-full cursor-pointer hover:bg-primary transition-colors">{f}</Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black uppercase text-[10px] tracking-widest">ID / Date</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest">Restaurant</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest">Location</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest">Rating</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest">Status</TableHead>
                    <TableHead className="text-right px-8 font-black uppercase text-[10px] tracking-widest">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_RESTAURANTS.map((res) => (
                    <TableRow key={res.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <TableCell className="px-8 py-5">
                        <div className="font-black text-slate-900 text-xs">{res.id}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase">{res.joined}</div>
                      </TableCell>
                      <TableCell>
                        <p className="font-black text-slate-800 text-base">{res.name}</p>
                        <p className="text-[10px] font-bold text-primary uppercase">{res.cuisine}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                          <MapPin className="h-3 w-3" /> {res.city}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 font-black text-sm">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {res.rating}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          res.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 
                          res.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-200' : 
                          'bg-rose-50 text-rose-600 border-rose-200'
                        }>
                          {res.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-8">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="icon" variant="ghost" className="rounded-xl"><Edit2 className="h-4 w-4 text-slate-400" /></Button>
                          <Button size="icon" variant="ghost" className="rounded-xl"><ShieldCheck className="h-4 w-4 text-slate-400" /></Button>
                          <Button size="icon" variant="ghost" className="rounded-xl hover:text-red-600"><Trash2 className="h-4 w-4 text-slate-400" /></Button>
                        </div>
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
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
                <CardHeader className="p-8 bg-slate-50/50">
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
                        <TableRow key={i} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                          <TableCell className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
                                <FileText className="h-6 w-6" />
                              </div>
                              <div>
                                <p className="font-black text-slate-900 text-base">{item.name}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.date}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none font-black text-[9px] uppercase px-3">
                              {item.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                              <Layers className="h-3.5 w-3.5" /> {item.docs} Documents
                            </div>
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
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-8 space-y-6 relative overflow-hidden">
                <ShieldCheck className="absolute -top-4 -right-4 h-24 w-24 opacity-10" />
                <div className="space-y-2 relative z-10">
                  <h3 className="text-xl font-black">Audit SLA Alert</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
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
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
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
                  {MOCK_REPORTS.map((rep) => (
                    <TableRow key={rep.id} className="border-slate-50 hover:bg-rose-50/10 transition-colors">
                      <TableCell className="px-8 py-6">
                        <div className="font-black text-slate-900 text-xs">{rep.id}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase">{rep.time}</div>
                      </TableCell>
                      <TableCell>
                        <p className="font-black text-slate-800 text-base">{rep.item}</p>
                        <p className="text-[10px] font-bold text-primary uppercase">at {rep.restaurant}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-rose-600">
                          <ShieldAlert className="h-4 w-4" />
                          <span className="text-xs font-bold">{rep.reason}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-bold text-slate-500">{rep.user}</TableCell>
                      <TableCell className="text-right px-8">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="outline" className="rounded-xl font-black text-[10px] border-2 uppercase h-9">Dismiss</Button>
                          <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-black text-[10px] uppercase h-9 shadow-lg shadow-rose-200">Take Action</Button>
                        </div>
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
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10 space-y-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900">Program Performance</h3>
                <p className="text-sm text-muted-foreground font-medium">Global platform-wide loyalty metrics.</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 rounded-3xl space-y-1 shadow-inner">
                  <p className="text-[10px] font-black uppercase text-slate-400">Total Coins Issued</p>
                  <p className="text-3xl font-black text-slate-900">4.2M</p>
                </div>
                <div className="p-6 bg-emerald-50 rounded-3xl space-y-1 shadow-inner">
                  <p className="text-[10px] font-black uppercase text-emerald-600">Redemption Rate</p>
                  <p className="text-3xl font-black text-emerald-700">68%</p>
                </div>
              </div>
              <Button className="w-full bg-primary rounded-2xl h-14 font-black uppercase text-xs tracking-widest shadow-xl">Adjust Reward Ratios</Button>
            </Card>

            <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-10 relative overflow-hidden">
              <Gift className="absolute -top-4 -right-4 h-32 w-32 opacity-10 text-primary" />
              <div className="relative z-10 space-y-6">
                <h3 className="text-2xl font-black font-headline">Featured Reward Partner</h3>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">
                  Boost a restaurant's visibility by designating it as a "Hub Coin Bonus Partner" for the upcoming weekend.
                </p>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-white/80">Bonus Active: 1 Establishment</span>
                  <Badge className="bg-emerald-500 text-white border-none font-black text-[9px]">LIVE</Badge>
                </div>
                <Button variant="secondary" className="w-full rounded-xl font-black text-[10px] uppercase h-12 shadow-2xl">Promote a Partner</Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* HALAL GOVERNANCE TAB */}
        <TabsContent value="governance" className="animate-in fade-in duration-500 m-0 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10">
            <div className="flex flex-col md:flex-row justify-between items-start gap-10">
              <div className="space-y-6 flex-1">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900">Governance & Standards</h3>
                  <p className="text-lg text-muted-foreground font-medium">Define the compliance criteria for "Verified" and "Trust" status.</p>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Slaughterhouse Proof requirement", active: true },
                    { label: "Annual kitchen spot-audit", active: true },
                    { label: "Water source verification", active: false },
                    { label: "Uniform hygiene standards", active: true },
                  ].map((rule, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                      <span className="font-bold text-slate-700">{rule.label}</span>
                      <Badge className={rule.active ? "bg-emerald-500" : "bg-slate-300"}>
                        {rule.active ? "MANDATORY" : "OPTIONAL"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              <Card className="w-full md:w-80 bg-indigo-50 border-none rounded-[2rem] p-8 space-y-6">
                <Scale className="h-10 w-10 text-indigo-600" />
                <h4 className="text-xl font-black text-indigo-900">Audit Protocol</h4>
                <p className="text-sm text-indigo-800/70 font-medium">Set the frequency of automated re-verifications for existing partners.</p>
                <Select defaultValue="6m">
                  <SelectTrigger className="bg-white border-indigo-100 rounded-xl font-bold h-12">
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

        {/* CERTS & ONBOARDING TAB */}
        <TabsContent value="onboarding" className="animate-in fade-in duration-500 m-0 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6 group hover:shadow-md transition-all">
              <div className="h-16 w-16 bg-blue-50 rounded-[1.5rem] flex items-center justify-center text-blue-600 shadow-inner group-hover:scale-110 transition-transform">
                <Award className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900">Trust Asset Manager</h3>
                <p className="text-sm text-muted-foreground font-medium">Issue digital certificates and badges.</p>
              </div>
              <Button variant="outline" className="w-full rounded-xl border-2 font-black text-[10px] uppercase h-10">Manage Issuance</Button>
            </Card>

            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6 group hover:shadow-md transition-all">
              <div className="h-16 w-16 bg-amber-50 rounded-[1.5rem] flex items-center justify-center text-amber-600 shadow-inner group-hover:scale-110 transition-transform">
                <Smartphone className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900">Partner Onboarding Kit</h3>
                <p className="text-sm text-muted-foreground font-medium">Control the shipping of physical QR standees.</p>
              </div>
              <Button variant="outline" className="w-full rounded-xl border-2 font-black text-[10px] uppercase h-10">Fulfillment Center</Button>
            </Card>

            <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Plus className="h-24 w-24 text-primary" />
              </div>
              <h3 className="text-xl font-black relative z-10">New Badge Type</h3>
              <p className="text-sm text-slate-400 font-medium relative z-10">Create a new specialized verification badge (e.g., "100% Organic").</p>
              <Button className="w-full bg-primary rounded-xl font-black text-[10px] h-10 uppercase relative z-10">Design Badge</Button>
            </Card>
          </div>
        </TabsContent>

        {/* CATEGORIES TAB */}
        <TabsContent value="categories" className="animate-in fade-in duration-500 m-0">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="p-8 border-b flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-black">Category & Tag Manager</CardTitle>
                <p className="text-sm text-muted-foreground font-medium">Control the platform taxonomy for dining listings.</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 rounded-full font-black text-xs px-6 h-10">
                <Plus className="mr-2 h-4 w-4" /> Add Category
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 font-black uppercase text-[10px] tracking-widest text-slate-400">Category Name</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Restaurants</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Search Trend</TableHead>
                    <TableHead className="text-right px-8 font-black uppercase text-[10px] tracking-widest">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Fine Dining", count: 124, trend: "Stable" },
                    { name: "Quick Service", count: 450, trend: "Rising" },
                    { name: "Cloud Kitchen", count: 82, trend: "Rising" },
                  ].map((cat, i) => (
                    <TableRow key={i} className="border-slate-100 hover:bg-slate-50/50">
                      <TableCell className="px-8 py-5 font-black text-slate-900">{cat.name}</TableCell>
                      <TableCell className="font-bold text-slate-500">{cat.count} listings</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cat.trend === 'Rising' ? 'bg-emerald-50 text-emerald-600 border-none' : 'bg-slate-50 text-slate-400 border-none'}>
                          {cat.trend}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-8">
                        <Button size="icon" variant="ghost" className="rounded-xl"><Edit2 className="h-4 w-4 text-slate-300" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* WALLET & BILLING TAB */}
        <TabsContent value="billing" className="animate-in fade-in duration-500 m-0 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-slate-900">Fee Configuration</h3>
                    <Button variant="ghost" className="font-bold text-primary">Billing Policy PDF <ExternalLink className="ml-2 h-4 w-4" /></Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Label className="font-black text-[10px] uppercase text-slate-400 tracking-widest">Global Coin Ratio</Label>
                      <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-[2rem] border-2 border-slate-100">
                        <Coins className="h-8 w-8 text-primary" />
                        <div className="flex-1">
                          <p className="text-sm font-black text-slate-900">1 Hub Coin = ₹1.00</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase">Settlement Value</p>
                        </div>
                        <Button variant="ghost" size="sm" className="font-black text-xs text-primary">Edit</Button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Label className="font-black text-[10px] uppercase text-slate-400 tracking-widest">Marketplace Commission</Label>
                      <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-[2rem] border-2 border-slate-100">
                        <Percent className="h-8 w-8 text-blue-600" />
                        <div className="flex-1">
                          <p className="text-sm font-black text-slate-900">5.0% flat fee</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase">On digital orders</p>
                        </div>
                        <Button variant="ghost" size="sm" className="font-black text-xs text-primary">Edit</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
                <CardHeader className="p-8">
                  <CardTitle className="text-xl font-black">System Payout Health</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-slate-50/50">
                      <TableRow className="border-none">
                        <TableHead className="px-8 h-14 font-black uppercase text-[10px] tracking-widest text-slate-400">Merchant Type</TableHead>
                        <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Total Dues</TableHead>
                        <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Next Payout</TableHead>
                        <TableHead className="text-right px-8 font-black uppercase text-[10px] tracking-widest">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { type: "Tier 1 Verified", dues: "₹12.4M", date: "Nov 05", status: "Ready" },
                        { type: "New Partners", dues: "₹450k", date: "Nov 07", status: "In Audit" },
                      ].map((item, i) => (
                        <TableRow key={i} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                          <TableCell className="px-8 py-5 font-bold text-slate-800">{item.type}</TableCell>
                          <TableCell className="font-black text-slate-900">{item.dues}</TableCell>
                          <TableCell className="font-bold text-slate-500">{item.date}</TableCell>
                          <TableCell className="text-right px-8">
                            <Badge className={item.status === 'Ready' ? 'bg-emerald-500' : 'bg-amber-500'}>{item.status}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-8 space-y-6 relative overflow-hidden">
                <Wallet className="absolute -top-4 -right-4 h-32 w-32 opacity-10 text-primary" />
                <div className="relative z-10 space-y-2">
                  <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">System Reserve</p>
                  <h2 className="text-5xl font-black tracking-tighter">₹42.8M</h2>
                  <p className="text-xs font-bold text-slate-400 uppercase">Available for settlements</p>
                </div>
                <Button className="w-full bg-primary rounded-xl h-12 font-black uppercase text-[10px] tracking-widest relative z-10">Financial Config</Button>
              </Card>

              <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6">
                <h3 className="text-xl font-black">Billing Alerts</h3>
                <div className="space-y-4">
                  {[
                    { label: "12 overdue merchant fees", priority: "High" },
                    { label: "Coin inflation threshold met", priority: "Medium" },
                  ].map((alert, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-rose-100 transition-all cursor-pointer group">
                      <AlertTriangle className={alert.priority === 'High' ? 'h-5 w-5 text-rose-500' : 'h-5 w-5 text-amber-500'} />
                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-700">{alert.label}</p>
                        <p className="text-[9px] font-black uppercase text-slate-400">{alert.priority} PRIORITY</p>
                      </div>
                      <ChevronDown className="h-4 w-4 text-slate-300 group-hover:text-primary transition-colors" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Floating Action Button for Exit */}
      <Link href="/admin/dashboard">
        <button className="fixed bottom-8 right-8 w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group">
          <div className="flex flex-col items-center">
            <XCircle className="h-5 w-5" />
            <span className="text-[8px] font-black uppercase mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Exit Manager</span>
          </div>
        </button>
      </Link>
    </div>
  )
}
