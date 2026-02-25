"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Boxes, Search, Filter, Plus, 
  AlertCircle, ArrowUpRight, Layers,
  Trash2, Edit2, MoreVertical, ShieldCheck,
  CheckCircle2, History, PackageOpen, Scale
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function GroceryInventoryPage() {
  const stockItems = [
    { id: 1, name: "Premium Basmati Rice (5kg)", category: "Pantry", price: "₹850", stock: "120 Units", status: "In Stock", trend: "+12%" },
    { id: 2, name: "Organic Cold-Pressed Oil", category: "Oils", price: "₹450", stock: "45 Units", status: "Low Stock", trend: "-5%" },
    { id: 3, name: "Halal Frozen Chicken Wings", category: "Frozen", price: "₹320", stock: "85 Units", status: "In Stock", trend: "+2%" },
    { id: 4, name: "Traditional Mithai Box", category: "Sweets", price: "₹600", stock: "12 Units", status: "Critical", trend: "+15%" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-[10px]">
            <Boxes className="h-3 w-3" /> Supply Chain Control
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Inventory & Stock</h1>
          <p className="text-muted-foreground font-medium">Manage your supermarket SKU levels, category performance, and stock audits.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            <History className="mr-2 h-4 w-4" /> Stock History
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-8 font-black shadow-lg shadow-emerald-200 h-12 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add New SKU
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total SKUs", value: "1,240", icon: Layers, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Low Stock Items", value: "12", icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Out of Stock", value: "4", icon: PackageOpen, color: "text-red-600", bg: "bg-red-50" },
          { label: "Audit Accuracy", value: "99.2%", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((stat, i) => (
          <Card key={i} className="rounded-3xl border-none shadow-sm p-6 bg-white flex items-center gap-4">
            <div className={`h-12 w-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[2.5rem] shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search items, categories, or IDs..." className="pl-9 h-11 rounded-2xl bg-slate-50 border-none font-medium" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-4 py-2 rounded-full cursor-pointer hover:bg-emerald-600 hover:text-white transition-all">All Stock</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted">Pantry</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted">Dairy</Badge>
          <Button variant="ghost" size="icon" className="rounded-full"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stockItems.map((item) => (
          <Card key={item.id} className="group rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-emerald-100">
            <div className="relative aspect-square">
              <Image 
                src={`https://picsum.photos/seed/grocery-sku-${item.id}/400/400`} 
                alt={item.name} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="bg-white/90 backdrop-blur-md text-emerald-600 font-black border-none shadow-lg px-3 flex items-center gap-1.5">
                  <Scale className="h-3 w-3" /> {item.stock}
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" className="rounded-full bg-white/80 backdrop-blur-md text-slate-800 hover:bg-white border-none shadow-sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-2xl p-2 border-none shadow-xl">
                    <DropdownMenuItem className="rounded-xl font-bold gap-2"><Edit2 className="h-4 w-4" /> Edit Details</DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl font-bold gap-2"><Plus className="h-4 w-4" /> Stock In</DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl font-bold gap-2 text-red-500"><Trash2 className="h-4 w-4" /> Remove</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <CardHeader className="p-6">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border-none">{item.category}</Badge>
                <span className="text-emerald-600 font-black">{item.price}</span>
              </div>
              <CardTitle className="text-lg font-bold group-hover:text-emerald-600 transition-colors leading-tight line-clamp-1">{item.name}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <div className={`h-2 w-2 rounded-full ${item.status === 'In Stock' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                <span className="text-[10px] font-bold text-muted-foreground uppercase">{item.status}</span>
              </div>
            </CardHeader>
          </Card>
        ))}
        
        <button className="rounded-[2.5rem] border-4 border-dashed border-slate-100 bg-slate-50/30 flex flex-col items-center justify-center p-8 text-center gap-4 hover:bg-white hover:border-emerald-200 transition-all cursor-pointer group min-h-[300px]">
          <div className="h-16 w-16 bg-white rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <Plus className="h-8 w-8 text-emerald-600" />
          </div>
          <div className="space-y-1">
            <p className="font-black text-xl text-slate-900">Add New Item</p>
            <p className="text-sm text-slate-400 font-medium">Scan barcode or manually add SKU</p>
          </div>
        </button>
      </div>
    </div>
  );
}