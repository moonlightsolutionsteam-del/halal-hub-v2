
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
  Tag, Plus, Heart, Activity, 
  FileText, Landmark, Calendar, Eye, 
  XCircle, Trash2, Edit2, ShieldAlert,
  Coins, Wallet, Layers, Award, Percent,
  TrendingUp, Scale, Settings, ExternalLink, Gift,
  Sparkles, Ticket, LayoutGrid, Smartphone, 
  ClipboardList, History, Zap, Shield
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import Link from "next/link"

export default function SuperAdminEventManagement() {
  const [activeTab, setActiveTab] = React.useState("dashboard")

  const MOCK_VENUES = [
    { id: "VEN-001", name: "The Grand Halal Ballroom", city: "Manhattan, NY", type: "Banquet Hall", status: "Verified", rating: 4.9, capacity: 500 },
    { id: "VEN-002", name: "Heritage Garden Spaces", city: "Brooklyn, NY", type: "Outdoor", status: "Verified", rating: 4.7, capacity: 250 },
    { id: "VEN-003", name: "Royal Plaza Suites", city: "Queens, NY", type: "Hotel Ballroom", status: "Pending", rating: 4.8, capacity: 1000 },
    { id: "VEN-004", name: "Crescent Community Center", city: "Jersey City, NJ", type: "Civic Space", status: "Verified", rating: 4.5, capacity: 150 },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-24">
      <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline text-slate-900 uppercase tracking-tight">Event Services & Venues</h1>
        <p className="text-muted-foreground font-medium text-lg italic">Platform oversight for halls, ticketing, and Shariah-compliant hosting.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="flex items-center justify-between bg-white p-2 rounded-2xl shadow-sm border overflow-x-auto no-scrollbar">
          <TabsList className="bg-transparent h-auto p-0 gap-1 flex justify-start min-w-max">
            {[
              { id: "dashboard", label: "Dashboard" },
              { id: "all", label: "All Venues" },
              { id: "verification", label: "Verification" },
              { id: "governance", label: "Halal Governance" },
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
                className="rounded-xl data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-6 py-2.5 font-bold transition-all shadow-none border-none whitespace-nowrap uppercase text-[10px] tracking-widest"
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
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">Active Listings</span>
                <div className="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-slate-900">210</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase">+5 this month</p>
              </div>
            </Card>

            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">Live Bookings</span>
                <div className="h-10 w-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Ticket className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-slate-900">12.4k</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">This Quarter</p>
              </div>
            </Card>

            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">Global Reach</span>
                <div className="h-10 w-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Users className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-slate-900">45k</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Pax Expected</p>
              </div>
            </Card>
          </div>

          <Card className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden border-2 border-rose-50">
            <CardHeader className="p-8 flex flex-row items-center justify-between border-b bg-rose-50/20">
              <div className="space-y-1">
                <CardTitle className="text-xl font-black text-rose-600 flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5" /> High-Risk Moderation
                </CardTitle>
                <p className="text-sm text-muted-foreground font-medium">Review flagged events or venue privacy protocol violations.</p>
              </div>
              <Button size="sm" className="bg-rose-600 hover:bg-rose-700 rounded-xl font-black text-xs h-10 px-6 text-white group shadow-lg shadow-rose-200">
                Moderate Queue <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-rose-50/10">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black uppercase text-[10px] tracking-widest text-rose-400">Event / Venue</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-rose-400">Violation Type</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-rose-400 text-center">Urgency</TableHead>
                    <TableHead className="text-right px-8 h-14 font-black uppercase text-[10px] tracking-widest text-rose-400">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Global Halal Expo", venue: "ExCel Center", type: "Security Protocol", level: "Critical", status: "In Review" },
                    { name: "Private Nikah Gala", venue: "The Grand Hall", type: "Privacy Breach", level: "Moderate", status: "Pending" },
                  ].map((item, i) => (
                    <TableRow key={i} className="border-rose-50 hover:bg-rose-50/5 transition-colors">
                      <TableCell className="px-8 py-5">
                        <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                        <p className="text-[10px] font-medium text-slate-400">{item.venue}</p>
                      </TableCell>
                      <TableCell className="font-bold text-slate-500 text-xs uppercase tracking-tighter">{item.type}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={item.level === 'Critical' ? 'bg-rose-50 text-rose-600 border-none px-3 font-black text-[9px]' : 'bg-amber-50 text-amber-600 border-none px-3 font-black text-[9px]'}>
                          {item.level}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-8 font-black text-slate-400 text-[10px] uppercase">
                        {item.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ALL VENUES TAB */}
        <TabsContent value="all" className="animate-in fade-in duration-500 m-0">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="p-8 border-b space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input placeholder="Search venues by name, ID or city..." className="pl-9 h-12 rounded-2xl bg-slate-50 border-none font-medium" />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="rounded-xl h-12 gap-2 border-2 font-bold"><Filter className="h-4 w-4" /> Filters</Button>
                  <Button className="bg-primary hover:bg-primary/90 rounded-2xl h-12 px-8 font-black text-white shadow-lg shadow-primary/20">
                    <Plus className="mr-2 h-4 w-4" /> Add Venue
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Venue Identity</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Location</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400 text-center">Trust Rating</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Status</TableHead>
                    <TableHead className="text-right px-8 font-black text-[10px] uppercase tracking-widest text-slate-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_VENUES.map((venue) => (
                    <TableRow key={venue.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors group">
                      <TableCell className="px-8 py-5">
                        <p className="font-black text-slate-800 text-base">{venue.name}</p>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-tighter">{venue.id} • {venue.type}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                          <MapPin className="h-3 w-3" /> {venue.city}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-1.5 font-black text-sm">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 border-none" /> {venue.rating}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          venue.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 font-black text-[9px] px-3' : 'bg-amber-50 text-amber-600 border-amber-200 font-black text-[9px] px-3'
                        }>
                          {venue.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-8">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="icon" variant="ghost" className="rounded-xl"><Edit2 className="h-4 w-4 text-slate-400" /></Button>
                          <Button size="icon" variant="ghost" className="rounded-xl hover:text-rose-600 transition-colors"><Trash2 className="h-4 w-4 text-slate-400" /></Button>
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
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
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
                        <TableRow key={i} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                          <TableCell className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner shrink-0">
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
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10">
            <div className="space-y-10">
              <div className="space-y-2 border-b pb-6">
                <h3 className="text-3xl font-black text-slate-900">Hosting & Privacy Protocols</h3>
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
                    <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-transparent hover:border-primary/20 transition-all cursor-pointer group shadow-sm">
                      <span className="font-bold text-slate-700 text-sm">{rule.label}</span>
                      <Badge className={rule.active ? "bg-emerald-500 text-white font-black text-[8px]" : "bg-slate-200 text-slate-500 font-black text-[8px]"}>
                        {rule.active ? "MANDATORY" : "OPTIONAL"}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white space-y-8 relative overflow-hidden flex flex-col justify-between">
                  <Scale className="absolute -top-4 -right-4 h-32 w-32 opacity-10" />
                  <div className="space-y-4 relative z-10">
                    <h4 className="text-2xl font-black text-primary uppercase tracking-tighter">Venue Charter v2.4</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      All new venues must digitally sign the updated privacy charter before going live. This version includes updated guidelines for mixed-use ballroom spaces.
                    </p>
                  </div>
                  <div className="space-y-4 relative z-10">
                    <Button className="w-full bg-primary hover:bg-primary/90 rounded-xl font-black text-[10px] h-12 uppercase tracking-widest shadow-xl">Update Charter Template</Button>
                    <p className="text-[10px] text-center text-slate-500 font-bold">Last Updated: Sept 12, 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* WALLET & BILLING TAB */}
        <TabsContent value="billing" className="animate-in fade-in duration-500 m-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10 space-y-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-slate-900">Vertical Financial Health</h3>
                  <Button variant="ghost" className="font-black text-xs text-primary uppercase tracking-widest">Billing Policy PDF <ExternalLink className="ml-2 h-4 w-4" /></Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-slate-50 rounded-[2rem] space-y-2 border shadow-inner">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Avg. Platform Fee</p>
                    <p className="text-4xl font-black text-slate-900">7.5% <span className="text-sm font-bold text-slate-400 italic">flat</span></p>
                    <p className="text-xs font-bold text-emerald-600">Applied to digital ticket sales</p>
                  </div>
                  <div className="p-8 bg-slate-50 rounded-[2rem] space-y-2 border shadow-inner">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Escrow Holdings</p>
                    <p className="text-4xl font-black text-slate-900">₹18.4M</p>
                    <p className="text-xs font-bold text-slate-400 uppercase">Awaiting post-event release</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-black uppercase text-slate-400 tracking-widest">Recent Settlements</h4>
                  <div className="divide-y border rounded-2xl overflow-hidden">
                    {[
                      { id: "SET-991", venue: "The Grand Hall", amount: "₹45,000", status: "Released", date: "Nov 01" },
                      { id: "SET-992", venue: "Heritage Spaces", amount: "₹12,200", status: "Processing", date: "Oct 30" },
                    ].map((set, i) => (
                      <div key={i} className="p-4 bg-white flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-400">{set.id}</span>
                        <span className="text-slate-900">{set.venue}</span>
                        <span className="text-primary">{set.amount}</span>
                        <Badge className={set.status === 'Released' ? 'bg-emerald-50 text-emerald-600 border-none' : 'bg-blue-50 text-blue-600 border-none'}>{set.status}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
            <div className="lg:col-span-4 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-8 space-y-8 relative overflow-hidden flex flex-col justify-between h-full">
                <Wallet className="absolute -top-4 -right-4 h-32 w-32 opacity-10 text-primary" />
                <div className="relative z-10 space-y-4">
                  <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">System Reserve</p>
                  <h2 className="text-6xl font-black tracking-tighter text-primary">₹42.8M</h2>
                  <p className="text-xs font-bold text-slate-400 uppercase leading-relaxed">
                    Vertical liquidity reserve for venue payouts and refund mitigation.
                  </p>
                </div>
                <div className="space-y-4 relative z-10">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-14 font-black uppercase text-xs tracking-widest shadow-xl">Financial Dashboard</Button>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 rounded-xl h-14 font-black uppercase text-xs tracking-widest">Update Payout Rules</Button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* REVIEWS TAB */}
        <TabsContent value="reviews" className="animate-in fade-in duration-500 m-0">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="p-8 border-b flex flex-row items-center justify-between bg-amber-50/10">
              <div className="space-y-1">
                <CardTitle className="text-xl font-black">Community Feedback</CardTitle>
                <CardDescription className="font-medium italic">Moderate guest reviews and reported safety flags.</CardDescription>
              </div>
              <Badge className="bg-amber-50 text-amber-600 border-none font-black px-4 h-8 flex items-center text-[9px] tracking-widest uppercase">15 PENDING REPORTS</Badge>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black uppercase text-[10px] tracking-widest text-slate-400">Report ID</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-slate-400">Venue & Content</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-slate-400 text-center">Flag Reason</TableHead>
                    <TableHead className="text-right px-8 h-14 font-black uppercase text-[10px] tracking-widest text-slate-400">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: "REP-901", venue: "The Grand Hall", content: "Review #8821", reason: "Inappropriate Language", date: "2h ago" },
                    { id: "REP-902", venue: "Royal Plaza", content: "Photo #1042", reason: "Privacy Violation", date: "5h ago" },
                  ].map((rep, i) => (
                    <TableRow key={i} className="border-slate-100 hover:bg-slate-50/50 transition-colors group">
                      <TableCell className="px-8 py-6">
                        <div className="font-black text-slate-900 text-xs">{rep.id}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase">{rep.date}</div>
                      </TableCell>
                      <TableCell>
                        <p className="font-black text-slate-800 text-base">{rep.content}</p>
                        <p className="text-[10px] font-bold text-primary uppercase">at {rep.venue}</p>
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
              <Card key={i} className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden flex flex-col justify-between border-2 border-transparent hover:border-primary/10 transition-all group">
                <CardHeader className="p-8 pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner group-hover:scale-110 transition-transform">
                      <Tag className="h-6 w-6" />
                    </div>
                    <Badge className={offer.active ? "bg-emerald-50 text-emerald-600 border-none font-black text-[8px]" : "bg-slate-100 text-slate-400 border-none font-black text-[8px]"}>
                      {offer.active ? "ACTIVE" : "EXPIRED"}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 leading-tight">{offer.title}</h3>
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-[10px] font-black text-primary bg-primary/5 px-2 py-0.5 rounded-md uppercase tracking-tighter">{offer.code}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">• {offer.claims} Claims</span>
                  </div>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <p className="text-2xl font-black text-slate-900">{offer.discount}</p>
                </CardContent>
                <CardFooter className="p-8 border-t bg-slate-50/50 flex gap-2">
                  <Button variant="outline" className="flex-1 rounded-xl h-10 font-black text-[10px] uppercase tracking-widest border-2">Edit</Button>
                  <Button size="icon" variant="ghost" className="rounded-xl h-10 w-10 text-rose-500 hover:bg-rose-50"><Trash2 className="h-4 w-4" /></Button>
                </CardFooter>
              </Card>
            ))}
            <button className="rounded-[2.5rem] border-4 border-dashed border-slate-100 bg-slate-50/30 flex flex-col items-center justify-center p-12 text-center gap-4 hover:bg-white hover:border-primary/20 transition-all cursor-pointer group min-h-[300px]">
              <div className="h-16 w-16 bg-white rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Plus className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="font-black text-xl text-slate-900">New Campaign</p>
                <p className="text-sm text-slate-400 font-medium">Create seasonal or targeted deals</p>
              </div>
            </button>
          </div>
        </TabsContent>

        {/* LOYALTY TAB */}
        <TabsContent value="loyalty" className="animate-in fade-in duration-500 m-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-primary text-primary-foreground p-10 relative overflow-hidden">
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
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900">Loyalty Tiers</h3>
                  <p className="text-sm text-slate-500 font-medium">Manage how users earn Hub Coins for venue bookings.</p>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Standard Earn", rate: "1 Coin / ₹100" },
                    { label: "Verified Partner Multiplier", rate: "1.5x Multiplier" },
                    { label: "Early Bird Bonus", rate: "500 Flat Coins" },
                  ].map((tier, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border">
                      <span className="text-xs font-black text-slate-600 uppercase tracking-tighter">{tier.label}</span>
                      <span className="text-sm font-black text-primary">{tier.rate}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-12 font-black uppercase text-[10px] tracking-widest">Adjust Ratios</Button>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* CERTIFICATES TAB */}
        <TabsContent value="certificates" className="animate-in fade-in duration-500 m-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="p-8 border-b bg-slate-50/30 flex flex-row items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-black">Trust Assets Registry</CardTitle>
                  <CardDescription className="font-medium italic">Track physical and digital certification distribution.</CardDescription>
                </div>
                <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-xl font-black text-xs h-10 px-6 text-white shadow-lg shadow-primary/20">
                  Generate Batch <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="border-none">
                      <TableHead className="px-8 h-14 font-black uppercase text-[10px] tracking-widest text-slate-400">Partner</TableHead>
                      <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-slate-400">Asset Type</TableHead>
                      <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-slate-400 text-center">Status</TableHead>
                      <TableHead className="text-right px-8 h-14 font-black uppercase text-[10px] tracking-widest text-slate-400">Dispatched</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "The Grand Hall", type: "Digital Badge + QR Kit", status: "Active", date: "Nov 01" },
                      { name: "Heritage Spaces", type: "Privacy Charter Seal", status: "In Transit", date: "Oct 28" },
                      { name: "Crescent Center", type: "Digital Certificate", status: "Active", date: "Oct 15" },
                    ].map((item, i) => (
                      <TableRow key={i} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                        <TableCell className="px-8 py-5 font-bold text-slate-800 text-sm">{item.name}</TableCell>
                        <TableCell className="font-bold text-slate-500 text-xs italic">{item.type}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={item.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-none px-3 font-black text-[8px]' : 'bg-blue-50 text-blue-600 border-none px-3 font-black text-[8px]'}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right px-8 font-black text-slate-400 text-[10px] uppercase">
                          {item.date}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <div className="space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6">
                <h3 className="text-xl font-black">Asset Inventory</h3>
                <div className="space-y-4">
                  {[
                    { label: "Physical QR Kits", count: 124 },
                    { label: "Window Decals", count: 85 },
                    { label: "Charter Plaques", count: 42 },
                  ].map((inv, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border">
                      <span className="text-xs font-black text-slate-600 uppercase tracking-widest">{inv.label}</span>
                      <span className="text-lg font-black text-slate-900">{inv.count}</span>
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
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="p-8 border-b flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-black">Venue Taxonomy</CardTitle>
                <CardDescription className="font-medium">Control primary categories and listing tags for the events vertical.</CardDescription>
              </div>
              <Button className="bg-primary hover:bg-primary/90 rounded-full font-black text-xs px-8 h-10 text-white shadow-lg shadow-primary/20">
                <Plus className="mr-2 h-4 w-4" /> Add Category
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black uppercase text-[10px] tracking-widest text-slate-400">Category Name</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-slate-400">Active Venues</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-slate-400">Search Trend</TableHead>
                    <TableHead className="text-right px-8 h-14 font-black uppercase text-[10px] tracking-widest text-slate-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Banquet Halls", count: 124, trend: "Rising" },
                    { name: "Outdoor Gardens", count: 45, trend: "Steady" },
                    { name: "Hotel Ballrooms", count: 32, trend: "High Demand" },
                    { name: "Civic Spaces", count: 12, trend: "Stable" },
                  ].map((cat, i) => (
                    <TableRow key={i} className="border-slate-100 hover:bg-slate-50/50 transition-colors group">
                      <TableCell className="px-8 py-5 font-black text-slate-800 text-sm uppercase tracking-tight">{cat.name}</TableCell>
                      <TableCell className="font-bold text-slate-500 text-xs">{cat.count} establishments</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cat.trend.includes('Rising') || cat.trend.includes('High') ? 'bg-emerald-50 text-emerald-600 border-none font-black text-[8px] px-3' : 'bg-slate-50 text-slate-400 border-none font-black text-[8px] px-3'}>
                          {cat.trend}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-8">
                        <Button size="icon" variant="ghost" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"><Edit2 className="h-4 w-4 text-slate-400" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Link href="/admin/dashboard">
        <button className="fixed bottom-8 right-8 w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group">
          <div className="flex flex-col items-center">
            <ExternalLink className="h-5 w-5" />
            <span className="text-[8px] font-black uppercase mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Exit Panel</span>
          </div>
        </button>
      </Link>
    </div>
  )
}
