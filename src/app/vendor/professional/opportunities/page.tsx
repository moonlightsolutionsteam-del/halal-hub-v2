"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Search, MapPin, Briefcase, Clock, Star, Filter, Bookmark, Send, Lightbulb, CheckCircle2 } from "lucide-react"

const OPPORTUNITIES = [
  { id: 1, title: "Brand Strategy Lead", company: "Saffron Creative", type: "Freelance", location: "Remote", budget: "£3,000/project", match: 96, tags: ["Branding", "Strategy"], posted: "2h ago", desc: "We're seeking an experienced brand strategist to lead our rebrand project for a Halal food startup." },
  { id: 2, title: "Islamic Finance Advisor", company: "AmanaBank Dubai", type: "Full-time", location: "Dubai, UAE", budget: "AED 25K/mo", match: 91, tags: ["Finance", "Shariah"], posted: "1d ago", desc: "Join our growing team of Shariah-compliant finance professionals." },
  { id: 3, title: "Marketing Consultant", company: "Muslim Pro", type: "Contract", location: "Remote", budget: "£80/hr", match: 88, tags: ["Marketing", "Digital"], posted: "2d ago", desc: "3-month contract to refresh our B2B marketing approach." },
  { id: 4, title: "Senior UX Designer", company: "Halal Hub Global", type: "Full-time", location: "London, UK", budget: "£65K–£80K", match: 84, tags: ["Design", "UX"], posted: "3d ago", desc: "Help shape the product experience for 5M+ Halal Hub users." },
  { id: 5, title: "Content Strategist", company: "IslahMedia", type: "Part-time", location: "Remote", budget: "£2,500/mo", match: 80, tags: ["Content", "Writing"], posted: "4d ago", desc: "Build our editorial calendar and content strategy for 2025." },
  { id: 6, title: "Halal Certification Consultant", company: "IFANCA", type: "Freelance", location: "Remote / US", budget: "$150/hr", match: 76, tags: ["Halal", "Consulting"], posted: "5d ago", desc: "Advise food companies on Halal certification pathways." },
]

