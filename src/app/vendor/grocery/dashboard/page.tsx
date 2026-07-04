"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, ShoppingCart, Package, AlertCircle, 
  Users, Tag, BarChart3, MessageSquare, 
  ArrowUpRight, PlusCircle, Settings,
  Boxes, Truck, History
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function GroceryDashboard() {
  const kpis = [
    { label: "Today's Revenue", value: "₹12,450", trend: "+8.2%", icon: Wallet },
    { label: "Active Orders", value: "18", trend: "5 scheduled for PM", icon: ShoppingCart },
    { label: "Inventory Items", value: "1,240", trend: "98% In Stock", icon: Boxes },
    { label: "Out of Stock", value: "12", trend: "Action required", icon: AlertCircle, variant: "destructive" as const },
    { label: "Customer Loyalty", value: "450", trend: "+12 new today", icon: Users },
    { label: "Expiring Soon", value: "8", trend: "Fresh items audit", icon: History },
    { label: "Coupon Usage", value: "24", trend: "Flash sale active", icon: Tag },
    { label: "Store Rating", value: "4.9", trend: "Top rated", icon: BarChart3 },
  ];

  const recentSales = [
    { id: "INV-8821", customer: "Sarah J.", items: 12, total: "₹1,240", time: "10 mins ago" },
    { id: "INV-8822", customer: "Mike R.", items: 4, total: "₹450", time: "25 mins ago" },
    { id: "INV-8823", customer: "Amina K.", items: 25, total: "₹3,800", time: "45 mins ago" },
  ];

  const quickActions = [
    { label: "Stock In", icon: PlusCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Inventory", icon: Boxes, color: "text-muted-foreground", bg: "bg-muted" },
    { label: "Deliveries", icon: Truck, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "POS", icon: Wallet, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Marketing", icon: Tag, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Settings", icon: Settings, color: "text-muted-foreground", bg: "bg-muted" },
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Grocery Dashboard</h1>
        <p className="text-muted-foreground font-medium opacity-60">Manage your supermarket inventory and sales.</p>
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
              <CardTitle className="text-xl font-black">Recent In-Store Sales</CardTitle>
              <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full font-black text-xs px-6 h-10">
                View Reports <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Order</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Customer</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Items</TableHead>
                    <TableHead className="text-right px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentSales.map((sale, i) => (
                    <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors">
                      <TableCell className="px-8 py-5">
                        <div className="font-bold text-foreground text-xs">{sale.id}</div>
                        <div className="text-[9px] font-bold text-muted-foreground uppercase">{sale.time}</div>
                      </TableCell>
                      <TableCell className="font-bold text-foreground">{sale.customer}</TableCell>
                      <TableCell className="font-bold text-muted-foreground text-sm">{sale.items}</TableCell>
                      <TableCell className="text-right px-8 font-black text-primary">{sale.total}</TableCell>
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
              <CardTitle className="text-xl font-black">Stock Health</CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
              {[
                { name: "Dairy Products", status: "Healthy", val: 95 },
                { name: "Produce / Veg", status: "Low Stock", val: 32, variant: "destructive" },
                { name: "Bakery", status: "Healthy", val: 88 },
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

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden">
            <CardHeader className="p-8">
              <CardTitle className="text-xl font-black">Online Orders</CardTitle>
              <p className="text-xs text-muted-foreground font-medium">Manage your app-based grocery orders.</p>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-4">
              <div className="p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-100 flex items-center justify-between">
                <div>
                  <p className="font-black text-emerald-900 text-sm">New Web Order</p>
                  <p className="text-[10px] font-bold text-emerald-600 uppercase">Total: ₹2,400</p>
                </div>
                <Button size="sm" className="bg-emerald-600 rounded-full font-black text-[10px]">Prepare</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
