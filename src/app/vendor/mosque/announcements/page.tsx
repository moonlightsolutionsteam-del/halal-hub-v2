"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Megaphone, PlusCircle, Trash2 } from "lucide-react"

const announcements = [
  { title: "Eid Prayer Timings", body: "Eid al-Fitr prayer will be held at 7:30 AM in the main hall and courtyard.", time: "1 day ago" },
  { title: "Weekly Tafsir Session Cancelled", body: "This Sunday's Tafsir session is cancelled due to scheduled maintenance.", time: "3 days ago" },
  { title: "Ramadan Iftar Drive Starting Soon", body: "Sign up to sponsor or volunteer for our daily community Iftar during Ramadan.", time: "1 week ago" },
]

export default function MosqueAnnouncementsPage() {
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Announcements</h1>
        <p className="text-sm font-bold text-muted-foreground">Post updates for your community to see.</p>
      </div>

      <Card className="rounded-[2rem] border-none shadow-soft">
        <CardContent className="p-6 space-y-4">
          <Textarea placeholder="Write a new announcement..." className="min-h-[100px]" />
          <div className="flex justify-end">
            <Button className="rounded-full"><PlusCircle className="h-4 w-4 mr-2" />Post Announcement</Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {announcements.map((a, i) => (
          <Card key={i} className="rounded-[2rem] border-none shadow-soft">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center shrink-0">
                <Megaphone className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-black text-foreground">{a.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{a.body}</p>
                <p className="text-xs text-muted-foreground font-medium mt-2">{a.time}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0">
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
