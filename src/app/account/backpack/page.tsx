
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from 'next/image';

const ownedItems = [
    { id: 1, name: "Gold Supporter Frame", category: "Frames", imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&auto=format&q=80" },
    { id: 2, name: "Green Theme", category: "Themes", imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&auto=format&q=80" },
    { id: 3, name: "Night Mosque Background", category: "Backgrounds", imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&auto=format&q=80" },
    { id: 4, name: "Star Message Effect", category: "Effects", imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop&auto=format&q=80" },
];

const ItemCard = ({ item }: { item: any }) => (
    <Card className="overflow-hidden">
        <div className="relative aspect-square">
            <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
        </div>
        <div className="p-3">
            <p className="font-semibold text-sm truncate">{item.name}</p>
        </div>
    </Card>
);

export default function BackpackPage() {
    const getItemsByCategory = (category: string) => {
        if (category === "All") return ownedItems;
        return ownedItems.filter(item => item.category === category);
    };

    return (
        <div className="p-4 md:p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">My Backpack</CardTitle>
                    <CardDescription>View and manage your collected digital items.</CardDescription>
                </CardHeader>
            </Card>

            <Tabs defaultValue="All" className="w-full">
                <TabsList>
                    <TabsTrigger value="All">All</TabsTrigger>
                    <TabsTrigger value="Frames">Frames</TabsTrigger>
                    <TabsTrigger value="Backgrounds">Backgrounds</TabsTrigger>
                    <TabsTrigger value="Themes">Themes</TabsTrigger>
                    <TabsTrigger value="Effects">Effects</TabsTrigger>
                </TabsList>
                <TabsContent value="All" className="mt-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {getItemsByCategory("All").map(item => <ItemCard key={item.id} item={item} />)}
                    </div>
                </TabsContent>
                <TabsContent value="Frames" className="mt-4">
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {getItemsByCategory("Frames").map(item => <ItemCard key={item.id} item={item} />)}
                    </div>
                </TabsContent>
                <TabsContent value="Backgrounds" className="mt-4">
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {getItemsByCategory("Backgrounds").map(item => <ItemCard key={item.id} item={item} />)}
                    </div>
                </TabsContent>
                 <TabsContent value="Themes" className="mt-4">
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {getItemsByCategory("Themes").map(item => <ItemCard key={item.id} item={item} />)}
                    </div>
                </TabsContent>
                 <TabsContent value="Effects" className="mt-4">
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {getItemsByCategory("Effects").map(item => <ItemCard key={item.id} item={item} />)}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
