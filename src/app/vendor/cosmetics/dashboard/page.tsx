"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, Sparkles, ShoppingBag, Package, 
  ShieldCheck, Users, Star, Tag, 
  ArrowUpRight, PlusCircle, Settings,
  Clock, CheckCircle2, TrendingUp,
  AlertCircle
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function CosmeticsDashboard() {
  const kpis = [
    { label: "Revenue (Month)", value: "₹95,000", trend: "+10.2%", icon: Wallet },
    { label: "New Orders", value: "18", trend: "5 need dispatch", icon: ShoppingBag },
    { label: "Active Products", value: "42", trend: "Halal certified", icon: Sparkles },
    { label: "Low Stock", value: "4", trend: "Action required", icon: AlertCircle, variant: "destructive" as const },
    { label: "Avg. Review", value: "4.9", trend: "from 150 ratings", icon: Star },
    { label: "Customer Base", value: "620", trend: "+8 new today", icon: Users },
    { label: "Active Promos", value: "2", trend: "Buy 1 Get 1", icon: Tag },
    { label: "Ingredient Audits", value: "15", trend: "99% Compliant", icon: ShieldCheck },
  ];

  const recentOrders = [
    { id: "COS-2021", customer: "Amara S.", items: "Organic Rose Water", total: "₹850", status: "Processing" },
    { id: "COS-2022", customer: "Layla K.", items: "Halal Tinted Moisturizer", total: "₹1,200", status: "Shipped" },
    { id: "COS-2023", customer: "Sana M.", items: "Vegan Brush Set", total: "₹2,100", status: "Delivered" },
  ];

  const quickActions = [
    { label: "Add Product", icon: PlusCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Halal Check", icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Marketing", icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Inventory", icon: Package, color: "text-muted-foreground", bg: "bg-muted" },
    { label: "Customers", icon: Users, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Settings", icon: Settings, color: "text-muted-foreground", bg: "bg-muted" },
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Cosmetics &amp; Personal Care Dashboard</h1>
        <p className="text-muted-foreground font-medium opacity-60">Manage your beauty products, formulations, and store sales.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl bg-card p-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-tighter">{kpi.label}</span>
              <kpi.icon className={`h-4 w-4 ${kpi.variant === 'destructive' ? 'text-red-400' : 'text-muted-foreground'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-black ${kpi.variant === 'destructive' ? 'text-red-600' : 'text-foreground'}`}>
                {kpi.value}
              </div>
              <p className={`text-[10px] font-bold mt-1 uppercase tracking-tight ${kpi.variant === 'destructive' ? 'text-red-400' : 'text-muted-foreground'}`}>
                {kpi.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-card">
            <CardHeader className="p-8 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-black">Recent Store Orders</CardTitle>
              <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full font-black text-xs px-6 h-10">
                All Orders <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Order / Customer</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Items</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Total</TableHead>
                    <TableHead className="text-right px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order, i) => (
                    <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors">
                      <TableCell className="px-8 py-5">
                        <div className="font-bold text-foreground text-sm">{order.customer}</div>
                        <div className="text-[9px] font-bold text-muted-foreground uppercase">{order.id}</div>
                      </TableCell>
                      <TableCell className="font-bold text-muted-foreground text-xs">{order.items}</TableCell>
                      <TableCell className="font-bold text-muted-foreground text-sm">{order.total}</TableCell>
                      <TableCell className="text-right px-8">
                        <Badge variant="outline" className="rounded-full px-4 text-[9px] font-black uppercase border-primary/20 text-primary bg-primary/5">
                          {order.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="px-0 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {quickActions.map((action, i) => (
                <button key={i} className="group flex flex-col items-center justify-center p-6 bg-muted/50 rounded-[2rem] hover:bg-card hover:shadow-md transition-all border border-transparent hover:border-primary/10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-black text-foreground uppercase tracking-tighter text-center">{action.label}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Formulation Health</CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
              {[
                { name: "Skincare Base", status: "Verified", val: 100 },
                { name: "Fragrance Mix", status: "Audit Needed", val: 45, variant: "destructive" },
                { name: "Preservatives", status: "Verified", val: 92 },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className={item.variant === 'destructive' ? 'text-red-500' : 'text-emerald-500'}>{item.status}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.variant === 'destructive' ? 'bg-red-400' : 'bg-primary'} transition-all`}
                      style={{ width: `${item.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-primary text-primary-foreground p-8 overflow-hidden relative">
            <ShieldCheck className="absolute -top-4 -right-4 h-24 w-24 opacity-10" />
            <div className="relative z-10 space-y-4">
              <h3 className="text-xl font-black">Halal Certified?</h3>
              <p className="text-sm font-medium opacity-80 leading-relaxed">
                Connect with our lab partners to get your cosmetics audited and earn the "Certified Halal Beauty" seal.
              </p>
              <Button variant="secondary" className="w-full rounded-2xl font-black text-xs uppercase tracking-widest">Get Audit</Button>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Top Selling Product</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="p-4 bg-muted/30 rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-card rounded-xl overflow-hidden shadow-sm">
                    <img src="https://picsum.photos/seed/cream/100/100" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-foreground">Hydrating Glow Serum</p>
                    <p className="text-[10px] text-muted-foreground font-bold">85 units sold this week</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-black">₹1,450</span>
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none font-black text-[9px] uppercase">Trend: Up</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
