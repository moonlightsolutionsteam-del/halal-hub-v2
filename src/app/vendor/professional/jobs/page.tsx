"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, Search, MapPin, Clock, Bookmark, Send, Building2, SlidersHorizontal } from "lucide-react"

const JOBS = [
  { id: 1, title: "Head of Brand & Marketing", company: "Halal Hub Global", location: "London, UK (Hybrid)", type: "Full-time", salary: "£75,000–£90,000", posted: "1 day ago", match: 96, saved: false, desc: "Lead brand strategy, marketing communications, and digital campaigns for the UK's largest Halal marketplace. Managing a team of 8.", skills: ["Brand Strategy", "Leadership", "Digital Marketing"] },
  { id: 2, title: "Marketing Consultant — Islamic Finance", company: "Amanah Capital", location: "Remote", type: "Contract", salary: "£600–£800/day", posted: "3 days ago", match: 88, saved: true, desc: "Develop and execute a 12-month marketing roadmap for an Islamic finance firm expanding into retail markets.", skills: ["Islamic Finance", "Marketing Strategy", "Content"] },
  { id: 3, title: "Brand Director", company: "Modest Fashion UK", location: "Manchester, UK", type: "Full-time", salary: "£65,000–£80,000", posted: "5 days ago", match: 82, saved: false, desc: "Own brand identity and strategy for a fast-growing Muslim fashion brand. Reporting directly to the founder.", skills: ["Branding", "Fashion", "Leadership"] },
  { id: 4, title: "Senior Content Strategist", company: "IslahMedia", location: "Remote", type: "Part-time", salary: "£45,000 pro rata", posted: "1 week ago", match: 79, saved: false, desc: "Develop editorial strategy, commission content, and oversee brand voice across all IslahMedia channels.", skills: ["Content Strategy", "Editorial", "Brand Voice"] },
  { id: 5, title: "Growth Marketing Manager", company: "Barakah Investments", location: "London, UK", type: "Full-time", salary: "£55,000–£70,000", posted: "2 weeks ago", match: 74, saved: true, desc: "Own growth marketing strategy across B2B and B2C for a Muslim-focused investment platform.", skills: ["Growth Marketing", "B2B", "Analytics"] },
]

const TYPES = ["All", "Full-time", "Contract", "Part-time"]

