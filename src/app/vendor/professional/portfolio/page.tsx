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
import { Plus, Upload, Image as ImageIcon, Video, FileText, ExternalLink, Edit2, Trash2, FolderOpen } from "lucide-react"
import Image from "next/image"

const WORKS = [
  { id: 1, title: "Halal Hub Brand Refresh", type: "Case Study", client: "Halal Hub Global", year: "2024", tags: ["Branding", "Strategy"], img: "portfolio-1", desc: "Complete visual identity overhaul for the Halal Hub ecosystem, reaching 2M+ users." },
  { id: 2, title: "Muslim Pro Campaign", type: "Marketing", client: "Muslim Pro", year: "2023", tags: ["Digital", "Social"], img: "portfolio-2", desc: "Ramadan campaign that drove 40% increase in premium subscriptions." },
  { id: 3, title: "Halal Expo Dubai", type: "Event", client: "DIEC", year: "2023", tags: ["Events", "Branding"], img: "portfolio-3", desc: "Lead creative director for the largest Halal trade expo in the GCC." },
  { id: 4, title: "IslahMedia Brand Identity", type: "Design", client: "IslahMedia", year: "2022", tags: ["Identity", "Design"], img: "portfolio-4", desc: "Built brand guidelines, tone of voice, and visual system from scratch." },
  { id: 5, title: "Amanah Finance Rebrand", type: "Case Study", client: "Amanah Finance", year: "2022", tags: ["Finance", "Branding"], img: "portfolio-5", desc: "Repositioned an Islamic bank for the digital-first generation." },
  { id: 6, title: "Modest Fashion Week", type: "Campaign", client: "MFW London", year: "2021", tags: ["Fashion", "Events"], img: "portfolio-6", desc: "Social-first campaign generating 8M impressions across 3 continents." },
]

export default function ProfessionalPortfolioPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [filter, setFilter] = useState("All")

  const types = ["All", "Case Study", "Marketing", "Design", "Event", "Campaign"]
  const filtered = filter === "All" ? WORKS : WORKS.filter(w => w.type === filter)

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-600 font-black uppercase tracking-widest text-[10px]">
            <FolderOpen className="h-3 w-3" /> Portfolio
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">My Work</h1>
          <p className="text-sm font-bold text-muted-foreground">Showcase your best projects, campaigns, and case studies.</p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700 rounded-2xl font-black h-12 text-white px-8" onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add Work
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Portfolio Items", value: "6" },
          { label: "Total Views", value: "4,821" },
          { label: "Saves", value: "147" },
          { label: "Enquiries", value: "23" },
        ].map(s => (
          <Card key={s.label} className="rounded-[2rem] border-none shadow-sm bg-card p-5 text-center">
            <p className="text-2xl font-black text-violet-600">{s.value}</p>
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {types.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-5 py-2.5 rounded-2xl font-bold text-sm border-2 transition-all ${filter === t ? "bg-violet-600 text-white border-violet-600" : "bg-muted border-border text-muted-foreground hover:border-violet-300"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(work => (
          <Card key={work.id} className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden group">
            <div className="relative aspect-video bg-muted overflow-hidden">
              <Image
                src={`https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600/340`}
                alt={work.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <Button size="sm" className="bg-white text-foreground hover:bg-white/90 rounded-xl font-black text-xs">
                  <ExternalLink className="h-3 w-3 mr-1" /> View
                </Button>
                <Button size="sm" variant="ghost" className="bg-white/20 text-white hover:bg-white/30 rounded-xl">
                  <Edit2 className="h-3 w-3" />
                </Button>
              </div>
              <Badge className="absolute top-3 left-3 bg-black/60 text-white border-none font-black text-[9px] backdrop-blur-sm">{work.type}</Badge>
            </div>
            <div className="p-5 space-y-2">
              <p className="font-black text-foreground">{work.title}</p>
              <p className="text-[11px] font-bold text-violet-600">{work.client} · {work.year}</p>
              <p className="text-xs font-medium text-muted-foreground leading-relaxed">{work.desc}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {work.tags.map(t => (
                  <Badge key={t} className="bg-violet-50 text-violet-600 border-none font-bold text-[9px]">{t}</Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}

        {/* Add Card */}
        <button
          onClick={() => setShowAddModal(true)}
          className="rounded-[2rem] border-4 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center p-12 text-center gap-3 hover:bg-card hover:border-violet-200 transition-all cursor-pointer group min-h-[280px]"
        >
          <div className="h-14 w-14 bg-card rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <Plus className="h-7 w-7 text-violet-600" />
          </div>
          <p className="font-black text-foreground">Add New Work</p>
          <p className="text-xs font-medium text-muted-foreground">Images, videos, case studies, or links</p>
        </button>
      </div>

      {/* Add Work Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-violet-600" /> Add Portfolio Work
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-violet-300 cursor-pointer transition-colors">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="font-bold text-sm">Upload Media</p>
              <p className="text-xs text-muted-foreground mt-1">Images, videos, PDFs — up to 50MB</p>
              <div className="flex justify-center gap-3 mt-3">
                {[ImageIcon, Video, FileText].map((Icon, i) => (
                  <div key={i} className="h-8 w-8 bg-muted rounded-xl flex items-center justify-center">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Project Title</Label>
              <Input placeholder="e.g., Ramadan Brand Campaign" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Type</Label>
                <Select>
                  <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    {["Case Study", "Campaign", "Design", "Development", "Writing", "Video", "Photography", "Other"].map(t => (
                      <SelectItem key={t} value={t.toLowerCase()}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Client</Label>
                <Input placeholder="Client name" className="h-12 rounded-2xl bg-muted border-none font-bold" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Description</Label>
              <Textarea placeholder="What was the challenge, approach, and outcome?" className="min-h-[80px] rounded-2xl bg-muted border-none p-4 font-medium" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Project Link (optional)</Label>
              <Input placeholder="https://..." className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black" onClick={() => setShowAddModal(false)}>
              Publish Work
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
