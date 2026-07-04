
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, MapPin, Star, Filter, ArrowLeft, 
  Utensils, Clock, ChevronRight, Zap, 
  Users, Heart, Phone, Sparkles,
  SearchCode,
  Map as MapIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CUISINES = ["All Cuisines", "Turkish", "Arabic", "Indian", "Malay", "Western", "Chinese", "Mediterranean"];

const MOCK_RESTAURANTS = [
  { 
    id: "1", 
    name: "The Bosphorus Kitchen", 
    type: "Fine Dining", 
    cuisine: "Turkish", 
    loc: "Manhattan, NY", 
    rate: 4.8, 
    ver: true, 
    img: "https://picsum.photos/seed/food1/600/400",
    tags: ["Outdoor Seating", "Prayer Room"],
    price: "$$$"
  },
  { 
    id: "2", 
    name: "Al-Zaeem Shawarma", 
    type: "Casual", 
    cuisine: "Arabic", 
    loc: "Brooklyn, NY", 
    rate: 4.5, 
    ver: true, 
    img: "https://picsum.photos/seed/food2/600/400",
    tags: ["Kid Friendly", "Takeaway"],
    price: "$"
  },
  { 
    id: "3", 
    name: "Istanbul Bistro", 
    type: "Family Style", 
    cuisine: "Turkish", 
    loc: "Queens, NY", 
    rate: 4.9, 
    ver: true, 
    img: "https://picsum.photos/seed/food3/600/400",
    tags: ["Large Groups", "Parking"],
    price: "$$"
  },
  { 
    id: "4", 
    name: "Curry House Express", 
    type: "Quick Service", 
    cuisine: "Indian", 
    loc: "Jersey City, NJ", 
    rate: 4.2, 
    ver: false, 
    img: "https://picsum.photos/seed/food4/600/400",
    tags: ["Spicy", "Vegetarian Options"],
    price: "$"
  },
];

