"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tag, Plus, GraduationCap, Calendar, Users, Zap, Clock, CheckCircle2, ShieldCheck } from "lucide-react"

const ACTIVE_OFFERS = [
  {
    id: 1,
    title: "Early Bird Enrolment Discount",
    type: "Percentage",
    value: "20% OFF",
    scope: "All Courses",
    expiry: "31 Aug 2026",
    redemptions: 47,
    status: "Active",
  },
  {
    id: 2,
    title: "Sibling Scholarship",
    type: "Fixed Amount",
    value: "£150 OFF",
    scope: "Per Additional Sibling",
    expiry: "Ongoing",
    redemptions: 28,
    status: "Active",
  },
  {
    id: 3,
    title: "Ramadan Intensive Programme",
    type: "Special Pricing",
    value: "£99 Full Access",
    scope: "Ramadan Courses",
    expiry: "30 Apr 2026",
    redemptions: 12,
    status: "Scheduled",
  },
]

export default function EducationOffersPage() {
  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-600 font-black uppercase tracking-widest text-[10px]">
            <Tag className="h-3 w-3" /> Offers & Scholarships
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Offers & Scholarships</h1>
          <p className="text-sm font-bold text-muted-foreground">Create tuition discounts, scholarships, and enrolment promotions.</p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700 rounded-2xl px-8 font-black shadow-lg shadow-violet-200 h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> Create Offer
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: "Active Offers", value: "3", icon: Tag, color: "bg-violet-50 text-violet-600" },
          { label: "Total Redemptions", value: "87", icon: Users, color: "bg-emerald-50 text-emerald-600" },
          { label: "Est. Revenue Impact", value: "−£6.2k", icon: Zap, color: "bg-rose-50 text-rose-600" },
        ].map((stat) => (
          <Card key={stat.label} className="rounded-[2rem] border-none shadow-sm bg-card p-6">
            <div className="flex items-center gap-4">
              <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black text-foreground">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-black flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-violet-600" /> Active Programmes
        </h2>
        <div className="space-y-4">
          {ACTIVE_OFFERS.map((offer) => (
            <Card key={offer.id} className="rounded-[2rem] border-none shadow-sm bg-card p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-600 shrink-0">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-black text-foreground">{offer.title}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="bg-violet-50 text-violet-600 border-none font-black text-[10px] px-3">{offer.value}</Badge>
                      <span className="text-xs font-bold text-muted-foreground">{offer.scope}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Expires: {offer.expiry}</span>
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {offer.redemptions} redemptions</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Badge className={`font-black text-[10px] px-3 border-none ${offer.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                    {offer.status}
                  </Badge>
                  <Button variant="outline" size="sm" className="rounded-xl font-black text-xs h-9 border-2 border-violet-100 text-violet-600 hover:bg-violet-50">
                    Edit
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-black flex items-center gap-2">
          <Plus className="h-5 w-5 text-violet-600" /> Create New Offer
        </h2>
        <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 space-y-2">
              <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Offer Title</Label>
              <Input placeholder="e.g., Ramadan Intensive Programme" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Discount Type</Label>
              <Select>
                <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-none shadow-xl">
                  <SelectItem value="percent">Percentage Discount</SelectItem>
                  <SelectItem value="fixed">Fixed Amount Off</SelectItem>
                  <SelectItem value="scholarship">Full Scholarship</SelectItem>
                  <SelectItem value="bundle">Bundle Pricing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Discount Value</Label>
              <Input placeholder="e.g., 20 or £150" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Applicable Courses</Label>
              <Input placeholder="e.g., All Courses, Hifz Programme" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Expiry Date</Label>
              <Input type="date" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Conditions & Notes</Label>
              <Textarea
                placeholder="e.g., Valid for new enrolments only. One discount per student."
                className="min-h-[100px] rounded-2xl bg-muted border-none p-4 font-medium"
              />
            </div>
          </div>
          <Button className="w-full h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black text-sm tracking-widest">
            Publish Offer
          </Button>
        </Card>
      </section>

      <Card className="rounded-[2.5rem] border-none shadow-xl bg-zinc-900 text-white p-10 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
        <ShieldCheck className="absolute -top-4 -right-4 h-48 w-48 opacity-10 text-violet-400" />
        <div className="h-20 w-20 rounded-[2rem] bg-white/10 flex items-center justify-center text-violet-400 shrink-0">
          <Zap className="h-10 w-10" />
        </div>
        <div className="space-y-2 relative z-10">
          <h3 className="text-2xl font-black tracking-tight">Boost Enrolments with Credits</h3>
          <p className="text-muted-foreground font-medium leading-relaxed">
            Use listing credits to feature your institution at the top of Halal Hub search results during peak enrolment seasons.
          </p>
        </div>
        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-xl h-12 px-8 font-black text-xs uppercase tracking-widest relative z-10 shrink-0">
          Buy Credits
        </Button>
      </Card>
    </div>
  )
}
