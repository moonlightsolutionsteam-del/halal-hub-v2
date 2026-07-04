
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Plus, Search, Filter, Edit2,
  Trash2, Eye, MoreVertical, Layers,
  CircleDollarSign, ShieldCheck, Tag,
  Scale, CheckCircle2, TrendingUp,
  Award, Globe, Landmark
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function FinanceProductsPage() {
  const [showGlobalCertsModal, setShowGlobalCertsModal] = useState(false)
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [showAddOfferingModal, setShowAddOfferingModal] = useState(false)
  const [showFilterModal, setShowFilterModal] = useState(false)

  const products = [
    { id: 1, name: "Real Estate Sukuk (Tier 1)", category: "Investments", return: "8.4% - 12.5%", status: "Active", risk: "Moderate", code: "PROD-SK-01" },
    { id: 2, name: "Shariah Savings Account", category: "Banking", return: "Profit Sharing", status: "Active", risk: "Low", code: "PROD-SV-42" },
    { id: 3, name: "SME Mudarabah Growth", category: "Business", return: "Variable", status: "Closed", risk: "High", code: "PROD-MG-08" },
    { id: 4, name: "Global Equity Halal Fund", category: "Equities", return: "Market Linked", status: "Active", risk: "Moderate", code: "PROD-EQ-12" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-[10px]">
            <CircleDollarSign className="h-3 w-3" /> Catalog Registry
          </div>
          <h1 className="text-3xl font-black font-headline text-foreground">Financial Products</h1>
          <p className="text-muted-foreground font-medium">Manage your institution's Shariah-compliant banking and investment offerings.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12" onClick={() => setShowGlobalCertsModal(true)}>
            <Award className="mr-2 h-4 w-4" /> Global Certs
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-full px-8 font-black shadow-lg shadow-indigo-200 h-12 text-white" onClick={() => setShowAddProductModal(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add New Product
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-[2rem] shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products by name or SKU..." className="pl-9 h-11 rounded-2xl bg-muted border-none font-medium" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-4 py-2 rounded-full cursor-pointer bg-indigo-50 text-indigo-600 border-none">All Types</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer border-border">Investments</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer border-border">Banking</Badge>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowFilterModal(true)}><Filter className="h-4 w-4 text-muted-foreground" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {products.map((product) => (
          <Card key={product.id} className="group rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-indigo-100">
            <div className="p-8 flex flex-col sm:flex-row gap-8">
              <div className="relative h-32 w-full sm:w-32 rounded-[2rem] bg-indigo-50 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-700">
                <Landmark className="h-12 w-12 text-indigo-600 opacity-40" />
                <Badge className="absolute -top-2 -right-2 bg-card text-indigo-600 font-black border-2 border-indigo-50 text-[8px] h-6 px-2 flex items-center shadow-lg">NEW</Badge>
              </div>
              <div className="flex-1 space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="text-[9px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-600 border-none">{product.category}</Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="rounded-full h-8 w-8"><MoreVertical className="h-4 w-4 text-muted-foreground" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-2xl p-2 border-none shadow-xl">
                        <DropdownMenuItem className="rounded-xl font-bold gap-2"><Edit2 className="h-4 w-4" /> Edit Terms</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl font-bold gap-2"><ShieldCheck className="h-4 w-4" /> Update Fatwa</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl font-bold gap-2 text-red-500"><Trash2 className="h-4 w-4" /> Deactivate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h3 className="text-2xl font-black text-foreground tracking-tight leading-tight">{product.name}</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                      <TrendingUp className="h-3 w-3" /> Yield: {product.return}
                    </div>
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">SKU: {product.code}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <div className="flex items-center gap-2">
                    <Badge className={product.risk === 'Low' ? 'bg-emerald-50 text-emerald-600 border-none' : (product.risk === 'Moderate' ? 'bg-indigo-50 text-indigo-600 border-none' : 'bg-amber-50 text-amber-600 border-none')}>
                      {product.risk} Risk
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${product.status === 'Active' ? 'bg-emerald-500' : 'bg-muted'}`} />
                    <span className="text-[10px] font-black text-muted-foreground uppercase">{product.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}

        <button className="rounded-[2.5rem] border-4 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center p-12 text-center gap-4 hover:bg-card hover:border-indigo-200 transition-all cursor-pointer group min-h-[250px]" onClick={() => setShowAddOfferingModal(true)}>
          <div className="h-16 w-16 bg-card rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <Plus className="h-8 w-8 text-indigo-600" />
          </div>
          <div className="space-y-1">
            <p className="font-black text-xl text-foreground">Add New Offering</p>
            <p className="text-sm text-muted-foreground font-medium px-4">Register a new Shariah-compliant financial instrument</p>
          </div>
        </button>
      </div>

      {/* Global Certs Modal */}
      <Dialog open={showGlobalCertsModal} onOpenChange={setShowGlobalCertsModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Global Certifications</DialogTitle>
            <DialogDescription>View and manage your institution's international Shariah and regulatory certifications.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            {[
              { label: "AAOIFI Compliance Seal", status: "Verified", expiry: "Jun 2025" },
              { label: "Shariah Board Charter", status: "Active", expiry: "Dec 2024" },
              { label: "IFSB Risk Framework", status: "Pending Renewal", expiry: "Mar 2025" },
            ].map((cert, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-2xl">
                <div>
                  <p className="text-sm font-black text-foreground">{cert.label}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Expiry: {cert.expiry}</p>
                </div>
                <Badge className={cert.status === 'Verified' || cert.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-none text-[9px] font-black uppercase' : 'bg-amber-50 text-amber-600 border-none text-[9px] font-black uppercase'}>
                  {cert.status}
                </Badge>
              </div>
            ))}
            <Button className="w-full h-12 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setShowGlobalCertsModal(false)}>Request New Certification</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add New Product Modal */}
      <Dialog open={showAddProductModal} onOpenChange={setShowAddProductModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Add New Product</DialogTitle>
            <DialogDescription>Register a new Shariah-compliant financial product to your catalog.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Product Name</Label>
              <Input placeholder="e.g. Real Estate Sukuk Tier 2" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Category</Label>
              <Select>
                <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="investments">Investments</SelectItem>
                  <SelectItem value="banking">Banking</SelectItem>
                  <SelectItem value="business">Business Finance</SelectItem>
                  <SelectItem value="equities">Equities</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Expected Return / Yield</Label>
              <Input placeholder="e.g. 8.4% - 12.5%" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Risk Level</Label>
              <Select>
                <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Shariah Fatwa Reference</Label>
              <Input placeholder="e.g. SB-FATWA-2024-12" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setShowAddProductModal(false)}>Register Product</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add New Offering Modal (from card button) */}
      <Dialog open={showAddOfferingModal} onOpenChange={setShowAddOfferingModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Add New Offering</DialogTitle>
            <DialogDescription>Register a new Shariah-compliant financial instrument to your offerings catalog.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Instrument Name</Label>
              <Input placeholder="e.g. Green Sukuk Bond" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Instrument Type</Label>
              <Select>
                <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="sukuk">Sukuk</SelectItem>
                  <SelectItem value="mudarabah">Mudarabah</SelectItem>
                  <SelectItem value="murabaha">Murabaha</SelectItem>
                  <SelectItem value="ijara">Ijara</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Minimum Investment (₹)</Label>
              <Input placeholder="e.g. 50,000" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Description</Label>
              <Textarea placeholder="Brief description of the financial instrument..." className="rounded-2xl bg-muted border-none font-bold resize-none" rows={3} />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setShowAddOfferingModal(false)}>Add Offering</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Filter Modal */}
      <Dialog open={showFilterModal} onOpenChange={setShowFilterModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Filter Products</DialogTitle>
            <DialogDescription>Narrow down your product catalog by category, risk, and status.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Category</Label>
              <Select>
                <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="investments">Investments</SelectItem>
                  <SelectItem value="banking">Banking</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="equities">Equities</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Risk Level</Label>
              <Select>
                <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                  <SelectValue placeholder="All risk levels" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Status</Label>
              <Select>
                <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setShowFilterModal(false)}>Apply Filters</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
