
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  Building,
  ShieldCheck,
  Award,
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
import Image from "next/image"

const certificationBodies = [
  {
    name: "Jamiat Ulama-i-Hind Halal Trust",
    logoUrl: "https://picsum.photos/seed/jamiat/100",
    businessesCertified: 250,
    status: "Active",
  },
  {
    name: "Halal India Pvt. Ltd.",
    logoUrl: "https://picsum.photos/seed/halal-india/100",
    businessesCertified: 180,
    status: "Active",
  },
  {
    name: "Halal Council of India",
    logoUrl: "https://picsum.photos/seed/hci/100",
    businessesCertified: 0,
    status: "Pending Review",
  },
];


export default function SuperAdminCertificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Certification Bodies</h1>
        <p className="text-muted-foreground">
          Manage the Halal certification bodies recognized on the platform.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recognized Bodies</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">+1 this month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Verified Businesses</CardTitle>
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">1,280</div>
                <p className="text-xs text-muted-foreground">Certified on platform</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">New bodies to review</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Certification Bodies List</CardTitle>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Body
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Logo</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Businesses Certified</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certificationBodies.map((body) => (
                <TableRow key={body.name}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt={body.name}
                      className="aspect-square rounded-md object-contain"
                      height="64"
                      src={body.logoUrl}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{body.name}</TableCell>
                   <TableCell>
                    <Badge variant={body.status === "Active" ? "secondary" : "default"}>{body.status}</Badge>
                   </TableCell>
                  <TableCell className="hidden md:table-cell">{body.businessesCertified}</TableCell>
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
                        <DropdownMenuItem>View Certified Businesses</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          De-list
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
