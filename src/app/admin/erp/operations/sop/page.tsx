
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  BookCopy,
  FileText,
  Clock,
  Eye,
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const articlesData = [
  { id: "SOP-001", title: "New Business Onboarding Process", category: "Onboarding", version: "2.1", lastUpdated: "2024-07-28", status: "Published" },
  { id: "SOP-002", title: "Handling Escalated Support Tickets", category: "Support", version: "1.5", lastUpdated: "2024-07-15", status: "Published" },
  { id: "KB-001", title: "How to Use the CRM Dashboard", category: "Knowledge Base", version: "1.0", lastUpdated: "2024-06-30", status: "Published" },
  { id: "KB-002", title: "Guide to Creating Marketing Campaigns", category: "Knowledge Base", version: "1.2", lastUpdated: "2024-07-20", status: "Published" },
  { id: "SOP-003", title: "Field Sales Visit Protocol", category: "Sales", version: "1.0", lastUpdated: "2024-05-10", status: "Needs Review" },
];

export default function SopPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">SOP & Knowledge Base</h1>
            <p className="text-muted-foreground">Manage standard operating procedures and the internal knowledge base.</p>
        </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
                <BookCopy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">125</div>
                <p className="text-xs text-muted-foreground">+5 new this month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Updated This Week</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Across 3 categories</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Needs Review</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-yellow-600">3</div>
                <p className="text-xs text-muted-foreground">Articles flagged for updates</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Most Viewed Article</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-xl font-bold">Onboarding SOP</div>
                <p className="text-xs text-muted-foreground">152 views this month</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                 <CardTitle>Article Library</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                         <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add New Article
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Add New Article/SOP</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
                            <div className="space-y-2">
                                <Label htmlFor="art-title">Title</Label>
                                <Input id="art-title" placeholder="e.g., New Business Onboarding Process" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="art-category">Category</Label>
                                    <Select>
                                        <SelectTrigger id="art-category">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="sop">SOP</SelectItem>
                                            <SelectItem value="kb">Knowledge Base</SelectItem>
                                            <SelectItem value="policy">Policy</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="art-version">Version</Label>
                                    <Input id="art-version" placeholder="e.g., 1.0" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="art-content">Content</Label>
                                <Textarea id="art-content" rows={10} placeholder="Write the content here. Markdown is supported." />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button>Save Article</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
             <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search articles..." className="pl-10" />
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articlesData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell><Badge variant="outline">{item.category}</Badge></TableCell>
                  <TableCell>{item.version}</TableCell>
                  <TableCell>{item.lastUpdated}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === 'Published' ? 'secondary' : 'default'}>{item.status}</Badge>
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
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Mark for Review</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Archive
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
  )
}
