
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Mail, Phone, MapPin, Globe,
  Send, MessageSquare, Clock, ShieldCheck,
  Zap, ArrowRight, Share2, Twitter,
  Instagram, Github, Linkedin, HelpCircle, Loader2, CheckCircle2
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [subject, setSubject] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [sent, setSent] = React.useState(false)

  async function handleSend() {
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({ title: "Missing fields", description: "Please fill in your name, email and message.", variant: "destructive" })
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setSent(true)
      toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." })
    } catch (err: any) {
      toast({ title: "Error", description: err?.message ?? "Something went wrong.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-12 max-w-6xl pb-32 text-foreground">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-10">
        <Badge variant="outline" className="px-4 py-1.5 rounded-full border-primary/20 text-primary font-black uppercase text-[10px] tracking-[0.2em] bg-primary/5">
          Get in Touch
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-black font-headline text-foreground tracking-tighter leading-tight">
          We're Here to Support the <span className="text-primary">Global Ummah</span>
        </h1>
        <p className="text-sm sm:text-xl text-muted-foreground font-medium italic">
          Whether you're a consumer with a question or a brand looking to join the hub, we'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Form */}
        <div className="lg:col-span-7 space-y-8">
          <Card className="rounded-[3rem] border-none shadow-sm bg-card p-10 space-y-10">
            <div className="space-y-2">
              <h2 className="text-2xl font-black">Send a Message</h2>
              <p className="text-sm text-muted-foreground font-medium italic">Our team usually responds within 24 hours.</p>
            </div>
            
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                <CheckCircle2 className="h-16 w-16 text-primary" />
                <h3 className="text-2xl font-black">Message Sent!</h3>
                <p className="text-muted-foreground font-medium">Our team will get back to you within 24 hours.</p>
                <Button variant="outline" className="rounded-2xl mt-4" onClick={() => { setSent(false); setName(""); setEmail(""); setSubject(""); setMessage("") }}>
                  Send another message
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Full Name</Label>
                    <Input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Email Address</Label>
                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Subject</Label>
                    <Input value={subject} onChange={e => setSubject(e.target.value)} placeholder="How can we help?" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Message</Label>
                    <Textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell us more..." className="min-h-[150px] rounded-2xl bg-muted border-none p-4 font-medium resize-none" />
                  </div>
                </div>
                <Button onClick={handleSend} disabled={loading} className="w-full h-16 rounded-[1.5rem] bg-primary hover:bg-primary/90 text-white font-black text-lg shadow-2xl transition-all active:scale-[0.98] group">
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <> Send Message <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>}
                </Button>
              </>
            )}
          </Card>
        </div>

        {/* Contact Info & Sidebar */}
        <div className="lg:col-span-5 space-y-10">
          <section className="space-y-6">
            <h3 className="text-xl font-black px-2 flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" /> Contact Channels
            </h3>
            <div className="space-y-4">
              {[
                { label: "General Support", val: "support@halalhub.com", icon: Mail, color: "text-blue-600", bg: "bg-blue-50" },
                { label: "Business Enquiries", val: "partners@halalhub.com", icon: Zap, color: "text-amber-600", bg: "bg-amber-50" },
                { label: "Phone Support", val: "+91 1800 555 0198", icon: Phone, color: "text-emerald-600", bg: "bg-emerald-50" },
              ].map((item, i) => (
                <Card key={i} className="rounded-[2rem] border-none shadow-sm bg-card p-6 group hover:shadow-md transition-all">
                  <div className="flex items-center gap-6">
                    <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner", item.bg, item.color)}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-0.5">{item.label}</p>
                      <p className="text-base font-black text-foreground">{item.val}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10 space-y-8">
            <h3 className="text-xl font-black flex items-center gap-2">
              <MapPin className="h-5 w-5 text-rose-500" /> Office Hubs
            </h3>
            <div className="space-y-6">
              {[
                { city: "London, UK", addr: "124 Baker Street, Marylebone" },
                { city: "Dubai, UAE", addr: "Downtown Business Bay, Level 42" },
                { city: "Mumbai, India", addr: "Bandra Kurla Complex, Hub Tower" },
              ].map((loc, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="h-2 w-2 rounded-full bg-muted mt-2 group-hover:bg-primary transition-colors" />
                  <div className="space-y-0.5">
                    <p className="text-sm font-black text-foreground uppercase tracking-tighter">{loc.city}</p>
                    <p className="text-xs font-medium text-muted-foreground leading-relaxed">{loc.addr}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none bg-zinc-900 text-white p-10 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <HelpCircle className="h-24 w-24 text-primary" />
            </div>
            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl font-black tracking-tight leading-tight">Need help fast?</h3>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed italic">
                "Our comprehensive Help Center has answers to 90% of all customer and vendor queries."
              </p>
              <Link href="/help" className="block">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-card/10 rounded-2xl h-14 font-black uppercase text-xs tracking-widest shadow-xl">
                  Visit Help Center
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
