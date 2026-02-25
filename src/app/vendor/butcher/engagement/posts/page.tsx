
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  PenTool, Plus, MessageSquare, Heart, 
  Eye, MoreVertical, Image as ImageIcon, Video, Calendar
} from "lucide-react";
import Image from "next/image";

export default function ButcherPostsPage() {
  const posts = [
    { id: 1, title: "Fresh Lamb Arrivals!", body: "Just received a fresh batch of grass-fed organic lamb from Al-Noor Farms. Available for same-day delivery...", type: "Image", likes: 42, comments: 5, time: "1 hour ago" },
    { id: 2, title: "Knife Skills: Trimming Brisket", body: "Watch our master butcher prepare a premium beef brisket for a customer's slow-cook weekend...", type: "Video", likes: 156, comments: 12, time: "Yesterday" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-5xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-red-600 font-black uppercase tracking-widest text-[10px]">
            <PenTool className="h-3 w-3" /> Shop Engagement
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Social Feed Posts</h1>
          <p className="text-muted-foreground font-medium">Showcase your fresh meat quality and professional prep directly to customers.</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 rounded-full px-8 font-black shadow-lg shadow-red-200 h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> New Shop Update
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="rounded-[2.5rem] border-4 border-dashed border-slate-100 bg-slate-50/50 flex flex-col items-center justify-center p-10 text-center gap-4 hover:bg-white hover:border-red-200 transition-all cursor-pointer group">
          <div className="h-16 w-16 bg-white rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <ImageIcon className="h-8 w-8 text-red-600" />
          </div>
          <p className="font-black text-slate-900">Upload Fresh Cut</p>
        </Card>
        
        <Card className="rounded-[2.5rem] border-4 border-dashed border-slate-100 bg-slate-50/50 flex flex-col items-center justify-center p-10 text-center gap-4 hover:bg-white hover:border-red-200 transition-all cursor-pointer group">
          <div className="h-16 w-16 bg-white rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <Video className="h-8 w-8 text-blue-500" />
          </div>
          <p className="font-black text-slate-900">Post Butcher Reel</p>
        </Card>

        <Card className="rounded-[2.5rem] border-4 border-dashed border-slate-100 bg-slate-50/50 flex flex-col items-center justify-center p-10 text-center gap-4 hover:bg-white hover:border-red-200 transition-all cursor-pointer group">
          <div className="h-16 w-16 bg-white rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <Calendar className="h-8 w-8 text-amber-500" />
          </div>
          <p className="font-black text-slate-900">Special Promo</p>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-black px-2">Recent Feed Activity</h2>
        <div className="grid grid-cols-1 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white flex flex-col md:flex-row hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-red-100">
              <div className="relative w-full md:w-64 aspect-video md:aspect-square overflow-hidden shrink-0">
                <Image src={`https://picsum.photos/seed/butcher-post${post.id}/600/600`} alt="Post" fill className="object-cover" />
                <Badge className="absolute top-4 left-4 bg-white/90 text-slate-900 font-black border-none uppercase text-[10px] tracking-widest">{post.type}</Badge>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{post.title}</h3>
                    <Button variant="ghost" size="icon" className="rounded-full"><MoreVertical className="h-5 w-5 text-slate-300" /></Button>
                  </div>
                  <p className="text-slate-600 font-medium leading-relaxed line-clamp-2 italic">
                    "{post.body}"
                  </p>
                </div>
                <div className="pt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-50">
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                      <Heart className="h-4 w-4 text-rose-500" /> {post.likes}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                      <MessageSquare className="h-4 w-4 text-blue-500" /> {post.comments}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                      <Eye className="h-4 w-4 text-slate-400" /> 850 Views
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-slate-300 uppercase">{post.time}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