export default function ProfessionalOpportunitiesPage() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("All")
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [selectedOpp, setSelectedOpp] = useState<typeof OPPORTUNITIES[0] | null>(null)
  const [saved, setSaved] = useState<number[]>([])

  const types = ["All", "Full-time", "Part-time", "Freelance", "Contract"]
  const filtered = OPPORTUNITIES.filter(o =>
    (typeFilter === "All" || o.type === typeFilter) &&
    (o.title.toLowerCase().includes(search.toLowerCase()) || o.company.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-600 font-black uppercase tracking-widest text-[10px]">
            <Lightbulb className="h-3 w-3" /> Opportunities
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Discover Opportunities</h1>
          <p className="text-sm font-bold text-muted-foreground">Jobs, projects, and collaborations matched to your profile.</p>
        </div>
        <Button variant="outline" className="rounded-2xl font-bold h-12 border-2 border-violet-200 text-violet-600 hover:bg-violet-50" onClick={() => setShowFilterModal(true)}>
          <Filter className="h-4 w-4 mr-2" /> Filters
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: "Matched for You", value: "18", color: "text-violet-600" },
          { label: "Applied", value: "4", color: "text-emerald-600" },
          { label: "Saved", value: String(saved.length), color: "text-amber-600" },
        ].map(s => (
          <Card key={s.label} className="rounded-[2rem] border-none shadow-sm bg-card p-5 text-center">
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search opportunities..." value={search} onChange={e => setSearch(e.target.value)} className="pl-12 h-12 rounded-2xl bg-card border-none shadow-sm font-bold" />
        </div>
        <Select onValueChange={v => setTypeFilter(v)}>
          <SelectTrigger className="w-40 h-12 rounded-2xl bg-card border-none shadow-sm font-bold">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl">
            {types.map(t => <SelectItem key={t} value={t} className="font-bold">{t}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {filtered.map(opp => (
          <Card key={opp.id} className="rounded-[2rem] border-none shadow-sm bg-card p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="h-14 w-14 bg-violet-50 rounded-2xl flex items-center justify-center shrink-0">
                <Briefcase className="h-6 w-6 text-violet-600" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <p className="font-black text-foreground text-lg">{opp.title}</p>
                    <p className="text-sm font-bold text-violet-600">{opp.company}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-xl font-black text-violet-600">{opp.match}%</p>
                      <p className="text-[9px] font-black text-muted-foreground uppercase">Match</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">{opp.desc}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="bg-violet-50 text-violet-600 border-none font-black text-[10px]">{opp.type}</Badge>
                  <span className="flex items-center gap-1 text-xs font-bold text-muted-foreground"><MapPin className="h-3 w-3"/>{opp.location}</span>
                  <span className="text-xs font-black text-emerald-600">{opp.budget}</span>
                  <span className="flex items-center gap-1 text-xs font-bold text-muted-foreground"><Clock className="h-3 w-3"/>{opp.posted}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {opp.tags.map(t => <Badge key={t} className="bg-muted text-muted-foreground border-none font-bold text-[9px]">{t}</Badge>)}
                </div>
              </div>
              <div className="flex md:flex-col gap-2 shrink-0">
                <Button
                  className="bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-black h-10 text-sm flex-1 md:flex-none"
                  onClick={() => { setSelectedOpp(opp); setShowApplyModal(true) }}
                >
                  <Send className="h-4 w-4 mr-2" /> Apply
                </Button>
                <Button
                  variant="outline"
                  className={`rounded-2xl font-black h-10 text-sm border-2 flex-1 md:flex-none ${saved.includes(opp.id) ? "border-violet-600 text-violet-600 bg-violet-50" : "border-border"}`}
                  onClick={() => setSaved(prev => prev.includes(opp.id) ? prev.filter(x => x !== opp.id) : [...prev, opp.id])}
                >
                  <Bookmark className={`h-4 w-4 ${saved.includes(opp.id) ? "fill-current" : ""}`} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Apply Modal */}
      <Dialog open={showApplyModal} onOpenChange={setShowApplyModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Apply — {selectedOpp?.title}</DialogTitle>
            <DialogDescription className="font-bold text-muted-foreground">{selectedOpp?.company} · {selectedOpp?.location}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Cover Message</Label>
              <Textarea placeholder="Introduce yourself and explain why you're a great fit..." className="min-h-[120px] rounded-2xl bg-muted border-none p-4 font-medium" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Portfolio Link (optional)</Label>
              <Input placeholder="https://..." className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 h-12 rounded-2xl font-bold border-2" onClick={() => setShowApplyModal(false)}>Cancel</Button>
              <Button className="flex-1 h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black" onClick={() => setShowApplyModal(false)}>
                <Send className="h-4 w-4 mr-2" /> Submit Application
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Filter Modal */}
      <Dialog open={showFilterModal} onOpenChange={setShowFilterModal}>
        <DialogContent className="rounded-[2rem] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Filter Opportunities</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            {[
              { label: "Location", placeholder: "e.g. Remote, London, Dubai" },
              { label: "Min Match %", placeholder: "e.g. 80" },
            ].map(f => (
              <div key={f.label} className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">{f.label}</Label>
                <Input placeholder={f.placeholder} className="h-12 rounded-2xl bg-muted border-none font-bold" />
              </div>
            ))}
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Skills Match</Label>
              <div className="flex flex-wrap gap-2">
                {["Branding", "Marketing", "Finance", "Tech", "Design", "Writing"].map(s => (
                  <Badge key={s} className="bg-muted text-muted-foreground border-none font-bold px-4 py-2 cursor-pointer hover:bg-violet-50 hover:text-violet-600 transition-colors">{s}</Badge>
                ))}
              </div>
            </div>
            <Button className="w-full h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black" onClick={() => setShowFilterModal(false)}>
              Apply Filters
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
