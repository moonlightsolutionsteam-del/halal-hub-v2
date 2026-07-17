"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, UserPlus, PartyPopper } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { createClient } from "@/lib/supabase/client"

type RawMessage = {
  sender_id: string
  receiver_id: string
  content: string
  read: boolean
  created_at: string
  sender: { name: string | null; photo_url: string | null } | null
  receiver: { name: string | null; photo_url: string | null } | null
}

type Conversation = {
  otherId: string
  name: string
  avatar: string | null
  lastMessage: string
  time: string
  unread: number
}

const ActionCard = ({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) => (
  <Link href={href}>
    <Card className="rounded-2xl border-none shadow-soft hover:shadow-soft-md transition-shadow duration-200">
      <CardContent className="p-3 flex flex-col items-center justify-center gap-2 aspect-square">
        <div className="p-3 bg-primary/10 rounded-xl">{icon}</div>
        <p className="text-xs font-semibold text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  </Link>
)

export default function MessagesPage() {
  const { user } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()

    async function load() {
      const { data } = await supabase
        .from("messages")
        .select(
          "sender_id, receiver_id, content, read, created_at, sender:profiles!messages_sender_id_fkey(name, photo_url), receiver:profiles!messages_receiver_id_fkey(name, photo_url)"
        )
        .or(`sender_id.eq.${user!.uid},receiver_id.eq.${user!.uid}`)
        .order("created_at", { ascending: false })

      const rows: RawMessage[] = data ?? []
      const byOther = new Map<string, Conversation>()
      for (const row of rows) {
        const isMine = row.sender_id === user!.uid
        const otherId = isMine ? row.receiver_id : row.sender_id
        const otherProfile = isMine ? row.receiver : row.sender
        if (!byOther.has(otherId)) {
          byOther.set(otherId, {
            otherId,
            name: otherProfile?.name ?? "Halal Hub User",
            avatar: otherProfile?.photo_url ?? null,
            lastMessage: row.content,
            time: new Date(row.created_at).toLocaleString([], { hour: "2-digit", minute: "2-digit" }),
            unread: 0,
          })
        }
        if (!isMine && !row.read) {
          byOther.get(otherId)!.unread += 1
        }
      }
      setConversations(Array.from(byOther.values()))
      setLoading(false)
    }

    load()

    const channel = supabase
      .channel("messages-list")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        () => load()
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [user?.uid])

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Messages</h1>
        <p className="text-sm font-bold text-muted-foreground">Chats with friends, businesses, and the community.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <ActionCard icon={<Bell className="h-6 w-6 text-primary" />} label="Notifications" href="/messages/notifications" />
        <ActionCard icon={<UserPlus className="h-6 w-6 text-primary" />} label="New Friends" href="/messages/new-friends" />
        <ActionCard icon={<PartyPopper className="h-6 w-6 text-primary" />} label="Activity" href="/messages/activity" />
      </div>

      <Card className="rounded-[2rem] border-none shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground text-sm">Loading conversations…</div>
        ) : conversations.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground text-sm">
            No conversations yet. Message a business or creator to start chatting.
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-border/60">
            {conversations.map((convo) => (
              <Link href={`/messages/${convo.otherId}`} key={convo.otherId} className="block">
                <div className="flex items-center gap-4 p-4 hover:bg-muted/40 transition-colors">
                  <Avatar className="h-12 w-12">
                    {convo.avatar && <AvatarImage src={convo.avatar} />}
                    <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-foreground">{convo.name}</p>
                      <p className="text-xs text-muted-foreground">{convo.time}</p>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                      {convo.unread > 0 && (
                        <div className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs shrink-0">
                          {convo.unread}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
