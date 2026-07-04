
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  FileText,
  Percent,
  TrendingUp,
  Download,
  AlertTriangle,
  Receipt,
  Book,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker"


const gstInvoicesData = [
  { 
    invoiceId: "GST-INV-001",
    vendor: "Karim's Restaurant",
    date: "2024-07-31",
    taxableAmount: "₹1,500",
    gstAmount: "₹270",
    status: "Filed"
  },
  { 
    invoiceId: "GST-INV-002",
    vendor: "Al Bake",
    date: "2024-07-30",
    taxableAmount: "₹2,000",
    gstAmount: "₹360",
    status: "Filed"
  },
  { 
    invoiceId: "GST-INV-003",
    vendor: "Khan Chacha",
    date: "2024-08-01",
    taxableAmount: "₹1,800",
    gstAmount: "₹324",
    status: "Pending"
  },
];

const hsnSacData = [
    { code: "996331", description: "Services by restaurants, cafes and like eating joints...", gstRate: "5%" },
    { code: "0207", description: "Meat and edible offal of poultry", gstRate: "0%" },
    { code: "4901", description: "Printed books, brochures, leaflets...", gstRate: "0%" },
];


export default function TaxesGstPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Taxes & GST Management</h1>
            <p className="text-muted-foreground">Manage GST collection, payments, and filings.</p>
        </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">GST Collected (This Month)</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">₹85,000</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">GST Paid (This Month)</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">₹35,000</div>
                <p className="text-xs text-muted-foreground">On vendor payouts & expenses</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Input Tax Credit (ITC)</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">₹50,000</div>
                <p className="text-xs text-muted-foreground">Available for this filing period</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Filing</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-destructive">GSTR-3B</div>
                <p className="text-xs text-muted-foreground">Due: Aug 20, 2024</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                 <CardTitle>GST Invoices</CardTitle>
                 <div className="flex gap-2">
                    <Button variant="outline"><Download className="mr-2 h-4 w-4"/>Export for CA</Button>
                    <Button><PlusCircle className="mr-2 h-4 w-4"/>Generate Report</Button>
                 </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by invoice or vendor..." className="pl-10" />
                </div>
                <div className="flex gap-2">
                    <DatePickerWithRange />
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Taxable Amount</TableHead>
                <TableHead>GST</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gstInvoicesData.map((invoice) => (
                <TableRow key={invoice.invoiceId}>
                  <TableCell className="font-mono text-sm">{invoice.invoiceId}</TableCell>
                  <TableCell>{invoice.vendor}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.taxableAmount}</TableCell>
                  <TableCell className="font-semibold">{invoice.gstAmount}</TableCell>
                   <TableCell>
                    <Badge variant={invoice.status === "Filed" ? "secondary" : "destructive"}>{invoice.status}</Badge>
                   </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">View</Button>
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
                 <CardTitle>HSN/SAC Codes</CardTitle>
                 <Button variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4"/>Add Code</Button>
            </div>
             <CardDescription>Manage HSN (for goods) and SAC (for services) codes used on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>GST Rate</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {hsnSacData.map((code) => (
                        <TableRow key={code.code}>
                            <TableCell className="font-mono text-sm">{code.code}</TableCell>
                            <TableCell>{code.description}</TableCell>
                            <TableCell>{code.gstRate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  )
}
