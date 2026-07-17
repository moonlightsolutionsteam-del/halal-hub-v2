"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { BookOpen, Plus, Trash2, Calendar, Edit2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

type FeedPost = {
  id: string
  description: string | null
  place_name: string | null
  status: string | null
  created_at: string | null
}

type BizInfo = { id: string; name: string }

const EMPTY_FORM = { title: "", body: "", status: "draft" }

function formatDate(iso: string | null): string {
  if (!iso) return ""
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

export default function EngagementBlogPage() {
  const { user, loading: authLoading } = useAuth()
  const { toast } = useToast()
  const [biz, setBiz] = React.useState<BizInfo | null>(null)
  const [posts, setPosts] = React.useState<FeedPost[]>([])
  const [loading, setLoading] = React.useState(true)
  const [showCreate, setShowCreate] = React.useState(false)
  const [editingPost, setEditingPost] = React.useState<FeedPost | null>(null)
  const [form, setForm] = React.useState(EMPTY_FORM)
  const [saving, setSaving] = React.useState(false)
  const [deletingId, setDeletingId] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (authLoading) return
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    ;supabase
      .from("businesses").select("id, name").eq("owner_id", user.uid).limit(1).maybeSingle()
      .then(({ data }: { data: BizInfo | null }) => {
        if (!data) { setLoading(false); return }
        setBiz(data)
        loadPosts(data.id)
      })
  }, [user?.uid, authLoading])

  function loadPosts(bizId: string) {
    const supabase = createClient()
    supabase
      .from("feed_posts")
      .select("id, description, place_name, status, created_at")
      .eq("business_id", bizId)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setPosts((data as FeedPost[]) ?? [])
        setLoading(false)
      })
  }

  async function savePost() {
    if (!biz || !form.body.trim()) return
    setSaving(true)
    const supabase = createClient()

    if (editingPost) {
      const { error } = await supabase
        .from("feed_posts")
        .update({ description: `${form.title ? form.title + "\n\n" : ""}${form.body}`, place_name: form.title || null, status: form.status })
        .eq("id", editingPost.id)
      setSaving(false)
      if (error) { toast({ variant: "destructive", title: "Couldn't update article", description: error.message }); return }
      setEditingPost(null)
    } else {
      const { error } = await supabase.from("feed_posts").insert({
        business_id: biz.id,
        business_name: biz.name,
        owner_id: user!.uid,
        place_name: form.title || null,
        description: `${form.title ? form.title + "\n\n" : ""}${form.body}`,
        status: form.status,
      })
      setSaving(false)
      if (error) { toast({ variant: "destructive", title: "Couldn't save article", description: error.message }); return }
      setShowCreate(false)
    }
    setForm(EMPTY_FORM)
    loadPosts(biz.id)
    toast({ title: editingPost ? "Article updated" : (form.status === "active" ? "Article published" : "Draft saved") })
  }

  async function deletePost(id: string) {
    if (!biz) return
    setDeletingId(id)
    const supabase = createClient()
    const { error } = await supabase.from("feed_posts").delete().eq("id", id)
    setDeletingId(null)
    if (error) { toast({ variant: "destructive", title: "Couldn't delete article", description: error.message }); return }
    setPosts(prev => prev.filter(p => p.id !== id))
    toast({ title: "Article deleted" })
  }

  function openEdit(post: FeedPost) {
    const lines = post.description?.split("\n\n") ?? []
    const hasTitle = post.place_name
    setForm({
      title: post.place_name ?? "",
      body: hasTitle && lines.length > 1 ? lines.slice(1).join("\n\n") : (post.description ?? ""),
      status: post.status ?? "draft",
    })
    setEditingPost(post)
  }

  const published = posts.filter(p => p.status === "active").length
  const drafts = posts.filter(p => p.status !== "active").length

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const ArticleForm = () => (
    <div className="space-y-4 pt-2">
      <div className="space-y-2">
        <Label className="font-black text-xs uppercase tracking-widest">Title (Optional)</Label>
        <Input
          value={form.title}
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          placeholder="e.g. Our Commitment to Halal Standards"
          className="h-12 rounded-2xl bg-muted border-none font-bold"
        />
      </div>
      <div className="space-y-2">
        <Label className="font-black text-xs uppercase tracking-widest">Content *</Label>
        <Textarea
          value={form.body}
          onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
          placeholder="Write your article here..."
          className="min-h-[180px] rounded-2xl bg-muted border-none font-medium resize-none"
        />
      </div>
      <div className="space-y-2">
        <Label className="font-black text-xs uppercase tracking-widest">Status</Label>
        <select
          value={form.status}
          onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
          className="w-full h-12 rounded-2xl bg-muted border-none font-bold px-3 text-sm text-foreground"
        >
          <option value="draft">Draft</option>
          <option value="active">Published</option>
        </select>
      </div>
      <Button
        disabled={saving || !form.body.trim()}
        className="w-full h-12 rounded-2xl font-black bg-primary hover:bg-primary/90 text-white"
        onClick={savePost}
      >
        {saving ? "Saving…" : (editingPost ? "Save Changes" : (form.status === "active" ? "Publish Article" : "Save Draft"))}
      </Button>
    </div>
  )

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <BookOpen className="h-3 w-3" /> Narrative Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Business Blog</h1>
          <p className="text-muted-foreground font-medium">Write long-form articles, stories, and news about your business.</p>
        </div>
        <Button onClick={() => { setForm(EMPTY_FORM); setEditingPost(null); setShowCreate(true) }} className="bg-primary rounded-full px-8 font-black shadow-lg shadow-primary/20 h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> New Article
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="rounded-[2rem] border-none shadow-sm bg-primary text-primary-foreground p-6 space-y-1">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Total Articles</p>
          <p className="text-4xl font-black tracking-tighter">{posts.length}</p>
        </Card>
        <Card className="rounded-[2rem] border-none shadow-sm bg-emerald-50 dark:bg-emerald-950/20 p-6 space-y-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400">Published</p>
          <p className="text-4xl font-black tracking-tighter text-emerald-700 dark:text-emerald-400">{published}</p>
        </Card>
        <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 space-y-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Drafts</p>
          <p className="text-4xl font-black tracking-tighter text-foreground">{drafts}</p>
        </Card>
      </div>

      <div className="space-y-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">{posts.length} article{posts.length !== 1 ? "s" : ""}</p>

        {posts.length === 0 ? (
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-16 text-center space-y-3">
            <BookOpen className="h-10 w-10 text-muted-foreground/30 mx-auto" />
            <p className="font-black text-foreground">No articles yet</p>
            <p className="text-sm text-muted-foreground">Write your first article to connect with your customers.</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {posts.map(post => {
              const lines = post.description?.split("\n\n") ?? []
              const title = post.place_name || null
              const body = title && lines.length > 1 ? lines.slice(1).join("\n\n") : (post.description ?? "")
              return (
                <Card key={post.id} className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden hover:shadow-lg transition-shadow border-2 border-transparent hover:border-primary/10">
                  <CardContent className="p-6 sm:p-8 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className={
                            post.status === "active"
                              ? "bg-emerald-50 text-emerald-700 border-none text-[9px] font-black uppercase dark:bg-emerald-950/30 dark:text-emerald-400"
                              : "bg-muted text-muted-foreground border-none text-[9px] font-black uppercase"
                          }>
                            {post.status === "active" ? "Published" : "Draft"}
                          </Badge>
                          <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                            <Calendar className="h-3 w-3" />{formatDate(post.created_at)}
                          </span>
                        </div>
                        {title && <h3 className="text-xl font-black text-foreground leading-tight">{title}</h3>}
                        <p className="text-sm text-muted-foreground font-medium leading-relaxed line-clamp-3">{body}</p>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(post)} className="rounded-xl h-9 w-9">
                          <Edit2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button
                          variant="ghost" size="icon"
                          className="rounded-xl h-9 w-9 hover:text-red-600"
                          disabled={deletingId === post.id}
                          onClick={() => deletePost(post.id)}
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      <Dialog open={showCreate} onOpenChange={open => { setShowCreate(open); if (!open) setForm(EMPTY_FORM) }}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">New Article</DialogTitle>
            <DialogDescription>Write an article to share with your customers.</DialogDescription>
          </DialogHeader>
          <ArticleForm />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingPost} onOpenChange={open => { if (!open) { setEditingPost(null); setForm(EMPTY_FORM) } }}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Edit Article</DialogTitle>
            <DialogDescription>Update your article content or status.</DialogDescription>
          </DialogHeader>
          <ArticleForm />
        </DialogContent>
      </Dialog>
    </div>
  )
}
