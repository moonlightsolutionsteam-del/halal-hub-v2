"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Clock } from "lucide-react"

const prayerSlots = [
  { name: "Fajr", defaultAzan: "05:11", defaultIqamah: "05:40" },
  { name: "Dhuhr", defaultAzan: "12:08", defaultIqamah: "12:30" },
  { name: "Asr", defaultAzan: "16:15", defaultIqamah: "16:45" },
  { name: "Maghrib", defaultAzan: "17:56", defaultIqamah: "18:01" },
  { name: "Isha", defaultAzan: "19:06", defaultIqamah: "19:30" },
]

export default function MosqueSalatPage() {
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Salat Timings</h1>
        <p className="text-sm font-bold text-muted-foreground">Update the Azan and Iqamah times for daily prayers.</p>
      </div>

      <Card className="rounded-[2rem] border-none shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg font-black flex items-center gap-2">
            <Clock className="h-5 w-5 text-teal-600" />
            Edit Salat Timings
          </CardTitle>
          <CardDescription>These timings will show on your masjid&apos;s public listing and prayer widget.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {prayerSlots.map((prayer) => (
            <div key={prayer.name} className="p-4 rounded-2xl bg-muted/50">
              <h3 className="text-base font-black text-foreground mb-3">{prayer.name}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor={`${prayer.name}-azan`}>Azan Time</Label>
                  <Input id={`${prayer.name}-azan`} type="time" defaultValue={prayer.defaultAzan} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`${prayer.name}-iqamah`}>Iqamah Time</Label>
                  <Input id={`${prayer.name}-iqamah`} type="time" defaultValue={prayer.defaultIqamah} />
                </div>
              </div>
            </div>
          ))}
          <Button className="w-full rounded-full h-12 font-bold">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  )
}
