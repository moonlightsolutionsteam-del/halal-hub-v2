
"use client";

import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wallet, Sparkles, Utensils, BookOpen, Heart, ShoppingBag } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const KaabaIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground">
        <path d="M3.5 3.5L10 8.5L3.5 13.5L10.5 20.5L15.5 15.5L20.5 20.5L13.5 10L20.5 3.5L3.5 3.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M10 8.5L13.5 10L15.5 15.5L10.5 20.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
);


const allRewards = [
    {
        icon: <Utensils className="h-8 w-8 text-primary" />,
        title: "Family Iftar Voucher",
        description: "$50 voucher for local halal restaurant",
        category: "Dining",
        points: 2000,
    },
    {
        icon: <BookOpen className="h-8 w-8 text-primary" />,
        title: "Islamic Book Collection",
        description: "Set of 5 Islamic children's books",
        category: "Education",
        points: 1500,
    },
    {
        icon: <KaabaIcon />,
        title: "Family Umrah Fund",
        description: "Contribution to family Umrah savings",
        category: "Pilgrimage",
        points: 5000,
    },
     {
        icon: <Heart className="h-8 w-8 text-primary" />,
        title: "Donate to Charity",
        description: "Donate your points to a partner charity.",
        category: "Charity",
        points: 100,
    },
    {
        icon: <ShoppingBag className="h-8 w-8 text-primary" />,
        title: "Fashion Voucher",
        description: "Get a discount at a modest fashion store.",
        category: "Shopping",
        points: 1200,
    },
];

const RewardCard = ({ reward, userBalance }: { reward: any, userBalance: number }) => (
    <Card>
        <CardContent className="p-4 text-center">
            <div className="flex justify-center mb-4">{reward.icon}</div>
            <h3 className="text-xl font-bold font-headline">{reward.title}</h3>
            <p className="text-sm text-muted-foreground h-10">{reward.description}</p>
            <Badge variant="secondary" className="my-3">{reward.category}</Badge>
            <p className="text-2xl font-bold">{reward.points.toLocaleString()} points</p>
            <Button
                className="w-full mt-4"
                disabled={userBalance < reward.points}
            >
                {userBalance < reward.points ? "Not Enough Points" : "Redeem"}
            </Button>
        </CardContent>
    </Card>
);

export default function RewardsPage() {
    const { user } = useAuth();
    const balance = user?.halalCoinsBalance || 0;

    return (
        <div className="p-4 md:p-6 space-y-6">
            <Card className="bg-primary/10 text-center border-primary/20">
                <CardContent className="p-6">
                    <Wallet className="h-10 w-10 mx-auto mb-2 text-primary" />
                    <p className="text-2xl sm:text-4xl font-bold text-primary">{balance.toLocaleString()}</p>
                    <p className="font-medium text-primary">Available Coins</p>
                </CardContent>
            </Card>

            <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="dining">Dining</TabsTrigger>
                    <TabsTrigger value="shopping">Shopping</TabsTrigger>
                    <TabsTrigger value="charity">Charity</TabsTrigger>
                </TabsList>
                 <TabsContent value="all" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {allRewards.map((reward, index) => (
                            <RewardCard key={index} reward={reward} userBalance={balance} />
                        ))}
                    </div>
                 </TabsContent>
                 <TabsContent value="dining" className="mt-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {allRewards.filter(r => r.category === 'Dining').map((reward, index) => (
                            <RewardCard key={index} reward={reward} userBalance={balance} />
                        ))}
                    </div>
                </TabsContent>
                 <TabsContent value="shopping" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {allRewards.filter(r => r.category === 'Shopping').map((reward, index) => (
                            <RewardCard key={index} reward={reward} userBalance={balance} />
                        ))}
                    </div>
                </TabsContent>
                 <TabsContent value="charity" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {allRewards.filter(r => r.category === 'Charity').map((reward, index) => (
                            <RewardCard key={index} reward={reward} userBalance={balance} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
