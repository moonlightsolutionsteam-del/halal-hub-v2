"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, Users, Clock, CheckCircle2, 
  AlertCircle, ChefHat, LayoutGrid, 
  ArrowUpRight, RefreshCcw, Bell
} from "lucide-react";

export default function DigitalTableOrderingPage() {
  const tables = [
    { id: "T-01", status: "Occupied", pax: 4, orders: 2, time: "45m", color: "border-primary" },
    { id: "T-02", status: "Occupied", pax: 2, orders: 1, time: "15m", color: "border-primary" },
    { id: "T-03", status: "Pending", pax: 6, orders: 0, time: "2m", color: "border-amber-500", alert: true },
    { id: "T-04", status: "Available", pax: 0, orders: 0, time: "0m", color: "border-border" },
    { id: "T-05", status: "Cleaning", pax: 0, orders: 0, time: "5m", color: "border-blue-400" },
    { id: "T-06", status: "Occupied", pax: 3, orders: 3, time: "1h 10m", color: "border-primary" },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <Smartphone className="h-3 w-3" /> Dining Ops
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">Table Ordering</h1>
          <p className="text-muted-foreground font-medium">Monitor active table sessions and direct orders from the dining hall.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2">
            <LayoutGrid className="mr-2 h-4 w-4" /> Floor View
          </Button>
          <Button className="bg-primary rounded-full px-8 font-bold shadow-lg shadow-primary/20">
            <RefreshCcw className="mr-2 h-4 w-4" /> Refresh Grid
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Tables", value: "12/20", icon: Users, color: "text-blue-500" },
          { label: "Pending Orders", value: "5", icon: Bell, color: "text-amber-500" },
          { label: "Avg. Session", value: "52m", icon: Clock, color: "text-emerald-500" },
          { label: "Revenue Flow", value: "₹18.4k", icon: CheckCircle2, color: "text-primary" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl p-4 bg-card flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-foreground">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {tables.map((table) => (
          <Card key={table.id} className={`rounded-[2.5rem] border-4 ${table.color} shadow-sm bg-card overflow-hidden transition-all hover:shadow-xl group cursor-pointer`}>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-black text-foreground">{table.id}</h3>
                {table.alert && <Bell className="h-5 w-5 text-amber-500 animate-bounce" />}
              </div>
              
              <div className="space-y-1.5">
                <Badge variant="secondary" className="rounded-full px-3 text-[10px] font-black uppercase tracking-tighter">
                  {table.status}
                </Badge>
                <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  <Users className="h-3 w-3" /> {table.pax} Guests
                </div>
              </div>

              <div className="pt-4 border-t border-border flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-xs font-black text-primary">{table.orders} Orders</span>
                  <span className="text-[9px] font-bold text-muted-foreground uppercase">{table.time} active</span>
                </div>
                <Button size="icon" variant="ghost" className="rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-10 overflow-hidden relative">
        <ChefHat className="absolute -bottom-4 -right-4 h-48 w-48 opacity-10" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight">Kitchen Communication</h2>
              <p className="text-muted-foreground font-medium">All digital orders are instantly routed to your kitchen display system (KDS).</p>
            </div>
            <div className="flex gap-4">
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-2xl h-14 px-8 font-black uppercase text-xs tracking-widest shadow-xl">
                Open Kitchen Display
              </Button>
              <Button variant="outline" className="border-white/20 text-white rounded-2xl h-14 px-8 font-black uppercase text-xs tracking-widest hover:bg-card/10">
                Setup Printers
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-card/5 rounded-3xl border border-white/10 text-center">
              <p className="text-3xl font-black text-emerald-400">12m</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Avg. Prep Time</p>
            </div>
            <div className="p-6 bg-card/5 rounded-3xl border border-white/10 text-center">
              <p className="text-3xl font-black text-blue-400">98%</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Order Accuracy</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
