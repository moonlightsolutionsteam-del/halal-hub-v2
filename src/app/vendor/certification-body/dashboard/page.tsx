"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Award, Users, FileText, Microscope, Wallet,
  AlertCircle, Star, ArrowUpRight, Settings,
  ShieldCheck, Clock, CheckCircle2, ChevronRight,
  ClipboardList, Building2, BadgeCheck
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/hooks/use-auth"
import { createClient } from "@/lib/supabase/client"

type Business = { id: string; name: string; rating: number | null; review_count: number | null }

const MOCK_REQUESTS = [
  { id: "REQ-001", name: "Al-Noor Catering", vertical: "Catering", submitted: "2024-12-01", status: "pending" },
  { id: "REQ-002", name: "Pure Life Cosmetics", vertical: "Cosmetics", submitted: "2024-11-28", status: "in_audit" },
  { id: "REQ-003", name: "Medina Meats", vertical: "Butcher", submitted: "2024-11-20", status: "certified" },
  { id: "REQ-004", name: "Zam Zam Finance", vertical: "Finance", submitted: "2024-11-15", status: "certified" },
  { id: "REQ-005", name: "Barakah Grocers", vertical: "Grocery", submitted: "2024-11-10", status: "renewal" },
]

const STATUS_STYLES: Record<string, string> = {
  pending:    "bg-amber-50 text-amber-600 border-amber-200",
  in_audit:   "bg-blue-50 text-blue-600 border-blue-200",
  certified:  "bg-emerald-50 text-emerald-600 border-emerald-200",
  renewal:    "bg-purple-50 text-purple-600 border-purple-200",
}

const STATUS_LABELS: Record<string, string> = {
  pending:   "Pending",
  in_audit:  "In Audit",
  certified: "Certified",
  renewal:   "Renewal",
}

