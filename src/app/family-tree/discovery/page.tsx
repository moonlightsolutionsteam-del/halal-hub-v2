
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Sparkles, Search, Filter, Star, 
  MapPin, Clock, ArrowLeft, Plus,
  ShieldCheck, CheckCircle2, Eye, Info,
  ChevronRight, Heart, Share2, Compass
} from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

export default function FamilyDiscoveryPage() {
  const suggestedPlaces = [
    { id: "p1", name: "The Halal Grill & Bistro", type: "Restaurant", loc: "Brooklyn, NY", rate: 4.9, img: "food1", tag: "Highly Rated" },
    { id: "p2", name: "Heritage Islamic Arts Museum", type: "Cultural", loc: "Manhattan, NY", rate: 4.8, img: "art1", tag: "Education" },
    { id: "p3", name: "Garden of Paradise Park", type: "Outdoor", loc: "Queens, NY", rate: 4.7, img: "nature1", tag: "Nature" },
    { id: "p4", name: "Sunnah Fresh Organic Mart", type: "Grocery", loc: "Jersey City, NJ", rate: 4.5, img: "grocery1", tag: "Organic" },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-10 max-w-6xl pb-24">
      <div className="flex flex-col gap-6">
        <Link href="/family-tree" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-emerald-600 transition-colors w-fit">
          <ArrowLeft className="h-4 w-4" /> Back to Hub
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl flex items-center justify-center bg-amber-100 text-amber-600 shadow-inner">
                <Sparkles className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-2xl sm:text-5xl font-black font-headline text-foreground tracking-tight">Family Discovery</h1>
                <p className="text-muted-foreground font-medium text-xl">Handpicked family-friendly halal venues for your shared board.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search family spots..." className="pl-12 h-14 rounded-2xl bg-card border-none shadow-sm font-medium text-lg" />
            </div>
            <Button variant="outline" className="h-14 w-14 rounded-2xl bg-card border-none shadow-sm">
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
        {suggestedPlaces.map((place) => (
          <Card key={place.id} className="group rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-2xl transition-all duration-700 flex flex-col h-full border-2 border-transparent hover:border-emerald-100">
            <div className="relative aspect-square overflow-hidden">
              <Image src={`https://picsum.photos/seed/${place.img}/600/600`} alt={place.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <Badge className="bg-card/90 backdrop-blur-md text-emerald-600 font-black border-none shadow-xl px-3 py-1 rounded-full flex items-center gap-1.5 text-[10px]">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {place.rate}
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Button size="icon" className="h-10 w-10 rounded-xl bg-card/80 backdrop-blur-md text-foreground hover:bg-card border-none shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <CardHeader className="p-6 pb-4">
              <div className="space-y-1">
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none text-[9px] font-black uppercase tracking-tighter">{place.tag}</Badge>
                <h3 className="text-xl font-black text-foreground line-clamp-1 group-hover:text-emerald-600 transition-colors">{place.name}</h3>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5"><MapPin className="h-3 w-3 text-emerald-500" /> {place.loc}</p>
              </div>
            </CardHeader>
            <CardFooter className="px-6 pb-6 pt-0 mt-auto">
              <Button variant="outline" className="w-full rounded-xl font-black text-[10px] uppercase tracking-widest border-2 h-10 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all">
                Add to Hub Board
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Info Notice */}
      <div className="p-8 bg-zinc-900 text-white rounded-[3rem] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Compass className="h-32 w-32" />
        </div>
        <div className="relative z-10 space-y-2 text-center md:text-left">
          <h3 className="text-2xl font-black font-headline">Directory Insight</h3>
          <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-xl">
            Suggestions are synced from our global Halal directory. Saving a place to your Family Board allows all members to see location details and operating hours instantly.
          </p>
        </div>
        <div className="relative z-10 flex gap-4">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-14 px-10 font-black uppercase text-xs tracking-widest shadow-2xl">Browse All Guide</Button>
        </div>
      </div>
    </div>
  );
}
