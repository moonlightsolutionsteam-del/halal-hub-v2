"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { PenTool, Plus, Trash2, ImageIcon, FileText } from "lucide-react"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

type FeedPost = {
  id: string
  description: string | null
  media_url: string | null
  status: string | null
  created_at: string | null
  business_name: string | null
}

type BizInfo = { id: string; name: string }

function timeAgo(iso: string | null): string {
  if (!iso) return ""
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

export default function EngagementPostsPage() {
  const { user, loading: authLoading } = useAuth()
  const { toast } = useToast()
  const [biz, setBiz] = React.useState<BizInfo | null>(null)
  const [posts, setPosts] = React.useState<FeedPost[]>([])
  const [loading, setLoading] = React.useState(true)
  const [showCreate, setShowCreate] = React.useState(false)
  const [description, setDescription] = React.useState("")
  const [imageFile, setImageFile] = React.useState<File | null>(null)
  const [imagePreview, setImagePreview] = React.useState<string | null>(null)
  const [saving, setSaving] = React.useState(false)
  const [deletingId, setDeletingId] = React.useState<string | null>(null)
  const fileRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (authLoading) return
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    ;(supabase as any)
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
      .select("id, description, media_url, status, created_at, business_name")
      .eq("business_id", bizId)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setPosts((data as FeedPost[]) ?? [])
        setLoading(false)
      })
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  async function createPost() {
    if (!biz || !description.trim()) return
    setSaving(true)
    const supabase = createClient()
    let media_url: string | null = null

    if (imageFile) {
      const ext = imageFile.name.split(".").pop()
      const path = `posts/${biz.id}/${Date.now()}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from("business-media")
        .upload(path, imageFile, { upsert: false })
      if (uploadError) {
        toast({ variant: "destructive", title: "Image upload failed", description: uploadError.message })
        setSaving(false)
        return
      }
      const { data: urlData } = supabase.storage.from("business-media").getPublicUrl(path)
      media_url = urlData.publicUrl
    }

    const { error } = await supabase.from("feed_posts").insert({
      business_id: biz.id,
      business_name: biz.name,
      owner_id: user!.uid,
      description,
      media_url,
      status: "active",
    })

    setSaving(false)
    if (error) {
      toast({ variant: "destructive", title: "Couldn't create post", description: error.message })
      return
    }
    setDescription("")
    setImageFile(null)
    setImagePreview(null)
    setShowCreate(false)
    loadPosts(biz.id)
    toast({ title: "Post published" })
  }

  async function deletePost(id: string) {
    if (!biz) return
    setDeletingId(id)
    const supabase = createClient()
    const { error } = await supabase.from("feed_posts").delete().eq("id", id)
    setDeletingId(null)
    if (error) { toast({ variant: "destructive", title: "Couldn't delete post", description: error.message }); return }
    setPosts(prev => prev.filter(p => p.id !== id))
    toast({ title: "Post deleted" })
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <PenTool className="h-3 w-3" /> Community Engagement
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Social Feed Posts</h1>
          <p className="text-muted-foreground font-medium">Publish updates, offers, and stories directly to your customers' feeds.</p>
        </div>
        <Button onClick={() => setShowCreate(true)} className="bg-primary rounded-full px-8 font-black shadow-lg shadow-primary/20 h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> Create Post
        </Button>
      </div>

      <div className="space-y-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">{posts.length} post{posts.length !== 1 ? "s" : ""}</p>

        {posts.length === 0 ? (
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-16 text-center space-y-3">
            <PenTool className="h-10 w-10 text-muted-foreground/30 mx-auto" />
            <p className="font-black text-foreground">No posts yet</p>
            <p className="text-sm text-muted-foreground">Create your first post to appear in the HalalHub feed.</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {posts.map(post => (
              <Card key={post.id} className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden">
                {post.media_url && (
                  <div className="relative w-full aspect-video">
                    <Image src={post.media_url} alt="Post media" fill className="object-cover" />
                  </div>
                )}
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-medium text-foreground leading-relaxed flex-1">
                      {post.description}
                    </p>
                    <Button
                      variant="ghost" size="icon"
                      className="rounded-xl h-9 w-9 shrink-0 hover:text-red-600"
                      disabled={deletingId === post.id}
                      onClick={() => deletePost(post.id)}
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={
                      post.status === "active"
                        ? "bg-emerald-50 text-emerald-700 border-none text-[9px] font-black uppercase dark:bg-emerald-950/30 dark:text-emerald-400"
                        : "bg-muted text-muted-foreground border-none text-[9px] font-black uppercase"
                    }>
                      {post.status ?? "active"}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground font-medium">{timeAgo(post.created_at)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={showCreate} onOpenChange={open => { setShowCreate(open); if (!open) { setDescription(""); setImageFile(null); setImagePreview(null) } }}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Create New Post</DialogTitle>
            <DialogDescription>Share an update, offer, or story with your customers.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Caption *</Label>
              <Textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="What's happening at your business?"
                className="min-h-[120px] rounded-2xl bg-muted border-none font-medium resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Image (Optional)</Label>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              {imagePreview ? (
                <div className="relative rounded-2xl overflow-hidden aspect-video">
                  <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                  <Button
                    variant="secondary" size="sm"
                    className="absolute top-2 right-2 rounded-xl text-xs font-black"
                    onClick={() => { setImageFile(null); setImagePreview(null) }}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="w-full h-32 rounded-2xl bg-muted border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 hover:border-primary/30 transition-colors"
                >
                  <ImageIcon className="h-6 w-6 text-muted-foreground" />
                  <span className="text-xs font-black text-muted-foreground">Click to upload image</span>
                </button>
              )}
            </div>

            <Button
              disabled={saving || !description.trim()}
              className="w-full h-12 rounded-2xl font-black bg-primary hover:bg-primary/90 text-white"
              onClick={createPost}
            >
              {saving ? "Publishing…" : "Publish Post"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
