"use client"

import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Play, Pause, Search, ChevronLeft, AlertCircle, Loader2, Bookmark, BookMarked } from "lucide-react"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
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

// Standard 30-Juz start points (surah:ayah)
const JUZ_STARTS: { juz: number; surah: number; ayah: number; name: string }[] = [
  { juz: 1, surah: 1, ayah: 1, name: "Alif Lam Meem" },
  { juz: 2, surah: 2, ayah: 142, name: "Sayaqool" },
  { juz: 3, surah: 2, ayah: 253, name: "Tilkal Rusul" },
  { juz: 4, surah: 3, ayah: 93, name: "Lan Tanaloo" },
  { juz: 5, surah: 4, ayah: 24, name: "Wal Mohsanat" },
  { juz: 6, surah: 4, ayah: 148, name: "La Yuhibbullah" },
  { juz: 7, surah: 5, ayah: 82, name: "Wa Iza Samiu" },
  { juz: 8, surah: 6, ayah: 111, name: "Wa Lau Annana" },
  { juz: 9, surah: 7, ayah: 88, name: "Qalal Malao" },
  { juz: 10, surah: 8, ayah: 41, name: "Wa A'lamu" },
  { juz: 11, surah: 9, ayah: 93, name: "Yatazeroon" },
  { juz: 12, surah: 11, ayah: 6, name: "Wa Mamin Da'abat" },
  { juz: 13, surah: 12, ayah: 53, name: "Wa Ma Ubrioo" },
  { juz: 14, surah: 15, ayah: 1, name: "Rubama" },
  { juz: 15, surah: 17, ayah: 1, name: "Subhanallazi" },
  { juz: 16, surah: 18, ayah: 75, name: "Qal Alam" },
  { juz: 17, surah: 21, ayah: 1, name: "Aqtarabo" },
  { juz: 18, surah: 23, ayah: 1, name: "Qadd Aflaha" },
  { juz: 19, surah: 25, ayah: 21, name: "Wa Qalallazina" },
  { juz: 20, surah: 27, ayah: 56, name: "A'man Khalaq" },
  { juz: 21, surah: 29, ayah: 46, name: "Utlu Ma Oohi" },
  { juz: 22, surah: 33, ayah: 31, name: "Wa Manyaqnut" },
  { juz: 23, surah: 36, ayah: 28, name: "Wa Mali" },
  { juz: 24, surah: 39, ayah: 32, name: "Faman Azlam" },
  { juz: 25, surah: 41, ayah: 47, name: "Elahe Yuruddo" },
  { juz: 26, surah: 46, ayah: 1, name: "Ha'a Meem" },
  { juz: 27, surah: 51, ayah: 31, name: "Qala Fama Khatbukum" },
  { juz: 28, surah: 58, ayah: 1, name: "Qadd Sami Allah" },
  { juz: 29, surah: 67, ayah: 1, name: "Tabarakallazi" },
  { juz: 30, surah: 78, ayah: 1, name: "Amma Yatasa'aloon" },
]

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-muted", className)} />
}

