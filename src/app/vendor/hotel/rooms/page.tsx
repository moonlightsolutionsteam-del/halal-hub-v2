"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, Search, Filter, Edit2, 
  Trash2, Eye, MoreVertical, Layers,
  Bed, ShieldCheck, Tag, Scale,
  CheckCircle2, AlertCircle
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function HotelRoomsPage() {
  const rooms = [
    { id: 1, name: "Executive Royal Suite", type: "Suite", price: "₹12,500/night", status: "Available", inventory: "2 Units", rating: 4.9 },
    { id: 2, name: "Superior Queen Room", type: "Double", price: "₹6,800/night", status: "Available", inventory: "12 Units", rating: 4.8 },
    { id: 3, name: "Family Connecting Suite", type: "Family", price: "₹15,000/night", status: "Low Availability", inventory: "1 Unit", rating: 4.7 },
    { id: 4, name: "Standard Single", type: "Single", price: "₹4,200/night", status: "Available", inventory: "15 Units", rating: 4.5 },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sky-600 font-black uppercase tracking-widest text-[10px]">
            <Bed className="h-3 w-3" /> Property Inventory
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Rooms & Suites</h1>
          <p className="text-muted-foreground font-medium">Manage your property's room inventory, dynamic pricing, and amenity levels.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            <Layers className="mr-2 h-4 w-4" /> Room Types
          </Button>
          <Button className="bg-sky-600 hover:bg-sky-700 rounded-full px-8 font-black shadow-lg shadow-sky-200 h-12 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add New Room
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[2.5rem] shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search room names, types..." className="pl-9 h-11 rounded-2xl bg-slate-50 border-none font-medium" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-4 py-2 rounded-full cursor-pointer bg-sky-50 text-sky-600 border-none">All Rooms</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted border-slate-200">Suites</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted border-slate-200">Available</Badge>
          <Button variant="ghost" size="icon" className="rounded-full"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {rooms.map((room) => (
          <Card key={room.id} className="group rounded-[3rem] border-none shadow-sm overflow-hidden bg-white hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-sky-100">
            <div className="p-8 flex gap-8">
              <div className="relative h-32 w-32 rounded-[2rem] overflow-hidden shrink-0 shadow-lg">
                <Image src={`https://picsum.photos/seed/hotel-room-${room.id}/400/400`} alt={room.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="bg-sky-50 text-sky-600 border-none text-[9px] font-black uppercase tracking-tighter">
                      {room.type}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="rounded-full h-8 w-8"><MoreVertical className="h-4 w-4 text-slate-300" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-2xl p-2">
                        <DropdownMenuItem className="rounded-xl font-bold gap-2"><Edit2 className="h-4 w-4" /> Edit Details</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl font-bold gap-2 text-red-500"><Trash2 className="h-4 w-4" /> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">{room.name}</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inventory: {room.inventory}</p>
                </div>
                <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                  <span className="text-xl font-black text-sky-600">{room.price}</span>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${room.status === 'Available' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <span className="text-[10px] font-black text-slate-400 uppercase">{room.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
        
        <button className="rounded-[3rem] border-4 border-dashed border-slate-100 bg-slate-50/30 flex flex-col items-center justify-center p-12 text-center gap-4 hover:bg-white hover:border-sky-200 transition-all cursor-pointer group">
          <div className="h-16 w-16 bg-white rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <Plus className="h-8 w-8 text-sky-600" />
          </div>
          <div className="space-y-1">
            <p className="font-black text-xl text-slate-900">Add New Inventory</p>
            <p className="text-sm text-slate-400 font-medium px-4">Register a new room category or individual suite</p>
          </div>
        </button>
      </div>
    </div>
  );
}
