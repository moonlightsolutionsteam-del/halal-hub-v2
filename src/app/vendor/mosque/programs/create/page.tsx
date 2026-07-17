"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"

export default function CreateMosqueProgramPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [name, setName] = React.useState("")
  const [capacity, setCapacity] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)

  async function handleCreate() {
    if (!user?.uid || !name.trim()) return
    setSubmitting(true)
    const lines = []
    if (capacity) lines.push(`Capacity: ${capacity}`)
    const content = [...lines, "", description.trim()].join("\n").trim()
    const supabase = createClient()
    await supabase
      .from("community_posts")
      .insert({ title: name.trim(), content, category: "program", author_id: user.uid })
    setSubmitting(false)
    router.back()
  }

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">
      <Link href="/vendor/mosque/programs" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit">
        <ArrowLeft className="h-4 w-4" />Back to Programs
      </Link>
      <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">New Program</h1>

      <Card className="rounded-[2rem] border-none shadow-soft">
        <CardHeader><CardTitle className="text-lg font-black">Program Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="program-name">Program Name</Label>
            <Input id="program-name" placeholder="e.g., Hifz Program" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="program-capacity">Capacity</Label>
            <Input id="program-capacity" type="number" placeholder="e.g., 50" value={capacity} onChange={e => setCapacity(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="program-desc">Description</Label>
            <Textarea id="program-desc" placeholder="Describe the program..." className="min-h-[100px]" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <Button className="w-full rounded-full h-12 font-bold" onClick={handleCreate} disabled={submitting || !name.trim()}>
            {submitting ? "Creating…" : "Create Program"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
