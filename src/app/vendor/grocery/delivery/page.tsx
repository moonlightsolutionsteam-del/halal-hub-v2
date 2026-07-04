"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, MapPin, Clock, CheckCircle2, 
  Navigation, Users, Bike, Phone,
  ArrowUpRight, SlidersHorizontal, Search,
  PlusCircle, Timer, Zap, Thermometer
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function GroceryDeliveryPage() {
  const activeDeliveries = [
    { id: "DEL-GRO-401", customer: "Zarah Khan", address: "12 Greenway, Brooklyn", rider: "Omar F.", status: "In Transit", time: "8m left" },
    { id: "DEL-GRO-402", customer: "Ahmed S.", address: "88 Broadway, Manhattan", rider: "Sami K.", status: "Ready", time: "Pickup now" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-[10px]">
            <Truck className="h-3 w-3" /> Store Logistics
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Delivery Management</h1>
          <p className="text-muted-foreground font-medium">Optimize routes, track riders, and manage home delivery service standards.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            Delivery Zones
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-8 font-black shadow-lg shadow-emerald-200 h-12 text-white">
            Assign Store Rider
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Active Deliveries", value: "5", icon: Truck, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Avg Delivery", value: "24m", icon: Timer, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Fleet Health", value: "98%", icon: Zap, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Cold Chain", value: "Stable", icon: Thermometer, color: "text-red-600", bg: "bg-red-50" },
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
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden h-[400px] relative">
            <Image src="https://placehold.co/1200x800/png?text=Interactive+Store+Delivery+Map" alt="Map" fill className="object-cover opacity-40 grayscale" />
            <div className="absolute inset-0 bg-emerald-600/5 backdrop-blur-[1px]" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4">
              <div className="h-16 w-16 bg-card rounded-full flex items-center justify-center shadow-2xl border-4 border-emerald-600">
                <Navigation className="h-8 w-8 text-emerald-600 animate-pulse" />
              </div>
              <Badge className="bg-zinc-900 text-white font-black px-6 py-2 rounded-full text-xs uppercase tracking-widest border-4 border-white shadow-2xl">
                3 RIDERS ACTIVE IN ZONE A
              </Badge>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card">
            <CardHeader className="p-8 border-b">
              <CardTitle className="text-xl font-black">Dispatch Queue</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-50">
                {activeDeliveries.map((del) => (
                  <div key={del.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-muted/50 transition-colors group">
                    <div className="flex items-center gap-6">
                      <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <Bike className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-black text-foreground text-sm">{del.id}</p>
                        <p className="font-bold text-foreground">{del.customer}</p>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                          <MapPin className="h-3 w-3" /> {del.address}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-10">
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Arrival</p>
                        <p className="text-sm font-black text-emerald-600">{del.time}</p>
                      </div>
                      <Button size="icon" variant="ghost" className="rounded-xl"><ArrowUpRight className="h-5 w-5 text-muted-foreground" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 space-y-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Zap className="h-24 w-24" />
            </div>
            <h3 className="text-xl font-black relative z-10">Fulfillment Efficiency</h3>
            <p className="text-sm text-muted-foreground font-medium leading-relaxed relative z-10">
              Your average delivery time is 5 minutes faster than the area average. This is increasing your store's platform visibility.
            </p>
            <Button className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-widest shadow-xl relative z-10">
              Efficiency Report
            </Button>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-6">
            <h3 className="text-xl font-black text-foreground">Store Fleet</h3>
            <div className="space-y-4">
              {[
                { name: "Sami Khan", status: "On Trip", rating: 4.9 },
                { name: "Ibrahim S.", status: "Waiting", rating: 4.8 },
                { name: "Omar F.", status: "Off-duty", rating: 4.7 },
              ].map((rider, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-2xl group cursor-pointer hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-card rounded-full flex items-center justify-center text-emerald-600 font-black text-xs shadow-sm">{rider.name[0]}</div>
                    <div>
                      <p className="text-sm font-black text-foreground">{rider.name}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">{rider.status}</p>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" className="rounded-xl"><Phone className="h-4 w-4 text-muted-foreground" /></Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}