
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  FileText,
  MessageSquare,
  ShieldAlert,
  CheckCircle2,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

const contentData = [
  { 
    id: "post-001",
    author: "Aisha Khan",
    authorAvatar: "AK",
    type: "Post",
    content: "Just tried the new Biryani at Karim's Restaurant! So flavorful...",
    status: "Published",
    date: "2024-07-30" 
  },
  { 
    id: "reel-001",
    author: "Yusuf Ibrahim",
    authorAvatar: "YI",
    type: "Reel",
    content: "Watch how they make the perfect kebab roll at Khan Chacha!",
    status: "Pending",
    date: "2024-07-30" 
  },
  { 
    id: "post-002",
    author: "Zoya Akhtar",
    authorAvatar: "ZA",
    type: "Post",
    content: "My top 3 hijab styles for the summer! Which one is your favorite?",
    status: "Reported",
    date: "2024-07-29" 
  },
   { 
    id: "offer-001",
    author: "Al Bake",
    authorAvatar: "AB",
    type: "Offer",
    content: "Special Ramadan Offer! Get 20% OFF on all family packs.",
    status: "Published",
    date: "2024-07-28" 
  },
];


export default function SuperAdminFeedPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Content Feed Management</h1>
            <p className="text-muted-foreground">Moderate and manage all user-generated content on the platform.</p>
        </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Content</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">12,540</div>
                <p className="text-xs text-muted-foreground">+1,200 this week</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">25</div>
                <p className="text-xs text-muted-foreground">Needs review</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reported Content</CardTitle>
                <ShieldAlert className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-destructive">8</div>
                <p className="text-xs text-muted-foreground">Action required</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+150</div>
                <p className="text-xs text-muted-foreground">Content published</p>
            </CardContent>
        </Card>
      </div>

       <Tabs defaultValue="all">
            <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="reported">Reported</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
                 <Card>
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search content or author..." className="pl-10" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Author</TableHead>
                            <TableHead>Content</TableHead>
                            <TableHead className="hidden md:table-cell">Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>
                            <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {contentData.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarFallback>{item.authorAvatar}</AvatarFallback>
                                    </Avatar>
                                    <div className="font-medium">{item.author}</div>
                                    </div>
                                </TableCell>
                                <TableCell className="max-w-xs">
                                    <p className="truncate">{item.content}</p>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <Badge variant="outline">{item.type}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={
                                        item.status === 'Published' ? 'secondary' :
                                        item.status === 'Pending' ? 'default' :
                                        'destructive'
                                    }>{item.status}</Badge>
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
                                        <DropdownMenuItem>View Content</DropdownMenuItem>
                                        <DropdownMenuItem>Approve</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-destructive">Reject / Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                    </DropdownMenu>
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
