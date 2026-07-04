"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bookmark, MapPin, Heart, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useSavedBusinesses } from "@/lib/saved-businesses-context"

export default function SavedPage() {
  const { saved, toggleSaved } = useSavedBusinesses()

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Saved Places</h1>
        <p className="text-sm font-bold text-muted-foreground">Businesses and places you&apos;ve bookmarked.</p>
      </div>

      {saved.length === 0 ? (
        <Card className="rounded-[2rem] border-none shadow-soft">
          <CardContent className="p-6 sm:p-12 text-center space-y-4">
            <Bookmark className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
            <div className="space-y-1">
              <p className="text-lg font-black text-foreground">Nothing saved yet</p>
              <p className="text-sm text-muted-foreground font-medium">Tap the heart on any listing to save it here.</p>
            </div>
            <Link href="/categories"><Button variant="outline" className="rounded-full mt-2">Explore the Directory</Button></Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {saved.map((b) => (
            <Card key={b.id} className="group rounded-[2rem] border-none shadow-soft hover:shadow-soft-md transition-shadow duration-200 overflow-hidden">
              <CardContent className="p-0 flex">
                <div className="relative w-24 shrink-0">
                  <Image src={`https://picsum.photos/seed/${b.id}-hero/200/200`} alt={b.name} fill className="object-cover" />
                </div>
                <div className="p-4 flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <Link href={`/entities/${b.id}`} className="min-w-0">
                      <p className="text-sm font-black text-foreground truncate group-hover:text-primary transition-colors">{b.name}</p>
                    </Link>
                    <button onClick={() => toggleSaved(b)} aria-label="Remove from saved">
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </button>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">{b.category}</Badge>
                  <p className="text-xs text-muted-foreground font-medium flex items-center gap-1"><MapPin className="h-3 w-3" />{b.location}</p>
                  <Link href={`/entities/${b.id}`} className="text-xs font-bold text-primary flex items-center gap-1 pt-1">
                    View Listing <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
