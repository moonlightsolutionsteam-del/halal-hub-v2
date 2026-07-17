"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Clock } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

type Reservation = {
  id: string
  guest_count: number
  reservation_date: string
  time_slot: string | null
  status: string
  created_at: string | null
  profiles: { name: string | null } | null
}

const STATUS_COLORS: Record<string, string> = {
  pending:   "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
  confirmed: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
  cancelled: "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400",
  completed: "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
}

export default function ReservationsPage() {
  const { user, loading: authLoading } = useAuth()
  const { toast } = useToast()
  const [reservations, setReservations] = React.useState<Reservation[]>([])
  const [bizId, setBizId] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [updating, setUpdating] = React.useState<string | null>(null)

  const pending = reservations.filter(r => r.status === "pending").length
  const confirmed = reservations.filter(r => r.status === "confirmed").length

  React.useEffect(() => {
    if (authLoading) return
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    ;supabase
      .from("businesses").select("id").eq("owner_id", user.uid).limit(1).maybeSingle()
      .then(({ data }: { data: { id: string } | null }) => {
        if (!data) { setLoading(false); return }
        setBizId(data.id)
        loadReservations(data.id)
      })
  }, [user?.uid, authLoading])

  function loadReservations(id: string) {
    const supabase = createClient()
    ;supabase
      .from("business_reservations")
      .select("id, guest_count, reservation_date, time_slot, status, created_at, profiles(name)")
      .eq("business_id", id)
      .order("reservation_date", { ascending: false })
      .then(({ data }: { data: Reservation[] | null }) => {
        setReservations(data ?? [])
        setLoading(false)
      })
  }

  async function updateStatus(id: string, status: string) {
    if (!bizId) return
    setUpdating(id)
    const supabase = createClient()
    const { error } = await supabase
      .from("business_reservations").update({ status }).eq("id", id)
    setUpdating(null)
    if (error) { toast({ variant: "destructive", title: "Update failed", description: error.message }); return }
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r))
    toast({ title: "Reservation updated" })
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 max-w-5xl mx-auto pb-24">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
          <Calendar className="h-3 w-3" /> Bookings
        </div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Reservations</h1>
        <p className="text-muted-foreground font-medium">Manage table bookings from your customers.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="rounded-[2rem] border-none shadow-sm bg-amber-50 dark:bg-amber-950/20 p-5 space-y-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-amber-700 dark:text-amber-400">Pending</p>
          <p className="text-4xl font-black tracking-tighter text-amber-700 dark:text-amber-400">{pending}</p>
        </Card>
        <Card className="rounded-[2rem] border-none shadow-sm bg-emerald-50 dark:bg-emerald-950/20 p-5 space-y-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400">Confirmed</p>
          <p className="text-4xl font-black tracking-tighter text-emerald-700 dark:text-emerald-400">{confirmed}</p>
        </Card>
        <Card className="rounded-[2rem] border-none shadow-sm bg-card p-5 space-y-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total</p>
          <p className="text-4xl font-black tracking-tighter text-foreground">{reservations.length}</p>
        </Card>
      </div>

      <div className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">All Reservations</p>
        {reservations.length === 0 && (
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-12 text-center space-y-3">
            <Calendar className="h-10 w-10 text-muted-foreground/30 mx-auto" />
            <p className="font-black text-foreground">No reservations yet</p>
            <p className="text-sm text-muted-foreground">Table reservations from customers will appear here.</p>
          </Card>
        )}
        {reservations.map(r => (
          <Card key={r.id} className="rounded-[2rem] border-none shadow-sm bg-card">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div className="space-y-1">
                  <p className="text-sm font-black text-foreground">{r.profiles?.name ?? "Guest"}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(r.reservation_date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
                    </span>
                    {r.time_slot && (
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{r.time_slot}</span>
                    )}
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" />{r.guest_count} guests</span>
                  </div>
                </div>
                <Badge className={`text-[9px] font-black uppercase border-none ${STATUS_COLORS[r.status] ?? "bg-muted text-muted-foreground"}`}>
                  {r.status}
                </Badge>
              </div>
              {r.status === "pending" && (
                <div className="flex gap-2 pt-1">
                  <Button size="sm" className="h-8 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white"
                    disabled={updating === r.id}
                    onClick={() => updateStatus(r.id, "confirmed")}>
                    Confirm
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 rounded-xl text-xs font-black"
                    disabled={updating === r.id}
                    onClick={() => updateStatus(r.id, "cancelled")}>
                    Decline
                  </Button>
                </div>
              )}
              {r.status === "confirmed" && (
                <Button size="sm" variant="outline" className="h-8 rounded-xl text-xs font-black"
                  disabled={updating === r.id}
                  onClick={() => updateStatus(r.id, "completed")}>
                  Mark Completed
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
