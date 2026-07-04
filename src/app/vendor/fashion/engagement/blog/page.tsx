
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, Plus, MoreVertical, Eye, 
  MessageSquare, Calendar, Layout, Search, Filter
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function FashionBlogPage() {
  const articles = [
    { id: 1, title: "Choosing the Right Fabric for Your Abaya", status: "Published", date: "Nov 01, 2024", reads: "3.2k", comments: 24, category: "Styling Tips" },
    { id: 2, title: "The Ethics of Modest Design", status: "Draft", date: "Oct 28, 2024", reads: "0", comments: 0, category: "Brand Story" },
    { id: 3, title: "Dubai Fashion Week: Trends to Watch", status: "Published", date: "Oct 15, 2024", reads: "8.4k", comments: 156, category: "Industry News" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-pink-600 font-black uppercase tracking-widest text-[10px]">
            <BookOpen className="h-3 w-3" /> Narrative Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Fashion Blog & News</h1>
          <p className="text-muted-foreground font-medium">Share your design philosophy, style guides, and brand updates with your audience.</p>
        </div>
        <Button className="bg-pink-600 hover:bg-pink-700 rounded-full px-8 font-black shadow-lg shadow-pink-200 h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> New Article
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Articles", value: "15", icon: Layout },
          { label: "Lifetime Reads", value: "42.8k", icon: Eye },
          { label: "Reader Comments", value: "1.2k", icon: MessageSquare },
        ].map((stat, i) => (
          <Card key={i} className="rounded-3xl border-none shadow-sm p-6 bg-card flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-foreground">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-2">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search articles..." className="pl-9 h-11 rounded-2xl bg-card border-none shadow-sm font-medium" />
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="px-4 py-2 rounded-full cursor-pointer bg-pink-50 text-pink-600 border-none">Published</Badge>
            <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer border-border">Drafts</Badge>
            <Button variant="outline" size="icon" className="h-11 w-11 rounded-2xl bg-card border-none shadow-sm"><Filter className="h-4 w-4" /></Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {articles.map((article) => (
            <Card key={article.id} className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-xl transition-all border-2 border-transparent hover:border-pink-100">
              <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge className={article.status === 'Published' ? 'bg-emerald-50 text-emerald-600 border-none px-3' : 'bg-muted text-muted-foreground border-none px-3'}>
                      {article.status}
                    </Badge>
                    <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{article.category}</span>
                  </div>
                  <h3 className="text-2xl font-black text-foreground tracking-tight leading-tight">{article.title}</h3>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" /> {article.date}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                      <Eye className="h-3.5 w-3.5" /> {article.reads} Reads
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Button variant="outline" className="rounded-xl h-12 px-6 font-bold border-2">Edit</Button>
                  <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl bg-muted"><MoreVertical className="h-5 w-5" /></Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
