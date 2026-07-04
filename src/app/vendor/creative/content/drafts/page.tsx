"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, Search, Filter, Edit2, 
  Trash2, Eye, MoreVertical, Plus,
  ArrowLeft, Clock, History, AlertCircle,
  LayoutGrid, ArrowRight, Info
} from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { cn } from "@/lib/utils"

const DRAFTS = [
  { id: 1, title: "The Virtues of Charity (Vlog)", category: "Production", lastEdit: "2h ago", completion: "80%", type: "Video" },
  { id: 2, title: "Interview with local Imam", category: "Podcast", lastEdit: "5h ago", completion: "45%", type: "Audio" },
  { id: 3, title: "Eid Celebration Guide 2025", category: "Writing", lastEdit: "Yesterday", completion: "10%", type: "Article" },
];

export default function CreativeDraftsPage() {
  return (
    <div className="container mx-auto p-6 space-y-10 max-w-6xl pb-24 text-foreground">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <Link href="/vendor/creative/dashboard" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground shadow-inner">
              <FileText className="h-6 w-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Drafts & Production</h1>
          </div>
          <p className="text-muted-foreground font-medium">Manage your ongoing works and production pipeline.</p>
        </div>
        <Link href="/vendor/creative/content/upload">
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 font-black shadow-lg shadow-primary/20 h-12">
            <Plus className="mr-2 h-4 w-4" /> New Draft
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {DRAFTS.map((draft) => (
          <Card key={draft.id} className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden border-2 border-transparent hover:border-primary/10 transition-all group">
            <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="flex items-center gap-8 flex-1">
                <div className="h-16 w-16 rounded-[1.5rem] bg-muted flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors shadow-inner shrink-0">
                  <Clock className="h-8 w-8" />
                </div>
                <div className="space-y-2 min-w-0">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-muted text-muted-foreground border-none font-black text-[9px] uppercase px-3 h-6 flex items-center">{draft.category}</Badge>
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1.5"><History className="h-3 w-3" /> Edited {draft.lastEdit}</span>
                  </div>
                  <h3 className="text-xl font-black text-foreground truncate tracking-tight">{draft.title}</h3>
                  <div className="flex items-center gap-4 pt-1">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-32 bg-muted rounded-full overflow-hidden shadow-inner">
                        <div className="h-full bg-primary rounded-full transition-all" style={{ width: draft.completion }} />
                      </div>
                      <span className="text-[10px] font-black text-muted-foreground">{draft.completion} ready</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button className="rounded-xl h-11 px-8 font-black text-xs uppercase tracking-widest bg-zinc-900 text-white shadow-xl hover:bg-primary transition-all">Resume Work</Button>
                <Button variant="ghost" size="icon" className="rounded-xl h-11 w-11 bg-muted text-muted-foreground"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="p-8 bg-amber-50 rounded-[2.5rem] border-2 border-amber-100 flex items-start gap-4">
        <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-sm font-medium text-amber-900/70 leading-relaxed italic">
          "Unfinished business? Drafts are automatically saved every 2 minutes. Items in the production pipeline are visible only to your Studio team."
        </p>
      </div>
    </div>
  )
}
