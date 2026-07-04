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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function OpsSettingsPage() {
  return (
    <form className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Operations Settings</h1>
        <p className="text-muted-foreground">Configure global settings for the operations module.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lead Management</CardTitle>
          <CardDescription>
            Configure rules for how new business leads are handled.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="lead-assignment">Lead Assignment Strategy</Label>
            <Select>
              <SelectTrigger id="lead-assignment">
                <SelectValue placeholder="Round Robin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="round-robin">Round Robin</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="territory-based">Territory-based</SelectItem>
              </SelectContent>
            </Select>
          </div>
           <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="auto-assign" className="font-semibold">Auto-assign new leads</Label>
              <p className="text-sm text-muted-foreground">
                Automatically assign new leads to sales agents based on the selected strategy.
              </p>
            </div>
            <Switch id="auto-assign" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Support & Escalations</CardTitle>
          <CardDescription>
            Define SLAs and escalation paths for support tickets.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
                <Label htmlFor="sla-high">SLA for High Priority (Hours)</Label>
                <Input id="sla-high" type="number" defaultValue="4" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="sla-medium">SLA for Medium Priority (Hours)</Label>
                <Input id="sla-medium" type="number" defaultValue="12" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="sla-low">SLA for Low Priority (Hours)</Label>
                <Input id="sla-low" type="number" defaultValue="24" />
            </div>
          </div>
           <div className="space-y-2">
                <Label htmlFor="escalation-email">Escalation Email</Label>
                <Input id="escalation-email" type="email" placeholder="e.g., ops-leads@example.com" />
            </div>
        </CardContent>
      </Card>
      
       <Card>
        <CardHeader>
          <CardTitle>Onboarding Process</CardTitle>
          <CardDescription>
            Manage the default checklist for new business onboarding.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground text-sm">Onboarding task template management coming soon.</p>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Settings</Button>
      </div>
    </form>
  )
}
