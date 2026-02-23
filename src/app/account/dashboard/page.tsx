
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Clock, Star, Wallet, Settings, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserDashboard() {
  return (
    <div className="container mx-auto p-6 space-y-8 max-w-5xl">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-4 border-primary/10 shadow-xl">
            <AvatarImage src="https://picsum.photos/seed/user/200/200" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h1 className="text-3xl font-black font-headline tracking-tight">Salam, John!</h1>
            <p className="text-muted-foreground font-medium">Premium Member since 2023</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="icon" className="rounded-full"><Bell className="h-5 w-5" /></Button>
          <Button variant="outline" size="icon" className="rounded-full"><Settings className="h-5 w-5" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-[2rem] border-none shadow-sm bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wallet className="h-5 w-5" /> Rewards Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">1,250 <span className="text-sm font-medium opacity-80">Coins</span></div>
            <Button variant="secondary" className="w-full mt-4 bg-white/20 hover:bg-white/30 border-none text-white font-bold">Redeem Rewards</Button>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-none shadow-sm md:col-span-2 bg-accent/10">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { text: "Reviewed 'The Bosphorus Kitchen'", icon: Star, color: "text-amber-500", time: "2 hours ago" },
              { text: "Saved 'Al-Zaeem Shawarma'", icon: Heart, color: "text-red-500", time: "Yesterday" },
              { text: "Verified 'Organic Beef Box'", icon: ShieldCheck, color: "text-primary", time: "3 days ago" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white rounded-2xl shadow-sm">
                <div className="flex items-center gap-3">
                  <activity.icon className={`h-5 w-5 ${activity.color}`} />
                  <span className="text-sm font-bold text-slate-700">{activity.text}</span>
                </div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase">{activity.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-black">Bookmarked Entities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="rounded-3xl border-none shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-32 bg-muted relative">
                <img src={`https://picsum.photos/seed/fav${i}/400/200`} className="w-full h-full object-cover" />
                <Badge className="absolute top-2 right-2 bg-white/90 text-primary hover:bg-white">Verified</Badge>
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-base font-bold">Saved Place #{i}</CardTitle>
                <CardDescription className="text-xs">New York, NY</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
