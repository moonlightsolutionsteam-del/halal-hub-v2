
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wallet, Sparkles, Star, Check, ThumbsUp, Upload, ChevronRight, Coins, Utensils, BookOpen, Heart, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import Image from 'next/image';

type LedgerRow = { id: string; delta: number; reason: string; created_at: string }

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
    const [ledger, setLedger] = useState<LedgerRow[]>([]);
    const [ledgerLoading, setLedgerLoading] = useState(true);

    useEffect(() => {
      if (!user?.uid) { setLedgerLoading(false); return }
      const supabase = createClient()
      ;supabase
        .from("points_ledger")
        .select("id, delta, reason, created_at")
        .eq("user_id", user.uid)
        .order("created_at", { ascending: false })
        .limit(20)
        .then(({ data }: { data: LedgerRow[] | null }) => {
          setLedger(data ?? [])
          setLedgerLoading(false)
        })
    }, [user?.uid]);

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
                                        <p className="font-bold">${reward.value} Amazon Gift Card</p>
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
                    {ledgerLoading ? (
                      <div className="flex justify-center py-4"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>
                    ) : ledger.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">No coin activity yet.</p>
                    ) : ledger.map(row => {
                      const date = new Date(row.created_at).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
                      return (
                        <div key={row.id} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-3">
                                <div className="bg-secondary p-2 rounded-full">
                                  <Coins className="h-4 w-4 text-amber-500" />
                                </div>
                                <div>
                                    <p className="capitalize">{row.reason.replace(/_/g, " ")}</p>
                                    <p className="text-xs text-muted-foreground">{date}</p>
                                </div>
                            </div>
                            <p className={`font-bold ${row.delta >= 0 ? "text-green-500" : "text-red-500"}`}>
                              {row.delta >= 0 ? "+" : ""}{row.delta}
                            </p>
                        </div>
                      )
                    })}
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
