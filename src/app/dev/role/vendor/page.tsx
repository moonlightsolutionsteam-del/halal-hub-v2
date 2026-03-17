
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Store, Building2, TrendingUp, ShieldCheck, 
  Users, Tag, ArrowUpRight, PlusCircle, Settings,
  Clock, MapPin, CheckCircle2, AlertCircle,
  Briefcase, UtensilsCrossed, ShoppingBag, Landmark,
  LayoutGrid
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

export default function VendorRolePage() {
  const kpis = [
    { label: "Total Revenue", value: "₹4.2M", trend: "+18.4% YoY", icon: Landmark },
    { label: "Managed Branches", value: "5", trend: "Across 3 cities", icon: MapPin },
    { label: "Trust Score", value: "98/100", trend: "Elite Partner", icon: ShieldCheck },
    { label: "Active Inquiries", value: "24", trend: "+12 new today", icon: MessageSquareIcon, variant: "destructive" as const },
  ];

  return (
    <div className="container mx-auto p-6 space-y-10 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <Briefcase className="h-3 w-3" /> Merchant Intelligence
          </div>
          <h1 className="text-4xl font-black font-headline text-slate-900 tracking-tight">Business Hub</h1>
          <p className="text-muted-foreground font-medium text-lg">Tactical oversight of your entire halal business ecosystem.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-8 font-black border-2 h-14">
            Organization Settings
          </Button>
          <Link href="/partner/onboarding/business/category">
            <Button className="bg-primary hover:bg-primary/90 rounded-full px-8 font-black shadow-lg shadow-primary/20 h-14 text-white">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Listing
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <Card key={i} className="border-none shadow-sm rounded-[2rem] bg-white p-2 group hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{kpi.label}</span>
              <kpi.icon className="h-4 w-4 text-slate-300 group-hover:text-primary transition-colors" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900 tracking-tighter">{kpi.value}</div>
              <p className={`text-[10px] font-bold mt-1 uppercase tracking-tight ${kpi.variant === 'destructive' ? 'text-red-600' : 'text-emerald-600'}`}>
                {kpi.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <section className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-black text-slate-900">Your Active Establishments</h2>
              <Button variant="link" className="text-primary font-black text-xs uppercase tracking-widest">Manage All</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "The Bosphorus Kitchen", type: "Dining", status: "Verified", sales: "₹1.2M", icon: UtensilsCrossed, color: "text-orange-600", bg: "bg-orange-50" },
                { name: "Amanah Hypermarket", type: "Retail", status: "Audit Needed", sales: "₹2.4M", icon: ShoppingBag, color: "text-emerald-600", bg: "bg-emerald-50" },
              ].map((biz, i) => (
                <Card key={i} className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden group hover:shadow-xl transition-all border-2 border-transparent hover:border-primary/10 cursor-pointer">
                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className={`h-14 w-14 rounded-2xl ${biz.bg} ${biz.color} flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform`}>
                        <biz.icon className="h-7 w-7" />
                      </div>
                      <Badge variant="outline" className={biz.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 font-black text-[9px]' : 'bg-rose-50 text-rose-600 border-rose-200 font-black text-[9px]'}>
                        {biz.status}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">{biz.name}</h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{biz.type} Vertical</p>
                    </div>
                    <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">MTD Sales</p>
                        <p className="text-xl font-black text-slate-900">{biz.sales}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-xl group-hover:bg-primary group-hover:text-white transition-colors"><ArrowUpRight className="h-5 w-5" /></Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <Card className="rounded-[2.5rem] border-none shadow-xl bg-slate-900 text-white p-12 overflow-hidden relative">
            <ShieldCheck className="absolute -top-4 -right-4 h-48 w-48 opacity-10 text-primary" />
            <div className="relative z-10 space-y-8">
              <div className="space-y-2">
                <h2 className="text-4xl font-black tracking-tight">Compliance Marketplace</h2>
                <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-xl">
                  Apply for FSSAI, Halal Certification, or Hygiene Audits directly through our verified partner network.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/vendor/verification">
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-2xl h-16 px-10 font-black uppercase text-sm tracking-widest shadow-2xl">
                    Get Verified
                  </Button>
                </Link>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-2xl h-16 px-10 font-black uppercase text-sm tracking-widest">
                  Download Guide
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Lead Pipeline</CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
              {[
                { name: "Catering Quote", time: "2h ago", status: "New", color: "text-blue-600", bg: "bg-blue-50" },
                { name: "Table Reservation", time: "5h ago", status: "Confirmed", color: "text-emerald-600", bg: "bg-emerald-50" },
                { name: "General Inquiry", time: "Yesterday", status: "Pending", color: "text-amber-600", bg: "bg-amber-50" },
              ].map((lead, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-3xl bg-slate-50 border border-transparent hover:border-primary/10 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-xl ${lead.bg} ${lead.color} flex items-center justify-center font-black shadow-sm group-hover:scale-110 transition-transform`}>
                      <Plus className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800">{lead.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{lead.time}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={`${lead.bg} ${lead.color} border-none font-black text-[8px] h-6 px-2`}>{lead.status}</Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full h-12 rounded-2xl border-2 font-black text-[10px] uppercase tracking-widest">
                Go to CRM Hub
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6">
            <h3 className="text-xl font-black text-slate-900">Revenue Velocity</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                <span className="text-slate-500">Monthly Goal</span>
                <span className="text-primary">74% Met</span>
              </div>
              <Progress value={74} className="h-2" />
              <p className="text-[10px] font-bold text-slate-400 mt-2">Target: ₹5.5M / MTD: ₹4.2M</p>
            </div>
            <div className="pt-4 border-t border-slate-50 space-y-4">
              <div className="flex justify-between items-center text-sm font-bold text-slate-700">
                <span>Avg. Basket Size</span>
                <span className="font-black text-slate-900">₹850</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-slate-700">
                <span>Customer Loyalty</span>
                <span className="font-black text-slate-900">62%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MessageSquareIcon(props: any) {
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
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
