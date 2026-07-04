
"use client";

import Image from 'next/image';
import {
  Search,
  ChevronDown,
  User,
  SlidersHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

const mockCreators = [
  {
    id: 'aishaskitchen',
    name: "Aisha's Kitchen",
    handle: "aishaskitchen",
    category: 'Food Blogger',
    followers: 250000,
    posts: "1.2K",
    engagement: "5.2%",
    location: "Mumbai",
    bio: "Exploring the world of Halal cuisine, one dish at a time. Join me for recipes, reviews, and culinary adventures!",
    avatarUrl: 'https://picsum.photos/seed/creator1/200',
    imageHint: 'food blogger photo',
  },
  {
    id: 'imamrahman',
    name: 'Imam Ahmad Rahman',
    handle: 'imamrahman',
    category: 'Islamic Scholar',
    followers: 150000,
    posts: "850",
    engagement: "8.1%",
    location: "Delhi",
    bio: "Sharing knowledge and reflections on the Quran, Hadith, and Islamic spirituality for the modern Muslim.",
    avatarUrl: 'https://picsum.photos/seed/imam1/200',
    imageHint: 'islamic scholar photo',
  },
  {
    id: 'modestfashion',
    name: 'Modest Fashionista',
    handle: 'modestfashion',
    category: 'Fashion Blogger',
    followers: 520000,
    posts: "2.1K",
    engagement: "6.5%",
    location: "Bangalore",
    bio: "Celebrating style with modesty. Your daily dose of inspiration for chic and elegant modest wear.",
    avatarUrl: 'https://picsum.photos/seed/creator3/200',
    imageHint: 'modest fashion blogger',
  },
    {
    id: 'halalreviews',
    name: "Halal Food Reviews",
    handle: "halalreviews",
    category: "Food Critic",
    followers: 85000,
    posts: "500",
    engagement: "9.3%",
    location: "Delhi",
    bio: "Your trusted guide to the best Halal food spots. Unbiased reviews and recommendations.",
    avatarUrl: 'https://picsum.photos/seed/creator2/200',
    imageHint: 'food critic photo',
  },
];

const categoryTags = ['Food', 'Lifestyle', 'Fashion', 'Education', 'Spirituality', 'Travel', 'Comedy'];

const CreatorCard = ({ creator }: { creator: any }) => (
    <Card className="overflow-hidden w-full">
        <CardContent className="p-4">
            <div className="flex items-start gap-4">
                 <Avatar className="h-16 w-16 border-2 border-primary/20">
                    <AvatarImage src={creator.avatarUrl} alt={creator.name} />
                    <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                             <h3 className="text-lg font-bold font-headline">{creator.name}</h3>
                             <p className="text-sm text-primary">@{creator.handle}</p>
                        </div>
                        <Badge variant="secondary">{creator.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{creator.bio}</p>
                </div>
            </div>
            <Separator className="my-4"/>
            <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                    <p className="font-bold">{(creator.followers / 1000).toFixed(1)}K</p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                 <div>
                    <p className="font-bold">{creator.posts}</p>
                    <p className="text-xs text-muted-foreground">Posts</p>
                </div>
                 <div>
                    <p className="font-bold">{creator.engagement}</p>
                    <p className="text-xs text-muted-foreground">Engagement</p>
                </div>
            </div>
             <Separator className="my-4"/>
             <div className="flex gap-2">
                <Button className="flex-1">Follow</Button>
                <Link href={`/creators/${creator.id}`} passHref className="flex-1">
                    <Button variant="outline" className="w-full">View Profile</Button>
                </Link>
             </div>
        </CardContent>
    </Card>
);

export default function CreatorsPage() {

  return (
    <div className="pb-24">
       <div className="p-4 text-center bg-secondary/20">
            <div className="inline-block p-4 bg-primary/10 rounded-full mx-auto">
                <User className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-headline font-bold text-foreground mt-4">
                Discover Creators
            </h1>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto mt-2">
                Connect with influencers, scholars, and content creators in the community.
            </p>
        </div>
      
      <div className="p-4 bg-background sticky top-16 z-30 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search creators..."
            className="pl-10 h-11 text-base bg-secondary border-transparent rounded-lg"
          />
        </div>
        <div className="mt-2 flex items-center gap-2 overflow-x-auto whitespace-nowrap no-scrollbar">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded-full">Sort <ChevronDown className="ml-1 h-4 w-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                     <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Most Followers</DropdownMenuItem>
                    <DropdownMenuItem>Recently Joined</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                 <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded-full">Category</Button>
                </DropdownMenuTrigger>
                 <DropdownMenuContent>
                     <DropdownMenuLabel>Categories</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {categoryTags.map(cat => <DropdownMenuItem key={cat}>{cat}</DropdownMenuItem>)}
                </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" className="rounded-full">Location</Button>
            <Button variant="outline" size="sm" className="rounded-full">
                <SlidersHorizontal className="mr-2 h-4 w-4"/>
                Filters
            </Button>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        {mockCreators.map((creator) => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
    </div>
  );
}
