
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud } from "lucide-react";

export default function CreateMosquePostPage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Post</CardTitle>
                    <CardDescription>
                        Share an update, announcement, or reminder with the community.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="post-type">Post Type</Label>
                        <Select defaultValue="announcement">
                            <SelectTrigger id="post-type">
                                <SelectValue placeholder="Select content type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="announcement">Announcement</SelectItem>
                                <SelectItem value="reminder">Reminder</SelectItem>
                                <SelectItem value="event-update">Event Update</SelectItem>
                                <SelectItem value="general">General Update</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="title">Title / Caption</Label>
                        <Input id="title" placeholder="A clear and concise title" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Full Message</Label>
                        <Textarea id="description" placeholder="Write the full details of your post here..." />
                    </div>
                    <div className="space-y-2">
                        <Label>Attachment (Optional)</Label>
                        <div className="relative border-2 border-dashed border-muted-foreground/50 rounded-lg p-12 text-center hover:border-primary transition-colors">
                            <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                            <p className="mt-2 text-sm text-muted-foreground">Upload an image or document</p>
                            <p className="text-xs text-muted-foreground">PNG, JPG, PDF, etc.</p>
                            <Input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline">Save as Draft</Button>
                        <Button>Publish Post</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
