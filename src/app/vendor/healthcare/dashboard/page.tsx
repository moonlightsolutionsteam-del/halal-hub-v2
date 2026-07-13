
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Wallet, Stethoscope, Calendar, Users,
  Star, ShieldCheck,
  ArrowUpRight, PlusCircle, Settings,
  Pill, HeartPulse
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

type Business = { id: string; name: string; rating: number | null; review_count: number | null }
type ApptRow = { id: string; guest_count: number; reservation_date: string; time_slot: string; status: string; profiles: { name: string | null } | null }
type ReviewRow = { id: string; rating: number; body: string | null; profiles: { name: string | null } | null }

export default function HealthcareDashboard() {
  const { user, loading: authLoading } = useAuth()
  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState<ApptRow[]>([])
  const [upcomingCount, setUpcomingCount] = useState(0)
  const [patientCount, setPatientCount] = useState(0)
  const [latestReview, setLatestReview] = useState<ReviewRow | null>(null)

  useEffect(() => {
    if (authLoading) return
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    ;(supabase as any).from("businesses").select("id, name, rating, review_count").eq("owner_id", user.uid).limit(1)
      .then(({ data }: { data: Business[] | null }) => {
        const biz = data?.[0] ?? null
        setBusiness(biz)
        setLoading(false)
        if (!biz) return

        ;(supabase as any).from("business_reservations").select("id, guest_count, reservation_date, time_slot, status, profiles(name)")
          .eq("business_id", biz.id).order("reservation_date", { ascending: true }).limit(5)
          .then(({ data }: { data: ApptRow[] | null }) => setAppointments(data ?? []))

        ;(supabase as any).from("business_reservations").select("id", { count: "exact", head: true })
          .eq("business_id", biz.id).eq("status", "pending")
          .then(({ count }: { count: number | null }) => setUpcomingCount(count ?? 0))

        ;(supabase as any).from("business_reservations").select("user_id", { count: "exact", head: true })
          .eq("business_id", biz.id)
          .then(({ count }: { count: number | null }) => setPatientCount(count ?? 0))

        ;(supabase as any).from("business_reviews").select("id, rating, body, profiles(name)")
          .eq("business_id", biz.id).eq("status", "published").order("created_at", { ascending: false }).limit(1).maybeSingle()
          .then(({ data }: { data: ReviewRow | null }) => setLatestReview(data))
      })
  }, [user?.uid, authLoading])

  if (loading) {
    return <div className="p-8 flex items-center justify-center min-h-screen"><div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
  }

  if (!business) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-screen gap-6 text-center">
        <h1 className="text-2xl font-black text-foreground">No Clinic Listed Yet</h1>
        <p className="text-muted-foreground font-medium max-w-sm">Register your clinic to access this dashboard.</p>
        <Link href="/partner/onboarding/business/category">
          <Button className="rounded-2xl h-14 px-10 font-black bg-primary text-white shadow-lg">Register Your Clinic</Button>
        </Link>
      </div>
    )
  }

  const kpis = [
    { label: "Upcoming Appts", value: String(upcomingCount), trend: "Action required", icon: Calendar, variant: upcomingCount > 0 ? "destructive" as const : undefined },
    { label: "Total Patients", value: String(patientCount), trend: "All-time bookings", icon: Users },
    { label: "Avg. Review", value: business.rating ? business.rating.toFixed(1) : "—", trend: `from ${business.review_count ?? 0} reviews`, icon: Star },
    { label: "Halal Verified", value: business.rating ? "Yes" : "Pending", trend: "Ethical care audit", icon: ShieldCheck },
  ];

  const quickActions = [
    { label: "Patient Records", icon: Users, color: "text-blue-500", bg: "bg-blue-50", href: "/vendor/healthcare/patients" },
    { label: "Services", icon: HeartPulse, color: "text-purple-500", bg: "bg-purple-50", href: "/vendor/healthcare/services" },
    { label: "Staff", icon: Stethoscope, color: "text-amber-500", bg: "bg-amber-50", href: "/vendor/healthcare/staff" },
    { label: "Settings", icon: Settings, color: "text-muted-foreground", bg: "bg-muted", href: "/vendor/healthcare/profile" },
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen pb-24">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">{business.name}</h1>
        <p className="text-muted-foreground font-medium opacity-60">Manage clinical appointments and patient wellness.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl bg-card p-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-tighter">{kpi.label}</span>
              <kpi.icon className={`h-4 w-4 ${kpi.variant === 'destructive' ? 'text-red-400' : 'text-muted-foreground'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-black ${kpi.variant === 'destructive' ? 'text-red-600' : 'text-foreground'}`}>
                {kpi.value}
              </div>
              <p className={`text-[10px] font-bold mt-1 uppercase tracking-tight ${kpi.variant === 'destructive' ? 'text-red-400' : 'text-emerald-600'}`}>
                {kpi.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-card">
            <CardHeader className="p-8 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-black">Upcoming Appointments</CardTitle>
              <Link href="/vendor/healthcare/appointments">
                <Button size="sm" className="bg-teal-600 hover:bg-teal-700 rounded-full font-black text-xs px-6 h-10 text-white">
                  Full Calendar <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              {appointments.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground py-10">No appointments yet.</p>
              ) : (
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow className="border-none">
                      <TableHead className="px-8 h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Patient</TableHead>
                      <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Date</TableHead>
                      <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Time</TableHead>
                      <TableHead className="text-right px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appt) => (
                      <TableRow key={appt.id} className="border-border hover:bg-muted/50 transition-colors group">
                        <TableCell className="px-8 py-5 font-bold text-foreground text-sm">{appt.profiles?.name ?? "Patient"}</TableCell>
                        <TableCell className="font-bold text-muted-foreground text-xs">{appt.reservation_date}</TableCell>
                        <TableCell className="font-bold text-muted-foreground text-sm">{appt.time_slot}</TableCell>
                        <TableCell className="text-right px-8">
                          <Badge variant="outline" className="rounded-full px-4 text-[9px] font-black uppercase border-teal-200 text-teal-600 bg-teal-50/50 capitalize">
                            {appt.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <section className="space-y-4">
            <h2 className="text-xl font-black px-2">Clinical Management</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickActions.map((action, i) => (
                <Link key={i} href={action.href} className="group flex flex-col items-center justify-center p-6 bg-card rounded-[2rem] shadow-sm hover:shadow-md transition-all border border-transparent hover:border-teal-100">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-black text-foreground uppercase tracking-tighter text-center">{action.label}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-teal-600 text-white p-8 overflow-hidden relative">
            <ShieldCheck className="absolute -top-4 -right-4 h-24 w-24 opacity-10" />
            <div className="relative z-10 space-y-4">
              <h3 className="text-xl font-black">Ethical Standards Audit</h3>
              <p className="text-sm font-medium opacity-80 leading-relaxed">
                Gain the "Shariah-Compliant Clinic" badge by verifying your privacy and hygiene protocols.
              </p>
              <Link href="/vendor/verification">
                <Button variant="secondary" className="w-full rounded-2xl font-black text-xs uppercase tracking-widest h-12 shadow-xl">Apply for Audit</Button>
              </Link>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Latest Review</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              {latestReview ? (
                <div className="p-4 bg-muted/30 rounded-2xl border-2 border-transparent hover:border-teal-100 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-card rounded-xl flex items-center justify-center text-teal-600 font-black text-xs shadow-sm">
                      {(latestReview.profiles?.name ?? "P").charAt(0)}
                    </div>
                    <p className="text-sm font-black text-foreground">{latestReview.profiles?.name ?? "Patient"}</p>
                  </div>
                  {latestReview.body && <p className="text-[11px] text-muted-foreground font-medium italic mt-3 line-clamp-2 leading-relaxed">"{latestReview.body}"</p>}
                  <div className="flex gap-0.5 mt-2">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className={`h-3 w-3 ${s < latestReview.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No reviews yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
