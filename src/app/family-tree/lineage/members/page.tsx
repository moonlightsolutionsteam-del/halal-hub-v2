
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users, Search, Filter, MoreVertical, 
  ArrowLeft, Plus, ShieldCheck, CheckCircle2,
  Mail, Phone, Star, MapPin, UserPlus,
  ArrowUpRight, Info
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import Link from "next/link"

export default function FamilyMembersPage() {
  const members = [
    { id: 1, name: "Ibrahim Al-Sayed", role: "Admin", status: "Active", joined: "May 2023", nodesAdded: 42, img: "av1" },
    { id: 2, name: "Fatima Al-Sayed", role: "Parent", status: "Active", joined: "May 2023", nodesAdded: 15, img: "av2" },
    { id: 3, name: "Zaid Al-Sayed", role: "Child", status: "Active", joined: "Jun 2023", nodesAdded: 2, img: "av3" },
    { id: 4, name: "Omar Farooq", role: "Extended", status: "Active", joined: "Aug 2023", nodesAdded: 8, img: "av4" },
    { id: 5, name: "Nadia Khan", role: "Extended", status: "Invited", joined: "Oct 2024", nodesAdded: 0, img: "av5" },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-10 max-w-6xl pb-24">
      <div className="flex flex-col gap-6">
        <Link href="/family-tree" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-emerald-600 transition-colors w-fit">
          <ArrowLeft className="h-4 w-4" /> Back to Hub
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl flex items-center justify-center bg-blue-100 text-blue-600 shadow-inner">
                <Users className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-2xl sm:text-5xl font-black font-headline text-foreground tracking-tight">Member Directory</h1>
                <p className="text-muted-foreground font-medium text-xl">Manage family participants, roles, and collaboration permissions.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-8 font-black shadow-lg shadow-emerald-200 h-14 text-white">
              <UserPlus className="mr-2 h-4 w-4" /> Invite Member
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-[2.5rem] shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search family members..." className="pl-9 h-11 rounded-2xl bg-muted border-none font-medium" />
        </div>
        <div className="flex items-center gap-2">
          {["All", "Admin", "Parents", "Children", "Extended"].map(f => (
            <Badge key={f} variant="secondary" className="px-4 py-2 rounded-full cursor-pointer hover:bg-emerald-600 hover:text-white transition-all border-none bg-muted text-muted-foreground font-black text-[10px] uppercase tracking-widest">{f}</Badge>
          ))}
          <Button variant="ghost" size="icon" className="rounded-full h-11 w-11"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      <Card className="rounded-[3rem] border-none shadow-sm overflow-hidden bg-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-none">
                <TableHead className="px-10 h-16 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Family Member</TableHead>
                <TableHead className="h-16 font-black text-[10px] uppercase tracking-widest text-muted-foreground text-center">Hub Role</TableHead>
                <TableHead className="h-16 font-black text-[10px] uppercase tracking-widest text-muted-foreground text-center">Nodes Contributed</TableHead>
                <TableHead className="h-16 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Join Date</TableHead>
                <TableHead className="h-16 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
                <TableHead className="text-right px-10 h-16 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((m) => (
                <TableRow key={m.id} className="border-border hover:bg-muted/50 transition-colors group">
                  <TableCell className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                        <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&auto=format&q=80`} />
                        <AvatarFallback>{m.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-black text-foreground text-base">{m.name}</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">ID: HUB-F-882{m.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={`rounded-full px-3 text-[9px] font-black uppercase border-none ${
                      m.role === 'Admin' ? 'bg-zinc-900 text-white' : 
                      m.role === 'Parent' ? 'bg-emerald-50 text-emerald-600' : 
                      'bg-muted text-muted-foreground'
                    }`}>
                      {m.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center font-black text-foreground">{m.nodesAdded}</TableCell>
                  <TableCell className="text-xs font-bold text-muted-foreground">{m.joined}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${m.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-muted'}`} />
                      <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{m.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right px-10">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="ghost" className="rounded-xl"><Phone className="h-4 w-4 text-muted-foreground" /></Button>
                      <Button size="icon" variant="ghost" className="rounded-xl"><MoreVertical className="h-4 w-4 text-muted-foreground" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="p-5 sm:p-10 bg-zinc-900 text-white rounded-[3rem] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <ShieldCheck className="h-48 w-48" />
        </div>
        <div className="relative z-10 space-y-4 text-center md:text-left flex-1">
          <h2 className="text-xl sm:text-3xl font-black font-headline">Privacy & Role Governance</h2>
          <p className="text-muted-foreground font-medium text-lg leading-relaxed max-w-2xl">
            Only Family Admins can change roles or remove members. All member activity is logged in the Heritage Logs for data integrity.
          </p>
        </div>
        <Button variant="secondary" className="h-16 px-12 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase text-sm tracking-widest shadow-2xl relative z-10 border-none">Security Settings</Button>
      </div>
    </div>
  );
}
