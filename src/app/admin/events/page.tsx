
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
  Sparkles, Ticket
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import Link from "next/link"

export default function SuperAdminEventManagement() {
  const [activeTab, setActiveTab] = React.useState("dashboard")

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-24">
      <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline text-slate-900">Event Services & Venues</h1>
        <p className="text-muted-foreground font-medium text-lg">Manage event venues, ticketing systems, and community expos.</p>
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
                className="rounded-xl data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-6 py-2.5 font-bold transition-all shadow-none border-none whitespace-nowrap"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="space-y-8 m-0 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Platform Venues</span>
                <div className="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-slate-900">210</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase">+5 this month</p>
              </div>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Active Tickets</span>
                <div className="h-10 w-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Ticket className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-slate-900">12.4k</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Live bookings</p>
              </div>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Expected Pax</span>
                <div className="h-10 w-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Users className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-slate-900">45k</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">This quarter</p>
              </div>
            </Card>
          </div>

          <Card className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="p-8 flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-black text-slate-900">High-Risk Moderation</CardTitle>
                <p className="text-sm text-muted-foreground font-medium">Review flagged events or venue privacy protocol violations.</p>
              </div>
              <Button size="sm" className="bg-rose-600 hover:bg-rose-700 rounded-xl font-black text-xs h-10 px-6 text-white group shadow-lg shadow-rose-200">
                Moderate Queue <ShieldAlert className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-rose-50/30">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black uppercase text-[10px] tracking-widest text-rose-400">Event / ID</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-rose-400">Issue</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-rose-400 text-center">Urgency</TableHead>
                    <TableHead className="text-right px-8 h-14 font-black uppercase text-[10px] tracking-widest">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Community Mix & Mingle", issue: "Privacy Protocol Flag", status: "Critical", id: "EVT-991" },
                    { name: "Grand Hall Buffet", issue: "Kitchen Audit Expired", status: "Moderate", id: "EVT-992" },
                  ].map((item, i) => (
                    <TableRow key={i} className="border-slate-100 hover:bg-rose-50/5 transition-colors">
                      <TableCell className="px-8 py-5">
                        <div className="font-bold text-slate-800 text-sm">{item.name}</div>
                        <div className="text-[9px] font-bold text-muted-foreground uppercase">{item.id}</div>
                      </TableCell>
                      <TableCell className="font-bold text-slate-500 text-xs">{item.issue}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={item.status === 'Critical' ? 'bg-rose-50 text-rose-600 border-none px-3' : 'bg-amber-50 text-amber-600 border-none px-3'}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-8 font-bold text-slate-400 text-xs">
                        <Button variant="ghost" size="sm" className="font-black text-[10px] uppercase text-rose-600 hover:bg-rose-50">Review</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="governance" className="animate-in fade-in duration-500 m-0">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10">
            <div className="space-y-10">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-slate-900">Shariah-Compliant Hosting</h3>
                <p className="text-muted-foreground font-medium text-lg">Define standard privacy protocols for event spaces and vendors.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  {[
                    { label: "Mandatory Gender Segregation Capability", active: true },
                    { label: "On-site Permanent Wudu Stations", active: true },
                    { label: "Verified Halal-Only In-house Kitchen", active: true },
                    { label: "Female Staff-Only Event Options", active: false },
                  ].map((rule, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-transparent hover:border-primary/20 transition-all cursor-pointer group">
                      <span className="font-bold text-slate-700">{rule.label}</span>
                      <Badge className={rule.active ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"}>
                        {rule.active ? "MANDATORY" : "OPTIONAL"}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white space-y-6 relative overflow-hidden">
                  <ShieldCheck className="absolute -top-4 -right-4 h-32 w-32 opacity-10" />
                  <div className="space-y-2 relative z-10">
                    <h4 className="text-xl font-black text-primary">Venue Charter</h4>
                    <p className="text-slate-400 text-sm">Updated Sept 2024. All new venues must sign the digital privacy charter.</p>
                  </div>
                  <Button variant="secondary" className="w-full rounded-xl font-black text-[10px] h-12 uppercase tracking-widest relative z-10 shadow-xl">Download Charter Template</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="animate-in fade-in duration-500 m-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10 space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-black">Escrow & Payout Health</h3>
                  <Button variant="ghost" className="font-bold text-primary">Ticketing Ledger <ArrowUpRight className="ml-2 h-4 w-4" /></Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-slate-50 rounded-[2rem] space-y-2">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Platform Commission</p>
                    <p className="text-3xl font-black text-slate-900">7.5% flat</p>
                    <p className="text-xs font-bold text-emerald-600">On all digital ticket sales</p>
                  </div>
                  <div className="p-8 bg-slate-50 rounded-[2rem] space-y-2">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Active Escrow</p>
                    <p className="text-3xl font-black text-slate-900">₹1.8M</p>
                    <p className="text-xs font-bold text-slate-400 uppercase">Released post-event</p>
                  </div>
                </div>
              </Card>
            </div>
            <div className="lg:col-span-4 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-8 space-y-6 relative overflow-hidden">
                <Wallet className="absolute -top-4 -right-4 h-32 w-32 opacity-10 text-primary" />
                <div className="relative z-10 space-y-2">
                  <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Revenue Target</p>
                  <h2 className="text-5xl font-black tracking-tighter">₹12.4M</h2>
                  <p className="text-xs font-bold text-slate-400 uppercase">Projected vertical GMV</p>
                </div>
                <Button className="w-full bg-primary rounded-xl h-12 font-black uppercase text-[10px] tracking-widest relative z-10 shadow-xl">Financial Policy</Button>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* OTHER TABS - PLACEHOLDERS */}
        {["all", "verification", "reviews", "offers", "loyalty", "certificates", "categories"].map((tab) => (
          <TabsContent key={tab} value={tab} className="animate-in fade-in duration-500 m-0">
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-20 text-center space-y-6">
              <div className="h-20 w-20 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-200 mx-auto">
                <Settings className="h-10 w-10 animate-spin-slow" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{tab.replace(/&/g, ' & ')} Module</h3>
                <p className="text-muted-foreground font-medium max-w-sm mx-auto italic">
                  Managing event integrity, ticketing security, and venue governance.
                </p>
              </div>
              <Button variant="outline" className="rounded-xl border-2 font-bold px-8">Refresh Dashboard</Button>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Link href="/admin/dashboard">
        <button className="fixed bottom-8 right-8 w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group">
          <div className="flex flex-col items-center">
            <ExternalLink className="h-5 w-5" />
            <span className="text-[8px] font-black uppercase mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Exit</span>
          </div>
        </button>
      </Link>
    </div>
  )
}
