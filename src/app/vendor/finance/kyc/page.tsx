
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users, Search, Filter, ShieldCheck,
  CheckCircle2, Clock, MoreVertical, Eye,
  Lock, ArrowUpRight, UserPlus, FileCheck
} from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FinanceKYCPage() {
  const [showNewVerificationModal, setShowNewVerificationModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState<string | null>(null)

  const kycList = [
    { id: "KYC-8821", name: "Ahmed Abdullah", level: "HNWI", status: "Verified", date: "Nov 01, 2024" },
    { id: "KYC-8822", name: "Sarah Khan", level: "Corporate", status: "Pending Docs", date: "Oct 28, 2024" },
    { id: "KYC-8823", name: "Zaid Ali", level: "Retail", status: "Verified", date: "Oct 15, 2024" },
  ];

  const selectedKyc = kycList.find(k => k.id === showViewModal)

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-[10px]">
            <Lock className="h-3 w-3" /> Identity Security
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">KYC Registry</h1>
          <p className="text-muted-foreground font-medium">Verify investor identities and manage institutional compliance requirements.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-full px-8 font-black shadow-lg shadow-indigo-200 h-12 text-white" onClick={() => setShowNewVerificationModal(true)}>
          <UserPlus className="mr-2 h-4 w-4" /> New Verification
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Verified Users", value: "1,240", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pending KYC", value: "15", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Compliance Rate", value: "99.2%", icon: ShieldCheck, color: "text-indigo-600", bg: "bg-indigo-50" },
        ].map((stat, i) => (
          <Card key={i} className="rounded-3xl border-none shadow-sm p-6 bg-card flex items-center gap-4">
            <div className={`h-12 w-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-foreground">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card">
        <CardHeader className="p-8 border-b flex flex-col md:flex-row items-center justify-between gap-4">
          <CardTitle className="text-xl font-black">Verification Registry</CardTitle>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name or ID..." className="pl-9 h-11 rounded-2xl bg-muted border-none font-medium" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-none">
                <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">ID / Date</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">User Name</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Level</TableHead>
                <TableHead className="h-14 text-right px-8 font-black text-[10px] uppercase tracking-widest">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kycList.map((kyc) => (
                <TableRow key={kyc.id} className="border-border hover:bg-muted/50 transition-colors group cursor-pointer" onClick={() => setShowViewModal(kyc.id)}>
                  <TableCell className="px-8 py-5">
                    <div className="font-black text-foreground text-sm">{kyc.id}</div>
                    <div className="text-[9px] font-bold text-muted-foreground uppercase">{kyc.date}</div>
                  </TableCell>
                  <TableCell className="font-bold text-foreground">{kyc.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-indigo-100 text-indigo-600 font-black text-[9px] uppercase px-2">{kyc.level}</Badge>
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <Badge className={kyc.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-none' : 'bg-amber-50 text-amber-600 border-none'}>
                      {kyc.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* New Verification Modal */}
      <Dialog open={showNewVerificationModal} onOpenChange={setShowNewVerificationModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">New KYC Verification</DialogTitle>
            <DialogDescription>Start a new identity verification for an investor or corporate entity.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Full Legal Name</Label>
              <Input placeholder="e.g. Ahmed Abdullah" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Investor Level</Label>
              <Select>
                <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="hnwi">HNWI (High Net Worth)</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="institutional">Institutional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">National ID / Passport Number</Label>
              <Input placeholder="e.g. A1234567" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Email Address</Label>
              <Input type="email" placeholder="investor@example.com" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Verification Method</Label>
              <Select>
                <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="digital">Digital ID Scan</SelectItem>
                  <SelectItem value="manual">Manual Review</SelectItem>
                  <SelectItem value="biometric">Biometric Verification</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setShowNewVerificationModal(false)}>Start Verification</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View KYC Record Modal */}
      <Dialog open={!!showViewModal} onOpenChange={() => setShowViewModal(null)}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">KYC Record — {selectedKyc?.name}</DialogTitle>
            <DialogDescription>Full verification details for this investor record.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            {selectedKyc && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "KYC ID", value: selectedKyc.id },
                    { label: "Verification Date", value: selectedKyc.date },
                    { label: "Investor Level", value: selectedKyc.level },
                    { label: "Status", value: selectedKyc.status },
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-muted rounded-2xl space-y-1">
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{item.label}</p>
                      <p className="text-sm font-black text-foreground">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-muted rounded-2xl space-y-2">
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Documents Submitted</p>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground">National ID — Verified</p>
                    <p className="text-sm font-bold text-foreground">Proof of Address — Verified</p>
                    {selectedKyc.status === 'Pending Docs' && <p className="text-sm font-bold text-amber-600">Income Statement — Pending</p>}
                  </div>
                </div>
              </>
            )}
            <Button className="w-full h-12 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setShowViewModal(null)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
