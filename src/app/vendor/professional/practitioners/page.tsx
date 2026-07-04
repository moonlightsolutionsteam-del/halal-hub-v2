"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { PlusCircle } from "lucide-react"

const practitioners = [
  { name: "Dr. Aisha Rahman", role: "General Physician", specialty: "Family Medicine", img: "https://picsum.photos/seed/doctor1/200/200" },
  { name: "Dr. Omar Farooq", role: "Associate", specialty: "Pediatrics", img: "https://picsum.photos/seed/doctor2/200/200" },
  { name: "Nadia Hussain", role: "Nurse Practitioner", specialty: "General Care", img: "https://picsum.photos/seed/nurse1/200/200" },
]

export default function ProfessionalPractitionersPage() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-headline text-foreground tracking-tight">Practitioners</h1>
          <p className="text-sm font-bold text-muted-foreground">Manage the team members in your practice.</p>
        </div>
        <Button className="rounded-full"><PlusCircle className="h-4 w-4 mr-2" />Add Practitioner</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {practitioners.map((p, i) => (
          <Card key={i} className="rounded-[2rem] border-none shadow-soft text-center">
            <CardContent className="p-6 space-y-3">
              <Avatar className="h-20 w-20 mx-auto border-2 border-border">
                <AvatarImage src={p.img} />
                <AvatarFallback>{p.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-base font-black text-foreground">{p.name}</p>
                <p className="text-xs text-muted-foreground font-medium">{p.role}</p>
              </div>
              <Badge variant="secondary" className="text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40">{p.specialty}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
