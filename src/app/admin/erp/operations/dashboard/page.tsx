
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, Award, Briefcase, Headset, Clock, AlertTriangle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const verificationQueue = [
  { name: "Karim's Restaurant", type: "Business", submitted: "2 days ago", status: "Pending Docs" },
  { name: "Al-Huda Masjid", type: "Mosque", submitted: "3 days ago", status: "Pending Review" },
  { name: "Mercy Foundation", type: "Organization", submitted: "5 days ago", status: "Pending Review" },
];

const addonOrders = [
    { orderId: "ADDON-051", service: "Professional Photoshoot", business: "The Kebab Shop", status: "In Progress" },
    { orderId: "ADDON-052", service: "Reel Creation", business: "Modern Abayas", status: "Pending Assignment" },
    { orderId: "ADDON-053", service: "Menu Redesign", business: "Sultan's Dine", status: "Completed" },
];


export default function OperationsDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Operations Dashboard</h1>
        <p className="text-muted-foreground">Manage listings, verifications, and support.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22</div>
            <p className="text-xs text-muted-foreground">5 new today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Support Tickets</CardTitle>
            <Headset className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">2 high priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Add-on Orders</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 photoshoots, 2 videos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Listings</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">35</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>
      
        <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>2 Verifications Overdue</AlertTitle>
            <AlertDescription>
                SLA breached for "Karim's Restaurant" and "Mercy Foundation". Please review immediately.
            </AlertDescription>
        </Alert>

        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Verification Queue</CardTitle>
                     <CardDescription>New businesses, mosques, and organizations awaiting approval.</CardDescription>
                </CardHeader>
                 <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {verificationQueue.map(item => (
                                <TableRow key={item.name}>
                                    <TableCell>
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">{item.submitted}</p>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{item.type}</Badge>
                                    </TableCell>
                                    <TableCell>
                                         <Badge variant={item.status === 'Pending Review' ? 'default' : 'secondary'}>{item.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button size="sm" variant="outline">Review</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Add-on Service Orders</CardTitle>
                     <CardDescription>Track the progress of premium services for businesses.</CardDescription>
                </CardHeader>
                 <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Service</TableHead>
                                <TableHead>Business</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                             {addonOrders.map(item => (
                                <TableRow key={item.orderId}>
                                    <TableCell className="font-semibold">{item.service}</TableCell>
                                    <TableCell>{item.business}</TableCell>
                                    <TableCell>
                                        <Badge variant={item.status === 'Completed' ? 'secondary' : 'default'}>{item.status}</Badge>
                                    </TableCell>
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
