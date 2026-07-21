"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, Loader2, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
type Profile = {
  id: string
  name: string | null
  photo_url: string | null
}

export default function AddPeoplePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<Profile[]>([])
  const [loading, setLoading] = React.useState(false)
  const [debouncedQuery, setDebouncedQuery] = React.useState("")

  React.useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300)
    return () => clearTimeout(t)
  }, [query])

  React.useEffect(() => {
    if (!debouncedQuery.trim() || !user?.uid) {
      setResults([])
      return
    }
    setLoading(true)
    const supabase = createClient()
    supabase
      .from("profiles")
      .select("id, name, photo_url")
      .ilike("name", `%${debouncedQuery.trim()}%`)
      .neq("id", user.uid)
      .limit(20)
      .then(({ data }) => {
        setResults((data as Profile[] | null) ?? [])
        setLoading(false)
      })
  }, [debouncedQuery, user?.uid])

  return (
    <div className="p-4 space-y-5 max-w-2xl mx-auto pb-24">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name…"
          className="pl-9 h-12 rounded-2xl bg-card border-none shadow-sm font-medium"
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {!loading && query.trim() && results.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 gap-2 text-center">
          <p className="font-black text-foreground">No users found</p>
          <p className="text-sm text-muted-foreground">Try a different name.</p>
        </div>
      )}

      {!loading && !query.trim() && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <Search className="h-10 w-10 text-muted-foreground/20" />
          <p className="font-black text-foreground">Search for people</p>
          <p className="text-sm text-muted-foreground">Type a name to find someone to message.</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-2">
          {results.map(profile => (
            <button
              key={profile.id}
              onClick={() => router.push(`/messages/${profile.id}`)}
              className="w-full flex items-center gap-3 p-3 rounded-2xl bg-card hover:bg-muted transition-colors text-left"
            >
              <Avatar className="h-11 w-11 shrink-0">
                {profile.photo_url && <AvatarImage src={profile.photo_url} />}
                <AvatarFallback className="font-black text-sm">
                  {(profile.name ?? "?")[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-black text-sm text-foreground truncate">{profile.name ?? "Unnamed"}</p>
              </div>
              <MessageSquare className="h-4 w-4 text-muted-foreground shrink-0" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
