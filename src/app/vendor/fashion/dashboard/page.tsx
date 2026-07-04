"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, Shirt, ShoppingBag, Package, 
  Truck, Users, Star, Tag, 
  ArrowUpRight, PlusCircle, Settings,
  Clock, MapPin, CheckCircle2, TrendingUp,
  Image as ImageIcon, AlertCircle
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function FashionDashboard() {
  const kpis = [
    { label: "Revenue (Month)", value: "₹1,45,000", trend: "+12.4%", icon: Wallet },
    { label: "New Orders", value: "24", trend: "8 need packing", icon: ShoppingBag },
    { label: "Total Products", value: "156", trend: "12 new this month", icon: Shirt },
    { label: "Out of Stock", value: "5", trend: "Action required", icon: AlertCircle, variant: "destructive" as const },
    { label: "Avg. Review", value: "4.8", trend: "from 180 ratings", icon: Star },
    { label: "Customer Loyalty", value: "850", trend: "+15 new today", icon: Users },
    { label: "Active Offers", value: "3", trend: "Flash sale active", icon: Tag },
    { label: "Returns", value: "2", trend: "Processing", icon: Clock, variant: "warning" as const },
  ];

  const recentOrders = [
    { id: "FASH-1021", customer: "Zarah Khan", items: "Premium Abaya (Black)", total: "₹4,500", status: "Processing" },
    { id: "FASH-1022", customer: "Sarah Ahmed", items: "Chiffon Hijab (Set of 3)", total: "₹1,200", status: "Shipped" },
    { id: "FASH-1023", customer: "Amina Malik", items: "Modest Maxi Dress", total: "₹3,800", status: "Delivered" },
  ];

  const quickActions = [
    { label: "Add Product", icon: PlusCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Create Lookbook", icon: ImageIcon, color: "text-muted-foreground", bg: "bg-muted" },
    { label: "Marketing", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Inventory Audit", icon: Package, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Customer Chat", icon: Users, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Settings", icon: Settings, color: "text-muted-foreground", bg: "bg-muted" },
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Fashion &amp; Modest Wear Dashboard</h1>
        <p className="text-muted-foreground font-medium opacity-60">Manage your collections, inventory, and online store.</p>
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
              <CardTitle className="text-xl font-black">Recent Orders</CardTitle>
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
              <CardTitle className="text-xl font-black">Inventory Health</CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
              {[
                { name: "Abayas", status: "Healthy", val: 95 },
                { name: "Hijabs", status: "Low Stock", val: 35, variant: "destructive" },
                { name: "Accessories", status: "Healthy", val: 88 },
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
            <Shirt className="absolute -top-4 -right-4 h-24 w-24 opacity-10" />
            <div className="relative z-10 space-y-4">
              <h3 className="text-xl font-black">Feature Your Brand?</h3>
              <p className="text-sm font-medium opacity-80 leading-relaxed">
                Reach more customers by featuring your collection on the Halal Hub marketplace discovery page.
              </p>
              <Button variant="secondary" className="w-full rounded-2xl font-black text-xs uppercase tracking-widest">Boost Now</Button>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Top Selling Item</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="p-4 bg-muted/30 rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-card rounded-xl overflow-hidden shadow-sm">
                    <img src="https://picsum.photos/seed/abaya/100/100" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-foreground">Silk Embroidery Abaya</p>
                    <p className="text-[10px] text-muted-foreground font-bold">124 units sold this week</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-black">₹4,500</span>
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
