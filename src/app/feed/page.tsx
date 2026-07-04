"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Heart, MessageCircle, Send, Bookmark,
  MoreHorizontal, Plus, ShieldCheck, Play,
  MapPin, Flame, TrendingUp, Camera,
  Sparkles, Share2, ThumbsUp, Eye,
  ChefHat, Plane, ShoppingBag, Utensils,
  Star, Volume2, VolumeX
} from "lucide-react"
import { cn } from "@/lib/utils"

const STORIES = [
  { id: "you", name: "Your Story", avatar: "https://picsum.photos/seed/user/100/100", hasStory: false, isOwn: true },
  { id: "1", name: "Noor Kitchen", avatar: "https://picsum.photos/seed/noor/100/100", hasStory: true, verified: true },
  { id: "2", name: "Amina Travels", avatar: "https://picsum.photos/seed/amina/100/100", hasStory: true, verified: false },
  { id: "3", name: "Halal Bites", avatar: "https://picsum.photos/seed/bites/100/100", hasStory: true, verified: true },
  { id: "4", name: "Modest Wear", avatar: "https://picsum.photos/seed/modest/100/100", hasStory: true, verified: false },
  { id: "5", name: "Chef Yusuf", avatar: "https://picsum.photos/seed/yusuf/100/100", hasStory: true, verified: true },
  { id: "6", name: "Zahra Beauty", avatar: "https://picsum.photos/seed/zahra/100/100", hasStory: true, verified: false },
  { id: "7", name: "Ummah Eats", avatar: "https://picsum.photos/seed/ummah/100/100", hasStory: true, verified: true },
  { id: "8", name: "Hijab Studio", avatar: "https://picsum.photos/seed/hijab/100/100", hasStory: true, verified: false },
]

const FEED_POSTS = [
  {
    id: 1,
    author: { name: "The Bosphorus Kitchen", handle: "@bosphoruskitchen", avatar: "https://picsum.photos/seed/bosphorus/100/100", verified: true },
    location: "Brooklyn, New York",
    type: "image" as const,
    images: [
      "https://picsum.photos/seed/food1/800/800",
      "https://picsum.photos/seed/food2/800/800",
      "https://picsum.photos/seed/food3/800/800",
    ],
    caption: "Our signature Ottoman lamb shank is now back on the menu! 🍖 Slow-cooked for 8 hours with traditional spices, served with saffron rice and grilled vegetables. 100% Halal certified.",
    likes: 1247,
    comments: 89,
    shares: 34,
    timeAgo: "2h",
    tags: ["#HalalFood", "#Ottoman", "#Brooklyn"],
    category: "Food & Dining",
  },
  {
    id: 2,
    author: { name: "Amina Travels", handle: "@aminatravels", avatar: "https://picsum.photos/seed/amina/100/100", verified: false },
    location: "Istanbul, Turkey",
    type: "image" as const,
    images: [
      "https://picsum.photos/seed/istanbul1/800/1000",
    ],
    caption: "Sunset at the Blue Mosque 🕌 There's nothing quite like hearing the Adhan echo across the Bosphorus at Maghrib. If you're planning a halal-friendly trip to Istanbul, save this post — I'll be sharing my full guide this week!",
    likes: 3421,
    comments: 214,
    shares: 187,
    timeAgo: "5h",
    tags: ["#HalalTravel", "#Istanbul", "#BlueMosque"],
    category: "Travel",
  },
  {
    id: 3,
    author: { name: "Noor Collective", handle: "@noorcollective", avatar: "https://picsum.photos/seed/noorcol/100/100", verified: true },
    location: "London, UK",
    type: "image" as const,
    images: [
      "https://picsum.photos/seed/fashion1/800/1000",
      "https://picsum.photos/seed/fashion2/800/1000",
    ],
    caption: "New Ramadan collection just dropped ✨ Elegant abayas crafted with breathable organic cotton. Ethically sourced, modestly designed, beautifully made. Shop link in bio.",
    likes: 2156,
    comments: 143,
    shares: 92,
    timeAgo: "8h",
    tags: ["#ModestFashion", "#Abaya", "#EthicalFashion"],
    category: "Fashion",
  },
  {
    id: 4,
    author: { name: "Chef Yusuf", handle: "@chefyusuf", avatar: "https://picsum.photos/seed/yusuf/100/100", verified: true },
    location: "Dubai, UAE",
    type: "video" as const,
    images: [
      "https://picsum.photos/seed/recipe1/800/800",
    ],
    caption: "How to make the PERFECT chicken shawarma at home 🌯 Full recipe in 60 seconds. The secret? Marinate overnight and use real charcoal. Trust me on this one.",
    likes: 8932,
    comments: 567,
    shares: 1204,
    timeAgo: "12h",
    tags: ["#HalalRecipe", "#Shawarma", "#CookingTutorial"],
    category: "Recipe",
  },
  {
    id: 5,
    author: { name: "Halal Hub Official", handle: "@halalhub", avatar: "https://picsum.photos/seed/halalhub/100/100", verified: true },
    location: "Global",
    type: "image" as const,
    images: [
      "https://picsum.photos/seed/community1/800/600",
    ],
    caption: "🎉 We just hit 50,000 verified businesses on Halal Hub! Thank you to every vendor, reviewer, and community member who made this possible. Together, we're building the world's largest halal ecosystem.",
    likes: 12450,
    comments: 892,
    shares: 2341,
    timeAgo: "1d",
    tags: ["#HalalHub", "#Milestone", "#Community"],
    category: "Announcement",
  },
]

