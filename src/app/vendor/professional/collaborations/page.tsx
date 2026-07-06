"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Handshake, Plus, Search, MapPin, Clock, Bookmark, Send } from "lucide-react"

const OPPORTUNITIES = [
  {
    id: 1, title: "Co-create Islamic Finance Content Series", postedBy: "IslahMedia", avatar: "col1",
    type: "Content", duration: "3 months", location: "Remote",
    desc: "Looking for a brand strategist to co-author a 12-part series on Islamic finance for modern Muslims. Revenue share model.",
    skills: ["Content Strategy", "Islamic Finance", "Brand Voice"],
    compensation: "Revenue Share", posted: "2 days ago", saved: false,
  },
  {
    id: 2, title: "Halal Startup Accelerator — Mentor in Residence", postedBy: "HIBA Foundation", avatar: "col2",
    type: "Mentorship", duration: "6 months", location: "London / Remote",
    desc: "Seeking experienced marketing professionals to mentor Halal startup founders through our accelerator programme.",
    skills: ["Marketing", "Brand Strategy", "Mentoring"],
    compensation: "Equity + Honorarium", posted: "5 days ago", saved: true,
  },
  {
    id: 3, title: "Muslim Fashion Brand — Strategy Partnership", postedBy: "Modestia", avatar: "col3",
    type: "Partnership", duration: "12 months", location: "Remote",
    desc: "We're launching in 3 new markets and need a strategic partner to lead our brand positioning and go-to-market in each.",
    skills: ["Brand Strategy", "Market Entry", "Fashion"],
    compensation: "Fixed Fee + Equity", posted: "1 week ago", saved: false,
  },
  {
    id: 4, title: "Ramadan 2025 Campaign Collaboration", postedBy: "Barakah Studio", avatar: "col4",
    type: "Campaign", duration: "2 months", location: "Remote",
    desc: "Multi-brand Ramadan campaign bringing together 6 Halal businesses. Looking for a strategy lead to unify the narrative.",
    skills: ["Campaign Strategy", "Brand Management", "Copywriting"],
    compensation: "Fixed Fee", posted: "3 days ago", saved: false,
  },
]

const TYPES = ["All", "Content", "Mentorship", "Partnership", "Campaign"]

export default function ProfessionalCollaborationsPage() {
  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")
  const [saved, setSaved] = useState<number[]>(OPPORTUNITIES.filter(o => o.saved).map(o => o.id))
  const [applyModal, setApplyModal] = useState<typeof OPPORTUNITIES[0] | null>(null)
  const [postModal, setPostModal] = useState(false)

  const visible = OPPORTUNITIES.filter(o => {
    const matchFilter = filter === "All" || o.type === filter
    const matchSearch = !search || o.title.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-4xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-600 font-black uppercase tracking-widest text-[10px]">
            <Handshake className="h-3 w-3" /> Collaborate
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Collaborations</h1>
          <p className="text-sm font-bold text-muted-foreground">Find projects, partnerships, and co-creation opportunities within the Halal network.</p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700 rounded-2xl font-black h-12 text-white px-8" onClick={() => setPostModal(true)}>
          <Plus className="h-4 w-4 mr-2" /> Post Opportunity
        </Button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search collaborations..." className="pl-11 h-12 rounded-2xl bg-card border-none shadow-sm font-bold" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {TYPES.map(t => (
            <button key={t} onClick={() => setFilter(t)}
              className={`px-5 py-2 rounded-2xl text-xs font-black transition-colors ${filter === t ? "bg-violet-600 text-white" : "bg-card text-muted-foreground hover:bg-muted"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunities */}
      <div className="space-y-4">
        {visible.map(opp => (
          <Card key={opp.id} className="rounded-[2rem] border-none shadow-sm bg-card p-7 space-y-4">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11 shrink-0">
                  <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format&q=80`} />
                  <AvatarFallback className="bg-violet-50 text-violet-600 font-black">{opp.postedBy[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-black text-foreground text-base">{opp.title}</p>
                  <p className="text-xs font-bold text-violet-600">{opp.postedBy}</p>
                </div>
              </div>
              <button onClick={() => setSaved(prev => prev.includes(opp.id) ? prev.filter(x => x !== opp.id) : [...prev, opp.id])}>
                <Bookmark className={`h-5 w-5 transition-colors ${saved.includes(opp.id) ? "text-violet-600 fill-violet-600" : "text-muted-foreground"}`} />
              </button>
            </div>

            <p className="text-sm font-medium text-muted-foreground leading-relaxed">{opp.desc}</p>

            <div className="flex flex-wrap gap-1.5">
              {opp.skills.map(s => <Badge key={s} className="bg-violet-50 text-violet-600 border-none font-bold text-[10px]">{s}</Badge>)}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-muted-foreground">
              <Badge className="bg-muted text-foreground border-none font-black text-[10px]">{opp.type}</Badge>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {opp.duration}</span>
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {opp.location}</span>
              <span className="text-emerald-600 font-black">{opp.compensation}</span>
              <span className="ml-auto text-muted-foreground">{opp.posted}</span>
            </div>

            <div className="flex gap-2 pt-1">
              <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-black text-xs h-9"
                onClick={() => setApplyModal(opp)}>
                <Send className="h-3 w-3 mr-1" /> Express Interest
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Apply Modal */}
      <Dialog open={!!applyModal} onOpenChange={open => !open && setApplyModal(null)}>
        <DialogContent className="rounded-[2rem] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">{applyModal?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <p className="text-sm font-bold text-muted-foreground">Send a message to express your interest and share why you'd be a great fit.</p>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Your Message</Label>
              <Textarea placeholder="Hi, I'd love to collaborate on this project because..." className="min-h-[120px] rounded-2xl bg-muted border-none p-4 font-medium" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Portfolio Link (optional)</Label>
              <Input placeholder="https://yourportfolio.com" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black" onClick={() => setApplyModal(null)}>
              <Send className="h-4 w-4 mr-2" /> Send Expression of Interest
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Post Opportunity Modal */}
      <Dialog open={postModal} onOpenChange={setPostModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Post a Collaboration</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Title</Label>
              <Input placeholder="What are you looking for?" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Type</Label>
                <Select>
                  <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    {TYPES.filter(t => t !== "All").map(t => <SelectItem key={t} value={t} className="font-bold">{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Duration</Label>
                <Input placeholder="e.g., 3 months" className="h-12 rounded-2xl bg-muted border-none font-bold" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Description</Label>
              <Textarea placeholder="Describe the opportunity..." className="min-h-[80px] rounded-2xl bg-muted border-none p-4 font-medium" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Compensation</Label>
              <Input placeholder="e.g., Revenue Share, Fixed Fee, Equity" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black" onClick={() => setPostModal(false)}>
              Post Collaboration
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
