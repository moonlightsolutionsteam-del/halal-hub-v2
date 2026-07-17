"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, BookOpen } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"

type Program = {
  id: string
  title: string | null
  content: string | null
  created_at: string | null
}

function parseCapacity(content: string | null): number | null {
  if (!content) return null
  const match = content.match(/Capacity:\s*(\d+)/)
  return match ? parseInt(match[1]) : null
}

export default function MosqueProgramsPage() {
  const { user, loading: authLoading } = useAuth()
  const [programs, setPrograms] = React.useState<Program[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (authLoading || !user?.uid) { setLoading(false); return }
    const supabase = createClient()
    ;(supabase as any)
      .from("community_posts")
      .select("id, title, content, created_at")
      .eq("author_id", user.uid)
      .like("category", "%program%")
      .order("created_at", { ascending: false })
      .then(({ data }: { data: Program[] | null }) => {
        setPrograms(data ?? [])
        setLoading(false)
      })
  }, [user?.uid, authLoading])

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Programs</h1>
          <p className="text-sm font-bold text-muted-foreground">Track enrollment across your educational programs.</p>
        </div>
        <Link href="/vendor/mosque/programs/create">
          <Button className="rounded-full"><PlusCircle className="h-4 w-4 mr-2" />New Program</Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="h-6 w-6 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : programs.length === 0 ? (
        <Card className="rounded-[2rem] border-none shadow-soft p-12 text-center space-y-3">
          <BookOpen className="h-10 w-10 text-muted-foreground/30 mx-auto" />
          <p className="font-black text-foreground">No programs yet</p>
          <p className="text-sm text-muted-foreground">Create your first program to start tracking enrollment.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {programs.map((program) => {
            const capacity = parseCapacity(program.content)
            return (
              <Card key={program.id} className="rounded-[2rem] border-none shadow-soft">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-black text-foreground">{program.title ?? "—"}</h3>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  {capacity && (
                    <p className="text-xs font-bold text-muted-foreground">Capacity: {capacity}</p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
