"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  DollarSign,
  ArrowDownCircle,
  ArrowUpCircle,
  Wallet,
  Download,
  CreditCard,
  Banknote,
  TrendingUp,
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
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"


const revenueExpenseData = [
  { month: "Apr", revenue: 45000, expenses: 22000 },
  { month: "May", revenue: 52000, expenses: 25000 },
  { month: "Jun", revenue: 61000, expenses: 28000 },
  { month: "Jul", revenue: 75000, expenses: 32000 },
];

const chartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
  expenses: { label: "Expenses", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

const recentTransactions = [
    { id: "TXN001", type: "Revenue", category: "Subscription", amount: 2999, date: "2024-07-30" },
    { id: "TXN002", type: "Expense", category: "Salaries", amount: -50000, date: "2024-07-29" },
    { id: "TXN003", type: "Revenue", category: "Ad Credit", amount: 5000, date: "2024-07-29" },
    { id: "TXN004", type: "Expense", category: "Server Costs", amount: -15000, date: "2024-07-28" },
];

const pendingPayouts = [
    { business: "Karim's Restaurant", amount: 12500, method: "Bank Transfer", date: "2024-08-05" },
    { business: "Al-Naseeb Meats", amount: 8500, method: "UPI", date: "2024-08-05" },
];


export default function AccountingDashboardPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold font-headline">Accounting Dashboard</h1>
            <p className="text-muted-foreground">Centralized financial control center for Halal Hub.</p>
        </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue (Q3)</CardTitle>
                <ArrowUpCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">₹2,33,000</div>
                <p className="text-xs text-muted-foreground">+12% from last quarter</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses (Q3)</CardTitle>
                <ArrowDownCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">₹1,07,000</div>
                <p className="text-xs text-muted-foreground">+8% from last quarter</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Profit (Q3)</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">₹1,26,000</div>
                <p className="text-xs text-muted-foreground">+15% from last quarter</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">₹21,000</div>
                <p className="text-xs text-muted-foreground">2 payouts to be processed</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">150 Active</div>
                <p className="text-xs text-muted-foreground">+15% this month</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Transaction Value</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">₹1,250</div>
                <p className="text-xs text-muted-foreground">Across all payments</p>
            </CardContent>
        </Card>
      </div>

       <Card>
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
            <CardDescription>Monthly overview for the last 4 months.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueExpenseData}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} />
                        <YAxis tickFormatter={(value) => `₹${Number(value) / 1000}k`} />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                        <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Recent Transactions</CardTitle>
                    <Button size="sm">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Entry
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Transaction</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentTransactions.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <div className="font-medium">{item.id}</div>
                                    <div className="text-xs text-muted-foreground">{item.date}</div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={item.type === "Revenue" ? "secondary" : "outline"}>
                                        {item.category}
                                    </Badge>
                                </TableCell>
                                <TableCell className={`text-right font-semibold ${item.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    ₹{Math.abs(item.amount).toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Pending Payouts</CardTitle>
                    <Button size="sm" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </CardHeader>
             <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Business</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pendingPayouts.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                     <div className="font-medium">{item.business}</div>
                                     <div className="text-xs text-muted-foreground">{item.method}</div>
                                </TableCell>
                                <TableCell className="text-right font-semibold">₹{item.amount.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Button size="sm">Process</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
