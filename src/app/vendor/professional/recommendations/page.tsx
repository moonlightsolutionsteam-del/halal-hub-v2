"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, Plus, Quote, CheckCircle2, Clock, Send } from "lucide-react"

const RECOMMENDATIONS = [
  {
    id: 1, from: "Fatima Al-Rashid", role: "Marketing Director · Halal Foods Co.", avatar: "rec1",
    text: "Yusuf completely transformed how we think about our brand. His strategic thinking and deep understanding of the Muslim consumer is unmatched. Our brand recognition increased by 60% within 6 months of working with him.",
    date: "March 2024", status: "published"
  },
  {
    id: 2, from: "Omar Siddiqui", role: "CEO · Deen Digital", avatar: "rec2",
    text: "Working with Yusuf was a game changer. He brought clarity to our messaging and helped us reach an audience we never could before. I'd recommend him without hesitation to any Halal business looking to grow.",
    date: "January 2024", status: "published"
  },
  {
    id: 3, from: "Dr. Ibrahim Al-Khatib", role: "Academic · SOAS University", avatar: "rec3",
    text: "Yusuf's understanding of Islamic branding principles is exceptional. He bridges the gap between authentic values and modern marketing effectively.",
    date: "November 2023", status: "published"
  },
  {
    id: 4, from: "Nour Hassan", role: "Content Creator · Independent", avatar: "rec4",
    text: "Awaiting your approval before publishing.", date: "2 days ago", status: "pending"
  },
]

export default function ProfessionalRecommendationsPage() {
  const [showRequestModal, setShowRequestModal] = useState(false)

  const published = RECOMMENDATIONS.filter(r => r.status === "published")
  const pending = RECOMMENDATIONS.filter(r => r.status === "pending")

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-4xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-600 font-black uppercase tracking-widest text-[10px]">
            <Star className="h-3 w-3" /> Recommendations
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Recommendations</h1>
          <p className="text-sm font-bold text-muted-foreground">Trusted testimonials from clients, colleagues, and peers.</p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700 rounded-2xl font-black h-12 text-white px-8" onClick={() => setShowRequestModal(true)}>
          <Plus className="h-4 w-4 mr-2" /> Request One
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: "Total", value: "29", color: "text-violet-600" },
          { label: "Published", value: String(published.length), color: "text-emerald-600" },
          { label: "Pending", value: String(pending.length), color: "text-amber-600" },
        ].map(s => (
          <Card key={s.label} className="rounded-[2rem] border-none shadow-sm bg-card p-5 text-center">
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Pending */}
      {pending.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-black flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-500" /> Awaiting Approval
          </h2>
          {pending.map(r => (
            <Card key={r.id} className="rounded-[2rem] border-none shadow-sm bg-amber-50/50 p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-11 w-11 shrink-0">
                  <AvatarImage src={`https://picsum.photos/seed/${r.avatar}/100/100`} />
                  <AvatarFallback className="bg-amber-100 text-amber-600 font-black">{r.from.split(" ").map(n=>n[0]).join("").slice(0,2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-black text-foreground">{r.from}</p>
                  <p className="text-xs font-bold text-muted-foreground">{r.role} · {r.date}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-black text-xs h-9">
                    <CheckCircle2 className="h-3 w-3 mr-1" /> Approve
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-xl font-bold text-xs h-9 border-2">Decline</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Published */}
      <div className="space-y-4">
        <h2 className="text-lg font-black flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Published
        </h2>
        {published.map(r => (
          <Card key={r.id} className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-4">
            <Quote className="h-8 w-8 text-violet-200" />
            <p className="text-base font-medium text-foreground leading-relaxed italic">"{r.text}"</p>
            <div className="flex items-center gap-3 pt-2">
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarImage src={`https://picsum.photos/seed/${r.avatar}/100/100`} />
                <AvatarFallback className="bg-violet-50 text-violet-600 font-black">{r.from.split(" ").map(n=>n[0]).join("").slice(0,2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-black text-sm text-foreground">{r.from}</p>
                <p className="text-[11px] font-bold text-muted-foreground">{r.role} · {r.date}</p>
              </div>
              <div className="ml-auto flex">
                {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 text-amber-400 fill-current" />)}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Request Modal */}
      <Dialog open={showRequestModal} onOpenChange={setShowRequestModal}>
        <DialogContent className="rounded-[2rem] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Request a Recommendation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Their Name</Label>
              <Input placeholder="e.g., Fatima Al-Rashid" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Their Email</Label>
              <Input type="email" placeholder="fatima@example.com" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Relationship</Label>
              <Input placeholder="e.g., Client, Colleague, Manager" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Personal Message (optional)</Label>
              <Textarea placeholder="Hi, I'd really appreciate a recommendation from you..." className="min-h-[80px] rounded-2xl bg-muted border-none p-4 font-medium" />
            </div>
            <Button className="w-full h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black" onClick={() => setShowRequestModal(false)}>
              <Send className="h-4 w-4 mr-2" /> Send Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
