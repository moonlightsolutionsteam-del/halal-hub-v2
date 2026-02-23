
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Building2, ShieldCheck, TrendingUp, 
  AlertCircle, DollarSign, Activity, Settings 
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-black font-headline">Platform Governance</h1>
          </div>
          <p className="text-muted-foreground font-medium">Monitoring HalalSphere global operations.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2"><Settings className="mr-2 h-4 w-4" /> System Settings</Button>
          <Button className="bg-primary rounded-full px-6 font-bold shadow-lg shadow-primary/20">Platform Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Users", value: "142,502", icon: Users, color: "text-blue-600", trend: "+2.4k today" },
          { label: "Active Entities", value: "12,840", icon: Building2, color: "text-primary", trend: "+45 this week" },
          { label: "Pending Verification", value: "124", icon: AlertCircle, color: "text-amber-600", trend: "Needs attention", warning: true },
          { label: "Gross Revenue", value: "$42,500", icon: DollarSign, color: "text-purple-600", trend: "+15.2% MoM" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-[2rem] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-bold text-muted-foreground">{stat.label}</span>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black">{stat.value}</div>
              <p className={`text-[10px] font-black uppercase mt-1 ${stat.warning ? "text-red-500" : "text-emerald-600"}`}>
                {stat.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="rounded-[2.5rem] border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Verifications</CardTitle>
              <CardDescription>Certificates awaiting manual approval</CardDescription>
            </div>
            <Button size="sm" variant="link" className="font-bold">Review All</Button>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-muted">
              {[
                { name: "Global Meat Supplies Ltd", cert: "HMC Halal Cert", date: "10 mins ago" },
                { name: "Sunrise Organic Farms", cert: "JAKIM-UK", date: "1 hour ago" },
                { name: "Al-Barakah Logistics", cert: "Transport Standard", date: "3 hours ago" },
              ].map((item, i) => (
                <div key={i} className="py-4 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.cert}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-medium text-muted-foreground">{item.date}</span>
                    <Button size="sm" className="h-8 px-4 rounded-full bg-primary font-bold">Approve</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[2.5rem] border-none shadow-sm">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Real-time platform activity metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span>API Response Time</span>
                <span className="text-primary text-[10px]">99.9% Uptime</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full w-[95%] bg-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span>DB Server Load</span>
                <span className="text-amber-500 text-[10px]">Moderate</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full w-[42%] bg-amber-500" />
              </div>
            </div>
            <div className="p-4 bg-muted/30 rounded-2xl flex items-center gap-4">
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold">New Release v2.4.0</p>
                <p className="text-[10px] text-muted-foreground font-medium">Successfully deployed to production 4 hours ago.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
