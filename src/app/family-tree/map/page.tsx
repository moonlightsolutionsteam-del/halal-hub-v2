
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  ArrowLeft, 
  MoreVertical, 
  Plus, 
  RotateCcw, 
  XCircle, 
  Mail, 
  Heart,
  Menu,
  UserPlus
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface TreeNodeProps {
  name: string;
  img: string;
  label: string;
  isUser?: boolean;
  hasSpouse?: boolean;
  className?: string;
}

const TreeNode = ({ name, img, label, isUser, hasSpouse, className }: TreeNodeProps) => (
  <div className={cn("relative flex flex-col items-center gap-3 group shrink-0", className)}>
    <div className={cn(
      "w-36 h-36 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 transition-all duration-500 shadow-xl border-4",
      isUser ? "bg-emerald-50 border-emerald-200" : "bg-white border-transparent hover:border-slate-100"
    )}>
      <div className="relative">
        <Avatar className="h-20 w-20 border-2 border-white shadow-md">
          <AvatarImage src={`https://picsum.photos/seed/${img}/200/200`} />
          <AvatarFallback className="font-black text-xl">{name[0]}</AvatarFallback>
        </Avatar>
        {hasSpouse && (
          <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-white rounded-full flex items-center justify-center shadow-lg">
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-current" />
          </div>
        )}
      </div>
      <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest text-center px-2">{label}</span>
    </div>
  </div>
)

const ConnectorLine = ({ className }: { className?: string }) => (
  <div className={cn("absolute bg-slate-200", className)} />
)

