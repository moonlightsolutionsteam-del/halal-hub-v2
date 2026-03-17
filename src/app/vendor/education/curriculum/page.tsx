
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, Plus, Search, Filter, Edit2, 
  Trash2, Eye, MoreVertical, Layers,
  Library, ShieldCheck, CheckCircle2,
  Download, Globe, Zap, Clock
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export default function EducationCurriculumPage() {
  const courses = [
    { id: 1, name: "Advanced Tajweed Mastery", type: "Quranic Studies", modules: 12, status: "Vetted", code: "EDU-CR-01", enrollment: "85 Students" },
    { id: 2, name: "Basics of Islamic Finance", type: "Professional", modules: 8, status: "Vetted", code: "EDU-CR-02", enrollment: "42 Students" },
    { id: 3, name: "Early Years Moral Foundation", type: "K-12", modules: 15, status: "In Review", code: "EDU-CR-03", enrollment: "120 Students" },
    { id: 4, name: "Classical Arabic Grammar", type: "Language", modules: 20, status: "Vetted", code: "EDU-CR-04", enrollment: "25 Students" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-600 font-black uppercase tracking-widest text-[10px]">
            <BookOpen className="h-3 w-3" /> Scholarly Integrity
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Course & Curriculum</h1>
          <p className="text-muted-foreground font-medium">Design educational tracks, manage syllabi, and track scholarly vetting statuses.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            <Library className="mr-2 h-4 w-4" /> Syllabus Archive
          </Button>
          <Button className="bg-violet-600 hover:bg-violet-700 rounded-full px-8 font-black shadow-lg shadow-violet-200 h-12 text-white">
            <Plus className="mr-2 h-4 w-4" /> New Course
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {courses.map((course) => (
          <Card key={course.id} className="group rounded-[3rem] border-none shadow-sm bg-white overflow-hidden hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-violet-100">
            <div className="p-8 flex gap-8">
              <div className="h-32 w-32 rounded-[2rem] bg-violet-50 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                <BookOpen className="h-12 w-12 text-violet-600 opacity-40" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="bg-violet-50 text-violet-600 border-none text-[9px] font-black uppercase tracking-tighter">
                      {course.type}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="rounded-full h-8 w-8"><MoreVertical className="h-4 w-4 text-slate-300" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-2xl p-2 border-none shadow-xl">
                        <DropdownMenuItem className="rounded-xl font-bold gap-2"><Edit2 className="h-4 w-4" /> Edit Syllabus</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl font-bold gap-2"><ShieldCheck className="h-4 w-4" /> Scholar Review</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl font-bold gap-2 text-red-500"><Trash2 className="h-4 w-4" /> Retire Course</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">{course.name}</h3>
                  <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Layers className="h-3 w-3" /> {course.modules} Modules</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {course.code}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                  <span className="text-sm font-bold text-slate-500">{course.enrollment}</span>
                  <Badge className={course.status === 'Vetted' ? 'bg-emerald-50 text-emerald-600 border-none' : 'bg-amber-50 text-amber-600 border-none'}>
                    {course.status}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
