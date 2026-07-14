"use client"

import { Headset, MessageSquare, BookOpen, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const FAQS = [
  { q: "How do I issue a certificate to a business?",         a: "Go to Certificate Management and click 'Issue New Certificate'. Fill in the business details, scope, and dates." },
  { q: "What happens when a certificate expires?",             a: "The business receives an automated alert. You can initiate a renewal from the Certificate Management page." },
  { q: "How do I schedule an audit?",                          a: "Navigate to Active Audits and click 'Schedule Audit'. Select the business, auditor, and date." },
  { q: "Can I revoke a certificate?",                          a: "Yes. From Certificate Management, click the actions menu on the certificate and select 'Revoke'." },
]

export default function SupportPage() {
  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen">
      <div className="space-y-1">
        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Administration</div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Support Center</h1>
        <p className="text-muted-foreground font-medium text-sm">Get help from the Halal Hub team or browse common questions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-[2rem] border-none shadow-sm bg-card">
            <CardHeader className="p-6 sm:p-8 border-b">
              <CardTitle className="text-xl font-black">Submit a Support Request</CardTitle>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 space-y-5">
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest">Subject</Label>
                <Input placeholder="Briefly describe your issue..." className="rounded-2xl h-12 font-medium" />
              </div>
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest">Message</Label>
                <Textarea placeholder="Describe your issue in detail..." className="rounded-2xl font-medium min-h-[140px]" />
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-12 px-8 font-black gap-2">
                <MessageSquare className="h-4 w-4" /> Send Request
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-sm bg-card">
            <CardHeader className="p-6 sm:p-8 border-b">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-emerald-600" />
                <CardTitle className="text-xl font-black">Frequently Asked Questions</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 space-y-5">
              {FAQS.map((faq, i) => (
                <div key={i} className="p-5 rounded-2xl bg-muted/50 space-y-2">
                  <p className="font-black text-foreground text-sm">{faq.q}</p>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-6 sm:p-8 space-y-5">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
              <Headset className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-black text-foreground text-lg">Direct Support</h3>
              <p className="text-sm text-muted-foreground font-medium mt-1">Our Halal Hub team is available Mon–Fri, 9am–6pm.</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm font-bold text-foreground">
                <Mail className="h-4 w-4 text-emerald-600" /> support@halalhub.com
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-foreground">
                <Phone className="h-4 w-4 text-emerald-600" /> +91 98765 43210
              </div>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-6 sm:p-8 space-y-4">
            <BookOpen className="h-8 w-8 text-emerald-400" />
            <div>
              <h3 className="font-black text-lg">Documentation</h3>
              <p className="text-xs text-zinc-400 font-medium mt-1 leading-relaxed">
                Full guides for certification workflows, audit checklists, and compliance requirements.
              </p>
            </div>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-11 font-black text-xs uppercase tracking-widest">
              View Docs
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
