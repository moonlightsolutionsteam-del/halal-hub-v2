"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle, Video, Mic, FileText, 
  Search, Filter, Eye, Heart, 
  MessageSquare, MoreVertical, Edit2,
  Trash2, ArrowUpRight, Share2, PlayCircle,
  BarChart3, LayoutGrid, Clock, ArrowLeft,
  Plus
} from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

const PUBLISHED_CONTENT = [
  { id: 1, title: "Sabr in the Modern Age", type: "Reel", views: "150k", likes: "12.4k", date: "2h ago", img: "reel1" },
  { id: 2, title: "Faith & Finance Podcast Ep 12", type: "Podcast", views: "45k", likes: "2.1k", date: "1d ago", img: "pod1" },
  { id: 3, title: "The Beauty of Quranic Script", type: "Article", views: "8.2k", likes: "850", date: "3d ago", img: "art1" },
  { id: 4, title: "Daily Morning Adhkar", type: "Reel", views: "240k", likes: "18.5k", date: "1w ago", img: "reel2" },
];

export default function PublishedContentPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-10 max-w-6xl pb-24 text-foreground">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <Link href="/vendor/creative/dashboard" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Published Archive</h1>
          </div>
          <p className="text-muted-foreground font-medium">Your live digital media and historical content feed.</p>
        </div>
        <Link href="/vendor/creative/content/upload">
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 font-black shadow-lg shadow-primary/20 h-12">
            <Plus className="mr-2 h-4 w-4" /> New Upload
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-[2rem] shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search archive..." className="pl-9 h-11 rounded-2xl bg-muted border-none font-medium" />
        </div>
        <div className="flex items-center gap-2">
          {["All", "Reels", "Podcasts", "Articles"].map(f => (
            <Badge key={f} variant="secondary" className="px-4 py-2 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-all bg-muted text-muted-foreground font-black text-[10px] uppercase tracking-widest border-none">{f}</Badge>
          ))}
          <Button variant="ghost" size="icon" className="rounded-full h-11 w-11"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {PUBLISHED_CONTENT.map((content) => (
          <Card key={content.id} className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-primary/10 group">
            <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="flex items-center gap-8 flex-1">
                <div className="relative h-24 w-24 rounded-[2rem] overflow-hidden shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-700">
                  <Image src={`https://picsum.photos/seed/${content.img}/300/300`} alt={content.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="h-8 w-8 text-white fill-current" />
                  </div>
                </div>
                <div className="space-y-2 min-w-0">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-[9px] font-black uppercase tracking-tighter border-primary/20 text-primary h-5 flex items-center px-2">{content.type}</Badge>
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1.5"><Clock className="h-3 w-3" /> Published {content.date}</span>
                  </div>
                  <h3 className="text-xl font-black text-foreground truncate leading-tight group-hover:text-primary transition-colors">{content.title}</h3>
                  <div className="flex items-center gap-6 pt-1">
                    <div className="flex items-center gap-1.5 text-xs font-black text-muted-foreground uppercase tracking-tighter">
                      <Eye className="h-3.5 w-3.5" /> {content.views}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-black text-muted-foreground uppercase tracking-tighter">
                      <Heart className="h-3.5 w-3.5 text-rose-500 fill-current" /> {content.likes}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-black text-muted-foreground uppercase tracking-tighter">
                      <BarChart3 className="h-3.5 w-3.5 text-blue-500" /> Trend: Up
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 w-full md:w-auto">
                <Button variant="outline" className="flex-1 sm:flex-none rounded-xl h-11 border-2 font-black text-xs uppercase tracking-widest bg-card hover:bg-muted">Analytics</Button>
                <Button variant="ghost" size="icon" className="rounded-xl h-11 w-11 bg-muted text-muted-foreground hover:text-primary transition-all"><Edit2 className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="rounded-xl h-11 w-11 bg-muted text-muted-foreground hover:text-rose-600 transition-all"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="p-5 sm:p-10 bg-zinc-900 text-white rounded-[3rem] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <BarChart3 className="h-48 w-48 text-primary" />
        </div>
        <div className="relative z-10 space-y-4 text-center md:text-left flex-1">
          <h2 className="text-2xl sm:text-3xl font-black font-headline">Monthly Impact Summary</h2>
          <p className="text-muted-foreground font-medium text-lg leading-relaxed max-w-2xl">
            You've reached 1.2M people this month across all platforms. Your most successful content format is <span className="text-white font-black">Studio Reels</span>.
          </p>
        </div>
        <Button variant="outline" className="h-16 px-12 rounded-2xl border-2 border-white/20 text-white font-black uppercase text-sm tracking-widest hover:bg-card/10 relative z-10">Full Growth Report</Button>
      </div>
    </div>
  )
}
