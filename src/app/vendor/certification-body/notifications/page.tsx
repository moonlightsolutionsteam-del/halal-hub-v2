"use client"

import { Bell, ShieldCheck, Clock, AlertTriangle, CheckCircle2, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const NOTIFICATIONS = [
  { id: 1, type: "alert",   title: "Certificate Expiring",        body: "Barakah Grocers certificate expires in 30 days. Initiate renewal process.", time: "2 hours ago",  read: false },
  { id: 2, type: "request", title: "New Certification Request",   body: "Al-Noor Catering has submitted a new certification application.",           time: "5 hours ago",  read: false },
  { id: 3, type: "info",    title: "Audit Report Ready",          body: "The Q3 2024 Compliance Report is ready for download.",                      time: "1 day ago",    read: false },
  { id: 4, type: "success", title: "Certificate Issued",          body: "Halal certificate successfully issued to Medina Meats (HI-IND-2024-101).",  time: "2 days ago",   read: true },
  { id: 5, type: "alert",   title: "Docs Required",               body: "Pure Life Cosmetics has not submitted required audit documents.",            time: "3 days ago",   read: true },
  { id: 6, type: "success", title: "Renewal Completed",           body: "Zam Zam Finance certificate renewed successfully.",                         time: "5 days ago",   read: true },
]

const TYPE_CONFIG: Record<string, { icon: typeof Bell, bg: string, color: string, label: string }> = {
  alert:   { icon: AlertTriangle, bg: "bg-amber-50",   color: "text-amber-600",   label: "Alert" },
  request: { icon: Clock,          bg: "bg-blue-50",    color: "text-blue-600",    label: "Request" },
  info:    { icon: Info,           bg: "bg-purple-50",  color: "text-purple-600",  label: "Info" },
  success: { icon: CheckCircle2,   bg: "bg-emerald-50", color: "text-emerald-600", label: "Success" },
}

export default function NotificationsPage() {
  const unread = NOTIFICATIONS.filter(n => !n.read).length

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

      <div className="space-y-3">
        {NOTIFICATIONS.map((notif) => {
          const cfg = TYPE_CONFIG[notif.type]
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
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">{notif.body}</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{notif.time}</p>
              </div>
              <Badge variant="outline" className={`font-black text-[9px] uppercase shrink-0 ${cfg.bg} ${cfg.color} border-0`}>
                {cfg.label}
              </Badge>
            </div>
          )
        })}
      </div>
    </div>
  )
}