export default function LineageMapPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 overflow-x-hidden">
      {/* Premium Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-6 h-20 flex items-center justify-between border-b shadow-sm">
        <div className="flex items-center gap-6">
          <Link href="/family-tree">
            <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-slate-50 border shadow-sm h-12 w-12">
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </Button>
          </Link>
          <h1 className="text-2xl font-black font-headline text-slate-900 tracking-tight">Family Tree</h1>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10 border-2 border-white shadow-md">
            <AvatarImage src="https://picsum.photos/seed/sa/150/150" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <Button variant="ghost" size="icon" className="rounded-2xl h-12 w-12 hover:bg-slate-50 border shadow-sm">
            <Menu className="h-5 w-5 text-slate-600" />
          </Button>
        </div>
      </header>

      {/* Visual Tree Section */}
      <div className="container mx-auto max-w-7xl px-6 py-20 relative">
        <div className="flex flex-col items-center gap-32">
          
          {/* Level 1: Paternal Grandparents */}
          <div className="relative flex gap-12 sm:gap-24">
            <TreeNode label="P. Grandfather" name="Ibrahim" img="g1" />
            <TreeNode label="P. Grandmother" name="Zainab" img="g2" />
            {/* Horizontal connection between grandparents */}
            <ConnectorLine className="h-0.5 w-24 top-1/2 left-[144px] sm:w-24 hidden sm:block" />
            
            {/* Gap for Maternal side */}
            <div className="w-12" />

            {/* Level 1: Maternal Grandparents */}
            <TreeNode label="M. Grandfather" name="Yusuf" img="g3" />
            <TreeNode label="M. Grandmother" name="Sara" img="g4" />
            <ConnectorLine className="h-0.5 w-24 top-1/2 right-[144px] hidden sm:block" />
          </div>

          {/* Level 2: Parents */}
          <div className="relative flex gap-24 sm:gap-64">
            <div className="relative">
              <TreeNode label="Father" name="Ahmed" img="p1" />
              {/* Vertical line up to grandparents join */}
              <ConnectorLine className="w-0.5 h-16 -top-16 left-1/2" />
            </div>
            <div className="relative">
              <TreeNode label="Mother" name="Fatima" img="p2" />
              <ConnectorLine className="w-0.5 h-16 -top-16 left-1/2" />
            </div>
          </div>

          {/* Level 3: Current Generation & Extended */}
          <div className="relative flex flex-wrap justify-center gap-12 sm:gap-20">
            {/* Extended Branch (Left) */}
            <div className="flex flex-col items-center gap-12 relative">
              <div className="flex gap-8 relative">
                <TreeNode label="Spouse" name="Mariam" img="s1" hasSpouse />
                <TreeNode label="P. Grandfather" name="Hassan" img="eg1" />
                <TreeNode label="P. Grandmother" name="Leila" img="eg2" />
                {/* Visual connectors for extended */}
                <ConnectorLine className="h-0.5 w-12 top-1/2 left-[144px]" />
              </div>
              <TreeNode label="Father" name="Khalid" img="ep1" className="translate-x-12" />
              <ConnectorLine className="w-0.5 h-12 top-[-12px] left-[60%]" />
            </div>

            {/* Main Focus: User & Immediate Family */}
            <div className="flex flex-col items-center gap-12 relative">
              <div className="flex gap-12 relative">
                <TreeNode label="You" name="Ibrahim" img="user" isUser className="shadow-2xl scale-110" />
                <TreeNode label="Spouse" name="Layla" img="user-spouse" hasSpouse />
                <ConnectorLine className="h-0.5 w-12 top-1/2 left-[144px]" />
              </div>
              
              {/* Children */}
              <div className="flex gap-12 relative pt-8">
                <ConnectorLine className="w-0.5 h-8 top-0 left-1/2 -translate-x-[calc(50%+30px)]" />
                <ConnectorLine className="w-0.5 h-8 top-0 left-1/2 translate-x-[calc(50%+30px)]" />
                <TreeNode label="Child 1" name="Zaid" img="c1" />
                <TreeNode label="Child 2" name="Sarah" img="c2" />
              </div>
            </div>

            {/* Extended Branch (Right) */}
            <div className="flex flex-col gap-12 items-center">
              <div className="flex gap-8">
                <TreeNode label="M. Grandfather" name="Omar" img="mg1" />
                <TreeNode label="M. Grandmother" name="Nadia" img="mg2" />
              </div>
              <div className="flex gap-8 items-center">
                <TreeNode label="Mother" name="Zarah" img="m1" />
                <TreeNode label="Sibling 2" name="Ali" img="sb2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Invitations Section */}
      <div className="container mx-auto max-w-2xl px-6 mt-20">
        <Card className="rounded-[3rem] border-none shadow-2xl bg-white p-10 space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Pending Invitations</h2>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-12 px-6 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-emerald-200">
              <UserPlus className="h-4 w-4 mr-2" /> Invite Member
            </Button>
          </div>

          <div className="space-y-4">
            {[
              { name: "Aliya Khan", initials: "A" },
              { name: "Yusuf Ibrahim", initials: "Y" },
            ].map((invite, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center justify-between p-6 bg-emerald-50/50 rounded-[2rem] border border-emerald-100/50 gap-6 transition-all hover:bg-emerald-50">
                <div className="flex items-center gap-6">
                  <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center text-slate-400 font-black text-lg shadow-inner">
                    {invite.initials}
                  </div>
                  <div>
                    <p className="text-lg font-black text-slate-900 leading-tight">{invite.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Invited by You</p>
                  </div>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <Button variant="outline" className="flex-1 sm:flex-none rounded-xl h-11 bg-white border-none shadow-sm font-black text-[10px] uppercase tracking-widest text-slate-600 hover:bg-slate-50">
                    <RotateCcw className="h-3.5 w-3.5 mr-2" /> Resend
                  </Button>
                  <Button variant="destructive" className="flex-1 sm:flex-none rounded-xl h-11 font-black text-[10px] uppercase tracking-widest bg-rose-600 shadow-lg shadow-rose-200">
                    <XCircle className="h-3.5 w-3.5 mr-2" /> Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Footer Exit Label */}
      <div className="container mx-auto max-w-7xl px-6 pt-20 flex justify-center">
        <div className="h-10 w-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-black text-xs shadow-xl">
          N
        </div>
      </div>
    </div>
  )
}
