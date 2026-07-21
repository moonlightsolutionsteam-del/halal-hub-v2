"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CommentSheet } from "@/components/comment-sheet"
import {
  Heart, MessageCircle, Send, Bookmark, ShieldCheck,
  Play, X, Music2, Eye, Volume2, VolumeX, MoreHorizontal,
} from "lucide-react"
import { cn } from "@/lib/utils"

function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M"
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K"
  return String(n)
}

function timeAgo(iso: string | null): string {
  if (!iso) return ""
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h`
  return `${Math.floor(hrs / 24)}d`
}

type Reel = {
  id: string
  videoUrl: string | null
  thumbnail: string | null
  caption: string
  audio: string
  views: string
  timeAgo: string
  likes: number
  comments: number
  shares: number
  author: { name: string; avatar: string | null; verified: boolean }
}

function ReelSlide({
  reel,
  active,
  globalMuted,
  onToggleMute,
}: {
  reel: Reel
  active: boolean
  globalMuted: boolean
  onToggleMute: () => void
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [liked, setLiked] = React.useState(false)
  const [saved, setSaved] = React.useState(false)
  const [commentOpen, setCommentOpen] = React.useState(false)
  const [likeCount, setLikeCount] = React.useState(reel.likes)

  React.useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = globalMuted
    if (active) {
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [active, globalMuted])

  const hasVideo = Boolean(reel.videoUrl)

  return (
    <div
      className="relative w-full flex-shrink-0 flex items-center justify-center bg-black"
      style={{ height: "100dvh", scrollSnapAlign: "start" }}
    >
      <div className="relative w-full h-full max-w-sm mx-auto overflow-hidden">
        {/* Media */}
        {hasVideo ? (
          <video
            ref={videoRef}
            src={reel.videoUrl!}
            poster={reel.thumbnail ?? undefined}
            className="w-full h-full object-cover"
            muted={globalMuted}
            loop
            playsInline
          />
        ) : reel.thumbnail ? (
          <img src={reel.thumbnail} alt={reel.caption} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
            <Play className="h-16 w-16 text-white/20" />
          </div>
        )}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        {/* Author */}
        <div className="absolute top-20 left-4 right-16 flex items-center gap-3">
          <Avatar className="h-9 w-9 border-2 border-white shrink-0">
            <AvatarImage src={reel.author.avatar ?? undefined} />
            <AvatarFallback className="bg-primary/10 text-primary font-black text-xs">
              {reel.author.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 flex items-center gap-1.5">
            <span className="text-sm font-black text-white truncate">{reel.author.name}</span>
            {reel.author.verified && <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />}
          </div>
          <button className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-black px-3 py-1.5 rounded-full border border-white/30">
            Follow
          </button>
        </div>

        {/* Right actions */}
        <div className="absolute right-3 bottom-32 flex flex-col items-center gap-6">
          <button
            onClick={() => { setLiked(l => !l); setLikeCount(c => liked ? c - 1 : c + 1) }}
            className="flex flex-col items-center gap-1"
          >
            <Heart className={cn("h-7 w-7 transition-all", liked ? "text-red-500 fill-red-500" : "text-white")} />
            <span className="text-white text-[10px] font-black">{fmt(likeCount)}</span>
          </button>
          <button onClick={() => setCommentOpen(true)} className="flex flex-col items-center gap-1">
            <MessageCircle className="h-7 w-7 text-white" />
            <span className="text-white text-[10px] font-black">{fmt(reel.comments)}</span>
          </button>
          <button
            onClick={() => {
              const url = `${window.location.origin}/feed/reels?id=${reel.id}`
              if (navigator.share) navigator.share({ url }).catch(() => {})
              else navigator.clipboard?.writeText(url)
            }}
            className="flex flex-col items-center gap-1"
          >
            <Send className="h-6 w-6 text-white -rotate-12" />
            <span className="text-white text-[10px] font-black">{fmt(reel.shares)}</span>
          </button>
          <button onClick={() => setSaved(s => !s)}>
            <Bookmark className={cn("h-7 w-7", saved ? "text-white fill-white" : "text-white")} />
          </button>
          <button onClick={onToggleMute}>
            {globalMuted
              ? <VolumeX className="h-6 w-6 text-white" />
              : <Volume2 className="h-6 w-6 text-white" />}
          </button>
          <button>
            <MoreHorizontal className="h-7 w-7 text-white" />
          </button>
        </div>

        {/* Caption + audio */}
        <div className="absolute bottom-8 left-4 right-16 space-y-1.5">
          {reel.caption && (
            <p className="text-white text-sm font-medium leading-relaxed line-clamp-3">{reel.caption}</p>
          )}
          <div className="flex items-center gap-2">
            <Music2 className="h-3.5 w-3.5 text-white/80 animate-pulse shrink-0" />
            <span className="text-white/80 text-xs font-medium truncate">{reel.audio}</span>
          </div>
          <div className="flex items-center gap-1 text-white/60 text-[11px] font-medium">
            <Eye className="h-3 w-3" />{reel.views} views · {reel.timeAgo} ago
          </div>
        </div>
      </div>

      <CommentSheet
        postId={reel.id}
        open={commentOpen}
        onClose={() => setCommentOpen(false)}
        onCountChange={() => {}}
      />
    </div>
  )
}

function ReelsPageInner() {
  const router = useRouter()
  const params = useSearchParams()
  const startId = params.get("id")

  const [reels, setReels] = React.useState<Reel[]>([])
  const [loading, setLoading] = React.useState(true)
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [muted, setMuted] = React.useState(true)

  const containerRef = React.useRef<HTMLDivElement>(null)
  const slideRefs = React.useRef<(HTMLDivElement | null)[]>([])

  // Fetch reels from feed_posts
  React.useEffect(() => {
    const supabase = createClient()
    ;(supabase as any)
      .from("feed_posts")
      .select("id, display_name, description, media_url, firebase_media_url, post_type, created_at")
      .or("post_type.eq.video,media_url.ilike.%.mp4,media_url.ilike.%.mov,media_url.ilike.%.webm,firebase_media_url.ilike.%.mp4,firebase_media_url.ilike.%.mov")
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data }: { data: any[] | null }) => {
        setLoading(false)
        if (!data?.length) return
        const mapped: Reel[] = data.map(r => {
          const url: string = r.media_url || r.firebase_media_url || ""
          return {
            id: r.id,
            videoUrl: url || null,
            thumbnail: null,
            caption: r.description || "",
            audio: "Original Audio",
            views: "0",
            timeAgo: timeAgo(r.created_at),
            likes: 0,
            comments: 0,
            shares: 0,
            author: {
              name: r.display_name || "Halal Hub Member",
              avatar: null,
              verified: false,
            },
          }
        })
        setReels(mapped)
      })
  }, [])

  // Scroll to startId reel once loaded
  React.useEffect(() => {
    if (!startId || !reels.length) return
    const idx = reels.findIndex(r => r.id === startId)
    if (idx < 0) return
    setActiveIndex(idx)
    const el = slideRefs.current[idx]
    if (el) el.scrollIntoView({ behavior: "instant" })
  }, [startId, reels])

  // Track active slide via IntersectionObserver
  React.useEffect(() => {
    if (!reels.length) return
    const observers: IntersectionObserver[] = []
    slideRefs.current.forEach((el, i) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i) },
        { threshold: 0.6, root: containerRef.current }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [reels.length])

  // Lock body scroll
  React.useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-sm rounded-full h-10 w-10 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
        aria-label="Back to feed"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Reels label + counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-0.5">
        <span className="text-white font-black text-sm tracking-wide">Reels</span>
        {reels.length > 0 && (
          <span className="text-white/50 text-[10px] font-bold">{activeIndex + 1} / {reels.length}</span>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center h-full">
          <div className="space-y-3 text-center">
            <div className="h-12 w-12 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto" />
            <p className="text-white/60 text-sm font-medium">Loading reels…</p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && reels.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-6">
          <Play className="h-16 w-16 text-white/20" />
          <p className="text-white font-black text-xl">No reels yet</p>
          <p className="text-white/50 text-sm">Video posts from the community will appear here.</p>
          <button
            onClick={() => router.back()}
            className="mt-2 bg-white/10 text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-white/20 transition-colors"
          >
            Back to Feed
          </button>
        </div>
      )}

      {/* Reel slides */}
      {!loading && reels.length > 0 && (
        <div
          ref={containerRef}
          className="h-full w-full overflow-y-scroll"
          style={{ scrollSnapType: "y mandatory", scrollbarWidth: "none" }}
        >
          {reels.map((reel, i) => (
            <div key={reel.id} ref={el => { slideRefs.current[i] = el }}>
              <ReelSlide
                reel={reel}
                active={i === activeIndex}
                globalMuted={muted}
                onToggleMute={() => setMuted(m => !m)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ReelsPage() {
  return (
    <React.Suspense fallback={
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="h-10 w-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    }>
      <ReelsPageInner />
    </React.Suspense>
  )
}
