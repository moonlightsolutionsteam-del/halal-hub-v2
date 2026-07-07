
"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, Cell } from "recharts";
import { ChartContainer, ChartTooltipContent, ChartConfig, ChartLegendContent } from "@/components/ui/chart";
import { HandHelping, Heart, Landmark, PiggyBank, Users } from "lucide-react";

const monthlyData = [
  { month: "Jan", donations: 186 },
  { month: "Feb", donations: 305 },
  { month: "Mar", donations: 237 },
  { month: "Apr", donations: 273 },
  { month: "May", donations: 209 },
  { month: "Jun", donations: 214 },
];

const chartConfig = {
  donations: {
    label: "Donations",
    color: "hsl(var(--primary))",
  },
   mosques: {
    label: "Mosques",
    color: "#3b82f6",
  },
  community: {
    label: "Community",
    color: "#16a34a",
  },
  education: {
    label: "Education",
    color: "#f97316",
  },
  emergency: {
    label: "Emergency",
    color: "#ef4444",
  },
} satisfies ChartConfig;

const breakdownData = [
    { name: 'Mosques', value: 400, fill: chartConfig.mosques.color },
    { name: 'Community', value: 300, fill: chartConfig.community.color },
    { name: 'Education', value: 300, fill: chartConfig.education.color },
    { name: 'Emergency', value: 200, fill: chartConfig.emergency.color },
];

const recentDonations = [
    { name: "Ahmed Khan", amount: 500, cause: "Gaza Relief" },
    { name: "Fatima Al-Sayed", amount: 250, cause: "Orphan Sponsorship" },
    { name: "Yusuf Ibrahim", amount: 1000, cause: "Mosque Building" },
    { name: "Aisha Begum", amount: 150, cause: "Community Iftar" },
];

export default function CharityPage() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12 space-y-8">
            <header className="text-center space-y-4">
                <div className="inline-block p-4 bg-primary/10 rounded-full">
                    <Heart className="h-10 w-10 text-primary" />
                </div>
                <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                    Charity & Donation Tracker
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl lg:max-w-5xl mx-auto">
                    "Those who in charity spend of their goods by night and by day, in secret and in public, have their reward with their Lord." - Quran 2:274
                </p>
            </header>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Donations Made</CardTitle>
                        <HandHelping className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹1,250</div>
                        <p className="text-xs text-muted-foreground">+20% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Causes Supported</CardTitle>
                        <Heart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">15</div>
                        <p className="text-xs text-muted-foreground">+3 this month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Campaigns Funded</CardTitle>
                        <PiggyBank className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">30</div>
                        <p className="text-xs text-muted-foreground">+5 new campaigns</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Volunteered</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">234</div>
                        <p className="text-xs text-muted-foreground">+10 hours this month</p>
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Active Campaigns</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                             <h3 className="font-bold">Orphan Sponsorship Program</h3>
                             <Badge variant="secondary">Ongoing</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Support an orphan's education and well-being for a year.</p>
                        <Progress value={75} className="my-3 h-2" />
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-semibold">₹15,000 / ₹20,000 Raised</span>
                            <span className="text-muted-foreground">25 days left</span>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <Button className="flex-1 bg-rose-600 hover:bg-rose-700">Donate Now</Button>
                            <Button variant="outline" className="flex-1">Share Campaign</Button>
                        </div>
                    </div>
                     <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                             <h3 className="font-bold">Gaza Emergency Relief</h3>
                             <Badge variant="destructive">Urgent</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Provide essential aid to families affected by the crisis in Gaza.</p>
                        <Progress value={90} className="my-3 h-2" />
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-semibold">₹45,000 / ₹50,000 Raised</span>
                             <span className="text-muted-foreground">15 days left</span>
                        </div>
                         <div className="flex gap-2 mt-4">
                            <Button className="flex-1 bg-rose-600 hover:bg-rose-700">Donate Now</Button>
                            <Button variant="outline" className="flex-1">Share Campaign</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">Monthly Donations</CardTitle>
                         <CardDescription>Your donation trends over the last 6 months.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-64">
                            <BarChart data={monthlyData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                                <YAxis hide={true} />
                                <Tooltip 
                                    cursor={false} 
                                    content={
                                        <ChartTooltipContent 
                                            formatter={(value) => `₹${value}`}
                                        />
                                    } 
                                />
                                <Bar dataKey="donations" fill="var(--color-donations)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">Donation Breakdown</CardTitle>
                        <CardDescription>By category for this year.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                         <ChartContainer config={chartConfig} className="h-64">
                            <PieChart>
                                <Pie 
                                    data={breakdownData} 
                                    dataKey="value" 
                                    nameKey="name" 
                                    cx="50%" 
                                    cy="50%" 
                                    outerRadius={80} 
                                    label
                                >
                                     {breakdownData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                 <Tooltip 
                                     content={
                                        <ChartTooltipContent 
                                            nameKey="name" 
                                            formatter={(value, name) => {
                                                const item = breakdownData.find(d => d.name === name);
                                                return <div className="flex items-center"><div className="w-2.5 h-2.5 rounded-full mr-2" style={{backgroundColor: item?.fill}}></div><div>{name}: ₹{value}</div></div>
                                            }}
                                            indicator="dot"
                                        />
                                    } 
                                />
                                 <Legend content={<ChartLegendContent />} />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Quick Donate</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Select Cause</label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose a campaign..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="gaza">Gaza Emergency Relief</SelectItem>
                                <SelectItem value="orphan">Orphan Sponsorship</SelectItem>
                                <SelectItem value="mosque">Mosque Building Fund</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Amount (₹)</label>
                        <Input placeholder="Enter amount" type="number" />
                    </div>
                     <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">₹100</Button>
                        <Button variant="outline" className="flex-1">₹250</Button>
                        <Button variant="outline" className="flex-1">₹500</Button>
                    </div>
                    <Button className="w-full bg-rose-600 hover:bg-rose-700">Donate Now</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Recent Donations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {recentDonations.map((donation, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarFallback>{donation.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{donation.name}</p>
                                    <p className="text-xs text-muted-foreground">{donation.cause}</p>
                                </div>
                            </div>
                            <p className="font-bold text-lg text-primary">₹{donation.amount}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

        </div>
    );
}
