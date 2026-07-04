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
import { Textarea } from "@/components/ui/textarea";

const permissionsData = [
    { role: "Super Admin", access: "Full HR Access", description: "Can manage all aspects of the HR module." },
    { role: "HR Manager", access: "All HR (except settings)", description: "Manages employees, leaves, and recruitment." },
    { role: "Manager", access: "Team Only", description: "Can view and approve leaves for their direct reports." },
    { role: "Employee", access: "Self Only", description: "Can view their own profile and apply for leave." },
];

export default function HRSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">HR Settings</h1>
        <p className="text-muted-foreground">
          Configure global settings for the Human Resources module.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Global Settings</CardTitle>
          <CardDescription>
            These settings apply to all employees and managers.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="working-hours">Standard Working Hours</Label>
                <Input id="working-hours" placeholder="e.g., 9:30 AM - 6:30 PM" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="holiday-calendar">Holiday Calendar URL</Label>
                <Input id="holiday-calendar" placeholder="Link to iCal/.ics file" />
            </div>
            <div className="md:col-span-2 space-y-2">
                <Label htmlFor="leave-policy">Default Leave Policy</Label>
                <Textarea id="leave-policy" placeholder="Describe your company's leave policy..." />
            </div>
             <div className="md:col-span-2 space-y-2">
                <Label htmlFor="approval-hierarchy">Approval Hierarchy</Label>
                <Textarea id="approval-hierarchy" placeholder="Define the approval flow, e.g., Employee -> Manager -> HR" />
            </div>
             <div className="flex items-center justify-between rounded-lg border p-4 md:col-span-2">
                <div>
                    <Label htmlFor="enable-salary" className="font-semibold">Enable Salary Bands</Label>
                    <p className="text-sm text-muted-foreground">
                        Allow adding salary information to employee profiles.
                    </p>
                </div>
                <Switch id="enable-salary" />
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>
            Define what different roles can access within the HR module.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Access Level</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissionsData.map((role) => (
                <TableRow key={role.role}>
                  <TableCell className="font-semibold">{role.role}</TableCell>
                  <TableCell>{role.access}</TableCell>
                  <TableCell>{role.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save HR Settings</Button>
      </div>
    </div>
  )
}
