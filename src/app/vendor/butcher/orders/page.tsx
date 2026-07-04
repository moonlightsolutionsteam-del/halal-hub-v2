"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
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
  const [showPrintLabelsModal, setShowPrintLabelsModal] = useState(false)
  const [showDispatchQueueModal, setShowDispatchQueueModal] = useState(false)
  const [showViewOrderModal, setShowViewOrderModal] = useState(false)
  const [showConfirmOrderModal, setShowConfirmOrderModal] = useState(false)
  const [showViewMapModal, setShowViewMapModal] = useState(false)
  const [showAcceptRequestModal, setShowAcceptRequestModal] = useState(false)
  const [showDeclineRequestModal, setShowDeclineRequestModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<{ id: string; customer: string; items: string; total: string } | null>(null)

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
          <h1 className="text-2xl sm:text-3xl font-black font-headline">Butcher Orders</h1>
          <p className="text-muted-foreground font-medium">Manage custom cuts, bulk orders, and home deliveries.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowPrintLabelsModal(true)} className="rounded-full px-6 font-bold border-2">
            <Printer className="mr-2 h-4 w-4" /> Print Labels
          </Button>
          <Button onClick={() => setShowDispatchQueueModal(true)} className="bg-primary rounded-full px-8 font-bold shadow-lg shadow-primary/20">
            Dispatch Queue
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card">
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
                      <div className="font-black text-foreground">{order.id}</div>
                      <div className="text-[10px] font-bold text-muted-foreground uppercase">{order.time}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-bold text-foreground">{order.customer}</div>
                      <div className="text-[11px] text-muted-foreground italic line-clamp-1">{order.items}</div>
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
                        order.status === 'Preparing' ? 'bg-amber-500' : 'bg-blue-500'
                      }>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right px-8">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="icon" variant="ghost" onClick={() => { setSelectedOrder(order); setShowViewOrderModal(true); }} className="rounded-xl"><Eye className="h-4 w-4 text-muted-foreground" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => { setSelectedOrder(order); setShowConfirmOrderModal(true); }} className="rounded-xl hover:text-emerald-600"><CheckCircle2 className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-[2.5rem] border-none shadow-sm p-8 bg-zinc-900 text-white relative overflow-hidden">
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
              <Button onClick={() => setShowViewMapModal(true)} className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl h-12 font-black text-xs uppercase tracking-widest">View Map</Button>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm p-8 space-y-6 bg-card">
            <h3 className="text-xl font-black text-foreground">Custom Cut Requests</h3>
            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-2xl border border-transparent hover:border-primary/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-8 w-8 bg-card rounded-xl flex items-center justify-center text-primary font-black text-xs shadow-sm">SM</div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Sami M.</p>
                    <p className="text-[10px] text-muted-foreground font-bold">Inquiry • 45m ago</p>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground font-medium leading-relaxed italic">
                  "Need 3kg of lamb chops cut extra thin for a BBQ tonight. Possible?"
                </p>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => setShowAcceptRequestModal(true)} className="flex-1 rounded-xl font-black text-[10px] h-8 border-primary/20 text-primary">Accept</Button>
                  <Button variant="outline" size="sm" onClick={() => setShowDeclineRequestModal(true)} className="flex-1 rounded-xl font-black text-[10px] h-8 text-muted-foreground">Decline</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Print Labels Modal */}
      <Dialog open={showPrintLabelsModal} onOpenChange={setShowPrintLabelsModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Print Labels</DialogTitle>
            <DialogDescription>Configure and print order labels for packaging and dispatch.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Label Format</Label>
              <Input placeholder="e.g. A4, A5, Thermal 4x6" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Order ID Range</Label>
              <Input placeholder="e.g. BORD-101 to BORD-110" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Copies per Label</Label>
              <Input placeholder="e.g. 1" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-primary" onClick={() => setShowPrintLabelsModal(false)}>Print Now</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dispatch Queue Modal */}
      <Dialog open={showDispatchQueueModal} onOpenChange={setShowDispatchQueueModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Dispatch Queue</DialogTitle>
            <DialogDescription>Review and dispatch orders ready for delivery or pickup.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Assign Rider</Label>
              <Input placeholder="e.g. Zaid F., Omar K." className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Dispatch Time</Label>
              <Input placeholder="e.g. Now, Schedule for 3:00 PM" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Priority</Label>
              <Input placeholder="e.g. Normal, Urgent" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-primary" onClick={() => setShowDispatchQueueModal(false)}>Confirm Dispatch</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Order Modal */}
      <Dialog open={showViewOrderModal} onOpenChange={setShowViewOrderModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Order Details</DialogTitle>
            <DialogDescription>Full details for order {selectedOrder?.id}.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="p-4 bg-muted rounded-2xl space-y-3">
              <div className="flex justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Customer</span>
                <span className="text-sm font-bold">{selectedOrder?.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Items</span>
                <span className="text-sm font-bold">{selectedOrder?.items}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Total</span>
                <span className="text-sm font-black text-primary">{selectedOrder?.total}</span>
              </div>
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-primary" onClick={() => setShowViewOrderModal(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirm Order Modal */}
      <Dialog open={showConfirmOrderModal} onOpenChange={setShowConfirmOrderModal}>
        <DialogContent className="rounded-[2rem] max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Mark as Ready</DialogTitle>
            <DialogDescription>Confirm that order <strong>{selectedOrder?.id}</strong> for {selectedOrder?.customer} is ready for dispatch or pickup.</DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1 h-12 rounded-2xl font-black" onClick={() => setShowConfirmOrderModal(false)}>Cancel</Button>
            <Button className="flex-1 h-12 rounded-2xl font-black bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => setShowConfirmOrderModal(false)}>Confirm</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Map Modal */}
      <Dialog open={showViewMapModal} onOpenChange={setShowViewMapModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Live Delivery Map</DialogTitle>
            <DialogDescription>Real-time rider locations and delivery route tracking.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="h-48 bg-muted rounded-2xl flex items-center justify-center">
              <div className="text-center space-y-2">
                <MapPin className="h-10 w-10 text-primary mx-auto" />
                <p className="text-sm font-black text-muted-foreground">Live map view available in the full delivery module</p>
              </div>
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-primary" onClick={() => setShowViewMapModal(false)}>Open Full Map</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Accept Custom Cut Request Modal */}
      <Dialog open={showAcceptRequestModal} onOpenChange={setShowAcceptRequestModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Accept Custom Request</DialogTitle>
            <DialogDescription>Confirm details and estimated time for Sami M.'s custom cut order.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Estimated Completion</Label>
              <Input placeholder="e.g. 30 minutes, 1 hour" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Price Quote (₹)</Label>
              <Input placeholder="e.g. 1,200" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Notes to Customer</Label>
              <Input placeholder="e.g. Will be ready by 6 PM" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-primary" onClick={() => setShowAcceptRequestModal(false)}>Send Acceptance</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Decline Custom Cut Request Modal */}
      <Dialog open={showDeclineRequestModal} onOpenChange={setShowDeclineRequestModal}>
        <DialogContent className="rounded-[2rem] max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Decline Request</DialogTitle>
            <DialogDescription>Are you sure you want to decline Sami M.'s custom cut request?</DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1 h-12 rounded-2xl font-black" onClick={() => setShowDeclineRequestModal(false)}>Go Back</Button>
            <Button className="flex-1 h-12 rounded-2xl font-black bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowDeclineRequestModal(false)}>Decline</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
