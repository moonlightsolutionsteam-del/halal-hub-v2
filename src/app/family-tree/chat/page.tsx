
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  MessageSquare, Send, Phone, Video, 
  MoreVertical, Search, Plus, ArrowLeft,
  CheckCircle2, Clock, User, Smile,
  Paperclip, Zap, Bell, Volume2, Mic
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { cn } from "@/lib/utils"

const MESSAGES = [
  { id: 1, user: "Fatima", text: "As-salamu alaykum everyone! I've added the grocery list to the board.", time: "10:30 AM", isMe: false },
  { id: 2, user: "Ibrahim", text: "Wa alaykum as-salam! I'll pick them up on my way home tonight.", time: "10:35 AM", isMe: true },
  { id: 3, user: "Zaid", text: "Don't forget the chocolate milk! 🍫", time: "11:02 AM", isMe: false },
  { id: 4, user: "Sarah", text: "I've finished my homework, can we go to the park later?", time: "11:15 AM", isMe: false },
];

export default function FamilyChatPage() {
  const [inputText, setInputText] = React.useState("");

  return (
    <div className="container mx-auto p-6 h-[calc(100svh-8rem)] max-w-6xl flex flex-col gap-6 text-foreground">
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-6">
          <Link href="/family-tree">
            <Button variant="ghost" size="icon" className="rounded-2xl bg-card shadow-sm border h-12 w-12">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
                <Users className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight leading-none">Family Circle</h1>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">4 Members Online</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-xl border h-12 w-12"><Phone className="h-5 w-5 text-muted-foreground" /></Button>
          <Button variant="ghost" size="icon" className="rounded-xl border h-12 w-12"><Video className="h-5 w-5 text-muted-foreground" /></Button>
          <Button variant="ghost" size="icon" className="rounded-xl border h-12 w-12"><MoreVertical className="h-5 w-5 text-muted-foreground" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
        {/* Members Sidebar (Hidden on mobile) */}
        <aside className="hidden lg:flex lg:col-span-3 flex-col gap-6">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-6 space-y-6 flex-1">
            <div className="space-y-1">
              <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground">Members</h3>
            </div>
            <div className="space-y-4">
              {["Ibrahim", "Fatima", "Zaid", "Sarah"].map((name, i) => (
                <div key={name} className="flex items-center justify-between p-3 bg-muted rounded-2xl hover:bg-muted transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm group-hover:scale-105 transition-transform">
                      <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format&q=80`} />
                      <AvatarFallback>{name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-black text-foreground">{name}</p>
                      <p className="text-[9px] font-bold text-emerald-500 uppercase">Online</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="rounded-[2rem] border-none bg-zinc-900 text-white p-6 space-y-4 relative overflow-hidden">
            <Bell className="absolute -top-2 -right-2 h-16 w-16 opacity-10 text-emerald-400" />
            <h4 className="text-sm font-black uppercase tracking-widest">Notice Board</h4>
            <p className="text-xs text-muted-foreground leading-relaxed italic">
              "Grandparents visiting this weekend. Room 2 needs to be ready!"
            </p>
          </Card>
        </aside>

        {/* Chat Area */}
        <Card className="lg:col-span-9 rounded-[3rem] border-none shadow-xl bg-card flex flex-col overflow-hidden">
          <div className="flex-1 p-8 overflow-y-auto space-y-6 bg-muted/30">
            {MESSAGES.map((msg) => (
              <div key={msg.id} className={cn(
                "flex gap-4 max-w-[80%]",
                msg.isMe ? "ml-auto flex-row-reverse" : "mr-auto"
              )}>
                <Avatar className="h-10 w-10 border-2 border-white shadow-sm shrink-0">
                  <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format&q=80`} />
                  <AvatarFallback>{msg.user[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-1.5">
                  <div className={cn(
                    "flex items-baseline gap-3",
                    msg.isMe && "flex-row-reverse"
                  )}>
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{msg.user}</span>
                    <span className="text-[9px] font-bold text-muted-foreground uppercase">{msg.time}</span>
                  </div>
                  <div className={cn(
                    "p-4 rounded-3xl text-sm font-medium shadow-sm",
                    msg.isMe ? "bg-emerald-600 text-white rounded-tr-none" : "bg-card text-foreground rounded-tl-none border border-border"
                  )}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Reply Bar */}
          <div className="px-8 pt-4 flex gap-2 overflow-x-auto no-scrollbar">
            {["Need Bread?", "On my way!", "In Prayer 🤲", "Love you!", "Ready to eat? 🍽️"].map(q => (
              <Button key={q} variant="outline" size="sm" className="rounded-full bg-muted border-none font-black text-[9px] uppercase tracking-tighter whitespace-nowrap hover:bg-emerald-50 hover:text-emerald-600">
                {q}
              </Button>
            ))}
          </div>

          <div className="p-8 pt-4">
            <div className="bg-muted rounded-[2rem] p-2 flex items-center gap-2 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all">
              <Button variant="ghost" size="icon" className="rounded-2xl h-12 w-12 text-muted-foreground hover:text-emerald-600">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Message family..." 
                className="border-none bg-transparent shadow-none focus-visible:ring-0 text-base font-medium h-12"
              />
              <div className="flex gap-1 pr-1">
                <Button variant="ghost" size="icon" className="rounded-2xl h-12 w-12 text-muted-foreground hover:text-emerald-600">
                  <Smile className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-2xl h-12 w-12 text-muted-foreground hover:text-emerald-600">
                  <Mic className="h-5 w-5" />
                </Button>
                <Button className="rounded-[1.5rem] bg-emerald-600 hover:bg-emerald-700 text-white h-12 w-12 p-0 shadow-lg shadow-emerald-200">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Users(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
