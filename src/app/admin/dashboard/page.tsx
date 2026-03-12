
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Building2, ShieldCheck, Users, IndianRupee, 
  ArrowUpRight, FileWarning, ExternalLink,
  TrendingUp, Activity, Zap, Globe,
  Network, MessageSquare, AlertTriangle,
  LayoutGrid, BarChart3, PieChart,
  UtensilsCrossed, ShoppingCart, Plane, 
  Landmark, MoreVertical, Search, Filter,
  Settings
} from "lucide-react"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import { 
  Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer 
} from "recharts"
import { 
  ChartContainer, ChartTooltip, ChartTooltipContent 
} from "@/components/ui/chart"
import Link from "next/link"

const revenueData = [
  { month: "Jan", revenue: 4500000 },
  { month: "Feb", revenue: 5200000 },
  { month: "Mar", revenue: 4800000 },
  { month: "Apr", revenue: 6100000 },
  { month: "May", revenue: 5900000 },
  { month: "Jun", revenue: 7200000 },
  { month: "Jul", revenue: 8400000 },
]

const verticalData = [
  { name: "Dining", value: 1240, color: "hsl(var(--primary))" },
  { name: "Retail", value: 890, color: "hsl(var(--chart-2))" },
  { name: "Services", value: 450, color: "hsl(var(--chart-3))" },
  { name: "Inst.", value: 320, color: "hsl(var(--chart-4))" },
]

