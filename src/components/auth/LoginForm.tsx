"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Mail, Phone, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

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

// ── Schemas ──────────────────────────────────────────────────────────────────

const phoneSchema = z.object({
  phone: z.string().regex(/^\+[1-9]\d{1,14}$/, {
    message: "Use international format, e.g. +919876543210",
  }),
});

const emailOtpSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
});

const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 digits" }),
});

// ── Google icon ───────────────────────────────────────────────────────────────

const GoogleIcon = () => (
  <svg className="h-4 w-4" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <title>Google</title>
    <path
      d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.05 1.05-2.86 2.25-4.82 2.25-3.64 0-6.55-3-6.55-6.6s2.91-6.6 6.55-6.6c1.98 0 3.33.83 4.1 1.62l2.3-2.3c-1.4-1.38-3.33-2.25-5.9-2.25-4.82 0-8.64 3.88-8.64 8.64s3.82 8.64 8.64 8.64c2.86 0 5.1-1 6.6-2.52 1.54-1.54 2.3-3.8 2.3-6.24 0-.48-.05-.88-.12-1.28H12.48z"
      fill="#4285F4"
    />
  </svg>
);

// ── Component ─────────────────────────────────────────────────────────────────

type OtpChannel = "phone" | "email"

export default function LoginForm() {
  const [googleLoading, setGoogleLoading] = useState(false);

  // Phone OTP state
  const [phoneLoading, setPhoneLoading]   = useState(false);
  const [pendingPhone, setPendingPhone]   = useState<string | null>(null);
  const [otpLoading, setOtpLoading]       = useState(false);

  // Email OTP state
  const [emailOtpLoading, setEmailOtpLoading]     = useState(false);
  const [pendingEmail, setPendingEmail]           = useState<string | null>(null);
  const [emailOtpVerifyLoading, setEmailOtpVerifyLoading] = useState(false);

  // "send to email instead" fallback (shown on phone OTP screen)
  const [emailFallbackLoading, setEmailFallbackLoading] = useState(false);
  const [emailFallbackSent, setEmailFallbackSent]       = useState(false);

  const { toast } = useToast();
  const { signInWithGoogle, signInWithPhone, verifyOtp } = useAuth();

  // ── Phone forms ─────────────────────────────────────────────────────────────

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "+91" },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  async function onPhoneSubmit(values: z.infer<typeof phoneSchema>) {
    setPhoneLoading(true);
    try {
      await signInWithPhone(values.phone);
      setPendingPhone(values.phone);
      setEmailFallbackSent(false);
      toast({ title: "OTP sent!", description: `Check your SMS at ${values.phone}` });
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
    } catch (err: any) {
      toast({ title: "Invalid OTP", description: err?.message ?? "Check your code and try again.", variant: "destructive" });
    } finally {
      setOtpLoading(false);
    }
  }

  // ── Email OTP fallback (from phone OTP screen) ───────────────────────────────

  async function sendEmailFallback(email: string) {
    setEmailFallbackLoading(true);
    try {
      const res = await fetch("/api/email/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setEmailFallbackSent(true);
      toast({ title: "Code sent to your email!", description: `Check ${email} for your login code.` });
    } catch (err: any) {
      toast({ title: "Error", description: err?.message ?? "Could not send email code.", variant: "destructive" });
    } finally {
      setEmailFallbackLoading(false);
    }
  }

  // ── Email OTP tab ────────────────────────────────────────────────────────────

  const emailOtpForm = useForm<z.infer<typeof emailOtpSchema>>({
    resolver: zodResolver(emailOtpSchema),
    defaultValues: { email: "" },
  });

  const emailOtpVerifyForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  async function onEmailOtpSubmit(values: z.infer<typeof emailOtpSchema>) {
    setEmailOtpLoading(true);
    try {
      const res = await fetch("/api/email/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setPendingEmail(values.email);
      toast({ title: "Code sent!", description: `Check ${values.email} for your 6-digit code.` });
    } catch (err: any) {
      toast({ title: "Error", description: err?.message ?? "Failed to send code.", variant: "destructive" });
    } finally {
      setEmailOtpLoading(false);
    }
  }

  async function onEmailOtpVerify(values: z.infer<typeof otpSchema>) {
    if (!pendingEmail) return;
    setEmailOtpVerifyLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.verifyOtp({
        email: pendingEmail,
        token: values.otp,
        type: "email",
      });
      if (error) throw error;
      // Auth state change handled by useAuth listener — redirect will happen automatically
    } catch (err: any) {
      toast({ title: "Invalid code", description: err?.message ?? "Check your code and try again.", variant: "destructive" });
    } finally {
      setEmailOtpVerifyLoading(false);
    }
  }

  // ── Google ───────────────────────────────────────────────────────────────────

  async function onGoogleSignIn() {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      toast({ title: "Error", description: err?.message ?? "Google sign-in failed.", variant: "destructive" });
      setGoogleLoading(false);
    }
  }

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="rounded-2xl border bg-card text-card-foreground shadow-sm p-6">
      <Tabs defaultValue="phone">
        <TabsList className="grid w-full grid-cols-2 mb-2">
          <TabsTrigger value="phone" className="gap-2">
            <Phone className="h-3.5 w-3.5" /> Phone
          </TabsTrigger>
          <TabsTrigger value="email" className="gap-2">
            <Mail className="h-3.5 w-3.5" /> Email
          </TabsTrigger>
        </TabsList>

        {/* ── Phone OTP tab ── */}
        <TabsContent value="phone">
          {!pendingPhone ? (
            <Form {...phoneForm}>
              <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4 pt-4">
                <FormField
                  control={phoneForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <Input placeholder="+919876543210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full rounded-xl h-11 font-bold" disabled={phoneLoading}>
                  {phoneLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Send OTP
                </Button>
              </form>
            </Form>
          ) : (
            <div className="pt-4 space-y-4">
              <p className="text-sm text-muted-foreground">
                OTP sent to <span className="font-bold text-foreground">{pendingPhone}</span>
              </p>

              <Form {...otpForm}>
                <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
                  <FormField
                    control={otpForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>6-digit code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="123456"
                            inputMode="numeric"
                            maxLength={6}
                            className="text-center text-xl tracking-[0.5em] font-bold h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full rounded-xl h-11 font-bold" disabled={otpLoading}>
                    {otpLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Verify code
                  </Button>
                </form>
              </Form>

              {/* Email fallback */}
              {!emailFallbackSent ? (
                <div className="text-center space-y-1 pt-1">
                  <p className="text-xs text-muted-foreground">Didn't receive the SMS?</p>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-xs h-auto p-0 text-primary"
                    disabled={emailFallbackLoading}
                    onClick={async () => {
                      const email = window.prompt("Enter your email to receive the code instead:");
                      if (email) await sendEmailFallback(email.trim());
                    }}
                  >
                    {emailFallbackLoading && <Loader2 className="mr-1 h-3 w-3 animate-spin" />}
                    Send code to email instead
                  </Button>
                </div>
              ) : (
                <p className="text-xs text-center text-emerald-600 font-medium">
                  ✓ Code sent to your email. Check your inbox.
                </p>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs text-muted-foreground"
                onClick={() => { setPendingPhone(null); setEmailFallbackSent(false); }}
              >
                <ArrowLeft className="h-3 w-3 mr-1" /> Use a different number
              </Button>
            </div>
          )}
        </TabsContent>

        {/* ── Email OTP tab ── */}
        <TabsContent value="email">
          {!pendingEmail ? (
            <Form {...emailOtpForm}>
              <form onSubmit={emailOtpForm.handleSubmit(onEmailOtpSubmit)} className="space-y-4 pt-4">
                <FormField
                  control={emailOtpForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full rounded-xl h-11 font-bold" disabled={emailOtpLoading}>
                  {emailOtpLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Send login code
                </Button>
              </form>
            </Form>
          ) : (
            <div className="pt-4 space-y-4">
              <p className="text-sm text-muted-foreground">
                Code sent to <span className="font-bold text-foreground">{pendingEmail}</span>
              </p>

              <Form {...emailOtpVerifyForm}>
                <form onSubmit={emailOtpVerifyForm.handleSubmit(onEmailOtpVerify)} className="space-y-4">
                  <FormField
                    control={emailOtpVerifyForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>6-digit code from email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="123456"
                            inputMode="numeric"
                            maxLength={6}
                            className="text-center text-xl tracking-[0.5em] font-bold h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full rounded-xl h-11 font-bold" disabled={emailOtpVerifyLoading}>
                    {emailOtpVerifyLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Verify code
                  </Button>
                </form>
              </Form>

              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs text-muted-foreground"
                onClick={() => setPendingEmail(null)}
              >
                <ArrowLeft className="h-3 w-3 mr-1" /> Use a different email
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="relative my-5">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
          or continue with
        </span>
      </div>

      <Button
        variant="outline"
        className="w-full rounded-xl h-11 font-bold gap-2"
        onClick={onGoogleSignIn}
        disabled={googleLoading}
      >
        {googleLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleIcon />}
        Google
      </Button>
    </div>
  );
}
