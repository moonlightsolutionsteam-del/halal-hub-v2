"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShieldCheck, CheckCircle2, Users, FileText, ArrowUpRight, Loader2, Award } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"

type Verification = {
  id: string
  halal_status: string
  answers: Record<string, "yes" | "no" | "not-sure"> | null
  created_at: string
  user: { name: string | null } | null
}

const ANSWER_LABELS: Record<string, string> = {
  halalCertification: "Halal Certification Displayed",
  crossContamination: "Cross Contamination Risk",
  nonHalalProducts: "Non Halal Products Used",
  porkServed: "Pork Served",
  alcoholServed: "Alcohol Served",
  prayerPlace: "Prayer Place Available",
}

const POSITIVE_KEYS = ["halalCertification", "prayerPlace"]

export default function MarketingTransparencyPage() {
  const { user, loading: authLoading } = useAuth()
  const [verifications, setVerifications] = useState<Verification[]>([])
  const [loading, setLoading] = useState(true)
  const [bizId, setBizId] = useState<string | null>(null)

  useEffect(() => {
    if (authLoading) return
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()

    ;supabase
      .from("businesses")
      .select("id")
      .eq("owner_id", user.uid)
      .limit(1)
      .then(({ data }: { data: { id: string }[] | null }) => {
        const biz = data?.[0]
        if (!biz) { setLoading(false); return }
        setBizId(biz.id)

        ;supabase
          .from("business_verifications")
          .select("id, halal_status, answers, created_at, user:profiles!business_verifications_user_id_fkey(name)")
          .eq("business_id", biz.id)
          .order("created_at", { ascending: false })
          .limit(50)
          .then(({ data: rows }: { data: Verification[] | null }) => {
            setVerifications(rows ?? [])
            setLoading(false)
          })
      })
  }, [user?.uid, authLoading])

  const totalVerfications = verifications.length
  const halalCertOk = verifications.filter(v => v.answers?.halalCertification === "yes").length
  const prayerPlaceOk = verifications.filter(v => v.answers?.prayerPlace === "yes").length
  const noAlcohol = verifications.filter(v => v.answers?.alcoholServed === "no").length

  const trustScore = totalVerfications === 0 ? null :
    Math.round(((halalCertOk + noAlcohol) / (totalVerfications * 2)) * 100)

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <ShieldCheck className="h-3 w-3" /> Integrity Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">Trust & Transparency</h1>
          <p className="text-muted-foreground font-medium">Community verifications and halal compliance reports from your customers.</p>
        </div>
        <Link href="/vendor/verification">
          <Button className="bg-primary rounded-full px-8 font-black shadow-lg shadow-primary/20 h-12 text-white">
            <Award className="mr-2 h-4 w-4" /> Get Official Audit
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {[
          { label: "Community Checks", value: totalVerfications, icon: Users, color: "bg-primary text-primary-foreground" },
          { label: "Trust Score", value: trustScore !== null ? `${trustScore}%` : "—", icon: ShieldCheck, color: "bg-card" },
          { label: "Halal Cert Confirmed", value: halalCertOk, icon: CheckCircle2, color: "bg-card" },
          { label: "Prayer Space Confirmed", value: prayerPlaceOk, icon: Award, color: "bg-card" },
        ].map((stat, i) => (
          <Card key={i} className={`rounded-[2.5rem] border-none shadow-sm ${stat.color} p-5 sm:p-8`}>
            <stat.icon className={`h-5 w-5 mb-3 ${i === 0 ? "text-primary-foreground" : "text-primary"}`} />
            <p className={`text-3xl sm:text-4xl font-black ${i === 0 ? "text-primary-foreground" : "text-foreground"}`}>{stat.value}</p>
            <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${i === 0 ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{stat.label}</p>
          </Card>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : verifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="h-16 w-16 rounded-3xl bg-primary/10 flex items-center justify-center">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <p className="font-black text-lg text-foreground">No community verifications yet</p>
          <p className="text-muted-foreground font-medium text-sm">Customers can verify your halal compliance from your listing page.</p>
          {bizId && (
            <Link href={`/entities/${bizId}`}>
              <Button variant="outline" className="rounded-full px-6 font-bold mt-2">
                <ArrowUpRight className="mr-2 h-4 w-4" /> View Your Listing
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden">
          <CardHeader className="p-6 sm:p-8 border-b">
            <CardTitle className="text-xl font-black">Community Verification Log</CardTitle>
            <p className="text-sm text-muted-foreground font-medium">Recent halal compliance checks submitted by customers.</p>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-border">
            {verifications.slice(0, 20).map(v => {
              const date = new Date(v.created_at).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })
              const positives = Object.entries(v.answers ?? {}).filter(([key, val]) =>
                POSITIVE_KEYS.includes(key) ? val === "yes" : val === "no"
              ).length
              const total = Object.keys(v.answers ?? {}).length
              return (
                <div key={v.id} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-black text-foreground text-sm">{v.user?.name ?? "Anonymous Customer"}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">{date}</p>
                      {v.halal_status && (
                        <Badge className="mt-1.5 bg-emerald-50 text-emerald-700 border-none font-black text-[9px] uppercase px-2">{v.halal_status}</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pl-14 sm:pl-0">
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Score</p>
                      <p className="text-xl font-black text-emerald-600">{total > 0 ? `${Math.round((positives / total) * 100)}%` : "—"}</p>
                    </div>
                    <Badge className="bg-emerald-50 text-emerald-600 border-none px-3 h-7 font-black uppercase text-[9px] tracking-widest">
                      <CheckCircle2 className="h-2.5 w-2.5 mr-1" /> Verified
                    </Badge>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
