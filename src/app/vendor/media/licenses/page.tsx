"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Globe, Users, Zap, CheckCircle2, Plus } from "lucide-react"

const LICENSES = [
  { id: "LIC-001", title: "The Sealed Nectar — eBook", type: "Single User", downloads: 312, revenue: "£2,184", expires: "Perpetual", status: "Active" },
  { id: "LIC-002", title: "Quran Recitation Pack", type: "Free Download", downloads: 890, revenue: "£0", expires: "Perpetual", status: "Active" },
  { id: "LIC-003", title: "Islamic Jurisprudence Series", type: "Single User", downloads: 145, revenue: "£724", expires: "Perpetual", status: "Active" },
  { id: "LIC-004", title: "Foundations of Faith — Lecture", type: "Streaming Only", downloads: 67, revenue: "£669", expires: "12 months", status: "Active" },
  { id: "LIC-005", title: "Madrasa Bundle — Site License", type: "Institutional", downloads: 14, revenue: "£1,960", expires: "Annual", status: "Expiring Soon" },
]

export default function MediaLicensesPage() {
  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <Download className="h-3 w-3" /> Downloads & Licensing
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Downloads & Licensing</h1>
          <p className="text-sm font-bold text-muted-foreground">Manage digital license types, download access, and institutional agreements.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 rounded-2xl px-8 font-black h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> New License
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Active Licenses", value: "48", icon: CheckCircle2, color: "bg-emerald-50 text-emerald-600" },
          { label: "Total Downloads", value: "1,428", icon: Download, color: "bg-primary/10 text-primary" },
          { label: "Institutional", value: "6", icon: Globe, color: "bg-blue-50 text-blue-600" },
          { label: "License Revenue", value: "£5,537", icon: Zap, color: "bg-amber-50 text-amber-600" },
        ].map((s) => (
          <Card key={s.label} className="rounded-[2rem] border-none shadow-sm bg-card p-6">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${s.color}`}><s.icon className="h-5 w-5" /></div>
              <div><p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{s.label}</p><p className="text-2xl font-black">{s.value}</p></div>
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        {LICENSES.map((lic) => (
          <Card key={lic.id} className="rounded-[2rem] border-none shadow-sm bg-card p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <p className="font-black text-foreground">{lic.title}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-primary/10 text-primary border-none font-black text-[10px]">{lic.type}</Badge>
                    <span className="text-xs font-bold text-muted-foreground flex items-center gap-1"><Download className="h-3 w-3" />{lic.downloads} downloads</span>
                    <span className="text-xs font-bold text-muted-foreground">Revenue: {lic.revenue}</span>
                    <span className="text-xs font-bold text-muted-foreground">Expires: {lic.expires}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Badge className={`font-black text-[10px] border-none ${lic.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>{lic.status}</Badge>
                <Button variant="outline" size="sm" className="rounded-xl font-black text-xs h-9 border-2 border-primary/20 text-primary hover:bg-primary/5">Edit</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
