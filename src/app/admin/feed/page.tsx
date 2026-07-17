"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Search, Loader2, Trash2, Image as ImageIcon } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

type Post = {
  id: string
  description: string | null
  media_url: string | null
  status: string | null
  created_at: string
  business_name: string | null
}

export default function AdminFeedPage() {
  const { toast } = useToast()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const supabase = createClient()
    supabase.from("feed_posts")
      .select("id, description, media_url, status, created_at, business_name")
      .order("created_at", { ascending: false })
      .limit(200)
      .then(({ data }) => {
        setPosts((data as Post[]) ?? [])
        setLoading(false)
      })
  }, [])

  async function deletePost(id: string) {
    const supabase = createClient()
    await supabase.from("feed_posts").delete().eq("id", id)
    setPosts(prev => prev.filter(p => p.id !== id))
    toast({ title: "Post deleted" })
  }

  async function toggleStatus(id: string, current: string | null) {
    const next = current === "active" ? "hidden" : "active"
    const supabase = createClient()
    await supabase.from("feed_posts").update({ status: next }).eq("id", id)
    setPosts(prev => prev.map(p => p.id === id ? { ...p, status: next } : p))
    toast({ title: `Post ${next}` })
  }

  const filtered = posts.filter(p => {
    const q = search.toLowerCase()
    return !q || (p.description ?? "").toLowerCase().includes(q) || (p.business_name ?? "").toLowerCase().includes(q)
  })

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-foreground">Feed Posts</h1>
        <p className="text-sm text-muted-foreground font-medium">Moderate all vendor and community posts in the feed.</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search posts..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-11 rounded-xl" />
        </div>
        <Badge variant="outline" className="h-11 px-4 rounded-xl font-bold">{filtered.length} posts</Badge>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <FileText className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">{search ? "No matches." : "No posts yet."}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(p => {
            const date = new Date(p.created_at).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })
            return (
              <Card key={p.id} className="rounded-2xl border-none shadow-sm">
                <CardContent className="p-4 flex gap-4">
                  {p.media_url ? (
                    <div className="relative h-16 w-16 rounded-xl overflow-hidden shrink-0 bg-muted">
                      <Image src={p.media_url} alt="" fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="h-16 w-16 rounded-xl bg-muted flex items-center justify-center shrink-0">
                      <ImageIcon className="h-6 w-6 text-muted-foreground/40" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-foreground">{p.business_name ?? "Unknown"}</span>
                      <span className="text-xs text-muted-foreground">{date}</span>
                      <Badge className={`text-[10px] ${p.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-muted text-muted-foreground"}`}>
                        {p.status ?? "unknown"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{p.description ?? "No caption"}</p>
                  </div>
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <Button size="sm" variant="outline" onClick={() => toggleStatus(p.id, p.status)} className="h-7 text-[11px] w-20">
                      {p.status === "active" ? "Hide" : "Show"}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => deletePost(p.id)} className="h-7 text-[11px] text-red-600 border-red-200 hover:bg-red-50 w-20">
                      <Trash2 className="h-3 w-3 mr-1" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
