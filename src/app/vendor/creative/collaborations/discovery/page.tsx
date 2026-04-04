"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Search, Filter, ArrowLeft, Star, 
  MapPin, Clock, CheckCircle2, Zap,
  TrendingUp, Globe, Smartphone, ArrowUpRight,
  ShieldCheck, Info, Sparkles, Target,
  DollarSign, Briefcase, Utensils, Shirt,
  Compass, HeartPulse, GraduationCap,
  Lock, ArrowRight
} from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  { id: 'all', label: 'All Deals', icon: Target },
  { id: 'food', label: 'Dining', icon: Utensils },
  { id: 'fashion', label: 'Fashion', icon: Shirt },
  { id: 'travel', label: 'Travel', icon: Compass },
  { id: 'health', label: 'Wellness', icon: HeartPulse },
  { id: 'edu', label: 'Education', icon: GraduationCap },
];

const OPEN_DEALS = [
  {
    id: 1,
    brand: "The Bosphorus Kitchen",
    title: "Ramadan Prep Feature",
    type: "Fine Dining",
    budget: "₹15,000",
    requirements: "1 Reel + 2 Stories",
    slots: "2/5 open",
    match: 98,
    tags: ["Paid", "Meal Included"],
    img: "food1"
  },
  {
    id: 2,
    brand: "Noor Collective",
    title: "Summer Chiffon Drop",
    type: "Modest Fashion",
    budget: "₹45,000",
    requirements: "3 Reels + Blog Post",
    slots: "1/3 open",
    match: 94,
    tags: ["Gifted Items", "Paid"],
    img: "fashion1"
  },
  {
    id: 3,
    brand: "Safe Care Medical",
    title: "Hijama Awareness Series",
    type: "Healthcare",
    budget: "₹25,000",
    requirements: "Video Interview",
    slots: "3/3 open",
    match: 88,
    tags: ["Expert Only", "High Impact"],
    img: "health1"
  },
  {
    id: 4,
    brand: "Heritage Travel",
    title: "Andalusia Vlog Sponsor",
    type: "Travel Agency",
    budget: "₹1,20,000",
    requirements: "Full Video Series",
    slots: "1/1 open",
    match: 82,
    tags: ["Travel Included", "Paid"],
    img: "travel1"
  }
];

