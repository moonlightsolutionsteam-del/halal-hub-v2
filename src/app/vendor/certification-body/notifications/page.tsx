"use client"

import * as React from "react"
import { Bell, ShieldCheck, Clock, AlertTriangle, CheckCircle2, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"

const TYPE_CONFIG: Record<string, { icon: typeof Bell, bg: string, color: string, label: string }> = {
  alert:   { icon: AlertTriangle, bg: "bg-amber-50",   color: "text-amber-600",   label: "Alert" },
  request: { icon: Clock,          bg: "bg-blue-50",    color: "text-blue-600",    label: "Request" },
  info:    { icon: Info,           bg: "bg-purple-50",  color: "text-purple-600",  label: "Info" },
  success: { icon: CheckCircle2,   bg: "bg-emerald-50", color: "text-emerald-600", label: "Success" },
  default: { icon: Bell,           bg: "bg-muted",      color: "text-muted-foreground", label: "Notice" },
}

function timeAgo(iso: string | null): string {
  if (!iso) return ""
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

export default function NotificationsPage() {
  const { user, loading: authLoading } = useAuth()
  const [notifications, setNotifications] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (authLoading || !user?.uid) { setLoading(false); return }
    const supabase = createClient()
    supabase
      .from("notifications")
      .select("id, title, body, type, read, link, created_at")
      .eq("user_id", user.uid)
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data }) => {
        setNotifications(data ?? [])
        setLoading(false)
      })
  }, [user?.uid, authLoading])

  const unread = notifications.filter(n => !n.read).length

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Compliance</div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Notifications</h1>
          <p className="text-muted-foreground font-medium text-sm">Stay updated on requests, renewals, and alerts.</p>
        </div>
        {unread > 0 && (
          <Badge className="bg-emerald-600 text-white font-black text-xs px-4 py-1.5 rounded-full">
            {unread} unread
          </Badge>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <Bell className="h-10 w-10 text-muted-foreground/30 mx-auto" />
          <p className="font-black text-foreground">No notifications yet</p>
          <p className="text-sm text-muted-foreground">You'll be notified of certification requests and renewals here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => {
            const cfg = TYPE_CONFIG[notif.type] ?? TYPE_CONFIG.default
            const Icon = cfg.icon
            return (
              <div
                key={notif.id}
                className={cn(
                  "flex items-start gap-4 p-5 rounded-3xl border transition-all",
                  notif.read
                    ? "bg-card border-border opacity-60"
                    : "bg-card border-emerald-100 shadow-sm"
                )}
              >
                <div className={`h-11 w-11 rounded-2xl flex items-center justify-center shrink-0 ${cfg.bg}`}>
                  <Icon className={`h-5 w-5 ${cfg.color}`} />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-black text-foreground text-sm">{notif.title}</p>
                    {!notif.read && <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />}
                  </div>
                  {notif.body && <p className="text-sm text-muted-foreground font-medium leading-relaxed">{notif.body}</p>}
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{timeAgo(notif.created_at)}</p>
                </div>
                <Badge variant="outline" className={`font-black text-[9px] uppercase shrink-0 ${cfg.bg} ${cfg.color} border-0`}>
                  {cfg.label}
                </Badge>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
