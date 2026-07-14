"use client"

import { BookOpen, Quote as QuoteIcon, HandHeart } from "lucide-react"
import { useFaithMoment } from "@/hooks/use-faith-moment"

const KIND_META = {
  verse: { label: "Verse of the Moment", icon: BookOpen },
  hadith: { label: "Hadith of the Moment", icon: QuoteIcon },
  dua: { label: "Dua of the Day", icon: HandHeart },
} as const

export function FaithMomentCard() {
  const { moment, loading } = useFaithMoment()

  if (loading) {
    return <div className="mx-4 mb-4 h-24 rounded-2xl bg-muted/50 animate-pulse" />
  }
  if (!moment || !moment.text) return null

  const meta = KIND_META[moment.kind]
  const Icon = meta.icon

  return (
    <div className="mx-4 mb-4 rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
        <Icon className="h-3.5 w-3.5" /> {meta.label}
      </div>
      <p className="mt-2 text-sm font-medium leading-relaxed text-foreground italic line-clamp-4">"{moment.text}"</p>
      <p className="mt-1.5 text-[11px] font-bold text-muted-foreground">— {moment.reference}</p>
    </div>
  )
}
