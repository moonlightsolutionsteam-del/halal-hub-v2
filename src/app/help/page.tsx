
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  HelpCircle, Search, Filter, MessageSquare, 
  ShieldCheck, Globe, Star, Zap,
  ArrowRight, ChevronRight, Phone, Mail,
  BookOpen, Clock, Heart, Plus,
  LayoutGrid, ShoppingBag, Utensils
} from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"

const CATEGORIES = [
  { name: "General Hub", icon: Globe, color: "text-blue-600", bg: "bg-blue-50" },
  { name: "Verification", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
  { name: "Family Hub", icon: HelpCircle, color: "text-purple-600", bg: "bg-purple-50" },
  { name: "Ordering", icon: ShoppingBag, color: "text-orange-600", bg: "bg-orange-50" },
];

export default function HelpCenterPage() {
  return (
    <div className="container mx-auto p-6 space-y-12 max-w-6xl pb-32 text-slate-900">
      {/* Search Header */}
      <div className="text-center space-y-8 max-w-3xl mx-auto pt-10">
        <div className="space-y-4">
          <Badge variant="outline" className="px-4 py-1.5 rounded-full border-primary/20 text-primary font-black uppercase text-[10px] tracking-[0.2em] bg-primary/5">
            Knowledge Base
          </Badge>
          <h1 className="text-5xl font-black font-headline text-slate-900 tracking-tighter">How can we <span className="text-primary">Help You?</span></h1>
        </div>
        <div className="relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-300 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search for articles, guides, or tutorials..." 
            className="h-20 rounded-[2.5rem] bg-white border-none shadow-2xl pl-16 pr-8 text-xl font-medium focus-visible:ring-primary/20"
          />
        </div>
      </div>

      {/* Quick Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {CATEGORIES.map((cat, i) => (
          <Card key={i} className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 flex flex-col items-center text-center gap-4 hover:shadow-xl transition-all cursor-pointer group hover:bg-slate-50">
            <div className={cn("h-16 w-16 rounded-[1.5rem] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform", cat.bg, cat.color)}>
              <cat.icon className="h-8 w-8" />
            </div>
            <span className="text-sm font-black uppercase tracking-widest text-slate-900">{cat.name}</span>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main FAQ Section */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-2 px-4 border-l-4 border-primary">
            <h2 className="text-3xl font-black tracking-tight">Frequently Asked Questions</h2>
            <p className="text-muted-foreground font-medium italic">Top queries from our community.</p>
          </div>
          
          <Card className="rounded-[3rem] border-none shadow-sm bg-white overflow-hidden">
            <CardContent className="p-8">
              <Accordion type="single" collapsible className="w-full">
                {[
                  { q: "How is 'Halal Status' verified?", a: "We use a multi-step verification process including user-submitted certificates, independent 3rd party audits, and community feedback loops. Every 'Verified' listing has been audited within the last 12 months." },
                  { q: "Is the Family Hub data private?", a: "Yes. All family data, including lineage maps, heritage recipes, and shared boards, is encrypted and accessible only by members you explicitly invite. We follow a strict 'Theological Privacy' charter." },
                  { q: "How do Hub Coins work?", a: "Hub Coins are earned by contributing to the community—writing reviews, suggesting verified spots, or reaching wellness goals. You can redeem them for discounts at any partner restaurant or store." },
                  { q: "How do I become a Hub Partner?", a: "Businesses can apply through the Partner Portal. You'll need to provide proof of halal sourcing and hygiene certification to begin the onboarding process." },
                ].map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-slate-100 last:border-none">
                    <AccordionTrigger className="text-lg font-black text-slate-900 hover:text-primary hover:no-underline py-6">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-base font-medium text-slate-500 leading-relaxed pb-6">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Support CTA Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="rounded-[3rem] border-none shadow-xl bg-slate-900 text-white p-10 space-y-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <MessageSquare className="h-32 w-32" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="h-16 w-16 rounded-[1.5rem] bg-white/10 flex items-center justify-center text-primary border border-white/10 shadow-3xl">
                <Zap className="h-10 w-10 fill-current" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black tracking-tighter">Live Support</h3>
                <p className="text-sm text-slate-400 font-medium leading-relaxed italic">
                  "Couldn't find what you were looking for? Our community support specialists are available Mon-Sat."
                </p>
              </div>
              <div className="space-y-4">
                <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase text-xs tracking-widest shadow-xl">Start Chat Now</Button>
                <Link href="/contact" className="block">
                  <Button variant="outline" className="w-full h-14 rounded-2xl border-white/20 text-white hover:bg-white/10 font-black uppercase text-xs tracking-widest">Email Support</Button>
                </Link>
              </div>
            </div>
          </Card>

          <Card className="rounded-[3rem] border-none shadow-sm bg-white p-10 space-y-6">
            <h3 className="text-xl font-black">Top Guides</h3>
            <div className="space-y-4">
              {[
                { title: "Onboarding your Business", time: "5 min read", icon: BookOpen },
                { title: "Verifying your Lineage", time: "12 min read", icon: Users },
                { title: "Earning Hub Rewards", time: "3 min read", icon: Star },
              ].map((guide, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-primary/5 transition-all group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <guide.icon className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
                    <div>
                      <p className="text-sm font-bold text-slate-700">{guide.title}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{guide.time}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-200 group-hover:text-primary transition-all group-hover:translate-x-1" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
