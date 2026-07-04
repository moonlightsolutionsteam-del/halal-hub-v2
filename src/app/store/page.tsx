
"use client";

import Image from 'next/image';
import {
  Search,
  ChevronDown,
  Store,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Coins } from 'lucide-react';

const mockFeatures = [
  {
    id: 'feat-1',
    name: "Tasbeeh Background",
    category: "Backgrounds",
    price: 4200,
    imageUrl: 'https://picsum.photos/seed/tasbeeh-bg/600/400',
    imageHint: 'tasbeeh on prayer mat',
  },
  {
    id: 'feat-2',
    name: 'Islamic Frame',
    category: 'Frames',
    price: 1872,
    imageUrl: 'https://picsum.photos/seed/islamic-frame-1/600/400',
    imageHint: 'islamic art frame',
  },
   {
    id: 'feat-3',
    name: "Theme Color: Green",
    category: "Themes",
    price: 2500,
    imageUrl: "https://picsum.photos/seed/theme-green/600/400",
    imageHint: "green abstract color",
  },
  {
    id: 'feat-4',
    name: 'Avatar Frame: Gold',
    category: 'Frames',
    price: 3000,
    imageUrl: 'https://picsum.photos/seed/avatar-frame-gold/600/400',
    imageHint: 'gold avatar frame',
  },
    {
    id: 'feat-5',
    name: "Theme Color: Red",
    category: "Themes",
    price: 2500,
    imageUrl: "https://picsum.photos/seed/theme-red/600/400",
    imageHint: "red abstract color",
  },
    {
    id: 'feat-6',
    name: "Special Message Effect",
    category: "Effects",
    price: 1500,
    imageUrl: "https://picsum.photos/seed/message-effect/600/400",
    imageHint: "chat message effect",
  },
    {
    id: 'feat-7',
    name: "Prayer Background",
    category: "Backgrounds",
    price: 5000,
    imageUrl: "https://picsum.photos/seed/prayer-background/600/400",
    imageHint: "mosque at night",
  },
    {
    id: 'feat-8',
    name: "7-Day Ad Removal",
    category: "Utilities",
    price: 1000,
    imageUrl: "https://picsum.photos/seed/ad-removal/600/400",
    imageHint: "no ads icon",
  },
];

const categoryTags = ['All', 'Frames', 'Backgrounds', 'Themes', 'Effects', 'Utilities'];

const FeatureCard = ({ feature }: { feature: any }) => (
    <Card className="overflow-hidden w-full h-full bg-secondary/30 border-0">
        <div className="block h-full flex flex-col">
          <div className="relative">
            <Image
              src={feature.imageUrl}
              alt={feature.name}
              width={600}
              height={400}
              className="object-cover w-full h-48"
              data-ai-hint={feature.imageHint}
            />
          </div>
          <CardContent className="p-4 flex flex-col flex-1">
              <h3 className="text-md font-semibold flex-1">{feature.name}</h3>
               <div className="flex items-center justify-between mt-2">
                 <div className="flex items-center gap-1 font-bold text-yellow-400">
                    <Coins className="h-4 w-4" />
                    <span>{feature.price.toLocaleString()}</span>
                </div>
                <Button size="sm">Get</Button>
               </div>
          </CardContent>
        </div>
    </Card>
);

export default function StorePage() {

  return (
    <div className="pb-24 bg-card text-card-foreground">
       <div className="p-4 text-center">
            <h1 className="text-2xl md:text-3xl font-headline font-bold text-foreground mt-4">
                Features of Halal Hub
            </h1>
            <p className="text-muted-foreground text-md max-w-xl mx-auto mt-2">
                Customize your experience with exclusive features.
            </p>
        </div>
      
      <div className="p-4 bg-card sticky top-16 z-30">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search features..."
            className="pl-10 h-11 text-base bg-secondary border-transparent rounded-lg"
          />
        </div>
      </div>
      
      <div className="px-4 py-3 flex items-center gap-2 overflow-x-auto whitespace-nowrap no-scrollbar">
        {categoryTags.map(tag => (
            <Badge key={tag} variant="secondary" className="py-1 px-3 text-sm">{tag}</Badge>
        ))}
      </div>

      <div className="p-4 grid grid-cols-2 gap-4">
        {mockFeatures.map((product) => (
          <FeatureCard key={product.id} feature={product} />
        ))}
      </div>
    </div>
  );
}
