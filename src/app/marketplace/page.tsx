
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
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const mockProducts = [
  {
    id: 'prod-1',
    name: "Mutton Biryani",
    business: "Karim's Restaurant",
    category: "Food",
    price: "$450",
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&h=600&fit=crop&auto=format&q=80',
    imageHint: 'plate of mutton biryani',
    businessUrl: '/food-dining/1',
  },
  {
    id: 'prod-2',
    name: 'Designer Abaya',
    business: 'Medina Style Modest Wear',
    category: 'Fashion',
    price: '$3,500',
    imageUrl: 'https://images.unsplash.com/photo-1612307057748-b44842539a29?w=800&h=600&fit=crop&auto=format&q=80',
    imageHint: 'elegant black abaya',
    businessUrl: '/fashion/1',
  },
   {
    id: 'prod-3',
    name: "Mutton Curry Cut",
    business: "Al-Naseeb Meats",
    category: "Meat",
    price: "$800/kg",
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop&auto=format&q=80",
    imageHint: "raw mutton pieces",
    businessUrl: '/meat/1',
  },
  {
    id: 'prod-4',
    name: 'Seerah Collection',
    business: 'Al-Huda Islamic Books',
    category: 'Books',
    price: '$1,200',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop&auto=format&q=80',
    imageHint: 'stack of islamic books',
    businessUrl: '/bookstores/1',
  },
  {
    id: 'prod-5',
    name: "Hand-stitched Leather Khussa",
    business: "Lahori Styles",
    category: 'Fashion',
    price: '$2,200',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop&auto=format&q=80',
    imageHint: 'traditional leather shoes',
    businessUrl: '#',
  },
  {
    id: 'prod-6',
    name: "Oud Perfume Oil",
    business: "Arabian Scents",
    category: 'Lifestyle',
    price: '$1,500',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop&auto=format&q=80',
    imageHint: 'luxury perfume bottle',
    businessUrl: '#',
  },
  {
    id: 'prod-7',
    name: "Organic Honey",
    business: "The Sunnah Store",
    category: 'Food',
    price: '$600',
    imageUrl: 'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=800&h=600&fit=crop&auto=format&q=80',
    imageHint: 'jar of organic honey',
    businessUrl: '#',
  },
  {
    id: 'prod-8',
    name: "Islamic Wall Art",
    business: "Modern Muslim Home",
    category: 'Decor',
    price: '$2,800',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&auto=format&q=80',
    imageHint: 'islamic calligraphy art',
    businessUrl: '#',
  },
];

const categoryTags = ['Food', 'Fashion', 'Meat', 'Books', 'Catering', 'Health', 'Services', 'Decor', 'Lifestyle'];

const ProductCard = ({ product }: { product: any }) => (
    <Card className="overflow-hidden w-full h-full">
        <div className="block h-full flex flex-col">
          <div className="relative">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={600}
              height={400}
              className="object-cover w-full h-48"
              data-ai-hint={product.imageHint}
            />
             <Badge variant="secondary" className="absolute top-2 left-2">{product.category}</Badge>
          </div>
          <CardContent className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-bold font-headline flex-1">{product.name}</h3>
              <p className="font-semibold text-xl text-primary mt-2">{product.price}</p>
              <Link href={product.businessUrl}>
                <div className="text-sm text-muted-foreground mt-2 flex items-center gap-2 hover:text-primary">
                    <Store className="h-4 w-4" />
                    <span className="truncate">{product.business}</span>
                </div>
              </Link>
          </CardContent>
        </div>
    </Card>
);

const HorizontalProductCard = ({ product }: { product: any }) => (
    <Card className="overflow-hidden w-[200px] h-full">
      <Link href="/marketplace" passHref>
        <div className="block h-full">
          <div className="relative">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={200}
              height={200}
              className="object-cover w-full h-32"
              data-ai-hint={product.imageHint}
            />
          </div>
          <CardContent className="p-3">
              <Badge variant="secondary" className="mb-1 text-xs">{product.category}</Badge>
              <h3 className="text-sm font-bold font-headline truncate">{product.name}</h3>
              <p className="font-semibold text-md text-primary mt-1">{product.price}</p>
          </CardContent>
        </div>
      </Link>
    </Card>
);

export default function MarketplacePage() {
    const featuredProducts = mockProducts.slice(0, 4);
    const newArrivals = mockProducts.slice(4, 8);

  return (
    <div className="pb-24">
       <div className="p-4 text-center bg-secondary/20">
            <div className="inline-block p-4 bg-primary/10 rounded-full mx-auto">
                <Store className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-headline font-bold text-foreground mt-4">
                Halal Hub Marketplace
            </h1>
            <p className="text-muted-foreground text-md max-w-xl lg:max-w-6xl mx-auto mt-2">
                Discover products and services from trusted businesses in our community.
            </p>
        </div>
      
      <div className="p-4 bg-background sticky top-16 z-30 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search products and services..."
            className="pl-10 h-11 text-base bg-secondary border-transparent rounded-lg"
          />
        </div>
        <div className="mt-2 flex items-center gap-2 overflow-x-auto whitespace-nowrap no-scrollbar">
            <Button variant="outline" size="sm" className="rounded-full">Sort <ChevronDown className="ml-1 h-4 w-4" /></Button>
            <Button variant="outline" size="sm" className="rounded-full">Price</Button>
            <Button variant="outline" size="sm" className="rounded-full">Location</Button>
        </div>
      </div>
      
      <div className="px-4 py-3 flex items-center gap-2 overflow-x-auto whitespace-nowrap no-scrollbar border-b">
        {categoryTags.map(tag => (
            <Badge key={tag} variant="secondary" className="py-1 px-3 text-sm">{tag}</Badge>
        ))}
      </div>

       <div className="py-8">
            <h2 className="text-xl font-bold font-headline mb-3 px-4">Featured Products</h2>
            <Carousel opts={{ align: "start" }}>
                <CarouselContent className="-ml-4 pl-4">
                    {featuredProducts.map((product) => (
                    <CarouselItem key={product.id} className="pl-2 basis-auto">
                        <HorizontalProductCard product={product} />
                    </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
        
        <div className="py-8 bg-secondary/20">
            <h2 className="text-xl font-bold font-headline mb-3 px-4">New Arrivals</h2>
                <Carousel opts={{ align: "start" }}>
                <CarouselContent className="-ml-4 pl-4">
                    {newArrivals.map((product) => (
                    <CarouselItem key={product.id} className="pl-2 basis-auto">
                        <HorizontalProductCard product={product} />
                    </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>


      <div className="p-4">
        <h2 className="text-xl font-bold font-headline mt-4 mb-4">All Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}
