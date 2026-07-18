"use client"

import { Construction } from "lucide-react"

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Vendor Health Scores</h1>
        <p className="text-muted-foreground">Real-time health scoring for active vendor partners.</p>
      </div>
      <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
        <Construction className="h-12 w-12 text-muted-foreground/40" />
        <p className="text-muted-foreground font-medium">Coming in Phase 2+</p>
        <p className="text-sm text-muted-foreground max-w-sm">This module is part of the ERP V2 roadmap and will be built out in an upcoming sprint.</p>
      </div>
    </div>
  )
}
