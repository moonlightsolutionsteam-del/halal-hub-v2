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
import { MessageSquareQuote, Plus, Star, CheckCircle2, Clock, Send, Filter } from "lucide-react"

const TESTIMONIALS = [
  { id: 1, name: "Fatima Al-Rashid", role: "CEO, Halal Foods Co.", avatar: "test1", rating: 5, service: "Brand Strategy Session", text: "Yusuf's ability to understand our values and translate them into a powerful brand narrative was extraordinary. He didn't just give us a strategy — he gave us a vision we believe in.", date: "March 2024", status: "published" },
  { id: 2, name: "Omar Siddiqui", role: "Founder, Deen Digital", avatar: "test2", rating: 5, service: "Full Brand Identity", text: "Exceptional work. Our brand went from invisible to instantly recognisable in the Muslim community within months. Yusuf understands this space at a level I've never seen from any consultant.", date: "February 2024", status: "published" },
  { id: 3, name: "Dr. Amira Hassan", role: "Director, IslahMedia", avatar: "test3", rating: 5, service: "Monthly Retainer", text: "Yusuf has been our secret weapon. He doesn't just advise — he's embedded in our team and deeply invested in our success. Worth every penny of the retainer.", date: "December 2023", status: "published" },
  { id: 4, name: "Ibrahim Al-Khatib", role: "Academic, SOAS University", avatar: "test4", rating: 5, service: "Speaking / Workshop", text: "His workshop on Islamic marketing frameworks was the most practical and insightful session we've hosted. Students still reference it a year later.", date: "October 2023", status: "published" },
  { id: 5, name: "Nour Hassan", role: "Content Creator", avatar: "test5", rating: 4, service: "Marketing Audit", text: "Very thorough and actionable. Nour's testimonial text is pending your approval.", date: "2 days ago", status: "pending" },
]

export default function ProfessionalTestimonialsPage() {
  const [showModal, setShowModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "pending">("all")

  const published = TESTIMONIALS.filter(t => t.status === "published")
  const pending = TESTIMONIALS.filter(t => t.status === "pending")
  const visible = filterStatus === "all" ? TESTIMONIALS : TESTIMONIALS.filter(t => t.status === filterStatus)

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-4xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-600 font-black uppercase tracking-widest text-[10px]">
            <MessageSquareQuote className="h-3 w-3" /> Social Proof
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Client Testimonials</h1>
          <p className="text-sm font-bold text-muted-foreground">What clients and collaborators say about your work.</p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700 rounded-2xl font-black h-12 text-white px-8" onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4 mr-2" /> Request Testimonial
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: "Total", value: String(TESTIMONIALS.length), color: "text-violet-600" },
          { label: "Published", value: String(published.length), color: "text-emerald-600" },
          { label: "Avg. Rating", value: "4.9 ★", color: "text-amber-500" },
        ].map(s => (
          <Card key={s.label} className="rounded-[2rem] border-none shadow-sm bg-card p-5 text-center">
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(["all", "published", "pending"] as const).map(f => (
          <button key={f} onClick={() => setFilterStatus(f)}
            className={`px-5 py-2 rounded-2xl text-xs font-black capitalize transition-colors ${filterStatus === f ? "bg-violet-600 text-white" : "bg-card text-muted-foreground hover:bg-muted"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Testimonials */}
      <div className="space-y-4">
        {visible.map(t => (
          <Card key={t.id} className={`rounded-[2rem] border-none shadow-sm p-8 space-y-4 ${t.status === "pending" ? "bg-amber-50/50" : "bg-card"}`}>
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 shrink-0">
                  <AvatarImage src={`https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100/100`} />
                  <AvatarFallback className="bg-violet-50 text-violet-600 font-black">{t.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-black text-foreground">{t.name}</p>
                  <p className="text-xs font-bold text-muted-foreground">{t.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-violet-50 text-violet-600 border-none font-black text-[10px]">{t.service}</Badge>
                {t.status === "published"
                  ? <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px]">Published</Badge>
                  : <Badge className="bg-amber-50 text-amber-600 border-none font-black text-[10px] flex items-center gap-1"><Clock className="h-2.5 w-2.5" /> Pending</Badge>
                }
              </div>
            </div>

            <div className="flex">
              {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />)}
              {Array.from({ length: 5 - t.rating }).map((_, i) => <Star key={i} className="h-4 w-4 text-muted-foreground/30" />)}
            </div>

            <p className="text-base font-medium text-foreground leading-relaxed italic">"{t.text}"</p>
            <p className="text-xs font-bold text-muted-foreground">{t.date}</p>

            {t.status === "pending" && (
              <div className="flex gap-2 pt-1">
                <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-black text-xs h-9">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Approve
                </Button>
                <Button size="sm" variant="outline" className="rounded-xl font-bold text-xs h-9 border-2">Decline</Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Request Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="rounded-[2rem] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Request a Testimonial</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Client Name</Label>
              <Input placeholder="e.g., Fatima Al-Rashid" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Client Email</Label>
              <Input type="email" placeholder="client@example.com" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Service They Used</Label>
              <Input placeholder="e.g., Brand Strategy Session" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Personal Message (optional)</Label>
              <Textarea placeholder="Add a personal note to your request..." className="min-h-[80px] rounded-2xl bg-muted border-none p-4 font-medium" />
            </div>
            <Button className="w-full h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black" onClick={() => setShowModal(false)}>
              <Send className="h-4 w-4 mr-2" /> Send Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
