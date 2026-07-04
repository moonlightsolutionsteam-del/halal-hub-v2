
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  DollarSign,
  Users,
  TrendingUp,
  Percent,
  Download,
  Mail,
  Share2,
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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Line, LineChart } from "recharts"


const kpiData = [
  { title: "Total Marketing Spend", value: "₹2,50,000", change: "+15% this month", icon: <DollarSign /> },
  { title: "Customer Acquisition Cost (CAC)", value: "₹850", change: "-5% from last month", icon: <Users /> },
  { title: "Return on Ad Spend (ROAS)", value: "3.5x", change: "+0.5x from last month", icon: <TrendingUp /> },
  { title: "Total Leads Generated", value: "1,250", change: "+200 this month", icon: <Users /> },
];

const campaignPerformanceData = [
  { month: "Apr", campaignA: 45, campaignB: 30 },
  { month: "May", campaignA: 52, campaignB: 45 },
  { month: "Jun", campaignA: 61, campaignB: 55 },
  { month: "Jul", campaignA: 75, campaignB: 60 },
];

const channelPerformanceData = [
    { channel: "Social Media", conversions: 450, fill: "var(--color-social)" },
    { channel: "Email", conversions: 320, fill: "var(--color-email)" },
    { channel: "SEO", conversions: 280, fill: "var(--color-seo)" },
    { channel: "Referral", conversions: 150, fill: "var(--color-referral)" },
]

const topCampaigns = [
    { name: "Eid Promotion 2024", channel: "Email", spend: "₹50,000", conversions: 250, cpa: "₹200" },
    { name: "New Restaurant Onboarding", channel: "Social Media", spend: "₹75,000", conversions: 180, cpa: "₹416" },
    { name: "Summer Deals", channel: "Multi-channel", spend: "₹45,000", conversions: 210, cpa: "₹214" },
];

const campaignChartConfig = {
  campaignA: { label: "Campaign A", color: "hsl(var(--chart-1))" },
  campaignB: { label: "Campaign B", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

const channelChartConfig = {
    conversions: { label: "Conversions" },
    social: { label: "Social Media", color: "hsl(var(--chart-1))" },
    email: { label: "Email", color: "hsl(var(--chart-2))" },
    seo: { label: "SEO", color: "hsl(var(--chart-3))" },
    referral: { label: "Referral", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;


export default function MarketingAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Marketing Analytics</h1>
        <p className="text-muted-foreground">Detailed insights into your marketing performance.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <Card>
            <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Lead generation over time.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={campaignChartConfig} className="w-full h-64">
                    <LineChart data={campaignPerformanceData} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="campaignA" stroke="var(--color-campaignA)" strokeWidth={2} />
                        <Line type="monotone" dataKey="campaignB" stroke="var(--color-campaignB)" strokeWidth={2} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Channel Performance</CardTitle>
                 <CardDescription>Conversions by marketing channel.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={channelChartConfig} className="w-full h-64">
                    <BarChart data={channelPerformanceData}>
                        <XAxis dataKey="channel" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent formatter={(value) => `${value} conversions`} />} />
                        <Bar dataKey="conversions" radius={4}>
                             {channelPerformanceData.map((entry) => (
                                <rect key={entry.channel} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Spend</TableHead>
                <TableHead>Conversions</TableHead>
                <TableHead>CPA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCampaigns.map((campaign) => (
                <TableRow key={campaign.name}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{campaign.channel}</Badge>
                  </TableCell>
                  <TableCell>{campaign.spend}</TableCell>
                  <TableCell>{campaign.conversions}</TableCell>
                  <TableCell className="font-semibold">{campaign.cpa}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
       <Card>
        <CardHeader>
          <CardTitle>Generate Reports</CardTitle>
        </CardHeader>
        <CardContent>
            <Button variant="outline"><Download className="mr-2 h-4 w-4"/> Export Full Report (PDF)</Button>
        </CardContent>
      </Card>
    </div>
  )
}
