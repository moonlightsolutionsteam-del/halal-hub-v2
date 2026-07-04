
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, BarChart3, Star, Wallet, 
  Eye, MousePointer2, MessageSquare, Plus,
  PlusCircle, Tag, Calendar, Rocket,
  ArrowUpRight, Clock, MapPin, CheckCircle2,
  ShieldCheck, Award, Sparkles, ChevronRight
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

export default function VendorDashboard() {
  const kpis = [
    { label: "Total Revenue", value: "₹45,231", trend: "+20.1% from last month", icon: Wallet },
    { label: "Today's Orders", value: "+25", trend: "+18.1% from last week", icon: Users },
    { label: "New Reviews", value: "+12", trend: "+5 this week", icon: Star },
    { label: "Active Offers", value: "+3", trend: "1 expiring soon", icon: Tag },
  ];

  const quickActions = [
    { label: "Add Menu Item", icon: PlusCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Create Offer", icon: Tag, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "New Event", icon: Calendar, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Boost Listing", icon: Rocket, color: "text-amber-500", bg: "bg-amber-50" },
  ];

  const topItems = [
    { name: "Mutton Biryani", orders: 120 },
    { name: "Chicken Seekh Kebab", orders: 95 },
    { name: "Butter Chicken", orders: 80 },
  ];

  const recentActivity = [
    { text: "New check-in from Aisha K.", time: "2m ago", icon: MapPin, color: "text-emerald-500" },
    { text: "New 5-star review received.", time: "1h ago", icon: Star, color: "text-amber-500" },
    { text: "New reservation for 4 people.", time: "3h ago", icon: Clock, color: "text-blue-500" },
  ];

  return (
    <div className="p-3 sm:p-8 space-y-4 sm:space-y-8 bg-background min-h-screen">
      <div className="space-y-0.5">
        <h1 className="text-xl sm:text-3xl font-black font-headline text-foreground">Restaurant Dashboard</h1>
        <p className="text-muted-foreground font-medium opacity-60 text-xs sm:text-sm">Here's what's happening at your restaurant today.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6">
        {kpis.map((kpi, i) => (
          <Card key={i} className="border-none shadow-sm rounded-2xl sm:rounded-3xl bg-card">
            <CardHeader className="flex flex-row items-center justify-between p-3 pb-1 sm:p-5 sm:pb-2">
              <span className="text-[10px] sm:text-sm font-bold text-muted-foreground leading-tight">{kpi.label}</span>
              <kpi.icon className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0 ml-1" />
            </CardHeader>
            <CardContent className="px-3 pb-3 pt-0 sm:px-5 sm:pb-4">
              <div className="text-lg sm:text-2xl font-black text-foreground">{kpi.value}</div>
              <p className="text-[9px] sm:text-[10px] font-bold text-emerald-600 mt-0.5 uppercase tracking-tight">{kpi.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8">
        <div className="lg:col-span-8 space-y-4 sm:space-y-8">
          <section className="space-y-2 sm:space-y-4">
            <h2 className="text-sm sm:text-lg font-black text-foreground px-1">Quick Actions</h2>
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {quickActions.map((action, i) => (
                <button key={i} className="group flex flex-col items-center justify-center p-2 sm:p-6 bg-card rounded-xl sm:rounded-[2rem] shadow-sm hover:shadow-md transition-all border border-transparent hover:border-primary/20">
                  <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl flex items-center justify-center mb-1 sm:mb-3 ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-4 w-4 sm:h-6 sm:w-6" />
                  </div>
                  <span className="text-[9px] sm:text-xs font-black text-foreground text-center leading-tight">{action.label}</span>
                </button>
              ))}
            </div>
          </section>

          <Card className="rounded-[1.5rem] sm:rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card">
            <CardHeader className="p-4 sm:p-8 flex flex-row items-center justify-between">
              <div className="space-y-0.5 sm:space-y-1 min-w-0">
                <CardTitle className="text-base sm:text-xl font-black">Top Menu Items</CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium hidden sm:block">Your best-selling dishes this month.</p>
              </div>
              <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full font-black text-xs px-4 sm:px-6 h-9 sm:h-10 shrink-0">
                View Menu <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-4 sm:px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Item</TableHead>
                    <TableHead className="text-right px-4 sm:px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Orders</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topItems.map((item, i) => (
                    <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors">
                      <TableCell className="px-4 sm:px-8 py-4 sm:py-5 font-bold text-foreground text-sm">{item.name}</TableCell>
                      <TableCell className="text-right px-4 sm:px-8 font-black text-muted-foreground">{item.orders}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-5 sm:space-y-8">
          <Card className="rounded-[1.5rem] sm:rounded-[2.5rem] border-none shadow-xl bg-zinc-900 text-white p-5 sm:p-8 space-y-4 sm:space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck className="h-24 w-24" />
            </div>
            <div className="relative z-10 space-y-4">
              <h3 className="text-xl font-black">Trust & Compliance</h3>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                Build 2x more trust by getting verified. Apply for FSSAI or Halal certification today.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-card/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="text-xs font-bold">Halal Hub Audit</span>
                  </div>
                  <Badge variant="outline" className="text-[8px] font-black border-red-500/50 text-red-400 uppercase">PENDING</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-2xl bg-card/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs font-bold">FSSAI Status</span>
                  </div>
                  <Badge variant="outline" className="text-[8px] font-black border-emerald-500/50 text-emerald-400 uppercase">ACTIVE</Badge>
                </div>
              </div>
              <Link href="/vendor/verification" className="block w-full">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-12 font-black text-[10px] uppercase tracking-widest shadow-xl">
                  Get Certified
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="rounded-[1.5rem] sm:rounded-[2.5rem] border-none shadow-sm bg-card p-4 sm:p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-base sm:text-xl font-black">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-3 sm:space-y-6">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-3xl bg-muted/50 hover:bg-card hover:shadow-sm transition-all border border-transparent hover:border-border group">
                  <div className={`mt-1 h-8 w-8 rounded-xl flex items-center justify-center ${activity.color} bg-card shadow-sm shrink-0 group-hover:scale-110 transition-transform`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground leading-tight">{activity.text}</p>
                    <p className="text-[10px] font-black uppercase text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
