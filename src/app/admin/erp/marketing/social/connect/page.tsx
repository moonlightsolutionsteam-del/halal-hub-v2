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
import { Facebook, Instagram, Youtube } from "lucide-react";

const XIcon = (props: any) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="m18.901 1.153 3.68 1.84-9.49 19.48-3.68-1.84L18.901 1.153z" />
    <path d="M8.404 1.153 4.724 2.993 14.214 22.47l3.68-1.84L8.404 1.153z" />
  </svg>
);

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

export default function ConnectAccountPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect a New Account</CardTitle>
        <CardDescription>
          Authenticate with a social media platform to manage it from Halal Hub.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Select>
                <SelectTrigger id="platform">
                    <SelectValue placeholder="Select a platform" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="instagram">
                        <div className="flex items-center gap-2">
                            <Instagram /> Instagram
                        </div>
                    </SelectItem>
                    <SelectItem value="facebook">
                         <div className="flex items-center gap-2">
                            <Facebook /> Facebook
                        </div>
                    </SelectItem>
                    <SelectItem value="x-twitter">
                         <div className="flex items-center gap-2">
                            <XIcon className="h-4 w-4 fill-current"/> X (Twitter)
                        </div>
                    </SelectItem>
                    <SelectItem value="youtube">
                         <div className="flex items-center gap-2">
                            <Youtube /> YouTube
                        </div>
                    </SelectItem>
                     <SelectItem value="tiktok">
                         <div className="flex items-center gap-2">
                            <TikTokIcon /> TikTok
                        </div>
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
        <Button className="w-full">Authenticate with Platform</Button>
      </CardContent>
    </Card>
  );
}
