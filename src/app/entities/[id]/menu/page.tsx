
"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Plus,
  Minus,
  Trash2,
  Utensils,
  ShoppingBasket,
  Calendar,
  Leaf,
  Flame,
  Star,
  Award,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


// Mock data, in a real app this would be fetched
const menuData = {
  categories: [
    {
      name: "Starters",
      items: [
        { id: 1, name: "Chicken Seekh Kebab", price: 250, veg_nonveg: "non_veg", description: "Juicy minced chicken kebabs with spices, grilled to perfection.", image_url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop&auto=format&q=80", availability: true, tags: ["popular", "chef_special"] },
        { id: 2, name: "Paneer Tikka", price: 220, veg_nonveg: "veg", description: "Cottage cheese cubes marinated in yogurt and spices, grilled in a tandoor.", image_url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop&auto=format&q=80", availability: true, tags: [] },
        { id: 3, name: "Mutton Shammi Kebab", price: 300, veg_nonveg: "non_veg", description: "Soft, melt-in-the-mouth mutton patties with a blend of secret spices.", image_url: "https://randomuser.me/api/portraits/men/9.jpg", availability: true, tags: ["popular"] },
        { id: 10, name: "Dahi Bhalla", price: 150, veg_nonveg: "veg", description: "Soft lentil dumplings soaked in creamy yogurt.", image_url: null, availability: false, tags: [] },
      ],
    },
    {
      name: "Main Course",
      items: [
        { id: 4, name: "Mutton Biryani", price: 450, veg_nonveg: "non_veg", description: "Aromatic basmati rice cooked with tender mutton pieces and exotic spices.", image_url: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&h=600&fit=crop&auto=format&q=80", availability: true, tags: ["popular"] },
        { id: 5, name: "Butter Chicken", price: 420, veg_nonveg: "non_veg", description: "Classic butter chicken in a rich, creamy tomato-based gravy.", image_url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format&q=80", availability: true, tags: ["chef_special"] },
        { id: 6, name: "Dal Makhani", price: 300, veg_nonveg: "veg", description: "Black lentils simmered overnight with butter and cream.", image_url: null, availability: true, tags: [] },
        { id: 7, name: "Paneer Butter Masala", price: 350, veg_nonveg: "veg", description: "Soft paneer cubes in a rich and creamy tomato gravy.", image_url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format&q=80", availability: true, tags: [] },
      ],
    },
     {
      name: "Breads",
      items: [
        { id: 8, name: "Rumali Roti", price: 30, veg_nonveg: "veg", description: "Thin, soft, and handkerchief-like bread.", image_url: null, availability: true, tags: [] },
        { id: 9, name: "Butter Naan", price: 50, veg_nonveg: "veg", description: "Soft, fluffy leavened bread with a generous spread of butter.", image_url: null, availability: true, tags: ["popular"] },
      ],
    },
  ],
};

const restaurantPhoneNumber = "+911123269880";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const TagBadge = ({ tag }: { tag: string }) => {
    let icon;
    switch(tag) {
        case 'popular': icon = <Star className="h-3 w-3 mr-1" />; break;
        case 'spicy': icon = <Flame className="h-3 w-3 mr-1" />; break;
        case 'chef_special': icon = <Award className="h-3 w-3 mr-1" />; break;
        default: return null;
    }

    return <Badge variant="secondary" className="capitalize">{icon} {tag.replace('_', ' ')}</Badge>;
}

export default function MenuPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'veg' | 'non_veg'>('all');
  const [isConfirming, setIsConfirming] = useState(false);

  const updateQuantity = (item: any, amount: number) => {
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
             return [...prevCart, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
        }
        return prevCart;
    });
  };
  
  const getCartItem = (itemId: number) => cart.find(item => item.id === itemId);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const filteredMenu = menuData.categories.map(category => ({
      ...category,
      items: category.items.filter(item => {
          if (filter === 'all') return true;
          return item.veg_nonveg === filter;
      })
  })).filter(category => category.items.length > 0);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Utensils className="h-5 w-5" />
        <h1 className="text-xl font-semibold">Grills and Rolls Menu</h1>
      </div>
      
      <div className="flex gap-2">
            <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>All</Button>
            <Button variant={filter === 'veg' ? 'default' : 'outline'} onClick={() => setFilter('veg')}><Leaf className="mr-2 h-4 w-4"/>Veg</Button>
            <Button variant={filter === 'non_veg' ? 'default' : 'outline'} onClick={() => setFilter('non_veg')}><Flame className="mr-2 h-4 w-4"/>Non-Veg</Button>
       </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          {filteredMenu.map((category) => (
            <div key={category.name}>
              <h2 className="text-2xl font-headline font-bold mb-4">{category.name}</h2>
              <div className="space-y-4">
                {category.items.map((item) => {
                    const cartItem = getCartItem(item.id);
                    return (
                        <Card key={item.id} className={cn("overflow-hidden transition-all", !item.availability && "opacity-50")}>
                            <div className="flex items-start">
                                {item.image_url && (
                                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0">
                                        <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                                    </div>
                                )}
                                <div className="p-4 flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <div className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center ${item.veg_nonveg === 'veg' ? 'border-green-500' : 'border-red-500'}`}>
                                                    <div className={`w-2 h-2 rounded-full ${item.veg_nonveg === 'veg' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                </div>
                                                <h3 className="font-semibold">{item.name}</h3>
                                            </div>
                                            <p className="text-sm text-muted-foreground">₹{item.price}</p>
                                        </div>
                                         {cartItem ? (
                                            <div className="flex items-center gap-2 shrink-0">
                                                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item, -1)}><Minus className="h-4 w-4" /></Button>
                                                <span className="font-bold text-lg w-8 text-center">{cartItem.quantity}</span>
                                                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item, 1)}><Plus className="h-4 w-4" /></Button>
                                            </div>
                                        ) : (
                                            <Button onClick={() => updateQuantity(item, 1)} disabled={!item.availability}>
                                                {item.availability ? 'Add' : 'Unavailable'}
                                            </Button>
                                        )}
                                    </div>
                                    {item.description && <p className="text-sm text-muted-foreground mt-2">{item.description}</p>}
                                    {item.tags.length > 0 && <div className="mt-2 flex gap-2 flex-wrap">{item.tags.map(tag => <TagBadge key={tag} tag={tag} />)}</div>}
                                </div>
                            </div>
                        </Card>
                    );
                })}
              </div>
            </div>
          ))}
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
                        onClick={() => updateQuantity(item, -1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="font-semibold w-4 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item, 1)}
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
                                <Button variant="outline" className="w-full" asChild>
                                    <a href={`tel:${restaurantPhoneNumber}`}>
                                        <Phone className="mr-2 h-4 w-4" /> Call Restaurant
                                    </a>
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
