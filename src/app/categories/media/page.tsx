
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, MapPin, Star, Filter, ArrowLeft, 
  BookOpen, Library, Download, Info,
  ChevronRight, Laptop, Newspaper, 
  CheckCircle2, Globe, Headphones, Mic,
  Zap
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCategoryBusinesses } from "@/hooks/use-category-businesses";
import { useFilteredItems } from "@/hooks/use-filtered-items";

const MEDIA_TYPES = ["All Media", "Classical Texts", "Digital Courses", "Audiobooks", "Podcasts", "Children's Books"];

const FALLBACK = [
  { 
    id: "med1", 
    name: "Noor Islamic Media", 
    type: "Publisher & Bookstore", 
    loc: "London, UK", 
    rate: 4.9, 
    ver: true, 
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop&auto=format&q=80",
    features: ["Classic Editions", "Author Signings", "Digital App"],
    startingPrice: "£12.00",
    specialty: "Authentic Literature"
  },
  { 
    id: "med2", 
    name: "Crescent Digital Hub", 
    type: "Digital Learning Platform", 
    loc: "Dubai, UAE", 
    rate: 4.8, 
    ver: true, 
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop&auto=format&q=80",
    features: ["Interactive Courses", "Scholarly Oversight", "LMS Access"],
    startingPrice: "₹25.00",
    specialty: "Online Education"
  },
  { 
    id: "med3", 
    name: "Heritage Records", 
    type: "Audio & Podcast Studio", 
    loc: "Istanbul, TR", 
    rate: 4.7, 
    ver: true, 
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop&auto=format&q=80",
    features: ["High-Fidelity Audio", "Exclusive Podcasts", "Subscription Model"],
    startingPrice: "₹9.99/mo",
    specialty: "Audio Content"
  },
  { 
    id: "med4", 
    name: "Sunnah Kids Press", 
    type: "Boutique Publisher", 
    loc: "Mumbai, India", 
    rate: 4.5, 
    ver: false, 
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop&auto=format&q=80",
    features: ["Illustrated Sets", "Ethical Themes", "Workshops"],
    startingPrice: "₹15.00",
    specialty: "Children's Media"
  },
];

