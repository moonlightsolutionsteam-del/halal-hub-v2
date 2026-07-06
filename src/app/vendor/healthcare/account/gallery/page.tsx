
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, Upload, Trash2, Plus, 
  ImageIcon, GripVertical, CheckCircle2,
  Layout, Eye, Star, Save, ShieldCheck,
  Stethoscope, Activity, HeartPulse
} from "lucide-react";
import Image from "next/image";

export default function HealthcareGalleryPage() {
  const photos = [
    { id: 1, label: "Modern Clinical Wing", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&auto=format&q=80", primary: true, category: "Facility" },
    { id: 2, label: "Hijama Therapy Suite", img: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop&auto=format&q=80", primary: false, category: "Wellness Rooms" },
    { id: 3, label: "Gender-Segregated Waiting", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&auto=format&q=80", primary: false, category: "Privacy" },
    { id: 4, label: "Certified Pharmacy Counter", img: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop&auto=format&q=80", primary: false, category: "Pharmacy" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-teal-600 font-black uppercase tracking-widest text-[10px]">
            <Camera className="h-3 w-3" /> Facility Visuals
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Media & Tours</h1>
          <p className="text-muted-foreground font-medium">Showcase your clinical environment, specialized suites, and privacy protocols.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            <Layout className="mr-2 h-4 w-4" /> Layout Manager
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700 rounded-full px-8 font-black shadow-lg shadow-teal-200 h-12 text-white">
            <Plus className="mr-2 h-4 w-4" /> Upload New Visuals
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {photos.map((photo) => (
              <Card key={photo.id} className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden group hover:shadow-xl transition-all border-2 border-transparent hover:border-teal-100">
                <div className="relative aspect-video">
                  <Image src={photo.img} alt={photo.label} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {photo.primary && (
                      <Badge className="bg-teal-600 text-white border-none px-3 font-black text-[9px] uppercase tracking-widest shadow-xl">MAIN COVER</Badge>
                    )}
                    <Badge className="bg-card/90 backdrop-blur-md text-foreground border-none px-3 font-black text-[9px] uppercase tracking-widest shadow-xl">{photo.category}</Badge>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="icon" variant="secondary" className="rounded-xl h-10 w-10"><GripVertical className="h-4 w-4" /></Button>
                    <Button size="icon" variant="destructive" className="rounded-xl h-10 w-10"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="p-6 flex items-center justify-between">
                  <p className="font-black text-foreground">{photo.label}</p>
                  {!photo.primary && (
                    <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase text-teal-600 p-0 h-auto hover:bg-transparent hover:underline">Set as primary</Button>
                  )}
                </div>
              </Card>
            ))}
            
            <button className="rounded-[2.5rem] border-4 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center p-12 text-center gap-4 hover:bg-card hover:border-teal-200 transition-all cursor-pointer group min-h-[350px]">
              <div className="h-16 w-16 bg-card rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Upload className="h-8 w-8 text-teal-600" />
              </div>
              <div className="space-y-1">
                <p className="font-black text-xl text-foreground">Upload Media</p>
                <p className="text-sm text-muted-foreground font-medium">Add HD clinic walkthroughs or specialty therapy photos</p>
              </div>
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 space-y-6">
            <h3 className="text-xl font-black">Visual Trust</h3>
            <p className="text-sm text-muted-foreground font-medium leading-relaxed">
              Healthcare profiles with verified photos of gender-segregated waiting areas and sterile treatment rooms receive 5x more appointment bookings.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-card/5 p-4 rounded-2xl border border-white/10">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span className="text-xs font-bold text-white/80">Purity standards pictured</span>
              </div>
              <div className="flex items-center gap-3 bg-card/5 p-4 rounded-2xl border border-white/10">
                <HeartPulse className="h-5 w-5 text-teal-400" />
                <span className="text-xs font-bold text-white/80">4 Active Suites Pictured</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
