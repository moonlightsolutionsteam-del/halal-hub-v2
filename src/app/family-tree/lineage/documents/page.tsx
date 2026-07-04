
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, Upload, Download, Search, 
  Filter, Trash2, ShieldCheck, History,
  ArrowLeft, Plus, MoreVertical, Eye,
  Lock, Award, CheckCircle2, Info
} from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function DocumentVaultPage() {
  const docs = [
    { id: 1, name: "Birth Certificate - Ibrahim", type: "Certificate", status: "Verified", date: "Oct 12, 2023", size: "1.2 MB", uploader: "Ibrahim" },
    { id: 2, name: "Family Hajj Record 1982", type: "Religious", status: "Verified", date: "Nov 01, 2023", size: "4.5 MB", uploader: "Fatima" },
    { id: 3, name: "Property Deed (Historical)", type: "Legal", status: "Under Review", date: "Jan 15, 2024", size: "850 KB", uploader: "Ibrahim" },
    { id: 4, name: "Marriage Contract", type: "Certificate", status: "Verified", date: "Mar 22, 2024", size: "2.1 MB", uploader: "Fatima" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-10 max-w-6xl pb-24">
      <div className="flex flex-col gap-6">
        <Link href="/family-tree" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-emerald-600 transition-colors w-fit">
          <ArrowLeft className="h-4 w-4" /> Back to Hub
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl flex items-center justify-center bg-amber-100 text-amber-600 shadow-inner">
                <FileText className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h1 className="text-5xl font-black font-headline text-foreground tracking-tight">Document Vault</h1>
                <p className="text-muted-foreground font-medium text-xl">Securely store and manage historical family records and certifications.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-8 font-black shadow-lg shadow-emerald-200 h-14 text-white">
              <Upload className="mr-2 h-4 w-4" /> Upload Document
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Files", value: "24", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Verified Docs", value: "18", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Storage Used", value: "142 MB", icon: Lock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Pending Review", value: "2", icon: History, color: "text-rose-600", bg: "bg-rose-50" },
        ].map((stat, i) => (
          <Card key={i} className="rounded-3xl border-none shadow-sm p-6 bg-card flex items-center gap-4 group hover:shadow-md transition-all">
            <div className={`h-12 w-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-foreground">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-[2.5rem] shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search vault..." className="pl-9 h-11 rounded-2xl bg-muted border-none font-medium" />
        </div>
        <div className="flex items-center gap-2">
          {["All Files", "Certificates", "Religious", "Legal"].map(f => (
            <Badge key={f} variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted transition-all border-border text-muted-foreground font-black text-[10px] uppercase tracking-widest">{f}</Badge>
          ))}
          <Button variant="ghost" size="icon" className="rounded-full h-11 w-11"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {docs.map((doc) => (
          <Card key={doc.id} className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden border-2 border-transparent hover:border-emerald-100 transition-all group">
            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-10">
              <div className="flex items-center gap-6 flex-1">
                <div className="h-16 w-16 rounded-[1.5rem] bg-muted flex items-center justify-center text-muted-foreground group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-colors shadow-inner">
                  <FileText className="h-8 w-8" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-black text-foreground truncate leading-tight">{doc.name}</h3>
                    <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-border text-muted-foreground h-5 px-2">{doc.type}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> By {doc.uploader}</span>
                    <span>•</span>
                    <span>{doc.size}</span>
                    <span>•</span>
                    <span>{doc.date}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Badge className={
                  doc.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-none px-4 h-8 flex items-center font-black uppercase text-[10px] tracking-widest' : 'bg-amber-50 text-amber-600 border-none px-4 h-8 flex items-center font-black uppercase text-[10px] tracking-widest'
                }>
                  {doc.status}
                </Badge>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="ghost" className="rounded-xl h-10 w-10 hover:bg-card hover:shadow-sm"><Eye className="h-4 w-4 text-muted-foreground" /></Button>
                  <Button size="icon" variant="ghost" className="rounded-xl h-10 w-10 hover:bg-card hover:shadow-sm"><Download className="h-4 w-4 text-muted-foreground" /></Button>
                  <Button size="icon" variant="ghost" className="rounded-xl h-10 w-10 hover:bg-rose-50 hover:text-rose-600"><Trash2 className="h-4 w-4 text-muted-foreground" /></Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="p-10 bg-zinc-900 text-white rounded-[3rem] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Lock className="h-48 w-48" />
        </div>
        <div className="relative z-10 space-y-4 text-center md:text-left flex-1">
          <h2 className="text-3xl font-black font-headline">Theological Data Privacy</h2>
          <p className="text-muted-foreground font-medium text-lg leading-relaxed max-w-2xl">
            Your documents are encrypted and only accessible by confirmed family members. We follow strict privacy standards to ensure your heritage stays private.
          </p>
        </div>
        <Button variant="outline" className="h-16 px-12 rounded-2xl border-2 border-white/20 text-white font-black uppercase text-sm tracking-widest hover:bg-card/10 relative z-10">Read Trust Policy</Button>
      </div>
    </div>
  );
}

function User(props: any) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
