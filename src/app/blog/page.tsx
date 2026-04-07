
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  BookOpen, Search, Filter, ArrowUpRight, 
  MessageSquare, Heart, Share2, Clock,
  Eye, Calendar, Globe, Sparkles,
  ChevronRight, ArrowRight, Rss
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import Link from "next/link"

const FEATURED_POST = {
  id: "f1",
  title: "The Future of Halal Lifestyle: Beyond Food",
  excerpt: "Discover how the global Muslim community is redefining ethical travel, finance, and wellness in the 21st century. Join us as we explore the deeper connections between faith and modern living.",
  author: "Shaykh Hamza",
  date: "Oct 24, 2024",
  readTime: "12 min",
  category: "Insight",
  img: "https://picsum.photos/seed/blog-feat/1200/600"
};

const BLOG_POSTS = [
  { id: 1, title: "Sunnah Foods for Immunity", author: "Amina K.", date: "2h ago", read: "5 min", likes: "1.2k", img: "https://picsum.photos/seed/b1/600/400", cat: "Health" },
  { id: 2, title: "Exploring Andalusia's Heritage", author: "Zaid Ali", date: "5h ago", read: "8 min", likes: "850", img: "https://picsum.photos/seed/b2/600/400", cat: "Travel" },
  { id: 3, title: "Ethics in Islamic Finance", author: "Dr. Ibrahim", date: "Yesterday", read: "15 min", likes: "2.4k", img: "https://picsum.photos/seed/b3/600/400", cat: "Finance" },
  { id: 4, title: "Modest Fashion Trends 2025", author: "Sarah S.", date: "2 days ago", read: "6 min", likes: "1.5k", img: "https://picsum.photos/seed/b4/600/400", cat: "Fashion" },
];

export default function BlogFeedPage() {
  return (
    <div className="container mx-auto p-6 space-y-16 max-w-7xl pb-32 text-slate-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="space-y-2">
          <Badge variant="outline" className="px-4 py-1.5 rounded-full border-primary/20 text-primary font-black uppercase text-[10px] tracking-[0.2em] bg-primary/5">
            Voice of Ummah
          </Badge>
          <h1 className="text-5xl font-black font-headline text-slate-900 tracking-tighter">Community Journal</h1>
          <p className="text-xl text-muted-foreground font-medium italic max-w-xl">Stories, research, and insights from the heart of the global hub.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search stories..." className="pl-12 h-14 rounded-[1.5rem] bg-white border-none shadow-sm font-medium text-lg" />
          </div>
          <Button variant="outline" className="h-14 w-14 rounded-[1.5rem] bg-white border-none shadow-sm"><Rss className="h-6 w-6 text-primary" /></Button>
        </div>
      </div>

      {/* Featured Article */}
      <Link href={`/blog/${FEATURED_POST.id}`}>
        <Card className="rounded-[4rem] border-none shadow-2xl overflow-hidden bg-white group cursor-pointer hover:-translate-y-1 transition-all duration-700">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-full min-h-[400px]">
              <Image src={FEATURED_POST.img} alt="Featured" fill className="object-cover group-hover:scale-105 transition-transform duration-[2s]" />
              <div className="absolute top-10 left-10">
                <Badge className="bg-primary text-white border-none font-black text-xs px-6 py-2 rounded-full shadow-2xl uppercase tracking-[0.2em]">FEATURED STORY</Badge>
              </div>
            </div>
            <div className="p-16 space-y-10 flex flex-col justify-center">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="bg-primary/5 text-primary border-none font-black text-[10px] px-4 py-1.5 rounded-full uppercase tracking-widest">{FEATURED_POST.category}</Badge>
                  <span className="text-xs font-black text-slate-300 uppercase tracking-widest flex items-center gap-2">
                    <Clock className="h-4 w-4" /> {FEATURED_POST.readTime} Read
                  </span>
                </div>
                <h2 className="text-5xl font-black tracking-tight leading-tight group-hover:text-primary transition-colors">{FEATURED_POST.title}</h2>
                <p className="text-xl text-slate-500 font-medium leading-relaxed line-clamp-3 italic">"{FEATURED_POST.excerpt}"</p>
              </div>
              <div className="flex items-center justify-between pt-10 border-t border-slate-50">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 border-4 border-slate-50 shadow-md">
                    <AvatarImage src="https://picsum.photos/seed/author/100/100" />
                    <AvatarFallback>HA</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-lg font-black text-slate-900">{FEATURED_POST.author}</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{FEATURED_POST.date}</p>
                  </div>
                </div>
                <div className="h-16 w-16 rounded-[2rem] bg-slate-900 text-white flex items-center justify-center shadow-2xl group-hover:bg-primary transition-all group-hover:translate-x-2">
                  <ArrowUpRight className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>

      {/* Grid Feed */}
      <section className="space-y-10">
        <div className="flex items-center justify-between px-4">
          <h3 className="text-3xl font-black tracking-tighter">Latest Stories</h3>
          <div className="flex gap-3">
            {["Trending", "Health", "Lifestyle", "Finance", "Travel"].map(f => (
              <Badge key={f} variant="outline" className="px-5 py-2 rounded-full cursor-pointer hover:bg-slate-50 transition-all border-slate-200 text-slate-500 font-black text-[10px] uppercase tracking-widest">{f}</Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {BLOG_POSTS.map((post) => (
            <Card key={post.id} className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 group flex flex-col h-full border border-transparent hover:border-primary/10 cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={post.img} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <Badge className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-primary font-black border-none px-3 py-1 rounded-full text-[9px] uppercase tracking-widest shadow-lg">{post.cat}</Badge>
              </div>
              <CardHeader className="p-8 flex-1 space-y-4">
                <h3 className="text-xl font-black leading-tight group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                      <AvatarImage src={`https://picsum.photos/seed/auth${post.id}/50/50`} />
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">{post.author}</span>
                  </div>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{post.date}</span>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Bottom */}
      <Card className="rounded-[4rem] border-none bg-slate-900 text-white p-16 text-center space-y-10 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-5" />
        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <Sparkles className="h-16 w-16 text-primary mx-auto animate-pulse" />
          <div className="space-y-4">
            <h2 className="text-5xl font-black font-headline tracking-tight">Become a Hub Writer</h2>
            <p className="text-slate-400 font-medium text-xl leading-relaxed italic">
              "Share your stories, recipes, or scholarly research with a global audience of over 1.2 million users."
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <Button className="h-16 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase text-sm tracking-widest shadow-2xl transition-all active:scale-95">
              Apply to Contribute
            </Button>
            <Button variant="outline" className="h-16 px-12 rounded-2xl border-white/20 text-white hover:bg-white/10 font-black uppercase text-sm tracking-widest">
              Creator Guidelines
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
