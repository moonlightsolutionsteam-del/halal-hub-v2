
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  ArrowLeft, ClipboardList, Plus, 
  UserCircle, Calendar, Pin, 
  Save, Loader2, Users, Target,
  CheckCircle2, Star, Zap
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const FAMILY_MEMBERS = [
  { id: 'm1', name: 'Ibrahim', initials: 'I' },
  { id: 'm2', name: 'Fatima', initials: 'F' },
  { id: 'm3', name: 'Zaid', initials: 'Z' },
  { id: 'm4', name: 'Sarah', initials: 'S' },
];

export default function AddBoardItemPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [selectedAssignee, setSelectedAssignee] = React.useState("m1");
  const [isPriority, setIsPriority] = React.useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/family-tree/board');
    }, 1500);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-10 max-w-2xl pb-24 text-foreground">
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
          <h1 className="text-xl sm:text-3xl font-black font-headline tracking-tight">New Board Note</h1>
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest opacity-60">Family Coordination</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10">
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="rounded-[3rem] border-none shadow-xl bg-card p-10 space-y-8">
            <div className="space-y-4">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Note Title</Label>
              <Input placeholder="e.g., Buy ingredients for Biryani" className="h-14 rounded-2xl bg-muted border-none font-black text-xl" />
            </div>

            <div className="space-y-4">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Details (Optional)</Label>
              <Textarea 
                placeholder="Add more context here..." 
                className="min-h-[100px] rounded-2xl bg-muted border-none p-4 font-medium resize-none" 
              />
            </div>

            <div className="space-y-4">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Assign to Member</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {FAMILY_MEMBERS.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => setSelectedAssignee(member.id)}
                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-3xl transition-all border-4",
                      selectedAssignee === member.id 
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
                        : 'bg-muted border-transparent text-muted-foreground hover:bg-muted'
                    )}
                  >
                    <Avatar className="h-10 w-10 mb-2 border-2 border-white shadow-sm">
                      <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format&q=80`} />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-[10px] font-black uppercase tracking-tighter">{member.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-6 bg-amber-50 rounded-2xl border-2 border-amber-100 cursor-pointer transition-all hover:bg-amber-100" onClick={() => setIsPriority(!isPriority)}>
              <div className="flex items-center gap-4">
                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shadow-sm transition-colors", isPriority ? "bg-amber-500 text-white" : "bg-card text-muted-foreground")}>
                  <Pin className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-black text-amber-900">Mark as Priority</p>
                  <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Pin to top of family board</p>
                </div>
              </div>
              <Badge variant={isPriority ? "default" : "outline"} className={cn("rounded-full h-6 px-3 border-amber-200", isPriority ? "bg-amber-500 text-white" : "text-muted-foreground")}>
                {isPriority ? "ON" : "OFF"}
              </Badge>
            </div>
          </Card>
        </section>

        <div className="pt-10 flex flex-col items-center gap-4">
          <Button 
            onClick={handleSave}
            disabled={loading}
            className="w-full h-20 rounded-[2rem] bg-emerald-600 hover:bg-emerald-700 text-white font-black text-2xl shadow-2xl transition-transform active:scale-[0.98]"
          >
            {loading ? <Loader2 className="h-8 w-8 animate-spin" /> : "Post to Family Board"}
          </Button>
          <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-center">
            <Zap className="h-3 w-3 text-blue-500" /> Notifications will be sent to all members
          </div>
        </div>
      </div>
    </div>
  );
}
