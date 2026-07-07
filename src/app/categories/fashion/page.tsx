"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, MapPin, Star, Filter, ArrowLeft, 
  Shirt, ShoppingBag, Truck, Info,
  ChevronRight, Sparkles, Heart,
  Camera, Layers, Globe, Zap,
  CheckCircle2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const FASHION_CATEGORIES = ["All Styles", "Abayas & Kimonos", "Hijabs & Wraps", "Occasion Wear", "Modest Activewear", "Designer Brands"];

const MOCK_FASHION_BRANDS = [
  { 
    id: "f1", 
    name: "Modest Attire Co.", 
    type: "Premium Designer", 
    loc: "London, UK", 
    rate: 4.9, 
    ver: true, 
    img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop&auto=format&q=80",
    features: ["Global Shipping", "Sizing Guide", "Silk Fabrics"],
    startingPrice: "£120",
    shipping: "Worldwide"
  },
  { 
    id: "f2", 
    name: "Noor Collective", 
    type: "Boutique & Lifestyle", 
    loc: "Dubai, UAE", 
    rate: 4.8, 
    ver: true, 
    img: "https://images.unsplash.com/photo-1612307057748-b44842539a29?w=800&h=600&fit=crop&auto=format&q=80",
    features: ["Handmade", "Organic Cotton", "Custom Tailoring"],
    startingPrice: "₹85",
    shipping: "Express Available"
  },
  { 
    id: "f3", 
    name: "Urban Hijab Hub", 
    type: "Modern Streetwear", 
    loc: "New York, NY", 
    rate: 4.7, 
    ver: true, 
    img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop&auto=format&q=80",
    features: ["Next Day Delivery", "Ethical Labor", "Student Discount"],
    startingPrice: "₹45",
    shipping: "Domestic US"
  },
  { 
    id: "f4", 
    name: "Saffron Silk Boutique", 
    type: "Luxury Occasion", 
    loc: "Istanbul, TR", 
    rate: 4.5, 
    ver: false, 
    img: "https://images.unsplash.com/photo-1612307057748-b44842539a29?w=800&h=600&fit=crop&auto=format&q=80",
    features: ["Embroidery", "Gift Wrapping", "VIP Service"],
    startingPrice: "₹250",
    shipping: "International"
  },
];

