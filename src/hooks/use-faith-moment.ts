"use client"

import { useEffect, useState } from "react"
import { getRandomVerse, getRandomHadith, getRandomDua, type RandomVerseResponse, type Hadith, type Dua } from "@/lib/ummah-api"

export type FaithMoment =
  | { kind: "verse"; text: string; reference: string; data: RandomVerseResponse }
  | { kind: "hadith"; text: string; reference: string; data: Hadith }
  | { kind: "dua"; text: string; reference: string; data: Dua }

function dayOfYear(d: Date): number {
  const start = new Date(d.getFullYear(), 0, 0)
  return Math.floor((d.getTime() - start.getTime()) / 86400000)
}

export function useFaithMoment() {
  const [moment, setMoment] = useState<FaithMoment | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const kinds: FaithMoment["kind"][] = ["verse", "hadith", "dua"]
    const kind = kinds[dayOfYear(new Date()) % kinds.length]

    async function load() {
      try {
        if (kind === "verse") {
          const data = await getRandomVerse()
          const translation = data.verse.translations?.en ?? Object.values(data.verse.translations ?? {})[0] ?? ""
          if (!cancelled) setMoment({ kind: "verse", text: translation, reference: `Qur'an ${data.surah.name_english} ${data.verse.verse_key}`, data })
        } else if (kind === "hadith") {
          const data = await getRandomHadith()
          if (!cancelled) setMoment({ kind: "hadith", text: data.english, reference: `${data.collection_name} ${data.hadithnumber}`, data })
        } else {
          const data = await getRandomDua()
          if (!cancelled) setMoment({ kind: "dua", text: data.translation, reference: data.title, data })
        }
      } catch {
        if (!cancelled) setMoment(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return { moment, loading }
}
