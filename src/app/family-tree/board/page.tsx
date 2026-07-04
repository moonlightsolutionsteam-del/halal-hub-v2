"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ClipboardList, Plus, Search, Filter,
  CheckCircle2, Clock, User, Pin,
  MoreVertical, ArrowLeft, Trash2, Edit2,
  AlertCircle, CheckCircle, Smartphone,
  Wallet, RotateCcw, ShieldCheck
} from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export default function FamilyBoardPage() {
  const [activeTab, setActiveTab] = React.useState("active")

  const boardItems = [
    { id: 1, title: "Buy Groceries", desc: "Need fresh meat and produce for the weekend.", assigned: "Fatima", priority: true, status: "Active", date: "Today" },
    { id: 2, title: "School Project Material", desc: "Art supplies for Zaid's science project.", assigned: "Ibrahim", priority: false, status: "Active", date: "Oct 12" },
    { id: 3, title: "Book Service", desc: "The Bosphorus Kitchen for Saturday dinner.", assigned: "Ibrahim", priority: true, status: "Completed", date: "Done" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-5xl pb-24 text-foreground">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <Link href="/family-tree" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-emerald-600 transition-colors w-fit">
            <ArrowLeft className="h-4 w-4" /> Back to Hub
          </Link>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
              <ClipboardList className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-black font-headline text-foreground">Family Board</h1>
          </div>
          <p className="text-muted-foreground font-medium">Shared notes and coordination tasks for the whole family.</p>
        </div>
        <Link href="/family-tree/board/add">
          <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-8 font-black shadow-lg shadow-emerald-200 h-12 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add Note
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-[2rem] shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search board..." className="pl-9 h-11 rounded-2xl bg-muted border-none font-medium" />
        </div>
        <div className="flex items-center gap-2">
          <Badge 
            onClick={() => setActiveTab("active")}
            variant={activeTab === 'active' ? 'secondary' : 'outline'} 
            className={`px-6 py-3 rounded-full cursor-pointer transition-all ${activeTab === 'active' ? 'bg-emerald-600 text-white border-none' : 'hover:bg-muted text-muted-foreground'}`}
          >
            Active
          </Badge>
          <Badge 
            onClick={() => setActiveTab("completed")}
            variant={activeTab === 'completed' ? 'secondary' : 'outline'} 
            className={`px-6 py-3 rounded-full cursor-pointer transition-all ${activeTab === 'completed' ? 'bg-emerald-600 text-white border-none' : 'hover:bg-muted text-muted-foreground'}`}
          >
            Completed
          </Badge>
          <Button variant="ghost" size="icon" className="rounded-full"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {boardItems.filter(item => item.status.toLowerCase() === activeTab).map((item) => (
          <Card key={item.id} className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-card group hover:shadow-md transition-all border-2 border-transparent hover:border-emerald-100">
            <div className="p-8 flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  {item.priority && <Badge className="bg-amber-100 text-amber-700 border-none font-black text-[9px] uppercase tracking-widest px-2 h-6 flex items-center gap-1.5"><Pin className="h-3 w-3 fill-current" /> Important</Badge>}
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{item.date}</span>
                </div>
                <div>
                  <h3 className={cn("text-2xl font-black text-foreground leading-tight", item.status === 'Completed' && "line-through opacity-40")}>{item.title}</h3>
                  <p className="text-muted-foreground font-medium mt-1 leading-relaxed italic">"{item.desc}"</p>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 border-2 border-white shadow-sm">
                      <AvatarImage src={`https://picsum.photos/seed/${item.assigned}/100/100`} />
                      <AvatarFallback>{item.assigned[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Assigned: {item.assigned}</span>
                  </div>
                  {(item.title.toLowerCase().includes('buy') || item.title.toLowerCase().includes('book')) && (
                    <Link href="/family-tree/expenses/add">
                      <Button variant="outline" size="sm" className="h-7 rounded-xl border-blue-200 text-blue-600 bg-blue-50 font-black text-[9px] uppercase hover:bg-blue-600 hover:text-white transition-all">
                        <Wallet className="h-3 w-3 mr-1" /> Mark as Expense
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto md:flex-col justify-end">
                <Button size="icon" variant="ghost" className="rounded-xl h-12 w-12 hover:bg-emerald-50 hover:text-emerald-600 transition-colors border">
                  {item.status === 'Completed' ? <RotateCcw className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
                </Button>
                <Button size="icon" variant="ghost" className="rounded-xl h-12 w-12 hover:bg-muted transition-colors border"><Edit2 className="h-5 w-5 text-muted-foreground" /></Button>
                <Button size="icon" variant="ghost" className="rounded-xl h-12 w-12 hover:bg-rose-50 hover:text-rose-600 transition-colors border"><Trash2 className="h-5 w-5 text-muted-foreground" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Role Notice */}
      <Card className="rounded-[2.5rem] border-none bg-zinc-900 text-white p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <ShieldCheck className="h-32 w-32" />
        </div>
        <div className="relative z-10 flex items-center gap-6">
          <div className="h-14 w-14 rounded-2xl bg-card/10 flex items-center justify-center text-emerald-400 border border-white/10">
            <User className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-black tracking-tight">Your Role: Parent</h4>
            <p className="text-xs text-muted-foreground font-medium">You can create board items, assign members, and manage events for the whole family.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
