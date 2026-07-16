"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Star, MessageSquare, Reply, ThumbsUp, 
  Search, Filter, ArrowUpRight,
  TrendingUp, Activity, CheckCircle2,
  Zap, Heart, Flag, Share2, ArrowLeft,
  MoreHorizontal
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { cn } from "@/lib/utils"

const FEEDBACK = [
  { id: 1, user: "Sarah Ahmed", rating: 5, date: "2 hours ago", comment: "The recent vlog on Sabr was exactly what I needed to hear today. JazakAllah for the scholarly insights!", response: "JazakAllah Sarah! So glad it could benefit you.", liked: true },
  { id: 2, user: "Omar Malik", rating: 4, date: "1 day ago", comment: "Love the podcast quality! Could you cover more topics on Islamic ethics in business in the next episode?", response: null, liked: false },
  { id: 3, user: "Aisha Khalil", rating: 5, date: "3 days ago", comment: "The high-fidelity visuals in your art series are stunning. The community really appreciates the effort.", response: "Thank you Aisha! We prioritize high standards for the Ummah.", liked: true },
];

export default function CreativeFeedbackPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-10 max-w-6xl pb-24 text-foreground">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <Link href="/vendor/creative/dashboard" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-14 w-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-inner">
              <Star className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-4xl font-black font-headline tracking-tight text-foreground">Reviews & Feedback</h1>
              <p className="text-muted-foreground font-medium text-lg italic">Engage with your audience and manage your content's reputation.</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-2xl px-6 font-black border-2 h-14 bg-card shadow-sm gap-2">
            Sentiment Analysis
          </Button>
          <Button className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl px-8 font-black shadow-lg h-14 text-white">
            Auto-Reply AI
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-8">
          <Card className="rounded-[3rem] border-none shadow-sm bg-card p-12 text-center space-y-6">
            <div className="space-y-3">
              <h2 className="text-8xl font-black text-foreground tracking-tighter leading-none">4.9</h2>
              <div className="flex justify-center gap-1.5">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-6 w-6 fill-amber-400 text-amber-400 border-none" />)}
              </div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">Overall Studio Rating</p>
            </div>
            <div className="pt-8 border-t border-border space-y-4">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-6">
                  <span className="text-sm font-black text-muted-foreground w-2">{star}</span>
                  <div className="h-2.5 bg-muted rounded-full flex-1 overflow-hidden shadow-inner">
                    <div className={cn("h-full rounded-full transition-all duration-1000", "bg-amber-400")} style={{ width: star === 5 ? '92%' : star === 4 ? '6%' : '2%' }} />
                  </div>
                  <span className="text-[10px] font-black text-muted-foreground w-10 text-right">{star === 5 ? '92%' : star === 4 ? '6%' : '2%'}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-[3rem] border-none shadow-sm bg-zinc-900 text-white p-10 space-y-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingUp className="h-32 w-32 text-primary" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="h-14 w-14 rounded-2xl bg-card/10 flex items-center justify-center text-primary shadow-xl border border-white/10">
                <Heart className="h-8 w-8 fill-current" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tighter">Community Love</h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed italic">
                  "Your engagement score is in the top 1% of the Education vertical. Keep replying to comments to maintain this velocity."
                </p>
              </div>
              <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase text-xs tracking-widest shadow-xl transition-all">
                Full Sentiment Audit
              </Button>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-2">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search comments..." className="pl-10 h-12 rounded-2xl bg-card border-none shadow-sm font-medium" />
            </div>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl bg-card border-none shadow-sm"><Filter className="h-4 w-4" /></Button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {FEEDBACK.map((rev) => (
              <Card key={rev.id} className="rounded-[3rem] border-none shadow-sm bg-card overflow-hidden border-2 border-transparent hover:border-amber-100 transition-all group">
                <div className="p-5 sm:p-10 space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-6">
                      <Avatar className="h-16 w-16 border-4 border-border shadow-md group-hover:scale-105 transition-transform">
                        <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&auto=format&q=80`} />
                        <AvatarFallback>{rev.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-xl font-black text-foreground leading-tight">{rev.user}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex gap-0.5">
                            {Array.from({ length: rev.rating }).map((_, i) => <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400 border-none" />)}
                          </div>
                          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">• {rev.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="ghost" className="rounded-xl h-10 w-10 hover:bg-muted"><Flag className="h-4 w-4 text-muted-foreground" /></Button>
                      <Button size="icon" variant="ghost" className="rounded-xl h-10 w-10 hover:bg-muted"><MoreHorizontal className="h-5 w-5 text-muted-foreground" /></Button>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground font-medium leading-relaxed italic text-xl">
                    "{rev.comment}"
                  </p>

                  {rev.response ? (
                    <div className="p-8 bg-muted rounded-[2.5rem] border-l-8 border-primary space-y-3">
                      <div className="flex items-center gap-3 text-xs font-black text-primary uppercase tracking-widest">
                        <CheckCircle2 className="h-4 w-4" /> Studio Response
                      </div>
                      <p className="text-lg font-bold text-foreground leading-relaxed">"{rev.response}"</p>
                    </div>
                  ) : (
                    <div className="pt-4 flex gap-4">
                      <Button className="rounded-2xl h-14 px-10 font-black uppercase text-xs tracking-widest bg-zinc-900 text-white shadow-xl hover:bg-primary transition-all active:scale-95">
                        <Reply className="mr-2 h-4 w-4" /> Direct Reply
                      </Button>
                      <Button variant="outline" className={cn(
                        "rounded-2xl h-14 px-10 font-black uppercase text-xs tracking-widest border-2 transition-all active:scale-95",
                        rev.liked ? "bg-rose-50 text-rose-600 border-rose-100" : "bg-card text-muted-foreground border-border"
                      )}>
                        <Heart className={cn("mr-2 h-4 w-4", rev.liked && "fill-current")} /> {rev.liked ? "Liked" : "Like"}
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
          
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-border" />
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">All reviews shown</p>
              <div className="h-px w-12 bg-border" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
