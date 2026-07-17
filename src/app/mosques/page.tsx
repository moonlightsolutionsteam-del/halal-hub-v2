import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Search, MapPin, Star, ArrowLeft,
  Building2, CheckCircle2, Sparkles, Navigation, Plus
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const TABS = ["All", "Jumu'ah Service", "Wudu Facilities", "Islamic Classes", "Sisters' Section", "Prayer Timings"]

export default async function MosquesPage() {
  type MosqueRow = { id: string; name: string; category: string | null; city: string | null; country: string | null; rating: number | null; halal_verified: boolean | null; image_url: string | null; logo_url: string | null; description: string | null }

  const supabase = await createClient()

  const { data: rawMosques } = await supabase
    .from("businesses")
    .select("id, name, category, city, country, rating, halal_verified, image_url, logo_url, description")
    .eq("status", "active")
    .or("category.ilike.%mosque%,category.ilike.%masjid%,category.ilike.%islamic centre%,category.ilike.%islamic center%")
    .order("rating", { ascending: false })
    .limit(50)

  const entities: MosqueRow[] = rawMosques ?? []

  return (
    <div className="container mx-auto p-3 sm:p-6 space-y-4 sm:space-y-10 max-w-7xl">
      <div className="flex flex-col gap-3 sm:gap-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-8">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="h-9 w-9 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl flex items-center justify-center bg-teal-100 text-teal-600 shadow-inner">
              <Building2 className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-5xl font-black font-headline text-foreground tracking-tight">Mosques & Centres</h1>
              <p className="text-muted-foreground font-medium text-xs sm:text-xl">
                Find verified mosques, Islamic centres, and prayer spaces near you.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search mosques or city..."
                className="pl-9 sm:pl-11 h-10 sm:h-14 rounded-xl sm:rounded-2xl bg-card border-none shadow-sm font-medium w-full px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <Button variant="outline" className="h-10 sm:h-14 rounded-xl sm:rounded-2xl bg-card border-none shadow-sm px-4 sm:px-6 font-black text-xs gap-2 whitespace-nowrap">
              <Navigation className="h-4 w-4" /> <span className="hidden sm:inline">Near Me</span>
            </Button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {TABS.map(tab => (
            <button
              key={tab}
              className={`shrink-0 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-xs sm:text-sm font-black transition-all ${
                tab === "All"
                  ? "bg-primary text-white shadow-md"
                  : "bg-card text-muted-foreground border border-border hover:border-primary/30 hover:text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {entities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
          <div className="h-20 w-20 rounded-3xl bg-teal-50 flex items-center justify-center">
            <Building2 className="h-10 w-10 text-teal-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-foreground">No mosques listed yet</h2>
            <p className="text-muted-foreground max-w-md text-sm">
              Mosques on Halal Hub are community-suggested, not self-listed. Help the community find prayer spaces by suggesting a mosque.
            </p>
          </div>
          <Link href="/suggest">
            <Button className="rounded-2xl h-14 px-8 font-black bg-teal-600 hover:bg-teal-700 text-white shadow-lg gap-2">
              <Plus className="h-5 w-5" /> Suggest a Mosque
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {entities.map(mosque => (
            <Link key={mosque.id} href={`/entities/${mosque.id}`}>
              <Card className="group rounded-[2rem] border-none shadow-sm overflow-hidden hover:shadow-xl transition-all duration-500 bg-card h-full flex flex-col border border-transparent hover:border-teal-200">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={mosque.image_url || mosque.logo_url || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&auto=format&q=80"}
                    alt={mosque.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {mosque.halal_verified && (
                      <Badge className="bg-white/90 text-teal-700 font-black border-none text-[10px] px-2 gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Verified
                      </Badge>
                    )}
                  </div>
                  {mosque.rating && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-xs font-black px-2 py-1 rounded-full">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {mosque.rating.toFixed(1)}
                    </div>
                  )}
                </div>
                <CardContent className="p-4 flex-1 space-y-2">
                  <p className="font-black text-foreground group-hover:text-teal-600 transition-colors leading-tight">{mosque.name}</p>
                  {mosque.category && (
                    <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest">{mosque.category}</p>
                  )}
                  {(mosque.city || mosque.country) && (
                    <div className="flex items-center gap-1 text-xs font-bold text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {[mosque.city, mosque.country].filter(Boolean).join(", ")}
                    </div>
                  )}
                  {mosque.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{mosque.description}</p>
                  )}
                </CardContent>
                <CardFooter className="px-4 pb-4 pt-0">
                  <Button variant="outline" className="w-full rounded-xl h-10 font-black text-xs border-2 hover:border-teal-500 hover:text-teal-600 transition-colors">
                    View Mosque
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Suggest CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-8 bg-teal-50 dark:bg-teal-950/20 rounded-[2rem] border border-teal-100 dark:border-teal-900">
        <div className="text-center sm:text-left space-y-1">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <Sparkles className="h-4 w-4 text-teal-600" />
            <p className="font-black text-teal-900 dark:text-teal-400">Know a mosque not listed here?</p>
          </div>
          <p className="text-sm text-teal-700 dark:text-teal-500 font-medium">
            Mosques are community-suggested. Help your community find their local prayer space.
          </p>
        </div>
        <Link href="/suggest">
          <Button className="rounded-2xl h-12 px-8 font-black bg-teal-600 hover:bg-teal-700 text-white shadow-lg gap-2 whitespace-nowrap">
            <Plus className="h-5 w-5" /> Suggest a Mosque
          </Button>
        </Link>
      </div>
    </div>
  )
}
