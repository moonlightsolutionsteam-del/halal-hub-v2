"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CircleDollarSign, Users, CalendarDays, Activity, ArrowUpRight, Megaphone } from "lucide-react"
import Link from "next/link"

const kpis = [
  { label: "Total Donations", value: "₹45,231", trend: "+20.1% from last month", icon: CircleDollarSign },
  { label: "Community Members", value: "+2,350", trend: "+180 from last month", icon: Users },
  { label: "Active Events", value: "+5", trend: "+2 this week", icon: CalendarDays },
  { label: "Engagement", value: "+1,234", trend: "+19% from last month", icon: Activity },
]

const recentDonations = [
  { name: "Ahmed Khan", email: "ahmed.k@example.com", campaign: "Renovation", amount: "₹5,000" },
  { name: "Fatima Al-Sayed", email: "fatima.s@example.com", campaign: "Education", amount: "₹1,000" },
  { name: "Yusuf Ibrahim", email: "yusuf.i@example.com", campaign: "Renovation", amount: "₹2,500" },
]

const announcements = [
  { title: "Eid Prayer Timings", time: "1 day ago" },
  { title: "Weekly Tafsir Session Cancelled", time: "3 days ago" },
  { title: "Ramadan Iftar Drive Starting Soon", time: "1 week ago" },
]

export default function MosqueDashboardPage() {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Masjid Dashboard</h1>
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
            {recentDonations.map((d, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-muted/50 transition-colors">
                <div>
                  <p className="text-sm font-bold text-foreground">{d.name}</p>
                  <p className="text-xs text-muted-foreground hidden sm:block">{d.email}</p>
                </div>
                <Badge variant="secondary" className="hidden sm:inline-flex">{d.campaign}</Badge>
                <span className="text-sm font-black text-foreground">{d.amount}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-none shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg font-black">Recent Announcements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {announcements.map((a, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center shrink-0">
                  <Megaphone className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground leading-tight">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
