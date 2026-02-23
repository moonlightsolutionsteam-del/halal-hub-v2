"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, MapPin, Star, Filter, ArrowLeft, 
  CookingPot, Users, Calendar, Info,
  ChevronRight, Utensils, CheckCircle2,
  Zap, Sparkles, Map as MapIcon, ClipboardList
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const EVENT_TYPES = ["All Events", "Weddings", "Corporate", "Religious", "Private Parties", "Hajj & Umrah Groups"];

const MOCK_CATERERS = [
  { 
    id: "c1", 
    name: "Elite Halal Catering", 
    type: "Full-Service Events", 
    loc: "Manhattan, NY", 
    rate: 4.9, 
    ver: true, 
    img: "https://picsum.photos/seed/catering1/800/600",
    features: ["Live Stations", "Uniformed Staff", "Cutlery Rental"],
    capacity: "50 - 1000 guests",
    minNotice: "14 Days"
  },
  { 
    id: "c2", 
    name: "Sunnah Sun-Sets", 
    type: "Boutique & Private", 
    loc: "Brooklyn, NY", 
    rate: 4.8, 
    ver: true, 
    img: "https://picsum.photos/seed/catering2/800/600",
    features: ["Organic Ingredients", "Custom Menus", "Small Gatherings"],
    capacity: "10 - 100 guests",
    minNotice: "7 Days"
  },
  { 
    id: "c3", 
    name: "Grand Dastarkhwan", 
    type: "Traditional & Bulk", 
    loc: "Queens, NY", 
    rate: 4.7, 
    ver: true, 
    img: "https://picsum.photos/seed/catering3/800/600",
    features: ["Deg Cooking", "Home Delivery", "Budget Friendly"],
    capacity: "100 - 5000 guests",
    minNotice: "21 Days"
  },
  { 
    id: "c4", 
    name: "Modern Mezze Co.", 
    type: "Corporate & Finger Food", 
    loc: "Jersey City, NJ", 
    rate: 4.5, 
    ver: false, 
    img: "https://picsum.photos/seed/catering4/800/600",
    features: ["Boxed Lunches", "VIP Service", "Quick Turnaround"],
    capacity: "20 - 500 guests",
    minNotice: "3 Days"
  },
];

