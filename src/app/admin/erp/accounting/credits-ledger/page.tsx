
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  Wallet,
  CircleDollarSign,
  Sparkles,
  History,
  FileText,
  BadgeCent,
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
import { Input } from "@/components/ui/input"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

const ledgerData = [
  {
    vendor: "Karim's Restaurant",
    vendorId: "biz-001",
    transactionId: "TXN-C-001",
    source: "Purchase",
    feature: "Coin Pack Purchase",
    amount: 5000,
    timestamp: "2024-07-31 10:00 AM",
    invoice: "INV-001",
  },
  {
    vendor: "Al Bake",
    vendorId: "biz-002",
    transactionId: "TXN-C-002",
    source: "Usage",
    feature: "Boost Listing (7d)",
    amount: -150,
    timestamp: "2024-07-31 09:30 AM",
    invoice: "N/A",
  },
  {
    vendor: "Admin",
    vendorId: "N/A",
    transactionId: "TXN-C-003",
    source: "Promotional",
    feature: "Eid Bonus Credits",
    amount: 100,
    timestamp: "2024-07-30 05:00 PM",
    invoice: "N/A",
  },
  {
    vendor: "Khan Chacha",
    vendorId: "biz-003",
    transactionId: "TXN-C-004",
    source: "Reversal",
    feature: "Refund for failed boost",
    amount: 30,
    timestamp: "2024-07-29 02:15 PM",
    invoice: "REF-001",
  },
  {
    vendor: "Sultan's Dine",
    vendorId: "biz-004",
    transactionId: "TXN-C-005",
    source: "Expiration",
    feature: "Promotional credits expired",
    amount: -50,
    timestamp: "2024-07-28 11:59 PM",
    invoice: "N/A",
  },
];

const getSourceBadgeVariant = (source: string) => {
    switch (source) {
        case "Purchase": return "secondary";
        case "Usage": return "destructive";
        case "Promotional": return "default";
        case "Reversal": return "outline";
        case "Expiration": return "outline";
        default: return "outline";
    }
}


export default function CreditsLedgerPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold font-headline">Credits Ledger</h1>
            <p className="text-muted-foreground">An immutable ledger tracking all credit transactions across the platform.</p>
        </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Credits in Circulation</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">1.25M</div>
                <p className="text-xs text-muted-foreground">+50k this month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Credits Purchased (Month)</CardTitle>
                <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">250K</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Credits Used (Month)</CardTitle>
                <BadgeCent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">180K</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Credits Expired (Month)</CardTitle>
                <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">12K</div>
                <p className="text-xs text-muted-foreground">Includes promotional credits</p>
            </CardContent>
        </Card>
      </div>

       <Tabs defaultValue="all">
            <TabsList>
                <TabsTrigger value="all">All Transactions</TabsTrigger>
                <TabsTrigger value="purchase">Purchase</TabsTrigger>
                <TabsTrigger value="promotional">Promotional</TabsTrigger>
                <TabsTrigger value="usage">Usage</TabsTrigger>
                <TabsTrigger value="reversals">Reversals</TabsTrigger>
                <TabsTrigger value="expirations">Expirations</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
                 <Card>
                    <CardHeader>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search by Vendor, Transaction ID, or Feature..." className="pl-10" />
                        </div>
                    </CardHeader>
                    <CardContent>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Timestamp</TableHead>
                            <TableHead>Vendor</TableHead>
                            <TableHead>Source</TableHead>
                            <TableHead>Feature / Reason</TableHead>
                            <TableHead className="hidden md:table-cell">Transaction ID</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {ledgerData.map((tx) => (
                            <TableRow key={tx.transactionId}>
                                <TableCell className="hidden md:table-cell">{tx.timestamp}</TableCell>
                                <TableCell>
                                    <div className="font-medium">{tx.vendor}</div>
                                    <div className="text-sm text-muted-foreground md:hidden">{tx.timestamp}</div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={getSourceBadgeVariant(tx.source)}>{tx.source}</Badge>
                                </TableCell>
                                <TableCell>{tx.feature}</TableCell>
                                <TableCell className="hidden md:table-cell font-mono text-xs">{tx.transactionId}</TableCell>
                                <TableCell className={`text-right font-semibold ${tx.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  )
}
