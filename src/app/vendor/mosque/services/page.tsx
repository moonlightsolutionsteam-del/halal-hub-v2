"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { PlusCircle, BookOpen, Baby, HeartHandshake, GraduationCap, Users, Utensils } from "lucide-react"

const services = [
  { name: "Nikah Services", icon: HeartHandshake, desc: "Marriage ceremonies and counseling", active: true },
  { name: "Janazah & Funeral Support", icon: Baby, desc: "Funeral prayers and burial assistance", active: true },
  { name: "Madrasa Classes", icon: GraduationCap, desc: "Quran and Islamic studies for children", active: true },
  { name: "Community Iftar", icon: Utensils, desc: "Ramadan community meals", active: false },
  { name: "Counseling Services", icon: Users, desc: "Family and community counseling", active: true },
  { name: "Quran Memorization Circle", icon: BookOpen, desc: "Weekly Hifz study group", active: false },
]

export default function MosqueServicesPage() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Services</h1>
          <p className="text-sm font-bold text-muted-foreground">Toggle the community services your masjid offers.</p>
        </div>
        <Button className="rounded-full"><PlusCircle className="h-4 w-4 mr-2" />Add Service</Button>
      </div>

      <div className="space-y-3">
        {services.map((service, i) => (
          <Card key={i} className="rounded-[2rem] border-none shadow-soft">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center shrink-0">
                <service.icon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-black text-foreground">{service.name}</p>
                <p className="text-xs text-muted-foreground font-medium">{service.desc}</p>
              </div>
              <Switch defaultChecked={service.active} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
