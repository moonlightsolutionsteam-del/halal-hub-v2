
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud, Facebook, Instagram, Youtube, Calendar, Clock } from "lucide-react";

const TikTokIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 285.9 333.3"
    {...props}
    className="h-5 w-5"
  >
    <path d="M208.2 0c-35.2 0-66.3 21.6-79.3 52.8V219c0 13.2-10.8 24-24 24s-24-10.8-24-24V52.8c0-29-23.8-52.8-52.8-52.8S0 23.8 0 52.8v163.4c0 62.3 50.7 113 113 113s113-50.7 113-113V156.4c.2-35.9 29.3-64.8 65.2-64.8h4.5c29 0 52.8 23.8 52.8 52.8s-23.8 52.8-52.8 52.8h-4.5c-13.2 0-24 10.8-24 24s10.8 24 24 24h4.5c62.3 0 113-50.7 113-113S270.5 0 208.2 0z" />
  </svg>
);


const XIcon = (props: any) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    className="h-5 w-5"
  >
    <path d="m18.901 1.153 3.68 1.84-9.49 19.48-3.68-1.84L18.901 1.153z" />
    <path d="M8.404 1.153 4.724 2.993 14.214 22.47l3.68-1.84L8.404 1.153z" />
  </svg>
);

export default function SchedulePostPage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Schedule a New Post</CardTitle>
                    <CardDescription>Compose your post and schedule it to be published on your social media channels.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                     <div className="space-y-2">
                        <Label htmlFor="post-content">Content</Label>
                        <Textarea id="post-content" placeholder="What's on your mind?" rows={6} />
                    </div>
                     <div className="space-y-2">
                        <Label>Media</Label>
                         <div className="relative border-2 border-dashed border-muted-foreground/50 rounded-lg p-6 text-center hover:border-primary transition-colors">
                            <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground"/>
                            <p className="mt-2 text-sm text-muted-foreground">Upload Image or Video</p>
                            <Input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Platforms</CardTitle>
                    <CardDescription>Select the platforms where you want to publish this post.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <Checkbox id="instagram" />
                        <Label htmlFor="instagram" className="flex items-center gap-2 font-normal"><Instagram /> Instagram</Label>
                    </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <Checkbox id="facebook" />
                        <Label htmlFor="facebook" className="flex items-center gap-2 font-normal"><Facebook /> Facebook</Label>
                    </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <Checkbox id="youtube" />
                        <Label htmlFor="youtube" className="flex items-center gap-2 font-normal"><Youtube /> YouTube</Label>
                    </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <Checkbox id="tiktok" />
                        <Label htmlFor="tiktok" className="flex items-center gap-2 font-normal"><TikTokIcon /> TikTok</Label>
                    </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <Checkbox id="twitter" />
                        <Label htmlFor="twitter" className="flex items-center gap-2 font-normal"><XIcon /> X (Twitter)</Label>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Scheduling</CardTitle>
                    <CardDescription>Publish immediately or schedule for a future date and time.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="schedule-date">Date</Label>
                            <Input id="schedule-date" type="date" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="schedule-time">Time</Label>
                            <Input id="schedule-time" type="time" />
                        </div>
                    </div>
                </CardContent>
            </Card>
             <div className="flex justify-end gap-2">
                <Button variant="outline">Save as Draft</Button>
                <Button>Schedule Post</Button>
            </div>
        </div>
    );
}