export default function MediaListingPage() {
  const [selectedType, setSelectedType] = useState("All Media");
  const [search, setSearch] = useState("")
  const items = useCategoryBusinesses("Media & Publishing", FALLBACK, (b) => ({
    id: b.id, name: b.name, type: b.subcategory, loc: b.city,
    rate: b.rating, ver: b.halal_verified, img: b.image_url, features: b.features,
    startingPrice: b.price_range ?? "Contact", specialty: b.subcategory,
  }))
  const filtered = useFilteredItems(items, search, selectedType, "All Media")

  return (
    <div className="container mx-auto p-3 sm:p-6 space-y-4 sm:space-y-10 max-w-7xl">
      <div className="flex flex-col gap-3 sm:gap-6">
        <Link href="/categories" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit">
          <ArrowLeft className="h-4 w-4" /> Back to Categories
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="h-9 w-9 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl flex items-center justify-center bg-muted text-muted-foreground shadow-inner">
                <BookOpen className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl sm:text-5xl font-black font-headline text-foreground tracking-tight">Bookstores & Media</h1>
                <p className="text-muted-foreground font-medium text-xs sm:text-xl">Verified authentic Islamic literature and ethical digital media platforms.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" className="h-10 sm:h-14 rounded-xl sm:rounded-2xl bg-card border-none shadow-sm gap-2 font-bold px-4 sm:px-6 hover:bg-muted">
              <Library className="h-5 w-5 text-muted-foreground" /> Catalog Index
            </Button>
            <div className="relative flex-1 md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search books, courses, authors, or studios..." className="pl-10 sm:pl-12 h-10 sm:h-14 rounded-xl sm:rounded-2xl bg-card border-none shadow-sm font-medium text-sm sm:text-lg" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
        {MEDIA_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap shadow-sm border-2 ${
              selectedType === type 
                ? "bg-muted-foreground text-white border-border shadow-lg shadow-slate-600/20 scale-105" 
                : "bg-card text-muted-foreground border-transparent hover:border-border"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside className="hidden lg:block lg:col-span-3 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-md p-8 bg-card space-y-8 sticky top-24">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-sm uppercase tracking-widest text-muted-foreground">Refine Search</h3>
                <Button variant="ghost" size="sm" className="text-[10px] font-black text-muted-foreground p-0 h-auto uppercase tracking-tighter">Reset</Button>
              </div>
              
              <div className="space-y-4">
                <p className="text-xs font-black uppercase text-foreground tracking-widest">Content Standards</p>
                <div className="space-y-3">
                  {["Scholar Vetted", "Classic Sources", "Family Friendly", "Zero Ad-Support"].map(f => (
                    <label key={f} className="flex items-center gap-3 cursor-pointer group">
                      <div className="h-5 w-5 border-2 rounded-lg border-border group-hover:border-border transition-colors flex items-center justify-center">
                        <div className="h-2.5 w-2.5 rounded-sm bg-muted-foreground scale-0 group-hover:scale-100 transition-transform" />
                      </div>
                      <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground">{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-muted w-full" />

              <div className="space-y-4">
                <p className="text-xs font-black uppercase text-foreground tracking-widest">Format</p>
                <div className="grid grid-cols-2 gap-2">
                  {["Hardcover", "Paperback", "Digital", "Audio"].map(p => (
                    <button key={p} className="py-2 rounded-xl bg-muted text-muted-foreground font-black text-xs hover:bg-muted hover:text-muted-foreground transition-colors border border-transparent hover:border-border">
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Card className="rounded-3xl border-none bg-zinc-900 text-white p-8 space-y-4 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 opacity-20">
                <Laptop className="h-24 w-24" />
              </div>
              <h3 className="font-black text-lg leading-tight relative z-10">Digital Library Access</h3>
              <p className="text-xs text-white/80 leading-relaxed relative z-10">
                Unlock 500+ classical texts and audiobooks with our premium partner pass.
              </p>
              <Button variant="secondary" className="w-full rounded-2xl font-black text-xs h-12 shadow-xl bg-card text-foreground hover:bg-muted">View Plans</Button>
            </Card>
          </Card>
        </aside>

        <div className="lg:col-span-9 space-y-8">
          <div className="flex items-center justify-between px-2">
            <p className="text-sm font-bold text-muted-foreground tracking-tight">Found <span className="text-foreground">{filtered.length}</span> verified sources</p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Sort by:</span>
              <select className="bg-transparent font-black text-xs uppercase tracking-tighter outline-none cursor-pointer text-foreground">
                <option>Most Recommended</option>
                <option>Newest Titles</option>
                <option>Content Quality</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-8">
            {filtered.map((item) => (
              <Link key={item.id} href={`/entities/${item.id}`}>
                <Card className="group rounded-2xl sm:rounded-[3rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-2xl transition-all duration-700 flex flex-col h-full border-2 border-transparent hover:border-border/50">
                  <div className="relative aspect-square sm:aspect-[16/9] overflow-hidden">
                    <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-2 left-2 sm:top-6 sm:left-6 flex flex-col gap-2">
                      <Badge className="bg-card/90 backdrop-blur-md text-muted-foreground font-black border-none shadow-xl px-4 py-1.5 rounded-full flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 fill-slate-600 text-muted-foreground" /> {item.rate}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 sm:bottom-6 sm:left-6 flex flex-col sm:flex-row items-start gap-1.5 sm:gap-2">
                      {item.ver && (
                        <Badge className="bg-emerald-500 text-white font-black border-none shadow-xl px-2 py-1 sm:px-5 sm:py-2 rounded-full uppercase text-[10px] tracking-widest flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                          <CheckCircle2 className="h-3 w-3 shrink-0" /> Integrity Audited
                        </Badge>
                      )}
                      <Badge className="bg-card text-muted-foreground font-black border-none shadow-xl px-2 py-1 sm:px-5 sm:py-2 rounded-full uppercase text-[10px] tracking-widest flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                        {item.startingPrice}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="p-3 pb-1 sm:p-8 sm:pb-4">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground line-clamp-1">{item.type}</p>
                      <CardTitle className="text-sm sm:text-3xl font-black group-hover:text-muted-foreground transition-colors leading-tight line-clamp-2">{item.name}</CardTitle>
                      <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-sm font-bold text-muted-foreground mt-1 sm:mt-2">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground shrink-0" /> <span className="line-clamp-1">{item.loc}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="px-3 pb-2 sm:px-8 sm:pb-8 flex-1 space-y-2 sm:space-y-6">
                    <div className="hidden sm:block space-y-3">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Outlet Highlights</p>
                      <div className="flex flex-wrap gap-2">
                        {item.features.map(f => (
                          <span key={f} className="text-[10px] font-bold bg-muted text-muted-foreground px-3 py-1 rounded-lg border border-border">{f}</span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-4 sm:pt-6 sm:border-t border-border">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
                        <Globe className="h-4 w-4 text-blue-500" /> Global Ship
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
                        <Zap className="h-4 w-4 text-amber-500" /> Instant Access
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="px-3 pb-3 pt-0 sm:px-8 sm:pb-8 mt-auto">
                    <Button className="w-full bg-zinc-900 hover:bg-muted-foreground text-white rounded-xl sm:rounded-[1.5rem] font-black text-[10px] sm:text-sm uppercase tracking-widest h-9 sm:h-16 shadow-lg sm:shadow-2xl transition-all group-hover:scale-[1.02]">
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
              <p className="text-sm font-black text-muted-foreground uppercase tracking-[0.2em]">End of Source List</p>
              <div className="h-1 w-12 bg-muted rounded-full" />
            </div>
            <Button variant="outline" className="rounded-full px-8 sm:px-16 font-black border-2 h-10 sm:h-16 hover:bg-muted-foreground hover:text-white hover:border-border transition-all text-sm sm:text-lg shadow-sm">Explore Scholarly Networks</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
