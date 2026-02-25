"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, Users, TrendingUp, Calendar, 
  Clock, CheckCircle2, UserCheck, Smartphone,
  ArrowUpRight, LayoutGrid, Search, Filter,
  MoreVertical, SmartphoneNfc, Zap
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default function EngagementCheckInsPage() {
  const visitors = [
    { id: 1, name: "Ahmed Abdullah", time: "12 mins ago", visitCount: 5, loyalty: "Silver" },
    { id: 2, name: "Sarah Khan", time: "45 mins ago", visitCount: 12, loyalty: "Gold" },
    { id: 3, name: "Omar Sheikh", time: "1 hour ago", visitCount: 1, loyalty: "New Member" },
    { id: 4, name: "Fatima S.", time: "2 hours ago", visitCount: 3, loyalty: "Silver" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-5xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <MapPin className="h-3 w-3" /> Footfall Tracking
          </div>
          <h1 className="text-3xl font-black font-headline">Check-ins & Footfall</h1>
          <p className="text-muted-foreground font-medium">Monitor physical visits and reward customers for their loyalty.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2">
            <LayoutGrid className="mr-2 h-4 w-4" /> Layout View
          </Button>
          <Button className="bg-primary rounded-full px-8 font-bold shadow-lg shadow-primary/20 h-12 text-white">
            <SmartphoneNfc className="mr-2 h-4 w-4" /> Beacon Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 flex items-center gap-6">
          <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <UserCheck className="h-7 w-7" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Today's Visits</p>
            <p className="text-3xl font-black text-slate-900">142</p>
          </div>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 flex items-center gap-6">
          <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
            <TrendingUp className="h-7 w-7" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Returning Rate</p>
            <p className="text-3xl font-black text-slate-900">64%</p>
          </div>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-8 flex items-center gap-6 relative overflow-hidden">
          <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center text-primary relative z-10">
            <Zap className="h-7 w-7" />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Loyalty Points Issued</p>
            <p className="text-3xl font-black text-white">12.5k</p>
          </div>
          <div className="absolute -top-4 -right-4 h-24 w-24 bg-primary/10 rounded-full blur-2xl" />
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-2">
          <h2 className="text-xl font-black">Live Visitor Feed</h2>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search visitors..." className="pl-9 h-11 rounded-2xl bg-white border-none shadow-sm" />
            </div>
            <Button variant="outline" size="icon" className="h-11 w-11 rounded-2xl bg-white border-none shadow-sm"><Filter className="h-4 w-4" /></Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {visitors.map((visitor) => (
            <Card key={visitor.id} className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden border-2 border-transparent hover:border-primary/10 transition-all group">
              <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-12 w-12 border-2 border-slate-50">
                    <AvatarImage src={`https://picsum.photos/seed/visit${visitor.id}/100/100`} />
                    <AvatarFallback>{visitor.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-lg font-black text-slate-900 leading-tight">{visitor.name}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={
                        visitor.loyalty === 'Gold' ? 'border-amber-200 text-amber-600 bg-amber-50' : 
                        visitor.loyalty === 'Silver' ? 'border-slate-200 text-slate-600 bg-slate-50' : 
                        'border-primary/20 text-primary bg-primary/5'
                      }>
                        {visitor.loyalty}
                      </Badge>
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">• {visitor.time}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-10">
                  <div className="text-center md:text-right">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Lifetime Visits</p>
                    <p className="text-xl font-black text-slate-900">{visitor.visitCount}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="rounded-xl h-10 px-6 font-bold border-2 text-xs">Profile</Button>
                    <Button className="rounded-xl h-10 px-6 font-black uppercase text-[10px] tracking-widest bg-primary text-white">Award Points</Button>
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
