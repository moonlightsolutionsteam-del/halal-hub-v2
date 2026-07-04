
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const suggestedUsers = [
    { name: "Yusuf Ibrahim", mutual: 8, avatar: "https://picsum.photos/seed/creator2/100" },
    { name: "Halal Food Reviews", mutual: 3, avatar: "https://picsum.photos/seed/creator4/100" },
    { name: "Imam Ahmad Rahman", mutual: 1, avatar: "https://picsum.photos/seed/imam1/100" },
];

export default function AddPeoplePage() {
    return (
        <div className="p-4 space-y-6">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    placeholder="Search name, username, email..."
                    className="pl-10 h-12 text-base"
                />
            </div>

            <div>
                <h2 className="font-semibold text-lg mb-4">People You May Know</h2>
                <div className="space-y-4">
                    {suggestedUsers.map((user, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-bold">{user.name}</p>
                                    <p className="text-xs text-muted-foreground">{user.mutual} mutual friends</p>
                                </div>
                            </div>
                            <Button size="sm">Add Friend</Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
