"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, MapPin, Star, Filter, ArrowLeft, 
  CircleDollarSign, ShieldCheck, TrendingUp, Info,
  ChevronRight, Globe, Lock, CheckCircle2,
  Zap, Sparkles, Map as MapIcon, ClipboardList,
  ArrowUpRight, SlidersHorizontal, BarChart3,
  Scale
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const FINANCE_TYPES = ["All Services", "Retail Banking", "Investment Firms", "Wealth Management", "Islamic Loans", "Takaful Insurance"];

const MOCK_FINANCE = [
  { 
    id: "fin1", 
    name: "Amanah Islamic Bank", 
    type: "Retail Banking", 
    focus: "Personal & Business", 
    rate: "99.8% Compliance", 
    ver: true, 
    img: "https://picsum.photos/seed/finance1/800/600",
    features: ["Shariah Audited", "Mudarabah Funds", "Zakat Tools"],
    rating: "AA+ Rated",
    avgReturn: "8.4% - 12.5%"
  },
  { 
    id: "fin2", 
    name: "Sunnah Wealth Mgt", 
    type: "Investment Firm", 
    focus: "Ethical Portfolio", 
    rate: "Verified Assets", 
    ver: true, 
    img: "https://picsum.photos/seed/finance2/800/600",
    features: ["Global Reach", "Halal Stocks Only", "Expert Advisors"],
    rating: "AAA Rated",
    avgReturn: "10.2% - 15.8%"
  },
  { 
    id: "fin3", 
    name: "Crescent Takaful", 
    type: "Islamic Insurance", 
    focus: "Family & Property", 
    rate: "Cooperative Model", 
    ver: true, 
    img: "https://picsum.photos/seed/finance3/800/600",
    features: ["Surplus Sharing", "No Interest", "Global Cover"],
    rating: "A Rated",
    avgReturn: "N/A"
  },
  { 
    id: "fin4", 
    name: "Ethic Equity Co.", 
    type: "Venture Capital", 
    focus: "SME Halal Startups", 
    rate: "Growth Focused", 
    ver: false, 
    img: "https://picsum.photos/seed/finance4/800/600",
    features: ["Equity Financing", "Hands-on Support", "Halal Hub Partner"],
    rating: "Unrated",
    avgReturn: "Variable"
  },
];

