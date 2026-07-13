"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Wallet, ShoppingCart, Package, AlertCircle,
  Users, Tag, Star, MessageSquare,
  ArrowUpRight, PlusCircle, Settings,
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Business = { id: string; name: string; rating: number | null; review_count: number | null }
type OrderRow = { id: string; status: string; total_amount: number; created_at: string; profiles: { name: string | null } | null }
type ReviewRow = { id: string; rating: number; body: string | null; profiles: { name: string | null } | null }
type ProductRow = { id: string; title: string | null }

export default function ButcherDashboard() {
  const { user, loading: authLoading } = useAuth()
  const { toast } = useToast()
  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<OrderRow[]>([])
  const [pendingCount, setPendingCount] = useState(0)
  const [reviews, setReviews] = useState<ReviewRow[]>([])
  const [productCount, setProductCount] = useState(0)
  const [outOfStockCount, setOutOfStockCount] = useState(0)
  const [customerCount, setCustomerCount] = useState(0)
  const [offerCount, setOfferCount] = useState(0)

  const [showViewAllOrdersModal, setShowViewAllOrdersModal] = useState(false)
  const [showViewAllReviewsModal, setShowViewAllReviewsModal] = useState(false)
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [newProduct, setNewProduct] = useState({ title: "", category: "", price: "", stock_quantity: "", description: "" })
  const [savingProduct, setSavingProduct] = useState(false)

  useEffect(() => {
    if (authLoading) return
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    ;(supabase as any)
      .from("businesses")
      .select("id, name, rating, review_count")
      .eq("owner_id", user.uid)
      .limit(1)
      .then(({ data }: { data: Business[] | null }) => {
        const biz = data?.[0] ?? null
        setBusiness(biz)
        setLoading(false)
        if (!biz) return
        loadDashboard(biz.id)
      })
  }, [user?.uid, authLoading])

  function loadDashboard(businessId: string) {
    const supabase = createClient()

    ;(supabase as any)
      .from("business_orders")
      .select("id, status, total_amount, created_at, profiles(name)")
      .eq("business_id", businessId)
      .order("created_at", { ascending: false })
      .limit(5)
      .then(({ data }: { data: OrderRow[] | null }) => setOrders(data ?? []))

    ;(supabase as any)
      .from("business_orders")
      .select("id", { count: "exact", head: true })
      .eq("business_id", businessId)
      .eq("status", "pending")
      .then(({ count }: { count: number | null }) => setPendingCount(count ?? 0))

    ;(supabase as any)
      .from("business_reviews")
      .select("id, rating, body, profiles(name)")
      .eq("business_id", businessId)
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .limit(5)
      .then(({ data }: { data: ReviewRow[] | null }) => setReviews(data ?? []))

    ;(supabase as any)
      .from("business_catalog_items")
      .select("id", { count: "exact", head: true })
      .eq("business_id", businessId)
      .then(({ count }: { count: number | null }) => setProductCount(count ?? 0))

    ;(supabase as any)
      .from("business_catalog_items")
      .select("id", { count: "exact", head: true })
      .eq("business_id", businessId)
      .eq("is_available", false)
      .then(({ count }: { count: number | null }) => setOutOfStockCount(count ?? 0))

    ;(supabase as any)
      .from("business_orders")
      .select("user_id", { count: "exact", head: true })
      .eq("business_id", businessId)
      .then(({ count }: { count: number | null }) => setCustomerCount(count ?? 0))

    ;(supabase as any)
      .from("business_offers")
      .select("id", { count: "exact", head: true })
      .eq("business_id", businessId)
      .eq("status", "active")
      .then(({ count }: { count: number | null }) => setOfferCount(count ?? 0))
  }

  async function handleAddProduct() {
    if (!business || !newProduct.title.trim()) return
    setSavingProduct(true)
    const supabase = createClient()
    const { error } = await (supabase as any).from("business_catalog_items").insert({
      business_id: business.id,
      business_name: business.name,
      title: newProduct.title,
      category: newProduct.category || null,
      price: newProduct.price ? parseFloat(newProduct.price) : null,
      stock_quantity: newProduct.stock_quantity ? parseInt(newProduct.stock_quantity) : null,
      description: newProduct.description || null,
    })
    setSavingProduct(false)
    if (error) {
      toast({ variant: "destructive", title: "Couldn't add product", description: error.message })
      return
    }
    toast({ title: "Product added" })
    setNewProduct({ title: "", category: "", price: "", stock_quantity: "", description: "" })
    setShowAddProductModal(false)
    loadDashboard(business.id)
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!business) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-screen gap-6 text-center">
        <h1 className="text-2xl font-black text-foreground">No Business Listed Yet</h1>
        <p className="text-muted-foreground font-medium max-w-sm">Register your butcher shop to access this dashboard.</p>
        <Link href="/partner/onboarding/business/category">
          <Button className="rounded-2xl h-14 px-10 font-black bg-primary text-white shadow-lg">Register Your Business</Button>
        </Link>
      </div>
    )
  }

  const kpis = [
    { label: "Pending Orders", value: String(pendingCount), trend: "Ready to be processed", icon: ShoppingCart },
    { label: "Total Products", value: String(productCount), trend: "Listed in your inventory", icon: Package },
    { label: "Out of Stock", value: String(outOfStockCount), trend: "Items need restocking", icon: AlertCircle, variant: outOfStockCount > 0 ? "destructive" as const : undefined },
    { label: "Total Orders", value: String(customerCount), trend: "All-time orders", icon: Users },
    { label: "Active Offers", value: String(offerCount), trend: "Currently running", icon: Tag },
    { label: "Average Rating", value: business.rating ? business.rating.toFixed(1) : "—", trend: `from ${business.review_count ?? 0} reviews`, icon: Star },
  ];

  const quickActions = [
    { label: "Add Product", icon: PlusCircle, color: "text-emerald-500", bg: "bg-emerald-50", onClick: () => setShowAddProductModal(true) },
    { label: "Products", icon: Package, color: "text-muted-foreground", bg: "bg-muted", href: "/vendor/butcher/products" },
    { label: "Orders", icon: ShoppingCart, color: "text-blue-500", bg: "bg-blue-50", onClick: () => setShowViewAllOrdersModal(true) },
    { label: "Reviews", icon: Star, color: "text-amber-500", bg: "bg-amber-50", onClick: () => setShowViewAllReviewsModal(true) },
    { label: "Offers", icon: Tag, color: "text-purple-500", bg: "bg-purple-50", href: "/vendor/butcher/offers" },
    { label: "Shop Settings", icon: Settings, color: "text-muted-foreground", bg: "bg-muted", href: "/vendor/butcher/profile" },
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">{business.name}</h1>
        <p className="text-muted-foreground font-medium opacity-60">Welcome to your meat shop management center.</p>
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
              <Button size="sm" onClick={() => setShowViewAllOrdersModal(true)} className="bg-primary hover:bg-primary/90 rounded-full font-black text-xs px-6 h-10">
                View All <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
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
                    {orders.map((order) => (
                      <TableRow key={order.id} className="border-border hover:bg-muted/50 transition-colors">
                        <TableCell className="px-8 py-5 font-bold text-muted-foreground text-xs">{order.id.slice(0, 8)}</TableCell>
                        <TableCell className="font-bold text-foreground">{order.profiles?.name ?? "Customer"}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="rounded-full px-4 text-[9px] font-black uppercase">
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right px-8 font-black text-foreground">₹{order.total_amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
            <CardHeader className="p-8 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-black">Recent Reviews</CardTitle>
              <Button size="sm" onClick={() => setShowViewAllReviewsModal(true)} className="bg-primary hover:bg-primary/90 rounded-full font-black text-xs px-6 h-10">
                View All <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-3">
              {reviews.length === 0 ? (
                <p className="text-sm text-muted-foreground">No reviews yet.</p>
              ) : reviews.map(r => (
                <div key={r.id} className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                  <Star className="h-4 w-4 text-amber-500 fill-current" />
                  <p>"{r.body ?? "No comment"}" - <span className="font-bold text-foreground">{r.profiles?.name ?? "Customer"}</span></p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="px-0 grid grid-cols-2 gap-4">
              {quickActions.map((action, i) => {
                const content = (
                  <>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-black text-foreground uppercase tracking-tighter">{action.label}</span>
                  </>
                )
                return action.href ? (
                  <Link key={i} href={action.href} className="group flex flex-col items-center justify-center p-4 bg-muted/50 rounded-3xl hover:bg-card hover:shadow-md transition-all border border-transparent hover:border-primary/10">
                    {content}
                  </Link>
                ) : (
                  <button key={i} onClick={action.onClick} className="group flex flex-col items-center justify-center p-4 bg-muted/50 rounded-3xl hover:bg-card hover:shadow-md transition-all border border-transparent hover:border-primary/10">
                    {content}
                  </button>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* View All Orders Modal */}
      <Dialog open={showViewAllOrdersModal} onOpenChange={setShowViewAllOrdersModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">All Orders</DialogTitle>
            <DialogDescription>Your complete order history.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 pt-2 max-h-96 overflow-y-auto">
            {orders.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">No orders yet.</p>
            ) : orders.map(o => (
              <div key={o.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <span className="text-sm font-bold">{o.profiles?.name ?? "Customer"}</span>
                <Badge variant="secondary" className="text-[9px] uppercase">{o.status}</Badge>
                <span className="text-sm font-black">₹{o.total_amount}</span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* View All Reviews Modal */}
      <Dialog open={showViewAllReviewsModal} onOpenChange={setShowViewAllReviewsModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">All Reviews</DialogTitle>
            <DialogDescription>Customer feedback for your shop.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 pt-2 max-h-96 overflow-y-auto">
            {reviews.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">No reviews yet.</p>
            ) : reviews.map(r => (
              <div key={r.id} className="p-3 rounded-xl bg-muted/50 space-y-1">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className={`h-3 w-3 ${idx < r.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
                  ))}
                </div>
                <p className="text-sm">{r.body ?? "No comment"}</p>
                <p className="text-xs font-bold text-muted-foreground">{r.profiles?.name ?? "Customer"}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Product Modal */}
      <Dialog open={showAddProductModal} onOpenChange={setShowAddProductModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Add New Product</DialogTitle>
            <DialogDescription>Register a new meat cut or marinated item to your inventory.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Product Name</Label>
              <Input value={newProduct.title} onChange={e => setNewProduct(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Premium Mutton Curry Cut" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Category</Label>
              <Input value={newProduct.category} onChange={e => setNewProduct(p => ({ ...p, category: e.target.value }))} placeholder="e.g. Mutton, Beef, Poultry..." className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Price per kg (₹)</Label>
              <Input value={newProduct.price} onChange={e => setNewProduct(p => ({ ...p, price: e.target.value }))} type="number" placeholder="e.g. 850" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Current Stock (kg)</Label>
              <Input value={newProduct.stock_quantity} onChange={e => setNewProduct(p => ({ ...p, stock_quantity: e.target.value }))} type="number" placeholder="e.g. 45" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button disabled={savingProduct || !newProduct.title.trim()} className="w-full h-12 rounded-2xl font-black bg-primary" onClick={handleAddProduct}>
              {savingProduct ? "Adding..." : "Add Product"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
