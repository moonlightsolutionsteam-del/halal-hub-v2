
"use client"

import {
  MoreHorizontal,
  Search,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Star,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

const reviewsData = [
  { 
    id: "rev-001",
    author: "Aisha Khan",
    authorAvatar: "AK",
    location: "Karim's Restaurant",
    rating: 5,
    content: "Absolutely delicious! The best Mughlai food I've had in a long time. The kebabs were succulent and the biryani was flavorful. A must-visit place for every food lover in Delhi.",
    status: "Published",
    date: "2024-07-30" 
  },
  { 
    id: "rev-002",
    author: "Yusuf Ibrahim",
    authorAvatar: "YI",
    location: "Al-Naseeb Meats",
    rating: 4,
    content: "Fresh meat and very clean shop. The staff is helpful. My only suggestion is to improve the packaging for home deliveries. Otherwise, great quality.",
    status: "Pending",
    date: "2024-07-30" 
  },
  { 
    id: "rev-003",
    author: "Zoya Akhtar",
    authorAvatar: "ZA",
    location: "Medina Style Modest Wear",
    rating: 2,
    content: "The collection is okay but the prices are too high for the quality. I found a similar abaya for half the price elsewhere. Not recommended.",
    status: "Reported",
    date: "2024-07-29" 
  },
   { 
    id: "rev-004",
    author: "Omar Abdullah",
    authorAvatar: "OA",
    location: "Al-Huda Islamic Books",
    rating: 5,
    content: "A treasure trove for any book lover. They have a vast collection of authentic Islamic literature. The staff is knowledgeable and guided me to some excellent reads.",
    status: "Published",
    date: "2024-07-28" 
  },
];


export default function SuperAdminReviewsPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Reviews & Media</h1>
            <p className="text-muted-foreground">Moderate user-generated reviews and media uploads.</p>
        </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">25,890</div>
                <p className="text-xs text-muted-foreground">+500 this week</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">Action required</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reported Reviews</CardTitle>
                <ShieldAlert className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-destructive">12</div>
                <p className="text-xs text-muted-foreground">Immediate action needed</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+210</div>
                <p className="text-xs text-muted-foreground">Reviews published</p>
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
                                <Input placeholder="Search reviews, users, or locations..." className="pl-10" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Author</TableHead>
                            <TableHead>Review</TableHead>
                            <TableHead className="hidden md:table-cell">Location</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>
                            <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {reviewsData.map((item) => (
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
                                    <p className="truncate font-semibold">{item.content}</p>
                                    <div className="flex items-center gap-1 mt-1 text-yellow-500">
                                        {[...Array(item.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current"/>)}
                                        {[...Array(5 - item.rating)].map((_, i) => <Star key={i} className="h-4 w-4"/>)}
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{item.location}</TableCell>
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
                                        <DropdownMenuItem>View Full Review</DropdownMenuItem>
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
