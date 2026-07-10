"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const emailSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const phoneSchema = z.object({
  phone: z.string().regex(/^\+[1-9]\d{1,14}$/, { message: "Phone number must be in E.164 format (e.g., +919876543210)." }),
});

const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 digits." }),
});

const GoogleIcon = () => (
  <svg className="h-4 w-4" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <title>Google</title>
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.05 1.05-2.86 2.25-4.82 2.25-3.64 0-6.55-3-6.55-6.6s2.91-6.6 6.55-6.6c1.98 0 3.33.83 4.1 1.62l2.3-2.3c-1.4-1.38-3.33-2.25-5.9-2.25-4.82 0-8.64 3.88-8.64 8.64s3.82 8.64 8.64 8.64c2.86 0 5.1-1 6.6-2.52 1.54-1.54 2.3-3.8 2.3-6.24 0-.48-.05-.88-.12-1.28H12.48z" fill="#4285F4" />
  </svg>
);

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [pendingPhone, setPendingPhone] = useState<string | null>(null);
  const { toast } = useToast();
  const { signInWithGoogle, signInWithPhone, verifyOtp } = useAuth();

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "", password: "" },
  });

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "+91" },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  async function onEmailSubmit(values: z.infer<typeof emailSchema>) {
    setLoading(true);
    try {
      toast({ title: "Email sign-in coming soon!", description: "Use Phone OTP or Google for now." });
    } finally {
      setLoading(false);
    }
  }

  async function onPhoneSubmit(values: z.infer<typeof phoneSchema>) {
    setPhoneLoading(true);
    try {
      await signInWithPhone(values.phone);
      setPendingPhone(values.phone);
      toast({ title: "OTP Sent!", description: `Check your SMS at ${values.phone}` });
    } catch (err: any) {
      toast({ title: "Error", description: err?.message ?? "Failed to send OTP.", variant: "destructive" });
    } finally {
      setPhoneLoading(false);
    }
  }

  async function onOtpSubmit(values: z.infer<typeof otpSchema>) {
    if (!pendingPhone) return;
    setOtpLoading(true);
    try {
      await verifyOtp(pendingPhone, values.otp);
      toast({ title: "Welcome to Halal Hub!", description: "You've earned 5 coins as a sign-up bonus." });
    } catch (err: any) {
      toast({ title: "Invalid OTP", description: err?.message ?? "Please check your code and try again.", variant: "destructive" });
    } finally {
      setOtpLoading(false);
    }
  }

  async function onGoogleSignIn() {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      toast({ title: "Error", description: err?.message ?? "Google sign-in failed.", variant: "destructive" });
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <Tabs defaultValue="phone">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="phone">Phone OTP</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>

        <TabsContent value="phone">
          {!pendingPhone ? (
            <Form {...phoneForm}>
              <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4 pt-4">
                <FormField
                  control={phoneForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+919876543210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={phoneLoading}>
                  {phoneLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Send OTP
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">OTP sent to <span className="font-bold">{pendingPhone}</span></p>
                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password (OTP)</FormLabel>
                      <FormControl>
                        <Input placeholder="123456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={otpLoading}>
                  {otpLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Verify OTP
                </Button>
                <Button variant="link" size="sm" className="w-full" onClick={() => setPendingPhone(null)}>
                  Use a different phone number
                </Button>
              </form>
            </Form>
          )}
        </TabsContent>

        <TabsContent value="email">
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4 pt-4">
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="user@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={emailForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>

      <div className="relative my-4">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-sm text-muted-foreground">
          OR
        </span>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={onGoogleSignIn}
        disabled={loading}
      >
        <GoogleIcon />
        Sign in with Google
      </Button>
    </div>
  );
}
