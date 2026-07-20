// @ts-nocheck

"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { 
  ArrowLeft, Wallet, Calendar, User, 
  MapPin, Tag, Share2, MoreVertical,
  History, ShieldCheck, CheckCircle2,
  Trash2, Edit2, Split, Utensils,
  ChevronRight, ArrowRight, Zap, Clock,
  FileText
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default function ExpenseDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Mock data for detail view
  const expense = {
    id: id,
    title: "Weekend Dinner at The Halal Grill",
    amount: "₹1,200",
    category: "Food / Dining",
    categoryIcon: Utensils,
    paidBy: "Ibrahim",
    date: "Oct 10, 2024",
    time: "8:45 PM",
    splitWith: ["Ibrahim", "Fatima", "Zaid", "Sarah"],
    note: "Celebrating Zaid's excellent exam results. Everyone enjoyed the Wagyu platter.",
    status: "Verified",
    linkedEvent: "Family Dinner Plan",
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-10 max-w-4xl pb-24 text-foreground">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-2xl bg-card shadow-sm border h-12 w-12" 
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="space-y-1">
            <h1 className="text-2xl font-black font-headline tracking-tight">Expense Details</h1>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Transaction ID: {id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-xl border shadow-sm h-12 w-12"><Share2 className="h-5 w-5 text-muted-foreground" /></Button>
          <Button variant="ghost" size="icon" className="rounded-xl border shadow-sm h-12 w-12"><MoreVertical className="h-5 w-5 text-muted-foreground" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Info */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="rounded-[3rem] border-none shadow-sm bg-card overflow-hidden">
            <div className="p-5 sm:p-10 space-y-10">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                <div className="space-y-4">
                  <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none font-black text-[10px] uppercase px-4 h-8 flex items-center gap-2 w-fit">
                    <expense.categoryIcon className="h-3.5 w-3.5" /> {expense.category}
                  </Badge>
                  <h2 className="text-2xl sm:text-4xl font-black leading-tight tracking-tight text-foreground">{expense.title}</h2>
                  <div className="flex items-center gap-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-blue-500" /> {expense.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-blue-500" /> {expense.time}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Total Amount</p>
                  <p className="text-3xl sm:text-6xl font-black text-foreground tracking-tighter">{expense.amount}</p>
                </div>
              </div>

              <div className="p-8 bg-muted rounded-[2rem] border border-border space-y-4">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5" /> Attached Note
                </Label>
                <p className="text-base font-medium text-muted-foreground leading-relaxed italic">
                  "{expense.note}"
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h3 className="font-black text-lg flex items-center gap-2">
                    <Split className="h-5 w-5 text-blue-600" /> Share Breakdown
                  </h3>
                  <Badge className="bg-blue-50 text-blue-600 border-none font-black text-[10px] px-3 h-6 uppercase">Splitted Equally</Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {expense.splitWith.map((member, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-card rounded-3xl border border-border shadow-sm group hover:border-blue-200 transition-all">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                          <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format&q=80`} />
                          <AvatarFallback>{member[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-black text-foreground">{member}</span>
                      </div>
                      <span className="text-base font-black text-foreground">₹300</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <CardFooter className="bg-muted/50 p-8 border-t border-border flex justify-between items-center">
              <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                <ShieldCheck className="h-4 w-4 text-emerald-500" /> Verified by {expense.paidBy}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="rounded-xl h-10 border-2 font-black text-[10px] uppercase tracking-tighter hover:bg-card shadow-sm">
                  <Edit2 className="h-3.5 w-3.5 mr-2" /> Edit Entry
                </Button>
                <Button variant="outline" className="rounded-xl h-10 border-2 font-black text-[10px] uppercase tracking-tighter hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 shadow-sm transition-all">
                  <Trash2 className="h-3.5 w-3.5 mr-2" /> Remove
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Sidebar Context */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-8">
            <div className="space-y-1">
              <h3 className="text-xl font-black text-foreground">Payment Info</h3>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Execution Details</p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-muted rounded-2xl">
                <div className="h-12 w-12 rounded-xl bg-card flex items-center justify-center text-blue-600 shadow-sm">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-muted-foreground">Payer</p>
                  <p className="text-sm font-black text-foreground">{expense.paidBy}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-muted rounded-2xl">
                <div className="h-12 w-12 rounded-xl bg-card flex items-center justify-center text-emerald-600 shadow-sm">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-muted-foreground">Linked Activity</p>
                  <p className="text-sm font-black text-foreground truncate">{expense.linkedEvent}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none bg-blue-600 text-white p-10 space-y-6 relative overflow-hidden shadow-2xl">
            <Zap className="absolute -top-4 -right-4 h-24 w-24 opacity-10 text-white" />
            <div className="h-14 w-14 rounded-2xl bg-card/10 flex items-center justify-center shadow-inner border border-white/10">
              <ArrowUpRight className="h-8 w-8 text-white" />
            </div>
            <div className="space-y-2">
              <h4 className="text-2xl font-black tracking-tight leading-tight">Sync Discovery?</h4>
              <p className="text-xs text-blue-100 leading-relaxed font-medium">
                You spent ₹1,200 on {expense.category}. Check out other certified halal venues in this category.
              </p>
            </div>
            <Link href="/family-tree/discovery">
              <Button className="w-full bg-card text-blue-600 hover:bg-blue-50 rounded-2xl font-black text-xs uppercase h-14 shadow-xl">Explore Similar</Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
