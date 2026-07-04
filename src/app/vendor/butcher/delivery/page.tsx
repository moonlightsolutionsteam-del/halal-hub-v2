"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Truck, MapPin, Clock, CheckCircle2,
  Bike, Phone, ArrowUpRight, Search,
  Thermometer, ShieldCheck, Zap, Navigation,
  PackageCheck, Timer
} from "lucide-react";
import Image from "next/image";

export default function ButcherDeliveryPage() {
  const [showLogisticsSettingsModal, setShowLogisticsSettingsModal] = useState(false)
  const [showAssignRiderModal, setShowAssignRiderModal] = useState(false)
  const [showViewChainLogsModal, setShowViewChainLogsModal] = useState(false)
  const [showDeliveryDetailModal, setShowDeliveryDetailModal] = useState(false)
  const [showCallRiderModal, setShowCallRiderModal] = useState(false)
  const [selectedDelivery, setSelectedDelivery] = useState<{ id: string; customer: string; items: string; rider: string } | null>(null)
  const [selectedRider, setSelectedRider] = useState<{ name: string; status: string } | null>(null)

  const activeDeliveries = [
    { id: "MT-DEL-991", customer: "Sarah Ahmed", items: "2kg Mutton, 1kg Wings", rider: "Zaid F.", status: "Out for Delivery", temp: "2°C", time: "8m left" },
    { id: "MT-DEL-992", customer: "Ibrahim Malik", items: "5kg Bulk Beef Ribs", rider: "Omar K.", status: "Packing", temp: "Hold", time: "Pending" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-red-600 font-black uppercase tracking-widest text-[10px]">
            <Truck className="h-3 w-3" /> Fresh Fulfillment
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Delivery Logistics</h1>
          <p className="text-muted-foreground font-medium">Manage meat dispatch, cold-chain compliance, and rider tracking.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowLogisticsSettingsModal(true)} className="rounded-full px-6 font-bold border-2 h-12">
            Logistics Settings
          </Button>
          <Button onClick={() => setShowAssignRiderModal(true)} className="bg-red-600 hover:bg-red-700 rounded-full px-8 font-black shadow-lg shadow-red-200 h-12 text-white">
            Assign New Rider
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {[
          { label: "Active Orders", value: "8", icon: PackageCheck, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Avg Delivery", value: "22m", icon: Timer, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Temp Stability", value: "100%", icon: Thermometer, color: "text-red-600", bg: "bg-red-50" },
          { label: "Rider Health", value: "Online", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden">
            <div className="relative h-[350px] bg-muted flex items-center justify-center">
              <Image src="https://placehold.co/1200x800/png?text=Interactive+Route+Map" alt="Map" fill className="object-cover opacity-40 grayscale" />
              <div className="absolute inset-0 bg-red-600/5" />
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="h-16 w-16 bg-card rounded-full flex items-center justify-center shadow-2xl border-4 border-red-600">
                  <Navigation className="h-8 w-8 text-red-600 animate-pulse" />
                </div>
                <Badge className="bg-zinc-900 text-white font-black px-6 py-2 rounded-full text-xs uppercase tracking-widest border-4 border-white shadow-2xl">
                  2 LIVE DELIVERIES IN TRANSIT
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden">
            <CardHeader className="p-8 border-b flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-black">Dispatch Queue</CardTitle>
              <div className="relative w-48">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search ID..." className="pl-9 h-10 rounded-xl bg-muted border-none" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {activeDeliveries.map((delivery) => (
                  <div key={delivery.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-muted/50 transition-colors group">
                    <div className="flex items-center gap-6">
                      <div className="h-14 w-14 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                        <Bike className="h-7 w-7" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-black text-foreground">{delivery.id}</span>
                          <Badge variant="outline" className="text-[9px] font-black border-red-200 text-red-600">{delivery.status}</Badge>
                        </div>
                        <p className="font-bold text-foreground text-sm">{delivery.customer}</p>
                        <p className="text-xs text-muted-foreground font-medium italic">{delivery.items}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-10">
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Temperature</p>
                        <p className={`text-sm font-black ${delivery.temp === 'Hold' ? 'text-muted-foreground' : 'text-blue-600'}`}>{delivery.temp}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Est. Time</p>
                        <p className="text-sm font-black text-red-600">{delivery.time}</p>
                      </div>
                      <Button size="icon" variant="ghost" onClick={() => { setSelectedDelivery(delivery); setShowDeliveryDetailModal(true); }} className="rounded-xl"><ArrowUpRight className="h-5 w-5 text-muted-foreground" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 space-y-8 relative overflow-hidden">
            <Zap className="absolute top-0 right-0 p-4 opacity-5 text-red-600" />
            <div className="relative z-10 space-y-6">
              <h3 className="text-2xl font-black">Cold Chain Security</h3>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                Our logistics partner API ensures every fresh meat delivery is tracked for temperature compliance.
              </p>
              <div className="flex items-center justify-between p-4 bg-card/5 rounded-2xl border border-white/10">
                <span className="text-xs font-bold text-muted-foreground uppercase">Compliance Badge</span>
                <Badge className="bg-emerald-500 text-white border-none font-black text-[9px]">ACTIVE</Badge>
              </div>
              <Button onClick={() => setShowViewChainLogsModal(true)} className="w-full bg-red-600 hover:bg-red-700 text-white rounded-2xl h-14 font-black text-xs uppercase tracking-widest shadow-xl">
                View Chain Logs
              </Button>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-6">
            <h3 className="text-xl font-black">Fleet Overview</h3>
            <div className="space-y-4">
              {[
                { name: "Zaid F.", status: "On Trip", rating: 4.9 },
                { name: "Omar K.", status: "In Shop", rating: 4.8 },
                { name: "Sami M.", status: "Off-duty", rating: 4.7 },
              ].map((rider, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-2xl group cursor-pointer hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-card rounded-full flex items-center justify-center text-red-600 font-black text-xs shadow-sm">{rider.name[0]}</div>
                    <div>
                      <p className="text-sm font-black text-foreground">{rider.name}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">{rider.status}</p>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => { setSelectedRider(rider); setShowCallRiderModal(true); }} className="rounded-xl"><Phone className="h-4 w-4 text-muted-foreground" /></Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Logistics Settings Modal */}
      <Dialog open={showLogisticsSettingsModal} onOpenChange={setShowLogisticsSettingsModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Logistics Settings</DialogTitle>
            <DialogDescription>Configure delivery zones, time slots, and cold-chain requirements.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Delivery Radius (km)</Label>
              <Input placeholder="e.g. 10" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Delivery Time Slot</Label>
              <Input placeholder="e.g. 9:00 AM – 8:00 PM" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Minimum Order Value (₹)</Label>
              <Input placeholder="e.g. 500" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Cold Chain Alert Threshold (°C)</Label>
              <Input placeholder="e.g. 5°C" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowLogisticsSettingsModal(false)}>Save Settings</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Assign New Rider Modal */}
      <Dialog open={showAssignRiderModal} onOpenChange={setShowAssignRiderModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Assign New Rider</DialogTitle>
            <DialogDescription>Add a new delivery rider to your fleet.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Rider Full Name</Label>
              <Input placeholder="e.g. Hassan Ali" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Phone Number</Label>
              <Input placeholder="e.g. +91 98765 43210" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Vehicle Type</Label>
              <Input placeholder="e.g. Bike, Van, Cold Van" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Shift Hours</Label>
              <Input placeholder="e.g. 9 AM – 5 PM" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowAssignRiderModal(false)}>Add Rider</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Chain Logs Modal */}
      <Dialog open={showViewChainLogsModal} onOpenChange={setShowViewChainLogsModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Cold Chain Logs</DialogTitle>
            <DialogDescription>Temperature compliance history for your deliveries.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-3">
              {["MT-DEL-991 — 2°C — COMPLIANT", "MT-DEL-990 — 3°C — COMPLIANT", "MT-DEL-989 — 4°C — COMPLIANT"].map((log, i) => (
                <div key={i} className="p-4 bg-muted rounded-2xl flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">{log}</span>
                  <Badge className="bg-emerald-100 text-emerald-700 border-none text-[9px] font-black">OK</Badge>
                </div>
              ))}
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowViewChainLogsModal(false)}>Export Logs</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delivery Detail Modal */}
      <Dialog open={showDeliveryDetailModal} onOpenChange={setShowDeliveryDetailModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Delivery Details</DialogTitle>
            <DialogDescription>Full tracking info for {selectedDelivery?.id}.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="p-4 bg-muted rounded-2xl space-y-3">
              <div className="flex justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Customer</span>
                <span className="text-sm font-bold">{selectedDelivery?.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Items</span>
                <span className="text-sm font-bold">{selectedDelivery?.items}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Rider</span>
                <span className="text-sm font-bold">{selectedDelivery?.rider}</span>
              </div>
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowDeliveryDetailModal(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Call Rider Modal */}
      <Dialog open={showCallRiderModal} onOpenChange={setShowCallRiderModal}>
        <DialogContent className="rounded-[2rem] max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Contact Rider</DialogTitle>
            <DialogDescription>Get in touch with {selectedRider?.name} ({selectedRider?.status}).</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="p-4 bg-muted rounded-2xl flex items-center gap-4">
              <Phone className="h-5 w-5 text-red-600" />
              <span className="text-sm font-bold text-foreground">+91 98765 43210</span>
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowCallRiderModal(false)}>Call Now</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
