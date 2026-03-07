
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  UtensilsCrossed, Search, Filter, MoreHorizontal, 
  ShieldCheck, MapPin, Star, AlertTriangle,
  CheckCircle2, XCircle, MoreVertical, Eye,
  Building2, ArrowUpRight
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export default function AdminRestaurantsPage() {
  const restaurants = [
    { id: 1, name: "The Bosphorus Kitchen", cuisine: "Turkish", location: "Manhattan, NY", rating: 4.8, status: "Verified", trust: 98 },
    { id: 2, name: "Al-Zaeem Shawarma", cuisine: "Arabic", location: "Brooklyn, NY", rating: 4.5, status: "Verified", trust: 92 },
    { id: 3, name: "Istanbul Bistro", cuisine: "Turkish", location: "Queens, NY", rating: 4.9, status: "Pending", trust: 0 },
    { id: 4, name: "Curry House Express", cuisine: "Indian", location: "Jersey City, NJ", rating: 4.2, status: "Flagged", trust: 65 },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-headline">Restaurant Management</h1>
          <p className="text-muted-foreground font-medium">Audit listings, manage verifications, and monitor reported eateries.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2">Bulk Audit</Button>
          <Button className="bg-primary rounded-full px-8 font-bold shadow-lg shadow-primary/20">Add Partner</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Listings", value: "1,240", color: "text-slate-900" },
          { label: "Verified Hubs", value: "842", color: "text-primary" },
          { label: "Pending Audit", value: "15", color: "text-amber-500" },
          { label: "Reported", value: "3", color: "text-red-500" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl p-4">
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{stat.label}</p>
            <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
        <CardHeader className="p-8 border-b space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search restaurants by name or area..." className="pl-9 h-12 rounded-2xl bg-muted/30 border-none" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="font-bold gap-2"><Filter className="h-4 w-4" /> Filters</Button>
              <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px] px-3 h-8 flex items-center">Verified Only</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/10">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="px-8 h-14 font-black text-xs uppercase text-muted-foreground">Establishment</TableHead>
                <TableHead className="h-14 font-black text-xs uppercase text-muted-foreground">Cuisine</TableHead>
                <TableHead className="h-14 font-black text-xs uppercase text-muted-foreground">Trust Score</TableHead>
                <TableHead className="h-14 font-black text-xs uppercase text-muted-foreground">Status</TableHead>
                <TableHead className="h-14 text-right px-8 font-black text-xs uppercase text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {restaurants.map((res) => (
                <TableRow key={res.id} className="hover:bg-muted/5 border-muted/20">
                  <TableCell className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-slate-100 rounded-xl flex items-center justify-center text-primary shadow-inner">
                        <Building2 className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-black text-slate-900">{res.name}</p>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground">
                          <MapPin className="h-3 w-3" /> {res.location}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="rounded-full px-4 font-black uppercase text-[9px] tracking-widest">
                      {res.cuisine}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-700">{res.trust}%</span>
                        <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${res.trust > 90 ? 'bg-emerald-500' : (res.trust > 70 ? 'bg-amber-500' : 'bg-red-500')} rounded-full`} style={{ width: `${res.trust}%` }} />
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      res.status === 'Verified' ? 'bg-emerald-500' : 
                      res.status === 'Pending' ? 'bg-amber-500' : 'bg-red-500'
                    }>
                      {res.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full"><MoreHorizontal className="h-5 w-5" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-2xl p-2 border-none shadow-xl">
                        <DropdownMenuItem className="rounded-xl font-bold gap-2"><ShieldCheck className="h-4 w-4" /> Review Audit</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl font-bold gap-2"><Eye className="h-4 w-4" /> View Publicly</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl font-bold gap-2 text-red-500"><XCircle className="h-4 w-4" /> Suspend Listing</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <AlertTriangle className="h-32 w-32" />
        </div>
        <div className="relative z-10 space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-black font-headline tracking-tight">Recent Safety Reports</h3>
            <p className="text-sm text-slate-400 font-medium">There are 3 restaurants currently flagged for Shariah compliance reviews.</p>
          </div>
          <Button variant="secondary" className="rounded-2xl h-12 px-8 font-black uppercase text-xs tracking-widest">
            Launch Compliance Console <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
