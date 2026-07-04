"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, Plus, Package, AlertTriangle, TrendingDown, CheckCircle2 } from "lucide-react"

const INVENTORY = [
  { id: "BK-001", title: "The Sealed Nectar", author: "Safiur Rahman Mubarakpuri", isbn: "978-9960-899-55-8", category: "Seerah", stock: 142, price: "£12.99", status: "In Stock" },
  { id: "BK-002", title: "Riyad as-Salihin", author: "Imam An-Nawawi", isbn: "978-9960-740-22-6", category: "Hadith", stock: 7, price: "£18.50", status: "Low Stock" },
  { id: "BK-003", title: "Don't Be Sad", author: "Aaidh ibn Abdullah al-Qarni", isbn: "978-9960-892-77-0", category: "Self-Help", stock: 0, price: "£9.99", status: "Out of Stock" },
  { id: "BK-004", title: "Purification of the Soul", author: "Ahmad Farid", isbn: "978-1-872531-48-6", category: "Spirituality", stock: 58, price: "£14.99", status: "In Stock" },
  { id: "BK-005", title: "Fiqh us-Sunnah", author: "Sayyid Sabiq", isbn: "978-0-87579-060-9", category: "Fiqh", stock: 23, price: "£22.00", status: "In Stock" },
  { id: "BK-006", title: "The Quran (English)", author: "Dr. Mustafa Khattab", isbn: "978-0-9866194-9-2", category: "Quran", stock: 4, price: "£29.99", status: "Low Stock" },
]

const STATUS_COLOR: Record<string, string> = {
  "In Stock": "bg-emerald-50 text-emerald-600",
  "Low Stock": "bg-amber-50 text-amber-600",
  "Out of Stock": "bg-rose-50 text-rose-600",
}

export default function MediaInventoryPage() {
  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <BookOpen className="h-3 w-3" /> Book Inventory
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Book Inventory</h1>
          <p className="text-sm font-bold text-muted-foreground">Manage your physical book stock, ISBNs, and pricing.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 rounded-2xl px-8 font-black h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Title
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Total Titles", value: "234", icon: BookOpen, color: "bg-primary/10 text-primary" },
          { label: "Low Stock", value: "12", icon: AlertTriangle, color: "bg-amber-50 text-amber-600" },
          { label: "Out of Stock", value: "4", icon: TrendingDown, color: "bg-rose-50 text-rose-600" },
          { label: "Well Stocked", value: "218", icon: CheckCircle2, color: "bg-emerald-50 text-emerald-600" },
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
            <Input placeholder="Search by title, author, ISBN..." className="pl-10 h-11 rounded-2xl bg-muted border-none font-bold" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/40">
              <tr>
                {["SKU", "Title", "Author", "Category", "Stock", "Price", "Status", ""].map((h) => (
                  <th key={h} className="text-left p-4 text-[10px] font-black uppercase text-muted-foreground tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {INVENTORY.map((book) => (
                <tr key={book.id} className="hover:bg-muted/20 transition-colors group">
                  <td className="p-4 font-black text-xs text-muted-foreground">{book.id}</td>
                  <td className="p-4 font-bold text-sm text-foreground max-w-[200px]">{book.title}</td>
                  <td className="p-4 font-bold text-sm text-muted-foreground">{book.author}</td>
                  <td className="p-4"><Badge className="bg-primary/10 text-primary border-none font-black text-[10px]">{book.category}</Badge></td>
                  <td className="p-4 font-black text-sm">{book.stock}</td>
                  <td className="p-4 font-bold text-sm">{book.price}</td>
                  <td className="p-4"><Badge className={`font-black text-[10px] border-none ${STATUS_COLOR[book.status]}`}>{book.status}</Badge></td>
                  <td className="p-4"><Button variant="ghost" size="sm" className="rounded-xl text-xs font-black opacity-0 group-hover:opacity-100">Edit</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
