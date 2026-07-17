"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MessageSquare, Search, Mail, Clock, User, Reply, Loader2 } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"

type Message = {
  id: string
  sender_id: string
  content: string
  read: boolean
  created_at: string
  sender: { name: string | null; photo_url: string | null } | null
}

export default function EngagementEnquiryPage() {
  const { user, loading: authLoading } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (authLoading) return
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    ;supabase
      .from("messages")
      .select("id, sender_id, content, read, created_at, sender:profiles!messages_sender_id_fkey(name, photo_url)")
      .eq("receiver_id", user.uid)
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data }: { data: Message[] | null }) => {
        setMessages(data ?? [])
        setLoading(false)
      })
  }, [user?.uid, authLoading])

  const markRead = async (id: string) => {
    const supabase = createClient()
    await supabase.from("messages").update({ read: true }).eq("id", id)
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m))
  }

  const filtered = messages.filter(m => {
    const q = search.toLowerCase()
    return !q || m.content.toLowerCase().includes(q) || (m.sender?.name ?? "").toLowerCase().includes(q)
  })

  const unreadCount = messages.filter(m => !m.read).length

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 max-w-4xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <MessageSquare className="h-3 w-3" /> Customer Concierge
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">General Enquiries</h1>
          <p className="text-muted-foreground font-medium">Messages from customers and booking queries.</p>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <Badge className="bg-primary text-white font-black rounded-full px-4">{unreadCount} Unread</Badge>
          )}
          <Link href="/messages">
            <Button className="bg-primary rounded-full px-8 font-bold shadow-lg shadow-primary/20 h-12 text-white">
              Open Inbox
            </Button>
          </Link>
        </div>
      </div>

      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search messages..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9 h-12 rounded-2xl bg-card border-none shadow-sm"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="h-16 w-16 rounded-3xl bg-primary/10 flex items-center justify-center">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <p className="font-black text-lg text-foreground">No messages yet</p>
          <p className="text-muted-foreground font-medium text-sm">Customer enquiries will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(msg => {
            const initials = (msg.sender?.name ?? "?").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
            const time = new Date(msg.created_at).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
            return (
              <Card
                key={msg.id}
                className={`rounded-[2rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-md transition-all ${!msg.read ? "ring-2 ring-primary/20" : ""}`}
              >
                <CardContent className="p-6 flex gap-4 items-start">
                  <div className="h-10 w-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black text-xs shrink-0">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-foreground">{msg.sender?.name ?? "HalalHub User"}</span>
                        {!msg.read && <Badge className="bg-primary text-white text-[9px] font-black px-2 py-0 rounded-full">New</Badge>}
                      </div>
                      <span className="text-[10px] text-muted-foreground font-bold shrink-0 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed line-clamp-2">{msg.content}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <Link href={`/messages/${msg.sender_id}`}>
                        <Button size="sm" className="bg-primary text-white rounded-xl font-bold text-xs h-8 px-4 gap-1.5">
                          <Reply className="h-3 w-3" /> Reply
                        </Button>
                      </Link>
                      {!msg.read && (
                        <Button size="sm" variant="outline" onClick={() => markRead(msg.id)} className="rounded-xl font-bold text-xs h-8 px-4">
                          Mark Read
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
