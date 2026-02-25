"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, Search, Filter, Edit2, 
  Trash2, Eye, MoreVertical, Layers,
  PackageOpen, Scale, ShieldCheck, Tag
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function ButcherProductsPage() {
  const products = [
    { id: 1, name: "Premium Mutton Curry Cut", category: "Mutton", price: "₹850/kg", status: "Available", source: "Local Farm", stock: "45kg" },
    { id: 2, name: "Fresh Chicken Boneless", category: "Poultry", price: "₹420/kg", status: "Available", source: "HMC Verified", stock: "120kg" },
    { id: 3, name: "Prime Beef Ribs", category: "Beef", price: "₹950/kg", status: "Low Stock", source: "Organic Farm", stock: "5kg" },
    { id: 4, name: "Marinated Mutton Chops", category: "Marinated", price: "₹1,200/kg", status: "Available", source: "House Recipe", stock: "15kg" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <ShieldCheck className="h-3 w-3" /> Inventory Control
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Meat Inventory</h1>
          <p className="text-muted-foreground font-medium">Manage stock levels, sourcing logs, and pricing for your cuts.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2">
            <Layers className="mr-2 h-4 w-4" /> Categories
          </Button>
          <Button className="bg-primary rounded-full px-8 font-black shadow-lg shadow-primary/20 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add New Cut
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search mutton, beef, chicken..." className="pl-9 h-11 rounded-2xl bg-white border-none shadow-sm" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-4 py-2 rounded-full cursor-pointer hover:bg-primary hover:text-white">All Stock</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted">Mutton</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted">Beef</Badge>
          <Button variant="ghost" size="icon" className="rounded-full"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white hover:shadow-xl transition-all duration-500">
            <div className="relative aspect-square">
              <Image 
                src={`https://picsum.photos/seed/meat-item${product.id}/400/400`} 
                alt={product.name} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-white/90 backdrop-blur-md text-primary font-black border-none shadow-lg px-3 flex items-center gap-1.5">
                  <Scale className="h-3 w-3" /> {product.stock}
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
                    <DropdownMenuItem className="rounded-xl font-bold gap-2"><ShieldCheck className="h-4 w-4" /> Update Logs</DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl font-bold gap-2 text-red-500"><Trash2 className="h-4 w-4" /> Remove</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <CardHeader className="p-6">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="text-[9px] font-black uppercase tracking-widest">{product.category}</Badge>
                <span className="text-primary font-black">{product.price}</span>
              </div>
              <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors leading-tight">{product.name}</CardTitle>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter mt-1">Source: {product.source}</p>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-muted pt-4 mt-2">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${product.status === 'Available' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                <span className="text-[10px] font-bold text-muted-foreground uppercase">{product.status}</span>
              </div>
              <Button size="sm" variant="ghost" className="h-7 text-[9px] font-black uppercase px-2 hover:bg-slate-50">Log Audit</Button>
            </CardContent>
          </Card>
        ))}
        <button className="rounded-[2.5rem] border-4 border-dashed border-muted hover:border-primary/40 hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-4 text-muted-foreground hover:text-primary p-8 min-h-[300px]">
          <div className="h-16 w-16 rounded-3xl bg-muted/50 flex items-center justify-center">
            <Plus className="h-8 w-8" />
          </div>
          <div className="text-center">
            <p className="font-black text-lg">Add Product</p>
            <p className="text-xs font-medium px-4 leading-snug">Register a new meat cut or marinated item</p>
          </div>
        </button>
      </div>
    </div>
  );
}
