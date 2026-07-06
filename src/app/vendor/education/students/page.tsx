
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Search, Filter, Star, 
  MessageSquare, ArrowUpRight,
  Plus, MoreVertical, Phone, Mail, 
  CheckCircle2, UserCircle, GraduationCap,
  ShieldCheck, Clock
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";

export default function EducationStudentsPage() {
  const students = [
    { id: "STU-881", name: "Zaid Abdullah", parent: "Ahmed A.", enrollment: "Hifz Program", status: "Active", joined: "Jan 2024" },
    { id: "STU-882", name: "Sara Malik", parent: "Ibrahim M.", enrollment: "Arabic Intensive", status: "Active", joined: "Feb 2024" },
    { id: "STU-883", name: "Yusuf Khan", parent: "Sami K.", enrollment: "Islamic History", status: "On Leave", joined: "May 2023" },
    { id: "STU-884", name: "Amina Siddiqui", parent: "Fatima S.", enrollment: "Hifz Program", status: "Active", joined: "Mar 2024" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-600 font-black uppercase tracking-widest text-[10px]">
            <Users className="h-3 w-3" /> Student Success
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Student Registry</h1>
          <p className="text-muted-foreground font-medium">Manage student profiles, parent communication, and enrollment lifecycles.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            Export Manifest
          </Button>
          <Button className="bg-violet-600 hover:bg-violet-700 rounded-full px-8 font-black shadow-lg shadow-violet-200 h-12 text-white">
            <Plus className="mr-2 h-4 w-4" /> Enroll New Student
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {[
          { label: "Active Students", value: "450", icon: Users, color: "text-violet-600", bg: "bg-violet-50" },
          { label: "Graduated", value: "124", icon: GraduationCap, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Scholarships", value: "15", icon: ShieldCheck, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Attendance", value: "94%", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
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
          <CardTitle className="text-xl font-black">Enrollment Registry</CardTitle>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search Student..." className="pl-9 h-11 rounded-2xl bg-muted border-none font-medium" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-none">
                <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">ID / Date</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Student & Parent</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Program</TableHead>
                <TableHead className="h-14 text-right px-8 font-black text-[10px] uppercase tracking-widest">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} className="border-border hover:bg-muted/50 transition-colors group">
                  <TableCell className="px-8 py-5">
                    <div className="font-black text-foreground text-sm">{student.id}</div>
                    <div className="text-[9px] font-bold text-muted-foreground uppercase">{student.joined}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                        <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100/100`} />
                        <AvatarFallback>{student.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-foreground">{student.name}</p>
                        <p className="text-[10px] text-muted-foreground font-medium">P: {student.parent}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-bold text-muted-foreground">{student.enrollment}</span>
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <Badge className={
                      student.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-none' : 'bg-muted text-muted-foreground border-none'
                    }>
                      {student.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
