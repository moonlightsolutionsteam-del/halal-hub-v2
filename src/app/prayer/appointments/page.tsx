"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Calendar, Clock, CheckCircle2, Loader2, User, BookOpen } from "lucide-react"
import Link from "next/link"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

const IMAMS = [
  "Sheikh Abdullah Al-Farsi",
  "Imam Yusuf Hassan",
  "Sheikh Ahmad Karimi",
  "Imam Bilal Mahmoud",
]

const PURPOSES = [
  "Marriage Consultation",
  "Divorce / Family Issues",
  "Revert / Shahada",
  "Aqeeqah / Naming",
  "Janazah / Bereavement",
  "General Islamic Advice",
  "Business Ethics Query",
  "Other",
]

type Appointment = {
  id: string
  imam_name: string | null
  purpose: string | null
  preferred_date: string | null
  preferred_time: string | null
  status: string
  created_at: string
}

function fmtDate(d: string | null) {
  if (!d) return "—"
  return new Date(d).toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })
}

export default function AppointmentsPage() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [imam, setImam] = React.useState("")
  const [purpose, setPurpose] = React.useState("")
  const [date, setDate] = React.useState("")
  const [time, setTime] = React.useState("")
  const [notes, setNotes] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)
  const [appointments, setAppointments] = React.useState<Appointment[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    supabase
      .from("imam_appointments")
      .select("id, imam_name, purpose, preferred_date, preferred_time, status, created_at")
      .eq("user_id", user.uid)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setAppointments((data as Appointment[] | null) ?? [])
        setLoading(false)
      })
  }, [user?.uid])

  const handleSubmit = async () => {
    if (!imam || !purpose) {
      toast({ title: "Select an Imam and purpose", variant: "destructive" })
      return
    }
    if (!user?.uid) {
      toast({ title: "Sign in to book an appointment", variant: "destructive" })
      return
    }
    setSubmitting(true)
    const supabase = createClient()
    const { data, error } = await supabase
      .from("imam_appointments")
      .insert({
        user_id: user.uid,
        user_name: user.name ?? user.email ?? "Member",
        imam_name: imam,
        purpose,
        preferred_date: date || null,
        preferred_time: time || null,
        notes: notes.trim() || null,
        status: "pending",
      })
      .select("id, imam_name, purpose, preferred_date, preferred_time, status, created_at")
      .single()

    if (error) {
      toast({ title: "Booking failed", description: error.message, variant: "destructive" })
    } else {
      setAppointments(prev => [data as Appointment, ...prev])
      setImam(""); setPurpose(""); setDate(""); setTime(""); setNotes("")
      setSubmitted(true)
      toast({ title: "Appointment requested!", description: "You'll be contacted to confirm the time." })
      setTimeout(() => setSubmitted(false), 4000)
    }
    setSubmitting(false)
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-2xl space-y-6 pb-24">
      <div>
        <Link href="/prayer-times" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground mb-3 w-fit">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-violet-100 dark:bg-violet-950/40 flex items-center justify-center text-violet-600">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black">Book an Appointment</h1>
            <p className="text-xs text-muted-foreground font-bold">Meet with an Imam for personal Islamic guidance</p>
          </div>
        </div>
      </div>

      {submitted && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-900 animate-in fade-in duration-300">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Appointment requested! We'll confirm your time shortly.</p>
        </div>
      )}

      <Card className="rounded-[2rem] border-none shadow-sm">
        <CardContent className="p-5 space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Select Imam</Label>
            <Select value={imam} onValueChange={setImam}>
              <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                <SelectValue placeholder="Choose an Imam…" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-none shadow-2xl">
                {IMAMS.map(i => <SelectItem key={i} value={i} className="font-medium">{i}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Purpose</Label>
            <Select value={purpose} onValueChange={setPurpose}>
              <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                <SelectValue placeholder="Select purpose…" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-none shadow-2xl">
                {PURPOSES.map(p => <SelectItem key={p} value={p} className="font-medium">{p}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Preferred Date</Label>
              <Input type="date" className="h-12 rounded-2xl bg-muted border-none font-medium"
                value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Preferred Time</Label>
              <Input type="time" className="h-12 rounded-2xl bg-muted border-none font-medium"
                value={time} onChange={e => setTime(e.target.value)} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Notes (optional)</Label>
            <Textarea placeholder="Any context that would help the Imam prepare…"
              className="rounded-2xl bg-muted border-none resize-none min-h-[80px] font-medium"
              value={notes} onChange={e => setNotes(e.target.value)} />
          </div>

          <Button onClick={handleSubmit} disabled={submitting || !imam || !purpose}
            className="w-full h-13 rounded-2xl font-black bg-violet-600 hover:bg-violet-700 text-white shadow-lg gap-2">
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Calendar className="h-4 w-4" /> Request Appointment</>}
          </Button>
        </CardContent>
      </Card>

      {/* Existing appointments */}
      {!loading && appointments.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Your Appointments</p>
          {appointments.map(a => (
            <Card key={a.id} className="rounded-2xl border-none shadow-sm">
              <CardContent className="p-4 space-y-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                      <p className="font-black text-sm">{a.imam_name}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                      <p className="text-xs font-medium text-muted-foreground">{a.purpose}</p>
                    </div>
                    {(a.preferred_date || a.preferred_time) && (
                      <div className="flex items-center gap-2 mt-0.5">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <p className="text-xs font-medium text-muted-foreground">
                          {fmtDate(a.preferred_date)}{a.preferred_time ? ` · ${a.preferred_time}` : ""}
                        </p>
                      </div>
                    )}
                  </div>
                  <Badge className={`text-[9px] font-black uppercase shrink-0 border-none ${
                    a.status === "confirmed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40"
                    : a.status === "completed" ? "bg-muted text-muted-foreground"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-950/40"
                  }`}>
                    {a.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
