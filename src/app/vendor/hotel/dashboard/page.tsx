"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Wallet, Bed, Users,
  Star, Tag, AlertCircle,
  ArrowUpRight, Settings,
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

type Business = { id: string; name: string; rating: number | null; review_count: number | null }
type BookingRow = { id: string; guest_count: number; reservation_date: string; time_slot: string; status: string; profiles: { name: string | null } | null }
type ReviewRow = { id: string; rating: number; body: string | null; profiles: { name: string | null } | null }

export default function HotelDashboard() {
  const { user, loading: authLoading } = useAuth()
  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)
  const [bookings, setBookings] = useState<BookingRow[]>([])
  const [pendingCount, setPendingCount] = useState(0)
  const [guestCount, setGuestCount] = useState(0)
  const [offerCount, setOfferCount] = useState(0)
  const [latestReview, setLatestReview] = useState<ReviewRow | null>(null)

  useEffect(() => {
    if (authLoading) return
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    ;(supabase as any).from("businesses").select("id, name, rating, review_count").eq("owner_id", user.uid).limit(1)
      .then(({ data }: { data: Business[] | null }) => {
        const biz = data?.[0] ?? null
        setBusiness(biz)
        setLoading(false)
        if (!biz) return

        ;(supabase as any).from("business_reservations").select("id, guest_count, reservation_date, time_slot, status, profiles(name)")
          .eq("business_id", biz.id).order("reservation_date", { ascending: true }).limit(5)
          .then(({ data }: { data: BookingRow[] | null }) => setBookings(data ?? []))

        ;(supabase as any).from("business_reservations").select("id", { count: "exact", head: true })
          .eq("business_id", biz.id).eq("status", "pending")
          .then(({ count }: { count: number | null }) => setPendingCount(count ?? 0))

        ;(supabase as any).from("business_reservations").select("user_id", { count: "exact", head: true })
          .eq("business_id", biz.id)
          .then(({ count }: { count: number | null }) => setGuestCount(count ?? 0))

        ;(supabase as any).from("business_offers").select("id", { count: "exact", head: true })
          .eq("business_id", biz.id).eq("status", "active")
          .then(({ count }: { count: number | null }) => setOfferCount(count ?? 0))

        ;(supabase as any).from("business_reviews").select("id, rating, body, profiles(name)")
          .eq("business_id", biz.id).eq("status", "published").order("created_at", { ascending: false }).limit(1).maybeSingle()
          .then(({ data }: { data: ReviewRow | null }) => setLatestReview(data))
      })
  }, [user?.uid, authLoading])

  if (loading) {
    return <div className="p-8 flex items-center justify-center min-h-screen"><div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
  }

  if (!business) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-screen gap-6 text-center">
        <h1 className="text-2xl font-black text-foreground">No Property Listed Yet</h1>
        <p className="text-muted-foreground font-medium max-w-sm">Register your hotel or homestay to access this dashboard.</p>
        <Link href="/partner/onboarding/business/category">
          <Button className="rounded-2xl h-14 px-10 font-black bg-primary text-white shadow-lg">Register Your Property</Button>
        </Link>
      </div>
    )
  }

  const kpis = [
    { label: "Pending Requests", value: String(pendingCount), trend: "Action required", icon: AlertCircle, variant: pendingCount > 0 ? "destructive" as const : undefined },
    { label: "Total Bookings", value: String(guestCount), trend: "All-time bookings", icon: Users },
    { label: "Average Rating", value: business.rating ? business.rating.toFixed(1) : "—", trend: `from ${business.review_count ?? 0} reviews`, icon: Star },
    { label: "Active Offers", value: String(offerCount), trend: "Currently running", icon: Tag },
  ];

  const quickActions = [
    { label: "Rooms", icon: Bed, color: "text-muted-foreground", bg: "bg-muted", href: "/vendor/hotel/rooms" },
    { label: "Bookings", icon: Users, color: "text-blue-500", bg: "bg-blue-50", href: "/vendor/hotel/bookings" },
    { label: "Offers", icon: Tag, color: "text-purple-500", bg: "bg-purple-50", href: "/vendor/hotel/offers" },
    { label: "Settings", icon: Settings, color: "text-muted-foreground", bg: "bg-muted", href: "/vendor/hotel/profile" },
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">{business.name}</h1>
        <p className="text-muted-foreground font-medium opacity-60">Manage your property, bookings, and guest experiences.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl bg-card p-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-tighter">{kpi.label}</span>
              <kpi.icon className={`h-4 w-4 ${kpi.variant === 'destructive' ? 'text-red-400' : 'text-muted-foreground'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-black ${kpi.variant === 'destructive' ? 'text-red-600' : 'text-foreground'}`}>
                {kpi.value}
              </div>
              <p className={`text-[10px] font-bold mt-1 uppercase tracking-tight ${kpi.variant === 'destructive' ? 'text-red-400' : 'text-muted-foreground'}`}>
                {kpi.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-card">
            <CardHeader className="p-8 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-black">Recent Bookings</CardTitle>
              <Link href="/vendor/hotel/bookings">
                <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full font-black text-xs px-6 h-10">
                  All Bookings <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              {bookings.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground py-10">No bookings yet.</p>
              ) : (
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow className="border-none">
                      <TableHead className="px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Guest</TableHead>
                      <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Guests</TableHead>
                      <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Check-in</TableHead>
                      <TableHead className="text-right px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id} className="border-border hover:bg-muted/50 transition-colors">
                        <TableCell className="px-8 py-5 font-bold text-foreground text-sm">{booking.profiles?.name ?? "Guest"}</TableCell>
                        <TableCell className="font-bold text-muted-foreground text-xs">{booking.guest_count}</TableCell>
                        <TableCell className="font-bold text-muted-foreground text-sm">{booking.reservation_date}</TableCell>
                        <TableCell className="text-right px-8">
                          <Badge variant="outline" className="rounded-full px-4 text-[9px] font-black uppercase border-primary/20 text-primary bg-primary/5 capitalize">
                            {booking.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="px-0 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickActions.map((action, i) => (
                <Link key={i} href={action.href} className="group flex flex-col items-center justify-center p-6 bg-muted/50 rounded-[2rem] hover:bg-card hover:shadow-md transition-all border border-transparent hover:border-primary/10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-black text-foreground uppercase tracking-tighter text-center">{action.label}</span>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Latest Guest Review</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              {latestReview ? (
                <div className="p-4 bg-muted/30 rounded-2xl space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-card rounded-full flex items-center justify-center text-primary font-black text-[10px] shadow-sm">
                      {(latestReview.profiles?.name ?? "G").charAt(0)}
                    </div>
                    <p className="text-xs font-black text-foreground">{latestReview.profiles?.name ?? "Guest"}</p>
                  </div>
                  {latestReview.body && <p className="text-[11px] text-muted-foreground font-medium line-clamp-2 italic">"{latestReview.body}"</p>}
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className={`h-3 w-3 ${s < latestReview.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No reviews yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
