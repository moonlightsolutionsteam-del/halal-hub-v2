"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useOnboarding } from "@/lib/onboarding-context"
import { CheckCircle2, LayoutDashboard, Clock } from "lucide-react"

const CATEGORY_DASHBOARD: Record<string, string> = {
  food: "/vendor/dashboard",
  meat: "/vendor/butcher/dashboard",
  grocery: "/vendor/grocery/dashboard",
  catering: "/vendor/catering/dashboard",
  events: "/vendor/events/dashboard",
  hotels: "/vendor/hotel/dashboard",
  travel: "/vendor/travel/dashboard",
  fashion: "/vendor/fashion/dashboard",
  cosmetics: "/vendor/cosmetics/dashboard",
  finance: "/vendor/finance/dashboard",
  healthcare: "/vendor/healthcare/dashboard",
  education: "/vendor/education/dashboard",
  media: "/vendor/media/dashboard",
  certifier: "/admin/certification-body",
}

export default function SuccessPage() {
  const { draft, reset } = useOnboarding()
  const dashboardUrl = CATEGORY_DASHBOARD[draft.category] ?? "/vendor/dashboard"

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 bg-muted/20">
      <div className="max-w-lg w-full space-y-8 text-center">
        <div className="flex justify-center">
          <div className="relative">
            <div className="h-28 w-28 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center">
              <CheckCircle2 className="h-16 w-16 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="absolute -top-2 -right-2 h-8 w-8 bg-primary rounded-full flex items-center justify-center animate-bounce">
              <span className="text-white text-sm font-black">✓</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-black font-headline text-foreground">Submitted!</h1>
          <p className="text-lg font-bold text-muted-foreground">
            {draft.businessName ? `"${draft.businessName}"` : "Your listing"} has been submitted for review.
          </p>
        </div>

        <Card className="rounded-[2rem] border-none shadow-soft bg-card text-left">
          <CardContent className="p-8 space-y-5">
            <p className="text-sm font-black text-foreground">What happens next?</p>
            {[
              { icon: Clock, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30", step: "01", title: "Under Review", desc: "Our halal verification team reviews your documents and listing details within 24–48 hours." },
              { icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30", step: "02", title: "Approval Email", desc: "You'll receive an email with your approval status and a link to your Business Dashboard." },
              { icon: LayoutDashboard, color: "text-primary bg-primary/10", step: "03", title: "Go Live", desc: "Once approved, your listing is visible to millions of halal-conscious consumers." },
            ].map(({ icon: Icon, color, step, title, desc }) => (
              <div key={step} className="flex items-start gap-4">
                <div className={`h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 ${color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-black text-foreground">{title}</p>
                  <p className="text-xs font-medium text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Link href={dashboardUrl} onClick={reset}>
            <Button className="w-full h-14 rounded-2xl font-black bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 text-sm">
              <LayoutDashboard className="mr-2 h-5 w-5" /> Go to Business Dashboard
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full h-12 rounded-2xl font-black border-2 uppercase text-xs tracking-widest">
              Back to Home
            </Button>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground font-medium">
          Questions? Contact us at <span className="font-bold text-primary">support@halalhub.com</span>
        </p>
      </div>
    </div>
  )
}
