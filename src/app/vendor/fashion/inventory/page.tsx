"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Package, Search, Plus, AlertCircle,
  ShieldCheck, TrendingUp, RefreshCcw,
  Layers, ArrowUpRight, Shirt, Tag, Sparkles
} from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function FashionInventoryPage() {
  const stock = [
    { id: "FSH-01", name: "Classic Chiffon Hijab", category: "Hijabs", stock: "240 Units", status: "Healthy", trend: "+18%" },
    { id: "FSH-02", name: "Floral Printed Abaya", category: "Abayas", stock: "32 Units", status: "Low Stock", trend: "+5%" },
    { id: "FSH-03", name: "Modest Maxi Dress – Teal", category: "Dresses", stock: "6 Units", status: "Critical", trend: "+31%" },
    { id: "FSH-04", name: "Under-cap Multipack (5pcs)", category: "Accessories", stock: "180 Units", status: "Healthy", trend: "+8%" },
    { id: "FSH-05", name: "Luxury Wool Shawl", category: "Shawls", stock: "14 Units", status: "Low Stock", trend: "-3%" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-pink-600 font-black uppercase tracking-widest text-[10px]">
            <Package className="h-3 w-3" /> Stock Management
          </div>
          <h1 className="text-3xl font-black font-headline text-foreground">Collection Inventory</h1>
          <p className="text-muted-foreground font-medium">Track SKU levels, restock alerts, and season-end clearance for modest fashion.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            <RefreshCcw className="mr-2 h-4 w-4" /> Sync Stock
          </Button>
          <Button className="bg-pink-600 hover:bg-pink-700 rounded-full px-8 font-black shadow-lg shadow-pink-200 h-12 text-white">
            <Plus className="mr-2 h-4 w-4" /> Bulk Stock In
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total SKUs", value: "86", icon: Layers, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Low Stock", value: "7", icon: AlertCircle, color: "text-pink-600", bg: "bg-pink-50" },
          { label: "Stock Audit", value: "Pass", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Monthly Sales", value: "2.4k", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((stat, i) => (
          <Card key={i} className="rounded-3xl border-none shadow-sm p-6 bg-card flex items-center gap-4">
            <div className={`h-12 w-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-foreground">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 space-y-6 relative overflow-hidden">
          <Sparkles className="absolute -top-4 -right-4 h-24 w-24 opacity-10" />
          <div className="space-y-2 relative z-10">
            <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center">
              <Shirt className="h-5 w-5 text-pink-300" />
            </div>
            <p className="text-xs font-black uppercase tracking-widest opacity-70">Season Clearance</p>
            <h3 className="text-xl font-black leading-snug">Move aging stock with automated markdowns.</h3>
            <Button variant="secondary" className="w-full rounded-xl font-black text-[10px] uppercase h-10 mt-2 bg-pink-600 text-white border-none">
              Start Clearance
            </Button>
          </div>
        </Card>

        <Card className="lg:col-span-2 rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-4">
          <h3 className="text-lg font-black">Category Breakdown</h3>
          <div className="space-y-4">
            {[
              { label: "Hijabs & Underscarves", pct: 42, color: "bg-pink-600" },
              { label: "Abayas & Kaftans", pct: 28, color: "bg-purple-500" },
              { label: "Modest Dresses", pct: 18, color: "bg-blue-500" },
              { label: "Accessories", pct: 12, color: "bg-amber-500" },
            ].map((cat) => (
              <div key={cat.label} className="space-y-1.5">
                <div className="flex justify-between text-xs font-black text-muted-foreground">
                  <span>{cat.label}</span>
                  <span>{cat.pct}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card">
        <CardHeader className="p-8 border-b flex flex-col md:flex-row items-center justify-between gap-4">
          <CardTitle className="text-xl font-black">SKU Registry</CardTitle>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search SKU or name..." className="pl-9 h-11 rounded-2xl bg-muted border-none font-medium" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-none">
                <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">SKU</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Product</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">In Stock</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Demand</TableHead>
                <TableHead className="h-14 text-right px-8 font-black text-[10px] uppercase tracking-widest">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stock.map((item) => (
                <TableRow key={item.id} className="border-border hover:bg-muted/50 transition-colors group">
                  <TableCell className="px-8 py-5 font-black text-foreground text-xs">{item.id}</TableCell>
                  <TableCell>
                    <p className="font-bold text-foreground">{item.name}</p>
                    <p className="text-[10px] font-black text-pink-600 uppercase">{item.category}</p>
                  </TableCell>
                  <TableCell className="font-black text-foreground">{item.stock}</TableCell>
                  <TableCell className={`font-black text-xs ${item.trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {item.trend}
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <Badge className={
                      item.status === 'Healthy' ? 'bg-emerald-50 text-emerald-600 border-none font-black text-[9px] px-3' :
                      item.status === 'Low Stock' ? 'bg-amber-50 text-amber-600 border-none font-black text-[9px] px-3' :
                      'bg-rose-50 text-rose-600 border-none font-black text-[9px] px-3'
                    }>
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
