"use client";

import Image from 'next/image';
import {
  Search,
  ChevronDown,
  Store,
  ShoppingBag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

const categoryTags = ['All', 'Food', 'Fashion', 'Meat', 'Books', 'Catering', 'Health', 'Services', 'Decor', 'Lifestyle'];

type CatalogItem = {
  id: string
  title: string | null
  business_name: string | null
  category: string | null
  price: number | null
  image_url: string | null
  is_available: boolean | null
  firebase_business_id?: string | null
}

const ProductCard = ({ product }: { product: CatalogItem }) => (
  <Card className="overflow-hidden w-full h-full">
    <div className="block h-full flex flex-col">
      <div className="relative">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.title ?? "Product"}
            width={600}
            height={400}
            className="object-cover w-full h-48"
            unoptimized
          />
        ) : (
          <div className="w-full h-48 bg-muted flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/30" />
          </div>
        )}
        <Badge variant="secondary" className="absolute top-2 left-2">{product.category || "General"}</Badge>
      </div>
      <CardContent className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-bold font-headline flex-1">{product.title || "Product"}</h3>
        <p className="font-semibold text-xl text-primary mt-2">
          {product.price != null ? `₹${product.price.toLocaleString("en-IN")}` : "Price on request"}
        </p>
        <div className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
          <Store className="h-4 w-4" />
          <span className="truncate">{product.business_name || "Halal Hub Seller"}</span>
        </div>
      </CardContent>
    </div>
  </Card>
);

const HorizontalProductCard = ({ product }: { product: CatalogItem }) => (
  <Card className="overflow-hidden w-[200px] h-full">
    <div className="block h-full">
      <div className="relative">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.title ?? "Product"}
            width={200}
            height={200}
            className="object-cover w-full h-32"
            unoptimized
          />
        ) : (
          <div className="w-full h-32 bg-muted flex items-center justify-center">
            <ShoppingBag className="h-8 w-8 text-muted-foreground/30" />
          </div>
        )}
      </div>
      <CardContent className="p-3">
        <Badge variant="secondary" className="mb-1 text-xs">{product.category || "General"}</Badge>
        <h3 className="text-sm font-bold font-headline truncate">{product.title || "Product"}</h3>
        <p className="font-semibold text-md text-primary mt-1">
          {product.price != null ? `₹${product.price.toLocaleString("en-IN")}` : "—"}
        </p>
      </CardContent>
    </div>
  </Card>
);

export default function MarketplacePage() {
  const [products, setProducts] = useState<CatalogItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTag, setActiveTag] = useState("All")

  useEffect(() => {
    const supabase = createClient()
    ;(supabase as any)
      .from("business_catalog_items")
      .select("id, title, business_name, category, price, image_url, is_available, firebase_business_id")
      .eq("is_available", true)
      .order("created_at", { ascending: false })
      .limit(60)
      .then(({ data }: { data: CatalogItem[] | null }) => {
        setLoading(false)
        if (data) setProducts(data)
      })
  }, [])

  const filtered = activeTag === "All"
    ? products
    : products.filter(p => (p.category ?? "").toLowerCase().includes(activeTag.toLowerCase()))

  const featured = filtered.slice(0, 4)
  const rest = filtered.slice(4)

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
          <Badge
            key={tag}
            variant={activeTag === tag ? "default" : "secondary"}
            className="py-1 px-3 text-sm cursor-pointer"
            onClick={() => setActiveTag(tag)}
          >{tag}</Badge>
        ))}
      </div>

      {loading && (
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="h-64 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center px-4">
          <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center">
            <ShoppingBag className="h-10 w-10 text-primary/40" />
          </div>
          <p className="text-xl font-black text-foreground">No products yet</p>
          <p className="text-muted-foreground font-medium max-w-sm">
            Businesses haven't listed products in this category yet.
          </p>
          <Link href="/partner/portal">
            <Button className="rounded-2xl font-bold">List Your Products</Button>
          </Link>
        </div>
      )}

      {!loading && featured.length > 0 && (
        <div className="py-8">
          <h2 className="text-xl font-bold font-headline mb-3 px-4">Featured Products</h2>
          <Carousel opts={{ align: "start" }}>
            <CarouselContent className="-ml-4 pl-4">
              {featured.map(product => (
                <CarouselItem key={product.id} className="pl-2 basis-auto">
                  <HorizontalProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      )}

      {!loading && rest.length > 0 && (
        <div className="py-8 bg-secondary/20">
          <h2 className="text-xl font-bold font-headline mb-3 px-4">More Products</h2>
          <Carousel opts={{ align: "start" }}>
            <CarouselContent className="-ml-4 pl-4">
              {rest.slice(0, 8).map(product => (
                <CarouselItem key={product.id} className="pl-2 basis-auto">
                  <HorizontalProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="p-4">
          <h2 className="text-xl font-bold font-headline mt-4 mb-4">All Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
