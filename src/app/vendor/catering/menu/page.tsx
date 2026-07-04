
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  Plus, Search, Filter, Edit2,
  Trash2, Eye, MoreVertical, Layers,
  Utensils, CookingPot, ShieldCheck, Tag,
  ChevronRight, Scale, Info
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function CateringMenuPage() {
  const [showGlobalSettingsModal, setShowGlobalSettingsModal] = useState(false)
  const [showNewPackageModal, setShowNewPackageModal] = useState(false)
  const [showAddPackageModal, setShowAddPackageModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const packages = [
    { id: 1, name: "Grand Nikah Package", type: "Full Service", price: "₹1,200/head", status: "Active", items: 12, rating: 4.9 },
    { id: 2, name: "Corporate Lunch Box", type: "Drop-off", price: "₹450/head", status: "Active", items: 5, rating: 4.7 },
    { id: 3, name: "Gourmet BBQ Platter", type: "Live Station", price: "₹950/head", status: "Low Availability", items: 8, rating: 4.8 },
    { id: 4, name: "Afternoon Tea Set", type: "Boutique", price: "₹650/head", status: "Active", items: 15, rating: 4.5 },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-[10px]">
            <Utensils className="h-3 w-3" /> Menu Engineering
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Catering Packages</h1>
          <p className="text-muted-foreground font-medium">Manage your event menus, tiered pricing, and specialized cuisine sets.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowGlobalSettingsModal(true)} className="rounded-full px-6 font-bold border-2 h-12">
            <Layers className="mr-2 h-4 w-4" /> Global Settings
          </Button>
          <Button onClick={() => setShowNewPackageModal(true)} className="bg-blue-600 hover:bg-blue-700 rounded-full px-8 font-black shadow-lg shadow-blue-200 h-12 text-white">
            <Plus className="mr-2 h-4 w-4" /> New Package
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-[2.5rem] shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search packages, cuisines..." className="pl-9 h-11 rounded-2xl bg-muted border-none" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-4 py-2 rounded-full cursor-pointer bg-blue-50 text-blue-600 border-none">All Types</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted border-border">Full Service</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted border-border">Live Station</Badge>
          <Button variant="ghost" size="icon" className="rounded-full"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="group rounded-[3rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-blue-100">
            <div className="p-8 flex gap-8">
              <div className="relative h-32 w-32 rounded-[2rem] overflow-hidden shrink-0 shadow-lg">
                <Image src={`https://picsum.photos/seed/catering-pkg-${pkg.id}/400/400`} alt={pkg.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none text-[9px] font-black uppercase tracking-tighter">
                      {pkg.type}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="rounded-full h-8 w-8"><MoreVertical className="h-4 w-4 text-muted-foreground" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-2xl p-2">
                        <DropdownMenuItem onClick={() => setShowEditModal(true)} className="rounded-xl font-bold gap-2"><Edit2 className="h-4 w-4" /> Edit Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setShowDeleteModal(true)} className="rounded-xl font-bold gap-2 text-red-500"><Trash2 className="h-4 w-4" /> Remove</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h3 className="text-2xl font-black text-foreground tracking-tight leading-tight">{pkg.name}</h3>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{pkg.items} Menu Items Included</p>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xl font-black text-blue-600">{pkg.price}</span>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${pkg.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <span className="text-[10px] font-black text-muted-foreground uppercase">{pkg.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}

        <button onClick={() => setShowAddPackageModal(true)} className="rounded-[3rem] border-4 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center p-12 text-center gap-4 hover:bg-card hover:border-blue-200 transition-all cursor-pointer group">
          <div className="h-16 w-16 bg-card rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <Plus className="h-8 w-8 text-blue-600" />
          </div>
          <div className="space-y-1">
            <p className="font-black text-xl text-foreground">Add New Package</p>
            <p className="text-sm text-muted-foreground font-medium">Create a tiered menu for specific events</p>
          </div>
        </button>
      </div>

      {/* Global Settings Modal */}
      <Dialog open={showGlobalSettingsModal} onOpenChange={setShowGlobalSettingsModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Global Menu Settings</DialogTitle>
            <DialogDescription>Configure default settings for all catering packages.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Default Service Style</Label>
              <Input placeholder="e.g. Full Service, Buffet" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Minimum Guest Count</Label>
              <Input placeholder="e.g. 50" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Halal Certification Number</Label>
              <Input placeholder="e.g. HH-CERT-00123" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowGlobalSettingsModal(false)}>Save Settings</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Package Modal */}
      <Dialog open={showNewPackageModal} onOpenChange={setShowNewPackageModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">New Package</DialogTitle>
            <DialogDescription>Create a new catering package for your menu.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Package Name</Label>
              <Input placeholder="e.g. Grand Nikah Package" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Service Type</Label>
              <Input placeholder="e.g. Full Service, Drop-off" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Price Per Head (₹)</Label>
              <Input placeholder="e.g. 1200" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Number of Menu Items</Label>
              <Input placeholder="e.g. 12" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowNewPackageModal(false)}>Create Package</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Package (dashed button) Modal */}
      <Dialog open={showAddPackageModal} onOpenChange={setShowAddPackageModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Add New Package</DialogTitle>
            <DialogDescription>Create a tiered menu for a specific event type.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Package Name</Label>
              <Input placeholder="e.g. Afternoon Tea Set" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Service Type</Label>
              <Input placeholder="e.g. Boutique, Live Station" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Price Per Head (₹)</Label>
              <Input placeholder="e.g. 650" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowAddPackageModal(false)}>Add Package</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Package Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Edit Package</DialogTitle>
            <DialogDescription>Update the details of this catering package.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Package Name</Label>
              <Input placeholder="Package name" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Price Per Head (₹)</Label>
              <Input placeholder="Price" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Status</Label>
              <Input placeholder="e.g. Active, Low Availability" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowEditModal(false)}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="rounded-[2rem] max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Remove Package</DialogTitle>
            <DialogDescription>Are you sure you want to remove this package? This action cannot be undone.</DialogDescription>
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
