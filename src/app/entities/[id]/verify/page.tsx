
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const surveyQuestions = [
  {
    id: "halalCertification",
    label: "Halal Certification Displayed and Valid",
  },
  {
    id: "crossContamination",
    label: "Cross Contamination Risk",
  },
  {
    id: "nonHalalProducts",
    label: "Non Halal Products Used",
  },
  {
    id: "porkServed",
    label: "Pork Served",
  },
  {
    id: "alcoholServed",
    label: "Alcohol Served",
  },
  {
    id: "prayerPlace",
    label: "Prayer Place Available",
  },
];

const halalStatuses = [
    "Halal certified",
    "Halal",
    "Halal friendly",
    "Vegetarian",
    "Vegan",
    "Vegan friendly",
    "Others"
];

type SurveyAnswers = {
  [key: string]: "yes" | "no" | "not-sure";
};

export default function VerifyPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { toast } = useToast();
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [halalStatus, setHalalStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleValueChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value as any }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!halalStatus) {
      toast({
        variant: "destructive",
        title: "Status Required",
        description: "Please select an observed Halal status before submitting.",
      });
      return;
    }

    setIsSubmitting(true);
    console.log("Survey submitted for restaurant:", id);
    console.log("Selected Status:", halalStatus);
    console.log("Answers:", answers);

    // In a real app, you would send this data to your backend/Firestore
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Verification Submitted!",
        description: "Thank you for helping our community! You've earned 30 loyalty coins.",
      });
      router.back();
    }, 1000);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-card px-4 md:px-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Verify</h1>
        <div className="w-9 h-9"></div> {/* Placeholder for alignment */}
      </header>

      <main className="flex-1 p-4 md:p-6 pb-20">
        <div className="bg-secondary/30 p-4 rounded-lg mb-6">
            <Link href="/entities/halal-info" passHref>
                <div className="flex items-center gap-3 cursor-pointer">
                    <Info className="h-5 w-5 text-primary" />
                    <div>
                        <p className="font-semibold text-primary">What do these statuses mean?</p>
                        <p className="text-sm text-muted-foreground">Learn about Halal verification standards.</p>
                    </div>
                </div>
            </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
           <div className="space-y-4">
              <Label className="text-base font-medium">Select observed Halal Status</Label>
              <Select onValueChange={setHalalStatus} value={halalStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  {halalStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          
          <Separator />

          {surveyQuestions.map((question) => (
            <div key={question.id} className="space-y-4">
              <Label className="text-base font-medium">{question.label}</Label>
              <RadioGroup
                onValueChange={(value) => handleValueChange(question.id, value)}
                className="flex items-center space-x-6"
                value={answers[question.id]}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id={`${question.id}-yes`} />
                  <Label htmlFor={`${question.id}-yes`}>Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id={`${question.id}-no`} />
                  <Label htmlFor={`${question.id}-no`}>No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="not-sure"
                    id={`${question.id}-not-sure`}
                  />
                  <Label htmlFor={`${question.id}-not-sure`}>Not Sure</Label>
                </div>
              </RadioGroup>
            </div>
          ))}

          <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
             <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
