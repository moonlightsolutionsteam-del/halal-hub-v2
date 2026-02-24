
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ShoppingBag, Search, Filter, Clock, 
  CheckCircle2, XCircle, Truck, Phone,
  Printer, MoreVertical, Eye, MapPin
} from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";

const MeatIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.5 2a2.5 2.5 0 0 0-2.5 2.5V6a3 3 0 0 0 3 3h1a2 2 0 0 1 2 2v1a3 3 0 0 1-3 3h-1a3 3 0 0 1-3-3v-1.5" />
    <path d="M15 22a7 7 0 0 0 7-7c0-2.5-2-4.5-4.5-4.5h-1a2.5 2.5 0 0 0-2.5 2.5V15a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-1" />
    <circle cx="15" cy="15" r="1" />
  </svg>
);

export default function ButcherOrdersPage() {
  const orders = [
    { id: "BORD-101", customer: "Zainab Malik", items: "2kg Mutton, 1kg Chicken", total: "₹2,120", status: "Preparing", time: "15 mins ago", type: "Delivery" },
    { id: "BORD-102", customer: "Ibrahim S.", items: "5kg Bulk Beef Ribs", total: "₹4,750", status: "Ready", time: "1 hour ago", type: "Pickup" },
    { id: "BORD-103", customer: "Local Cafe", items: "10kg Mutton Curry Cut", total: "₹8,500", status: "Out for Delivery", time: "2 hours ago", type: "Delivery" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <MeatIcon className="h-3 w-3" /> Shop Fulfillment
          </div>
          <h1 className="text-3xl font-black font-headline">Butcher Orders</h1>
          <p className="text-muted-foreground font-medium">Manage custom cuts, bulk orders, and home deliveries.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2">
            <Printer className="mr-2 h-4 w-4" /> Print Labels
          </Button>
          <Button className="bg-primary rounded-full px-8 font-bold shadow-lg shadow-primary/20">
            Dispatch Queue
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
          <CardHeader className="p-8 border-b flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-black">Active Butcher Queue</CardTitle>
            <div className="relative w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input placeholder="Search Order..." className="pl-8 h-9 rounded-xl bg-muted/30 border-none text-xs" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/10">
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="px-8 font-black text-[10px] uppercase tracking-widest">ID / Time</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest">Customer & Items</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest">Type</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest">Status</TableHead>
                  <TableHead className="text-right px-8 font-black text-[10px] uppercase tracking-widest">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-muted/5 border-muted/20">
                    <TableCell className="px-8 py-5">
                      <div className="font-black text-slate-900">{order.id}</div>
                      <div className="text-[10px] font-bold text-muted-foreground uppercase">{order.time}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-bold text-slate-800">{order.customer}</div>
                      <div className="text-[11px] text-muted-foreground italic line-clamp-1">{order.items}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {order.type === 'Delivery' ? <Truck className="h-3.5 w-3.5 text-blue-500" /> : <ShoppingBag className="h-3.5 w-3.5 text-amber-500" />}
                        <span className="text-xs font-bold text-slate-600">{order.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={
                        order.status === 'Ready' ? 'bg-emerald-500' : 
                        order.status === 'Preparing' ? 'bg-amber-500' : 'bg-blue-500'
                      }>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right px-8">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="icon" variant="ghost" className="rounded-xl"><Eye className="h-4 w-4 text-slate-400" /></Button>
                        <Button size="icon" variant="ghost" className="rounded-xl hover:text-emerald-600"><CheckCircle2 className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-[2.5rem] border-none shadow-sm p-8 bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Truck className="h-24 w-24" />
            </div>
            <div className="relative z-10 space-y-6">
              <h3 className="text-xl font-black leading-tight">Delivery Logistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-xs font-bold opacity-60 uppercase tracking-widest">Active Riders</span>
                  <span className="text-xl font-black">3</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-xs font-bold opacity-60 uppercase tracking-widest">Avg Time</span>
                  <span className="text-xl font-black">24m</span>
                </div>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl h-12 font-black text-xs uppercase tracking-widest">View Map</Button>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm p-8 space-y-6 bg-white">
            <h3 className="text-xl font-black text-slate-900">Custom Cut Requests</h3>
            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-2xl border border-transparent hover:border-primary/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-8 w-8 bg-white rounded-xl flex items-center justify-center text-primary font-black text-xs shadow-sm">SM</div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Sami M.</p>
                    <p className="text-[10px] text-muted-foreground font-bold">Inquiry • 45m ago</p>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 font-medium leading-relaxed italic">
                  "Need 3kg of lamb chops cut extra thin for a BBQ tonight. Possible?"
                </p>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1 rounded-xl font-black text-[10px] h-8 border-primary/20 text-primary">Accept</Button>
                  <Button variant="outline" size="sm" className="flex-1 rounded-xl font-black text-[10px] h-8 text-slate-400">Decline</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
