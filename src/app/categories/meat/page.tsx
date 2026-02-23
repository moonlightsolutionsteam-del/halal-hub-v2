
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, MapPin, Star, Filter, ArrowLeft, 
  ShieldCheck, Truck, ShoppingBag, Info,
  ChevronRight, Beef
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MOCK_BUTCHERS = [
  { id: "1", name: "Al-Barakah Meats", type: "Wholesale & Retail", source: "HMC Certified", loc: "Brooklyn, NY", rate: 4.9, ver: true, img: "https://picsum.photos/seed/meat1/600/400" },
  { id: "2", name: "Premium Halal Cuts", type: "Boutique Butcher", source: "Organic Grass-fed", loc: "Manhattan, NY", rate: 4.7, ver: true, img: "https://picsum.photos/seed/meat2/600/400" },
];

export default function MeatListingPage() {
  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl">
      <div className="flex flex-col gap-6">
        <Link href="/categories" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit">
          <ArrowLeft className="h-4 w-4" /> Back to Categories
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl flex items-center justify-center bg-red-100 text-red-600">
                <Beef className="h-6 w-6" />
              </div>
              <h1 className="text-4xl font-black font-headline text-slate-900 tracking-tight">Meat & Butchers</h1>
            </div>
            <p className="text-muted-foreground font-medium text-lg">Trusted sources for fresh, certified halal meat and poultry.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search beef, lamb, poultry..." className="pl-9 h-12 rounded-2xl bg-white border-none shadow-sm" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="space-y-6">
          <Card className="rounded-[2rem] border-none shadow-sm p-8 bg-red-600 text-white space-y-4 relative overflow-hidden">
            <ShieldCheck className="absolute -top-4 -right-4 h-24 w-24 opacity-20" />
            <h3 className="font-black text-xl relative z-10">Traceability Guarantee</h3>
            <p className="text-xs text-white/80 leading-relaxed relative z-10">
              Every butcher listed here provides full supply chain documentation verified by our audit team.
            </p>
            <Button variant="secondary" className="w-full rounded-xl font-black text-xs relative z-10">View Audit Process</Button>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-sm p-6 bg-white space-y-4">
            <h3 className="font-black text-sm uppercase tracking-widest text-slate-400">Certifications</h3>
            <div className="flex flex-wrap gap-2">
              {["HMC", "HFA", "JAKIM", "Organic", "Grass-fed"].map(tag => (
                <Badge key={tag} variant="secondary" className="rounded-full px-3 py-1 font-bold text-[10px]">{tag}</Badge>
              ))}
            </div>
          </Card>
        </aside>

        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_BUTCHERS.map((shop) => (
              <Link key={shop.id} href={`/entities/${shop.id}`}>
                <Card className="group rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white hover:shadow-xl transition-all duration-500">
                  <div className="relative aspect-video">
                    <Image src={shop.img} alt={shop.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-red-600 font-black px-3 py-1 border-none shadow-lg">Verified Source</Badge>
                    </div>
                  </div>
                  <div className="p-8 space-y-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase text-red-500 tracking-widest">{shop.source}</p>
                      <h3 className="text-2xl font-black text-slate-900 group-hover:text-red-600 transition-colors">{shop.name}</h3>
                      <p className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
                        <MapPin className="h-3 w-3" /> {shop.loc}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase">
                        <Truck className="h-4 w-4 text-primary" /> Delivery Avail.
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase">
                        <ShoppingBag className="h-4 w-4 text-primary" /> In-store Pickup
                      </div>
                    </div>
                    <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black h-12 group-hover:bg-red-600 transition-colors">
                      View Price List <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
