
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud } from "lucide-react";

export default function CreateBlogPage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Blog Post</CardTitle>
                    <CardDescription>
                        Write and publish a new article for the community.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="post-title">Post Title</Label>
                        <Input id="post-title" placeholder="e.g., The Beauty of Islamic Art" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="post-category">Category</Label>
                        <Select>
                            <SelectTrigger id="post-category">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="spirituality">Spirituality</SelectItem>
                                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                                <SelectItem value="food">Food</SelectItem>
                                <SelectItem value="family">Family</SelectItem>
                                <SelectItem value="finance">Finance</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label>Featured Image</Label>
                         <div className="relative border-2 border-dashed border-muted-foreground/50 rounded-lg p-6 text-center hover:border-primary transition-colors">
                            <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground"/>
                            <p className="mt-2 text-sm text-muted-foreground">Upload file</p>
                            <Input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="post-content">Content</Label>
                        <Textarea
                            id="post-content"
                            placeholder="Start writing your article here... Supports Markdown."
                            rows={15}
                        />
                    </div>
                </CardContent>
            </Card>
             <div className="flex justify-end gap-2">
                <Button variant="outline">Save as Draft</Button>
                <Button>Publish Post</Button>
            </div>
        </div>
    );
}
