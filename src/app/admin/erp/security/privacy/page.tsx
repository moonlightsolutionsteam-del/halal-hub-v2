"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

const DPDP_CHECKLIST = [
  { id: "notice", label: "Privacy Notice", desc: "Users are informed of data collection purpose at collection point.", category: "Transparency" },
  { id: "consent", label: "Consent Mechanism", desc: "Explicit consent obtained before processing sensitive personal data.", category: "Consent" },
  { id: "withdraw", label: "Consent Withdrawal", desc: "Users can withdraw consent at any time without penalty.", category: "Consent" },
  { id: "purpose", label: "Purpose Limitation", desc: "Data used only for purposes for which consent was given.", category: "Purpose" },
  { id: "retention", label: "Data Retention Policy", desc: "Retention periods defined and data erased when no longer needed.", category: "Retention" },
  { id: "access", label: "Data Access Request", desc: "Users can request a copy of their personal data within 30 days.", category: "Rights" },
  { id: "correction", label: "Data Correction Request", desc: "Users can request correction of inaccurate personal data.", category: "Rights" },
  { id: "erasure", label: "Right to Erasure", desc: "Users can request deletion of their personal data.", category: "Rights" },
  { id: "grievance", label: "Grievance Officer Appointed", desc: "Data Fiduciary has appointed a Grievance Officer with published contact.", category: "Accountability" },
  { id: "breach", label: "Breach Notification Procedure", desc: "Process to notify Data Protection Board and affected users within 72 hours.", category: "Security" },
  { id: "dpia", label: "DPIA Process", desc: "Data Protection Impact Assessment conducted for high-risk processing.", category: "Security" },
  { id: "minors", label: "Child Data Safeguards", desc: "Verifiable parental consent obtained before processing data of minors.", category: "Special Categories" },
]

type CheckState = Record<string, boolean>

export default function PrivacyPage() {
  const [checks, setChecks] = React.useState<CheckState>({})
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const supabase = createClient()
    supabase.from("erp_dpdp_checks").select("id, completed").then(({ data }) => {
      const state: CheckState = {}
      for (const row of data ?? []) state[row.id] = row.completed
      setChecks(state)
      setLoading(false)
    })
  }, [])

  async function toggle(id: string) {
    const next = !checks[id]
    setChecks(p => ({ ...p, [id]: next }))
    const supabase = createClient()
    await supabase.from("erp_dpdp_checks").upsert({ id, completed: next }, { onConflict: "id" })
  }

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  const done = DPDP_CHECKLIST.filter(c => checks[c.id]).length
  const pct = Math.round((done / DPDP_CHECKLIST.length) * 100)
  const categories = [...new Set(DPDP_CHECKLIST.map(c => c.category))]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline">DPDP Compliance</h1>
        <p className="text-muted-foreground text-sm">Digital Personal Data Protection Act 2023 — self-assessment checklist.</p>
      </div>

      <Card>
        <CardContent className="pt-4 pb-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-black">Overall Compliance</p>
            <p className="text-sm font-black tabular-nums">{done}/{DPDP_CHECKLIST.length} <span className="text-muted-foreground font-normal">({pct}%)</span></p>
          </div>
          <div className="h-2.5 rounded-full bg-muted overflow-hidden">
            <div className={`h-full rounded-full transition-all ${pct === 100 ? "bg-emerald-500" : pct >= 70 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${pct}%` }} />
          </div>
        </CardContent>
      </Card>

      {categories.map(cat => (
        <div key={cat} className="space-y-2">
          <h2 className="text-xs font-black text-muted-foreground uppercase tracking-widest">{cat}</h2>
          {DPDP_CHECKLIST.filter(c => c.category === cat).map(item => (
            <Card key={item.id} className={checks[item.id] ? "opacity-70" : ""}>
              <CardContent className="p-4 flex items-start gap-3">
                <button
                  onClick={() => toggle(item.id)}
                  className={`mt-0.5 h-5 w-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${checks[item.id] ? "bg-emerald-600 border-emerald-600" : "border-muted-foreground/40"}`}
                >
                  {checks[item.id] && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L4 7L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </button>
                <div>
                  <p className={`text-sm font-bold ${checks[item.id] ? "line-through text-muted-foreground" : ""}`}>{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ))}
    </div>
  )
}
