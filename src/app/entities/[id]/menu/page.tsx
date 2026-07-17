
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Plus,
  Minus,
  Utensils,
  ShoppingBasket,
  Calendar,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/client";

type MenuItem = {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string | null;
  price: number | null;
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export default function MenuPage() {
  const params = useParams();
  const id = params.id as string;
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isConfirming, setIsConfirming] = useState(false);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [business, setBusiness] = useState<{ name: string; phone: string | null } | null>(null);

  useEffect(() => {
    const supabase = createClient()
    ;supabase
      .from("business_catalog_items")
      .select("id, title, description, image_url, price")
      .eq("business_id", id)
      .then(({ data }: { data: MenuItem[] | null }) => {
        setItems(data ?? [])
        setLoading(false)
      })
    ;supabase
      .from("businesses")
      .select("name, phone")
      .eq("id", id)
      .single()
      .then(({ data }: { data: { name: string; phone: string | null } | null }) => setBusiness(data))
  }, [id]);

  const updateQuantity = (item: MenuItem, amount: number) => {
    setCart((prevCart) => {
        const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
            const newQuantity = existingItem.quantity + amount;
            if (newQuantity <= 0) {
                return prevCart.filter((cartItem) => cartItem.id !== item.id);
            }
            return prevCart.map((cartItem) =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: newQuantity }
                    : cartItem
            );
        } else if (amount > 0) {
             return [...prevCart, { id: item.id, name: item.title ?? "Item", price: item.price ?? 0, quantity: 1 }];
        }
        return prevCart;
    });
  };

  const getCartItem = (itemId: string) => cart.find(item => item.id === itemId);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Utensils className="h-5 w-5" />
        <h1 className="text-xl font-semibold">{business?.name ? `${business.name} Menu` : "Menu"}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <p className="text-muted-foreground text-center py-12">Loading menu…</p>
          ) : items.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12 text-muted-foreground">
                This business hasn't added a menu yet. Check back soon.
              </CardContent>
            </Card>
          ) : (
            items.map((item) => {
                const cartItem = getCartItem(item.id);
                return (
                    <Card key={item.id} className="overflow-hidden">
                        <div className="flex items-start">
                            {item.image_url && (
                                <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0">
                                    <Image src={item.image_url} alt={item.title ?? "Menu item"} fill className="object-cover" />
                                </div>
                            )}
                            <div className="p-4 flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold">{item.title}</h3>
                                        {item.price != null && <p className="text-sm text-muted-foreground">₹{item.price}</p>}
                                    </div>
                                     {cartItem ? (
                                        <div className="flex items-center gap-2 shrink-0">
                                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item, -1)}><Minus className="h-4 w-4" /></Button>
                                            <span className="font-bold text-lg w-8 text-center">{cartItem.quantity}</span>
                                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item, 1)}><Plus className="h-4 w-4" /></Button>
                                        </div>
                                    ) : (
                                        <Button onClick={() => updateQuantity(item, 1)}>Add</Button>
                                    )}
                                </div>
                                {item.description && <p className="text-sm text-muted-foreground mt-2">{item.description}</p>}
                            </div>
                        </div>
                    </Card>
                );
            })
          )}
        </div>

        <div className="lg:col-span-1 sticky top-20">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-xl">
                <ShoppingBasket /> Your Meal Plan
              </CardTitle>
              <CardDescription>Items you're interested in.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-muted-foreground">₹{item.price} x {item.quantity}</p>
                    </div>
                     <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity({ id: item.id, title: item.name, price: item.price, description: null, image_url: null }, -1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="font-semibold w-4 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity({ id: item.id, title: item.name, price: item.price, description: null, image_url: null }, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Add items from the menu to plan your meal.
                </p>
              )}
            </CardContent>
            {cart.length > 0 && (
                <CardFooter>
                    <Dialog open={isConfirming} onOpenChange={setIsConfirming}>
                        <DialogTrigger asChild>
                            <Button className="w-full" size="lg">Confirm Selection</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Your Meal Plan</DialogTitle>
                                <DialogDescription>
                                    Here is a summary of your selected items. You can call the restaurant to confirm or proceed to make a reservation.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-2 max-h-60 overflow-y-auto my-4 p-3 bg-secondary rounded-lg">
                                {cart.map(item => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <span>{item.quantity} x {item.name}</span>
                                        <span className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Estimated Total</span>
                                <span>₹{total.toLocaleString()}</span>
                            </div>
                             <p className="text-xs text-muted-foreground text-center">This is an estimate. Final bill may vary. This is not an online order.</p>
                            <DialogFooter className="sm:justify-between gap-2 pt-4">
                                <Button variant="outline" className="w-full" disabled={!business?.phone} asChild={!!business?.phone}>
                                    {business?.phone ? (
                                        <a href={`tel:${business.phone}`}>
                                            <Phone className="mr-2 h-4 w-4" /> Call Restaurant
                                        </a>
                                    ) : (
                                        <span><Phone className="mr-2 h-4 w-4" /> No phone on file</span>
                                    )}
                                </Button>
                                <Button className="w-full" asChild>
                                    <Link href={`/entities/${id}/reserve`}>
                                        <Calendar className="mr-2 h-4 w-4" /> Reserve a Table
                                    </Link>
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
