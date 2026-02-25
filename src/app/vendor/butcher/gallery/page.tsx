
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, Upload, Trash2, Plus, 
  ImageIcon, GripVertical, CheckCircle2,
  Layout, Eye, Star, Save
} from "lucide-react";
import Image from "next/image";

export default function ButcherGalleryPage() {
  const photos = [
    { id: 1, label: "Main Storefront", img: "https://picsum.photos/seed/butcher-ext/800/600", primary: true, category: "Shop Exterior" },
    { id: 2, label: "Fresh Cuts Display", img: "https://picsum.photos/seed/butcher-disp/800/600", primary: false, category: "Meat Display" },
    { id: 3, label: "Uniformed Staff", img: "https://picsum.photos/seed/butcher-staff/800/600", primary: false, category: "Team" },
    { id: 4, label: "Clean Cutting Area", img: "https://picsum.photos/seed/butcher-clean/800/600", primary: false, category: "Internal" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-red-600 font-black uppercase tracking-widest text-[10px]">
            <Camera className="h-3 w-3" /> Visual Branding
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Media Gallery</h1>
          <p className="text-muted-foreground font-medium">Showcase your shop's cleanliness, meat quality, and professional staff.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            <Layout className="mr-2 h-4 w-4" /> Edit Layout
          </Button>
          <Button className="bg-red-600 hover:bg-red-700 rounded-full px-8 font-black shadow-lg shadow-red-200 h-12 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add New Photos
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {photos.map((photo) => (
              <Card key={photo.id} className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden group hover:shadow-xl transition-all border-2 border-transparent hover:border-red-100">
                <div className="relative aspect-video">
                  <Image src={photo.img} alt={photo.label} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {photo.primary && (
                      <Badge className="bg-red-600 text-white border-none px-3 font-black text-[9px] uppercase tracking-widest shadow-xl">PRIMARY PHOTO</Badge>
                    )}
                    <Badge className="bg-white/90 backdrop-blur-md text-slate-900 border-none px-3 font-black text-[9px] uppercase tracking-widest shadow-xl">{photo.category}</Badge>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="icon" variant="secondary" className="rounded-xl h-10 w-10"><GripVertical className="h-4 w-4" /></Button>
                    <Button size="icon" variant="destructive" className="rounded-xl h-10 w-10"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="p-6 flex items-center justify-between">
                  <p className="font-black text-slate-900">{photo.label}</p>
                  {!photo.primary && (
                    <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase text-red-600 p-0 h-auto hover:bg-transparent hover:underline">Set as primary</Button>
                  )}
                </div>
              </Card>
            ))}
            
            <button className="rounded-[2.5rem] border-4 border-dashed border-slate-100 bg-slate-50/30 flex flex-col items-center justify-center p-12 text-center gap-4 hover:bg-white hover:border-red-200 transition-all cursor-pointer group min-h-[250px]">
              <div className="h-16 w-16 bg-white rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Upload className="h-8 w-8 text-red-600" />
              </div>
              <div className="space-y-1">
                <p className="font-black text-xl text-slate-900">Upload More</p>
                <p className="text-sm text-slate-400 font-medium">Add photos or short shop reels</p>
              </div>
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-8 space-y-6">
            <h3 className="text-xl font-black">Visual Integrity</h3>
            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              High-quality photos of your fresh meat display increase customer conversion by up to 40%. Ensure your staff is pictured in clean, uniformed attire.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span className="text-xs font-bold text-white/80">HD Photos Recommended</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span className="text-xs font-bold text-white/80">Uniform Standards Met</span>
              </div>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6">
            <h3 className="text-xl font-black text-slate-900">Photography Service</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Need professional shots? Book a verified Halal Hub photographer to visit your shop and create high-fidelity menu visuals.
            </p>
            <Button variant="outline" className="w-full rounded-2xl h-14 border-2 font-black text-xs uppercase tracking-widest border-red-100 text-red-600 hover:bg-red-50">
              Book Studio Session
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
