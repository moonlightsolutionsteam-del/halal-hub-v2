
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, Search, Filter, Edit2, 
  Trash2, Eye, MoreVertical, Layers,
  Compass, Plane, ShieldCheck, Tag,
  Globe, Clock, MapPin, Calendar
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function TravelPackagesPage() {
  const packages = [
    { id: 1, name: "Istanbul Cultural Odyssey", type: "Guided Tour", price: "₹85,000", duration: "7 Days", status: "Active", destination: "Turkey" },
    { id: 2, name: "Umrah Deluxe Premium", type: "Pilgrimage", price: "₹1,45,000", duration: "10 Days", status: "Active", destination: "Saudi Arabia" },
    { id: 3, name: "Kuala Lumpur Explorer", type: "City Break", price: "₹45,000", duration: "5 Days", status: "Low Availability", destination: "Malaysia" },
    { id: 4, name: "Heritage Morocco Journey", type: "Cultural", price: "₹1,10,000", duration: "12 Days", status: "Active", destination: "Morocco" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-600 font-black uppercase tracking-widest text-[10px]">
            <Compass className="h-3 w-3" /> Itinerary Manager
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Tour Packages</h1>
          <p className="text-muted-foreground font-medium">Create and manage your halal-certified travel itineraries and seasonal pilgrim packages.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            <Layers className="mr-2 h-4 w-4" /> Categories
          </Button>
          <Button className="bg-amber-600 hover:bg-amber-700 rounded-full px-8 font-black shadow-lg shadow-amber-200 h-12 text-white">
            <Plus className="mr-2 h-4 w-4" /> New Package
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-[2.5rem] shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search tours, destinations..." className="pl-9 h-11 rounded-2xl bg-muted border-none font-medium" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-4 py-2 rounded-full cursor-pointer bg-amber-50 text-amber-600 border-none">All Tours</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted border-border">Umrah</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted border-border">Cultural</Badge>
          <Button variant="ghost" size="icon" className="rounded-full"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="group rounded-[3rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-amber-100">
            <div className="p-8 flex flex-col sm:flex-row gap-8">
              <div className="relative h-40 w-full sm:w-40 rounded-[2rem] overflow-hidden shrink-0 shadow-lg">
                <Image src={`https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400/400`} alt={pkg.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="bg-amber-50 text-amber-600 border-none text-[9px] font-black uppercase tracking-tighter">
                      {pkg.type}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="rounded-full h-8 w-8"><MoreVertical className="h-4 w-4 text-muted-foreground" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-2xl p-2 border-none shadow-xl">
                        <DropdownMenuItem className="rounded-xl font-bold gap-2"><Edit2 className="h-4 w-4" /> Edit Itinerary</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl font-bold gap-2"><Eye className="h-4 w-4" /> Preview Live</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl font-bold gap-2 text-red-500"><Trash2 className="h-4 w-4" /> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h3 className="text-2xl font-black text-foreground tracking-tight leading-tight">{pkg.name}</h3>
                  <div className="flex items-center gap-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {pkg.destination}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {pkg.duration}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xl font-black text-amber-600">{pkg.price}</span>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${pkg.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <span className="text-[10px] font-black text-muted-foreground uppercase">{pkg.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
        
        <button className="rounded-[3rem] border-4 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center p-12 text-center gap-4 hover:bg-card hover:border-amber-200 transition-all cursor-pointer group">
          <div className="h-16 w-16 bg-card rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <Plus className="h-8 w-8 text-amber-600" />
          </div>
          <div className="space-y-1">
            <p className="font-black text-xl text-foreground">Add New Tour</p>
            <p className="text-sm text-muted-foreground font-medium px-4">Create a new destination-based experience</p>
          </div>
        </button>
      </div>
    </div>
  );
}
