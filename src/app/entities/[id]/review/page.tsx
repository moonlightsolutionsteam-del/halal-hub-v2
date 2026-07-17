
"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Star, Award, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";
import { announceNewAchievements } from "@/lib/engagement/announce-achievements";

export default function ReviewPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { toast } = useToast();
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        variant: "destructive",
        title: "Rating required",
        description: "Please select a star rating before submitting.",
      });
      return;
    }
    if (!user) {
      toast({
        variant: "destructive",
        title: "Sign in required",
        description: "Please sign in to leave a review.",
      });
      return;
    }
    setIsSubmitting(true);

    const supabase = createClient()

    const imageUrls: string[] = []
    for (const photo of photos) {
      const path = `${user.uid}/${id}-${Date.now()}-${photo.name}`
      const { error: uploadError } = await supabase.storage.from("review-photos").upload(path, photo)
      if (!uploadError) {
        const { data } = supabase.storage.from("review-photos").getPublicUrl(path)
        imageUrls.push(data.publicUrl)
      }
    }

    const { error } = await supabase.from("business_reviews").insert({
      business_id: id,
      user_id: user.uid,
      rating,
      body: comment || null,
      images: imageUrls,
    })

    setIsSubmitting(false);

    if (error) {
      toast({
        variant: "destructive",
        title: "Couldn't submit review",
        description: error.code === "23505" ? "You've already reviewed this business." : error.message,
      });
      return;
    }

    const points = 25 + (imageUrls.length > 0 ? 25 : 0);
    toast({
      title: "Review Submitted!",
      description: `Thank you for your feedback! You've earned ${points} loyalty coins.`,
    });
    await announceNewAchievements(user.uid, toast);
    router.back();
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-card px-4 md:px-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Write a Review</h1>
        <div className="w-9 h-9"></div> {/* Placeholder for alignment */}
      </header>

      <main className="flex-1 p-4 md:p-6">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">Your Rating</CardTitle>
              <CardDescription className="flex items-center gap-2 pt-1">
                <Award className="h-4 w-4 text-primary"/>
                <span>Earn <strong>25 coins</strong> for your review, and <strong>+25 bonus coins</strong> for adding photos!</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Click to rate</Label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-8 w-8 cursor-pointer ${
                        rating >= star
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-muted-foreground/50"
                      }`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment">Your Review (Optional)</Label>
                <Textarea
                  id="comment"
                  placeholder="Tell us about your experience..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>

               <div className="space-y-2">
                <Label>Add Photos (Optional)</Label>
                <div className="relative border-2 border-dashed border-muted-foreground/50 rounded-lg p-6 text-center hover:border-primary transition-colors">
                    <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground"/>
                    <p className="mt-2 text-sm text-muted-foreground">Click or drag files to upload</p>
                    <p className="text-xs text-muted-foreground">You can upload up to 5 photos.</p>
                    <Input 
                        type="file" 
                        multiple
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => setPhotos(Array.from(e.target.files || []))}
                    />
                </div>
                 {photos.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {photos.map((file, index) => (
                            <div key={index} className="text-xs p-1 bg-secondary rounded">{file.name}</div>
                        ))}
                    </div>
                 )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  );
}