export default function DiscoveryHubPage() {
  const [selectedCat, setSelectedCat] = React.useState("all");

  return (
    <div className="container mx-auto p-6 space-y-10 max-w-7xl pb-24 text-slate-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <Link href="/vendor/creative/collaborations" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Hub
          </Link>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-14 w-14 rounded-[1.5rem] bg-amber-50 flex items-center justify-center text-amber-600 shadow-inner">
              <Sparkles className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h1 className="text-5xl font-black font-headline tracking-tight text-slate-900">Discovery Hub</h1>
              <p className="text-muted-foreground font-medium text-xl italic">Find your next strategic partnership from our vetted brand network.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[2.5rem] border shadow-sm">
        <div className="relative w-full md:w-[450px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input placeholder="Search by campaign, requirements, or niche..." className="pl-12 h-14 rounded-2xl bg-slate-50 border-none font-medium text-lg" />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto px-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={cn(
                "px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap shadow-sm border-2",
                selectedCat === cat.id 
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105" 
                  : "bg-white text-slate-600 border-transparent hover:border-primary/20"
              )}
            >
              {cat.label}
            </button>
          ))}
          <Button variant="ghost" size="icon" className="h-14 w-14 rounded-2xl border bg-white shadow-sm shrink-0">
            <Filter className="h-5 w-5 text-slate-400" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Deal Feed */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between px-4">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Available Opportunities (<span className="text-primary">{OPEN_DEALS.length}</span>)</p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Sort by:</span>
              <select className="bg-transparent font-black text-xs uppercase outline-none cursor-pointer">
                <option>Highest Match</option>
                <option>Budget: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {OPEN_DEALS.map((deal) => (
              <Card key={deal.id} className="group rounded-[3rem] border-none shadow-sm overflow-hidden bg-white hover:shadow-2xl transition-all duration-700 flex flex-col h-full border-2 border-transparent hover:border-primary/10">
                <div className="relative aspect-video overflow-hidden">
                  <Image src={`https://picsum.photos/seed/deal-bg-${deal.img}/800/600`} alt={deal.brand} fill className="object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-white/90 backdrop-blur-md text-primary font-black border-none shadow-xl px-4 py-1.5 rounded-full flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {deal.match}% Match
                    </Badge>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase text-primary tracking-[0.2em]">{deal.type}</p>
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-black text-white leading-tight drop-shadow-md blur-sm select-none">XXXXXXXXXXXXXX</h3>
                        <Badge className="bg-amber-500 text-white border-none font-black text-[8px] h-5 px-2 flex items-center gap-1"><Lock className="h-2 w-2" /> LOCKED</Badge>
                      </div>
                    </div>
                    <Badge className="bg-emerald-500 text-white border-none font-black text-[10px] h-6 px-3 rounded-full">{deal.slots}</Badge>
                  </div>
                </div>
                
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-xl font-black group-hover:text-primary transition-colors leading-tight">{deal.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 pt-3">
                    {deal.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold bg-slate-50 text-slate-500 px-3 py-1 rounded-lg border border-slate-100">{tag}</span>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="px-8 pb-8 flex-1 space-y-6">
                  <div className="grid grid-cols-2 gap-6 pt-2">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Est. Budget</p>
                      <p className="text-lg font-black text-slate-900">{deal.budget}</p>
                    </div>
                    <div className="text-right sm:text-left space-y-1">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Deliverables</p>
                      <p className="text-sm font-bold text-slate-700 truncate">{deal.requirements}</p>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="px-8 pb-8 pt-0 mt-auto">
                  <Button className="w-full bg-slate-900 hover:bg-primary text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest h-16 shadow-2xl transition-all group-hover:scale-[1.02] gap-2">
                    Unlock Opportunity (10 Credits) <ArrowUpRight className="h-5 w-5" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar Info */}
        <aside className="lg:col-span-4 space-y-10">
          <Card className="rounded-[3rem] border-none shadow-sm bg-white p-10 space-y-10 sticky top-24 border border-slate-50">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner">
                  <Target className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-black">Brand Spotlight</h3>
              </div>
              <p className="text-sm text-slate-500 font-medium">Top-tier partners currently looking for creative collaborations.</p>
            </div>

            <div className="space-y-6">
              {[
                { name: "Al-Barakah Meats", type: "Food Sourcing", score: 99 },
                { name: "Islamic Expo 2024", type: "Event Organizer", score: 95 },
                { name: "Amanah Banking", type: "Financial", score: 92 },
              ].map((spot, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-3xl border border-transparent hover:border-blue-100 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center text-slate-300 font-black text-xs shadow-sm group-hover:scale-110 transition-transform">
                      {spot.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 blur-sm select-none">XXXXXXXXXXXX</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{spot.type}</p>
                    </div>
                  </div>
                  <Badge className="bg-white text-blue-600 font-black border-none text-[9px] h-6 px-2">{spot.score}% Trust</Badge>
                </div>
              ))}
            </div>

            <Card className="rounded-3xl border-none bg-slate-900 text-white p-10 space-y-6 relative overflow-hidden shadow-2xl">
              <Zap className="absolute top-0 right-0 p-4 h-24 w-24 opacity-10 text-primary" />
              <div className="relative z-10 space-y-4 text-center">
                <div className="h-16 w-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto border border-white/10 shadow-3xl">
                  <ShieldCheck className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-black tracking-tight">Verified Credibility</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium italic">
                    "Unlock fees are refunded if the brand does not review your proposal within 14 days. We ensure high-fidelity interactions."
                  </p>
                </div>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 h-12 rounded-xl font-black text-[10px] uppercase tracking-widest">Read Charter</Button>
              </div>
            </Card>
          </Card>
        </aside>
      </div>
    </div>
  );
}
