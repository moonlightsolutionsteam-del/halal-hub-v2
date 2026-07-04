"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function HeaderSearch() {
  const router = useRouter()
  const [query, setQuery] = useState("")

  const submit = () => {
    const q = query.trim()
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <div className="hidden md:flex items-center relative w-96 max-w-lg mx-4">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="Search for food, products, mosques..."
        className="pl-9 h-11 rounded-2xl bg-muted/50 border border-transparent font-medium text-sm transition-colors duration-200 focus-visible:border-primary/30 focus-visible:bg-card focus-visible:ring-primary/15"
      />
    </div>
  )
}
