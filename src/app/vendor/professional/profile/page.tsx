"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Camera, Save, MapPin, Globe, Linkedin, Instagram,
  Twitter, Youtube, Plus, X, Eye, Lock, Users,
  CheckCircle2, Edit2, Languages, Briefcase
} from "lucide-react"

const SKILLS_SAMPLE = ["Brand Strategy", "Marketing", "Business Development", "Leadership", "Public Speaking", "Islamic Finance"]
const LANGS = ["English", "Arabic", "Urdu", "French", "Malay"]
const AVAILABILITY = ["Open to Work", "Open to Freelance", "Open to Collaborate", "Open to Mentor", "Open to Hire"]

export default function ProfessionalProfilePage() {
  const [skills, setSkills] = useState(SKILLS_SAMPLE)
  const [newSkill, setNewSkill] = useState("")
  const [avail, setAvail] = useState(["Open to Collaborate", "Open to Freelance"])

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const toggleAvail = (a: string) => {
    setAvail(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a])
  }

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-4xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-600 font-black uppercase tracking-widest text-[10px]">
            <Briefcase className="h-3 w-3" /> Profile Editor
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Edit Profile</h1>
          <p className="text-sm font-bold text-muted-foreground">Your public professional identity on Halal Hub.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-2xl font-bold border-2 h-11">
            <Eye className="h-4 w-4 mr-2" /> Preview
          </Button>
          <Button className="bg-violet-600 hover:bg-violet-700 rounded-2xl font-black h-11 text-white">
            <Save className="h-4 w-4 mr-2" /> Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="identity" className="space-y-6">
        <TabsList className="bg-muted rounded-2xl p-1 h-auto flex-wrap gap-1">
          {["identity", "experience", "skills", "links"].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="rounded-xl font-bold capitalize data-[state=active]:bg-violet-600 data-[state=active]:text-white px-5 py-2"
            >
              {tab === "links" ? "Links & Visibility" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* IDENTITY TAB */}
        <TabsContent value="identity" className="space-y-6">
          <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
            <div className="relative h-40 bg-gradient-to-r from-violet-600 to-violet-800 group cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                <Button size="sm" className="bg-white text-foreground hover:bg-white/90 rounded-2xl font-black">
                  <Camera className="h-4 w-4 mr-2" /> Change Banner
                </Button>
              </div>
            </div>
            <div className="px-8 pb-6 relative">
              <div className="absolute -top-10 left-8">
                <div className="relative group cursor-pointer">
                  <Avatar className="h-20 w-20 ring-4 ring-card">
                    <AvatarImage src="https://picsum.photos/seed/pro-yusuf/200/200" />
                    <AvatarFallback className="bg-violet-100 text-violet-700 font-black text-2xl">YQ</AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
              <div className="pt-14 space-y-1">
                <p className="font-black text-lg text-foreground">Yusuf Al-Qahtani</p>
                <p className="text-sm font-bold text-muted-foreground">Brand Strategist & Islamic Marketing Consultant</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-violet-50 text-violet-600 border-none font-black text-[10px]">Consultant</Badge>
                  <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px] flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Verified
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-6">
            <h2 className="text-lg font-black">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Full Name</Label>
                <Input defaultValue="Yusuf Al-Qahtani" className="h-12 rounded-2xl bg-muted border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Professional Headline</Label>
                <Input defaultValue="Brand Strategist & Islamic Marketing Consultant" className="h-12 rounded-2xl bg-muted border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Profession Type</Label>
                <Select defaultValue="consultant">
                  <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    {["Consultant", "Freelancer", "Entrepreneur", "Developer", "Designer", "Scholar", "Lawyer", "Accountant", "Financial Advisor", "Educator", "Recruiter", "Investor", "Mentor", "Content Creator", "Public Speaker"].map(p => (
                      <SelectItem key={p} value={p.toLowerCase()}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Industry</Label>
                <Select defaultValue="marketing">
                  <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    {["Marketing", "Technology", "Finance", "Healthcare", "Education", "Real Estate", "Media", "Fashion", "Food & Hospitality", "Legal", "Consulting", "Architecture", "Engineering"].map(i => (
                      <SelectItem key={i} value={i.toLowerCase()}>{i}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input defaultValue="London, United Kingdom" className="pl-10 h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Years of Experience</Label>
                <Select defaultValue="8">
                  <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "10+", "15+", "20+"].map(y => (
                      <SelectItem key={y} value={y}>{y} {parseInt(y) === 1 ? "year" : "years"}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Professional Bio</Label>
                <Textarea
                  defaultValue="Brand strategist and marketing consultant with 8+ years helping Halal businesses grow their presence globally. Specialising in Islamic brand identity, digital marketing, and community-driven campaigns."
                  className="min-h-[120px] rounded-2xl bg-muted border-none p-4 font-medium"
                />
              </div>
            </div>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-4">
            <h2 className="text-lg font-black flex items-center gap-2">
              <Languages className="h-5 w-5 text-violet-600" /> Languages
            </h2>
            <div className="flex flex-wrap gap-2">
              {LANGS.map(l => (
                <Badge key={l} className="bg-violet-50 text-violet-600 border-none font-bold px-4 py-2 text-sm cursor-pointer hover:bg-violet-100">{l}</Badge>
              ))}
              <Badge className="border-2 border-dashed border-muted-foreground/30 text-muted-foreground bg-transparent font-bold px-4 py-2 text-sm cursor-pointer hover:border-violet-300 hover:text-violet-600">
                + Add Language
              </Badge>
            </div>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-4">
            <h2 className="text-lg font-black">Availability & Open Status</h2>
            <div className="flex flex-wrap gap-3">
              {AVAILABILITY.map(a => (
                <button
                  key={a}
                  onClick={() => toggleAvail(a)}
                  className={`px-5 py-2.5 rounded-2xl font-bold text-sm border-2 transition-all ${avail.includes(a) ? "bg-violet-600 text-white border-violet-600" : "bg-muted border-border text-muted-foreground hover:border-violet-300"}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* EXPERIENCE TAB */}
        <TabsContent value="experience" className="space-y-4">
          <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black">Work Experience</h2>
              <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-black h-10 text-sm">
                <Plus className="h-4 w-4 mr-2" /> Add Role
              </Button>
            </div>
            {[
              { role: "Senior Brand Consultant", company: "Halal Hub Global", period: "2021 – Present", desc: "Leading brand strategy for Halal Hub's partner ecosystem across 12 countries." },
              { role: "Marketing Director", company: "IslahMedia", period: "2018 – 2021", desc: "Directed digital campaigns reaching 4M+ Muslim consumers worldwide." },
              { role: "Brand Strategist", company: "The Honest Agency", period: "2016 – 2018", desc: "Developed Halal-first brand identities for 30+ SMEs." },
            ].map((exp, i) => (
              <div key={i} className="flex gap-4 pb-6 border-b border-border last:border-0 last:pb-0">
                <div className="h-12 w-12 bg-violet-50 rounded-2xl flex items-center justify-center shrink-0">
                  <Briefcase className="h-5 w-5 text-violet-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-black text-foreground">{exp.role}</p>
                      <p className="text-sm font-bold text-violet-600">{exp.company}</p>
                      <p className="text-xs font-bold text-muted-foreground">{exp.period}</p>
                    </div>
                    <Button size="sm" variant="ghost" className="rounded-xl h-8 w-8 p-0">
                      <Edit2 className="h-3 w-3 text-muted-foreground" />
                    </Button>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground leading-relaxed">{exp.desc}</p>
                </div>
              </div>
            ))}
          </Card>
        </TabsContent>

        {/* SKILLS TAB */}
        <TabsContent value="skills" className="space-y-4">
          <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-6">
            <h2 className="text-lg font-black">Skills & Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map(s => (
                <div key={s} className="flex items-center gap-1.5 bg-violet-50 text-violet-700 px-4 py-2 rounded-2xl font-bold text-sm group">
                  {s}
                  <button onClick={() => setSkills(prev => prev.filter(x => x !== s))} className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Input
                placeholder="Add a skill (e.g. React, Consulting, Arabic)"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addSkill()}
                className="h-12 rounded-2xl bg-muted border-none font-bold"
              />
              <Button onClick={addSkill} className="bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-black h-12 px-6">Add</Button>
            </div>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black">Education & Certifications</h2>
              <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-black h-10 text-sm">
                <Plus className="h-4 w-4 mr-2" /> Add
              </Button>
            </div>
            {[
              { title: "BA Marketing & Communications", inst: "University of Manchester", year: "2012 – 2016" },
              { title: "Certified Islamic Finance Professional (CIFP)", inst: "INCEIF, Kuala Lumpur", year: "2019" },
              { title: "Google Digital Marketing Certificate", inst: "Google", year: "2020" },
            ].map((edu, i) => (
              <div key={i} className="flex items-center gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="h-10 w-10 bg-violet-50 rounded-xl flex items-center justify-center shrink-0 font-black text-violet-600 text-sm">
                  {edu.year.slice(-2)}
                </div>
                <div className="flex-1">
                  <p className="font-black text-sm text-foreground">{edu.title}</p>
                  <p className="text-xs font-bold text-violet-600">{edu.inst}</p>
                  <p className="text-[10px] font-bold text-muted-foreground">{edu.year}</p>
                </div>
                <Button size="sm" variant="ghost" className="rounded-xl h-8 w-8 p-0">
                  <Edit2 className="h-3 w-3 text-muted-foreground" />
                </Button>
              </div>
            ))}
          </Card>
        </TabsContent>

        {/* LINKS TAB */}
        <TabsContent value="links" className="space-y-4">
          <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-6">
            <h2 className="text-lg font-black">Online Presence</h2>
            <div className="space-y-4">
              {[
                { label: "Website", icon: Globe, placeholder: "https://yoursite.com", defaultValue: "https://yusufqahtani.com" },
                { label: "LinkedIn", icon: Linkedin, placeholder: "https://linkedin.com/in/handle", defaultValue: "" },
                { label: "Instagram", icon: Instagram, placeholder: "@handle", defaultValue: "@yusuf_brands" },
                { label: "Twitter / X", icon: Twitter, placeholder: "@handle", defaultValue: "@YusufQahtani" },
                { label: "YouTube", icon: Youtube, placeholder: "https://youtube.com/@channel", defaultValue: "" },
              ].map(link => (
                <div key={link.label} className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-muted rounded-2xl flex items-center justify-center shrink-0">
                    <link.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">{link.label}</Label>
                    <Input defaultValue={link.defaultValue} placeholder={link.placeholder} className="h-12 rounded-2xl bg-muted border-none font-bold" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-5">
            <h2 className="text-lg font-black">Privacy Settings</h2>
            {[
              { label: "Who can see your email", icon: Lock, options: ["Only Me", "Connections", "Everyone"] },
              { label: "Who can see your phone", icon: Lock, options: ["Only Me", "Connections", "Everyone"] },
              { label: "Who can message you", icon: Users, options: ["Connections Only", "Everyone", "No One"] },
              { label: "Who can connect with you", icon: Users, options: ["Everyone", "Verified Only", "Mutual Connections"] },
            ].map(pref => (
              <div key={pref.label} className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <pref.icon className="h-4 w-4 text-muted-foreground" />
                  <Label className="font-bold text-sm">{pref.label}</Label>
                </div>
                <Select defaultValue={pref.options[1].toLowerCase().replace(/ /g, "-")}>
                  <SelectTrigger className="w-48 h-10 rounded-2xl bg-muted border-none font-bold text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    {pref.options.map(o => (
                      <SelectItem key={o} value={o.toLowerCase().replace(/ /g, "-")} className="font-bold">{o}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
