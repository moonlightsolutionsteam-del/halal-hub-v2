"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Upload, Play, FileText, Mic, Trash2,
  MoreHorizontal, Plus, Eye, Search
} from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function timeAgo(iso: string | null): string {
  if (!iso) return ""
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
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

function PostTypeIcon({ type, url }: { type: string; url: string | null }) {
  const isVideo = type === "video" || /\.(mp4|mov|webm)/i.test(url ?? "")
  if (isVideo) return <Play className="h-4 w-4 text-blue-500" />
  if (type === "article") return <FileText className="h-4 w-4 text-emerald-500" />
  if (type === "podcast") return <Mic className="h-4 w-4 text-purple-500" />
  return <FileText className="h-4 w-4 text-muted-foreground" />
}

export default function PublishedContentPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [posts, setPosts] = React.useState<Post[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [filter, setFilter] = React.useState<"all" | "video" | "podcast" | "article">("all")

  const fetchPosts = React.useCallback(() => {
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    supabase
      .from("feed_posts")
      .select("id, post_type, description, media_url, firebase_media_url, created_at, status")
      .eq("owner_id", user.uid)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setPosts((data as Post[] | null) ?? [])
        setLoading(false)
      })
  }, [user?.uid])

  React.useEffect(() => { fetchPosts() }, [fetchPosts])

  const handleDelete = async (id: string) => {
    const supabase = createClient()
    const { error } = await (supabase as any).from("feed_posts").delete().eq("id", id)
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" })
    } else {
      toast({ title: "Post deleted" })
      setPosts(prev => prev.filter(p => p.id !== id))
    }
  }

  const filtered = posts.filter(p => {
    const matchesFilter = filter === "all" || p.post_type === filter ||
      (filter === "video" && /\.(mp4|mov|webm)/i.test(p.media_url ?? ""))
    const matchesSearch = !search ||
      (p.description ?? "").toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-5 max-w-4xl pb-24 text-foreground">

      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-black">My Content</h1>
        <Button asChild className="rounded-2xl h-10 gap-2 font-bold">
          <Link href="/vendor/creative/content/upload">
            <Plus className="h-4 w-4" /> Upload
          </Link>
        </Button>
      </div>

      {/* Search + filter */}
      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts…"
            className="pl-9 h-10 rounded-2xl bg-card border-none shadow-sm font-medium"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1.5">
          {(["all", "video", "podcast", "article"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`h-10 px-4 rounded-2xl text-xs font-black uppercase tracking-tight transition-colors ${
                filter === f
                  ? "bg-primary text-white"
                  : "bg-card text-muted-foreground shadow-sm hover:bg-muted"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Content list */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-20 rounded-2xl bg-muted animate-pulse" />)}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Upload className="h-8 w-8 text-primary/40" />
          </div>
          <p className="font-black text-foreground text-lg">
            {posts.length === 0 ? "No content yet" : "No results"}
          </p>
          <p className="text-sm text-muted-foreground max-w-xs">
            {posts.length === 0
              ? "Start uploading reels, podcasts, or articles to grow your audience."
              : "Try a different search or filter."}
          </p>
          {posts.length === 0 && (
            <Button asChild className="rounded-xl font-bold">
              <Link href="/vendor/creative/content/upload">Upload First Post</Link>
            </Button>
          )}
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="space-y-2">
          {filtered.map(post => (
            <Card key={post.id} className="rounded-2xl border-none shadow-sm">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <PostTypeIcon type={post.post_type} url={post.media_url || post.firebase_media_url} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-foreground truncate">
                    {post.description || "Untitled"}
                  </p>
                  <p className="text-[11px] text-muted-foreground font-medium mt-0.5">
                    {post.post_type} · {timeAgo(post.created_at)}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={`text-[9px] font-black uppercase shrink-0 mx-2 ${
                    post.status === "active"
                      ? "border-emerald-200 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {post.status === "active" ? "Live" : post.status ?? "draft"}
                </Badge>
                {post.media_url || post.firebase_media_url ? (
                  <a
                    href={post.media_url || post.firebase_media_url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    onClick={e => e.stopPropagation()}
                  >
                    <Eye className="h-4 w-4" />
                  </a>
                ) : null}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl shrink-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-xl border-none shadow-2xl">
                    <DropdownMenuItem
                      className="text-red-600 font-bold cursor-pointer gap-2"
                      onClick={() => handleDelete(post.id)}
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <p className="text-center text-xs font-black text-muted-foreground uppercase tracking-widest py-2">
        {!loading && `${filtered.length} post${filtered.length !== 1 ? "s" : ""}`}
      </p>
    </div>
  )
}
