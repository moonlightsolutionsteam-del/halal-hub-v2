"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PenTool, Plus, Heart, MessageCircle, Share2, Eye, Edit2, Trash2, Image, BarChart2 } from "lucide-react"

const POSTS = [
  { id: 1, content: "Just wrapped up a brand strategy workshop with 12 Halal entrepreneurs. The passion and vision in that room was incredible. Watch this space — some of these brands are going to change how the world sees the Muslim consumer. 🤝", likes: 284, comments: 47, shares: 31, views: 1840, date: "2 hours ago", img: null, status: "published" },
  { id: 2, content: "Three years ago I took a bet on Halal branding when nobody was talking about it. Today it's a £2.4 trillion opportunity. The Muslim consumer is not a niche — they're a movement. Thread on what I've learned 👇", likes: 612, comments: 89, shares: 94, views: 4200, date: "Yesterday", img: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=600&fit=crop&auto=format&q=80", status: "published" },
  { id: 3, content: "Your brand is not your logo. It's not your colours. It's not even your tagline. It's the feeling someone gets when they think of you. Are you building a feeling worth remembering?", likes: 421, comments: 63, shares: 58, views: 3100, date: "3 days ago", img: null, status: "published" },
  { id: 4, content: "Draft: Ramadan marketing guide for Halal brands — coming soon...", likes: 0, comments: 0, shares: 0, views: 0, date: "Draft", img: null, status: "draft" },
]

export default function ProfessionalPostsPage() {
  const [showModal, setShowModal] = useState(false)
  const [tab, setTab] = useState<"published" | "draft">("published")

  const visible = POSTS.filter(p => p.status === tab)

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-3xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-600 font-black uppercase tracking-widest text-[10px]">
            <PenTool className="h-3 w-3" /> Content
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Social Posts</h1>
          <p className="text-sm font-bold text-muted-foreground">Share insights, thoughts, and updates with your professional network.</p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700 rounded-2xl font-black h-12 text-white px-8" onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4 mr-2" /> New Post
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: "Total Reach", value: "9,140", icon: Eye },
          { label: "Total Likes", value: "1,317", icon: Heart },
          { label: "Total Shares", value: "183", icon: Share2 },
        ].map(s => (
          <Card key={s.label} className="rounded-[2rem] border-none shadow-sm bg-card p-5 text-center space-y-2">
            <s.icon className="h-5 w-5 text-violet-600 mx-auto" />
            <p className="text-xl font-black text-foreground">{s.value}</p>
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["published", "draft"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-2xl text-xs font-black capitalize transition-colors ${tab === t ? "bg-violet-600 text-white" : "bg-card text-muted-foreground hover:bg-muted"}`}>
            {t === "draft" ? `Drafts (${POSTS.filter(p => p.status === "draft").length})` : "Published"}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {visible.map(post => (
          <Card key={post.id} className="rounded-[2rem] border-none shadow-sm bg-card p-7 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <p className={`text-sm font-medium leading-relaxed ${post.status === "draft" ? "text-muted-foreground italic" : "text-foreground"}`}>{post.content}</p>
              <div className="flex gap-1 shrink-0">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-xl">
                  <Edit2 className="h-3 w-3 text-muted-foreground" />
                </Button>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-xl">
                  <Trash2 className="h-3 w-3 text-rose-400" />
                </Button>
              </div>
            </div>
            {post.img && (
              <div className="rounded-2xl overflow-hidden h-48">
                <img src={post.img} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            {post.status === "published" && (
              <div className="flex items-center gap-5 text-xs font-bold text-muted-foreground pt-1 border-t border-border">
                <span className="flex items-center gap-1.5"><Heart className="h-3.5 w-3.5 text-rose-400" /> {post.likes}</span>
                <span className="flex items-center gap-1.5"><MessageCircle className="h-3.5 w-3.5 text-violet-400" /> {post.comments}</span>
                <span className="flex items-center gap-1.5"><Share2 className="h-3.5 w-3.5 text-emerald-400" /> {post.shares}</span>
                <span className="flex items-center gap-1.5"><Eye className="h-3.5 w-3.5" /> {post.views.toLocaleString()}</span>
                <span className="ml-auto text-muted-foreground/60">{post.date}</span>
              </div>
            )}
            {post.status === "draft" && (
              <div className="flex gap-2">
                <Badge className="bg-muted text-muted-foreground border-none font-black text-[10px]">Draft</Badge>
                <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-black text-xs h-8">Publish</Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* New Post Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Create a Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <Textarea placeholder="Share a thought, insight, or update with your network..." className="min-h-[140px] rounded-2xl bg-muted border-none p-4 font-medium text-sm" />
            <div className="flex items-center gap-3 border border-dashed border-border rounded-2xl p-4 cursor-pointer hover:border-violet-300 transition-colors">
              <Image className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-bold text-muted-foreground">Add an image</span>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 h-12 rounded-2xl border-2 font-black" onClick={() => setShowModal(false)}>Save as Draft</Button>
              <Button className="flex-1 h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black" onClick={() => setShowModal(false)}>Publish Now</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
