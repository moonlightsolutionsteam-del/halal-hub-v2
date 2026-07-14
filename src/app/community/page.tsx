"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, Share2, Search, Plus, MessageCircleOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/client";

const CATEGORIES = ["All Topics", "Product Verification", "Restaurants", "Travel Guide", "Events", "Spiritual Support", "Discussion", "Question"];

type PostItem = {
  id: string
  display_name: string | null
  description: string | null
  post_type: string | null
  created_at: string | null
}

function timeAgo(ts: string | null): string {
  if (!ts) return ""
  const diff = Date.now() - new Date(ts).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

function postCategory(post_type: string | null): string {
  const map: Record<string, string> = {
    discussion: "Discussion",
    question: "Question",
    community: "Community",
    post: "General",
    review: "Review",
  }
  return map[post_type ?? ""] || "General"
}

function initials(name: string | null): string {
  if (!name) return "HH"
  return name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
}

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState("All Topics");
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<PostItem[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<{ members: number; dailyPosts: number } | null>(null)

  useEffect(() => {
    const supabase = createClient()

    ;(supabase as any)
      .from("feed_posts")
      .select("id, display_name, description, post_type, created_at")
      .in("post_type", ["discussion", "question", "community", "post"])
      .order("created_at", { ascending: false })
      .limit(40)
      .then(({ data }: { data: PostItem[] | null }) => {
        setLoading(false)
        if (data) setPosts(data)
      })

    const oneDayAgo = new Date(Date.now() - 86400000).toISOString()
    Promise.all([
      (supabase as any).from("profiles").select("id", { count: "exact", head: true }),
      (supabase as any).from("feed_posts").select("id", { count: "exact", head: true }).gte("created_at", oneDayAgo),
    ]).then(([{ count: members }, { count: daily }]: any[]) => {
      setStats({ members: members ?? 0, dailyPosts: daily ?? 0 })
    })
  }, [])

  const filteredPosts = posts.filter(post => {
    const cat = postCategory(post.post_type)
    const matchesCategory = activeCategory === "All Topics" || cat.toLowerCase().includes(activeCategory.toLowerCase())
    const matchesSearch = searchQuery === "" ||
      (post.description ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.display_name ?? "").toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  });

  return (
    <div className="px-4 sm:px-6 py-5 sm:py-8 space-y-5 max-w-5xl mx-auto">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-0.5 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-primary tracking-tight">Community</h1>
          <p className="text-muted-foreground text-sm font-medium hidden sm:block">Join thousands of members worldwide.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 rounded-2xl h-11 px-4 sm:px-6 font-bold shrink-0" asChild>
          <a href="/feed">
            <Plus className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Start Discussion</span>
          </a>
        </Button>
      </div>

      <div className="overflow-x-auto no-scrollbar -mx-4 sm:mx-0 px-4 sm:px-0">
        <div className="flex gap-2 w-max sm:w-auto sm:flex-wrap">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`h-9 px-4 rounded-full text-xs font-black whitespace-nowrap transition-colors shrink-0 ${
                activeCategory === cat
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-8">
        <aside className="hidden md:block md:col-span-1 space-y-4">
          <Card className="rounded-[1.5rem] border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-black">Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col">
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className={`text-left px-5 py-3 text-sm font-bold transition-colors rounded-xl mx-2 mb-0.5 ${
                      activeCategory === cat ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                    }`}>
                    {cat}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/10 rounded-[1.5rem] shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-black">Forum Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                ["Total Members", stats ? stats.members.toLocaleString() : "…"],
                ["Posts Today",   stats ? String(stats.dailyPosts) : "…"],
                ["Total Posts",   loading ? "…" : String(posts.length)],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between text-xs">
                  <span className="text-muted-foreground font-medium">{label}</span>
                  <span className="font-black text-foreground">{val}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>

        <div className="md:col-span-3 space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search discussions..."
              className="pl-10 h-12 rounded-2xl border-none bg-card shadow-sm font-medium"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            {loading && [1, 2, 3].map(i => (
              <div key={i} className="h-32 rounded-[1.5rem] bg-muted animate-pulse" />
            ))}

            {!loading && filteredPosts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <MessageCircleOff className="h-8 w-8 text-primary/40" />
                </div>
                <p className="font-black text-foreground">No discussions yet</p>
                <p className="text-sm text-muted-foreground font-medium">Be the first to start a conversation with the Ummah.</p>
                <Button asChild className="rounded-2xl font-bold">
                  <a href="/feed">Start a Discussion</a>
                </Button>
              </div>
            )}

            {filteredPosts.map(post => (
              <Card key={post.id} className="hover:shadow-md transition-all duration-200 cursor-pointer rounded-[1.5rem] sm:rounded-[2rem] border-none shadow-sm bg-card">
                <CardHeader className="flex-row gap-3 sm:gap-4 space-y-0 p-4 sm:p-6 pb-3">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary font-black text-sm">{initials(post.display_name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <span className="text-[11px] font-bold text-muted-foreground">{post.display_name || "Halal Hub Member"} · {timeAgo(post.created_at)}</span>
                      <Badge variant="outline" className="text-[9px] uppercase font-black shrink-0">{postCategory(post.post_type)}</Badge>
                    </div>
                    <p className="font-black text-foreground text-sm sm:text-base leading-snug line-clamp-2">{post.description || "—"}</p>
                  </div>
                </CardHeader>
                <CardFooter className="px-4 sm:px-6 py-3 border-t border-border/50 flex justify-between mt-0">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors min-h-[44px]">
                      <ThumbsUp className="h-4 w-4" /> 0
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors min-h-[44px]">
                      <MessageSquare className="h-4 w-4" /> 0
                    </button>
                  </div>
                  <button className="text-muted-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
                    <Share2 className="h-4 w-4" />
                  </button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {!loading && filteredPosts.length > 0 && (
            <Button variant="outline" className="w-full h-12 rounded-2xl font-bold border-2">Load More Discussions</Button>
          )}
        </div>
      </div>
    </div>
  );
}
