
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Package, Search, Filter, Camera, 
  ShieldCheck, TrendingUp, ArrowUpRight,
  UtensilsCrossed, Smartphone, Globe,
  CheckCircle2, Plus, Zap, Star
} from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

export default function AccountServicesPage() {
  const marketplace = [
    { id: 1, title: "Premium Food Photography", provider: "Elite Studio", price: "₹15,000", rating: 4.9, icon: Camera, color: "text-blue-600", bg: "bg-blue-50" },
    { id: 2, title: "Official Halal Hub Audit", provider: "Trust Compliance", price: "₹25,000", rating: 5.0, icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
    { id: 3, title: "Digital Marketing Boost", provider: "Hub Ads", price: "₹10,000/mo", rating: 4.8, icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
    { id: 4, title: "QR Menu Custom Design", provider: "Creative Team", price: "₹5,000", rating: 4.7, icon: Smartphone, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <Package className="h-3 w-3" /> Vendor Services
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Request Hub Services</h1>
          <p className="text-muted-foreground font-medium">Access our network of verified professionals to grow your business presence.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2">
            My Requests
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[2.5rem] shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search services (Audit, Photo, etc)..." className="pl-9 h-11 rounded-2xl bg-slate-50 border-none" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-4 py-2 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-all">All</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted">Verification</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted">Media</Badge>
          <Button variant="ghost" size="icon" className="rounded-full"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {marketplace.map((service) => (
          <Card key={service.id} className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden group hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-primary/10">
            <div className="p-10 flex gap-10">
              <div className={`h-24 w-24 rounded-[2rem] ${service.bg} flex items-center justify-center ${service.color} shrink-0 group-hover:scale-110 transition-transform shadow-inner`}>
                <service.icon className="h-12 w-12" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{service.title}</h3>
                    <div className="flex items-center gap-1.5 text-sm font-bold text-amber-500">
                      <Star className="h-4 w-4 fill-current" /> {service.rating}
                    </div>
                  </div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none">by {service.provider}</p>
                </div>
                <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Investment</p>
                    <p className="text-2xl font-black text-slate-900">{service.price}</p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 rounded-2xl px-8 font-black text-xs uppercase tracking-widest h-12 shadow-lg shadow-primary/20 text-white">
                    Get Started <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-12 overflow-hidden relative">
        <Zap className="absolute -bottom-4 -right-4 h-48 w-48 opacity-10" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-4xl font-black tracking-tight">Custom Growth Consultation</h2>
              <p className="text-slate-400 font-medium text-lg leading-relaxed">
                Not sure which service you need? Book a 15-minute session with our account managers to build your growth roadmap.
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-2xl h-16 px-10 font-black uppercase text-sm tracking-widest shadow-2xl">
              Book Free Call
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 text-center space-y-2">
              <p className="text-4xl font-black text-emerald-400">100%</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified Pros</p>
            </div>
            <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 text-center space-y-2">
              <p className="text-4xl font-black text-blue-400">24h</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Initial Response</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
