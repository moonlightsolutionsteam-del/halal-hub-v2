"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Network } from "lucide-react"
import Link from "next/link"

const leadership = [
  { name: "Syed Shaban Bukhari", role: "Head Imam", years: "Since 2008", img: "https://picsum.photos/seed/imam1/200/200" },
  { name: "Abdul Rahman", role: "Committee Chairman", years: "Since 2015", img: "https://picsum.photos/seed/committee1/200/200" },
  { name: "Mohammed Yusuf", role: "Treasurer", years: "Since 2019", img: "https://picsum.photos/seed/committee2/200/200" },
  { name: "Ibrahim Malik", role: "Secretary", years: "Since 2020", img: "https://picsum.photos/seed/committee3/200/200" },
]

export default function MosqueLeadershipPage() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Leadership</h1>
          <p className="text-sm font-bold text-muted-foreground">Manage your Imam and committee members.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/vendor/mosque/leadership/tree">
            <Button variant="outline" className="rounded-full"><Network className="h-4 w-4 mr-2" />Org Chart</Button>
          </Link>
          <Button className="rounded-full"><PlusCircle className="h-4 w-4 mr-2" />Add Member</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {leadership.map((person, i) => (
          <Card key={i} className="rounded-[2rem] border-none shadow-soft text-center">
            <CardContent className="p-6 space-y-3">
              <Avatar className="h-20 w-20 mx-auto border-2 border-border">
                <AvatarImage src={person.img} />
                <AvatarFallback>{person.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-base font-black text-foreground">{person.name}</p>
                <Badge variant="secondary" className="mt-1 text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40">{person.role}</Badge>
              </div>
              <p className="text-xs text-muted-foreground font-medium">{person.years}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
