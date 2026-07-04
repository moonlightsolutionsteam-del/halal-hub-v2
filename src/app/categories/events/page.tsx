"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, MapPin, Star, Filter, ArrowLeft, 
  Sparkles, Calendar, Users, Info,
  ChevronRight, Camera, Music, Paintbrush,
  Zap, Map as MapIcon, ClipboardList, Building2,
  CheckCircle2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SERVICE_TYPES = ["All Services", "Venues", "Decor & Design", "Photography", "Audio/Visual", "Wedding Planning"];

const MOCK_EVENT_SERVICES = [
  { 
    id: "e1", 
    name: "The Grand Halal Ballroom", 
    type: "Premium Venue", 
    loc: "Manhattan, NY", 
    rate: 4.9, 
    ver: true, 
    img: "https://picsum.photos/seed/event1/800/600",
    features: ["Prayer Room", "Female-Only Staff", "Internal Catering"],
    capacity: "Up to 500 guests",
    startingPrice: "$2,500"
  },
  { 
    id: "e2", 
    name: "Modest Moments Photo", 
    type: "Photography & Cinema", 
    loc: "Brooklyn, NY", 
    rate: 4.8, 
    ver: true, 
    img: "https://picsum.photos/seed/event2/800/600",
    features: ["Female Photographer", "Privacy Guaranteed", "Same-day Edits"],
    capacity: "N/A",
    startingPrice: "$1,200"
  },
  { 
    id: "e3", 
    name: "Sunnah Decor Co.", 
    type: "Decor & Floral", 
    loc: "Queens, NY", 
    rate: 4.7, 
    ver: true, 
    img: "https://picsum.photos/seed/event3/800/600",
    features: ["Custom Arches", "Sustainable Materials", "Eco-friendly"],
    capacity: "All Sizes",
    startingPrice: "$800"
  },
  { 
    id: "e4", 
    name: "Echo Islamic A/V", 
    type: "Sound & Light", 
    loc: "Jersey City, NJ", 
    rate: 4.5, 
    ver: false, 
    img: "https://picsum.photos/seed/event4/800/600",
    features: ["Nasheed Support", "Live Streaming", "Privacy Screens"],
    capacity: "N/A",
    startingPrice: "$500"
  },
];

