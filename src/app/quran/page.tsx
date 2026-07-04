"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Play, Pause, Search, ChevronLeft, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  getAllSurahs, getSurah, searchQuran,
  type SurahMeta, type SurahResponse, type Verse,
} from "@/lib/ummah-api"

const TRANSLATION_OPTIONS: Record<string, string> = {
  sahih_international: "Sahih International",
  pickthall: "Pickthall",
  yusuf_ali: "Yusuf Ali",
  urdu: "Urdu",
  turkish: "Turkish",
  indonesian: "Indonesian",
  french: "French",
  german: "German",
  bengali: "Bengali",
  spanish: "Spanish",
  malay: "Malay",
  bosnian: "Bosnian",
}

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-muted", className)} />
}

export default function QuranPage() {
  const [surahs, setSurahs] = useState<SurahMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null)
  const [surahData, setSurahData] = useState<SurahResponse | null>(null)
  const [surahLoading, setSurahLoading] = useState(false)
  const [translation, setTranslation] = useState("sahih_international")
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState<Verse[] | null>(null)
  const [searching, setSearching] = useState(false)
  const [playingAyah, setPlayingAyah] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    getAllSurahs()
      .then((d) => setSurahs(d.surahs))
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load surahs"))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!selectedSurah) return
    setSurahLoading(true)
    getSurah(selectedSurah)
      .then(setSurahData)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load surah"))
      .finally(() => setSurahLoading(false))
  }, [selectedSurah])

  const filteredSurahs = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return surahs
    return surahs.filter(
      (s) => s.name_english.toLowerCase().includes(q) || s.name_translation.toLowerCase().includes(q) || String(s.number) === q
    )
  }, [surahs, search])

  const handleSearchVerses = async () => {
    if (!search.trim()) return
    setSearching(true)
    try {
      const res = await searchQuran(search.trim())
      setSearchResults(res.results)
    } catch {
      setSearchResults([])
    } finally {
      setSearching(false)
    }
  }

  const playAyah = (verse: Verse) => {
    if (playingAyah === verse.verse_key) {
      audioRef.current?.pause()
      setPlayingAyah(null)
      return
    }
    if (audioRef.current) audioRef.current.pause()
    const audio = new Audio(verse.audio.ayah_audio)
    audio.play()
    audio.onended = () => setPlayingAyah(null)
    audioRef.current = audio
    setPlayingAyah(verse.verse_key)
  }

  if (error) {
    return (
      <div className="p-4 md:p-8 max-w-5xl mx-auto">
        <Card className="border-destructive/50">
          <CardContent className="p-8 text-center space-y-4">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
            <h2 className="text-xl font-bold text-foreground">Unable to load Quran data</h2>
            <p className="text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ─── Surah Loading View ───
  if (selectedSurah && surahLoading) {
    return (
      <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-48" />
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    )
  }

  // ─── Surah Reader View ───
  if (selectedSurah && surahData) {
    return (
      <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full shrink-0" onClick={() => { setSelectedSurah(null); setSurahData(null) }}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-black text-foreground truncate">{surahData.surah.name_english}</h1>
            <p className="text-sm text-muted-foreground font-bold">{surahData.surah.name_translation} · {surahData.surah.verses_count} verses</p>
          </div>
          <Select value={translation} onValueChange={setTranslation}>
            <SelectTrigger className="w-40 rounded-full shrink-0"><SelectValue /></SelectTrigger>
            <SelectContent>
              {Object.entries(TRANSLATION_OPTIONS).map(([key, label]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Card className="rounded-[2rem] border-none shadow-sm bg-gradient-to-br from-primary/10 to-emerald-500/5">
          <CardContent className="p-8 text-center">
            <p className="text-4xl font-black text-primary mb-1" dir="rtl">{surahData.surah.name_arabic}</p>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              {surahData.surah.revelation_place === "makkah" ? "Meccan" : "Medinan"} Surah · #{surahData.surah.number}
            </p>
            {surahData.surah.bismillah_pre && (
              <p className="text-2xl font-bold text-foreground mt-6" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          {surahData.verses.map((verse) => (
            <Card key={verse.verse_key} className="rounded-[2rem] border-none shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="font-bold text-xs">{verse.verse_key}</Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => playAyah(verse)}>
                    {playingAyah === verse.verse_key ? <Pause className="h-4 w-4 text-primary" /> : <Play className="h-4 w-4 text-muted-foreground" />}
                  </Button>
                </div>
                <p className="text-right text-2xl leading-[2.8] font-bold text-foreground" dir="rtl">{verse.arabic}</p>
                <p className="text-sm text-primary/80 italic">{verse.transliteration}</p>
                <p className="text-sm text-muted-foreground">{verse.translations[translation] || verse.translations.sahih_international}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // ─── Surah Browser / Search View ───
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-black text-foreground tracking-tight">The Holy Quran</h1>
        <p className="text-sm font-bold text-muted-foreground">114 Surahs · 6,236 Verses · 12 Translations</p>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search surahs or verses..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setSearchResults(null) }}
            onKeyDown={(e) => e.key === "Enter" && handleSearchVerses()}
            className="pl-9 rounded-2xl h-11"
          />
        </div>
        <Button onClick={handleSearchVerses} disabled={searching} className="rounded-2xl">
          {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search Verses"}
        </Button>
      </div>

      {searchResults && (
        <div className="space-y-3">
          <p className="text-xs font-black uppercase text-muted-foreground tracking-widest px-2">{searchResults.length} verse(s) found</p>
          {searchResults.map((verse) => (
            <Card key={verse.verse_key} className="rounded-[2rem] border-none shadow-sm">
              <CardContent className="p-6 space-y-3">
                <Badge variant="secondary" className="font-bold text-xs">{verse.verse_key}</Badge>
                <p className="text-right text-xl leading-[2.5] font-bold text-foreground" dir="rtl">{verse.arabic}</p>
                <p className="text-sm text-muted-foreground">{verse.translations.sahih_international}</p>
              </CardContent>
            </Card>
          ))}
          {searchResults.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No verses matched your search.</p>
          )}
        </div>
      )}

      {!searchResults && (
        <div className="space-y-2">
          {loading && Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-16" />)}
          {!loading && filteredSurahs.map((surah) => (
            <button
              key={surah.number}
              onClick={() => setSelectedSurah(surah.number)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-sm font-black text-primary">{surah.number}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-foreground">{surah.name_english}</p>
                <p className="text-xs text-muted-foreground font-bold">{surah.name_translation} · {surah.verses_count} verses</p>
              </div>
              <p className="text-xl font-bold text-primary shrink-0" dir="rtl">{surah.name_arabic}</p>
            </button>
          ))}
          {!loading && filteredSurahs.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="font-bold">No surahs match your search</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