export default function CateringListingPage() {
  const [selectedEvent, setSelectedEvent] = useState("All Events");

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
              <div className="h-14 w-14 rounded-2xl flex items-center justify-center bg-blue-100 text-blue-600 shadow-inner">
                <CookingPot className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h1 className="text-5xl font-black font-headline text-slate-900 tracking-tight">Catering Services</h1>
                <p className="text-muted-foreground font-medium text-xl">Professional halal catering for every occasion, from intimate Nikahs to grand expos.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" className="h-14 rounded-2xl bg-white border-none shadow-sm gap-2 font-bold px-6 hover:bg-slate-50">
              <ClipboardList className="h-5 w-5 text-blue-600" /> Request Quote
            </Button>
            <div className="relative flex-1 md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search event types, menu styles, or caterers..." className="pl-12 h-14 rounded-2xl bg-white border-none shadow-sm font-medium text-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Event Type Quick Selection */}
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
        {EVENT_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedEvent(type)}
            className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap shadow-sm border-2 ${
              selectedEvent === type 
                ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20 scale-105" 
                : "bg-white text-slate-600 border-transparent hover:border-blue-200"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Advanced Filters Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-md p-8 bg-white space-y-8 sticky top-24">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-sm uppercase tracking-widest text-slate-400">Filter Catering</h3>
                <Button variant="ghost" size="sm" className="text-[10px] font-black text-blue-600 p-0 h-auto uppercase tracking-tighter">Clear All</Button>
              </div>
              
              <div className="space-y-4">
                <p className="text-xs font-black uppercase text-slate-900 tracking-widest">Service Level</p>
                <div className="space-y-3">
                  {["Full Service", "Buffet Style", "Drop-off Only", "Live Cooking"].map(f => (
                    <label key={f} className="flex items-center gap-3 cursor-pointer group">
                      <div className="h-5 w-5 border-2 rounded-lg border-slate-200 group-hover:border-blue-600 transition-colors flex items-center justify-center">
                        <div className="h-2.5 w-2.5 rounded-sm bg-blue-600 scale-0 group-hover:scale-100 transition-transform" />
                      </div>
                      <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-slate-100 w-full" />

              <div className="space-y-4">
                <p className="text-xs font-black uppercase text-slate-900 tracking-widest">Guest Count</p>
                <div className="grid grid-cols-2 gap-2">
                  {["< 50", "50-200", "200-500", "500+"].map(p => (
                    <button key={p} className="py-2 rounded-xl bg-slate-50 text-slate-400 font-black text-xs hover:bg-blue-50 hover:text-blue-600 transition-colors border border-transparent hover:border-blue-100">
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Card className="rounded-3xl border-none bg-blue-900 text-white p-8 space-y-4 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 opacity-20">
                <Sparkles className="h-24 w-24" />
              </div>
              <h3 className="font-black text-lg leading-tight relative z-10">Event Concierge</h3>
              <p className="text-xs text-white/80 leading-relaxed relative z-10">
                Planning a large wedding or corporate gala? Let our experts handle the halal verification for you.
              </p>
              <Button variant="secondary" className="w-full rounded-2xl font-black text-xs h-12 shadow-xl bg-white text-blue-900 hover:bg-blue-50">Free Consultation</Button>
            </Card>
          </Card>
        </aside>

        {/* Listings Grid */}
        <div className="lg:col-span-9 space-y-8">
          <div className="flex items-center justify-between px-2">
            <p className="text-sm font-bold text-muted-foreground tracking-tight">Found <span className="text-slate-900">{MOCK_CATERERS.length}</span> certified caterers</p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sort by:</span>
              <select className="bg-transparent font-black text-xs uppercase tracking-tighter outline-none cursor-pointer text-slate-900">
                <option>Guest Rating</option>
                <option>Capacity</option>
                <option>Response Time</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MOCK_CATERERS.map((caterer) => (
              <Link key={caterer.id} href={`/entities/${caterer.id}`}>
                <Card className="group rounded-[3rem] border-none shadow-sm overflow-hidden bg-white hover:shadow-2xl transition-all duration-700 flex flex-col h-full border-2 border-transparent hover:border-blue-100/50">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={caterer.img} alt={caterer.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <Badge className="bg-white/90 backdrop-blur-md text-blue-600 font-black border-none shadow-xl px-4 py-1.5 rounded-full flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 fill-blue-600 text-blue-600" /> {caterer.rate}
                      </Badge>
                    </div>
                    <div className="absolute bottom-6 left-6 flex gap-2">
                      {caterer.ver && (
                        <Badge className="bg-emerald-500 text-white font-black border-none shadow-xl px-5 py-2 rounded-full uppercase text-[10px] tracking-widest flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3" /> Event Verified
                        </Badge>
                      )}
                      <Badge className="bg-white text-blue-600 font-black border-none shadow-xl px-5 py-2 rounded-full uppercase text-[10px] tracking-widest flex items-center gap-2">
                        <Users className="h-3 w-3" /> {caterer.capacity}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="p-8 pb-4">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">{caterer.type}</p>
                      <CardTitle className="text-3xl font-black group-hover:text-blue-600 transition-colors leading-tight">{caterer.name}</CardTitle>
                      <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground mt-2">
                        <MapPin className="h-4 w-4 text-blue-600" /> {caterer.loc}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="px-8 pb-8 flex-1 space-y-6">
                    <div className="space-y-3">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Premium Offerings</p>
                      <div className="flex flex-wrap gap-2">
                        {caterer.features.map(f => (
                          <span key={f} className="text-[10px] font-bold bg-slate-50 text-slate-500 px-3 py-1 rounded-lg border border-slate-100">{f}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400">
                        <Calendar className="h-4 w-4 text-blue-500" /> Min Notice: {caterer.minNotice}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400">
                        <Zap className="h-4 w-4 text-amber-500" /> Fast Response
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="px-8 pb-8 pt-0 mt-auto">
                    <Button className="w-full bg-slate-900 hover:bg-blue-600 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest h-16 shadow-2xl transition-all group-hover:scale-[1.02]">
                      Request Proposal <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="flex flex-col items-center justify-center py-16 gap-6">
            <div className="flex items-center gap-2">
              <div className="h-1 w-12 bg-slate-200 rounded-full" />
              <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">End of Caterer List</p>
              <div className="h-1 w-12 bg-slate-200 rounded-full" />
            </div>
            <Button variant="outline" className="rounded-full px-16 font-black border-2 h-16 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all text-lg shadow-sm">Show National Partners</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
