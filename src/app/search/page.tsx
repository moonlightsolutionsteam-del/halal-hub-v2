
"use client"

import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Filter, SlidersHorizontal, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SEARCH_RESULTS = [
  { id: 1, name: "The Bosphorus Kitchen", category: "Restaurant", location: "Downtown", rating: 4.8, verified: true },
  { id: 2, name: "Al-Barakah Meats", category: "Butcher", location: "Brooklyn", rating: 4.5, verified: true },
  { id: 3, name: "Islamic Center Pharmacy", category: "Healthcare", location: "Queens", rating: 4.2, verified: false },
  { id: 4, name: "Saffron Sky Travel", category: "Travel", location: "Jersey City", rating: 4.9, verified: true },
];

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-black font-headline text-primary">Search Results</h1>
            <p className="text-muted-foreground font-medium">Found {SEARCH_RESULTS.length} matches for "{query}"</p>
          </div>
          <div className="flex gap-2">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input defaultValue={query} className="pl-9 h-12 rounded-2xl border-none shadow-sm bg-white" placeholder="Search anything..." />
            </div>
            <Button variant="outline" className="h-12 w-12 rounded-2xl bg-white border-none shadow-sm"><SlidersHorizontal className="h-5 w-5" /></Button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {["All", "Verified Only", "Top Rated", "Nearest Me", "Newest", "Price Range"].map(filter => (
            <Badge key={filter} variant="secondary" className="px-4 py-2 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-colors">
              {filter}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SEARCH_RESULTS.map((item) => (
          <Link key={item.id} href={`/entities/${item.id}`}>
            <Card className="group rounded-[2.5rem] border-none shadow-sm overflow-hidden flex flex-col sm:flex-row hover:shadow-xl transition-all duration-500 bg-white">
              <div className="relative w-full sm:w-48 aspect-video sm:aspect-square overflow-hidden shrink-0">
                <Image 
                  src={`https://picsum.photos/seed/search${item.id}/400/400`} 
                  alt={item.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                {item.verified && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 backdrop-blur text-primary border-none font-black shadow-lg">Verified</Badge>
                  </div>
                )}
              </div>
              <CardHeader className="p-6 flex-1 justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">{item.category}</Badge>
                    <div className="flex items-center gap-1 text-sm font-bold text-accent">
                      <Star className="h-4 w-4 fill-current" /> {item.rating}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-black group-hover:text-primary transition-colors leading-tight">{item.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1.5 font-medium">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" /> {item.location}, NY
                  </CardDescription>
                </div>
                <div className="pt-4 flex items-center text-sm font-black text-primary group-hover:gap-2 transition-all">
                  View Profile <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <Button variant="outline" className="rounded-full px-12 font-bold border-2 h-12">Load More Results</Button>
      </div>
    </div>
  );
}
