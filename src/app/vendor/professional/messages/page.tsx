"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Search, Send, MoreHorizontal, CheckCheck } from "lucide-react"

const CONVERSATIONS = [
  { id: 1, name: "Fatima Al-Rashid", role: "CEO, Halal Foods Co.", avatar: "msg1", lastMsg: "Can we schedule a follow-up call next week?", time: "10:42 AM", unread: 2, online: true },
  { id: 2, name: "Omar Siddiqui", role: "Founder, Deen Digital", avatar: "msg2", lastMsg: "The brand guide looks incredible — team loves it!", time: "Yesterday", unread: 0, online: false },
  { id: 3, name: "HIBA Foundation", role: "Accelerator Programme", avatar: "msg3", lastMsg: "We'd love you to join as Mentor in Residence.", time: "Yesterday", unread: 1, online: false },
  { id: 4, name: "Barakah Studio", role: "Creative Studio", avatar: "msg4", lastMsg: "Sending over the brief for Ramadan 2025 campaign.", time: "Tue", unread: 0, online: true },
  { id: 5, name: "Dr. Amira Hassan", role: "Director, IslahMedia", avatar: "msg5", lastMsg: "Monthly strategy call confirmed for Thursday.", time: "Mon", unread: 0, online: false },
]

const MESSAGES: Record<number, { id: number; from: "me" | "them"; text: string; time: string }[]> = {
  1: [
    { id: 1, from: "them", text: "Hi Yusuf! Thank you so much for the brand presentation last week. The team was absolutely blown away.", time: "10:28 AM" },
    { id: 2, from: "me", text: "So glad to hear that! It was a pleasure working through the strategy together.", time: "10:31 AM" },
    { id: 3, from: "them", text: "We've had a chance to review the full proposal now. Everyone's on board.", time: "10:35 AM" },
    { id: 4, from: "me", text: "Wonderful! Shall we move forward with Phase 1 then?", time: "10:38 AM" },
    { id: 5, from: "them", text: "Absolutely. Can we schedule a follow-up call next week?", time: "10:42 AM" },
  ],
  2: [
    { id: 1, from: "me", text: "Omar, the brand identity document is ready. I'm sharing it now!", time: "Yesterday 3:15 PM" },
    { id: 2, from: "them", text: "The brand guide looks incredible — team loves it!", time: "Yesterday 3:58 PM" },
  ],
}

export default function ProfessionalMessagesPage() {
  const [selected, setSelected] = useState(CONVERSATIONS[0])
  const [message, setMessage] = useState("")
  const [search, setSearch] = useState("")

  const msgs = MESSAGES[selected.id] || []
  const filtered = CONVERSATIONS.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="container mx-auto p-6 pb-24">
      <div className="mb-6 space-y-1">
        <div className="flex items-center gap-2 text-violet-600 font-black uppercase tracking-widest text-[10px]">
          <MessageSquare className="h-3 w-3" /> Inbox
        </div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Messages</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6 h-[600px]">
        {/* Sidebar */}
        <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="pl-10 h-10 rounded-xl bg-muted border-none font-bold text-sm" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.map(conv => (
              <button key={conv.id} onClick={() => setSelected(conv)}
                className={`w-full flex items-center gap-3 p-4 text-left hover:bg-muted transition-colors border-b border-border/50 ${selected.id === conv.id ? "bg-violet-50" : ""}`}>
                <div className="relative shrink-0">
                  <Avatar className="h-11 w-11">
                    <AvatarImage src={`https://picsum.photos/seed/${conv.avatar}/100/100`} />
                    <AvatarFallback className="bg-violet-50 text-violet-600 font-black text-sm">{conv.name[0]}</AvatarFallback>
                  </Avatar>
                  {conv.online && <div className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-400 rounded-full border-2 border-card" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`font-black text-sm truncate ${selected.id === conv.id ? "text-violet-600" : "text-foreground"}`}>{conv.name}</p>
                    <span className="text-[10px] font-bold text-muted-foreground shrink-0 ml-2">{conv.time}</span>
                  </div>
                  <p className="text-xs font-medium text-muted-foreground truncate">{conv.lastMsg}</p>
                </div>
                {conv.unread > 0 && (
                  <Badge className="bg-violet-600 text-white border-none font-black text-[10px] h-5 min-w-5 rounded-full px-1.5">{conv.unread}</Badge>
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Chat Panel */}
        <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden flex flex-col">
          {/* Chat Header */}
          <div className="p-5 border-b border-border flex items-center gap-3">
            <div className="relative shrink-0">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`https://picsum.photos/seed/${selected.avatar}/100/100`} />
                <AvatarFallback className="bg-violet-50 text-violet-600 font-black text-sm">{selected.name[0]}</AvatarFallback>
              </Avatar>
              {selected.online && <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-400 rounded-full border-2 border-card" />}
            </div>
            <div className="flex-1">
              <p className="font-black text-foreground">{selected.name}</p>
              <p className="text-xs font-bold text-muted-foreground">{selected.online ? "Online" : "Offline"} · {selected.role}</p>
            </div>
            <Button size="sm" variant="ghost" className="rounded-xl h-9 w-9 p-0">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {msgs.length === 0 && (
              <div className="h-full flex items-center justify-center text-muted-foreground font-bold text-sm">
                No messages yet. Start the conversation!
              </div>
            )}
            {msgs.map(m => (
              <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] rounded-2xl px-4 py-3 space-y-1 ${m.from === "me" ? "bg-violet-600 text-white rounded-br-sm" : "bg-muted text-foreground rounded-bl-sm"}`}>
                  <p className="text-sm font-medium leading-relaxed">{m.text}</p>
                  <div className={`flex items-center gap-1 ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                    <span className={`text-[10px] font-bold ${m.from === "me" ? "text-white/70" : "text-muted-foreground"}`}>{m.time}</span>
                    {m.from === "me" && <CheckCheck className="h-3 w-3 text-white/70" />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border flex gap-3">
            <Input
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && message.trim()) setMessage("") }}
              placeholder="Type a message..."
              className="flex-1 h-12 rounded-2xl bg-muted border-none font-medium"
            />
            <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-2xl h-12 px-5" onClick={() => setMessage("")}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
