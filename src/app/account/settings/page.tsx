
"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User, Lock, Bell, Shield,
  CreditCard, Globe, Camera,
  CheckCircle2
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";

function getInitials(name: string | null | undefined): string {
  if (!name) return "?";
  return name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase();
}

function formatJoinDate(date: any): string {
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    return d.getFullYear().toString();
  } catch { return ""; }
}

export default function UserSettingsPage() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user?.name) return;
    const parts = user.name.trim().split(/\s+/);
    setFirstName(parts[0] ?? "");
    setLastName(parts.slice(1).join(" "));
  }, [user?.name]);

  async function saveProfile() {
    if (!user?.uid) return;
    setSaving(true);
    const supabase = createClient();
    const fullName = [firstName.trim(), lastName.trim()].filter(Boolean).join(" ");
    const { error } = await supabase
      .from("profiles")
      .update({ name: fullName })
      .eq("id", user.uid);
    setSaving(false);
    if (error) {
      toast({ variant: "destructive", title: "Couldn't save changes", description: error.message });
      return;
    }
    toast({ title: "Profile updated" });
  }

  return (
    <div className="container mx-auto px-4 pt-4 pb-32 sm:p-6 sm:pb-8 space-y-6 max-w-4xl">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-3xl font-black font-headline text-primary">Account Settings</h1>
        <p className="text-sm text-muted-foreground font-medium">Manage your personal profile, security, and preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Tab nav — horizontal scrollable pill row on mobile, vertical sidebar on md+ */}
        <TabsList className="flex md:flex-col h-auto w-full md:w-64 bg-transparent gap-2 p-0 justify-start overflow-x-auto no-scrollbar md:overflow-x-visible shrink-0">
          {[
            { id: "profile", label: "Profile Info", icon: User },
            { id: "security", label: "Security", icon: Lock },
            { id: "notifications", label: "Notifications", icon: Bell },
            { id: "privacy", label: "Privacy", icon: Shield },
          ].map(tab => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex items-center gap-2 shrink-0 md:w-full md:justify-start px-4 md:px-6 py-3 md:py-4 rounded-2xl data-[state=active]:bg-primary data-[state=active]:text-white font-bold transition-all border-none text-sm whitespace-nowrap"
            >
              <tab.icon className="h-4 w-4 md:h-5 md:w-5" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex-1 min-w-0">
          <TabsContent value="profile" className="m-0 space-y-6">
            <Card className="rounded-2xl sm:rounded-[2.5rem] border-none shadow-sm overflow-hidden">
              <CardHeader className="p-4 sm:p-8 border-b bg-muted/20">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  <div className="relative group">
                    <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-white shadow-xl">
                      {user?.photoURL && <AvatarImage src={user.photoURL} />}
                      <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-0 right-0 h-8 w-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 transition-transform">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-center sm:text-left space-y-1">
                    <CardTitle className="text-xl sm:text-2xl font-black">{user?.name ?? "My Profile"}</CardTitle>
                    <CardDescription className="font-medium">
                      {user?.createdAt ? `Halal Hub Member since ${formatJoinDate(user.createdAt)}` : "Halal Hub Member"}
                    </CardDescription>
                    <Badge className="bg-primary/10 text-primary border-none font-bold">
                      {user?.roles?.includes("super_admin") ? "Admin" : user?.roles?.[0] ?? "Member"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="font-bold ml-1 text-xs uppercase tracking-widest text-muted-foreground">First Name</Label>
                    <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="h-12 rounded-xl bg-muted/30 border-none px-4 font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="font-bold ml-1 text-xs uppercase tracking-widest text-muted-foreground">Last Name</Label>
                    <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="h-12 rounded-xl bg-muted/30 border-none px-4 font-bold" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="email" className="font-bold ml-1 text-xs uppercase tracking-widest text-muted-foreground">Email Address</Label>
                    <Input id="email" type="email" value={user?.email ?? ""} disabled className="h-12 rounded-xl bg-muted/30 border-none px-4 font-bold opacity-70" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="bio" className="font-bold ml-1 text-xs uppercase tracking-widest text-muted-foreground">Short Bio</Label>
                    <textarea
                      id="bio"
                      className="w-full h-24 rounded-xl bg-muted/30 border-none p-4 font-medium resize-none focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                      placeholder="Tell the community a bit about yourself..."
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 sm:p-8 border-t bg-muted/10 flex justify-end gap-3">
                <Button variant="ghost" className="rounded-xl font-bold">Cancel</Button>
                <Button onClick={saveProfile} disabled={saving || authLoading} className="rounded-xl bg-primary px-6 sm:px-8 font-bold shadow-lg shadow-primary/20">
                  {saving ? "Saving…" : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="m-0">
            <Card className="rounded-2xl sm:rounded-[2.5rem] border-none shadow-sm p-4 sm:p-8 space-y-8">
              <div className="space-y-6">
                <h3 className="text-xl font-black">Change Password</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase text-muted-foreground">Current Password</Label>
                    <Input type="password" placeholder="••••••••" className="h-12 rounded-xl bg-muted/30 border-none" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase text-muted-foreground">New Password</Label>
                    <Input type="password" placeholder="New Password" className="h-12 rounded-xl bg-muted/30 border-none" />
                  </div>
                  <Button className="bg-primary rounded-xl font-bold">Update Password</Button>
                </div>
              </div>
              <div className="h-px bg-muted w-full" />
              <div className="space-y-4">
                <h3 className="text-xl font-black">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl border-2 border-primary/10">
                  <div className="space-y-1">
                    <p className="font-bold text-foreground">SMS Verification</p>
                    <p className="text-xs text-muted-foreground">Receive a code via phone for every login.</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="m-0">
            <Card className="rounded-2xl sm:rounded-[2.5rem] border-none shadow-sm p-4 sm:p-8 space-y-8">
              <div className="space-y-6">
                <h3 className="text-xl font-black">Notification Preferences</h3>
                <div className="space-y-4">
                  {[
                    { label: "Community Replies", desc: "When someone replies to your post or comment." },
                    { label: "New Listings Nearby", desc: "New halal restaurants and businesses in your area." },
                    { label: "Prayer Time Reminders", desc: "Reminders before each prayer time." },
                    { label: "Event Announcements", desc: "Upcoming halal events and community gatherings." },
                    { label: "Promotional Offers", desc: "Deals and discounts from partner businesses." },
                  ].map(({ label, desc }) => (
                    <div key={label} className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl">
                      <div className="space-y-0.5">
                        <p className="font-bold text-sm text-foreground">{label}</p>
                        <p className="text-xs text-muted-foreground">{desc}</p>
                      </div>
                      <Switch defaultChecked={label !== "Promotional Offers"} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-px bg-muted w-full" />
              <div className="space-y-4">
                <h3 className="text-xl font-black">Email Digest</h3>
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl border-2 border-primary/10">
                  <div className="space-y-1">
                    <p className="font-bold text-foreground">Weekly Summary</p>
                    <p className="text-xs text-muted-foreground">A roundup of top community posts every Friday.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-primary rounded-xl px-8 font-bold shadow-lg shadow-primary/20">Save Preferences</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="m-0">
            <Card className="rounded-2xl sm:rounded-[2.5rem] border-none shadow-sm p-4 sm:p-8 space-y-8">
              <div className="space-y-6">
                <h3 className="text-xl font-black">Privacy Controls</h3>
                <div className="space-y-4">
                  {[
                    { label: "Public Profile", desc: "Allow other members to view your profile page." },
                    { label: "Show Activity Status", desc: "Let others see when you were last active." },
                    { label: "Personalised Recommendations", desc: "Use your activity to improve suggestions." },
                    { label: "Data for Analytics", desc: "Share anonymised usage data to help improve Halal Hub." },
                  ].map(({ label, desc }) => (
                    <div key={label} className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl">
                      <div className="space-y-0.5">
                        <p className="font-bold text-sm text-foreground">{label}</p>
                        <p className="text-xs text-muted-foreground">{desc}</p>
                      </div>
                      <Switch defaultChecked={label !== "Data for Analytics"} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-px bg-muted w-full" />
              <div className="space-y-4">
                <h3 className="text-xl font-black text-red-600">Danger Zone</h3>
                <div className="p-4 rounded-2xl border-2 border-red-200 dark:border-red-900/50 space-y-3">
                  <p className="font-bold text-sm text-foreground">Delete Account</p>
                  <p className="text-xs text-muted-foreground">Permanently delete your Halal Hub account and all associated data. This action cannot be undone.</p>
                  <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl font-bold">Request Account Deletion</Button>
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-primary rounded-xl px-8 font-bold shadow-lg shadow-primary/20">Save Privacy Settings</Button>
              </div>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
