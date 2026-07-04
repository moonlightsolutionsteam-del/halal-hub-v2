
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, MapPin, Clock, CheckCircle2, 
  Navigation, Users, Bike, Phone,
  ArrowUpRight, Search, PlusCircle,
  Thermometer, ShieldCheck, Zap, Timer,
  CookingPot, ChevronRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function CateringLogisticsPage() {
  const deployments = [
    { id: "LOG-CAT-901", event: "Nikah Gala", base: "Kitchen A", destination: "Grand Ballroom", status: "In Transit", temp: "65°C (Warm)", time: "15m left" },
    { id: "LOG-CAT-902", event: "Corporate Lunch", base: "Kitchen B", destination: "Tech HQ", status: "Deployment Set", temp: "Ready", time: "Starts 12PM" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-[10px]">
            <Truck className="h-3 w-3" /> Off-site Ops
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Catering Logistics</h1>
          <p className="text-muted-foreground font-medium">Manage base kitchen dispatches, on-site setup deployments, and cold/warm chain compliance.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            Route Planning
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-8 font-black shadow-lg shadow-blue-200 h-12 text-white">
            Dispatch Vehicle
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Active Deployments", value: "4", icon: Truck, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Base Kitchens", value: "2", icon: CookingPot, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Rider Readiness", value: "98%", icon: Zap, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Audit Health", value: "Pass", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
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
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden h-[450px] relative">
            <Image src="https://placehold.co/1200x800/png?text=Interactive+Catering+Deployment+Map" alt="Map" fill className="object-cover opacity-40 grayscale" />
            <div className="absolute inset-0 bg-blue-600/5 backdrop-blur-[1px]" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4">
              <div className="h-16 w-16 bg-card rounded-full flex items-center justify-center shadow-2xl border-4 border-blue-600">
                <Navigation className="h-8 w-8 text-blue-600 animate-pulse" />
              </div>
              <Badge className="bg-zinc-900 text-white font-black px-6 py-2 rounded-full text-xs uppercase tracking-widest border-4 border-white shadow-2xl">
                2 VEHICLES IN TRANSIT TO VENUES
              </Badge>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card">
            <CardHeader className="p-8 border-b">
              <CardTitle className="text-xl font-black">Live Deployment Queue</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-50">
                {deployments.map((del) => (
                  <div key={del.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-muted/50 transition-colors group">
                    <div className="flex items-center gap-6">
                      <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                        <CookingPot className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-black text-foreground text-sm">{del.id}</p>
                        <p className="font-bold text-foreground">{del.event}</p>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
                          <span>From: {del.base}</span>
                          <ChevronRight className="h-2 w-2" />
                          <span>To: {del.destination}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-10">
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Thermal Stat</p>
                        <Badge className={
                          del.temp.includes('Warm') ? 'bg-orange-50 text-orange-600 border-none' : 'bg-blue-50 text-blue-600 border-none'
                        }>
                          {del.temp}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Arrival</p>
                        <p className="text-sm font-black text-blue-600">{del.time}</p>
                      </div>
                      <Button size="icon" variant="ghost" className="rounded-xl hover:bg-card hover:shadow-md transition-all"><ArrowUpRight className="h-5 w-5 text-muted-foreground" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-10 space-y-8 relative overflow-hidden">
            <Zap className="absolute top-0 right-0 p-4 h-24 w-24 opacity-10 text-blue-600" />
            <div className="relative z-10 space-y-6">
              <h3 className="text-2xl font-black font-headline">Thermal Compliance</h3>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                Off-site catering requires strict temperature monitoring. Our IoT sensors provide real-time logs for your trust badge requirements.
              </p>
              <div className="flex items-center justify-between p-4 bg-card/5 rounded-2xl border border-white/10">
                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Active Sensors</span>
                <Badge variant="outline" className="text-[9px] font-black border-emerald-500/30 text-emerald-400 uppercase">ONLINE</Badge>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-14 font-black text-xs uppercase tracking-widest shadow-xl">
                View Thermal Logs
              </Button>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-6">
            <h3 className="text-xl font-black text-foreground">Vehicle Fleet</h3>
            <div className="space-y-4">
              {[
                { name: "Truck 01 (Chilled)", status: "Active", cap: "2 Ton" },
                { name: "Van 04 (Warm)", status: "Idle", cap: "1 Ton" },
                { name: "Bike 08 (Express)", status: "Active", cap: "50kg" },
              ].map((v, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-2xl group cursor-pointer hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-card rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                      <Truck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-foreground">{v.name}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">Cap: {v.cap}</p>
                    </div>
                  </div>
                  <Badge className={v.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-none' : 'bg-muted text-muted-foreground border-none'}>
                    {v.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
