"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BookOpen, Plus, Eye, Heart, Edit2, Trash2, Clock } from "lucide-react"

const ARTICLES = [
  { id: 1, title: "The Muslim Consumer Is Not a Niche — They're a £2.4 Trillion Movement", excerpt: "For too long, brands have treated Muslim consumers as an afterthought. Here's why the next decade belongs to those who get this right.", views: 6420, likes: 312, readTime: "8 min", date: "15 Jan 2024", status: "published", img: "https://picsum.photos/seed/blog1/800/400" },
  { id: 2, title: "Why Your Halal Brand Needs a Soul, Not Just a Certificate", excerpt: "Halal certification is the floor, not the ceiling. Real trust comes from authenticity, values, and a story that resonates.", views: 4180, likes: 241, readTime: "6 min", date: "28 Nov 2023", status: "published", img: "https://picsum.photos/seed/blog2/800/400" },
  { id: 3, title: "10 Mistakes Halal Businesses Make With Their Brand Voice", excerpt: "After consulting for over 80 Halal businesses, I've seen the same missteps again and again. Here's how to avoid them.", views: 8900, likes: 489, readTime: "11 min", date: "3 Oct 2023", status: "published", img: "https://picsum.photos/seed/blog3/800/400" },
  { id: 4, title: "Ramadan Marketing: A Strategic Guide for Halal Brands 2025", excerpt: "Draft in progress...", views: 0, likes: 0, readTime: "~10 min", date: "Draft", status: "draft", img: null },
]

export default function ProfessionalBlogPage() {
  const [showModal, setShowModal] = useState(false)
  const [tab, setTab] = useState<"published" | "draft">("published")

  const visible = ARTICLES.filter(a => a.status === tab)

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-4xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-600 font-black uppercase tracking-widest text-[10px]">
            <BookOpen className="h-3 w-3" /> Writing
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Blog & Articles</h1>
          <p className="text-sm font-bold text-muted-foreground">Establish thought leadership with long-form articles and guides.</p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700 rounded-2xl font-black h-12 text-white px-8" onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4 mr-2" /> Write Article
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: "Total Reads", value: "19,500", icon: Eye },
          { label: "Total Likes", value: "1,042", icon: Heart },
          { label: "Articles", value: String(ARTICLES.filter(a => a.status === "published").length), icon: BookOpen },
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
            {t === "draft" ? `Drafts (${ARTICLES.filter(a => a.status === "draft").length})` : "Published"}
          </button>
        ))}
      </div>

      {/* Articles */}
      <div className="space-y-5">
        {visible.map(article => (
          <Card key={article.id} className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {article.img && (
                <div className="md:w-56 h-40 md:h-auto shrink-0">
                  <img src={article.img} alt={article.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1 p-7 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <p className="font-black text-foreground text-lg leading-snug">{article.title}</p>
                    <p className="text-sm font-medium text-muted-foreground leading-relaxed">{article.excerpt}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-xl">
                      <Edit2 className="h-3 w-3 text-muted-foreground" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-xl">
                      <Trash2 className="h-3 w-3 text-rose-400" />
                    </Button>
                  </div>
                </div>
                {article.status === "published" ? (
                  <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground pt-1">
                    <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {article.views.toLocaleString()} reads</span>
                    <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5 text-rose-400" /> {article.likes}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {article.readTime}</span>
                    <span className="ml-auto">{article.date}</span>
                  </div>
                ) : (
                  <div className="flex gap-2 pt-1">
                    <Badge className="bg-muted text-muted-foreground border-none font-black text-[10px]">Draft · {article.readTime}</Badge>
                    <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-black text-xs h-8">Continue Writing</Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Write Article Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Write an Article</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Title</Label>
              <Input placeholder="Your article headline..." className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Introduction</Label>
              <Textarea placeholder="Start with a hook that draws your reader in..." className="min-h-[120px] rounded-2xl bg-muted border-none p-4 font-medium text-sm" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Cover Image URL (optional)</Label>
              <Input placeholder="https://..." className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 h-12 rounded-2xl border-2 font-black" onClick={() => setShowModal(false)}>Save Draft</Button>
              <Button className="flex-1 h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black" onClick={() => setShowModal(false)}>Publish</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