export default function CertificationBodyVendorDashboard() {
  const { user, loading: authLoading } = useAuth()
  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    ;(supabase as any)
      .from("businesses")
      .select("id, name, rating, review_count")
      .eq("owner_id", user.uid)
      .limit(1)
      .then(({ data }: { data: Business[] | null }) => {
        setBusiness(data?.[0] ?? null)
        setLoading(false)
      })
  }, [user?.uid, authLoading])

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!business) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-screen gap-6 text-center">
        <div className="h-20 w-20 rounded-[2rem] bg-primary/10 flex items-center justify-center">
          <Award className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-2xl font-black text-foreground">Not Listed Yet</h1>
        <p className="text-muted-foreground font-medium max-w-sm">
          Register your certification body on Halal Hub to start receiving and managing certification requests.
        </p>
        <Link href="/partner/onboarding/business/category">
          <Button className="rounded-2xl h-14 px-10 font-black bg-primary text-white shadow-lg">
            Register Your Body
          </Button>
        </Link>
      </div>
    )
  }

  const pending   = MOCK_REQUESTS.filter(r => r.status === "pending").length
  const inAudit   = MOCK_REQUESTS.filter(r => r.status === "in_audit").length
  const certified = MOCK_REQUESTS.filter(r => r.status === "certified").length

  const kpis = [
    { label: "Pending Requests", value: String(pending),   trend: "Awaiting review",    icon: AlertCircle,    accent: pending > 0 ? "text-amber-600" : "text-muted-foreground", bg: pending > 0 ? "bg-amber-50" : "bg-muted" },
    { label: "Active Audits",    value: String(inAudit),   trend: "Currently in audit", icon: Microscope,     accent: "text-blue-600",    bg: "bg-blue-50" },
    { label: "Certs Issued",     value: String(certified), trend: "Total certifications",icon: BadgeCheck,     accent: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Your Rating",      value: business.rating ? business.rating.toFixed(1) : "—", trend: `from ${business.review_count ?? 0} reviews`, icon: Star, accent: "text-amber-500", bg: "bg-amber-50" },
  ]

  const quickActions = [
    { label: "Clients",      icon: Users,         bg: "bg-blue-50",    color: "text-blue-600",    href: "/vendor/certification-body/clients" },
    { label: "Audits",       icon: Microscope,    bg: "bg-indigo-50",  color: "text-indigo-600",  href: "/vendor/certification-body/audits" },
    { label: "Certificates", icon: FileText,      bg: "bg-emerald-50", color: "text-emerald-600", href: "/vendor/certification-body/certificates" },
    { label: "Settings",     icon: Settings,      bg: "bg-muted",      color: "text-muted-foreground", href: "/vendor/certification-body/profile" },
  ]

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest">
            <Award className="h-3 w-3" /> Certification Body
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">{business.name}</h1>
          <p className="text-muted-foreground font-medium text-sm">
            Manage your certification clients, audits, and Halal Hub profile.
          </p>
        </div>
        <Link href="/vendor/certification-body/requests">
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-2xl h-12 px-8 font-black shadow-lg gap-2">
            <ClipboardList className="h-4 w-4" /> View All Requests
          </Button>
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {kpis.map((kpi, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl bg-card p-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-tighter">{kpi.label}</span>
              <div className={`h-8 w-8 rounded-xl flex items-center justify-center ${kpi.bg}`}>
                <kpi.icon className={`h-4 w-4 ${kpi.accent}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-foreground">{kpi.value}</div>
              <p className="text-[10px] font-bold mt-1 uppercase tracking-tight text-muted-foreground">{kpi.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">

          {/* Certification Requests Table */}
          <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-card">
            <CardHeader className="p-6 sm:p-8 flex flex-row items-center justify-between border-b">
              <CardTitle className="text-xl font-black">Recent Requests</CardTitle>
              <Link href="/vendor/certification-body/requests">
                <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full font-black text-xs px-6 h-10 gap-1">
                  All Requests <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-6 sm:px-8 h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Business</TableHead>
                    <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:table-cell">Vertical</TableHead>
                    <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:table-cell">Submitted</TableHead>
                    <TableHead className="text-right px-6 sm:px-8 h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_REQUESTS.map((req) => (
                    <TableRow key={req.id} className="border-border hover:bg-muted/50 transition-colors group">
                      <TableCell className="px-6 sm:px-8 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-xs shrink-0">
                            {req.name[0]}
                          </div>
                          <div>
                            <p className="font-black text-foreground text-sm">{req.name}</p>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">{req.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="secondary" className="bg-muted text-muted-foreground border-none font-black text-[9px] uppercase px-3">
                          {req.vertical}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs font-bold text-muted-foreground hidden sm:table-cell">{req.submitted}</TableCell>
                      <TableCell className="text-right px-6 sm:px-8">
                        <Badge variant="outline" className={`font-black text-[9px] uppercase px-3 ${STATUS_STYLES[req.status]}`}>
                          {STATUS_LABELS[req.status]}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 sm:p-8">
            <CardHeader className="px-0 pt-0 pb-4">
              <CardTitle className="text-xl font-black">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="px-0 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickActions.map((action, i) => (
                <Link
                  key={i}
                  href={action.href}
                  className="group flex flex-col items-center justify-center p-6 bg-muted/50 rounded-[2rem] hover:bg-card hover:shadow-md transition-all border border-transparent hover:border-primary/10"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-black text-foreground uppercase tracking-tighter text-center">{action.label}</span>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right panel */}
        <div className="space-y-6 sm:space-y-8">

          {/* Halal Hub Status */}
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-6 sm:p-8 space-y-6">
            <CardHeader className="px-0 pt-0 pb-0">
              <CardTitle className="text-xl font-black">Halal Hub Status</CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-4">
              {[
                { label: "Profile Listed",       done: true  },
                { label: "Accreditation Docs",   done: true  },
                { label: "Halal Hub Verified",   done: false },
                { label: "Premium Partner",      done: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">{item.label}</span>
                  {item.done
                    ? <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    : <Clock className="h-5 w-5 text-muted-foreground" />
                  }
                </div>
              ))}
              <Link href="/vendor/certification-body/profile" className="block mt-4">
                <Button variant="outline" className="w-full rounded-2xl border-2 font-black text-xs uppercase tracking-widest h-12 gap-2">
                  Complete Profile <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Halal Hub Notice */}
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-6 sm:p-8 space-y-4">
            <div className="h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black tracking-tight">Get Halal Hub Verified</h3>
              <p className="text-xs text-zinc-400 font-medium leading-relaxed">
                Verified certification bodies gain a trust badge, priority listing, and direct referrals from Halal Hub's directory.
              </p>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl h-12 font-black text-xs uppercase tracking-widest">
              Apply for Verification
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
