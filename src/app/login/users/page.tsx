"use client";

import {
  ArrowUpRight,
  Building,
  DollarSign,
  MoreHorizontal,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import Link from "next/link";

const pendingVerifications = [
    {
        name: "Mercy Foundation",
        type: "Organization",
        date: "2024-07-30",
        status: "Pending Docs"
    },
    {
        name: "Karim's Restaurant",
        type: "Business",
        date: "2024-07-29",
        status: "Pending Review"
    },
     {
        name: "Al-Huda Masjid",
        type: "Mosque",
        date: "2024-07-28",
        status: "Pending Review"
    }
];

const reportedContent = [
    {
        id: "EVT-045",
        type: "Event",
        details: "Misleading event description",
        reporter: "user_aisha_k",
        date: "2024-07-30"
    },
    {
        id: "REV-981",
        type: "Review",
        details: "Spam / Inappropriate language",
        reporter: "user_yusuf_i",
        date: "2024-07-29"
    }
];

export default function SuperAdminDashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold font-headline">Super Admin Dashboard</h1>
                <p className="text-muted-foreground">Platform-wide overview and management tools.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                        Total Organizations
                        </CardTitle>
                        <Building className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,250</div>
                        <p className="text-xs text-muted-foreground">
                        +12 since last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                        Pending Verifications
                        </CardTitle>
                        <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">15</div>
                        <p className="text-xs text-muted-foreground">
                        3 new today
                        </p>
                    </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Users
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+23,450</div>
                    <p className="text-xs text-muted-foreground">
                      +180 since last week
                    </p>
                  </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$1,25,231</div>
                        <p className="text-xs text-muted-foreground">
                        +19% from last month
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                        <CardTitle>Pending Verifications</CardTitle>
                        <CardDescription>
                            Review new submissions for businesses, mosques, and organizations.
                        </CardDescription>
                        </div>
                        <Button asChild size="sm" className="ml-auto gap-1">
                        <Link href="/admin/verification">
                            View All
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                       <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Submitted</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pendingVerifications.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{item.name}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{item.type}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={item.status === 'Pending Review' ? 'secondary' : 'default'}>{item.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">{item.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                        <CardTitle>Reported Content</CardTitle>
                        <CardDescription>
                            Review content flagged by the community.
                        </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                       <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Content</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                             <TableBody>
                                {reportedContent.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <div className="font-medium">{item.id}</div>
                                            <div className="text-sm text-muted-foreground">{item.type}</div>
                                        </TableCell>
                                        <TableCell>{item.details}</TableCell>
                                        <TableCell className="text-right">
                                             <Button variant="outline" size="sm">Review</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </main>
      </div>
    </div>
  );
}