export default function FoodListingPage() {
  const [selectedCuisine, setSelectedCuisine] = useState("All Cuisines");

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
              <div className="h-9 w-9 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl flex items-center justify-center bg-orange-100 text-orange-600 shadow-inner">
                <Utensils className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl sm:text-5xl font-black font-headline text-foreground tracking-tight">Food & Dining</h1>
                <p className="text-muted-foreground font-medium text-xs sm:text-xl">Verified halal eateries, from hidden gems to Michelin stars.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" className="h-10 sm:h-14 rounded-xl sm:rounded-2xl bg-card border-none shadow-sm gap-2 font-bold px-4 sm:px-6 hover:bg-muted">
              <MapIcon className="h-5 w-5 text-primary" /> View on Map
            </Button>
            <div className="relative flex-1 md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search cuisines, dishes, or restaurant names..." className="pl-10 sm:pl-12 h-10 sm:h-14 rounded-xl sm:rounded-2xl bg-card border-none shadow-sm font-medium text-sm sm:text-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Cuisine Quick Selection */}
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
        {CUISINES.map((cuisine) => (
          <button
            key={cuisine}
            onClick={() => setSelectedCuisine(cuisine)}
            className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap shadow-sm border-2 ${
              selectedCuisine === cuisine 
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105" 
                : "bg-card text-muted-foreground border-transparent hover:border-orange-200"
            }`}
          >
            {cuisine}
          </button>
        ))}
      </div>

      {/* Feature Ribbon */}
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {["Digital Menu", "QR Ordering", "Table Booking", "Family Area", "Prayer Room", "No Alcohol"].map((f, i) => (
          <Badge key={i} className="px-5 py-2.5 rounded-xl border-2 whitespace-nowrap font-black uppercase text-[10px] tracking-widest bg-orange-50/50 border-orange-100/50 text-orange-600 hover:bg-orange-100 transition-colors cursor-pointer">
            <Zap className="h-3 w-3 mr-1.5 fill-current" /> {f}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Advanced Filters Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-md p-8 bg-card space-y-8 sticky top-24">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-sm uppercase tracking-widest text-muted-foreground">Refine Search</h3>
                <Button variant="ghost" size="sm" className="text-[10px] font-black text-primary p-0 h-auto uppercase tracking-tighter">Clear All</Button>
              </div>
              
              <div className="space-y-4">
                <p className="text-xs font-black uppercase text-foreground tracking-widest">Filter by status</p>
                <div className="space-y-3">
                  {["Verified Only", "Open Now", "Top Rated"].map(f => (
                    <label key={f} className="flex items-center gap-3 cursor-pointer group">
                      <div className="h-5 w-5 border-2 rounded-lg border-border group-hover:border-primary transition-colors flex items-center justify-center">
                        <div className="h-2.5 w-2.5 rounded-sm bg-primary scale-0 group-hover:scale-100 transition-transform" />
                      </div>
                      <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground">{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-muted w-full" />

              <div className="space-y-4">
                <p className="text-xs font-black uppercase text-foreground tracking-widest">Price Range</p>
                <div className="flex gap-2">
                  {["$", "$$", "$$$", "$$$$"].map(p => (
                    <button key={p} className="flex-1 py-2 rounded-xl bg-muted text-muted-foreground font-black text-xs hover:bg-orange-50 hover:text-orange-600 transition-colors border border-transparent hover:border-orange-100">
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Card className="rounded-3xl border-none bg-zinc-900 text-white p-8 space-y-4 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 opacity-10">
                <Sparkles className="h-24 w-24" />
              </div>
              <h3 className="font-black text-lg leading-tight relative z-10">AI Recommendations</h3>
              <p className="text-xs text-muted-foreground leading-relaxed relative z-10">
                Let our AI suggest the perfect dining spot based on your past favorites.
              </p>
              <Button variant="secondary" className="w-full rounded-2xl font-black text-xs h-12 shadow-xl">Get Suggestions</Button>
            </Card>
          </Card>
        </aside>

        {/* Listings Grid */}
        <div className="lg:col-span-9 space-y-8">
          <div className="flex items-center justify-between px-2">
            <p className="text-sm font-bold text-muted-foreground tracking-tight">Found <span className="text-foreground">{MOCK_RESTAURANTS.length}</span> restaurants in <span className="text-primary">{selectedCuisine}</span></p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Sort by:</span>
              <select className="bg-transparent font-black text-xs uppercase tracking-tighter outline-none cursor-pointer text-foreground">
                <option>Best Match</option>
                <option>Rating</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-8">
            {MOCK_RESTAURANTS.map((res) => (
              <Link key={res.id} href={`/entities/${res.id}`}>
                <Card className="group rounded-2xl sm:rounded-[3rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-2xl transition-all duration-700 flex flex-col h-full border-2 border-transparent hover:border-orange-100/50">
                  <div className="relative aspect-square sm:aspect-[16/9] overflow-hidden">
                    <Image src={res.img} alt={res.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-2 left-2 sm:top-6 sm:left-6 flex flex-col gap-2">
                      <div className="flex gap-2">
                        <Badge className="bg-card/90 backdrop-blur-md text-primary font-black border-none shadow-xl px-4 py-1.5 rounded-full flex items-center gap-1.5">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {res.rate}
                        </Badge>
                        <Badge className="bg-zinc-900/80 backdrop-blur-md text-white font-black border-none shadow-xl px-4 py-1.5 rounded-full">
                          {res.price}
                        </Badge>
                      </div>
                    </div>
                    {res.ver && (
                      <div className="absolute bottom-2 left-2 sm:bottom-6 sm:left-6">
                        <Badge className="bg-emerald-500 text-white font-black border-none shadow-xl px-2 py-1 sm:px-5 sm:py-2 rounded-full uppercase text-[10px] tracking-widest flex items-center gap-1 sm:gap-2">
                          <div className="h-2 w-2 bg-card rounded-full animate-pulse" /> Verified Halal
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardHeader className="p-3 pb-1 sm:p-8 sm:pb-4">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary">{res.cuisine} • {res.type}</p>
                      <CardTitle className="text-sm sm:text-3xl font-black group-hover:text-primary transition-colors leading-tight">{res.name}</CardTitle>
                      <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground mt-2">
                        <MapPin className="h-4 w-4 text-primary" /> {res.loc}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="px-3 pb-3 sm:px-8 sm:pb-8 flex-1 space-y-2 sm:space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {res.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold bg-muted text-muted-foreground px-3 py-1 rounded-lg">#{tag}</span>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 sm:gap-4 pt-3 sm:pt-6 border-t border-border">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
                        <Clock className="h-4 w-4 text-emerald-500" /> Open until 11pm
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
                        <Users className="h-4 w-4 text-blue-500" /> Great for Groups
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="px-3 pb-3 pt-0 sm:px-8 sm:pb-8 mt-auto">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl sm:rounded-[1.5rem] font-black text-[10px] sm:text-sm uppercase tracking-widest h-9 sm:h-16 shadow-lg sm:shadow-2xl shadow-primary/20 group-hover:scale-[1.02] transition-transform">
                      Book a Table <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
            <Button variant="outline" className="rounded-full px-8 sm:px-16 font-black border-2 h-10 sm:h-16 hover:bg-primary hover:text-white hover:border-primary transition-all text-sm sm:text-lg shadow-sm">Explore More Districts</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
