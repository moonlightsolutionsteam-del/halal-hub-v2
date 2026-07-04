
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  Users,
  UserPlus,
  ArrowUpRight,
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
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const contactsData = [
  { 
    name: "Aisha Begum",
    email: "aisha.b@example.com",
    phone: "+91 98765 43210",
    account: "The Kebab Shop",
    status: "Lead",
    owner: "Yasar",
    ownerInitials: "YK",
    lastContact: "2 days ago"
  },
  { 
    name: "Fatima Al-Sayed",
    email: "fatima.as@example.com",
    phone: "+91 98765 12345",
    account: "Modern Abayas",
    status: "Customer",
    owner: "Huzaifa",
    ownerInitials: "MH",
    lastContact: "1 week ago"
  },
  { 
    name: "Zainab Ibrahim",
    email: "zainab.i@example.com",
    phone: "+91 99887 76655",
    account: "Heritage Books",
    status: "Lead",
    owner: "Vinayak",
    ownerInitials: "VK",
    lastContact: "3 days ago"
  },
  { 
    name: "Omar Abdullah",
    email: "omar.a@example.com",
    phone: "+91 91234 56789",
    account: "Global Halal Meats",
    status: "Customer",
    owner: "Yasar",
    ownerInitials: "YK",
    lastContact: "5 days ago"
  },
];

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "Customer": return "secondary";
        case "Lead": return "default";
        default: return "outline";
    }
}


export default function ContactsPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold font-headline">Contacts</h1>
            <p className="text-muted-foreground">Manage all contacts for your sales and marketing efforts.</p>
        </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">1,250</div>
                <p className="text-xs text-muted-foreground">+50 this month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Contacts (Week)</CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+25</div>
                <p className="text-xs text-muted-foreground">From all sources</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Source</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Website</div>
                <p className="text-xs text-muted-foreground">Lead forms</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                 <CardTitle>All Contacts</CardTitle>
                 <div className="flex gap-2">
                    <Button variant="outline">
                        <File className="mr-2 h-4 w-4" />
                        Import
                    </Button>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Contact
                    </Button>
                 </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search contacts by name, email, or company..." className="pl-10" />
                </div>
                <div className="flex gap-2">
                    <Select>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="lead">Lead</SelectItem>
                            <SelectItem value="customer">Customer</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Account</TableHead>
                <TableHead className="hidden lg:table-cell">Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contactsData.map((contact) => (
                <TableRow key={contact.email}>
                  <TableCell>
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm text-muted-foreground">{contact.email}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {contact.account}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{contact.phone}</TableCell>
                   <TableCell>
                    <Badge variant={getStatusBadgeVariant(contact.status)}>{contact.status}</Badge>
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
                        <DropdownMenuItem>View Contact</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Log Activity</DropdownMenuItem>
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
  )
}
