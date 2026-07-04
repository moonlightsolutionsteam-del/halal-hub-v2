
"use client"

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

export default function UserSettingsPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-4xl">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-3xl font-black font-headline text-primary">Account Settings</h1>
        <p className="text-muted-foreground font-medium">Manage your personal profile, security, and preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="flex flex-col md:flex-row gap-8">
        <TabsList className="flex md:flex-col h-auto w-full md:w-64 bg-transparent gap-2 p-0 justify-start">
          {[
            { id: "profile", label: "Profile Info", icon: User },
            { id: "security", label: "Security", icon: Lock },
            { id: "notifications", label: "Notifications", icon: Bell },
            { id: "privacy", label: "Privacy", icon: Shield },
          ].map(tab => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id} 
              className="flex items-center gap-3 w-full justify-start px-6 py-4 rounded-2xl data-[state=active]:bg-primary data-[state=active]:text-white font-bold transition-all border-none"
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex-1">
          <TabsContent value="profile" className="m-0 space-y-6">
            <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden">
              <CardHeader className="p-8 border-b bg-muted/20">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative group">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
                      <AvatarImage src="https://picsum.photos/seed/user/200/200" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-0 right-0 h-8 w-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 transition-transform">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-center sm:text-left space-y-1">
                    <CardTitle className="text-2xl font-black">John Doe</CardTitle>
                    <CardDescription className="font-medium">Universal Hub Member since 2023</CardDescription>
                    <Badge className="bg-primary/10 text-primary border-none font-bold">Premium Tier</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="font-bold ml-1 text-xs uppercase tracking-widest text-muted-foreground">First Name</Label>
                    <Input id="firstName" defaultValue="John" className="h-12 rounded-xl bg-muted/30 border-none px-4 font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="font-bold ml-1 text-xs uppercase tracking-widest text-muted-foreground">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" className="h-12 rounded-xl bg-muted/30 border-none px-4 font-bold" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="email" className="font-bold ml-1 text-xs uppercase tracking-widest text-muted-foreground">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" className="h-12 rounded-xl bg-muted/30 border-none px-4 font-bold" />
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
              <CardFooter className="p-8 border-t bg-muted/10 flex justify-end gap-3">
                <Button variant="ghost" className="rounded-xl font-bold">Cancel</Button>
                <Button className="rounded-xl bg-primary px-8 font-bold shadow-lg shadow-primary/20">Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="m-0">
            <Card className="rounded-[2.5rem] border-none shadow-sm p-8 space-y-8">
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
        </div>
      </Tabs>
    </div>
  );
}
