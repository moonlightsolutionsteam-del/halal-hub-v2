
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, Eye, CheckCircle, XCircle, 
  ExternalLink, Calendar, Building2, AlertTriangle
} from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";

export default function AdminVerificationCenter() {
  const pending = [
    { id: 1, business: "Premium Meat Hub", type: "Halal Audit", date: "2 mins ago", country: "UK" },
    { id: 2, business: "Al-Zaeem Sweets", type: "Hygiene Cert", date: "45 mins ago", country: "UAE" },
    { id: 3, business: "Sunnah Organic Farm", type: "Organic Seal", date: "3 hours ago", country: "USA" },
    { id: 4, business: "Istanbul Bistro", type: "Renewal", date: "Yesterday", country: "TR" },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <ShieldCheck className="h-3 w-3" /> Trust & Compliance
          </div>
          <h1 className="text-xl sm:text-3xl font-black font-headline">Pending Verifications</h1>
          <p className="text-muted-foreground font-medium">Review submitted business credentials for platform certification.</p>
        </div>
        <div className="flex gap-3">
          <Badge className="bg-amber-500 rounded-full px-4 h-10 flex items-center font-bold">124 PENDING</Badge>
          <Button variant="outline" className="rounded-full px-6 font-bold border-2">Audit Guidelines</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 rounded-[2.5rem] border-none shadow-sm overflow-hidden">
          <CardHeader className="bg-muted/10 p-8">
            <CardTitle>Queue (Newest First)</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-none bg-muted/5">
                  <TableHead className="px-8 font-black uppercase text-[10px] tracking-widest">Business</TableHead>
                  <TableHead className="font-black uppercase text-[10px] tracking-widest">Type</TableHead>
                  <TableHead className="font-black uppercase text-[10px] tracking-widest">Submitted</TableHead>
                  <TableHead className="text-right px-8 font-black uppercase text-[10px] tracking-widest">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pending.map((item) => (
                  <TableRow key={item.id} className="border-muted/20 hover:bg-muted/5">
                    <TableCell className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                          <Building2 className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-black text-foreground">{item.business}</p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">{item.country}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-primary/20 text-primary">
                        {item.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                        <Calendar className="h-3 w-3" /> {item.date}
                      </div>
                    </TableCell>
                    <TableCell className="text-right px-8">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="icon" variant="ghost" className="rounded-xl text-emerald-600 hover:bg-emerald-50"><CheckCircle className="h-5 w-5" /></Button>
                        <Button size="icon" variant="ghost" className="rounded-xl text-red-600 hover:bg-red-50"><XCircle className="h-5 w-5" /></Button>
                        <Button size="icon" variant="ghost" className="rounded-xl"><ExternalLink className="h-5 w-5" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-[2.5rem] border-none shadow-sm p-8 bg-amber-50 border-2 border-amber-100">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 bg-amber-500 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-amber-200">
                <AlertTriangle className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-black text-xl text-amber-900">SLA Warning</h3>
                <p className="text-sm text-amber-800 font-medium">12 verifications have been pending for more than 48 hours.</p>
              </div>
              <Button className="w-full bg-amber-600 hover:bg-amber-700 font-black rounded-2xl">Prioritize Queue</Button>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm p-8 space-y-6">
            <h3 className="font-black text-xl">Audit Stats</h3>
            <div className="space-y-4">
              {[
                { label: "Approval Rate", val: "92%" },
                { label: "Avg. Review Time", val: "4.2h" },
                { label: "Rejections", val: "142" },
              ].map((s, i) => (
                <div key={i} className="flex justify-between items-center border-b border-muted pb-3 last:border-none">
                  <span className="text-sm font-bold text-muted-foreground uppercase">{s.label}</span>
                  <span className="text-lg font-black text-primary">{s.val}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