export default function QuranPage() {
  const { user } = useAuth()
  const { toast } = useToast()
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
  const [browseMode, setBrowseMode] = useState<"surah" | "juz" | "bookmarks">("surah")
  const [bookmarkedKeys, setBookmarkedKeys] = useState<Set<string>>(new Set())
  const [bookmarkRows, setBookmarkRows] = useState<{ verse_key: string; surah: number; ayah: number; created_at: string }[]>([])
  const [lastRead, setLastRead] = useState<{ surah: number; ayah: number } | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    getAllSurahs()
      .then((d) => setSurahs(d.surahs))
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load surahs"))
      .finally(() => setLoading(false))
  }, [])

  // Load bookmarks + last-read position
  useEffect(() => {
    if (!user?.uid) return
    const supabase = createClient()
    ;supabase
      .from("quran_bookmarks")
      .select("verse_key, surah, ayah, created_at")
      .eq("user_id", user.uid)
      .order("created_at", { ascending: false })
      .then(({ data }: { data: any }) => {
        if (!data) return
        setBookmarkRows(data)
        setBookmarkedKeys(new Set(data.map((b: any) => b.verse_key)))
      })
    ;supabase
      .from("quran_progress")
      .select("last_surah, last_ayah")
      .eq("user_id", user.uid)
      .maybeSingle()
      .then(({ data }: { data: any }) => {
        if (data) setLastRead({ surah: data.last_surah, ayah: data.last_ayah })
      })
  }, [user?.uid])

  useEffect(() => {
    if (!selectedSurah) return
    setSurahLoading(true)
    getSurah(selectedSurah)
      .then(setSurahData)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load surah"))
      .finally(() => setSurahLoading(false))

    // Persist last-read position (blueprint §5.3)
    if (user?.uid) {
      const supabase = createClient()
      ;supabase.from("quran_progress").upsert(
        { user_id: user.uid, last_surah: selectedSurah, last_ayah: 1, updated_at: new Date().toISOString() },
        { onConflict: "user_id" },
      ).then(() => {})
      setLastRead({ surah: selectedSurah, ayah: 1 })
    }
  }, [selectedSurah, user?.uid])

  const toggleBookmark = useCallback(async (verse: Verse, surahNumber: number) => {
    if (!user?.uid) {
      toast({ title: "Sign in to bookmark", description: "Bookmarks are saved to your account." })
      return
    }
    const supabase = createClient()
    const isBookmarked = bookmarkedKeys.has(verse.verse_key)
    if (isBookmarked) {
      await supabase.from("quran_bookmarks").delete()
        .eq("user_id", user.uid).eq("verse_key", verse.verse_key)
      setBookmarkedKeys(prev => { const n = new Set(prev); n.delete(verse.verse_key); return n })
      setBookmarkRows(prev => prev.filter(b => b.verse_key !== verse.verse_key))
    } else {
      await supabase.from("quran_bookmarks").insert({
        user_id: user.uid, surah: surahNumber, ayah: verse.ayah, verse_key: verse.verse_key,
      })
      setBookmarkedKeys(prev => new Set(prev).add(verse.verse_key))
      setBookmarkRows(prev => [{ verse_key: verse.verse_key, surah: surahNumber, ayah: verse.ayah, created_at: new Date().toISOString() }, ...prev])
      toast({ title: "Ayah bookmarked", description: verse.verse_key })
    }
  }, [user?.uid, bookmarkedKeys, toast])

  const filteredSurahs = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return surahs
    return surahs.filter(
      (s) => s.name_english.toLowerCase().includes(q) || s.name_translation.toLowerCase().includes(q) || String(s.number) === q
    )
  }, [surahs, search])

  const surahName = useCallback(
    (n: number) => surahs.find(s => s.number === n)?.name_english ?? `Surah ${n}`,
    [surahs],
  )

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
            <Card key={verse.verse_key} id={`ayah-${verse.ayah}`} className="rounded-[2rem] border-none shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="font-bold text-xs">{verse.verse_key}</Badge>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => toggleBookmark(verse, surahData.surah.number)}>
                      <Bookmark className={cn(
                        "h-4 w-4",
                        bookmarkedKeys.has(verse.verse_key) ? "fill-primary text-primary" : "text-muted-foreground"
                      )} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => playAyah(verse)}>
                      {playingAyah === verse.verse_key ? <Pause className="h-4 w-4 text-primary" /> : <Play className="h-4 w-4 text-muted-foreground" />}
                    </Button>
                  </div>
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

  // ─── Browser View ───
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-black text-foreground tracking-tight">The Holy Quran</h1>
        <p className="text-sm font-bold text-muted-foreground">114 Surahs · 30 Juz · 6,236 Verses · 12 Translations</p>
      </div>

      {/* Continue reading (blueprint §5.2 Last Read) */}
      {lastRead && (
        <button onClick={() => setSelectedSurah(lastRead.surah)} className="w-full text-left">
          <Card className="rounded-[2rem] border-none shadow-sm bg-gradient-to-r from-primary to-emerald-500 text-white hover:opacity-95 transition-opacity">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-75">Continue Reading</p>
                <p className="text-lg font-black">{surahName(lastRead.surah)}</p>
              </div>
              <BookOpen className="h-8 w-8 opacity-60" />
            </CardContent>
          </Card>
        </button>
      )}

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

      {/* Browse mode selector */}
      <div className="flex gap-2">
        {([
          { key: "surah", label: "By Surah" },
          { key: "juz", label: "By Juz" },
          { key: "bookmarks", label: `Bookmarks${bookmarkRows.length ? ` (${bookmarkRows.length})` : ""}` },
        ] as const).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setBrowseMode(key)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-black transition-all",
              browseMode === key ? "bg-primary text-white shadow-md" : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {label}
          </button>
        ))}
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

      {/* By Surah */}
      {!searchResults && browseMode === "surah" && (
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

      {/* By Juz (blueprint §5.2) */}
      {!searchResults && browseMode === "juz" && (
        <div className="space-y-2">
          {JUZ_STARTS.map(({ juz, surah, ayah, name }) => (
            <button
              key={juz}
              onClick={() => setSelectedSurah(surah)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                <span className="text-sm font-black text-emerald-600">{juz}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-foreground">Juz {juz} — {name}</p>
                <p className="text-xs text-muted-foreground font-bold">Starts at {surahName(surah)} : {ayah}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Bookmarks (blueprint §5.3) */}
      {!searchResults && browseMode === "bookmarks" && (
        <div className="space-y-2">
          {!user?.uid ? (
            <div className="text-center py-12 text-muted-foreground">
              <BookMarked className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="font-bold">Sign in to save bookmarks</p>
            </div>
          ) : bookmarkRows.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <BookMarked className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="font-bold">No bookmarks yet</p>
              <p className="text-xs">Tap the bookmark icon on any ayah while reading.</p>
            </div>
          ) : (
            bookmarkRows.map((b) => (
              <button
                key={b.verse_key}
                onClick={() => setSelectedSurah(b.surah)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Bookmark className="h-4 w-4 text-primary fill-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-foreground">{surahName(b.surah)} — Ayah {b.ayah}</p>
                  <p className="text-xs text-muted-foreground font-bold">{b.verse_key}</p>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
