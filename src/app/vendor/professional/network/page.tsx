"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Users, Search, UserPlus, MessageSquare, Check, X, MapPin, Briefcase } from "lucide-react"

const CONNECTIONS = [
  { id: 1, name: "Fatima Al-Rashid", role: "Marketing Director", company: "Halal Foods Co.", location: "Dubai", mutual: 14, status: "connected", avatar: "c1" },
  { id: 2, name: "Omar Siddiqui", role: "Founder & CEO", company: "Deen Digital", location: "London", mutual: 9, status: "connected", avatar: "c2" },
  { id: 3, name: "Aisha Malik", role: "UX Designer", company: "Muslim Pro", location: "Toronto", mutual: 6, status: "connected", avatar: "c3" },
  { id: 4, name: "Ibrahim Al-Farsi", role: "Islamic Finance Advisor", company: "AmanaBank", location: "Kuala Lumpur", mutual: 11, status: "connected", avatar: "c4" },
  { id: 5, name: "Nour Hassan", role: "Content Creator", company: "Independent", location: "Cairo", mutual: 4, status: "connected", avatar: "c5" },
]

const REQUESTS = [
  { id: 6, name: "Khalid Omar", role: "Business Development Manager", company: "Halal Certified", location: "Manchester", mutual: 7, avatar: "r1" },
  { id: 7, name: "Maryam Yusuf", role: "Fashion Designer", company: "Modesty Studio", location: "Istanbul", mutual: 3, avatar: "r2" },
]

const SUGGESTIONS = [
  { id: 8, name: "Dr. Hassan Al-Banna", role: "Shariah Scholar", company: "AAOIFI", location: "Bahrain", mutual: 18, avatar: "s1" },
  { id: 9, name: "Zainab Rahman", role: "Tech Entrepreneur", company: "HalalTech", location: "Singapore", mutual: 12, avatar: "s2" },
  { id: 10, name: "Yusra Al-Khatib", role: "Public Speaker", company: "Speaker Hub", location: "UAE", mutual: 8, avatar: "s3" },
  { id: 11, name: "Tariq Jameel", role: "Marketing Consultant", company: "Independent", location: "Birmingham", mutual: 5, avatar: "s4" },
]

export default function ProfessionalNetworkPage() {
  const [tab, setTab] = useState<"connections"|"requests"|"suggestions">("connections")
  const [search, setSearch] = useState("")
  const [showInviteModal, setShowInviteModal] = useState(false)

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-600 font-black uppercase tracking-widest text-[10px]">
            <Users className="h-3 w-3" /> Network
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">My Network</h1>
          <p className="text-sm font-bold text-muted-foreground">Manage connections, review requests, and discover new professionals.</p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700 rounded-2xl font-black h-12 text-white px-8" onClick={() => setShowInviteModal(true)}>
          <UserPlus className="h-4 w-4 mr-2" /> Invite People
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: "Connections", value: "347", icon: Users },
          { label: "Pending Requests", value: "2", icon: UserPlus },
          { label: "Followers", value: "1,284", icon: Users },
        ].map(s => (
          <Card key={s.label} className="rounded-[2rem] border-none shadow-sm bg-card p-5">
            <p className="text-2xl font-black text-violet-600">{s.value}</p>
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["connections", "requests", "suggestions"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-2xl font-bold text-sm border-2 capitalize transition-all ${tab === t ? "bg-violet-600 text-white border-violet-600" : "bg-muted border-border text-muted-foreground hover:border-violet-300"}`}
          >
            {t} {t === "requests" && <Badge className="ml-1 bg-white/20 text-white border-none font-black text-[9px] py-0">2</Badge>}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search your network..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-12 h-12 rounded-2xl bg-card border-none shadow-sm font-bold"
        />
      </div>

      {/* Connections List */}
      {tab === "connections" && (
        <div className="space-y-3">
          {CONNECTIONS.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map(c => (
            <Card key={c.id} className="rounded-[2rem] border-none shadow-sm bg-card p-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 shrink-0">
                  <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format&q=80`} />
                  <AvatarFallback className="bg-violet-50 text-violet-600 font-black">{c.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-foreground">{c.name}</p>
                  <p className="text-sm font-bold text-muted-foreground">{c.role} · {c.company}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3"/>{c.location}</span>
                    <span className="text-[10px] font-bold text-violet-600">{c.mutual} mutual connections</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" variant="outline" className="rounded-xl font-bold text-xs h-9 border-2 border-violet-200 text-violet-600 hover:bg-violet-50">
                    <MessageSquare className="h-3 w-3 mr-1" /> Message
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Requests */}
      {tab === "requests" && (
        <div className="space-y-3">
          {REQUESTS.map(r => (
            <Card key={r.id} className="rounded-[2rem] border-none shadow-sm bg-card p-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 shrink-0">
                  <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format&q=80`} />
                  <AvatarFallback className="bg-violet-50 text-violet-600 font-black">{r.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-foreground">{r.name}</p>
                  <p className="text-sm font-bold text-muted-foreground">{r.role} · {r.company}</p>
                  <p className="text-[10px] font-bold text-violet-600 mt-1">{r.mutual} mutual connections</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" className="rounded-xl font-black text-xs h-9 bg-violet-600 hover:bg-violet-700 text-white">
                    <Check className="h-3 w-3 mr-1" /> Accept
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-xl font-bold text-xs h-9 border-2">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Suggestions */}
      {tab === "suggestions" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SUGGESTIONS.map(s => (
            <Card key={s.id} className="rounded-[2rem] border-none shadow-sm bg-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 shrink-0">
                  <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format&q=80`} />
                  <AvatarFallback className="bg-violet-50 text-violet-600 font-black">{s.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-foreground text-sm">{s.name}</p>
                  <p className="text-xs font-bold text-muted-foreground">{s.role}</p>
                  <p className="text-[10px] font-bold text-violet-600">{s.mutual} mutual · {s.location}</p>
                </div>
              </div>
              <Button className="w-full h-10 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black text-sm">
                <UserPlus className="h-4 w-4 mr-2" /> Connect
              </Button>
            </Card>
          ))}
        </div>
      )}

      {/* Invite Modal */}
      <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
        <DialogContent className="rounded-[2rem] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Invite to Your Network</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <p className="text-sm font-bold text-muted-foreground">Send your unique invite link to professionals you'd like to connect with.</p>
              <div className="flex gap-2">
                <Input defaultValue="halalHub.com/pro/yusuf-qahtani" readOnly className="h-12 rounded-2xl bg-muted border-none font-bold text-sm" />
                <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-black px-5 h-12 shrink-0">Copy</Button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-black text-xs uppercase tracking-widest text-muted-foreground">Or invite by email</p>
              <Input placeholder="Enter email address" className="h-12 rounded-2xl bg-muted border-none font-bold" />
              <Button className="w-full h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black" onClick={() => setShowInviteModal(false)}>
                Send Invite
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
