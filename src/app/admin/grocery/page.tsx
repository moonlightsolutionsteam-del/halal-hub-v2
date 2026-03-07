
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
  ShoppingCart, Boxes, Apple, Milk, Truck
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import Link from "next/link"

export default function SuperAdminGroceryManagement() {
  const [activeTab, setActiveTab] = React.useState("dashboard")

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-24">
      <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline text-slate-900">Grocery & Supermarkets</h1>
        <p className="text-muted-foreground font-medium text-lg">Manage retailers, departmental audits, and stock transparency.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="flex items-center justify-between bg-white p-2 rounded-2xl shadow-sm border overflow-x-auto no-scrollbar">
          <TabsList className="bg-transparent h-auto p-0 gap-1 flex justify-start min-w-max">
            {[
              { id: "dashboard", label: "Dashboard" },
              { id: "all", label: "All Stores" },
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
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Total Retailers</span>
                <div className="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <ShoppingCart className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-slate-900">890</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase">+15 since last month</p>
              </div>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Verified Chains</span>
                <div className="h-10 w-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-slate-900">750</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">84% of total</p>
              </div>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Stock Health</span>
                <div className="h-10 w-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Boxes className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-slate-900">92%</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">System-wide fill rate</p>
              </div>
            </Card>
          </div>

          <Card className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="p-8 flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-black text-slate-900">Recent Applications</CardTitle>
                <p className="text-sm text-muted-foreground font-medium">New supermarkets awaiting retail verification.</p>
              </div>
              <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-xl font-black text-xs h-10 px-6 text-white group">
                View All <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black uppercase text-[10px] tracking-widest text-slate-400">Store Name</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-slate-400">Type</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-slate-400 text-center">Status</TableHead>
                    <TableHead className="text-right px-8 h-14 font-black uppercase text-[10px] tracking-widest text-slate-400">Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Green Garden Hypermarket", type: "Hypermarket", status: "Approved", date: "2024-07-30" },
                    { name: "Sunnah Fresh Mart", type: "Organic Specialty", status: "Pending Docs", date: "2024-07-29" },
                  ].map((item, i) => (
                    <TableRow key={i} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <TableCell className="px-8 py-5 font-bold text-slate-800 text-sm">{item.name}</TableCell>
                      <TableCell className="font-bold text-slate-500 text-xs">{item.type}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={item.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-none' : 'bg-amber-50 text-amber-600 border-none'}>
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

        <TabsContent value="governance" className="animate-in fade-in duration-500 m-0">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10">
            <div className="space-y-10">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-slate-900">Departmental Halal Audits</h3>
                <p className="text-muted-foreground font-medium text-lg">Define the audit scope for store sections (Meat, Bakery, Deli).</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  {[
                    { label: "Meat Counter Source Log", active: true },
                    { label: "Bakery Enzyme Disclosure", active: true },
                    { label: "Hot Food Cross-Contamination Check", active: true },
                    { label: "Pantry Enzyme Audit", active: false },
                  ].map((rule, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-transparent hover:border-primary/20 transition-all cursor-pointer">
                      <span className="font-bold text-slate-700">{rule.label}</span>
                      <Badge className={rule.active ? "bg-emerald-500" : "bg-slate-300"}>
                        {rule.active ? "MANDATORY" : "OPTIONAL"}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white space-y-6 relative overflow-hidden">
                  <ShieldAlert className="absolute -top-4 -right-4 h-32 w-32 opacity-10" />
                  <h4 className="text-xl font-black">Audit SLA</h4>
                  <p className="text-slate-400 text-sm">Set max turnaround for supermarket departmental reviews.</p>
                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1 rounded-xl border-white/20 text-white hover:bg-white/10 font-bold">48 Hours</Button>
                    <Button variant="outline" className="flex-1 rounded-xl border-white/20 text-white hover:bg-white/10 font-bold">7 Days</Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="animate-in fade-in duration-500 m-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10 space-y-8">
                <h3 className="text-2xl font-black">Settlement Cycle</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-slate-50 rounded-[2rem] space-y-2">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Platform Fee</p>
                    <p className="text-3xl font-black text-slate-900">2.5% Flat</p>
                    <p className="text-xs font-bold text-emerald-600">On digital marketplace orders</p>
                  </div>
                  <div className="p-8 bg-slate-50 rounded-[2rem] space-y-2">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Net Revenue (MTD)</p>
                    <p className="text-3xl font-black text-slate-900">₹12.4M</p>
                    <p className="text-xs font-bold text-slate-400 uppercase">Across 890 stores</p>
                  </div>
                </div>
              </Card>
            </div>
            <div className="lg:col-span-4 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-8 space-y-6 relative overflow-hidden">
                <Wallet className="absolute -top-4 -right-4 h-32 w-32 opacity-10 text-primary" />
                <div className="relative z-10 space-y-2">
                  <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">System Reserve</p>
                  <h2 className="text-5xl font-black tracking-tighter">₹42.8M</h2>
                  <p className="text-xs font-bold text-slate-400 uppercase">Retail vertical escrow</p>
                </div>
                <Button className="w-full bg-primary rounded-xl h-12 font-black uppercase text-[10px] tracking-widest relative z-10 shadow-xl">Financial Config</Button>
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
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{tab} Module</h3>
                <p className="text-muted-foreground font-medium max-w-sm mx-auto italic">
                  Managing the data integrity and operational throughput for the grocery ecosystem.
                </p>
              </div>
              <Button variant="outline" className="rounded-xl border-2 font-bold px-8">Refresh Console</Button>
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