export default function ProfessionalJobsPage() {
  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")
  const [saved, setSaved] = useState<number[]>(JOBS.filter(j => j.saved).map(j => j.id))
  const [applyModal, setApplyModal] = useState<typeof JOBS[0] | null>(null)
  const [showFilter, setShowFilter] = useState(false)
  const [tab, setTab] = useState<"browse" | "applied" | "saved">("browse")

  const visible = JOBS.filter(j => {
    const matchFilter = filter === "All" || j.type === filter
    const matchSearch = !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase())
    const matchTab = tab === "saved" ? saved.includes(j.id) : true
    return matchFilter && matchSearch && matchTab
  })

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-4xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-600 font-black uppercase tracking-widest text-[10px]">
            <Briefcase className="h-3 w-3" /> Opportunities
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Job Board</h1>
          <p className="text-sm font-bold text-muted-foreground">Roles matched to your professional profile and skills.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["browse", "applied", "saved"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-2xl text-xs font-black capitalize transition-colors ${tab === t ? "bg-violet-600 text-white" : "bg-card text-muted-foreground hover:bg-muted"}`}>
            {t === "saved" ? `Saved (${saved.length})` : t === "applied" ? "Applied (2)" : "Browse"}
          </button>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search jobs..." className="pl-11 h-12 rounded-2xl bg-card border-none shadow-sm font-bold" />
        </div>
        <Button variant="outline" className="h-12 px-5 rounded-2xl border-2 font-black" onClick={() => setShowFilter(true)}>
          <SlidersHorizontal className="h-4 w-4 mr-2" /> Filter
        </Button>
      </div>

      {/* Type pills */}
      <div className="flex gap-2 flex-wrap">
        {TYPES.map(t => (
          <button key={t} onClick={() => setFilter(t)}
            className={`px-5 py-2 rounded-2xl text-xs font-black transition-colors ${filter === t ? "bg-violet-600 text-white" : "bg-card text-muted-foreground hover:bg-muted"}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Job List */}
      <div className="space-y-4">
        {visible.length === 0 && (
          <div className="text-center py-12 text-muted-foreground font-bold">No jobs found matching your filters.</div>
        )}
        {visible.map(job => (
          <Card key={job.id} className="rounded-[2rem] border-none shadow-sm bg-card p-7 space-y-4">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-violet-50 rounded-2xl flex items-center justify-center shrink-0">
                  <Building2 className="h-5 w-5 text-violet-600" />
                </div>
                <div>
                  <p className="font-black text-foreground text-base">{job.title}</p>
                  <p className="text-xs font-bold text-violet-600">{job.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-center">
                  <p className="text-sm font-black text-emerald-600">{job.match}%</p>
                  <p className="text-[9px] font-black text-muted-foreground uppercase">Match</p>
                </div>
                <button onClick={() => setSaved(prev => prev.includes(job.id) ? prev.filter(x => x !== job.id) : [...prev, job.id])}>
                  <Bookmark className={`h-5 w-5 transition-colors ${saved.includes(job.id) ? "text-violet-600 fill-violet-600" : "text-muted-foreground"}`} />
                </button>
              </div>
            </div>

            <p className="text-sm font-medium text-muted-foreground leading-relaxed">{job.desc}</p>

            <div className="flex flex-wrap gap-1.5">
              {job.skills.map(s => <Badge key={s} className="bg-violet-50 text-violet-600 border-none font-bold text-[10px]">{s}</Badge>)}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-muted-foreground">
              <Badge className="bg-muted text-foreground border-none font-black text-[10px]">{job.type}</Badge>
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.location}</span>
              <span className="text-emerald-600 font-black">{job.salary}</span>
              <span className="flex items-center gap-1 ml-auto"><Clock className="h-3 w-3" /> {job.posted}</span>
            </div>

            <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-black text-xs h-9"
              onClick={() => setApplyModal(job)}>
              <Send className="h-3 w-3 mr-1" /> Quick Apply
            </Button>
          </Card>
        ))}
      </div>

      {/* Apply Modal */}
      <Dialog open={!!applyModal} onOpenChange={open => !open && setApplyModal(null)}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Apply — {applyModal?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="p-4 bg-violet-50 rounded-2xl space-y-1">
              <p className="font-black text-sm text-foreground">{applyModal?.company}</p>
              <p className="text-xs font-bold text-muted-foreground">{applyModal?.location} · {applyModal?.salary}</p>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Cover Note</Label>
              <Textarea placeholder="Briefly explain why you're a great fit..." className="min-h-[120px] rounded-2xl bg-muted border-none p-4 font-medium" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">CV / Portfolio Link</Label>
              <Input placeholder="https://yourportfolio.com or LinkedIn URL" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black" onClick={() => setApplyModal(null)}>
              <Send className="h-4 w-4 mr-2" /> Submit Application
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Filter Modal */}
      <Dialog open={showFilter} onOpenChange={setShowFilter}>
        <DialogContent className="rounded-[2rem] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Filter Jobs</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Location</Label>
              <Input placeholder="e.g., London, Remote" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Minimum Match %</Label>
              <Select>
                <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold"><SelectValue placeholder="Any match" /></SelectTrigger>
                <SelectContent className="rounded-2xl">
                  {["70%", "80%", "85%", "90%", "95%"].map(m => <SelectItem key={m} value={m} className="font-bold">{m}+</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Salary Range</Label>
              <Input placeholder="e.g., £50,000+" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black" onClick={() => setShowFilter(false)}>
              Apply Filters
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
