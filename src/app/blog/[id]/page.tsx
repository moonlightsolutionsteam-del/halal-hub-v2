import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Calendar } from "lucide-react"
import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"

type FeedPost = {
  id: string
  description: string | null
  media_url: string | null
  firebase_media_url: string | null
  post_type: string | null
  created_at: string | null
  display_name: string | null
  business_name: string | null
}

function postTitle(p: FeedPost): string {
  if (!p.description) return "Post"
  const firstLine = p.description.split("\n")[0].trim()
  return firstLine.length > 100 ? firstLine.slice(0, 97) + "…" : firstLine
}

function postExcerpt(p: FeedPost): string {
  if (!p.description) return ""
  const lines = p.description.split("\n").filter(Boolean)
  const body = lines.slice(1).join(" ").trim() || lines[0]
  return body.length > 180 ? body.slice(0, 177) + "…" : body
}

function categoryLabel(post_type: string | null, business_name: string | null): string {
  if (business_name) return business_name
  const map: Record<string, string> = {
    discussion: "Discussion", question: "Q&A", community: "Community",
    review: "Review", recommendation: "Recommendation", post: "Insight",
  }
  return map[post_type ?? ""] || "Insight"
}

function formatDate(iso: string | null): string {
  if (!iso) return ""
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

async function getPost(id: string): Promise<FeedPost | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("feed_posts")
    .select("id, description, media_url, firebase_media_url, post_type, created_at, display_name, business_name")
    .eq("id", id)
    .maybeSingle()
  return data ?? null
}

async function getRelated(id: string): Promise<FeedPost[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("feed_posts")
    .select("id, description, media_url, firebase_media_url, post_type, created_at, display_name, business_name")
    .neq("id", id)
    .order("created_at", { ascending: false })
    .limit(3)
  return data ?? []
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const post = await getPost(id)
  if (!post) return { title: "Post Not Found | Halal Hub" }
  const title = postTitle(post)
  const excerpt = postExcerpt(post)
  return {
    title: `${title} | Halal Hub`,
    description: excerpt,
    openGraph: {
      title,
      description: excerpt,
      images: post.firebase_media_url ? [post.firebase_media_url] : post.media_url ? [post.media_url] : [],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPost(id)
  if (!post) notFound()

  const related = await getRelated(id)
  const title = postTitle(post)
  const excerpt = postExcerpt(post)
  const img = post.firebase_media_url ?? post.media_url ?? null
  const author = post.display_name ?? post.business_name ?? "HalalHub"
  const category = categoryLabel(post.post_type, post.business_name)

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-4xl pb-32 space-y-10 text-foreground">
      <Link href="/blog">
        <Button variant="ghost" size="sm" className="rounded-2xl bg-card shadow-sm border gap-2 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Journal
        </Button>
      </Link>

      <div className="space-y-4">
        <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 font-black uppercase text-[10px] tracking-[0.2em]">
          {category}
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-black font-headline tracking-tighter leading-tight">
          {title}
        </h1>
        {excerpt && (
          <p className="text-xl text-muted-foreground font-medium italic">{excerpt}</p>
        )}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-medium">
          <span className="font-black text-foreground">{author}</span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />{formatDate(post.created_at)}
          </span>
        </div>
      </div>

      {img && (
        <div className="relative w-full h-72 sm:h-96 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <Image src={img} alt={title} fill className="object-cover" priority unoptimized />
        </div>
      )}

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        {(post.description ?? "").split("\n\n").filter(Boolean).map((para, i) => {
          if (para.startsWith("**") && para.endsWith("**") && !para.slice(2, -2).includes("**")) {
            return <h2 key={i} className="text-2xl font-black mt-8 mb-3">{para.slice(2, -2)}</h2>
          }
          if (para.startsWith("- ") || /^\d+\. /.test(para)) {
            const items = para.split("\n")
            return (
              <ul key={i} className="space-y-2 my-4 pl-4">
                {items.map((item, j) => (
                  <li key={j} className="text-base font-medium leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.replace(/^[-\d.]+\.?\s/, "").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }}
                  />
                ))}
              </ul>
            )
          }
          return (
            <p key={i} className="text-base font-medium leading-relaxed my-4"
              dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }}
            />
          )
        })}
      </article>

      {related.length > 0 && (
        <section className="space-y-6 pt-8 border-t">
          <h2 className="text-2xl font-black">More from the Journal</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map(r => {
              const rImg = r.firebase_media_url ?? r.media_url ?? null
              return (
                <Link key={r.id} href={`/blog/${r.id}`} className="group">
                  {rImg && (
                    <div className="relative h-40 rounded-2xl overflow-hidden mb-3">
                      <Image src={rImg} alt={postTitle(r)} fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
                    </div>
                  )}
                  <Badge variant="outline" className="text-[10px] font-black uppercase mb-1">
                    {categoryLabel(r.post_type, r.business_name)}
                  </Badge>
                  <p className="text-sm font-black leading-tight group-hover:text-primary transition-colors">{postTitle(r)}</p>
                  <p className="text-xs text-muted-foreground font-medium mt-1">{formatDate(r.created_at)}</p>
                </Link>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
