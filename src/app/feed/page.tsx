"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Heart, MessageCircle, Send, Bookmark,
  MoreHorizontal, Plus, ShieldCheck, Play, X,
  MapPin, Flame, TrendingUp, Camera,
  Sparkles, Star, Music2, Handshake,
  Calendar, Clock, Users, BookOpen,
  MessageSquare, Navigation, Quote,
  ThumbsUp, UserPlus, Eye, ArrowRight,
  CheckCircle2, Volume2, VolumeX,
  Tag, Megaphone, HelpCircle, Moon, BookMarked,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"
import { usePrayerSnapshot } from "@/lib/use-prayer-snapshot"
import { useFaithMoment } from "@/hooks/use-faith-moment"
import { formatPrayerTime } from "@/lib/ummah-api"
import { CreatePostModal } from "@/components/create-post-modal"

// ─── Types ────────────────────────────────────────────────────────────────────

type FeedItemType =
  | "post" | "reel" | "collab" | "offer" | "event"
  | "community" | "creator" | "blog" | "discussion" | "nearby"

// ─── Data ─────────────────────────────────────────────────────────────────────

const COMPOSER_ACTIONS = [
  { icon: Camera,        label: "Photo",          tint: "bg-blue-50 dark:bg-blue-950/30",     iconColor: "text-blue-600 dark:text-blue-400" },
  { icon: Play,          label: "Video",          tint: "bg-purple-50 dark:bg-purple-950/30", iconColor: "text-purple-600 dark:text-purple-400" },
  { icon: Star,          label: "Review",         tint: "bg-amber-50 dark:bg-amber-950/30",   iconColor: "text-amber-600 dark:text-amber-400" },
  { icon: MessageCircle, label: "Discussion",     tint: "bg-sky-50 dark:bg-sky-950/30",       iconColor: "text-sky-600 dark:text-sky-400" },
  { icon: MapPin,        label: "Check In",       tint: "bg-rose-50 dark:bg-rose-950/30",     iconColor: "text-rose-600 dark:text-rose-400" },
  { icon: Calendar,      label: "Event",          tint: "bg-violet-50 dark:bg-violet-950/30", iconColor: "text-violet-600 dark:text-violet-400" },
  { icon: ThumbsUp,      label: "Recommendation", tint: "bg-teal-50 dark:bg-teal-950/30",      iconColor: "text-teal-600 dark:text-teal-400" },
  { icon: Tag,           label: "Offer",          tint: "bg-orange-50 dark:bg-orange-950/30", iconColor: "text-orange-600 dark:text-orange-400" },
  { icon: Megaphone,     label: "Business Update",tint: "bg-emerald-50 dark:bg-emerald-950/30",iconColor: "text-emerald-600 dark:text-emerald-400" },
  { icon: HelpCircle,    label: "Question",       tint: "bg-indigo-50 dark:bg-indigo-950/30", iconColor: "text-indigo-600 dark:text-indigo-400" },
  { icon: Users,         label: "Community Post", tint: "bg-pink-50 dark:bg-pink-950/30",      iconColor: "text-pink-600 dark:text-pink-400" },
]

const FEED_MODES = [
  { id: "for-you",   label: "For You",   emoji: "✨" },
  { id: "nearby",    label: "Nearby",    emoji: "📍" },
  { id: "trending",  label: "Trending",  emoji: "🔥" },
  { id: "following", label: "Following", emoji: "👥" },
]

const FILTERS = [
  { id: "all",         label: "✦ All" },
  { id: "posts",       label: "Posts" },
  { id: "reels",       label: "Reels" },
  { id: "community",   label: "Community" },
  { id: "creators",    label: "Creators" },
  { id: "blogs",       label: "Blogs" },
  { id: "discussions", label: "Discussions" },
  { id: "events",      label: "Events" },
  { id: "offers",      label: "Offers" },
  { id: "nearby",      label: "Near You" },
]

const FILTER_TYPE_MAP: Record<string, FeedItemType[]> = {
  posts:       ["post"],
  reels:       ["reel"],
  community:   ["community"],
  creators:    ["creator"],
  blogs:       ["blog"],
  discussions: ["discussion"],
  events:      ["event"],
  offers:      ["offer"],
  nearby:      ["nearby"],
}

type StoryKind = "business" | "creator" | "mosque" | "community"

type StoryItem = {
  id: string
  name: string
  avatar: string
  isOwn?: boolean
  verified?: boolean
  kind?: StoryKind
  live?: boolean
}

const STORY_KIND_META: Record<StoryKind, { icon: any; label: string }> = {
  business:  { icon: Handshake,      label: "Business" },
  creator:   { icon: Sparkles,       label: "Creator" },
  mosque:    { icon: Navigation,     label: "Mosque" },
  community: { icon: Users,         label: "Community" },
}




// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M"
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + "K"
  return String(n)
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h`
  return `${Math.floor(hrs / 24)}d`
}

function getInitials(name: string | null | undefined): string {
  if (!name) return "?"
  return name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase()
}

function TagRow({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {tags.map(tag => (
        <span key={tag} className="text-xs font-bold text-primary hover:text-primary/70 cursor-pointer">{tag}</span>
      ))}
    </div>
  )
}

// ─── Mute Context ─────────────────────────────────────────────────────────────

const MuteCtx = React.createContext<{
  activeId: string | null
  audioOn: boolean
  setActiveId: (id: string | null) => void
  clearActiveId: (id: string) => void
  toggleAudio: () => void
}>({
  activeId: null,
  audioOn: false,
  setActiveId: () => {},
  clearActiveId: () => {},
  toggleAudio: () => {},
})
const MuteCtxProvider = MuteCtx.Provider

// ─── Story Bubble ─────────────────────────────────────────────────────────────

function StoryBubble({ story, viewed, onOpen }: { story: StoryItem; viewed: boolean; onOpen: (id: string) => void }) {
  const kind = (story as any).kind as StoryKind | undefined
  const isLive = Boolean((story as any).live)
  const KindIcon = kind ? STORY_KIND_META[kind].icon : null

  return (
    <button onClick={() => onOpen(story.id)} className="flex flex-col items-center gap-2 shrink-0 group">
      <div className={cn(
        "rounded-full p-[3px] transition-transform group-hover:scale-105 group-active:scale-95",
        story.isOwn
          ? "bg-muted"
          : viewed
            ? "bg-border"
            : "story-ring-live",
      )}>
        <div className="bg-card rounded-full p-[2px]">
          <div className="relative">
            <Avatar className="h-16 w-16 sm:h-[72px] sm:w-[72px]">
              <AvatarImage src={story.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary font-black text-sm">{story.name[0]}</AvatarFallback>
            </Avatar>
            {isLive && (
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full border-2 border-card shadow-sm">
                <span className="h-1 w-1 rounded-full bg-white animate-pulse" /> LIVE
              </div>
            )}
            {story.isOwn ? (
              <div className="absolute -bottom-0.5 -right-0.5 bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center border-2 border-white shadow-sm">
                <Plus className="h-3.5 w-3.5" />
              </div>
            ) : (story as any).verified ? (
              <div className="absolute -bottom-0.5 -right-0.5 bg-primary text-white rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                <ShieldCheck className="h-3 w-3" />
              </div>
            ) : KindIcon ? (
              <div className="absolute -bottom-0.5 -right-0.5 bg-card text-muted-foreground rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow-sm">
                <KindIcon className="h-2.5 w-2.5" />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <span className={cn("text-[11px] max-w-[76px] truncate", viewed && !story.isOwn ? "font-medium text-muted-foreground/70" : "font-bold text-foreground")}>
        {story.isOwn ? "Your Story" : story.name.split(" ")[0]}
      </span>
    </button>
  )
}

// ─── Post Card ────────────────────────────────────────────────────────────────

function PostCard({ item }: { item: any }) {
  const [liked,     setLiked]     = React.useState(false)
  const [saved,     setSaved]     = React.useState(false)
  const [imgIndex,  setImgIndex]  = React.useState(0)
  const [showFull,  setShowFull]  = React.useState(false)
  const [likeCount, setLikeCount] = React.useState<number>(item.likes)
  const { activeId, audioOn, setActiveId, clearActiveId, toggleAudio } = React.useContext(MuteCtx)
  const muted = !audioOn || activeId !== item.id
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted
  }, [muted])

  React.useEffect(() => {
    if (item.mediaType !== "video") return
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActiveId(item.id)
        else clearActiveId(item.id)
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [item.id, item.mediaType, setActiveId, clearActiveId])

  const handleLike = () => { setLiked(l => !l); setLikeCount(c => liked ? c - 1 : c + 1) }
  const isLong = item.caption.length > 120

  return (
    <Card ref={containerRef} className="rounded-none sm:rounded-2xl border-x-0 sm:border-x border-none shadow-sm bg-card overflow-hidden">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full p-[2px] bg-gradient-to-br from-primary via-emerald-400 to-teal-500">
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src={item.author.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary font-black text-xs">{item.author.name[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black text-foreground">{item.author.name}</span>
              {item.author.verified && <ShieldCheck className="h-4 w-4 text-primary fill-primary/20" />}
            </div>
            {item.location && (
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-medium">
                <MapPin className="h-3 w-3" />{item.location}
              </div>
            )}
          </div>
        </div>
        <button className="text-muted-foreground p-2 rounded-full hover:bg-muted">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Media — only render when there's a real URL */}
      {item.images?.[imgIndex] && (
        <div className="relative w-full overflow-hidden bg-black">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img src={item.images[imgIndex]} aria-hidden className="w-full h-full object-cover scale-110 blur-2xl opacity-50" />
          </div>
          {item.mediaType === "video" ? (
            <video
              ref={videoRef}
              src={item.images[imgIndex]}
              className="relative w-full h-auto block"
              style={{ maxHeight: "640px", objectFit: "contain" }}
              autoPlay muted={muted} loop playsInline
            />
          ) : (
            <img src={item.images[imgIndex]} alt={item.caption} className="relative w-full h-auto block" style={{ maxHeight: "640px", objectFit: "contain" }} />
          )}
          {item.mediaType === "video" && (
            <button onClick={e => { e.stopPropagation(); toggleAudio() }}
              className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/80 transition-colors z-10">
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          )}
          {item.images.length > 1 && (
            <>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {item.images.map((_: any, i: number) => (
                  <button key={i} onClick={() => setImgIndex(i)}
                    className={cn("rounded-full transition-all", i === imgIndex ? "w-6 h-2 bg-card" : "w-2 h-2 bg-card/50")} />
                ))}
              </div>
              {imgIndex > 0 && (
                <button onClick={() => setImgIndex(p => p - 1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur rounded-full h-8 w-8 flex items-center justify-center shadow-lg text-xl font-bold">‹</button>
              )}
              {imgIndex < item.images.length - 1 && (
                <button onClick={() => setImgIndex(p => p + 1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur rounded-full h-8 w-8 flex items-center justify-center shadow-lg text-xl font-bold">›</button>
              )}
            </>
          )}
          {item.category && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-card/90 backdrop-blur text-foreground border-none font-bold text-[10px] uppercase tracking-wider shadow-sm px-3 py-1">
                {item.category}
              </Badge>
            </div>
          )}
        </div>
      )}

      <div className="px-4 pt-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={handleLike} className="group">
            <Heart className={cn("h-6 w-6 transition-colors", liked ? "text-red-500 fill-red-500 animate-like-pop" : "text-foreground group-hover:text-red-400")} />
          </button>
          <button className="group">
            <MessageCircle className="h-6 w-6 text-foreground group-hover:text-primary transition-colors" />
          </button>
          <button className="group">
            <Send className="h-5 w-5 text-foreground group-hover:text-primary transition-colors -rotate-12" />
          </button>
        </div>
        <button onClick={() => setSaved(s => !s)}>
          <Bookmark className={cn("h-6 w-6 transition-all", saved ? "text-foreground fill-foreground" : "text-foreground")} />
        </button>
      </div>

      <div className="px-4 pt-2">
        <span className="text-sm font-black text-foreground">{fmt(likeCount)} likes</span>
      </div>
      <div className="px-4 pt-1 pb-2">
        <p className="text-sm text-foreground leading-relaxed">
          <span className="font-black mr-1.5">{item.author.handle}</span>
          {isLong && !showFull
            ? <>{item.caption.slice(0, 120)}... <button onClick={() => setShowFull(true)} className="text-muted-foreground font-medium">more</button></>
            : item.caption}
        </p>
        <TagRow tags={item.tags} />
      </div>
      <button className="px-4 pb-1">
        <span className="text-sm text-muted-foreground font-medium">View all {item.comments} comments</span>
      </button>
      <div className="px-4 pb-3">
        <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">{item.timeAgo} ago</span>
      </div>
      <div className="border-t border-border px-4 py-3 flex items-center gap-3">
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="bg-primary/10 text-primary font-black text-[10px]">YOU</AvatarFallback>
        </Avatar>
        <input type="text" placeholder="Add a comment…" className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground text-foreground" />
        <button className="text-primary font-black text-sm opacity-50 hover:opacity-100 transition-opacity">Post</button>
      </div>
    </Card>
  )
}

// ─── Reel Card ────────────────────────────────────────────────────────────────

function ReelCard({ item }: { item: any }) {
  const [liked,     setLiked]     = React.useState(false)
  const [saved,     setSaved]     = React.useState(false)
  const [likeCount, setLikeCount] = React.useState<number>(item.likes)
  const { activeId, audioOn, setActiveId, clearActiveId, toggleAudio } = React.useContext(MuteCtx)
  const muted = !audioOn || activeId !== item.id
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const hasVideo = Boolean(item.videoUrl)

  React.useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted
  }, [muted])

  React.useEffect(() => {
    if (!hasVideo) return
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActiveId(item.id)
        else clearActiveId(item.id)
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [item.id, hasVideo, setActiveId, clearActiveId])

  const handleLike = () => { setLiked(l => !l); setLikeCount(c => liked ? c - 1 : c + 1) }

  return (
    <Card ref={containerRef} className="rounded-none sm:rounded-2xl border-x-0 sm:border-x border-none shadow-sm bg-black overflow-hidden">
      <div className="relative aspect-[9/16] w-full max-w-sm lg:max-w-5xl mx-auto">
        {hasVideo ? (
          <video
            ref={videoRef}
            src={item.videoUrl}
            poster={item.thumbnail}
            className="w-full h-full object-cover"
            autoPlay
            muted={muted}
            loop
            playsInline
          />
        ) : (
          <img src={item.thumbnail} alt={item.caption} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

        {/* Author row */}
        <div className="absolute top-4 left-4 right-4 flex items-center gap-3">
          <Avatar className="h-9 w-9 border-2 border-white shrink-0">
            <AvatarImage src={item.author.avatar} />
            <AvatarFallback>{item.author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 flex items-center gap-1.5">
            <span className="text-sm font-black text-white truncate">{item.author.name}</span>
            {item.author.verified && <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />}
          </div>
          <button className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-black px-3 py-1 rounded-full border border-white/30 shrink-0">
            Follow
          </button>
        </div>

        {/* Play button overlay (only for static thumbnails) */}
        {!hasVideo && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/20 rounded-full h-14 w-14 flex items-center justify-center">
              <Play className="h-7 w-7 text-white fill-white ml-0.5" />
            </div>
          </div>
        )}

        {/* Right-side action buttons */}
        <div className="absolute right-3 bottom-28 flex flex-col items-center gap-6">
          <button onClick={handleLike} className="flex flex-col items-center gap-1">
            <Heart className={cn("h-7 w-7 transition-all", liked ? "text-red-500 fill-red-500" : "text-white")} />
            <span className="text-white text-[10px] font-black">{fmt(likeCount)}</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <MessageCircle className="h-7 w-7 text-white" />
            <span className="text-white text-[10px] font-black">{fmt(item.comments)}</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Send className="h-6 w-6 text-white -rotate-12" />
            <span className="text-white text-[10px] font-black">{fmt(item.shares)}</span>
          </button>
          <button onClick={() => setSaved(s => !s)}>
            <Bookmark className={cn("h-7 w-7", saved ? "text-white fill-white" : "text-white")} />
          </button>
          {/* Mute/unmute (video reels only) */}
          {hasVideo && (
            <button onClick={toggleAudio} className="flex flex-col items-center gap-1">
              {muted ? <VolumeX className="h-6 w-6 text-white" /> : <Volume2 className="h-6 w-6 text-white" />}
            </button>
          )}
          <button>
            <MoreHorizontal className="h-7 w-7 text-white" />
          </button>
        </div>

        {/* Bottom: caption + audio + views */}
        <div className="absolute bottom-4 left-4 right-16 space-y-2">
          <p className="text-white text-sm font-medium leading-relaxed line-clamp-2">{item.caption}</p>
          <div className="flex items-center gap-2">
            <Music2 className="h-3.5 w-3.5 text-white/80 animate-pulse" />
            <span className="text-white/80 text-xs font-medium truncate">{item.audio}</span>
          </div>
          <div className="flex items-center gap-1 text-white/60 text-[11px] font-medium">
            <Eye className="h-3 w-3" />{item.views} views · {item.timeAgo} ago
          </div>
        </div>
      </div>
    </Card>
  )
}

// ─── Collab Card ──────────────────────────────────────────────────────────────

function CollabCard({ item }: { item: any }) {
  const [liked,     setLiked]     = React.useState(false)
  const [saved,     setSaved]     = React.useState(false)
  const [likeCount, setLikeCount] = React.useState<number>(item.likes)

  const handleLike = () => { setLiked(l => !l); setLikeCount(c => liked ? c - 1 : c + 1) }

  return (
    <Card className="rounded-none sm:rounded-2xl border-x-0 sm:border-x border-none shadow-sm bg-card overflow-hidden">
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-50 text-emerald-700 border-none font-black text-[10px] uppercase px-3">Collaboration</Badge>
          <span className="text-[11px] text-muted-foreground font-medium">{item.timeAgo} ago</span>
        </div>
        <button className="text-muted-foreground p-1 rounded-full hover:bg-muted">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      {/* Two avatars + handshake */}
      <div className="flex items-center justify-center gap-4 px-4 pb-4">
        <div className="flex flex-col items-center gap-1.5">
          <Avatar className="h-14 w-14 border-2 border-card shadow-md ring-2 ring-primary/20">
            <AvatarImage src={item.party1.avatar} />
            <AvatarFallback className="bg-primary/10 text-primary font-black">{item.party1.name[0]}</AvatarFallback>
          </Avatar>
          <p className="text-xs font-black text-foreground max-w-[90px] truncate text-center">{item.party1.name}</p>
          {item.party1.verified && <ShieldCheck className="h-3 w-3 text-primary -mt-1" />}
        </div>
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Handshake className="h-6 w-6 text-primary" />
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Avatar className="h-14 w-14 border-2 border-card shadow-md ring-2 ring-emerald-400/30">
            <AvatarImage src={item.party2.avatar} />
            <AvatarFallback className="bg-emerald-50 text-emerald-700 font-black">{item.party2.name[0]}</AvatarFallback>
          </Avatar>
          <p className="text-xs font-black text-foreground max-w-[90px] truncate text-center">{item.party2.name}</p>
          {item.party2.verified && <ShieldCheck className="h-3 w-3 text-primary -mt-1" />}
        </div>
      </div>

      <div className="px-4 pb-4 text-center space-y-1.5">
        <h3 className="text-base font-black text-foreground">{item.headline}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
      </div>

      <div className="relative aspect-video overflow-hidden">
        <img src={item.image} alt={item.headline} className="w-full h-full object-cover" />
      </div>

      <div className="px-4 pt-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={handleLike} className="group">
            <Heart className={cn("h-6 w-6 transition-all", liked ? "text-red-500 fill-red-500" : "text-foreground group-hover:text-red-400")} />
          </button>
          <button className="group">
            <MessageCircle className="h-6 w-6 text-foreground group-hover:text-primary transition-colors" />
          </button>
          <button className="group">
            <Send className="h-5 w-5 text-foreground group-hover:text-primary transition-colors -rotate-12" />
          </button>
        </div>
        <button onClick={() => setSaved(s => !s)}>
          <Bookmark className={cn("h-6 w-6 transition-all", saved ? "text-foreground fill-foreground" : "text-foreground")} />
        </button>
      </div>
      <div className="px-4 pt-2 pb-1"><span className="text-sm font-black">{fmt(likeCount)} likes</span></div>
      <div className="px-4 pb-3"><TagRow tags={item.tags} /></div>
    </Card>
  )
}

// ─── Community Card ───────────────────────────────────────────────────────────

function CommunityCard({ item }: { item: any }) {
  const [liked,     setLiked]     = React.useState(false)
  const [likeCount, setLikeCount] = React.useState<number>(item.likes)

  const handleLike = () => { setLiked(l => !l); setLikeCount(c => liked ? c - 1 : c + 1) }

  return (
    <Card className="rounded-none sm:rounded-2xl border-x-0 sm:border-x border-none shadow-sm bg-card overflow-hidden">
      <div className="flex items-center gap-3 p-4 pb-2">
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarImage src={item.community.avatar} />
          <AvatarFallback className="bg-primary/10 text-primary font-black text-xs">{item.community.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-xs font-black text-foreground truncate">{item.community.name}</span>
            {item.community.verified && <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-medium">
            <Users className="h-3 w-3" />{item.community.members} members
          </div>
        </div>
        <button className="text-xs font-black text-primary bg-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors shrink-0">
          Join
        </button>
      </div>

      <div className="flex items-center gap-2 px-4 pb-3">
        <Avatar className="h-6 w-6 shrink-0">
          <AvatarImage src={item.postedBy.avatar} />
          <AvatarFallback className="bg-muted text-muted-foreground text-[10px]">{item.postedBy.name[0]}</AvatarFallback>
        </Avatar>
        <span className="text-xs text-muted-foreground font-medium">{item.postedBy.name} · {item.timeAgo} ago</span>
      </div>

      <div className="px-4 pb-4 space-y-2">
        <h3 className="text-base font-black text-foreground leading-snug">{item.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
      </div>

      {item.image && (
        <div className="relative aspect-video overflow-hidden">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="px-4 py-3 flex items-center justify-between border-t border-border">
        <div className="flex items-center gap-4">
          <button onClick={handleLike} className="flex items-center gap-1.5">
            <Heart className={cn("h-5 w-5", liked ? "text-red-500 fill-red-500" : "text-muted-foreground")} />
            <span className={cn("text-xs font-bold", liked ? "text-red-500" : "text-muted-foreground")}>{fmt(likeCount)}</span>
          </button>
          <button className="flex items-center gap-1.5 text-muted-foreground">
            <MessageCircle className="h-5 w-5" />
            <span className="text-xs font-bold">{fmt(item.comments)} Replies</span>
          </button>
        </div>
        <button className="flex items-center gap-1 text-xs font-black text-primary">
          Share <Send className="h-3.5 w-3.5 ml-1 -rotate-12" />
        </button>
      </div>
      <div className="px-4 pb-3"><TagRow tags={item.tags} /></div>
    </Card>
  )
}

// ─── Creator Card ─────────────────────────────────────────────────────────────

function CreatorCard({ item }: { item: any }) {
  const [following, setFollowing] = React.useState(false)

  return (
    <Card className="rounded-none sm:rounded-2xl border-x-0 sm:border-x border-none shadow-sm bg-card overflow-hidden">
      <div className="relative h-28 overflow-hidden">
        <img src={item.coverImage} alt={item.creator.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
        <Badge className="absolute top-3 left-3 bg-primary/90 text-white border-none font-black text-[10px] uppercase px-3 shadow-sm">
          Creator Spotlight
        </Badge>
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-end justify-between -mt-7 mb-3">
          <Avatar className="h-14 w-14 border-2 border-card shadow-lg ring-2 ring-primary/20">
            <AvatarImage src={item.creator.avatar} />
            <AvatarFallback className="bg-primary/10 text-primary font-black">{item.creator.name[0]}</AvatarFallback>
          </Avatar>
          <button
            onClick={() => setFollowing(f => !f)}
            className={cn(
              "px-5 py-2 rounded-full text-xs font-black transition-all",
              following
                ? "bg-muted text-muted-foreground border border-border"
                : "bg-primary text-white shadow-sm shadow-primary/30",
            )}
          >
            {following ? "Following" : "Follow"}
          </button>
        </div>

        <div className="space-y-1 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-black text-foreground">{item.creator.name}</span>
            {item.creator.verified && <ShieldCheck className="h-4 w-4 text-primary" />}
            <Badge variant="secondary" className="text-[10px] font-bold px-2 py-0">{item.creator.category}</Badge>
          </div>
          <p className="text-xs font-bold text-muted-foreground">{item.creator.handle} · {item.creator.followers} followers</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{item.creator.bio}</p>
        </div>

        <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden">
          {item.recentPosts.map((img: string, i: number) => (
            <div key={i} className="aspect-square bg-muted overflow-hidden">
              <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          ))}
        </div>
        <div className="mt-2"><TagRow tags={item.tags} /></div>
      </div>
    </Card>
  )
}

// ─── Blog Card ────────────────────────────────────────────────────────────────

function BlogCard({ item }: { item: any }) {
  const [liked,     setLiked]     = React.useState(false)
  const [saved,     setSaved]     = React.useState(false)
  const [likeCount, setLikeCount] = React.useState<number>(item.likes)

  const handleLike = () => { setLiked(l => !l); setLikeCount(c => liked ? c - 1 : c + 1) }

  return (
    <Card className="rounded-none sm:rounded-2xl border-x-0 sm:border-x border-none shadow-sm bg-card overflow-hidden">
      <div className="relative aspect-video overflow-hidden">
        <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-primary text-white border-none font-black text-[10px] uppercase px-3 shadow-sm">{item.category}</Badge>
          <Badge className="bg-card/90 backdrop-blur text-foreground border-none font-bold text-[10px] px-3 shadow-sm flex items-center gap-1">
            <BookOpen className="h-3 w-3" />{item.readTime}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="text-lg font-black text-foreground leading-tight">{item.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{item.excerpt}</p>

        <div className="flex items-center gap-3 pt-1">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarImage src={item.author.avatar} />
            <AvatarFallback className="bg-primary/10 text-primary font-black text-[10px]">{item.author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-xs font-black text-foreground truncate">{item.author.name}</span>
              {item.author.verified && <ShieldCheck className="h-3 w-3 text-primary shrink-0" />}
            </div>
            <span className="text-[11px] text-muted-foreground font-medium">{item.timeAgo} ago</span>
          </div>
          <Button size="sm" className="bg-primary text-white rounded-full h-8 px-4 text-xs font-black shadow-sm hover:bg-primary/90 shrink-0">
            Read <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </div>

      <div className="px-4 py-3 flex items-center justify-between border-t border-border">
        <div className="flex items-center gap-4">
          <button onClick={handleLike} className="flex items-center gap-1.5">
            <Heart className={cn("h-5 w-5", liked ? "text-red-500 fill-red-500" : "text-muted-foreground")} />
            <span className="text-xs font-bold text-muted-foreground">{fmt(likeCount)}</span>
          </button>
          <button className="flex items-center gap-1.5 text-muted-foreground">
            <MessageCircle className="h-5 w-5" />
            <span className="text-xs font-bold">{fmt(item.comments)}</span>
          </button>
        </div>
        <button onClick={() => setSaved(s => !s)}>
          <Bookmark className={cn("h-5 w-5", saved ? "text-foreground fill-foreground" : "text-muted-foreground")} />
        </button>
      </div>
      <div className="px-4 pb-3"><TagRow tags={item.tags} /></div>
    </Card>
  )
}

// ─── Discussion Card ──────────────────────────────────────────────────────────

function DiscussionCard({ item }: { item: any }) {
  const [upvoted,     setUpvoted]     = React.useState(false)
  const [upvoteCount, setUpvoteCount] = React.useState<number>(item.upvotes)

  const handleUpvote = () => { setUpvoted(u => !u); setUpvoteCount(c => upvoted ? c - 1 : c + 1) }

  return (
    <Card className="rounded-none sm:rounded-2xl border-x-0 sm:border-x border-none shadow-sm bg-card overflow-hidden">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className="bg-amber-50 text-amber-700 border-none font-black text-[10px] uppercase px-3">
              {item.isTrending ? "🔥 Featured Discussion" : "Discussion"}
            </Badge>
            <Badge variant="outline" className="text-[10px] font-bold px-2 py-0">{item.category}</Badge>
          </div>
          <span className="text-[11px] text-muted-foreground font-medium shrink-0">{item.timeAgo} ago</span>
        </div>

        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarImage src={item.author.avatar} />
            <AvatarFallback className="bg-primary/10 text-primary font-black text-xs">{item.author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-1">
            <span className="text-xs font-black text-foreground">{item.author.name}</span>
            {item.author.verified && <ShieldCheck className="h-3.5 w-3.5 text-primary" />}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex gap-2.5">
            <Quote className="h-5 w-5 text-primary/40 shrink-0 mt-0.5" />
            <h3 className="text-base font-black text-foreground leading-snug">{item.question}</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed pl-7 line-clamp-3">{item.excerpt}</p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-4">
            <button onClick={handleUpvote} className="flex items-center gap-1.5">
              <ThumbsUp className={cn("h-5 w-5", upvoted ? "text-primary fill-primary/20" : "text-muted-foreground")} />
              <span className={cn("text-xs font-bold", upvoted ? "text-primary" : "text-muted-foreground")}>{fmt(upvoteCount)}</span>
            </button>
            <button className="flex items-center gap-1.5 text-muted-foreground">
              <MessageSquare className="h-5 w-5" />
              <span className="text-xs font-bold">{fmt(item.replies)}</span>
            </button>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span className="text-xs font-bold">{item.views}</span>
            </div>
          </div>
          <Button size="sm" variant="outline" className="rounded-full h-8 px-4 text-xs font-black border-primary/20 text-primary hover:bg-primary/5">
            Join Discussion
          </Button>
        </div>
        <TagRow tags={item.tags} />
      </div>
    </Card>
  )
}

// ─── Offer Card ───────────────────────────────────────────────────────────────

function OfferCard({ item }: { item: any }) {
  return (
    <Card className="rounded-none sm:rounded-2xl border-x-0 sm:border-x border-none shadow-sm bg-card overflow-hidden">
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarImage src={item.business.avatar} />
            <AvatarFallback className="bg-primary/10 text-primary font-black text-xs">{item.business.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-black text-foreground">{item.business.name}</span>
              {item.business.verified && <ShieldCheck className="h-3.5 w-3.5 text-primary" />}
            </div>
            <span className="text-[11px] text-muted-foreground font-medium">{item.timeAgo} ago</span>
          </div>
        </div>
        <Badge className="bg-blue-50 text-blue-700 border-none font-black text-[10px] uppercase px-3">Sponsored</Badge>
      </div>

      <div className="relative aspect-video overflow-hidden">
        <img src={item.image} alt={item.headline} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 bg-primary text-white font-black text-sm px-4 py-2 rounded-full shadow-lg">
          {item.discount}
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-base font-black text-foreground">{item.headline}</h3>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.body}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full">
            <Clock className="h-3 w-3" />{item.validUntil}
          </div>
          <Button className="bg-primary text-white rounded-full h-9 px-6 text-xs font-black shadow-sm hover:bg-primary/90">
            {item.cta} <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

// ─── Nearby Card ──────────────────────────────────────────────────────────────

function NearbyCard({ item }: { item: any }) {
  return (
    <Card className="rounded-none sm:rounded-2xl border-x-0 sm:border-x border-none shadow-sm bg-card overflow-hidden">
      <div className="p-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Navigation className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-black text-foreground uppercase tracking-wider">Near You</h3>
        </div>
        <button className="text-xs font-black text-primary">See All</button>
      </div>
      <div className="flex gap-3 px-4 pb-4 overflow-x-auto no-scrollbar lg:grid lg:grid-cols-4 lg:overflow-x-visible">
        {item.places.map((place: any, i: number) => (
          <div key={i} className="shrink-0 w-40 lg:w-auto rounded-xl overflow-hidden bg-muted cursor-pointer group border border-border/50">
            <div className="relative h-24 overflow-hidden">
              <img src={place.image} alt={place.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className={cn(
                "absolute top-2 right-2 text-[10px] font-black px-2 py-0.5 rounded-full",
                place.open ? "bg-emerald-500 text-white" : "bg-zinc-700 text-white",
              )}>
                {place.open ? "Open" : "Closed"}
              </div>
            </div>
            <div className="p-2.5 space-y-1">
              <p className="text-xs font-black text-foreground leading-tight truncate">{place.name}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground font-medium">{place.type}</span>
                <div className="flex items-center gap-0.5">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="text-[10px] font-bold text-foreground">{place.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                <MapPin className="h-3 w-3" />{place.distance}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

// ─── Event Card ───────────────────────────────────────────────────────────────

function EventCard({ item }: { item: any }) {
  const [going,      setGoing]      = React.useState(false)
  const [goingCount, setGoingCount] = React.useState<number>(item.going)

  const handleGoing = () => { setGoing(g => !g); setGoingCount(c => going ? c - 1 : c + 1) }

  return (
    <Card className="rounded-none sm:rounded-2xl border-x-0 sm:border-x border-none shadow-sm bg-card overflow-hidden">
      <div className="flex items-center gap-3 p-4 pb-3">
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarImage src={item.organizer.avatar} />
          <AvatarFallback className="bg-primary/10 text-primary font-black text-xs">{item.organizer.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-xs font-black text-foreground truncate">{item.organizer.name}</span>
            {item.organizer.verified && <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-medium">
            <Badge className="bg-violet-50 text-violet-700 border-none font-black text-[10px] h-4 px-2">Event</Badge>
            <span>{item.timeAgo} ago</span>
          </div>
        </div>
        <button className="text-muted-foreground p-1 rounded-full hover:bg-muted shrink-0">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="relative aspect-video overflow-hidden">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-white font-black text-lg leading-tight">{item.title}</h3>
        </div>
        {item.price && (
          <div className="absolute top-3 right-3 bg-primary text-white font-black text-xs px-3 py-1 rounded-full shadow">
            {item.price}
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-start gap-2 bg-muted rounded-xl px-3 py-2.5">
            <Calendar className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] text-muted-foreground font-bold uppercase">Date & Time</p>
              <p className="text-xs font-black text-foreground leading-tight">{item.date}</p>
              <p className="text-[11px] text-muted-foreground">{item.time}</p>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-muted rounded-xl px-3 py-2.5">
            <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] text-muted-foreground font-bold uppercase">Venue</p>
              <p className="text-xs font-black text-foreground leading-tight">{item.location}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />{fmt(goingCount)} going
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-amber-400" />{fmt(item.interested)} interested
          </span>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleGoing}
            className={cn(
              "flex-1 rounded-full h-10 text-xs font-black transition-all",
              going ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-primary hover:bg-primary/90 text-white",
            )}
          >
            {going ? "✓ Going" : "I'm Going"}
          </Button>
          <Button variant="outline" className="rounded-full h-10 px-5 text-xs font-black border-2">
            View Event
          </Button>
        </div>
      </div>
      <div className="px-4 pb-3"><TagRow tags={item.tags} /></div>
    </Card>
  )
}

// ─── Dynamic Feed Inserts ─────────────────────────────────────────────────────

function PrayerInsertCard() {
  const { prayerData, loading, countdown, nextPrayerName, nextPrayerTime, locationName, timeFormat } = usePrayerSnapshot()
  if (loading || !prayerData) return null
  return (
    <Card className="rounded-none sm:rounded-2xl border-x-0 sm:border-x border-none shadow-sm overflow-hidden bg-gradient-to-r from-primary via-primary to-emerald-500 text-white">
      <a href="/prayer-times" className="block p-5 flex items-center justify-between relative overflow-hidden">
        <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10 blur-xl" />
        <div className="relative space-y-1">
          <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest opacity-75">
            <Moon className="h-3 w-3" /> Prayer Reminder
          </p>
          <p className="text-lg font-black tabular-nums">
            {nextPrayerName} · {String(countdown.hours).padStart(2, "0")}:{String(countdown.minutes).padStart(2, "0")}:{String(countdown.seconds).padStart(2, "0")}
          </p>
          <p className="text-xs font-bold opacity-80">{locationName || "Set your location"}</p>
        </div>
        <div className="relative text-right space-y-0.5 shrink-0">
          <p className="text-sm font-black">{nextPrayerTime ? formatPrayerTime(nextPrayerTime, timeFormat) : "--:--"}</p>
          <p className="text-[10px] font-bold opacity-70">All Prayer Times →</p>
        </div>
      </a>
    </Card>
  )
}

function FaithInsertCard() {
  const { moment, loading } = useFaithMoment()
  if (loading || !moment?.text) return null
  const label = moment.kind === "verse" ? "Daily Qur'an Verse" : moment.kind === "hadith" ? "Hadith Reminder" : "Dua of the Day"
  return (
    <Card className="rounded-none sm:rounded-2xl border-x-0 sm:border-x border-none shadow-sm bg-card overflow-hidden">
      <div className="p-5 space-y-2">
        <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-primary">
          <BookMarked className="h-3.5 w-3.5" /> {label}
        </p>
        <p className="text-sm font-medium italic leading-relaxed text-foreground">"{moment.text}"</p>
        <p className="text-[11px] font-bold text-muted-foreground">— {moment.reference}</p>
      </div>
    </Card>
  )
}

const DYNAMIC_INSERTS = [PrayerInsertCard, FaithInsertCard]

/** Weave rich, non-post inserts into the feed every few items — main "all" mode only. */
function interleaveFeedInserts(nodes: React.ReactNode[]): React.ReactNode[] {
  const INTERVAL = 4
  const out: React.ReactNode[] = []
  let insertIdx = 0
  nodes.forEach((node, i) => {
    out.push(node)
    if ((i + 1) % INTERVAL === 0 && i < nodes.length - 1) {
      const Insert = DYNAMIC_INSERTS[insertIdx % DYNAMIC_INSERTS.length]
      out.push(<Insert key={`insert-${i}`} />)
      insertIdx += 1
    }
  })
  return out
}

// ─── Card Dispatcher ──────────────────────────────────────────────────────────

function FeedCard({ item }: { item: { id: any; type: FeedItemType; [k: string]: any } }) {
  switch (item.type) {
    case "post":       return <PostCard       item={item} />
    case "reel":       return <ReelCard       item={item} />
    case "collab":     return <CollabCard     item={item} />
    case "community":  return <CommunityCard  item={item} />
    case "creator":    return <CreatorCard    item={item} />
    case "blog":       return <BlogCard       item={item} />
    case "discussion": return <DiscussionCard item={item} />
    case "offer":      return <OfferCard      item={item} />
    case "nearby":     return <NearbyCard     item={item} />
    case "event":      return <EventCard      item={item} />
    default:           return null
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const VIEWED_STORIES_KEY = "hh_viewed_stories"

export default function FeedPage() {
  const { user: composerUser } = useAuth()
  const composerInitials = getInitials(composerUser?.name)
  const [activeMode, setActiveMode] = React.useState("for-you")
  const [activeFilter, setActiveFilter] = React.useState("all")
  const [livePosts, setLivePosts] = React.useState<Array<{ id: any; type: FeedItemType; [k: string]: any }>>([])
  const [postsLoading, setPostsLoading] = React.useState(true)
  const [activeId, setActiveId] = React.useState<string | null>(null)
  const [audioOn, setAudioOn] = React.useState(false)
  const toggleAudio = React.useCallback(() => setAudioOn(a => !a), [])
  const clearActiveId = React.useCallback((id: string) => setActiveId(prev => prev === id ? null : prev), [])
  const [sidebarBizs, setSidebarBizs] = React.useState<Array<{ id: string; name: string; category: string | null; image_url: string | null; logo_url: string | null; city: string | null }>>([])
  const [sidebarProfiles, setSidebarProfiles] = React.useState<Array<{ id: string; name: string | null; photo_url: string | null; city: string | null }>>([])
  const [liveStories, setLiveStories] = React.useState<StoryItem[]>([])
  const [userStories, setUserStories] = React.useState<Array<StoryItem & { mediaUrl: string; mediaType: "image" | "video" }>>([])
  const [viewedStories, setViewedStories] = React.useState<Set<string>>(new Set())
  const [viewingStory, setViewingStory] = React.useState<{ name: string; avatar: string; mediaUrl: string; mediaType: "image" | "video" } | null>(null)

  // Compose modal state
  const [composerOpen, setComposerOpen] = React.useState(false)
  const [composerType, setComposerType] = React.useState<string | null>(null)

  const openComposer = React.useCallback((type?: string) => {
    setComposerType(type ?? null)
    setComposerOpen(true)
  }, [])

  React.useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(VIEWED_STORIES_KEY) ?? "[]")
      setViewedStories(new Set(stored))
    } catch {}
  }, [])

  const handleOpenStory = React.useCallback((id: string) => {
    if (id === "you") { openComposer("story"); return }
    // Check if it's a user-posted story with media
    const userStory = userStories.find(s => s.id === id)
    if (userStory) {
      setViewingStory({ name: userStory.name, avatar: userStory.avatar, mediaUrl: userStory.mediaUrl, mediaType: userStory.mediaType })
    }
    setViewedStories(prev => {
      if (prev.has(id)) return prev
      const next = new Set(prev).add(id)
      try { localStorage.setItem(VIEWED_STORIES_KEY, JSON.stringify([...next])) } catch {}
      return next
    })
  }, [openComposer, userStories])

  const loadPosts = React.useCallback(() => {
    const supabase = createClient()
    ;(supabase as any)
      .from("feed_posts")
      .select("id, display_name, description, media_url, firebase_media_url, business_name, place_name, post_type, metadata, created_at")
      .neq("post_type", "story")
      .order("created_at", { ascending: false })
      .limit(40)
      .then(({ data }: { data: any[] | null }) => {
        setPostsLoading(false)
        if (!data || data.length === 0) return
        setLivePosts(data.map((b, i) => {
          const url = b.media_url || b.firebase_media_url || ""
          const isVideo = url.includes(".mp4") || url.includes(".mov") || url.includes(".webm")
          const type = (b.post_type === "discussion" || b.post_type === "question") ? "discussion"
            : b.post_type === "event" ? "event"
            : "post"
          return {
            id: b.id ?? i + 1000,
            type: type as any,
            author: {
              name: b.display_name || "Halal Hub Member",
              handle: "@" + (b.display_name || "halalhub").toLowerCase().replace(/\s+/g, ""),
              avatar: null,
              verified: false,
            },
            location: b.place_name || null,
            images: url ? [url] : [],
            mediaType: isVideo ? "video" : "image",
            caption: b.description || "",
            likes: 0, comments: 0, shares: 0,
            timeAgo: timeAgo(b.created_at),
            tags: [] as string[],
            category: b.business_name || null,
            // For discussion-type posts
            question: b.description || "",
            excerpt: "",
            replies: 0, upvotes: 0, views: "0",
            isTrending: false,
            // event fields from metadata
            ...(b.metadata?.event_title ? {
              title: b.metadata.event_title,
              date: b.metadata.event_date || "",
              time: b.metadata.event_time || "",
              description: b.description || "",
              image: url || "",
              organizer: {
                name: b.display_name || "Organizer",
                handle: "",
                avatar: null,
                verified: false,
              },
              going: 0, interested: 0,
            } : {}),
          }
        }))
      })
  }, [])

  React.useEffect(() => {
    loadPosts()
    const supabase = createClient()
    ;(supabase as any)
      .from("businesses")
      .select("id, name, category, image_url, logo_url, city")
      .eq("status", "active")
      .limit(12)
      .then(({ data }: { data: any[] | null }) => {
        if (!data?.length) return
        // First 5 go to sidebar suggested accounts
        setSidebarBizs(data.slice(0, 5))
        // Build story bubbles from businesses that have an image
        const storyBizs = data.filter(b => b.logo_url || b.image_url).slice(0, 7)
        setLiveStories(storyBizs.map(b => ({
          id: b.id,
          name: b.name,
          avatar: b.logo_url || b.image_url || "",
          verified: true,
          kind: "business" as StoryKind,
        })))
      })
    ;(supabase as any)
      .from("profiles")
      .select("id, name, photo_url, city")
      .not("name", "is", null)
      .limit(5)
      .then(({ data }: { data: any[] | null }) => { if (data?.length) setSidebarProfiles(data) })

    // Load user-created stories from the last 24 hours
    const since = new Date(Date.now() - 86_400_000).toISOString()
    ;(supabase as any)
      .from("feed_posts")
      .select("id, display_name, media_url, post_type, created_at")
      .eq("post_type", "story")
      .not("media_url", "is", null)
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(20)
      .then(({ data }: { data: any[] | null }) => {
        if (!data?.length) return
        setUserStories(data.map(s => {
          const url: string = s.media_url || ""
          const isVideo = url.endsWith(".mp4") || url.endsWith(".mov") || url.endsWith(".webm")
          return {
            id: s.id,
            name: s.display_name || "Community Member",
            avatar: url,
            kind: "community" as StoryKind,
            mediaUrl: url,
            mediaType: isVideo ? "video" : "image",
          }
        }))
      })
  }, [loadPosts])

  const allItems = livePosts.length > 0 ? livePosts : []

  const trendingTopics = React.useMemo(() => {
    if (!livePosts.length) return []
    const typeLabel: Record<string, string> = {
      post: "#HalalHub", discussion: "#Discussions", question: "#Questions",
      event: "#Events", offer: "#Offers", community: "#Community",
      review: "#Reviews", recommendation: "#Recommendations",
    }
    const counts: Record<string, number> = {}
    livePosts.forEach(p => {
      const label = typeLabel[(p as any).post_type ?? p.type] || "#HalalHub"
      counts[label] = (counts[label] || 0) + 1
    })
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([tag, n]) => ({ tag, posts: String(n) }))
  }, [livePosts])

  const modeFilteredItems = React.useMemo(() => {
    switch (activeMode) {
      case "nearby":    return allItems.filter(item => item.type === "nearby" || !!item.location)
      case "trending":  return [...allItems].sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0))
      case "following": return allItems.filter(item => ["post", "creator", "community"].includes(item.type))
      default:          return allItems
    }
  }, [allItems, activeMode])

  const filteredItems = activeFilter === "all"
    ? modeFilteredItems
    : modeFilteredItems.filter(item => FILTER_TYPE_MAP[activeFilter]?.includes(item.type))

  const nearbyPeople = React.useMemo(() =>
    sidebarProfiles.map(p => ({
      name: p.name || "HalalHub User",
      handle: "@" + (p.name || "user").toLowerCase().replace(/\s+/g, "").slice(0, 20),
      avatar: p.photo_url || "",
      distance: p.city || "Nearby",
      mutual: 0,
      verified: false,
    })),
  [sidebarProfiles])

  const suggestedAccounts = React.useMemo(() =>
    sidebarBizs.map(b => ({
      name: b.name,
      handle: "@" + b.name.toLowerCase().replace(/\s+/g, "").slice(0, 20),
      avatar: b.logo_url || b.image_url || "",
      verified: true,
      followers: b.city
        ? `${b.category || "Business"} · ${b.city}`
        : (b.category || "Verified Business"),
    })),
  [sidebarBizs])

  return (
    <MuteCtxProvider value={{ activeId, audioOn, setActiveId, clearActiveId, toggleAudio }}>
    <div className="min-h-screen bg-background">
      <div className="w-full px-0 lg:px-4 xl:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-6 xl:gap-8">

          {/* ── Main Feed Column ──────────────────────────────────────────── */}
          <div className="lg:col-span-7 space-y-0">

            {/* Stories */}
            <div className="bg-card border-b border-border px-4 py-4 overflow-x-auto no-scrollbar">
              <div className="flex gap-4 w-max">
                {/* "Your Story" bubble always first */}
                <StoryBubble
                  story={{ id: "you", name: "Your Story", avatar: composerUser?.photoURL || "", isOwn: true }}
                  viewed={false}
                  onOpen={handleOpenStory}
                />
                {userStories.map(story => (
                  <StoryBubble key={story.id} story={story} viewed={viewedStories.has(story.id)} onOpen={handleOpenStory} />
                ))}
                {liveStories.map(story => (
                  <StoryBubble key={story.id} story={story} viewed={viewedStories.has(story.id)} onOpen={handleOpenStory} />
                ))}
              </div>
            </div>

            {/* Feed Modes */}
            <div className="bg-card border-b border-border px-4 py-3">
              <div className="flex gap-2">
                {FEED_MODES.map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setActiveMode(mode.id)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-1.5 rounded-2xl py-2.5 text-xs font-black transition-all duration-200",
                      activeMode === mode.id
                        ? "bg-primary text-white shadow-md shadow-primary/25 scale-[1.02]"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    <span>{mode.emoji}</span> {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Create Post */}
            <div className="bg-gradient-to-b from-card to-muted/20 border-b border-border p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <button onClick={() => openComposer()}>
                  <Avatar className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 border-2 border-card shadow-sm ring-1 ring-primary/20">
                    {composerUser?.photoURL && <AvatarImage src={composerUser.photoURL} />}
                    <AvatarFallback className="bg-primary/10 text-primary font-black">{composerInitials}</AvatarFallback>
                  </Avatar>
                </button>
                <button
                  onClick={() => openComposer()}
                  className="flex-1 text-left bg-muted hover:bg-muted/80 transition-colors rounded-2xl px-4 sm:px-5 py-3 text-sm text-muted-foreground font-medium shadow-inner"
                >
                  Share something with the Ummah…
                </button>
              </div>
              <div className="overflow-x-auto no-scrollbar mt-3">
                <div className="flex items-center gap-2 w-max pb-0.5">
                  {COMPOSER_ACTIONS.map(({ icon: Icon, label, tint, iconColor }) => {
                    const typeMap: Record<string, string> = {
                      "Photo": "photo", "Video": "video", "Review": "review",
                      "Discussion": "discussion", "Check In": "checkin", "Event": "event",
                      "Recommendation": "recommendation", "Offer": "offer",
                      "Business Update": "business_update", "Question": "question",
                      "Community Post": "community",
                    }
                    return (
                      <button
                        key={label}
                        onClick={() => openComposer(typeMap[label])}
                        className={cn(
                          "flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full whitespace-nowrap border border-transparent transition-all duration-150",
                          "hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0",
                          tint, iconColor,
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" /> {label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Filter Bar — sticky */}
            <div className="sticky top-0 z-20 bg-card/95 backdrop-blur-sm border-b border-border">
              <div className="overflow-x-auto no-scrollbar px-3 py-2.5">
                <div className="flex gap-2 w-max">
                  {FILTERS.map(f => (
                    <button
                      key={f.id}
                      onClick={() => setActiveFilter(f.id)}
                      className={cn(
                        "shrink-0 px-4 py-1.5 rounded-full text-xs font-black whitespace-nowrap transition-all",
                        activeFilter === f.id
                          ? "bg-primary text-white shadow-sm shadow-primary/30"
                          : "bg-muted text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                      )}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Feed items */}
            <div className="space-y-3 py-3 md:py-4 md:space-y-4">
              {postsLoading ? (
                /* Skeleton shimmer while live posts load */
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-card rounded-none sm:rounded-2xl overflow-hidden border border-border/50 shadow-sm">
                    <div className="flex items-center gap-3 p-4">
                      <div className="shimmer h-10 w-10 rounded-full shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="shimmer h-3 w-32 rounded-full" />
                        <div className="shimmer h-2.5 w-20 rounded-full" />
                      </div>
                    </div>
                    <div className="shimmer aspect-[4/3] w-full" />
                    <div className="p-4 space-y-2">
                      <div className="shimmer h-3 w-full rounded-full" />
                      <div className="shimmer h-3 w-3/4 rounded-full" />
                    </div>
                  </div>
                ))
              ) : filteredItems.length > 0 ? (
                activeFilter === "all"
                  ? interleaveFeedInserts(filteredItems.map(item => <FeedCard key={item.id} item={item} />))
                  : filteredItems.map(item => <FeedCard key={item.id} item={item} />)
              ) : (
                <div className="py-20 text-center space-y-2">
                  <Sparkles className="h-10 w-10 text-muted-foreground mx-auto" />
                  <p className="text-sm font-bold text-muted-foreground">Nothing here yet in this category.</p>
                </div>
              )}
              <div className="flex justify-center py-8">
                <Button variant="outline" className="rounded-full px-10 h-12 font-black border-2 text-sm hover:bg-primary hover:text-white hover:border-primary transition-all">
                  Load More
                </Button>
              </div>
            </div>
          </div>

          {/* ── Right Sidebar (desktop only) ──────────────────────────────── */}
          <div className="hidden lg:block lg:col-span-5 space-y-6 pt-4 sticky top-20 self-start">

            {/* User */}
            <div className="flex items-center gap-3 px-2">
              <Avatar className="h-14 w-14 border-2 border-white shadow-md ring-2 ring-primary/10">
                {composerUser?.photoURL && <AvatarImage src={composerUser.photoURL} />}
                <AvatarFallback className="bg-primary/10 text-primary font-black">{composerInitials || "?"}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-foreground truncate">{composerUser?.name || "Sign In"}</p>
                <p className="text-xs text-muted-foreground font-medium truncate">
                  {composerUser ? `@${(composerUser.name || "user").toLowerCase().replace(/\s+/g, "")}` : "Guest"}
                </p>
              </div>
              <Button variant="ghost" className="text-primary text-xs font-black shrink-0" asChild>
                <a href="/account/dashboard">Profile</a>
              </Button>
            </div>

            {/* People Near You */}
            <Card className="rounded-2xl border-none shadow-sm bg-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-foreground uppercase tracking-wider flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-primary" /> People Near You
                </h3>
                <button className="text-xs text-primary font-bold">See All</button>
              </div>
              <div className="space-y-4">
                {nearbyPeople.length === 0 && (
                  <p className="text-xs text-muted-foreground font-medium">No members found nearby.</p>
                )}
                {nearbyPeople.map(person => (
                  <div key={person.handle} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarImage src={person.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary font-black text-xs">{person.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="text-sm font-bold text-foreground truncate">{person.name}</p>
                        {person.verified && <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-medium">
                        <span className="flex items-center gap-0.5"><MapPin className="h-3 w-3" />{person.distance}</span>
                        <span>· {person.mutual} mutual</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="rounded-full h-8 w-8 p-0 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all shrink-0">
                      <UserPlus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Trending */}
            <Card className="rounded-2xl border-none shadow-sm bg-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-foreground uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" /> Trending
                </h3>
                <button className="text-xs text-primary font-bold">See All</button>
              </div>
              <div className="space-y-3">
                {trendingTopics.length > 0 ? trendingTopics.map((topic, i) => (
                  <button key={topic.tag} className="w-full text-left flex items-center justify-between group hover:bg-muted -mx-2 px-2 py-2 rounded-xl transition-colors">
                    <div>
                      <p className="text-sm font-black text-foreground group-hover:text-primary transition-colors">{topic.tag}</p>
                      <p className="text-[11px] text-muted-foreground font-medium">{topic.posts} posts</p>
                    </div>
                    <Flame className={cn("h-4 w-4", i === 0 ? "text-orange-500" : "text-muted-foreground")} />
                  </button>
                )) : (
                  <p className="text-xs text-muted-foreground font-medium">No trending topics yet.</p>
                )}
              </div>
            </Card>

            {/* Suggested Accounts */}
            <Card className="rounded-2xl border-none shadow-sm bg-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-foreground uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" /> Suggested
                </h3>
                <button className="text-xs text-primary font-bold">See All</button>
              </div>
              <div className="space-y-4">
                {suggestedAccounts.length === 0 && (
                  <p className="text-xs text-muted-foreground font-medium">No suggested accounts yet.</p>
                )}
                {suggestedAccounts.map(account => (
                  <div key={account.handle} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarImage src={account.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary font-black text-xs">{account.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="text-sm font-bold text-foreground truncate">{account.name}</p>
                        {account.verified && <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />}
                      </div>
                      <p className="text-[11px] text-muted-foreground font-medium">{account.followers}</p>
                    </div>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-full px-4 h-8 text-xs font-black shadow-sm shrink-0">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Footer links */}
            <div className="px-2 space-y-3">
              <div className="flex flex-wrap gap-x-2 gap-y-1">
                {["About", "Help", "Privacy", "Terms", "Halal Policy", "Locations", "Language"].map(link => (
                  <button key={link} className="text-[11px] text-muted-foreground hover:text-foreground font-medium transition-colors">{link}</button>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground font-bold">© 2026 Halal Hub</p>
            </div>
          </div>

        </div>
      </div>
    </div>
    {/* ── Story Viewer ─────────────────────────────────────────────────── */}
    {viewingStory && (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black" onClick={() => setViewingStory(null)}>
        <button className="absolute top-5 right-5 text-white bg-white/20 rounded-full p-2 hover:bg-white/30 z-10" onClick={() => setViewingStory(null)}>
          <X className="h-5 w-5" />
        </button>
        <div className="absolute top-5 left-5 flex items-center gap-3 z-10">
          <Avatar className="h-10 w-10 border-2 border-white shadow-md">
            <AvatarImage src={viewingStory.avatar} />
            <AvatarFallback className="bg-primary/20 text-white font-black">{viewingStory.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-white font-black text-sm">{viewingStory.name}</p>
            <p className="text-white/60 text-[11px] font-medium">Story · 24h</p>
          </div>
        </div>
        {viewingStory.mediaType === "video" ? (
          <video src={viewingStory.mediaUrl} className="max-h-screen max-w-full object-contain" autoPlay loop playsInline onClick={e => e.stopPropagation()} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={viewingStory.mediaUrl} alt="Story" className="max-h-screen max-w-full object-contain" onClick={e => e.stopPropagation()} />
        )}
      </div>
    )}

    <CreatePostModal
      open={composerOpen}
      initialType={composerType as any}
      onClose={() => setComposerOpen(false)}
      onPosted={() => {
        setPostsLoading(true)
        setLivePosts([])
        loadPosts()
        // Reload user stories in case a story was just posted
        const supabase = createClient()
        const since = new Date(Date.now() - 86_400_000).toISOString()
        ;(supabase as any)
          .from("feed_posts")
          .select("id, display_name, media_url, post_type, created_at")
          .eq("post_type", "story")
          .not("media_url", "is", null)
          .gte("created_at", since)
          .order("created_at", { ascending: false })
          .limit(20)
          .then(({ data }: { data: any[] | null }) => {
            if (!data?.length) return
            setUserStories(data.map(s => {
              const url: string = s.media_url || ""
              const isVideo = url.endsWith(".mp4") || url.endsWith(".mov") || url.endsWith(".webm")
              return {
                id: s.id, name: s.display_name || "Community Member",
                avatar: url, kind: "community" as StoryKind,
                mediaUrl: url, mediaType: isVideo ? "video" : "image",
              }
            }))
          })
      }}
    />
    </MuteCtxProvider>
  )
}
