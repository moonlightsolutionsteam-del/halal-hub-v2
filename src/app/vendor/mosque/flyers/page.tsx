
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone, LayoutTemplate } from "lucide-react";

export default function FlyersPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold font-headline">Flyers & Templates</h1>
            <p className="text-muted-foreground">Create promotional materials for your events and announcements.</p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-xl">Coming Soon!</CardTitle>
                <CardDescription>
                    This feature is currently under development. Soon, you'll be able to:
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
                    <Megaphone className="h-6 w-6 text-primary mt-1" />
                    <div>
                        <h4 className="font-semibold">Generate Event Flyers</h4>
                        <p className="text-sm text-muted-foreground">Automatically create beautiful flyers for your events using predefined templates.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
                    <LayoutTemplate className="h-6 w-6 text-primary mt-1" />
                    <div>
                        <h4 className="font-semibold">Customize Templates</h4>
                        <p className="text-sm text-muted-foreground">Choose from a variety of templates and customize them with your mosque's branding.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
