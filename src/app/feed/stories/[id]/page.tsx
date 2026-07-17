"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, ChevronLeft, MapPin, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

type StoryData = {
  kind: "user_story" | "business"
  id: string
  name: string
  avatar: string
  verified: boolean
  mediaUrl?: string
  mediaType?: "image" | "video"
  caption?: string
  location?: string
  category?: string
  city?: string
  createdAt?: string
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

export default function StoryPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const [story, setStory] = React.useState<StoryData | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [progress, setProgress] = React.useState(0)
  const DURATION = 7000

  React.useEffect(() => {
    if (!id) return
    const supabase = createClient()

    // Try feed_posts first (user-uploaded story)
    ;supabase
      .from("feed_posts")
      .select("id, display_name, description, media_url, place_name, post_type, created_at")
      .eq("id", id)
      .single()
      .then(({ data: post }: { data: any }) => {
        if (post) {
          const url: string = post.media_url || ""
          const isVideo = /\.(mp4|mov|webm)/i.test(url)
          setStory({
            kind: "user_story",
            id: post.id,
            name: post.display_name || "Community Member",
            avatar: url,
            verified: false,
            mediaUrl: url || undefined,
            mediaType: isVideo ? "video" : "image",
            caption: post.description || undefined,
            location: post.place_name || undefined,
            createdAt: post.created_at,
          })
          setLoading(false)
          return
        }

        // Fallback: load from businesses table
        ;supabase
          .from("businesses")
          .select("id, name, category, image_url, logo_url, city, status")
          .eq("id", id)
          .single()
          .then(({ data: biz }: { data: any }) => {
            setLoading(false)
            if (!biz) return
            setStory({
              kind: "business",
              id: biz.id,
              name: biz.name,
              avatar: biz.logo_url || biz.image_url || "",
              verified: biz.status === "active",
              mediaUrl: biz.image_url || biz.logo_url || undefined,
              mediaType: "image",
              category: biz.category || undefined,
              city: biz.city || undefined,
            })
          })
      })
  }, [id])

  // Progress bar timer
  React.useEffect(() => {
    if (loading || !story) return
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const pct = Math.min((elapsed / DURATION) * 100, 100)
      setProgress(pct)
      if (pct < 100) {
        requestAnimationFrame(tick)
      } else {
        router.push("/feed")
      }
    }
    const raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [loading, story, router])

  if (loading) {
    return (
      <div className="fixed inset-0 z-[300] bg-black flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-2 border-white/30 border-t-white animate-spin" />
      </div>
    )
  }

  if (!story) {
    return (
      <div className="fixed inset-0 z-[300] bg-black flex flex-col items-center justify-center gap-4">
        <p className="text-white/60 font-medium">Story not found</p>
        <button onClick={() => router.push("/feed")} className="text-white font-black text-sm bg-white/20 px-6 py-2 rounded-full">
          Back to Feed
        </button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[300] bg-black overflow-hidden touch-none select-none">

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 px-3 pt-3">
        <div className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Header */}
      <div className="absolute top-6 left-0 right-0 z-20 flex items-center justify-between px-4 pt-2">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-white shadow-md shrink-0">
            <AvatarImage src={story.avatar} />
            <AvatarFallback className="bg-white/20 text-white font-black">{story.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-white font-black text-sm leading-tight">{story.name}</p>
              {story.verified && <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />}
            </div>
            <div className="flex items-center gap-2">
              {story.createdAt && (
                <p className="text-white/60 text-[11px] font-medium">{timeAgo(story.createdAt)}</p>
              )}
              {story.category && (
                <span className="text-white/50 text-[10px] font-bold uppercase tracking-wider">{story.category}</span>
              )}
              {story.city && (
                <span className="flex items-center gap-0.5 text-white/50 text-[10px] font-medium">
                  <MapPin className="h-2.5 w-2.5" />{story.city}
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => router.push("/feed")}
          className="bg-white/20 backdrop-blur-sm text-white rounded-full p-2 hover:bg-white/30 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Media */}
      {story.mediaUrl ? (
        story.mediaType === "video" ? (
          <video
            src={story.mediaUrl}
            className="absolute inset-0 w-full h-full object-contain"
            autoPlay
            playsInline
            loop={false}
            onEnded={() => router.push("/feed")}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={story.mediaUrl}
            alt={story.name}
            className="absolute inset-0 w-full h-full object-contain"
          />
        )
      ) : (
        /* Business with no image — show name card */
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-zinc-900 to-black">
          <div className="text-center space-y-4 px-8">
            <div className="h-24 w-24 rounded-full bg-white/10 flex items-center justify-center mx-auto text-5xl font-black text-white">
              {story.name[0]}
            </div>
            <p className="text-white text-2xl font-black">{story.name}</p>
            {story.category && <p className="text-white/60 font-medium">{story.category}</p>}
            {story.city && (
              <p className="flex items-center justify-center gap-1.5 text-white/40 text-sm font-medium">
                <MapPin className="h-4 w-4" />{story.city}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Gradient overlay at bottom */}
      {(story.caption || story.location) && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent px-5 pb-10 pt-20 z-10">
          {story.caption && (
            <p className="text-white text-sm font-medium leading-relaxed">{story.caption}</p>
          )}
          {story.location && (
            <p className="flex items-center gap-1.5 text-white/60 text-xs font-medium mt-1">
              <MapPin className="h-3 w-3" />{story.location}
            </p>
          )}
        </div>
      )}

      {/* Tap zones — left to go back, right to go forward */}
      <div className="absolute inset-0 z-10 grid grid-cols-2">
        <button className="h-full" onClick={() => router.push("/feed")} />
        <button className="h-full" onClick={() => router.push("/feed")} />
      </div>
    </div>
  )
}
