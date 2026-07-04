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

export default function CreateCampaignPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Campaign Details</CardTitle>
          <CardDescription>
            Configure the details for your new marketing campaign.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="campaign-name">Campaign Name</Label>
            <Input id="campaign-name" placeholder="e.g., Ramadan 2025 Outreach" />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
                <Label htmlFor="campaign-type">Campaign Type</Label>
                <Select>
                    <SelectTrigger id="campaign-type">
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="push">Push Notification</SelectItem>
                        <SelectItem value="multi-channel">Multi-channel</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="space-y-2">
                <Label htmlFor="campaign-goal">Campaign Goal</Label>
                 <Select>
                    <SelectTrigger id="campaign-goal">
                        <SelectValue placeholder="Select goal" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="engagement">Increase Engagement</SelectItem>
                        <SelectItem value="leads">Generate Leads</SelectItem>
                        <SelectItem value="conversions">Drive Conversions</SelectItem>
                         <SelectItem value="awareness">Brand Awareness</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="campaign-content">Content / Message</Label>
            <Textarea
              id="campaign-content"
              placeholder="Write the main content for your campaign..."
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Targeting</CardTitle>
            <CardDescription>Define the audience for this campaign.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="target-segment">User Segment</Label>
                <Select>
                    <SelectTrigger id="target-segment">
                        <SelectValue placeholder="Select a user segment" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="new-users">New Users (Last 30 days)</SelectItem>
                        <SelectItem value="business-owners">Business Owners</SelectItem>
                        <SelectItem value="creators">Creators</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="space-y-2">
                <Label htmlFor="target-location">Location</Label>
                <Input id="target-location" placeholder="e.g., Delhi, Mumbai" />
             </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input id="start-date" type="date" />
                </div>
                 <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input id="end-date" type="date" />
                </div>
            </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline">Save as Draft</Button>
        <Button>Launch Campaign</Button>
      </div>
    </div>
  );
}
