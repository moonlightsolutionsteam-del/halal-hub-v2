"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Library, Search, Plus, Download, Headphones, Video, FileText, Upload } from "lucide-react"

const DIGITAL_ITEMS = [
  { id: "DG-001", title: "The Sealed Nectar (Audio)", type: "Audiobook", format: "MP3", size: "420 MB", downloads: 312, price: "£6.99", status: "Published" },
  { id: "DG-002", title: "Quran Recitation — Mishary", type: "Audio", format: "MP3", size: "1.2 GB", downloads: 890, price: "Free", status: "Published" },
  { id: "DG-003", title: "Islamic Jurisprudence Series", type: "eBook", format: "PDF/EPUB", size: "18 MB", downloads: 145, price: "£4.99", status: "Published" },
  { id: "DG-004", title: "Foundations of Faith — Lecture", type: "Video", format: "MP4", size: "2.8 GB", downloads: 67, price: "£9.99", status: "Draft" },
  { id: "DG-005", title: "Ramadan Reflection Cards", type: "PDF Pack", format: "PDF", size: "8 MB", downloads: 201, price: "Free", status: "Published" },
]

export default function MediaDigitalPage() {
  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <Library className="h-3 w-3" /> Digital Media
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Digital Media Library</h1>
          <p className="text-sm font-bold text-muted-foreground">Manage eBooks, audiobooks, lectures, and downloadable Islamic content.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 rounded-2xl px-8 font-black h-12 text-white">
          <Upload className="mr-2 h-4 w-4" /> Upload Content
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Total Items", value: "48", icon: Library, color: "bg-primary/10 text-primary" },
          { label: "eBooks", value: "21", icon: FileText, color: "bg-blue-50 text-blue-600" },
          { label: "Audiobooks", value: "14", icon: Headphones, color: "bg-violet-50 text-violet-600" },
          { label: "Videos", value: "13", icon: Video, color: "bg-rose-50 text-rose-600" },
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
        <div className="p-6 border-b flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search digital items..." className="pl-10 h-11 rounded-2xl bg-muted border-none font-bold" />
          </div>
          <Button variant="outline" className="rounded-2xl font-black text-xs h-11 border-2 border-primary/20 text-primary hover:bg-primary/5">Filter</Button>
        </div>
        <div className="divide-y divide-border">
          {DIGITAL_ITEMS.map((item) => (
            <div key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-muted/20 transition-colors group">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                {item.type === "Audiobook" || item.type === "Audio" ? <Headphones className="h-6 w-6" /> : item.type === "Video" ? <Video className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-foreground">{item.title}</p>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <Badge className="bg-primary/10 text-primary border-none font-black text-[10px]">{item.type}</Badge>
                  <span className="text-xs font-bold text-muted-foreground">{item.format} · {item.size}</span>
                  <span className="flex items-center gap-1 text-xs font-bold text-muted-foreground"><Download className="h-3 w-3" />{item.downloads} downloads</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-black text-sm text-foreground">{item.price}</span>
                <Badge className={`font-black text-[10px] border-none ${item.status === "Published" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>{item.status}</Badge>
                <Button variant="ghost" size="sm" className="rounded-xl text-xs font-black opacity-0 group-hover:opacity-100">Edit</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
