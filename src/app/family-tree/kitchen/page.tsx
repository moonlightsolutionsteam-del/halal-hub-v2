
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Utensils, Plus, Search, Filter,
  Star, Clock, Users, ArrowLeft,
  ChevronRight, Heart, Share2, Info,
  BookOpen, Sparkles, ChefHat
} from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

export default function HeritageKitchenPage() {
  const recipes = [
    { id: 1, name: "Grandma's Secret Biryani", time: "2h 30m", difficulty: "Expert", author: "Nani", rating: 5.0, img: "r1" },
    { id: 2, name: "Authentic Lamb Kebab", time: "45m", difficulty: "Medium", author: "Ibrahim", rating: 4.8, img: "r2" },
    { id: 3, name: "Friday Afternoon Kunafa", time: "1h", difficulty: "Hard", author: "Fatima", rating: 4.9, img: "r3" },
    { id: 4, name: "Simple Lentil Soup", time: "20m", difficulty: "Easy", author: "Zaid", rating: 4.5, img: "r4" },
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
              <div className="h-14 w-14 rounded-2xl flex items-center justify-center bg-amber-100 text-amber-600 shadow-inner">
                <Utensils className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-2xl sm:text-5xl font-black font-headline text-foreground tracking-tight">Heritage Kitchen</h1>
                <p className="text-muted-foreground font-medium text-xl">The private repository of our family's culinary legacy.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search family recipes..." className="pl-12 h-14 rounded-2xl bg-card border-none shadow-sm font-medium text-lg" />
            </div>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white rounded-2xl h-14 px-10 font-black shadow-lg shadow-amber-200">
              <Plus className="h-5 w-5 mr-2" /> Add Recipe
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="group rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-2xl transition-all duration-700 flex flex-col h-full border-2 border-transparent hover:border-amber-100">
            <div className="relative aspect-square overflow-hidden">
              <Image src={`https://picsum.photos/seed/recipe-${recipe.img}/600/600`} alt={recipe.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute top-4 left-4">
                <Badge className="bg-card/90 backdrop-blur-md text-amber-600 font-black border-none shadow-xl px-3 py-1 rounded-full flex items-center gap-1.5 text-[10px]">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {recipe.rating}
                </Badge>
              </div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors opacity-0 group-hover:opacity-100 flex items-center justify-center">
                <Button variant="secondary" className="rounded-full font-black text-[10px] uppercase tracking-widest px-6 h-10 shadow-2xl">View Steps</Button>
              </div>
            </div>
            <CardHeader className="p-6 pb-4">
              <div className="space-y-1">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="bg-amber-50 text-amber-600 border-none text-[9px] font-black uppercase tracking-tighter">{recipe.difficulty}</Badge>
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1"><Clock className="h-3 w-3" /> {recipe.time}</span>
                </div>
                <h3 className="text-xl font-black text-foreground line-clamp-1 group-hover:text-amber-600 transition-colors">{recipe.name}</h3>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5"><ChefHat className="h-3 w-3 text-amber-500" /> From {recipe.author}'s Vault</p>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Culinary Preservation Info */}
      <Card className="rounded-[3rem] border-none bg-amber-50 p-12 flex flex-col lg:flex-row items-center gap-12 border-2 border-amber-100">
        <div className="h-24 w-24 rounded-[2rem] bg-card flex items-center justify-center text-amber-600 shadow-xl shrink-0">
          <BookOpen className="h-12 w-12" />
        </div>
        <div className="space-y-4 text-center lg:text-left flex-1">
          <h2 className="text-3xl font-black tracking-tight text-amber-900">Preserve the Taste of Home</h2>
          <p className="text-amber-800/70 font-medium text-lg leading-relaxed max-w-2xl">
            Kitchen secrets are part of your family heritage. Save ingredients, traditional techniques, and voice notes from the elders so the legacy lives on forever.
          </p>
        </div>
        <Button variant="outline" className="h-16 px-12 rounded-2xl border-2 border-amber-200 text-amber-700 font-black uppercase text-sm tracking-widest hover:bg-card shadow-sm">Record Oral History</Button>
      </Card>
    </div>
  );
}
