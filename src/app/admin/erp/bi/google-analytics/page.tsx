"use client"

import { BarChart2, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function GoogleAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline">Google Analytics</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Web and app traffic insights from Google Analytics 4.</p>
      </div>

      <Card>
        <CardContent className="pt-6 pb-6 space-y-6 text-center">
          <div className="h-16 w-16 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto">
            <BarChart2 className="h-8 w-8 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-lg font-black">Connect Google Analytics 4</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To embed GA4 reports here, set up a Looker Studio dashboard and embed it via iframe,
              or use the GA4 Data API with a service account.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-lg mx-auto">
            {[
              { step: "1", label: "Property ID", desc: "Get your GA4 Measurement ID from Analytics > Admin > Data Streams" },
              { step: "2", label: "Looker Studio", desc: "Create a GA4-connected report in Looker Studio and publish it" },
              { step: "3", label: "Embed", desc: "Paste the report iframe URL in NEXT_PUBLIC_GA_LOOKER_URL in .env.local" },
            ].map(s => (
              <div key={s.step} className="rounded-xl border border-border/60 bg-card p-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-black flex items-center justify-center mb-2">{s.step}</div>
                <p className="text-xs font-black text-foreground">{s.label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{s.desc}</p>
              </div>
            ))}
          </div>

          <Link href="https://analytics.google.com" target="_blank">
            <Button variant="outline" className="gap-2 rounded-xl font-bold">
              <ExternalLink className="h-4 w-4" /> Open Google Analytics
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
