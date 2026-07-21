"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BookOpen, Search, Loader2, Globe } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

type Book = {
  id: string
  title: string
  author: string | null
  category: string | null
  price: number | null
  language: string | null
  publisher: string | null
  is_available: boolean
}

const CATEGORIES = ["All", "Islamic Books", "Quran & Tafsir", "Hadith Collections", "Fiqh & Jurisprudence", "Biography / Seerah", "Children's Books", "Educational", "Other"]
const LANGUAGES = ["All", "English", "Arabic", "Urdu", "Malay", "French"]

export default function BooksPage() {
  const [books, setBooks] = React.useState<Book[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [category, setCategory] = React.useState("All")
  const [language, setLanguage] = React.useState("All")

  React.useEffect(() => {
    const supabase = createClient()
    let q = (supabase as any)
      .from("media_book_inventory")
      .select("id, title, author, category, price, language, publisher, is_available")
      .eq("is_available", true)
      .order("title", { ascending: true })

    if (category !== "All") q = q.eq("category", category)
    if (language !== "All") q = q.eq("language", language)

    q.then(({ data }: { data: Book[] | null }) => {
      setBooks(data ?? [])
      setLoading(false)
    })
  }, [category, language])

  const filtered = books.filter(b =>
    !search.trim() ||
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    (b.author ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (b.publisher ?? "").toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-5 max-w-4xl pb-24">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-2xl bg-teal-100 dark:bg-teal-950/40 flex items-center justify-center text-teal-600">
          <BookOpen className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-black">Islamic Books</h1>
          <p className="text-xs text-muted-foreground font-bold">Browse the halal library</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search title, author, or publisher…"
          className="pl-9 h-12 rounded-2xl bg-card border-none shadow-sm font-medium"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Category filter */}
      <div className="overflow-x-auto -mx-4 px-4">
        <div className="flex gap-2 w-max">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={cn("px-4 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition-colors",
                category === c ? "bg-teal-600 text-white" : "bg-card text-muted-foreground shadow-sm hover:bg-muted")}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Language filter */}
      <div className="flex gap-2 flex-wrap">
        {LANGUAGES.map(l => (
          <button key={l} onClick={() => setLanguage(l)}
            className={cn("h-8 px-3 rounded-xl text-xs font-black transition-colors flex items-center gap-1",
              language === l ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80")}>
            {l !== "All" && <Globe className="h-3 w-3" />} {l}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <BookOpen className="h-10 w-10 text-muted-foreground/20" />
          <p className="font-black">{books.length === 0 ? "No books listed yet" : "No results"}</p>
          <p className="text-sm text-muted-foreground">
            {books.length === 0
              ? "Media vendors can add books via their vendor panel."
              : "Try a different search or category."}
          </p>
        </div>
      )}

      {filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map(book => (
            <Card key={book.id} className="rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex gap-3">
                <div className="h-16 w-12 rounded-xl bg-teal-100 dark:bg-teal-950/40 flex items-center justify-center shrink-0">
                  <BookOpen className="h-6 w-6 text-teal-600" />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="font-black text-sm text-foreground leading-tight line-clamp-2">{book.title}</p>
                  {book.author && <p className="text-[11px] text-muted-foreground font-medium">{book.author}</p>}
                  <div className="flex items-center gap-2 flex-wrap">
                    {book.category && (
                      <Badge className="bg-teal-100 text-teal-700 dark:bg-teal-950/40 border-none text-[9px] font-black uppercase">
                        {book.category}
                      </Badge>
                    )}
                    {book.language && (
                      <Badge className="bg-muted text-muted-foreground border-none text-[9px] font-black uppercase">
                        {book.language}
                      </Badge>
                    )}
                  </div>
                  {book.price && (
                    <p className="font-black text-sm text-foreground">${Number(book.price).toFixed(2)}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <p className="text-center text-[10px] font-black text-muted-foreground uppercase tracking-widest py-2">
        {!loading && `${filtered.length} book${filtered.length !== 1 ? "s" : ""}`}
      </p>
    </div>
  )
}
