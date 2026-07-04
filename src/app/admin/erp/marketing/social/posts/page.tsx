
"use client"

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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MoreHorizontal,
  Search,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Heart,
  MessageSquare,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const allPostsData = [
    { platform: <Instagram className="h-4 w-4"/>, content: "Post about new Halal restaurant in Bangalore...", likes: "12k", comments: "345", date: "2h ago", status: "Published" },
    { platform: <Facebook className="h-4 w-4"/>, content: "Shared blog post: 'The Beauty of Ramadan'", likes: "5.2k", comments: "128", date: "8h ago", status: "Published" },
    { platform: <Twitter className="h-4 w-4"/>, content: "Quick poll: What's your favorite Iftar snack?", likes: "1.2k", comments: "450", date: "Yesterday", status: "Published" },
    { platform: <Instagram className="h-4 w-4"/>, content: "Upcoming Q&A with Imam Ahmad Rahman. Submit your questions!", likes: "0", comments: "0", date: "Scheduled for Aug 5", status: "Scheduled" },
     { platform: <Youtube className="h-4 w-4"/>, content: "Video: A Tour of Al-Azhar Mosque", likes: "1.8k", comments: "98", date: "2 days ago", status: "Published" },
];

export default function AllPostsPage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>All Social Media Posts</CardTitle>
                    <CardDescription>View, edit, and manage all scheduled and published content.</CardDescription>
                     <div className="relative pt-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search posts..." className="pl-10" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12">Platform</TableHead>
                                <TableHead>Content</TableHead>
                                <TableHead>Stats</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allPostsData.map((post, index) => (
                                <TableRow key={index}>
                                    <TableCell>{post.platform}</TableCell>
                                    <TableCell>
                                        <p className="font-medium max-w-sm truncate">{post.content}</p>
                                        <p className="text-xs text-muted-foreground">{post.date}</p>
                                    </TableCell>
                                     <TableCell>
                                        <div className="flex flex-col text-xs">
                                            <span>{post.likes} Likes</span>
                                            <span>{post.comments} Comments</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={post.status === "Published" ? "secondary" : "default"}>{post.status}</Badge>
                                    </TableCell>
                                     <TableCell className="text-right">
                                        <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                            aria-haspopup="true"
                                            size="icon"
                                            variant="ghost"
                                            >
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>View Post</DropdownMenuItem>
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>View Analytics</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-destructive">
                                            Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
