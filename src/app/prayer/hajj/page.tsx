
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";

const hajjSections = [
    {
        title: "HAJJ INTRODUCTION",
        image: PlaceHolderImages.find(p => p.id === 'hajj-intro')
    },
    {
        title: "PREPARATION FOR HAJJ",
        image: PlaceHolderImages.find(p => p.id === 'hajj-prep')
    },
    {
        title: "HOW TO PERFORM HAJJ",
        image: PlaceHolderImages.find(p => p.id === 'hajj-perform')
    }
]

export default function HajjPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
        <div className="relative aspect-video rounded-lg overflow-hidden">
            <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/T6-53H3oV-s" 
                title="Madina Live | Madinah Live TV Online | Masjid Al Nabawi Live TV" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
            ></iframe>
             <div className="absolute top-2 left-2">
                <Badge variant="destructive">LIVE</Badge>
            </div>
            <div className="absolute top-2 right-2">
                <Button variant="ghost" size="icon" className="text-white">
                    <Share2 className="h-5 w-5"/>
                </Button>
            </div>
        </div>

        <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-4 flex flex-col items-center text-center gap-4">
                <Award className="h-10 w-10 text-primary" />
                <div className="space-y-1">
                    <h3 className="font-bold font-headline text-lg">Completed the Hajj?</h3>
                    <p className="text-sm text-muted-foreground">Claim your official Hajj badge on your Halal Hub profile to commemorate your journey.</p>
                </div>
                <Link href="/prayer/hajj-certification" passHref>
                    <Button>Claim Your Hajj Badge</Button>
                </Link>
            </CardContent>
        </Card>
        
        <div>
            <h2 className="text-2xl font-bold font-headline mb-4">Hajj Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hajjSections.map(section => (
                    section.image && (
                        <Link href="/prayer/hajj" key={section.title}>
                            <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                                <Image 
                                    src={section.image.imageUrl} 
                                    alt={section.title} 
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                    data-ai-hint={section.image.imageHint}
                                />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <h3 className="text-white text-xl font-bold text-center p-2">{section.title}</h3>
                                </div>
                            </div>
                        </Link>
                    )
                ))}
            </div>
        </div>
    </div>
  );
}
