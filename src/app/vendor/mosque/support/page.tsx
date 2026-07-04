"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Headset, Mail, Phone, MessageSquare } from "lucide-react"

export default function MosqueSupportPage() {
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline text-foreground tracking-tight">Support Center</h1>
        <p className="text-sm font-bold text-muted-foreground">Get help managing your masjid&apos;s panel.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="rounded-[2rem] border-none shadow-soft text-center">
          <CardContent className="p-6 space-y-2">
            <MessageSquare className="h-6 w-6 text-teal-600 mx-auto" />
            <p className="text-sm font-black text-foreground">Live Chat</p>
            <p className="text-xs text-muted-foreground">Avg reply in 5 min</p>
          </CardContent>
        </Card>
        <Card className="rounded-[2rem] border-none shadow-soft text-center">
          <CardContent className="p-6 space-y-2">
            <Mail className="h-6 w-6 text-teal-600 mx-auto" />
            <p className="text-sm font-black text-foreground">Email Us</p>
            <p className="text-xs text-muted-foreground">partners@halalhub.com</p>
          </CardContent>
        </Card>
        <Card className="rounded-[2rem] border-none shadow-soft text-center">
          <CardContent className="p-6 space-y-2">
            <Phone className="h-6 w-6 text-teal-600 mx-auto" />
            <p className="text-sm font-black text-foreground">Call Support</p>
            <p className="text-xs text-muted-foreground">Mon-Fri, 9am-6pm</p>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-[2rem] border-none shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg font-black flex items-center gap-2">
            <Headset className="h-5 w-5 text-teal-600" />Submit a Ticket
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="e.g., Unable to update prayer times" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Describe your issue..." className="min-h-[120px]" />
          </div>
          <Button className="rounded-full">Submit Ticket</Button>
        </CardContent>
      </Card>
    </div>
  )
}
