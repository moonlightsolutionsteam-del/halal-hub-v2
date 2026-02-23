
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, BarChart3, Star, Wallet, 
  Eye, MousePointer2, MessageSquare, Plus,
  PlusCircle, Tag, Calendar, Rocket,
  ArrowUpRight, Clock, MapPin, CheckCircle2
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
    <div className="p-8 space-y-8 bg-[#F8FBF9] min-h-screen">
      <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline text-slate-900">Restaurant Dashboard</h1>
        <p className="text-muted-foreground font-medium opacity-60">Here's what's happening at your restaurant today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl bg-white p-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-bold text-slate-400">{kpi.label}</span>
              <kpi.icon className="h-5 w-5 text-slate-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-slate-800">{kpi.value}</div>
              <p className="text-[10px] font-bold text-emerald-600 mt-1 uppercase tracking-tight">{kpi.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-black text-slate-800 px-2">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, i) => (
            <button key={i} className="group flex flex-col items-center justify-center p-6 bg-white rounded-[2rem] shadow-sm hover:shadow-md transition-all border border-transparent hover:border-primary/20">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                <action.icon className="h-6 w-6" />
              </div>
              <span className="text-xs font-black text-slate-700">{action.label}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
          <CardHeader className="p-8 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-black">Top Menu Items</CardTitle>
              <p className="text-sm text-muted-foreground font-medium">Your best-selling dishes this month.</p>
            </div>
            <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full font-black text-xs px-6 h-10">
              View Menu <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-none">
                  <TableHead className="px-8 font-black uppercase text-[10px] tracking-widest text-slate-400">Item</TableHead>
                  <TableHead className="text-right px-8 font-black uppercase text-[10px] tracking-widest text-slate-400">Orders</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topItems.map((item, i) => (
                  <TableRow key={i} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <TableCell className="px-8 py-5 font-bold text-slate-800">{item.name}</TableCell>
                    <TableCell className="text-right px-8 font-black text-slate-600">{item.orders}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-xl font-black">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="px-0 space-y-6">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-3xl bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-100">
                <div className={`mt-1 h-8 w-8 rounded-xl flex items-center justify-center ${activity.color} bg-white shadow-sm shrink-0`}>
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-800 leading-tight">{activity.text}</p>
                  <p className="text-[10px] font-black uppercase text-slate-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