const TRENDING_TOPICS = [
  { tag: "#RamadanRecipes", posts: "12.4K" },
  { tag: "#HalalTravel2026", posts: "8.2K" },
  { tag: "#ModestFashionWeek", posts: "5.7K" },
  { tag: "#HalalFinance", posts: "3.1K" },
]

const SUGGESTED_ACCOUNTS = [
  { name: "Pure Glow Beauty", handle: "@pureglowbeauty", avatar: "https://picsum.photos/seed/pureglow/100/100", verified: true, followers: "24K" },
  { name: "Ummah Fitness", handle: "@ummahfitness", avatar: "https://picsum.photos/seed/fitness/100/100", verified: false, followers: "18K" },
  { name: "Barakah Finance", handle: "@barakahfin", avatar: "https://picsum.photos/seed/barakah/100/100", verified: true, followers: "31K" },
]

function formatCount(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M"
  if (n >= 1000) return (n / 1000).toFixed(1) + "K"
  return n.toString()
}

function StoryBubble({ story }: { story: typeof STORIES[0] }) {
  return (
    <button className="flex flex-col items-center gap-1.5 shrink-0 group">
      <div className={cn(
        "rounded-full p-[3px]",
        story.isOwn ? "bg-muted" : "bg-gradient-to-br from-primary via-emerald-400 to-teal-500"
      )}>
        <div className="bg-card rounded-full p-[2px]">
          <div className="relative">
            <Avatar className="h-16 w-16 group-hover:scale-105 transition-transform">
              <AvatarImage src={story.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary font-black text-sm">{story.name[0]}</AvatarFallback>
            </Avatar>
            {story.isOwn && (
              <div className="absolute -bottom-0.5 -right-0.5 bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center border-2 border-white shadow-sm">
                <Plus className="h-3.5 w-3.5" />
              </div>
            )}
            {story.verified && (
              <div className="absolute -bottom-0.5 -right-0.5 bg-primary text-white rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                <ShieldCheck className="h-3 w-3" />
              </div>
            )}
          </div>
        </div>
      </div>
      <span className="text-[11px] font-bold text-muted-foreground max-w-[72px] truncate">
        {story.isOwn ? "Your Story" : story.name.split(" ")[0]}
      </span>
    </button>
  )
}

function FeedPost({ post }: { post: typeof FEED_POSTS[0] }) {
  const [liked, setLiked] = React.useState(false)
  const [saved, setSaved] = React.useState(false)
  const [activeImage, setActiveImage] = React.useState(0)
  const [showFullCaption, setShowFullCaption] = React.useState(false)
  const [likeCount, setLikeCount] = React.useState(post.likes)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(prev => liked ? prev - 1 : prev + 1)
  }

  const captionThreshold = 120
  const isLongCaption = post.caption.length > captionThreshold

  return (
    <Card className="rounded-2xl md:rounded-3xl border-none shadow-sm bg-card overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full p-[2px] bg-gradient-to-br from-primary via-emerald-400 to-teal-500">
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary font-black text-xs">{post.author.name[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black text-foreground">{post.author.name}</span>
              {post.author.verified && (
                <ShieldCheck className="h-4 w-4 text-primary fill-primary/20" />
              )}
            </div>
            {post.location && (
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-medium">
                <MapPin className="h-3 w-3" />
                {post.location}
              </div>
            )}
          </div>
        </div>
        <button className="text-muted-foreground hover:text-muted-foreground transition-colors p-2 rounded-full hover:bg-muted">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Post Image */}
      <div className="relative bg-muted aspect-square overflow-hidden">
        <Image
          src={post.images[activeImage]}
          alt={post.caption}
          fill
          className="object-cover"
        />

        {/* Video play overlay */}
        {post.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/30 backdrop-blur-sm rounded-full h-16 w-16 flex items-center justify-center">
              <Play className="h-8 w-8 text-white fill-white ml-1" />
            </div>
          </div>
        )}

        {/* Image carousel dots */}
        {post.images.length > 1 && (
          <>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {post.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "rounded-full transition-all",
                    i === activeImage ? "w-6 h-2 bg-card" : "w-2 h-2 bg-card/50"
                  )}
                />
              ))}
            </div>
            {activeImage > 0 && (
              <button
                onClick={() => setActiveImage(prev => prev - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur rounded-full h-8 w-8 flex items-center justify-center shadow-lg text-foreground hover:bg-card transition-colors"
              >
                ‹
              </button>
            )}
            {activeImage < post.images.length - 1 && (
              <button
                onClick={() => setActiveImage(prev => prev + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur rounded-full h-8 w-8 flex items-center justify-center shadow-lg text-foreground hover:bg-card transition-colors"
              >
                ›
              </button>
            )}
          </>
        )}

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-card/90 backdrop-blur text-foreground border-none font-bold text-[10px] uppercase tracking-wider shadow-sm px-3 py-1">
            {post.category}
          </Badge>
        </div>

        {/* Carousel counter */}
        {post.images.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
            {activeImage + 1}/{post.images.length}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="px-4 pt-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={handleLike} className="group">
            <Heart className={cn(
              "h-6 w-6 transition-all active:scale-125",
              liked ? "text-red-500 fill-red-500" : "text-foreground group-hover:text-red-400"
            )} />
          </button>
          <button className="group">
            <MessageCircle className="h-6 w-6 text-foreground group-hover:text-primary transition-colors" />
          </button>
          <button className="group">
            <Send className="h-5 w-5 text-foreground group-hover:text-primary transition-colors -rotate-12" />
          </button>
        </div>
        <button onClick={() => setSaved(!saved)} className="group">
          <Bookmark className={cn(
            "h-6 w-6 transition-all",
            saved ? "text-foreground fill-slate-900" : "text-foreground group-hover:text-foreground"
          )} />
        </button>
      </div>

      {/* Likes */}
      <div className="px-4 pt-2">
        <span className="text-sm font-black text-foreground">{formatCount(likeCount)} likes</span>
      </div>

      {/* Caption */}
      <div className="px-4 pt-1 pb-2">
        <p className="text-sm text-foreground leading-relaxed">
          <span className="font-black text-foreground mr-1.5">{post.author.handle}</span>
          {isLongCaption && !showFullCaption
            ? <>{post.caption.slice(0, captionThreshold)}... <button onClick={() => setShowFullCaption(true)} className="text-muted-foreground font-medium">more</button></>
            : post.caption
          }
        </p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs font-bold text-primary hover:text-primary/70 cursor-pointer">{tag}</span>
          ))}
        </div>
      </div>

      {/* Comments preview */}
      {post.comments > 0 && (
        <button className="px-4 pb-1">
          <span className="text-sm text-muted-foreground font-medium">View all {post.comments} comments</span>
        </button>
      )}

      {/* Timestamp */}
      <div className="px-4 pb-3">
        <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">{post.timeAgo} ago</span>
      </div>

      {/* Comment input */}
      <div className="border-t border-border px-4 py-3 flex items-center gap-3">
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src="https://picsum.photos/seed/user/100/100" />
          <AvatarFallback className="bg-primary/10 text-primary font-black text-[10px]">YOU</AvatarFallback>
        </Avatar>
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground text-foreground"
        />
        <button className="text-primary font-black text-sm opacity-50 hover:opacity-100 transition-opacity">Post</button>
      </div>
    </Card>
  )
}

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1024px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Main Feed Column */}
          <div className="lg:col-span-7 space-y-0">
            {/* Stories Bar */}
            <div className="bg-card border-b border-border p-4 overflow-x-auto no-scrollbar">
              <div className="flex gap-4">
                {STORIES.map(story => (
                  <StoryBubble key={story.id} story={story} />
                ))}
              </div>
            </div>

            {/* Create Post */}
            <div className="bg-card border-b border-border p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarImage src="https://picsum.photos/seed/user/100/100" />
                  <AvatarFallback className="bg-primary/10 text-primary font-black">U</AvatarFallback>
                </Avatar>
                <button className="flex-1 text-left bg-muted hover:bg-muted transition-colors rounded-full px-5 py-3 text-sm text-muted-foreground font-medium">
                  Share something with the Ummah...
                </button>
                <button className="bg-primary/10 hover:bg-primary/20 text-primary rounded-full p-3 transition-colors">
                  <Camera className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center gap-2 mt-3 pl-[52px]">
                <button className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-full hover:bg-primary/5">
                  <Camera className="h-3.5 w-3.5" /> Photo
                </button>
                <button className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-full hover:bg-primary/5">
                  <Play className="h-3.5 w-3.5" /> Video
                </button>
                <button className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-full hover:bg-primary/5">
                  <MapPin className="h-3.5 w-3.5" /> Location
                </button>
                <button className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-full hover:bg-primary/5">
                  <Star className="h-3.5 w-3.5" /> Review
                </button>
              </div>
            </div>

            {/* Feed Posts */}
            <div className="space-y-3 p-3 md:p-0 md:pt-4 md:space-y-6">
              {FEED_POSTS.map(post => (
                <FeedPost key={post.id} post={post} />
              ))}

              {/* Load More */}
              <div className="flex justify-center py-8">
                <Button variant="outline" className="rounded-full px-10 h-12 font-black border-2 text-sm hover:bg-primary hover:text-white hover:border-primary transition-all">
                  Load More Posts
                </Button>
              </div>
            </div>
          </div>

          {/* Right Sidebar — Desktop only */}
          <div className="hidden lg:block lg:col-span-5 space-y-6 pt-4 sticky top-20 self-start">
            {/* User Profile Card */}
            <div className="flex items-center gap-3 px-2">
              <Avatar className="h-14 w-14 border-2 border-white shadow-md ring-2 ring-primary/10">
                <AvatarImage src="https://picsum.photos/seed/user/100/100" />
                <AvatarFallback className="bg-primary/10 text-primary font-black">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-black text-foreground">Super User</p>
                <p className="text-xs text-muted-foreground font-medium">@superuser • Hub Level 12</p>
              </div>
              <Button variant="ghost" className="text-primary text-xs font-black">Switch</Button>
            </div>

            {/* Trending Topics */}
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
                    <Avatar className="h-10 w-10">
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
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-full px-4 h-8 text-xs font-black shadow-sm">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Links */}
            <div className="px-2 space-y-3">
              <div className="flex flex-wrap gap-x-2 gap-y-1">
                {["About", "Help", "Privacy", "Terms", "Halal Policy", "Locations", "Language"].map(link => (
                  <button key={link} className="text-[11px] text-muted-foreground hover:text-muted-foreground font-medium transition-colors">{link}</button>
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
