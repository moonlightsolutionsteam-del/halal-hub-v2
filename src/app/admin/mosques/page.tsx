
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
  Church, Moon, HandHeart, Users2,
  ClipboardList, Bell, Zap, Database
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import Link from "next/link"

export default function SuperAdminMosqueManagement() {
  const [activeTab, setActiveTab] = React.useState("dashboard")

  const MOCK_MOSQUES = [
    { id: "MSQ-001", name: "Al-Huda Masjid", city: "New York, USA", type: "Juma Masjid", status: "Verified", rating: 4.9, donors: 1240 },
    { id: "MSQ-002", name: "Crescent Islamic Center", city: "London, UK", type: "Cultural Center", status: "Verified", rating: 4.8, donors: 850 },
    { id: "MSQ-003", name: "Masjid Al-Falah", city: "Toronto, CA", type: "Local Musalla", status: "Renewal Due", rating: 4.7, donors: 210 },
    { id: "MSQ-004", name: "Grand Mosque West", city: "Manchester, UK", type: "Juma Masjid", status: "Verified", rating: 4.5, donors: 450 },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-7xl mx-auto pb-24">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground uppercase tracking-tighter text-emerald-600">Mosque & Community Centers</h1>
        <p className="text-muted-foreground font-medium text-sm sm:text-lg italic">Platform oversight for masjids, prayer sync logs, and donation transparency.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="flex items-center justify-between bg-card p-2 rounded-2xl shadow-sm border overflow-x-auto no-scrollbar">
          <TabsList className="bg-transparent h-auto p-0 gap-1 flex justify-start min-w-max">
            {[
              { id: "dashboard", label: "Dashboard" },
              { id: "all", label: "All Mosques" },
              { id: "verification", label: "Verification" },
              { id: "governance", label: "Religious Standards" },
              { id: "reviews", label: "Community Feedback" },
              { id: "offers", label: "Fundraising" },
              { id: "loyalty", label: "Volunteer Hub" },
              { id: "certificates", label: "Certificates" },
              { id: "categories", label: "Categories" },
              { id: "billing", label: "Zakat & Sadaqah" }
            ].map((tab) => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id} 
                className="rounded-xl data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-600 px-6 py-2.5 font-bold transition-all shadow-none border-none whitespace-nowrap uppercase text-[10px] tracking-widest"
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
                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Active Masjids</span>
                <div className="h-10 w-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Church className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl sm:text-4xl font-black text-foreground">452</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase">+12 this month</p>
              </div>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Prayer Sync Rate</span>
                <div className="h-10 w-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Clock className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl sm:text-4xl font-black text-foreground">98.2%</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Live timestamp sync</p>
              </div>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Active Donors</span>
                <div className="h-10 w-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <HandHeart className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl sm:text-4xl font-black text-foreground">12.4k</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Across network</p>
              </div>
            </Card>
          </div>

          <Card className="rounded-[2rem] border-none shadow-sm bg-card">
            <CardHeader className="p-8 flex flex-row items-center justify-between border-b">
              <div className="space-y-1">
                <CardTitle className="text-xl font-black text-foreground">Recent Verifications</CardTitle>
                <p className="text-sm text-muted-foreground font-medium">Masjid committee documents and non-profit status reviews.</p>
              </div>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 rounded-xl font-black text-xs h-10 px-6 text-white group shadow-lg shadow-emerald-200">
                Full Queue <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableBody>
                  {[
                    { name: "Al-Huda Masjid", city: "New York", type: "Charity Status", date: "2 mins ago" },
                    { name: "West London Islamic Center", city: "London", type: "Property Deed", date: "45 mins ago" },
                  ].map((item, i) => (
                    <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors">
                      <TableCell className="px-8 py-6 font-bold text-foreground text-sm">
                        {item.name}
                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{item.city}</p>
                      </TableCell>
                      <TableCell className="font-bold text-muted-foreground text-xs italic">{item.type}</TableCell>
                      <TableCell className="text-right px-8 font-black text-muted-foreground text-[10px] uppercase">
                        {item.date}
                      </TableCell>
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
                  <Input placeholder="Search masjids by name, city or ID..." className="pl-9 h-12 rounded-2xl bg-muted border-none font-medium" />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="rounded-xl h-12 gap-2 border-2 font-bold"><Filter className="h-4 w-4" /> Filters</Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-2xl h-12 px-8 font-black text-white shadow-lg shadow-emerald-200">
                    <Plus className="mr-2 h-4 w-4" /> Add Masjid
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Masjid Identity</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Location</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-center">Donors</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
                    <TableHead className="text-right px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_MOSQUES.map((msq) => (
                    <TableRow key={msq.id} className="border-border hover:bg-muted/50 transition-colors group">
                      <TableCell className="px-8 py-5">
                        <p className="font-black text-foreground text-base">{msq.name}</p>
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">{msq.id} • {msq.type}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" /> {msq.city}
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-black text-foreground text-sm">
                        {msq.donors.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          msq.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 font-black text-[9px] px-3' : 'bg-amber-50 text-amber-600 border-amber-200 font-black text-[9px] px-3'
                        }>
                          {msq.status}
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

        <TabsContent value="governance" className="animate-in fade-in duration-500 m-0">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10">
            <div className="space-y-10">
              <div className="space-y-2 border-b pb-6">
                <h3 className="text-3xl font-black text-foreground uppercase tracking-tight">Religious & Social Standards</h3>
                <p className="text-muted-foreground font-medium text-sm sm:text-lg italic">Global mandatory compliance criteria for masjid partners.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  {[
                    { label: "Verified Prayer Time Algorithm Sync", active: true },
                    { label: "Female Prayer Area Requirement", active: true },
                    { label: "Zakat Collection Transparency Log", active: true },
                    { label: "Youth Engagement Policy", active: false },
                    { label: "Qualified Imam Board Vetting", active: true },
                  ].map((rule, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-muted rounded-2xl border border-transparent hover:border-emerald-200 transition-all cursor-pointer group shadow-sm">
                      <span className="font-bold text-foreground text-sm">{rule.label}</span>
                      <Badge className={rule.active ? "bg-emerald-500 text-white font-black text-[8px]" : "bg-muted text-muted-foreground font-black text-[8px]"}>
                        {rule.active ? "MANDATORY" : "OPTIONAL"}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="bg-zinc-900 rounded-[2.5rem] p-10 text-white space-y-6 relative overflow-hidden flex flex-col justify-between">
                  <ShieldCheck className="absolute -top-4 -right-4 h-32 w-32 opacity-10 text-emerald-400" />
                  <div className="space-y-2 relative z-10">
                    <h4 className="text-xl font-black text-emerald-400 uppercase tracking-tighter">Religious Council</h4>
                    <p className="text-muted-foreground text-sm">Schedule board reviews for scholarly alignment and community standards.</p>
                  </div>
                  <Button variant="secondary" className="w-full rounded-xl font-black text-[10px] h-12 uppercase tracking-widest relative z-10 shadow-xl bg-card text-foreground">Manage Board</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="animate-in fade-in duration-500 m-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10 space-y-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">Trust & Fund Health</h3>
                  <Button variant="ghost" className="font-black text-xs text-emerald-600 uppercase tracking-widest">Auditor PDF <ExternalLink className="ml-2 h-4 w-4" /></Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-muted rounded-[2rem] space-y-2 border shadow-inner">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Platform Processing Fee</p>
                    <p className="text-2xl sm:text-4xl font-black text-foreground">0.0% <span className="text-sm font-bold text-muted-foreground italic">charity-only</span></p>
                    <p className="text-xs font-bold text-emerald-600">On all digital Sadaqah contributions</p>
                  </div>
                  <div className="p-8 bg-muted rounded-[2rem] space-y-2 border shadow-inner">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Donation Volume (MTD)</p>
                    <p className="text-2xl sm:text-4xl font-black text-foreground">₹18.4M</p>
                    <p className="text-xs font-bold text-muted-foreground uppercase">Network-wide collections</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-black uppercase text-muted-foreground tracking-widest">Recent Distributions</h4>
                  <div className="divide-y border rounded-2xl overflow-hidden">
                    {[
                      { id: "DON-991", entity: "Al-Huda Masjid", amount: "₹4,45,000", status: "Released", date: "Nov 01" },
                      { id: "DON-992", entity: "Crescent Center", amount: "₹8,45,200", status: "Processing", date: "Oct 30" },
                    ].map((set, i) => (
                      <div key={i} className="p-4 bg-card flex items-center justify-between text-xs font-bold hover:bg-muted transition-colors">
                        <span className="text-muted-foreground">{set.id}</span>
                        <span className="text-foreground flex-1 px-8">{set.entity}</span>
                        <span className="text-emerald-600 px-8">{set.amount}</span>
                        <Badge className={set.status === 'Released' ? 'bg-emerald-50 text-emerald-600 border-none' : 'bg-blue-50 text-blue-600 border-none'}>{set.status}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
            <div className="lg:col-span-4 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 space-y-8 relative overflow-hidden flex flex-col justify-between h-full">
                <Wallet className="absolute -top-4 -right-4 h-32 w-32 opacity-10 text-emerald-400" />
                <div className="relative z-10 space-y-4">
                  <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Vertical Liquidity Reserve</p>
                  <h2 className="text-6xl font-black tracking-tighter text-emerald-400">₹4.2M</h2>
                  <p className="text-xs font-bold text-muted-foreground uppercase leading-relaxed">
                    Emergency maintenance and community disaster relief fund.
                  </p>
                </div>
                <div className="space-y-4 relative z-10">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-14 font-black uppercase text-xs tracking-widest shadow-xl">Financial Health</Button>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-card/10 rounded-xl h-14 font-black uppercase text-xs tracking-widest">Audit Disbursement Rules</Button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Other Tabs - Consistent High-Fidelity UI */}
        {["verification", "reviews", "offers", "loyalty", "certificates", "categories"].map((tab) => (
          <TabsContent key={tab} value={tab} className="animate-in fade-in duration-500 m-0">
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-20 text-center space-y-6">
              <div className="h-20 w-20 rounded-[2rem] bg-muted flex items-center justify-center text-muted-foreground mx-auto">
                <Database className="h-10 w-10 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">{tab.replace(/-/g, ' ')} Engine</h3>
                <p className="text-muted-foreground font-medium max-w-sm mx-auto italic">
                  Managing global masjid standards and community engagement metrics.
                </p>
              </div>
              <Button variant="outline" className="rounded-xl border-2 font-bold px-8 h-12 border-emerald-100 text-emerald-600 hover:bg-emerald-50">Refresh Mosque Registry</Button>
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
