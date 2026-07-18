"use client"

import { useEffect, useState, useCallback } from "react"
import {
  Award, CheckCircle2, Clock, AlertTriangle, Users,
  Bell, ArrowRight, Loader2, ShieldCheck, TrendingUp, FileText
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

type DashboardData = {
  activeCerts: number
  expiringSoon: number
  pendingRequests: number
  pendingEnquiries: number
  recentCerts: Array<{ id: string; business_name: string; certificate_number: string; expiry_date: string; status: string }>
  recentRequests: Array<{ id: string; business_name: string; claimed_certificate_number: string; status: string; response_deadline: string | null }>
}

const CERT_STATUS_STYLES: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  expiring_soon: "bg-amber-50 text-amber-700 border-amber-200",
  expired: "bg-red-50 text-red-700 border-red-200",
  revoked: "bg-red-100 text-red-900 border-red-300",
}

export default function CertifierDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [bodyId, setBodyId] = useState<string | null>(null)

  const supabase = createClient()

  const load = useCallback(async () => {
    setLoading(true)
    const { data: body } = await supabase
      .from("certification_bodies")
      .select("id")
      .eq("status", "approved")
      .limit(1)
      .single()

    const id = body?.id ?? null
    setBodyId(id)

    if (!id) {
      setLoading(false)
      setData({ activeCerts: 0, expiringSoon: 0, pendingRequests: 0, pendingEnquiries: 0, recentCerts: [], recentRequests: [] })
      return
    }

    const today = new Date().toISOString().split("T")[0]
    const in30 = new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0]

    const [
      { count: activeCerts },
      { count: expiringSoon },
      { count: pendingRequests },
      { count: pendingEnquiries },
      { data: recentCerts },
      { data: recentRequests },
    ] = await Promise.all([
      supabase.from("halal_certificates").select("*", { count: "exact", head: true }).eq("certification_body_id", id).eq("status", "active"),
      supabase.from("halal_certificates").select("*", { count: "exact", head: true }).eq("certification_body_id", id).gte("expiry_date", today).lte("expiry_date", in30),
      supabase.from("certifier_verification_requests").select("*", { count: "exact", head: true }).eq("certification_body_id", id).eq("status", "pending"),
      supabase.from("certification_applications").select("*", { count: "exact", head: true }).eq("certification_body_id", id).eq("status", "submitted"),
      supabase.from("halal_certificates").select("id,business_name,certificate_number,expiry_date,status").eq("certification_body_id", id).order("created_at", { ascending: false }).limit(5),
      supabase.from("certifier_verification_requests").select("id,business_name,claimed_certificate_number,status,response_deadline").eq("certification_body_id", id).order("created_at", { ascending: false }).limit(5),
    ])

    setData({
      activeCerts: activeCerts ?? 0,
      expiringSoon: expiringSoon ?? 0,
      pendingRequests: pendingRequests ?? 0,
      pendingEnquiries: pendingEnquiries ?? 0,
      recentCerts: recentCerts ?? [],
      recentRequests: recentRequests ?? [],
    })
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const d = data!

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen pb-24">
      <div className="space-y-1">
        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Certification Body Portal</div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Dashboard</h1>
        <p className="text-muted-foreground font-medium text-sm">Overview of your certification activity and pending actions.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Certificates", value: d.activeCerts, icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50", link: "/vendor/certification-body/certificates" },
          { label: "Expiring in 30 Days", value: d.expiringSoon, icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50", link: "/vendor/certification-body/certificates" },
          { label: "Pending Verifications", value: d.pendingRequests, icon: Clock, color: "text-blue-600", bg: "bg-blue-50", link: "/vendor/certification-body/requests" },
          { label: "New Enquiries", value: d.pendingEnquiries, icon: Bell, color: "text-purple-600", bg: "bg-purple-50", link: "/vendor/certification-body/enquiries" },
        ].map((s, i) => (
          <Link key={i} href={s.link}>
            <Card className="rounded-3xl border-none shadow-sm bg-card hover:shadow-md transition-all cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2 p-5">
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{s.label}</span>
                <div className={`h-8 w-8 rounded-xl flex items-center justify-center ${s.bg}`}>
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <div className="text-3xl font-black text-foreground">{s.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Certificates */}
        <Card className="rounded-3xl border-none shadow-sm bg-card">
          <CardHeader className="p-6 pb-4 flex flex-row items-center justify-between">
            <CardTitle className="font-black text-base flex items-center gap-2">
              <Award className="h-4 w-4 text-emerald-600" /> Recent Certificates
            </CardTitle>
            <Link href="/vendor/certification-body/certificates">
              <Button variant="ghost" size="sm" className="font-black text-[10px] uppercase tracking-widest text-primary gap-1">
                View All <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="px-6 pb-6 space-y-3">
            {d.recentCerts.length === 0 ? (
              <p className="text-sm text-muted-foreground font-medium text-center py-6">No certificates issued yet.</p>
            ) : d.recentCerts.map(c => (
              <div key={c.id} className="flex items-center justify-between p-3 rounded-2xl bg-muted/40 hover:bg-muted/70 transition-colors">
                <div>
                  <p className="font-black text-sm text-foreground">{c.business_name}</p>
                  <p className="text-[10px] font-mono text-muted-foreground">{c.certificate_number}</p>
                </div>
                <div className="text-right space-y-1">
                  <Badge variant="outline" className={`text-[9px] font-black px-2 ${CERT_STATUS_STYLES[c.status] ?? ""}`}>
                    {c.status.replace("_", " ")}
                  </Badge>
                  <p className="text-[10px] text-muted-foreground font-bold">Exp: {c.expiry_date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pending Verification Requests */}
        <Card className="rounded-3xl border-none shadow-sm bg-card">
          <CardHeader className="p-6 pb-4 flex flex-row items-center justify-between">
            <CardTitle className="font-black text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" /> Verification Requests
            </CardTitle>
            <Link href="/vendor/certification-body/requests">
              <Button variant="ghost" size="sm" className="font-black text-[10px] uppercase tracking-widest text-primary gap-1">
                View All <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="px-6 pb-6 space-y-3">
            {d.recentRequests.length === 0 ? (
              <p className="text-sm text-muted-foreground font-medium text-center py-6">No pending verification requests.</p>
            ) : d.recentRequests.map(r => (
              <div key={r.id} className="flex items-center justify-between p-3 rounded-2xl bg-muted/40 hover:bg-muted/70 transition-colors">
                <div>
                  <p className="font-black text-sm text-foreground">{r.business_name}</p>
                  <p className="text-[10px] font-mono text-muted-foreground">Cert: {r.claimed_certificate_number}</p>
                </div>
                <div className="text-right space-y-1">
                  <Badge variant="outline" className={`text-[9px] font-black px-2 ${r.status === "pending" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>
                    {r.status}
                  </Badge>
                  {r.response_deadline && (
                    <p className="text-[10px] text-red-600 font-bold">Due: {new Date(r.response_deadline).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="rounded-3xl border-none shadow-sm bg-card">
        <CardHeader className="p-6 pb-4">
          <CardTitle className="font-black text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" /> Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Issue Certificate", href: "/vendor/certification-body/certificates", icon: Award, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "View Enquiries", href: "/vendor/certification-body/enquiries", icon: Bell, color: "text-purple-600", bg: "bg-purple-50" },
            { label: "Manage Clients", href: "/vendor/certification-body/businesses", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Compliance Docs", href: "/vendor/certification-body/compliance", icon: FileText, color: "text-amber-600", bg: "bg-amber-50" },
          ].map(a => (
            <Link key={a.href} href={a.href}>
              <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-muted/40 hover:bg-muted/70 transition-colors text-center cursor-pointer group">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${a.bg} group-hover:scale-110 transition-transform`}>
                  <a.icon className={`h-5 w-5 ${a.color}`} />
                </div>
                <span className="text-[10px] font-black text-foreground uppercase tracking-widest leading-tight">{a.label}</span>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
