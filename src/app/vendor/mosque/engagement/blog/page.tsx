"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, BookOpen } from "lucide-react"
import Link from "next/link"

const posts = [
  { title: "The Significance of Jumu'ah in Islam", status: "Published", date: "Mar 12, 2026" },
  { title: "Preparing Spiritually for Ramadan", status: "Published", date: "Feb 28, 2026" },
  { title: "Understanding Zakat: A Community Guide", status: "Draft", date: "Mar 20, 2026" },
]

export default function MosqueBlogPage() {
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Mosque Blog</h1>
          <p className="text-sm font-bold text-muted-foreground">Publish long-form articles and khutbah summaries.</p>
        </div>
        <Link href="/vendor/mosque/engagement/blog/create">
          <Button className="rounded-full"><PlusCircle className="h-4 w-4 mr-2" />New Post</Button>
        </Link>
      </div>

      <div className="space-y-3">
        {posts.map((post, i) => (
          <Card key={i} className="rounded-[2rem] border-none shadow-soft">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center shrink-0">
                <BookOpen className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-black text-foreground">{post.title}</p>
                <p className="text-xs text-muted-foreground font-medium mt-1">{post.date}</p>
              </div>
              <Badge variant={post.status === "Draft" ? "secondary" : "default"}>{post.status}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
