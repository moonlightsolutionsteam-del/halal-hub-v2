
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DollarSign,
  CreditCard,
  Banknote,
  Activity,
  PlusCircle,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const kpiData = [
    { title: "Total Revenue (This Month)", value: "₹85,231", icon: <DollarSign />, description: "+12% from last month" },
    { title: "Transactions (This Month)", value: "250", icon: <Activity />, description: "+15% from last month" },
    { title: "Avg. Donation Amount", value: "₹550", icon: <CreditCard />, description: "Across all campaigns" },
    { title: "Next Payout", value: "₹45,000", icon: <Banknote />, description: "Scheduled for Aug 5, 2024" },
];

const recentTransactions = [
    { id: "TRX-001", type: "Donation", details: "Masjid Renovation", amount: 5000, status: "Success", date: "2024-07-30" },
    { id: "TRX-002", type: "Event Ticket", details: "Annual Fundraiser Gala", amount: 2500, status: "Success", date: "2024-07-29" },
    { id: "TRX-003", type: "Service Fee", details: "Nikah Ceremony", amount: 1100, status: "Success", date: "2024-07-28" },
    { id: "TRX-004", type: "Donation", details: "Education Fund", amount: 1000, status: "Pending", date: "2024-07-30" },
];


export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Payments & Payouts</h1>
        <p className="text-muted-foreground">
          Manage payment gateways, view transactions, and track your revenue.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((item) => (
            <Card key={item.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                    <div className="text-muted-foreground">{item.icon}</div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{item.value}</div>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                </CardContent>
            </Card>
        ))}
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Payment Gateway</CardTitle>
                <CardDescription>Connect your Stripe or Razorpay account to start accepting payments.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg flex items-center justify-between bg-secondary/50">
                    <div>
                        <p className="font-bold">Razorpay</p>
                        <p className="text-sm text-green-600">Connected</p>
                    </div>
                    <Button variant="outline">Manage</Button>
                </div>
                 <Button variant="outline" className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Connect another gateway
                </Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Bank Account for Payouts</CardTitle>
                <CardDescription>The account where your funds will be transferred.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="p-4 border rounded-lg flex items-center justify-between bg-secondary/50">
                    <div>
                        <p className="font-bold">HDFC Bank</p>
                        <p className="text-sm text-muted-foreground">...xxxx 1234</p>
                    </div>
                    <Button variant="outline">Change</Button>
                </div>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>A log of all payments received through the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{tx.type}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{tx.details}</TableCell>
                  <TableCell>
                    <Badge variant={tx.status === "Success" ? "secondary" : "default"}>{tx.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold">₹{tx.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
