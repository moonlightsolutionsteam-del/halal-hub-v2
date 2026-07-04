"use client"

import { OnboardingProvider, useOnboarding } from "@/lib/onboarding-context"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { CheckCircle2, Circle } from "lucide-react"

const STEPS = [
  { label: "Category", path: "category", step: 0 },
  { label: "Business Info", path: "details", step: 1 },
  { label: "Location", path: "location", step: 2 },
  { label: "Hours", path: "hours", step: 3 },
  { label: "Contact", path: "contact", step: 4 },
  { label: "Halal", path: "halal", step: 5 },
  { label: "Media", path: "media", step: 6 },
  { label: "Review", path: "review", step: 7 },
]

function ProgressHeader() {
  const { draft } = useOnboarding()
  const pathname = usePathname()

  const currentPath = pathname.split("/").pop() || ""
  const currentIdx = STEPS.findIndex((s) => s.path === currentPath)

  if (currentPath === "success") return null

  return (
    <div className="border-b bg-card sticky top-0 z-40 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {STEPS.map((s, idx) => {
            const isDone = draft.currentStep > s.step || (currentIdx >= 0 && currentIdx > idx)
            const isActive = currentPath === s.path
            return (
              <div key={s.path} className="flex items-center gap-1 shrink-0">
                <div className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-colors",
                  isActive ? "bg-primary text-white" :
                  isDone ? "bg-primary/10 text-primary" :
                  "text-muted-foreground"
                )}>
                  {isDone && !isActive
                    ? <CheckCircle2 className="h-3.5 w-3.5" />
                    : <span className="w-3.5 h-3.5 flex items-center justify-center">{s.step + 1}</span>
                  }
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
                {idx < STEPS.length - 1 && (
                  <div className={cn("w-4 h-0.5 rounded-full", isDone ? "bg-primary/40" : "bg-muted")} />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <OnboardingProvider>
      <ProgressHeader />
      <div className="min-h-screen bg-muted/30">
        {children}
      </div>
    </OnboardingProvider>
  )
}
