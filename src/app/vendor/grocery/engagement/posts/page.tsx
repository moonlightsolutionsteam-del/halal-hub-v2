
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  PenTool, Plus, MessageSquare, Heart, 
  Eye, Share2, MoreVertical, LayoutGrid,
  Image as ImageIcon, Video, Calendar
} from "lucide-react";
import Image from "next/image";

export default function EngagementPostsPage() {
  const posts = [
    { id: 1, title: "Fresh Organic Produce Arrival!", body: "Just received a fresh shipment of local farm-to-table vegetables. Available in-store and for delivery today...", type: "Image", likes: 85, comments: 8, time: "2 hours ago" },
    { id: 2, title: "Meat Counter: Weekly Specials", body: "Check out our premium hand-slaughtered mutton cuts. Expert butchers ready to prep your favorite pieces...", type: "Video", likes: 142, comments: 24, time: "Yesterday" },
    { id: 3, title: "New Loyalty Coins Enabled!", body: "We've enabled Hub Coin rewards for all bakery items. Scan your app at checkout to earn 2x points...", type: "Event", likes: 210, comments: 12, time: "3 days ago" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-5xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-[10px]">
            <PenTool className="h-3 w-3" /> Retail Engagement
          </div>
          <h1 className="text-3xl font-black font-headline text-foreground">Store Social Feed</h1>
          <p className="text-muted-foreground font-medium">Publish stock updates, offers, and store stories directly to your customers' feeds.</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-8 font-black shadow-lg shadow-emerald-200 h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> Create New Post
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="rounded-[2.5rem] border-4 border-dashed border-border bg-muted/50 flex flex-col items-center justify-center p-10 text-center gap-4 hover:bg-card hover:border-emerald-200 transition-all cursor-pointer group">
          <div className="h-16 w-16 bg-card rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <ImageIcon className="h-8 w-8 text-emerald-600" />
          </div>
          <div className="space-y-1">
            <p className="font-black text-foreground">Upload Stock Photo</p>
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-tighter">Fresh Arrivals</p>
          </div>
        </Card>
        
        <Card className="rounded-[2.5rem] border-4 border-dashed border-border bg-muted/50 flex flex-col items-center justify-center p-10 text-center gap-4 hover:bg-card hover:border-emerald-200 transition-all cursor-pointer group">
          <div className="h-16 w-16 bg-card rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <Video className="h-8 w-8 text-blue-500" />
          </div>
          <div className="space-y-1">
            <p className="font-black text-foreground">Upload Store Reel</p>
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-tighter">Short Video</p>
          </div>
        </Card>

        <Card className="rounded-[2.5rem] border-4 border-dashed border-border bg-muted/50 flex flex-col items-center justify-center p-10 text-center gap-4 hover:bg-card hover:border-emerald-200 transition-all cursor-pointer group">
          <div className="h-16 w-16 bg-card rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <Calendar className="h-8 w-8 text-amber-500" />
          </div>
          <div className="space-y-1">
            <p className="font-black text-foreground">Schedule Promo</p>
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-tighter">Flash Sale</p>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-black px-2">Store Activity</h2>
        <div className="grid grid-cols-1 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card flex flex-col md:flex-row hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-emerald-100">
              <div className="relative w-full md:w-64 aspect-video md:aspect-square overflow-hidden shrink-0">
                <Image src={`https://picsum.photos/seed/grocery-post${post.id}/600/600`} alt="Post" fill className="object-cover" />
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
                      <Eye className="h-4 w-4 text-muted-foreground" /> 1.2k Views
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-muted-foreground uppercase">{post.time}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
