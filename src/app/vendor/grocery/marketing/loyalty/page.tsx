"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, Zap, Gift, Users, 
  TrendingUp, Star, ShieldCheck,
  Plus, ArrowRight, Coins, Clock,
  ShoppingCart
} from "lucide-react";

export default function GroceryLoyaltyPage() {
  const activePrograms = [
    { id: 1, name: "Fresh Club Coins", status: "Active", earningRate: "1 Coin per ₹100", members: "1.2k", issued: "125k Coins" },
    { id: 2, name: "Supermarket Regulars", status: "Active", earningRate: "Free Delivery on 10th Shop", members: "850", issued: "450 Rewards" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-[10px]">
            <Heart className="h-3 w-3" /> Retention Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Loyalty & Rewards</h1>
          <p className="text-muted-foreground font-medium">Build a returning customer base with coins, stamps, and exclusive store perks.</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-8 font-black shadow-lg shadow-emerald-200 h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> Create Reward Tier
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-emerald-600 text-white p-10 relative overflow-hidden">
            <Coins className="absolute -top-4 -right-4 h-48 w-48 opacity-10" />
            <div className="relative z-10 space-y-8">
              <div className="space-y-2">
                <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Active Loyalty Members</p>
                <h2 className="text-7xl font-black tracking-tighter">2,045</h2>
                <div className="flex items-center gap-2 text-sm font-bold bg-card/20 w-fit px-4 py-1.5 rounded-full backdrop-blur-md">
                  <TrendingUp className="h-4 w-4" /> +15% this month
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-white/10 pt-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase opacity-60 tracking-widest">Points Issued</p>
                  <p className="text-2xl font-black">42.8k</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase opacity-60 tracking-widest">Redemptions</p>
                  <p className="text-2xl font-black">1,024</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase opacity-60 tracking-widest">Repeat Rate</p>
                  <p className="text-2xl font-black">68%</p>
                </div>
              </div>
            </div>
          </Card>

          <section className="space-y-6">
            <h2 className="text-xl font-black px-2">Store Reward Programs</h2>
            <div className="grid grid-cols-1 gap-4">
              {activePrograms.map((program) => (
                <Card key={program.id} className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden border-2 border-transparent hover:border-emerald-100 transition-all group">
                  <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex items-center gap-8">
                      <div className="h-16 w-16 rounded-3xl bg-muted flex items-center justify-center text-emerald-600 shadow-inner group-hover:scale-110 transition-transform">
                        {program.name.includes('Coin') ? <Coins className="h-8 w-8" /> : <Clock className="h-8 w-8" />}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-black text-foreground">{program.name}</h3>
                          <Badge className="bg-emerald-50 text-emerald-600 border-none px-3 text-[9px] font-black uppercase">{program.status}</Badge>
                        </div>
                        <p className="text-sm font-bold text-muted-foreground">{program.earningRate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-12 text-center md:text-right">
                      <div>
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Members</p>
                        <p className="text-xl font-black text-foreground">{program.members}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-xl"><ArrowRight className="h-5 w-5 text-muted-foreground" /></Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-10 space-y-8 relative overflow-hidden">
            <Zap className="absolute top-0 right-0 p-4 h-24 w-24 opacity-10 text-emerald-600" />
            <div className="relative z-10 space-y-6">
              <h3 className="text-2xl font-black font-headline">Instant Redemptions</h3>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                Enable customers to redeem their Hub Coins directly at the checkout counter for instant savings.
              </p>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-14 font-black text-xs uppercase tracking-widest shadow-xl">
                Configure POS Redemption
              </Button>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-6">
            <h3 className="text-xl font-black text-foreground">Top Reward Targets</h3>
            <div className="space-y-4">
              {[
                { name: "Fresh Vegetables", count: 450 },
                { name: "Meat Counter Payout", count: 210 },
                { name: "Bakery Staples", count: 185 },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-2xl border border-transparent hover:border-emerald-100 transition-all group cursor-pointer">
                  <span className="text-sm font-bold text-foreground">{item.name}</span>
                  <Badge variant="secondary" className="bg-card text-muted-foreground font-black text-[10px]">{item.count}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}