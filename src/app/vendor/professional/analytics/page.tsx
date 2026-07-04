"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart2, Eye, Users, Search, TrendingUp, MapPin, Briefcase, ArrowUpRight, ArrowDownRight } from "lucide-react"

const VIEWS_DATA = [180, 240, 195, 320, 280, 410, 380, 520, 490, 610, 580, 720, 680, 840]

const SEARCH_TERMS = [
  { term: "Brand Strategist London", appearances: 284, clicks: 47 },
  { term: "Islamic Marketing Consultant", appearances: 219, clicks: 38 },
  { term: "Halal Brand Strategy", appearances: 176, clicks: 29 },
  { term: "Muslim Consumer Marketing", appearances: 143, clicks: 22 },
  { term: "Marketing Consultant Remote", appearances: 98, clicks: 14 },
]

const LOCATIONS = [
  { city: "London, UK", pct: 28 },
  { city: "Dubai, UAE", pct: 19 },
  { city: "Kuala Lumpur", pct: 14 },
  { city: "Toronto, CA", pct: 11 },
  { city: "New York, US", pct: 9 },
  { city: "Other", pct: 19 },
]

export default function ProfessionalAnalyticsPage() {
  const maxViews = Math.max(...VIEWS_DATA)

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-600 font-black uppercase tracking-widest text-[10px]">
            <BarChart2 className="h-3 w-3" /> Analytics
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Profile Analytics</h1>
          <p className="text-sm font-bold text-muted-foreground">Understand who's viewing your profile and how they find you.</p>
        </div>
        <Select defaultValue="30">
          <SelectTrigger className="w-40 h-11 rounded-2xl bg-card border-none shadow-sm font-bold">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-2xl">
            <SelectItem value="7" className="font-bold">Last 7 days</SelectItem>
            <SelectItem value="30" className="font-bold">Last 30 days</SelectItem>
            <SelectItem value="90" className="font-bold">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Profile Views", value: "1,284", change: "+38%", up: true, icon: Eye },
          { label: "Search Appearances", value: "4,821", change: "+24%", up: true, icon: Search },
          { label: "Connection Rate", value: "12.4%", change: "+3%", up: true, icon: Users },
          { label: "Opportunity Views", value: "94", change: "-5%", up: false, icon: Briefcase },
        ].map(s => (
          <Card key={s.label} className="rounded-[2rem] border-none shadow-sm bg-card p-6 space-y-2">
            <div className="flex items-center justify-between">
              <s.icon className="h-4 w-4 text-violet-600" />
              <div className={`flex items-center gap-1 text-[10px] font-black ${s.up ? "text-emerald-600" : "text-rose-600"}`}>
                {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {s.change}
              </div>
            </div>
            <p className="text-2xl font-black text-foreground">{s.value}</p>
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Views Chart */}
      <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-6">
        <h2 className="text-lg font-black flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-violet-600" /> Profile Views — Last 14 Days
        </h2>
        <div className="flex items-end gap-2 h-40">
          {VIEWS_DATA.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
              <div className="relative flex-1 w-full flex items-end">
                <div
                  className="w-full bg-violet-600 rounded-t-lg opacity-80 group-hover:opacity-100 transition-opacity"
                  style={{ height: `${(v / maxViews) * 100}%`, minHeight: "4px" }}
                />
              </div>
              <span className="text-[9px] font-bold text-muted-foreground">{i + 1}</span>
            </div>
          ))}
        </div>
        <p className="text-[11px] font-bold text-muted-foreground text-center">Days ago (14 → 1)</p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Search Terms */}
        <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-5">
          <h2 className="text-lg font-black flex items-center gap-2">
            <Search className="h-5 w-5 text-violet-600" /> How People Find You
          </h2>
          <div className="space-y-4">
            {SEARCH_TERMS.map((t, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-foreground truncate flex-1 pr-4">{t.term}</span>
                  <span className="text-violet-600 shrink-0">{t.clicks} clicks</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-violet-600 rounded-full" style={{ width: `${(t.appearances / 284) * 100}%` }} />
                </div>
                <p className="text-[10px] font-bold text-muted-foreground">{t.appearances} appearances</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Location Breakdown */}
        <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-5">
          <h2 className="text-lg font-black flex items-center gap-2">
            <MapPin className="h-5 w-5 text-violet-600" /> Viewer Locations
          </h2>
          <div className="space-y-4">
            {LOCATIONS.map((l, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-foreground">{l.city}</span>
                  <span className="text-violet-600">{l.pct}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-violet-600 rounded-full" style={{ width: `${l.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Upgrade Card */}
      <Card className="rounded-[2rem] border-none shadow-sm bg-gradient-to-r from-violet-600 to-violet-700 text-white p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 space-y-2">
            <Badge className="bg-white/20 text-white border-none font-black text-[10px]">Premium Insights</Badge>
            <h3 className="text-xl font-black">See Who Viewed Your Profile</h3>
            <p className="text-sm text-white/80 font-medium">Upgrade to Pro to see the exact companies and professionals viewing your profile.</p>
          </div>
          <Button className="bg-white text-violet-700 hover:bg-white/90 rounded-2xl font-black h-12 px-8 shrink-0">
            Upgrade to Pro
          </Button>
        </div>
      </Card>
    </div>
  )
}
