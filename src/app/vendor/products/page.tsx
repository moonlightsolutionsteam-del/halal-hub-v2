"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, Search, Filter, Edit2, 
  Trash2, Eye, MoreVertical, Layers,
  UtensilsCrossed, PackageOpen
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function VendorProductsPage() {
  const products = [
    { id: 1, name: "Signature Wagyu Burger", category: "Mains", price: "$24.00", status: "Available", sales: 142 },
    { id: 2, name: "Turkish Mezze Platter", category: "Starters", price: "$18.50", status: "Available", sales: 89 },
    { id: 3, name: "Honey Glazed Ribs", category: "Mains", price: "$32.00", status: "Low Stock", sales: 56 },
    { id: 4, name: "Pistachio Baklava", category: "Desserts", price: "$12.00", status: "Available", sales: 210 },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Products & Services</h1>
          <p className="text-muted-foreground font-medium">Manage your menu offerings and service catalogs.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2">
            <Layers className="mr-2 h-4 w-4" /> Manage Categories
          </Button>
          <Button className="bg-primary rounded-full px-8 font-bold shadow-lg shadow-primary/20 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add New Item
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search items..." className="pl-9 h-11 rounded-2xl bg-card border-none shadow-sm" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-4 py-2 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-all">All Items</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted">Mains</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted">Desserts</Badge>
          <Button variant="ghost" size="icon" className="rounded-full"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-xl transition-all duration-500">
            <div className="relative aspect-square">
              <Image 
                src={`https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400/400`} 
                alt={product.name} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" className="rounded-full bg-card/80 backdrop-blur-md text-foreground hover:bg-card border-none shadow-sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-2xl p-2 border-none shadow-xl">
                    <DropdownMenuItem className="rounded-xl font-bold gap-2"><Edit2 className="h-4 w-4" /> Edit Item</DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl font-bold gap-2"><Eye className="h-4 w-4" /> View Publicly</DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl font-bold gap-2 text-red-500"><Trash2 className="h-4 w-4" /> Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <CardHeader className="p-6">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="text-[9px] font-black uppercase tracking-widest">{product.category}</Badge>
                <span className="text-primary font-black">{product.price}</span>
              </div>
              <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-muted pt-4 mt-2">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${product.status === 'Available' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <span className="text-[10px] font-bold text-muted-foreground uppercase">{product.status}</span>
              </div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase">{product.sales} Sales</span>
            </CardContent>
          </Card>
        ))}
        <button className="rounded-[2.5rem] border-4 border-dashed border-muted hover:border-primary/40 hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-4 text-muted-foreground hover:text-primary p-8 min-h-[300px]">
          <div className="h-16 w-16 rounded-3xl bg-muted/50 flex items-center justify-center">
            <Plus className="h-8 w-8" />
          </div>
          <div className="text-center">
            <p className="font-black text-lg">Add Item</p>
            <p className="text-xs font-medium">Create a new product listing</p>
          </div>
        </button>
      </div>
    </div>
  );
}
