"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Star, MessageSquare, Reply, ThumbsUp,
  Search, Filter, TrendingUp, CheckCircle2,
  MoreVertical, MoreHorizontal
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ButcherReviewsPage() {
  const [showFeedbackAnalyticsModal, setShowFeedbackAnalyticsModal] = useState(false)
  const [showAutoReplyModal, setShowAutoReplyModal] = useState(false)
  const [showTrustReportsModal, setShowTrustReportsModal] = useState(false)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showReplyModal, setShowReplyModal] = useState(false)
  const [showThankModal, setShowThankModal] = useState(false)
  const [selectedReview, setSelectedReview] = useState<{ user: string; comment: string } | null>(null)

  const reviews = [
    { id: 1, user: "Sarah Ahmed", rating: 5, date: "2 hours ago", comment: "The Mutton Curry Cut was incredibly fresh and properly trimmed. The sourcing logs give me real peace of mind.", response: "JazakAllah Sarah! We source only from HMC certified farms." },
    { id: 2, user: "Omar Malik", rating: 4, date: "1 day ago", comment: "Great quality beef ribs. Delivery was quick but the packaging could be a bit more robust.", response: null },
    { id: 3, user: "Aisha Khalil", rating: 5, date: "3 days ago", comment: "Best butcher in the city for organic poultry. Their staff is always respectful and the shop is spotless.", response: "Thank you Aisha! We prioritize cleanliness and ethics above all else." },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-red-600 font-black uppercase tracking-widest text-[10px]">
            <Star className="h-3 w-3" /> Shop Reputation
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Customer Feedback</h1>
          <p className="text-muted-foreground font-medium">Monitor ratings for freshness, cut accuracy, and delivery speed.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowFeedbackAnalyticsModal(true)} className="rounded-full px-6 font-bold border-2 h-12">
            Feedback Analytics
          </Button>
          <Button onClick={() => setShowAutoReplyModal(true)} className="bg-red-600 rounded-full px-8 font-black shadow-lg shadow-red-200 h-12 text-white">
            Auto-Reply AI
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">
        <div className="lg:col-span-4 space-y-6">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10 text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-7xl font-black text-foreground tracking-tighter">4.9</h2>
              <div className="flex justify-center gap-1.5">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-6 w-6 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">Global Shop Score</p>
            </div>
            <div className="pt-6 border-t border-border space-y-4">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-4">
                  <span className="text-xs font-black text-muted-foreground w-2">{star}</span>
                  <div className="h-2 bg-muted rounded-full flex-1 overflow-hidden">
                    <div className="h-full bg-red-600 rounded-full" style={{ width: star === 5 ? '92%' : star === 4 ? '6%' : '2%' }} />
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground w-8">{star === 5 ? '92%' : star === 4 ? '6%' : '2%'}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-card/10 rounded-xl flex items-center justify-center text-red-600">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-black tracking-tight">Trust Growth</h3>
            </div>
            <p className="text-sm text-muted-foreground font-medium leading-relaxed">
              Your "Source Verified" badge has increased local confidence by 35% this month.
            </p>
            <Button variant="secondary" onClick={() => setShowTrustReportsModal(true)} className="w-full rounded-2xl h-12 font-black text-xs uppercase tracking-widest">Trust Reports</Button>
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-2">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search comments..." className="pl-9 h-11 rounded-2xl bg-card border-none shadow-sm font-medium" />
            </div>
            <Button variant="outline" size="icon" onClick={() => setShowFilterModal(true)} className="h-11 w-11 rounded-2xl bg-card border-none shadow-sm"><Filter className="h-4 w-4" /></Button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {reviews.map((rev) => (
              <Card key={rev.id} className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden border-2 border-transparent hover:border-red-100 transition-all group">
                <div className="p-8 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-border shadow-sm">
                        <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100/100`} />
                        <AvatarFallback>{rev.user[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-base font-black text-foreground">{rev.user}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex gap-0.5">
                            {Array.from({ length: rev.rating }).map((_, i) => <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />)}
                          </div>
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">{rev.date}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal className="h-5 w-5 text-muted-foreground" /></Button>
                  </div>

                  <p className="text-muted-foreground font-medium leading-relaxed italic text-base">
                    "{rev.comment}"
                  </p>

                  {rev.response ? (
                    <div className="p-6 bg-muted rounded-3xl border-l-4 border-red-600 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-black text-red-600 uppercase tracking-widest">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Shop Response
                      </div>
                      <p className="text-sm font-bold text-foreground">{rev.response}</p>
                    </div>
                  ) : (
                    <div className="pt-4 flex gap-3">
                      <Button onClick={() => { setSelectedReview(rev); setShowReplyModal(true); }} className="rounded-2xl h-11 px-6 font-black uppercase text-[10px] tracking-widest bg-red-600 text-white shadow-lg shadow-red-200">
                        <Reply className="mr-2 h-4 w-4" /> Reply to Guest
                      </Button>
                      <Button variant="outline" onClick={() => { setSelectedReview(rev); setShowThankModal(true); }} className="rounded-2xl h-11 px-6 font-black uppercase text-[10px] tracking-widest border-2">
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

      {/* Feedback Analytics Modal */}
      <Dialog open={showFeedbackAnalyticsModal} onOpenChange={setShowFeedbackAnalyticsModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Feedback Analytics</DialogTitle>
            <DialogDescription>Insights from customer reviews across freshness, cuts, and delivery.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            {[
              { label: "Freshness Score", value: "4.9 / 5" },
              { label: "Cut Accuracy", value: "4.8 / 5" },
              { label: "Delivery Speed", value: "4.7 / 5" },
              { label: "Packaging", value: "4.6 / 5" },
            ].map((metric, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-2xl">
                <span className="text-sm font-black text-foreground">{metric.label}</span>
                <span className="text-sm font-black text-red-600">{metric.value}</span>
              </div>
            ))}
            <Button className="w-full h-12 rounded-2xl font-black bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowFeedbackAnalyticsModal(false)}>Export Report</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Auto-Reply AI Modal */}
      <Dialog open={showAutoReplyModal} onOpenChange={setShowAutoReplyModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Auto-Reply AI</DialogTitle>
            <DialogDescription>Configure AI-powered automatic responses to new customer reviews.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Default Tone</Label>
              <Input placeholder="e.g. Warm, Professional, Friendly" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Reply to Ratings Below</Label>
              <Input placeholder="e.g. Only 3 stars and below" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Custom Closing Message</Label>
              <Textarea placeholder="e.g. JazakAllah for your feedback! We strive to improve." className="rounded-2xl bg-muted border-none font-bold min-h-[80px]" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowAutoReplyModal(false)}>Enable Auto-Reply</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Trust Reports Modal */}
      <Dialog open={showTrustReportsModal} onOpenChange={setShowTrustReportsModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Trust Reports</DialogTitle>
            <DialogDescription>Overview of your trust score growth and verified sourcing impact.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            {[
              { label: "Source Verified Badge Impact", value: "+35%" },
              { label: "Repeat Customer Rate", value: "68%" },
              { label: "Trust Score This Month", value: "9.4 / 10" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-2xl">
                <span className="text-sm font-black text-foreground">{item.label}</span>
                <span className="text-sm font-black text-emerald-600">{item.value}</span>
              </div>
            ))}
            <Button className="w-full h-12 rounded-2xl font-black bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowTrustReportsModal(false)}>Download Report</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Filter Reviews Modal */}
      <Dialog open={showFilterModal} onOpenChange={setShowFilterModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Filter Reviews</DialogTitle>
            <DialogDescription>Narrow down feedback by rating, date, or response status.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Rating</Label>
              <Input placeholder="e.g. 5 stars, 4 stars, all" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Date Range</Label>
              <Input placeholder="e.g. Last 7 days, Last month" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Response Status</Label>
              <Input placeholder="e.g. Replied, Pending reply" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowFilterModal(false)}>Apply Filter</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reply to Guest Modal */}
      <Dialog open={showReplyModal} onOpenChange={setShowReplyModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Reply to {selectedReview?.user}</DialogTitle>
            <DialogDescription>Write a public response to this customer's review.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="p-4 bg-muted rounded-2xl">
              <p className="text-sm text-muted-foreground italic">"{selectedReview?.comment}"</p>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Your Response</Label>
              <Textarea placeholder="JazakAllah for your feedback! We're glad you enjoyed..." className="rounded-2xl bg-muted border-none font-bold min-h-[100px]" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowReplyModal(false)}>Post Reply</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Thank Guest Modal */}
      <Dialog open={showThankModal} onOpenChange={setShowThankModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Thank {selectedReview?.user}</DialogTitle>
            <DialogDescription>Send a thank-you note to this customer for their review.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Thank-you Message</Label>
              <Textarea placeholder="JazakAllah Khayran for your kind words! Your support means everything to us..." className="rounded-2xl bg-muted border-none font-bold min-h-[100px]" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowThankModal(false)}>Send Thanks</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
