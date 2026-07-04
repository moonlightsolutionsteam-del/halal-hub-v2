
"use client"

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, Shield } from "lucide-react";

const permissionsData = [
    { role: "Finance Admin", permissions: ["Can approve payouts", "Can issue refunds", "Can edit invoices"] },
    { role: "Finance Viewer", permissions: ["View-only access to all financial data"] },
    { role: "Sales Head", permissions: ["Can view team performance and deal values"] },
];

export default function SuperAdminFinanceSettingsPage() {
  return (
    <form className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Admin Finance Controls</h1>
        <p className="text-muted-foreground">Manage global financial settings, tax rates, and credit costs.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Global Billing Settings</CardTitle>
          <CardDescription>
            These settings apply platform-wide to all transactions and invoices.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
            <Input id="tax-rate" type="number" placeholder="e.g., 18" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="late-fee">Late Fee (%)</Label>
            <Input id="late-fee" type="number" placeholder="e.g., 2.5" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Promotional Credit Settings</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="promo-cap">Max Promo Credit Cap (per user)</Label>
                <Input id="promo-cap" type="number" placeholder="e.g., 5000" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="welcome-bonus">Default Welcome Bonus</Label>
                <Input id="welcome-bonus" type="number" placeholder="e.g., 100" />
            </div>
        </CardContent>
      </Card>
      
       <Card>
        <CardHeader>
          <CardTitle>Discount & Offer Settings</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="discount-limit">Max Discount Limit (%)</Label>
                <Input id="discount-limit" type="number" placeholder="e.g., 50" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="offer-cost">Offer Creation Credit Cost</Label>
                <Input id="offer-cost" type="number" placeholder="e.g., 50" />
            </div>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>
            Define what different internal roles can access within the finance modules.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Role</TableHead>
                        <TableHead>Key Permissions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {permissionsData.map(role => (
                        <TableRow key={role.role}>
                            <TableCell className="font-semibold">{role.role}</TableCell>
                            <TableCell>{role.permissions.join(', ')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
      
       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive"><AlertCircle /> Super Admin Actions</CardTitle>
          <CardDescription>
            These are high-level actions that can have a major impact on the platform. Proceed with caution.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
           <Button variant="destructive" className="w-full sm:w-auto">Recalculate All Vendor Balances</Button>
           <Button variant="destructive" className="w-full sm:w-auto">Freeze All Payouts</Button>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Settings</Button>
      </div>
    </form>
  )
}
