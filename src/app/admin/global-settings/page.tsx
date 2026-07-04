
"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function SuperAdminGlobalSettingsPage() {
  return (
    <form className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Global Settings</h1>
        <p className="text-muted-foreground">Manage platform-wide settings and configurations.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>
            Basic platform information and maintenance mode.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="platform-name">Platform Name</Label>
            <Input id="platform-name" defaultValue="Halal Hub" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Public Contact Email</Label>
            <Input id="contact-email" type="email" defaultValue="contact@halalhub.com" />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="maintenance-mode" className="font-semibold">Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">
                Temporarily make the public site unavailable. Admins can still access it.
              </p>
            </div>
            <Switch id="maintenance-mode" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>
            Manage keys for third-party services. Changes may take a few minutes to apply.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="google-maps-api">Google Maps API Key</Label>
            <Input id="google-maps-api" type="password" defaultValue="AIzaSy...xyz" />
          </div>
           <div className="space-y-2">
            <Label htmlFor="payment-gateway-api">Payment Gateway API Key</Label>
            <Input id="payment-gateway-api" type="password" defaultValue="pk_live_...abc" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Feature Flags</CardTitle>
          <CardDescription>
            Enable or disable specific features across the platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="flex items-center justify-between rounded-lg border p-4">
            <Label htmlFor="feature-reels" className="font-semibold">Reels / Short Videos</Label>
            <Switch id="feature-reels" defaultChecked />
          </div>
           <div className="flex items-center justify-between rounded-lg border p-4">
            <Label htmlFor="feature-marketplace" className="font-semibold">Marketplace</Label>
            <Switch id="feature-marketplace" defaultChecked />
          </div>
           <div className="flex items-center justify-between rounded-lg border p-4">
            <Label htmlFor="feature-family" className="font-semibold">Family Tree</Label>
            <Switch id="feature-family" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Localization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="space-y-2">
            <Label htmlFor="default-language">Default Language</Label>
            <Select>
              <SelectTrigger id="default-language">
                <SelectValue placeholder="English" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">Arabic</SelectItem>
                 <SelectItem value="ur">Urdu</SelectItem>
              </SelectContent>
            </Select>
          </div>
           <div className="space-y-2">
            <Label htmlFor="default-country">Default Country</Label>
            <Select>
              <SelectTrigger id="default-country">
                <SelectValue placeholder="India" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in">India</SelectItem>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="ae">United Arab Emirates</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button>Save All Settings</Button>
      </div>
    </form>
  )
}
