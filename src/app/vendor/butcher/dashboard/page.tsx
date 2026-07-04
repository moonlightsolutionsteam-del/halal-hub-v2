"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Wallet, ShoppingCart, Package, AlertCircle,
  Users, Tag, Star, MessageSquare,
  ArrowUpRight, PlusCircle, LayoutGrid, Settings,
  Clock, Truck, CheckCircle2
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ButcherDashboard() {
  const [showViewAllOrdersModal, setShowViewAllOrdersModal] = useState(false)
  const [showViewAllReviewsModal, setShowViewAllReviewsModal] = useState(false)
  const [showAddProductModal, setShowAddProductModal] = useState(false)

  const kpis = [
    { label: "Total Sales (Month)", value: "₹85,000", trend: "+12% from last month", icon: Wallet },
    { label: "Pending Orders", value: "5", trend: "Ready to be processed", icon: ShoppingCart },
    { label: "Total Products", value: "25", trend: "Listed in your inventory", icon: Package },
    { label: "Out of Stock", value: "3", trend: "Items need restocking", icon: AlertCircle, variant: "destructive" },
    { label: "Total Customers", value: "350", trend: "+25 new this month", icon: Users },
    { label: "Active Offers", value: "3", trend: "Currently running", icon: Tag },
    { label: "Average Rating", value: "4.8", trend: "from 80 reviews", icon: Star },
    { label: "New Reviews", value: "5", trend: "This week", icon: MessageSquare },
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "Aisha Khan", status: "Processing", total: "₹800", statusVariant: "secondary" as const },
    { id: "ORD-002", customer: "Yusuf Ibrahim", status: "Out for Delivery", total: "₹1200", statusVariant: "outline" as const },
  ];

  const quickActions = [
    { label: "Add Product", icon: PlusCircle, color: "text-emerald-500", bg: "bg-emerald-50", onClick: () => setShowAddProductModal(true) },
    { label: "Products", icon: Package, color: "text-muted-foreground", bg: "bg-muted", onClick: () => {} },
    { label: "Orders", icon: ShoppingCart, color: "text-blue-500", bg: "bg-blue-50", onClick: () => setShowViewAllOrdersModal(true) },
    { label: "Reviews", icon: Star, color: "text-amber-500", bg: "bg-amber-50", onClick: () => setShowViewAllReviewsModal(true) },
    { label: "Offers", icon: Tag, color: "text-purple-500", bg: "bg-purple-50", onClick: () => {} },
    { label: "Shop Settings", icon: Settings, color: "text-muted-foreground", bg: "bg-muted", onClick: () => {} },
  ];

  const topSelling = [
    { name: "Mutton Curry Cut", sales: 150 },
    { name: "Chicken Boneless", sales: 220 },
  ];

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline text-foreground">Butcher Dashboard</h1>
        <p className="text-muted-foreground font-medium opacity-60">Welcome to your meat shop management center.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Order ID</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Customer</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Status</TableHead>
                    <TableHead className="text-right px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order, i) => (
                    <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors">
                      <TableCell className="px-8 py-5 font-bold text-muted-foreground text-xs">{order.id}</TableCell>
                      <TableCell className="font-bold text-foreground">{order.customer}</TableCell>
                      <TableCell>
                        <Badge variant={order.statusVariant} className="rounded-full px-4 text-[9px] font-black uppercase">
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-8 font-black text-foreground">{order.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
            <CardHeader className="p-8 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-black">Recent Reviews</CardTitle>
              <Button size="sm" onClick={() => setShowViewAllReviewsModal(true)} className="bg-primary hover:bg-primary/90 rounded-full font-black text-xs px-6 h-10">
                View All <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                <Star className="h-4 w-4 text-amber-500 fill-current" />
                <p>"Always fresh and well-packed. Highly recommend!" - <span className="font-bold text-foreground">Fatima Al-Sayed</span></p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="px-0 grid grid-cols-2 gap-4">
              {quickActions.map((action, i) => (
                <button key={i} onClick={action.onClick} className="group flex flex-col items-center justify-center p-4 bg-muted/50 rounded-3xl hover:bg-card hover:shadow-md transition-all border border-transparent hover:border-primary/10">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-black text-foreground uppercase tracking-tighter">{action.label}</span>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden">
            <CardHeader className="p-8">
              <CardTitle className="text-xl font-black">Top Selling Products</CardTitle>
              <p className="text-xs text-muted-foreground font-medium">Your most popular items this month.</p>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Product</TableHead>
                    <TableHead className="text-right px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Sales</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topSelling.map((item, i) => (
                    <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors">
                      <TableCell className="px-8 py-4 font-bold text-foreground">{item.name}</TableCell>
                      <TableCell className="text-right px-8 font-black text-muted-foreground">{item.sales}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* View All Orders Modal */}
      <Dialog open={showViewAllOrdersModal} onOpenChange={setShowViewAllOrdersModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">All Orders</DialogTitle>
            <DialogDescription>Filter and search your complete order history.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Search Order ID or Customer</Label>
              <Input placeholder="e.g. ORD-001 or Aisha..." className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Status Filter</Label>
              <Input placeholder="Processing, Delivered, Cancelled..." className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Date Range</Label>
              <Input placeholder="e.g. Last 7 days" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-primary" onClick={() => setShowViewAllOrdersModal(false)}>Apply Filter</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View All Reviews Modal */}
      <Dialog open={showViewAllReviewsModal} onOpenChange={setShowViewAllReviewsModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">All Reviews</DialogTitle>
            <DialogDescription>Browse and filter customer feedback for your shop.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Search Reviews</Label>
              <Input placeholder="Search by customer or keyword..." className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Rating Filter</Label>
              <Input placeholder="e.g. 5 stars, 4 stars..." className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Date Range</Label>
              <Input placeholder="e.g. This week, This month..." className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-primary" onClick={() => setShowViewAllReviewsModal(false)}>Search Reviews</Button>
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
              <Input placeholder="e.g. Premium Mutton Curry Cut" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Category</Label>
              <Input placeholder="e.g. Mutton, Beef, Poultry..." className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Price per kg (₹)</Label>
              <Input placeholder="e.g. 850" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Current Stock (kg)</Label>
              <Input placeholder="e.g. 45" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Source / Farm</Label>
              <Input placeholder="e.g. HMC Certified Farm" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-primary" onClick={() => setShowAddProductModal(false)}>Add Product</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
