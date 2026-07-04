
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  Package,
  Users,
  Wrench,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/ui/datepicker"

const assetsData = [
  { id: "ASSET-001", name: "MacBook Pro 16", category: "Laptop", assignedTo: "Ovais", status: "In Use", purchaseDate: "2023-11-01" },
  { id: "ASSET-002", name: "iPhone 15 Pro", category: "Phone", assignedTo: "Yasar Khan", status: "In Use", purchaseDate: "2023-12-15" },
  { id: "ASSET-003", name: "Dell Monitor U2723QE", category: "Monitor", assignedTo: "Vinayak kainthla", status: "In Use", purchaseDate: "2023-11-05" },
  { id: "ASSET-004", name: "Logitech MX Master 3S", category: "Accessory", assignedTo: "Available", status: "Available", purchaseDate: "2024-01-20" },
  { id: "ASSET-005", name: "MacBook Air M2", category: "Laptop", assignedTo: "Sheikh", status: "In Repair", purchaseDate: "2023-08-10" },
];

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "In Use": return "secondary";
        case "Available": return "default";
        case "In Repair": return "destructive";
        default: return "outline";
    }
}

export default function AssetManagementPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Asset Management</h1>
            <p className="text-muted-foreground">Track and manage all physical and digital assets of the company.</p>
        </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">125</div>
                <p className="text-xs text-muted-foreground">+5 new this month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Assigned Assets</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">110</div>
                <p className="text-xs text-muted-foreground">88% of total assets</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available for Assignment</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Ready to be assigned</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Under Maintenance</CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-yellow-600">3</div>
                <p className="text-xs text-muted-foreground">Currently in repair</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                 <CardTitle>Asset Inventory</CardTitle>
                 <Dialog>
                    <DialogTrigger asChild>
                         <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Asset
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xl">
                        <DialogHeader>
                            <DialogTitle>Add New Asset</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
                            <div className="space-y-2">
                                <Label htmlFor="asset-name">Asset Name / Model</Label>
                                <Input id="asset-name" placeholder="e.g., MacBook Pro 16-inch M3" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="asset-category">Category</Label>
                                    <Select>
                                        <SelectTrigger id="asset-category">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="laptop">Laptop</SelectItem>
                                            <SelectItem value="phone">Phone</SelectItem>
                                            <SelectItem value="monitor">Monitor</SelectItem>
                                            <SelectItem value="accessory">Accessory</SelectItem>
                                            <SelectItem value="software">Software License</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="asset-id">Asset Tag / ID</Label>
                                    <Input id="asset-id" placeholder="e.g., HH-LAP-006" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="serial-number">Serial Number</Label>
                                <Input id="serial-number" placeholder="Enter serial number" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Purchase Date</Label>
                                    <DatePicker />
                                </div>
                                <div className="space-y-2">
                                    <Label>Warranty Expiry</Label>
                                    <DatePicker />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button>Save Asset</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search assets by name, ID, or user..." className="pl-10" />
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assetsData.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>
                      <div className="font-medium">{asset.name}</div>
                      <div className="text-sm text-muted-foreground">{asset.id}</div>
                  </TableCell>
                   <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">{asset.category}</Badge>
                   </TableCell>
                  <TableCell>{asset.assignedTo}</TableCell>
                   <TableCell>
                    <Badge variant={getStatusBadgeVariant(asset.status)}>{asset.status}</Badge>
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
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Assign to User</DropdownMenuItem>
                        <DropdownMenuItem>Mark for Maintenance</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Decommission Asset
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
