
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, Filter, MoreVertical, 
  ShieldCheck, Star, ArrowUpRight,
  BarChart3, MapPin, Users, Download,
  MessageSquare, Clock, CheckCircle2,
  ChevronDown, Store, Tag, Plus,
  Heart, Activity, FileText, Landmark
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

const MeatIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.5 2a2.5 2.5 0 0 0-2.5 2.5V6a3 3 0 0 0 3 3h1a2 2 0 0 1 2 2v1a3 3 0 0 1-3 3h-1a3 3 0 0 1-3-3v-1.5" />
    <path d="M15 22a7 7 0 0 0 7-7c0-2.5-2-4.5-4.5-4.5h-1a2.5 2.5 0 0 0-2.5 2.5V15a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-1" />
    <circle cx="15" cy="15" r="1" />
  </svg>
)

export default function SuperAdminRestaurantManagement() {
  const [activeTab, setActiveTab] = React.useState("dashboard")

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-24">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline text-slate-900">Restaurants</h1>
        <p className="text-muted-foreground font-medium">Manage restaurant listings, verifications, and categories.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="flex items-center justify-between">
          <TabsList className="bg-transparent h-auto p-0 gap-2 overflow-x-auto no-scrollbar justify-start">
            <TabsTrigger value="dashboard" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 pb-2 font-bold text-slate-500 data-[state=active]:text-primary transition-all shadow-none">Dashboard</TabsTrigger>
            <TabsTrigger value="all" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 pb-2 font-bold text-slate-500 data-[state=active]:text-primary transition-all shadow-none">All Restaurants</TabsTrigger>
            <TabsTrigger value="verification" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 pb-2 font-bold text-slate-500 data-[state=active]:text-primary transition-all shadow-none">Verification Queue</TabsTrigger>
            <TabsTrigger value="moderation" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 pb-2 font-bold text-slate-500 data-[state=active]:text-primary transition-all shadow-none">Reviews & Moderation</TabsTrigger>
            <TabsTrigger value="promotions" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 pb-2 font-bold text-slate-500 data-[state=active]:text-primary transition-all shadow-none">Offers & Promotions</TabsTrigger>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-4 pb-2 font-bold text-slate-500 hover:text-slate-900 outline-none border-b-2 border-transparent">
                  More <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-2xl p-2 border-none shadow-xl min-w-[200px]">
                {[
                  "Loyalty Rewards",
                  "Events Moderation",
                  "Halal Governance",
                  "Certificates & Onboarding Kit",
                  "Categories",
                  "Services",
                  "Coins, Wallet & Billing"
                ].map((item) => (
                  <DropdownMenuItem key={item} className="rounded-xl font-bold text-slate-600 hover:text-primary">
                    {item}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="space-y-8 m-0 animate-in fade-in duration-500">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900">Restaurant Dashboard</h2>
            <p className="text-sm text-muted-foreground font-medium">High-level overview of restaurant performance and activity.</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Total Restaurants</span>
                <div className="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-100 transition-colors">
                  <Store className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-slate-900">890</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase">+15 new this month</p>
              </div>
            </Card>

            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Verified Listings</span>
                <div className="h-10 w-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-slate-900">750</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">84% of total</p>
              </div>
            </Card>

            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Pending Approvals</span>
                <div className="h-10 w-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <Clock className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-slate-900">8</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">New listings to review</p>
              </div>
            </Card>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Reviews */}
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black">Recent Reviews</h3>
                <Button variant="outline" size="sm" className="rounded-full font-black text-[10px] uppercase border-2 text-primary hover:bg-primary/5 px-4 h-8">
                  View All <ArrowUpRight className="ml-1.5 h-3 w-3" />
                </Button>
              </div>
              <div className="space-y-6">
                {[
                  { user: "Aisha K.", restaurant: "Karim's Restaurant", rating: 5, comment: "Amazing food as always!", initial: "AK", color: "bg-blue-100 text-blue-600" },
                  { user: "Rohan S.", restaurant: "Al Bake", rating: 4, comment: "The shawarma is legendary.", initial: "RS", color: "bg-emerald-100 text-emerald-600" },
                ].map((review, i) => (
                  <div key={i} className="flex gap-4">
                    <Avatar className="h-10 w-10 rounded-2xl">
                      <AvatarFallback className={review.color + " font-black text-xs"}>{review.initial}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-slate-900">
                          {review.user} <span className="font-medium text-slate-400 mx-1">on</span> <span className="text-primary">{review.restaurant}</span>
                        </p>
                        <div className="flex items-center gap-0.5">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="text-[10px] font-black">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed italic line-clamp-1">"{review.comment}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Verification Queue */}
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6">
              <h3 className="text-xl font-black">Verification Queue</h3>
              <div className="space-y-1">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-none">
                      <TableHead className="h-8 font-black uppercase text-[10px] text-slate-400 p-0">Restaurant</TableHead>
                      <TableHead className="h-8 font-black uppercase text-[10px] text-slate-400 p-0 text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "Sultan's Dine", area: "South Delhi", status: "Pending Docs", variant: "secondary" },
                      { name: "Al-Huda Masjid", area: "Old Delhi", status: "Pending Review", variant: "outline" },
                      { name: "Modern Abayas", area: "Bangalore", status: "Pending Review", variant: "outline" },
                    ].map((item, i) => (
                      <TableRow key={i} className="border-slate-50 hover:bg-slate-50/50">
                        <TableCell className="py-4 pl-0">
                          <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{item.area}</p>
                        </TableCell>
                        <TableCell className="py-4 pr-0 text-right">
                          <Badge variant={item.variant === 'secondary' ? 'secondary' : 'outline'} className={
                            item.status === 'Pending Docs' ? 'bg-emerald-50 text-emerald-600 border-none px-3 font-black text-[9px]' : 'bg-emerald-50/50 text-emerald-700 border-emerald-100 px-3 font-black text-[9px]'
                          }>
                            {item.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>

            {/* Recent Admin Activity */}
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6">
              <h3 className="text-xl font-black">Recent Admin Activity</h3>
              <div className="space-y-6">
                {[
                  { user: "Yasar Khan", action: "approved verification for Karim's.", time: "2h ago", icon: CheckCircle2, color: "text-emerald-500" },
                  { user: "MOHAMMED HUZAIFA", action: "suspended user 'spam_user_123'.", time: "5h ago", icon: Activity, color: "text-rose-500" },
                  { user: "Vinayak kainthla", action: "updated event 'Food Festival'.", time: "1d ago", icon: Activity, color: "text-blue-500" },
                ].map((act, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className={`h-10 w-10 rounded-[1.2rem] ${act.color} bg-opacity-10 flex items-center justify-center shrink-0`}>
                      <act.icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm text-slate-600 leading-snug">
                        <span className="font-black text-slate-900">{act.user}</span> {act.action}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Analytics Section */}
          <section className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-black">Analytics & Reports</h3>
              <p className="text-sm text-muted-foreground font-medium">Deep dive into platform data and generate reports.</p>
            </div>
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Restaurant growth analytics", icon: BarChart3 },
                  { label: "City-wise restaurant analysis", icon: MapPin },
                  { label: "Reviews & ratings analytics", icon: Star },
                  { label: "Loyalty engagement analytics", icon: Heart },
                  { label: "Offer conversion analytics", icon: Tag },
                  { label: "Event performance analysis", icon: Calendar },
                  { label: "Coin usage analytics", icon: Landmark },
                ].map((btn, i) => (
                  <Button key={i} variant="outline" className="justify-start gap-3 h-14 rounded-2xl border-slate-100 bg-slate-50/50 hover:bg-white hover:border-primary transition-all group font-bold text-xs text-slate-600">
                    <btn.icon className="h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
                    {btn.label}
                  </Button>
                ))}
                <Button className="h-14 rounded-2xl bg-emerald-50 text-emerald-600 border-none font-black text-xs uppercase tracking-widest hover:bg-emerald-100 transition-all">
                  <Download className="mr-2 h-4 w-4" /> Export reports (CSV)
                </Button>
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="all" className="animate-in fade-in duration-500">
          <Card className="rounded-[2.5rem] border-none shadow-sm p-12 text-center bg-white space-y-4">
            <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
              <Store className="h-10 w-10" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900">Restaurant Directory</h3>
              <p className="text-muted-foreground font-medium">Manage and edit all 890 active restaurant listings.</p>
            </div>
            <Button className="bg-primary rounded-full px-8 font-black">Open List Manager</Button>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="animate-in fade-in duration-500">
          <Card className="rounded-[2.5rem] border-none shadow-sm p-12 text-center bg-white space-y-4">
            <div className="h-20 w-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <ShieldCheck className="h-10 w-10" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900">Verification Hub</h3>
              <p className="text-muted-foreground font-medium">Review documents and certificates for new business applications.</p>
            </div>
            <Button className="bg-primary rounded-full px-8 font-black">Enter Audit Console</Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
