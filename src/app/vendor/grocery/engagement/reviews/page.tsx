
"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Star, Reply, MoreVertical, TrendingUp, CheckCircle2
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Review = {
  id: string; rating: number; body: string | null; created_at: string
  business_response: string | null
  profiles: { name: string | null } | null
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const d = Math.floor(diff / 86400000)
  if (d > 0) return `${d}d ago`
  const h = Math.floor(diff / 3600000)
  if (h > 0) return `${h}h ago`
  return "Just now"
}

export default function EngagementReviewsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [businessId, setBusinessId] = useState<string | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [avgRating, setAvgRating] = useState<number | null>(null)
  const [distribution, setDistribution] = useState<Record<number, number>>({})
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({})
  const [replyingTo, setReplyingTo] = useState<string | null>(null)

  useEffect(() => {
    if (!user?.id) return
    const supabase = createClient()
    ;(supabase as any).from("businesses").select("id, rating").eq("owner_id", user.id).limit(1)
      .then(({ data }: { data: { id: string; rating: number | null }[] | null }) => {
        const biz = data?.[0]
        if (!biz) return
        setBusinessId(biz.id)
        setAvgRating(biz.rating)
        loadReviews(biz.id)
      })
  }, [user?.id])

  function loadReviews(bizId: string) {
    const supabase = createClient()
    ;(supabase as any)
      .from("business_reviews")
      .select("id, rating, body, created_at, business_response, profiles(name)")
      .eq("business_id", bizId)
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .then(({ data }: { data: Review[] | null }) => {
        const rows = data ?? []
        setReviews(rows)
        const dist: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
        rows.forEach(r => { dist[r.rating] = (dist[r.rating] ?? 0) + 1 })
        setDistribution(dist)
      })
  }

  async function submitReply(reviewId: string) {
    const text = replyDrafts[reviewId]?.trim()
    if (!text || !businessId) return
    const supabase = createClient()
    const { error } = await (supabase as any)
      .from("business_reviews")
      .update({ business_response: text, business_response_at: new Date().toISOString() })
      .eq("id", reviewId)
    if (error) {
      toast({ variant: "destructive", title: "Couldn't send reply", description: error.message })
      return
    }
    setReplyingTo(null)
    loadReviews(businessId)
  }

  const total = reviews.length
  const maxCount = Math.max(1, ...Object.values(distribution))

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-[10px]">
            <Star className="h-3 w-3" /> Store Reputation
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Customer Feedback</h1>
          <p className="text-muted-foreground font-medium">Monitor retail ratings for freshness, stock availability, and delivery speed.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">
        <div className="lg:col-span-4 space-y-6">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10 text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-7xl font-black text-foreground tracking-tighter">{avgRating ? avgRating.toFixed(1) : "—"}</h2>
              <div className="flex justify-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-6 w-6 ${avgRating && i < Math.round(avgRating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
                ))}
              </div>
              <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">{total} Review{total !== 1 ? "s" : ""}</p>
            </div>
            <div className="pt-6 border-t border-border space-y-4">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-4">
                  <span className="text-xs font-black text-muted-foreground w-2">{star}</span>
                  <div className="h-2 bg-muted rounded-full flex-1 overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${((distribution[star] ?? 0) / maxCount) * 100}%` }} />
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground w-8">{distribution[star] ?? 0}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-card/10 rounded-xl flex items-center justify-center text-emerald-600">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-black tracking-tight">Trust Growth</h3>
            </div>
            <p className="text-sm text-muted-foreground font-medium leading-relaxed">
              Your verified listing status is visible to every shopper browsing your store.
            </p>
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {reviews.length === 0 ? (
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-16 text-center text-muted-foreground">
                No reviews yet.
              </Card>
            ) : reviews.map((rev) => (
              <Card key={rev.id} className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden border-2 border-transparent hover:border-emerald-100 transition-all group">
                <div className="p-8 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-border shadow-sm">
                        <AvatarFallback>{(rev.profiles?.name ?? "S")[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-base font-black text-foreground">{rev.profiles?.name ?? "Shopper"}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex gap-0.5">
                            {Array.from({ length: rev.rating }).map((_, i) => <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />)}
                          </div>
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">{timeAgo(rev.created_at)}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full"><MoreVertical className="h-5 w-5 text-muted-foreground" /></Button>
                  </div>

                  {rev.body && (
                    <p className="text-muted-foreground font-medium leading-relaxed italic text-base">
                      "{rev.body}"
                    </p>
                  )}

                  {rev.business_response ? (
                    <div className="p-6 bg-muted rounded-3xl border-l-4 border-emerald-600 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-black text-emerald-600 uppercase tracking-widest">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Your Response
                      </div>
                      <p className="text-sm font-bold text-foreground">{rev.business_response}</p>
                    </div>
                  ) : replyingTo === rev.id ? (
                    <div className="space-y-3">
                      <Textarea
                        value={replyDrafts[rev.id] ?? ""}
                        onChange={(e) => setReplyDrafts(d => ({ ...d, [rev.id]: e.target.value }))}
                        placeholder="Write a reply to this shopper..."
                        className="rounded-2xl"
                      />
                      <div className="flex gap-2">
                        <Button onClick={() => submitReply(rev.id)} className="rounded-2xl h-10 px-6 font-black text-xs bg-emerald-600 text-white">Send Reply</Button>
                        <Button variant="outline" onClick={() => setReplyingTo(null)} className="rounded-2xl h-10 px-6 font-black text-xs">Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-4 flex gap-3">
                      <Button onClick={() => setReplyingTo(rev.id)} className="rounded-2xl h-11 px-6 font-black uppercase text-[10px] tracking-widest bg-emerald-600 text-white shadow-lg shadow-emerald-200">
                        <Reply className="mr-2 h-4 w-4" /> Reply to Shopper
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
