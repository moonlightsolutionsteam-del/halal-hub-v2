
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, Zap, Gift, Users, 
  TrendingUp, Star, ShieldCheck,
  Plus, ArrowRight, Coins, Clock,
  Shirt
} from "lucide-react";

export default function FashionLoyaltyPage() {
  const activePrograms = [
    { id: 1, name: "Modesty Elite Coins", status: "Active", earningRate: "5 Coins per ₹1000", members: "1.2k", issued: "125k Coins" },
    { id: 2, name: "Seasonal Tier Upgrade", status: "Active", earningRate: "Early Access to Drops", members: "450", issued: "85 Rewards" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-pink-600 font-black uppercase tracking-widest text-[10px]">
            <Heart className="h-3 w-3" /> Retention Engine
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Loyalty & Rewards</h1>
          <p className="text-muted-foreground font-medium">Build a returning customer base with style-coins, seasonal early access, and exclusive brand perks.</p>
        </div>
        <Button className="bg-pink-600 hover:bg-pink-700 rounded-full px-8 font-black shadow-lg shadow-pink-200 h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Reward Tier
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-pink-600 text-white p-10 relative overflow-hidden">
            <Coins className="absolute -top-4 -right-4 h-48 w-48 opacity-10" />
            <div className="relative z-10 space-y-8">
              <div className="space-y-2">
                <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Active Loyalty Members</p>
                <h2 className="text-7xl font-black tracking-tighter">1,650</h2>
                <div className="flex items-center gap-2 text-sm font-bold bg-white/20 w-fit px-4 py-1.5 rounded-full backdrop-blur-md">
                  <TrendingUp className="h-4 w-4" /> +12% this month
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-white/10 pt-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase opacity-60 tracking-widest">Style-Coins Issued</p>
                  <p className="text-2xl font-black">42.8k</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase opacity-60 tracking-widest">Redemptions</p>
                  <p className="text-2xl font-black">1,024</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase opacity-60 tracking-widest">Return Rate</p>
                  <p className="text-2xl font-black">74%</p>
                </div>
              </div>
            </div>
          </Card>

          <section className="space-y-6">
            <h2 className="text-xl font-black px-2">Brand Programs</h2>
            <div className="grid grid-cols-1 gap-4">
              {activePrograms.map((program) => (
                <Card key={program.id} className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden border-2 border-transparent hover:border-pink-100 transition-all group">
                  <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex items-center gap-8">
                      <div className="h-16 w-16 rounded-3xl bg-slate-50 flex items-center justify-center text-pink-600 shadow-inner group-hover:scale-110 transition-transform">
                        {program.name.includes('Coin') ? <Coins className="h-8 w-8" /> : <Shirt className="h-8 w-8" />}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-black text-slate-900">{program.name}</h3>
                          <Badge className="bg-emerald-50 text-emerald-600 border-none px-3 text-[9px] font-black uppercase">{program.status}</Badge>
                        </div>
                        <p className="text-sm font-bold text-slate-400">{program.earningRate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-12 text-center md:text-right">
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Members</p>
                        <p className="text-xl font-black text-slate-900">{program.members}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-xl"><ArrowRight className="h-5 w-5 text-slate-300" /></Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-10 space-y-8 relative overflow-hidden">
            <Zap className="absolute top-0 right-0 p-4 h-24 w-24 opacity-10 text-pink-600" />
            <div className="relative z-10 space-y-6">
              <h3 className="text-2xl font-black font-headline">Instant Redemptions</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                Enable customers to redeem their Style-Coins directly at the checkout for instant discounts.
              </p>
              <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white rounded-2xl h-14 font-black text-xs uppercase tracking-widest shadow-xl">
                Configure Marketplace Pay
              </Button>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6">
            <h3 className="text-xl font-black text-slate-900">Top Redeemed Perks</h3>
            <div className="space-y-4">
              {[
                { name: "Free Express Shipping", count: 142 },
                { name: "₹500 Discount Coupon", count: 85 },
                { name: "Early Drop Access", count: 42 },
              ].map((perk, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-pink-100 transition-all group cursor-pointer">
                  <span className="text-sm font-bold text-slate-700">{perk.name}</span>
                  <Badge variant="secondary" className="bg-white text-slate-400 font-black text-[10px]">{perk.count}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
