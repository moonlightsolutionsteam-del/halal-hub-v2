
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, Search, Filter, Edit2, 
  Trash2, Eye, MoreVertical, Layers,
  Utensils, CookingPot, ShieldCheck, Tag,
  ChevronRight, Scale, Info
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function CateringMenuPage() {
  const packages = [
    { id: 1, name: "Grand Nikah Package", type: "Full Service", price: "₹1,200/head", status: "Active", items: 12, rating: 4.9 },
    { id: 2, name: "Corporate Lunch Box", type: "Drop-off", price: "₹450/head", status: "Active", items: 5, rating: 4.7 },
    { id: 3, name: "Gourmet BBQ Platter", type: "Live Station", price: "₹950/head", status: "Low Availability", items: 8, rating: 4.8 },
    { id: 4, name: "Afternoon Tea Set", type: "Boutique", price: "₹650/head", status: "Active", items: 15, rating: 4.5 },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-[10px]">
            <Utensils className="h-3 w-3" /> Menu Engineering
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Catering Packages</h1>
          <p className="text-muted-foreground font-medium">Manage your event menus, tiered pricing, and specialized cuisine sets.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            <Layers className="mr-2 h-4 w-4" /> Global Settings
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-8 font-black shadow-lg shadow-blue-200 h-12 text-white">
            <Plus className="mr-2 h-4 w-4" /> New Package
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[2.5rem] shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search packages, cuisines..." className="pl-9 h-11 rounded-2xl bg-slate-50 border-none" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-4 py-2 rounded-full cursor-pointer bg-blue-50 text-blue-600 border-none">All Types</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted border-slate-200">Full Service</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted border-slate-200">Live Station</Badge>
          <Button variant="ghost" size="icon" className="rounded-full"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="group rounded-[3rem] border-none shadow-sm overflow-hidden bg-white hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-blue-100">
            <div className="p-8 flex gap-8">
              <div className="relative h-32 w-32 rounded-[2rem] overflow-hidden shrink-0 shadow-lg">
                <Image src={`https://picsum.photos/seed/catering-pkg-${pkg.id}/400/400`} alt={pkg.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none text-[9px] font-black uppercase tracking-tighter">
                      {pkg.type}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="rounded-full h-8 w-8"><MoreVertical className="h-4 w-4 text-slate-300" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-2xl p-2">
                        <DropdownMenuItem className="rounded-xl font-bold gap-2"><Edit2 className="h-4 w-4" /> Edit Details</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl font-bold gap-2 text-red-500"><Trash2 className="h-4 w-4" /> Remove</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">{pkg.name}</h3>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{pkg.items} Menu Items Included</p>
                </div>
                <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                  <span className="text-xl font-black text-blue-600">{pkg.price}</span>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${pkg.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <span className="text-[10px] font-black text-slate-400 uppercase">{pkg.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
        
        <button className="rounded-[3rem] border-4 border-dashed border-slate-100 bg-slate-50/30 flex flex-col items-center justify-center p-12 text-center gap-4 hover:bg-white hover:border-blue-200 transition-all cursor-pointer group">
          <div className="h-16 w-16 bg-white rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <Plus className="h-8 w-8 text-blue-600" />
          </div>
          <div className="space-y-1">
            <p className="font-black text-xl text-slate-900">Add New Package</p>
            <p className="text-sm text-slate-400 font-medium">Create a tiered menu for specific events</p>
          </div>
        </button>
      </div>
    </div>
  );
}
