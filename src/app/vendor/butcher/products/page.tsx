"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
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
  const [showAddCutModal, setShowAddCutModal] = useState(false)
  const [showCategoriesModal, setShowCategoriesModal] = useState(false)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showLogsModal, setShowLogsModal] = useState(false)
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<{ name: string } | null>(null)

  const products = [
    { id: 1, name: "Premium Mutton Curry Cut", category: "Mutton", price: "₹850/kg", status: "Available", source: "Local Farm", stock: "45kg" },
    { id: 2, name: "Fresh Chicken Boneless", category: "Poultry", price: "₹420/kg", status: "Available", source: "HMC Verified", stock: "120kg" },
    { id: 3, name: "Prime Beef Ribs", category: "Beef", price: "₹950/kg", status: "Low Stock", source: "Organic Farm", stock: "5kg" },
    { id: 4, name: "Marinated Mutton Chops", category: "Marinated", price: "₹1,200/kg", status: "Available", source: "House Recipe", stock: "15kg" },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <ShieldCheck className="h-3 w-3" /> Inventory Control
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Meat Inventory</h1>
          <p className="text-muted-foreground font-medium">Manage stock levels, sourcing logs, and pricing for your cuts.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowCategoriesModal(true)} className="rounded-full px-6 font-bold border-2">
            <Layers className="mr-2 h-4 w-4" /> Categories
          </Button>
          <Button onClick={() => setShowAddCutModal(true)} className="bg-primary rounded-full px-8 font-black shadow-lg shadow-primary/20 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add New Cut
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search mutton, beef, chicken..." className="pl-9 h-11 rounded-2xl bg-card border-none shadow-sm" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-4 py-2 rounded-full cursor-pointer hover:bg-primary hover:text-white">All Stock</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted">Mutton</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted">Beef</Badge>
          <Button variant="ghost" size="icon" onClick={() => setShowFilterModal(true)} className="rounded-full"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-xl transition-all duration-500">
            <div className="relative aspect-square">
              <Image
                src={`https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400/400`}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-card/90 backdrop-blur-md text-primary font-black border-none shadow-lg px-3 flex items-center gap-1.5">
                  <Scale className="h-3 w-3" /> {product.stock}
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" className="rounded-full bg-card/80 backdrop-blur-md text-foreground hover:bg-card border-none shadow-sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-2xl p-2 border-none shadow-xl">
                    <DropdownMenuItem onClick={() => { setSelectedProduct(product); setShowEditModal(true); }} className="rounded-xl font-bold gap-2"><Edit2 className="h-4 w-4" /> Edit Details</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { setSelectedProduct(product); setShowLogsModal(true); }} className="rounded-xl font-bold gap-2"><ShieldCheck className="h-4 w-4" /> Update Logs</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { setSelectedProduct(product); setShowDeleteModal(true); }} className="rounded-xl font-bold gap-2 text-red-500"><Trash2 className="h-4 w-4" /> Remove</DropdownMenuItem>
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
              <Button size="sm" variant="ghost" onClick={() => { setSelectedProduct(product); setShowLogsModal(true); }} className="h-7 text-[9px] font-black uppercase px-2 hover:bg-muted">Log Audit</Button>
            </CardContent>
          </Card>
        ))}
        <button onClick={() => setShowAddProductModal(true)} className="rounded-[2.5rem] border-4 border-dashed border-muted hover:border-primary/40 hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-4 text-muted-foreground hover:text-primary p-8 min-h-[300px]">
          <div className="h-16 w-16 rounded-3xl bg-muted/50 flex items-center justify-center">
            <Plus className="h-8 w-8" />
          </div>
          <div className="text-center">
            <p className="font-black text-lg">Add Product</p>
            <p className="text-xs font-medium px-4 leading-snug">Register a new meat cut or marinated item</p>
          </div>
        </button>
      </div>

      {/* Add New Cut Modal */}
      <Dialog open={showAddCutModal} onOpenChange={setShowAddCutModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Add New Cut</DialogTitle>
            <DialogDescription>Register a new meat cut or marinated item to your inventory.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Product Name</Label>
              <Input placeholder="e.g. Premium Mutton Curry Cut" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Category</Label>
              <Input placeholder="e.g. Mutton, Beef, Poultry, Marinated" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Price per kg (₹)</Label>
              <Input placeholder="e.g. 850" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Stock Available (kg)</Label>
              <Input placeholder="e.g. 45" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Source / Farm</Label>
              <Input placeholder="e.g. HMC Certified, Local Farm" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-primary" onClick={() => setShowAddCutModal(false)}>Add Cut</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Product (card button) Modal */}
      <Dialog open={showAddProductModal} onOpenChange={setShowAddProductModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Add Product</DialogTitle>
            <DialogDescription>Register a new meat cut or marinated item to your inventory.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Product Name</Label>
              <Input placeholder="e.g. Chicken Wings" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Category</Label>
              <Input placeholder="e.g. Mutton, Beef, Poultry, Marinated" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Price per kg (₹)</Label>
              <Input placeholder="e.g. 380" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Stock Available (kg)</Label>
              <Input placeholder="e.g. 30" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-primary" onClick={() => setShowAddProductModal(false)}>Add Product</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Categories Modal */}
      <Dialog open={showCategoriesModal} onOpenChange={setShowCategoriesModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Manage Categories</DialogTitle>
            <DialogDescription>Add or remove product categories for your inventory.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">New Category Name</Label>
              <Input placeholder="e.g. Offal, Marinated, Special Cuts" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Description</Label>
              <Input placeholder="Brief description of this category" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-primary" onClick={() => setShowCategoriesModal(false)}>Save Category</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Filter Modal */}
      <Dialog open={showFilterModal} onOpenChange={setShowFilterModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Filter Products</DialogTitle>
            <DialogDescription>Narrow down your inventory view by category, status, or price.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Category</Label>
              <Input placeholder="e.g. Mutton, Beef, Poultry" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Availability Status</Label>
              <Input placeholder="Available, Low Stock, Out of Stock" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Price Range (₹/kg)</Label>
              <Input placeholder="e.g. 200 - 1000" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-primary" onClick={() => setShowFilterModal(false)}>Apply Filter</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Product Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Edit Product</DialogTitle>
            <DialogDescription>Update details for {selectedProduct?.name}.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Product Name</Label>
              <Input defaultValue={selectedProduct?.name} className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Price per kg (₹)</Label>
              <Input placeholder="e.g. 850" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Stock Available (kg)</Label>
              <Input placeholder="e.g. 45" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Source / Farm</Label>
              <Input placeholder="e.g. HMC Certified" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-primary" onClick={() => setShowEditModal(false)}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Audit Logs Modal */}
      <Dialog open={showLogsModal} onOpenChange={setShowLogsModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Audit Log</DialogTitle>
            <DialogDescription>Record sourcing and quality audit details for {selectedProduct?.name}.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Audit Date</Label>
              <Input placeholder="e.g. 04 July 2026" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Inspector Name</Label>
              <Input placeholder="e.g. HMC Inspector ID #4421" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Batch / Lot Number</Label>
              <Input placeholder="e.g. BATCH-2026-07" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Notes</Label>
              <Input placeholder="Any observations or issues..." className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-primary" onClick={() => setShowLogsModal(false)}>Save Log</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="rounded-[2rem] max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Remove Product</DialogTitle>
            <DialogDescription>Are you sure you want to remove <strong>{selectedProduct?.name}</strong> from your inventory? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1 h-12 rounded-2xl font-black" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button className="flex-1 h-12 rounded-2xl font-black bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowDeleteModal(false)}>Remove</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
