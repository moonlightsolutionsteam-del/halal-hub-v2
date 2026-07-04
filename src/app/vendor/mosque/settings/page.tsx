
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
import { Textarea } from "@/components/ui/textarea";

export default function MosqueSettingsPage() {
  return (
    <form className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Settings</h1>
        <p className="text-muted-foreground">Manage your mosque portal's settings and configurations.</p>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>
            Update basic information for your mosque.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mosque-name">Mosque Name</Label>
            <Input id="mosque-name" defaultValue="Jama Masjid" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Public Contact Email</Label>
            <Input id="contact-email" type="email" defaultValue="contact@jamamasjid.delhi" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>
            Manage how you receive notifications about your mosque's activity.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="email-notifications" className="font-semibold">
                Email Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive summaries and important alerts via email.
              </p>
            </div>
            <Switch id="email-notifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="push-notifications" className="font-semibold">
                Push Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Get real-time alerts on new donations and event sign-ups.
              </p>
            </div>
            <Switch id="push-notifications" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Gateway</CardTitle>
           <CardDescription>
            Connect a payment provider to accept donations and ticket payments.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="space-y-2">
            <Label htmlFor="payment-provider">Payment Provider</Label>
            <Select>
              <SelectTrigger id="payment-provider">
                <SelectValue placeholder="Select a provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stripe">Stripe</SelectItem>
                <SelectItem value="razorpay">Razorpay</SelectItem>
              </SelectContent>
            </Select>
          </div>
           <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input id="api-key" type="password" placeholder="Enter your API key..." />
          </div>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>API & Webhooks</CardTitle>
           <CardDescription>
            For advanced users to integrate with other systems.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="api-key-gen">API Key</Label>
                <div className="flex gap-2">
                    <Input id="api-key-gen" readOnly value="******************" />
                    <Button variant="outline">Regenerate</Button>
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input id="webhook-url" placeholder="https://your-site.com/webhook-receiver" />
                <p className="text-xs text-muted-foreground">We'll send POST requests here for events like 'new_donation'.</p>
            </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Settings</Button>
      </div>
    </form>
  );
}
