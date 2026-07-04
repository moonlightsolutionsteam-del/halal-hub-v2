
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Book, List, ScanText, Search } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "E-Code Directory",
    description: "Browse the full list of E-Codes.",
    href: "/halal-check/e-codes",
    icon: <Book className="h-8 w-8 text-primary" />,
  },
  {
    title: "INS Code Directory",
    description: "Browse the full list of INS Codes.",
    href: "/halal-check/ins-codes",
    icon: <List className="h-8 w-8 text-primary" />,
  },
  {
    title: "Product Ingredient Checker",
    description: "Scan or type ingredients to check them.",
    href: "/halal-check/product-checker",
    icon: <ScanText className="h-8 w-8 text-primary" />,
  },
];

export default function HalalCheckPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="space-y-2 mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
          Know What’s Inside Your Food
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Scan or search to check the halal status of food additives. Supports
          E-Codes, INS Codes, and Common Ingredient Names.
        </p>
      </div>

      <div className="max-w-xl mx-auto space-y-6">
        {/* Search Card */}
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center gap-2">
              <Search className="h-6 w-6 text-primary" />
              Search Additives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search E471, INS 322, Gelatin…"
                className="pl-10 h-12 text-base"
              />
            </div>
          </CardContent>
        </Card>

        {/* Feature Cards */}
        {features.map((feature) => (
          <Link href={feature.href} key={feature.title}>
            <Card className="hover:bg-secondary/50 transition-colors">
              <CardContent className="flex items-center p-6 gap-6">
                {feature.icon}
                <div>
                  <h3 className="text-xl font-bold font-headline">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
