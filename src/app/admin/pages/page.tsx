
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  File,
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

const pagesData = [
  { title: "About Us", slug: "/about", status: "Published", lastUpdated: "2024-07-25" },
  { title: "Terms of Service", slug: "/terms", status: "Published", lastUpdated: "2024-07-15" },
  { title: "Privacy Policy", slug: "/privacy", status: "Published", lastUpdated: "2024-07-15" },
  { title: "Careers", slug: "/careers", status: "Draft", lastUpdated: "2024-07-28" },
];

const getStatusBadgeVariant = (status: string) => {
    return status === "Published" ? "secondary" : "outline";
}

export default function PagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Page Management</h1>
        <p className="text-muted-foreground">
          Create and manage static content pages like 'About Us' or 'Terms of Service'.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Pages</CardTitle>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Page
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page Title</TableHead>
                <TableHead className="hidden md:table-cell">Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Last Updated</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagesData.map((page) => (
                <TableRow key={page.title}>
                  <TableCell className="font-medium">{page.title}</TableCell>
                  <TableCell className="hidden md:table-cell font-mono text-xs">{page.slug}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(page.status)}>{page.status}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{page.lastUpdated}</TableCell>
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
                        <DropdownMenuItem>View Page</DropdownMenuItem>
                        <DropdownMenuItem>Edit Content</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
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
