"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Search, Loader2, Trash2, CheckCircle2, XCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

type Review = {
  id: string
  rating: number
  title: string | null
  body: string | null
  status: string
  created_at: string
  business: { name: string } | null
  profiles: { name: string | null } | null
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => <Star key={s} className={`h-3 w-3 ${s<=n?"fill-amber-400 text-amber-400":"text-muted-foreground/20"}`} />)}
    </div>
  )
}

export default function AdminReviewsPage() {
  const { toast } = useToast()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  function load() {
    const supabase = createClient()
    ;(supabase as any)
      .from("business_reviews")
      .select("id, rating, title, body, status, created_at, business:businesses(name), profiles(name)")
      .order("created_at", { ascending: false })
      .limit(200)
      .then(({ data }: { data: Review[] | null }) => {
        setReviews(data ?? [])
        setLoading(false)
      })
  }

  useEffect(() => { load() }, [])

  async function setStatus(id: string, status: string) {
    const supabase = createClient()
    await (supabase as any).from("business_reviews").update({ status }).eq("id", id)
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r))
    toast({ title: `Review ${status}` })
  }

  async function deleteReview(id: string) {
    const supabase = createClient()
    await (supabase as any).from("business_reviews").delete().eq("id", id)
    setReviews(prev => prev.filter(r => r.id !== id))
    toast({ title: "Review deleted" })
  }

  const filtered = reviews.filter(r => {
    const q = search.toLowerCase()
    return !q || (r.title ?? "").toLowerCase().includes(q) || (r.body ?? "").toLowerCase().includes(q) ||
      (r.business?.name ?? "").toLowerCase().includes(q) || (r.profiles?.name ?? "").toLowerCase().includes(q)
  })

  const pending = filtered.filter(r => r.status === "pending")
  const active = filtered.filter(r => r.status === "active")
  const rejected = filtered.filter(r => r.status === "rejected")

  function ReviewList({ items }: { items: Review[] }) {
    return items.length === 0 ? (
      <div className="text-center py-12 text-muted-foreground">
        <Star className="h-8 w-8 mx-auto mb-2 opacity-30" />
        <p className="font-medium text-sm">{search ? "No matches." : "No reviews."}</p>
      </div>
    ) : (
      <div className="space-y-3">
        {items.map(r => {
          const date = new Date(r.created_at).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })
          return (
            <Card key={r.id} className="rounded-2xl border-none shadow-sm">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Stars n={r.rating} />
                      <span className="text-xs font-bold text-muted-foreground">{date}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {r.profiles?.name ?? "Anonymous"} → <span className="font-bold">{r.business?.name ?? "Unknown Business"}</span>
                    </p>
                  </div>
                  <Badge className={`text-[10px] shrink-0 ${r.status === "active" ? "bg-emerald-50 text-emerald-700" : r.status === "pending" ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"}`}>
                    {r.status}
                  </Badge>
                </div>
                {r.title && <p className="text-sm font-bold text-foreground">{r.title}</p>}
                {r.body && <p className="text-sm text-muted-foreground line-clamp-2">{r.body}</p>}
                <div className="flex gap-2 pt-1">
                  {r.status !== "active" && (
                    <Button size="sm" variant="outline" onClick={() => setStatus(r.id, "active")} className="h-7 text-[11px] text-emerald-600 border-emerald-200 hover:bg-emerald-50">
                      <CheckCircle2 className="h-3 w-3 mr-1" /> Approve
                    </Button>
                  )}
                  {r.status !== "rejected" && (
                    <Button size="sm" variant="outline" onClick={() => setStatus(r.id, "rejected")} className="h-7 text-[11px] text-amber-600 border-amber-200 hover:bg-amber-50">
                      <XCircle className="h-3 w-3 mr-1" /> Reject
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={() => deleteReview(r.id)} className="h-7 text-[11px] text-red-600 border-red-200 hover:bg-red-50">
                    <Trash2 className="h-3 w-3 mr-1" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-foreground">Reviews Moderation</h1>
        <p className="text-sm text-muted-foreground font-medium">Approve, reject, or remove business reviews.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by reviewer, business, or content..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-11 rounded-xl" />
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <Tabs defaultValue="pending">
          <TabsList className="rounded-full h-11">
            <TabsTrigger value="pending" className="rounded-full">Pending <Badge className="ml-2 text-[10px] h-5 px-1.5">{pending.length}</Badge></TabsTrigger>
            <TabsTrigger value="active" className="rounded-full">Active <Badge className="ml-2 text-[10px] h-5 px-1.5">{active.length}</Badge></TabsTrigger>
            <TabsTrigger value="rejected" className="rounded-full">Rejected <Badge className="ml-2 text-[10px] h-5 px-1.5">{rejected.length}</Badge></TabsTrigger>
          </TabsList>
          <TabsContent value="pending" className="mt-4"><ReviewList items={pending} /></TabsContent>
          <TabsContent value="active" className="mt-4"><ReviewList items={active} /></TabsContent>
          <TabsContent value="rejected" className="mt-4"><ReviewList items={rejected} /></TabsContent>
        </Tabs>
      )}
    </div>
  )
}
