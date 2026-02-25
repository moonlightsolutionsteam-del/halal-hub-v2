
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Star, MessageSquare, Reply, ThumbsUp, 
  MoreVertical, Search, Filter, ArrowUpRight,
  TrendingUp, CheckCircle2, Award
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default function TravelReviewsPage() {
  const reviews = [
    { id: 1, user: "Faisal Ahmed", rating: 5, date: "2 days ago", tour: "Umrah Deluxe", comment: "Our pilgrim group was treated like royalty. The scholar on board was very knowledgeable and every hotel was strictly compliant.", response: "JazakAllah Faisal! We are honored to have served your sacred journey." },
    { id: 2, user: "Zarah Malik", rating: 4, date: "1 week ago", tour: "Istanbul Odyssey", comment: "Beautiful tour! The halal food choices were amazing. The transport was a bit delayed on day 3 but the guide handled it well.", response: null },
    { id: 3, user: "Omar Farooq", rating: 5, date: "3 weeks ago", tour: "Morocco Heritage", comment: "A truly educational and spiritual experience. Exploring Fes with a verified halal itinerary made all the difference.", response: "Thank you Omar! We value your feedback on our cultural networks." },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-5xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-600 font-black uppercase tracking-widest text-[10px]">
            <Star className="h-3 w-3" /> Agency Reputation
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Traveler Feedback</h1>
          <p className="text-muted-foreground font-medium">Monitor ratings for tour quality, guide professionalism, and halal compliance.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            Sentiment Report
          </Button>
          <Button className="bg-amber-600 rounded-full px-8 font-black shadow-lg shadow-amber-200 h-12 text-white">
            Auto-Reply AI
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10 text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-7xl font-black text-slate-900 tracking-tighter">4.8</h2>
              <div className="flex justify-center gap-1.5">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-6 w-6 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Global Agency Score</p>
            </div>
            <div className="pt-6 border-t border-slate-50 space-y-4">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-4">
                  <span className="text-xs font-black text-slate-400 w-2">{star}</span>
                  <div className="h-2 bg-slate-50 rounded-full flex-1 overflow-hidden shadow-inner">
                    <div className="h-full bg-amber-600 rounded-full" style={{ width: star === 5 ? '88%' : star === 4 ? '10%' : '2%' }} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 w-8 text-right">{star === 5 ? '88%' : star === 4 ? '10%' : '2%'}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center text-amber-600">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-black tracking-tight">Trust Badge</h3>
            </div>
            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              Your "Trusted Pilgrim Partner" badge is active and driving 40% of your current leads.
            </p>
            <Button variant="secondary" className="w-full rounded-2xl h-12 font-black text-xs uppercase tracking-widest">Trust Metrics</Button>
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {reviews.map((rev) => (
              <Card key={rev.id} className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden border-2 border-transparent hover:border-amber-100 transition-all group">
                <div className="p-8 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-slate-50 shadow-sm">
                        <AvatarImage src={`https://picsum.photos/seed/rev-trv${rev.id}/100/100`} />
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
                    <Badge variant="secondary" className="bg-amber-50 text-amber-600 border-none font-black text-[9px] uppercase">{rev.tour}</Badge>
                  </div>
                  
                  <p className="text-slate-600 font-medium leading-relaxed italic text-base">
                    "{rev.comment}"
                  </p>

                  {rev.response ? (
                    <div className="p-6 bg-slate-50 rounded-3xl border-l-4 border-amber-600 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-black text-amber-600 uppercase tracking-widest">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Agency Response
                      </div>
                      <p className="text-sm font-bold text-slate-700">{rev.response}</p>
                    </div>
                  ) : (
                    <div className="pt-4 flex gap-3">
                      <Button className="rounded-2xl h-11 px-6 font-black uppercase text-[10px] tracking-widest bg-amber-600 text-white shadow-lg shadow-amber-200">
                        <Reply className="mr-2 h-4 w-4" /> Reply to Traveler
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
