"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export default function CreateMosquePostPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [postType, setPostType] = React.useState("announcement");
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [submitting, setSubmitting] = React.useState(false);

    async function handlePublish() {
        if (!user?.uid || !title.trim()) return;
        setSubmitting(true);
        const supabase = createClient();
        await (supabase as any)
            .from("community_posts")
            .insert({ title: title.trim(), content: content.trim(), category: postType, author_id: user.uid });
        setSubmitting(false);
        router.back();
    }

    async function handleDraft() {
        if (!user?.uid || !title.trim()) return;
        setSubmitting(true);
        const supabase = createClient();
        await (supabase as any)
            .from("community_posts")
            .insert({ title: title.trim(), content: content.trim(), category: `draft:${postType}`, author_id: user.uid });
        setSubmitting(false);
        router.back();
    }

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
                        <Select value={postType} onValueChange={setPostType}>
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
                        <Input
                            id="title"
                            placeholder="A clear and concise title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Full Message</Label>
                        <Textarea
                            id="description"
                            placeholder="Write the full details of your post here..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
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
                        <Button variant="outline" onClick={handleDraft} disabled={submitting || !title.trim()}>
                            Save as Draft
                        </Button>
                        <Button onClick={handlePublish} disabled={submitting || !title.trim() || authLoading}>
                            {submitting ? "Publishing..." : "Publish Post"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
