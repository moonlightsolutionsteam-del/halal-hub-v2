"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, RotateCcw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center space-y-6 pb-32">
      <div className="h-16 w-16 rounded-3xl bg-red-100 dark:bg-red-950/40 flex items-center justify-center">
        <AlertCircle className="h-8 w-8 text-red-500" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl sm:text-3xl font-black font-headline text-foreground">Something went wrong</h2>
        <p className="text-muted-foreground font-medium max-w-sm mx-auto text-sm">
          An unexpected error occurred. Please try again or go back to the home page.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={reset} className="bg-primary hover:bg-primary/90 rounded-2xl h-12 px-6 font-bold shadow-lg shadow-primary/20">
          <RotateCcw className="h-4 w-4 mr-2" /> Try Again
        </Button>
        <Link href="/">
          <Button variant="outline" className="rounded-2xl h-12 px-6 font-bold border-2">
            <Home className="h-4 w-4 mr-2" /> Go Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
