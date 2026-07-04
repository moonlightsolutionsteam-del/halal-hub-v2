"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { PlusCircle, HeartHandshake, GraduationCap, Users, Package, Home, Stethoscope } from "lucide-react"

const services = [
  { name: "Orphan Sponsorship", icon: HeartHandshake, desc: "Monthly sponsorship program for orphans", active: true },
  { name: "Educational Scholarships", icon: GraduationCap, desc: "Financial aid for students in need", active: true },
  { name: "Food Bank", icon: Package, desc: "Weekly food distribution drives", active: true },
  { name: "Shelter Assistance", icon: Home, desc: "Emergency housing support", active: false },
  { name: "Medical Camps", icon: Stethoscope, desc: "Free health checkups for the community", active: true },
  { name: "Volunteer Network", icon: Users, desc: "Coordinate community volunteers", active: true },
]

export default function OrganizationServicesPage() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-headline text-foreground tracking-tight">Services & Programs</h1>
          <p className="text-sm font-bold text-muted-foreground">Toggle the programs your organization runs.</p>
        </div>
        <Button className="rounded-full"><PlusCircle className="h-4 w-4 mr-2" />Add Program</Button>
      </div>

      <div className="space-y-3">
        {services.map((service, i) => (
          <Card key={i} className="rounded-[2rem] border-none shadow-soft">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center shrink-0">
                <service.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
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
