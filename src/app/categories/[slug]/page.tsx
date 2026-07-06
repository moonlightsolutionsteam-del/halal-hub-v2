
"use client"

import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, MapPin, Star, Filter, Info, 
  ArrowLeft, SlidersHorizontal, CheckCircle2, 
  Truck, Calendar, Zap, ShieldCheck, 
  ShoppingBag, Globe, Eye
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CATEGORY_CONFIG: Record<string, { title: string; features: string[]; icon: any; accent: string }> = {
  food: { 
    title: "Food & Dining", 
    features: ["Digital Table Ordering", "QR Menu", "Table Booking", "Halal Supply Chain"], 
    icon: Zap,
    accent: "text-orange-600 bg-orange-50 border-orange-100"
  },
  meat: { 
    title: "Meat & Butchers", 
    features: ["Traceability Logs", "Fresh Delivery", "Bulk Wholesale", "HMC Certified"], 
    icon: ShieldCheck,
    accent: "text-red-600 bg-red-50 border-red-100"
  },
  grocery: { 
    title: "Grocery & Supermarkets", 
    features: ["Online Checkout", "Local Delivery", "Loyalty Rewards", "Fresh Produce"], 
    icon: ShoppingBag,
    accent: "text-emerald-600 bg-emerald-50 border-emerald-100"
  },
  catering: { 
    title: "Catering Services", 
    features: ["Menu Packages", "Event Logistics", "Live Counters", "Quote Requests"], 
    icon: CheckCircle2,
    accent: "text-blue-600 bg-blue-50 border-blue-100"
  },
  events: { 
    title: "Event Services", 
    features: ["Venue Booking", "Ticketing System", "Vendor Manager", "Audio/Visual"], 
    icon: Calendar,
    accent: "text-purple-600 bg-purple-50 border-purple-100"
  },
  hotels: { 
    title: "Hotels & Homestays", 
    features: ["Prayer Rooms", "Halal Breakfast", "Family Suites", "No-Alcohol Policy"], 
    icon: Globe,
    accent: "text-sky-600 bg-sky-50 border-sky-100"
  },
  travel: { 
    title: "Travel & Tourism", 
    features: ["Guided Tours", "Umrah Packages", "Group Travel", "Halal Itineraries"], 
    icon: Globe,
    accent: "text-amber-600 bg-amber-50 border-amber-100"
  },
  fashion: { 
    title: "Fashion & Modest Wear", 
    features: ["Designer Lookbooks", "Global Shipping", "Sizing Guide", "Modest Cuts"], 
    icon: ShoppingBag,
    accent: "text-pink-600 bg-pink-50 border-pink-100"
  },
  cosmetics: { 
    title: "Cosmetics & Beauty", 
    features: ["Ingredient Checker", "Vegan Options", "Cruelty Free", "Lab Verified"], 
    icon: ShieldCheck,
    accent: "text-rose-600 bg-rose-50 border-rose-100"
  },
  finance: { 
    title: "Finance & Banking", 
    features: ["Shariah Audited", "Mudarabah Funds", "Zakat Tools", "Islamic Loans"], 
    icon: ShieldCheck,
    accent: "text-indigo-600 bg-indigo-50 border-indigo-100"
  },
  healthcare: { 
    title: "Healthcare & Wellness", 
    features: ["Hijama Therapy", "Sunnah Nutrition", "Female Doctors", "Pharmacy"], 
    icon: CheckCircle2,
    accent: "text-teal-600 bg-teal-50 border-teal-100"
  },
  education: { 
    title: "Education & Training", 
    features: ["Student Enrollment", "Madrasa Curriculum", "Online Classes", "Certification"], 
    icon: Zap,
    accent: "text-violet-600 bg-violet-50 border-violet-100"
  },
  media: { 
    title: "Bookstores & Media", 
    features: ["Digital Library", "Rare Manuscripts", "Audio Courses", "Global Shipping"], 
    icon: ShoppingBag,
    accent: "text-muted-foreground bg-muted border-border"
  },
};

