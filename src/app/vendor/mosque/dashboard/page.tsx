"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CircleDollarSign, Users, CalendarDays, Activity, ArrowUpRight, Megaphone } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { createClient } from "@/lib/supabase/client"

type Business = { id: string; name: string }
type DonationRow = { id: string; amount: number; purpose: string | null; created_at: string; profiles: { name: string | null } | null }
type AnnouncementRow = { id: string; title: string; created_at: string }

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const d = Math.floor(diff / 86400000)
  if (d > 0) return `${d}d ago`
  const h = Math.floor(diff / 3600000)
  if (h > 0) return `${h}h ago`
  return "Just now"
}

export default function MosqueDashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)
  const [donations, setDonations] = useState<DonationRow[]>([])
  const [totalDonations, setTotalDonations] = useState(0)
  const [checkInCount, setCheckInCount] = useState(0)
  const [announcements, setAnnouncements] = useState<AnnouncementRow[]>([])

  useEffect(() => {
    if (authLoading) return
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    ;(supabase as any).from("businesses").select("id, name").eq("owner_id", user.uid).limit(1)
      .then(({ data }: { data: Business[] | null }) => {
        const biz = data?.[0] ?? null
        setBusiness(biz)
        setLoading(false)
        if (!biz) return

        ;(supabase as any).from("business_donations").select("id, amount, purpose, created_at, profiles(name)")
          .eq("business_id", biz.id).order("created_at", { ascending: false }).limit(5)
          .then(({ data }: { data: DonationRow[] | null }) => setDonations(data ?? []))

        ;(supabase as any).from("business_donations").select("amount").eq("business_id", biz.id).eq("status", "completed")
          .then(({ data }: { data: { amount: number }[] | null }) => setTotalDonations((data ?? []).reduce((s, r) => s + Number(r.amount), 0)))

        ;(supabase as any).from("check_ins").select("id", { count: "exact", head: true }).eq("business_id", biz.id)
          .then(({ count }: { count: number | null }) => setCheckInCount(count ?? 0))

        ;(supabase as any).from("business_announcements").select("id, title, created_at")
          .eq("business_id", biz.id).order("created_at", { ascending: false }).limit(3)
          .then(({ data }: { data: AnnouncementRow[] | null }) => setAnnouncements(data ?? []))
      })
  }, [user?.uid, authLoading])

  if (loading) {
    return <div className="p-8 flex items-center justify-center min-h-screen"><div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
  }

  if (!business) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-screen gap-6 text-center">
        <h1 className="text-2xl font-black text-foreground">No Masjid Listed Yet</h1>
        <p className="text-muted-foreground font-medium max-w-sm">Register your masjid to access this dashboard.</p>
        <Link href="/partner/onboarding/business/category">
          <Button className="rounded-2xl h-14 px-10 font-black bg-primary text-white shadow-lg">Register Your Masjid</Button>
        </Link>
      </div>
    )
  }

  const kpis = [
    { label: "Total Donations", value: `₹${totalDonations.toLocaleString("en-IN")}`, trend: "All-time contributions", icon: CircleDollarSign },
    { label: "Check-ins", value: String(checkInCount), trend: "Community visits", icon: Users },
    { label: "Announcements", value: String(announcements.length), trend: "Recent posts", icon: CalendarDays },
    { label: "Engagement", value: String(donations.length + checkInCount), trend: "Total activity", icon: Activity },
  ]

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">{business.name}</h1>
        <p className="text-sm font-bold text-muted-foreground">Here&apos;s what&apos;s happening at your masjid today.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="rounded-[2rem] border-none shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">{kpi.label}</CardTitle>
              <kpi.icon className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-foreground">{kpi.value}</div>
              <p className="text-xs font-bold text-primary mt-1">{kpi.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 rounded-[2rem] border-none shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-black">Recent Donations</CardTitle>
              <p className="text-xs text-muted-foreground font-medium mt-1">Recent contributions from your community.</p>
            </div>
            <Link href="/vendor/mosque/donations">
              <Button size="sm" variant="outline" className="rounded-full">View All<ArrowUpRight className="h-4 w-4 ml-1" /></Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-1">
            {donations.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No donations yet.</p>
            ) : donations.map((d) => (
              <div key={d.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-muted/50 transition-colors">
                <div>
                  <p className="text-sm font-bold text-foreground">{d.profiles?.name ?? "Anonymous"}</p>
                  <p className="text-xs text-muted-foreground hidden sm:block">{timeAgo(d.created_at)}</p>
                </div>
                {d.purpose && <Badge variant="secondary" className="hidden sm:inline-flex">{d.purpose}</Badge>}
                <span className="text-sm font-black text-foreground">₹{Number(d.amount).toLocaleString("en-IN")}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-none shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg font-black">Recent Announcements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {announcements.length === 0 ? (
              <p className="text-sm text-muted-foreground">No announcements yet.</p>
            ) : announcements.map((a) => (
              <div key={a.id} className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center shrink-0">
                  <Megaphone className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground leading-tight">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{timeAgo(a.created_at)}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
