
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, MapPin, Star, Filter, ArrowLeft, 
  Utensils, Clock, ChevronRight, Zap, 
  Users, Heart, Phone
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MOCK_RESTAURANTS = [
  { id: "1", name: "The Bosphorus Kitchen", type: "Fine Dining", cuisine: "Turkish", loc: "Manhattan, NY", rate: 4.8, ver: true, img: "https://picsum.photos/seed/food1/600/400" },
  { id: "2", name: "Al-Zaeem Shawarma", type: "Casual", cuisine: "Arabic", loc: "Brooklyn, NY", rate: 4.5, ver: true, img: "https://picsum.photos/seed/food2/600/400" },
  { id: "3", name: "Istanbul Bistro", type: "Family Style", cuisine: "Turkish", loc: "Queens, NY", rate: 4.9, ver: true, img: "https://picsum.photos/seed/food3/600/400" },
];

export default function FoodListingPage() {
  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl">
      <div className="flex flex-col gap-6">
        <Link href="/categories" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit">
          <ArrowLeft className="h-4 w-4" /> Back to Categories
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl flex items-center justify-center bg-orange-100 text-orange-600">
                <Utensils className="h-6 w-6" />
              </div>
              <h1 className="text-4xl font-black font-headline text-slate-900 tracking-tight">Food & Dining</h1>
            </div>
            <p className="text-muted-foreground font-medium text-lg">Verified halal eateries, from casual street food to fine dining.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search cuisines, dishes..." className="pl-9 h-12 rounded-2xl bg-white border-none shadow-sm font-medium" />
            </div>
            <Button variant="outline" className="h-12 w-12 rounded-2xl bg-white border-none shadow-sm">
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {["Digital Menu", "QR Ordering", "Table Booking", "Family Area", "Prayer Room"].map((f, i) => (
          <Badge key={i} className="px-4 py-2 rounded-xl border-2 whitespace-nowrap font-black uppercase text-[10px] tracking-widest bg-orange-50 border-orange-100 text-orange-600">
            {f}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="hidden lg:block space-y-6">
          <Card className="rounded-[2rem] border-none shadow-sm p-6 bg-white space-y-6">
            <div className="space-y-4">
              <h3 className="font-black text-sm uppercase tracking-widest text-slate-400">Cuisine</h3>
              <div className="space-y-2">
                {["Turkish", "Arabic", "Indian", "Malay", "Western"].map(c => (
                  <button key={c} className="flex items-center justify-between w-full p-2 hover:bg-muted/50 rounded-xl transition-colors text-sm font-bold text-slate-600">
                    <span>{c}</span>
                    <span className="text-[10px] opacity-40">12</span>
                  </button>
                ))}
              </div>
            </div>
          </Card>
          
          <Card className="rounded-[2.5rem] border-none bg-primary text-white p-8 space-y-4">
            <Zap className="h-10 w-10 text-accent" />
            <h3 className="font-black text-lg">Instant Booking</h3>
            <p className="text-xs text-white/80 leading-relaxed">
              Reserve your table at any verified restaurant instantly through Halal Hub.
            </p>
            <Button variant="secondary" className="w-full rounded-xl font-black text-xs">Learn More</Button>
          </Card>
        </aside>

        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_RESTAURANTS.map((res) => (
              <Link key={res.id} href={`/entities/${res.id}`}>
                <Card className="group rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white hover:shadow-xl transition-all duration-500 flex flex-col h-full">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={res.img} alt={res.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-white/90 backdrop-blur-md text-primary font-black border-none shadow-lg px-3">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400 mr-1" /> {res.rate}
                      </Badge>
                    </div>
                    {res.ver && (
                      <div className="absolute bottom-4 left-4">
                        <Badge className="bg-emerald-500 text-white font-black border-none shadow-lg px-3">Verified Halal</Badge>
                      </div>
                    )}
                  </div>
                  <CardHeader className="p-6">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary">{res.cuisine} • {res.type}</p>
                    </div>
                    <CardTitle className="text-2xl font-black group-hover:text-primary transition-colors leading-tight">{res.name}</CardTitle>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground mt-2">
                      <MapPin className="h-3.5 w-3.5" /> {res.loc}
                    </div>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 pt-0 space-y-4">
                    <div className="flex gap-4 pt-4 border-t">
                      <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-400">
                        <Clock className="h-3.5 w-3.5" /> Open until 11pm
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-400">
                        <Users className="h-3.5 w-3.5" /> Groups OK
                      </div>
                    </div>
                    <Button className="w-full bg-primary rounded-2xl font-black text-xs uppercase tracking-widest h-12">
                      Book a Table <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
