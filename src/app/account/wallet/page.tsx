
"use client";

import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wallet, Sparkles, Star, Check, ThumbsUp, Upload, ChevronRight, Coins, Utensils, BookOpen, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import Image from 'next/image';

const activityFeed = [
  { icon: <Check className="h-4 w-4" />, text: "Checked in at Karim's Restaurant", points: "+10", time: "2h ago" },
  { icon: <Star className="h-4 w-4" />, text: "Posted a review for Al Bake", points: "+50", time: "1d ago" },
  { icon: <Upload className="h-4 w-4" />, text: "Uploaded 3 photos for Jama Masjid", points: "+30", time: "1d ago" },
  { icon: <ThumbsUp className="h-4 w-4" />, text: "Your review was marked as helpful", points: "+5", time: "2d ago" },
];

const earnRewardTiers = [
    {
    category: "Welcome Bonus",
    tasks: [
      { action: "Sign-up Bonus", coins: 5 },
    ],
  },
  {
    category: "Daily Check-ins",
    tasks: [
      { action: "Daily Check-in", coins: 10 },
      { action: "3-Day Streak Bonus", coins: 20 },
      { action: "7-Day Streak Bonus", coins: 50 },
    ],
  },
  {
    category: "Verified Reviews",
    tasks: [
      { action: "Text Review", coins: 50 },
      { action: "Review with a Photo", coins: 150 },
      { action: "Review with a Video", coins: 200 },
      { action: "High-Quality Video Review", coins: 400 },
    ],
  },
  {
    category: "Media Uploads",
     tasks: [
      { action: "Photo Upload (UGC)", coins: 50 },
      { action: "Video Upload (Walkthrough, etc.)", coins: 200 },
      { action: "Reel-Style Content (Vertical)", coins: 500 },
    ],
  },
  {
    category: "Social Engagement",
    tasks: [
      { action: "Follow on Instagram", coins: 5 },
      { action: "Follow on Facebook", coins: 5 },
      { action: "Follow on YouTube", coins: 5 },
    ],
  },
  {
    category: "Refer & Earn",
    tasks: [
        { action: "Refer a Friend", coins: 100 },
        { action: "Successful Family Invite", coins: 150 },
    ],
  },
  {
    category: "Community Contributions",
    tasks: [
        { action: "Suggest a Place", coins: 100 },
    ],
  }
];

const coinPacks = [
    { id: 1, amount: 2500, price: 30.00, bonus: null },
    { id: 2, amount: 10000, price: 100.00, bonus: null },
    { id: 3, amount: 50000, price: 490.00, bonus: "+2.5K" },
    { id: 4, amount: 100000, price: 990.00, bonus: "+8K" },
    { id: 5, amount: 200000, price: 1950.00, bonus: "+20K" },
    { id: 6, amount: 500000, price: 4900.00, bonus: "+75K" },
];

const amazonRewards = [
    { value: 10, coins: 1000 },
    { value: 50, coins: 5000 },
    { value: 100, coins: 10000 },
];


export default function WalletPage() {
    const { user } = useAuth();
    const [selectedPackId, setSelectedPackId] = useState(1);

    const selectedPack = coinPacks.find(p => p.id === selectedPackId);
    
    return (
        <div className="p-4 md:p-6 space-y-6">
            <Card className="bg-primary/10 text-center border-primary/20">
                <CardContent className="p-6">
                    <Wallet className="h-10 w-10 mx-auto mb-2 text-primary" />
                    <p className="text-4xl font-bold text-primary">{user?.halalCoinsBalance || 0}</p>
                    <p className="font-medium text-primary">Available Coins</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Buy Coins</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                        {coinPacks.map(pack => (
                            <Card 
                                key={pack.id} 
                                onClick={() => setSelectedPackId(pack.id)}
                                className={cn(
                                    "text-center p-3 cursor-pointer relative transition-all",
                                    selectedPackId === pack.id ? "border-primary ring-2 ring-primary" : "border-muted-foreground/20 bg-secondary/30"
                                )}
                            >
                                {pack.bonus && (
                                    <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white">{pack.bonus}</Badge>
                                )}
                                <Coins className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
                                <p className="font-bold text-lg">{pack.amount.toLocaleString()}</p>
                                <p className="text-xs text-muted-foreground">INR {pack.price.toFixed(2)}</p>
                            </Card>
                        ))}
                    </div>
                    <Button size="lg" className="w-full mt-4 h-12 text-lg">
                        Buy Now
                    </Button>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Redeem Rewards</CardTitle>
                    <CardDescription>Use your Halal Coins to get Amazon gift cards.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {amazonRewards.map((reward) => (
                        <Card key={reward.value} className="bg-secondary/30">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-background rounded-lg">
                                        <Image src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop&auto=format&q=80" alt="Amazon" width={48} height={48} className="rounded-md" />
                                    </div>
                                    <div>
                                        <p className="font-bold">₹{reward.value} Amazon Gift Card</p>
                                        <div className="flex items-center gap-1 text-yellow-400 font-semibold">
                                            <Coins className="h-4 w-4" />
                                            <span>{reward.coins.toLocaleString()} Coins</span>
                                        </div>
                                    </div>
                                </div>
                                <Button disabled={(user?.halalCoinsBalance || 0) < reward.coins}>
                                    Redeem
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>

            <Separator />

             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Transaction History</CardTitle>
                    <CardDescription>Your recent coin activities.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {activityFeed.map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-3">
                                <div className="bg-secondary p-2 rounded-full">{item.icon}</div>
                                <div>
                                    <p>{item.text}</p>
                                    <p className="text-xs text-muted-foreground">{item.time}</p>
                                </div>
                            </div>
                            <p className="font-bold text-green-500">{item.points}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">How to Earn More Coins</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                {earnRewardTiers.map((tier) => (
                    <div key={tier.category}>
                        <h3 className="font-semibold text-md">{tier.category}</h3>
                        <Separator className="my-2"/>
                        <ul className="space-y-2">
                            {tier.tasks.map((task) => (
                            <li
                                key={task.action}
                                className="flex items-center justify-between p-2 bg-secondary/50 rounded-lg"
                            >
                                <p className="text-sm text-foreground">{task.action}</p>
                                <div className="flex items-center gap-2">
                                    <div className="font-bold text-primary flex items-center gap-1">
                                        <span>{task.coins}</span>
                                        <Sparkles className="h-4 w-4" />
                                    </div>
                                </div>
                            </li>
                            ))}
                        </ul>
                    </div>
                ))}
                </CardContent>
            </Card>
        </div>
    );
}
