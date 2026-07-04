
"use client"

import {
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
  Activity,
  Calendar,
  Wallet,
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
import Link from "next/link"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer } from "recharts"

const chartData = [
  { source: "Subscriptions", amount: 18600, fill: "var(--color-subscriptions)" },
  { source: "Ad Credits", amount: 30500, fill: "var(--color-ads)" },
  { source: "Marketplace Fees", amount: 23700, fill: "var(--color-fees)" },
]

const chartConfig = {
  amount: {
    label: "Amount (₹)",
  },
  subscriptions: {
    label: "Subscriptions",
    color: "hsl(var(--chart-1))",
  },
  ads: {
    label: "Ad Credits",
    color: "hsl(var(--chart-2))",
  },
  fees: {
    label: "Marketplace Fees",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

const transactionsData = [
    { id: "TRX001", type: "Subscription", status: "Success", amount: 2999, date: "2024-07-30" },
    { id: "TRX002", type: "Ad Credit", status: "Success", amount: 5000, date: "2024-07-29" },
    { id: "TRX003", type: "Marketplace Fee", status: "Success", amount: 150, date: "2024-07-29" },
    { id: "TRX004", type: "Payout", status: "Processing", amount: -10000, date: "2024-07-28" },
    { id: "TRX005", type: "Subscription", status: "Failed", amount: 2999, date: "2024-07-28" },
];


export default function SuperAdminPaymentsPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Payments & Revenue</h1>
            <p className="text-muted-foreground">Monitor all financial activities across the platform.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                    Total Revenue
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">₹1,25,231</div>
                    <p className="text-xs text-muted-foreground">
                    +19% from last month
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                    Subscriptions
                    </CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+350</div>
                    <p className="text-xs text-muted-foreground">
                    +50 since last month
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">
                    +12% from last month
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Payouts</CardTitle>
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">₹78,450</div>
                    <p className="text-xs text-muted-foreground">
                    +5 payouts pending
                    </p>
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Revenue Breakdown</CardTitle>
                    <CardDescription>This month's revenue by source.</CardDescription>
                </CardHeader>
                <CardContent>
                     <ChartContainer config={chartConfig} className="w-full h-48">
                        <BarChart data={chartData}>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="line" />}
                            />
                            <Bar dataKey="amount" radius={4}>
                                {chartData.map((entry) => (
                                    <rect key={entry.source} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>
                        A log of recent financial activities on the platform.
                    </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                   <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Transaction</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactionsData.slice(0, 3).map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <div className="font-medium">{item.id}</div>
                                        <div className="text-sm text-muted-foreground">{item.date}</div>
                                    </TableCell>
                                    <TableCell>{item.type}</TableCell>
                                    <TableCell>
                                        <Badge variant={item.status === 'Success' ? 'secondary' : (item.status === 'Processing' ? 'outline' : 'destructive')}>{item.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">₹{Math.abs(item.amount).toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
