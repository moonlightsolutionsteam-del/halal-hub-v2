
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, Plus, Search, Filter, Phone, 
  Mail, Globe, ShieldCheck, CheckCircle2,
  Hotel, Bus, UserCircle, Star, MoreVertical
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default function TravelPartnersPage() {
  const partners = [
    { id: 1, name: "Royal Halal Suites", type: "Hotel Partner", location: "Istanbul", rating: 4.9, active: true },
    { id: 2, name: "Sahara Transport Co.", type: "Transport", location: "Dubai", rating: 4.7, active: true },
    { id: 3, name: "Dr. Ahmed Khalid", type: "Religious Scholar", location: "London", rating: 5.0, active: true },
    { id: 4, name: "Al-Amin Tours", type: "Local Ground Ops", location: "Morocco", rating: 4.8, active: false },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-600 font-black uppercase tracking-widest text-[10px]">
            <Briefcase className="h-3 w-3" /> Supply Chain
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Partner Network</h1>
          <p className="text-muted-foreground font-medium">Manage your relationships with verified hotels, transport fleets, and religious guides.</p>
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700 rounded-full px-8 font-black shadow-lg shadow-amber-200 h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Partner
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Active Hotels", value: "12", icon: Hotel, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Transport Subs", value: "5", icon: Bus, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Vetted Scholars", value: "8", icon: UserCircle, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Trust Audits", value: "100%", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((stat, i) => (
          <Card key={i} className="rounded-3xl border-none shadow-sm p-6 bg-white flex items-center gap-4">
            <div className={`h-12 w-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-2">
          <h2 className="text-xl font-black">Vendor Registry</h2>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search partners..." className="pl-9 h-11 rounded-2xl bg-white border-none shadow-sm font-medium" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {partners.map((p) => (
            <Card key={p.id} className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden border-2 border-transparent hover:border-amber-100 transition-all group">
              <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-10">
                <div className="flex items-center gap-6">
                  <div className="h-16 w-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform shadow-inner">
                    {p.type === 'Hotel Partner' ? <Hotel className="h-8 w-8" /> : (p.type === 'Transport' ? <Bus className="h-8 w-8" /> : <UserCircle className="h-8 w-8" />)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-black text-slate-900">{p.name}</p>
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none px-3 text-[10px] font-black uppercase tracking-tighter">
                        {p.type}
                      </Badge>
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">• {p.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-12">
                  <div className="text-center md:text-right">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Audit Rating</p>
                    <div className="flex items-center gap-1.5 text-lg font-black text-slate-900 justify-center md:justify-end">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400 border-none" /> {p.rating}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="rounded-xl"><Phone className="h-4 w-4 text-slate-400" /></Button>
                    <Button variant="ghost" size="icon" className="rounded-xl"><MoreVertical className="h-5 w-5 text-slate-300" /></Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
