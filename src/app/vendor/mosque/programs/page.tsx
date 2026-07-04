"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

const programs = [
  { name: "Hifz Program", enrolled: 42, capacity: 50, status: "Active" },
  { name: "New Muslim Support Circle", enrolled: 18, capacity: 30, status: "Active" },
  { name: "Arabic Language Classes", enrolled: 25, capacity: 25, status: "Full" },
  { name: "Youth Leadership Program", enrolled: 12, capacity: 40, status: "Enrolling" },
]

export default function MosqueProgramsPage() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-headline text-foreground tracking-tight">Programs</h1>
          <p className="text-sm font-bold text-muted-foreground">Track enrollment across your educational programs.</p>
        </div>
        <Link href="/vendor/mosque/programs/create">
          <Button className="rounded-full"><PlusCircle className="h-4 w-4 mr-2" />New Program</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {programs.map((program, i) => (
          <Card key={i} className="rounded-[2rem] border-none shadow-soft">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-black text-foreground">{program.name}</h3>
                <Badge variant={program.status === "Full" ? "destructive" : "secondary"}>{program.status}</Badge>
              </div>
              <Progress value={(program.enrolled / program.capacity) * 100} className="h-2" />
              <p className="text-xs font-bold text-muted-foreground">{program.enrolled} / {program.capacity} enrolled</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
