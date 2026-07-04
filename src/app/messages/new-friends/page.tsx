
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from 'next/image';

const EmptyState = ({ title, imageUrl }: { title: string; imageUrl: string }) => (
    <div className="flex flex-col items-center justify-center text-center py-20 h-full text-muted-foreground">
        <Image src={imageUrl} alt={title} width={128} height={128} className="opacity-50" />
        <p className="mt-4 font-semibold">{title}</p>
    </div>
);


const friendRequests = [
    { name: "Zoya Akhtar", mutual: 5, avatar: "https://picsum.photos/seed/creator3/100" },
    { name: "Omar Abdullah", mutual: 2, avatar: "https://picsum.photos/seed/user4/100" },
];

export default function NewFriendsPage() {
    return (
        <div>
            <Tabs defaultValue="followers" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="followers">Followers</TabsTrigger>
                    <TabsTrigger value="friends">Friends</TabsTrigger>
                    <TabsTrigger value="following">Following</TabsTrigger>
                    <TabsTrigger value="family">Family</TabsTrigger>
                </TabsList>
                <TabsContent value="followers">
                    <EmptyState title="You have no followers" imageUrl="https://picsum.photos/seed/hot-air-balloon/200" />
                </TabsContent>
                <TabsContent value="friends">
                     <EmptyState title="You have no friends yet" imageUrl="https://picsum.photos/seed/friends-icon/200" />
                </TabsContent>
                <TabsContent value="following">
                     <EmptyState title="You are not following anyone" imageUrl="https://picsum.photos/seed/following-icon/200" />
                </TabsContent>
                <TabsContent value="family">
                     <EmptyState title="No family members added" imageUrl="https://picsum.photos/seed/family-icon/200" />
                </TabsContent>
            </Tabs>
            <div className="p-4 space-y-4 border-t">
                <h2 className="font-semibold text-lg">Friend Requests</h2>
                {friendRequests.map((req, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={req.avatar} />
                                <AvatarFallback>{req.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-bold">{req.name}</p>
                                <p className="text-xs text-muted-foreground">{req.mutual} mutual friends</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm">Confirm</Button>
                            <Button size="sm" variant="outline">Delete</Button>
                        </div>
                    </div>
                ))}
                {friendRequests.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">No new friend requests.</p>
                )}
            </div>
        </div>
    );
}
