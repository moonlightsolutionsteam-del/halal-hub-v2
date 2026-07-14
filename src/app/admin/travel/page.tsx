
"use client"

import * as React from "react"
import { useAdminCategory } from "@/hooks/use-admin-category"
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
  Plane, Globe, Compass, Briefcase, Timer
} from "lucide-react"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import Link from "next/link"

export default function SuperAdminTravelManagement() {
  const [activeTab, setActiveTab] = React.useState("dashboard")

  const cat = useAdminCategory("Travel & Tourism")

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-7xl mx-auto pb-24">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground uppercase tracking-tighter">Travel & Tourism</h1>
        <p className="text-muted-foreground font-medium text-sm sm:text-lg italic">Manage agencies, pilgrim partners, and Shariah-compliant itineraries.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="flex items-center justify-between bg-card p-2 rounded-2xl shadow-sm border overflow-x-auto no-scrollbar">
          <TabsList className="bg-transparent h-auto p-0 gap-1 flex justify-start min-w-max">
            {[
              { id: "dashboard", label: "Dashboard" },
              { id: "all", label: "All Agencies" },
              { id: "verification", label: "Verification" },
              { id: "governance", label: "Pilgrim Charter" },
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

        <TabsContent value="dashboard" className="space-y-8 m-0 animate-in fade-in duration-500">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Active Agencies</span>
                <div className="h-10 w-10 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
                  <Plane className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl sm:text-4xl font-black text-foreground">{cat.loading ? "—" : cat.total}</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase">{cat.active} active</p>
              </div>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Vetted Pilgrim Partners</span>
                <div className="h-10 w-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl sm:text-4xl font-black text-foreground">42</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Hajj & Umrah Vetted</p>
              </div>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total Bookings (MTD)</span>
                <div className="h-10 w-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Globe className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl sm:text-4xl font-black text-foreground">2.4k</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Active Itineraries</p>
              </div>
            </Card>
          </div>

          <Card className="rounded-[2rem] border-none shadow-sm bg-card">
            <CardHeader className="p-8 flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-black text-foreground">Pilgrimage Audit Queue</CardTitle>
                <p className="text-sm text-muted-foreground font-medium">Verify agency licenses for Hajj and Umrah package distribution.</p>
              </div>
              <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-xl font-black text-xs h-10 px-6 text-white group shadow-lg shadow-primary/20">
                Full Audit Trail <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Agency</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">License Class</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground text-center">Status</TableHead>
                    <TableHead className="text-right px-8 h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Saffron Travels", class: "Category A (Direct)", status: "Active", date: "2024-07-30" },
                    { name: "Al-Huda Pilgrimages", class: "Category B (Sub-Agent)", status: "Under Review", date: "2024-07-29" },
                  ].map((item, i) => (
                    <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors">
                      <TableCell className="px-8 py-5 font-bold text-foreground text-sm">{item.name}</TableCell>
                      <TableCell className="font-bold text-muted-foreground text-xs italic">{item.class}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={item.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-none px-3 font-black text-[8px]' : 'bg-blue-50 text-blue-600 border-none px-3 font-black text-[9px]'}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-8 font-bold text-muted-foreground text-xs">{item.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="animate-in fade-in duration-500 m-0">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card">
            <CardHeader className="p-8 border-b space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search agencies by name, ID or city..." className="pl-9 h-12 rounded-2xl bg-muted border-none font-medium" />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="rounded-xl h-12 gap-2 border-2 font-bold"><Filter className="h-4 w-4" /> Filters</Button>
                  <Button className="bg-primary hover:bg-primary/90 rounded-2xl h-12 px-8 font-black text-white shadow-lg shadow-primary/20">
                    <Plus className="mr-2 h-4 w-4" /> Add Agency
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Agency Identity</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Location</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-center">Trust Rating</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground text-center">Total Bookings</TableHead>
                    <TableHead className="text-right px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cat.loading ? (
                    <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
                  ) : cat.businesses.length === 0 ? (
                    <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No agencies found.</TableCell></TableRow>
                  ) : cat.businesses.map((biz) => (
                    <TableRow key={biz.id} className="border-border hover:bg-muted/50 transition-colors group">
                      <TableCell className="px-8 py-5">
                        <p className="font-black text-foreground text-base">{biz.name}</p>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-tighter">{biz.id.slice(0, 8).toUpperCase()} • {biz.subcategory ?? "—"}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" /> {[biz.city, biz.country].filter(Boolean).join(", ") || "—"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-1.5 font-black text-sm text-amber-500">
                          <Star className="h-3.5 w-3.5 fill-current border-none" /> {biz.rating ?? "—"}
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-black text-foreground text-sm">—</TableCell>
                      <TableCell className="text-right px-8">
                        <Badge variant="outline" className={
                          biz.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 font-black text-[9px] px-3' : biz.status === 'rejected' ? 'bg-red-50 text-red-600 border-red-200 font-black text-[9px] px-3' : 'bg-amber-50 text-amber-600 border-amber-200 font-black text-[9px] px-3'
                        }>
                          {biz.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="animate-in fade-in duration-500 m-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-card">
                <CardHeader className="p-8 border-b">
                  <CardTitle className="text-xl font-black">Audit Queue</CardTitle>
                  <CardDescription className="font-medium italic">Agencies awaiting document verification and pilgrim charter compliance audits.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableBody>
                      {[
                        { name: "Saffron Premium Travels", docs: 5, date: "2 mins ago", type: "IATA Renewal" },
                        { name: "Al-Huda Pilgrimages", docs: 3, date: "45 mins ago", type: "Umrah License" },
                        { name: "Global Halal Tours", docs: 8, date: "3 hours ago", type: "Full Compliance" },
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
                          <TableCell>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                              <Layers className="h-3.5 w-3.5" /> {item.docs} Logs
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
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 space-y-6 relative overflow-hidden">
                <ShieldCheck className="absolute -top-4 -right-4 h-24 w-24 opacity-10" />
                <div className="space-y-2 relative z-10">
                  <h3 className="text-xl font-black">Audit SLA Alert</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                    12 agency applications have been in the queue for more than 48 hours. Hajj season pre-verifications are prioritized.
                  </p>
                </div>
                <Button variant="secondary" className="w-full rounded-xl font-black text-xs h-12 shadow-2xl">Prioritize Queue</Button>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="governance" className="animate-in fade-in duration-500 m-0">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10">
            <div className="space-y-10">
              <div className="space-y-2 border-b pb-6">
                <h3 className="text-3xl font-black text-foreground uppercase tracking-tight">Pilgrim Charter Standards</h3>
                <p className="text-muted-foreground font-medium text-sm sm:text-lg italic">Global mandatory compliance criteria for travel partners.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  {[
                    { label: "100% Halal Board Guaranteed", active: true },
                    { label: "Mandatory Prayer Interval Scheduling", active: true },
                    { label: "Verified No-Alcohol Accommodations", active: true },
                    { label: "Female Guide Availability Option", active: true },
                    { label: "Ethical Sourcing Documentation", active: true },
                    { label: "Sustainable Travel Protocol", active: false },
                  ].map((rule, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-muted rounded-2xl border border-transparent hover:border-primary/20 transition-all cursor-pointer group shadow-sm">
                      <span className="font-bold text-foreground text-sm">{rule.label}</span>
                      <Badge className={rule.active ? "bg-emerald-500 text-white font-black text-[8px]" : "bg-muted text-muted-foreground font-black text-[8px]"}>
                        {rule.active ? "MANDATORY" : "OPTIONAL"}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="bg-zinc-900 rounded-[2.5rem] p-10 text-white space-y-6 relative overflow-hidden flex flex-col justify-between">
                  <Scale className="absolute -top-4 -right-4 h-32 w-32 opacity-10 text-primary" />
                  <div className="space-y-2 relative z-10">
                    <h4 className="text-xl font-black text-primary uppercase tracking-tighter">Itinerary Audit</h4>
                    <p className="text-muted-foreground text-sm">Automated reminders for agency package re-verifications.</p>
                  </div>
                  <Button variant="secondary" className="w-full rounded-xl font-black text-[10px] h-12 uppercase tracking-widest relative z-10 shadow-xl bg-card text-foreground">Manage Audit Board</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="animate-in fade-in duration-500 m-0">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card">
            <CardHeader className="p-8 border-b flex flex-row items-center justify-between bg-amber-50/10">
              <div className="space-y-1">
                <CardTitle className="text-xl font-black">Traveler Feedback</CardTitle>
                <p className="text-sm text-muted-foreground font-medium italic">Moderate agency reviews specifically focused on hospitality and charter compliance.</p>
              </div>
              <Badge className="bg-amber-50 text-amber-600 border-none font-black px-4 h-8 flex items-center text-[9px] tracking-widest uppercase">12 PENDING REPORTS</Badge>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Report ID</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Agency & Content</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground text-center">Quality Flag</TableHead>
                    <TableHead className="text-right px-8 h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: "REV-TRV-901", agency: "Saffron Travels", content: "Review #8821", reason: "Dietary Violation", date: "2h ago" },
                    { id: "REV-TRV-902", agency: "Al-Huda", content: "Photo #1042", reason: "Spiritual Integrity", date: "5h ago" },
                  ].map((rep, i) => (
                    <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors group">
                      <TableCell className="px-8 py-6">
                        <div className="font-black text-foreground text-xs">{rep.id}</div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase">{rep.date}</div>
                      </TableCell>
                      <TableCell>
                        <p className="font-black text-foreground text-base">{rep.content}</p>
                        <p className="text-[10px] font-bold text-primary uppercase">at {rep.agency}</p>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="border-rose-100 text-rose-600 bg-rose-50 font-black text-[9px] px-3 uppercase tracking-tighter">
                          {rep.reason}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-8">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="outline" className="rounded-xl font-black text-[10px] border-2 uppercase h-9">Dismiss</Button>
                          <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-black text-[10px] uppercase h-9 shadow-lg">Investigate</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offers" className="animate-in fade-in duration-500 m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Winter Umrah Promo", code: "UMRAH2024", discount: "₹10,000 OFF", active: true, claims: 124 },
              { title: "Early Bird Turkey", code: "TURK15", discount: "15% OFF", active: true, claims: 45 },
              { title: "Family Group Deal", code: "FAMSTAY", discount: "Free Visa Prep", active: false, claims: 8 },
            ].map((offer, i) => (
              <Card key={i} className="rounded-[2.5rem] border-none shadow-sm bg-card flex flex-col justify-between border-2 border-transparent hover:border-primary/10 transition-all group">
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
                    <span className="text-[10px] font-black text-primary bg-primary/5 px-2 py-0.5 rounded-md uppercase tracking-tighter">{offer.code}</span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">• {offer.claims} Claims</span>
                  </div>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <p className="text-2xl font-black text-foreground">{offer.discount}</p>
                </CardContent>
                <CardFooter className="p-8 border-t bg-muted/50 flex gap-2">
                  <Button variant="outline" className="flex-1 rounded-xl h-10 font-black text-[10px] uppercase tracking-widest border-2">Edit</Button>
                  <Button size="icon" variant="ghost" className="rounded-xl h-10 w-10 text-rose-500 hover:bg-rose-50"><Trash2 className="h-4 w-4" /></Button>
                </CardFooter>
              </Card>
            ))}
            <button className="rounded-[2.5rem] border-4 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center p-12 text-center gap-4 hover:bg-card hover:border-primary/20 transition-all cursor-pointer group min-h-[300px]">
              <div className="h-16 w-16 bg-card rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Plus className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="font-black text-xl text-foreground">New Campaign</p>
                <p className="text-sm text-muted-foreground font-medium">Create seasonal or group package deals</p>
              </div>
            </button>
          </div>
        </TabsContent>

        <TabsContent value="loyalty" className="animate-in fade-in duration-500 m-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-primary text-primary-foreground p-10 relative overflow-hidden">
                <Coins className="absolute -top-4 -right-4 h-48 w-48 opacity-10" />
                <div className="relative z-10 space-y-8">
                  <div className="space-y-2">
                    <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Vertical Redemption Rate</p>
                    <h2 className="text-4xl sm:text-7xl font-black tracking-tighter">62.4%</h2>
                    <div className="flex items-center gap-2 text-sm font-bold bg-card/20 w-fit px-4 py-1.5 rounded-full backdrop-blur-md">
                      <TrendingUp className="h-4 w-4" /> +15.4% Contribution Lift
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-white/10 pt-8">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase opacity-60 tracking-widest leading-none mb-1">Miles Issued</p>
                      <p className="text-2xl font-black">4.2M</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase opacity-60 tracking-widest leading-none mb-1">Redemptions</p>
                      <p className="text-2xl font-black">3.1M</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase opacity-60 tracking-widest leading-none mb-1">Avg. Save</p>
                      <p className="text-2xl font-black">₹1,250</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="lg:col-span-4 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-foreground">Agency Tiers</h3>
                  <p className="text-sm text-muted-foreground font-medium italic">Manage how travelers earn Hub Coins for stay bookings.</p>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Standard Earn", rate: "1 Coin / ₹100" },
                    { label: "Verified Agency Multiplier", rate: "1.5x Multiplier" },
                    { label: "Hajj Booking Bonus", rate: "5000 Flat Coins" },
                  ].map((tier, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-2xl border">
                      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter">{tier.label}</span>
                      <span className="text-sm font-black text-primary">{tier.rate}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-12 font-black uppercase text-[10px] tracking-widest">Adjust Ratios</Button>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="certificates" className="animate-in fade-in duration-500 m-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 rounded-[2.5rem] border-none shadow-sm bg-card">
              <CardHeader className="p-8 border-b bg-muted/30 flex flex-row items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-black">Travel Trust Assets</CardTitle>
                  <p className="text-sm text-muted-foreground font-medium italic">Track physical and digital certification distribution for agencies.</p>
                </div>
                <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-xl font-black text-xs h-10 px-6 text-white shadow-lg shadow-primary/20">
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
                      { name: "Saffron Travels", type: "Digital Badge + QR Kit", status: "Active", date: "Nov 01" },
                      { name: "Al-Huda Pilgrimages", type: "Pilgrim Charter Seal", status: "In Transit", date: "Oct 28" },
                      { name: "Nomad Modest Tours", type: "Physical Plaque", status: "Active", date: "Oct 15" },
                    ].map((item, i) => (
                      <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors">
                        <TableCell className="px-8 py-5 font-bold text-foreground text-sm">{item.name}</TableCell>
                        <TableCell className="font-bold text-muted-foreground text-xs italic">{item.type}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={item.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-none px-3 font-black text-[8px]' : 'bg-blue-50 text-blue-600 border-none px-3 font-black text-[9px]'}>
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
                <h3 className="text-xl font-black text-foreground">Inventory Status</h3>
                <div className="space-y-4">
                  {[
                    { label: "Physical QR Standees", count: 45 },
                    { label: "Agency Window Decals", count: 80 },
                    { label: "Charter Certificates", count: 120 },
                  ].map((inv, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-2xl border border-transparent hover:border-primary/20 transition-all group shadow-sm">
                      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{inv.label}</span>
                      <span className="text-lg font-black text-foreground">{inv.count}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full rounded-xl h-12 font-black uppercase text-[10px] tracking-widest border-2">Order Supplies</Button>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="animate-in fade-in duration-500 m-0">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card">
            <CardHeader className="p-8 border-b flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-black text-foreground">Tour Taxonomy</CardTitle>
                <p className="text-sm text-muted-foreground font-medium italic">Control primary categories and listing tags for the travel vertical.</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 rounded-full font-black text-xs px-8 h-10 text-white shadow-lg shadow-primary/20">
                <Plus className="mr-2 h-4 w-4" /> Add Category
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Category Name</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Active Partners</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground text-center">Search Trend</TableHead>
                    <TableHead className="text-right px-8 h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Hajj & Umrah", count: 42, trend: "Rising" },
                    { name: "Guided Cultural Tours", count: 28, trend: "Steady" },
                    { name: "Family Getaways", count: 15, trend: "High Demand" },
                    { name: "Modest Adventure", count: 35, trend: "Stable" },
                  ].map((cat, i) => (
                    <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors group">
                      <TableCell className="px-8 py-5 font-black text-foreground text-sm uppercase tracking-tight">{cat.name}</TableCell>
                      <TableCell className="font-bold text-muted-foreground text-xs">{cat.count} agencies</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={cat.trend === 'Rising' || cat.trend.includes('High') ? 'bg-emerald-50 text-emerald-600 border-none font-black text-[8px] px-3' : 'bg-muted text-muted-foreground border-none font-black text-[8px] px-3'}>
                          {cat.trend}
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

        <TabsContent value="billing" className="animate-in fade-in duration-500 m-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10 space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-black">Agency Financial Health</h3>
                  <Button variant="ghost" className="font-black text-xs text-primary uppercase tracking-widest">Policy PDF <ExternalLink className="ml-2 h-4 w-4" /></Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-muted rounded-[2rem] space-y-2 border shadow-inner">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Platform Commission</p>
                    <p className="text-3xl font-black text-foreground">7.5% <span className="text-sm font-bold text-muted-foreground italic">flat</span></p>
                    <p className="text-xs font-bold text-emerald-600">On all digital package bookings</p>
                  </div>
                  <div className="p-8 bg-muted rounded-[2rem] space-y-2 border shadow-inner">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Net GMV (MTD)</p>
                    <p className="text-3xl font-black text-foreground">₹12.4M</p>
                    <p className="text-xs font-bold text-muted-foreground uppercase">Travel vertical gross volume</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-black uppercase text-muted-foreground tracking-widest px-2">Recent Settlements</h4>
                  <div className="divide-y border rounded-[2rem] overflow-hidden">
                    {[
                      { id: "SET-TRV-991", merchant: "Saffron Travels", amount: "₹4,45,000", status: "Released", date: "Nov 01" },
                      { id: "SET-TRV-992", merchant: "Al-Huda", amount: "₹8,45,200", status: "Processing", date: "Oct 30" },
                    ].map((set, i) => (
                      <div key={i} className="p-6 bg-card flex items-center justify-between text-xs font-bold hover:bg-muted transition-colors">
                        <span className="text-muted-foreground">{set.id}</span>
                        <span className="text-foreground flex-1 px-8 font-black">{set.merchant}</span>
                        <span className="text-primary px-8">{set.amount}</span>
                        <Badge className={set.status === 'Released' ? 'bg-emerald-50 text-emerald-600 border-none' : 'bg-blue-50 text-blue-600 border-none'}>{set.status}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
            <div className="lg:col-span-4 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 space-y-6 relative overflow-hidden flex flex-col justify-between h-full">
                <Wallet className="absolute -top-4 -right-4 h-32 w-32 opacity-10 text-primary" />
                <div className="relative z-10 space-y-2">
                  <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Vertical Reserve</p>
                  <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-primary">₹42.8M</h2>
                  <p className="text-xs font-bold text-muted-foreground uppercase leading-relaxed">
                    Vertical liquidity reserve for agency payouts and trip refund mitigation.
                  </p>
                </div>
                <div className="space-y-4 relative z-10">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-14 font-black uppercase text-[10px] tracking-widest shadow-xl">Financial Dashboard</Button>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-card/10 rounded-xl h-14 font-black uppercase text-[10px] tracking-widest">Audit Payout Rules</Button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
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
