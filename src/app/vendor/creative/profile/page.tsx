
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  UserCircle, Camera, Globe, Github, 
  Twitter, Instagram, Youtube, Save,
  CheckCircle2, ShieldCheck, Globe2,
  Share2, ArrowLeft, MoreVertical,
  Plus
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default function CreativeProfilePage() {
  return (
    <div className="container mx-auto p-6 space-y-10 max-w-4xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <UserCircle className="h-3 w-3" /> Identity Hub
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Creator Identity</h1>
          <p className="text-muted-foreground font-medium">Manage your public persona, scholarly verification, and digital footprint.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-2xl h-12 px-8 font-black uppercase text-xs tracking-widest shadow-xl">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {/* Profile Basics */}
        <Card className="rounded-[3rem] border-none shadow-sm bg-white overflow-hidden">
          <div className="h-32 bg-slate-100 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20" />
            <Button variant="secondary" className="absolute bottom-4 right-4 h-9 rounded-xl font-bold text-xs bg-white/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
              <ImageIcon className="h-4 w-4 mr-2" /> Change Cover
            </Button>
          </div>
          <CardContent className="p-10 pt-0">
            <div className="flex flex-col sm:flex-row gap-8 items-end -mt-12 mb-10">
              <div className="relative">
                <Avatar className="h-32 w-32 border-8 border-white shadow-2xl">
                  <AvatarImage src="https://picsum.photos/seed/creator-main/400/400" />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl font-black">HA</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-1 right-1 h-10 w-10 bg-primary text-white rounded-2xl flex items-center justify-center border-4 border-white shadow-xl hover:scale-110 transition-transform">
                  <Camera className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-1 pb-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-3xl font-black text-slate-900">Shaykh Hamza</h3>
                  <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[9px] uppercase px-3 h-6">VERIFIED SCHOLAR</Badge>
                </div>
                <p className="text-sm font-bold text-slate-400">@hamza_legacy • Member since 2021</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase text-slate-400 tracking-widest">Display Name</Label>
                <Input defaultValue="Shaykh Hamza" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase text-slate-400 tracking-widest">Primary Language</Label>
                <Input defaultValue="English / Arabic" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label className="font-black text-xs uppercase text-slate-400 tracking-widest">Public Bio</Label>
                <Textarea 
                  className="min-h-[120px] rounded-2xl bg-slate-50 border-none p-4 font-medium"
                  defaultValue="Bridging traditional wisdom with modern life. Islamic scholar and digital educator focusing on ethical lifestyles."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Presence */}
        <section className="space-y-6">
          <h2 className="text-xl font-black px-2">Digital Presence</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: "Personal Website", icon: Globe, val: "iman-hub.com", color: "text-blue-600", bg: "bg-blue-50" },
              { label: "YouTube Channel", icon: Youtube, val: "youtube.com/hamza_deen", color: "text-red-600", bg: "bg-red-50" },
              { label: "Instagram", icon: Instagram, val: "@hamza_legacy", color: "text-pink-600", bg: "bg-pink-50" },
              { label: "Twitter / X", icon: Twitter, val: "@hamza_deen", color: "text-slate-900", bg: "bg-slate-50" },
            ].map((social, i) => (
              <Card key={i} className="rounded-3xl border-none shadow-sm bg-white p-6 group hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner", social.bg, social.color)}>
                    <social.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-0.5">{social.label}</p>
                    <Input defaultValue={social.val} className="h-8 border-none bg-transparent p-0 text-sm font-bold focus-visible:ring-0" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Verification Status */}
        <Card className="rounded-[3rem] border-none bg-slate-900 text-white p-10 relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
          <ShieldCheck className="absolute -top-4 -right-4 h-48 w-48 opacity-10 text-primary" />
          <div className="h-20 w-20 rounded-[2rem] bg-white/10 flex items-center justify-center text-primary border border-white/10 shadow-2xl shrink-0">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <div className="space-y-2 relative z-10 flex-1 text-center md:text-left">
            <h3 className="text-2xl font-black tracking-tight leading-tight">Verified Authority Status</h3>
            <p className="text-slate-400 font-medium leading-relaxed italic">
              Your scholarly credentials have been audited and verified by the Halal Hub Integrity Board. This gives you high-visibility across the ecosystem.
            </p>
          </div>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-xl h-12 px-8 font-black text-xs uppercase tracking-widest relative z-10">
            Audit Records
          </Button>
        </Card>
      </div>
    </div>
  )
}

function ImageIcon(props: any) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  )
}
