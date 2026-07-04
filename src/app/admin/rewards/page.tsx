
"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Gift,
  Sparkles,
  Award,
  DollarSign,
  Edit,
  PlusCircle,
  LogIn,
  Star,
  Upload,
  ThumbsUp,
  Users,
} from "lucide-react"
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

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
];

const redeemableRewards = [
    { name: "20% Off at Karim's", cost: 500, category: "Food Voucher" },
    { name: "Free Delivery from Al-Naseeb", cost: 300, category: "Delivery" },
    { name: "Islamic Art Print", cost: 1000, category: "Merchandise" },
    { name: "Donate to Orphanage", cost: 250, category: "Charity" },
];


export default function SuperAdminRewardsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Reward Engine</h1>
        <p className="text-muted-foreground">Manage and configure the platform's loyalty and rewards system.</p>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Coins Distributed</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">1,250,000</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Rewards Redeemed</CardTitle>
                <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">5,430</div>
                <p className="text-xs text-muted-foreground">+120 this week</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Reward Rules</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">in 6 categories</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Redeemable Items</CardTitle>
                <Sparkles className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">25</div>
                <p className="text-xs text-muted-foreground">Across 4 categories</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Ways to Earn Coins</CardTitle>
                <CardDescription>Manage the rules for how users can earn loyalty coins.</CardDescription>
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
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                </div>
                            </li>
                            ))}
                        </ul>
                    </div>
                ))}
                <Button variant="outline" className="w-full mt-4" asChild>
                    <Link href="/admin/rewards/create-rule">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add New Earning Rule
                    </Link>
                </Button>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Redeemable Rewards</CardTitle>
                <CardDescription>Manage the items and vouchers users can redeem with their coins.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                {redeemableRewards.map((reward, index) => (
                     <li
                        key={index}
                        className="flex items-center justify-between p-2 bg-secondary/50 rounded-lg"
                    >
                        <div>
                            <p className="text-sm font-semibold text-foreground">{reward.name}</p>
                            <p className="text-xs text-muted-foreground">{reward.category}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="font-bold text-primary flex items-center gap-1">
                                <span>{reward.cost}</span>
                                <Sparkles className="h-4 w-4" />
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Edit className="h-4 w-4" />
                            </Button>
                        </div>
                    </li>
                ))}
                 <Button variant="outline" className="w-full mt-4">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Reward
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
