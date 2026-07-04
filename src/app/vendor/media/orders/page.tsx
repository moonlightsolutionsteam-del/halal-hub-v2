"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Search, Package, Truck, CheckCircle2, Clock, BookOpen } from "lucide-react"

const ORDERS = [
  { id: "ORD-2841", customer: "Fatima Al-Zahra", items: 3, total: "£42.97", date: "03 Jul 2026", status: "Dispatched" },
  { id: "ORD-2840", customer: "Ahmed Ibrahim", items: 1, total: "£18.50", date: "03 Jul 2026", status: "Processing" },
  { id: "ORD-2839", customer: "Maryam Hassan", items: 5, total: "£74.95", date: "02 Jul 2026", status: "Delivered" },
  { id: "ORD-2838", customer: "Yusuf Al-Rashid", items: 2, total: "£28.98", date: "02 Jul 2026", status: "Delivered" },
  { id: "ORD-2837", customer: "Khadijah Omar", items: 4, total: "£61.96", date: "01 Jul 2026", status: "Delivered" },
  { id: "ORD-2836", customer: "Abdullah Malik", items: 1, total: "£9.99", date: "01 Jul 2026", status: "Processing" },
]

const STATUS_COLOR: Record<string, string> = {
  Processing: "bg-amber-50 text-amber-600",
  Dispatched: "bg-blue-50 text-blue-600",
  Delivered: "bg-emerald-50 text-emerald-600",
}

export default function MediaOrdersPage() {
  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <ShoppingCart className="h-3 w-3" /> Orders & Shipping
          </div>
          <h1 className="text-3xl font-black font-headline text-foreground tracking-tight">Orders & Shipping</h1>
          <p className="text-sm font-bold text-muted-foreground">Track customer orders, fulfilment status, and dispatch records.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Orders", value: "1,284", icon: ShoppingCart, color: "bg-primary/10 text-primary" },
          { label: "Processing", value: "8", icon: Clock, color: "bg-amber-50 text-amber-600" },
          { label: "Dispatched", value: "23", icon: Truck, color: "bg-blue-50 text-blue-600" },
          { label: "Delivered", value: "1,253", icon: CheckCircle2, color: "bg-emerald-50 text-emerald-600" },
        ].map((s) => (
          <Card key={s.label} className="rounded-[2rem] border-none shadow-sm bg-card p-6">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${s.color}`}><s.icon className="h-5 w-5" /></div>
              <div><p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{s.label}</p><p className="text-2xl font-black">{s.value}</p></div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
        <div className="p-6 border-b flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search orders..." className="pl-10 h-11 rounded-2xl bg-muted border-none font-bold" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/40">
              <tr>
                {["Order ID", "Customer", "Items", "Total", "Date", "Status", ""].map((h) => (
                  <th key={h} className="text-left p-4 text-[10px] font-black uppercase text-muted-foreground tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-muted/20 transition-colors group">
                  <td className="p-4 font-black text-xs text-primary">{order.id}</td>
                  <td className="p-4 font-bold text-sm">{order.customer}</td>
                  <td className="p-4 font-bold text-sm flex items-center gap-1"><BookOpen className="h-3 w-3 opacity-60" />{order.items}</td>
                  <td className="p-4 font-black text-sm">{order.total}</td>
                  <td className="p-4 font-bold text-sm text-muted-foreground">{order.date}</td>
                  <td className="p-4"><Badge className={`font-black text-[10px] border-none ${STATUS_COLOR[order.status]}`}>{order.status}</Badge></td>
                  <td className="p-4"><Button variant="ghost" size="sm" className="rounded-xl text-xs font-black opacity-0 group-hover:opacity-100">View</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