const MOCK_DATA = [
  { id: "1", name: "Premium Halal Entity", sub: "Verified Partner", loc: "New York, NY", rate: 4.8, ver: true, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop&auto=format&q=80" },
  { id: "2", name: "Modern Islamic Hub", sub: "Top Rated", loc: "Brooklyn, NY", rate: 4.5, ver: true, img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&auto=format&q=80" },
  { id: "3", name: "Traditional Specialty", sub: "New Listing", loc: "Jersey City, NJ", rate: 4.9, ver: true, img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop&auto=format&q=80" },
  { id: "4", name: "Community Choice", sub: "Crowd Sourced", loc: "Queens, NY", rate: 4.7, ver: false, img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&auto=format&q=80" },
];

export default function CategoryListingPage() {
  const { slug } = useParams() as { slug: string };
  const config = CATEGORY_CONFIG[slug] || { title: "Explore Hub", features: ["Verified Listings", "Trust Reports", "Community Driven"], icon: Info, accent: "text-primary bg-primary/5" };

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-6xl">
      <div className="flex flex-col gap-3 sm:gap-6">
        <Link href="/categories" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit">
          <ArrowLeft className="h-4 w-4" /> Back to Categories
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${config.accent}`}>
                <config.icon className="h-5 w-5" />
              </div>
              <h1 className="text-2xl sm:text-4xl font-black font-headline text-foreground tracking-tight">{config.title}</h1>
            </div>
            <p className="text-muted-foreground font-medium text-lg">High-fidelity directory of certified {config.title.toLowerCase()} providers.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder={`Search in ${config.title}...`} className="pl-9 h-12 rounded-2xl bg-card border-none shadow-sm font-medium" />
            </div>
            <Button variant="outline" className="h-12 w-12 rounded-2xl bg-card border-none shadow-sm">
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Capabilities Ribbon */}
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {config.features.map((feature, i) => (
          <Badge key={i} className={`px-4 py-2 rounded-xl border-2 whitespace-nowrap font-black uppercase text-[10px] tracking-widest ${config.accent}`}>
            {feature}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="hidden lg:block space-y-6">
          <Card className="rounded-[2rem] border-none shadow-sm p-6 bg-card space-y-6">
            <div className="space-y-4">
              <h3 className="font-black text-sm uppercase tracking-widest text-muted-foreground">Refine Search</h3>
              <div className="space-y-2">
                {["Verified Only", "Top Rated", "Nearest Me", "Newest Arrivals"].map(f => (
                  <button key={f} className="flex items-center gap-3 w-full p-2 hover:bg-muted/50 rounded-xl transition-colors text-sm font-bold text-muted-foreground">
                    <div className="h-4 w-4 border-2 rounded-md border-muted" />
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-px bg-muted w-full" />
            <div className="space-y-4">
              <h3 className="font-black text-sm uppercase tracking-widest text-muted-foreground">Service Highlights</h3>
              <div className="flex flex-wrap gap-2">
                {config.features.map(f => (
                  <Badge key={f} variant="secondary" className="rounded-full px-3 py-1 text-[10px] font-black">{f}</Badge>
                ))}
              </div>
            </div>
          </Card>

          <Card className="rounded-[2rem] border-none bg-zinc-900 text-white p-8 space-y-4 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 opacity-10">
              <ShieldCheck className="h-24 w-24" />
            </div>
            <h3 className="font-black text-lg leading-tight relative z-10">Trust & Safety Guarantee</h3>
            <p className="text-xs text-muted-foreground leading-relaxed relative z-10">
              Every entity listed in {config.title} has undergone our rigorous 5-step verification process for Shariah compliance.
            </p>
            <Button variant="secondary" className="w-full rounded-xl font-black text-xs h-10">Read Our Policy</Button>
          </Card>
        </aside>

        {/* Listings Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {MOCK_DATA.map((entity) => (
              <Link key={entity.id} href={`/entities/${entity.id}`}>
                <Card className="group rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-xl transition-all duration-500 flex flex-col h-full border border-transparent hover:border-primary/10">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image 
                      src={entity.img} 
                      alt={entity.name} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {entity.ver && (
                        <Badge className="bg-card/90 backdrop-blur-md text-primary font-black border-none shadow-lg px-3">Verified</Badge>
                      )}
                      <Badge className="bg-zinc-900/80 backdrop-blur-md text-white font-black border-none shadow-lg px-3">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400 mr-1" /> {entity.rate}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="p-6 flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <Badge variant="secondary" className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">{entity.sub}</Badge>
                    </div>
                    <CardTitle className="text-xl font-black group-hover:text-primary transition-colors leading-tight">{entity.name}</CardTitle>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" /> {entity.loc}
                    </div>
                  </CardHeader>
                  <CardContent className="px-6 pb-4">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Available Features</p>
                      <div className="flex flex-wrap gap-1.5">
                        {config.features.slice(0, 2).map((f, idx) => (
                          <div key={idx} className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground bg-muted/50 px-2 py-1 rounded-lg">
                            <CheckCircle2 className="h-3 w-3 text-primary" /> {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-0 border-t border-muted mt-2 pt-4">
                    <Button className="w-full bg-primary rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 h-12 group-hover:scale-[1.02] transition-transform">
                      View Profile <Eye className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <p className="text-sm font-bold text-muted-foreground">Showing 4 of 1,240 results</p>
            <Button variant="outline" className="rounded-full px-12 font-black border-2 h-14 hover:bg-primary hover:text-white transition-all">Load More Listings</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
