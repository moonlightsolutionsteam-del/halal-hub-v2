
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Tag, Plus, Trash2, Edit2, 
  TrendingUp, Users, Calendar, Clock,
  CheckCircle2, Sparkles, Percent, Gift,
  Zap, ArrowRight, Shirt
} from "lucide-react";

export default function FashionOffersPage() {
  const activeOffers = [
    { id: 1, title: "Ramadan Collection Early Bird", code: "RAMADAN25", discount: "20% OFF", type: "Full Catalog", status: "Active", expires: "Mar 31, 2025", used: 124 },
    { id: 2, title: "Hijab Bundle Deal", code: "BUNDLE3", discount: "₹500 OFF", type: "Specific Category", status: "Active", expires: "Ongoing", used: 450 },
    { id: 3, title: "Flash Modesty Sale", code: "FLASH15", discount: "15% OFF", type: "Selected Items", status: "Expired", expires: "Oct 30, 2024", used: 85 },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-5xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-pink-600 font-black uppercase tracking-widest text-[10px]">
            <Tag className="h-3 w-3" /> Growth & Revenue
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Campaigns & Promos</h1>
          <p className="text-muted-foreground font-medium">Create targeted discounts for seasonal collections or first-time buyers.</p>
        </div>
        <Button className="bg-pink-600 hover:bg-pink-700 rounded-full px-8 font-black shadow-lg shadow-pink-200 h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> New Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-600 shadow-inner">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">Campaign ROI</p>
            <h2 className="text-3xl font-black text-slate-900">₹1.2M</h2>
            <p className="text-xs font-bold text-emerald-600 uppercase">+15% Conversion Boost</p>
          </div>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-4">
          <div className={`h-12 w-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 shadow-inner`}>
            <Users className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">Claims</p>
            <h2 className="text-3xl font-black text-slate-900">650</h2>
            <p className="text-xs font-bold text-blue-600 uppercase">This Month</p>
          </div>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-8 space-y-4 relative overflow-hidden">
          <Sparkles className="absolute -top-4 -right-4 h-24 w-24 opacity-10" />
          <div className="space-y-4 relative z-10">
            <p className="text-xs font-black uppercase tracking-widest opacity-80">Marketplace Visibility</p>
            <h2 className="text-xl font-black leading-snug">Feature your brand on the Hub Home.</h2>
            <Button variant="secondary" className="w-full rounded-xl font-black text-[10px] uppercase h-10 bg-pink-600 text-white border-none">Upgrade Listing</Button>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-black px-2">Active Brand Promos</h2>
        <div className="grid grid-cols-1 gap-6">
          {activeOffers.map((offer) => (
            <Card key={offer.id} className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-pink-100">
              <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-8">
                  <div className={`h-20 w-20 rounded-3xl ${offer.status === 'Active' ? 'bg-pink-50 text-pink-600' : 'bg-slate-100 text-slate-400'} flex items-center justify-center shadow-inner`}>
                    {offer.type.includes('Catalog') ? <Shirt className="h-10 w-10" /> : <Percent className="h-10 w-10" />}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-black text-slate-900">{offer.title}</h3>
                      <Badge className={offer.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-none px-3' : 'bg-slate-100 text-slate-400 border-none px-3'}>
                        {offer.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black text-pink-600 bg-pink-50 px-3 py-1 rounded-full uppercase tracking-tighter">{offer.code}</span>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{offer.type}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-10">
                  <div className="text-center md:text-right">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Discount</p>
                    <p className="text-2xl font-black text-slate-900">{offer.discount}</p>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Total Claims</p>
                    <p className="text-2xl font-black text-slate-900">{offer.used}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="rounded-xl"><Edit2 className="h-4 w-4 text-slate-400" /></Button>
                    <Button variant="ghost" size="icon" className="rounded-xl hover:text-rose-500"><Trash2 className="h-4 w-4 text-slate-400" /></Button>
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
