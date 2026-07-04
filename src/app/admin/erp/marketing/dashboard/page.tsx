
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  Users,
  Target,
  BarChart,
  Percent,
  Mail,
  Megaphone,
  TrendingUp,
  BookOpen,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"


const kpiData = [
  { title: "Total Reach (Month)", value: "5.2M", change: "+12%", icon: <Users /> },
  { title: "Engagement Rate", value: "4.8%", change: "+0.3%", icon: <TrendingUp /> },
  { title: "New Leads (Month)", value: "1,250", change: "+150", icon: <Target /> },
  { title: "Active Campaigns", value: "3", change: "1 new this week", icon: <Megaphone /> },
];

const engagementData = [
  { date: "Week 1", engagement: 2.8 },
  { date: "Week 2", engagement: 3.5 },
  { date: "Week 3", engagement: 4.1 },
  { date: "Week 4", engagement: 4.8 },
];

const chartConfig = {
  engagement: { label: "Engagement Rate (%)", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;


const recentCampaigns = [
  { name: "New Restaurant Onboarding", type: "Social Media", status: "Active" },
  { name: "Summer Deals", type: "Multi-channel", status: "Active" },
  { name: "Eid Promotion 2024", type: "Email", status: "Completed" },
];

const recentBlogPosts = [
  { title: "The Spiritual Benefits of Fasting in Ramadan", category: "Spirituality" },
  { title: "Finding Halal: A Guide to Dining Out", category: "Lifestyle" },
];

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "Active": return "secondary";
        case "Completed": return "default";
        default: return "outline";
    }
}

export default function MarketingDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Marketing Dashboard</h1>
        <p className="text-muted-foreground">An overview of all marketing activities and performance.</p>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <div className="text-muted-foreground">{kpi.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Overall Engagement Rate</CardTitle>
                <CardDescription>Weekly engagement rate across all platforms.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={chartConfig} className="w-full h-64">
                    <LineChart data={engagementData} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="engagement" stroke="var(--color-engagement)" strokeWidth={2} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                 <div className="flex justify-between items-center">
                    <CardTitle>Recent Campaigns</CardTitle>
                    <Button asChild size="sm" variant="outline">
                        <Link href="/admin/erp/marketing/campaigns">View All</Link>
                    </Button>
                </div>
            </CardHeader>
             <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Campaign</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentCampaigns.map(campaign => (
                            <TableRow key={campaign.name}>
                                <TableCell className="font-medium">{campaign.name}</TableCell>
                                <TableCell>{campaign.type}</TableCell>
                                <TableCell>
                                    <Badge variant={getStatusBadgeVariant(campaign.status)}>{campaign.status}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle>Recent Blog Posts</CardTitle>
                <Button asChild size="sm" variant="outline">
                    <Link href="/admin/erp/marketing/blog">View All</Link>
                </Button>
            </div>
        </CardHeader>
        <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentBlogPosts.map(post => (
                        <TableRow key={post.title}>
                            <TableCell className="font-medium">{post.title}</TableCell>
                            <TableCell><Badge variant="outline">{post.category}</Badge></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>

    </div>
  )
}
