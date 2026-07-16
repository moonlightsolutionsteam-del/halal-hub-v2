"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MessageSquare } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"

type Review = {
  id: string
  rating: number
  title: string | null
  body: string | null
  status: string
  created_at: string | null
  profiles: { name: string | null } | null
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} className={`h-3.5 w-3.5 ${s <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/20"}`} />
      ))}
    </div>
  )
}

function timeAgo(iso: string | null): string {
  if (!iso) return ""
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
}

export default function EngagementReviewsPage() {
  const { user, loading: authLoading } = useAuth()
  const [reviews, setReviews] = React.useState<Review[]>([])
  const [loading, setLoading] = React.useState(true)

  const avgRating = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : null

  React.useEffect(() => {
    if (authLoading) return
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    ;(supabase as any)
      .from("businesses").select("id").eq("owner_id", user.uid).limit(1).maybeSingle()
      .then(({ data }: { data: { id: string } | null }) => {
        if (!data) { setLoading(false); return }
        ;(supabase as any)
          .from("business_reviews")
          .select("id, rating, title, body, status, created_at, profiles(name)")
          .eq("business_id", data.id)
          .order("created_at", { ascending: false })
          .then(({ data: rows }: { data: Review[] | null }) => {
            setReviews(rows ?? [])
            setLoading(false)
          })
      })
  }, [user?.uid, authLoading])

  const counts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
  }))
  const maxCount = Math.max(...counts.map(c => c.count), 1)

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 max-w-5xl mx-auto pb-24">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
          <Star className="h-3 w-3" /> Reputation
        </div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Customer Reviews</h1>
        <p className="text-muted-foreground font-medium">See what diners are saying about your restaurant.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-4">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-primary text-primary-foreground p-8 text-center space-y-3 h-full flex flex-col justify-center">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">Overall Rating</p>
            <h2 className="text-7xl font-black tracking-tighter">{avgRating ? avgRating.toFixed(1) : "—"}</h2>
            {avgRating && (
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} className={`h-5 w-5 ${s <= Math.round(avgRating) ? "fill-primary-foreground" : "fill-primary-foreground/20"}`} />
                ))}
              </div>
            )}
            <p className="text-sm font-bold opacity-80">{reviews.length} review{reviews.length !== 1 ? "s" : ""}</p>
          </Card>
        </div>

        <div className="lg:col-span-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-4 h-full">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Rating Breakdown</p>
            {counts.map(({ star, count }) => (
              <div key={star} className="flex items-center gap-3">
                <span className="text-xs font-black w-4 text-muted-foreground">{star}</span>
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 shrink-0" />
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${(count / maxCount) * 100}%` }} />
                </div>
                <span className="text-xs font-black w-4 text-right text-muted-foreground">{count}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">All Reviews</p>
        {reviews.length === 0 && (
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-12 text-center space-y-3">
            <MessageSquare className="h-10 w-10 text-muted-foreground/30 mx-auto" />
            <p className="font-black text-foreground">No reviews yet</p>
            <p className="text-sm text-muted-foreground">Reviews from your customers will appear here once submitted.</p>
          </Card>
        )}
        {reviews.map(review => (
          <Card key={review.id} className="rounded-[2rem] border-none shadow-sm bg-card">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div className="space-y-1">
                  <p className="text-sm font-black text-foreground">{review.profiles?.name ?? "Anonymous"}</p>
                  <StarRow rating={review.rating} />
                </div>
                <div className="flex items-center gap-2">
                  {review.status === "published"
                    ? <Badge className="bg-emerald-50 text-emerald-700 border-none text-[9px] font-black uppercase">Published</Badge>
                    : <Badge variant="secondary" className="text-[9px] font-black uppercase">{review.status}</Badge>
                  }
                  <span className="text-[10px] text-muted-foreground font-medium">{timeAgo(review.created_at)}</span>
                </div>
              </div>
              {review.title && <p className="text-sm font-black text-foreground">{review.title}</p>}
              {review.body && <p className="text-sm text-muted-foreground font-medium leading-relaxed">{review.body}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
