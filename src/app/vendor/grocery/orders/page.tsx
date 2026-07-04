"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, Search, Filter, Clock, 
  CheckCircle2, XCircle, Truck, Phone,
  Printer, MoreVertical, Eye, MapPin,
  PackageCheck, Timer, ShoppingBag
} from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function GroceryOrdersPage() {
  const orders = [
    { id: "GRO-1021", customer: "Sara Khan", items: "12 items", total: "₹2,450", status: "Packing", time: "12 mins ago", type: "Delivery" },
    { id: "GRO-1022", customer: "Ahmed S.", items: "4 items", total: "₹850", status: "Ready", time: "25 mins ago", type: "Pickup" },
    { id: "GRO-1023", customer: "Zaid Ali", items: "25 items", total: "₹5,200", status: "Out for Delivery", time: "1 hour ago", type: "Delivery" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-[10px]">
            <ShoppingCart className="h-3 w-3" /> Retail Fulfillment
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Store Orders</h1>
          <p className="text-muted-foreground font-medium">Manage online grocery orders, pickup schedules, and delivery dispatch.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            <Printer className="mr-2 h-4 w-4" /> Daily Summary
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-8 font-black shadow-lg shadow-emerald-200 h-12 text-white">
            <PackageCheck className="mr-2 h-4 w-4" /> Start Packing
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {[
          { label: "New Orders", value: "8", icon: ShoppingCart, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Ready for Pickup", value: "12", icon: ShoppingBag, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "In Transit", value: "5", icon: Truck, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Avg Prep Time", value: "18m", icon: Timer, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((stat, i) => (
          <Card key={i} className="rounded-3xl border-none shadow-sm p-6 bg-card flex items-center gap-4">
            <div className={`h-12 w-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-foreground">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card">
        <CardHeader className="p-8 border-b flex flex-col md:flex-row items-center justify-between gap-4">
          <CardTitle className="text-xl font-black">Active Order Queue</CardTitle>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search Order ID..." className="pl-9 h-11 rounded-2xl bg-muted border-none" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-none">
                <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">ID / Time</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Customer & Size</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Type</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Total</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
                <TableHead className="h-14 text-right px-8 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="border-border hover:bg-muted/50 transition-colors group">
                  <TableCell className="px-8 py-5">
                    <div className="font-black text-foreground text-sm">{order.id}</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase">{order.time}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-foreground">{order.customer}</div>
                    <div className="text-[10px] font-black text-emerald-600 uppercase">{order.items}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {order.type === 'Delivery' ? <Truck className="h-3.5 w-3.5 text-blue-500" /> : <ShoppingBag className="h-3.5 w-3.5 text-emerald-500" />}
                      <span className="text-xs font-bold text-muted-foreground">{order.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-black text-foreground">{order.total}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      order.status === 'Ready' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 
                      order.status === 'Packing' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-muted text-muted-foreground border-border'
                    }>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="icon" variant="ghost" className="rounded-xl group-hover:bg-card shadow-none group-hover:shadow-sm transition-all"><Eye className="h-4 w-4 text-muted-foreground" /></Button>
                      <Button size="icon" variant="ghost" className="rounded-xl group-hover:text-emerald-600 transition-colors"><CheckCircle2 className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}