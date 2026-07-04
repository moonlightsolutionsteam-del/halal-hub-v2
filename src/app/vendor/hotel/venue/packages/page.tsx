
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, Plus, Edit2, Trash2, 
  ChevronRight, Users, Clock, ShieldCheck,
  Zap, Star, Layers, MoreVertical
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function VenuePackagesPage() {
  const packages = [
    { id: 1, name: "Imperial Nikah Package", type: "Wedding", price: "₹1,25,000", guests: "300 - 500", status: "Popular", items: 12 },
    { id: 2, name: "Corporate Day Pass", type: "Conference", price: "₹2,500/pax", guests: "50 - 200", status: "Active", items: 5 },
    { id: 3, name: "Boutique Aqiqah Set", type: "Private", price: "₹45,000", guests: "Up to 80", status: "Seasonal", items: 8 },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-purple-600 font-black uppercase tracking-widest text-[10px]">
            <Sparkles className="h-3 w-3" /> Event Services
          </div>
          <h1 className="text-3xl font-black font-headline text-foreground">Venue Packages</h1>
          <p className="text-muted-foreground font-medium">Create and manage your professional event spaces and tiered hosting packages.</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 rounded-full px-8 font-black shadow-lg shadow-purple-200 h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> Create New Tier
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="group rounded-[3rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-purple-100">
            <div className="p-8 flex flex-col sm:flex-row gap-8">
              <div className="relative h-32 w-full sm:w-32 rounded-[2rem] overflow-hidden shrink-0 shadow-lg">
                <Image src={`https://picsum.photos/seed/venue-pkg-${pkg.id}/400/400`} alt={pkg.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="bg-purple-50 text-purple-600 border-none text-[9px] font-black uppercase tracking-tighter">
                      {pkg.type}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="rounded-full h-8 w-8"><MoreVertical className="h-4 w-4 text-muted-foreground" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-2xl p-2">
                        <DropdownMenuItem className="rounded-xl font-bold gap-2"><Edit2 className="h-4 w-4" /> Edit Tier</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl font-bold gap-2 text-red-500"><Trash2 className="h-4 w-4" /> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h3 className="text-2xl font-black text-foreground tracking-tight leading-tight">{pkg.name}</h3>
                  <div className="flex items-center gap-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {pkg.guests} Pax</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Layers className="h-3 w-3" /> {pkg.items} Inclusions</span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xl font-black text-purple-600">{pkg.price}</span>
                  <Badge className="bg-emerald-50 text-emerald-600 border-none px-3 text-[9px] font-black uppercase">
                    {pkg.status}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
