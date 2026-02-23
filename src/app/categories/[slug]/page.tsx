
"use client"

import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Filter, Info, ArrowLeft, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CATEGORY_MAP: Record<string, string> = {
  food: "Food & Dining",
  meat: "Meat & Butchers",
  grocery: "Grocery & Supermarkets",
  catering: "Catering Services",
  events: "Event Services",
  hotels: "Hotels & Homestays",
  travel: "Travel & Tourism",
  fashion: "Fashion & Modest Wear",
  cosmetics: "Cosmetics & Beauty",
  finance: "Finance & Banking",
  healthcare: "Healthcare & Wellness",
  education: "Education & Training",
  media: "Bookstores & Media",
};

const MOCK_ENTITIES = [
  { id: "1", name: "The Bosphorus Kitchen", sub: "Turkish Cuisine", loc: "Manhattan, NY", rate: 4.8, ver: true, img: "https://picsum.photos/seed/cat1/600/400" },
  { id: "2", name: "Al-Barakah Organics", sub: "Premium Butcher", loc: "Brooklyn, NY", rate: 4.5, ver: true, img: "https://picsum.photos/seed/cat2/600/400" },
  { id: "3", name: "Saffron Sky Suites", sub: "Luxury Hotel", loc: "Jersey City, NJ", rate: 4.9, ver: true, img: "https://picsum.photos/seed/cat3/600/400" },
  { id: "4", name: "Islamic Knowledge Academy", sub: "Primary Education", loc: "Queens, NY", rate: 4.7, ver: false, img: "https://picsum.photos/seed/cat4/600/400" },
];

export default function CategoryListingPage() {
  const { slug } = useParams() as { slug: string };
  const categoryTitle = CATEGORY_MAP[slug] || "Explore Listings";

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl">
      <div className="flex flex-col gap-6">
        <Link href="/categories" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit">
          <ArrowLeft className="h-4 w-4" /> Back to Categories
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black font-headline text-slate-900 tracking-tight">{categoryTitle}</h1>
            <p className="text-muted-foreground font-medium">Discover top-rated halal services in your area.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder={`Search in ${categoryTitle}...`} className="pl-9 h-12 rounded-2xl bg-white border-none shadow-sm" />
            </div>
            <Button variant="outline" className="h-12 w-12 rounded-2xl bg-white border-none shadow-sm">
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <Alert className="bg-primary/5 border-primary/10 rounded-[2rem] p-6">
        <div className="flex gap-4 items-start">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Info className="h-5 w-5 text-primary" />
          </div>
          <AlertDescription className="text-sm font-medium text-slate-600 leading-relaxed pt-1">
            All listings in this category are audited for Shariah compliance. Verified badges indicate that valid documentation has been submitted and reviewed by our trust team.
          </AlertDescription>
        </div>
      </Alert>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_ENTITIES.map((entity) => (
          <Link key={entity.id} href={`/entities/${entity.id}`}>
            <Card className="group rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white hover:shadow-xl transition-all duration-500 flex flex-col h-full">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image 
                  src={entity.img} 
                  alt={entity.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {entity.ver && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 backdrop-blur-md text-primary font-black border-none shadow-lg">Verified</Badge>
                  </div>
                )}
              </div>
              <CardHeader className="p-6 flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="text-[9px] font-black uppercase tracking-widest">{entity.sub}</Badge>
                  <div className="flex items-center gap-1 text-sm font-bold text-accent">
                    <Star className="h-4 w-4 fill-current" /> {entity.rate}
                  </div>
                </div>
                <CardTitle className="text-xl font-black group-hover:text-primary transition-colors leading-tight">{entity.name}</CardTitle>
                <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {entity.loc}
                </div>
              </CardHeader>
              <CardFooter className="px-6 pb-6 pt-0 border-t border-muted mt-2 pt-4">
                <Button className="w-full bg-primary rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20">View Profile</Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
