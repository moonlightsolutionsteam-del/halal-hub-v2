
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, Upload, Trash2, Plus, 
  ImageIcon, GripVertical, CheckCircle2,
  Layout, Eye, Star, Save, ShieldCheck,
  Sparkles
} from "lucide-react";
import Image from "next/image";

export default function CosmeticsGalleryPage() {
  const photos = [
    { id: 1, label: "Summer Glow Campaign", img: "https://picsum.photos/seed/cos-gal-1/800/1000", primary: true, category: "Main Campaign" },
    { id: 2, label: "Rose Water Texture", img: "https://picsum.photos/seed/cos-gal-2/800/1000", primary: false, category: "Product Detail" },
    { id: 3, label: "Lab Environment", img: "https://picsum.photos/seed/cos-gal-3/800/600", primary: false, category: "Behind the Scenes" },
    { id: 4, label: "Foundation Swatches", img: "https://picsum.photos/seed/cos-gal-4/800/600", primary: false, category: "Product Demo" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-rose-600 font-black uppercase tracking-widest text-[10px]">
            <Camera className="h-3 w-3" /> Visual Narrative
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Brand Visual Gallery</h1>
          <p className="text-muted-foreground font-medium">Showcase campaign imagery, ingredient textures, and lab purity walkthroughs.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            <Layout className="mr-2 h-4 w-4" /> Editorial Grid
          </Button>
          <Button className="bg-rose-600 hover:bg-rose-700 rounded-full px-8 font-black shadow-lg shadow-rose-200 h-12 text-white">
            <Plus className="mr-2 h-4 w-4" /> New Campaign
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {photos.map((photo) => (
              <Card key={photo.id} className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden group hover:shadow-xl transition-all border-2 border-transparent hover:border-rose-100">
                <div className="relative aspect-[3/4]">
                  <Image src={photo.img} alt={photo.label} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {photo.primary && (
                      <Badge className="bg-rose-600 text-white border-none px-3 font-black text-[9px] uppercase tracking-widest shadow-xl">BRAND PRIMARY</Badge>
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
                    <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase text-rose-600 p-0 h-auto hover:bg-transparent hover:underline">Set as Main</Button>
                  )}
                </div>
              </Card>
            ))}
            
            <button className="rounded-[2.5rem] border-4 border-dashed border-slate-100 bg-slate-50/30 flex flex-col items-center justify-center p-12 text-center gap-4 hover:bg-white hover:border-rose-200 transition-all cursor-pointer group min-h-[350px]">
              <div className="h-16 w-16 bg-white rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Upload className="h-8 w-8 text-rose-600" />
              </div>
              <div className="space-y-1">
                <p className="font-black text-xl text-slate-900">Upload Visuals</p>
                <p className="text-sm text-slate-400 font-medium px-4">Add high-fidelity campaign shots or product reels</p>
              </div>
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-8 space-y-6">
            <h3 className="text-xl font-black">Visual Conversion</h3>
            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              Cosmetic brands with "Behind the Scenes" lab footage see 5x more trust engagement. Showcase your ingredient purity and professional environment.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span className="text-xs font-bold text-white/80">Lab Purity Pictured</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                <Sparkles className="h-5 w-5 text-rose-400" />
                <span className="text-xs font-bold text-white/80">4 Active Collections</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
