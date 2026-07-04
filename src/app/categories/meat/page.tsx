"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, MapPin, Star, Filter, ArrowLeft, 
  ShieldCheck, Truck, ShoppingBag, Info,
  ChevronRight, Beef, CheckCircle2,
  AlertCircle, Sparkles, Map as MapIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CERTIFICATIONS = ["All", "HMC Certified", "HFA Approved", "Organic", "Grass-fed", "Local Farm"];

const MOCK_BUTCHERS = [
  { 
    id: "1", 
    name: "Al-Barakah Premium Meats", 
    type: "Wholesale & Retail", 
    source: "HMC Certified", 
    loc: "Brooklyn, NY", 
    rate: 4.9, 
    ver: true, 
    img: "https://picsum.photos/seed/meat1/800/600",
    specialties: ["Wagyu Beef", "Dry-aged Lamb"],
    delivery: true,
    pickup: true
  },
  { 
    id: "2", 
    name: "The Organic Butcher Hub", 
    type: "Boutique Butcher", 
    source: "Grass-fed Organic", 
    loc: "Manhattan, NY", 
    rate: 4.7, 
    ver: true, 
    img: "https://picsum.photos/seed/meat2/800/600",
    specialties: ["Corn-fed Poultry", "Organic Steaks"],
    delivery: true,
    pickup: true
  },
  { 
    id: "3", 
    name: "Heritage Halal Poultry", 
    type: "Specialist Poultry", 
    source: "Free Range", 
    loc: "Queens, NY", 
    rate: 4.8, 
    ver: true, 
    img: "https://picsum.photos/seed/meat3/800/600",
    specialties: ["Whole Chicken", "Marinated Wings"],
    delivery: false,
    pickup: true
  },
  { 
    id: "4", 
    name: "City Halal Wholesale", 
    type: "Bulk Supplier", 
    source: "HFA Approved", 
    loc: "Jersey City, NJ", 
    rate: 4.5, 
    ver: false, 
    img: "https://picsum.photos/seed/meat4/800/600",
    specialties: ["Bulk Mutton", "Catering Packs"],
    delivery: true,
    pickup: true
  },
];

