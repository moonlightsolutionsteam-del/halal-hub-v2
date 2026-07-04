"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateMosqueProgramPage() {
  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">
      <Link href="/vendor/mosque/programs" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit">
        <ArrowLeft className="h-4 w-4" />Back to Programs
      </Link>
      <h1 className="text-3xl font-black font-headline text-foreground tracking-tight">New Program</h1>

      <Card className="rounded-[2rem] border-none shadow-soft">
        <CardHeader><CardTitle className="text-lg font-black">Program Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="program-name">Program Name</Label>
            <Input id="program-name" placeholder="e.g., Hifz Program" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="program-capacity">Capacity</Label>
            <Input id="program-capacity" type="number" placeholder="e.g., 50" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="program-desc">Description</Label>
            <Textarea id="program-desc" placeholder="Describe the program..." className="min-h-[100px]" />
          </div>
          <Button className="w-full rounded-full h-12 font-bold">Create Program</Button>
        </CardContent>
      </Card>
    </div>
  )
}
