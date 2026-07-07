"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Heart, MessageCircle, Send, Bookmark,
  MoreHorizontal, Plus, ShieldCheck, Play,
  MapPin, Flame, TrendingUp, Camera,
  Sparkles, Star, Music2, Handshake,
  Calendar, Clock, Users, BookOpen,
  MessageSquare, Navigation, Quote,
  ThumbsUp, UserPlus, Eye, ArrowRight,
  CheckCircle2,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type FeedItemType =
  | "post" | "reel" | "collab" | "offer" | "event"
  | "community" | "creator" | "blog" | "discussion" | "nearby"

// ─── Data ─────────────────────────────────────────────────────────────────────

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

const STORIES = [
  { id: "you", name: "Your Story", avatar: "https://randomuser.me/api/portraits/men/1.jpg", isOwn: true },
  { id: "1",   name: "Noor Kitchen",  avatar: "https://randomuser.me/api/portraits/women/7.jpg",   verified: true },
  { id: "2",   name: "Amina Travels", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
  { id: "3",   name: "Halal Bites",   avatar: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop&auto=format&q=80",  verified: true },
  { id: "4",   name: "Modest Wear",   avatar: "https://images.unsplash.com/photo-1612307057748-b44842539a29?w=800&h=600&fit=crop&auto=format&q=80" },
  { id: "5",   name: "Chef Yusuf",    avatar: "https://randomuser.me/api/portraits/men/3.jpg",  verified: true },
  { id: "6",   name: "Zahra Beauty",  avatar: "https://randomuser.me/api/portraits/women/5.jpg" },
  { id: "7",   name: "Ummah Eats",    avatar: "https://randomuser.me/api/portraits/men/21.jpg",  verified: true },
]

const FEED_ITEMS: Array<{ id: number; type: FeedItemType; [k: string]: any }> = [
  // 1 — Post
  {
    id: 1, type: "post",
    author: { name: "The Bosphorus Kitchen", handle: "@bosphoruskitchen", avatar: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format&q=80", verified: true },
    location: "Brooklyn, New York",
    images: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop&auto=format&q=80", "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop&auto=format&q=80"],
    mediaType: "image",
    caption: "Our signature Ottoman lamb shank is back on the menu! 🍖 Slow-cooked for 8 hours with traditional spices, served with saffron rice. 100% Halal certified.",
    likes: 1247, comments: 89, shares: 34, timeAgo: "2h",
    tags: ["#HalalFood", "#Ottoman", "#Brooklyn"],
    category: "Food & Dining",
  },
  // 2 — Community
  {
    id: 2, type: "community",
    community: { name: "Muslim Entrepreneurs Hub", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop&auto=format&q=80", members: "14.2K", verified: true },
    postedBy: { name: "Ibrahim Al-Sayed", avatar: "https://randomuser.me/api/portraits/men/5.jpg" },
    title: "How do you handle Zakat on business inventory?",
    body: "Assalamu Alaikum brothers and sisters. I run a modest clothing brand and I'm unsure how to calculate Zakat on unsold stock. Any scholars or accountants who can shed light on this?",
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=600&fit=crop&auto=format&q=80",
    likes: 342, comments: 87, timeAgo: "4h",
    tags: ["#Zakat", "#IslamicFinance", "#SmallBusiness"],
  },
  // 3 — Reel
  {
    id: 3, type: "reel",
    author: { name: "Chef Yusuf", handle: "@chefyusuf", avatar: "https://randomuser.me/api/portraits/men/3.jpg", verified: true },
    thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop&auto=format&q=80",
    caption: "Perfect shawarma in 60 seconds 🌯 The secret? Overnight marinate + charcoal. Trust me on this.",
    audio: "Ya Lili — Balti ft. Hamouda",
    likes: 8932, comments: 567, shares: 1204, views: "214K", timeAgo: "12h",
  },
  // 4 — Creator
  {
    id: 4, type: "creator",
    creator: { name: "Fatima Al-Rashid", handle: "@fatimadesigns", avatar: "https://randomuser.me/api/portraits/women/4.jpg", verified: true, followers: "89K", category: "Modest Fashion" },
    coverImage: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop&auto=format&q=80",
    bio: "Award-winning modest fashion designer · Sustainable & Ethical · Worn by 20K+ globally",
    recentPosts: ["https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop&auto=format&q=80", "https://images.unsplash.com/photo-1612307057748-b44842539a29?w=800&h=600&fit=crop&auto=format&q=80", "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop&auto=format&q=80"],
    tags: ["#ModestFashion", "#Sustainable", "#Abaya"],
  },
  // 5 — Blog
  {
    id: 5, type: "blog",
    author: { name: "Halal Hub Editorial", handle: "@halalhub", avatar: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format&q=80", verified: true },
    category: "Islamic Finance",
    title: "The Complete Guide to Halal Mortgages in 2026",
    excerpt: "With Islamic banking growing 15% annually, more Muslims are exploring Sharia-compliant home financing. Here's everything you need to know about Murabaha, Ijara, and Diminishing Musharakah structures.",
    coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&auto=format&q=80",
    readTime: "8 min read", likes: 2341, comments: 156, timeAgo: "1d",
    tags: ["#IslamicFinance", "#HalalMortgage", "#HomeBuying"],
  },
  // 6 — Collab
  {
    id: 6, type: "collab",
    party1: { name: "Noor Collective", handle: "@noorcollective", avatar: "https://randomuser.me/api/portraits/women/7.jpg", verified: true },
    party2: { name: "Zahra Beauty", handle: "@zahrabeauty", avatar: "https://randomuser.me/api/portraits/women/5.jpg", verified: false },
    headline: "Exclusive Ramadan Collection Drop ✨",
    body: "We've partnered to bring you the ultimate Ramadan style kit — modest elegance meets halal beauty. Pre-order now before it sells out.",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop&auto=format&q=80",
    likes: 3421, comments: 214, timeAgo: "6h",
    tags: ["#Collaboration", "#Ramadan", "#ModestStyle"],
  },
  // 7 — Discussion
  {
    id: 7, type: "discussion",
    author: { name: "Dr. Amira Hassan", handle: "@dramirahassan", avatar: "https://randomuser.me/api/portraits/women/3.jpg", verified: true },
    category: "Islamic Finance",
    question: "Is it permissible to invest in index funds that include non-halal companies?",
    excerpt: "I've been researching this for months. Mainstream scholarly opinion leans toward permissibility with purification, but there's significant disagreement among contemporary scholars on the threshold percentages.",
    replies: 234, upvotes: 1893, views: "12.4K", timeAgo: "3h",
    tags: ["#IslamicFinance", "#Investing", "#Fatwa"],
    isTrending: true,
  },
  // 8 — Offer
  {
    id: 8, type: "offer",
    business: { name: "Al-Zaeem Sweets", handle: "@alzaeemsweets", avatar: "https://images.unsplash.com/photo-1561043433-aaf687c4cf04?w=800&h=600&fit=crop&auto=format&q=80", verified: true },
    headline: "Eid Mega Sale — Up to 40% Off",
    body: "Celebrate Eid with our premium selection of traditional sweets. Order before Sunday for free same-day delivery.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&h=600&fit=crop&auto=format&q=80",
    cta: "Shop Now", discount: "40% OFF", validUntil: "Ends Jul 7",
    timeAgo: "2h",
  },
  // 9 — Nearby
  {
    id: 9, type: "nearby",
    places: [
      { name: "Al-Noor Masjid",      type: "Mosque",     distance: "0.3 mi", rating: 4.9, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&auto=format&q=80",  open: true },
      { name: "Bismillah Grill",      type: "Restaurant", distance: "0.6 mi", rating: 4.7, image: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800&h=600&fit=crop&auto=format&q=80",   open: true },
      { name: "The Halal Butcher",    type: "Butcher",    distance: "0.8 mi", rating: 4.8, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format&q=80", open: false },
      { name: "Islamic Books Corner", type: "Books",      distance: "1.1 mi", rating: 4.6, image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop&auto=format&q=80",   open: true },
    ],
  },
  // 10 — Event
  {
    id: 10, type: "event",
    organizer: { name: "Islamic Society of NYC", handle: "@isnyc", avatar: "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800&h=600&fit=crop&auto=format&q=80", verified: true },
    title: "Annual Halal Food Festival 2026",
    description: "Join 5,000+ attendees for the largest halal food festival in North America — 200+ vendors, live cooking shows, and family activities.",
    image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&h=600&fit=crop&auto=format&q=80",
    date: "Sat, Jul 19, 2026", time: "11:00 AM – 9:00 PM",
    location: "Central Park, New York",
    going: 3241, interested: 8920, timeAgo: "5h",
    tags: ["#HalalFood", "#NYC", "#Festival"],
    price: "$15",
  },
  // 11 — Post (travel)
  {
    id: 11, type: "post",
    author: { name: "Amina Travels", handle: "@aminatravels", avatar: "https://randomuser.me/api/portraits/women/2.jpg", verified: false },
    location: "Istanbul, Turkey",
    images: ["https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&auto=format&q=80"],
    mediaType: "image",
    caption: "Sunset at the Blue Mosque 🕌 There's nothing quite like hearing the Adhan echo across the Bosphorus at Maghrib. Sharing my full halal travel guide this week — save this!",
    likes: 3421, comments: 214, shares: 187, timeAgo: "5h",
    tags: ["#HalalTravel", "#Istanbul", "#BlueMosque"],
    category: "Travel",
  },
  // 12 — Blog (parenting)
  {
    id: 12, type: "blog",
    author: { name: "Umm Khalid Writes", handle: "@ummkhalidwrites", avatar: "https://randomuser.me/api/portraits/women/21.jpg", verified: false },
    category: "Parenting",
    title: "Raising Confident Muslim Kids in a Non-Muslim School",
    excerpt: "When my daughter came home crying because classmates laughed at her hijab, I knew we needed a serious conversation about identity and confidence. Here's what worked for us.",
    coverImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop&auto=format&q=80",
    readTime: "5 min read", likes: 892, comments: 234, timeAgo: "2d",
    tags: ["#MuslimParenting", "#Hijab", "#Identity"],
  },
  // 13 — Creator (educator)
  {
    id: 13, type: "creator",
    creator: { name: "Brother Yaqub", handle: "@brotheryaqub", avatar: "https://randomuser.me/api/portraits/men/6.jpg", verified: true, followers: "234K", category: "Islamic Education" },
    coverImage: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop&auto=format&q=80",
    bio: "Making Islamic knowledge accessible for the modern Muslim. Daily Quran reflections & Hadith explanations.",
    recentPosts: ["https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&h=600&fit=crop&auto=format&q=80", "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&h=600&fit=crop&auto=format&q=80", "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&h=600&fit=crop&auto=format&q=80"],
    tags: ["#IslamicEducation", "#Quran", "#Hadith"],
  },
]

const TRENDING_TOPICS = [
  { tag: "#RamadanRecipes",    posts: "12.4K" },
  { tag: "#HalalTravel2026",   posts: "8.2K" },
  { tag: "#ModestFashionWeek", posts: "5.7K" },
  { tag: "#HalalFinance",      posts: "3.1K" },
]

const SUGGESTED_ACCOUNTS = [
  { name: "Pure Glow Beauty", handle: "@pureglowbeauty", avatar: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop&auto=format&q=80", verified: true,  followers: "24K" },
  { name: "Ummah Fitness",    handle: "@ummahfitness",   avatar: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop&auto=format&q=80", verified: false, followers: "18K" },
  { name: "Barakah Finance",  handle: "@barakahfin",     avatar: "https://randomuser.me/api/portraits/men/22.jpg", verified: true,  followers: "31K" },
]

const PEOPLE_NEARBY = [
  { name: "Aisha Rahman", handle: "@aisharahman", avatar: "https://randomuser.me/api/portraits/women/1.jpg",  distance: "0.4 mi", mutual: 3, verified: false },
  { name: "Omar Farouq",  handle: "@omarfarouq",  avatar: "https://randomuser.me/api/portraits/men/2.jpg",   distance: "0.7 mi", mutual: 5, verified: true  },
  { name: "Zainab Ali",   handle: "@zainabali",   avatar: "https://randomuser.me/api/portraits/women/6.jpg", distance: "1.1 mi", mutual: 2, verified: false },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M"
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + "K"
  return String(n)
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

// ─── Story Bubble ─────────────────────────────────────────────────────────────

function StoryBubble({ story }: { story: typeof STORIES[0] }) {
  return (
    <button className="flex flex-col items-center gap-1.5 shrink-0 group">
      <div className={cn(
        "rounded-full p-[3px]",
        story.isOwn ? "bg-muted" : "bg-gradient-to-br from-primary via-emerald-400 to-teal-500",
      )}>
        <div className="bg-card rounded-full p-[2px]">
          <div className="relative">
            <Avatar className="h-14 w-14 sm:h-16 sm:w-16 group-hover:scale-105 transition-transform">
              <AvatarImage src={story.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary font-black text-sm">{story.name[0]}</AvatarFallback>
            </Avatar>
            {story.isOwn ? (
              <div className="absolute -bottom-0.5 -right-0.5 bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center border-2 border-white shadow-sm">
                <Plus className="h-3.5 w-3.5" />
              </div>
            ) : (story as any).verified ? (
              <div className="absolute -bottom-0.5 -right-0.5 bg-primary text-white rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                <ShieldCheck className="h-3 w-3" />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <span className="text-[11px] font-bold text-muted-foreground max-w-[72px] truncate">
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

  const handleLike = () => { setLiked(l => !l); setLikeCount(c => liked ? c - 1 : c + 1) }
  const isLong = item.caption.length > 120

  return (
    <Card className="rounded-none sm:rounded-2xl border-x-0 sm:border-x border-none shadow-sm bg-card overflow-hidden">
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

      <div className="relative bg-muted aspect-square overflow-hidden">
        <img src={item.images[imgIndex]} alt={item.caption} className="w-full h-full object-cover" />
        {item.mediaType === "video" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/30 backdrop-blur-sm rounded-full h-16 w-16 flex items-center justify-center">
              <Play className="h-8 w-8 text-white fill-white ml-1" />
            </div>
          </div>
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
        <div className="absolute top-4 left-4">
          <Badge className="bg-card/90 backdrop-blur text-foreground border-none font-bold text-[10px] uppercase tracking-wider shadow-sm px-3 py-1">
            {item.category}
          </Badge>
        </div>
      </div>

      <div className="px-4 pt-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={handleLike} className="group">
            <Heart className={cn("h-6 w-6 transition-all active:scale-125", liked ? "text-red-500 fill-red-500" : "text-foreground group-hover:text-red-400")} />
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
          <AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" />
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

  const handleLike = () => { setLiked(l => !l); setLikeCount(c => liked ? c - 1 : c + 1) }

  return (
    <Card className="rounded-none sm:rounded-2xl border-x-0 sm:border-x border-none shadow-sm bg-black overflow-hidden">
      <div className="relative aspect-[9/16] w-full max-w-sm lg:max-w-5xl mx-auto">
        <img src={item.thumbnail} alt={item.caption} className="w-full h-full object-cover" />
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

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black/20 rounded-full h-14 w-14 flex items-center justify-center">
            <Play className="h-7 w-7 text-white fill-white ml-0.5" />
          </div>
        </div>

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
      <div className="flex gap-3 px-4 pb-4 overflow-x-auto no-scrollbar">
        {item.places.map((place: any, i: number) => (
          <div key={i} className="shrink-0 w-40 rounded-xl overflow-hidden bg-muted cursor-pointer group border border-border/50">
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

// ─── Card Dispatcher ──────────────────────────────────────────────────────────

function FeedCard({ item }: { item: typeof FEED_ITEMS[0] }) {
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

export default function FeedPage() {
  const [activeFilter, setActiveFilter] = React.useState("all")

  const filteredItems = activeFilter === "all"
    ? FEED_ITEMS
    : FEED_ITEMS.filter(item => FILTER_TYPE_MAP[activeFilter]?.includes(item.type))

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1024px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ── Main Feed Column ──────────────────────────────────────────── */}
          <div className="lg:col-span-7 space-y-0">

            {/* Stories */}
            <div className="bg-card border-b border-border px-4 py-3 overflow-x-auto no-scrollbar">
              <div className="flex gap-3 w-max">
                {STORIES.map(story => <StoryBubble key={story.id} story={story} />)}
              </div>
            </div>

            {/* Create Post */}
            <div className="bg-card border-b border-border p-3 sm:p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 sm:h-10 sm:w-10 shrink-0">
                  <AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" />
                  <AvatarFallback className="bg-primary/10 text-primary font-black">U</AvatarFallback>
                </Avatar>
                <button className="flex-1 text-left bg-muted hover:bg-muted/80 transition-colors rounded-full px-4 sm:px-5 py-2.5 text-sm text-muted-foreground font-medium">
                  Share with the Ummah…
                </button>
                <button className="bg-primary/10 hover:bg-primary/20 text-primary rounded-full p-2.5 transition-colors shrink-0">
                  <Camera className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
              <div className="overflow-x-auto no-scrollbar mt-2.5">
                <div className="flex items-center gap-1 w-max pl-12 sm:pl-[52px]">
                  {[
                    { icon: Camera,         label: "Photo" },
                    { icon: Play,           label: "Video" },
                    { icon: MapPin,         label: "Location" },
                    { icon: Star,           label: "Review" },
                    { icon: MessageCircle,  label: "Discussion" },
                  ].map(({ icon: Icon, label }) => (
                    <button key={label} className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-full hover:bg-primary/5 whitespace-nowrap">
                      <Icon className="h-3.5 w-3.5" /> {label}
                    </button>
                  ))}
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
              {filteredItems.length > 0 ? (
                filteredItems.map(item => <FeedCard key={item.id} item={item} />)
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
                <AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" />
                <AvatarFallback className="bg-primary/10 text-primary font-black">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-black text-foreground">Super User</p>
                <p className="text-xs text-muted-foreground font-medium">@superuser · Hub Level 12</p>
              </div>
              <Button variant="ghost" className="text-primary text-xs font-black">Switch</Button>
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
                {PEOPLE_NEARBY.map(person => (
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
                {TRENDING_TOPICS.map((topic, i) => (
                  <button key={topic.tag} className="w-full text-left flex items-center justify-between group hover:bg-muted -mx-2 px-2 py-2 rounded-xl transition-colors">
                    <div>
                      <p className="text-sm font-black text-foreground group-hover:text-primary transition-colors">{topic.tag}</p>
                      <p className="text-[11px] text-muted-foreground font-medium">{topic.posts} posts</p>
                    </div>
                    <Flame className={cn("h-4 w-4", i === 0 ? "text-orange-500" : "text-muted-foreground")} />
                  </button>
                ))}
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
                {SUGGESTED_ACCOUNTS.map(account => (
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
                      <p className="text-[11px] text-muted-foreground font-medium">{account.followers} followers</p>
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
  )
}
