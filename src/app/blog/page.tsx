"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen, Search,
  ArrowUpRight, Clock, Sparkles, Rss
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

type FeedPost = {
  id: string
  display_name: string | null
  description: string | null
  media_url: string | null
  firebase_media_url: string | null
  post_type: string | null
  created_at: string | null
  business_name: string | null
}

function timeAgo(ts: string | null): string {
  if (!ts) return ""
  const diff = Date.now() - new Date(ts).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  return new Date(ts).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
}

function categoryLabel(post_type: string | null, business_name: string | null): string {
  if (business_name) return business_name
  const map: Record<string, string> = {
    discussion: "Discussion",
    question: "Q&A",
    community: "Community",
    review: "Review",
    recommendation: "Recommendation",
    post: "Insight",
  }
  return map[post_type ?? ""] || "Insight"
}

function initials(name: string | null): string {
  if (!name) return "HH"
  return name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
}

export default function BlogFeedPage() {
  const [posts, setPosts] = React.useState<FeedPost[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const supabase = createClient()
    ;supabase
      .from("feed_posts")
      .select("id, display_name, description, media_url, firebase_media_url, post_type, created_at, business_name")
      .order("created_at", { ascending: false })
      .limit(20)
      .then(({ data }: { data: FeedPost[] | null }) => {
        setLoading(false)
        if (data) setPosts(data)
      })
  }, [])

  const featured = posts[0] ?? null
  const rest = posts.slice(1, 9)

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-32">
        <div className="h-12 w-64 bg-muted animate-pulse rounded-2xl" />
        <div className="h-[460px] bg-muted animate-pulse rounded-[4rem]" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[1,2,3,4].map(i => <div key={i} className="h-72 bg-muted animate-pulse rounded-[2.5rem]" />)}
        </div>
      </div>
    )
  }

  if (!loading && posts.length === 0) {
    return (
      <div className="container mx-auto p-6 max-w-7xl pb-32 flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
        <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center">
          <BookOpen className="h-10 w-10 text-primary/40" />
        </div>
        <div>
          <p className="text-2xl font-black text-foreground">No stories yet</p>
          <p className="text-muted-foreground font-medium mt-2">Community members haven't posted any stories yet.</p>
        </div>
        <Link href="/feed">
          <Button className="rounded-2xl font-bold h-14 px-10">Share a Story</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-16 max-w-7xl pb-32 text-foreground">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="space-y-2">
          <Badge variant="outline" className="px-4 py-1.5 rounded-full border-primary/20 text-primary font-black uppercase text-[10px] tracking-[0.2em] bg-primary/5">
            Voice of Ummah
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black font-headline text-foreground tracking-tighter">Community Journal</h1>
          <p className="text-xl text-muted-foreground font-medium italic max-w-xl">Stories, research, and insights from the heart of the global hub.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search stories..." className="pl-12 h-14 rounded-[1.5rem] bg-card border-none shadow-sm font-medium text-lg" />
          </div>
          <Button variant="outline" className="h-14 w-14 rounded-[1.5rem] bg-card border-none shadow-sm"><Rss className="h-6 w-6 text-primary" /></Button>
        </div>
      </div>

      {/* Featured Article */}
      {featured && (
        <Link href={`/feed`}>
          <Card className="rounded-[4rem] border-none shadow-2xl overflow-hidden bg-card group cursor-pointer hover:-translate-y-1 transition-all duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-full min-h-[400px] bg-muted">
                {(featured.media_url || featured.firebase_media_url) ? (
                  <Image
                    src={featured.media_url || featured.firebase_media_url || ""}
                    alt="Featured"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="h-20 w-20 text-muted-foreground/20" />
                  </div>
                )}
                <div className="absolute top-10 left-10">
                  <Badge className="bg-primary text-white border-none font-black text-xs px-6 py-2 rounded-full shadow-2xl uppercase tracking-[0.2em]">FEATURED STORY</Badge>
                </div>
              </div>
              <div className="p-12 space-y-10 flex flex-col justify-center">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="bg-primary/5 text-primary border-none font-black text-[10px] px-4 py-1.5 rounded-full uppercase tracking-widest">
                      {categoryLabel(featured.post_type, featured.business_name)}
                    </Badge>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight group-hover:text-primary transition-colors line-clamp-4">
                    {featured.description || "Community Story"}
                  </h2>
                </div>
                <div className="flex items-center justify-between pt-10 border-t border-border">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 border-4 border-border shadow-md">
                      <AvatarFallback className="bg-primary/10 text-primary font-black">{initials(featured.display_name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-lg font-black text-foreground">{featured.display_name || "Halal Hub Member"}</p>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{timeAgo(featured.created_at)}</p>
                    </div>
                  </div>
                  <div className="h-16 w-16 rounded-[2rem] bg-zinc-900 text-white flex items-center justify-center shadow-2xl group-hover:bg-primary transition-all group-hover:translate-x-2">
                    <ArrowUpRight className="h-8 w-8" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      )}

      {/* Grid Feed */}
      {rest.length > 0 && (
        <section className="space-y-10">
          <div className="flex items-center justify-between px-4">
            <h3 className="text-xl sm:text-3xl font-black tracking-tighter">Latest Stories</h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {rest.map(post => {
              const img = post.media_url || post.firebase_media_url
              return (
                <Link key={post.id} href="/feed">
                  <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-2xl transition-all duration-500 group flex flex-col h-full border border-transparent hover:border-primary/10 cursor-pointer">
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      {img ? (
                        <Image src={img} alt={post.description?.slice(0, 40) ?? "Post"} fill className="object-cover group-hover:scale-110 transition-transform duration-700" unoptimized />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <BookOpen className="h-10 w-10 text-muted-foreground/20" />
                        </div>
                      )}
                      <Badge className="absolute top-4 left-4 bg-card/90 backdrop-blur-md text-primary font-black border-none px-3 py-1 rounded-full text-[9px] uppercase tracking-widest shadow-lg">
                        {categoryLabel(post.post_type, post.business_name)}
                      </Badge>
                    </div>
                    <CardHeader className="p-5 sm:p-8 flex-1 space-y-4">
                      <h3 className="text-base sm:text-xl font-black leading-tight group-hover:text-primary transition-colors line-clamp-3">{post.description || "—"}</h3>
                      <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                            <AvatarFallback className="bg-primary/10 text-primary font-black text-xs">{initials(post.display_name)}</AvatarFallback>
                          </Avatar>
                          <span className="text-[10px] font-black uppercase text-muted-foreground tracking-tighter">{post.display_name || "Member"}</span>
                        </div>
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{timeAgo(post.created_at)}</span>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* CTA */}
      <Card className="rounded-[4rem] border-none bg-zinc-900 text-white p-16 text-center space-y-10 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-5" />
        <div className="max-w-2xl lg:max-w-5xl mx-auto space-y-6 relative z-10">
          <Sparkles className="h-16 w-16 text-primary mx-auto animate-pulse" />
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black font-headline tracking-tight">Share Your Story</h2>
            <p className="text-muted-foreground font-medium text-xl leading-relaxed italic">
              "Your experiences, insights, and faith journey can inspire thousands of Muslims across India."
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <Link href="/feed">
              <Button className="h-16 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase text-sm tracking-widest shadow-2xl transition-all active:scale-95">
                Start Writing
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
