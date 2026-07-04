
"use client";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud } from "lucide-react";

const departments = ["Sales", "Marketing", "Engineering", "HR", "Operations", "Finance"];
const employmentTypes = ["Full-time", "Part-time", "Intern", "Consultant", "Contractor"];
const managers = ["Super Admin", "Vinayak kainthla"]; // Mock data

export default function CreateEmployeePage() {
  return (
    <form className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee Details</CardTitle>
              <CardDescription>
                Enter the personal and professional details for the new employee.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employee-name">Full Name</Label>
                  <Input id="employee-name" placeholder="e.g., Aisha Khan" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employee-email">Email Address</Label>
                  <Input id="employee-email" type="email" placeholder="e.g., aisha.k@example.com" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employee-phone">Phone Number</Label>
                  <Input id="employee-phone" type="tel" placeholder="+91..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="join-date">Joining Date</Label>
                  <Input id="join-date" type="date" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <CardTitle>Role & Department</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select>
                            <SelectTrigger id="department">
                                <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                                {departments.map(dept => <SelectItem key={dept} value={dept}>{dept}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="role">Role / Position</Label>
                        <Input id="role" placeholder="e.g., Sales Executive" />
                    </div>
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="manager">Reporting Manager</Label>
                         <Select>
                            <SelectTrigger id="manager">
                                <SelectValue placeholder="Select manager" />
                            </SelectTrigger>
                            <SelectContent>
                               {managers.map(manager => <SelectItem key={manager} value={manager}>{manager}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="employment-type">Employment Type</Label>
                        <Select>
                            <SelectTrigger id="employment-type">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                {employmentTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="zone">Zone (for Sales/Ops)</Label>
                    <Input id="zone" placeholder="e.g., South Delhi" />
                </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Photo</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative border-2 border-dashed border-muted-foreground/50 rounded-lg p-6 text-center hover:border-primary transition-colors">
                        <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground"/>
                        <p className="mt-2 text-sm text-muted-foreground">Upload an image</p>
                        <Input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Employee</Button>
      </div>
    </form>
  );
}
