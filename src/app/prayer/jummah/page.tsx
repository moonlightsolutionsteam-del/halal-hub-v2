
"use client"

import Link from "next/link"
import {
  ArrowLeft, CalendarCheck, Clock, Droplets, Shirt, BookOpen,
  Sparkles, Moon, ChevronRight, CheckCircle2
} from "lucide-react"

const SUNNAH_ACTS = [
  { icon: Droplets, title: "Perform Ghusl", desc: "Take a full ritual bath before heading to the mosque." },
  { icon: Shirt, title: "Wear Clean Clothes", desc: "Dress in your best, cleanest attire and apply perfume (itr)." },
  { icon: Clock, title: "Arrive Early", desc: "The earlier you arrive, the greater the reward — like offering a camel, then a cow, then a hen." },
  { icon: BookOpen, title: "Recite Surah Al-Kahf", desc: "Whoever reads it is granted light between the two Fridays." },
  { icon: Sparkles, title: "Increase Salawat", desc: "Send abundant blessings upon the Prophet ﷺ on this blessed day." },
  { icon: Moon, title: "Make Du'a", desc: "There is an hour on Friday when du'a is answered — seek it, especially before Maghrib." },
]

const ETIQUETTE = [
  "Listen attentively to the khutbah — do not talk once the Imam begins.",
  "Do not step over people's shoulders to find a spot.",
  "Offer two rak'ah of Tahiyyat al-Masjid if you arrive while the Imam is not yet on the minbar.",
  "Sit close to the Imam where possible.",
]

export default function JummahPage() {
  return (
    <div className="max-w-2xl mx-auto pb-28 px-4 py-5 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/prayer-times" className="w-9 h-9 rounded-xl border border-border/50 flex items-center justify-center hover:bg-muted transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-base font-black">Jummah Guide</h1>
          <p className="text-[10px] text-muted-foreground">Friday prayer — sunnah & etiquette</p>
        </div>
      </div>

      {/* Hero */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-500/10 via-primary/5 to-transparent border border-indigo-500/10 p-5 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/15 flex items-center justify-center">
            <CalendarCheck className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Yawm al-Jumu'ah</p>
            <h2 className="text-lg font-black text-foreground leading-tight">The Best Day of the Week</h2>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          "The best day on which the sun rises is Friday…" — Sahih Muslim.
          Jummah replaces the Dhuhr prayer and is obligatory upon every adult Muslim man.
        </p>
      </div>

      {/* Arabic verse card */}
      <div className="rounded-3xl border border-border/50 bg-card p-5 text-center space-y-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Surah Al-Jumu'ah — 62:9</p>
        <p className="text-2xl leading-relaxed font-['Alegreya'] text-foreground" dir="rtl">
          يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ إِذَا نُودِىَ لِلصَّلَوٰةِ مِن يَوْمِ ٱلْجُمُعَةِ فَٱسْعَوْا۟ إِلَىٰ ذِكْرِ ٱللَّهِ
        </p>
        <p className="text-sm text-muted-foreground italic leading-relaxed">
          "O you who believe! When the call is made for prayer on Friday, hasten to the remembrance of Allah."
        </p>
      </div>

      {/* Sunnah acts */}
      <section className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Sunnah Acts of Friday</p>
        <div className="grid grid-cols-1 gap-2">
          {SUNNAH_ACTS.map((act) => (
            <div key={act.title} className="flex items-start gap-3 rounded-2xl border border-border/50 bg-card px-4 py-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/40 flex items-center justify-center shrink-0">
                <act.icon className="h-4 w-4 text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black">{act.title}</p>
                <p className="text-[11px] text-muted-foreground leading-snug">{act.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Surah Al-Kahf CTA */}
      <Link href="/quran" className="group block">
        <div className="rounded-3xl border border-amber-200 dark:border-amber-800 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/20 p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/60 flex items-center justify-center shrink-0">
            <BookOpen className="h-6 w-6 text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-black text-foreground">Read Surah Al-Kahf</p>
            <p className="text-[11px] text-muted-foreground">Light between the two Fridays — open the Quran reader</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
        </div>
      </Link>

      {/* Khutbah etiquette */}
      <section className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Khutbah Etiquette</p>
        <div className="rounded-2xl border border-border/50 bg-card divide-y divide-border/40">
          {ETIQUETTE.map((rule, i) => (
            <div key={i} className="flex items-start gap-3 px-4 py-3">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-snug">{rule}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Find a mosque */}
      <Link href="/mosques" className="group block">
        <div className="rounded-3xl border border-primary/20 bg-primary/5 p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0">
            <Moon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-black text-foreground">Find a Jummah Mosque Near You</p>
            <p className="text-[11px] text-muted-foreground">Khutbah language, timings & ladies section</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
        </div>
      </Link>
    </div>
  )
}
