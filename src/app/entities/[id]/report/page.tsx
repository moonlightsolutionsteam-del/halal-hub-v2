
"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

const ISSUE_LABELS: Record<string, string> = {
  "incorrect-info": "Incorrect Information",
  "halal-concern": "Halal Concern",
  "closed-down": "Permanently Closed",
  "spam-or-scam": "Spam or Scam",
  other: "Other",
}

export default function ReportPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { toast } = useToast();
  const { user } = useAuth();
  const [issueType, setIssueType] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueType) {
      toast({
        variant: "destructive",
        title: "Issue type required",
        description: "Please select the type of issue you are reporting.",
      });
      return;
    }
    setIsSubmitting(true);

    const supabase = createClient()
    const { error } = await supabase.from("contacts").insert({
      business_id: id,
      user_id: user?.uid ?? null,
      name: user?.name ?? "Anonymous",
      email: user?.email ?? "unknown@halalhub.app",
      subject: `Business Report: ${ISSUE_LABELS[issueType] ?? issueType}`,
      message: comment || "(No additional details provided)",
    })

    setIsSubmitting(false);

    if (error) {
      toast({ variant: "destructive", title: "Couldn't submit report", description: error.message });
      return;
    }

    toast({
      title: "Report Submitted",
      description: "Thank you for your report. Our team will review the issue.",
    });
    router.back();
  };

  return (
    <div className="p-4 md:p-6">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-xl">Report an Issue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="issue-type">Type of Issue</Label>
              <Select onValueChange={setIssueType} value={issueType}>
                <SelectTrigger id="issue-type">
                  <SelectValue placeholder="Select an issue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="incorrect-info">Incorrect Information</SelectItem>
                  <SelectItem value="halal-concern">Halal Concern</SelectItem>
                  <SelectItem value="closed-down">Permanently Closed</SelectItem>
                  <SelectItem value="spam-or-scam">Spam or Scam</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Additional Details (Optional)</Label>
              <Textarea
                id="comment"
                placeholder="Please provide more information about the issue."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[120px]"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
