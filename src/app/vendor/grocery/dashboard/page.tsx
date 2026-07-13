"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wallet, ShoppingCart, AlertCircle,
  Users, Tag, BarChart3,
  ArrowUpRight, PlusCircle, Settings,
  Boxes, Truck,
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

type Business = { id: string; name: string; rating: number | null }
type OrderRow = { id: string; status: string; total_amount: number; created_at: string; profiles: { name: string | null } | null }

export default function GroceryDashboard() {
  const { user, loading: authLoading } = useAuth()
  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<OrderRow[]>([])
  const [activeOrderCount, setActiveOrderCount] = useState(0)
  const [productCount, setProductCount] = useState(0)
  const [outOfStockCount, setOutOfStockCount] = useState(0)
  const [offerCount, setOfferCount] = useState(0)
  const [revenue, setRevenue] = useState(0)

  useEffect(() => {
    if (authLoading) return
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    ;(supabase as any).from("businesses").select("id, name, rating").eq("owner_id", user.uid).limit(1)
      .then(({ data }: { data: Business[] | null }) => {
        const biz = data?.[0] ?? null
        setBusiness(biz)
        setLoading(false)
        if (!biz) return

        ;(supabase as any).from("business_orders").select("id, status, total_amount, created_at, profiles(name)")
          .eq("business_id", biz.id).order("created_at", { ascending: false }).limit(5)
          .then(({ data }: { data: OrderRow[] | null }) => {
            setOrders(data ?? [])
            setRevenue((data ?? []).reduce((s, o) => s + Number(o.total_amount), 0))
          })

        ;(supabase as any).from("business_orders").select("id", { count: "exact", head: true })
          .eq("business_id", biz.id).in("status", ["pending", "confirmed", "preparing"])
          .then(({ count }: { count: number | null }) => setActiveOrderCount(count ?? 0))

        ;(supabase as any).from("business_catalog_items").select("id", { count: "exact", head: true }).eq("business_id", biz.id)
          .then(({ count }: { count: number | null }) => setProductCount(count ?? 0))

        ;(supabase as any).from("business_catalog_items").select("id", { count: "exact", head: true })
          .eq("business_id", biz.id).eq("is_available", false)
          .then(({ count }: { count: number | null }) => setOutOfStockCount(count ?? 0))

        ;(supabase as any).from("business_offers").select("id", { count: "exact", head: true })
          .eq("business_id", biz.id).eq("status", "active")
          .then(({ count }: { count: number | null }) => setOfferCount(count ?? 0))
      })
  }, [user?.uid, authLoading])

  if (loading) {
    return <div className="p-8 flex items-center justify-center min-h-screen"><div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
  }

  if (!business) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-screen gap-6 text-center">
        <h1 className="text-2xl font-black text-foreground">No Store Listed Yet</h1>
        <p className="text-muted-foreground font-medium max-w-sm">Register your grocery store to access this dashboard.</p>
        <Link href="/partner/onboarding/business/category">
          <Button className="rounded-2xl h-14 px-10 font-black bg-primary text-white shadow-lg">Register Your Store</Button>
        </Link>
      </div>
    )
  }

  const kpis = [
    { label: "Recent Revenue", value: `₹${revenue.toLocaleString("en-IN")}`, trend: "From last 5 orders", icon: Wallet },
    { label: "Active Orders", value: String(activeOrderCount), trend: "Pending, confirmed, preparing", icon: ShoppingCart },
    { label: "Inventory Items", value: String(productCount), trend: "Listed products", icon: Boxes },
    { label: "Out of Stock", value: String(outOfStockCount), trend: "Action required", icon: AlertCircle, variant: outOfStockCount > 0 ? "destructive" as const : undefined },
    { label: "Active Offers", value: String(offerCount), trend: "Currently running", icon: Tag },
    { label: "Store Rating", value: business.rating ? business.rating.toFixed(1) : "—", trend: "Overall rating", icon: BarChart3 },
  ];

  const quickActions = [
    { label: "Inventory", icon: Boxes, color: "text-muted-foreground", bg: "bg-muted", href: "/vendor/grocery/inventory" },
    { label: "Deliveries", icon: Truck, color: "text-blue-500", bg: "bg-blue-50", href: "/vendor/grocery/delivery" },
    { label: "Orders", icon: ShoppingCart, color: "text-amber-500", bg: "bg-amber-50", href: "/vendor/grocery/orders" },
    { label: "Marketing", icon: Tag, color: "text-purple-500", bg: "bg-purple-50", href: "/vendor/grocery/marketing/offers" },
    { label: "Settings", icon: Settings, color: "text-muted-foreground", bg: "bg-muted", href: "/vendor/grocery/profile" },
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">{business.name}</h1>
        <p className="text-muted-foreground font-medium opacity-60">Manage your supermarket inventory and sales.</p>
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
              <CardTitle className="text-xl font-black">Recent Orders</CardTitle>
              <Link href="/vendor/grocery/orders">
                <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full font-black text-xs px-6 h-10">
                  View All <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              {orders.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground py-10">No orders yet.</p>
              ) : (
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow className="border-none">
                      <TableHead className="px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Order</TableHead>
                      <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Customer</TableHead>
                      <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Status</TableHead>
                      <TableHead className="text-right px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((sale) => (
                      <TableRow key={sale.id} className="border-border hover:bg-muted/50 transition-colors">
                        <TableCell className="px-8 py-5 font-bold text-foreground text-xs">{sale.id.slice(0, 8)}</TableCell>
                        <TableCell className="font-bold text-foreground">{sale.profiles?.name ?? "Customer"}</TableCell>
                        <TableCell className="font-bold text-muted-foreground text-sm capitalize">{sale.status}</TableCell>
                        <TableCell className="text-right px-8 font-black text-primary">₹{sale.total_amount}</TableCell>
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
            <CardContent className="px-0 grid grid-cols-2 sm:grid-cols-3 gap-4">
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
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden">
            <CardHeader className="p-8">
              <CardTitle className="text-xl font-black">Inventory Summary</CardTitle>
              <p className="text-xs text-muted-foreground font-medium">{productCount} products listed, {outOfStockCount} need restocking.</p>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
