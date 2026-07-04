
"use client"

import {
  Download,
  FileText,
  DollarSign,
  TrendingUp,
  CreditCard,
  Users,
  AlertTriangle,
  ArrowRightLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"

const reportsData = [
  { 
    title: "Profit & Loss Statement", 
    description: "Summary of revenues, costs, and expenses during a specified period.",
    icon: <DollarSign className="h-6 w-6 text-primary" />
  },
  { 
    title: "Revenue by Category", 
    description: "Breakdown of revenue from different business categories (restaurants, creators, etc.).",
    icon: <TrendingUp className="h-6 w-6 text-primary" />
  },
  { 
    title: "Vendor Lifetime Value (LTV)", 
    description: "Total revenue generated from each vendor over their lifetime.",
    icon: <Users className="h-6 w-6 text-primary" />
  },
  { 
    title: "Credit Utilisation Report", 
    description: "Analysis of how businesses are using their purchased credits.",
    icon: <CreditCard className="h-6 w-6 text-primary" />
  },
  { 
    title: "Outstanding Receivables", 
    description: "Aging report of all unpaid invoices and dues.",
    icon: <AlertTriangle className="h-6 w-6 text-primary" />
  },
  { 
    title: "Expense Report", 
    description: "Detailed breakdown of all company expenses by category.",
    icon: <FileText className="h-6 w-6 text-primary" />
  },
  { 
    title: "Cash Flow Statement", 
    description: "Shows how cash is moving in and out of the company.",
    icon: <ArrowRightLeft className="h-6 w-6 text-primary" />
  },
];

const ReportCard = ({ report }: { report: typeof reportsData[0] }) => (
    <Card className="flex flex-col">
        <CardHeader>
             <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary rounded-lg">
                    {report.icon}
                </div>
                <div>
                    <CardTitle className="font-headline text-lg">{report.title}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-end">
            <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4"/>
                    PDF
                </Button>
                <Button variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4"/>
                    CSV
                </Button>
                <Button variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4"/>
                    Excel
                </Button>
            </div>
        </CardContent>
    </Card>
);

export default function ReportsPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Financial Reports Center</h1>
            <p className="text-muted-foreground">Generate and export key financial reports for decision making and audits.</p>
        </div>

      <Card>
        <CardHeader>
            <CardTitle>Generate Custom Report</CardTitle>
            <CardDescription>Select a date range and report type to generate a custom document.</CardDescription>
        </CardHeader>
        <CardContent>
            <DatePickerWithRange />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Standard Reports</CardTitle>
            <CardDescription>One-click export for commonly used financial reports.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reportsData.map(report => (
                <ReportCard key={report.title} report={report} />
            ))}
        </CardContent>
      </Card>
    </div>
  )
}
