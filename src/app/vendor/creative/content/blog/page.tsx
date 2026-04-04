"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  BookOpen, Plus, Search, Filter, Edit2, 
  Trash2, Eye, MoreVertical, Layers,
  Rss, Globe, ArrowUpRight, Share2,
  Clock, MessageSquare, Heart, ArrowLeft
} from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

const ARTICLES = [
  { id: 1, title: "The Science of Halal Ingredients", category: "Education", status: "Published", date: "Nov 01, 2024", reads: "4.2k", likes: "156", img: "art1" },
  { id: 2, title: "Winter Skincare: A Modest Guide", category: "Lifestyle", status: "Published", date: "Oct 28, 2024", reads: "850", likes: "42", img: "art2" },
  { id: 3, title: "Journey Through Andalusia", category: "Travelogue", status: "Draft", date: "Oct 15, 2024", reads: "0", likes: "0", img: "art3" },
];

export default function CreativeBlogPage() {
  return (
    <div className="container mx-auto p-6 space-y-10 max-w-6xl pb-24 text-slate-900">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <Link href="/vendor/creative/dashboard" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
              <BookOpen className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-black font-headline text-slate-900">Blog & Scholarly Articles</h1>
          </div>
          <p className="text-muted-foreground font-medium">Publish long-form thoughts, research, and life guides for your audience.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 font-black shadow-lg shadow-primary/20 h-12">
          <Plus className="mr-2 h-4 w-4" /> New Article
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {ARTICLES.map((art) => (
          <Card key={art.id} className="rounded-[3rem] border-none shadow-sm overflow-hidden bg-white hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-primary/10 group">
            <div className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-72 aspect-video md:aspect-square overflow-hidden shrink-0">
                <Image src={`https://picsum.photos/seed/art-bg-${art.img}/600/600`} alt={art.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="bg-primary/5 text-primary border-none font-black text-[9px] uppercase px-3 h-6 flex items-center">{art.category}</Badge>
                      <Badge className={cn("border-none text-[9px] font-black uppercase px-3 h-6 flex items-center", art.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400')}>
                        {art.status}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity"><MoreVertical className="h-5 w-5 text-slate-300" /></Button>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-primary transition-colors">{art.title}</h3>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1.5 text-xs font-black text-slate-400 uppercase tracking-tighter">
                      <Eye className="h-4 w-4" /> {art.reads} Reads
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-black text-slate-400 uppercase tracking-tighter">
                      <Heart className="h-4 w-4 text-rose-500 fill-current" /> {art.likes}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-black text-slate-400 uppercase tracking-tighter">
                      <Clock className="h-4 w-4" /> {art.date}
                    </div>
                  </div>
                </div>
                <div className="pt-8 flex justify-end gap-3 border-t border-slate-50 mt-6">
                  <Button variant="outline" className="rounded-xl h-11 px-8 border-2 font-black text-xs uppercase tracking-widest bg-white">Edit Draft</Button>
                  <Button className="rounded-xl h-11 px-8 font-black text-xs uppercase tracking-widest bg-slate-900 text-white shadow-xl">Promote Article</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
