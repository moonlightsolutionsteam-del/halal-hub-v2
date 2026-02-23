
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, BarChart3, Star, Wallet, 
  Eye, MousePointer2, MessageSquare, Plus 
} from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { name: "Mon", views: 400 },
  { name: "Tue", views: 300 },
  { name: "Wed", views: 600 },
  { name: "Thu", views: 800 },
  { name: "Fri", views: 500 },
  { name: "Sat", views: 900 },
  { name: "Sun", views: 700 },
];

export default function VendorDashboard() {
  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-headline text-primary">Vendor Dashboard</h1>
          <p className="text-muted-foreground">Manage your business presence and track engagement.</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-primary rounded-full px-6 font-bold shadow-lg shadow-primary/20">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
          <Button variant="outline" className="rounded-full px-6 font-bold border-2">
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Profile Views", value: "12.4k", icon: Eye, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Leads Generated", value: "85", icon: MousePointer2, color: "text-primary", bg: "bg-emerald-50" },
          { label: "Average Rating", value: "4.8", icon: Star, color: "text-amber-500", bg: "bg-amber-50" },
          { label: "Credit Balance", value: "450", icon: Wallet, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-[2rem]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-bold text-muted-foreground">{stat.label}</span>
              <div className={`p-2 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black">{stat.value}</div>
              <p className="text-[10px] text-emerald-600 font-black uppercase mt-1">+12% from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 rounded-[2.5rem] border-none shadow-sm">
          <CardHeader>
            <CardTitle>Engagement Analytics</CardTitle>
            <CardDescription>Daily profile views for the past week</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Bar dataKey="views" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-[2.5rem] border-none shadow-sm">
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
            <CardDescription>Respond to your customers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 bg-muted/30 rounded-2xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black">User_12{i}</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />)}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">"Amazing quality and fast service. Definitely my go-to spot for halal meat!"</p>
                <Button variant="link" className="p-0 h-auto text-primary text-xs font-bold">Reply to review</Button>
              </div>
            ))}
            <Button variant="outline" className="w-full rounded-xl font-bold">View All Reviews</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
