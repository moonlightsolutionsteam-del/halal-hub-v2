
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
  Store, Tag, Plus, Heart, Activity, 
  FileText, Landmark, Calendar, Eye, 
  XCircle, Trash2, Edit2, ShieldAlert,
  Coins, Wallet, Layers, Award, Percent,
  TrendingUp, Scale, Settings, ExternalLink, Gift,
  Package, Box, Truck, FlaskConical, Utensils
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

const BeefIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.5 2a2.5 2.5 0 0 0-2.5 2.5V6a3 3 0 0 0 3 3h1a2 2 0 0 1 2 2v1a3 3 0 0 1-3 3h-1a3 3 0 0 1-3-3v-1.5" />
    <path d="M15 22a7 7 0 0 0 7-7c0-2.5-2-4.5-4.5-4.5h-1a2.5 2.5 0 0 0-2.5 2.5V15a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-1" />
    <circle cx="15" cy="15" r="1" />
  </svg>
);

export default function SuperAdminMeatManagement() {
  const [activeTab, setActiveTab] = React.useState("dashboard")

  const MOCK_SHOPS = [
    { id: "MT-001", name: "Punjab Meats", city: "London", type: "Retail", status: "Verified", rating: 4.9, joined: "Oct 2023" },
    { id: "MT-002", name: "Quality Halal Meat", city: "Birmingham", type: "Wholesale", status: "Verified", rating: 4.8, joined: "Nov 2023" },
    { id: "MT-003", name: "Al-Noor Butchers", city: "Manchester", type: "Retail", status: "Pending Docs", rating: 4.7, joined: "Jan 2024" },
    { id: "MT-004", name: "Heritage Organic Meats", city: "London", type: "Farm Direct", status: "Verified", rating: 4.9, joined: "Dec 2023" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-24">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline text-slate-900">Meat Shops & Butchers</h1>
        <p className="text-muted-foreground font-medium">Manage butcher shops, verifications, and categories.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="flex items-center justify-between bg-white p-2 rounded-2xl shadow-sm border overflow-x-auto no-scrollbar">
          <TabsList className="bg-transparent h-auto p-0 gap-1 flex justify-start min-w-max">
            {[
              { id: "dashboard", label: "Dashboard" },
              { id: "all", label: "All Shops" },
              { id: "verification", label: "Verification" },
              { id: "governance", label: "Halal Governance" },
              { id: "reviews", label: "Reviews" },
              { id: "offers", label: "Offers" },
              { id: "loyalty", label: "Loyalty" },
              { id: "certificates", label: "Certificates" },
              { id: "categories", label: "Categories" },
              { id: "services", label: "Services" },
              { id: "billing", label: "Wallet & Billing" }
            ].map((tab) => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id} 
                className="rounded-xl data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-6 py-2.5 font-bold transition-all shadow-none border-none whitespace-nowrap"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* DASHBOARD TAB */}
        <TabsContent value="dashboard" className="space-y-8 m-0 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Total Shops</span>
                <div className="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-100 transition-colors">
                  <BeefIcon className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-slate-900">150</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase">+12 since last month</p>
              </div>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Verified Shops</span>
                <div className="h-10 w-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-slate-900">120</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">80% of total</p>
              </div>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Pending Verifications</span>
                <div className="h-10 w-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-inner">
                  <Clock className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-slate-900">8</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase">2 new today</p>
              </div>
            </Card>
          </div>

          <Card className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="p-8 flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-black text-slate-900">Recent Verifications</CardTitle>
                <p className="text-sm text-muted-foreground font-medium">New butcher shops awaiting review and approval.</p>
              </div>
              <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-xl font-black text-xs h-10 px-6 text-white group">
                View All <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black uppercase text-[10px] tracking-widest text-slate-400">Name</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-slate-400">Type</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-slate-400 text-center">Status</TableHead>
                    <TableHead className="text-right px-8 h-14 font-black uppercase text-[10px] tracking-widest text-slate-400">Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Quality Halal Meat", type: "Business", status: "Approved", date: "2024-07-30", statusVariant: "success" },
                    { name: "Punjab Meats", type: "Business", status: "Pending Docs", date: "2024-07-29", statusVariant: "warning" },
                  ].map((item, i) => (
                    <TableRow key={i} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <TableCell className="px-8 py-5 font-bold text-slate-800 text-sm">{item.name}</TableCell>
                      <TableCell className="font-bold text-slate-500 text-xs">{item.type}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={
                          item.statusVariant === 'success' ? 'bg-emerald-50 text-emerald-600 border-none px-3 font-black text-[9px]' : 'bg-amber-50 text-amber-600 border-none px-3 font-black text-[9px]'
                        }>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-8 font-bold text-slate-400 text-xs">{item.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ALL SHOPS TAB */}
        <TabsContent value="all" className="animate-in fade-in duration-500 m-0">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="p-8 border-b space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input placeholder="Search shops by name, ID or city..." className="pl-9 h-12 rounded-2xl bg-slate-50 border-none font-medium" />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="rounded-xl h-12 gap-2 border-2 font-bold"><Filter className="h-4 w-4" /> Filters</Button>
                  <Button className="bg-primary hover:bg-primary/90 rounded-2xl h-12 px-8 font-black text-white shadow-lg shadow-primary/20">
                    <Plus className="mr-2 h-4 w-4" /> Add Shop
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black uppercase text-[10px] tracking-widest text-slate-400">ID / Date</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Shop Name</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">City</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Rating</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Status</TableHead>
                    <TableHead className="text-right px-8 font-black text-[10px] uppercase tracking-widest">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_SHOPS.map((shop) => (
                    <TableRow key={shop.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <TableCell className="px-8 py-5">
                        <div className="font-black text-slate-900 text-xs">{shop.id}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase">{shop.joined}</div>
                      </TableCell>
                      <TableCell>
                        <p className="font-black text-slate-800 text-base">{shop.name}</p>
                        <p className="text-[10px] font-bold text-primary uppercase">{shop.type}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                          <MapPin className="h-3 w-3" /> {shop.city}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 font-black text-sm">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 border-none" /> {shop.rating}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          shop.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 px-3' : 'bg-amber-50 text-amber-600 border-amber-200 px-3'
                        }>
                          {shop.status}
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

        {/* VERIFICATION TAB */}
        <TabsContent value="verification" className="animate-in fade-in duration-500 m-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
                <CardHeader className="p-8 bg-slate-50/50">
                  <CardTitle className="text-xl font-black">Audit Console</CardTitle>
                  <CardDescription>Shops awaiting manual verification of slaughterhouse proofs and certifications.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableBody>
                      {[
                        { name: "Al-Barakah Butchers", date: "2 mins ago", type: "Slaughterhouse Proof", docs: 2 },
                        { name: "City Halal Wholesale", date: "45 mins ago", type: "Trade License", docs: 1 },
                        { name: "Prime Cuts Organic", date: "3 hours ago", type: "Halal Certificate", docs: 4 },
                      ].map((item, i) => (
                        <TableRow key={i} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                          <TableCell className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 shadow-inner">
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
                              <Layers className="h-3.5 w-3.5" /> {item.docs} Files
                            </div>
                          </TableCell>
                          <TableCell className="text-right px-8">
                            <Button className="bg-primary hover:bg-primary/90 rounded-full font-black text-[10px] uppercase tracking-widest h-9 px-6 text-white shadow-md">Begin Audit</Button>
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
                    5 applications have been in the queue for more than 48 hours. Freshness of documents is critical for meat shops.
                  </p>
                </div>
                <Button variant="secondary" className="w-full rounded-xl font-black text-xs h-12 shadow-2xl">Prioritize High-Risk</Button>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* OTHER TABS - PLACEHOLDERS */}
        {["governance", "reviews", "offers", "loyalty", "certificates", "categories", "services", "billing"].map((tab) => (
          <TabsContent key={tab} value={tab} className="animate-in fade-in duration-500 m-0">
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-20 text-center space-y-6">
              <div className="h-20 w-20 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-200 mx-auto">
                <Settings className="h-10 w-10 animate-spin-slow" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{tab.replace(/&/g, ' & ')} Module</h3>
                <p className="text-muted-foreground font-medium max-w-sm mx-auto italic">
                  This specialized administrative engine is currently being optimized for high-fidelity data throughput.
                </p>
              </div>
              <Button variant="outline" className="rounded-xl border-2 font-bold px-8">Refresh Module</Button>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Floating Return App Button */}
      <Link href="/">
        <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group">
          <div className="flex flex-col items-center">
            <RefreshCw className="h-5 w-5" />
            <span className="text-[8px] font-black uppercase mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Return App</span>
          </div>
        </button>
      </Link>
    </div>
  )
}

function RefreshCw(props: any) {
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
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  )
}
