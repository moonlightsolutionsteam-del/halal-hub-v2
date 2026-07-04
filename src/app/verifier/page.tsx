
"use client"

import { useState } from "react";
import { verifyHalalProduct, type VerifyHalalProductOutput } from "@/ai/flows/product-halal-verifier-flow";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle, AlertTriangle, Loader2, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function VerifierPage() {
  const [ingredients, setIngredients] = useState("");
  const [certifications, setCertifications] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifyHalalProductOutput | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients.trim()) return;

    setLoading(true);
    try {
      const output = await verifyHalalProduct({
        ingredients,
        certifications: certifications || undefined,
      });
      setResult(output);
    } catch (error) {
      console.error("Verification failed", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "HALAL": return "text-emerald-600 border-emerald-200 bg-emerald-50";
      case "HARAM": return "text-red-600 border-red-200 bg-red-50";
      case "MASHBOOH": return "text-yellow-600 border-yellow-200 bg-yellow-50";
      default: return "text-muted-foreground border-border bg-muted";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "HALAL": return <CheckCircle2 className="h-8 w-8 text-emerald-600" />;
      case "HARAM": return <XCircle className="h-8 w-8 text-red-600" />;
      case "MASHBOOH": return <AlertTriangle className="h-8 w-8 text-yellow-600" />;
      default: return <Info className="h-8 w-8 text-muted-foreground" />;
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8 md:p-8 max-w-4xl">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-headline text-primary">AI Product Verifier</h1>
        <p className="text-muted-foreground">Verify the halal status of any product by analyzing its ingredients and certifications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Analysis Input</CardTitle>
            <CardDescription>Paste the ingredient list and any known certifications.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ingredients">Ingredient List</Label>
                <Textarea 
                  id="ingredients" 
                  placeholder="Paste ingredients here... (e.g. Flour, Water, Gelatin (Porcine), Salt...)" 
                  className="min-h-[150px]"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="certs">Known Certifications (Optional)</Label>
                <Input 
                  id="certs" 
                  placeholder="e.g. HMC, JAKIM, etc." 
                  value={certifications}
                  onChange={(e) => setCertifications(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full bg-primary" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Ingredients"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {result ? (
            <>
              <Card className={`border-2 ${getStatusColor(result.halalStatus)}`}>
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    {getStatusIcon(result.halalStatus)}
                  </div>
                  <CardTitle className="text-2xl font-black uppercase tracking-widest">{result.halalStatus}</CardTitle>
                  <CardDescription className="text-current opacity-80">
                    AI Confidence Score: {result.confidenceScore}%
                  </CardDescription>
                  <Progress value={result.confidenceScore} className="h-2 mt-2" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-bold text-sm underline mb-2">Analysis Breakdown</h4>
                    <p className="text-sm leading-relaxed">{result.explanation}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-start gap-4 pt-0">
                  <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle className="text-xs font-bold">Disclaimer</AlertTitle>
                    <AlertDescription className="text-[10px] leading-tight">
                      {result.unvalidatedWarning}
                    </AlertDescription>
                  </Alert>
                </CardFooter>
              </Card>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-muted/30 rounded-xl border-2 border-dashed">
                <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-bold text-lg">Waiting for input</h3>
                <p className="text-sm text-muted-foreground max-w-xs">Enter a product's details on the left to start the AI-powered halal analysis.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CheckCircle(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    )
}
