"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tag, Plus, Trash2, Edit2,
  TrendingUp, Users, Calendar, Clock,
  CheckCircle2, Sparkles, Percent, Gift,
  HeartPulse, ShieldCheck
} from "lucide-react";

export default function HealthcareOffersPage() {
  const activeOffers = [
    { id: 1, title: "New Patient Welcome", code: "WELCOME20", discount: "20% OFF", type: "First Visit", status: "Active", expires: "Dec 31, 2024", used: 84 },
    { id: 2, title: "Family Health Package", code: "FAMILY10", discount: "₹500 OFF", type: "Multi-person", status: "Active", expires: "Ongoing", used: 237 },
    { id: 3, title: "Ramadan Wellness Drive", code: "RAMA30", discount: "30% OFF", type: "Seasonal", status: "Expired", expires: "Apr 10, 2024", used: 612 },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-teal-600 font-black uppercase tracking-widest text-[10px]">
            <Tag className="h-3 w-3" /> Patient Outreach
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Offers & Campaigns</h1>
          <p className="text-muted-foreground font-medium">Create targeted wellness offers and seasonal health packages for your patients.</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700 rounded-full px-8 font-black shadow-lg shadow-teal-200 h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> New Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 shadow-inner">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none">Campaign Impact</p>
            <h2 className="text-3xl font-black text-foreground">+38%</h2>
            <p className="text-xs font-bold text-emerald-600 uppercase">Patient Retention</p>
          </div>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner">
            <Users className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none">Redemptions</p>
            <h2 className="text-3xl font-black text-foreground">933</h2>
            <p className="text-xs font-bold text-blue-600 uppercase">This Quarter</p>
          </div>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 space-y-4 relative overflow-hidden">
          <HeartPulse className="absolute -top-4 -right-4 h-24 w-24 opacity-10" />
          <div className="space-y-4 relative z-10">
            <p className="text-xs font-black uppercase tracking-widest opacity-80">Hub Visibility</p>
            <h2 className="text-xl font-black leading-snug">Feature your clinic on the Halal Hub health directory.</h2>
            <Button variant="secondary" className="w-full rounded-xl font-black text-[10px] uppercase h-10 bg-teal-600 text-white border-none">Boost Listing</Button>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-black px-2">Active Campaigns</h2>
        <div className="grid grid-cols-1 gap-6">
          {activeOffers.map((offer) => (
            <Card key={offer.id} className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-teal-100">
              <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-8">
                  <div className={`h-20 w-20 rounded-3xl ${offer.status === 'Active' ? 'bg-teal-50 text-teal-600' : 'bg-muted text-muted-foreground'} flex items-center justify-center shadow-inner`}>
                    {offer.type === 'Multi-person' ? <Users className="h-10 w-10" /> : offer.type === 'Seasonal' ? <Gift className="h-10 w-10" /> : <Percent className="h-10 w-10" />}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-black text-foreground">{offer.title}</h3>
                      <Badge className={offer.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-none px-3' : 'bg-muted text-muted-foreground border-none px-3'}>
                        {offer.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black text-teal-600 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-tighter">{offer.code}</span>
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{offer.type}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-10">
                  <div className="text-center md:text-right">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Benefit</p>
                    <p className="text-2xl font-black text-foreground">{offer.discount}</p>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Redemptions</p>
                    <p className="text-2xl font-black text-foreground">{offer.used}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="rounded-xl"><Edit2 className="h-4 w-4 text-muted-foreground" /></Button>
                    <Button variant="ghost" size="icon" className="rounded-xl hover:text-rose-500"><Trash2 className="h-4 w-4 text-muted-foreground" /></Button>
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
