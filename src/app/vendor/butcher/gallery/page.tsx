"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Camera, Upload, Trash2, Plus,
  ImageIcon, GripVertical, CheckCircle2,
  Layout, Eye, Star, Save
} from "lucide-react";
import Image from "next/image";

export default function ButcherGalleryPage() {
  const [showEditLayoutModal, setShowEditLayoutModal] = useState(false)
  const [showAddPhotosModal, setShowAddPhotosModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showDeletePhotoModal, setShowDeletePhotoModal] = useState(false)
  const [showSetPrimaryModal, setShowSetPrimaryModal] = useState(false)
  const [showBookStudioModal, setShowBookStudioModal] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<{ label: string; category: string } | null>(null)

  const photos = [
    { id: 1, label: "Main Storefront", img: "https://picsum.photos/seed/butcher-ext/800/600", primary: true, category: "Shop Exterior" },
    { id: 2, label: "Fresh Cuts Display", img: "https://picsum.photos/seed/butcher-disp/800/600", primary: false, category: "Meat Display" },
    { id: 3, label: "Uniformed Staff", img: "https://picsum.photos/seed/butcher-staff/800/600", primary: false, category: "Team" },
    { id: 4, label: "Clean Cutting Area", img: "https://picsum.photos/seed/butcher-clean/800/600", primary: false, category: "Internal" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-red-600 font-black uppercase tracking-widest text-[10px]">
            <Camera className="h-3 w-3" /> Visual Branding
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Media Gallery</h1>
          <p className="text-muted-foreground font-medium">Showcase your shop's cleanliness, meat quality, and professional staff.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowEditLayoutModal(true)} className="rounded-full px-6 font-bold border-2 h-12">
            <Layout className="mr-2 h-4 w-4" /> Edit Layout
          </Button>
          <Button onClick={() => setShowAddPhotosModal(true)} className="bg-red-600 hover:bg-red-700 rounded-full px-8 font-black shadow-lg shadow-red-200 h-12 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add New Photos
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {photos.map((photo) => (
              <Card key={photo.id} className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden group hover:shadow-xl transition-all border-2 border-transparent hover:border-red-100">
                <div className="relative aspect-video">
                  <Image src={photo.img} alt={photo.label} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {photo.primary && (
                      <Badge className="bg-red-600 text-white border-none px-3 font-black text-[9px] uppercase tracking-widest shadow-xl">PRIMARY PHOTO</Badge>
                    )}
                    <Badge className="bg-card/90 backdrop-blur-md text-foreground border-none px-3 font-black text-[9px] uppercase tracking-widest shadow-xl">{photo.category}</Badge>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="icon" variant="secondary" className="rounded-xl h-10 w-10"><GripVertical className="h-4 w-4" /></Button>
                    <Button size="icon" variant="destructive" onClick={() => { setSelectedPhoto(photo); setShowDeletePhotoModal(true); }} className="rounded-xl h-10 w-10"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="p-6 flex items-center justify-between">
                  <p className="font-black text-foreground">{photo.label}</p>
                  {!photo.primary && (
                    <Button variant="ghost" size="sm" onClick={() => { setSelectedPhoto(photo); setShowSetPrimaryModal(true); }} className="text-[10px] font-black uppercase text-red-600 p-0 h-auto hover:bg-transparent hover:underline">Set as primary</Button>
                  )}
                </div>
              </Card>
            ))}

            <button onClick={() => setShowUploadModal(true)} className="rounded-[2.5rem] border-4 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center p-12 text-center gap-4 hover:bg-card hover:border-red-200 transition-all cursor-pointer group min-h-[250px]">
              <div className="h-16 w-16 bg-card rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Upload className="h-8 w-8 text-red-600" />
              </div>
              <div className="space-y-1">
                <p className="font-black text-xl text-foreground">Upload More</p>
                <p className="text-sm text-muted-foreground font-medium">Add photos or short shop reels</p>
              </div>
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 space-y-6">
            <h3 className="text-xl font-black">Visual Integrity</h3>
            <p className="text-sm text-muted-foreground font-medium leading-relaxed">
              High-quality photos of your fresh meat display increase customer conversion by up to 40%. Ensure your staff is pictured in clean, uniformed attire.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-card/5 p-4 rounded-2xl border border-white/10">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span className="text-xs font-bold text-white/80">HD Photos Recommended</span>
              </div>
              <div className="flex items-center gap-3 bg-card/5 p-4 rounded-2xl border border-white/10">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span className="text-xs font-bold text-white/80">Uniform Standards Met</span>
              </div>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-6">
            <h3 className="text-xl font-black text-foreground">Photography Service</h3>
            <p className="text-sm text-muted-foreground font-medium leading-relaxed">
              Need professional shots? Book a verified Halal Hub photographer to visit your shop and create high-fidelity menu visuals.
            </p>
            <Button variant="outline" onClick={() => setShowBookStudioModal(true)} className="w-full rounded-2xl h-14 border-2 font-black text-xs uppercase tracking-widest border-red-100 text-red-600 hover:bg-red-50">
              Book Studio Session
            </Button>
          </Card>
        </div>
      </div>

      {/* Edit Layout Modal */}
      <Dialog open={showEditLayoutModal} onOpenChange={setShowEditLayoutModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Edit Gallery Layout</DialogTitle>
            <DialogDescription>Choose how your photos are displayed to customers on your shop page.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Layout Style</Label>
              <Input placeholder="e.g. Grid, Masonry, Carousel" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Photos Per Row</Label>
              <Input placeholder="e.g. 2, 3, 4" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Featured Section Title</Label>
              <Input placeholder="e.g. Our Shop, Fresh Cuts" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowEditLayoutModal(false)}>Save Layout</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add New Photos Modal */}
      <Dialog open={showAddPhotosModal} onOpenChange={setShowAddPhotosModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Add New Photos</DialogTitle>
            <DialogDescription>Upload new images to your shop's media gallery.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="border-4 border-dashed border-muted rounded-2xl p-8 text-center space-y-3 hover:border-red-200 transition-colors cursor-pointer">
              <Upload className="h-10 w-10 text-red-600 mx-auto" />
              <p className="font-black text-foreground">Click to upload photos</p>
              <p className="text-xs text-muted-foreground font-medium">JPG, PNG, WebP — max 10MB each</p>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Category</Label>
              <Input placeholder="e.g. Shop Exterior, Meat Display, Team" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Caption / Label</Label>
              <Input placeholder="e.g. Fresh morning display" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowAddPhotosModal(false)}>Upload Photos</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload More Modal */}
      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Upload Photos or Reels</DialogTitle>
            <DialogDescription>Add more visual content to your gallery.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="border-4 border-dashed border-muted rounded-2xl p-8 text-center space-y-3 hover:border-red-200 transition-colors cursor-pointer">
              <Upload className="h-10 w-10 text-red-600 mx-auto" />
              <p className="font-black text-foreground">Drag & drop or click to browse</p>
              <p className="text-xs text-muted-foreground font-medium">Photos (JPG/PNG) or Reels (MP4) — max 50MB</p>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Media Type</Label>
              <Input placeholder="e.g. Photo, Short Reel, 360 View" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Caption</Label>
              <Input placeholder="e.g. Our halal slaughter process" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowUploadModal(false)}>Upload</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Photo Confirmation Modal */}
      <Dialog open={showDeletePhotoModal} onOpenChange={setShowDeletePhotoModal}>
        <DialogContent className="rounded-[2rem] max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Delete Photo</DialogTitle>
            <DialogDescription>Are you sure you want to remove "<strong>{selectedPhoto?.label}</strong>" from your gallery? This cannot be undone.</DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1 h-12 rounded-2xl font-black" onClick={() => setShowDeletePhotoModal(false)}>Cancel</Button>
            <Button className="flex-1 h-12 rounded-2xl font-black bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowDeletePhotoModal(false)}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Set as Primary Modal */}
      <Dialog open={showSetPrimaryModal} onOpenChange={setShowSetPrimaryModal}>
        <DialogContent className="rounded-[2rem] max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Set as Primary Photo</DialogTitle>
            <DialogDescription>Make "<strong>{selectedPhoto?.label}</strong>" the main photo shown on your shop profile.</DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1 h-12 rounded-2xl font-black" onClick={() => setShowSetPrimaryModal(false)}>Cancel</Button>
            <Button className="flex-1 h-12 rounded-2xl font-black bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowSetPrimaryModal(false)}>Set Primary</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Book Studio Session Modal */}
      <Dialog open={showBookStudioModal} onOpenChange={setShowBookStudioModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Book Studio Session</DialogTitle>
            <DialogDescription>Schedule a professional photographer to visit your shop for high-quality visuals.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Preferred Date</Label>
              <Input placeholder="e.g. 15 July 2026" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Preferred Time</Label>
              <Input placeholder="e.g. 10:00 AM – 12:00 PM" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Type of Shoot</Label>
              <Input placeholder="e.g. Product cuts, Staff, Shop interior" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Special Requirements</Label>
              <Input placeholder="e.g. Need 360 shots, drone shots preferred" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowBookStudioModal(false)}>Book Session</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
