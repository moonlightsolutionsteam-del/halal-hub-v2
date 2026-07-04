
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ShoppingBag, Search, Filter, Clock, 
  CheckCircle2, Truck, Phone,
  Printer, MoreVertical, Eye, MapPin,
  PackageCheck, Timer, Box
} from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";

export default function FashionOrdersPage() {
  const orders = [
    { id: "FSH-1021", customer: "Aisha Malik", items: "2x Chiffon Hijab, 1x Modest Abaya", total: "₹5,700", status: "Packing", time: "12 mins ago", type: "Standard Ship" },
    { id: "FSH-1022", customer: "Sara Khan", items: "1x Luxury Maxi Dress", total: "₹4,250", status: "Ready", time: "45 mins ago", type: "Store Pickup" },
    { id: "FSH-1023", customer: "Nadia Farooq", items: "5x Under-cap Multipack", total: "₹2,250", status: "Shipped", time: "2 hours ago", type: "Express Ship" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-pink-600 font-black uppercase tracking-widest text-[10px]">
            <ShoppingBag className="h-3 w-3" /> Order Fulfillment
          </div>
          <h1 className="text-3xl font-black font-headline text-foreground">Manage Orders</h1>
          <p className="text-muted-foreground font-medium">Track your online sales, manage inventory dispatches, and handle shipping statuses.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            <Printer className="mr-2 h-4 w-4" /> Print Labels
          </Button>
          <Button className="bg-pink-600 hover:bg-pink-700 rounded-full px-8 font-black shadow-lg shadow-pink-200 h-12 text-white">
            <PackageCheck className="mr-2 h-4 w-4" /> Batch Fulfillment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "New Orders", value: "12", icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Ready to Dispatch", value: "8", icon: Box, color: "text-pink-600", bg: "bg-pink-50" },
          { label: "In Transit", value: "24", icon: Truck, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Avg Fulfillment", value: "4h", icon: Timer, color: "text-emerald-600", bg: "bg-emerald-50" },
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
          <CardTitle className="text-xl font-black">Dispatch Registry</CardTitle>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search Order ID..." className="pl-9 h-11 rounded-2xl bg-muted border-none font-medium" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-none">
                <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">ID / Time</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Customer & Items</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Method</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Total</TableHead>
                <TableHead className="h-14 text-right px-8 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
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
                    <div className="text-[10px] font-black text-pink-600 uppercase italic line-clamp-1">{order.items}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {order.type.includes('Ship') ? <Truck className="h-3.5 w-3.5 text-blue-500" /> : <Box className="h-3.5 w-3.5 text-emerald-500" />}
                      <span className="text-xs font-bold text-muted-foreground">{order.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-black text-foreground">{order.total}</TableCell>
                  <TableCell className="text-right px-8">
                    <Badge variant="outline" className={
                      order.status === 'Shipped' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 font-black text-[9px] px-3' : 
                      order.status === 'Packing' ? 'bg-blue-50 text-blue-600 border-blue-200 font-black text-[9px] px-3' : 
                      'bg-muted text-muted-foreground border-border font-black text-[9px] px-3'
                    }>
                      {order.status}
                    </Badge>
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
