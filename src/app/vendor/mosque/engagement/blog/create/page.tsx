"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"

export default function CreateMosqueBlogPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [title, setTitle] = React.useState("")
  const [content, setContent] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)

  async function handlePublish(asDraft = false) {
    if (!user?.uid || !title.trim()) return
    setSubmitting(true)
    const supabase = createClient()
    await (supabase as any)
      .from("community_posts")
      .insert({ title: title.trim(), content: content.trim(), category: asDraft ? "draft:blog" : "blog", author_id: user.uid })
    setSubmitting(false)
    router.back()
  }

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">
      <Link href="/vendor/mosque/engagement/blog" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit">
        <ArrowLeft className="h-4 w-4" />Back to Blog
      </Link>
      <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">New Blog Post</h1>

      <Card className="rounded-[2rem] border-none shadow-soft">
        <CardHeader><CardTitle className="text-lg font-black">Post Content</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="post-title">Title</Label>
            <Input id="post-title" placeholder="e.g., The Significance of Jumu'ah in Islam" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="post-body">Content</Label>
            <Textarea id="post-body" placeholder="Write your article..." className="min-h-[220px]" value={content} onChange={e => setContent(e.target.value)} />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" className="rounded-full" onClick={() => handlePublish(true)} disabled={submitting || !title.trim()}>Save Draft</Button>
            <Button className="rounded-full" onClick={() => handlePublish(false)} disabled={submitting || !title.trim()}>
              {submitting ? "Publishing…" : "Publish"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
