
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, ShieldCheck, Users, IndianRupee, 
  ArrowUpRight, FileWarning, ExternalLink 
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

export default function SuperAdminDashboard() {
  const stats = [
    {
      label: "Total Organizations",
      value: "1,250",
      trend: "+12 since last month",
      icon: Building2,
    },
    {
      label: "Pending Verifications",
      value: "15",
      trend: "3 new today",
      icon: ShieldCheck,
    },
    {
      label: "Total Users",
      value: "+23,450",
      trend: "+180 since last week",
      icon: Users,
    },
    {
      label: "Platform Revenue",
      value: "₹1,25,231",
      trend: "+19% from last month",
      icon: IndianRupee,
    },
  ];

  const pendingVerifications = [
    { name: "Mercy Foundation", type: "Organization", status: "Pending Docs", date: "2024-07-30", statusVariant: "secondary" as const },
    { name: "Karim's Restaurant", type: "Business", status: "Pending Review", date: "2024-07-29", statusVariant: "outline" as const },
    { name: "Al-Huda Masjid", type: "Mosque", status: "Pending Review", date: "2024-07-28", statusVariant: "outline" as const },
  ];

  const reportedContent = [
    { content: "EVT-045", type: "Event", reason: "Misleading event description" },
    { content: "REV-981", type: "Review", reason: "Spam / Inappropriate language" },
  ];

  return (
    <div className="p-8 space-y-8 bg-[#F8F9FA] min-h-screen">
      <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline text-slate-900">Super Admin Dashboard</h1>
        <p className="text-muted-foreground font-medium">Platform-wide overview and management tools.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl p-6 bg-white">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-bold text-slate-500">{stat.label}</span>
              <stat.icon className="h-5 w-5 text-slate-400" />
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-black text-slate-900">{stat.value}</div>
              <p className="text-[10px] font-bold text-muted-foreground">{stat.trend}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Verifications */}
        <Card className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="p-8 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-black">Pending Verifications</CardTitle>
              <p className="text-sm text-muted-foreground font-medium">Review new submissions for businesses, mosques, and organizations.</p>
            </div>
            <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full font-bold h-9 px-4">
              View All <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/10">
                <TableRow className="border-none">
                  <TableHead className="px-8 font-bold text-slate-400 uppercase text-[10px] tracking-wider">Name</TableHead>
                  <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-wider">Type</TableHead>
                  <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-wider">Status</TableHead>
                  <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-wider text-right px-8">Submitted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingVerifications.map((item, i) => (
                  <TableRow key={i} className="border-muted/20 hover:bg-muted/5">
                    <TableCell className="px-8 py-5 font-bold text-slate-800">{item.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none font-black text-[9px] uppercase tracking-tighter">
                        {item.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.statusVariant} className={item.status === "Pending Docs" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-emerald-50 text-emerald-700 border-emerald-100"}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right px-8 text-sm font-medium text-slate-500">{item.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Reported Content */}
        <Card className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="p-8 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-black">Reported Content</CardTitle>
              <p className="text-sm text-muted-foreground font-medium">Review content flagged by the community.</p>
            </div>
            <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full font-bold h-9 px-4">
              View All <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/10">
                <TableRow className="border-none">
                  <TableHead className="px-8 font-bold text-slate-400 uppercase text-[10px] tracking-wider">Content</TableHead>
                  <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-wider">Reason</TableHead>
                  <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-wider text-right px-8">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportedContent.map((item, i) => (
                  <TableRow key={i} className="border-muted/20 hover:bg-muted/5">
                    <TableCell className="px-8 py-5">
                      <div className="font-bold text-slate-800">{item.content}</div>
                      <div className="text-[10px] text-muted-foreground font-bold uppercase">{item.type}</div>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-slate-600">{item.reason}</TableCell>
                    <TableCell className="text-right px-8">
                      <Button variant="outline" size="sm" className="rounded-full font-bold h-8 border-2">Review</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Floating Action Button for Return App */}
      <Link href="/">
        <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group">
          <div className="flex flex-col items-center">
            <ExternalLink className="h-5 w-5" />
            <span className="text-[8px] font-black uppercase mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Return App</span>
          </div>
        </button>
      </Link>
    </div>
  );
}
