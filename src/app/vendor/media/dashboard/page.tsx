
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, BookOpen, ShoppingCart, Download, 
  Star, Tag, Users, AlertCircle,
  ArrowUpRight, PlusCircle, Settings,
  Clock, MapPin, CheckCircle2, TrendingUp,
  Library, FileText
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function MediaDashboard() {
  const kpis = [
    { label: "Revenue (Month)", value: "₹75,450", trend: "+8.2%", icon: Wallet },
    { label: "Total Titles", value: "1,240", trend: "15 new this month", icon: BookOpen },
    { label: "Pending Orders", value: "12", trend: "Action required", icon: ShoppingCart, variant: "destructive" as const },
    { label: "Digital Downloads", value: "450", trend: "+85 today", icon: Download },
    { label: "Avg. Review", value: "4.9", trend: "from 850 readers", icon: Star },
    { label: "Active Pre-orders", value: "24", trend: "Upcoming Release", icon: Clock },
    { label: "Partner Authors", value: "42", trend: "Global network", icon: Users },
    { label: "Stock Alerts", value: "5", trend: "Restock needed", icon: AlertCircle, variant: "warning" as const },
  ];

  const recentOrders = [
    { id: "MED-5021", customer: "Ahmed Khan", type: "Physical Book", items: "The Sealed Nectar", total: "₹850", status: "Processing" },
    { id: "MED-5022", customer: "Sarah Malik", type: "E-Book", items: "Islamic Finance Guide", total: "₹450", status: "Delivered" },
    { id: "MED-5023", customer: "Yusuf Ali", type: "Audiobook", items: "Quran Tajweed Course", total: "₹1,200", status: "Delivered" },
  ];

  const quickActions = [
    { label: "Add Title", icon: PlusCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Digital Upload", icon: Download, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Manage Inventory", icon: Library, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Marketing", icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Author Portal", icon: Users, color: "text-muted-foreground", bg: "bg-muted" },
    { label: "Settings", icon: Settings, color: "text-muted-foreground", bg: "bg-muted" },
  ];

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline text-foreground">Bookstores &amp; Islamic Media Dashboard</h1>
        <p className="text-muted-foreground font-medium opacity-60">Manage your literature, digital media, and customer orders.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <CardTitle className="text-xl font-black">Recent Orders &amp; Downloads</CardTitle>
              <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full font-black text-xs px-6 h-10">
                All Activity <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Order / Customer</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Type</TableHead>
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
                      <TableCell className="font-bold text-muted-foreground text-xs">{order.type}</TableCell>
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
              <CardTitle className="text-xl font-black">Content Demand</CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
              {[
                { name: "Children's Literature", status: "High Demand", val: 95 },
                { name: "Islamic History", status: "Steady", val: 65, variant: "warning" },
                { name: "Self-Improvement", status: "Rising", val: 82 },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className={item.variant === 'warning' ? 'text-amber-500' : 'text-emerald-500'}>{item.status}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.variant === 'warning' ? 'bg-amber-400' : 'bg-primary'} transition-all`}
                      style={{ width: `${item.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-primary text-primary-foreground p-8 overflow-hidden relative">
            <BookOpen className="absolute -top-4 -right-4 h-24 w-24 opacity-10" />
            <div className="relative z-10 space-y-4">
              <h3 className="text-xl font-black">Digital Distribution?</h3>
              <p className="text-sm font-medium opacity-80 leading-relaxed">
                Reach a global audience by listing your e-books and audio courses on the Halal Hub digital library.
              </p>
              <Button variant="secondary" className="w-full rounded-2xl font-black text-xs uppercase tracking-widest">Go Digital</Button>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Top Selling Title</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="p-4 bg-muted/30 rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-card rounded-xl overflow-hidden shadow-sm">
                    <img src="https://picsum.photos/seed/book/100/100" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-foreground">The Prophet's Prayer</p>
                    <p className="text-[10px] text-muted-foreground font-bold">150 copies sold this week</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-black">₹450</span>
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none font-black text-[9px] uppercase">Bestseller</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
