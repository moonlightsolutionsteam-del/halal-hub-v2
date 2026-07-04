"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const reviews = [
  { name: "Zainab Malik", rating: 5, text: "Dr. Rahman is incredibly thorough and caring. Highly recommend for family care.", time: "2 days ago" },
  { name: "Hassan Iqbal", rating: 5, text: "Very professional practice, appointments always run on time.", time: "1 week ago" },
  { name: "Fatima Noor", rating: 4, text: "Great service overall, though booking online could be smoother.", time: "2 weeks ago" },
]

export default function ProfessionalReviewsPage() {
  const avgRating = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline text-foreground tracking-tight">Reviews</h1>
        <p className="text-sm font-bold text-muted-foreground">See what your clients are saying.</p>
      </div>

      <Card className="rounded-[2rem] border-none shadow-soft">
        <CardContent className="p-6 flex items-center gap-6">
          <div className="text-5xl font-black text-foreground">{avgRating}</div>
          <div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
            </div>
            <p className="text-xs font-bold text-muted-foreground mt-1">{reviews.length} reviews</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {reviews.map((r, i) => (
          <Card key={i} className="rounded-[2rem] border-none shadow-soft">
            <CardContent className="p-5 flex items-start gap-4">
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarImage src={`https://picsum.photos/seed/reviewer${i}/100/100`} />
                <AvatarFallback>{r.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-black text-foreground">{r.name}</p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.rating }).map((_, s) => <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />)}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{r.text}</p>
                <p className="text-xs text-muted-foreground font-medium mt-2">{r.time}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
