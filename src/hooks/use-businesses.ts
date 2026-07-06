
'use client';

import { useState, useEffect } from 'react';
import { Business } from '@/lib/types';

// Mock data as firebase is not fully setup
const mockBusinesses: Business[] = [
  {
    id: '1',
    name: "Karim's Restaurant",
    latitude: 28.65,
    longitude: 77.23,
    categoryId: "restaurant",
    type: "Restaurant",
    category: "Mughlai",
    cuisines: ['Mughlai', 'North Indian'],
    rating: 4.5,
    reviews: 120,
    priceRange: '₹₹',
    distance: '1.2 km',
    isOpen: true,
    verifiedHalal: true,
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop&auto=format&q=80',
    imageHint: 'mughlai food platter',
    amenities: ['Parking', 'Family Seating'],
  },
  {
    id: '2',
    name: 'Al-Naseeb Meats',
    latitude: 28.655,
    longitude: 77.235,
    categoryId: "meat",
    type: "Meat Shop",
    category: "Butcher",
    specialties: ['Mutton', 'Chicken', 'Keema'],
    rating: 4.8,
    reviews: 80,
    distance: '2.5 km',
    isOpen: true,
    verifiedHalal: true,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format&q=80',
    imageHint: 'fresh meat display',
    amenities: ['Parking'],
  },
  {
    id: 'jama-masjid',
    name: 'Jama Masjid',
    latitude: 28.6507,
    longitude: 77.2334,
    categoryId: "mosque",
    type: "Mosque",
    category: "Historic Mosque",
    distance: '0.8 km',
    verified: true,
    nextPrayer: 'Asr',
    nextPrayerTime: '4:15 PM',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&auto=format&q=80',
    imageHint: 'grand mosque exterior',
    amenities: ['Prayer Space', "Women's Area"],
  }
];


export function useBusinesses() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    // Simulate async data fetching
    setTimeout(() => {
        setBusinesses(mockBusinesses);
        setLoading(false);
    }, 500);
  }, []);

  return { businesses, loading, error };
}
