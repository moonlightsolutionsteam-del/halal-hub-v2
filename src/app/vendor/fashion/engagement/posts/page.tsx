
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  PenTool, Plus, MessageSquare, Heart, 
  Eye, Share2, MoreVertical, LayoutGrid,
  Image as ImageIcon, Video, Calendar,
  Shirt
} from "lucide-react";
import Image from "next/image";

export default function FashionPostsPage() {
  const posts = [
    { id: 1, title: "Spring 2025 Lookbook Teaser", body: "A first look at our upcoming silk collection. Lightweight, opaque, and elegant silhouettes...", type: "Image", likes: 245, comments: 42, time: "2 hours ago" },
    { id: 2, title: "Styling Tutorial: The Perfect Wrap", body: "Watch how to style our premium chiffon hijabs for everyday comfort and professional elegance...", type: "Video", likes: 850, comments: 120, time: "Yesterday" },
    { id: 3, title: "Pop-up Store in Dubai!", body: "We're coming to the Global Halal Expo next week. Visit us at Booth #42 for exclusive early access...", type: "Event", likes: 124, comments: 15, time: "3 days ago" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-pink-600 font-black uppercase tracking-widest text-[10px]">
            <PenTool className="h-3 w-3" /> Creative Engagement
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Brand Social Feed</h1>
          <p className="text-muted-foreground font-medium">Publish drop updates, styling reels, and brand stories directly to your followers.</p>
        </div>
        <Button className="bg-pink-600 hover:bg-pink-700 rounded-full px-8 font-black shadow-lg shadow-pink-200 h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> New Brand Update
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="rounded-[2.5rem] border-4 border-dashed border-border bg-muted/50 flex flex-col items-center justify-center p-10 text-center gap-4 hover:bg-card hover:border-pink-200 transition-all cursor-pointer group">
          <div className="h-16 w-16 bg-card rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <ImageIcon className="h-8 w-8 text-pink-600" />
          </div>
          <div className="space-y-1">
            <p className="font-black text-foreground">Post Lookbook</p>
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-tighter">Campaign Imagery</p>
          </div>
        </Card>
        
        <Card className="rounded-[2.5rem] border-4 border-dashed border-border bg-muted/50 flex flex-col items-center justify-center p-10 text-center gap-4 hover:bg-card hover:border-pink-200 transition-all cursor-pointer group">
          <div className="h-16 w-16 bg-card rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <Video className="h-8 w-8 text-blue-500" />
          </div>
          <div className="space-y-1">
            <p className="font-black text-foreground">Upload Reel</p>
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-tighter">Styling Tutorials</p>
          </div>
        </Card>

        <Card className="rounded-[2.5rem] border-4 border-dashed border-border bg-muted/50 flex flex-col items-center justify-center p-10 text-center gap-4 hover:bg-card hover:border-pink-200 transition-all cursor-pointer group">
          <div className="h-16 w-16 bg-card rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <Calendar className="h-8 w-8 text-amber-500" />
          </div>
          <div className="space-y-1">
            <p className="font-black text-foreground">Schedule Drop</p>
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-tighter">New Arrival Launch</p>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-black px-2">Live Brand Activity</h2>
        <div className="grid grid-cols-1 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card flex flex-col md:flex-row hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-pink-100">
              <div className="relative w-full md:w-64 aspect-video md:aspect-square overflow-hidden shrink-0">
                <Image src={`https://images.unsplash.com/photo-1445205170230-053b83016050?w=600/600`} alt="Post" fill className="object-cover" />
                <Badge className="absolute top-4 left-4 bg-card/90 text-foreground font-black border-none uppercase text-[10px] tracking-widest">{post.type}</Badge>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-black text-foreground tracking-tight">{post.title}</h3>
                    <Button variant="ghost" size="icon" className="rounded-full"><MoreVertical className="h-5 w-5 text-muted-foreground" /></Button>
                  </div>
                  <p className="text-muted-foreground font-medium leading-relaxed line-clamp-2 italic">
                    "{post.body}"
                  </p>
                </div>
                <div className="pt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border">
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2 text-xs font-black text-muted-foreground uppercase tracking-widest">
                      <Heart className="h-4 w-4 text-rose-500" /> {post.likes}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-black text-muted-foreground uppercase tracking-widest">
                      <MessageSquare className="h-4 w-4 text-blue-500" /> {post.comments}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-black text-muted-foreground uppercase tracking-widest">
                      <Eye className="h-4 w-4 text-muted-foreground" /> 12.4k Views
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-muted-foreground uppercase">{post.time}</span>
                    <Button variant="secondary" className="rounded-full font-black text-[10px] h-8 px-4 uppercase tracking-tighter bg-pink-50 text-pink-600 border-none">Promote</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