export default function EventServicesListingPage() {
  const [selectedService, setSelectedService] = useState("All Services");

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
              <div className="h-14 w-14 rounded-2xl flex items-center justify-center bg-purple-100 text-purple-600 shadow-inner">
                <Sparkles className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h1 className="text-5xl font-black font-headline text-foreground tracking-tight">Event Services</h1>
                <p className="text-muted-foreground font-medium text-xl">Design your perfect halal occasion with verified venues and planners.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" className="h-14 rounded-2xl bg-card border-none shadow-sm gap-2 font-bold px-6 hover:bg-muted">
              <ClipboardList className="h-5 w-5 text-purple-600" /> Event Checklist
            </Button>
            <div className="relative flex-1 md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search venues, photographers, or themes..." className="pl-12 h-14 rounded-2xl bg-card border-none shadow-sm font-medium text-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Service Quick Selection */}
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
        {SERVICE_TYPES.map((service) => (
          <button
            key={service}
            onClick={() => setSelectedService(service)}
            className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap shadow-sm border-2 ${
              selectedService === service 
                ? "bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-600/20 scale-105" 
                : "bg-card text-muted-foreground border-transparent hover:border-purple-200"
            }`}
          >
            {service}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Advanced Filters Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-md p-8 bg-card space-y-8 sticky top-24">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-sm uppercase tracking-widest text-muted-foreground">Refine Search</h3>
                <Button variant="ghost" size="sm" className="text-[10px] font-black text-purple-600 p-0 h-auto uppercase tracking-tighter">Reset</Button>
              </div>
              
              <div className="space-y-4">
                <p className="text-xs font-black uppercase text-foreground tracking-widest">Privacy Features</p>
                <div className="space-y-3">
                  {["Gender Segregated", "Private Entrance", "No Alcohol Policy", "Female Staff Only"].map(f => (
                    <label key={f} className="flex items-center gap-3 cursor-pointer group">
                      <div className="h-5 w-5 border-2 rounded-lg border-border group-hover:border-purple-600 transition-colors flex items-center justify-center">
                        <div className="h-2.5 w-2.5 rounded-sm bg-purple-600 scale-0 group-hover:scale-100 transition-transform" />
                      </div>
                      <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground">{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-muted w-full" />

              <div className="space-y-4">
                <p className="text-xs font-black uppercase text-foreground tracking-widest">Budget Range</p>
                <div className="grid grid-cols-2 gap-2">
                  {["Economy", "Standard", "Premium", "Bespoke"].map(p => (
                    <button key={p} className="py-2 rounded-xl bg-muted text-muted-foreground font-black text-xs hover:bg-purple-50 hover:text-purple-600 transition-colors border border-transparent hover:border-purple-100">
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Card className="rounded-3xl border-none bg-purple-900 text-white p-8 space-y-4 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 opacity-20">
                <Users className="h-24 w-24" />
              </div>
              <h3 className="font-black text-lg leading-tight relative z-10">Bespoke Planning</h3>
              <p className="text-xs text-white/80 leading-relaxed relative z-10">
                Need a full end-to-end Nikah or Wedding package? Our planning experts can help you bundle services for better rates.
              </p>
              <Button variant="secondary" className="w-full rounded-2xl font-black text-xs h-12 shadow-xl bg-card text-purple-900 hover:bg-purple-50">Free Consultation</Button>
            </Card>
          </Card>
        </aside>

        {/* Listings Grid */}
        <div className="lg:col-span-9 space-y-8">
          <div className="flex items-center justify-between px-2">
            <p className="text-sm font-bold text-muted-foreground tracking-tight">Found <span className="text-foreground">{MOCK_EVENT_SERVICES.length}</span> verified partners</p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Sort by:</span>
              <select className="bg-transparent font-black text-xs uppercase tracking-tighter outline-none cursor-pointer text-foreground">
                <option>Most Trusted</option>
                <option>Price: Low to High</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MOCK_EVENT_SERVICES.map((service) => (
              <Link key={service.id} href={`/entities/${service.id}`}>
                <Card className="group rounded-[3rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-2xl transition-all duration-700 flex flex-col h-full border-2 border-transparent hover:border-purple-100/50">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={service.img} alt={service.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <Badge className="bg-card/90 backdrop-blur-md text-purple-600 font-black border-none shadow-xl px-4 py-1.5 rounded-full flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 fill-purple-600 text-purple-600" /> {service.rate}
                      </Badge>
                    </div>
                    <div className="absolute bottom-6 left-6 flex gap-2">
                      {service.ver && (
                        <Badge className="bg-emerald-500 text-white font-black border-none shadow-xl px-5 py-2 rounded-full uppercase text-[10px] tracking-widest flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3" /> Trust Verified
                        </Badge>
                      )}
                      <Badge className="bg-card text-purple-600 font-black border-none shadow-xl px-5 py-2 rounded-full uppercase text-[10px] tracking-widest flex items-center gap-2">
                        <Zap className="h-3 w-3" /> From {service.startingPrice}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="p-8 pb-4">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-purple-600">{service.type}</p>
                      <CardTitle className="text-3xl font-black group-hover:text-purple-600 transition-colors leading-tight">{service.name}</CardTitle>
                      <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground mt-2">
                        <MapPin className="h-4 w-4 text-purple-600" /> {service.loc}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="px-8 pb-8 flex-1 space-y-6">
                    <div className="space-y-3">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Service Highlights</p>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map(f => (
                          <span key={f} className="text-[10px] font-bold bg-muted text-muted-foreground px-3 py-1 rounded-lg border border-border">{f}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
                        <Users className="h-4 w-4 text-blue-500" /> {service.capacity}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
                        <Calendar className="h-4 w-4 text-amber-500" /> Instant Quote
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="px-8 pb-8 pt-0 mt-auto">
                    <Button className="w-full bg-zinc-900 hover:bg-purple-600 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest h-16 shadow-2xl transition-all group-hover:scale-[1.02]">
                      View Packages <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
            <Button variant="outline" className="rounded-full px-16 font-black border-2 h-16 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all text-lg shadow-sm">Show National Partners</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
