// @ts-nocheck
"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BellRing, Bell, Loader2, CheckCheck, ExternalLink } from "lucide-react"
import Link from "next/link"

type Notif = {
  id: string
  type: string
  title: string
  body: string | null
  link: string | null
  read: boolean
  created_at: string
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60_000)
  if (m < 1)  return "just now"
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export default function NotificationsPage() {
  const { user } = useAuth()
  const [notifs, setNotifs] = useState<Notif[]>([])
  const [loading, setLoading] = useState(true)
  const [markingAll, setMarkingAll] = useState(false)

  useEffect(() => {
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    supabase
      .from("notifications")
      .select("id, type, title, body, link, read, created_at")
      .eq("user_id", user.uid)
      .order("created_at", { ascending: false })
      .limit(100)
      .then(({ data }) => { setNotifs(data ?? []); setLoading(false) })
  }, [user?.uid])

  async function markRead(id: string) {
    const supabase = createClient()
    await supabase.from("notifications").update({ read: true }).eq("id", id)
    setNotifs(ns => ns.map(n => n.id === id ? { ...n, read: true } : n))
  }

  async function markAllRead() {
    if (!user?.uid) return
    setMarkingAll(true)
    const supabase = createClient()
    await supabase.from("notifications").update({ read: true }).eq("user_id", user.uid).eq("read", false)
    setNotifs(ns => ns.map(n => ({ ...n, read: true })))
    setMarkingAll(false)
  }

  const unreadCount = notifs.filter(n => !n.read).length

  return (
    <div className="p-4 md:p-6 space-y-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-foreground flex items-center gap-2">
            <BellRing className="h-5 w-5 text-primary" /> Notifications
          </h1>
          {unreadCount > 0 && (
            <p className="text-xs text-muted-foreground mt-0.5">{unreadCount} unread</p>
          )}
        </div>
        {unreadCount > 0 && (
          <Button
            size="sm"
            variant="outline"
            className="rounded-xl h-8 text-xs font-bold gap-1.5"
            onClick={markAllRead}
            disabled={markingAll}
          >
            {markingAll ? <Loader2 className="h-3 w-3 animate-spin" /> : <CheckCheck className="h-3.5 w-3.5" />}
            Mark all read
          </Button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />
        </div>
      ) : notifs.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Bell className="h-12 w-12 mx-auto mb-3 opacity-20" />
          <p className="font-bold text-foreground">You're all caught up</p>
          <p className="text-sm mt-1">Notifications about coins, reviews, and campaigns will appear here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifs.map(n => (
            <Card
              key={n.id}
              className={`rounded-2xl border-none shadow-sm cursor-pointer transition-colors ${!n.read ? "bg-primary/5 ring-1 ring-primary/10" : ""}`}
              onClick={() => { if (!n.read) markRead(n.id) }}
            >
              <CardContent className="p-4 flex items-start gap-3">
                <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${!n.read ? "bg-primary/10" : "bg-muted"}`}>
                  <BellRing className={`h-4 w-4 ${!n.read ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm truncate ${!n.read ? "font-black text-foreground" : "font-bold text-foreground/80"}`}>
                    {n.title}
                  </p>
                  {n.body && (
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.body}</p>
                  )}
                  <p className="text-[10px] text-muted-foreground/60 mt-1">{timeAgo(n.created_at)}</p>
                </div>
                {n.link && (
                  <Link
                    href={n.link}
                    onClick={e => e.stopPropagation()}
                    className="shrink-0 text-muted-foreground hover:text-primary transition-colors p-1"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                )}
                {!n.read && (
                  <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
