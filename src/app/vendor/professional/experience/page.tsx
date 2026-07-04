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
import { Briefcase, Plus, Edit2, GraduationCap } from "lucide-react"

const ROLES = [
  { id: 1, type: "work", role: "Senior Brand Consultant", company: "Halal Hub Global", period: "Jan 2021 – Present", location: "London, UK (Remote)", desc: "Leading brand strategy for Halal Hub's partner ecosystem across 12 countries. Overseeing identity, tone of voice, and go-to-market frameworks for 50+ vendor partners.", skills: ["Brand Strategy", "Leadership", "Marketing"] },
  { id: 2, type: "work", role: "Marketing Director", company: "IslahMedia", period: "Mar 2018 – Dec 2020", location: "London, UK", desc: "Directed all digital campaigns, growing organic reach by 400%. Led a team of 12 creatives and analysts. Oversaw £3.2M annual marketing budget.", skills: ["Digital Marketing", "Team Management", "Campaign Strategy"] },
  { id: 3, type: "work", role: "Brand Strategist", company: "The Honest Agency", period: "Jul 2016 – Feb 2018", location: "Birmingham, UK", desc: "Developed Halal-first brand identities for 30+ SMEs across food, fashion, and finance sectors.", skills: ["Branding", "Identity Design", "Consulting"] },
  { id: 4, type: "volunteer", role: "Board Advisor", company: "Muslim Charity Network", period: "2019 – Present", location: "London, UK", desc: "Providing strategic communications and brand advisory support on a voluntary basis.", skills: ["Advisory", "Communications"] },
]

export default function ProfessionalExperiencePage() {
  const [showModal, setShowModal] = useState(false)
  const [editRole, setEditRole] = useState<typeof ROLES[0] | null>(null)

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-3xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-600 font-black uppercase tracking-widest text-[10px]">
            <Briefcase className="h-3 w-3" /> Career
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Experience</h1>
          <p className="text-sm font-bold text-muted-foreground">Your professional timeline — roles, responsibilities, and achievements.</p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700 rounded-2xl font-black h-12 text-white px-8" onClick={() => { setEditRole(null); setShowModal(true) }}>
          <Plus className="h-4 w-4 mr-2" /> Add Role
        </Button>
      </div>

      {/* Timeline */}
      <div className="relative space-y-0">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
        {ROLES.map((role, i) => (
          <div key={role.id} className="relative pl-16 pb-8 last:pb-0">
            <div className={`absolute left-3 top-1 h-6 w-6 rounded-full flex items-center justify-center ${role.type === "volunteer" ? "bg-emerald-50 border-2 border-emerald-200" : "bg-violet-600"}`}>
              {role.type === "volunteer"
                ? <GraduationCap className="h-3 w-3 text-emerald-600" />
                : <Briefcase className="h-3 w-3 text-white" />
              }
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-7 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-black text-foreground text-lg">{role.role}</p>
                    {role.type === "volunteer" && <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[9px]">Volunteer</Badge>}
                  </div>
                  <p className="font-bold text-violet-600">{role.company}</p>
                  <p className="text-xs font-bold text-muted-foreground">{role.period} · {role.location}</p>
                </div>
                <Button size="sm" variant="ghost" className="rounded-xl h-8 w-8 p-0" onClick={() => { setEditRole(role); setShowModal(true) }}>
                  <Edit2 className="h-3 w-3 text-muted-foreground" />
                </Button>
              </div>
              <p className="text-sm font-medium text-muted-foreground leading-relaxed">{role.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {role.skills.map(s => <Badge key={s} className="bg-violet-50 text-violet-600 border-none font-bold text-[10px]">{s}</Badge>)}
              </div>
            </Card>
          </div>
        ))}
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">{editRole ? "Edit Role" : "Add Experience"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Role / Title</Label>
              <Input defaultValue={editRole?.role} placeholder="e.g., Marketing Director" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Company</Label>
                <Input defaultValue={editRole?.company} placeholder="Company name" className="h-12 rounded-2xl bg-muted border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Type</Label>
                <Select defaultValue="work">
                  <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold"><SelectValue /></SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    {["Work", "Volunteer", "Internship", "Freelance", "Research", "Leadership"].map(t => (
                      <SelectItem key={t} value={t.toLowerCase()} className="font-bold">{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Start Date</Label>
                <Input type="month" className="h-12 rounded-2xl bg-muted border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">End Date</Label>
                <Input type="month" placeholder="Leave blank if current" className="h-12 rounded-2xl bg-muted border-none font-bold" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Description</Label>
              <Textarea defaultValue={editRole?.desc} placeholder="Key responsibilities and achievements..." className="min-h-[100px] rounded-2xl bg-muted border-none p-4 font-medium" />
            </div>
            <Button className="w-full h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black" onClick={() => setShowModal(false)}>
              {editRole ? "Save Changes" : "Add to Timeline"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
