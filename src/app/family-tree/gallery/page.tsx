
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Image as ImageIcon, Camera, Plus, Search, 
  Filter, MoreVertical, Share2, ArrowLeft,
  FolderOpen, Heart, Download, Trash2,
  Mic, PlayCircle, Sparkles, Zap
} from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

const ALBUMS = [
  { id: 1, name: "Eid-ul-Fitr 2024", count: 42, img: "eid1" },
  { id: 2, name: "Weekend Picnic", count: 15, img: "picnic1" },
  { id: 3, name: "Zaid's Graduation", count: 28, img: "grad1" },
  { id: 4, name: "Heritage Archive", count: 120, img: "heritage1" },
];

export default function FamilyGalleryPage() {
  return (
    <div className="container mx-auto p-6 space-y-10 max-w-6xl pb-24 text-foreground">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <Link href="/family-tree" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-emerald-600 transition-colors w-fit">
            <ArrowLeft className="h-4 w-4" /> Back to Hub
          </Link>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-14 w-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 shadow-inner">
              <ImageIcon className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h1 className="text-4xl font-black font-headline tracking-tight">Family Gallery</h1>
              <p className="text-muted-foreground font-medium text-lg italic">Preserving our moments and memories in high-fidelity.</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-2xl px-6 font-black border-2 h-14 bg-card shadow-sm gap-2">
            <Mic className="h-4 w-4 text-rose-500" /> Oral History
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-2xl px-8 font-black shadow-lg shadow-emerald-200 h-14 text-white">
            <Plus className="mr-2 h-4 w-4" /> Upload Media
          </Button>
        </div>
      </div>

      {/* Album Folders */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-black flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-amber-500" /> Family Albums
          </h2>
          <Button variant="ghost" className="text-xs font-black uppercase text-emerald-600">View All Folders</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {ALBUMS.map((album) => (
            <Card key={album.id} className="group rounded-[2rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-xl transition-all duration-500 cursor-pointer">
              <div className="relative aspect-square">
                <Image src={`https://picsum.photos/seed/album-${album.img}/400/400`} alt={album.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-black text-sm leading-tight drop-shadow-md">{album.name}</p>
                  <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">{album.count} Photos</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Feed */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-2">
          <h2 className="text-xl font-black">Latest Uploads</h2>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search moments..." className="pl-9 h-11 rounded-2xl bg-card border-none shadow-sm font-medium" />
            </div>
            <Button variant="outline" size="icon" className="h-11 w-11 rounded-2xl bg-card border-none shadow-sm"><Filter className="h-4 w-4" /></Button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="relative aspect-[4/5] rounded-[2rem] overflow-hidden group shadow-md hover:shadow-2xl transition-all duration-700 cursor-pointer border-2 border-transparent hover:border-emerald-100">
              <Image src={`https://picsum.photos/seed/moment-${i}/600/800`} alt="Moment" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="secondary" className="h-8 w-8 rounded-lg bg-card/20 backdrop-blur-md border-none text-white hover:bg-card/40"><Heart className="h-4 w-4" /></Button>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                <p className="text-[10px] font-black text-white uppercase tracking-tighter">Uploaded Oct {i+10}</p>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" className="h-7 w-7 text-white hover:bg-card/20"><Download className="h-3.5 w-3.5" /></Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7 text-white hover:bg-card/20"><MoreVertical className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Memory Card */}
      <Card className="rounded-[3rem] border-none bg-zinc-900 text-white p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
        <Sparkles className="absolute -top-4 -right-4 h-48 w-48 opacity-10 text-emerald-400" />
        <div className="h-24 w-24 rounded-[2rem] bg-card/10 flex items-center justify-center text-emerald-400 border border-white/10 shadow-2xl shrink-0 group hover:rotate-12 transition-transform">
          <Zap className="h-12 w-12 fill-current" />
        </div>
        <div className="space-y-4 relative z-10 text-center md:text-left flex-1">
          <h2 className="text-3xl font-black tracking-tight">AI Heritage Reel</h2>
          <p className="text-muted-foreground font-medium text-lg leading-relaxed max-w-xl">
            Our AI has curated a 60-second highlight reel of your family's favorite moments from the last month. Perfect for sharing with the grandparents!
          </p>
        </div>
        <Button className="h-16 px-12 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase text-sm tracking-widest shadow-2xl relative z-10 active:scale-95 transition-all">
          <PlayCircle className="mr-2 h-5 w-5" /> Play Reel
        </Button>
      </Card>
    </div>
  );
}
