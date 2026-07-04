
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, Filter, MoreVertical, Clock, 
  CheckCircle2, XCircle, Truck, ShoppingBag,
  Eye, Printer, Phone, MessageSquare,
  ChevronRight, Calendar
} from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function VendorOrdersPage() {
  const orders = [
    { id: "ORD-7721", customer: "Ahmed Abdullah", items: "2x Wagyu Burger, 1x Baklava", total: "$64.50", type: "Delivery", status: "Active", time: "12 mins ago" },
    { id: "ORD-7722", customer: "Sarah Khan", items: "1x Mezze Platter, 2x Tea", total: "$28.00", type: "Pickup", status: "Ready", time: "25 mins ago" },
    { id: "ORD-7723", customer: "Omar Farooq", items: "3x Lamb Chops, 3x Rice", total: "$112.00", type: "Dine-in", status: "Preparing", time: "5 mins ago" },
    { id: "ORD-7724", customer: "Fatima S.", items: "1x Kunafa Large", total: "$18.00", type: "Delivery", status: "Pending", time: "Just now" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <ShoppingBag className="h-3 w-3" /> Sales & Fulfillment
          </div>
          <h1 className="text-3xl font-black font-headline">Order Management</h1>
          <p className="text-muted-foreground font-medium">Process incoming orders and track delivery statuses in real-time.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2">
            <Printer className="mr-2 h-4 w-4" /> Print Daily Log
          </Button>
          <Button className="bg-primary rounded-full px-8 font-bold shadow-lg shadow-primary/20">
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "New Orders", value: "12", color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Preparing", value: "5", color: "text-amber-500", bg: "bg-amber-50" },
          { label: "Ready / Out", value: "8", color: "text-emerald-500", bg: "bg-emerald-50" },
          { label: "Completed", value: "142", color: "text-muted-foreground", bg: "bg-muted" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl p-4 flex items-center gap-4 bg-card">
            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{stat.label}</p>
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <TabsList className="bg-card border rounded-[1.5rem] h-12 p-1">
            <TabsTrigger value="all" className="rounded-xl px-6 font-bold text-xs uppercase tracking-widest">All Orders</TabsTrigger>
            <TabsTrigger value="active" className="rounded-xl px-6 font-bold text-xs uppercase tracking-widest">Active</TabsTrigger>
            <TabsTrigger value="completed" className="rounded-xl px-6 font-bold text-xs uppercase tracking-widest">Completed</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search ID or Name..." className="pl-9 h-11 rounded-2xl bg-card border-none shadow-sm" />
            </div>
            <Button variant="outline" size="icon" className="h-11 w-11 rounded-2xl bg-card border-none shadow-sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="m-0">
          <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card">
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/10">
                  <TableRow className="hover:bg-transparent border-none">
                    <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest">Order ID</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest">Customer</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest">Type</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest">Status</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-right px-8">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-muted/5 border-muted/20">
                      <TableCell className="px-8 py-5">
                        <div className="font-black text-foreground">{order.id}</div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase">{order.time}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-foreground">{order.customer}</div>
                        <div className="text-[11px] text-muted-foreground line-clamp-1 italic">{order.items}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {order.type === 'Delivery' ? <Truck className="h-3.5 w-3.5 text-blue-500" /> : <ShoppingBag className="h-3.5 w-3.5 text-amber-500" />}
                          <span className="text-xs font-bold text-muted-foreground">{order.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          order.status === 'Ready' ? 'bg-emerald-500' : 
                          order.status === 'Preparing' ? 'bg-amber-500' : 
                          order.status === 'Pending' ? 'bg-blue-500' : 'bg-muted0'
                        }>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-8">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="icon" variant="ghost" className="rounded-xl hover:bg-muted"><Eye className="h-4 w-4 text-muted-foreground" /></Button>
                          <Button size="icon" variant="ghost" className="rounded-xl hover:bg-primary/10 hover:text-primary"><CheckCircle2 className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost" className="rounded-xl hover:bg-red-50 hover:text-red-500"><XCircle className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
