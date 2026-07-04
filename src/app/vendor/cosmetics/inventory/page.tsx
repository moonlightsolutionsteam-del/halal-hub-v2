
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Package, Search, Filter, Plus, 
  AlertCircle, History, ShieldCheck,
  CheckCircle2, Box, Layers, ArrowUpRight,
  TrendingUp, Timer, Scale, RefreshCcw
} from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function CosmeticsInventoryPage() {
  const stock = [
    { id: "SKU-C01", name: "Hydrating Glow Serum", category: "Skincare", stock: "120 Units", status: "Healthy", trend: "+12%" },
    { id: "SKU-C02", name: "Mineral Foundation (Shade 04)", category: "Makeup", stock: "45 Units", status: "Low Stock", trend: "-5%" },
    { id: "SKU-C03", name: "Rose Water Toner", category: "Skincare", stock: "8 Units", status: "Critical", trend: "+24%" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-rose-600 font-black uppercase tracking-widest text-[10px]">
            <Package className="h-3 w-3" /> Supply Chain Hub
          </div>
          <h1 className="text-3xl font-black font-headline text-foreground">Inventory & Stock</h1>
          <p className="text-muted-foreground font-medium">Manage beauty product SKU levels, restock alerts, and shelf-life tracking.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            <RefreshCcw className="mr-2 h-4 w-4" /> Sync Inventory
          </Button>
          <Button className="bg-rose-600 hover:bg-rose-700 rounded-full px-8 font-black shadow-lg shadow-rose-200 h-12 text-white">
            <Plus className="mr-2 h-4 w-4" /> Bulk Stock In
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total SKUs", value: "42", icon: Layers, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Low Stock", value: "5", icon: AlertCircle, color: "text-rose-600", bg: "bg-rose-50" },
          { label: "Shelf Audits", value: "Pass", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Monthly Sales", value: "1.2k", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
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
                <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">SKU Code</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Product Name</TableHead>
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
                    <p className="text-[10px] font-black text-rose-600 uppercase">{item.category}</p>
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
