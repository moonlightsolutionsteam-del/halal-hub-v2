
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, Search, Filter, Edit2, 
  Trash2, Eye, MoreVertical, Sparkles,
  ShieldCheck, Beaker, Zap, Scale
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function CosmeticsProductsPage() {
  const products = [
    { id: 1, name: "Hydrating Glow Serum", category: "Skincare", price: "₹1,450", status: "Available", stock: "120 Units", code: "CS-SR-01" },
    { id: 2, name: "Mineral Velvet Foundation", category: "Makeup", price: "₹2,100", status: "Available", stock: "85 Units", code: "CS-MF-42" },
    { id: 3, name: "Organic Rose Water Toner", category: "Skincare", price: "₹850", status: "Low Stock", stock: "12 Units", code: "CS-TN-08" },
    { id: 4, name: "Oud & Silk Fragrance", category: "Personal Care", price: "₹4,800", status: "Available", stock: "45 Units", code: "CS-FG-12" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-rose-600 font-black uppercase tracking-widest text-[10px]">
            <Sparkles className="h-3 w-3" /> Formulation Registry
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Product Catalog</h1>
          <p className="text-muted-foreground font-medium">Manage your halal beauty formulations, stock levels, and lab certifications.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            Ingredient Check
          </Button>
          <Button className="bg-rose-600 hover:bg-rose-700 rounded-full px-8 font-black shadow-lg shadow-rose-200 h-12 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add New Item
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[2rem] shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search items by name or SKU..." className="pl-9 h-11 rounded-2xl bg-slate-50 border-none font-medium" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-4 py-2 rounded-full cursor-pointer bg-rose-50 text-rose-600 border-none">All Styles</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer border-slate-200">Skincare</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer border-slate-200">Makeup</Badge>
          <Button variant="ghost" size="icon" className="rounded-full"><Filter className="h-4 w-4 text-slate-400" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-rose-100">
            <div className="relative aspect-square">
              <Image 
                src={`https://picsum.photos/seed/cosmetic-item${product.id}/600/600`} 
                alt={product.name} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-white/90 backdrop-blur-md text-rose-600 font-black border-none shadow-lg px-3 flex items-center gap-1.5">
                  <Scale className="h-3 w-3" /> {product.stock}
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" className="rounded-full bg-white/80 backdrop-blur-md text-slate-800 hover:bg-white border-none shadow-sm h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-2xl p-2 border-none shadow-xl">
                    <DropdownMenuItem className="rounded-xl font-bold gap-2"><Edit2 className="h-4 w-4" /> Edit Formulation</DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl font-bold gap-2"><ShieldCheck className="h-4 w-4" /> Update Lab Cert</DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl font-bold gap-2 text-red-500"><Trash2 className="h-4 w-4" /> Deactivate SKU</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <CardHeader className="p-6 pb-4">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="text-[9px] font-black uppercase tracking-widest bg-rose-50 text-rose-600 border-none">{product.category}</Badge>
                <span className="text-rose-600 font-black">{product.price}</span>
              </div>
              <CardTitle className="text-lg font-bold group-hover:text-rose-600 transition-colors leading-tight line-clamp-1">{product.name}</CardTitle>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">SKU: {product.code}</p>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-slate-50 pt-4 mt-2">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${product.status === 'Available' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                <span className="text-[10px] font-bold text-muted-foreground uppercase">{product.status}</span>
              </div>
              <Button size="sm" variant="ghost" className="h-7 text-[9px] font-black uppercase px-2 hover:bg-rose-50 text-rose-600">Audit Logs</Button>
            </CardContent>
          </Card>
        ))}
        <button className="rounded-[2.5rem] border-4 border-dashed border-slate-100 bg-slate-50/30 flex flex-col items-center justify-center p-8 text-center gap-4 hover:bg-white hover:border-rose-200 transition-all cursor-pointer group min-h-[300px]">
          <div className="h-16 w-16 bg-white rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <Plus className="h-8 w-8 text-rose-600" />
          </div>
          <div className="space-y-1">
            <p className="font-black text-xl text-slate-900">Add Product</p>
            <p className="text-sm text-slate-400 font-medium px-4">Register a new beauty formulation or personal care SKU</p>
          </div>
        </button>
      </div>
    </div>
  );
}