export default function FashionListingPage() {
  const [selectedStyle, setSelectedStyle] = useState("All Styles");

  return (
    <div className="container mx-auto p-3 sm:p-6 space-y-4 sm:space-y-10 max-w-7xl">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col gap-3 sm:gap-6">
        <Link href="/categories" className="flex items-center gap-2 text-sm font-black text-muted-foreground hover:text-primary transition-colors w-fit">
          <ArrowLeft className="h-4 w-4" /> Back to Categories
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="h-9 w-9 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl flex items-center justify-center bg-pink-100 text-pink-600 shadow-inner">
                <Shirt className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl sm:text-5xl font-black font-headline text-foreground tracking-tight">Fashion & Modest Wear</h1>
                <p className="text-muted-foreground font-medium text-xs sm:text-xl">Discover premium modest fashion brands curated for elegance and values.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" className="h-10 sm:h-14 rounded-xl sm:rounded-2xl bg-card border-none shadow-sm gap-2 font-bold px-4 sm:px-6 hover:bg-muted">
              <Camera className="h-5 w-5 text-pink-600" /> View Lookbooks
            </Button>
            <div className="relative flex-1 md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search designers, styles, or labels..." className="pl-10 sm:pl-12 h-10 sm:h-14 rounded-xl sm:rounded-2xl bg-card border-none shadow-sm font-medium text-sm sm:text-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Style Quick Selection */}
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
        {FASHION_CATEGORIES.map((style) => (
          <button
            key={style}
            onClick={() => setSelectedStyle(style)}
            className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap shadow-sm border-2 ${
              selectedStyle === style 
                ? "bg-pink-600 text-white border-pink-600 shadow-lg shadow-pink-600/20 scale-105" 
                : "bg-card text-muted-foreground border-transparent hover:border-pink-200"
            }`}
          >
            {style}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Advanced Filters Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-md p-8 bg-card space-y-8 sticky top-24">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-sm uppercase tracking-widest text-muted-foreground">Refine Collection</h3>
                <Button variant="ghost" size="sm" className="text-[10px] font-black text-pink-600 p-0 h-auto uppercase tracking-tighter">Clear</Button>
              </div>
              
              <div className="space-y-4">
                <p className="text-xs font-black uppercase text-foreground tracking-widest">Modesty Features</p>
                <div className="space-y-3">
                  {["Full Length", "Opaque Fabrics", "Loose Fit Design", "Detachable Hijab"].map(f => (
                    <label key={f} className="flex items-center gap-3 cursor-pointer group">
                      <div className="h-5 w-5 border-2 rounded-lg border-border group-hover:border-pink-600 transition-colors flex items-center justify-center">
                        <div className="h-2.5 w-2.5 rounded-sm bg-pink-600 scale-0 group-hover:scale-100 transition-transform" />
                      </div>
                      <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground">{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-muted w-full" />

              <div className="space-y-4">
                <p className="text-xs font-black uppercase text-foreground tracking-widest">Shipping Origin</p>
                <div className="grid grid-cols-2 gap-2">
                  {["UK", "UAE", "USA", "Turkey", "Malaysia", "Other"].map(p => (
                    <button key={p} className="py-2 rounded-xl bg-muted text-muted-foreground font-black text-xs hover:bg-pink-50 hover:text-pink-600 transition-colors border border-transparent hover:border-pink-100">
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Card className="rounded-3xl border-none bg-pink-900 text-white p-8 space-y-4 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 opacity-20">
                <Sparkles className="h-24 w-24" />
              </div>
              <h3 className="font-black text-lg leading-tight relative z-10">Bespoke Fitting</h3>
              <p className="text-xs text-white/80 leading-relaxed relative z-10">
                Not sure about your size? Connect with our virtual modesty consultants for a custom fitting session.
              </p>
              <Button variant="secondary" className="w-full rounded-2xl font-black text-xs h-12 shadow-xl bg-card text-pink-900 hover:bg-pink-50">Book Session</Button>
            </Card>
          </Card>
        </aside>

        {/* Listings Grid */}
        <div className="lg:col-span-9 space-y-8">
          <div className="flex items-center justify-between px-2">
            <p className="text-sm font-bold text-muted-foreground tracking-tight">Found <span className="text-foreground">{MOCK_FASHION_BRANDS.length}</span> verified designers</p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Sort by:</span>
              <select className="bg-transparent font-black text-xs uppercase tracking-tighter outline-none cursor-pointer text-foreground">
                <option>Most Trending</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-8">
            {MOCK_FASHION_BRANDS.map((brand) => (
              <Link key={brand.id} href={`/entities/${brand.id}`}>
                <Card className="group rounded-2xl sm:rounded-[3rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-2xl transition-all duration-700 flex flex-col h-full border-2 border-transparent hover:border-pink-100/50">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image src={brand.img} alt={brand.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-2 left-2 sm:top-6 sm:left-6 flex flex-col gap-2">
                      <Badge className="bg-card/90 backdrop-blur-md text-pink-600 font-black border-none shadow-xl px-4 py-1.5 rounded-full flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 fill-pink-600 text-pink-600" /> {brand.rate}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 sm:bottom-6 sm:left-6 flex flex-col sm:flex-row items-start gap-1.5 sm:gap-2">
                      {brand.ver && (
                        <Badge className="bg-emerald-500 text-white font-black border-none shadow-xl px-2 py-1 sm:px-5 sm:py-2 rounded-full uppercase text-[10px] tracking-widest flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                          <CheckCircle2 className="h-3 w-3 shrink-0" /> Fully Vetted
                        </Badge>
                      )}
                      <Badge className="bg-card text-pink-600 font-black border-none shadow-xl px-2 py-1 sm:px-5 sm:py-2 rounded-full uppercase text-[10px] tracking-widest flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                        <Globe className="h-3 w-3 shrink-0" /> {brand.shipping}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="p-3 pb-1 sm:p-8 sm:pb-4">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-pink-600">{brand.type}</p>
                      <CardTitle className="text-sm sm:text-3xl font-black group-hover:text-pink-600 transition-colors leading-tight">{brand.name}</CardTitle>
                      <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground mt-2">
                        <MapPin className="h-4 w-4 text-pink-600" /> {brand.loc}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="px-3 pb-3 sm:px-8 sm:pb-8 flex-1 space-y-2 sm:space-y-6">
                    <div className="space-y-3">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Brand Highlights</p>
                      <div className="flex flex-wrap gap-2">
                        {brand.features.map(f => (
                          <span key={f} className="text-[10px] font-bold bg-muted text-muted-foreground px-3 py-1 rounded-lg border border-border">{f}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 sm:gap-4 pt-3 sm:pt-6 border-t border-border">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
                        <ShoppingBag className="h-4 w-4 text-pink-500" /> From {brand.startingPrice}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
                        <Zap className="h-4 w-4 text-amber-500" /> New Collection
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="px-3 pb-3 pt-0 sm:px-8 sm:pb-8 mt-auto">
                    <Button className="w-full bg-zinc-900 hover:bg-pink-600 text-white rounded-xl sm:rounded-[1.5rem] font-black text-[10px] sm:text-sm uppercase tracking-widest h-9 sm:h-16 shadow-lg sm:shadow-2xl transition-all group-hover:scale-[1.02]">
                      View Collections <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="flex flex-col items-center justify-center py-6 sm:py-16 gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <div className="h-1 w-12 bg-muted rounded-full" />
              <p className="text-sm font-black text-muted-foreground uppercase tracking-[0.2em]">End of Designer List</p>
              <div className="h-1 w-12 bg-muted rounded-full" />
            </div>
            <Button variant="outline" className="rounded-full px-8 sm:px-16 font-black border-2 h-10 sm:h-16 hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-all text-sm sm:text-lg shadow-sm">Discover Emerging Brands</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
