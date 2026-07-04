"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Upload, Video, Mic, FileText, 
  ArrowLeft, Plus, Globe, Smartphone,
  Info, Sparkles, CheckCircle2, Zap,
  Loader2, Save, ChevronRight
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export default function ContentUploadPage() {
  const router = useRouter();
  const [type, setType] = React.useState("reel");
  const [loading, setLoading] = React.useState(false);

  const handleUpload = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/vendor/creative/content/published');
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-10 max-w-3xl pb-24 text-foreground">
      <div className="flex items-center gap-6">
        <Button variant="ghost" size="icon" className="rounded-2xl bg-card shadow-sm border h-12 w-12" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black font-headline tracking-tight text-foreground">Upload Content</h1>
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest opacity-60">New Media Production</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {/* Content Type Selector */}
        <section className="space-y-6">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {[
              { id: "reel", label: "Studio Reel", icon: Video, color: "text-blue-600", bg: "bg-blue-50" },
              { id: "podcast", label: "Podcast Ep", icon: Mic, color: "text-purple-600", bg: "bg-purple-50" },
              { id: "article", label: "Blog Article", icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50" },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setType(opt.id)}
                className={cn(
                  "flex flex-col items-center justify-center p-6 rounded-[2.5rem] transition-all border-4",
                  type === opt.id 
                    ? 'bg-card border-primary shadow-xl scale-105' 
                    : 'bg-card border-transparent text-muted-foreground hover:border-border hover:bg-muted'
                )}
              >
                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center mb-3", type === opt.id ? opt.bg + ' ' + opt.color : 'bg-muted text-muted-foreground')}>
                  <opt.icon className="h-6 w-6" />
                </div>
                <span className={cn("text-[10px] font-black uppercase tracking-tighter text-center leading-tight", type === opt.id ? 'text-primary' : 'text-muted-foreground')}>
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Media Upload Area */}
        <Card className="rounded-[3rem] border-none shadow-sm bg-card p-10 space-y-8">
          <div className="p-6 sm:p-12 border-4 border-dashed border-border rounded-[2.5rem] bg-muted/30 flex flex-col items-center justify-center text-center gap-4 hover:border-primary/20 hover:bg-card transition-all cursor-pointer group">
            <div className="h-20 w-20 bg-card rounded-3xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <Upload className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-black text-foreground">Drop your file here</p>
              <p className="text-sm font-medium text-muted-foreground">MP4, MOV, MP3 or PDF (Max 500MB)</p>
            </div>
            <Button size="sm" variant="outline" className="rounded-xl font-black text-[10px] border-2 uppercase h-10 px-8 mt-4">Select from Computer</Button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Content Title</Label>
              <Input placeholder="e.g., Lessons from the Seerah - Part 4" className="h-14 rounded-2xl bg-muted border-none font-black text-xl" />
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Description / Captions</Label>
              <Textarea placeholder="What is this about?" className="min-h-[150px] rounded-2xl bg-muted border-none p-4 font-medium resize-none" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Visibility</Label>
                <Select defaultValue="public">
                  <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-none shadow-2xl">
                    <SelectItem value="public">Public (Everyone)</SelectItem>
                    <SelectItem value="family">Family Hub Only</SelectItem>
                    <SelectItem value="private">Private Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Topic Tags</Label>
                <Input placeholder="History, Faith, etc." className="h-12 rounded-2xl bg-muted border-none font-bold" />
              </div>
            </div>
          </div>
        </Card>

        {/* AI Enhancements */}
        <Card className="rounded-[2.5rem] border-none bg-zinc-900 text-white p-10 space-y-6 relative overflow-hidden">
          <Sparkles className="absolute -top-4 -right-4 h-24 w-24 opacity-10 text-primary" />
          <div className="relative z-10 flex items-center gap-6">
            <div className="h-14 w-14 rounded-2xl bg-card/10 flex items-center justify-center text-primary shadow-inner border border-white/10">
              <Zap className="h-8 w-8 fill-current" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black tracking-tight">AI Co-Producer</h3>
              <p className="text-xs text-muted-foreground font-medium">Generate auto-subtitles and chapter markers for this upload.</p>
            </div>
            <Button size="sm" variant="secondary" className="ml-auto rounded-xl font-black text-[10px] uppercase h-10 px-6 shadow-2xl">Enable AI</Button>
          </div>
        </Card>

        <div className="pt-10 flex flex-col items-center gap-4">
          <Button 
            onClick={handleUpload}
            disabled={loading}
            className="w-full h-20 rounded-[2rem] bg-primary hover:bg-primary/90 text-white font-black text-2xl shadow-2xl transition-transform active:scale-[0.98]"
          >
            {loading ? <Loader2 className="h-8 w-8 animate-spin" /> : "Publish to Hub"}
          </Button>
          <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-center">
            <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Vetted according to Community Standards
          </div>
        </div>
      </div>
    </div>
  );
}
