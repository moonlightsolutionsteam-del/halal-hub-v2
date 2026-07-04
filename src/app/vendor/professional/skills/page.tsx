"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Zap, Plus, X, CheckCircle2, TrendingUp, Star } from "lucide-react"

const SKILL_GROUPS = [
  {
    category: "Marketing & Strategy",
    skills: [
      { name: "Brand Strategy", level: 98, endorsed: 47 },
      { name: "Digital Marketing", level: 92, endorsed: 38 },
      { name: "Content Strategy", level: 88, endorsed: 29 },
      { name: "Campaign Management", level: 85, endorsed: 24 },
    ]
  },
  {
    category: "Halal Expertise",
    skills: [
      { name: "Islamic Finance", level: 80, endorsed: 19 },
      { name: "Muslim Consumer Insights", level: 95, endorsed: 41 },
      { name: "Halal Certification", level: 72, endorsed: 14 },
    ]
  },
  {
    category: "Creative",
    skills: [
      { name: "Copywriting", level: 90, endorsed: 33 },
      { name: "Visual Branding", level: 78, endorsed: 21 },
      { name: "Video Production", level: 65, endorsed: 11 },
    ]
  },
  {
    category: "Tools & Platforms",
    skills: [
      { name: "HubSpot", level: 88, endorsed: 17 },
      { name: "Figma", level: 75, endorsed: 12 },
      { name: "Google Analytics", level: 91, endorsed: 28 },
    ]
  },
]

export default function ProfessionalSkillsPage() {
  const [newSkill, setNewSkill] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [extraSkills, setExtraSkills] = useState<string[]>([])

  function addSkill() {
    const trimmed = newSkill.trim()
    if (trimmed) {
      setExtraSkills(prev => [...prev, trimmed])
      setNewSkill("")
    }
  }

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-4xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-600 font-black uppercase tracking-widest text-[10px]">
            <Zap className="h-3 w-3" /> Expertise
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Skills</h1>
          <p className="text-sm font-bold text-muted-foreground">Your professional competencies and peer endorsements.</p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700 rounded-2xl font-black h-12 text-white px-8" onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add Skill
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: "Total Skills", value: String(SKILL_GROUPS.flatMap(g => g.skills).length + extraSkills.length), icon: Zap },
          { label: "Total Endorsements", value: "314", icon: Star },
          { label: "Top Skill", value: "Brand Strategy", icon: TrendingUp },
        ].map(s => (
          <Card key={s.label} className="rounded-[2rem] border-none shadow-sm bg-card p-5 text-center space-y-1">
            <s.icon className="h-5 w-5 text-violet-600 mx-auto" />
            <p className="text-lg font-black text-foreground">{s.value}</p>
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Extra Skills */}
      {extraSkills.length > 0 && (
        <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 space-y-3">
          <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Recently Added</h2>
          <div className="flex flex-wrap gap-2">
            {extraSkills.map(s => (
              <Badge key={s} className="bg-violet-100 text-violet-700 border-none font-black text-xs px-3 py-1 flex items-center gap-1">
                {s}
                <button onClick={() => setExtraSkills(prev => prev.filter(x => x !== s))}>
                  <X className="h-3 w-3 ml-1" />
                </button>
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Skill Groups */}
      <div className="space-y-6">
        {SKILL_GROUPS.map(group => (
          <Card key={group.category} className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-5">
            <h2 className="text-base font-black text-foreground">{group.category}</h2>
            <div className="space-y-5">
              {group.skills.map(skill => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm text-foreground">{skill.name}</span>
                      {skill.level >= 90 && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground">
                      <span className="flex items-center gap-1 text-violet-600">
                        <Star className="h-3 w-3 fill-current" /> {skill.endorsed} endorsed
                      </span>
                      <span>{skill.level}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-violet-600 rounded-full transition-all" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Add Skill Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="rounded-[2rem] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Add a Skill</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Skill Name</Label>
              <Input
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { addSkill(); setShowModal(false) } }}
                placeholder="e.g., SEO Strategy, Public Speaking..."
                className="h-12 rounded-2xl bg-muted border-none font-bold"
              />
            </div>
            <Button className="w-full h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black" onClick={() => { addSkill(); setShowModal(false) }}>
              <Plus className="h-4 w-4 mr-2" /> Add to Profile
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
