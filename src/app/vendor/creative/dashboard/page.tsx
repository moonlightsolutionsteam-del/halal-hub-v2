"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Upload, Play, FileText, Mic,
  TrendingUp, Users, BarChart3, Zap,
  ChevronRight, ShieldCheck, Star, Plus
} from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"

function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M"
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K"
  return String(n)
}

function timeAgo(iso: string | null): string {
  if (!iso) return ""
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

type CreatorRow = {
  id: string
  display_name: string | null
  bio: string | null
  category: string | null
  avatar_url: string | null
  follower_count: number | null
  post_count: number | null
  status: string | null
}

type Post = {
  id: string
  post_type: string
  description: string | null
  media_url: string | null
  firebase_media_url: string | null
  created_at: string | null
  status: string | null
}

export default function CreativeDashboardPage() {
  const { user } = useAuth()
  const [creator, setCreator] = React.useState<CreatorRow | null>(null)
  const [posts, setPosts] = React.useState<Post[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()

    Promise.all([
      supabase
        .from("creators")
        .select("id, display_name, bio, category, avatar_url, follower_count, post_count, status")
        .eq("user_id", user.uid)
        .maybeSingle(),
      supabase
        .from("feed_posts")
        .select("id, post_type, description, media_url, firebase_media_url, created_at, status")
        .eq("owner_id", user.uid)
        .order("created_at", { ascending: false })
        .limit(10),
    ]).then(([{ data: c }, { data: p }]) => {
      setCreator((c as CreatorRow | null) ?? null)
      setPosts((p as Post[] | null) ?? [])
      setLoading(false)
    })
  }, [user?.uid])

  const totalPosts = posts.length
  const videoPosts = posts.filter(p => {
    const url = p.media_url || p.firebase_media_url || ""
    return p.post_type === "video" || /\.(mp4|mov|webm)/i.test(url)
  }).length
  const recentPosts = posts.slice(0, 5)

  const postTypeIcon = (type: string, url: string | null) => {
    const isVideo = type === "video" || /\.(mp4|mov|webm)/i.test(url ?? "")
    if (isVideo) return <Play className="h-4 w-4 text-blue-500" />
    if (type === "article" || type === "blog") return <FileText className="h-4 w-4 text-emerald-500" />
    if (type === "podcast") return <Mic className="h-4 w-4 text-purple-500" />
    return <FileText className="h-4 w-4 text-muted-foreground" />
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4 sm:p-6 max-w-5xl space-y-6 pb-24">
        {[1, 2, 3].map(i => <div key={i} className="h-28 rounded-[2rem] bg-muted animate-pulse" />)}
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-5xl pb-24 text-foreground">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border-2 border-primary/20">
            <AvatarImage src={creator?.avatar_url ?? undefined} />
            <AvatarFallback className="bg-primary/10 text-primary font-black text-xl">
              {(creator?.display_name ?? user?.name ?? "C")[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-foreground">
                {creator?.display_name ?? user?.name ?? "Creator Studio"}
              </h1>
              {creator?.status === "active" && (
                <ShieldCheck className="h-5 w-5 text-primary" />
              )}
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              {creator?.category ?? "Content Creator"} · Halal Hub Studio
            </p>
          </div>
        </div>
        <Button asChild className="rounded-2xl h-11 gap-2 font-bold shrink-0">
          <Link href="/vendor/creative/content/upload">
            <Upload className="h-4 w-4" /> Upload
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Followers", value: fmt(creator?.follower_count ?? 0), icon: Users, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/30" },
          { label: "Total Posts", value: fmt(totalPosts), icon: BarChart3, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
          { label: "Reels", value: fmt(videoPosts), icon: Play, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-950/30" },
          { label: "Tier", value: "Rising", icon: Star, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-950/30" },
        ].map(stat => (
          <Card key={stat.label} className="rounded-[1.5rem] border-none shadow-sm">
            <CardContent className="p-4 sm:p-5 flex items-center gap-3">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xl font-black text-foreground leading-none">{stat.value}</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: "Upload New Content", desc: "Video, podcast, or article", href: "/vendor/creative/content/upload", icon: Upload, primary: true },
          { label: "View Analytics", desc: "Reach & engagement stats", href: "/vendor/creative/analytics", icon: TrendingUp, primary: false },
          { label: "My Audience", desc: "Who's following you", href: "/vendor/creative/audience", icon: Users, primary: false },
        ].map(a => (
          <Link key={a.href} href={a.href}>
            <Card className={`rounded-[1.5rem] border-none shadow-sm hover:shadow-md transition-all cursor-pointer ${a.primary ? "bg-primary text-primary-foreground" : "bg-card"}`}>
              <CardContent className="p-4 flex items-center gap-3">
                <a.icon className="h-5 w-5 shrink-0" />
                <div>
                  <p className="font-black text-sm">{a.label}</p>
                  <p className={`text-[11px] font-medium ${a.primary ? "opacity-80" : "text-muted-foreground"}`}>{a.desc}</p>
                </div>
                <ChevronRight className="h-4 w-4 ml-auto opacity-50" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent content */}
      <Card className="rounded-[2rem] border-none shadow-sm">
        <CardHeader className="flex-row items-center justify-between pb-3">
          <CardTitle className="text-base font-black">Recent Posts</CardTitle>
          <Button variant="ghost" size="sm" className="text-xs font-bold text-primary" asChild>
            <Link href="/vendor/creative/content/published">View all</Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {recentPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center gap-3">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Upload className="h-7 w-7 text-primary/40" />
              </div>
              <p className="font-black text-foreground">No posts yet</p>
              <p className="text-sm text-muted-foreground">Upload your first piece of content to get started.</p>
              <Button asChild className="rounded-xl font-bold mt-1">
                <Link href="/vendor/creative/content/upload">
                  <Plus className="h-4 w-4 mr-2" /> Create First Post
                </Link>
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {recentPosts.map(post => (
                <div key={post.id} className="flex items-center gap-3 px-5 py-4 hover:bg-muted/30 transition-colors">
                  <div className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    {postTypeIcon(post.post_type, post.media_url || post.firebase_media_url)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">
                      {post.description || "Untitled post"}
                    </p>
                    <p className="text-[11px] text-muted-foreground font-medium">
                      {post.post_type} · {timeAgo(post.created_at)}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-[9px] font-black uppercase shrink-0 ${
                      post.status === "active"
                        ? "border-emerald-200 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {post.status ?? "draft"}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Profile completeness nudge */}
      {!creator && (
        <Card className="rounded-[2rem] border-none shadow-sm bg-primary/5 border-2 border-primary/10">
          <CardContent className="p-5 flex items-center gap-4">
            <Zap className="h-8 w-8 text-primary shrink-0" />
            <div className="flex-1">
              <p className="font-black text-foreground">Complete your creator profile</p>
              <p className="text-sm text-muted-foreground">Add bio, category, and social links to get discovered.</p>
            </div>
            <Button asChild size="sm" className="rounded-xl font-bold shrink-0">
              <Link href="/vendor/creative/profile">Set up</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
