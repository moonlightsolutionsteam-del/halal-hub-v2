"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Send, Loader2, MessageSquare } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"

type ChatMessage = {
  id: string
  sender_id: string
  sender_name: string | null
  content: string
  created_at: string
}

function fmtTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export default function FamilyChatPage() {
  const { user } = useAuth()
  const [groupId, setGroupId] = React.useState<string | null>(null)
  const [groupName, setGroupName] = React.useState("")
  const [messages, setMessages] = React.useState<ChatMessage[]>([])
  const [loading, setLoading] = React.useState(true)
  const [text, setText] = React.useState("")
  const [sending, setSending] = React.useState(false)
  const bottomRef = React.useRef<HTMLDivElement>(null)

  // Load group + messages, then subscribe
  React.useEffect(() => {
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()

    async function init() {
      const { data: memberRow } = await (supabase as any)
        .from("family_members")
        .select("group_id, family_groups(id, name)")
        .eq("user_id", user!.uid)
        .maybeSingle()

      if (!memberRow) { setLoading(false); return }
      const gid: string = memberRow.group_id
      const gname: string = memberRow.family_groups?.name ?? "Family Chat"
      setGroupId(gid)
      setGroupName(gname)

      const { data: msgs } = await (supabase as any)
        .from("family_messages")
        .select("id, sender_id, sender_name, content, created_at")
        .eq("group_id", gid)
        .order("created_at", { ascending: true })
        .limit(100)

      setMessages(msgs ?? [])
      setLoading(false)

      // Realtime subscription
      const channel = supabase
        .channel(`family-chat-${gid}`)
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "family_messages", filter: `group_id=eq.${gid}` },
          (payload: any) => {
            setMessages(prev => {
              // Avoid duplicates (optimistic + realtime)
              if (prev.some(m => m.id === payload.new.id)) return prev
              return [...prev, payload.new as ChatMessage]
            })
          }
        )
        .subscribe()

      return () => { supabase.removeChannel(channel) }
    }

    init()
  }, [user?.uid])

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim() || !groupId || !user?.uid || sending) return
    setSending(true)
    const content = text.trim()
    setText("")

    // Optimistic insert
    const optimisticId = `opt-${Date.now()}`
    setMessages(prev => [...prev, {
      id: optimisticId,
      sender_id: user.uid,
      sender_name: user.name ?? "You",
      content,
      created_at: new Date().toISOString(),
    }])

    const supabase = createClient()
    const { data, error } = await (supabase as any)
      .from("family_messages")
      .insert({
        group_id: groupId,
        sender_id: user.uid,
        sender_name: user.name ?? user.email ?? "Family Member",
        content,
      })
      .select("id, sender_id, sender_name, content, created_at")
      .single()

    if (!error && data) {
      // Replace optimistic message with real one
      setMessages(prev => prev.map(m => m.id === optimisticId ? data : m))
    } else {
      // Remove optimistic on error
      setMessages(prev => prev.filter(m => m.id !== optimisticId))
    }
    setSending(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!groupId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-6">
        <MessageSquare className="h-12 w-12 text-muted-foreground/30" />
        <p className="text-xl font-black">No family group yet</p>
        <p className="text-sm text-muted-foreground">Set up your family hub to start chatting.</p>
        <Button asChild className="rounded-xl font-bold">
          <Link href="/family-tree/setup">Set Up Family Hub</Link>
        </Button>
      </div>
    )
  }

  // Group messages by date
  const grouped: { date: string; msgs: ChatMessage[] }[] = []
  messages.forEach(m => {
    const d = new Date(m.created_at).toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })
    const last = grouped[grouped.length - 1]
    if (last && last.date === d) last.msgs.push(m)
    else grouped.push({ date: d, msgs: [m] })
  })

  return (
    <div className="flex flex-col h-[calc(100dvh-4rem)] max-w-2xl mx-auto">

      {/* Top bar */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b p-4 flex items-center gap-3 z-10">
        <Link href="/family-tree" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="h-9 w-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 shrink-0">
          <MessageSquare className="h-4 w-4" />
        </div>
        <div>
          <p className="font-black text-sm text-foreground">{groupName}</p>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Family Chat</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {grouped.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
            <MessageSquare className="h-10 w-10 text-muted-foreground/20" />
            <p className="font-black text-foreground">No messages yet</p>
            <p className="text-sm text-muted-foreground">Say As-salamu alaykum to get started!</p>
          </div>
        )}
        {grouped.map(group => (
          <React.Fragment key={group.date}>
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest shrink-0">{group.date}</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            {group.msgs.map((msg, i) => {
              const isMe = msg.sender_id === user?.uid
              const prevMsg = group.msgs[i - 1]
              const showName = !isMe && (!prevMsg || prevMsg.sender_id !== msg.sender_id)
              return (
                <div key={msg.id} className={cn("flex items-end gap-2 mb-1", isMe ? "justify-end" : "justify-start")}>
                  {!isMe && (
                    <Avatar className="h-7 w-7 shrink-0 mb-0.5">
                      <AvatarFallback className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 text-[10px] font-black">
                        {(msg.sender_name ?? "?")[0]}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className={cn("max-w-[72%] space-y-0.5", isMe ? "items-end" : "items-start")}>
                    {showName && (
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wider ml-1">{msg.sender_name}</p>
                    )}
                    <div className={cn(
                      "rounded-2xl px-4 py-2.5",
                      isMe
                        ? "bg-emerald-600 text-white rounded-br-sm"
                        : "bg-card text-foreground rounded-bl-sm shadow-sm"
                    )}>
                      <p className="text-sm font-medium leading-relaxed">{msg.content}</p>
                    </div>
                    <p className={cn("text-[10px] font-medium text-muted-foreground", isMe ? "text-right" : "text-left", "px-1")}>
                      {fmtTime(msg.created_at)}
                    </p>
                  </div>
                </div>
              )
            })}
          </React.Fragment>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm border-t p-4">
        <form onSubmit={handleSend} className="flex gap-2">
          <Input
            placeholder="Type a message…"
            className="flex-1 h-12 rounded-2xl bg-card border-none shadow-sm font-medium"
            value={text}
            onChange={e => setText(e.target.value)}
            disabled={sending}
          />
          <Button
            type="submit"
            size="icon"
            className="h-12 w-12 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shrink-0"
            disabled={!text.trim() || sending}
          >
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </div>
    </div>
  )
}
