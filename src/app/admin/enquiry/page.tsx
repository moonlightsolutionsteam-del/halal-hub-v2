"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Search, Loader2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

type Msg = {
  id: string
  content: string
  is_read: boolean | null
  created_at: string
  sender: { name: string | null } | null
  receiver: { name: string | null } | null
}

export default function AdminEnquiryPage() {
  const [messages, setMessages] = useState<Msg[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const supabase = createClient()
    ;supabase
      .from("messages")
      .select("id, content, is_read, created_at, sender:profiles!messages_sender_id_fkey(name), receiver:profiles!messages_receiver_id_fkey(name)")
      .order("created_at", { ascending: false })
      .limit(100)
      .then(({ data }: { data: Msg[] | null }) => {
        setMessages(data ?? [])
        setLoading(false)
      })
  }, [])

  const filtered = messages.filter(m => {
    const q = search.toLowerCase()
    return !q ||
      (m.sender?.name ?? "").toLowerCase().includes(q) ||
      (m.receiver?.name ?? "").toLowerCase().includes(q) ||
      m.content.toLowerCase().includes(q)
  })

  const unread = filtered.filter(m => !m.is_read)

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-foreground">Enquiries & Messages</h1>
        <p className="text-sm text-muted-foreground font-medium">All platform messages between users and vendors.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search messages, sender, or receiver..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9 h-11 rounded-xl"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <Tabs defaultValue="unread">
          <TabsList className="rounded-full h-11">
            <TabsTrigger value="unread" className="rounded-full">
              Unread <Badge className="ml-2 text-[10px] h-5 px-1.5">{unread.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="all" className="rounded-full">
              All <Badge className="ml-2 text-[10px] h-5 px-1.5">{filtered.length}</Badge>
            </TabsTrigger>
          </TabsList>

          {(["unread", "all"] as const).map(tab => {
            const items = tab === "unread" ? unread : filtered
            return (
              <TabsContent key={tab} value={tab} className="mt-4 space-y-3">
                {items.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">{search ? "No messages match your search." : "No messages yet."}</p>
                  </div>
                ) : (
                  items.map(m => {
                    const date = new Date(m.created_at).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
                    return (
                      <Card key={m.id} className={`rounded-2xl border-none shadow-sm ${!m.is_read ? "ring-1 ring-primary/30 bg-primary/5" : ""}`}>
                        <CardContent className="p-4 flex items-start gap-4">
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-black text-foreground">{m.sender?.name ?? "Unknown"}</span>
                              <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                              <span className="text-xs font-bold text-muted-foreground">{m.receiver?.name ?? "Unknown"}</span>
                              {!m.is_read && <Badge className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5">New</Badge>}
                            </div>
                            <p className="text-sm text-foreground line-clamp-2">{m.content}</p>
                            <p className="text-xs text-muted-foreground">{date}</p>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })
                )}
              </TabsContent>
            )
          })}
        </Tabs>
      )}
    </div>
  )
}
