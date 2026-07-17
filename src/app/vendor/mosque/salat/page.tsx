"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Clock, Loader2, CheckCircle2 } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

const PRAYER_KEYS = ["fajr", "dhuhr", "asr", "maghrib", "isha", "jumuah"] as const
const PRAYER_LABELS: Record<string, string> = {
  fajr: "Fajr", dhuhr: "Dhuhr", asr: "Asr",
  maghrib: "Maghrib", isha: "Isha", jumuah: "Jumu'ah (Friday)"
}

type PrayerTimes = Record<string, string>

export default function MosqueSalatPage() {
  const { user, loading: authLoading } = useAuth()
  const { toast } = useToast()
  const [bizId, setBizId] = useState<string | null>(null)
  const [times, setTimes] = useState<PrayerTimes>({})
  const [iqamah, setIqamah] = useState<PrayerTimes>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (authLoading) return
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    ;supabase
      .from("businesses")
      .select("id, prayer_times")
      .eq("owner_id", user.uid)
      .limit(1)
      .then(({ data }: { data: { id: string; prayer_times: any }[] | null }) => {
        const biz = data?.[0]
        if (!biz) { setLoading(false); return }
        setBizId(biz.id)
        const pt = biz.prayer_times ?? {}
        const azan: PrayerTimes = {}
        const iqm: PrayerTimes = {}
        for (const key of PRAYER_KEYS) {
          azan[key] = pt[key] ?? ""
          iqm[key] = pt[`iqamah_${key}`] ?? ""
        }
        setTimes(azan)
        setIqamah(iqm)
        setLoading(false)
      })
  }, [user?.uid, authLoading])

  const save = async () => {
    if (!bizId) return
    setSaving(true)
    const supabase = createClient()
    const pt: PrayerTimes = {}
    for (const key of PRAYER_KEYS) {
      if (times[key]) pt[key] = times[key]
      if (iqamah[key]) pt[`iqamah_${key}`] = iqamah[key]
    }
    const { error } = await supabase
      .from("businesses")
      .update({ prayer_times: pt })
      .eq("id", bizId)
    setSaving(false)
    if (error) {
      toast({ variant: "destructive", title: "Save failed", description: error.message })
    } else {
      toast({ title: "Salat times saved", description: "Your prayer schedule has been updated on your listing." })
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Salat Timings</h1>
        <p className="text-sm font-bold text-muted-foreground">Update the Azan and Iqamah times for daily prayers.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Card className="rounded-[2rem] border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-black flex items-center gap-2">
              <Clock className="h-5 w-5 text-teal-600" />
              Edit Salat Timings
            </CardTitle>
            <CardDescription>These timings will show on your masjid&apos;s public listing and prayer widget.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {PRAYER_KEYS.map(key => (
              <div key={key} className="p-4 rounded-2xl bg-muted/50">
                <h3 className="text-base font-black text-foreground mb-3">{PRAYER_LABELS[key]}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor={`${key}-azan`}>Azan Time</Label>
                    <Input
                      id={`${key}-azan`}
                      type="time"
                      value={times[key] ?? ""}
                      onChange={e => setTimes(prev => ({ ...prev, [key]: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor={`${key}-iqamah`}>Iqamah Time</Label>
                    <Input
                      id={`${key}-iqamah`}
                      type="time"
                      value={iqamah[key] ?? ""}
                      onChange={e => setIqamah(prev => ({ ...prev, [key]: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button onClick={save} disabled={saving || !bizId} className="w-full rounded-full h-12 font-bold">
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CheckCircle2 className="h-4 w-4 mr-2" />}
              Save Changes
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
