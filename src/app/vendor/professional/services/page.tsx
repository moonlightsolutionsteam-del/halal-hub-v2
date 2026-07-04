"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Briefcase, Plus, Edit2, Star, Clock, CheckCircle2, CalendarCheck } from "lucide-react"

const SERVICES = [
  { id: 1, title: "Brand Strategy Session", type: "Consultation", duration: "90 mins", price: "£350", bookings: 48, rating: 4.9, active: true, desc: "One-to-one deep-dive into your brand identity, positioning, and growth strategy." },
  { id: 2, title: "Full Brand Identity Package", type: "Project", duration: "4–6 weeks", price: "£4,500", bookings: 12, rating: 5.0, active: true, desc: "Complete brand refresh including logo, colour palette, tone of voice, and brand guidelines." },
  { id: 3, title: "Marketing Audit & Roadmap", type: "Report", duration: "1 week", price: "£1,200", bookings: 31, rating: 4.8, active: true, desc: "Comprehensive analysis of your current marketing with a 12-month action plan." },
  { id: 4, title: "Monthly Retainer", type: "Ongoing", duration: "Monthly", price: "£2,500/mo", bookings: 7, rating: 4.9, active: true, desc: "Dedicated monthly strategy and advisory support for growing Halal businesses." },
  { id: 5, title: "Speaking / Workshop", type: "Event", duration: "Half day", price: "From £800", bookings: 19, rating: 5.0, active: false, desc: "Keynote or workshop on Halal branding, Muslim consumer trends, or Islamic marketing." },
]

export default function ProfessionalServicesPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selected, setSelected] = useState<typeof SERVICES[0] | null>(null)

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-4xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-600 font-black uppercase tracking-widest text-[10px]">
            <Briefcase className="h-3 w-3" /> Services
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">My Services</h1>
          <p className="text-sm font-bold text-muted-foreground">Define what you offer and how businesses can work with you.</p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700 rounded-2xl font-black h-12 text-white px-8" onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add Service
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: "Active Services", value: "4" },
          { label: "Total Bookings", value: "117" },
          { label: "Avg. Rating", value: "4.9 ★" },
        ].map(s => (
          <Card key={s.label} className="rounded-[2rem] border-none shadow-sm bg-card p-5 text-center">
            <p className="text-2xl font-black text-violet-600">{s.value}</p>
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        {SERVICES.map(svc => (
          <Card key={svc.id} className={`rounded-[2rem] border-none shadow-sm bg-card p-7 ${!svc.active ? "opacity-60" : ""}`}>
            <div className="flex flex-col md:flex-row gap-5">
              <div className="h-14 w-14 bg-violet-50 rounded-2xl flex items-center justify-center shrink-0">
                <Briefcase className="h-6 w-6 text-violet-600" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-black text-foreground text-lg">{svc.title}</p>
                      {!svc.active && <Badge className="bg-muted text-muted-foreground border-none font-black text-[9px]">Inactive</Badge>}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <Badge className="bg-violet-50 text-violet-600 border-none font-black text-[10px]">{svc.type}</Badge>
                      <span className="flex items-center gap-1 text-xs font-bold text-muted-foreground"><Clock className="h-3 w-3"/>{svc.duration}</span>
                      <span className="flex items-center gap-1 text-xs font-bold text-amber-600"><Star className="h-3 w-3 fill-current"/>{svc.rating}</span>
                      <span className="flex items-center gap-1 text-xs font-bold text-muted-foreground"><CalendarCheck className="h-3 w-3"/>{svc.bookings} bookings</span>
                    </div>
                  </div>
                  <p className="text-2xl font-black text-violet-600">{svc.price}</p>
                </div>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">{svc.desc}</p>
                <div className="flex gap-2 pt-1">
                  <Button size="sm" variant="outline" className="rounded-xl font-bold text-xs h-9 border-2 border-violet-200 text-violet-600 hover:bg-violet-50"
                    onClick={() => { setSelected(svc); setShowEditModal(true) }}>
                    <Edit2 className="h-3 w-3 mr-1" /> Edit
                  </Button>
                  <Button size="sm" variant="outline" className={`rounded-xl font-bold text-xs h-9 border-2 ${svc.active ? "border-rose-200 text-rose-600 hover:bg-rose-50" : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"}`}>
                    {svc.active ? "Pause" : "Activate"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Add New Service</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Service Title</Label>
              <Input placeholder="e.g., Brand Strategy Session" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Type</Label>
                <Select>
                  <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    {["Consultation", "Project", "Report", "Ongoing", "Event", "Course"].map(t => (
                      <SelectItem key={t} value={t.toLowerCase()} className="font-bold">{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Price</Label>
                <Input placeholder="e.g., £350" className="h-12 rounded-2xl bg-muted border-none font-bold" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Duration</Label>
              <Input placeholder="e.g., 60 mins, 2 weeks, Monthly" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Description</Label>
              <Textarea placeholder="What does this service include?" className="min-h-[100px] rounded-2xl bg-muted border-none p-4 font-medium" />
            </div>
            <Button className="w-full h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black" onClick={() => setShowAddModal(false)}>
              <CheckCircle2 className="h-4 w-4 mr-2" /> Publish Service
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Edit — {selected?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Title</Label>
              <Input defaultValue={selected?.title} className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Price</Label>
                <Input defaultValue={selected?.price} className="h-12 rounded-2xl bg-muted border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Duration</Label>
                <Input defaultValue={selected?.duration} className="h-12 rounded-2xl bg-muted border-none font-bold" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Description</Label>
              <Textarea defaultValue={selected?.desc} className="min-h-[100px] rounded-2xl bg-muted border-none p-4 font-medium" />
            </div>
            <Button className="w-full h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black" onClick={() => setShowEditModal(false)}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
