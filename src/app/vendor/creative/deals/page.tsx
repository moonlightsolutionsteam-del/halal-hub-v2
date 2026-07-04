"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Tag, Target, ArrowUpRight, TrendingUp,
  Briefcase, Star, MessageSquare, Plus,
  ArrowLeft, Search, Filter, Smartphone,
  CheckCircle2, Zap, ShieldCheck, Globe,
  ArrowRight
} from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

const DEALS = [
  { id: 1, brand: "Pure Glow Beauty", title: "Winter Purity Campaign", budget: "₹25,000", status: "Active", type: "Sponsored Review", deadline: "Dec 12" },
  { id: 2, brand: "Saffron Travels", title: "Umrah App Showcase", budget: "₹1,45,000", status: "Proposal", type: "Vlog Series", deadline: "Jan 05" },
  { id: 3, brand: "The Bosphorus Kitchen", title: "Ramadan Prep Live", budget: "₹15,000", status: "Completed", type: "Live Streaming", deadline: "Finished" },
];

export default function CreativeDealsPage() {
  return (
    <div className="container mx-auto p-6 space-y-10 max-w-6xl pb-24 text-foreground">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <Link href="/vendor/creative/dashboard" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-14 w-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-inner">
              <Tag className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h1 className="text-4xl font-black font-headline tracking-tight text-foreground">Brand Deals & Ads</h1>
              <p className="text-muted-foreground font-medium text-lg italic">Monetize your influence through verified ethical sponsorships.</p>
            </div>
          </div>
        </div>
        <Button className="bg-zinc-900 hover:bg-zinc-800 rounded-full px-10 font-black shadow-lg h-16 text-white transition-all active:scale-95 text-lg">
          <Plus className="mr-2 h-6 w-6" /> Explore Deal Hub
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DEALS.map((deal) => (
          <Card key={deal.id} className="group rounded-[3rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-amber-100 flex flex-col h-full">
            <div className="p-8 flex-1 space-y-6">
              <div className="flex justify-between items-start">
                <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground group-hover:scale-110 transition-transform">
                  <Briefcase className="h-7 w-7" />
                </div>
                <Badge className={cn(
                  "border-none font-black text-[9px] uppercase tracking-widest px-3 h-6 flex items-center",
                  deal.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-muted text-muted-foreground'
                )}>
                  {deal.status}
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase text-amber-600 tracking-widest leading-none mb-1">{deal.brand}</p>
                <h3 className="text-2xl font-black text-foreground leading-tight group-hover:text-amber-600 transition-colors">{deal.title}</h3>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{deal.type}</p>
              </div>
              <div className="flex justify-between items-end border-t border-border pt-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Contract Value</p>
                  <p className="text-2xl font-black text-foreground">{deal.budget}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Deadline</p>
                  <p className="text-sm font-black text-rose-600">{deal.deadline}</p>
                </div>
              </div>
            </div>
            <CardFooter className="p-8 pt-0">
              <Button className="w-full h-12 rounded-xl bg-muted group-hover:bg-amber-600 text-muted-foreground group-hover:text-white font-black text-[10px] uppercase tracking-widest shadow-none hover:shadow-xl transition-all">
                Manage Delivery <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <Card className="rounded-[3rem] border-none shadow-sm bg-zinc-900 text-white p-12 space-y-8 relative overflow-hidden group">
          <Smartphone className="absolute -top-4 -right-4 h-48 w-48 opacity-5 text-amber-400 group-hover:scale-110 transition-transform duration-1000" />
          <div className="relative z-10 space-y-6">
            <Badge className="bg-amber-500 text-white border-none font-black text-xs uppercase px-6 py-2 rounded-full shadow-2xl">AD REVENUE HUB</Badge>
            <h2 className="text-4xl font-black tracking-tight leading-tight">Monetize Your <br />Content Directly</h2>
            <p className="text-muted-foreground text-lg leading-relaxed italic max-w-md">
              "Enable ad-placements on your Studio Reels and Blog posts to earn monthly passive income from verified halal brands."
            </p>
            <div className="flex items-center gap-6 pt-4">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase opacity-40">CPM Average</p>
                <p className="text-2xl font-black">₹450</p>
              </div>
              <div className="h-10 w-px bg-card/10" />
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase opacity-40">Monthly Reach</p>
                <p className="text-2xl font-black">1.2M+</p>
              </div>
            </div>
            <Button className="bg-card text-foreground hover:bg-muted rounded-2xl h-14 px-10 font-black uppercase text-xs tracking-widest shadow-2xl mt-4">Enable Ad-Rev</Button>
          </div>
        </Card>

        <div className="space-y-8">
          <div className="px-4 space-y-2">
            <h3 className="text-2xl font-black text-foreground">Verification Integrity</h3>
            <p className="text-sm text-muted-foreground font-medium italic">
              Brands on Halal Hub are pre-vetted for ethical standards. We only match you with partners who align with Islamic values.
            </p>
          </div>
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10 space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-[1.5rem] bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div>
                <h4 className="text-lg font-black text-foreground uppercase tracking-tighter">Verified Brands Only</h4>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Ethical Partnership Rule</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: "Financial Ethics Audit", status: "Required", active: true },
                { label: "Product Halal Status", status: "Required", active: true },
                { label: "Fair Labor Standards", status: "Optional", active: false },
              ].map((rule, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-2xl">
                  <span className="text-sm font-bold text-foreground">{rule.label}</span>
                  <Badge className={cn("text-[9px] font-black uppercase border-none h-6", rule.active ? "bg-emerald-50 text-emerald-600" : "bg-muted text-muted-foreground")}>
                    {rule.status}
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
