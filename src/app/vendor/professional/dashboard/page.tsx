"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarCheck, Users, Star, ArrowUpRight, MessageSquare } from "lucide-react"
import Link from "next/link"

const kpis = [
  { label: "Appointments (Month)", value: "150", trend: "+20 from last month", icon: CalendarCheck },
  { label: "New Clients (Month)", value: "35", trend: "+5 from last month", icon: Users },
  { label: "Average Rating", value: "4.9", trend: "120 reviews", icon: Star },
  { label: "New Enquiries", value: "+12", trend: "3 unread", icon: MessageSquare },
]

const upcomingAppointments = [
  { client: "Aisha Khan", service: "General Check-up", time: "Tomorrow, 10:00 AM" },
  { client: "Yusuf Ibrahim", service: "Follow-up Consultation", time: "Friday, 2:00 PM" },
  { client: "Maryam Siddiqui", service: "First Consultation", time: "Monday, 11:30 AM" },
]

export default function ProfessionalDashboardPage() {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline text-foreground tracking-tight">Practice Dashboard</h1>
        <p className="text-sm font-bold text-muted-foreground">Welcome to your professional services management panel.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="rounded-[2rem] border-none shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">{kpi.label}</CardTitle>
              <kpi.icon className="h-4 w-4 text-violet-600" />
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
            <CardTitle className="text-lg font-black">Upcoming Appointments</CardTitle>
            <p className="text-xs text-muted-foreground font-medium mt-1">Your next scheduled consultations.</p>
          </div>
          <Link href="/vendor/professional/bookings">
            <Button size="sm" variant="outline" className="rounded-full">View All<ArrowUpRight className="h-4 w-4 ml-1" /></Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-1">
          {upcomingAppointments.map((a, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-muted/50 transition-colors">
              <div>
                <p className="text-sm font-bold text-foreground">{a.client}</p>
                <p className="text-xs text-muted-foreground">{a.service}</p>
              </div>
              <Badge variant="secondary">{a.time}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
