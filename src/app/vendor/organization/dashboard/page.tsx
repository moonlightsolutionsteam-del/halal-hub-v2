"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CircleDollarSign, Users, CalendarDays, Activity, ArrowUpRight, Megaphone } from "lucide-react"
import Link from "next/link"

const kpis = [
  { label: "Donations This Month", value: "₹89,450", trend: "+15.4% from last month", icon: CircleDollarSign },
  { label: "Volunteers", value: "+312", trend: "+24 this month", icon: Users },
  { label: "Active Programs", value: "+8", trend: "+1 this week", icon: CalendarDays },
  { label: "Community Reach", value: "+4,120", trend: "+9% from last month", icon: Activity },
]

const recentDonations = [
  { name: "Zainab Corp Foundation", campaign: "Education Fund", amount: "₹25,000" },
  { name: "Bilal Ahmed", campaign: "Orphan Care", amount: "₹3,000" },
  { name: "Anonymous", campaign: "General Fund", amount: "₹8,500" },
]

export default function OrganizationDashboardPage() {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Organization Dashboard</h1>
        <p className="text-sm font-bold text-muted-foreground">Here&apos;s how your organization is doing today.</p>
      </div>

      <Card className="rounded-[2rem] border-none shadow-soft">
        <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1 space-y-2 w-full">
            <div className="flex items-center justify-between">
              <p className="text-sm font-black text-foreground">Profile Completion</p>
              <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">60%</span>
            </div>
            <Progress value={60} className="h-2" />
          </div>
          <Link href="/vendor/organization/profile">
            <Button className="rounded-full shrink-0">Complete Profile</Button>
          </Link>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="rounded-[2rem] border-none shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">{kpi.label}</CardTitle>
              <kpi.icon className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-foreground">{kpi.value}</div>
              <p className="text-xs font-bold text-primary mt-1">{kpi.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-[2rem] border-none shadow-soft">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-black">Recent Donations</CardTitle>
            <p className="text-xs text-muted-foreground font-medium mt-1">Recent contributions to your causes.</p>
          </div>
          <Link href="/vendor/organization/donations">
            <Button size="sm" variant="outline" className="rounded-full">View All<ArrowUpRight className="h-4 w-4 ml-1" /></Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-1">
          {recentDonations.map((d, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-muted/50 transition-colors">
              <p className="text-sm font-bold text-foreground">{d.name}</p>
              <Badge variant="secondary" className="hidden sm:inline-flex">{d.campaign}</Badge>
              <span className="text-sm font-black text-foreground">{d.amount}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
