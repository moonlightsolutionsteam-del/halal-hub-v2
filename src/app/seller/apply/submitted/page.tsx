"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, Bell, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function SellerAppliedPage() {
  return (
    <div className="p-4 md:p-6 max-w-lg mx-auto space-y-6 text-center">
      <div className="py-8 space-y-3">
        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-black text-foreground">Application Submitted!</h1>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          Your seller application is under review. We'll get back to you within 48 hours.
        </p>
      </div>

      <div className="space-y-3 text-left">
        {[
          { icon: Clock, title: "Review in 48 hours", desc: "Our team will verify your documents and halal compliance" },
          { icon: Bell, title: "You'll get notified", desc: "SMS and in-app notification when your store is approved" },
          { icon: MessageSquare, title: "WhatsApp follow-up", desc: "We'll reach out if we need additional documents" },
        ].map(({ icon: Icon, title, desc }) => (
          <Card key={title} className="rounded-2xl border-none shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-black text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-3 pt-2">
        <Link href="/explore">
          <Button className="w-full rounded-xl font-bold">Back to HalalHub</Button>
        </Link>
        <Link href="/account/dashboard">
          <Button variant="outline" className="w-full rounded-xl font-bold">My Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}