export default function SuperAdminDashboard() {
  return (
    <div className="p-8 space-y-8 bg-[#F8F9FA] min-h-screen pb-24">
      {/* Control Room Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <Zap className="h-3 w-3 fill-current" /> Mission Control Center
          </div>
          <h1 className="text-4xl font-black font-headline text-slate-900 tracking-tighter">PLATFORM OVERVIEW</h1>
          <p className="text-muted-foreground font-medium text-lg italic">Command center for global Shariah-compliant operations and vertical analytics.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-2xl px-6 font-black border-2 h-12 gap-2 hover:bg-slate-100">
            <BarChart3 className="h-4 w-4" /> Global Export
          </Button>
          <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-2xl px-8 font-black shadow-2xl h-12 gap-2">
            <Settings className="h-4 w-4" /> System Config
          </Button>
        </div>
      </div>

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Net Platform GMV", value: "₹85.4M", trend: "+12.4% YoY", icon: IndianRupee, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Verified Entities", value: "45,892", trend: "94.2% Audit Rate", icon: ShieldCheck, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Global User Base", value: "1.2M", trend: "+2.4k today", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Trust Score", value: "A+", trend: "System Optimal", icon: CheckCircle2, color: "text-primary", bg: "bg-primary/5" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-[2rem] p-6 bg-white group hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">{stat.label}</span>
              <div className={cn("h-10 w-10 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</div>
              <p className={cn("text-[10px] font-bold uppercase", stat.color)}>{stat.trend}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Analytics Command Center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Revenue Chart */}
        <Card className="lg:col-span-8 rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="p-8 border-b bg-slate-50/30 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-black text-slate-900">Platform Revenue Growth</CardTitle>
              <CardDescription className="font-medium italic">Monthly gross volume across all 13 business verticals.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-primary text-white font-black text-[9px] px-3 uppercase tracking-tighter">LIVE METRICS</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-[350px] w-full">
              <ChartContainer config={{ revenue: { label: "Revenue", color: "hsl(var(--primary))" } }}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold', fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(value) => `₹${value / 1000000}M`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Vertical Distribution */}
        <Card className="lg:col-span-4 rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-8 space-y-8 flex flex-col justify-between overflow-hidden relative">
          <PieChart className="absolute -top-4 -right-4 h-48 w-48 opacity-10 text-primary" />
          <div className="relative z-10 space-y-6">
            <div className="space-y-1">
              <h3 className="text-2xl font-black font-headline tracking-tight">Vertical Health</h3>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Active Partner Density</p>
            </div>
            
            <div className="space-y-6">
              {verticalData.map((v, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-400">{v.name}</span>
                    <span className="text-white">{v.value} Entities</span>
                  </div>
                  <Progress value={(v.value / 1500) * 100} className="h-2 bg-white/10" />
                </div>
              ))}
            </div>
          </div>
          <Button variant="secondary" className="w-full rounded-2xl h-14 font-black uppercase text-xs tracking-widest shadow-2xl relative z-10">
            View Vertical Audits <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </Card>
      </div>

      {/* Moderation & Quality Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cross-Vertical Verification Queue */}
        <Card className="lg:col-span-7 rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="p-8 border-b bg-slate-50/30 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-black">Global Verification Queue</CardTitle>
              <CardDescription className="font-medium italic">Urgent submissions from all business verticals.</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl font-black text-[10px] h-9 px-4 border-2 uppercase tracking-tighter">Full Queue</Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-none">
                  <TableHead className="px-8 h-12 font-black text-[10px] uppercase tracking-widest text-slate-400">Entity / Type</TableHead>
                  <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-slate-400">Document Class</TableHead>
                  <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-slate-400 text-center">Status</TableHead>
                  <TableHead className="text-right px-8 h-12 font-black text-[10px] uppercase tracking-widest text-slate-400">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { name: "Elite Catering", vertical: "Catering", doc: "Thermal Logistics Log", status: "Critical", variant: "destructive" as const },
                  { name: "Royal Halal Suites", vertical: "Hotels", doc: "Hospitality Charter", status: "Pending", variant: "warning" as const },
                  { name: "Noor Beauty Labs", vertical: "Cosmetics", doc: "Lab Purity Report", status: "In Review", variant: "secondary" as const },
                  { name: "Al-Barakah Meats", vertical: "Meat", doc: "Slaughterhouse Proof", status: "Renewal", variant: "outline" as const },
                ].map((item, i) => (
                  <TableRow key={i} className="border-slate-100 hover:bg-slate-50/50 transition-colors group">
                    <TableCell className="px-8 py-5">
                      <div className="font-bold text-slate-800 text-sm">{item.name}</div>
                      <div className="text-[9px] font-black text-primary uppercase">{item.vertical}</div>
                    </TableCell>
                    <TableCell className="text-[11px] font-bold text-slate-500 italic">{item.doc}</TableCell>
                    <TableCell className="text-center">
                      <Badge className={cn(
                        "rounded-full px-3 text-[8px] font-black uppercase border-none",
                        item.status === 'Critical' ? 'bg-rose-500 text-white animate-pulse' : 
                        item.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                      )}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right px-8">
                      <Button size="icon" variant="ghost" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"><ArrowUpRight className="h-4 w-4 text-primary" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Platform Risk Center */}
        <div className="lg:col-span-5 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6 border-2 border-rose-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 shadow-inner">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900">High-Risk Alerts</h3>
              </div>
              <Badge className="bg-rose-600 text-white border-none font-black text-[9px] px-3">8 ACTIVE</Badge>
            </div>
            
            <div className="space-y-4">
              {[
                { title: "Privacy Violation Reported", loc: "Royal Suites Hotel", time: "2h ago", type: "Privacy" },
                { title: "Sourcing Mismatch Detected", loc: "Local Butcher #42", time: "5h ago", type: "Halal" },
              ].map((alert, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl border-l-4 border-rose-600 group cursor-pointer hover:bg-rose-50 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-black text-slate-900 text-sm">{alert.title}</p>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">{alert.time}</span>
                  </div>
                  <p className="text-[10px] font-bold text-rose-600 uppercase tracking-tighter">{alert.loc} • {alert.type}</p>
                </div>
              ))}
            </div>
            <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white rounded-xl h-12 font-black uppercase text-xs tracking-widest shadow-lg shadow-rose-200">
              Launch Crisis Response
            </Button>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6">
            <h3 className="text-xl font-black flex items-center gap-2">
              <Network className="h-5 w-5 text-blue-600" /> Community Network
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-slate-50 rounded-3xl space-y-1 shadow-inner text-center">
                <p className="text-[10px] font-black uppercase text-slate-400">Total Nodes</p>
                <p className="text-3xl font-black text-slate-900">85.4k</p>
                <p className="text-[9px] font-bold text-emerald-600 uppercase">+12% growth</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-3xl space-y-1 shadow-inner text-center">
                <p className="text-[10px] font-black uppercase text-slate-400">Active Clans</p>
                <p className="text-3xl font-black text-slate-900">4,250</p>
                <p className="text-[9px] font-bold text-blue-600 uppercase">Verified roots</p>
              </div>
            </div>
            <Link href="/admin/family-tree">
              <Button variant="outline" className="w-full rounded-xl border-2 font-black text-xs uppercase tracking-widest h-12 mt-2">
                Manage Lineages
              </Button>
            </Link>
          </Card>
        </div>
      </div>

      {/* Floating App Return */}
      <Link href="/">
        <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group border-4 border-white">
          <div className="flex flex-col items-center">
            <ExternalLink className="h-5 w-5" />
            <span className="text-[8px] font-black uppercase mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Return App</span>
          </div>
        </button>
      </Link>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}

function CheckCircle2(props: any) {
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
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
