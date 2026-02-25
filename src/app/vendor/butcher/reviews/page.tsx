
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Star, MessageSquare, Reply, ThumbsUp, 
  Search, Filter, TrendingUp, CheckCircle2,
  MoreVertical, MoreHorizontal
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default function ButcherReviewsPage() {
  const reviews = [
    { id: 1, user: "Sarah Ahmed", rating: 5, date: "2 hours ago", comment: "The Mutton Curry Cut was incredibly fresh and properly trimmed. The sourcing logs give me real peace of mind.", response: "JazakAllah Sarah! We source only from HMC certified farms." },
    { id: 2, user: "Omar Malik", rating: 4, date: "1 day ago", comment: "Great quality beef ribs. Delivery was quick but the packaging could be a bit more robust.", response: null },
    { id: 3, user: "Aisha Khalil", rating: 5, date: "3 days ago", comment: "Best butcher in the city for organic poultry. Their staff is always respectful and the shop is spotless.", response: "Thank you Aisha! We prioritize cleanliness and ethics above all else." },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-5xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-red-600 font-black uppercase tracking-widest text-[10px]">
            <Star className="h-3 w-3" /> Shop Reputation
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Customer Feedback</h1>
          <p className="text-muted-foreground font-medium">Monitor ratings for freshness, cut accuracy, and delivery speed.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            Feedback Analytics
          </Button>
          <Button className="bg-red-600 rounded-full px-8 font-black shadow-lg shadow-red-200 h-12 text-white">
            Auto-Reply AI
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10 text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-7xl font-black text-slate-900 tracking-tighter">4.9</h2>
              <div className="flex justify-center gap-1.5">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-6 w-6 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Global Shop Score</p>
            </div>
            <div className="pt-6 border-t border-slate-50 space-y-4">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-4">
                  <span className="text-xs font-black text-slate-400 w-2">{star}</span>
                  <div className="h-2 bg-slate-50 rounded-full flex-1 overflow-hidden">
                    <div className="h-full bg-red-600 rounded-full" style={{ width: star === 5 ? '92%' : star === 4 ? '6%' : '2%' }} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 w-8">{star === 5 ? '92%' : star === 4 ? '6%' : '2%'}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center text-red-600">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-black tracking-tight">Trust Growth</h3>
            </div>
            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              Your "Source Verified" badge has increased local confidence by 35% this month.
            </p>
            <Button variant="secondary" className="w-full rounded-2xl h-12 font-black text-xs uppercase tracking-widest">Trust Reports</Button>
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-2">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search comments..." className="pl-9 h-11 rounded-2xl bg-white border-none shadow-sm font-medium" />
            </div>
            <Button variant="outline" size="icon" className="h-11 w-11 rounded-2xl bg-white border-none shadow-sm"><Filter className="h-4 w-4" /></Button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {reviews.map((rev) => (
              <Card key={rev.id} className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden border-2 border-transparent hover:border-red-100 transition-all group">
                <div className="p-8 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-slate-50 shadow-sm">
                        <AvatarImage src={`https://picsum.photos/seed/user${rev.id}/100/100`} />
                        <AvatarFallback>{rev.user[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-base font-black text-slate-900">{rev.user}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex gap-0.5">
                            {Array.from({ length: rev.rating }).map((_, i) => <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />)}
                          </div>
                          <span className="text-[10px] font-bold text-slate-300 uppercase">{rev.date}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal className="h-5 w-5 text-slate-300" /></Button>
                  </div>
                  
                  <p className="text-slate-600 font-medium leading-relaxed italic text-base">
                    "{rev.comment}"
                  </p>

                  {rev.response ? (
                    <div className="p-6 bg-slate-50 rounded-3xl border-l-4 border-red-600 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-black text-red-600 uppercase tracking-widest">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Shop Response
                      </div>
                      <p className="text-sm font-bold text-slate-700">{rev.response}</p>
                    </div>
                  ) : (
                    <div className="pt-4 flex gap-3">
                      <Button className="rounded-2xl h-11 px-6 font-black uppercase text-[10px] tracking-widest bg-red-600 text-white shadow-lg shadow-red-200">
                        <Reply className="mr-2 h-4 w-4" /> Reply to Guest
                      </Button>
                      <Button variant="outline" className="rounded-2xl h-11 px-6 font-black uppercase text-[10px] tracking-widest border-2">
                        <ThumbsUp className="mr-2 h-4 w-4" /> Thank Guest
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