export default function FinanceListingPage() {
  const [selectedType, setSelectedType] = useState("All Services");

  return (
    <div className="container mx-auto p-6 space-y-10 max-w-7xl">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col gap-6">
        <Link href="/categories" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit">
          <ArrowLeft className="h-4 w-4" /> Back to Categories
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl flex items-center justify-center bg-indigo-100 text-indigo-600 shadow-inner">
                <CircleDollarSign className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h1 className="text-5xl font-black font-headline text-foreground tracking-tight">Finance & Banking</h1>
                <p className="text-muted-foreground font-medium text-xl">Shariah-compliant financial institutions and ethical investment services.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" className="h-14 rounded-2xl bg-card border-none shadow-sm gap-2 font-bold px-6 hover:bg-muted">
              <Scale className="h-5 w-5 text-indigo-600" /> Compliance Reports
            </Button>
            <div className="relative flex-1 md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search banks, investment funds, or advisors..." className="pl-12 h-14 rounded-2xl bg-card border-none shadow-sm font-medium text-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Quick Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Market Trust", value: "AA+ Average", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Avg. ROI", value: "9.2% Growth", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Global Reach", value: "12 Countries", icon: Globe, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((stat, i) => (
          <Card key={i} className="p-6 border-none shadow-sm bg-card flex items-center gap-6 rounded-[2rem]">
            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
              <stat.icon className="h-7 w-7" />
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-foreground">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Type Quick Selection */}
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
        {FINANCE_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap shadow-sm border-2 ${
              selectedType === type 
                ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/20 scale-105" 
                : "bg-card text-muted-foreground border-transparent hover:border-indigo-200"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Advanced Filters Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-md p-8 bg-card space-y-8 sticky top-24">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-sm uppercase tracking-widest text-muted-foreground">Filter Finance</h3>
                <Button variant="ghost" size="sm" className="text-[10px] font-black text-indigo-600 p-0 h-auto uppercase tracking-tighter">Reset</Button>
              </div>
              
              <div className="space-y-4">
                <p className="text-xs font-black uppercase text-foreground tracking-widest">Compliance Level</p>
                <div className="space-y-3">
                  {["Shariah Board Certified", "Fatwa Approved", "Ethical Only", "Community Audited"].map(f => (
                    <label key={f} className="flex items-center gap-3 cursor-pointer group">
                      <div className="h-5 w-5 border-2 rounded-lg border-border group-hover:border-indigo-600 transition-colors flex items-center justify-center">
                        <div className="h-2.5 w-2.5 rounded-sm bg-indigo-600 scale-0 group-hover:scale-100 transition-transform" />
                      </div>
                      <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground">{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-muted w-full" />

              <div className="space-y-4">
                <p className="text-xs font-black uppercase text-foreground tracking-widest">Risk Profile</p>
                <div className="grid grid-cols-2 gap-2">
                  {["Low", "Moderate", "High", "Growth"].map(p => (
                    <button key={p} className="py-2 rounded-xl bg-muted text-muted-foreground font-black text-xs hover:bg-indigo-50 hover:text-indigo-600 transition-colors border border-transparent hover:border-indigo-100">
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Card className="rounded-3xl border-none bg-indigo-900 text-white p-8 space-y-4 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 opacity-20">
                <Lock className="h-24 w-24" />
              </div>
              <h3 className="font-black text-lg leading-tight relative z-10">Shariah Audit Reports</h3>
              <p className="text-xs text-white/80 leading-relaxed relative z-10">
                Access annual transparency reports for every financial institution in our verified network.
              </p>
              <Button variant="secondary" className="w-full rounded-2xl font-black text-xs h-12 shadow-xl bg-card text-indigo-900 hover:bg-indigo-50">Download 2024 Audit</Button>
            </Card>
          </Card>
        </aside>

        {/* Listings Grid */}
        <div className="lg:col-span-9 space-y-8">
          <div className="flex items-center justify-between px-2">
            <p className="text-sm font-bold text-muted-foreground tracking-tight">Found <span className="text-foreground">{MOCK_FINANCE.length}</span> verified institutions</p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Sort by:</span>
              <select className="bg-transparent font-black text-xs uppercase tracking-tighter outline-none cursor-pointer text-foreground">
                <option>Most Trusted</option>
                <option>Highest Returns</option>
                <option>Newest Added</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MOCK_FINANCE.map((item) => (
              <Link key={item.id} href={`/entities/${item.id}`}>
                <Card className="group rounded-[3rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-2xl transition-all duration-700 flex flex-col h-full border-2 border-transparent hover:border-indigo-100/50">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <Badge className="bg-card/90 backdrop-blur-md text-indigo-600 font-black border-none shadow-xl px-4 py-1.5 rounded-full flex items-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5" /> {item.rating}
                      </Badge>
                    </div>
                    <div className="absolute bottom-6 left-6 flex gap-2">
                      {item.ver && (
                        <Badge className="bg-emerald-500 text-white font-black border-none shadow-xl px-5 py-2 rounded-full uppercase text-[10px] tracking-widest flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3" /> Shariah Verified
                        </Badge>
                      )}
                      <Badge className="bg-card text-indigo-600 font-black border-none shadow-xl px-5 py-2 rounded-full uppercase text-[10px] tracking-widest flex items-center gap-2">
                        <TrendingUp className="h-3 w-3" /> {item.avgReturn}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="p-8 pb-4">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600">{item.type} • {item.focus}</p>
                      <CardTitle className="text-3xl font-black group-hover:text-indigo-600 transition-colors leading-tight">{item.name}</CardTitle>
                      <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground mt-2">
                        <Globe className="h-4 w-4 text-indigo-600" /> Global Operations
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="px-8 pb-8 flex-1 space-y-6">
                    <div className="space-y-3">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Key Offerings</p>
                      <div className="flex flex-wrap gap-2">
                        {item.features.map(f => (
                          <span key={f} className="text-[10px] font-bold bg-muted text-muted-foreground px-3 py-1 rounded-lg border border-border">{f}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
                        <Zap className="h-4 w-4 text-amber-500" /> Fast Onboarding
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
                        <BarChart3 className="h-4 w-4 text-indigo-500" /> Audit Ready
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="px-8 pb-8 pt-0 mt-auto">
                    <Button className="w-full bg-zinc-900 hover:bg-indigo-600 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest h-16 shadow-2xl transition-all group-hover:scale-[1.02]">
                      View Products <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="flex flex-col items-center justify-center py-16 gap-6">
            <div className="flex items-center gap-2">
              <div className="h-1 w-12 bg-muted rounded-full" />
              <p className="text-sm font-black text-muted-foreground uppercase tracking-[0.2em]">End of Partner List</p>
              <div className="h-1 w-12 bg-muted rounded-full" />
            </div>
            <Button variant="outline" className="rounded-full px-16 font-black border-2 h-16 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all text-lg shadow-sm">Explore Institutional Markets</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
