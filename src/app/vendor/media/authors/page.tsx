"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Search, Plus, BookOpen, Star, Globe } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const AUTHORS = [
  { id: 1, name: "Dr. Yasir Qadhi", origin: "USA", titles: 12, rating: 4.9, specialty: "Aqeedah & Seerah", status: "Active" },
  { id: 2, name: "Sheikh Ibn Uthaymeen", origin: "Saudi Arabia", titles: 34, rating: 5.0, specialty: "Fiqh & Tafsir", status: "Active" },
  { id: 3, name: "Sh. Hamza Yusuf", origin: "USA", titles: 8, rating: 4.8, specialty: "Islamic Studies", status: "Active" },
  { id: 4, name: "Imam Ibn al-Qayyim", origin: "Syria (Classical)", titles: 18, rating: 5.0, specialty: "Spirituality & Fiqh", status: "Active" },
  { id: 5, name: "Dr. Tariq Ramadan", origin: "Switzerland", titles: 6, rating: 4.5, specialty: "Contemporary Islam", status: "Pending" },
]

export default function MediaAuthorsPage() {
  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <Users className="h-3 w-3" /> Authors & Publishers
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Authors & Publishers</h1>
          <p className="text-sm font-bold text-muted-foreground">Manage your network of Islamic authors, scholars, and publishing partners.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 rounded-2xl px-8 font-black h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Author
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Authors", value: "38", icon: Users, color: "bg-primary/10 text-primary" },
          { label: "Active Publishers", value: "14", icon: Globe, color: "bg-blue-50 text-blue-600" },
          { label: "Total Titles", value: "186", icon: BookOpen, color: "bg-emerald-50 text-emerald-600" },
        ].map((s) => (
          <Card key={s.label} className="rounded-[2rem] border-none shadow-sm bg-card p-6">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${s.color}`}><s.icon className="h-5 w-5" /></div>
              <div><p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{s.label}</p><p className="text-2xl font-black">{s.value}</p></div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
        <div className="p-6 border-b">
          <div className="relative max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search authors..." className="pl-10 h-11 rounded-2xl bg-muted border-none font-bold" />
          </div>
        </div>
        <div className="divide-y divide-border">
          {AUTHORS.map((author) => (
            <div key={author.id} className="p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-muted/20 transition-colors group">
              <Avatar className="h-12 w-12 shrink-0">
                <AvatarImage src={`https://picsum.photos/seed/author-${author.id}/100/100`} />
                <AvatarFallback className="bg-primary/10 text-primary font-black text-sm">
                  {author.name.split(" ").map(n => n[0]).join("").slice(0,2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-black text-foreground">{author.name}</p>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <Badge className="bg-primary/10 text-primary border-none font-black text-[10px]">{author.specialty}</Badge>
                  <span className="text-xs font-bold text-muted-foreground">{author.origin}</span>
                  <span className="flex items-center gap-1 text-xs font-bold text-muted-foreground"><BookOpen className="h-3 w-3" />{author.titles} titles</span>
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-600"><Star className="h-3 w-3 fill-current" />{author.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Badge className={`font-black text-[10px] border-none ${author.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>{author.status}</Badge>
                <Button variant="outline" size="sm" className="rounded-xl font-black text-xs h-9 border-2 border-primary/20 text-primary hover:bg-primary/5 opacity-0 group-hover:opacity-100">View</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
