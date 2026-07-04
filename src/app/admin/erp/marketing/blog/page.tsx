
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  PlusCircle,
  Eye,
  BarChart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const blogPosts = [
  {
    id: "blog-001",
    title: "The Spiritual Benefits of Fasting in Ramadan",
    category: "Spirituality",
    status: "Published",
    views: 1250,
    imageUrl: PlaceHolderImages.find(p => p.id === "blog1")?.imageUrl,
    imageHint: "quran open"
  },
  {
    id: "blog-002",
    title: "Finding Halal: A Guide to Dining Out with Confidence",
    category: "Lifestyle",
    status: "Published",
    views: 2800,
    imageUrl: PlaceHolderImages.find(p => p.id === "blog2")?.imageUrl,
    imageHint: "halal food"
  },
  {
    id: "blog-003",
    title: "The Art of Giving: Understanding Zakat and Sadaqah",
    category: "Charity",
    status: "Draft",
    views: 0,
    imageUrl: PlaceHolderImages.find(p => p.id === "blog4")?.imageUrl,
    imageHint: "charity donation"
  },
];

export default function SuperAdminBlogPage() {
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center mb-4">
        <div>
            <h1 className="text-3xl font-bold font-headline">Blog Management</h1>
            <p className="text-muted-foreground">Create, edit, and manage all blog posts.</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1" asChild>
            <Link href="/admin/erp/marketing/blog/create">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Create Post
                </span>
            </Link>
          </Button>
        </div>
      </div>
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="published">Published</TabsTrigger>
        <TabsTrigger value="draft">Draft</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>All Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Views</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogPosts.map(post => (
                     <TableRow key={post.id}>
                        <TableCell className="hidden sm:table-cell">
                          {post.imageUrl && (
                            <Image
                                alt={post.title}
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src={post.imageUrl}
                                width="64"
                                data-ai-hint={post.imageHint}
                            />
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                            {post.title}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                            <Badge variant="outline">{post.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={post.status === "Published" ? "secondary" : "outline"}>
                              {post.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                           <div className="flex items-center gap-2">
                                <Eye className="h-4 w-4" />
                                <span>{post.views.toLocaleString()}</span>
                           </div>
                        </TableCell>
                        <TableCell>
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
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-3</strong> of <strong>3</strong> posts
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
