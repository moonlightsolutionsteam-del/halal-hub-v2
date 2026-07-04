"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Tag, Plus, Trash2, Edit2, 
  TrendingUp, Users, Calendar, Clock,
  CheckCircle2, Sparkles, Percent, Gift,
  Zap, ArrowRight
} from "lucide-react";

export default function MarketingOffersPage() {
  const activeOffers = [
    { id: 1, title: "Friday Family Special", code: "FRIFAM20", discount: "20% OFF", type: "Menu Wide", status: "Active", expires: "Dec 31, 2024", used: 142 },
    { id: 2, title: "First Scan Reward", code: "HUBWELCOME", discount: "Free Drink", type: "New User", status: "Active", expires: "Ongoing", used: 850 },
    { id: 3, title: "Biryani Festival", code: "BIR2024", discount: "Buy 1 Get 1", type: "Specific Item", status: "Expired", expires: "Oct 30, 2024", used: 45 },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-5xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <Tag className="h-3 w-3" /> Growth & Revenue
          </div>
          <h1 className="text-3xl font-black font-headline">Offers & Coupons</h1>
          <p className="text-muted-foreground font-medium">Drive traffic and reward loyalty with customizable marketing campaigns.</p>
        </div>
        <Button className="bg-primary rounded-full px-8 font-black shadow-lg shadow-primary/20 h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> Create New Offer
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Promotion Impact</p>
            <h2 className="text-3xl font-black text-foreground">₹12,450</h2>
            <p className="text-xs font-bold text-emerald-600 uppercase">+18% Revenue Boost</p>
          </div>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Users className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Coupons Redeemed</p>
            <h2 className="text-3xl font-black text-foreground">1,036</h2>
            <p className="text-xs font-bold text-blue-600 uppercase">Last 30 Days</p>
          </div>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-primary text-white p-8 space-y-4 relative overflow-hidden">
          <Sparkles className="absolute -top-4 -right-4 h-24 w-24 opacity-10" />
          <div className="space-y-4 relative z-10">
            <p className="text-xs font-black uppercase tracking-widest opacity-80">Marketplace Boost</p>
            <h2 className="text-xl font-black leading-snug">Feature your top offer on the Hub Home.</h2>
            <Button variant="secondary" className="w-full rounded-xl font-black text-[10px] uppercase h-10">Upgrade Campaign</Button>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-black px-2">Campaign Manager</h2>
        <div className="grid grid-cols-1 gap-6">
          {activeOffers.map((offer) => (
            <Card key={offer.id} className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-primary/10">
              <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-8">
                  <div className={`h-20 w-20 rounded-3xl ${offer.status === 'Active' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'} flex items-center justify-center shadow-inner`}>
                    {offer.title.includes('Festival') ? <Gift className="h-10 w-10" /> : <Percent className="h-10 w-10" />}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-black text-foreground">{offer.title}</h3>
                      <Badge className={offer.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-none' : 'bg-muted text-muted-foreground border-none'}>
                        {offer.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-tighter">{offer.code}</span>
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{offer.type}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-10">
                  <div className="text-center md:text-right">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Discount</p>
                    <p className="text-2xl font-black text-foreground">{offer.discount}</p>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Redemptions</p>
                    <p className="text-2xl font-black text-foreground">{offer.used}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="rounded-xl"><Edit2 className="h-4 w-4 text-muted-foreground" /></Button>
                    <Button variant="ghost" size="icon" className="rounded-xl hover:text-rose-500"><Trash2 className="h-4 w-4 text-muted-foreground" /></Button>
                  </div>
                </div>
              </div>
              <div className="px-8 py-4 bg-muted border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                    <Calendar className="h-3.5 w-3.5" /> Starts: Oct 01
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                    <Clock className="h-3.5 w-3.5" /> Ends: {offer.expires}
                  </div>
                </div>
                <Button variant="link" className="text-[10px] font-black uppercase tracking-widest text-primary p-0 h-auto">View Insights <ArrowRight className="ml-1 h-3 w-3" /></Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
