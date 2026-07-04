
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, Search, Filter, Edit2, 
  Trash2, Eye, MoreVertical, Layers,
  Shirt, PackageOpen, Scale, ShieldCheck, Tag,
  Image as ImageIcon
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function FashionProductsPage() {
  const products = [
    { id: 1, name: "Premium Silk Abaya", category: "Abayas", price: "₹4,500", status: "Available", stock: "24 Units", code: "AB-001" },
    { id: 2, name: "Breathable Chiffon Hijab", category: "Hijabs", price: "₹1,200", status: "Available", stock: "150 Units", code: "HJ-042" },
    { id: 3, name: "Linen Modest Maxi", category: "Dresses", price: "₹3,800", status: "Low Stock", stock: "5 Units", code: "DR-088" },
    { id: 4, name: "Cotton Under-cap Set", category: "Accessories", price: "₹450", status: "Available", stock: "80 Units", code: "AC-012" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-pink-600 font-black uppercase tracking-widest text-[10px]">
            <Shirt className="h-3 w-3" /> Inventory Control
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Product Catalog</h1>
          <p className="text-muted-foreground font-medium">Manage your modest fashion collections, inventory levels, and tiered pricing.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            <Layers className="mr-2 h-4 w-4" /> Collection Settings
          </Button>
          <Button className="bg-pink-600 hover:bg-pink-700 rounded-full px-8 font-black shadow-lg shadow-pink-200 h-12 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add New Item
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-[2rem] shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search items by name or SKU..." className="pl-9 h-11 rounded-2xl bg-muted border-none font-medium" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-4 py-2 rounded-full cursor-pointer bg-pink-50 text-pink-600 border-none">All Styles</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer border-border">Abayas</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer border-border">Hijabs</Badge>
          <Button variant="ghost" size="icon" className="rounded-full"><Filter className="h-4 w-4 text-muted-foreground" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-pink-100">
            <div className="relative aspect-[3/4]">
              <Image 
                src={`https://picsum.photos/seed/fashion-item${product.id}/600/800`} 
                alt={product.name} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-card/90 backdrop-blur-md text-pink-600 font-black border-none shadow-lg px-3 flex items-center gap-1.5">
                  {product.stock}
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" className="rounded-full bg-card/80 backdrop-blur-md text-foreground hover:bg-card border-none shadow-sm h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-2xl p-2 border-none shadow-xl">
                    <DropdownMenuItem className="rounded-xl font-bold gap-2"><Edit2 className="h-4 w-4" /> Edit Details</DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl font-bold gap-2"><ImageIcon className="h-4 w-4" /> Update Photos</DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl font-bold gap-2 text-red-500"><Trash2 className="h-4 w-4" /> Remove SKU</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <CardHeader className="p-6 pb-4">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="text-[9px] font-black uppercase tracking-widest bg-pink-50 text-pink-600 border-none">{product.category}</Badge>
                <span className="text-pink-600 font-black">{product.price}</span>
              </div>
              <CardTitle className="text-lg font-bold group-hover:text-pink-600 transition-colors leading-tight line-clamp-1">{product.name}</CardTitle>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">SKU: {product.code}</p>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-border pt-4 mt-2">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${product.status === 'Available' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                <span className="text-[10px] font-bold text-muted-foreground uppercase">{product.status}</span>
              </div>
              <Button size="sm" variant="ghost" className="h-7 text-[9px] font-black uppercase px-2 hover:bg-pink-50 text-pink-600">Track Sales</Button>
            </CardContent>
          </Card>
        ))}
        <button className="rounded-[2.5rem] border-4 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center p-8 text-center gap-4 hover:bg-card hover:border-pink-200 transition-all cursor-pointer group min-h-[300px]">
          <div className="h-16 w-16 bg-card rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <Plus className="h-8 w-8 text-pink-600" />
          </div>
          <div className="space-y-1">
            <p className="font-black text-xl text-foreground">New Item</p>
            <p className="text-sm text-muted-foreground font-medium px-4">Register a new modest design or accessory SKU</p>
          </div>
        </button>
      </div>
    </div>
  );
}
