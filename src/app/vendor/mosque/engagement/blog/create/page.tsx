"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateMosqueBlogPage() {
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
            <Input id="post-title" placeholder="e.g., The Significance of Jumu'ah in Islam" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="post-body">Content</Label>
            <Textarea id="post-body" placeholder="Write your article..." className="min-h-[220px]" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" className="rounded-full">Save Draft</Button>
            <Button className="rounded-full">Publish</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
