
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, MapPin, Clock, CheckCircle2, 
  Navigation, Users, Bike, Phone,
  ArrowUpRight, SlidersHorizontal, Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function DeliveryManagementPage() {
  const activeDeliveries = [
    { id: "DEL-401", customer: "Zarah Khan", address: "12 Greenway, Brooklyn", rider: "Omar F.", status: "In Transit", time: "12m left" },
    { id: "DEL-402", customer: "Ahmed S.", address: "88 Broadway, Manhattan", rider: "Sami K.", status: "Pickup Ready", time: "Just now" },
    { id: "DEL-403", customer: "Fatima M.", address: "Apartment 4B, Queens", rider: "Ibrahim", status: "Delivered", time: "Completed" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <Truck className="h-3 w-3" /> Fulfillment Logistics
          </div>
          <h1 className="text-3xl font-black font-headline">Delivery Management</h1>
          <p className="text-muted-foreground font-medium">Track active orders, manage delivery riders, and optimize routes.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2">
            <SlidersHorizontal className="mr-2 h-4 w-4" /> Zones
          </Button>
          <Button className="bg-primary rounded-full px-8 font-bold shadow-lg shadow-primary/20">
            <PlusCircle className="mr-2 h-4 w-4" /> Assign Rider
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
            <div className="relative h-[400px] w-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold overflow-hidden">
              <Image src="https://placehold.co/1200x800/png?text=Interactive+Delivery+Map" alt="Map" fill className="object-cover opacity-50 grayscale" />
              <div className="absolute inset-0 bg-primary/5 backdrop-blur-[1px]" />
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-primary">
                  <Navigation className="h-8 w-8 text-primary animate-pulse" />
                </div>
                <Badge className="bg-slate-900 text-white font-black px-6 py-2 rounded-full text-xs uppercase tracking-widest border-4 border-white shadow-2xl">
                  3 ACTIVE RIDERS ON TRACK
                </Badge>
              </div>
            </div>
            <CardContent className="p-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Avg. Time</p>
                <p className="text-2xl font-black text-slate-900">24 mins</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Rider Efficiency</p>
                <p className="text-2xl font-black text-primary">98%</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Zone Health</p>
                <p className="text-2xl font-black text-emerald-500">Peak Ops</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="p-8 border-b">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <CardTitle className="text-xl font-black">Active Dispatch Queue</CardTitle>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search orders..." className="pl-9 h-10 rounded-xl bg-muted/30 border-none" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {activeDeliveries.map((delivery) => (
                  <div key={delivery.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors group">
                    <div className="flex items-center gap-6">
                      <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform shadow-inner">
                        <Bike className="h-7 w-7" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-black text-slate-900">{delivery.id}</span>
                          <Badge variant="outline" className="text-[9px] font-black uppercase px-2 h-5 flex items-center border-blue-200 text-blue-600">{delivery.status}</Badge>
                        </div>
                        <p className="font-bold text-slate-700 text-sm">{delivery.customer}</p>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                          <MapPin className="h-3 w-3" /> {delivery.address}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-10">
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Rider</p>
                        <p className="text-sm font-bold text-slate-900">{delivery.rider}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Arrival</p>
                        <p className="text-sm font-black text-primary">{delivery.time}</p>
                      </div>
                      <Button size="icon" variant="ghost" className="rounded-xl hover:bg-white hover:shadow-md"><ArrowUpRight className="h-5 w-5 text-slate-400" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Rider Management</CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
              {[
                { name: "Omar Farooq", status: "In Transit", rating: 4.9, active: true },
                { name: "Sami Khan", status: "Waiting", rating: 4.8, active: true },
                { name: "Ibrahim Sheikh", status: "Off-duty", rating: 4.7, active: false },
              ].map((rider, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-3xl bg-slate-50/50 border border-transparent hover:border-primary/10 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-primary font-black text-xs shadow-sm">
                      {rider.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900">{rider.name}</p>
                      <div className="flex items-center gap-2">
                        <div className={`h-1.5 w-1.5 rounded-full ${rider.active ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{rider.status}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" className="rounded-xl"><Phone className="h-4 w-4 text-slate-400" /></Button>
                </div>
              ))}
              <Button variant="outline" className="w-full h-12 rounded-2xl border-2 font-black text-xs uppercase tracking-widest">
                Manage Fleet
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-8 space-y-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <CheckCircle2 className="h-24 w-24" />
            </div>
            <div className="relative z-10 space-y-4">
              <h3 className="text-xl font-black">Route Optimization</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                Our AI-powered route planner saves an average of 15% on delivery fuel costs and reduces wait times.
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl h-12 font-black text-xs uppercase tracking-widest shadow-xl">
                Run Optimizer
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function PlusCircle(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
        </svg>
    )
}
