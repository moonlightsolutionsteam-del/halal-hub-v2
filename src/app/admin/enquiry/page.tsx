
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";


const EmptyState = () => (
    <div className="text-center p-8 text-muted-foreground">
        <p>No messages to display.</p>
    </div>
)

export default function EnquiryPage() {
  return (
    <div className="space-y-6">
        <div>
            <h2 className="text-2xl font-bold font-headline">Enquiries</h2>
            <p className="text-muted-foreground">Manage messages from potential customers and creators.</p>
            <p className="text-sm font-semibold mt-2">0 New Inquiries This Month</p>
        </div>

        <Tabs defaultValue="customer-messages">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="customer-messages">Customer Messages</TabsTrigger>
                <TabsTrigger value="collaboration-requests">Collaboration Requests</TabsTrigger>
            </TabsList>
            <TabsContent value="customer-messages" className="mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Customer Messages</CardTitle>
                        <CardDescription>View and respond to messages from your customers.</CardDescription>
                         <div className="flex flex-col sm:flex-row gap-2 pt-2">
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter by Business" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Businesses</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter by Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="new">New</SelectItem>
                                    <SelectItem value="read">Read</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent>
                       <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Query</TableHead>
                                    <TableHead className="hidden md:table-cell">Business</TableHead>
                                    <TableHead className="text-right">Received</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={4}>
                                        <EmptyState />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                         <div className="flex items-center justify-center space-x-2 py-4">
                            <Button variant="outline" size="sm" disabled>
                                Previous
                            </Button>
                            <div className="text-sm font-medium">
                                Page 0 of 0
                            </div>
                            <Button variant="outline" size="sm" disabled>
                                Next
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="collaboration-requests" className="mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Collaboration Requests</CardTitle>
                        <CardDescription>Manage collaboration enquiries from creators and influencers.</CardDescription>
                         <div className="flex flex-col sm:flex-row gap-2 pt-2">
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter by Business" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Businesses</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter by Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="accepted">Accepted</SelectItem>
                                    <SelectItem value="declined">Declined</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                     <CardContent>
                       <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Creator</TableHead>
                                    <TableHead>Message</TableHead>
                                    <TableHead className="hidden md:table-cell">Status</TableHead>
                                    <TableHead className="text-right">Received</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={4}>
                                        <EmptyState />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                         <div className="flex items-center justify-center space-x-2 py-4">
                            <Button variant="outline" size="sm" disabled>
                                Previous
                            </Button>
                            <div className="text-sm font-medium">
                                Page 0 of 0
                            </div>
                            <Button variant="outline" size="sm" disabled>
                                Next
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  );
}
