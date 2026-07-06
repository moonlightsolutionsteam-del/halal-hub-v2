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
import { FolderOpen, Plus, Edit2, ExternalLink, Eye, Users, Star } from "lucide-react"

const PROJECTS = [
  {
    id: 1, title: "Halal Hub Rebrand", client: "Halal Hub Global", type: "Brand Strategy", year: "2023",
    desc: "Led full brand strategy overhaul for the UK's largest Halal marketplace — new visual identity, tone of voice, and digital positioning.",
    outcome: "60% increase in brand recognition, 2× app downloads within 3 months",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&auto=format&q=80",
    featured: true, views: 312, collaborators: 3,
  },
  {
    id: 2, title: "IslahMedia Digital Campaign", client: "IslahMedia", type: "Campaign", year: "2022",
    desc: "Multi-platform Ramadan campaign reaching 4.2M Muslims across UK, US, and UAE. Included video, social, and influencer strategy.",
    outcome: "4.2M reach, 18% engagement rate, 400K new followers",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop&auto=format&q=80",
    featured: true, views: 241, collaborators: 5,
  },
  {
    id: 3, title: "Deen Digital Brand Identity", client: "Deen Digital", type: "Branding", year: "2023",
    desc: "Created from scratch — logo, colour palette, typography, brand guidelines, and launch strategy for a Muslim fintech startup.",
    outcome: "Secured Series A funding within 8 months of launch",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&auto=format&q=80",
    featured: false, views: 189, collaborators: 2,
  },
  {
    id: 4, title: "Muslim Consumer Report 2024", client: "Halal Hub Research", type: "Research", year: "2024",
    desc: "Annual industry report on UK Muslim consumer behaviour, spending patterns, and brand loyalty across 12 sectors.",
    outcome: "Downloaded 6,500+ times, cited in BBC, The Guardian, and Financial Times",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&auto=format&q=80",
    featured: false, views: 504, collaborators: 4,
  },
]

const FILTERS = ["All", "Brand Strategy", "Campaign", "Branding", "Research"]

export default function ProfessionalProjectsPage() {
  const [filter, setFilter] = useState("All")
  const [showModal, setShowModal] = useState(false)
  const [editProject, setEditProject] = useState<typeof PROJECTS[0] | null>(null)

  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.type === filter)

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-600 font-black uppercase tracking-widest text-[10px]">
            <FolderOpen className="h-3 w-3" /> Work
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Projects</h1>
          <p className="text-sm font-bold text-muted-foreground">Showcase your best professional work and case studies.</p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700 rounded-2xl font-black h-12 text-white px-8"
          onClick={() => { setEditProject(null); setShowModal(true) }}>
          <Plus className="h-4 w-4 mr-2" /> Add Project
        </Button>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-2xl text-xs font-black transition-colors ${filter === f ? "bg-violet-600 text-white" : "bg-card text-muted-foreground hover:bg-muted"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(project => (
          <Card key={project.id} className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden group">
            <div className="relative h-52 overflow-hidden">
              <img src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              {project.featured && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-violet-600 text-white border-none font-black text-[10px]"><Star className="h-2.5 w-2.5 mr-1 fill-current" /> Featured</Badge>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <Button size="sm" className="bg-white text-foreground hover:bg-white/90 rounded-xl font-black text-xs h-9">
                  <Eye className="h-3 w-3 mr-1" /> View
                </Button>
                <Button size="sm" className="bg-white text-foreground hover:bg-white/90 rounded-xl font-black text-xs h-9"
                  onClick={() => { setEditProject(project); setShowModal(true) }}>
                  <Edit2 className="h-3 w-3 mr-1" /> Edit
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-black text-foreground">{project.title}</p>
                  <p className="text-xs font-bold text-violet-600">{project.client} · {project.year}</p>
                </div>
                <Badge className="bg-violet-50 text-violet-600 border-none font-black text-[10px] shrink-0">{project.type}</Badge>
              </div>
              <p className="text-xs font-medium text-muted-foreground leading-relaxed">{project.desc}</p>
              <div className="pt-1 p-3 bg-emerald-50 rounded-xl">
                <p className="text-[11px] font-black text-emerald-700">📈 {project.outcome}</p>
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-muted-foreground pt-1">
                <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {project.views} views</span>
                <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {project.collaborators} collaborators</span>
                <Button size="sm" variant="ghost" className="rounded-xl h-7 p-0 flex items-center gap-1 text-xs font-bold text-violet-600 hover:text-violet-700">
                  <ExternalLink className="h-3 w-3" /> Link
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">{editProject ? "Edit Project" : "Add Project"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Project Title</Label>
              <Input defaultValue={editProject?.title} placeholder="e.g., Halal Hub Rebrand" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Client</Label>
                <Input defaultValue={editProject?.client} placeholder="Client name" className="h-12 rounded-2xl bg-muted border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Type</Label>
                <Select>
                  <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    {["Brand Strategy", "Campaign", "Branding", "Research", "Event", "Consulting"].map(t => (
                      <SelectItem key={t} value={t} className="font-bold">{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Description</Label>
              <Textarea defaultValue={editProject?.desc} placeholder="What did this project involve?" className="min-h-[80px] rounded-2xl bg-muted border-none p-4 font-medium" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Outcome / Results</Label>
              <Input defaultValue={editProject?.outcome} placeholder="e.g., 60% increase in brand awareness" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black" onClick={() => setShowModal(false)}>
              {editProject ? "Save Changes" : "Publish Project"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