export default function MeatListingPage() {
  const [selectedCert, setSelectedCert] = useState("All");

  return (
    <div className="container mx-auto p-3 sm:p-6 space-y-4 sm:space-y-10 max-w-7xl">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col gap-3 sm:gap-6">
        <Link href="/categories" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit">
          <ArrowLeft className="h-4 w-4" /> Back to Categories
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="h-9 w-9 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl flex items-center justify-center bg-red-100 text-red-600 shadow-inner">
                <Beef className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl sm:text-5xl font-black font-headline text-foreground tracking-tight">Meat & Butchers</h1>
                <p className="text-muted-foreground font-medium text-xs sm:text-xl">Premium, traceable, and strictly certified halal sources.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" className="h-10 sm:h-14 rounded-xl sm:rounded-2xl bg-card border-none shadow-sm gap-2 font-bold px-4 sm:px-6 hover:bg-muted">
              <ShieldCheck className="h-5 w-5 text-red-600" /> Audit Reports
            </Button>
            <div className="relative flex-1 md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search beef, lamb, poultry, or shop names..." className="pl-10 sm:pl-12 h-10 sm:h-14 rounded-xl sm:rounded-2xl bg-card border-none shadow-sm font-medium text-sm sm:text-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Certification Quick Selection */}
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
        {CERTIFICATIONS.map((cert) => (
          <button
            key={cert}
            onClick={() => setSelectedCert(cert)}
            className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap shadow-sm border-2 ${
              selectedCert === cert 
                ? "bg-red-600 text-white border-red-600 shadow-lg shadow-red-600/20 scale-105" 
                : "bg-card text-muted-foreground border-transparent hover:border-red-200"
            }`}
          >
            {cert}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Advanced Filters & Traceability Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-md p-8 bg-card space-y-8 sticky top-24">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-sm uppercase tracking-widest text-muted-foreground">Refine Search</h3>
                <Button variant="ghost" size="sm" className="text-[10px] font-black text-red-600 p-0 h-auto uppercase tracking-tighter">Clear All</Button>
              </div>
              
              <div className="space-y-4">
                <p className="text-xs font-black uppercase text-foreground tracking-widest">Sourcing Policy</p>
                <div className="space-y-3">
                  {["Traceability Verified", "Antibiotic Free", "Local Farm Only"].map(f => (
                    <label key={f} className="flex items-center gap-3 cursor-pointer group">
                      <div className="h-5 w-5 border-2 rounded-lg border-border group-hover:border-red-600 transition-colors flex items-center justify-center">
                        <div className="h-2.5 w-2.5 rounded-sm bg-red-600 scale-0 group-hover:scale-100 transition-transform" />
                      </div>
                      <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground">{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-muted w-full" />

              <div className="space-y-4">
                <p className="text-xs font-black uppercase text-foreground tracking-widest">Service Type</p>
                <div className="flex flex-col gap-2">
                  <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-muted text-muted-foreground font-bold text-sm hover:bg-red-50 hover:text-red-600 transition-colors">
                    <Truck className="h-4 w-4" /> Home Delivery
                  </button>
                  <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-muted text-muted-foreground font-bold text-sm hover:bg-red-50 hover:text-red-600 transition-colors">
                    <ShoppingBag className="h-4 w-4" /> In-store Pickup
                  </button>
                </div>
              </div>
            </div>

            <Card className="rounded-3xl border-none bg-red-600 text-white p-8 space-y-4 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 opacity-20">
                <ShieldCheck className="h-24 w-24" />
              </div>
              <h3 className="font-black text-lg leading-tight relative z-10">Traceability Guarantee</h3>
              <p className="text-xs text-white/80 leading-relaxed relative z-10">
                Every butcher in our directory must provide digital logs of their supply chain for platform verification.
              </p>
              <Button variant="secondary" className="w-full rounded-2xl font-black text-xs h-12 shadow-xl bg-card text-red-600 hover:bg-red-50">View Audit Process</Button>
            </Card>
          </Card>
        </aside>

        {/* Listings Grid */}
        <div className="lg:col-span-9 space-y-8">
          <div className="flex items-center justify-between px-2">
            <p className="text-sm font-bold text-muted-foreground tracking-tight">Found <span className="text-foreground">{MOCK_BUTCHERS.length}</span> premium butchers</p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Sort by:</span>
              <select className="bg-transparent font-black text-xs uppercase tracking-tighter outline-none cursor-pointer text-foreground">
                <option>Distance</option>
                <option>Rating</option>
                <option>Trust Score</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-8">
            {MOCK_BUTCHERS.map((shop) => (
              <Link key={shop.id} href={`/entities/${shop.id}`}>
                <Card className="group rounded-2xl sm:rounded-[3rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-2xl transition-all duration-700 flex flex-col h-full border-2 border-transparent hover:border-red-100/50">
                  <div className="relative aspect-square sm:aspect-[16/9] overflow-hidden">
                    <Image src={shop.img} alt={shop.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-2 left-2 sm:top-6 sm:left-6 flex flex-col gap-2">
                      <Badge className="bg-card/90 backdrop-blur-md text-red-600 font-black border-none shadow-xl px-4 py-1.5 rounded-full flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 fill-red-600 text-red-600" /> {shop.rate}
                      </Badge>
                    </div>
                    {shop.ver && (
                      <div className="absolute bottom-2 left-2 sm:bottom-6 sm:left-6">
                        <Badge className="bg-red-600 text-white font-black border-none shadow-xl px-2 py-1 sm:px-5 sm:py-2 rounded-full uppercase text-[10px] tracking-widest flex items-center gap-1 sm:gap-2">
                          <ShieldCheck className="h-3 w-3 animate-pulse" /> Source Verified
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardHeader className="p-3 pb-1 sm:p-8 sm:pb-4">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-red-600">{shop.source} • {shop.type}</p>
                      <CardTitle className="text-sm sm:text-3xl font-black group-hover:text-red-600 transition-colors leading-tight">{shop.name}</CardTitle>
                      <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground mt-2">
                        <MapPin className="h-4 w-4 text-red-600" /> {shop.loc}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="px-3 pb-3 sm:px-8 sm:pb-8 flex-1 space-y-2 sm:space-y-6">
                    <div className="space-y-3">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">House Specialties</p>
                      <div className="flex flex-wrap gap-2">
                        {shop.specialties.map(tag => (
                          <span key={tag} className="text-[10px] font-bold bg-muted text-muted-foreground px-3 py-1 rounded-lg border border-border">#{tag}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 sm:gap-4 pt-3 sm:pt-6 border-t border-border">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
                        <Truck className={`h-4 w-4 ${shop.delivery ? 'text-emerald-500' : 'text-muted-foreground'}`} /> {shop.delivery ? 'Delivery' : 'No Delivery'}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
                        <ShoppingBag className={`h-4 w-4 ${shop.pickup ? 'text-blue-500' : 'text-muted-foreground'}`} /> {shop.pickup ? 'Pickup' : 'No Pickup'}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="px-3 pb-3 pt-0 sm:px-8 sm:pb-8 mt-auto">
                    <Button className="w-full bg-zinc-900 hover:bg-red-600 text-white rounded-xl sm:rounded-[1.5rem] font-black text-[10px] sm:text-sm uppercase tracking-widest h-9 sm:h-16 shadow-lg sm:shadow-2xl transition-all group-hover:scale-[1.02]">
                      View Price List <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="flex flex-col items-center justify-center py-6 sm:py-16 gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <div className="h-1 w-12 bg-muted rounded-full" />
              <p className="text-sm font-black text-muted-foreground uppercase tracking-[0.2em]">End of Listings</p>
              <div className="h-1 w-12 bg-muted rounded-full" />
            </div>
            <Button variant="outline" className="rounded-full px-8 sm:px-16 font-black border-2 h-10 sm:h-16 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all text-sm sm:text-lg shadow-sm">Discover Local Farms</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
