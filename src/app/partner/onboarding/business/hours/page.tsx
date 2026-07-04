"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useOnboarding, BusinessHours } from "@/lib/onboarding-context"
import { ArrowRight, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const TIME_SLOTS = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2)
  const m = i % 2 === 0 ? "00" : "30"
  const label = `${h === 0 ? 12 : h > 12 ? h - 12 : h}:${m} ${h < 12 ? "AM" : "PM"}`
  const value = `${String(h).padStart(2, "0")}:${m}`
  return { label, value }
})

export default function HoursPage() {
  const router = useRouter()
  const { draft, update } = useOnboarding()

  function updateDay(day: string, patch: Partial<BusinessHours>) {
    update({ hours: { ...draft.hours, [day]: { ...draft.hours[day], ...patch } } })
  }

  function copyToAll(sourceDay: string) {
    const source = draft.hours[sourceDay]
    const updated = Object.fromEntries(DAYS.map(d => [d, { ...source }]))
    update({ hours: updated })
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Step 4 of 8</p>
        <h1 className="text-3xl font-black font-headline text-foreground flex items-center gap-3">
          <Clock className="h-8 w-8 text-primary" /> Operating Hours
        </h1>
        <p className="text-sm text-muted-foreground font-medium">Set your opening times. Customers rely on this to plan their visits.</p>
      </div>

      <Card className="rounded-[2rem] border-none shadow-soft bg-card">
        <CardContent className="p-8 space-y-4">
          {DAYS.map((day) => {
            const h = draft.hours[day] || { open: "09:00", close: "21:00", closed: false }
            return (
              <div key={day} className={cn("rounded-2xl transition-all", h.closed ? "bg-muted/50 opacity-60" : "bg-muted/30")}>
                <div className="flex items-center gap-4 p-4">
                  <div className="w-28 shrink-0">
                    <p className="font-black text-sm text-foreground">{day}</p>
                  </div>
                  <div className="flex-1 flex items-center gap-3 flex-wrap">
                    {!h.closed ? (
                      <>
                        <select
                          value={h.open}
                          onChange={(e) => updateDay(day, { open: e.target.value })}
                          className="h-9 rounded-xl bg-card border border-border text-xs font-bold px-2 text-foreground flex-1 min-w-[100px]"
                        >
                          {TIME_SLOTS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                        </select>
                        <span className="text-xs font-black text-muted-foreground">to</span>
                        <select
                          value={h.close}
                          onChange={(e) => updateDay(day, { close: e.target.value })}
                          className="h-9 rounded-xl bg-card border border-border text-xs font-bold px-2 text-foreground flex-1 min-w-[100px]"
                        >
                          {TIME_SLOTS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                        </select>
                        {day === "Monday" && (
                          <button
                            onClick={() => copyToAll("Monday")}
                            className="text-[10px] font-black text-primary uppercase tracking-wider whitespace-nowrap hover:underline"
                          >
                            Copy to all
                          </button>
                        )}
                      </>
                    ) : (
                      <span className="text-xs font-black text-muted-foreground uppercase tracking-wider">Closed</span>
                    )}
                  </div>
                  <Switch
                    checked={!h.closed}
                    onCheckedChange={(open) => updateDay(day, { closed: !open })}
                  />
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <div className="flex justify-between gap-4">
        <Button variant="outline" className="rounded-2xl h-14 px-8 border-2 font-black uppercase text-xs tracking-widest" onClick={() => router.back()}>
          Back
        </Button>
        <Button className="rounded-2xl h-14 px-10 font-black bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 flex-1" onClick={() => { update({ currentStep: 4 }); router.push("/partner/onboarding/business/contact") }}>
          Continue to Contact <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
